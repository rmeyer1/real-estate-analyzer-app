"use client";
import React from "react";
import { useScenario } from "@/lib/ScenarioContext";

export default function ReturnsSummaryDashboard() {
  const { scenarioResults, scenarioInput, loading, error } = useScenario();
  const result = scenarioResults?.[0] || null;

  // Define summary rows to match backend keys
  const summaryRows = [
    { label: "Gross Income", key: "gross_income" },
    { label: "Total Expenses", key: "total_expenses" },
    { label: "NOI", key: "noi" },
    { label: "CapEx", key: "capex" },
    { label: "Cash Flow Operations", key: "cash_flow_operations" },
    { label: "Leveraged Cash Flow", key: "leveraged_cash_flow" },
    { label: "Debt Service", key: "debt_service" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Returns Summary Dashboard</h1>
      {/* Returns Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unleveraged Return</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="6.03%" value={result?.irr_results?.unleveraged_irr ?? "N/A"} readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leveraged Return</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="9.00%" value={result?.irr_results?.leveraged_irr ?? "N/A"} readOnly />
        </div>
      </div>
      {/* Returns Summary - Current */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Returns Summary - Current</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border"> </th>
                {[...Array(result?.annual_cash_flows?.length || 7)].map((_, i) => (
                  <th key={i} className="px-4 py-2 border">Year {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={row.key}>
                  <td className="px-4 py-2 border font-medium">{row.label}</td>
                  {[...Array(result?.annual_cash_flows?.length || 7)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border text-center">
                      {result?.annual_cash_flows?.[i]?.[row.key] != null
                        ? Number(result.annual_cash_flows[i][row.key]).toLocaleString(undefined, { maximumFractionDigits: 2 })
                        : "--"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Returns Summary - Scenario */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Returns Summary - Scenario</h2>
        {scenarioResults.map((scenarioResult, idx) => {
          const years = scenarioResult?.annual_cash_flows?.length || 0;
          const irr = scenarioResult?.irr_results?.leveraged_irr ?? "N/A";
          const unleveragedIrr = scenarioResult?.irr_results?.unleveraged_irr ?? "N/A";
          const purchasePrice = scenarioInput?.[idx]?.property?.purchase_price || 1;
          const capRates = scenarioResult?.annual_cash_flows?.map((cf: any) => cf.noi / purchasePrice);
          const leveragedCashReturns = scenarioResult?.annual_cash_flows?.map((cf: any) => cf.leveraged_cash_flow / (scenarioResult.equity_required || 1));
          const avgLeveragedCashReturn = leveragedCashReturns && leveragedCashReturns.length
            ? leveragedCashReturns.reduce((a: number, b: number) => a + b, 0) / leveragedCashReturns.length
            : null;
          return (
            <div key={idx} className="mb-6">
              <h3 className="font-semibold mb-1">Scenario {idx + 1}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border"> </th>
                      {[...Array(years)].map((_, i) => (
                        <th key={i} className="px-4 py-2 border">Year {i + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border font-medium">Unleveraged 7 YR IRR</td>
                      {[...Array(years)].map((_, i) => (
                        <td key={i} className="px-4 py-2 border text-center">{i === 0 ? (typeof unleveragedIrr === 'number' ? (unleveragedIrr * 100).toFixed(2) + '%' : unleveragedIrr) : ''}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border font-medium">Leveraged 7 YR IRR</td>
                      {[...Array(years)].map((_, i) => (
                        <td key={i} className="px-4 py-2 border text-center">{i === 0 ? (typeof irr === 'number' ? (irr * 100).toFixed(2) + '%' : irr) : ''}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border font-medium">Capitalization Rate</td>
                      {capRates?.map((cap: number, i: number) => (
                        <td key={i} className="px-4 py-2 border text-center">{typeof cap === 'number' ? (cap * 100).toFixed(2) + '%' : '--'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border font-medium">Leveraged Cash Return</td>
                      {leveragedCashReturns?.map((val: number, i: number) => (
                        <td key={i} className="px-4 py-2 border text-center">{typeof val === 'number' ? (val * 100).toFixed(2) + '%' : '--'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border font-medium">7 YR AVG Cash Return</td>
                      {[...Array(years)].map((_, i) => (
                        <td key={i} className="px-4 py-2 border text-center">{i === 0 && avgLeveragedCashReturn != null ? (avgLeveragedCashReturn * 100).toFixed(2) + '%' : ''}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
      {error && <span className="text-red-600 ml-4">{error}</span>}
    </div>
  );
} 