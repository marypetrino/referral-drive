"use client";

import { motion } from "framer-motion";
import { PencilLine, Briefcase, PlayCircle } from "@phosphor-icons/react";

export default function ActionLinks() {
  return (
    <section className="py-8 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Primary row: Outreach Builder + Open Roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.a
            href="https://january-outreach.replit.app/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="arcade-btn group flex items-center gap-4 bg-arcade-card border border-january-blue/20 rounded-xl p-5 hover:border-january-blue/50 transition-all"
          >
            <PencilLine size={32} weight="duotone" className="text-neon-orange shrink-0" />
            <div>
              <h3 className="pixel-heading text-[10px] text-white mb-1 group-hover:text-january-blue-light transition-colors">
                OUTREACH BUILDER
              </h3>
              <p className="text-white/70 text-xs">
                Need help with what to say? Build your outreach.
              </p>
            </div>
          </motion.a>

          <motion.a
            href="https://jobs.ashbyhq.com/january"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="arcade-btn group flex items-center gap-4 bg-arcade-card border border-january-blue/20 rounded-xl p-5 hover:border-january-blue/50 transition-all"
          >
            <Briefcase size={32} weight="duotone" className="text-neon-orange shrink-0" />
            <div>
              <h3 className="pixel-heading text-[10px] text-white mb-1 group-hover:text-january-blue-light transition-colors">
                OPEN ROLES
              </h3>
              <p className="text-white/70 text-xs">
                See all open roles. Browse the roster.
              </p>
            </div>
          </motion.a>
        </div>

        {/* Secondary: Loom walkthrough — left-aligned under Outreach Builder */}
        <motion.a
          href="https://www.loom.com/share/6283e4078a2644cfbbf9a0b35ea85799"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="arcade-btn group inline-flex items-center gap-2 mt-2 py-2 px-4 rounded-lg border border-january-blue/10 hover:border-january-blue/30 transition-all sm:max-w-[calc(50%-8px)]"
        >
          <PlayCircle size={16} weight="duotone" className="text-neon-orange shrink-0" />
          <span className="text-white/70 text-xs group-hover:text-white/90 transition-colors">
            Watch a quick walkthrough of the outreach builder
          </span>
        </motion.a>
      </div>
    </section>
  );
}
