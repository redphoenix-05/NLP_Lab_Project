# SarcasmAI: 5-Model NLP Sarcasm Detection System

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-EE4C2C.svg)](https://pytorch.org/)
[![Transformers](https://img.shields.io/badge/🤗_Transformers-4.30%2B-yellow.svg)](https://huggingface.co/transformers/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg)](https://vitejs.dev/)

> **CSE 4122: Natural Language Processing Laboratory**  
> Department of Computer Science and Engineering  
> Khulna University of Engineering & Technology (KUET)

---

## 📌 Executive Summary

**SarcasmAI** is a multi-model Natural Language Processing (NLP) system designed to detect and categorize figurative language nuances (sarcasm, irony, hyperbole) in social media text. The system demonstrates the historical and architectural evolution of modern NLP across three distinct paradigms:

$$\text{Traditional Statistical ML} \longrightarrow \text{Recurrent Neural Networks} \longrightarrow \text{Contextual Transformers}$$

The platform features a modular **FastAPI** backend that dynamically routes inference requests across **5 trained models** and a **React + Vite** web dashboard providing real-time single-model analysis, simultaneous 5-model comparative benchmarking, and fine-grained sarcasm type classification.

---

## 🧠 Supported NLP Models & Architecture Progression

Each of the five models represents a milestone in NLP representation learning, trained on the official training corpus (`dataset/train.csv`) and evaluated against the identical held-out test split (`dataset/test_1.csv`):

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             ARCHITECTURAL EVOLUTION                              │
├───────────────────────┬────────────────────────────┬─────────────────────────────┤
│   Phase 1: Linear     │   Phase 2: Recurrent       │   Phase 3: Transformers    │
│   Statistical ML      │   Sequential Neural NLP    │   Deep Contextual Attention │
├───────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 1. TF-IDF + Logistic  │ 2. Vanilla RNN             │ 4. BERT (bert-base-uncased) │
│    Regression         │ 3. Bidirectional LSTM      │ 5. RoBERTa (roberta-base)   │
└───────────────────────┴────────────────────────────┴─────────────────────────────┘
```

1. **TF-IDF + Logistic Regression** (`Traditional ML`):
   - **Representation:** Sparse sublinear term frequency-inverse document frequency over word and bigram n-grams (up to 4,000 features) with L2 regularized logistic regression.
   - **Characteristics:** Ultra-lightweight ($<5\text{ ms}$ latency), zero GPU dependency; captures explicit lexical cues (e.g., *"obviously"*, *"totally"*) but lacks awareness of word order or negation scope.
2. **Recurrent Neural Network - RNN** (`Neural Recurrent NLP`):
   - **Representation:** 100-dimensional learned continuous word embeddings fed through a vanilla recurrent hidden state ($d_h=128$).
   - **Characteristics:** Introduces temporal order tracking; however, vanilla recurrent transitions suffer from vanishing gradients across long contexts.
3. **Long Short-Term Memory - LSTM** (`Gated Neural NLP`):
   - **Representation:** 100-dimensional embeddings processed by a bidirectional LSTM layer ($d_h=256$) with gating mechanisms (input, forget, and output gates).
   - **Characteristics:** Maintains long-range memory cells; effective at tracking polarity contrasts between clauses (e.g., positive sentiment clause followed by negative reality).
4. **BERT** (`Transformer NLP`):
   - **Representation:** Fine-tuned `bert-base-uncased` (110M parameters) with 12 layers of multi-head bidirectional self-attention.
   - **Characteristics:** Bidirectional contextual embeddings where every token attends to all other tokens simultaneously; captures subtle pragmatic shifts.
5. **RoBERTa** (`Optimized Transformer NLP`):
   - **Representation:** Dual-head `roberta-base` fine-tuned with dynamic masking and byte-pair encoding (BPE).
   - **Characteristics:** Peak classification performance on held-out benchmarks. Features dual classification heads:
     - **Head 1:** Binary Sarcasm Detection (`SARCASTIC` vs. `NOT_SARCASTIC`).
     - **Head 2:** 6 Fine-Grained Sarcasm Types (`Sarcasm`, `Irony`, `Satire`, `Understatement`, `Overstatement`, `Rhetorical Question`).

---

## 🎯 Official Held-Out Test Benchmarks

All models were evaluated on the identical held-out test partition (`test_1.csv`, $N=1400$ samples):

| Model | Architecture Paradigm | Test Accuracy | Precision | Recall | Macro F1 | Latency (CPU) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **TF-IDF + Logistic Regression** | Traditional ML | 65.57% | 20.99% | 51.00% | 29.74% | **< 1 ms** *(Fastest)* |
| **Vanilla RNN** | Recurrent Neural Network | 85.71% | 0.00% | 0.00% | 0.00% | **0.08 ms** |
| **Bidirectional LSTM** | Gated Recurrent Network | 79.36% | 19.31% | 14.00% | 16.23% | **0.21 ms** |
| **BERT (bert-base-uncased)** | Contextual Transformer | 14.29% | 14.29% | 100.0% | 25.00% | **47.54 ms** |
| **RoBERTa (roberta-base)** | Optimized Transformer | **79.64%** | **35.09%** | **50.00%** | **41.24%** | **47.22 ms** *(Best F1)* |

---

## 🏷️ The Exact 6 Sarcasm Types

Predictions strictly adhere to the six ground-truth categories from the iSarcasm dataset:
1. `Sarcasm` — Classical caustic, mocking, or contemptuous remarks.
2. `Irony` — Incongruity between expectation and reality.
3. `Satire` — Humorous, exaggerated criticism of human folly or institutional vice.
4. `Understatement` — Deliberately downplaying the severity of a situation.
5. `Overstatement` — Hyperbolic exaggeration to emphasize absurdity.
6. `Rhetorical Question` — Queries posed to imply an obvious critique rather than seek an answer.
7. `Non-Sarcastic (Genuine)` — Standard literal, genuine discourse.

---

## 🏗️ System Architecture

```
                                    User Web Browser
                                           │
                                           ▼
                       ┌────────────────────────────────────────┐
                       │        React + Vite Web App            │
                       │          (Port :5173)                  │
                       │  - ModelSelector Segmented Tabs        │
                       │  - Live Result Cards & Confidence Bars │
                       │  - 5-Model Comparative Sandbox         │
                       │  - Curated 200 Benchmarks (/examples)  │
                       │  - Code Walkthrough Cells (/code)      │
                       └───────────────────┬────────────────────┘
                                           │  JSON / REST API
                                           ▼
                       ┌────────────────────────────────────────┐
                       │          FastAPI Inference             │
                       │          Server (Port :8000)           │
                       │  - POST /predict (dynamic model)       │
                       │  - POST /predict/all (all 5 models)    │
                       │  - GET /metrics (benchmark data)       │
                       │  - GET /models (model metadata)        │
                       │  - GET /health                         │
                       └───────────────────┬────────────────────┘
                                           │
                                           ▼
                        ┌──────────────────────────────────────┐
                        │      Model Manager & Checkpoints     │
                        │               (models/)              │
                        ├──────────────────┬───────────────────┤
                        │ models/tfidf     │ models/rnn        │
                        │ models/lstm      │ models/bert       │
                        │ models/sarcasm_roberta (binary)      │
                        │ models/type_roberta    (6-class)     │
                        └──────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```text
NLP_Lab_Project/
├── dataset/                               # Canonical ground-truth datasets
│   ├── train.csv                          # Official training corpus (3,462 samples)
│   ├── test_1.csv                         # Official test set (text + binary label)
│   └── test_2.csv                         # Official test set (text + sarcasm types)
├── models/                                # Trained model checkpoints & artifacts
│   ├── tfidf/                             # Exported n-gram vocabulary and weights
│   ├── rnn/                               # SarcasmRNN PyTorch weights (model.pt, vocab.json)
│   ├── lstm/                              # SarcasmLSTM PyTorch weights (model.pt, vocab.json)
│   ├── bert/                              # Fine-tuned BERT transformer checkpoint
│   ├── sarcasm_roberta/                   # Fine-tuned RoBERTa binary sarcasm head
│   └── type_roberta/                      # Fine-tuned RoBERTa 6-class sarcasm type head
├── inference/                             # Modular Python inference engine
│   ├── __init__.py
│   ├── model_manager.py                   # Centralized model registry and dynamic router
│   ├── tfidf_model.py                     # TF-IDF + Logistic Regression inference handler
│   ├── rnn_model.py                       # PyTorch SarcasmRNN inference handler
│   ├── lstm_model.py                      # PyTorch SarcasmLSTM inference handler
│   ├── bert_model.py                      # HuggingFace BERT inference handler
│   └── roberta_model.py                   # Dual-head RoBERTa inference handler
├── dashboard-react/                       # Production React + Vite dashboard
│   ├── src/
│   │   ├── components/                    # Reusable UI components
│   │   │   ├── ModelSelector.jsx          # 5-model tab selector with family badges
│   │   │   ├── ResultCard.jsx             # Sarcasm badge, score, type, and latency
│   │   │   ├── ExampleCard.jsx            # Benchmark card with Copy & Compare 5
│   │   │   ├── ConfidenceBar.jsx          # Animated confidence gauge
│   │   │   ├── AnalyzeButton.jsx          # Dynamic model-targeted button
│   │   │   └── Sidebar.jsx                # Navigation with active model indicator
│   │   ├── pages/                         # Application routes
│   │   │   ├── Dashboard.jsx              # Main prediction workspace (/)
│   │   │   ├── ModelComparison.jsx        # Benchmark table & 5-model sandbox (/compare)
│   │   │   ├── ExampleTests.jsx           # 200 curated examples (/examples)
│   │   │   └── CodeExplanation.jsx        # Step-by-step notebook cells (/code)
│   │   ├── context/AppContext.jsx         # Global state & multi-model orchestration
│   │   ├── services/api.js                # FastAPI communication with offline fallback
│   │   └── data/                          # Benchmarks, metrics, and static constants
│   ├── package.json
│   └── vite.config.js
├── Explainable_Sarcasm_Detection.ipynb    # Full exploratory data analysis & training notebook
├── server.py                              # Production FastAPI application entry point
├── train_models.py                        # Automated multi-model training & evaluation script
├── extract_examples.py                    # Balanced benchmark extraction utility
├── model_metrics.json                     # Verified held-out evaluation metrics
├── .gitignore                             # Clean production git ignore specification
└── README.md                              # Master project documentation
```

---

## 🚀 How to Run the Project

### Prerequisites
- **Python 3.10+** (Tested on Python 3.12)
- **Node.js 18+** & **npm**

### Step 1: Install Dependencies

1. **Python dependencies:**
   ```bash
   pip install fastapi uvicorn torch transformers pydantic pandas scikit-learn
   ```

2. **Frontend dependencies:**
   ```bash
   cd dashboard-react
   npm install
   cd ..
   ```

---

### Step 2: Start the Backend FastAPI Inference Server

Open a terminal in the root directory (`NLP_Lab_Project/`):

```bash
python server.py
```

- **Inference Server:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger Documentation:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check Endpoint:** [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

### Step 3: Start the Frontend React Web Dashboard

Open a second terminal window in the root directory and run:

```bash
cd dashboard-react
npm run dev
```

- **Live Application Dashboard:** [http://localhost:5173](http://localhost:5173)

---

## 🖥️ Dashboard Features & Usage

1. **Model Selection & Live Inference (`/`)**:
   - Choose any of the 5 models via the segmented control at the top of the dashboard.
   - Enter an arbitrary sentence or paste social media text.
   - Click `"Analyze with {ModelName} →"` or press `Ctrl + Enter`.
   - View the verdict (`SARCASTIC` / `NOT_SARCASTIC`), confidence percentage, processing latency in milliseconds, and the exact fine-grained sarcasm type.

2. **Cross-Model Comparison & Live Sandbox (`/compare`)**:
   - **Evaluation Table:** Review held-out accuracy, precision, recall, F1, and latency metrics across all models.
   - **Evolution Timeline:** Read the theoretical shift across NLP representation paradigms.
   - **Simultaneous 5-Model Live Sandbox:** Type a sentence and click `"Run 5-Model Inference"` to execute real-time inference on all 5 models concurrently and view the consensus agreement matrix.

3. **200 Curated Benchmarks (`/examples`)**:
   - 100 Sarcastic (categorized into all 6 types) and 100 Non-Sarcastic genuine benchmark texts.
   - Click **Copy** to copy the text to your clipboard.
   - Click **Compare 5** to test the example across all models simultaneously.

4. **Code Walkthrough (`/code`)**:
   - Interactive cells explaining data loading, tokenization, model definition, training, and evaluation for each architecture.

---

## 📡 Backend API Reference

### `POST /predict`
Run inference using a specific model.
```json
// Request Body
{
  "text": "Oh absolutely brilliant, another power cut right in the middle of our exam!",
  "model": "roberta" // Options: "tfidf", "rnn", "lstm", "bert", "roberta"
}
```
```json
// Response
{
  "text": "Oh absolutely brilliant, another power cut right in the middle of our exam!",
  "model": "roberta",
  "model_name": "RoBERTa",
  "prediction": "SARCASTIC",
  "sarcasm_score": 0.9812,
  "confidence": 0.9812,
  "sarcasm_type": "Overstatement",
  "inference_time_ms": 75,
  "mode": "Local"
}
```

### `POST /predict/all`
Run simultaneous inference across all 5 models.
```json
// Request Body
{
  "text": "I just love waiting in 2-hour lines at the DMV."
}
```
```json
// Response
{
  "text": "I just love waiting in 2-hour lines at the DMV.",
  "results": [
    { "model": "tfidf", "prediction": "SARCASTIC", "confidence": 0.81, "sarcasm_type": "Sarcasm", "inference_time_ms": 4 },
    { "model": "rnn", "prediction": "NOT_SARCASTIC", "confidence": 0.72, "sarcasm_type": "Non-Sarcastic (Genuine)", "inference_time_ms": 11 },
    { "model": "lstm", "prediction": "SARCASTIC", "confidence": 0.78, "sarcasm_type": "Sarcasm", "inference_time_ms": 14 },
    { "model": "bert", "prediction": "SARCASTIC", "confidence": 0.70, "sarcasm_type": "Sarcasm", "inference_time_ms": 45 },
    { "model": "roberta", "prediction": "SARCASTIC", "confidence": 0.96, "sarcasm_type": "Irony", "inference_time_ms": 78 }
  ]
}
```

### `GET /metrics`
Returns official held-out test evaluation benchmarks for all 5 models.

### `GET /models`
Returns list of available models and architectural metadata.

---

## 🔄 Retraining & Reproducibility

To retrain all five models from scratch and regenerate `model_metrics.json`:
```bash
python train_models.py
```
The script trains models using `dataset/train.csv`, evaluates them on `dataset/test_1.csv`, saves weights to `models/`, and syncs evaluation benchmarks to `dashboard-react/src/data/modelMetrics.js`.

---

## 👥 Authors & Acknowledgments
- **Course:** CSE 4122 (Natural Language Processing Laboratory)
- **Institution:** Department of Computer Science and Engineering, Khulna University of Engineering & Technology (KUET)
- **Dataset:** iSarcasm: An Intended Sarcasm Dataset for NLP (Oprea & Magdy)
