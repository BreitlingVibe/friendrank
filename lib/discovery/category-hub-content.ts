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
      "Coworker games are short, low-stakes group activities built for people who share a workplace. They are prompts and voting rounds that help colleagues learn something about each other without forced small talk or trust-fall energy.",
      "The format that works best is simple: one person hosts, everyone joins from their phone, votes anonymously on light questions, and the group reveals results together. That rhythm fits a standup, a Monday sync, or the first ten minutes of an offsite workshop without eating the whole agenda.",
      "Use them when the group needs a reset — new people in the room, a team that has been heads-down for weeks, or a Friday afternoon when energy is low and you want one shared laugh before the weekend.",
    ],
    useCases: {
      title: "When to use coworker games",
      items: [
        {
          title: "Meetings",
          description:
            "A two-minute warmup before slides gives quieter coworkers a low-pressure way to contribute and helps managers shift tone before harder topics — without turning the meeting into a long activity block.",
        },
        {
          title: "Onboarding",
          description:
            "New hires rarely want performative icebreakers, but they do want to learn names and personalities quickly. Light voting rounds on workplace roles give new people something concrete to talk about without putting anyone on the spot.",
        },
        {
          title: "Remote and hybrid teams",
          description:
            "When everyone is on a video call — or half the room is in person and half is on a screen — phone-based voting levels the field. Everyone participates the same way, results appear for the whole group, and the activity finishes in a few minutes.",
        },
        {
          title: "Workshops",
          description:
            "Facilitators often open with an activity to get people moving and talking. Coworker games scale from five people to fifty, need minimal setup, and produce shared results you can reference later in the session.",
        },
        {
          title: "Team bonding",
          description:
            "Bonding does not have to mean expensive retreats. A Friday social, team lunch, or virtual happy hour where coworkers vote on end-of-week titles works because the reactions — surprise, agreement, friendly debate — do the heavy lifting.",
        },
      ],
    },
    benefits: {
      title: "Why FriendRank works for teams",
      items: [
        {
          title: "Runs in the browser",
          description:
            "No app store, no IT approval loop, and no account required for participants. Teammates join from any phone with one link.",
        },
        {
          title: "One link for the whole group",
          description:
            "The host creates a game, shares the link in Slack, Teams, or meeting chat, and everyone votes before results unlock together on the call or in the room.",
        },
        {
          title: "Anonymous voting, shared reveal",
          description:
            "Coworkers vote privately from their phones, then the group sees results at the same time — enough structure for workplace settings without putting anyone on the spot.",
        },
        {
          title: "Free for team use",
          description:
            "Create a coworker game at no cost, run anonymous voting with shared results, and skip per-player fees or signup friction for your team.",
        },
      ],
    },
    exploreGamesTitle: "Explore coworker games",
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
  couples: {
    heroTitle: "Couples Games",
    metaTitle: "Couples Games for Date Nights and Fun Questions | FriendRank",
    metaDescription:
      "Explore free browser games, quizzes, and voting prompts for couples. Play on date nights, long-distance calls, or with friends — no app download required.",
    schemaDescription:
      "Free browser couples games with quizzes and voting prompts for date nights, long-distance couples, anniversaries, and playful conversations — not relationship diagnosis.",
    introduction: [
      "Couples games are light, playful activities where partners — or couples playing with friends — vote on prompts, answer questions, and reveal results together. They are meant to spark conversation and laughter, not to score your relationship or deliver clinical advice.",
      "FriendRank runs entirely in the browser: one person creates a game, shares a link, and everyone joins from their phone. Votes can stay private until the group reveal, so the focus stays on the shared moment rather than who picked what.",
      "Whether you are planning a date night, on a long-distance video call, or hanging out with another couple, couples games give you something quick to do together without downloading another app or creating accounts.",
    ],
    useCases: {
      title: "When to use couples games",
      items: [
        {
          title: "Date nights",
          description:
            "Replace scrolling with a short voting round before dinner or after dessert. Light prompts give you something to react to together without turning the evening into a structured quiz night.",
        },
        {
          title: "Long-distance calls",
          description:
            "When you are on FaceTime or Zoom, a shared game link gives you more to talk about than the usual catch-up. Everyone votes from their own phone and sees results unlock together on the call.",
        },
        {
          title: "New couples",
          description:
            "Early dating can feel awkward when conversation stalls. Playful prompts and voting rounds help you learn little things about each other without forcing heavy confessions.",
        },
        {
          title: "Married couples",
          description:
            "Long-term partners use couples games as a quick reset — a few minutes of humor and surprise before getting back to the rest of the evening.",
        },
        {
          title: "Double dates",
          description:
            "Two couples can join the same game and vote on group prompts. Phone-based play keeps everyone involved, including quieter guests who might not jump into open conversation right away.",
        },
        {
          title: "Anniversaries and special occasions",
          description:
            "Mark a milestone with a custom voting game instead of a generic card. Shared results become a small memory from the night, not a compatibility score.",
        },
      ],
    },
    benefits: {
      title: "Why FriendRank works for couples",
      items: [
        {
          title: "Runs in the browser",
          description:
            "No app store visit and no account required for players. Open the link on any phone and start voting in minutes.",
        },
        {
          title: "One link for both partners",
          description:
            "The host creates a game once and shares a single URL — perfect for date tables, text threads, or video-call chat.",
        },
        {
          title: "Private votes, shared reveal",
          description:
            "Partners vote from their phones without everyone seeing individual picks, then results appear together when the group is ready.",
        },
        {
          title: "Free to start",
          description:
            "Create a couples game at no cost, invite your partner or group, and reveal results together — no subscription or per-player fee.",
        },
      ],
    },
    exploreGamesTitle: "Explore couples games",
    faq: [
      {
        question: "What are couples games?",
        answer:
          "Couples games are short browser activities where partners vote on prompts or answer light questions together and reveal results as a group. They are meant to be playful and conversational, not a test of your relationship.",
      },
      {
        question: "Can two people play FriendRank?",
        answer:
          "Yes. Many couples games work with two players, and you can also invite friends or another couple to join the same game through one shared link.",
      },
      {
        question: "Do couples need to download an app?",
        answer:
          "No. FriendRank runs in the browser. Share one link and both partners vote from their phones — no app store and no signup required for players.",
      },
      {
        question: "Can long-distance couples play together?",
        answer:
          "Yes. Send the game link in your chat or open it together on a video call. Everyone votes from their own device and sees results unlock at the same time.",
      },
      {
        question: "Are votes private or anonymous?",
        answer:
          "Votes are private on each phone until the group reveal. Individual ballots are not shown to the room — only the combined results appear together.",
      },
      {
        question: "How long does a game take?",
        answer:
          "Most couples finish in five to fifteen minutes: a minute to join, a few minutes to vote, and a short reveal together. You can keep it brief for a date-night opener or run another round if the mood is right.",
      },
      {
        question: "Are the results serious or just for fun?",
        answer:
          "Just for fun. FriendRank does not measure compatibility, diagnose relationships, or provide psychological assessments. Results are playful titles and conversation starters.",
      },
      {
        question: "Is FriendRank free for couples?",
        answer:
          "Yes. You can create a game for free, share the link with your partner or group, and play without a subscription or per-player fee.",
      },
    ],
    ctaLabel: "Create a couples game",
    ctaAriaLabel: "Create a free couples game on FriendRank",
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
