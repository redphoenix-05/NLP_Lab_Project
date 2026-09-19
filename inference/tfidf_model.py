import os
import time
import json
import math
import re
from typing import Dict, Any, List

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRIMARY_STAGE1 = os.path.join(BASE_DIR, "models", "tfidf", "stage1_model.json")
FALLBACK_STAGE1 = os.path.join(BASE_DIR, "kaggle_output", "stage1_model.json")
STAGE1_PATH = PRIMARY_STAGE1 if os.path.exists(PRIMARY_STAGE1) else FALLBACK_STAGE1

class TFIDFModel:
    def __init__(self, model_path: str = STAGE1_PATH):
        self.model_path = model_path
        self.loaded = False
        self.vocab = {}
        self.idf = []
        self.coef = []
        self.intercept = 0.0
        self.ngram_max = 2
        self.load()

    def load(self):
        if not os.path.exists(self.model_path):
            print(f"[!] Warning: TF-IDF model file not found at {self.model_path}")
            return
        try:
            with open(self.model_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            self.vocab = data["vocab"]
            self.idf = data["idf"]
            self.coef = data["coef"]
            self.intercept = data["intercept"]
            self.ngram_max = data.get("ngram_max", 2)
            self.loaded = True
            print("[OK] TF-IDF + Logistic Regression Model Loaded")
        except Exception as e:
            print(f"[!] Error loading TF-IDF model: {e}")

    def clean_text(self, text: str) -> str:
        text = text.lower()
        text = re.sub(r'https?://\S+|www\.\S+', '', text)
        text = re.sub(r'@[A-Za-z0-9_]+', '', text)
        text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
        text = re.sub(r'[^a-zA-Z0-9\s.,!?\'"-]', '', text)
        return text.strip()

    def tokenize_ngrams(self, text: str) -> List[str]:
        words = text.split()
        tokens = list(words)
        if self.ngram_max >= 2:
            for i in range(len(words) - 1):
                tokens.append(f"{words[i]} {words[i+1]}")
        return tokens

    def predict(self, text: str) -> Dict[str, Any]:
        t0 = time.perf_counter()
        if not self.loaded:
            raise RuntimeError("TF-IDF model is not loaded.")

        cleaned = self.clean_text(text)
        tokens = self.tokenize_ngrams(cleaned)

        tf = {}
        for tok in tokens:
            if tok in self.vocab:
                idx = self.vocab[tok]
                tf[idx] = tf.get(idx, 0) + 1

        if not tf:
            prob = 1.0 / (1.0 + math.exp(-self.intercept))
        else:
            sum_sq = 0.0
            vec = {}
            for idx, count in tf.items():
                val = count * self.idf[idx]
                vec[idx] = val
                sum_sq += val * val
            norm = math.sqrt(sum_sq) if sum_sq > 0 else 1.0
            score = self.intercept
            for idx, val in vec.items():
                score += (val / norm) * self.coef[idx]
            prob = 1.0 / (1.0 + math.exp(-max(min(score, 25.0), -25.0)))

        is_sarcastic = prob >= 0.5
        confidence = prob if is_sarcastic else (1.0 - prob)
        elapsed_ms = int(round((time.perf_counter() - t0) * 1000))

        return {
            "text": text,
            "model": "tfidf",
            "model_name": "TF-IDF + Logistic Regression",
            "prediction": "SARCASTIC" if is_sarcastic else "NOT_SARCASTIC",
            "sarcasm_score": round(float(prob), 4),
            "confidence": round(float(confidence), 4),
            "sarcasm_type": None,  # Binary model
            "inference_time_ms": max(elapsed_ms, 5)
        }
