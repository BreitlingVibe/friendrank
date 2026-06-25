export type RevealStepTone = "title" | "status" | "finale";

export type RevealStepConfig = {
  text: string;
  durationMs: number;
  animateDots?: boolean;
  tone?: RevealStepTone;
};

export type RevealSequenceConfig = {
  steps: readonly RevealStepConfig[];
  fadeDurationMs: number;
  resultsFadeDurationMs: number;
};

export type RevealSequenceStep = {
  text: string;
  durationMs: number;
  animateDots?: boolean;
  tone?: RevealStepTone;
};
