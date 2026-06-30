export type TrustSignal = {
  title: string;
  description?: string;
};

/** Short trust bullets shown beneath the landing page hero CTA. */
export const HERO_TRUST_SIGNALS: readonly TrustSignal[] = [
  { title: "No signup required" },
  { title: "Free to use" },
  { title: "Anonymous voting" },
  { title: "Works on every phone" },
] as const;

/** Shared trust section items for landing pages. */
export const TRUST_SECTION_ITEMS: readonly TrustSignal[] = [
  {
    title: "Browser-based",
    description:
      "FriendRank runs in any modern browser on phones, tablets, and laptops.",
  },
  {
    title: "No app download",
    description:
      "Share one link and let your group vote without installing anything.",
  },
  {
    title: "Anonymous voting",
    description:
      "Votes stay private to each person. The group only sees shared results.",
  },
  {
    title: "Works on mobile",
    description:
      "Built for group chats, parties, and hangouts where everyone has a phone.",
  },
  {
    title: "Free to use",
    description:
      "Create games, invite your group, and reveal results at no cost.",
  },
  {
    title: "Share with one link",
    description:
      "Send the same game link in WhatsApp, iMessage, Discord, Slack, or email.",
  },
] as const;

export const TRUST_SECTION_TITLE = "Why groups trust FriendRank";

export const AUTHORITY_FOOTER_DESCRIPTION =
  "FriendRank helps friends, teams, couples, and groups create anonymous voting games, quizzes, and question games directly in the browser.";
