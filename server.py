import os
import time
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from inference.model_manager import model_manager, MODELS_REGISTRY

app = FastAPI(
    title="SarcasmAI Multi-Model Inference API",
    description="Production FastAPI service for 5-Model NLP Sarcasm Detection (TF-IDF, RNN, LSTM, BERT, RoBERTa)",
    version="2.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    text: str = Field(..., description="Message text to analyze for sarcasm", min_length=1, max_length=1000)
    model: str = Field(default="roberta", description="Target model identifier: tfidf, rnn, lstm, bert, roberta")

class PredictAllRequest(BaseModel):
    text: str = Field(..., description="Message text to analyze across all 5 models", min_length=1, max_length=1000)

class PredictResponse(BaseModel):
    text: str
    model: str
    model_name: str
    prediction: str
    sarcasm_score: float
    confidence: float
    sarcasm_type: Optional[str] = None
    inference_time_ms: int
    mode: str = "Local"

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "SarcasmAI 5-Model Inference Engine",
        "supported_models": list(MODELS_REGISTRY.keys()),
        "endpoints": {
            "predict": "POST /predict",
            "predict_all": "POST /predict/all",
            "models": "GET /models",
            "metrics": "GET /metrics",
            "health": "GET /health"
        }
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "models_available": list(MODELS_REGISTRY.keys()),
        "cached_models": list(model_manager._instances.keys())
    }

@app.get("/models")
def get_models():
    """Return list of supported models with metadata."""
    return model_manager.get_available_models()

@app.get("/metrics")
def get_metrics():
    """Return evaluation metrics (accuracy, precision, recall, f1, latency) for all 5 models."""
    return model_manager.get_metrics()

@app.post("/predict", response_model=PredictResponse)
def predict(request: PredictRequest):
    text = request.text.strip() if request.text else ""
    if not text:
        raise HTTPException(status_code=400, detail="Please enter some text.")

    model_id = request.model.lower().strip()
    if model_id not in MODELS_REGISTRY:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid model '{model_id}'. Supported models are: {list(MODELS_REGISTRY.keys())}"
        )

    try:
        res = model_manager.predict(text, model_id)
        return PredictResponse(
            text=res["text"],
            model=res["model"],
            model_name=res["model_name"],
            prediction=res["prediction"],
            sarcasm_score=res["sarcasm_score"],
            confidence=res["confidence"],
            sarcasm_type=res.get("sarcasm_type"),
            inference_time_ms=res["inference_time_ms"],
            mode="Local"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error with model '{model_id}': {str(e)}")

@app.post("/predict/all")
def predict_all(request: PredictAllRequest):
    text = request.text.strip() if request.text else ""
    if not text:
        raise HTTPException(status_code=400, detail="Please enter some text.")

    try:
        results = model_manager.predict_all(text)
        return {
            "text": text,
            "total_models": len(results),
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparative inference error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    print("Starting SarcasmAI 5-Model FastAPI server on http://127.0.0.1:8000 ...")
    uvicorn.run(app, host="127.0.0.1", port=8000)
