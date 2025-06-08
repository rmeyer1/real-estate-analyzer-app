"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "../lib/AuthContext";
import Navbar from "./Navbar";

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner if desired
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-2 min-h-full">
          <div className="text-2xl font-bold mb-8 tracking-tight">Real Estate Analyzer</div>
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard/scenario-setup" className="hover:bg-gray-800 rounded px-3 py-2 transition-colors">Scenario Setup</Link>
            <Link href="/dashboard/description" className="hover:bg-gray-800 rounded px-3 py-2 transition-colors">Returns Summary</Link>
            <Link href="/dashboard/projection" className="hover:bg-gray-800 rounded px-3 py-2 transition-colors">Projection</Link>
            <Link href="/dashboard/t12-pro-forma" className="hover:bg-gray-800 rounded px-3 py-2 transition-colors">Trailing 12 & Pro Forma</Link>
            <Link href="/dashboard/rent-roll-summary" className="hover:bg-gray-800 rounded px-3 py-2 transition-colors">Rent Roll Summary</Link>
            <Link href="/dashboard/rent-roll-analysis" className="hover:bg-gray-800 rounded px-3 py-2 transition-colors">Rent Roll Analysis</Link>
            <Link href="/dashboard/amortization-schedule" className="hover:bg-gray-800 rounded px-3 py-2 transition-colors">Amortization Schedule</Link>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 