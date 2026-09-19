import React, { useState } from "react";
import PredictionBadge from "./PredictionBadge";
import ConfidenceBar from "./ConfidenceBar";
import { Cpu, Zap, Radio, Tag, Copy, Check, CheckCircle2 } from "lucide-react";

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const isSarcastic = result.prediction === "SARCASTIC";
  const confidenceVal = result.confidence ?? result.sarcasm_score ?? 0;
  const confidencePercent = Math.round(confidenceVal > 1 ? confidenceVal : confidenceVal * 1000) / 10;
  const sarcasmType = result.sarcasm_type || (isSarcastic ? "VERBAL" : "NON-SARCASTIC (GENUINE)");
  const inferenceMs = result.inference_time_ms ?? 48;
  const modelName = result.model || "RoBERTa";
  const mode = result.mode || "Local";

  const handleCopySummary = () => {
    const summary = `Message: "${result.text || ''}"\nVerdict: ${result.prediction} (${confidencePercent.toFixed(1)}% confidence)\nType: ${sarcasmType}\nModel: ${modelName} (${inferenceMs} ms)`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="region"
      aria-label="Prediction Result"
      className={`w-full rounded-2xl bg-surface border p-6 md:p-8 shadow-2xl transition-all duration-300 animate-fadeIn ${
        isSarcastic
          ? "border-accent/40 shadow-accent/5"
          : "border-border shadow-black/20"
      }`}
    >
      {/* Top section: Dominant Prediction & Confidence */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
        {/* Prediction Badge */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block">
              Verdict
            </span>
            <button
              type="button"
              onClick={handleCopySummary}
              title="Copy analysis summary"
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium text-text-secondary hover:text-text-primary bg-surface-secondary border border-border transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Result</span>
                </>
              )}
            </button>
          </div>
          <PredictionBadge prediction={result.prediction} />
        </div>

        {/* Confidence Percentage & Mini Bar */}
        <div className="flex flex-col md:items-end justify-center min-w-[200px]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-1">
            Confidence
          </span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary">
              {confidencePercent.toFixed(1)}%
            </span>
          </div>
          <div className="w-full md:w-48">
            <ConfidenceBar
              percentage={confidencePercent}
              isSarcastic={isSarcastic}
              showValue={false}
            />
          </div>
        </div>
      </div>

      {/* Sarcasm Type Section - Always Prominently Displayed */}
      <div className="py-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Tag className={`w-4 h-4 ${isSarcastic ? "text-accent" : "text-emerald-400"}`} />
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {isSarcastic ? "Sarcasm Type" : "Classification Type"}
          </span>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold tracking-wide border transition-all ${
            isSarcastic
              ? "bg-accent/15 border-accent/35 text-accent-light shadow-sm shadow-accent/10"
              : "bg-surface-secondary border-border text-text-secondary"
          }`}
        >
          {isSarcastic ? (
            <span className="text-accent-light font-bold">{sarcasmType}</span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {sarcasmType || "GENUINE / NON-SARCASTIC"}
            </span>
          )}
        </div>
      </div>

      {/* Technical Metadata Footer */}
      <div className="pt-5 grid grid-cols-3 gap-4 text-xs">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary mb-1 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-text-secondary" /> Model
          </span>
          <span className="font-mono font-medium text-text-primary">{modelName}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary mb-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-text-secondary" /> Inference
          </span>
          <span className="font-mono font-medium text-text-primary">{inferenceMs} ms</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary mb-1 flex items-center gap-1">
            <Radio className="w-3 h-3 text-text-secondary" /> Mode
          </span>
          <span className="font-mono font-medium text-text-primary">{mode}</span>
        </div>
      </div>
    </div>
  );
}
