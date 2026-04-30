"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Medal, Timer } from "@phosphor-icons/react";

interface LeaderboardEntry {
  employee_name: string;
  total_referrals: number;
  counted_referrals: number;
  at_ips: number;
  at_hms: number;
  at_panel: number;
  at_final: number;
  at_offer: number;
  hires: number;
  scoring: number;
  all_star: boolean;
  champion: boolean;
}

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || value === 0) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 1000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        start = Math.round(eased * value);
        setDisplay(start);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return <span ref={ref}>{display}</span>;
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Crown size={22} weight="duotone" className="text-neon-yellow" />;
  if (rank === 2) return <Medal size={22} weight="duotone" className="text-gray-300" />;
  if (rank === 3) return <Medal size={22} weight="duotone" className="text-amber-500" />;
  return <span className="text-white/40 font-mono">{rank}</span>;
}

function ComingSoon() {
  return (
    <div className="relative rounded-xl border border-january-blue/20 bg-arcade-card/80 overflow-hidden">
      {/* Faded table header */}
      <div className="grid grid-cols-10 gap-2 px-4 py-3 border-b border-january-blue/10 text-[10px] pixel-heading text-muted/40">
        <span>RANK</span>
        <span className="col-span-2">NAME</span>
        <span>REF</span>
        <span>INITIAL</span>
        <span>SKILLS</span>
        <span>TAKE HOME</span>
        <span>ONSITE</span>
        <span>REFS</span>
        <span>HIRED</span>
      </div>

      {/* Faded placeholder rows */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-10 gap-2 px-4 py-3 border-b border-white/5"
          style={{ opacity: 0.15 - i * 0.02 }}
        >
          <div className="h-4 bg-white/20 rounded w-6" />
          <div className="col-span-2 h-4 bg-white/20 rounded w-24" />
          <div className="h-4 bg-white/20 rounded w-6" />
          <div className="h-4 bg-white/20 rounded w-6" />
          <div className="h-4 bg-white/20 rounded w-6" />
          <div className="h-4 bg-white/20 rounded w-6" />
          <div className="h-4 bg-white/20 rounded w-6" />
          <div className="h-4 bg-white/20 rounded w-6" />
          <div className="h-4 bg-white/20 rounded w-6" />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-arcade-dark/70 backdrop-blur-sm">
        <Timer size={48} weight="duotone" className="text-january-blue-light mb-4" />
        <p className="pixel-heading text-sm text-neon-orange glow-orange mb-2">COMING SOON</p>
        <p className="text-white/50 text-sm max-w-xs text-center">
          Check back here to see who&apos;s taking the top spot.
        </p>
      </div>
    </div>
  );
}

// Mobile card for a single leaderboard entry
function MobileCard({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
  const isTop3 = rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: rank * 0.05 }}
      className={`rounded-lg p-4 bg-arcade-card border ${isTop3 ? "fire-border" : "border-white/5"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <RankBadge rank={rank} />
          <span className="text-white font-semibold">{entry.employee_name}</span>
        </div>
        <span className="pixel-heading text-xs text-neon-orange">
          <AnimatedNumber value={entry.counted_referrals} /> REF
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: "INITIAL", val: entry.at_ips },
          { label: "SKILLS", val: entry.at_hms },
          { label: "TAKE HOME", val: entry.at_panel },
          { label: "ONSITE", val: entry.at_final },
          { label: "REFS", val: entry.at_offer },
          { label: "HIRED", val: entry.hires },
        ].map((s) => (
          <div key={s.label} className="bg-arcade-dark rounded p-2">
            <div className="text-white text-sm font-bold"><AnimatedNumber value={s.val} /></div>
            <div className="text-white/40 text-[9px] pixel-heading">{s.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState(true);

  const enabled = process.env.NEXT_PUBLIC_LEADERBOARD_ENABLED === "true";

  useEffect(() => {
    if (!enabled) return;

    fetch("/api/leaderboard")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEntries(data.entries);
        setUpdatedAt(data.updated_at);
        setIsEmpty(data.is_empty);
      })
      .catch((err) => {
        console.error("Leaderboard fetch failed:", err);
        setIsEmpty(true);
      });
  }, [enabled]);

  return (
    <section className="py-16 sm:py-24 px-4" id="leaderboard">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="pixel-heading text-xl sm:text-2xl text-white glow-blue mb-3">
            LEADERBOARD
          </h2>
          <p className="text-white/70 text-sm">Who&apos;s heating up?</p>
        </motion.div>

        {!enabled || isEmpty ? (
          <ComingSoon />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-xl border border-january-blue/20 bg-arcade-card/80 overflow-hidden">
              <div className="grid grid-cols-10 gap-2 px-4 py-3 border-b border-january-blue/20 text-[10px] pixel-heading text-muted">
                <span>RANK</span>
                <span className="col-span-2">NAME</span>
                <span className="text-center">REFERRALS</span>
                <span className="text-center">INITIAL</span>
                <span className="text-center">SKILLS</span>
                <span className="text-center">TAKE HOME</span>
                <span className="text-center">ONSITE</span>
                <span className="text-center">REFS</span>
                <span className="text-center">HIRED</span>
              </div>
              {entries.map((entry, i) => {
                const rank = i + 1;
                const isTop3 = rank <= 3;
                return (
                  <motion.div
                    key={entry.employee_name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className={`grid grid-cols-10 gap-2 px-4 py-3 items-center border-b border-white/5 ${isTop3 ? "fire-border" : ""}`}
                  >
                    <div><RankBadge rank={rank} /></div>
                    <div className="col-span-2 text-white font-semibold text-sm">{entry.employee_name}</div>
                    <div className="text-center text-white font-bold"><AnimatedNumber value={entry.counted_referrals} delay={i * 100} /></div>
                    <div className="text-center text-white/60"><AnimatedNumber value={entry.at_ips} delay={i * 100 + 50} /></div>
                    <div className="text-center text-white/60"><AnimatedNumber value={entry.at_hms} delay={i * 100 + 100} /></div>
                    <div className="text-center text-white/60"><AnimatedNumber value={entry.at_panel} delay={i * 100 + 125} /></div>
                    <div className="text-center text-white/60"><AnimatedNumber value={entry.at_final} delay={i * 100 + 150} /></div>
                    <div className="text-center text-white/60"><AnimatedNumber value={entry.at_offer} delay={i * 100 + 175} /></div>
                    <div className="text-center text-neon-orange font-bold"><AnimatedNumber value={entry.hires} delay={i * 100 + 200} /></div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {entries.map((entry, i) => (
                <MobileCard key={entry.employee_name} entry={entry} rank={i + 1} />
              ))}
            </div>

            {updatedAt && (
              <p className="text-white/30 text-xs text-center mt-4">
                Last updated: {new Date(updatedAt).toLocaleString()}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
