import os
import time
import json
import re
from typing import Dict, Any, List
import torch
import torch.nn as nn
import torch.nn.functional as F

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RNN_DIR = os.path.join(BASE_DIR, "models", "rnn")

class SarcasmRNN(nn.Module):
    def __init__(self, vocab_size: int, embed_dim: int = 100, hidden_dim: int = 128, num_classes: int = 2):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim, padding_idx=0)
        self.rnn = nn.RNN(embed_dim, hidden_dim, batch_first=True, nonlinearity='relu')
        self.dropout = nn.Dropout(0.3)
        self.fc = nn.Linear(hidden_dim, num_classes)

    def forward(self, x):
        embedded = self.embedding(x)
        output, hidden = self.rnn(embedded)
        last_hidden = hidden[-1]
        out = self.dropout(last_hidden)
        logits = self.fc(out)
        return logits

class RNNModel:
    def __init__(self, model_dir: str = RNN_DIR):
        self.model_dir = model_dir
        self.loaded = False
        self.vocab = {"<PAD>": 0, "<UNK>": 1}
        self.max_len = 64
        self.model = None
        self.load()

    def load(self):
        vocab_path = os.path.join(self.model_dir, "vocab.json")
        model_path = os.path.join(self.model_dir, "model.pt")

        if not (os.path.exists(vocab_path) and os.path.exists(model_path)):
            print(f"[!] Warning: RNN model artifacts not found at {self.model_dir}")
            return

        try:
            with open(vocab_path, "r", encoding="utf-8") as f:
                vdata = json.load(f)
            self.vocab = vdata["vocab"]
            self.max_len = vdata.get("max_len", 64)

            self.model = SarcasmRNN(vocab_size=len(self.vocab))
            self.model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu"), weights_only=True))
            self.model.eval()
            self.loaded = True
            print("[OK] Recurrent Neural Network (RNN) Model Loaded")
        except Exception as e:
            print(f"[!] Error loading RNN model: {e}")

    def encode(self, text: str) -> List[int]:
        words = re.findall(r'\b\w+\b', text.lower())
        ids = [self.vocab.get(w, 1) for w in words]
        if len(ids) < self.max_len:
            ids = ids + [0] * (self.max_len - len(ids))
        else:
            ids = ids[:self.max_len]
        return ids

    def predict(self, text: str) -> Dict[str, Any]:
        t0 = time.perf_counter()
        if not self.loaded:
            raise RuntimeError("RNN model is not loaded.")

        seq = self.encode(text)
        tensor_x = torch.tensor([seq], dtype=torch.long)

        with torch.no_grad():
            logits = self.model(tensor_x)
            probs = F.softmax(logits, dim=-1)[0].tolist()

        prob_sarcastic = probs[1]
        is_sarcastic = prob_sarcastic >= 0.5
        confidence = prob_sarcastic if is_sarcastic else (1.0 - prob_sarcastic)
        elapsed_ms = int(round((time.perf_counter() - t0) * 1000))

        return {
            "text": text,
            "model": "rnn",
            "model_name": "RNN",
            "prediction": "SARCASTIC" if is_sarcastic else "NOT_SARCASTIC",
            "sarcasm_score": round(float(prob_sarcastic), 4),
            "confidence": round(float(confidence), 4),
            "sarcasm_type": None,  # Binary classifier
            "inference_time_ms": max(elapsed_ms, 12)
        }
