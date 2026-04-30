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
    title: "Senior Software Engineer",
    blurb: "8+ years of fullstack or backend experience. High ownership — the kind of person who takes a problem and runs with it without needing hand-holding. Strong technical fundamentals and a track record of shipping things that matter.",
    tier: "TRIPLE CROWN",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Machine Learning Engineer",
    blurb: "Deep expertise in modern LLM systems — RAG, prompting, fine-tuning, evals — who can take models from notebook to production. Strong product intuition, clean reliable code, and a track record of shipping impactful AI in real environments.",
    tier: "TRIPLE CROWN",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Data Engineer",
    blurb: "Builds and maintains the pipelines that power our data products. Strong SQL and Python, comfortable with tools like dbt, Dagster, and Snowflake. Takes full ownership of what they ship and cares about getting the details right.",
    tier: "TRIPLE CROWN",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Data Platform",
    blurb: "Goes a layer deeper than Data Engineering — focused on the infrastructure that makes our data systems reliable and scalable. Brings distributed systems experience (Spark, Flink) and thinks about observability, access control, and how the whole stack holds together under load.",
    tier: "TRIPLE CROWN",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Product Manager, AI",
    blurb: "Owns Profound's AI platform — agent builder, grids, knowledge base. Architect and ship production-grade AI agent systems, owning strategy, quality, and performance across complex workflows.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Product Manager, Analytics",
    blurb: "Owns our data products: AEI, Agent Analytics, and Prompt Volumes. Partners across data and engineering to turn analytical primitives into customer-facing product surfaces.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Product Manager, Verticals",
    blurb: "Owns Profound's vertical bets — shopping, ads, agencies, self-serve, and new product lines. The PM for figuring out where Profound goes next.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "GTM Enablement",
    blurb: "Builds the systems, content, and training that make Profound's GTM team fast and effective. Equal parts ops, content, and coach.",
    tier: "PHOTO FINISH",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Solutions Consultant",
    blurb: "Technical pre-sales partner who can go deep with prospects on how Profound fits their stack. Comfortable in front of customers and in the product.",
    tier: "PHOTO FINISH",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Strategic Finance",
    blurb: "Strategic finance partner to leadership — owns models, planning, and the financial story behind Profound's biggest bets.",
    tier: "PHOTO FINISH",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Engagement Manager",
    blurb: "Owns customer outcomes end-to-end post-sale — drives adoption, expansion, and the kind of relationship that turns customers into champions. Multiple openings.",
    tier: "PHOTO FINISH",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "SF Sales Manager",
    blurb: "San Francisco-based sales leader to build and run a team selling Profound to enterprise. Player-coach who can close and scale a quota-carrying org.",
    tier: "PHOTO FINISH",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Recruiter",
    blurb: "Full-cycle recruiter to source, screen, and close top-tier talent across Profound's pipeline. Drives quality and velocity in equal measure.",
    tier: "PHOTO FINISH",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Recruiting Coordinator",
    blurb: "Talent ops partner who keeps Profound's hiring engine running — schedules interviews, manages candidate experience, and makes the recruiting team faster.",
    tier: "PHOTO FINISH",
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
            ROLES TO REFER
          </h2>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Here&apos;s what we&apos;re looking for in each role. Think about who you know.
          </p>
        </motion.div>

        {/* Cabinet frame */}
        <div
          className="rounded-2xl border-2 border-january-blue/30 overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(55,108,255,0.15), inset 0 0 40px rgba(55,108,255,0.04)" }}
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
