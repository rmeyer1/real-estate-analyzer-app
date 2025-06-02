"use client";
import React, { useState } from "react";
import { useScenario } from "@/lib/ScenarioContext";

export default function ProjectionDashboard() {
  const { scenarioInput, scenarioResults, loading, error } = useScenario();
  const [selectedScenario, setSelectedScenario] = useState(0);

  // Use scenarioInput and scenarioResults from context for all data rendering
  // Remove all local state and API logic

  // Example: get current scenario result
  const currentResult = scenarioResults[selectedScenario] || null;

  // Helper to format percent
  const fmtPct = (val: number | undefined | null) =>
    typeof val === "number" ? (val * 100).toFixed(2) + "%" : "--";
  // Helper to format currency
  const fmtCur = (val: number | undefined | null) =>
    typeof val === "number" ? "$" + val.toLocaleString() : "--";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cash Flow Projections</h1>

      {/* Scenario Selector */}
      <div className="mb-8 flex items-center gap-4">
        <label className="text-lg font-medium">Scenario</label>
        <select
          className="w-24 border rounded px-3 py-2"
          value={selectedScenario}
          onChange={e => setSelectedScenario(Number(e.target.value))}
        >
          {[0, 1, 2].map(i => (
            <option key={i} value={i}>{`Scenario ${i + 1}`}</option>
          ))}
        </select>
      </div>

      {/* Pricing Table */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-2">Pricing</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm mb-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border bg-white"></th>
                <th className="px-4 py-2 border text-center font-semibold">Scenario 1</th>
                <th className="px-4 py-2 border text-center font-semibold">Scenario 2</th>
                <th className="px-4 py-2 border text-center font-semibold">Scenario 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">Purchase Price</td>
                {[0, 1, 2].map(i => (
                  <td key={i} className="px-4 py-2 border text-right">
                    {scenarioInput[i]?.property?.purchase_price ? fmtCur(scenarioInput[i].property.purchase_price) : "--"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2 border">Loan Amount</td>
                {[0, 1, 2].map(i => (
                  <td key={i} className="px-4 py-2 border text-right">
                    {scenarioInput[i]?.financing?.loan_amount ? fmtCur(scenarioInput[i].financing.loan_amount) : "--"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2 border">Total Equity Required</td>
                {[0, 1, 2].map(i => (
                  <td key={i} className="px-4 py-2 border text-right">
                    {scenarioResults[i]?.equity_required ? fmtCur(scenarioResults[i]?.equity_required) : "--"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2 border">Unleveraged IRR</td>
                {[0, 1, 2].map(i => (
                  <td key={i} className="px-4 py-2 border text-right">
                    {scenarioResults[i]?.irr_results?.unleveraged_irr ? fmtPct(scenarioResults[i]?.irr_results?.unleveraged_irr) : "--"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-2 border">Leveraged IRR</td>
                {[0, 1, 2].map(i => (
                  <td key={i} className="px-4 py-2 border text-right">
                    {scenarioResults[i]?.irr_results?.leveraged_irr ? fmtPct(scenarioResults[i]?.irr_results?.leveraged_irr) : "--"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* New Loan Table */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-2">New Loan</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm mb-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border"> </th>
                <th className="px-4 py-2 border">Scenario 1</th>
                <th className="px-4 py-2 border">Scenario 2</th>
                <th className="px-4 py-2 border">Scenario 3</th>
              </tr>
            </thead>
            <tbody>
              {[
                'New Loan Amount',
                'LTV',
                'Interest Rate',
                'Start Date',
                'Maturity',
                'Term',
                'Amortization',
                'Years of Interest Only',
                'First Year Principal Payment Required',
                'Amortization Period',
                'Annual Payment',
                'Loan Constant',
              ].map((label, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border">{label}</td>
                  {[...Array(3)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border text-center text-gray-700">--</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculation of Residual Table */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-2">Calculation of Residual</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm mb-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border"> </th>
                <th className="px-4 py-2 border">Per Unit</th>
              </tr>
            </thead>
            <tbody>
              {[
                'Holding Period',
                'Exit Year',
                'Residual Cap Rate',
                'Gross Residual',
                'Cost of Sale (% of Gross Residual)',
                'Cost of Sale',
                'Net Residual Value',
                'Outstanding Loan Balance',
                'Net Residual After OLB',
              ].map((label, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border">{label}</td>
                  <td className="px-4 py-2 border text-center text-gray-700">--</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part Two: Multi-Year Projection Table */}
      <div className="mb-10">
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border bg-white"></th>
                {[...Array(currentResult?.annual_cash_flows?.length || 7)].map((_, i) => (
                  <th key={i} className="px-4 py-2 border font-semibold">Year {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Gross Income", key: "gross_income" },
                { label: "Total Expenses", key: "total_expenses" },
                { label: "NOI", key: "noi" },
                { label: "CapEx", key: "capex" },
                { label: "Cash Flow Operations", key: "cash_flow_operations" },
                { label: "Leveraged Cash Flow", key: "leveraged_cash_flow" },
                { label: "Debt Service", key: "debt_service" },
              ].map(row => (
                <tr key={row.key}>
                  <td className="px-4 py-2 border font-medium">{row.label}</td>
                  {[...Array(currentResult?.annual_cash_flows?.length || 7)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border text-right">
                      {currentResult?.annual_cash_flows?.[i]?.[row.key] != null
                        ? fmtCur(currentResult.annual_cash_flows[i][row.key])
                        : "--"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Returns Section */}
      <div className="mb-10">
        <div className="bg-slate-700 text-white font-bold px-4 py-2 rounded-t flex items-center text-lg">
          <span>Returns</span>
        </div>
        <div className="border border-t-0 rounded-b overflow-x-auto bg-white">
          <table className="min-w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium align-top w-64">Unleveraged 7 YR IRR</td>
                <td className="px-4 py-2 text-right w-32">{currentResult?.irr_results?.unleveraged_irr ? fmtPct(currentResult.irr_results.unleveraged_irr) : "--"}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium align-top">Leveraged 7 YR IRR</td>
                <td className="px-4 py-2 text-right">{currentResult?.irr_results?.leveraged_irr ? fmtPct(currentResult.irr_results.leveraged_irr) : "--"}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium align-top">Capitalization Rate</td>
                <td className="px-4 py-2 text-right">--</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium align-top">Leveraged Cash Return</td>
                <td className="px-4 py-2 text-right">--</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium align-top">7 YR AVG Cash Return</td>
                <td className="px-4 py-2 text-right">--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 