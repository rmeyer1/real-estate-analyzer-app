"use client";
import { ReactNode } from "react";
import SidebarLayout from "../../components/SidebarLayout";
import { ScenarioProvider } from "@/lib/ScenarioContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ScenarioProvider>
      <SidebarLayout>{children}</SidebarLayout>
    </ScenarioProvider>
  );
} 