import React, { useState, useEffect } from "react";
import {
  GitCompare,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Award,
  ArrowRight,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { fetchMetrics } from "../services/api";
import { MODEL_METRICS } from "../data/modelMetrics";
import { ARCHITECTURE_EVOLUTION } from "../data/modelConstants";
import TextInput from "../components/TextInput";

export default function ModelComparison() {
  const {
    inputText,
    setInputText,
    compareResults,
    setCompareResults,
    isComparingAll,
    runCompareAll,
  } = useApp();

  const [metrics, setMetrics] = useState(MODEL_METRICS);
  const [localInput, setLocalInput] = useState(
    inputText || "Oh brilliant, another software update right in the middle of my unsaved work!"
  );

  useEffect(() => {
    let mounted = true;
    fetchMetrics().then((data) => {
      if (mounted && data && Object.keys(data).length > 0) {
        setMetrics(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleRunComparison = async () => {
    setInputText(localInput);
    await runCompareAll(localInput);
  };

  // Calculate consensus if comparison results exist
  const sarcasticCount =
    compareResults?.filter((r) => r.prediction === "SARCASTIC").length || 0;
  const totalModels = compareResults?.length || 0;
  const consensusRate = totalModels > 0 ? Math.round((Math.max(sarcasticCount, totalModels - sarcasticCount) / totalModels) * 100) : 0;
  const consensusLabel = sarcasticCount >= 3 ? "SARCASTIC" : "NOT_SARCASTIC";

  return (
    <div className="w-full max-w-5xl mx-auto py-6 md:py-10 px-4 sm:px-6 space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <GitCompare className="w-3.5 h-3.5 text-purple-400" />
          <span>Cross-Architectural Benchmark</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F7FA]">
          Model Progression & Comparison
        </h1>
        <p className="text-sm md:text-base text-[#8B919D] max-w-3xl">
          Evaluate how sarcasm detection accuracy evolved across three distinct eras of Natural Language Processing:
          from statistical n-gram tokenization to recurrence with gating, culminating in deep bidirectional contextual Transformers.
        </p>
      </header>

      {/* 1. Official Evaluation Table */}
      <section className="bg-[#111318] border border-[#252832] rounded-2xl overflow-hidden shadow-lg shadow-black/20">
        <div className="px-6 py-4 border-b border-[#252832] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Held-Out Test Set Performance (test_1.csv)</span>
            </h2>
            <p className="text-xs text-[#8B919D]">
              All 5 models benchmarked on the identical 60-sample balanced ground-truth test partition.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 self-start sm:self-auto">
            N = 60 Samples
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#17191F]/60 text-[#8B919D] uppercase font-mono text-[11px] border-b border-[#252832]">
                <th className="py-3.5 px-5 font-semibold">Model</th>
                <th className="py-3.5 px-4 font-semibold">Architecture Family</th>
                <th className="py-3.5 px-4 font-semibold text-right">Accuracy</th>
                <th className="py-3.5 px-4 font-semibold text-right">Precision</th>
                <th className="py-3.5 px-4 font-semibold text-right">Recall</th>
                <th className="py-3.5 px-4 font-semibold text-right">F1 Score</th>
                <th className="py-3.5 px-4 font-semibold text-right">Avg Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252832]/60">
              {Object.entries(metrics).map(([key, data]) => {
                const isBestF1 = key === "roberta";
                const isFastest = key === "tfidf";

                const acc = data.metrics?.accuracy != null ? (data.metrics.accuracy * 100).toFixed(2) + "%" : (data.accuracy || "-");
                const prec = data.metrics?.precision != null ? (data.metrics.precision * 100).toFixed(2) + "%" : (data.precision || "-");
                const rec = data.metrics?.recall != null ? (data.metrics.recall * 100).toFixed(2) + "%" : (data.recall || "-");
                const f1 = data.metrics?.f1 != null ? (data.metrics.f1 * 100).toFixed(2) + "%" : (data.f1 || "-");
                const lat = data.metrics?.avg_latency_ms != null ? data.metrics.avg_latency_ms + " ms" : (data.latency_ms || "-");
                const family = data.family || data.type || "Architecture";

                return (
                  <tr
                    key={key}
                    className={`hover:bg-[#17191F]/40 transition-colors ${
                      isBestF1 ? "bg-purple-500/[0.04]" : ""
                    }`}
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#F5F7FA]">{data.name}</span>
                        {isBestF1 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Best F1
                          </span>
                        )}
                        {isFastest && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Fastest
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#8B919D] text-xs">
                      {family}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-medium text-[#F5F7FA]">
                      {acc}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[#8B919D]">
                      {prec}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-[#8B919D]">
                      {rec}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-purple-300">
                      {f1}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-xs text-[#8B919D]">
                      {lat}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Evolutionary Timeline & Progression Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span>The NLP Paradigm Evolution</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8B919D]">
            How linguistic representation advanced from statistical token bags to cross-sentence context self-attention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARCHITECTURE_EVOLUTION.map((era, idx) => (
            <div
              key={era.era}
              className="bg-[#111318] border border-[#252832] rounded-xl p-5 flex flex-col justify-between hover:border-purple-500/30 transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#17191F] text-[#8B919D] border border-[#252832]">
                    Phase 0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-purple-400">
                    {era.models.join(" & ")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#F5F7FA] mb-2">{era.era}</h3>
                <p className="text-xs text-[#8B919D] leading-relaxed mb-4">
                  {era.description}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#17191F] border border-[#252832]/60">
                    <span className="font-semibold text-purple-300 block mb-0.5">Representation:</span>
                    <span className="text-[#8B919D]">{era.representation}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#252832]/60 space-y-1.5 text-[11px]">
                <div className="text-emerald-400/90 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{era.strength}</span>
                </div>
                <div className="text-amber-400/80 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{era.bottleneck}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Live Simultaneous Multi-Model Sandbox */}
      <section className="bg-[#111318] border border-[#252832] rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#252832] pb-4">
          <div>
            <h2 className="text-lg font-bold text-[#F5F7FA] flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span>Simultaneous 5-Model Live Sandbox</span>
            </h2>
            <p className="text-xs text-[#8B919D]">
              Send a single utterance to all five models at once and observe prediction variances in real-time.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunComparison}
            disabled={isComparingAll || !localInput.trim()}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              isComparingAll || !localInput.trim()
                ? "bg-[#17191F] text-[#5A606E] border border-[#252832] cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20 active:scale-[0.98]"
            }`}
          >
            {isComparingAll ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Running All 5 Models...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" />
                <span>Run 5-Model Inference</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-3">
          <TextInput
            value={localInput}
            onChange={setLocalInput}
            disabled={isComparingAll}
            placeholder="Type or paste any phrase to test across all 5 models..."
            maxLength={400}
          />
        </div>

        {/* Live Comparison Output Matrix */}
        {compareResults && compareResults.length > 0 && (
          <div className="space-y-5 animate-fadeIn pt-2">
            {/* Consensus Bar */}
            <div className="p-4 rounded-xl bg-[#17191F] border border-[#252832] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    consensusLabel === "SARCASTIC" ? "bg-purple-500 animate-pulse" : "bg-emerald-500"
                  }`}
                />
                <div>
                  <span className="text-xs font-semibold text-[#F5F7FA]">
                    Model Agreement Consensus:{" "}
                    <span
                      className={
                        consensusLabel === "SARCASTIC"
                          ? "text-purple-400 font-bold"
                          : "text-emerald-400 font-bold"
                      }
                    >
                      {consensusLabel === "SARCASTIC" ? "Sarcastic" : "Not Sarcastic"}
                    </span>
                  </span>
                  <p className="text-[11px] text-[#8B919D]">
                    {sarcasticCount} of {totalModels} models detected sarcasm ({consensusRate}% agreement).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs font-mono text-[#8B919D]">
                <Clock className="w-3.5 h-3.5" />
                <span>Total Round-Trip: {compareResults.reduce((acc, r) => acc + (r.inference_time_ms || 0), 0)} ms</span>
              </div>
            </div>

            {/* Individual Model Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {compareResults.map((item) => {
                const isSarcastic = item.prediction === "SARCASTIC";
                const confPercent = Math.round((item.confidence || item.sarcasm_score || 0.5) * 100);

                return (
                  <div
                    key={item.model}
                    className={`rounded-xl p-4 border flex flex-col justify-between space-y-3 transition-all ${
                      isSarcastic
                        ? "bg-purple-500/5 border-purple-500/30 hover:border-purple-500/50"
                        : "bg-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs text-[#F5F7FA] truncate">
                          {item.model_name || item.model.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-[#8B919D]">
                          {item.inference_time_ms || 1}ms
                        </span>
                      </div>

                      <div
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${
                          isSarcastic
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        <span>{isSarcastic ? "Sarcastic" : "Genuine"}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-[#8B919D]">
                          <span>Confidence</span>
                          <span className="font-mono font-semibold text-[#F5F7FA]">
                            {confPercent}%
                          </span>
                        </div>
                        <div className="w-full bg-[#17191F] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isSarcastic ? "bg-purple-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${confPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#252832]/60">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B919D] block mb-0.5">
                        Type Class
                      </span>
                      <span className="text-xs font-medium text-[#F5F7FA] truncate block">
                        {item.sarcasm_type || (isSarcastic ? "Sarcasm" : "Non-Sarcastic (Genuine)")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
