import React from "react";
import TextInput from "../components/TextInput";
import AnalyzeButton from "../components/AnalyzeButton";
import LoadingState from "../components/LoadingState";
import ResultCard from "../components/ResultCard";
import ModelSelector from "../components/ModelSelector";
import { useApp } from "../context/AppContext";
import { AlertCircle, Sparkles, GitCompare, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const {
    inputText,
    setInputText,
    selectedModel,
    setSelectedModel,
    analyzing,
    result,
    error,
    runInference,
  } = useApp();

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    // Ctrl+Enter or Cmd+Enter to run analysis
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (inputText.trim() && !analyzing) {
        runInference(inputText);
      }
    }
  };

  const handleGoCompare = () => {
    navigate("/compare");
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-4 md:py-8 px-4 sm:px-6 space-y-6">
      {/* Page Header */}
      <header>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Multi-Model NLP Inference Engine</span>
          </div>

          <button
            type="button"
            onClick={handleGoCompare}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#17191F] hover:bg-[#252832] text-purple-300 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare All 5 Models</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F7FA]">
          SARCASM DETECTOR
        </h1>
        <p className="text-sm md:text-base text-[#8B919D] mt-1">
          Detect sarcasm nuances across Traditional ML, Recurrent Neural Networks, and Transformer architectures.
        </p>
      </header>

      {/* Model Selection Tabs */}
      <section className="space-y-2">
        <ModelSelector selected={selectedModel} onSelect={setSelectedModel} />
      </section>

      {/* Main Input Section */}
      <div className="space-y-3" onKeyDown={handleKeyDown}>
        <TextInput
          value={inputText}
          onChange={setInputText}
          disabled={analyzing}
          placeholder="Paste or type a sentence to detect sarcasm..."
          maxLength={500}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-[#8B919D] hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#17191F] border border-[#252832] font-mono text-[10px] text-[#F5F7FA]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-[#17191F] border border-[#252832] font-mono text-[10px] text-[#F5F7FA]">Enter</kbd> to analyze
          </span>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleGoCompare}
              className="inline-flex sm:hidden items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-[#17191F] text-purple-300 border border-purple-500/20"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Compare 5</span>
            </button>

            <AnalyzeButton onClick={() => runInference(inputText)} />
          </div>
        </div>
      </div>

      {/* Error Message Toast */}
      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 animate-fadeIn"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
          <div className="text-xs md:text-sm">
            <span className="font-semibold block">Inference Error</span>
            <span className="text-red-300/80">{typeof error === "string" ? error : error.message}</span>
          </div>
        </div>
      )}

      {/* Inference Output Area */}
      <div className="pt-2">
        {analyzing ? (
          <LoadingState />
        ) : result ? (
          <ResultCard result={result} />
        ) : (
          <div className="w-full py-14 px-4 rounded-2xl border border-dashed border-[#252832] text-center flex flex-col items-center justify-center bg-[#17191F]/30">
            <p className="text-sm text-[#8B919D]">
              Choose a model above, type a sentence, and click <strong className="text-[#F5F7FA]">Analyze</strong>.
            </p>
            <p className="text-xs text-[#5A606E] mt-1">
              Supports TF-IDF, RNN, LSTM, BERT, and RoBERTa models.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
