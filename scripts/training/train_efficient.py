import os
import torch
import argparse
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments
)
from peft import (
    LoraConfig,
    get_peft_model,
    prepare_model_for_kbit_training,
    TaskType
)
from trl import SFTTrainer
from datasets import load_dataset

def main():
    parser = argparse.ArgumentParser(description="Pendency Model Efficient Trainer")
    parser.add_argument("--model_name", type=str, default="meta-llama/Llama-2-7b-chat-hf", help="Base model ID")
    parser.add_argument("--data_path", type=str, required=True, help="Path to cleaned JSONL dataset")
    parser.add_argument("--output_dir", type=str, default="./results", help="Output directory")
    parser.add_argument("--batch_size", type=int, default=4, help="Per device batch size")
    parser.add_argument("--grad_acc", type=int, default=4, help="Gradient accumulation steps")
    parser.add_argument("--epochs", type=int, default=1, help="Number of training epochs")
    parser.add_argument("--lr", type=float, default=2e-4, help="Learning rate")
    parser.add_argument("--use_flash_attention", action="store_true", help="Enable Flash Attention 2")
    args = parser.parse_args()

    print(f"🚀 Starting Efficient Training for {args.model_name}")

    # 1. Quantization Config (4-bit QLoRA)
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.float16,
        bnb_4bit_use_double_quant=True,
    )

    # 2. Load Base Model
    model = AutoModelForCausalLM.from_pretrained(
        args.model_name,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=True,
        attn_implementation="flash_attention_2" if args.use_flash_attention else "eager"
    )
    model.config.use_cache = False
    model.config.pretraining_tp = 1
    
    # Prepare for k-bit training
    model = prepare_model_for_kbit_training(model)

    # 3. LoRA Adapters Config
    peft_config = LoraConfig(
        lora_alpha=16,
        lora_dropout=0.1,
        r=64,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=[
            "q_proj",
            "k_proj",
            "v_proj",
            "o_proj",
            "gate_proj",
            "up_proj",
            "down_proj",
        ],
    )
    
    model = get_peft_model(model, peft_config)
    model.print_trainable_parameters()

    # 4. Tokenizer
    tokenizer = AutoTokenizer.from_pretrained(args.model_name, trust_remote_code=True)
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"

    # 5. Load Dataset
    dataset = load_dataset("json", data_files=args.data_path, split="train")
    print(f"📚 Loaded {len(dataset)} examples")

    # 6. Training Arguments
    training_args = TrainingArguments(
        output_dir=args.output_dir,
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch_size,
        gradient_accumulation_steps=args.grad_acc,
        optim="paged_adamw_32bit",
        save_steps=100,
        logging_steps=10,
        learning_rate=args.lr,
        weight_decay=0.001,
        fp16=True,
        bf16=False,
        max_grad_norm=0.3,
        max_steps=-1,
        warmup_ratio=0.03,
        group_by_length=True,
        lr_scheduler_type="constant",
        report_to="tensorboard"
    )

    # 7. Trainer
    trainer = SFTTrainer(
        model=model,
        train_dataset=dataset,
        peft_config=peft_config,
        dataset_text_field="text", # Assumes 'text' field in JSONL
        max_seq_length=2048,
        tokenizer=tokenizer,
        args=training_args,
        packing=False,
    )

    # 8. Train
    print("🔥 Training Started...")
    trainer.train()

    # 9. Save
    print("💾 Saving Model...")
    trainer.model.save_pretrained(args.output_dir)
    tokenizer.save_pretrained(args.output_dir)
    print("✅ Training Complete!")

if __name__ == "__main__":
    main()
