"use client";

import { Briefcase } from "@phosphor-icons/react";

export default function ActionLinks() {
  return (
    <a
      href="https://www.tryprofound.com/careers#open-roles"
      target="_blank"
      rel="noopener noreferrer"
      className="arcade-btn group flex items-center gap-4 bg-arcade-card border border-january-blue/20 rounded-xl p-5 hover:border-january-blue/50 transition-all"
    >
      <Briefcase size={32} weight="duotone" className="text-neon-orange shrink-0" />
      <div>
        <h3 className="pixel-heading text-[10px] text-white mb-1 group-hover:text-january-blue-light transition-colors">
          OPEN ROLES
        </h3>
        <p className="text-white/70 text-xs">
          See all open roles. Browse the field.
        </p>
      </div>
    </a>
  );
}
