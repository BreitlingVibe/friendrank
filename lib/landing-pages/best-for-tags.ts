import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import { getTopicHubIdsForSlug } from "@/lib/landing-pages/recommendation-utils";

export type BestForTagId =
  | "friends"
  | "couples"
  | "teams"
  | "parties"
  | "icebreakers"
  | "large-groups"
  | "small-groups"
  | "remote-play"
  | "mobile-play"
  | "no-signup"
  | "quick-game"
  | "funny-questions"
  | "deep-questions";

export type BestForTag = {
  id: BestForTagId;
  label: string;
};

const TAG_LABELS: Record<BestForTagId, string> = {
  friends: "Friends",
  couples: "Couples",
  teams: "Teams",
  parties: "Parties",
  icebreakers: "Icebreakers",
  "large-groups": "Large groups",
  "small-groups": "Small groups",
  "remote-play": "Remote play",
  "mobile-play": "Mobile play",
  "no-signup": "No signup",
  "quick-game": "Quick game",
  "funny-questions": "Funny questions",
  "deep-questions": "Deep questions",
};

const MIN_TAGS = 4;
const MAX_TAGS = 7;

function scoreFromText(text: string, patterns: [RegExp, number][]): number {
  const lower = text.toLowerCase();
  return patterns.reduce(
    (sum, [pattern, weight]) => (pattern.test(lower) ? sum + weight : sum),
    0,
  );
}

/** Registry-driven Best For tags from intent, audience, hub, and cluster signals. */
export function getBestForTags(slug: string): BestForTag[] {
  const intent = getIntentBySlug(slug);
  if (!intent) {
    return [
      { id: "mobile-play", label: TAG_LABELS["mobile-play"] },
      { id: "no-signup", label: TAG_LABELS["no-signup"] },
      { id: "quick-game", label: TAG_LABELS["quick-game"] },
      { id: "friends", label: TAG_LABELS.friends },
    ];
  }

  const scores = new Map<BestForTagId, number>();
  const audience = intent.audience;
  const searchIntent = intent.searchIntent;
  const title = intent.title;
  const combined = `${audience} ${searchIntent} ${title}`;

  const categoryBoosts: Record<
    string,
    Partial<Record<BestForTagId, number>>
  > = {
    [INTENT_CATEGORIES.FRIENDSHIP]: { friends: 8, "funny-questions": 4 },
    [INTENT_CATEGORIES.RELATIONSHIPS]: { couples: 10, "deep-questions": 5 },
    [INTENT_CATEGORIES.TEAMS]: { teams: 10, icebreakers: 4 },
    [INTENT_CATEGORIES.PARTY]: { parties: 10, "funny-questions": 5 },
    [INTENT_CATEGORIES.ICEBREAKERS]: {
      icebreakers: 10,
      teams: 4,
      friends: 3,
    },
    [INTENT_CATEGORIES.SOCIAL_VOTING]: { friends: 6, "large-groups": 5 },
    [INTENT_CATEGORIES.ENTERTAINMENT]: { friends: 5, parties: 4 },
  };

  const boosts = categoryBoosts[intent.intentCategory];
  if (boosts) {
    for (const [tagId, weight] of Object.entries(boosts)) {
      const id = tagId as BestForTagId;
      scores.set(id, (scores.get(id) ?? 0) + (weight ?? 0));
    }
  }

  scores.set(
    "large-groups",
    (scores.get("large-groups") ?? 0) +
      scoreFromText(combined, [
        [/large group|big group|crowd|reunion|conference|classroom|party guests/i, 6],
        [/games-for-large-groups/i, 8],
      ]),
  );

  scores.set(
    "small-groups",
    (scores.get("small-groups") ?? 0) +
      scoreFromText(combined, [
        [/small group|trio|foursome|couple|double date|roommate|close friend/i, 6],
        [/games-for-small-groups/i, 8],
      ]),
  );

  scores.set(
    "remote-play",
    (scores.get("remote-play") ?? 0) +
      scoreFromText(combined, [
        [/remote|virtual|distributed|video call|zoom|slack|long distance|ldr/i, 8],
      ]),
  );

  scores.set(
    "funny-questions",
    (scores.get("funny-questions") ?? 0) +
      scoreFromText(combined, [
        [/funny|most likely|party|sleepover|drinking|chaos|meme/i, 4],
        [/questions/i, 2],
      ]),
  );

  scores.set(
    "deep-questions",
    (scores.get("deep-questions") ?? 0) +
      scoreFromText(combined, [
        [/deep|romantic|relationship|couple|conversation starter|wholesome/i, 5],
        [/questions/i, 2],
      ]),
  );

  scores.set("mobile-play", (scores.get("mobile-play") ?? 0) + 3);
  scores.set("no-signup", (scores.get("no-signup") ?? 0) + 3);
  scores.set("quick-game", (scores.get("quick-game") ?? 0) + 4);

  for (const hubId of getTopicHubIdsForSlug(slug)) {
    if (hubId === "friend-games") {
      scores.set("friends", (scores.get("friends") ?? 0) + 3);
    }
    if (hubId === "party-games") {
      scores.set("parties", (scores.get("parties") ?? 0) + 3);
    }
    if (hubId === "team-building-games") {
      scores.set("teams", (scores.get("teams") ?? 0) + 3);
    }
    if (hubId === "relationship-games") {
      scores.set("couples", (scores.get("couples") ?? 0) + 3);
    }
    if (hubId === "icebreaker-games") {
      scores.set("icebreakers", (scores.get("icebreakers") ?? 0) + 3);
    }
    if (hubId === "question-games") {
      scores.set("funny-questions", (scores.get("funny-questions") ?? 0) + 2);
    }
  }

  for (const cluster of getClustersBySlug(slug)) {
    if (cluster.id === "questions") {
      scores.set("funny-questions", (scores.get("funny-questions") ?? 0) + 4);
    }
    if (cluster.id === "audience") {
      scores.set("quick-game", (scores.get("quick-game") ?? 0) + 2);
    }
  }

  const ranked = [...scores.entries()]
    .filter(([, score]) => score > 0)
    .sort((entryA, entryB) => entryB[1] - entryA[1])
    .map(([id]) => id);

  const selected = ranked.slice(0, MAX_TAGS);

  while (selected.length < MIN_TAGS) {
    for (const fallback of [
      "quick-game",
      "mobile-play",
      "no-signup",
      "friends",
    ] as BestForTagId[]) {
      if (!selected.includes(fallback)) {
        selected.push(fallback);
      }
      if (selected.length >= MIN_TAGS) {
        break;
      }
    }
    break;
  }

  return selected.map((id) => ({ id, label: TAG_LABELS[id] }));
}

export const BEST_FOR_SECTION_TITLE = "Best for";
