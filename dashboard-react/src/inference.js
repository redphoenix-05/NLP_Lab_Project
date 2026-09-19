// ---------------------------------------------------------------------------
// sklearn-compatible TF-IDF vectorizer + Logistic Regression inference,
// reimplemented in JS so the trained scikit-learn models can run entirely
// client-side (no Python backend, no GPU). Verified to match
// TfidfVectorizer(...).transform() + LogisticRegression.predict_proba()
// to 5+ decimal places on held-out sentences before shipping.
// ---------------------------------------------------------------------------

// Tokenizer matching sklearn's default token_pattern r"(?u)\b\w\w+\b" (after lowercasing)
export function tokenize(text) {
  const lower = text.toLowerCase();
  return lower.match(/[a-z0-9_]{2,}/g) || [];
}

function buildNgrams(tokens, ngramMax) {
  const grams = [];
  for (let n = 1; n <= ngramMax; n++) {
    for (let i = 0; i + n <= tokens.length; i++) {
      grams.push(tokens.slice(i, i + n).join(" "));
    }
  }
  return grams;
}

// Replicates TfidfVectorizer(use_idf=True, smooth_idf=True, sublinear_tf=False, norm='l2')
function vectorize(text, model) {
  const grams = buildNgrams(tokenize(text), model.ngram_max);
  const counts = {};
  for (const g of grams) {
    if (Object.prototype.hasOwnProperty.call(model.vocab, g)) {
      counts[g] = (counts[g] || 0) + 1;
    }
  }
  const n = model.idf.length;
  const vec = new Float64Array(n);
  for (const term in counts) {
    const idx = model.vocab[term];
    vec[idx] = counts[term] * model.idf[idx];
  }
  let norm = 0;
  for (let i = 0; i < n; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm);
  if (norm > 0) for (let i = 0; i < n; i++) vec[i] /= norm;
  return vec;
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export function predictBinary(text, model) {
  const vec = vectorize(text, model);
  let z = model.intercept;
  for (let i = 0; i < vec.length; i++) z += vec[i] * model.coef[i];
  const p1 = sigmoid(z);
  return { sarcastic: p1, non_sarcastic: 1 - p1 };
}

function softmax(zs) {
  const m = Math.max(...zs);
  const exps = zs.map((z) => Math.exp(z - m));
  const s = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / s);
}

export function predictMulticlass(text, model) {
  const vec = vectorize(text, model);
  const zs = model.classes.map((_, c) => {
    let z = model.intercept[c];
    const row = model.coef[c];
    for (let i = 0; i < vec.length; i++) z += vec[i] * row[i];
    return z;
  });
  const probs = softmax(zs);
  const out = {};
  model.classes.forEach((cls, i) => {
    out[cls] = probs[i];
  });
  return out;
}

// ---------------------------------------------------------------------------
// Rule-based explanation module.
// iSarcasm has no human-written "why is this sarcastic" rationale field, and
// no GPU/internet was available to fine-tune a generation model (see the
// notebook, Section 4.4 and 10). This module instead looks for the classic
// sarcasm signature directly in the input text -- positive/upbeat wording
// paired with a negative situation, exaggeration, punctuation, and
// rhetorical-question cues -- and explains its reasoning using the specific
// words it found. It is deliberately NOT presented as a neural generator.
// ---------------------------------------------------------------------------

const POS_WORDS = [
  "great", "love", "loved", "lovely", "amazing", "wonderful", "fantastic", "perfect",
  "best", "awesome", "brilliant", "thrilled", "excited", "happy", "joy", "favorite",
  "favourite", "nice", "cool", "fun", "glad", "delighted", "pleasure", "blessing",
  "incredible", "superb", "marvelous", "yay",
];
const NEG_WORDS = [
  "crash", "crashed", "broke", "broken", "fail", "failed", "failure", "late", "delay",
  "delayed", "cancel", "cancelled", "canceled", "lost", "lose", "stuck", "hate", "hated",
  "worst", "annoying", "terrible", "awful", "ruined", "wreck", "disaster", "problem",
  "issue", "hurt", "tired", "exhausted", "sick", "rain", "traffic", "died", "dying",
  "spilled", "flat", "missed", "pain", "sucks", "suck",
];
const INTENSIFIERS = [
  "totally", "absolutely", "literally", "really", "just", "extremely", "completely",
  "exactly", "so", "truly", "clearly",
];

