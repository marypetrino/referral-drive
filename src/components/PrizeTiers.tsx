"use client";

import { motion } from "framer-motion";
import { Basketball, Bird, Star, Trophy, UsersThree, Lightning, Sparkle } from "@phosphor-icons/react";
import { type ReactNode } from "react";

const milestones: {
  name: string;
  icon: ReactNode;
  threshold: string;
  type: "race" | "open";
  prizeLabel: string | null;
  options: string[];
}[] = [
  {
    name: "FIRST POSSESSION",
    icon: <Basketball size={24} weight="duotone" className="text-neon-orange" />,
    threshold: "Submits first referral that reaches IPS",
    type: "race" as const,
    prizeLabel: "$100 GIFT CARD TO YOUR CHOICE OF:",
    options: [
      "Paragon Sports",
      "Bathhouse",
      "NYC Arts Institution (MoMA, The Met, etc.)",
    ],
  },
  {
    name: "EARLY BIRD",
    icon: <Bird size={24} weight="duotone" className="text-neon-orange" />,
    threshold: "Reach 5 referred candidates who pass IPS",
    type: "race" as const,
    prizeLabel: "CHOOSE ONE",
    options: [
      "AirPod Pros",
      "Kindle",
      "Oura Ring",
    ],
  },
  {
    name: "ALL-STAR",
    icon: <Star size={24} weight="duotone" className="text-neon-yellow" />,
    threshold: "5 referrals who pass the Hiring Manager Screen",
    type: "open" as const,
    prizeLabel: "CHOOSE ONE",
    options: [
      "$500 Delta Airlines Gift Card",
      "Othership 10-Class Pack",
      "$500 Great Jones Spa Credit",
    ],
  },
  {
    name: "CHAMPION",
    icon: <Trophy size={24} weight="duotone" className="text-neon-yellow" />,
    threshold: "3 referrals who get hired",
    type: "open" as const,
    prizeLabel: null,
    options: ["EightSleep Pod"],
  },
  {
    name: "WINNING TEAM",
    icon: <UsersThree size={24} weight="duotone" className="text-neon-orange" />,
    threshold: "Team with the most total referrals passed HMS",
    type: "open" as const,
    prizeLabel: null,
    options: ["Celebratory Team Dinner"],
  },
];

const PRIZE_GLOW = "0 0 12px rgba(255,215,0,0.5), 0 0 28px rgba(255,215,0,0.2)";

