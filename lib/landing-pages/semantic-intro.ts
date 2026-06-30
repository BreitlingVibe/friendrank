import type { IntentDefinition } from "@/lib/landing-pages/planning/intent-registry";

function formatIntentHook(intent: IntentDefinition): string {
  const titleLower = intent.title.toLowerCase();
  const audienceLead = intent.audience.split(",")[0]?.trim().toLowerCase();

  if (/questions?$/i.test(intent.title)) {
    return `${titleLower} you can turn into a live voting game`;
  }

  if (audienceLead) {
    return `a quick ${titleLower} for ${audienceLead}`;
  }

  return `a quick ${titleLower}`;
}

/** Intent-specific hero lead driven by registry audience and search intent. */
export function buildSemanticHeroSubtitle(
  intent: IntentDefinition,
  fallback: string,
): string {
  const hook = formatIntentHook(intent);
  const audienceSnippet =
    intent.audience.split(",")[0]?.trim() ?? "your group";

  return `Looking for ${hook}? FriendRank helps ${audienceSnippet.toLowerCase()} vote anonymously from their phones and reveal funny group results in minutes.`;
}

/** Optional lead shown above the intent summary when it adds context. */
export function buildSemanticIntentLead(intent: IntentDefinition): string | null {
  const firstSentence = intent.searchIntent.split(".")[0]?.trim();
  if (!firstSentence || firstSentence.length < 24) {
    return null;
  }

  return `${firstSentence}.`;
}
