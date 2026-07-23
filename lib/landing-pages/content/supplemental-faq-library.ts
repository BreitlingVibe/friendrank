import type { LandingPageFaqItem } from "@/lib/landing-pages/landing-page-types";
import {
  INTENT_CATEGORIES,
  type IntentCategory,
} from "@/lib/landing-pages/planning/intent-categories";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";

/** Soft floor: only then inject universal fallbacks. */
const TARGET_MIN_FAQ = 6;
/** Hard cap for enriched FAQ sections. */
const TARGET_MAX_FAQ = 10;

/**
 * Lightweight topic keys for near-duplicate detection.
 * Not NLP — keyword buckets that catch common FAQ overlaps.
 */
type FaqTopic =
  | "setup_time"
  | "mobile_compat"
  | "no_app"
  | "privacy_votes"
  | "accounts"
  | "customize"
  | "player_count"
  | "results_timing"
  | "group_chat"
  | "work_suitable"
  | "remote_play"
  | "replay"
  | "live_from_prompts"
  | "party_fit"
  | "icebreaker_fit"
  | "relationship_fit"
  | "friendship_fit"
  | "poll_vs_game";

const UNIVERSAL_SUPPLEMENTAL_FAQ: LandingPageFaqItem[] = [
  {
    question: "How long does a FriendRank game take to set up?",
    answer:
      "Most groups create a game in under a minute. Share the link and start voting right away.",
  },
  {
    question: "Can we play on iPhone and Android?",
    answer:
      "Yes. FriendRank works in mobile browsers on iPhone, Android, and tablets.",
  },
  {
    question: "Do we need to download an app?",
    answer:
      "No. FriendRank runs in the browser. Share one link and play from any phone.",
  },
  {
    question: "Can the host see individual votes?",
    answer:
      "No. Votes stay private to each person. The group only sees shared winners and results.",
  },
];

const CATEGORY_SUPPLEMENTAL_FAQ: Partial<
  Record<IntentCategory, LandingPageFaqItem[]>
> = {
  [INTENT_CATEGORIES.PARTY]: [
    {
      question: "Is this good for parties with mixed friend groups?",
      answer:
        "Yes. Add names, share one link, and let guests vote from their phones without a complicated setup.",
    },
    {
      question: "Can we play at the start of a party?",
      answer:
        "Yes. Create the game when guests arrive and reveal results together in the room or group chat.",
    },
  ],
  [INTENT_CATEGORIES.TEAMS]: [
    {
      question: "Is this appropriate for work meetings?",
      answer:
        "Yes. Keep prompts light, share the link at the start of a meeting, and reveal results in a few minutes.",
    },
    {
      question: "Can remote coworkers play together?",
      answer:
        "Yes. Paste the link in Slack, Teams, or the video call chat and vote before the agenda continues.",
    },
  ],
  [INTENT_CATEGORIES.RELATIONSHIPS]: [
    {
      question: "Can couples play without making it awkward?",
      answer:
        "Yes. Pick playful prompts, vote anonymously, and reveal results together on a date or video call.",
    },
    {
      question: "Does this work for double dates or small groups?",
      answer:
        "Yes. Add everyone playing, share one link, and reveal results together at the table.",
    },
  ],
  [INTENT_CATEGORIES.ICEBREAKERS]: [
    {
      question: "How fast can a new group finish an icebreaker?",
      answer:
        "Most groups finish voting in five minutes. It works well before meetings, classes, or events.",
    },
    {
      question: "Does this work when people do not know each other yet?",
      answer:
        "Yes. Anonymous voting keeps it low pressure while still giving the group a shared result.",
    },
  ],
  [INTENT_CATEGORIES.FRIENDSHIP]: [
    {
      question: "Is this better than a solo friendship quiz?",
      answer:
        "FriendRank is social. The whole group votes on roles together and unlocks shared results.",
    },
    {
      question: "Can we use it in a group chat?",
      answer:
        "Yes. Share the link in WhatsApp, iMessage, Discord, or any chat app your friends already use.",
    },
  ],
  [INTENT_CATEGORIES.ENTERTAINMENT]: [
    {
      question: "Can we reuse the same game format later?",
      answer:
        "Yes. Create a new game anytime with fresh names, prompts, and results for the same group.",
    },
    {
      question: "Is this good for casual game nights?",
      answer:
        "Yes. It starts quickly on phones and does not require boards, cards, or downloads.",
    },
  ],
  [INTENT_CATEGORIES.SOCIAL_VOTING]: [
    {
      question: "What makes FriendRank different from a group poll?",
      answer:
        "FriendRank turns voting into a game with ranked winners, role-style results, and a shareable group story.",
    },
    {
      question: "Can a large group vote from their phones?",
      answer:
        "Yes. Share one link and let everyone vote in the browser without exposing individual ballots.",
    },
  ],
};

const QUESTIONS_CLUSTER_FAQ: LandingPageFaqItem[] = [
  {
    question: "Can I turn these prompts into a live voting game?",
    answer:
      "Yes. FriendRank turns question prompts into anonymous group voting with reveal-ready results.",
  },
  {
    question: "Can we mix custom prompts with examples?",
    answer:
      "Yes. Enter up to three custom prompts when you create the game and use example questions for inspiration.",
  },
];

