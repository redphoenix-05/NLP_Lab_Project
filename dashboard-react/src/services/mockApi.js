import { MODEL_METRICS } from "../data/modelMetrics";

const MODEL_NAMES = {
  tfidf: "TF-IDF + Logistic Regression",
  rnn: "RNN",
  lstm: "LSTM",
  bert: "BERT",
  roberta: "RoBERTa"
};

const BASE_LATENCIES = {
  tfidf: 6,
  rnn: 14,
  lstm: 18,
  bert: 42,
  roberta: 34
};

/**
 * Mock inference service simulating local FastAPI backend for any of the 5 models.
 */
export async function mockPredict(text, modelId = "roberta") {
  const t0 = performance.now();
  const mid = modelId.toLowerCase();

  const baseLatency = BASE_LATENCIES[mid] || 35;
  const simulatedLatency = Math.floor(Math.random() * 15) + baseLatency;
  await new Promise((resolve) => setTimeout(resolve, simulatedLatency));

  const lower = text.toLowerCase();

  const sarcasticSignals = [
    "yeah, because", "yeah because", "oh wonderful", "just wonderful", "love it when",
    "exactly what i", "exactly how i", "brilliant", "master chef", "only crash",
    "waiting on hold", "another five-hour", "minor inconvenience", "torrential",
    "so glad", "sure, losing", "stepping on an upright lego", "amazing", "great",
    "perfect", "oh great", "surely", "totally"
  ];

  const hasSarcasticSignal = sarcasticSignals.some((sig) => lower.includes(sig));

  let isSarcastic = false;
  let sarcasmType = "Sarcasm";
  let confidence = 0.95;

  if (hasSarcasticSignal || (lower.includes("wonderful") && lower.includes("delay")) || lower.includes("waiting")) {
    isSarcastic = true;
    
    // Model-dependent subtle confidence variation reflecting real model capability
    if (mid === "tfidf") confidence = Number((0.82 + Math.random() * 0.08).toFixed(3));
    else if (mid === "rnn") confidence = Number((0.86 + Math.random() * 0.08).toFixed(3));
    else if (mid === "lstm") confidence = Number((0.90 + Math.random() * 0.07).toFixed(3));
    else if (mid === "bert") confidence = Number((0.94 + Math.random() * 0.05).toFixed(3));
    else confidence = Number((0.96 + Math.random() * 0.038).toFixed(3)); // RoBERTa

    // Determine type from exact 6 classes
    if (text.includes("?") || lower.startsWith("why") || lower.startsWith("how")) {
      sarcasmType = "Rhetorical Question";
    } else if (lower.includes("waiting") || lower.includes("lego") || lower.includes("hundred") || lower.includes("hours") || lower.includes("three")) {
      sarcasmType = "Overstatement";
    } else if (lower.includes("politics") || lower.includes("trump") || lower.includes("government") || lower.includes("capitalism")) {
      sarcasmType = "Satire";
    } else if (lower.includes("just") || lower.includes("simply") || lower.includes("barely") || lower.includes("little")) {
      sarcasmType = "Understatement";
    } else if (lower.includes("love it when") || lower.includes("brilliant") || lower.includes("great")) {
      sarcasmType = "Irony";
    } else {
      sarcasmType = "Sarcasm";
    }
  } else {
    isSarcastic = false;
    if (mid === "tfidf") confidence = Number((0.80 + Math.random() * 0.08).toFixed(3));
    else if (mid === "rnn") confidence = Number((0.84 + Math.random() * 0.07).toFixed(3));
    else if (mid === "lstm") confidence = Number((0.88 + Math.random() * 0.06).toFixed(3));
    else if (mid === "bert") confidence = Number((0.92 + Math.random() * 0.05).toFixed(3));
    else confidence = Number((0.94 + Math.random() * 0.04).toFixed(3));
    sarcasmType = "Non-Sarcastic (Genuine)";
  }

  const inferenceTime = Math.round(performance.now() - t0);

  return {
    text,
    model: mid,
    model_name: MODEL_NAMES[mid] || mid.toUpperCase(),
    prediction: isSarcastic ? "SARCASTIC" : "NOT_SARCASTIC",
    sarcasm_score: isSarcastic ? confidence : Number((1 - confidence).toFixed(3)),
    confidence: confidence,
    sarcasm_type: sarcasmType,
    inference_time_ms: inferenceTime,
    mode: "Local Mock",
  };
}

/**
 * Mock comparative inference across all 5 models.
 */
export async function mockPredictAll(text) {
  const models = ["tfidf", "rnn", "lstm", "bert", "roberta"];
  const promises = models.map((m) => mockPredict(text, m));
  return await Promise.all(promises);
}

export function mockGetMetrics() {
  return MODEL_METRICS;
}
