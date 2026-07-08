import type { VibeTag } from "@/lib/game-build";

export type RevealMessageProfile = {
  /** Stage 2 — Suspense */
  suspense: string;
  /** Stage 3 — Commitment */
  commitment: string;
};

export const GENERIC_REVEAL_PROFILE: RevealMessageProfile = {
  suspense: "Some titles were obvious. Others weren't.",
  commitment: "One result surprised everyone.",
};

export const VIBE_REVEAL_PROFILES: Partial<Record<VibeTag, RevealMessageProfile>> =
  {
    Gaming: {
      suspense: "Some roles were locks. One split the squad.",
      commitment: "Your group's MVP is about to drop.",
    },
    Discord: {
      suspense: "The server agreed on some picks. Not all of them.",
      commitment: "Someone's getting crowned first.",
    },
    Office: {
      suspense: "A few titles wrote themselves. One didn't.",
      commitment: "Time to see who your team really picked.",
    },
    School: {
      suspense: "Some answers matched. One started real debate.",
      commitment: "Your classmates have chosen sides.",
    },
    College: {
      suspense: "The group chat agreed on some things. Not everything.",
      commitment: "Campus lore just got a verdict.",
    },
    Family: {
      suspense: "Some picks were unanimous. One wasn't.",
      commitment: "Someone in the family is about to find out.",
    },
    Sports: {
      suspense: "Some MVPs were obvious. One wasn't.",
      commitment: "The highlight reel has a winner.",
    },
    Party: {
      suspense: "Everyone remembered last night differently.",
      commitment: "The group finally picked a story.",
    },
    "Meme-heavy": {
      suspense: "Some memes won easily. One caused chaos.",
      commitment: "The group chat has spoken.",
    },
    "Soft drama": {
      suspense: "Some picks were gentle. One cut deep.",
      commitment: "The full picture is ready.",
    },
    "Brutal honesty": {
      suspense: "Some truths were easy. One stung.",
      commitment: "Your friends didn't hold back.",
    },
    Chaotic: {
      suspense: "Some picks made sense. One absolutely didn't.",
      commitment: "Brace yourself — here come the results.",
    },
  };

/** First matching tag wins when multiple vibe tags are selected. */
export const VIBE_REVEAL_PRIORITY: VibeTag[] = [
  "Gaming",
  "Discord",
  "Office",
  "School",
  "College",
  "Family",
  "Sports",
  "Party",
  "Meme-heavy",
  "Soft drama",
  "Brutal honesty",
  "Chaotic",
];

export const TONE_REVEAL_PROFILES = {
  Chaotic: {
    suspense: "Some picks made sense. One absolutely didn't.",
    commitment: "Brace yourself — here come the results.",
  },
  Wholesome: {
    suspense: "Some titles felt obvious. One warmed the room.",
    commitment: "Your friends chose who matters most.",
  },
  "Savage but friendly": {
    suspense: "Some receipts were expected. One wasn't.",
    commitment: "Someone's about to get called out lovingly.",
  },
  Funny: {
    suspense: "Some picks were comedy gold. One was a plot twist.",
    commitment: "The punchline is about to land.",
  },
} as const satisfies Record<
  "Chaotic" | "Wholesome" | "Savage but friendly" | "Funny",
  RevealMessageProfile
>;
