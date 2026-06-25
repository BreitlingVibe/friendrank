"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { FriendRankReveal } from "@/components/friend-rank-reveal";
import { generateRevealSequence } from "@/lib/narrative/generators/reveal-sequence";
import type { NarrativeContext } from "@/lib/narrative/types";
import { DEFAULT_REVEAL_SEQUENCE } from "@/lib/reveal/sequence";
import type { RevealSequenceConfig } from "@/lib/reveal/types";
import { usePrefersReducedMotion } from "@/lib/reveal/use-prefers-reduced-motion";

type FriendRankResultsWithRevealProps = {
  children: ReactNode;
  narrativeContext: NarrativeContext;
  sequence?: RevealSequenceConfig;
};

/**
 * Delays results presentation with a one-time reveal sequence per page load.
 */
export function FriendRankResultsWithReveal({
  children,
  narrativeContext,
  sequence,
}: FriendRankResultsWithRevealProps) {
  const revealSequence = useMemo(
    () => sequence ?? generateRevealSequence(narrativeContext),
    [narrativeContext, sequence],
  );

  const prefersReducedMotion = usePrefersReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const [revealFinished, setRevealFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && prefersReducedMotion) {
      setRevealFinished(true);
      setShowResults(true);
      setHideOverlay(true);
    }
  }, [hydrated, prefersReducedMotion]);

  useEffect(() => {
    if (!revealFinished || prefersReducedMotion) {
      return;
    }

    setShowResults(true);
  }, [revealFinished, prefersReducedMotion]);

  if (!hydrated || prefersReducedMotion) {
    return <>{children}</>;
  }

  const fadeMs = revealSequence.resultsFadeDurationMs ?? DEFAULT_REVEAL_SEQUENCE.resultsFadeDurationMs;

  return (
    <div className="relative mx-auto max-w-md">
      <div
        className={`transition-opacity ease-in-out ${
          showResults ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${fadeMs}ms` }}
      >
        {children}
      </div>

      {!hideOverlay && (
        <div
          className={`absolute inset-0 z-10 transition-opacity ease-in-out ${
            revealFinished ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${fadeMs}ms` }}
          onTransitionEnd={() => {
            if (revealFinished) {
              setHideOverlay(true);
            }
          }}
        >
          <FriendRankReveal
            sequence={revealSequence}
            onComplete={() => setRevealFinished(true)}
          />
        </div>
      )}
    </div>
  );
}
