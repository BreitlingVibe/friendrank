import type { Tone, VibeTag } from "@/lib/game-build";
import {
  ENDING_THEME_PROFILES,
  type EndingPresentation,
  type EndingTheme,
} from "@/lib/narrative/templates/ending-profiles";
import type { NarrativeContext } from "@/lib/narrative/types";
import { pickIndex } from "@/lib/narrative/utils/seed";

const VIBE_ENDING_THEME_PRIORITY: {
  tags: VibeTag[];
  theme: EndingTheme;
}[] = [
  { tags: ["Gaming", "Discord"], theme: "gaming" },
  { tags: ["Office"], theme: "office" },
  { tags: ["School", "College"], theme: "school" },
  { tags: ["Family"], theme: "family" },
  { tags: ["Brutal honesty", "Soft drama"], theme: "courtroom" },
];

const TONE_ENDING_THEME: Partial<Record<Tone, EndingTheme>> = {
  Chaotic: "gaming",
  "Savage but friendly": "courtroom",
  Wholesome: "family",
};

function pickEndingTheme(context: NarrativeContext): EndingTheme {
  for (const entry of VIBE_ENDING_THEME_PRIORITY) {
    if (entry.tags.some((tag) => context.game.vibeTags.includes(tag))) {
      return entry.theme;
    }
  }

  const toneTheme = TONE_ENDING_THEME[context.game.tone];
  if (toneTheme) {
    return toneTheme;
  }

  return "generic";
}

export function generateEnding(context: NarrativeContext): EndingPresentation {
  const theme = pickEndingTheme(context);
  const profile = ENDING_THEME_PROFILES[theme];
  const endingCopy =
    profile.endings[pickIndex(context.seed, 9, profile.endings.length)] ??
    profile.endings[0];

  return {
    heading: profile.heading,
    title: endingCopy.title,
    subtitle: endingCopy.subtitle,
  };
}
