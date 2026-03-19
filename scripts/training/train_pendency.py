import argparse
import os
import torch
from datasets import load_dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    TrainingArguments,
    logging,
)
from peft import LoraConfig, PeftModel
from trl import SFTTrainer

def train(args):
    # 1. Configuration
    model_name = args.model
    new_model_name = args.output
    
    # QLoRA Config
    bnb_config = BitsAndBytesConfig(
        load_in_4bit=args.bits == 4,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.float16 if args.fp16 else torch.float32,
        bnb_4bit_use_double_quant=False,
        llm_int8_enable_fp32_cpu_offload=True
    )

    # 2. Load Base Model
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        quantization_config=bnb_config,
        device_map="auto",
        trust_remote_code=False
    )
    model.config.use_cache = False
    model.config.pretraining_tp = 1

    # 3. Load Tokenizer
    tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=False)
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"

    # 4. Load Dataset
    dataset = load_dataset("json", data_files=args.data, split="train")

    # 5. LoRA Configuration
    peft_config = LoraConfig(
        lora_alpha=16,
        lora_dropout=0.1,
        r=args.lora_r,
        bias="none",
        task_type="CAUSAL_LM",
    )

    # 6. Training Arguments
    training_params = TrainingArguments(
        output_dir=new_model_name,
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch,
        gradient_accumulation_steps=args.grad_acc,
        optim="paged_adamw_32bit",
        save_steps=25,
        logging_steps=25,
        learning_rate=2e-4,
        weight_decay=0.001,
        fp16=args.fp16,
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
        dataset_text_field="text", # Assumes data is preformatted or we map it
        max_seq_length=None,
        tokenizer=tokenizer,
        args=training_params,
        packing=False,
    )
    
    # Map dataset to prompt format if needed
    # For JSONL with "prompt" and "completion", we typically format it:
    def format_instruction(sample):
        return f"### Instruction:\n{sample['prompt']}\n\n### Response:\n{sample['completion']}"
    
    # We might need to override the dataset if using SFTTrainer directly on raw jsonl
    # Actually SFTTrainer expects a text field. Let's map it.
    formatted_dataset = dataset.map(lambda x: {"text": format_instruction(x)})
    trainer.train_dataset = formatted_dataset

    # 8. Train
    print(f"Starting training for {args.epochs} epochs...")
    trainer.train()

    # 9. Save
    trainer.model.save_pretrained(new_model_name)
    tokenizer.save_pretrained(new_model_name)
    print(f"Model saved to {new_model_name}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pendency AI Training Script")
    parser.add_argument("--model", type=str, default="meta-llama/Llama-3.2-3B", help="Base model architecture")
    parser.add_argument("--data", type=str, required=True, help="Path to JSONL data")
    parser.add_argument("--lora_r", type=int, default=64, help="LoRA rank")
    parser.add_argument("--bits", type=int, default=4, help="Quantization bits (4 or 8)")
    parser.add_argument("--fp16", action="store_true", help="Use FP16")
    parser.add_argument("--batch", type=int, default=4, help="Batch size per device")
    parser.add_argument("--grad_acc", type=int, default=1, help="Gradient accumulation steps")
    parser.add_argument("--epochs", type=int, default=1, help="Number of epochs")
    parser.add_argument("--output", type=str, default="pendency-model-v1", help="Output directory")

    args = parser.parse_args()
    train(args)
