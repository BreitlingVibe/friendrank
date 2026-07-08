import type { RevealSequenceConfig, RevealSequenceStep } from "@/lib/reveal/types";

export const REVEAL_FADE_MS = 300;
export const REVEAL_RESULTS_FADE_MS = 300;

/** Stage 1 — Curiosity: wonder what happened, not what the app is doing. */
export const REVEAL_OPENING_TITLE = "Every vote told part of the story...";

/** ~3.0s reveal steps + ~0.3s results crossfade (~3.2s total). */
export const DEFAULT_REVEAL_SEQUENCE: RevealSequenceConfig = {
  fadeDurationMs: REVEAL_FADE_MS,
  resultsFadeDurationMs: REVEAL_RESULTS_FADE_MS,
  steps: [
    {
      text: REVEAL_OPENING_TITLE,
      durationMs: 700,
      tone: "title",
    },
    {
      text: "Some titles were obvious. Others weren't.",
      durationMs: 1150,
      tone: "status",
    },
    {
      text: "One result surprised everyone.",
      durationMs: 1150,
      tone: "finale",
    },
  ],
};

export function buildRevealSteps(
  config: RevealSequenceConfig,
): RevealSequenceStep[] {
  return config.steps.map((step) => ({ ...step }));
}

export function getRevealSequenceDurationMs(
  config: RevealSequenceConfig = DEFAULT_REVEAL_SEQUENCE,
): number {
  const stepsMs = buildRevealSteps(config).reduce(
    (total, step) => total + step.durationMs,
    0,
  );
  return stepsMs + config.resultsFadeDurationMs;
}
