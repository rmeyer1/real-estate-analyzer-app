"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../lib/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-10 h-16 bg-slate-800 border-b border-slate-700">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <h1 className="text-xl font-semibold text-slate-50">Dashboard</h1>
        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Profile/User Placeholder */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon className="h-8 w-8 text-slate-300" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-20">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white">
              <span className="sr-only">Sign in</span>
              <UserCircleIcon className="h-8 w-8 text-slate-300" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 