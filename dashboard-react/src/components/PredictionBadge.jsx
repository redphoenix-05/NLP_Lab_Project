import React from "react";

export default function PredictionBadge({ prediction }) {
  const isSarcastic = prediction === "SARCASTIC";

  return (
    <div className="flex flex-col gap-1 select-none">
      <span
        className={`text-xs font-mono font-bold tracking-widest uppercase ${
          isSarcastic ? "text-rose-400" : "text-emerald-400"
        }`}
      >
        {isSarcastic ? "SARCASTIC" : "NOT SARCASTIC"}
      </span>
      <span
        className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
          isSarcastic ? "text-white" : "text-white"
        }`}
      >
        {isSarcastic ? "YES" : "NO"}
      </span>
    </div>
  );
}
