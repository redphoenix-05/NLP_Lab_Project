import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Code2, FlaskConical, GitCompare, Sparkles } from "lucide-react";
import StatusIndicator from "./StatusIndicator";
import { useApp } from "../context/AppContext";
import { AVAILABLE_MODELS } from "../data/modelConstants";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Model Comparison", path: "/compare", icon: GitCompare },
  { name: "Example Tests", path: "/examples", icon: FlaskConical },
  { name: "Code Explanation", path: "/code", icon: Code2 },
];

export default function Sidebar() {
  const { selectedModel } = useApp();
  const currentModelMeta = AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[4];

  return (
    <aside className="w-64 bg-[#111318] border-r border-[#252832] flex-shrink-0 flex flex-col justify-between p-5 select-none hidden md:flex h-screen sticky top-0">
      {/* Top Branding */}
      <div>
        <div className="flex items-center gap-2.5 px-3 py-2 mb-7">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center text-white shadow-sm shadow-purple-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base tracking-tight text-[#F5F7FA]">
            Sarcasm<span className="text-purple-400">AI</span>
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 ml-auto">
            5 Models
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      : "text-[#8B919D] hover:text-[#F5F7FA] hover:bg-[#17191F]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-purple-400" : "text-[#8B919D]"
                      }`}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Model Card */}
      <div className="p-3.5 rounded-xl bg-[#17191F] border border-[#252832] space-y-2">
        <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-[#8B919D]">
          <span>Active Model</span>
          <span className="text-purple-400 font-mono text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10">
            {currentModelMeta.family}
          </span>
        </div>
        <div>
          <div className="text-xs font-semibold text-[#F5F7FA] truncate">{currentModelMeta.name}</div>
          <div className="text-[11px] text-[#8B919D] truncate">{currentModelMeta.desc}</div>
        </div>
        <div className="pt-1.5 border-t border-[#252832]/60">
          <StatusIndicator />
        </div>
      </div>
    </aside>
  );
}
