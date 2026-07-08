import type { RevealSequenceConfig, RevealSequenceStep } from "@/lib/reveal/types";

export const REVEAL_FADE_MS = 300;
export const REVEAL_RESULTS_FADE_MS = 300;

export const REVEAL_OPENING_TITLE = "Let's see what your group decided...";

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
      text: "The votes are in...",
      durationMs: 1150,
      animateDots: true,
      tone: "status",
    },
    {
      text: "Almost there...",
      durationMs: 1150,
      animateDots: false,
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
