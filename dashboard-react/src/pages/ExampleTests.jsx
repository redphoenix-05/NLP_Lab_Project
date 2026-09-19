import React, { useState, useMemo } from "react";
import ExampleCard from "../components/ExampleCard";
import { EXAMPLES } from "../data/examples";
import { FlaskConical, Search, X, ChevronDown } from "lucide-react";

const PAGE_SIZE = 24;

export default function ExampleTests() {
  const [filter, setFilter] = useState("all"); // 'all' | 'sarcastic' | 'non-sarcastic'
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredExamples = useMemo(() => {
    let list = EXAMPLES;

    if (filter === "sarcastic") {
      list = list.filter((item) => item.isSarcastic);
    } else if (filter === "non-sarcastic") {
      list = list.filter((item) => !item.isSarcastic);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.text.toLowerCase().includes(q) ||
          (item.sarcasmType && item.sarcasmType.toLowerCase().includes(q))
      );
    }

    return list;
  }, [filter, searchQuery]);

  const displayedExamples = useMemo(() => {
    return filteredExamples.slice(0, visibleCount);
  }, [filteredExamples, visibleCount]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setVisibleCount(PAGE_SIZE);
  };

  const sarcasticCount = EXAMPLES.filter((e) => e.isSarcastic).length;
  const nonSarcasticCount = EXAMPLES.filter((e) => !e.isSarcastic).length;

  return (
    <div className="w-full max-w-5xl mx-auto py-4 md:py-8 px-4 sm:px-6">
      {/* Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-light text-[11px] font-semibold uppercase tracking-wider mb-3">
          <FlaskConical className="w-3 h-3" />
          <span>Curated Benchmarks ({EXAMPLES.length} Examples)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary">
          EXAMPLE TESTS
        </h1>
        <p className="text-sm md:text-base text-text-secondary mt-1">
          Try prepared examples or copy messages directly to test.
        </p>
      </header>

      {/* Search Bar & Filter Controls */}
      <div className="space-y-4 mb-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search within examples (e.g., meeting, college, coffee)..."
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Tabs & Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => handleFilterChange("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "all"
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              All ({EXAMPLES.length})
            </button>

            <button
              type="button"
              onClick={() => handleFilterChange("sarcastic")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "sarcastic"
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              Sarcastic ({sarcasticCount})
            </button>

            <button
              type="button"
              onClick={() => handleFilterChange("non-sarcastic")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "non-sarcastic"
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border"
              }`}
            >
              Non-Sarcastic ({nonSarcasticCount})
            </button>
          </div>

          <span className="text-xs text-text-secondary font-mono">
            Showing {displayedExamples.length} of {filteredExamples.length}
          </span>
        </div>
      </div>

      {/* Examples Grid */}
      {displayedExamples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedExamples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-dashed border-border bg-surface/30">
          <p className="text-sm text-text-secondary">
            No examples match your filter or search query.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredExamples.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-surface border border-border hover:border-accent/40 text-sm font-semibold text-text-primary hover:text-white transition-all shadow-lg hover:shadow-accent/10"
          >
            <span>Load More Examples ({filteredExamples.length - visibleCount} remaining)</span>
            <ChevronDown className="w-4 h-4 text-accent" />
          </button>
        </div>
      )}
    </div>
  );
}
