import React, { useEffect, useState } from "react";

export default function ConfidenceBar({ percentage, isSarcastic }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(percentage);
    }, 40);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="w-full h-1.5 bg-[#17191F] rounded-full overflow-hidden border border-[#252832]/60">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${
          isSarcastic
            ? "bg-gradient-to-r from-purple-600 via-rose-500 to-rose-400"
            : "bg-gradient-to-r from-purple-600 via-emerald-500 to-emerald-400"
        }`}
        style={{ width: `${Math.min(100, Math.max(0, width))}%` }}
      />
    </div>
  );
}
