import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { predict, predictAll, checkBackendStatus } from "../services/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState("roberta");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isComparingAll, setIsComparingAll] = useState(false);
  const [compareResults, setCompareResults] = useState(null);
  const [error, setError] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Check if FastAPI is running locally
  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const online = await checkBackendStatus();
      if (mounted) setBackendOnline(online);
    };
    check();
    const interval = setInterval(check, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const runInference = useCallback(async (text, modelId = null) => {
    const trimmed = (text || "").trim();
    if (!trimmed) {
      setError("Please enter some text to analyze.");
      return;
    }

    const activeModel = modelId || selectedModel;
    setError(null);
    setAnalyzing(true);
    try {
      const data = await predict(trimmed, activeModel);
      setResult(data);
    } catch (err) {
      setError("Unable to process the prediction. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }, [selectedModel]);

  const runCompareAll = useCallback(async (text) => {
    const trimmed = (text || "").trim();
    if (!trimmed) {
      setError("Please enter some text to compare across all models.");
      return;
    }

    setError(null);
    setIsComparingAll(true);
    try {
      const results = await predictAll(trimmed);
      setCompareResults(results);
    } catch (err) {
      setError("Unable to compare all models. Please try again.");
    } finally {
      setIsComparingAll(false);
    }
  }, []);

  const triggerExampleTest = useCallback(
    (exampleText, modelId = null) => {
      setInputText(exampleText);
      if (modelId) setSelectedModel(modelId);
      navigate("/");
      runInference(exampleText, modelId || selectedModel);
    },
    [navigate, runInference, selectedModel]
  );

  const triggerExampleCompare = useCallback(
    (exampleText) => {
      setInputText(exampleText);
      navigate("/compare");
      runCompareAll(exampleText);
    },
    [navigate, runCompareAll]
  );

  return (
    <AppContext.Provider
      value={{
        inputText,
        setInputText,
        selectedModel,
        setSelectedModel,
        analyzing,
        result,
        setResult,
        isComparingAll,
        compareResults,
        setCompareResults,
        error,
        setError,
        backendOnline,
        mobileMenuOpen,
        setMobileMenuOpen,
        runInference,
        runCompareAll,
        triggerExampleTest,
        triggerExampleCompare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
