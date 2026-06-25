export type RevealSequenceConfig = {
  title: string;
  titleDurationMs: number;
  messages: readonly string[];
  messageDurationMs: number;
  fadeDurationMs: number;
  resultsFadeDurationMs: number;
};

export type RevealSequenceStep = {
  text: string;
  durationMs: number;
};
