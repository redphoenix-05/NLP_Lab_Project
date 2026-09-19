import React from "react";

export default function LoadingState() {
  return (
    <div className="w-full py-10 rounded-xl bg-[#111318]/60 border border-[#252832]/60 flex flex-col items-center justify-center gap-3 animate-pulse">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <span className="text-xs text-[#8B919D] font-mono tracking-wider uppercase">
        Analyzing message...
      </span>
    </div>
  );
}
