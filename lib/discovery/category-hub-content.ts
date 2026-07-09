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
  coworkers: {
    metaTitle: "Coworker Games – Free Online Team Games for Work | FriendRank",
    metaDescription:
      "Browser coworker games for meetings, remote teams, and workshops. Create a free voting game, share one link, and let your team play from their phones.",
    schemaDescription:
      "Free browser coworker games with anonymous voting for meetings, remote teams, hybrid groups, onboarding, workshops, and team bonding.",
    introduction: [
      "Coworker games are short, low-stakes group activities built for people who share a workplace. They are not party games with college inside jokes — they are prompts and voting rounds that help colleagues learn something about each other without forced small talk or trust-fall energy.",
      "The format that works best is simple: one person hosts, everyone joins from their phone, votes anonymously on light questions, and the group reveals results together. That rhythm fits a standup, a Monday team sync, or the first ten minutes of an offsite workshop without eating the whole agenda.",
      "The point is not to turn every meeting into a game show. Coworker games are for moments when the group needs a reset — new people in the room, a team that has been heads-down for weeks, or a Friday afternoon when energy is low and you want one shared laugh before the weekend.",
      "Remote teams use them differently than in-office groups, but the need is the same. When everyone is on a video call in different cities, you lose the hallway conversations that build trust over time. A browser game with one shared link gives distributed teammates something to react to at the same time, without asking anyone to download another app or create an account.",
      "Hybrid teams sit in the middle, and that is often the hardest setup. Half the room is in person, half is on a screen, and remote colleagues can feel like spectators in their own meeting. Phone-based voting levels the field: everyone participates the same way, results appear for the whole group, and the activity finishes in a few minutes so you can get back to work.",
      "Onboarding is one of the strongest use cases. New hires rarely want performative icebreakers, but they do want to learn names and personalities quickly. A short voting round on workplace roles — who is most likely to fix the Wi-Fi, who remembers every deadline — gives new people something concrete to talk about with teammates without putting anyone on the spot.",
      "Meetings benefit from a two-minute warmup before diving into slides. Not every agenda needs an icebreaker, but recurring syncs can feel repetitive when the same people talk and others stay quiet. A quick game at the start gives quieter coworkers a low-pressure way to contribute and gives managers a neutral way to shift tone before a harder conversation.",
      "Workshops and offsites have more room to breathe, but they still need structure. Facilitators often open with an activity to get people moving and talking. Coworker games fit that slot because they scale from five people to fifty, need minimal setup, and produce shared results you can reference later in the session.",
      "Team bonding does not have to mean expensive retreats or elaborate schedules. It can be a Friday social, a team lunch, or a virtual happy hour where coworkers vote on end-of-week titles and argue about the results. The bonding happens in the reactions — the surprise, the agreement, the friendly debate — not in complicated game mechanics.",
      "FriendRank is built for this kind of moment. Create a game in the browser, add your team, share one link, and let coworkers vote from their phones. Results unlock together, whether you are in a conference room or on Zoom. No signup required, no app store, and no friction between deciding to do something fun and actually doing it.",
    ],
    faq: [
      {
        question: "What are coworker games?",
        answer:
          "Coworker games are short group activities where colleagues vote on light workplace prompts from their phones and reveal results together. They work for icebreakers, team bonding, and meeting warmups without long setup or forced conversation.",
      },
      {
        question: "Do coworkers need to download an app?",
        answer:
          "No. FriendRank runs entirely in the browser. The host creates a game, shares one link, and teammates join and vote from any phone — no app store, no account required.",
      },
      {
        question: "Can remote and in-office teammates play together?",
        answer:
          "Yes. Share the game link in your meeting chat, Slack, or Teams channel. Everyone votes from their own device, so hybrid groups participate on equal footing whether they are in the room or on a video call.",
      },
      {
        question: "How long does a typical coworker game take?",
        answer:
          "Most teams finish in five to ten minutes: a minute to join, a few minutes to vote, and a short reveal together. That makes coworker games easy to slot into standups, meeting openers, or workshop intros.",
      },
      {
        question: "Are coworker games appropriate for onboarding?",
        answer:
          "They work well when the prompts stay light and inclusive. Voting rounds on workplace roles or team habits help new hires learn names and personalities without putting anyone on the spot for a personal story.",
      },
      {
        question: "Can managers use coworker games in formal meetings?",
        answer:
          "Yes, when used briefly and intentionally. A two-minute warmup before a recurring sync can help quieter teammates contribute and reset the room before heavier topics — without turning the meeting into a long activity block.",
      },
      {
        question: "What kinds of questions work best for workplace groups?",
        answer:
          "Light, positive prompts work best: most likely to roles, team habits, and workplace scenarios everyone can relate to. Avoid sensitive topics, performance reviews, or anything that could embarrass a colleague.",
      },
      {
        question: "Is FriendRank free for team use?",
        answer:
          "Yes. You can create a coworker game for free, share the link with your team, and run anonymous voting with shared results. There is no per-player fee and no signup required for participants.",
      },
    ],
    ctaLabel: "Create a coworker game",
    ctaAriaLabel: "Create a free coworker game on FriendRank",
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