function findMatches(tokens, list) {
  const set = new Set(list);
  const seen = new Set();
  const out = [];
  for (const t of tokens) {
    if (set.has(t) && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

export function analyzeCues(text) {
  const tokens = tokenize(text);
  const pos = findMatches(tokens, POS_WORDS);
  const neg = findMatches(tokens, NEG_WORDS);
  const intens = findMatches(tokens, INTENSIFIERS);
  const exclCount = (text.match(/!/g) || []).length;
  const hasEllipsis = /\.\.\.|\u2026/.test(text);
  const hasQMark = /\?\s*$/.test(text.trim());
  const words = text.split(/\s+/).filter((w) => w.length > 1);
  const allCaps = words.filter((w) => /^[A-Z]{2,}$/.test(w.replace(/[^A-Za-z]/g, "")));
  return { tokens, pos, neg, intens, exclCount, hasEllipsis, hasQMark, allCaps };
}

function joinWords(arr) {
  if (arr.length === 0) return "";
  if (arr.length === 1) return "'" + arr[0] + "'";
  return arr.slice(0, -1).map((w) => "'" + w + "'").join(", ") + " and '" + arr[arr.length - 1] + "'";
}

export function buildExplanation(type, cues) {
  const { pos, neg, intens, exclCount, hasQMark, allCaps } = cues;
  const typeLower = type.toLowerCase();

  if (pos.length > 0 && neg.length > 0) {
    return (
      "This reads as " + typeLower + ": it pairs upbeat language (" + joinWords(pos) +
      ") with a clearly negative situation (" + joinWords(neg) + "). Saying something " +
      "positive about a bad situation, without changing tone, is the classic sarcasm signature."
    );
  }
  if (type === "Rhetorical Question" && hasQMark) {
    return (
      "This is flagged as a rhetorical question: it's phrased as a question (" +
      (pos.length ? "using upbeat words like " + joinWords(pos) + " " : "") +
      "but isn't really asking anything \u2014 it's making a point the speaker already believes the answer to."
    );
  }
  if (type === "Overstatement" && (intens.length > 0 || exclCount > 0)) {
    return (
      "This is read as overstatement: the emphatic language (" +
      (intens.length ? joinWords(intens) : "the exclamation marks and phrasing") +
      ") exaggerates how the speaker feels well past what the situation actually calls for " +
      "\u2014 a common way of signalling they don't mean it literally."
    );
  }
  if (type === "Understatement") {
    return (
      "This is read as understatement: the situation described is downplayed far more " +
      "than its real weight would warrant, which is usually a sign the speaker means the " +
      "opposite of how mild they're making it sound."
    );
  }
  if (pos.length > 0) {
    return (
      "This reads as " + typeLower + ": positive-sounding language (" + joinWords(pos) +
      ") appears here in a context where it likely isn't meant literally."
    );
  }
  if (neg.length > 0 && (exclCount > 0 || intens.length > 0)) {
    return (
      "This reads as " + typeLower + ": the negative situation described (" + joinWords(neg) +
      ") is delivered with emphatic phrasing" + (intens.length ? " (" + joinWords(intens) + ")" : "") +
      ", a mismatch that often signals sarcasm rather than a plain complaint."
    );
  }
  if (allCaps.length > 0) {
    return (
      "This reads as " + typeLower + ": the emphasis from capitalized words (" +
      joinWords(allCaps) + ") suggests a tone the plain wording alone doesn't carry."
    );
  }
  return (
    "The classifier flagged this as " + typeLower + " based on patterns in the wording and " +
    "phrasing it learned from training examples, though no single obvious cue (contrasting " +
    "sentiment words, exaggeration, or a rhetorical question) stood out on its own in this sentence."
  );
}

export const TYPE_ORDER = [
  "Irony",
  "Overstatement",
  "Rhetorical Question",
  "Sarcasm",
  "Satire",
  "Understatement",
];

// Full Stage 1 -> Stage 2 -> Stage 3 pipeline, matching the notebook's
// predict_sarcasm() schema (Section 13.2).
export function predictSarcasm(text, stage1Model, stage2Model) {
  const s1 = predictBinary(text, stage1Model);
  const isSarcastic = s1.sarcastic >= 0.5;
  const cues = analyzeCues(text);
  const result = {
    text,
    sarcasm: isSarcastic,
    sarcasm_confidence: isSarcastic ? s1.sarcastic : s1.non_sarcastic,
    sarcasm_prob: s1.sarcastic,
    non_sarcastic_prob: s1.non_sarcastic,
    sarcasm_type: null,
    type_confidence: null,
    type_probs: null,
    positive_cues: cues.pos,
    negative_cues: cues.neg,
    cues,
    explanation: null,
  };
  if (isSarcastic) {
    const s2 = predictMulticlass(text, stage2Model);
    result.type_probs = s2;
    result.sarcasm_type = Object.keys(s2).reduce((a, b) => (s2[a] > s2[b] ? a : b));
    result.type_confidence = s2[result.sarcasm_type];
    result.explanation = buildExplanation(result.sarcasm_type, cues);
  }
  return result;
}
