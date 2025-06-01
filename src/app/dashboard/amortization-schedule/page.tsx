import React from "react";

export default function AmortizationScheduleDashboard() {
  // Placeholder arrays for table rows
  const amortizationYear = '--'; // Dynamic year placeholder
  const loanYears = Array.from({ length: 7 }, (_, i) => i + 1);
  const fyeCols = Array.from({ length: 10 }, (_, i) => `FYE ${i + 1}`);
  const months = [
    "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February"
  ];
  const amortRows = months.map((month, i) => ({
    year: amortizationYear,
    month,
    idx: i + 1,
  }));

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Debt Schedule & Loan Term Details */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Debt Schedule */}
        <div className="flex-1 border rounded bg-white">
          <div className="bg-slate-700 text-white font-bold px-4 py-2 rounded-t">Debt Schedule</div>
          <div className="p-4 text-sm">
            <div>1st Mortgage <span className="float-right">$ --</span></div>
            <div>Interest Rate <span className="float-right">-- %</span></div>
            <div>Interest per Period <span className="float-right">-- %</span></div>
            <div>Amortization Period <span className="float-right">--</span></div>
            <div>Number of Payments <span className="float-right">--</span></div>
            <div>Monthly Payment <span className="float-right">$ --</span></div>
            <div>Total Annual Payment <span className="float-right">$ --</span></div>
          </div>
        </div>
        {/* Loan Term Details */}
        <div className="flex-1 border rounded bg-white">
          <div className="bg-slate-700 text-white font-bold px-4 py-2 rounded-t">Loan Term Details</div>
          <div className="p-4 text-sm">
            <div>Term: <span className="float-right">-- Years</span></div>
            <div>Start Date: <span className="float-right">--</span></div>
            <div>Amo Starts: <span className="float-right">--</span></div>
            <div>Date of Value: <span className="float-right">--</span></div>
            <div>IO Remaining: <span className="float-right">--</span></div>
          </div>
        </div>
      </div>

      {/* Fixed-Rate 7-Year Loan & Month Ranges */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Fixed-Rate 7-Year Loan Table */}
        <div className="flex-[2] border rounded bg-white">
          <div className="bg-slate-200 font-bold px-4 py-2 rounded-t">Fixed-Rate 7-Year Loan</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border">Year</th>
                  <th className="px-2 py-1 border">Interest</th>
                  <th className="px-2 py-1 border">Principal</th>
                  <th className="px-2 py-1 border">Balance</th>
                  <th className="px-2 py-1 border">Payment</th>
                </tr>
              </thead>
              <tbody>
                {loanYears.map((year) => (
                  <tr key={year}>
                    <td className="px-2 py-1 border text-center">{year}</td>
                    <td className="px-2 py-1 border text-right">--</td>
                    <td className="px-2 py-1 border text-right">--</td>
                    <td className="px-2 py-1 border text-right">--</td>
                    <td className="px-2 py-1 border text-right">--</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Month Ranges Table */}
        <div className="flex-1 border rounded bg-white">
          <div className="bg-slate-200 font-bold px-4 py-2 rounded-t">Month Ranges</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border">Beginning Month</th>
                  <th className="px-2 py-1 border">End Month</th>
                </tr>
              </thead>
              <tbody>
                {[1, 13, 25, 37, 49, 61, 73, 85, 97, 109, 121].map((start, idx) => (
                  <tr key={start}>
                    <td className="px-2 py-1 border text-center">{start}</td>
                    <td className="px-2 py-1 border text-center">{start + 11}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FYE Summary Table */}
      <div className="mb-6 border rounded bg-white">
        <div className="bg-slate-200 font-bold px-4 py-2 rounded-t">Fixed-Rate 7-Year Loan Summary</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 border">&nbsp;</th>
                {fyeCols.map((col) => (
                  <th key={col} className="px-2 py-1 border text-center">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['Principal', 'Interest', 'Total', 'Balance'].map((row) => (
                <tr key={row}>
                  <td className="px-2 py-1 border font-bold bg-gray-50">{row}</td>
                  {fyeCols.map((col, idx) => (
                    <td key={col + idx} className="px-2 py-1 border text-right">--</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      <div className="mb-6 border rounded bg-white">
        <div className="bg-slate-200 font-bold px-4 py-2 rounded-t">Amortization Schedule</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 border">Amortization Year</th>
                <th className="px-2 py-1 border">Year</th>
                <th className="px-2 py-1 border">Month</th>
                <th className="px-2 py-1 border">#</th>
                <th className="px-2 py-1 border">Principal</th>
                <th className="px-2 py-1 border">PMT</th>
                <th className="px-2 py-1 border">Interest</th>
                <th className="px-2 py-1 border">Principal</th>
                <th className="px-2 py-1 border">Balance</th>
                <th className="px-2 py-1 border">Loan</th>
                <th className="px-2 py-1 border">Total Int Pmt</th>
                <th className="px-2 py-1 border">Total Principal</th>
                <th className="px-2 py-1 border">Total PMT</th>
              </tr>
            </thead>
            <tbody>
              {amortRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1 border text-center">1</td>
                  <td className="px-2 py-1 border text-center">{row.year}</td>
                  <td className="px-2 py-1 border text-center">{row.month}</td>
                  <td className="px-2 py-1 border text-center">{row.idx}</td>
                  <td className="px-2 py-1 border text-right">--</td>
                  <td className="px-2 py-1 border text-right">--</td>
                  <td className="px-2 py-1 border text-right">--</td>
                  <td className="px-2 py-1 border text-right">--</td>
                  <td className="px-2 py-1 border text-right">--</td>
                  <td className="px-2 py-1 border text-right">--</td>
                  <td className="px-2 py-1 border text-right">--</td>
                  <td className="px-2 py-1 border text-right">--</td>
                  <td className="px-2 py-1 border text-right">--</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 