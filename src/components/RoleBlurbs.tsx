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
    title: "Product Manager, AI",
    blurb: "Owns the AI platform — agent builder, background agents, grids, knowledge base. Ships production-grade agent experiences end to end, and identifies the opportunities that define what Profound's AI platform becomes.",
    tier: "TRIPLE CROWN",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Product Manager, Analytics",
    blurb: "Owns our data products: AEI, Agent Analytics, Prompt Volumes. Turns analytical primitives into customer-facing surfaces.",
    tier: "TRIPLE CROWN",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "Product Manager, Verticals",
    blurb: "PM who will own self-serve, shopping, ads, agencies, and new bets — the verticals taking Profound to its next stage of growth.",
    tier: "TRIPLE CROWN",
    tierColor: "text-neon-orange",
    tierBorderHex: "rgba(255,107,43,0.2)",
    tierAccentRgb: "255,107,43",
  },
  {
    title: "GTM Enablement",
    blurb: "Builds the systems, content, and training that make the GTM team fast. Equal parts ops, content, and coach.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Solutions Consultant",
    blurb: "Technical pre-sales — goes deep with prospects on how Profound fits their stack. Comfortable with customers and in the product.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Senior Software Engineer",
    blurb: "8+ years fullstack or backend. High ownership, ships without hand-holding, strong fundamentals.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Machine Learning Engineer",
    blurb: "Deep in LLM systems — RAG, prompting, fine-tuning, evals. Takes models from notebook to prod with clean code and product sense.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Data Engineer",
    blurb: "Owns the pipelines behind our data products. Strong SQL/Python, comfortable with dbt, Dagster, and Snowflake — and accountable for the reliability and quality of what they ship.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Strategic Finance",
    blurb: "Finance partner to leadership — owns models, planning, and the financial story behind our biggest bets.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Engagement Manager",
    blurb: "Owns customer outcomes post-sale — adoption, expansion, turning customers into champions. Multiple openings.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Manager, Engagement Management, Enterprise",
    blurb: "Leads the enterprise engagement team — builds and runs the function that keeps our biggest customers successful. Player-coach role.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "SF Sales Manager",
    blurb: "SF-based sales leader to build and run a team selling to enterprise. Player-coach who can close and scale.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Recruiter",
    blurb: "Full-cycle recruiter — source, screen, and close across the pipeline. Quality and speed.",
    tier: "TRIFECTA",
    tierColor: "text-neon-yellow",
    tierBorderHex: "rgba(255,215,0,0.2)",
    tierAccentRgb: "255,215,0",
  },
  {
    title: "Recruiting Coordinator",
    blurb: "Keeps the hiring engine running — scheduling, candidate experience, making the recruiting team faster.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Software Engineer, Data Platform",
    blurb: "Builds the infrastructure layer underneath our data products. Distributed systems (Spark, Flink), observability, access control.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Senior Commercial Counsel",
    blurb: "First commercial attorney at Profound — owns contracts, negotiations, and legal risk as we scale enterprise.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Content Lead",
    blurb: "Owns Profound's content strategy and output — from thought leadership to product storytelling. Sharp writer, strong POV.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Instructor, Profound University",
    blurb: "Teaches customers how to get the most out of Profound — builds curriculum, leads live sessions, owns the learning experience.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Partner Enablement Lead",
    blurb: "Builds the partner ecosystem — onboards, enables, and activates the integrations and channel relationships that expand our reach.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Social Distribution Lead",
    blurb: "Owns Profound's social presence and distribution strategy — turns our story into content that actually travels.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Content Marketing Manager",
    blurb: "Executes across the content calendar — blog, case studies, newsletters, campaigns. Fast and high-quality.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Partner Marketing Manager",
    blurb: "Co-markets with our integration and channel partners — builds programs that create mutual pipeline.",
    tier: "DERBY WINNER",
    tierColor: "text-[#5B8DEF]",
    tierBorderHex: "rgba(91,141,239,0.25)",
    tierAccentRgb: "91,141,239",
  },
  {
    title: "Account Manager",
    blurb: "Owns a book of existing customers — drives renewals, expansion, and long-term success. Relationship-first, commercially sharp.",
    tier: "TRIFECTA",
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
            Here&apos;s what we&apos;re looking for in each highlighted role. These aren&apos;t the only ones — all ~70 open roles on the careers page are referral-eligible.
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
