import type { VibeTag } from "@/lib/game-build";

export type RevealMessageProfile = {
  messages: readonly [string, string];
};

export const GENERIC_REVEAL_PROFILE: RevealMessageProfile = {
  messages: ["Analyzing friendships", "Preparing the verdict"],
};

export const VIBE_REVEAL_PROFILES: Partial<Record<VibeTag, RevealMessageProfile>> =
  {
    Gaming: {
      messages: ["Loading the match replay", "Calculating MVP"],
    },
    Discord: {
      messages: ["Syncing the server", "Reading message history"],
    },
    Office: {
      messages: ["Reviewing meeting notes", "Finding the real decision maker"],
    },
    School: {
      messages: ["Comparing everyone's stories", "Checking who copied whose homework"],
    },
    College: {
      messages: ["Debating campus lore", "Checking the group project alibi"],
    },
    Family: {
      messages: ["Collecting family evidence", "Finding out who started it"],
    },
    Sports: {
      messages: ["Reviewing the highlight reel", "Choosing the MVP"],
    },
    Party: {
      messages: ["Recapping last night", "Finding who remembers anything"],
    },
    "Meme-heavy": {
      messages: ["Loading the group chat archive", "Translating the memes"],
    },
    "Soft drama": {
      messages: ["Piecing together the timeline", "Preparing the verdict"],
    },
    "Brutal honesty": {
      messages: ["Gathering unfiltered opinions", "Preparing the honest truth"],
    },
    Chaotic: {
      messages: ["Measuring the chaos", "Bracing for impact"],
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
    messages: ["Measuring the chaos", "Preparing the verdict"],
  },
  Wholesome: {
    messages: ["Gathering the good vibes", "Preparing the verdict"],
  },
  "Savage but friendly": {
    messages: ["Collecting the receipts", "Preparing the verdict"],
  },
  Funny: {
    messages: ["Analyzing friendships", "Preparing the punchline"],
  },
} as const satisfies Record<
  "Chaotic" | "Wholesome" | "Savage but friendly" | "Funny",
  RevealMessageProfile
>;
