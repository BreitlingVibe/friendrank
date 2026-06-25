import type { RevealSequenceConfig, RevealSequenceStep } from "@/lib/reveal/types";

export const REVEAL_FADE_MS = 300;
export const REVEAL_RESULTS_FADE_MS = 300;

/** ~3.0s reveal steps + ~0.3s results crossfade (~3.2s total). */
export const DEFAULT_REVEAL_SEQUENCE: RevealSequenceConfig = {
  fadeDurationMs: REVEAL_FADE_MS,
  resultsFadeDurationMs: REVEAL_RESULTS_FADE_MS,
  steps: [
    {
      text: "🏆 The Group Has Spoken",
      durationMs: 800,
      tone: "title",
    },
    {
      text: "Analyzing friendships",
      durationMs: 1300,
      animateDots: true,
      tone: "status",
    },
    {
      text: "Preparing the verdict",
      durationMs: 900,
      animateDots: true,
      tone: "status",
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
