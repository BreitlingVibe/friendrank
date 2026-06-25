"use client";

import { useEffect } from "react";
import { DEFAULT_REVEAL_SEQUENCE } from "@/lib/reveal/sequence";
import type { RevealSequenceConfig } from "@/lib/reveal/types";
import { useRevealSequence } from "@/lib/reveal/use-reveal-sequence";

type FriendRankRevealProps = {
  sequence?: RevealSequenceConfig;
  active?: boolean;
  onComplete?: () => void;
  className?: string;
};

export function FriendRankReveal({
  sequence = DEFAULT_REVEAL_SEQUENCE,
  active = true,
  onComplete,
  className = "",
}: FriendRankRevealProps) {
  const { displayText, isVisible, isComplete } = useRevealSequence(
    sequence,
    active,
  );

  useEffect(() => {
    if (active && isComplete) {
      onComplete?.();
    }
  }, [active, isComplete, onComplete]);

  return (
    <div
      className={`mx-auto max-w-md overflow-hidden rounded-[2rem] border-2 border-violet-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl shadow-violet-500/30 ${className}`}
      aria-live="polite"
      aria-busy={!isComplete}
    >
      <div className="flex min-h-[320px] items-center justify-center bg-gradient-to-r from-violet-600/20 via-fuchsia-600/10 to-cyan-600/20 px-8 py-16 text-center">
        <p
          className={`max-w-xs text-2xl font-extrabold leading-snug tracking-tight transition-opacity duration-150 ease-in-out sm:text-3xl ${
            isVisible ? "opacity-100" : "opacity-0"
          } ${displayText === sequence.title ? "text-emerald-300" : "text-violet-100"}`}
        >
          {displayText}
        </p>
      </div>
    </div>
  );
}
