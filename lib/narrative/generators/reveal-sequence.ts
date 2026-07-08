import {
  GENERIC_REVEAL_PROFILE,
  TONE_REVEAL_PROFILES,
  VIBE_REVEAL_PRIORITY,
  VIBE_REVEAL_PROFILES,
  type RevealMessageProfile,
} from "@/lib/narrative/templates/reveal-profiles";
import type { NarrativeContext } from "@/lib/narrative/types";
import {
  DEFAULT_REVEAL_SEQUENCE,
  REVEAL_FADE_MS,
  REVEAL_OPENING_TITLE,
  REVEAL_RESULTS_FADE_MS,
} from "@/lib/reveal/sequence";
import type { RevealSequenceConfig } from "@/lib/reveal/types";

function pickRevealProfile(context: NarrativeContext): RevealMessageProfile {
  for (const tag of VIBE_REVEAL_PRIORITY) {
    if (context.game.vibeTags.includes(tag)) {
      const profile = VIBE_REVEAL_PROFILES[tag];
      if (profile) {
        return profile;
      }
    }
  }

  const toneProfile = TONE_REVEAL_PROFILES[context.game.tone];
  if (toneProfile) {
    return toneProfile;
  }

  return GENERIC_REVEAL_PROFILE;
}

/**
 * Builds a context-aware reveal sequence without spoiling winners or verdict.
 */
export function generateRevealSequence(
  context: NarrativeContext,
): RevealSequenceConfig {
  const profile = pickRevealProfile(context);
  const titleStep = DEFAULT_REVEAL_SEQUENCE.steps[0];
  const statusStep = DEFAULT_REVEAL_SEQUENCE.steps[1];
  const finaleStep = DEFAULT_REVEAL_SEQUENCE.steps[2];

  return {
    fadeDurationMs: REVEAL_FADE_MS,
    resultsFadeDurationMs: REVEAL_RESULTS_FADE_MS,
    steps: [
      {
        text: REVEAL_OPENING_TITLE,
        durationMs: titleStep?.durationMs ?? 700,
        tone: "title",
      },
      {
        text: profile.suspense,
        durationMs: statusStep?.durationMs ?? 1150,
        tone: "status",
      },
      {
        text: profile.commitment,
        durationMs: finaleStep?.durationMs ?? 1150,
        tone: "finale",
      },
    ],
  };
}
