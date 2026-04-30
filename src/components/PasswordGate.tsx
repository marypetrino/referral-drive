"use client";

import { useState, FormEvent } from "react";
import { Horse } from "@phosphor-icons/react";

export default function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        setError("Wrong code. Try again.");
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-arcade-dark">
      <div className="w-full max-w-md px-6 text-center">
        {/* Decorative horse */}
        <div className="mb-8 animate-bounce" style={{ animationDuration: "2s" }}>
          <Horse size={64} weight="duotone" className="text-neon-orange mx-auto" />
        </div>

        <h1 className="pixel-heading text-2xl sm:text-3xl text-white glow-blue mb-4 leading-relaxed">
          PROFOUND<br />DERBY DRIVE
        </h1>
        <p className="text-white/70 text-sm mb-8 font-medium tracking-wide uppercase">
          Profound Referral Drive 2026
        </p>

        <p className="pixel-heading text-xs text-neon-orange glow-orange mb-6">
          ENTER THE PADDOCK
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={shaking ? "shake" : ""}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter code..."
              className="w-full px-4 py-3 bg-arcade-card border border-january-blue/40 rounded-lg text-white text-center font-[var(--font-pixel)] text-sm focus:outline-none focus:border-january-blue focus:ring-1 focus:ring-january-blue/50 placeholder:text-white/25"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-fire-orange text-xs pixel-heading">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="arcade-btn w-full py-3 px-6 bg-january-blue text-white pixel-heading text-xs rounded-lg disabled:opacity-40 hover:bg-january-blue-light transition-colors"
          >
            {loading ? "..." : "LET'S GO"}
          </button>
        </form>

        <p className="mt-12 text-white/25 text-xs">
          Get the code from your Slack channel
        </p>
      </div>
    </div>
  );
}
