"use client";

import { useState, useEffect } from "react";
import PasswordGate from "../components/PasswordGate";
import Hero from "../components/Hero";
import ActionLinks from "../components/ActionLinks";
import Leaderboard from "../components/Leaderboard";
import BonusTiers from "../components/BonusTiers";
import RoleBlurbs from "../components/RoleBlurbs";
import PrizeTiers from "../components/PrizeTiers";
import FAQ from "../components/FAQ";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export default function Home() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const hasAuth = getCookie("mm_auth");
    setAuthenticated(hasAuth === "true");
  }, []);

  // Loading state
  if (authenticated === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-arcade-dark">
        <div className="text-4xl animate-bounce" style={{ animationDuration: "2s" }}>🏀</div>
      </div>
    );
  }

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <main className="relative">
      <Hero />

      {/* Action links moved up near top for immediate action */}
      <ActionLinks />

      <div className="border-t border-january-blue/10" />
      <Leaderboard />

      <div className="border-t border-january-blue/10" />
      <BonusTiers />

      <div className="border-t border-january-blue/10" />
      <RoleBlurbs />

      <div className="border-t border-january-blue/10" />
      <PrizeTiers />

      <div className="border-t border-january-blue/10" />
      <FAQ />

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-january-blue/10">
        <p className="text-white/25 text-xs">
          January &times; Carrara &mdash; March Madness 2026
        </p>
      </footer>
    </main>
  );
}
