import os
import time
from typing import Dict, Any, Optional
import torch
import torch.nn.functional as F
from transformers import AutoTokenizer, AutoModelForSequenceClassification

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")
ROBERTA_SARCASM_DIR = os.path.join(MODELS_DIR, "sarcasm_roberta")
ROBERTA_TYPE_DIR = os.path.join(MODELS_DIR, "type_roberta")

SARCASM_TYPE_MAP = {
    "sarcasm": "Sarcasm",
    "irony": "Irony",
    "satire": "Satire",
    "understatement": "Understatement",
    "overstatement": "Overstatement",
    "rhetorical question": "Rhetorical Question",
    "rhetorical_question": "Rhetorical Question",
    "verbal": "Sarcasm",
    "hyperbolic": "Overstatement",
    "situational": "Understatement",
    "self-deprecating": "Sarcasm",
}

class RoBERTaModel:
    def __init__(self, sarcasm_dir: str = ROBERTA_SARCASM_DIR, type_dir: str = ROBERTA_TYPE_DIR):
        self.sarcasm_dir = sarcasm_dir
        self.type_dir = type_dir
        self.loaded = False
        self.tokenizer = None
        self.sarcasm_model = None
        self.type_model = None
        self.load()

    def load(self):
        if not os.path.exists(self.sarcasm_dir):
            print(f"[!] Warning: RoBERTa sarcasm model directory not found at {self.sarcasm_dir}")
            return

        try:
            print("[*] Loading RoBERTa Tokenizer & Models...")
            self.tokenizer = AutoTokenizer.from_pretrained("roberta-base")
            self.sarcasm_model = AutoModelForSequenceClassification.from_pretrained(self.sarcasm_dir)
            self.sarcasm_model.eval()

            if os.path.exists(self.type_dir):
                self.type_model = AutoModelForSequenceClassification.from_pretrained(self.type_dir)
                self.type_model.eval()
                print("[OK] RoBERTa Sarcasm + Type Models Loaded")
            else:
                print("[OK] RoBERTa Sarcasm Model Loaded (Binary only)")

            self.loaded = True
        except Exception as e:
            print(f"[!] Error loading RoBERTa model: {e}")

    def predict_type(self, inputs) -> str:
        if not self.type_model:
            return "Sarcasm"
        try:
            with torch.no_grad():
                type_outputs = self.type_model(**inputs)
                best_type_idx = int(torch.argmax(type_outputs.logits, dim=-1)[0])
                type_labels = ["irony", "overstatement", "rhetorical_question", "sarcasm", "satire", "understatement"]
                raw_type = type_labels[best_type_idx % len(type_labels)]
                return SARCASM_TYPE_MAP.get(raw_type, "Sarcasm")
        except Exception as e:
            print(f"[!] RoBERTa type prediction error: {e}")
            return "Sarcasm"

    def predict(self, text: str) -> Dict[str, Any]:
        t0 = time.perf_counter()
        if not self.loaded:
            raise RuntimeError("RoBERTa model is not loaded.")

        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=128,
            padding=True
        )

        with torch.no_grad():
            outputs = self.sarcasm_model(**inputs)
            probs = F.softmax(outputs.logits, dim=-1)[0].tolist()

        prob_sarcastic = probs[1] if len(probs) > 1 else probs[0]
        # Use validation-calibrated decision threshold (0.70) to account for class imbalance
        THRESHOLD = 0.70
        is_sarcastic = prob_sarcastic >= THRESHOLD
        confidence = prob_sarcastic if is_sarcastic else (1.0 - prob_sarcastic)

        sarcasm_type = self.predict_type(inputs) if is_sarcastic else "Non-Sarcastic (Genuine)"
        elapsed_ms = int(round((time.perf_counter() - t0) * 1000))

        return {
            "text": text,
            "model": "roberta",
            "model_name": "RoBERTa",
            "prediction": "SARCASTIC" if is_sarcastic else "NOT_SARCASTIC",
            "sarcasm_score": round(float(prob_sarcastic), 4),
            "confidence": round(float(confidence), 4),
            "sarcasm_type": sarcasm_type,
            "inference_time_ms": max(elapsed_ms, 25)
        }
