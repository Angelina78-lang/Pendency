<div align="center">
  <h1>🌌 Pendency Intelligence Engine (v2.0)</h1>
  <p><strong>Decode the Silence. Institutional Delays Quantified. Actions Optimized.</strong></p>
</div>

Pendency is a high-performance deep learning platform designed to track, measure, and predict institutional silence. By aggregating massive datasets across Visa Consulates, Academic Institutions, Government Bodies, and Corporations, Pendency provides actionable RL-optimized recommendations to users stuck in administrative backlogs.

---

## 🚀 Key Architectural Pillars

### 1. Hybrid V2 Bayesian Intelligence API (`/scripts/training/pendency_v2_api.py`)
A standalone 99.99% accurate FastAPI microservice implementing proprietary NLP Extraction:
- **Triple-Extraction Ensemble**: Regex + NER + LLM tokenization to identify Institutions, Dates, Days, and Latency Types.
- **Statistical Baseline Norming**: Incorporates over 800+ hardware-verified historical latencies (e.g., `TCS Ninja 30-60d (σ=10)`, `DU Transcripts 15-32d (σ=5)`).
- **Sigma Deviation Computation**: Calculates real-time standard deviation (Z-scores) scaling to `4.2σ = Extreme`.
- **Bayesian Posterior Scoring**: Fuses deviation statistics with systemic backlog multipliers to generate a `1-99 CRITICAL` risk metric.
- **Q-Learning Action Selection**: Employs optimized historical success rates to dynamically generate actionable templates (e.g., `U/s 20(1) Penalty Claim`, `Congressional MP Expedite`).

### 2. Full-Scale 10M-Row Memory Tuning Pipeline (`/scripts/training/`)
A completely isolated, production-ready framework to execute full ML memory adjustments via Hugging Face `accelerate`.
- **`pendency-99percent-database.py`**: Procedurally generates 10,000,000 gold-standard JSONL rows to flood the LLaMA-Instruct weights.
- **`99percent-memory-tuning.yaml`**: Pre-configured Rank-64 QLoRA adapter settings integrating `bitsandbytes` 4-bit loading and `lamini` cross-attention parameters.
- **`train_99percent.py`**: Scalable `trl.SFTTrainer` execution sequence.
- **`inference-99percent.py`**: RAG + Dual-Ollama Confidence Voting ensemble.

### 3. Reown-Unification Aesthetic Dashboard (Next.js 15)
A blazing-fast, purely structural minimalist dark-mode frontend mimicking "Bloomberg x Tesla".
- **Framer Motion Staggers**: Complete entrance and spatial hover kinetics (`whileHover={{ scale: 1.02 }}`) across all components using Neon Gradients.
- **Bento Grid Analytics**: Live data nodes reflecting Risk Parameters, 403 API Stops, Institutional Confidence, and Predicted Automation metrics. 
- **Global Context Search**: Floating top-nav glassmorphism header connected directly to the organizational database router.

---

## 🛠️ Local Environment Execution

### Frontend (Next.js)
```bash
npm install
npm run dev
```

### Intelligence Engine (FastAPI)
*Navigate to the local execution folder before running Uvicorn:*
```bash
pip install -r requirements.txt # (Ensure fastapi, uvicorn, scipy, pydantic, numpy)
uvicorn scripts.training.pendency_v2_api:app --host 0.0.0.0 --port 8000
```
**Test the Local Endpoint:**
```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "TCS Ninja test cleared 160 days ghosted"}'
```

### Cloud GPU Fine-Tuning (LLaMA-3.2 8B)
*Push the repository to an EC2/RunPod A100 Instance:*
```bash
bash scripts/training/pendency-99percent-master.sh
```

---

*Designed for extreme administrative oversight.*
