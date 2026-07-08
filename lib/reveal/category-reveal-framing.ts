export type CategoryRevealTone = "confident" | "playful" | "suspense" | "neutral";

export type CategoryRevealFraming = {
  anticipation: string;
  tone: CategoryRevealTone;
};

const LABEL_FRAMING: Record<string, CategoryRevealFraming> = {
  "Main Character": {
    anticipation: "Your group's center of gravity...",
    tone: "confident",
  },
  "Chaos Agent": {
    anticipation: "Someone had to start the chaos...",
    tone: "playful",
  },
  "Secret Villain": {
    anticipation: "This one wasn't as obvious...",
    tone: "suspense",
  },
};

const RANK_FALLBACKS: Record<number, CategoryRevealFraming> = {
  2: {
    anticipation: "The next title surprised a few people...",
    tone: "neutral",
  },
  3: {
    anticipation: "One more piece of the story...",
    tone: "neutral",
  },
};

export function getCategoryRevealFraming(
  label: string,
  rank: number,
): CategoryRevealFraming | null {
  if (LABEL_FRAMING[label]) {
    return LABEL_FRAMING[label];
  }

  return RANK_FALLBACKS[rank] ?? null;
}

export function getCategoryToneClassName(tone: CategoryRevealTone): string {
  switch (tone) {
    case "confident":
      return "text-sm font-semibold text-violet-200";
    case "playful":
      return "text-sm font-medium text-fuchsia-300";
    case "suspense":
      return "text-sm italic text-slate-400";
    default:
      return "text-sm text-violet-200/80";
  }
}
