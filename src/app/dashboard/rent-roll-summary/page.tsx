import React from "react";

// These would come from props, context, or data fetching in a real app
const propertyName = ""; // e.g., "Building I Want"

const columns = [
  { label: "Type", group: null },
  { label: "Unit Description", group: null },
  { label: "Units", group: null },
  { label: "%", group: null },
  { label: "SF Total", group: null },
  { label: "SF / Unit", group: null },
  { label: "Occupied", group: "Status" },
  { label: "Vacant", group: "Status" },
  { label: "Rent", group: "Market" },
  { label: "PSF", group: "Market" },
  { label: "Rent", group: "Lease" },
  { label: "LTL", group: "Lease" },
  { label: "Monthly Rent", group: "Market" },
  { label: "Annual Rent", group: "Market" },
];

const groupHeaders = [
  { label: "", span: 6 },
  { label: "Status", span: 2 },
  { label: "Market", span: 2 },
  { label: "Lease", span: 2 },
  { label: "Market", span: 2 },
];

const placeholderRows = [
  { type: "A", desc: "1 BR/BA" },
  { type: "B", desc: "1 BR/BA" },
  { type: "C", desc: "2 BR/BA" },
  { type: "D", desc: "2 BR/BA DEN" },
  { type: "E", desc: "3 BR/BA DEN" },
];

// Dynamic total row values (use dashes as placeholders for now)
const totalRow = [
  "--", // Type
  "--", // Unit Description
  "--", // Units
  "--", // %
  "--", // SF Total
  "--", // SF / Unit
  "--", // Occupied
  "--", // Vacant
  "--", // Market Rent
  "--", // Market PSF
  "--", // Lease Rent
  "--", // Lease LTL
  "--", // Monthly Rent
  "--", // Annual Rent
];

export default function RentRollSummaryDashboard() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="bg-slate-700 text-white font-bold text-2xl px-4 py-2 rounded-t">Rent Roll Summary</div>
      {/* Property Name */}
      <div className="px-4 pt-2 pb-4 text-blue-700 font-medium text-lg">
        {propertyName || <span className="italic text-gray-400">(not set)</span>}
      </div>
      {/* Table */}
      <div className="overflow-x-auto border rounded-b bg-white">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              {groupHeaders.map((g, i) => (
                <th
                  key={i}
                  colSpan={g.span}
                  className={
                    "px-2 py-1 border-b-2 border-slate-700 text-center font-bold bg-white text-base " +
                    (g.label ? "" : "")
                  }
                >
                  {g.label}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-100">
              {columns.map((col, i) => (
                <th
                  key={col.label + i}
                  className="px-2 py-1 border-b border-slate-300 text-center font-semibold whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {placeholderRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td className="px-2 py-1 border text-center bg-yellow-50 font-bold">{row.type}</td>
                <td className="px-2 py-1 border text-center bg-yellow-50">{row.desc}</td>
                {columns.slice(2).map((col, colIdx) => (
                  <td key={col.label + colIdx} className="px-2 py-1 border text-center">--</td>
                ))}
              </tr>
            ))}
            {/* Total Row */}
            <tr className="font-bold bg-gray-50 border-t-2 border-slate-700">
              {totalRow.map((val, idx) => (
                <td key={idx} className="px-2 py-1 border text-center">{val}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 