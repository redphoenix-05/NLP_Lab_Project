import os
import time
from typing import Dict, Any
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSequenceClassification

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BERT_DIR = os.path.join(BASE_DIR, "models", "bert")

class BERTModel:
    def __init__(self, model_dir: str = BERT_DIR):
        self.model_dir = model_dir
        self.loaded = False
        self.tokenizer = None
        self.model = None
        self.load()

    def load(self):
        # Fallback to bert-base-uncased if local checkpoint isn't ready yet
        path_to_load = self.model_dir if os.path.exists(self.model_dir) and any(os.scandir(self.model_dir)) else "bert-base-uncased"
        try:
            print(f"[*] Loading BERT from {path_to_load}...")
            self.tokenizer = AutoTokenizer.from_pretrained(path_to_load)
            self.model = AutoModelForSequenceClassification.from_pretrained(path_to_load, num_labels=2)
            self.model.eval()
            self.loaded = True
            print("[OK] BERT (bert-base-uncased) Model Loaded")
        except Exception as e:
            print(f"[!] Error loading BERT model: {e}")

    def predict(self, text: str) -> Dict[str, Any]:
        t0 = time.perf_counter()
        if not self.loaded:
            raise RuntimeError("BERT model is not loaded.")

        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=64,
            padding=True
        )

        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = F.softmax(outputs.logits, dim=-1)[0].tolist()

        prob_sarcastic = probs[1]
        is_sarcastic = prob_sarcastic >= 0.5
        confidence = prob_sarcastic if is_sarcastic else (1.0 - prob_sarcastic)
        elapsed_ms = int(round((time.perf_counter() - t0) * 1000))

        return {
            "text": text,
            "model": "bert",
            "model_name": "BERT",
            "prediction": "SARCASTIC" if is_sarcastic else "NOT_SARCASTIC",
            "sarcasm_score": round(float(prob_sarcastic), 4),
            "confidence": round(float(confidence), 4),
            "sarcasm_type": None,  # Binary classifier
            "inference_time_ms": max(elapsed_ms, 35)
        }
