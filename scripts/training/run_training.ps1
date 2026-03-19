# Pendency AI Training Runner
Param(
    [string]$DataPath = "../../data/pendency-global.jsonl",
    [string]$Model = "meta-llama/Llama-2-7b-chat-hf"
)

Write-Host "🚀 Initializing Pendency Training Pipeline..." -ForegroundColor Cyan

# 1. Preprocess Data (Active Learning)
$CleanDataPath = "data/pendency-active-10pct.jsonl"
Write-Host "Create 'data' dir if missing..."
if (!(Test-Path "data")) { mkdir "data" }

Write-Host "🔬 Running Active Learning Preprocessing..." -ForegroundColor Yellow
& "C:\Program Files\Python311\python.exe" scripts/training/preprocess_active_learning.py --input $DataPath --output $CleanDataPath --keep_ratio 0.1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Preprocessing failed. Checking if source data exists." -ForegroundColor Red
    exit 1
}

# 2. Run Training
Write-Host "🔥 Launching QLoRA Training..." -ForegroundColor Green

# Use full python path to invoke accelerate module
& "C:\Users\LENOVO\AppData\Roaming\Python\Python311\Scripts\accelerate.exe" launch scripts/training/train_efficient.py `
    --model_name $Model `
    --output_dir "./models/pendency-v1"

Write-Host "✅ Pipeline Complete!" -ForegroundColor Cyan
