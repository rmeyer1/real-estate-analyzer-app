"use client";
import Link from "next/link";
import { useAuth } from "../lib/AuthContext";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/models", label: "My Models" },
  { href: "/models/create", label: "Create Model" },
];

export default function Sidebar() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading || !user) return null;

  return (
    <aside className="h-screen w-64 bg-primary-dark text-primary-light flex flex-col shadow-lg dark:bg-primary-dark dark:text-primary-light">
      <div className="flex items-center gap-2 px-6 py-6 border-b border-primary-light/20">
        {/* Diamond Placeholder Logo */}
        <div className="w-8 h-8 bg-linear-to-br from-secondary-light to-secondary-dark rounded-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="12,2 22,12 12,22 2,12" fill="currentColor" className="text-secondary" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-wide">Analyzer</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2 mt-6 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded transition-colors font-medium flex items-center gap-2
              ${pathname === link.href
                ? "bg-secondary text-white"
                : "hover:bg-primary-light/20 hover:text-secondary"}
            `}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 