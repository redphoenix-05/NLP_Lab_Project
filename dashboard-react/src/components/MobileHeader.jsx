import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Code2, FlaskConical, GitCompare, Sparkles, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import StatusIndicator from "./StatusIndicator";
import { AVAILABLE_MODELS } from "../data/modelConstants";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Model Comparison", path: "/compare", icon: GitCompare },
  { name: "Example Tests", path: "/examples", icon: FlaskConical },
  { name: "Code Explanation", path: "/code", icon: Code2 },
];

export default function MobileHeader() {
  const { mobileMenuOpen, setMobileMenuOpen, selectedModel } = useApp();
  const currentModelMeta = AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[4];

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#111318] border-b border-[#252832] sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center text-white">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#F5F7FA]">
            Sarcasm<span className="text-purple-400">AI</span>
          </span>
          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
            5 Models
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-[#8B919D] hover:text-white hover:bg-[#17191F] transition-colors focus:outline-none focus:ring-1 focus:ring-purple-500"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 bottom-0 w-64 bg-[#111318] border-r border-[#252832] z-50 flex flex-col justify-between p-5 transform transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-base tracking-tight text-[#F5F7FA]">
                Sarcasm<span className="text-purple-400">AI</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-[#8B919D] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        : "text-[#8B919D] hover:text-[#F5F7FA] hover:bg-[#17191F]"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

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
      </div>
    </>
  );
}
