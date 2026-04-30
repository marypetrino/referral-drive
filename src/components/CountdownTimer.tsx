"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-06-01T23:59:59-04:00"); // June 1, 2026 11:59 PM ET

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="countdown-digit rounded-lg px-3 py-3 sm:px-5 sm:py-4 min-w-[60px] sm:min-w-[80px] text-center">
        <span className="text-2xl sm:text-4xl text-white glow-blue">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="pixel-heading text-[8px] sm:text-[10px] text-muted mt-2 tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isExpired = timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <div className="pixel-heading text-neon-orange glow-orange text-lg">
        RACE OVER
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Digit value={timeLeft.days} label="DAYS" />
      <span className="text-january-blue text-2xl sm:text-3xl font-bold glow-blue mt-[-20px]">:</span>
      <Digit value={timeLeft.hours} label="HRS" />
      <span className="text-january-blue text-2xl sm:text-3xl font-bold glow-blue mt-[-20px]">:</span>
      <Digit value={timeLeft.minutes} label="MIN" />
      <span className="text-january-blue text-2xl sm:text-3xl font-bold glow-blue mt-[-20px]">:</span>
      <Digit value={timeLeft.seconds} label="SEC" />
    </div>
  );
}
