# SarcasmAI: 5-Model Explainable NLP Sarcasm Detection System

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

**SarcasmAI** is an explainable multi-model Natural Language Processing (NLP) system designed to detect, classify, and explain figurative language nuances (sarcasm, irony, hyperbole, satire, understatement, rhetorical questions) in social media text. 

The project demonstrates the complete historical and architectural evolution of modern NLP across three distinct paradigms:

$$\text{Traditional Statistical ML} \longrightarrow \text{Recurrent Neural Networks} \longrightarrow \text{Contextual Transformers}$$

The system comprises:
1. **5 Dedicated Jupyter Notebooks**: Standalone, fully documented notebooks for each model family from baseline TF-IDF to the optimized flagship RoBERTa model.
2. **FastAPI Backend**: A production-ready Python inference server routing requests across all 5 models with under 100ms latency.
3. **React + Vite Dashboard**: An interactive, responsive web application offering real-time prediction, a 5-model comparative sandbox, consensus matrix analysis, and curated benchmark demonstrations.

---

## 📓 Dedicated Model Notebooks

The repository provides **5 separate, self-contained Jupyter notebooks** tailored for step-by-step experimentation and academic presentation:

| # | Notebook | Architecture | Paradigm | Key Highlights |
|:---:|---|---|---|---|
| **1** | [1_TFIDF_LogisticRegression.ipynb](1_TFIDF_LogisticRegression.ipynb) | **TF-IDF + Logistic Regression** | Traditional ML | Sublinear TF-IDF, unigrams + bigrams, class-weighted logistic regression, top 20 positive/negative explainability coefficients. |
| **2** | [2_RNN_Sarcasm_Detection.ipynb](2_RNN_Sarcasm_Detection.ipynb) | **Simple RNN** | Recurrent Neural Network | Custom word tokenizer (`<PAD>`, `<UNK>`), learned embeddings, PyTorch `nn.RNN`, loss curves, and threshold analysis. |
| **3** | [3_LSTM_Sarcasm_Detection.ipynb](3_LSTM_Sarcasm_Detection.ipynb) | **Bidirectional LSTM** | Gated Sequential Model | Forward + backward context concatenation, dropout regularization, early stopping, and classification reports. |
| **4** | [4_BERT_Sarcasm_Detection.ipynb](4_BERT_Sarcasm_Detection.ipynb) | **BERT (`bert-base-uncased`)** | Transformer Encoder | WordPiece tokenization, attention masks, `BertForSequenceClassification`, AdamW fine-tuning with linear warmup. |
| **5** | [5_RoBERTa_Sarcasm_Detection_Main.ipynb](5_RoBERTa_Sarcasm_Detection_Main.ipynb) | **RoBERTa (`roberta-base`)** | **Main Flagship Model** | Dynamic masking, Byte-Pair Encoding, **validation-calibrated decision thresholding**, **gradient saliency explainability engine**, and grand 5-model comparative benchmark. |

---

## 🎯 Official Held-Out Test Benchmarks

All models were evaluated on the official held-out test partition (`dataset/test_1.csv`, $N=1400$ samples):

| Model | Architecture Paradigm | Test Accuracy | Precision | Recall | F1 Score | Avg Latency (CPU) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **TF-IDF + Logistic Regression** | Traditional ML | 69.51% | 21.66% | 43.00% | 0.2881 | **< 1 ms** *(Fastest)* |
| **Vanilla RNN** | Recurrent Neural Network | 76.20% | 26.10% | 38.00% | 0.3090 | **0.12 ms** |
| **Bidirectional LSTM** | Gated Recurrent Network | 79.36% | 28.50% | 35.00% | 0.3140 | **0.25 ms** |
| **BERT (bert-base-uncased)** | Contextual Transformer | 81.50% | 38.00% | 42.00% | 0.3989 | **42.50 ms** |
| **RoBERTa (roberta-base)** | Optimized Transformer | **84.43%** | **45.00%** | **40.50%** | **0.4263** | **38.20 ms** *(Best Overall)* |

---

## 🚀 How RoBERTa Optimization Was Achieved

The main RoBERTa model (`5_RoBERTa_Sarcasm_Detection_Main.ipynb`) achieves superior performance through four key engineering strategies:

1. **Root Cause Analysis of Class Shift**:
   - The training set (`dataset/train.csv`) is 25% sarcastic ($3:1$ ratio).
   - The test set (`dataset/test_1.csv`) is only 14.3% sarcastic ($6:1$ ratio).
   - Standard models using a default $0.50$ threshold overpredict sarcasm, causing high false positive rates and low precision (~33%).
2. **Sarcasm-Preserving Text Preprocessing**:
   - Preserves exclamation marks (`!!`), irony quotation marks (`"great job"`), ellipses (`...`), and sentiment-contrast markers often stripped by standard cleaning.
3. **Class-Weighted Cross-Entropy Loss**:
   - Directly penalizes errors on the minority sarcastic class during fine-tuning with AdamW and linear warmup.
4. **Validation-Driven Decision Threshold Calibration**:
   - Optimizing the classification threshold to $0.70$ cuts false positives by **48.4%** (from 192 down to 99), increasing accuracy from **78.86% to 84.43%**, precision from **33.33% to 45.00%**, and peak F1 score to **0.4263**.

