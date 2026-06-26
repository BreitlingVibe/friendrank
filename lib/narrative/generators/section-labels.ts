import type { Tone, VibeTag } from "@/lib/game-build";
import {
  GENERIC_SECTION_LABELS,
  SECTION_LABEL_THEMES,
  type ResultsSectionLabels,
  type SectionLabelTheme,
} from "@/lib/narrative/templates/section-label-profiles";
import type { NarrativeContext } from "@/lib/narrative/types";

const VIBE_LABEL_THEME_PRIORITY: {
  tags: VibeTag[];
  theme: SectionLabelTheme;
}[] = [
  { tags: ["Gaming", "Discord"], theme: "gaming" },
  { tags: ["Office"], theme: "office" },
  { tags: ["School", "College"], theme: "school" },
  { tags: ["Family"], theme: "family" },
  { tags: ["Brutal honesty", "Soft drama"], theme: "courtroom" },
];

const TONE_LABEL_THEME: Partial<Record<Tone, SectionLabelTheme>> = {
  Chaotic: "gaming",
  "Savage but friendly": "courtroom",
  Wholesome: "family",
};

export function pickSectionLabelTheme(context: NarrativeContext): SectionLabelTheme {
  for (const entry of VIBE_LABEL_THEME_PRIORITY) {
    if (entry.tags.some((tag) => context.game.vibeTags.includes(tag))) {
      return entry.theme;
    }
  }

  const toneTheme = TONE_LABEL_THEME[context.game.tone];
  if (toneTheme) {
    return toneTheme;
  }

  return "generic";
}

export function generateSectionLabels(
  context: NarrativeContext,
): ResultsSectionLabels {
  const theme = pickSectionLabelTheme(context);
  return SECTION_LABEL_THEMES[theme] ?? GENERIC_SECTION_LABELS;
}

export { GENERIC_SECTION_LABELS };
