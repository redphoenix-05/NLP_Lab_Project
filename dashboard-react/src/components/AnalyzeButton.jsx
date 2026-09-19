import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { AVAILABLE_MODELS } from "../data/modelConstants";

export default function AnalyzeButton({ onClick }) {
  const { inputText, analyzing, selectedModel } = useApp();
  const isDisabled = analyzing || !inputText.trim();
  const currentModel = AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[4];

  return (
    <button
      type="button"
      id="analyze-button"
      disabled={isDisabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-150 select-none ${
        isDisabled
          ? "bg-[#17191F] text-[#5A606E] border border-[#252832] cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white shadow-sm shadow-purple-500/25 border border-purple-500/50"
      }`}
    >
      {analyzing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
          <span>Analyzing with {currentModel.name}...</span>
        </>
      ) : (
        <>
          <span>Analyze with {currentModel.name}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}