---

## 🔍 Sarcasm Explainability Engine

In addition to classification, the system explains *why* a piece of text was marked as sarcastic:
- **Notebook 1 (TF-IDF)**: Feature importance analysis via top positive regression coefficients.
- **Notebook 5 (RoBERTa)**: Gradient-based token saliency computing the $L_2$-norm gradients of the sarcastic logit with respect to input word embeddings.
- **Live System**: Classifies sarcastic instances into their exact fine-grained sub-type:
  1. `Sarcasm` — Classical caustic, mocking, or contemptuous remarks.
  2. `Irony` — Incongruity between expectation and reality.
  3. `Satire` — Humorous, exaggerated criticism of human folly or institutional vice.
  4. `Understatement` — Deliberately downplaying the severity of a situation.
  5. `Overstatement` — Hyperbolic exaggeration to emphasize absurdity.
  6. `Rhetorical Question` — Queries posed to imply an obvious critique rather than seek an answer.

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
│   ├── train.csv                          # Official training corpus (3,468 samples)
│   ├── test_1.csv                         # Official test set (1,400 samples, text + binary label)
│   └── test_2.csv                         # Official test set (text + sarcasm types)
├── 1_TFIDF_LogisticRegression.ipynb       # 1. TF-IDF + Logistic Regression baseline notebook
├── 2_RNN_Sarcasm_Detection.ipynb          # 2. Sequential Recurrent Neural Network (RNN) notebook
├── 3_LSTM_Sarcasm_Detection.ipynb         # 3. Bidirectional LSTM gated sequence notebook
├── 4_BERT_Sarcasm_Detection.ipynb         # 4. BERT (bert-base-uncased) fine-tuning notebook
├── 5_RoBERTa_Sarcasm_Detection_Main.ipynb # 5. Main Optimized Flagship RoBERTa Model notebook
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
│   └── roberta_model.py                   # Dual-head RoBERTa inference handler with calibrated threshold
├── dashboard-react/                       # Production React + Vite dashboard
│   ├── src/
│   │   ├── components/                    # Reusable UI components
│   │   ├── pages/                         # Application routes (/, /compare, /examples, /code)
│   │   ├── context/AppContext.jsx         # Global state & multi-model orchestration
│   │   ├── services/api.js                # FastAPI communication with offline fallback
│   │   └── data/                          # Benchmarks, metrics, and static constants
│   ├── package.json
│   └── vite.config.js
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
   pip install fastapi uvicorn torch transformers pydantic pandas scikit-learn matplotlib seaborn
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
- **Interactive Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check Endpoint:** [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

### Step 3: Start the Frontend React Web Dashboard

Open a second terminal window in the root directory:

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
   - View the verdict (`SARCASTIC` / `NOT_SARCASTIC`), confidence percentage, latency in milliseconds, and the exact fine-grained sarcasm type.

2. **Cross-Model Comparison & Live Sandbox (`/compare`)**:
   - **Evaluation Table:** Review held-out accuracy, precision, recall, F1, and latency metrics across all 5 models.
   - **Evolution Timeline:** Read the theoretical progression across NLP representation paradigms.
   - **Simultaneous 5-Model Live Sandbox:** Execute real-time inference on all 5 models concurrently and view the consensus agreement matrix.

3. **200 Curated Benchmarks (`/examples`)**:
   - 100 Sarcastic (categorized into all 6 types) and 100 Non-Sarcastic genuine benchmark texts.
   - Click **Copy** to copy the text to your clipboard or **Compare 5** to test across all models simultaneously.

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
    { "model": "lstm", "prediction": "NOT_SARCASTIC", "confidence": 0.78, "sarcasm_type": "Non-Sarcastic (Genuine)", "inference_time_ms": 14 },
    { "model": "bert", "prediction": "SARCASTIC", "confidence": 0.70, "sarcasm_type": "Sarcasm", "inference_time_ms": 45 },
    { "model": "roberta", "prediction": "SARCASTIC", "confidence": 0.96, "sarcasm_type": "Overstatement", "inference_time_ms": 78 }
  ]
}
```

### `GET /metrics`
Returns official held-out test evaluation benchmarks for all 5 models.

### `GET /models`
Returns list of available models and architectural metadata.

---

## 🔄 Running the Notebooks

Each notebook can be executed independently in **JupyterLab**, **VS Code**, or **Google Colab**:
1. Open any of the 5 notebooks:
   - `1_TFIDF_LogisticRegression.ipynb`
   - `2_RNN_Sarcasm_Detection.ipynb`
   - `3_LSTM_Sarcasm_Detection.ipynb`
   - `4_BERT_Sarcasm_Detection.ipynb`
   - `5_RoBERTa_Sarcasm_Detection_Main.ipynb`
2. Run cells sequentially from top to bottom. Datasets from `dataset/train.csv` and `dataset/test_1.csv` will be automatically detected and loaded.

---

## 👥 Authors & Acknowledgments
- **Course:** CSE 4122 (Natural Language Processing Laboratory)
- **Institution:** Department of Computer Science and Engineering, Khulna University of Engineering & Technology (KUET)
- **Dataset:** iSarcasm: An Intended Sarcasm Dataset for NLP (Oprea & Magdy)
