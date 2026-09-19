import React from "react";
import { useApp } from "../context/AppContext";

export default function StatusIndicator() {
  const { backendOnline } = useApp();

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-[#8B919D]">
      <span className="relative flex h-2 w-2">
        {backendOnline ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </>
        ) : (
          <>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </>
        )}
      </span>
      <span>{backendOnline ? "Local Model Connected" : "Local Inference Engine Ready"}</span>
    </div>
  );
}
