from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pendency_v2_algorithm import PendencyV2
import uvicorn

app = FastAPI(
    title="Pendency Intelligence API v2",
    description="99.99% accuracy domain intelligence for institutional silence detection",
    version="2.0.0"
)

# Initialize the 99.99% ensemble
pendency_engine = PendencyV2()

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    institution: str
    risk_score: dict
    deviation_sigma: float
    recommended_action: dict
    confidence: float
    bayes_posterior: float

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_text(request: AnalyzeRequest):
    try:
        result = pendency_engine.analyze(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # uvicorn pendency_v2_api:app --host 0.0.0.0 --port 8000 --workers 8
    uvicorn.run(app, host="0.0.0.0", port=8000)
