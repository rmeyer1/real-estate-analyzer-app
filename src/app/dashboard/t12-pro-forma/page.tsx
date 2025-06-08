"use client";
import React, { useState } from "react";
import { useScenario } from "@/lib/ScenarioContext";

function getLast12Months() {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.unshift(
      d.toLocaleString("default", { month: "short" }) +
      "-" +
      String(d.getFullYear()).slice(-2)
    );
  }
  return months;
}

const months = getLast12Months();

type Row = {
  label: string;
  bold?: boolean;
  indent?: number;
  section?: boolean;
  double?: boolean;
  italic?: boolean;
};

const incomeRows: Row[] = [
  { label: "Effective Rental Income", bold: true },
  { label: "Rental Income", indent: 1 },
  { label: "Gain/Loss to Lease", indent: 1 },
  { label: "Gross Potential Income", bold: true, section: true },
  { label: "Vacancy", indent: 1 },
  { label: "Concessions", indent: 1 },
  { label: "Delinquency/Credit Loss/Bad Debt", indent: 1 },
  { label: "Total Rental Income", bold: true },
  { label: "Other Income", section: true },
  { label: "Laundry", indent: 1 },
  { label: "Parking", indent: 1 },
  { label: "Late Fee Revenue", indent: 1 },
  { label: "Other Resident Revenue", indent: 1 },
  { label: "Total Other Income", bold: true },
  { label: "TOTAL INCOME", bold: true, double: true },
];

const expenseRows: Row[] = [
  { label: "OPERATING EXPENSES", section: true },
  { label: "Administrative", indent: 1 },
  { label: "Advertising", indent: 1 },
  { label: "Supplies", indent: 1 },
  { label: "Repairs and Maintenance", indent: 1 },
  { label: "Electricity", indent: 1 },
  { label: "Water", indent: 1 },
  { label: "Trash Removal", indent: 1 },
  { label: "Pest Control", indent: 1 },
  { label: "Contract Services", indent: 1 },
  { label: "Telephone", indent: 1 },
  { label: "Staff Development", indent: 1 },
  { label: "Professional Fees", indent: 1 },
  { label: "Miscellaneous", indent: 1 },
  { label: "Security", indent: 1 },
  { label: "Equipment Lease", indent: 1 },
  { label: "Total Variable Expenses", bold: true },
  { label: "% of Total Income", italic: true },
  { label: "Management Fees", indent: 1 },
  { label: "Real Estate Taxes", indent: 1 },
  { label: "Property Liability/Insurance", indent: 1 },
  { label: "Total Fixed Expenses", bold: true },
  { label: "% of Total Income", italic: true },
  { label: "TOTAL OPERATING EXPENSES", bold: true, double: true },
  { label: "% of Total Income", italic: true },
];

const summaryRows: Row[] = [
  { label: "NET OPERATING INCOME (NOI)", bold: true },
  { label: "% of Total Income", italic: true },
  { label: "CAPITAL EXPENDITURES", section: true },
  { label: "Capital Replacement / Capital Reserves", indent: 1 },
  { label: "CASH FLOW FROM OPERATIONS", bold: true },
];

const allRows: Row[] = [
  ...incomeRows,
  ...expenseRows,
  ...summaryRows,
];

