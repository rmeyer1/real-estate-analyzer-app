import React from "react";

export default function ProjectionDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cash Flow Projections</h1>

      {/* Scenario Selector */}
      <div className="mb-8 flex items-center gap-4">
        <label className="text-lg font-medium">Scenario</label>
        <input type="number" className="w-24 border rounded px-3 py-2" min={1} max={3} defaultValue={1} />
      </div>

      {/* Pricing Table */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-2">Pricing</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm mb-2">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border bg-white"></th>
                <th className="px-4 py-2 border bg-white"></th>
                <th className="px-4 py-2 border text-center font-semibold">High</th>
                <th className="px-4 py-2 border text-center font-semibold">Mid</th>
                <th className="px-4 py-2 border text-center font-semibold">Low</th>
                <th className="px-4 py-2 border bg-white"></th>
                <th className="px-4 py-2 border bg-white"></th>
              </tr>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border"> </th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Scenario 1</th>
                <th className="px-4 py-2 border">Scenario 2</th>
                <th className="px-4 py-2 border">Scenario 3</th>
                <th className="px-4 py-2 border">Per Unit</th>
                <th className="px-4 py-2 border">PSF</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Purchase Price', placeholder: '80,000,000' },
                { label: 'Acquisitions Reserves', placeholder: '0' },
                { label: 'Loan Amount', placeholder: '(52,000,000)' },
                { label: 'Loan Origination Fee (1%)', placeholder: '520,000' },
                { label: 'Total Equity Required', placeholder: '28,520,000', bold: true },
              ].map((row, idx) => (
                <tr key={idx} className={row.bold ? 'font-bold' : ''}>
                  <td className="px-4 py-2 border">{row.label}</td>
                  {[...Array(5)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border">
                      <input type="text" className="w-full border rounded px-2 py-1" placeholder={row.placeholder} />
                    </td>
                  ))}
                  <td className="px-4 py-2 border">
                    <input type="text" className="w-full border rounded px-2 py-1" placeholder={row.placeholder} />
                  </td>
                </tr>
              ))}
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
                {[...Array(9)].map((_, i) => (
                  <th key={i} className="px-4 py-2 border font-semibold">Year {i + 1}<br /><span className="font-normal">{2017 + i}</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Income Section */}
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">INCOME</td></tr>
              {[
                'Effective Rental Income',
                'Current Market Rents',
                'Loss to Lease',
                'Gross Potential Income',
                'Vacancy',
                'Concessions / Discounts',
                'Bad Debt',
                'Effective Rental Income',
                'Other Income',
                'GROSS INCOME',
                'YOY Growth (%)',
              ].map((label, idx) => (
                <tr key={label + '-income-' + idx} className={['GROSS INCOME', 'YOY Growth (%)'].includes(label) ? 'font-bold' : ''}>
                  <td className="px-4 py-2 border">{label}</td>
                  {[...Array(9)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border text-right">--</td>
                  ))}
                </tr>
              ))}
              {/* Expenses Section */}
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">EXPENSES</td></tr>
              {[
                'Variable Expenses',
                'Management Fee',
                'Real Estate Taxes',
                'Property/Liability Insurance',
                'Total Fixed Expenses',
                'TOTAL EXPENSES',
                '% of Gross Income',
              ].map((label, idx) => (
                <tr key={label + '-expense-' + idx} className={['TOTAL EXPENSES', '% of Gross Income'].includes(label) ? 'font-bold' : ''}>
                  <td className="px-4 py-2 border">{label}</td>
                  {[...Array(9)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border text-right">--</td>
                  ))}
                </tr>
              ))}
              {/* NOI, CapEx, Cash Flow, Debt */}
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">NET OPERATING INCOME</td></tr>
              <tr className="font-bold"><td className="px-4 py-2 border">Net Operating Income</td>{[...Array(9)].map((_, i) => (<td key={i} className="px-4 py-2 border text-right">--</td>))}</tr>
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">CAPITAL EXPENDITURES</td></tr>
              <tr><td className="px-4 py-2 border">Capital Expenditures (Capital Reserves)</td>{[...Array(9)].map((_, i) => (<td key={i} className="px-4 py-2 border text-right">--</td>))}</tr>
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">CASH FLOW FROM OPERATIONS</td></tr>
              <tr className="font-bold"><td className="px-4 py-2 border">Cash Flow from Operations</td>{[...Array(9)].map((_, i) => (<td key={i} className="px-4 py-2 border text-right">--</td>))}</tr>
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">DEBT FINANCING</td></tr>
              <tr><td className="px-4 py-2 border">Debt Service</td>{[...Array(9)].map((_, i) => (<td key={i} className="px-4 py-2 border text-right">--</td>))}</tr>
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">CASH FLOW AFTER DEBT FINANCING</td></tr>
              <tr className="font-bold"><td className="px-4 py-2 border">Cash Flow After Debt Financing</td>{[...Array(9)].map((_, i) => (<td key={i} className="px-4 py-2 border text-right">--</td>))}</tr>
              <tr><td className="px-4 py-2 border">Debt Service Coverage Ratio</td>{[...Array(9)].map((_, i) => (<td key={i} className="px-4 py-2 border text-right">--</td>))}</tr>
              {/* Assumptions Table */}
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">ASSUMPTIONS</td></tr>
              {[
                'Market Rent Growth',
                'Loss to Lease',
                'Vacancy',
                'Non Revenue / Respite Units',
                'Concessions / Discounts',
                'Bad Debt',
                'Inflation Factor',
                'Management Fee',
              ].map((label, idx) => (
                <tr key={label + '-assumption-' + idx}>
                  <td className="px-4 py-2 border">{label}</td>
                  {[...Array(9)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border text-right">--</td>
                  ))}
                </tr>
              ))}
              {/* Summary Table */}
              <tr><td colSpan={10} className="font-bold bg-gray-50 px-4 py-2 border">SUMMARY</td></tr>
              {[
                'Unleveraged Return',
                'CF',
                'Capital Events',
                'Leveraged Return',
              ].map((label, idx) => (
                <tr key={label + '-summary-' + idx}>
                  <td className="px-4 py-2 border">{label}</td>
                  {[...Array(9)].map((_, i) => (
                    <td key={i} className="px-4 py-2 border text-right">--</td>
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
                <td className="px-4 py-2 text-right w-32">--</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-medium align-top">Leveraged 7 YR IRR</td>
                <td className="px-4 py-2 text-right">--</td>
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
          {/* 7 YR AVG Cash Return Calculation Table */}
          <div className="mt-6">
            <div className="flex items-center font-semibold text-base mb-2">
              <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><polygon points="7,5 15,10 7,15" /></svg>
              7 YR AVG Cash Return Calculation
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border text-center font-semibold">Year 1</th>
                    <th className="px-4 py-2 border text-center font-semibold">Year 2</th>
                    <th className="px-4 py-2 border text-center font-semibold">Year 3</th>
                    <th className="px-4 py-2 border text-center font-semibold">Year 4</th>
                    <th className="px-4 py-2 border text-center font-semibold">Year 5</th>
                    <th className="px-4 py-2 border text-center font-semibold">Year 6</th>
                    <th className="px-4 py-2 border text-center font-semibold">Year 7</th>
                    <th className="px-4 py-2 border text-center font-semibold">Year 8</th>
                    <th className="px-4 py-2 border text-center font-semibold">Year 9</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {[...Array(9)].map((_, i) => (
                      <td key={i} className="px-4 py-2 border text-center">--</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 