import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MobileHeader from "./components/MobileHeader";
import Dashboard from "./pages/Dashboard";
import ModelComparison from "./pages/ModelComparison";
import CodeExplanation from "./pages/CodeExplanation";
import ExampleTests from "./pages/ExampleTests";
import { AppProvider } from "./context/AppContext";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0D0E12] text-[#F5F7FA] flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <MobileHeader />

        {/* Scrollable Main Stage */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/compare" element={<ModelComparison />} />
            <Route path="/examples" element={<ExampleTests />} />
            <Route path="/code" element={<CodeExplanation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
