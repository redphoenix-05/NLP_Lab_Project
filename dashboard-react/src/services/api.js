import { mockPredict, mockPredictAll, mockGetMetrics } from "./mockApi";
import { MODEL_METRICS } from "../data/modelMetrics";

const API_BASE = "http://127.0.0.1:8000";

/**
 * Predict sarcasm via local FastAPI service with model selection or fallback to mock.
 * @param {string} text Input text to analyze
 * @param {string} modelId Model identifier: tfidf, rnn, lstm, bert, roberta
 * @param {boolean} forceMock Whether to use mock mode directly
 */
export async function predict(text, modelId = "roberta", forceMock = false) {
  if (forceMock) {
    return await mockPredict(text, modelId);
  }

  const t0 = performance.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, model: modelId }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    const inferenceTime = data.inference_time_ms || Math.round(performance.now() - t0);

    return {
      text: data.text || text,
      model: data.model || modelId,
      model_name: data.model_name || modelId.toUpperCase(),
      prediction: data.prediction || (data.sarcastic ? "SARCASTIC" : "NOT_SARCASTIC"),
      sarcasm_score: data.sarcasm_score ?? data.confidence ?? 0.95,
      confidence: data.confidence ?? data.sarcasm_score ?? 0.95,
      sarcasm_type: data.sarcasm_type || (data.prediction === "SARCASTIC" ? "Sarcasm" : "Non-Sarcastic (Genuine)"),
      inference_time_ms: inferenceTime,
      mode: "Local",
      connected: true,
    };
  } catch (error) {
    console.warn(`Local FastAPI server unavailable for model '${modelId}'. Falling back to local mock mode.`, error.message);
    const mockRes = await mockPredict(text, modelId);
    return {
      ...mockRes,
      mode: "Local Mock",
      isOfflineFallback: true,
    };
  }
}

/**
 * Run comparative inference across all 5 models simultaneously.
 * @param {string} text Input text
 * @param {boolean} forceMock Whether to use mock mode directly
 */
export async function predictAll(text, forceMock = false) {
  if (forceMock) {
    return await mockPredictAll(text);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${API_BASE}/predict/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Comparative API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.warn("FastAPI predict_all offline, using comparative mock mode.", error.message);
    return await mockPredictAll(text);
  }
}

/**
 * Fetch official evaluation metrics for all 5 models.
 */
export async function fetchMetrics() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/metrics`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Graceful fallback to static verified metrics
  }
  return MODEL_METRICS;
}

/**
 * Health check to see if local FastAPI server is listening.
 */
export async function checkBackendStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE}/docs`, {
      method: "HEAD",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok || res.status < 500;
  } catch {
    return false;
  }
}
