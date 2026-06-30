import type { LandingPageFaqItem } from "@/lib/landing-pages/landing-page-types";
import {
  INTENT_CATEGORIES,
  type IntentCategory,
} from "@/lib/landing-pages/planning/intent-categories";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";

const TARGET_MAX_FAQ = 12;
const TARGET_MIN_FAQ = 10;

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

/** Merges page FAQs with shared supplemental items up to 10–12 total. */
export function enrichLandingPageFaq(
  slug: string,
  baseFaq: LandingPageFaqItem[],
): LandingPageFaqItem[] {
  const intent = getIntentBySlug(slug);
  const extras: LandingPageFaqItem[] = [...UNIVERSAL_SUPPLEMENTAL_FAQ];

  if (intent?.intentCategory) {
    extras.push(...(CATEGORY_SUPPLEMENTAL_FAQ[intent.intentCategory] ?? []));
  }

  if (getClustersBySlug(slug).some((cluster) => cluster.id === "questions")) {
    extras.push(...QUESTIONS_CLUSTER_FAQ);
  }

  const seen = new Set(baseFaq.map((item) => item.question.toLowerCase()));
  const merged = [...baseFaq];

  for (const item of extras) {
    if (merged.length >= TARGET_MAX_FAQ) {
      break;
    }

    const key = item.question.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    merged.push(item);
    seen.add(key);
  }

  if (merged.length < TARGET_MIN_FAQ) {
    return merged;
  }

  return merged.slice(0, TARGET_MAX_FAQ);
}
