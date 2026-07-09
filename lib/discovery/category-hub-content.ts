import type { CategoryHubContent } from "@/lib/discovery/types";

/**
 * Minimal page copy for category hubs. SEO copy ships in later sprints.
 * Keys must match live category slugs in CATEGORY_REGISTRY.
 */
export const CATEGORY_HUB_CONTENT: Record<string, CategoryHubContent> = {
  "best-friends": {
    introduction: [
      "Best friend games work when the group already has history — inside jokes, rivalries, and opinions about who would actually win each title.",
      "FriendRank fits this category well: one host creates a game, everyone votes from their phone, and the group unlocks shared results.",
    ],
    faq: [
      {
        question: "What counts as a best friend game?",
        answer:
          "Any group activity where close friends vote on roles, answer prompts, or compare opinions together — especially when results are funny or debate-starting.",
      },
      {
        question: "Do best friends need to download an app?",
        answer:
          "No. FriendRank runs in the browser. The host shares one link and friends join from their phones.",
      },
    ],
    ctaLabel: "Create a best friend game",
    ctaAriaLabel: "Create a free best friend game on FriendRank",
  },
};

export function getCategoryHubContent(slug: string): CategoryHubContent {
  return (
    CATEGORY_HUB_CONTENT[slug] ?? {
      introduction: [
        "Category hub content is not configured yet. Add copy to CATEGORY_HUB_CONTENT.",
      ],
      faq: [],
      ctaLabel: "Create a free game",
    }
  );
}