function PrizeCell({ prizeLabel, options }: { prizeLabel: string | null; options: string[] }) {
  return (
    <div>
      {prizeLabel && (
        <span className="block pixel-heading text-[8px] text-neon-orange/80 tracking-widest uppercase mb-2">
          {prizeLabel}
        </span>
      )}
      <div className="space-y-1.5">
        {options.map((opt) => (
          <div key={opt} className="flex items-center gap-2">
            <span className="text-neon-yellow/50 text-xs select-none leading-none">›</span>
            <span
              className="text-neon-yellow font-bold text-sm leading-snug"
              style={{ textShadow: PRIZE_GLOW }}
            >
              {opt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: "race" | "open" }) {
  if (type === "race") {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded font-bold bg-fire-orange/15 text-fire-orange border border-fire-orange/30"
        style={{ textShadow: "0 0 8px rgba(255,69,0,0.5)" }}
      >
        <Lightning size={14} weight="fill" /> RACE
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
      style={{ textShadow: "0 0 8px rgba(52,211,153,0.35)" }}
    >
      <Sparkle size={14} weight="fill" /> ANYONE
    </span>
  );
}

export default function PrizeTiers() {
  return (
    <section className="py-16 sm:py-24 px-4" id="prizes">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="pixel-heading text-xl sm:text-2xl text-white glow-blue mb-3">
            MILESTONE PRIZES
          </h2>
          <p className="text-white/70 text-sm">Hit the milestone, claim your prize.</p>
        </motion.div>

        {/* Desktop — arcade cabinet scoreboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block"
        >
          <div
            className="rounded-2xl border-2 border-january-blue/30 overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(0,26,161,0.15), inset 0 0 40px rgba(0,26,161,0.04)" }}
          >
            {/* Cabinet header bar */}
            <div className="relative bg-[#080c1a] border-b-2 border-january-blue/40 px-6 py-4">
              {/* scanline in header */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 4px)",
              }} />
              <div className="relative grid grid-cols-12 gap-4 items-center">
                <span className="col-span-3 pixel-heading text-[10px] text-neon-orange tracking-wider">MILESTONE</span>
                <span className="col-span-3 pixel-heading text-[10px] text-neon-orange tracking-wider">THRESHOLD</span>
                <span className="col-span-2 pixel-heading text-[10px] text-neon-orange tracking-wider">TYPE</span>
                <span className="col-span-4 pixel-heading text-[10px] text-neon-orange tracking-wider">PRIZE</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-january-blue/70 to-transparent" />
            </div>

            {/* Data rows */}
            {milestones.map((m, i) => {
              return (
                <div key={m.name} className="relative group">
                  <div
                    className="relative grid grid-cols-12 gap-4 px-6 items-start transition-colors hover:bg-january-blue/[0.06]"
                    style={{
                      background: i % 2 === 0 ? "#0d1225" : "#0a0f1e",
                      paddingTop: "22px",
                      paddingBottom: "22px",
                    }}
                  >
                    {/* Per-row scanlines */}
                    <div className="absolute inset-0 pointer-events-none opacity-40" style={{
                      backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 4px)",
                    }} />

                    <div className="relative col-span-3 flex items-center gap-3">
                      {m.icon}
                      <span
                        className="pixel-heading text-[10px] text-white leading-relaxed"
                        style={{ textShadow: "0 0 8px rgba(255,255,255,0.2)" }}
                      >
                        {m.name}
                      </span>
                    </div>

                    <div className="relative col-span-3 text-white/80 text-sm font-medium leading-snug pt-0.5">
                      {m.threshold}
                    </div>

                    <div className="relative col-span-2 pt-0.5">
                      <TypeBadge type={m.type} />
                    </div>

                    <div className="relative col-span-4 pt-0.5">
                      <PrizeCell prizeLabel={m.prizeLabel} options={m.options} />
                    </div>
                  </div>

                  {i < milestones.length - 1 && (
                    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-january-blue/25 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-4 text-[10px] text-white/35">
            <div className="flex items-center gap-1.5">
              <Lightning size={12} weight="fill" className="text-fire-orange" />
              <span><span className="text-fire-orange/75 font-semibold">RACE</span> — First person to hit it wins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkle size={12} weight="fill" className="text-emerald-400" />
              <span><span className="text-emerald-400/75 font-semibold">ANYONE</span> — Everyone who hits it wins</span>
            </div>
          </div>
        </motion.div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {milestones.map((m, i) => {
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative rounded-xl p-4 overflow-hidden border border-january-blue/20"
                style={{
                  background: i % 2 === 0 ? "#0d1225" : "#0a0f1e",
                  boxShadow: "0 0 15px rgba(0,26,161,0.08)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 4px)",
                }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    {m.icon}
                    <span className="pixel-heading text-[10px] text-white" style={{ textShadow: "0 0 8px rgba(255,255,255,0.2)" }}>
                      {m.name}
                    </span>
                    <span className="ml-auto"><TypeBadge type={m.type} /></span>
                  </div>
                  <p className="text-white/80 text-sm font-medium mb-3">{m.threshold}</p>
                  <div className="border-t border-january-blue/15 pt-3">
                    <PrizeCell prizeLabel={m.prizeLabel} options={m.options} />
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="flex flex-col items-center gap-2 mt-4 text-[10px] text-white/35">
            <div className="flex items-center gap-1.5">
              <Lightning size={12} weight="fill" className="text-fire-orange" />
              <span><span className="text-fire-orange/75 font-semibold">RACE</span> — First person to hit it wins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkle size={12} weight="fill" className="text-emerald-400" />
              <span><span className="text-emerald-400/75 font-semibold">ANYONE</span> — Everyone who hits it wins</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
