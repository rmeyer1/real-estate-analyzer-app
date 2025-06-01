"use client";
import { ReactNode } from "react";
import SidebarLayout from "../../components/SidebarLayout";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
} 