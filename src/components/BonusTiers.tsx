"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "TRIFECTA",
    bonus: "$50,000",
    color: "neon-yellow",
    description: "Our three highest-priority PM roles. Rare, high-impact, and worth every penny.",
    roles: [
      "Product Manager, AI",
      "Product Manager, Analytics",
      "Product Manager, Verticals",
    ],
  },
  {
    name: "TRIPLE CROWN",
    bonus: "$30,000",
    color: "neon-orange",
    description: "The roles we're pushing hardest right now. Hardest to fill, biggest impact.",
    roles: [
      "Senior Software Engineer",
      "Machine Learning Engineer",
      "Data Engineer",
      "GTM Enablement",
      "Solutions Consultant",
      "Strategic Finance",
      "Engagement Manager",
      "Manager, Engagement Management, Enterprise",
      "SF Sales Manager",
      "Recruiter",
    ],
    highlight: "Manager, Engagement Management, Enterprise",
    highlightLink: "https://www.tryprofound.com/careers/15aa928a-2849-49e4-bef3-a4fc5e9a5a4c?from=careers",
  },
  {
    name: "DERBY WINNER",
    bonus: "$15,000",
    color: "january-blue-light",
    description: "High-impact roles we need to fill now.",
    roles: [
      "Recruiting Coordinator",
      "Software Engineer, Data Platform",
      "Senior Commercial Counsel",
      "Content Lead",
      "Instructor, Profound University",
      "Partner Enablement Lead",
      "Social Distribution Lead",
      "Content Marketing Manager",
      "Partner Marketing Manager",
      "Account Manager",
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
    borderHex: "rgba(55,108,255,0.35)",
    glow: "glow-blue",
    text: "text-january-blue-light",
    chipBg: "rgba(55,108,255,0.12)",
    chipBorder: "rgba(55,108,255,0.25)",
    glowRgb: "55,108,255",
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
          <p className="text-white/70 text-xs">Paid out after your referral is hired and completes their first 30 days.</p>
          <p className="text-neon-orange text-xs font-semibold mt-2" style={{ textShadow: "0 0 12px rgba(255,107,43,0.4)" }}>
            This may be one of the last times we&apos;re offering referral bonuses this high — take advantage! Off to the races.
          </p>
        </motion.div>

        {/* Cabinet frame wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border-2 border-january-blue/30 overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(55,108,255,0.15), inset 0 0 40px rgba(55,108,255,0.04)" }}
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
                      {tier.roles.map((role) => {
                        const isHighlight = "highlight" in tier && role === tier.highlight;
                        const link = isHighlight && "highlightLink" in tier ? (tier as typeof tiers[0]).highlightLink : null;
                        const chip = (
                          <div
                            key={role}
                            className={`px-3 py-2 rounded-lg text-xs text-white font-medium border ${isHighlight ? "ring-1 ring-neon-orange/50" : ""}`}
                            style={{
                              background: isHighlight ? "rgba(255,107,43,0.15)" : c.chipBg,
                              borderColor: isHighlight ? "rgba(255,107,43,0.4)" : c.chipBorder,
                            }}
                          >
                            {role}
                            {isHighlight && <span className="ml-2 text-neon-orange text-[10px]">NEW</span>}
                          </div>
                        );
                        if (link) {
                          return <a key={role} href={link} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">{chip}</a>;
                        }
                        return chip;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <p className="text-white/50 text-xs text-center mt-5 max-w-2xl mx-auto leading-relaxed">
          These are the roles we&apos;re pushing hardest this month — but all ~70 open roles on our{" "}
          <a href="https://www.tryprofound.com/careers#open-roles" target="_blank" rel="noopener noreferrer" className="text-january-blue-light underline underline-offset-2">careers page</a>{" "}
          are eligible for referral bonuses.
        </p>

        {/* New Grad callout */}
        <div
          className="mt-4 max-w-2xl mx-auto rounded-xl px-5 py-3 flex items-center gap-3 border border-january-blue/20"
          style={{ background: "rgba(55,108,255,0.06)" }}
        >
          <span className="text-january-blue-light text-lg leading-none">🎓</span>
          <p className="text-white/60 text-xs leading-relaxed">
            <span className="text-white/90 font-semibold">New grad referral?</span>{" "}
            Any new grad hire earns you a flat <span className="text-january-blue-light font-semibold">$5,000</span> referral bonus.
          </p>
        </div>
      </div>
    </section>
  );
}
