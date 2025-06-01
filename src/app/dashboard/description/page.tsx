import React from "react";

export default function DescriptionDashboard() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Property Valuation Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="Building I Want" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
          <input type="number" className="w-full border rounded px-3 py-2" placeholder="160" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Sq Ft</label>
          <input type="number" className="w-full border rounded px-3 py-2" placeholder="258,656" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Date</label>
          <input type="date" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hold Period</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="7 Years" />
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
              {[1, 2, 3].map((scenario) => (
                <tr key={scenario}>
                  <td className="px-4 py-2 border text-center">{scenario}</td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="$80,000,000" />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="$52,000,000" />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="65%" />
                  </td>
                  <td className="px-4 py-2 border">
                    <input type="number" className="w-full border rounded px-2 py-1" placeholder="$28,000,000" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Returns Section (placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unleveraged Return</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="6.03%" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leveraged Return</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="9.00%" />
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
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="px-4 py-2 border">Year {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                'Unleveraged 7 YR IRR',
                'Leveraged 7 YR IRR',
                'Capitalization Rate',
                'Leveraged Cash Return',
                '7 YR AVG Cash Return',
              ].map((label, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border font-medium">{label}</td>
                  {[...Array(7)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border text-center">--</td>
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
        {[1, 2, 3].map((scenario) => (
          <div key={scenario} className="mb-6">
            <h3 className="font-semibold mb-1">Scenario {scenario}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border"> </th>
                    {[...Array(7)].map((_, i) => (
                      <th key={i} className="px-4 py-2 border">Year {i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Unleveraged 7 YR IRR',
                    'Leveraged 7 YR IRR',
                    'Capitalization Rate',
                    'Leveraged Cash Return',
                    '7 YR AVG Cash Return',
                  ].map((label, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 border font-medium">{label}</td>
                      {[...Array(7)].map((_, i) => (
                        <td key={i} className="px-4 py-2 border text-center">▲</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 