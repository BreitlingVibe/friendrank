const LABEL_FRAMING: Record<string, string> = {
  "Main Character": "The center of your group's story...",
  "Chaos Agent": "Every group has someone who keeps things interesting...",
  "Secret Villain": "Not every opinion was obvious...",
  "Most Delusional": "Reality took a vote...",
  "Chronically Online": "The internet had opinions...",
  "Future Influencer": "Fame was on the ballot...",
  "Most Likely To Go Viral": "The timeline had a say...",
  "Group Therapist": "Someone holds this group together...",
  "Walking Red Flag": "The group noticed something...",
  "Green Flag Award": "Someone earned the trust...",
  "Plot Twist Generator": "Nobody saw this coming...",
  "Most Likely To Get Cancelled": "The jury was out on this one...",
};

const RANK_FALLBACKS: Record<number, string> = {
  2: "The next chapter surprised a few people...",
  3: "One more role in your group's story...",
  4: "Another title the group couldn't ignore...",
};

export function getCategoryRevealFraming(
  label: string,
  rank: number,
): string | null {
  if (LABEL_FRAMING[label]) {
    return LABEL_FRAMING[label];
  }

  return RANK_FALLBACKS[rank] ?? null;
}

export const CATEGORY_FRAMING_CLASS = "text-sm text-violet-200/90";
