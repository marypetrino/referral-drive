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
import SilhouetteDivider from "../components/SilhouetteDivider";
import OutreachBuilder from "../components/OutreachBuilder";
import { PencilLine } from "@phosphor-icons/react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export default function Home() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [outreachOpen, setOutreachOpen] = useState(false);

  useEffect(() => {
    const hasAuth = getCookie("pf_auth");
    setAuthenticated(hasAuth === "true");
  }, []);

  // Loading state
  if (authenticated === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-arcade-dark">
        <div className="text-4xl animate-bounce" style={{ animationDuration: "2s" }}>🐎</div>
      </div>
    );
  }

  if (!authenticated) {
    return <PasswordGate onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <main className="relative">
      <Hero />

      {/* Action links + Outreach Builder trigger */}
      <section className="py-8 sm:py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setOutreachOpen(true)}
              className="arcade-btn group flex items-center gap-4 bg-arcade-card border border-january-blue/20 rounded-xl p-5 hover:border-january-blue/50 transition-all text-left"
            >
              <PencilLine size={32} weight="duotone" className="text-neon-orange shrink-0" />
              <div>
                <h3 className="pixel-heading text-[10px] text-white mb-1 group-hover:text-january-blue-light transition-colors">
                  BUILD YOUR OUTREACH
                </h3>
                <p className="text-white/70 text-xs">
                  Craft a ready-to-send message in seconds.
                </p>
              </div>
            </button>

            <ActionLinks />
          </div>
        </div>
      </section>

      <SilhouetteDivider pose="shooter" />
      <Leaderboard />

      <SilhouetteDivider pose="dunk" flip />
      <BonusTiers />

      <SilhouetteDivider pose="layup" />
      <PrizeTiers />

      <SilhouetteDivider pose="crossover" flip />
      <RoleBlurbs />

      <SilhouetteDivider pose="shooter" flip />
      <FAQ />

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <SilhouetteDivider pose="dunk" />
        <p className="text-white/25 text-xs mt-2">
          Profound &times; Carrara &mdash; Derby Drive 2026
        </p>
      </footer>

      {/* Outreach Builder Modal */}
      <OutreachBuilder open={outreachOpen} onClose={() => setOutreachOpen(false)} />
    </main>
  );
}
