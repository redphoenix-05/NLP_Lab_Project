import React from "react";
import { Sparkles, Binary, Repeat, Cpu, Layers } from "lucide-react";

export const MODELS_INFO = [
  {
    id: "tfidf",
    name: "TF-IDF + LR",
    fullName: "TF-IDF + Logistic Regression",
    family: "Traditional",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    icon: Binary
  },
  {
    id: "rnn",
    name: "RNN",
    fullName: "Recurrent Neural Network",
    family: "Recurrent",
    badgeColor: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    icon: Repeat
  },
  {
    id: "lstm",
    name: "LSTM",
    fullName: "Long Short-Term Memory",
    family: "Recurrent",
    badgeColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    icon: Cpu
  },
  {
    id: "bert",
    name: "BERT",
    fullName: "BERT (bert-base-uncased)",
    family: "Transformer",
    badgeColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    icon: Layers
  },
  {
    id: "roberta",
    name: "RoBERTa",
    fullName: "RoBERTa (roberta-base)",
    family: "Transformer",
    badgeColor: "text-purple-300 bg-purple-500/15 border-purple-500/30",
    icon: Sparkles
  }
];

export default function ModelSelector({
  selectedModel,
  onSelectModel,
  selected,
  onSelect,
  disabled = false,
}) {
  const currentSelected = selectedModel || selected || "roberta";
  const handleSelect = onSelectModel || onSelect || (() => {});

  return (
    <div className="w-full space-y-2 mb-4">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold uppercase tracking-wider text-[#8B919D] flex items-center gap-1.5">
          <span>Inference Model</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#17191F] border border-[#252832] text-[#8B919D]">
            5 Available
          </span>
        </label>
        <span className="text-[11px] text-[#8B919D] hidden sm:inline">
          Progression: Traditional ML → Recurrent NLP → Transformer NLP
        </span>
      </div>

      {/* 5-Model Segmented Tabs */}
      <div
        role="radiogroup"
        aria-label="Select inference model"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-1.5 rounded-xl bg-[#111318] border border-[#252832]"
      >
        {MODELS_INFO.map((m) => {
          const isSelected = currentSelected === m.id;
          const Icon = m.icon;

          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => handleSelect(m.id)}
              className={`relative flex flex-col items-center justify-center py-2.5 px-3 rounded-lg text-xs font-semibold transition-all select-none disabled:opacity-50 ${
                isSelected
                  ? "bg-[#17191F] border border-purple-500/50 text-white shadow-lg shadow-purple-500/10"
                  : "bg-transparent text-[#8B919D] hover:text-[#F5F7FA] hover:bg-[#17191F]/50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isSelected ? "text-purple-400" : "text-[#8B919D]"
                  }`}
                />
                <span className="truncate">{m.name}</span>
              </div>

              <span
                className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded border ${
                  isSelected ? m.badgeColor : "text-[#8B919D]/70 border-[#252832]/60"
                }`}
              >
                {m.family}
              </span>

              {isSelected && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
