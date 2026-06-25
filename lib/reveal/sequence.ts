import type { RevealSequenceConfig } from "@/lib/reveal/types";

export const REVEAL_TITLE_MS = 600;
export const REVEAL_MESSAGE_MS = 425;
export const REVEAL_FADE_MS = 150;
export const REVEAL_RESULTS_FADE_MS = 300;

export const DEFAULT_REVEAL_TITLE = "🏆 The Group Has Spoken.";

export const DEFAULT_REVEAL_MESSAGES = [
  "Analyzing friendships...",
  "Finding alliances...",
  "Measuring chaos...",
  "Preparing the verdict...",
] as const;

/** Static reveal copy for v1.1 — swap or extend for contextual messages later. */
export const DEFAULT_REVEAL_SEQUENCE: RevealSequenceConfig = {
  title: DEFAULT_REVEAL_TITLE,
  titleDurationMs: REVEAL_TITLE_MS,
  messages: DEFAULT_REVEAL_MESSAGES,
  messageDurationMs: REVEAL_MESSAGE_MS,
  fadeDurationMs: REVEAL_FADE_MS,
  resultsFadeDurationMs: REVEAL_RESULTS_FADE_MS,
};

export function buildRevealSteps(
  config: RevealSequenceConfig,
): { text: string; durationMs: number }[] {
  return [
    { text: config.title, durationMs: config.titleDurationMs },
    ...config.messages.map((text) => ({
      text,
      durationMs: config.messageDurationMs,
    })),
  ];
}

/** ~2.6s for default steps + final results fade (under 3s cap). */
export function getRevealSequenceDurationMs(
  config: RevealSequenceConfig = DEFAULT_REVEAL_SEQUENCE,
): number {
  const stepsMs = buildRevealSteps(config).reduce(
    (total, step) => total + step.durationMs,
    0,
  );
  return stepsMs + config.resultsFadeDurationMs;
}
