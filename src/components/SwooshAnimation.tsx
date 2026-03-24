"use client";

import { useState, useCallback } from "react";

export function useSwoosh() {
  const [playing, setPlaying] = useState(false);

  const trigger = useCallback(() => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 1200);
  }, []);

  return { playing, trigger };
}

function SwooshHoop({ side }: { side: "left" | "right" }) {
  const flip = side === "right";

  return (
    <svg
      viewBox="0 0 120 180"
      className="w-[100px] h-[150px] sm:w-[130px] sm:h-[180px]"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Rim */}
      <ellipse cx="60" cy="40" rx="28" ry="4" stroke="#FF6B2B" strokeWidth="2" fill="none">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.8;1" dur="1.2s" fill="freeze" />
      </ellipse>

      {/* Net */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={36 + i * 12}
          y1="43"
          x2={40 + i * 9}
          y2="80"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        >
          <animate attributeName="opacity" values="0;0.15;0.15;0" keyTimes="0;0.1;0.8;1" dur="1.2s" fill="freeze" />
          <animate
            attributeName="x2"
            values={`${40 + i * 9};${40 + i * 9 + (i % 2 === 0 ? 3 : -3)};${40 + i * 9}`}
            dur="1.2s"
            fill="freeze"
            keyTimes="0;0.4;0.8"
          />
        </line>
      ))}

      {/* Ball dropping through */}
      <circle r="12" fill="#FF6B2B">
        <animate
          attributeName="cy"
          values="-10;38;65;130;180"
          keyTimes="0;0.25;0.4;0.7;1"
          dur="1.2s"
          fill="freeze"
          keySplines="0.4 0 1 1;0.4 0 0.6 1;0.4 0 1 1;0.4 0 1 1"
          calcMode="spline"
        />
        <animate attributeName="cx" values="60;60;60;60;60" dur="1.2s" fill="freeze" />
        <animate attributeName="opacity" values="0.9;0.9;0.9;0.6;0" keyTimes="0;0.4;0.6;0.8;1" dur="1.2s" fill="freeze" />
      </circle>
      {/* Ball seam */}
      <line x1="48" y1="0" x2="72" y2="0" stroke="#CC5520" strokeWidth="0.8">
        <animate attributeName="y1" values="-10;38;65;130;180" keyTimes="0;0.25;0.4;0.7;1" dur="1.2s" fill="freeze" keySplines="0.4 0 1 1;0.4 0 0.6 1;0.4 0 1 1;0.4 0 1 1" calcMode="spline" />
        <animate attributeName="y2" values="-10;38;65;130;180" keyTimes="0;0.25;0.4;0.7;1" dur="1.2s" fill="freeze" keySplines="0.4 0 1 1;0.4 0 0.6 1;0.4 0 1 1;0.4 0 1 1" calcMode="spline" />
        <animate attributeName="opacity" values="0.4;0.4;0.4;0" keyTimes="0;0.6;0.8;1" dur="1.2s" fill="freeze" />
      </line>

      {/* Rim glow on impact */}
      <ellipse cx="60" cy="40" rx="28" ry="4" stroke="#FF6B2B" strokeWidth="4" fill="none" opacity="0">
        <animate attributeName="opacity" values="0;0;0.6;0" keyTimes="0;0.2;0.3;0.6" dur="1.2s" fill="freeze" />
      </ellipse>
    </svg>
  );
}

export default function SwooshAnimation({ playing }: { playing: boolean }) {
  if (!playing) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Left swoosh */}
      <div className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2">
        <SwooshHoop side="left" />
        <p className="pixel-heading text-[10px] text-neon-yellow text-center mt-1" style={{ textShadow: "0 0 12px rgba(255,215,0,0.5)" }}>
          <span style={{ opacity: 0 }}>
            <svg width="0" height="0">
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.35;0.45;0.75;1" dur="1.2s" fill="freeze" />
            </svg>
          </span>
        </p>
      </div>

      {/* Right swoosh */}
      <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2">
        <SwooshHoop side="right" />
      </div>

      {/* Center SWISH text */}
      <div className="pixel-heading text-lg sm:text-xl text-neon-yellow" style={{ textShadow: "0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.3)" }}>
        <span className="inline-block" style={{
          animation: "swoosh-text 1.2s ease-out forwards",
        }}>
          SWISH!
        </span>
      </div>

      <style jsx>{`
        @keyframes swoosh-text {
          0%, 30% { opacity: 0; transform: scale(0.5); }
          45% { opacity: 1; transform: scale(1.2); }
          55% { transform: scale(1); }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
