"use client";

import { Horse, Trophy, Crown, FlagCheckered } from "@phosphor-icons/react";
import type { ComponentType } from "react";

// Derby-themed silhouette dividers — same API as the original (pose + flip),
// each "pose" maps to a different Phosphor icon for variety.
type Pose = "dunk" | "shooter" | "layup" | "crossover";

interface IconProps {
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
  style?: React.CSSProperties;
}

const icons: Record<Pose, ComponentType<IconProps>> = {
  shooter: Horse,
  dunk: Trophy,
  layup: Crown,
  crossover: FlagCheckered,
};

export default function SilhouetteDivider({
  pose = "dunk",
  flip = false,
}: {
  pose?: Pose;
  flip?: boolean;
}) {
  const Icon = icons[pose];

  return (
    <div className="relative py-4 flex items-center justify-center overflow-hidden">
      {/* Curved accent line — reads as a track turn */}
      <svg
        viewBox="0 0 1200 60"
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M 0,55 Q 600,-15 1200,55"
          stroke="rgba(55,108,255,0.2)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Glow version */}
        <path
          d="M 0,55 Q 600,-15 1200,55"
          stroke="rgba(55,108,255,0.08)"
          strokeWidth="6"
          fill="none"
        />
      </svg>

      {/* Icon in the center */}
      <div
        className="relative z-10"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <Icon
          weight="duotone"
          className="w-10 h-10 sm:w-12 sm:h-12"
          style={{
            color: "rgba(55,108,255,0.35)",
            filter: "drop-shadow(0 0 6px rgba(55,108,255,0.25))",
          }}
        />
      </div>
    </div>
  );
}
