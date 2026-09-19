import React from "react";
import { useApp } from "../context/AppContext";

export default function TextInput({ onEnter }) {
  const { inputText, setInputText, analyzing } = useApp();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!analyzing && inputText.trim()) {
        onEnter?.();
      }
    }
  };

  return (
    <div className="relative rounded-xl bg-[#111318] border border-[#252832] focus-within:border-purple-500/80 focus-within:ring-1 focus-within:ring-purple-500/30 transition-all duration-150">
      <label htmlFor="sarcasm-input" className="sr-only">
        Message text to analyze for sarcasm
      </label>
      <textarea
        id="sarcasm-input"
        value={inputText}
        maxLength={500}
        disabled={analyzing}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste or type a message..."
        rows={4}
        className="w-full bg-transparent text-[#F5F7FA] placeholder-[#5A606E] p-4 text-base resize-none focus:outline-none leading-relaxed font-sans"
      />
      <div className="flex justify-between items-center px-4 pb-3 pt-1 text-xs text-[#8B919D] select-none border-t border-[#252832]/30">
        <span className="text-[11px] text-[#5A606E] hidden sm:inline">
          Press <kbd className="px-1.5 py-0.5 rounded bg-[#17191F] border border-[#252832] font-mono text-[10px]">Ctrl+Enter</kbd> to analyze
        </span>
        <span className="font-mono text-[11px] ml-auto">
          {inputText.length} / 500
        </span>
      </div>
    </div>
  );
}
