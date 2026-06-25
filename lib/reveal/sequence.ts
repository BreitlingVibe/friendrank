import type { RevealSequenceConfig, RevealSequenceStep } from "@/lib/reveal/types";

export const REVEAL_FADE_MS = 280;
export const REVEAL_RESULTS_FADE_MS = 400;

/** ~2.5s reveal steps + ~0.4s results crossfade (under 3s cap). */
export const DEFAULT_REVEAL_SEQUENCE: RevealSequenceConfig = {
  fadeDurationMs: REVEAL_FADE_MS,
  resultsFadeDurationMs: REVEAL_RESULTS_FADE_MS,
  steps: [
    {
      text: "🏆 The Group Has Spoken",
      durationMs: 600,
      tone: "title",
    },
    {
      text: "Analyzing friendships",
      durationMs: 1200,
      animateDots: true,
      tone: "status",
    },
    {
      text: "Preparing the verdict",
      durationMs: 700,
      animateDots: true,
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
