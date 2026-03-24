"use client";

import CountdownTimer from "./CountdownTimer";
import { useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { Basketball, ArrowDown } from "@phosphor-icons/react";

export default function Hero() {
  const hasLaunched = useRef(false);

  useEffect(() => {
    if (hasLaunched.current) return;
    hasLaunched.current = true;

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.4 },
      colors: ["#FF6B2B", "#FF4500", "#FFD700", "#001AA1", "#FFFFFF"],
      ticks: 120,
      gravity: 0.8,
      shapes: ["circle"],
    });
  }, []);

  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ["#FF6B2B", "#FFD700", "#FFFFFF"],
      ticks: 80,
      gravity: 1.2,
      shapes: ["circle"],
      scalar: 0.8,
    });
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-january-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Bouncing basketball */}
      <div className="mb-6 animate-bounce" style={{ animationDuration: "2s" }}>
        <Basketball size={72} weight="duotone" className="text-neon-orange sm:w-[96px] sm:h-[96px]" />
      </div>

      <h1 className="pixel-heading text-3xl sm:text-5xl lg:text-6xl text-white glow-blue mb-3 leading-tight tracking-wider">
        MARCH MADNESS
      </h1>

      <p className="text-lg sm:text-xl text-white/90 mb-2 max-w-xl font-semibold">
        January&apos;s 2026 Referral Drive
      </p>
      <p className="text-sm text-white/70 mb-10 max-w-lg leading-relaxed">
        Referrals are how we find our best people. For the next 3 weeks, every bonus is doubled and top referrers win big. Think of someone great — and send them our way.
      </p>

      {/* Countdown */}
      <div className="mb-10">
        <p className="pixel-heading text-[10px] text-neon-orange glow-orange mb-4 tracking-widest">
          TIME REMAINING
        </p>
        <CountdownTimer />
      </div>

      {/* CTA */}
      <a
        href="https://app.ashbyhq.com/home/upcoming"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCtaClick}
        className="arcade-btn inline-block bg-january-blue hover:bg-january-blue-light text-white pixel-heading text-xs sm:text-sm px-8 py-4 rounded-lg transition-all"
      >
        SUBMIT A REFERRAL
      </a>
      <p className="text-white/70 text-sm mt-3">
        Go to Ashby and click &quot;+ Referral&quot; on the right side to add your referral.
      </p>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/25 animate-pulse">
        <ArrowDown size={24} weight="bold" />
      </div>
    </section>
  );
}
