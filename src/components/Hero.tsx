"use client";

import CountdownTimer from "./CountdownTimer";
import SwooshAnimation, { useSwoosh } from "./SwooshAnimation";
import { useCallback } from "react";
import { Horse, ArrowDown } from "@phosphor-icons/react";

export default function Hero() {
  const { playing, trigger: triggerSwoosh } = useSwoosh();

  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).href;

    // Trigger dual swoosh animation
    triggerSwoosh();

    // Navigate after animation plays
    setTimeout(() => {
      window.open(href, "_blank", "noopener,noreferrer");
    }, 800);
  }, [triggerSwoosh]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-january-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Horse icon */}
      <div className="mb-6 animate-bounce" style={{ animationDuration: "2s" }}>
        <Horse size={72} weight="duotone" className="text-neon-orange sm:w-[96px] sm:h-[96px]" />
      </div>

      <h1 className="pixel-heading text-3xl sm:text-5xl lg:text-6xl text-white glow-blue mb-3 leading-tight tracking-wider">
        PROFOUND<br />DERBY DRIVE
      </h1>

      <p className="text-sm text-white/70 mb-10 max-w-lg leading-relaxed mt-3">
        Know someone who could shape the future of AI? From May 4 through June 1, submit your best referrals and top referrers win big. A successful hire earns you our $30,000 referral bonus — the last time we&apos;ll offer it at this level. Don&apos;t sit on a great name.
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
        className="cta-fire inline-block bg-january-blue hover:bg-january-blue-light text-white pixel-heading text-xs sm:text-sm px-8 py-4 rounded-lg transition-colors"
      >
        SUBMIT A REFERRAL
      </a>
      <p className="text-white/70 text-sm mt-3">
        Go to Ashby and click &quot;+ Referral&quot; on the right side to add your referral.
      </p>

      {/* Swoosh overlay — two hoops on either side */}
      <SwooshAnimation playing={playing} />

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/25 animate-pulse">
        <ArrowDown size={24} weight="bold" />
      </div>
    </section>
  );
}
