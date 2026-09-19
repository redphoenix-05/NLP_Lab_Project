export const AVAILABLE_MODELS = [
  {
    id: "tfidf",
    name: "TF-IDF + Logistic Regression",
    shortName: "TF-IDF + LR",
    family: "Traditional ML",
    desc: "N-gram bag-of-words baseline (< 2ms)",
  },
  {
    id: "rnn",
    name: "Recurrent Neural Network",
    shortName: "RNN",
    family: "Neural NLP",
    desc: "Sequential token recurrent hidden states",
  },
  {
    id: "lstm",
    name: "Long Short-Term Memory",
    shortName: "LSTM",
    family: "Gated Neural",
    desc: "Bidirectional gated cells for long context",
  },
  {
    id: "bert",
    name: "BERT (bert-base-uncased)",
    shortName: "BERT",
    family: "Transformer",
    desc: "Bidirectional cross-attention encoder",
  },
  {
    id: "roberta",
    name: "RoBERTa (roberta-base)",
    shortName: "RoBERTa",
    family: "Optimized Transformer",
    desc: "Dual heads: Binary Sarcasm + 6 Sarcasm Types",
  },
];

export const ARCHITECTURE_EVOLUTION = [
  {
    era: "Phase 1: Statistical & Linear ML",
    models: ["TF-IDF", "Logistic Regression"],
    representation: "Sparse high-dimensional n-gram bag-of-words vectors",
    strength: "Extremely lightweight (<2ms), zero GPU dependency, interpretable lexical weights.",
    bottleneck: "Completely blind to token order, negation scope, and semantic shifts.",
    description:
      "Calculates sublinear term frequency-inverse document frequency over word and character n-grams. While effective at spotting distinct sarcastic keywords like 'obviously' or 'totally', it cannot comprehend inverted sentiment or irony.",
  },
  {
    era: "Phase 2: Recurrent & Gated Neural NLP",
    models: ["RNN", "LSTM"],
    representation: "Dense continuous word embeddings with recursive hidden state transitions",
    strength: "Maintains sequential word order; LSTM gates preserve memory across clauses.",
    bottleneck: "Sequential computation bottlenecks throughput; struggle with subtle figurative subtext.",
    description:
      "Word tokens are converted to 100-dimensional embeddings. The RNN propagates information sequentially. The LSTM introduces forget, input, and output gates to mitigate vanishing gradients and track contrasts between clauses.",
  },
  {
    era: "Phase 3: Deep Contextual Transformers",
    models: ["BERT", "RoBERTa"],
    representation: "Multi-head bidirectional self-attention over subword units",
    strength: "Dynamic contextual embeddings capturing complex pragmatic cues and sarcasm types.",
    bottleneck: "Higher latency (~30-40ms) and computational footprint requiring model caching.",
    description:
      "Pretrained on vast corpora, transformers process all sentence tokens simultaneously. Every word attends to every other word, enabling the model to catch subtle incongruities, irony, hyperbole, and rhetorical questions.",
  },
];
