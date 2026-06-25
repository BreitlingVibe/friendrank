"use client";

import { useEffect, useState } from "react";
import { DEFAULT_REVEAL_SEQUENCE } from "@/lib/reveal/sequence";
import type { RevealSequenceConfig } from "@/lib/reveal/types";
import { useRevealSequence } from "@/lib/reveal/use-reveal-sequence";

type FriendRankRevealProps = {
  sequence?: RevealSequenceConfig;
  active?: boolean;
  onComplete?: () => void;
  className?: string;
};

function AnimatedDots() {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((count) => (count % 3) + 1);
    }, 420);

    return () => clearInterval(interval);
  }, []);

  return (
    <span aria-hidden className="inline-block w-[1.25em] text-left">
      {".".repeat(dotCount)}
    </span>
  );
}

export function FriendRankReveal({
  sequence = DEFAULT_REVEAL_SEQUENCE,
  active = true,
  onComplete,
  className = "",
}: FriendRankRevealProps) {
  const { displayText, animateDots, tone, isVisible, isComplete } =
    useRevealSequence(sequence, active);

  useEffect(() => {
    if (active && isComplete) {
      onComplete?.();
    }
  }, [active, isComplete, onComplete]);

  const textClassName =
    tone === "title"
      ? "text-2xl font-extrabold text-emerald-300 sm:text-3xl"
      : tone === "finale"
        ? "text-xl font-semibold tracking-wide text-violet-100 sm:text-2xl"
        : "text-xl font-medium tracking-wide text-slate-200 sm:text-2xl";

  return (
    <div
      className={`relative mx-auto max-w-md overflow-hidden rounded-[2rem] border-2 border-violet-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl shadow-violet-500/30 ${className}`}
      aria-live="polite"
      aria-busy={!isComplete}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="friendrank-reveal-glow absolute -left-1/4 top-1/3 h-56 w-56 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="friendrank-reveal-glow friendrank-reveal-glow-delay absolute -right-1/4 top-1/2 h-48 w-48 rounded-full bg-fuchsia-600/15 blur-3xl" />
        <div className="friendrank-reveal-glow friendrank-reveal-glow-delay-2 absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-600/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-[320px] items-center justify-center px-8 py-16 text-center">
        <p
          className={`max-w-xs leading-snug transition-opacity ease-in-out ${textClassName} ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: `${sequence.fadeDurationMs}ms` }}
        >
          {displayText}
          {animateDots ? <AnimatedDots /> : null}
        </p>
      </div>
    </div>
  );
}