/** Maps a FAQ question to coarse topic buckets for near-duplicate skipping. */
export function getFaqTopics(question: string): Set<FaqTopic> {
  const q = question.toLowerCase();
  const topics = new Set<FaqTopic>();

  if (
    /how long|set\s*up|setup|under a minute|how fast|take to (set|create|start)/.test(
      q,
    )
  ) {
    topics.add("setup_time");
  }
  if (
    /download|install|\bapp\b/.test(q) &&
    /need|require|without|no |do we|does/.test(q)
  ) {
    topics.add("no_app");
  }
  if (
    /iphone|android|mobile|tablet|works on (any )?phone|play on (phones|mobile)/.test(
      q,
    )
  ) {
    topics.add("mobile_compat");
  }
  if (
    /anonymous|private (ballot|vote)|host see|who voted|individual votes|see who voted|ballots?/.test(
      q,
    )
  ) {
    topics.add("privacy_votes");
  }
  if (/account|sign[\s-]?up|sign in|log ?in|password/.test(q)) {
    topics.add("accounts");
  }
  if (/custom(ize|ise)?|own (questions|prompts)|add (my |custom )?/.test(q)) {
    topics.add("customize");
  }
  if (/how many (people|friends|players)|player limit|join/.test(q)) {
    topics.add("player_count");
  }
  if (/when (do|are) results|results (unlock|show|reveal)|revealed/.test(q)) {
    topics.add("results_timing");
  }
  if (/group chat|whatsapp|imessage|discord|slack|teams/.test(q)) {
    topics.add("group_chat");
  }
  if (/work meeting|workplace|appropriate for work|office/.test(q)) {
    topics.add("work_suitable");
  }
  if (/remote (coworker|team|play)|video call/.test(q)) {
    topics.add("remote_play");
  }
  if (/reuse|replay|multiple rounds|again later|new game anytime/.test(q)) {
    topics.add("replay");
  }
  if (/live voting game|turn these prompts|prompts into/.test(q)) {
    topics.add("live_from_prompts");
  }
  if (/good for part(y|ies)|start of a party|mixed friend groups/.test(q)) {
    topics.add("party_fit");
  }
  if (/icebreaker|do not know each other|new group finish/.test(q)) {
    topics.add("icebreaker_fit");
  }
  if (/couples play|double dates|awkward/.test(q) && /date|couple/.test(q)) {
    topics.add("relationship_fit");
  }
  if (/solo friendship quiz|better than a solo/.test(q)) {
    topics.add("friendship_fit");
  }
  if (/group poll|different from a (group )?poll/.test(q)) {
    topics.add("poll_vs_game");
  }

  return topics;
}

function questionKey(question: string): string {
  return question.toLowerCase().trim();
}

function topicsCovered(items: LandingPageFaqItem[]): Set<FaqTopic> {
  const covered = new Set<FaqTopic>();
  for (const item of items) {
    for (const topic of getFaqTopics(item.question)) {
      covered.add(topic);
    }
  }
  return covered;
}

function overlapsCoveredTopics(
  candidate: LandingPageFaqItem,
  covered: Set<FaqTopic>,
): boolean {
  const topics = getFaqTopics(candidate.question);
  if (topics.size === 0) {
    return false;
  }
  for (const topic of topics) {
    if (covered.has(topic)) {
      return true;
    }
  }
  return false;
}

function appendUniqueFaqs(
  merged: LandingPageFaqItem[],
  seen: Set<string>,
  covered: Set<FaqTopic>,
  candidates: LandingPageFaqItem[],
  max: number,
): void {
  for (const item of candidates) {
    if (merged.length >= max) {
      break;
    }

    const key = questionKey(item.question);
    if (seen.has(key)) {
      continue;
    }
    if (overlapsCoveredTopics(item, covered)) {
      continue;
    }

    merged.push(item);
    seen.add(key);
    for (const topic of getFaqTopics(item.question)) {
      covered.add(topic);
    }
  }
}

/**
 * Merges page FAQs with category/cluster supplements, then universal fallbacks.
 *
 * Priority: page-specific → category/cluster (intent gaps) → universal (only if under min).
 * Caps at {@link TARGET_MAX_FAQ}. Skips exact and lightweight semantic near-duplicates.
 */
export function enrichLandingPageFaq(
  slug: string,
  baseFaq: LandingPageFaqItem[],
): LandingPageFaqItem[] {
  const intent = getIntentBySlug(slug);
  const seen = new Set<string>();
  const merged: LandingPageFaqItem[] = [];

  for (const item of baseFaq) {
    const key = questionKey(item.question);
    if (seen.has(key)) {
      continue;
    }
    merged.push(item);
    seen.add(key);
  }

  const covered = topicsCovered(merged);

  const categoryExtras =
    (intent?.intentCategory
      ? CATEGORY_SUPPLEMENTAL_FAQ[intent.intentCategory]
      : undefined) ?? [];

  appendUniqueFaqs(merged, seen, covered, categoryExtras, TARGET_MAX_FAQ);

  if (getClustersBySlug(slug).some((cluster) => cluster.id === "questions")) {
    appendUniqueFaqs(merged, seen, covered, QUESTIONS_CLUSTER_FAQ, TARGET_MAX_FAQ);
  }

  if (merged.length < TARGET_MIN_FAQ) {
    appendUniqueFaqs(
      merged,
      seen,
      covered,
      UNIVERSAL_SUPPLEMENTAL_FAQ,
      TARGET_MAX_FAQ,
    );
  }

  return merged.slice(0, TARGET_MAX_FAQ);
}

/** Exported for audits and tests. */
export const FAQ_ENRICHMENT_LIMITS = {
  min: TARGET_MIN_FAQ,
  max: TARGET_MAX_FAQ,
} as const;
