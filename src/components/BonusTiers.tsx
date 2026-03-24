"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "BUZZER BEATER",
    bonus: "$10,000",
    color: "neon-orange",
    description: "The highest-impact technical roles on our roadmap — hardest to source, biggest signal.",
    roles: [
      "Engineering Manager",
      "Senior Software Engineer",
      "Senior Data Engineer",
      "Senior SRE",
      "Senior Security Engineer",
    ],
  },
  {
    name: "SLAM DUNK",
    bonus: "$6,000",
    color: "january-blue-light",
    description: "Core builders where a warm intro cuts through. Your referral jumps the line.",
    roles: [
      "Senior Product Manager",
      "Staff Product Manager (AI Agents)",
      "Software Engineer (Mid-Level)",
      "Senior Data Scientist (Product Analytics)",
    ],
  },
  {
    name: "FAST BREAK",
    bonus: "$4,000",
    color: "neon-yellow",
    description: "Cross-functional roles where culture fit matters as much as the resume. Sourcing can't find these people — you can.",
    roles: [
      "Analyst (Client Ops)",
      "Client Operations Manager",
      "Senior Business Ops Associate",
      "Senior Client Strategy Manager",
      "Senior Implementation Consultant",
      "Senior Manager of Marketing",
      "Senior Recruiter",
    ],
  },
];

const colorMap: Record<string, {
  border: string; borderHex: string; glow: string; text: string;
  chipBg: string; chipBorder: string; glowRgb: string;
}> = {
  "neon-orange": {
    border: "border-neon-orange/35",
    borderHex: "rgba(255,107,43,0.35)",
    glow: "glow-orange",
    text: "text-neon-orange",
    chipBg: "rgba(255,107,43,0.07)",
    chipBorder: "rgba(255,107,43,0.18)",
    glowRgb: "255,107,43",
  },
  "january-blue-light": {
    border: "border-january-blue/35",
    borderHex: "rgba(0,51,204,0.35)",
    glow: "glow-blue",
    text: "text-january-blue-light",
    chipBg: "rgba(0,26,161,0.12)",
    chipBorder: "rgba(0,51,204,0.25)",
    glowRgb: "0,51,204",
  },
  "neon-yellow": {
    border: "border-neon-yellow/30",
    borderHex: "rgba(255,215,0,0.3)",
    glow: "",
    text: "text-neon-yellow",
    chipBg: "rgba(255,215,0,0.06)",
    chipBorder: "rgba(255,215,0,0.2)",
    glowRgb: "255,215,0",
  },
};

const SCANLINES = {
  backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 4px)",
};

export default function BonusTiers() {
  return (
    <section className="py-16 sm:py-24 px-4" id="bonuses">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="pixel-heading text-xl sm:text-2xl text-white glow-blue mb-3">
            REFERRAL BONUSES
          </h2>
          <p className="text-white/70 text-sm mb-1">All bonuses doubled for March Madness.</p>
          <p className="pixel-heading text-[10px] text-neon-orange glow-orange">2X MULTIPLIER ACTIVE</p>
        </motion.div>

        {/* Cabinet frame wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border-2 border-january-blue/30 overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(0,26,161,0.15), inset 0 0 40px rgba(0,26,161,0.04)" }}
        >
          {/* Header bar */}
          <div className="relative bg-[#080c1a] border-b-2 border-january-blue/40 px-6 py-4">
            <div style={SCANLINES} className="absolute inset-0 pointer-events-none" />
            <div className="relative grid grid-cols-3 gap-4">
              {tiers.map((t) => (
                <span key={t.name} className={`pixel-heading text-[10px] text-neon-orange tracking-wider`}>
                  {t.name}
                </span>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-january-blue/70 to-transparent" />
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-january-blue/15">
            {tiers.map((tier, i) => {
              const c = colorMap[tier.color];
              return (
                <div
                  key={tier.name}
                  className="relative p-6 flex flex-col"
                  style={{ background: i === 1 ? "#0a0f1e" : "#0d1225" }}
                >
                  {/* Scanlines inside card */}
                  <div className="absolute inset-0 pointer-events-none opacity-50" style={SCANLINES} />

                  {/* Accent top line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${c.glowRgb},0.5), transparent)` }}
                  />

                  <div className="relative">
                    {/* Bonus amount */}
                    <div
                      className="pixel-heading text-4xl text-white mb-3"
                      style={{ textShadow: `0 0 20px rgba(${c.glowRgb},0.3), 0 0 40px rgba(${c.glowRgb},0.15)` }}
                    >
                      {tier.bonus}
                    </div>

                    <p className="text-white/70 text-xs leading-relaxed mb-5">{tier.description}</p>

                    {/* Glowing divider */}
                    <div
                      className="h-px mb-4"
                      style={{ background: `linear-gradient(90deg, transparent, rgba(${c.glowRgb},0.3), transparent)` }}
                    />

                    {/* Role chips */}
                    <div className="space-y-1.5">
                      {tier.roles.map((role) => (
                        <div
                          key={role}
                          className="px-3 py-2 rounded-lg text-xs text-white font-medium border"
                          style={{
                            background: c.chipBg,
                            borderColor: c.chipBorder,
                          }}
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
