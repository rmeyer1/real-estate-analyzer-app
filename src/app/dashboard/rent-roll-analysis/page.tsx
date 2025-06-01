import React from "react";

const columns = [
  { label: "Unit ID" },
  { label: "Type" },
  { label: "SF" },
  { label: "Status" },
  { label: "Move-In Date" },
  { label: "Lease Start" },
  { label: "Market Rent" },
  { label: "Lease Rent" },
  { label: "Loss to Lease" },
  { label: "% Loss" },
  { label: "Vacant Unit Count" },
  { label: "Occupied SF Count" },
];

const placeholderRows = Array.from({ length: 20 });

// These would come from props, context, or data fetching in a real app
const propertyName = ""; // e.g., "Building I Want"
const rentRollDate = ""; // e.g., "11/13/2016"

export default function RentRollAnalysisDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Rent Roll Analysis</h1>
      {/* Header Section */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-8">
        <div className="text-lg font-medium mb-2 md:mb-0">
          Property Name: <span className="font-normal">{propertyName || <span className="italic text-gray-400">(not set)</span>}</span>
        </div>
        <div className="text-lg font-medium">
          Rent Roll Date: <span className="bg-yellow-100 px-2 py-1 rounded font-mono">{rentRollDate || <span className="italic text-gray-400">(not set)</span>}</span>
        </div>
      </div>
      {/* Table Section */}
      <div className="overflow-x-auto border rounded bg-white">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-slate-700 text-white">
              {columns.map((col) => (
                <th key={col.label} className="px-4 py-2 border text-center font-semibold whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {placeholderRows.map((_, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td
                    key={col.label + colIdx}
                    className={
                      "px-4 py-2 border text-center " +
                      (colIdx < 6
                        ? "bg-yellow-50"
                        : colIdx >= 6 && colIdx <= 9
                        ? "bg-gray-100"
                        : "")
                    }
                  >
                    --
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 