// Map row label to backend key
const labelToKey: Record<string, string> = {
  "Effective Rental Income": "effective_rental_income",
  "Rental Income": "rental_income",
  "Gain/Loss to Lease": "gain_loss_to_lease",
  "Gross Potential Income": "gross_potential_income",
  "Vacancy": "vacancy_loss",
  "Concessions": "concessions",
  "Delinquency/Credit Loss/Bad Debt": "bad_debt",
  "Total Rental Income": "total_rental_income",
  "Other Income": "other_income",
  "Laundry": "Laundry",
  "Parking": "Parking",
  "Late Fee Revenue": "Late Fee Revenue",
  "Other Resident Revenue": "Other Resident Revenue",
  "Total Other Income": "total_other_income",
  "TOTAL INCOME": "total_income",
  "Administrative": "Administrative",
  "Advertising": "Advertising",
  "Supplies": "Supplies",
  "Repairs and Maintenance": "Repairs and Maintenance",
  "Electricity": "Electricity",
  "Water": "Water",
  "Trash Removal": "Trash Removal",
  "Pest Control": "Pest Control",
  "Contract Services": "Contract Services",
  "Telephone": "Telephone",
  "Staff Development": "Staff Development",
  "Professional Fees": "Professional Fees",
  "Miscellaneous": "Miscellaneous",
  "Security": "Security",
  "Equipment Lease": "Equipment Lease",
  "Total Variable Expenses": "total_variable_expenses",
  "Management Fees": "management_fee",
  "Real Estate Taxes": "real_estate_taxes",
  "Property Liability/Insurance": "insurance",
  "Total Fixed Expenses": "total_fixed_expenses",
  "Total Expenses": "total_expenses",
  "NOI": "noi",
  "NET OPERATING INCOME (NOI)": "noi",
  "CAPITAL EXPENDITURES": "capex",
  "Capital Replacement / Capital Reserves": "capex",
  "CASH FLOW FROM OPERATIONS": "cash_flow_operations",
  "Debt Service": "debt_service",
  "Leveraged Cash Flow": "leveraged_cash_flow",
};

const fmtCur = (val: number | undefined | null) =>
  typeof val === "number" ? "$" + val.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "--";

function AssumedValue({ value, assumed }: { value: number | undefined | null, assumed: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: 'relative' }}>
      {fmtCur(value)}
      {assumed && (
        <span
          style={{ color: 'orange', cursor: 'pointer', marginLeft: 2 }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          *
          {show && (
            <span style={{
              position: 'absolute',
              background: '#fffbe6',
              color: '#333',
              border: '1px solid #e2e8f0',
              padding: '2px 6px',
              borderRadius: 4,
              left: 12,
              top: -4,
              zIndex: 10,
              fontSize: '0.85em',
              whiteSpace: 'nowrap',
            }}>
              Value is an estimate based on default assumptions.
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export default function T12ProFormaDashboard() {
  const { scenarioInput, scenarioResults, loading, error } = useScenario();
  const currentResult = scenarioResults[0] || null;
  const annualCashFlows = currentResult?.annual_cash_flows || [];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Trailing 12 & Pro Forma Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs border">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="px-4 py-2 border text-left w-64">&nbsp;</th>
              {months.map((month) => (
                <th key={month} className="px-4 py-2 border text-center font-semibold">
                  {month} <br /> Actual
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allRows.map((row, idx) => (
              <tr
                key={row.label + '-' + idx}
                className={
                  (row.section ? "bg-gray-100 font-bold text-sm" : "") +
                  (row.double ? " border-t-4 border-black" : "")
                }
              >
                <td
                  className={
                    "px-4 py-2 border whitespace-nowrap " +
                    (row.bold ? "font-bold " : "") +
                    (row.italic ? "italic text-gray-600 " : "") +
                    (row.section ? "bg-gray-100 " : "") +
                    (row.double ? "border-t-4 border-black " : "")
                  }
                  style={{ paddingLeft: row.indent ? `${row.indent * 1.5}rem` : undefined }}
                >
                  {row.label}
                </td>
                {months.map((month, i) => {
                  const key = labelToKey[row.label];
                  const assumedKey = key ? `${key}_assumed` : undefined;
                  const value = i < annualCashFlows.length && key ? annualCashFlows[i]?.[key] : undefined;
                  const assumed = i < annualCashFlows.length && assumedKey ? !!annualCashFlows[i]?.[assumedKey] : false;
                  return (
                    <td
                      key={month + i}
                      className="px-2 py-1 border text-right bg-yellow-50"
                    >
                      {key ? <AssumedValue value={value} assumed={assumed} /> : "--"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 