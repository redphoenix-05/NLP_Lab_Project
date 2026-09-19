import React, { useState } from "react";
import { ArrowRight, Copy, Check, GitCompare } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ExampleCard({ example }) {
  const { triggerExampleTest, triggerExampleCompare, analyzing, isComparingAll } = useApp();
  const [copied, setCopied] = useState(false);
  const isSarcastic = example.isSarcastic;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(example.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-between p-5 rounded-xl bg-[#111318] border border-[#252832] hover:border-purple-500/40 transition-all duration-200 hover:-translate-y-0.5 group">
      <div>
        {/* Header: Category Badge, Expected Result & Copy Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                isSarcastic
                  ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                  : "bg-[#17191F] text-[#8B919D] border-[#252832]"
              }`}
            >
              {example.category}
            </span>
            <span className="text-[11px] font-mono text-[#8B919D]">
              Expected:{" "}
              <span
                className={`font-semibold ${
                  isSarcastic ? "text-purple-300" : "text-[#F5F7FA]"
                }`}
              >
                {isSarcastic ? "YES" : "NO"}
              </span>
            </span>
          </div>

          {/* Direct Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy text to clipboard"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-[#8B919D] hover:text-[#F5F7FA] bg-[#17191F] hover:bg-[#252832] border border-[#252832] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px] font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8B919D] group-hover:text-[#F5F7FA]" />
                <span className="text-[11px] hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Message Text */}
        <blockquote className="text-sm text-[#F5F7FA] font-normal leading-relaxed mb-4 selection:bg-purple-500/30 select-text">
          &ldquo;{example.text}&rdquo;
        </blockquote>
      </div>

      {/* Footer: Sarcasm Type & Test Actions */}
      <div className="pt-3 border-t border-[#252832]/80 flex items-center justify-between gap-2 text-xs">
        {isSarcastic && example.sarcasmType ? (
          <span className="text-[11px] text-[#8B919D] font-mono truncate max-w-[130px]">
            Type: <span className="text-[#F5F7FA] font-semibold">{example.sarcasmType}</span>
          </span>
        ) : (
          <span className="text-[11px] text-[#8B919D] italic">Genuine</span>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => triggerExampleCompare(example.text)}
            disabled={isComparingAll}
            title="Compare across all 5 models"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8B919D] hover:text-purple-300 transition-colors disabled:opacity-50"
          >
            <GitCompare className="w-3 h-3" />
            <span className="hidden sm:inline">Compare 5</span>
          </button>

          <button
            type="button"
            onClick={() => triggerExampleTest(example.text)}
            disabled={analyzing}
            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-white group-hover:translate-x-0.5 transition-all disabled:opacity-50"
          >
            <span>Test</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
