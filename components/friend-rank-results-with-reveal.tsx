"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FriendRankReveal } from "@/components/friend-rank-reveal";
import {
  HERO_MOMENT_DELAY_MS,
  HERO_REST_OFFSET_MS,
  HeroMomentProvider,
  type HeroMomentStage,
} from "@/components/friend-rank-hero-moment";
import {
  getCascadeCompletionMs,
  ResultsCascadeProvider,
  useResultsCascade,
} from "@/components/friend-rank-results-cascade";
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

type RevealShellProps = {
  children: ReactNode;
  fadeMs: number;
  showResults: boolean;
  revealFinished: boolean;
  hideOverlay: boolean;
  onResultsTransitionEnd: (event: React.TransitionEvent<HTMLDivElement>) => void;
  onRevealComplete: () => void;
  onOverlayTransitionEnd: () => void;
  revealSequence: RevealSequenceConfig;
  heroStage: HeroMomentStage;
  setHeroStage: (stage: HeroMomentStage) => void;
};

function RevealShell({
  children,
  fadeMs,
  showResults,
  revealFinished,
  hideOverlay,
  onResultsTransitionEnd,
  onRevealComplete,
  onOverlayTransitionEnd,
  revealSequence,
  heroStage,
  setHeroStage,
}: RevealShellProps) {
  const { sectionCount } = useResultsCascade();

  useEffect(() => {
    if (heroStage !== "rest") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setHeroStage("done");
    }, getCascadeCompletionMs(sectionCount));

    return () => window.clearTimeout(timeout);
  }, [heroStage, sectionCount, setHeroStage]);

  return (
    <div className="relative mx-auto max-w-md">
      <div
        className={`transition-opacity ease-in-out ${
          showResults ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: `${fadeMs}ms` }}
        onTransitionEnd={onResultsTransitionEnd}
      >
        {children}
      </div>

      {!hideOverlay && (
        <div
          className={`absolute inset-0 z-10 transition-opacity ease-in-out ${
            revealFinished ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${fadeMs}ms` }}
          onTransitionEnd={onOverlayTransitionEnd}
        >
          <FriendRankReveal
            sequence={revealSequence}
            onComplete={onRevealComplete}
          />
        </div>
      )}
    </div>
  );
}

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
  const [heroStage, setHeroStage] = useState<HeroMomentStage>("waiting");
  const heroSequenceStartedRef = useRef(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && prefersReducedMotion) {
      setRevealFinished(true);
      setShowResults(true);
      setHideOverlay(true);
      setHeroStage("done");
    }
  }, [hydrated, prefersReducedMotion]);

  useEffect(() => {
    if (!revealFinished || prefersReducedMotion) {
      return;
    }

    setShowResults(true);
  }, [revealFinished, prefersReducedMotion]);

  function handleResultsTransitionEnd(
    event: React.TransitionEvent<HTMLDivElement>,
  ) {
    if (
      event.propertyName !== "opacity" ||
      !showResults ||
      heroSequenceStartedRef.current
    ) {
      return;
    }

    heroSequenceStartedRef.current = true;

    window.setTimeout(() => {
      setHeroStage("hero");
    }, HERO_MOMENT_DELAY_MS);

    window.setTimeout(() => {
      setHeroStage("rest");
    }, HERO_MOMENT_DELAY_MS + HERO_REST_OFFSET_MS);
  }

  if (!hydrated || prefersReducedMotion) {
    return <>{children}</>;
  }

  const fadeMs =
    revealSequence.resultsFadeDurationMs ??
    DEFAULT_REVEAL_SEQUENCE.resultsFadeDurationMs;

  return (
    <HeroMomentProvider enabled stage={heroStage}>
      <ResultsCascadeProvider enabled stage={heroStage}>
        <RevealShell
          fadeMs={fadeMs}
          showResults={showResults}
          revealFinished={revealFinished}
          hideOverlay={hideOverlay}
          onResultsTransitionEnd={handleResultsTransitionEnd}
          onRevealComplete={() => setRevealFinished(true)}
          onOverlayTransitionEnd={() => {
            if (revealFinished) {
              setHideOverlay(true);
            }
          }}
          revealSequence={revealSequence}
          heroStage={heroStage}
          setHeroStage={setHeroStage}
        >
          {children}
        </RevealShell>
      </ResultsCascadeProvider>
    </HeroMomentProvider>
  );
}
