import React, { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check, Terminal } from "lucide-react";

export default function CodeCell({ cell }) {
  const [expanded, setExpanded] = useState(cell.defaultExpanded ?? false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(cell.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedNum = String(cell.number).padStart(2, "0");

  return (
    <div className="w-full rounded-xl bg-surface border border-border overflow-hidden transition-all duration-200 hover:border-border/80">
      {/* Header Bar */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
        aria-expanded={expanded}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 cursor-pointer select-none text-left bg-surface hover:bg-surface-secondary/40 transition-colors"
      >
        <div className="flex items-start md:items-center gap-3.5 min-w-0">
          <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20 shrink-0">
            {formattedNum}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm md:text-base font-semibold text-text-primary tracking-tight truncate">
              {cell.title}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
              {cell.explanation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
            {expanded ? "Hide Code" : "View Code"}
          </span>
          <button
            type="button"
            aria-label={expanded ? "Collapse code block" : "Expand code block"}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-secondary text-text-secondary hover:text-text-primary hover:bg-border transition-colors"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-accent" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Code Body */}
      {expanded && (
        <div className="border-t border-border bg-surface-secondary/60 animate-fadeIn">
          {/* Code Header with copy button */}
          <div className="px-5 py-2.5 flex items-center justify-between border-b border-border/60 bg-[#0c0d12]">
            <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>Python / PyTorch</span>
            </div>
            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary bg-surface border border-border hover:border-text-secondary/40 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code block with horizontal scroll */}
          <div className="p-5 overflow-x-auto bg-[#0b0c10]">
            <pre className="font-mono text-xs leading-relaxed text-[#dcdfe4] whitespace-pre">
              <code>{cell.code}</code>
            </pre>
          </div>

          {/* "What happens here?" breakdown */}
          <div className="px-5 py-3.5 bg-surface border-t border-border">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-light block mb-1">
              What happens here?
            </span>
            <p className="text-xs leading-relaxed text-text-secondary">
              {cell.details || cell.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
