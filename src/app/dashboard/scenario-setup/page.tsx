"use client";
import React, { useState } from "react";
import { analyzeScenario, ScenarioAnalysisRequest } from "@/lib/analyzeScenario";
import { useScenario } from "@/lib/ScenarioContext";

export default function ScenarioSetupDashboard() {
  // State for property info
  const [property, setProperty] = useState({
    property_name: "",
    units: "",
    total_sqft: "",
    purchase_price: "",
    transaction_date: "",
    hold_period: "7",
  });
  // State for scenario table (3 scenarios)
  const [scenarios, setScenarios] = useState([
    { purchase_price: "", loan: "", ltv: "", equity: "" },
    { purchase_price: "", loan: "", ltv: "", equity: "" },
    { purchase_price: "", loan: "", ltv: "", equity: "" },
  ]);
  // State for financing (using scenario 1 for now)
  const [financing, setFinancing] = useState({
    loan_amount: "",
    interest_rate: "",
    loan_term: "30",
    amortization_period: "30",
    interest_only_period: "",
    loan_origination_fee_rate: "0.01",
  });
  // State for unit types (single type for now)
  const [unitTypes, setUnitTypes] = useState([
    { unit_type: "", description: "", unit_count: "", sqft_per_unit: "", market_rent: "" },
  ]);
  // API state
  const { setScenarioInput, setScenarioResults, loading, setLoading, error, setError } = useScenario();

  // Handlers for property fields
  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  // Handlers for scenario table
  const handleScenarioChange = (idx: number, field: string, value: string) => {
    setScenarios((prev) => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));
    if (idx === 0 && ["loan"].includes(field)) {
      setFinancing((prev) => ({ ...prev, loan_amount: value }));
    }
    if (idx === 0 && ["purchase_price"].includes(field)) {
      setProperty((prev) => ({ ...prev, purchase_price: value }));
    }
  };

  // Rent Roll State and Handlers
  const handleUnitTypeChange = (idx: number, field: string, value: string) => {
    setUnitTypes((prev) => prev.map((ut, i) => i === idx ? { ...ut, [field]: value } : ut));
  };

  const addUnitType = () => {
    setUnitTypes((prev) => [...prev, { unit_type: "", description: "", unit_count: "", sqft_per_unit: "", market_rent: "" }]);
  };

  const removeUnitType = (idx: number) => {
    setUnitTypes((prev) => prev.filter((_, i) => i !== idx));
  };

  // Validation: at least one unit type with nonzero count and market rent
  const isValidRentRoll = unitTypes.some(ut => Number(ut.unit_count) > 0 && Number(ut.market_rent) > 0);

  // Handler for running analysis
  const runAnalysis = async () => {
    if (!unitTypes.some(ut => Number(ut.unit_count) > 0 && Number(ut.market_rent) > 0)) {
      setError("Please enter at least one unit type with a nonzero count and market rent.");
      return;
    }
    setLoading(true);
    setError(null);
    setScenarioResults([null, null, null]);
    try {
      const requests = scenarios.map((scenario, idx) => {
        const payload: ScenarioAnalysisRequest = {
          property: {
            ...property,
            units: Number(property.units) || 0,
            total_sqft: Number(property.total_sqft) || 0,
            purchase_price: Number(scenario.purchase_price) || 0,
            hold_period: Number(property.hold_period) || 0,
          },
          financing: {
            ...financing,
            loan_amount: Number(scenario.loan) || 0,
            interest_rate: Number(financing.interest_rate) || 0,
            loan_term: Number(financing.loan_term) || 0,
            amortization_period: Number(financing.amortization_period) || 0,
            interest_only_period: Number(financing.interest_only_period) || 0,
            loan_origination_fee_rate: Number(financing.loan_origination_fee_rate) || 0.01,
          },
          unit_types: unitTypes.map(ut => ({
            ...ut,
            unit_count: Number(ut.unit_count) || 0,
            sqft_per_unit: Number(ut.sqft_per_unit) || 0,
            market_rent: Number(ut.market_rent) || 0,
          })),
        };
        return analyzeScenario(payload).catch(() => null);
      });
      const results = await Promise.all(requests);
      setScenarioInput(requests.map((_, idx) => ({
        property: {
          ...property,
          units: Number(property.units) || 0,
          total_sqft: Number(property.total_sqft) || 0,
          purchase_price: Number(scenarios[idx].purchase_price) || 0,
          hold_period: Number(property.hold_period) || 0,
        },
        financing: {
          ...financing,
          loan_amount: Number(scenarios[idx].loan) || 0,
          interest_rate: Number(financing.interest_rate) || 0,
          loan_term: Number(financing.loan_term) || 0,
          amortization_period: Number(financing.amortization_period) || 0,
          interest_only_period: Number(financing.interest_only_period) || 0,
          loan_origination_fee_rate: Number(financing.loan_origination_fee_rate) || 0.01,
        },
        unit_types: unitTypes.map(ut => ({
          ...ut,
          unit_count: Number(ut.unit_count) || 0,
          sqft_per_unit: Number(ut.sqft_per_unit) || 0,
          market_rent: Number(ut.market_rent) || 0,
        })),
      })));
      setScenarioResults(results);
    } catch (err: any) {
      setError(err?.message || "Error running analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Scenario Setup Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
          <input name="property_name" type="text" className="w-full border rounded px-3 py-2" placeholder="Building I Want" value={property.property_name} onChange={handlePropertyChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
          <input name="units" type="number" className="w-full border rounded px-3 py-2" placeholder="160" value={property.units} onChange={handlePropertyChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Sq Ft</label>
          <input name="total_sqft" type="number" className="w-full border rounded px-3 py-2" placeholder="258,656" value={property.total_sqft} onChange={handlePropertyChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Date</label>
          <input name="transaction_date" type="date" className="w-full border rounded px-3 py-2" value={property.transaction_date} onChange={handlePropertyChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hold Period</label>
          <input name="hold_period" type="number" className="w-full border rounded px-3 py-2" placeholder="7" value={property.hold_period} onChange={handlePropertyChange} />
        </div>
      </div>

      {/* Scenario Table */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Scenario</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Scenario</th>
                <th className="px-4 py-2 border">Purchase Price</th>
                <th className="px-4 py-2 border">Loan</th>
                <th className="px-4 py-2 border">LTV</th>
                <th className="px-4 py-2 border">Equity</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border text-center">{idx + 1}</td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="$80,000,000" value={scenario.purchase_price} onChange={e => handleScenarioChange(idx, "purchase_price", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="$52,000,000" value={scenario.loan} onChange={e => handleScenarioChange(idx, "loan", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="65%" value={scenario.ltv} onChange={e => handleScenarioChange(idx, "ltv", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="$28,000,000" value={scenario.equity} onChange={e => handleScenarioChange(idx, "equity", e.target.value)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rent Roll */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Rent Roll</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Unit Type</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Unit Count</th>
                <th className="px-4 py-2 border">Sqft/Unit</th>
                <th className="px-4 py-2 border">Market Rent</th>
                <th className="px-4 py-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {unitTypes.map((ut, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border">
                    <input type="text" className="w-full border rounded px-2 py-1" placeholder="1BR" value={ut.unit_type} onChange={e => handleUnitTypeChange(idx, "unit_type", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="text" className="w-full border rounded px-2 py-1" placeholder="Description" value={ut.description} onChange={e => handleUnitTypeChange(idx, "description", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="80" value={ut.unit_count} onChange={e => handleUnitTypeChange(idx, "unit_count", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="1000" value={ut.sqft_per_unit} onChange={e => handleUnitTypeChange(idx, "sqft_per_unit", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="1500" value={ut.market_rent} onChange={e => handleUnitTypeChange(idx, "market_rent", e.target.value)} />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {unitTypes.length > 1 && (
                      <button type="button" className="text-red-600 hover:underline" onClick={() => removeUnitType(idx)}>
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="mt-2 bg-green-600 text-white px-4 py-1 rounded font-semibold hover:bg-green-700" onClick={addUnitType}>
            Add Unit Type
          </button>
        </div>
        {!isValidRentRoll && <div className="text-red-600 mt-2">Please enter at least one unit type with a nonzero count and market rent.</div>}
      </div>

      {/* Run Analysis Button */}
      <div className="mb-8 flex items-center gap-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
          onClick={runAnalysis}
          disabled={loading}
        >
          {loading ? "Running..." : "Run analysis"}
        </button>
        {error && <span className="text-red-600 ml-4">{error}</span>}
      </div>
    </div>
  );
} 