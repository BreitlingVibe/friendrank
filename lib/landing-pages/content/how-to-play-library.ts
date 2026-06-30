import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import type { IntentDefinition } from "@/lib/landing-pages/planning/intent-registry";

export type HowToPlayStep = {
  title: string;
  description: string;
};

export type HowToPlayContent = {
  title: string;
  steps: HowToPlayStep[];
};

function getGroupContext(intent: IntentDefinition): string {
  switch (intent.intentCategory) {
    case INTENT_CATEGORIES.TEAMS:
      return "team";
    case INTENT_CATEGORIES.RELATIONSHIPS:
      return "couple or group";
    case INTENT_CATEGORIES.PARTY:
      return "party group";
    case INTENT_CATEGORIES.ICEBREAKERS:
      return "group";
    default:
      return "friend group";
  }
}

function getShareContext(intent: IntentDefinition): string {
  const text = `${intent.audience} ${intent.searchIntent}`.toLowerCase();
  if (/remote|virtual|video call|slack|zoom|distributed/i.test(text)) {
    return "meeting chat or video call";
  }
  if (/classroom|student|teacher/i.test(text)) {
    return "class chat";
  }
  if (/office|work|coworker|team/i.test(text)) {
    return "Slack, Teams, or email";
  }
  return "group chat";
}

/** Reusable how-to-play steps with light intent-aware wording. */
export function resolveHowToPlay(intent: IntentDefinition): HowToPlayContent {
  const group = getGroupContext(intent);
  const shareTarget = getShareContext(intent);

  return {
    title: "How to play",
    steps: [
      {
        title: "Create your FriendRank game",
        description: `Add names, pick a tone, and choose prompts that fit your ${group}.`,
      },
      {
        title: "Share one link with your group",
        description: `Send the game link in ${shareTarget}. Everyone opens it on their phone.`,
      },
      {
        title: "Vote anonymously and reveal the results",
        description:
          "Each person votes privately. When enough votes are in, results unlock on the same link for everyone.",
      },
    ],
  };
}
