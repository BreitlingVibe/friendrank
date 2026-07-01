import type { IntentDefinition } from "@/lib/landing-pages/planning/intent-registry";
import {
  buildEnhancedHeroSubtitle,
  buildEnhancedIntentLead,
} from "@/lib/landing-pages/content-quality";

/** Intent-specific hero lead driven by registry audience and search intent. */
export function buildSemanticHeroSubtitle(
  intent: IntentDefinition,
  fallback: string,
): string {
  return buildEnhancedHeroSubtitle(intent, fallback);
}

/** Lead shown above the intent summary when it adds context. */
export function buildSemanticIntentLead(intent: IntentDefinition): string | null {
  return buildEnhancedIntentLead(intent);
}
