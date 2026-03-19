
# Run Pendency Global Training (Llama 3.2 3B)
Write-Host "🚀 Starting Pendency AI Training (Global 50K Dataset)..." -ForegroundColor Cyan

# Define variables
$MODEL_NAME = "microsoft/Phi-3-mini-4k-instruct"
$DATA_PATH = "data/pendency-global.jsonl"
$OUTPUT_DIR = "pendency-phi3-prod-v1"

# Check if data exists
if (-not (Test-Path $DATA_PATH)) {
    Write-Error "❌ Data file not found: $DATA_PATH"
    exit 1
}

# Run Accelerate Launch
Write-Host "⚡ Launching Training Pipeline..." -ForegroundColor Yellow
py -m accelerate.commands.launch scripts/training/train_pendency.py `
    --model $MODEL_NAME `
    --data $DATA_PATH `
    --lora_r 16 `
    --bits 4 `
    --fp16 `
    --batch 1 `
    --grad_acc 16 `
    --epochs 5 `
    --output $OUTPUT_DIR

Write-Host "✅ Training Complete! Model saved to $OUTPUT_DIR" -ForegroundColor Green
Pause
