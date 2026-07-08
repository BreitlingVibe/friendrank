import type { VibeTag } from "@/lib/game-build";

export type RevealMessageProfile = {
  messages: readonly [string, string];
};

export const GENERIC_REVEAL_PROFILE: RevealMessageProfile = {
  messages: ["The votes are in...", "Almost there..."],
};

export const VIBE_REVEAL_PROFILES: Partial<Record<VibeTag, RevealMessageProfile>> =
  {
    Gaming: {
      messages: ["Loading the match replay...", "One title split the room..."],
    },
    Discord: {
      messages: ["Syncing the server logs...", "This one took longer than expected..."],
    },
    Office: {
      messages: ["Reviewing meeting notes...", "The real decision maker is emerging..."],
    },
    School: {
      messages: ["Comparing everyone's stories...", "One answer started real debate..."],
    },
    College: {
      messages: ["Debating campus lore...", "The group chat has a verdict..."],
    },
    Family: {
      messages: ["Collecting family evidence...", "Someone's been holding out..."],
    },
    Sports: {
      messages: ["Reviewing the highlight reel...", "The MVP wasn't obvious..."],
    },
    Party: {
      messages: ["Recapping last night...", "Not everyone remembers the same thing..."],
    },
    "Meme-heavy": {
      messages: ["Loading the group chat archive...", "Translating the memes..."],
    },
    "Soft drama": {
      messages: ["Piecing together the timeline...", "The full picture is forming..."],
    },
    "Brutal honesty": {
      messages: ["Gathering unfiltered opinions...", "One title hurt a little..."],
    },
    Chaotic: {
      messages: ["Measuring the chaos...", "This one wasn't obvious..."],
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
    messages: ["Measuring the chaos...", "This one wasn't obvious..."],
  },
  Wholesome: {
    messages: ["Gathering the good vibes...", "The final picture is forming..."],
  },
  "Savage but friendly": {
    messages: ["Collecting the receipts...", "One title created real debate..."],
  },
  Funny: {
    messages: ["Reading between the votes...", "Almost ready for the punchline..."],
  },
} as const satisfies Record<
  "Chaotic" | "Wholesome" | "Savage but friendly" | "Funny",
  RevealMessageProfile
>;
