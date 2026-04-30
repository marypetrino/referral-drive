"use client";

import { useState, useCallback } from "react";
import { Horse } from "@phosphor-icons/react";

export function useSwoosh() {
  const [playing, setPlaying] = useState(false);

  const trigger = useCallback(() => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 1200);
  }, []);

  return { playing, trigger };
}

export default function SwooshAnimation({ playing }: { playing: boolean }) {
  if (!playing) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Finish-line tape — left half. Stretches across the left side, then slides off-screen at the "break" */}
      <div className="absolute left-0 top-1/2 h-3 sm:h-4 w-1/2 tape-left" />

      {/* Finish-line tape — right half */}
      <div className="absolute right-0 top-1/2 h-3 sm:h-4 w-1/2 tape-right" />

      {/* Galloping horse — left side, charges in from off-screen left */}
      <div className="absolute left-0 top-1/2 horse-left">
        <Horse
          size={96}
          weight="duotone"
          className="text-neon-orange sm:w-[120px] sm:h-[120px]"
          style={{ filter: "drop-shadow(0 0 12px rgba(255,107,43,0.6))" }}
        />
      </div>

      {/* Galloping horse — right side, charges in from off-screen right (mirrored) */}
      <div className="absolute right-0 top-1/2 horse-right">
        <Horse
          size={96}
          weight="duotone"
          className="text-neon-orange sm:w-[120px] sm:h-[120px]"
          style={{
            transform: "scaleX(-1)",
            filter: "drop-shadow(0 0 12px rgba(255,107,43,0.6))",
          }}
        />
      </div>

      {/* Center burst text */}
      <div
        className="pixel-heading text-lg sm:text-2xl text-neon-yellow burst-text relative z-10"
        style={{
          textShadow: "0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.3)",
        }}
      >
        AND THEY&apos;RE OFF!
      </div>

      <style jsx>{`
        .tape-left,
        .tape-right {
          background-image: repeating-linear-gradient(
            90deg,
            #000 0,
            #000 16px,
            #ffffff 16px,
            #ffffff 32px
          );
          box-shadow: 0 0 14px rgba(255, 255, 255, 0.45);
        }
        .tape-left {
          animation: tape-break-left 1.2s ease-out forwards;
        }
        .tape-right {
          animation: tape-break-right 1.2s ease-out forwards;
        }
        @keyframes tape-break-left {
          0% {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
          55% {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) translateX(-100%);
            opacity: 0;
          }
        }
        @keyframes tape-break-right {
          0% {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
          55% {
            transform: translateY(-50%) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) translateX(100%);
            opacity: 0;
          }
        }

        .horse-left {
          animation: horse-left 1.2s ease-out forwards;
        }
        .horse-right {
          animation: horse-right 1.2s ease-out forwards;
        }
        @keyframes horse-left {
          0% {
            transform: translateY(-50%) translateX(-150%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          60% {
            transform: translateY(-50%) translateX(40%);
            opacity: 1;
          }
          85% {
            transform: translateY(-50%) translateX(40%);
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) translateX(40%);
            opacity: 0;
          }
        }
        @keyframes horse-right {
          0% {
            transform: translateY(-50%) translateX(150%);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          60% {
            transform: translateY(-50%) translateX(-40%);
            opacity: 1;
          }
          85% {
            transform: translateY(-50%) translateX(-40%);
            opacity: 1;
          }
          100% {
            transform: translateY(-50%) translateX(-40%);
            opacity: 0;
          }
        }

        .burst-text {
          animation: burst 1.2s ease-out forwards;
        }
        @keyframes burst {
          0%,
          40% {
            opacity: 0;
            transform: scale(0.5);
          }
          55% {
            opacity: 1;
            transform: scale(1.2);
          }
          65% {
            transform: scale(1);
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
