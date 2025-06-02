"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ScenarioAnalysisRequest, AnalyzeScenarioResponse } from "@/lib/analyzeScenario";

interface ScenarioContextType {
  scenarioInput: ScenarioAnalysisRequest[];
  setScenarioInput: (input: ScenarioAnalysisRequest[]) => void;
  scenarioResults: (AnalyzeScenarioResponse | null)[];
  setScenarioResults: (results: (AnalyzeScenarioResponse | null)[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [scenarioInput, setScenarioInput] = useState<ScenarioAnalysisRequest[]>([]);
  const [scenarioResults, setScenarioResults] = useState<(AnalyzeScenarioResponse | null)[]>([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <ScenarioContext.Provider value={{ scenarioInput, setScenarioInput, scenarioResults, setScenarioResults, loading, setLoading, error, setError }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const context = useContext(ScenarioContext);
  if (context === undefined) {
    throw new Error("useScenario must be used within a ScenarioProvider");
  }
  return context;
} 