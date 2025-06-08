"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext";
import Navbar from '../components/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/Footer';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard/description");
    }
  }, [loading, user, router]);

  // Always render the Navbar
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Navbar />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="text-white text-lg mt-8">Redirecting to your dashboard...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 