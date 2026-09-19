import React, { useState } from "react";
import CodeCell from "../components/CodeCell";
import { NOTEBOOK_CELLS } from "../data/notebookCells";
import { BookOpen } from "lucide-react";

export default function CodeExplanation() {
  const [cells, setCells] = useState(NOTEBOOK_CELLS);

  const toggleAll = (expand) => {
    setCells((prev) =>
      prev.map((c) => ({
        ...c,
        defaultExpanded: expand,
        // force state update via key
        _key: Date.now() + Math.random(),
      }))
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 md:py-8 px-4 sm:px-6">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3 h-3" />
            <span>5-Model Architecture & Training Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F5F7FA]">
            CODE EXPLANATION
          </h1>
          <p className="text-sm md:text-base text-[#8B919D] mt-1">
            Walkthrough of how the 5 models (TF-IDF, RNN, LSTM, BERT, RoBERTa) were designed, trained, and benchmarked.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleAll(true)}
            className="px-3 py-1.5 text-xs font-medium text-[#8B919D] hover:text-[#F5F7FA] bg-[#17191F] border border-[#252832] hover:border-purple-500/40 rounded-lg transition-colors"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={() => toggleAll(false)}
            className="px-3 py-1.5 text-xs font-medium text-[#8B919D] hover:text-[#F5F7FA] bg-[#17191F] border border-[#252832] hover:border-purple-500/40 rounded-lg transition-colors"
          >
            Collapse All
          </button>
        </div>
      </header>

      {/* Structured Code Cells */}
      <div className="space-y-4">
        {cells.map((cell) => (
          <CodeCell key={cell._key || cell.number} cell={cell} />
        ))}
      </div>
    </div>
  );
}
