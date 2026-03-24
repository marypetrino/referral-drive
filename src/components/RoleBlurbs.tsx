"use client";

import { motion } from "framer-motion";

interface RoleBlurb {
  title: string;
  blurb: string;
  tier: string;
  tierColor: string;
  tierBorderHex: string;
  tierAccentRgb: string;
}

const roleBlurbs: RoleBlurb[] = [
  {
    title: "Engineering Manager",
    blurb: "Engineering Manager to lead and grow a team of engineers delivering high-impact products — owning technical direction, execution quality, and team development.",
    tier: "BUZZER BEATER",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Senior Software Engineer",
    blurb: "6–7+ years of backend or full-stack engineering, preferably at fintech or payments. Demonstrated ownership, strong cross-functional instincts, and active AI tooling in their daily workflow — ideally from a Series B–D startup where they've shipped independently.",
    tier: "BUZZER BEATER",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Senior Data Engineer",
    blurb: "4+ years owning data infrastructure end-to-end — ideally as a sole, founding, or lead DE at an early-stage startup — with hands-on Snowflake platform management.",
    tier: "BUZZER BEATER",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Senior Security Engineer",
    blurb: "Implement application and data security controls across cloud infrastructure — embedding security into product development and compliance workflows.",
    tier: "BUZZER BEATER",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Staff Product Manager (AI Agents)",
    blurb: "Staff PM to architect and ship production-grade AI agent platforms — owning strategy, quality, and performance across complex workflows.",
    tier: "SLAM DUNK",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Software Engineer (Mid-Level)",
    blurb: "3+ years of backend or full-stack engineering, preferably at fintech or payments. Demonstrated ownership, strong cross-functional instincts, and active AI tooling in their daily workflow — ideally from a Series B–D startup.",
    tier: "SLAM DUNK",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Senior Data Scientist (Product Analytics)",
    blurb: "Data-driven product analyst to surface insights that shape product direction and drive growth.",
    tier: "SLAM DUNK",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Senior Recruiter",
    blurb: "A data-driven recruiter with 5+ years in fast-growing startups — someone who lives and breathes recruiting excellence, lets the metrics tell the story, and drives change.",
    tier: "FAST BREAK",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Senior Implementation Consultant",
    blurb: "Technical implementer who can actually build ETL pipelines — not just hand off to engineering. Consulting or B2B SaaS background ideal.",
    tier: "FAST BREAK",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Client Operations Manager",
    blurb: "SQL-fluent ops leader who's built scalable client-facing processes — owns troubleshooting, process-building, and team development.",
    tier: "FAST BREAK",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Analyst (Client Ops)",
    blurb: "Analytical thinker to support client operations with data-driven insights and process improvement.",
    tier: "FAST BREAK",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Senior Business Ops Associate",
    blurb: "Operational generalist to drive cross-functional projects and improve internal systems at scale.",
    tier: "FAST BREAK",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Senior Manager of Marketing",
    blurb: "Marketing leader to own brand, demand gen, and growth strategy for a fast-scaling fintech.",
    tier: "FAST BREAK",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
];

const SCANLINES = {
  backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 4px)",
};

export default function RoleBlurbs() {
  return (
    <section className="py-16 sm:py-24 px-4" id="roles">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="pixel-heading text-xl sm:text-2xl text-white glow-blue mb-3">
            WHO TO REFER
          </h2>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Here&apos;s what we&apos;re looking for in each role. Think about who you know.
          </p>
        </motion.div>

        {/* Cabinet frame */}
        <div
          className="rounded-2xl border-2 border-january-blue/30 overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(0,26,161,0.15), inset 0 0 40px rgba(0,26,161,0.04)" }}
        >
          {/* Role grid */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {roleBlurbs.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="relative p-5 border-b border-january-blue/10 last:border-b-0 md:odd:border-r md:odd:border-january-blue/10 group hover:bg-january-blue/[0.04] transition-colors"
                style={{ background: i % 2 === 0 ? "#0d1225" : "#0a0f1e" }}
              >
                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none opacity-40" style={SCANLINES} />

                {/* Accent left border */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `rgba(${role.tierAccentRgb},0.6)` }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-white font-semibold text-sm leading-snug">{role.title}</h3>
                    <span
                      className={`pixel-heading text-[8px] ${role.tierColor} whitespace-nowrap mt-0.5 shrink-0`}
                      style={{ textShadow: `0 0 8px rgba(${role.tierAccentRgb},0.4)` }}
                    >
                      {role.tier}
                    </span>
                  </div>
                  <p className="text-white/72 text-xs leading-relaxed">{role.blurb}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
