import { CUSTOM_CATEGORY_PLACEHOLDERS } from "@/lib/game-build";
import type { LandingPageFaqItem } from "@/lib/landing-pages/landing-page-types";
import type { LandingPageCta } from "@/lib/landing-pages/landing-page-types";
import type { LandingPageGamePreset } from "@/lib/landing-pages/landing-page-types";
import { CREATE_GAME_HREF } from "@/lib/landing-pages/content/cta-library";
import { INTENT_VERSION } from "@/lib/landing-pages/content/version";
import { AUDIENCE_VERSION } from "@/lib/landing-pages/content/version";
import { FAQ_VERSION } from "@/lib/landing-pages/content/version";
import { QUESTION_VERSION } from "@/lib/landing-pages/content/version";
import { CTA_VERSION } from "@/lib/landing-pages/content/version";

/** Audience authority landing page definitions — Phase 7G Sprint 1. */

/** @see INTENT_VERSION */
export const GAMES_FOR_LARGE_GROUPS_INTENT = {
  slug: "games-for-large-groups",
  title: "Games for Large Groups",
  metaTitle: "Games for Large Groups | Browser Voting Game | FriendRank",
  metaDescription:
    "Create games for large groups on FriendRank. Share one link, vote anonymously from phones, and reveal funny group results together.",
  h1: "Games for Large Groups",
  intentSummaryTitle: "What are games for large groups?",
  intentSummary:
    "Games for large groups need to work when not everyone knows each other and phones are the easiest screen in the room. FriendRank turns that into a browser voting game: add names, share one link, and let everyone vote anonymously. Results unlock together so the whole crowd gets a shared moment without an app download or signup.",
  whyFriendRankTitle: "Why FriendRank works for large groups",
  exampleQuestionsTitle: "Popular large group game questions",
  faqTitle: "Games for large groups FAQ",
  schemaDescription:
    "Create games for large groups with FriendRank. Share one link, vote anonymously on phones, and reveal funny group results. No signup required.",
  ctaLocation: "landing_games_for_large_groups" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who brings the best group energy",
      "Who would host the afterparty",
      "Who is most likely to start the group chat",
    ],
    suggestedVibeTags: ["Party", "College", "Family"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_LARGE_GROUPS_AUDIENCE = {
  heroSubtitle:
    "Run a quick voting game when the group is big. Add friends, share one link, vote anonymously, and reveal results everyone can see together.",
  playImmediatelyBody:
    "Create a game on FriendRank before the event or when the room fills up. Share the link in the group chat or on a screen and let everyone vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are large group questions your crowd can vote on.",
  finalCtaTitle: "Start your large group game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the room gets loud.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_LARGE_GROUPS_PRIMARY_CTA: LandingPageCta = {
  label: "Create Large Group Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_LARGE_GROUPS_QUESTIONS = [
  { text: "Who is most likely to talk to everyone at the party?" },
  { text: "Who would organize the group photo?" },
  { text: "Who is most likely to arrive with the loudest entrance?" },
  { text: "Who would remember every name by the end of the night?" },
  { text: "Who is most likely to suggest a group game?" },
  { text: "Who brings the best party energy to a big crowd?" },
  { text: "Who would plan the reunion?" },
  { text: "Who is most likely to start the dance floor?" },
  { text: "Who would keep the conversation going at a big table?" },
  { text: "Who is most likely to make strangers feel welcome?" },
  { text: "Who would pick the best playlist for the whole room?" },
  { text: "Who is most likely to stay until cleanup?" },
  { text: "Who would win a group trivia night?" },
  { text: "Who is most likely to tell the funniest story?" },
  { text: "Who would rally everyone for one more round?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_LARGE_GROUPS_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are large groups?",
    "answer": "Large groups on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for big parties, reunions, and crowded hangouts."
  },
  {
    "question": "Can we play large groups on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_SMALL_GROUPS_INTENT = {
  slug: "games-for-small-groups",
  title: "Games for Small Groups",
  metaTitle: "Games for Small Groups | Friend Voting Game | FriendRank",
  metaDescription:
    "Create games for small groups on FriendRank. Perfect for trios and foursomes — vote anonymously, reveal funny roles, and share results in minutes.",
  h1: "Games for Small Groups",
  intentSummaryTitle: "What are games for small groups?",
  intentSummary:
    "Games for small groups work best when every vote feels personal and the results spark real conversation. FriendRank is built for that: add a few names, share one link, vote anonymously on funny roles, and unlock results together. Ideal for coffee hangs, small dinners, and close friend circles. No app download needed.",
  whyFriendRankTitle: "Why FriendRank works for small groups",
  exampleQuestionsTitle: "Popular small group game questions",
  faqTitle: "Games for small groups FAQ",
  schemaDescription:
    "Create games for small groups with FriendRank. Vote anonymously on funny roles, reveal shareable results, and play in minutes. No signup required.",
  ctaLocation: "landing_games_for_small_groups" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows the group best",
      "Who gives the best advice",
      "Who is the most loyal friend",
    ],
    suggestedVibeTags: ["College", "Discord", "Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_SMALL_GROUPS_AUDIENCE = {
  heroSubtitle:
    "Make a small hangout more fun with a quick voting game. Add friends, share one link, vote anonymously, and reveal results together.",
  playImmediatelyBody:
    "Create a game on FriendRank in under a minute. Share the link with your small group and let everyone vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are small group questions your friends can vote on.",
  finalCtaTitle: "Start your small group game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and perfect for trios and foursomes.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_SMALL_GROUPS_PRIMARY_CTA: LandingPageCta = {
  label: "Create Small Group Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_SMALL_GROUPS_QUESTIONS = [
  { text: "Who is most likely to plan the next hangout?" },
  { text: "Who gives the best advice in a small group?" },
  { text: "Who is most likely to bring snacks without being asked?" },
  { text: "Who would win a best friend quiz?" },
  { text: "Who is most likely to send the follow-up text?" },
  { text: "Who remembers the smallest details?" },
  { text: "Who is most likely to suggest a road trip?" },
  { text: "Who would pick the best restaurant for the group?" },
  { text: "Who is most likely to make everyone laugh first?" },
  { text: "Who would stay up talking the latest?" },
  { text: "Who is most likely to organize the group photo?" },
  { text: "Who would be the best trivia partner?" },
  { text: "Who is most likely to keep a secret?" },
  { text: "Who would plan the surprise?" },
  { text: "Who is most likely to start the inside joke?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_SMALL_GROUPS_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are small groups?",
    "answer": "Small groups on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for trios, foursomes, and close friend hangouts."
  },
  {
    "question": "Can we play small groups on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_ROOMMATES_INTENT = {
  slug: "games-for-roommates",
  title: "Games for Roommates",
  metaTitle: "Games for Roommates | Funny Housemate Game | FriendRank",
  metaDescription:
    "Create games for roommates on FriendRank. Vote anonymously on funny housemate roles, reveal results together, and play from any phone.",
  h1: "Games for Roommates",
  intentSummaryTitle: "What are games for roommates?",
  intentSummary:
    "Games for roommates turn everyday house dynamics into something funny and shareable. FriendRank lets your household vote anonymously on who fits each role — who never does dishes, who hogs the couch, who gives the best life advice. Share one link, vote on phones, and reveal results together in the kitchen or group chat. No signup required.",
  whyFriendRankTitle: "Why FriendRank works for roommates",
  exampleQuestionsTitle: "Popular roommate game questions",
  faqTitle: "Games for roommates FAQ",
  schemaDescription:
    "Create games for roommates with FriendRank. Vote anonymously on funny housemate roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_games_for_roommates" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to leave dishes in the sink",
      "Who hogs the couch",
      "Who gives the best roommate advice",
    ],
    suggestedVibeTags: ["College", "Discord", "Party"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_ROOMMATES_AUDIENCE = {
  heroSubtitle:
    "Turn roommate life into a funny voting game. Add housemates, share one link, vote anonymously, and reveal results together.",
  playImmediatelyBody:
    "Create a game on FriendRank after dinner or on a lazy weekend. Share the link in the house group chat and let everyone vote.",
  exampleQuestionsIntro:
    "Need inspiration? Here are roommate questions your house can vote on.",
  finalCtaTitle: "Start your roommate game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your house group chat.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_ROOMMATES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Roommate Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_ROOMMATES_QUESTIONS = [
  { text: "Who is most likely to forget to take out the trash?" },
  { text: "Who would survive longest without Wi-Fi?" },
  { text: "Who is most likely to blast music at midnight?" },
  { text: "Who would win a cleaning contest?" },
  { text: "Who is most likely to eat someone else's leftovers?" },
  { text: "Who would forget to lock the door?" },
  { text: "Who is most likely to host the best house dinner?" },
  { text: "Who would binge a show the fastest?" },
  { text: "Who is most likely to fall asleep on the couch?" },
  { text: "Who would plan the best house party?" },
  { text: "Who is most likely to borrow clothes without asking?" },
  { text: "Who would pay bills on time every month?" },
  { text: "Who is most likely to start a deep talk at 2 a.m.?" },
  { text: "Who would adopt a plant and forget it?" },
  { text: "Who is most likely to make the whole house laugh?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_ROOMMATES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are roommates?",
    "answer": "Roommates on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for shared apartments, dorms, and housemate group chats."
  },
  {
    "question": "Can we play roommates on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_COLLEGE_STUDENTS_INTENT = {
  slug: "games-for-college-students",
  title: "Games for College Students",
  metaTitle: "Games for College Students | Campus Voting Game | FriendRank",
  metaDescription:
    "Create games for college students on FriendRank. Perfect for dorms and campus groups — vote anonymously, reveal funny roles, and share results fast.",
  h1: "Games for College Students",
  intentSummaryTitle: "What are games for college students?",
  intentSummary:
    "Games for college students need to be fast, funny, and phone-first. FriendRank fits dorm life and campus group chats: create a game, share one link, vote anonymously on college-life roles, and unlock results together. Works for pregame hangs, study breaks, club meetings, and Discord servers. No app download or account needed.",
  whyFriendRankTitle: "Why FriendRank works for college students",
  exampleQuestionsTitle: "Popular college student game questions",
  faqTitle: "Games for college students FAQ",
  schemaDescription:
    "Create games for college students with FriendRank. Vote anonymously on funny campus roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_games_for_college_students" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to pull an all-nighter",
      "Who would survive on dining hall food",
      "Who brings the best dorm party energy",
    ],
    suggestedVibeTags: ["College", "Party", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_COLLEGE_STUDENTS_AUDIENCE = {
  heroSubtitle:
    "Make campus life more fun with a quick voting game. Add friends, share one link, vote anonymously, and reveal results in the group chat.",
  playImmediatelyBody:
    "Create a game on FriendRank between classes or before a hangout. Share the link in iMessage, WhatsApp, or your dorm chat.",
  exampleQuestionsIntro:
    "Need inspiration? Here are college student questions your group can vote on.",
  finalCtaTitle: "Start your college game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your campus group chat.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_COLLEGE_STUDENTS_PRIMARY_CTA: LandingPageCta = {
  label: "Create College Student Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_COLLEGE_STUDENTS_QUESTIONS = [
  { text: "Who is most likely to sleep through an 8 a.m. class?" },
  { text: "Who would win a campus trivia night?" },
  { text: "Who is most likely to become club president?" },
  { text: "Who would survive finals week on coffee alone?" },
  { text: "Who is most likely to know everyone on campus?" },
  { text: "Who would plan the best spring break trip?" },
  { text: "Who is most likely to forget their student ID?" },
  { text: "Who would dominate a group project?" },
  { text: "Who is most likely to start a dorm tradition?" },
  { text: "Who would pick the best pregame playlist?" },
  { text: "Who is most likely to join five clubs at once?" },
  { text: "Who would give the best study tips?" },
  { text: "Who is most likely to become a meme in the group chat?" },
  { text: "Who would host the best dorm hangout?" },
  { text: "Who is most likely to graduate with the best stories?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_COLLEGE_STUDENTS_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are college students?",
    "answer": "College students on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for dorms, campus clubs, and student group chats."
  },
  {
    "question": "Can we play college students on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_WORK_MEETINGS_INTENT = {
  slug: "games-for-work-meetings",
  title: "Games for Work Meetings",
  metaTitle: "Games for Work Meetings | Team Icebreaker | FriendRank",
  metaDescription:
    "Create games for work meetings on FriendRank. Quick anonymous voting on phones before the agenda starts — no app download required.",
  h1: "Games for Work Meetings",
  intentSummaryTitle: "What are games for work meetings?",
  intentSummary:
    "Games for work meetings should be quick, inclusive, and easy to run on a video call or in a conference room. FriendRank gives teams a five-minute icebreaker: add coworker names, share one link, vote anonymously on light workplace roles, and reveal results together before the real agenda. Professional enough for standups, workshops, and all-hands. No signup required.",
  whyFriendRankTitle: "Why FriendRank works for work meetings",
  exampleQuestionsTitle: "Popular work meeting game questions",
  faqTitle: "Games for work meetings FAQ",
  schemaDescription:
    "Create games for work meetings with FriendRank. Quick anonymous voting on phones before the agenda starts. No signup required.",
  ctaLocation: "landing_games_for_work_meetings" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to unmute first",
      "Who keeps meetings on schedule",
      "Who brings the best meeting energy",
    ],
    suggestedVibeTags: ["Office", "Party", "College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_WORK_MEETINGS_AUDIENCE = {
  heroSubtitle:
    "Warm up your meeting with a quick voting game. Add coworkers, share one link, vote anonymously, and reveal light results together.",
  playImmediatelyBody:
    "Create a game on FriendRank before the meeting starts. Drop the link in Slack, Teams, or the calendar invite and let everyone vote in the first five minutes.",
  exampleQuestionsIntro:
    "Need inspiration? Here are work meeting questions your team can vote on.",
  finalCtaTitle: "Start your work meeting game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the agenda begins.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_WORK_MEETINGS_PRIMARY_CTA: LandingPageCta = {
  label: "Create Work Meeting Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_WORK_MEETINGS_QUESTIONS = [
  { text: "Who is most likely to join the call one minute early?" },
  { text: "Who would run the best team standup?" },
  { text: "Who is most likely to share their screen without asking?" },
  { text: "Who would plan the best team offsite?" },
  { text: "Who is most likely to send a follow-up summary?" },
  { text: "Who would win employee of the month?" },
  { text: "Who is most likely to have the best Zoom background?" },
  { text: "Who would mentor a new hire first?" },
  { text: "Who is most likely to bring donuts to the office?" },
  { text: "Who would keep the team motivated on a tough week?" },
  { text: "Who is most likely to suggest a process improvement?" },
  { text: "Who would organize the team lunch?" },
  { text: "Who is most likely to celebrate a win the loudest?" },
  { text: "Who would remember everyone's work anniversary?" },
  { text: "Who is most likely to make a meeting actually fun?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_WORK_MEETINGS_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are work meetings?",
    "answer": "Work meetings on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for standups, workshops, and all-hands calls."
  },
  {
    "question": "Can we play work meetings on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_REMOTE_TEAMS_INTENT = {
  slug: "games-for-remote-teams",
  title: "Games for Remote Teams",
  metaTitle: "Games for Remote Teams | Virtual Team Game | FriendRank",
  metaDescription:
    "Create games for remote teams on FriendRank. Share one link in Slack or Zoom chat, vote anonymously, and reveal results together on the call.",
  h1: "Games for Remote Teams",
  intentSummaryTitle: "What are games for remote teams?",
  intentSummary:
    "Games for remote teams need to work when everyone is in a different city and the only shared screen is a phone. FriendRank runs entirely in the browser: create a game, paste the link in Slack, Teams, or Zoom chat, and let coworkers vote anonymously. Results unlock together on the call so distributed teams get a shared moment without another app install.",
  whyFriendRankTitle: "Why FriendRank works for remote teams",
  exampleQuestionsTitle: "Popular remote team game questions",
  faqTitle: "Games for remote teams FAQ",
  schemaDescription:
    "Create games for remote teams with FriendRank. Share one link, vote anonymously on the call, and reveal results together. No signup required.",
  ctaLocation: "landing_games_for_remote_teams" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to work from a coffee shop",
      "Who never misses a standup",
      "Who brings the best virtual meeting energy",
    ],
    suggestedVibeTags: ["Office", "Discord", "College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_REMOTE_TEAMS_AUDIENCE = {
  heroSubtitle:
    "Bring your remote team together with a quick voting game. Share one link, vote anonymously, and reveal results on the video call.",
  playImmediatelyBody:
    "Create a game on FriendRank before your sync. Paste the link in Slack or the meeting chat and let everyone vote in the first few minutes.",
  exampleQuestionsIntro:
    "Need inspiration? Here are remote team questions your coworkers can vote on.",
  finalCtaTitle: "Start your remote team game",
  finalCtaSubtitle:
    "Free, browser-based, and ready for your next video call.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_REMOTE_TEAMS_PRIMARY_CTA: LandingPageCta = {
  label: "Create Remote Team Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_REMOTE_TEAMS_QUESTIONS = [
  { text: "Who is most likely to work from a different time zone?" },
  { text: "Who would survive a week without Slack?" },
  { text: "Who is most likely to have the tidiest home office?" },
  { text: "Who would plan the best virtual team event?" },
  { text: "Who is most likely to send the best GIF in chat?" },
  { text: "Who would win a remote trivia contest?" },
  { text: "Who is most likely to join a call with perfect lighting?" },
  { text: "Who would onboard a new remote hire the fastest?" },
  { text: "Who is most likely to suggest async updates?" },
  { text: "Who would keep morale high during a busy sprint?" },
  { text: "Who is most likely to have a pet cameo on camera?" },
  { text: "Who would document the team process best?" },
  { text: "Who is most likely to remember everyone's timezone?" },
  { text: "Who would organize a virtual coffee chat?" },
  { text: "Who is most likely to make a remote meeting feel in-person?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_REMOTE_TEAMS_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are remote teams?",
    "answer": "Remote teams on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for distributed teams, video calls, and Slack channels."
  },
  {
    "question": "Can we play remote teams on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const FRIDAY_TEAM_GAMES_INTENT = {
  slug: "friday-team-games",
  title: "Friday Team Games",
  metaTitle: "Friday Team Games | End-of-Week Icebreaker | FriendRank",
  metaDescription:
    "Create Friday team games on FriendRank. End the week with anonymous voting, funny roles, and shareable results in under five minutes.",
  h1: "Friday Team Games",
  intentSummaryTitle: "What are Friday team games?",
  intentSummary:
    "Friday team games give coworkers a quick reset before the weekend. FriendRank makes it easy: add team names, share one link, vote anonymously on end-of-week roles, and reveal results together in the office or on a video call. Light enough for managers to run, fun enough that people actually participate. No app download needed.",
  whyFriendRankTitle: "Why FriendRank works for Friday team games",
  exampleQuestionsTitle: "Popular Friday team game questions",
  faqTitle: "Friday team games FAQ",
  schemaDescription:
    "Create Friday team games with FriendRank. End the week with anonymous voting and shareable results. No signup required.",
  ctaLocation: "landing_friday_team_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to leave early on Friday",
      "Who brings the best Friday energy",
      "Who would plan the best team happy hour",
    ],
    suggestedVibeTags: ["Office", "Party", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const FRIDAY_TEAM_GAMES_AUDIENCE = {
  heroSubtitle:
    "End the week with a quick team voting game. Share one link, vote anonymously, and reveal funny Friday roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank before your Friday standup or social hour. Share the link and let the team vote in the last five minutes of the week.",
  exampleQuestionsIntro:
    "Need inspiration? Here are Friday team questions your coworkers can vote on.",
  finalCtaTitle: "Start your Friday team game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the weekend starts.",
} as const;

/** @see CTA_VERSION */
export const FRIDAY_TEAM_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Friday Team Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const FRIDAY_TEAM_GAMES_QUESTIONS = [
  { text: "Who is most likely to say 'Happy Friday' first?" },
  { text: "Who would plan the best team happy hour?" },
  { text: "Who is most likely to finish work early on Friday?" },
  { text: "Who would bring the best weekend plans to chat?" },
  { text: "Who is most likely to start the Friday playlist?" },
  { text: "Who would win the week's MVP award?" },
  { text: "Who is most likely to suggest tacos for lunch?" },
  { text: "Who would keep the team laughing on a Friday afternoon?" },
  { text: "Who is most likely to send the weekend meme?" },
  { text: "Who would organize the casual Friday outfit contest?" },
  { text: "Who is most likely to have the wildest weekend stories?" },
  { text: "Who would recap the week the best?" },
  { text: "Who is most likely to volunteer for Monday's task?" },
  { text: "Who would pick the best team lunch spot?" },
  { text: "Who is most likely to make Friday meetings actually fun?" },
];

/** @see FAQ_VERSION */
export const FRIDAY_TEAM_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are Friday team games?",
    "answer": "Friday team games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for end-of-week standups, social hours, and office Fridays."
  },
  {
    "question": "Can we play Friday team games on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const TEAM_LUNCH_GAMES_INTENT = {
  slug: "team-lunch-games",
  title: "Team Lunch Games",
  metaTitle: "Team Lunch Games | Coworker Voting Game | FriendRank",
  metaDescription:
    "Create team lunch games on FriendRank. Vote anonymously while you eat, reveal funny coworker roles, and share results at the table.",
  h1: "Team Lunch Games",
  intentSummaryTitle: "What are team lunch games?",
  intentSummary:
    "Team lunch games turn a casual meal into something memorable without killing the conversation. FriendRank lets coworkers vote anonymously on funny lunch-table roles while everyone eats. Share one link, vote from phones under the table, and reveal results together before dessert. Works for in-office lunches and team meals on video calls.",
  whyFriendRankTitle: "Why FriendRank works for team lunch games",
  exampleQuestionsTitle: "Popular team lunch game questions",
  faqTitle: "Team lunch games FAQ",
  schemaDescription:
    "Create team lunch games with FriendRank. Vote anonymously at the table and reveal funny coworker roles. No signup required.",
  ctaLocation: "landing_team_lunch_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who always picks the restaurant",
      "Who orders the most interesting lunch",
      "Who tells the best lunch-table stories",
    ],
    suggestedVibeTags: ["Office", "Party", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const TEAM_LUNCH_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make team lunch more fun with a quick voting game. Share one link, vote anonymously, and reveal results while you eat.",
  playImmediatelyBody:
    "Create a game on FriendRank before everyone sits down. Share the link at the table or in the lunch invite and let coworkers vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are team lunch questions your coworkers can vote on.",
  finalCtaTitle: "Start your team lunch game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the food arrives.",
} as const;

/** @see CTA_VERSION */
export const TEAM_LUNCH_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Team Lunch Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const TEAM_LUNCH_GAMES_QUESTIONS = [
  { text: "Who is most likely to suggest the lunch spot?" },
  { text: "Who would order the most adventurous dish?" },
  { text: "Who is most likely to steal a fry?" },
  { text: "Who would split the bill the fairest?" },
  { text: "Who is most likely to arrive late to lunch?" },
  { text: "Who would tell the best story at the table?" },
  { text: "Who is most likely to recommend dessert?" },
  { text: "Who would win a food trivia round?" },
  { text: "Who is most likely to eat everyone's leftovers?" },
  { text: "Who would plan the best team dinner?" },
  { text: "Who is most likely to know every restaurant nearby?" },
  { text: "Who would keep the lunch conversation going?" },
  { text: "Who is most likely to bring snacks for the table?" },
  { text: "Who would organize the team potluck?" },
  { text: "Who is most likely to make lunch the highlight of the day?" },
];

/** @see FAQ_VERSION */
export const TEAM_LUNCH_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are team lunch games?",
    "answer": "Team lunch games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for office lunches, team meals, and coworker hangouts."
  },
  {
    "question": "Can we play team lunch games on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const LONG_DISTANCE_COUPLE_GAMES_INTENT = {
  slug: "long-distance-couple-games",
  title: "Long Distance Couple Games",
  metaTitle: "Long Distance Couple Games | Play Online | FriendRank",
  metaDescription:
    "Create long distance couple games on FriendRank. Vote anonymously on a video call, reveal playful roles, and share results together from anywhere.",
  h1: "Long Distance Couple Games",
  intentSummaryTitle: "What are long distance couple games?",
  intentSummary:
    "Long distance couple games help partners feel connected when they cannot be in the same room. FriendRank turns date night into a browser voting game: add names, share one link on FaceTime or WhatsApp, vote anonymously on relationship roles, and unlock results together on the call. No app download, no accounts — just one link between cities.",
  whyFriendRankTitle: "Why FriendRank works for long distance couples",
  exampleQuestionsTitle: "Popular long distance couple game questions",
  faqTitle: "Long distance couple games FAQ",
  schemaDescription:
    "Create long distance couple games with FriendRank. Vote anonymously on video calls and reveal playful results together. No signup required.",
  ctaLocation: "landing_long_distance_couple_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to fall asleep on the call",
      "Who sends the best good morning text",
      "Who would plan the best reunion visit",
    ],
    suggestedVibeTags: ["Soft drama", "Family", "Discord"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const LONG_DISTANCE_COUPLE_GAMES_AUDIENCE = {
  heroSubtitle:
    "Stay connected across cities with a quick couple voting game. Share one link, vote anonymously, and reveal results on your video call.",
  playImmediatelyBody:
    "Create a game on FriendRank before your next call. Send the link and vote together while you catch up on FaceTime or WhatsApp.",
  exampleQuestionsIntro:
    "Need inspiration? Here are long distance couple questions you can vote on.",
  finalCtaTitle: "Start your long distance couple game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your next video date.",
} as const;

/** @see CTA_VERSION */
export const LONG_DISTANCE_COUPLE_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Long Distance Couple Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const LONG_DISTANCE_COUPLE_GAMES_QUESTIONS = [
  { text: "Who is most likely to fall asleep on the video call?" },
  { text: "Who sends the best good morning text?" },
  { text: "Who would plan the most romantic reunion?" },
  { text: "Who is most likely to forget the time difference?" },
  { text: "Who would pick the best movie for a virtual date?" },
  { text: "Who is most likely to send a care package?" },
  { text: "Who would win a long-distance trivia about each other?" },
  { text: "Who is most likely to screenshot the cutest moment?" },
  { text: "Who would plan the surprise visit?" },
  { text: "Who is most likely to stay on the phone for hours?" },
  { text: "Who would remember every anniversary detail?" },
  { text: "Who is most likely to send voice notes?" },
  { text: "Who would pick the best playlist for the call?" },
  { text: "Who is most likely to make distance feel shorter?" },
  { text: "Who would plan the best future trip together?" },
];

/** @see FAQ_VERSION */
export const LONG_DISTANCE_COUPLE_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are long distance couples?",
    "answer": "Long distance couples on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for video dates, FaceTime nights, and LDR relationships."
  },
  {
    "question": "Can we play long distance couples on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const NEWLY_DATING_GAMES_INTENT = {
  slug: "newly-dating-games",
  title: "Newly Dating Games",
  metaTitle: "Newly Dating Games | Couple Voting Game | FriendRank",
  metaDescription:
    "Create newly dating games on FriendRank. Playful anonymous voting for new couples — reveal funny roles and share results on your next date.",
  h1: "Newly Dating Games",
  intentSummaryTitle: "What are newly dating games?",
  intentSummary:
    "Newly dating games break the ice without making things awkward. FriendRank gives new couples a light voting game: add names, share one link, vote anonymously on early-relationship roles, and reveal results together over dinner or on a walk. Funny enough to ease nerves, sweet enough for a second date. No signup required.",
  whyFriendRankTitle: "Why FriendRank works for newly dating couples",
  exampleQuestionsTitle: "Popular newly dating game questions",
  faqTitle: "Newly dating games FAQ",
  schemaDescription:
    "Create newly dating games with FriendRank. Playful anonymous voting for new couples with shareable results. No signup required.",
  ctaLocation: "landing_newly_dating_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to text first",
      "Who would plan the best second date",
      "Who is the bigger romantic",
    ],
    suggestedVibeTags: ["Soft drama", "Family", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const NEWLY_DATING_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make early dates more fun with a quick couple voting game. Share one link, vote anonymously, and reveal playful results together.",
  playImmediatelyBody:
    "Create a game on FriendRank before your next date. Share the link and vote together over coffee, dinner, or a video call.",
  exampleQuestionsIntro:
    "Need inspiration? Here are newly dating questions you can vote on.",
  finalCtaTitle: "Start your newly dating game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your next date night.",
} as const;

/** @see CTA_VERSION */
export const NEWLY_DATING_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Newly Dating Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const NEWLY_DATING_GAMES_QUESTIONS = [
  { text: "Who is most likely to text good morning first?" },
  { text: "Who would plan the better second date?" },
  { text: "Who is most likely to get nervous on a first date?" },
  { text: "Who would pick the best restaurant?" },
  { text: "Who is most likely to remember small details?" },
  { text: "Who would send the sweetest compliment?" },
  { text: "Who is most likely to suggest a spontaneous plan?" },
  { text: "Who would win a 'how well do we know each other' round?" },
  { text: "Who is most likely to laugh at the wrong moment?" },
  { text: "Who would be the better cook for date night?" },
  { text: "Who is most likely to overthink a text?" },
  { text: "Who would pick the best movie for two?" },
  { text: "Who is most likely to hold eye contact longer?" },
  { text: "Who would plan the cutest surprise?" },
  { text: "Who is most likely to suggest playing another round?" },
];

/** @see FAQ_VERSION */
export const NEWLY_DATING_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are newly dating couples?",
    "answer": "Newly dating couples on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for first dates, early relationships, and new couples."
  },
  {
    "question": "Can we play newly dating couples on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const MARRIED_COUPLE_GAMES_INTENT = {
  slug: "married-couple-games",
  title: "Married Couple Games",
  metaTitle: "Married Couple Games | Spouse Voting Game | FriendRank",
  metaDescription:
    "Create married couple games on FriendRank. Vote anonymously on funny spouse roles, reveal results together, and spark conversation at home.",
  h1: "Married Couple Games",
  intentSummaryTitle: "What are married couple games?",
  intentSummary:
    "Married couple games add playful energy to date night or a quiet evening at home. FriendRank lets partners vote anonymously on who fits each funny role — who hogs the remote, who gives the best pep talks, who would survive a DIY project. Share one link, vote on phones, and reveal results together on the couch. No app download needed.",
  whyFriendRankTitle: "Why FriendRank works for married couples",
  exampleQuestionsTitle: "Popular married couple game questions",
  faqTitle: "Married couple games FAQ",
  schemaDescription:
    "Create married couple games with FriendRank. Vote anonymously on funny spouse roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_married_couple_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who hogs the remote",
      "Who gives the best pep talk",
      "Who would survive a DIY project alone",
    ],
    suggestedVibeTags: ["Soft drama", "Family", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const MARRIED_COUPLE_GAMES_AUDIENCE = {
  heroSubtitle:
    "Spice up date night with a quick spouse voting game. Share one link, vote anonymously, and reveal funny results together.",
  playImmediatelyBody:
    "Create a game on FriendRank after dinner or on a lazy Sunday. Share the link and vote together from the couch.",
  exampleQuestionsIntro:
    "Need inspiration? Here are married couple questions you can vote on.",
  finalCtaTitle: "Start your married couple game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your next date night in.",
} as const;

/** @see CTA_VERSION */
export const MARRIED_COUPLE_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Married Couple Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const MARRIED_COUPLE_GAMES_QUESTIONS = [
  { text: "Who is most likely to hog the remote?" },
  { text: "Who would plan the best anniversary surprise?" },
  { text: "Who is most likely to forget an appointment?" },
  { text: "Who would win a cooking challenge?" },
  { text: "Who is most likely to start a home project?" },
  { text: "Who would give the best pep talk?" },
  { text: "Who is most likely to fall asleep during a movie?" },
  { text: "Who would remember every family birthday?" },
  { text: "Who is most likely to suggest takeout?" },
  { text: "Who would organize the vacation?" },
  { text: "Who is most likely to sing in the kitchen?" },
  { text: "Who would win a trivia night about each other?" },
  { text: "Who is most likely to adopt another plant?" },
  { text: "Who would fix something before calling a pro?" },
  { text: "Who is most likely to make the other laugh on a tough day?" },
];

/** @see FAQ_VERSION */
export const MARRIED_COUPLE_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are married couples?",
    "answer": "Married couples on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for date nights, anniversaries, and evenings at home."
  },
  {
    "question": "Can we play married couples on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const DOUBLE_DATE_GAMES_INTENT = {
  slug: "double-date-games",
  title: "Double Date Games",
  metaTitle: "Double Date Games | Couple Group Vote | FriendRank",
  metaDescription:
    "Create double date games on FriendRank. Four friends vote anonymously on phones, reveal funny roles, and share results at the table.",
  h1: "Double Date Games",
  intentSummaryTitle: "What are double date games?",
  intentSummary:
    "Double date games break the ice when two couples hang out together. FriendRank turns it into a group voting game: add all four names, share one link, vote anonymously on double-date roles, and reveal results together at dinner. Funny enough to ease any awkward silence, easy enough to start in under a minute. No signup required.",
  whyFriendRankTitle: "Why FriendRank works for double dates",
  exampleQuestionsTitle: "Popular double date game questions",
  faqTitle: "Double date games FAQ",
  schemaDescription:
    "Create double date games with FriendRank. Four friends vote anonymously and reveal shareable results together. No signup required.",
  ctaLocation: "landing_double_date_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to pick the restaurant",
      "Who tells the best couple story",
      "Who would plan the next double date",
    ],
    suggestedVibeTags: ["Soft drama", "Party", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const DOUBLE_DATE_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make double dates more fun with a quick group voting game. Add everyone, share one link, vote anonymously, and reveal results at the table.",
  playImmediatelyBody:
    "Create a game on FriendRank before dessert arrives. Share the link and let both couples vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are double date questions your group can vote on.",
  finalCtaTitle: "Start your double date game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the check arrives.",
} as const;

/** @see CTA_VERSION */
export const DOUBLE_DATE_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Double Date Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const DOUBLE_DATE_GAMES_QUESTIONS = [
  { text: "Who is most likely to pick the restaurant?" },
  { text: "Who would tell the funniest couple story?" },
  { text: "Who is most likely to order for the table?" },
  { text: "Who would plan the next double date?" },
  { text: "Who is most likely to finish dessert first?" },
  { text: "Who would win a couples trivia round?" },
  { text: "Who is most likely to suggest another round of drinks?" },
  { text: "Who would take the best group photo?" },
  { text: "Who is most likely to make everyone comfortable?" },
  { text: "Who would suggest the best after-dinner plan?" },
  { text: "Who is most likely to split the bill fairly?" },
  { text: "Who would give the best relationship advice?" },
  { text: "Who is most likely to start the group laugh?" },
  { text: "Who would remember everyone's food order?" },
  { text: "Who is most likely to suggest playing again next month?" },
];

/** @see FAQ_VERSION */
export const DOUBLE_DATE_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are double dates?",
    "answer": "Double dates on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for dinner with two couples, couple hangouts, and group dates."
  },
  {
    "question": "Can we play double dates on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const SLEEPOVER_GAMES_INTENT = {
  slug: "sleepover-games",
  title: "Sleepover Games",
  metaTitle: "Sleepover Games | Late-Night Voting Game | FriendRank",
  metaDescription:
    "Create sleepover games on FriendRank. Vote anonymously on silly roles, reveal funny results, and play together all night from your phones.",
  h1: "Sleepover Games",
  intentSummaryTitle: "What are sleepover games?",
  intentSummary:
    "Sleepover games keep the night going when everyone is already on their phones. FriendRank turns late-night hangs into a voting game: add friends, share one link, vote anonymously on sleepover roles, and reveal results together in the living room or group chat. Perfect after movies, before truth-or-dare, or when nobody wants to sleep yet.",
  whyFriendRankTitle: "Why FriendRank works for sleepovers",
  exampleQuestionsTitle: "Popular sleepover game questions",
  faqTitle: "Sleepover games FAQ",
  schemaDescription:
    "Create sleepover games with FriendRank. Vote anonymously on silly roles and reveal funny late-night results. No signup required.",
  ctaLocation: "landing_sleepover_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to stay awake until sunrise",
      "Who tells the scariest story",
      "Who hogs the sleeping bag",
    ],
    suggestedVibeTags: ["Party", "College", "Family"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const SLEEPOVER_GAMES_AUDIENCE = {
  heroSubtitle:
    "Keep the sleepover going with a quick voting game. Add friends, share one link, vote anonymously, and reveal funny results together.",
  playImmediatelyBody:
    "Create a game on FriendRank when the snacks come out. Share the link and let everyone vote from their phones in pajamas.",
  exampleQuestionsIntro:
    "Need inspiration? Here are sleepover questions your group can vote on.",
  finalCtaTitle: "Start your sleepover game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for late-night laughs.",
} as const;

/** @see CTA_VERSION */
export const SLEEPOVER_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Sleepover Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const SLEEPOVER_GAMES_QUESTIONS = [
  { text: "Who is most likely to stay awake until sunrise?" },
  { text: "Who would tell the scariest ghost story?" },
  { text: "Who is most likely to fall asleep first?" },
  { text: "Who would eat all the midnight snacks?" },
  { text: "Who is most likely to suggest one more movie?" },
  { text: "Who would hog the best sleeping spot?" },
  { text: "Who is most likely to laugh at 3 a.m.?" },
  { text: "Who would braid everyone's hair?" },
  { text: "Who is most likely to sleep-talk?" },
  { text: "Who would pick the best sleepover playlist?" },
  { text: "Who is most likely to prank someone awake?" },
  { text: "Who would remember everyone's pillow preference?" },
  { text: "Who is most likely to suggest truth or dare next?" },
  { text: "Who would take the best sleepy selfie?" },
  { text: "Who is most likely to make breakfast in the morning?" },
];

/** @see FAQ_VERSION */
export const SLEEPOVER_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are sleepovers?",
    "answer": "Sleepovers on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for overnight hangs, late-night friend groups, and pajama parties."
  },
  {
    "question": "Can we play sleepovers on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const HOUSE_PARTY_GAMES_INTENT = {
  slug: "house-party-games",
  title: "House Party Games",
  metaTitle: "House Party Games | Home Voting Game | FriendRank",
  metaDescription:
    "Create house party games on FriendRank. Share one link, vote anonymously from phones, and reveal funny party roles in the living room.",
  h1: "House Party Games",
  intentSummaryTitle: "What are house party games?",
  intentSummary:
    "House party games should start fast when guests are already mingling. FriendRank gives hosts a browser voting game: add names, share one link in the group chat or on a TV screen, vote anonymously on party roles, and reveal results together in the living room. No board games to set up, no app to download, no accounts required.",
  whyFriendRankTitle: "Why FriendRank works for house parties",
  exampleQuestionsTitle: "Popular house party game questions",
  faqTitle: "House party games FAQ",
  schemaDescription:
    "Create house party games with FriendRank. Share one link, vote anonymously, and reveal funny party roles. No signup required.",
  ctaLocation: "landing_house_party_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who brings the best party energy",
      "Who would DJ the living room",
      "Who is most likely to start karaoke",
    ],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const HOUSE_PARTY_GAMES_AUDIENCE = {
  heroSubtitle:
    "Kick off your house party with a quick voting game. Share one link, vote anonymously, and reveal funny roles in the living room.",
  playImmediatelyBody:
    "Create a game on FriendRank when guests arrive. Share the link and let everyone vote from their phones while they mingle.",
  exampleQuestionsIntro:
    "Need inspiration? Here are house party questions your guests can vote on.",
  finalCtaTitle: "Start your house party game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the music starts.",
} as const;

/** @see CTA_VERSION */
export const HOUSE_PARTY_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create House Party Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const HOUSE_PARTY_GAMES_QUESTIONS = [
  { text: "Who is most likely to start the dance floor?" },
  { text: "Who would pick the best house party playlist?" },
  { text: "Who is most likely to arrive with the best snack?" },
  { text: "Who would suggest karaoke?" },
  { text: "Who is most likely to talk to every guest?" },
  { text: "Who would clean up without being asked?" },
  { text: "Who is most likely to spill a drink?" },
  { text: "Who would take the best party photos?" },
  { text: "Who is most likely to suggest a group game?" },
  { text: "Who would stay until the last song?" },
  { text: "Who is most likely to make a new friend tonight?" },
  { text: "Who would win a living room trivia round?" },
  { text: "Who is most likely to start an impromptu speech?" },
  { text: "Who would remember everyone's drink order?" },
  { text: "Who is most likely to make the host laugh?" },
];

/** @see FAQ_VERSION */
export const HOUSE_PARTY_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are house parties?",
    "answer": "House parties on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for home celebrations, living room hangouts, and casual parties."
  },
  {
    "question": "Can we play house parties on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const BIRTHDAY_PARTY_GAMES_INTENT = {
  slug: "birthday-party-games",
  title: "Birthday Party Games",
  metaTitle: "Birthday Party Games | Celebration Voting Game | FriendRank",
  metaDescription:
    "Create birthday party games on FriendRank. Vote anonymously on funny birthday roles, reveal results together, and make the celebration more fun.",
  h1: "Birthday Party Games",
  intentSummaryTitle: "What are birthday party games?",
  intentSummary:
    "Birthday party games give guests something quick and memorable between cake and presents. FriendRank turns the celebration into a phone voting game: add names, share one link, vote anonymously on birthday roles, and unlock results for the room or group chat. Works for house parties, restaurant dinners, and surprise celebrations.",
  whyFriendRankTitle: "Why FriendRank works for birthday parties",
  exampleQuestionsTitle: "Popular birthday party game questions",
  faqTitle: "Birthday party games FAQ",
  schemaDescription:
    "Create birthday party games with FriendRank. Vote anonymously on funny birthday roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_birthday_party_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the best birthday toast",
      "Who is most likely to start the dance floor",
      "Who brings the best party energy",
    ],
    suggestedVibeTags: ["Party", "Family", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const BIRTHDAY_PARTY_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make the birthday more fun with a quick voting game. Add friends, share one link, vote anonymously, and reveal funny birthday roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank before the party or when guests arrive. Share the link and let everyone vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are birthday party questions your group can vote on.",
  finalCtaTitle: "Start your birthday party game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the candles are lit.",
} as const;

/** @see CTA_VERSION */
export const BIRTHDAY_PARTY_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Birthday Party Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const BIRTHDAY_PARTY_GAMES_QUESTIONS = [
  { text: "Who is most likely to eat the biggest slice of cake?" },
  { text: "Who would give the best birthday toast?" },
  { text: "Who is most likely to start the dance floor?" },
  { text: "Who would plan the surprise party?" },
  { text: "Who is most likely to sing happy birthday off-key?" },
  { text: "Who would pick the best birthday playlist?" },
  { text: "Who is most likely to forget where the presents are?" },
  { text: "Who would take the best birthday photos?" },
  { text: "Who is most likely to arrive with the loudest gift wrap?" },
  { text: "Who would stay until cleanup?" },
  { text: "Who is most likely to suggest karaoke?" },
  { text: "Who remembers everyone's birthday?" },
  { text: "Who is most likely to blow out the candles twice?" },
  { text: "Who would make the birthday person laugh the hardest?" },
  { text: "Who is most likely to suggest one more round?" },
];

/** @see FAQ_VERSION */
export const BIRTHDAY_PARTY_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are birthday parties?",
    "answer": "Birthday parties on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for birthday celebrations, surprise parties, and friend gatherings."
  },
  {
    "question": "Can we play birthday parties on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const BACHELORETTE_PARTY_GAMES_INTENT = {
  slug: "bachelorette-party-games",
  title: "Bachelorette Party Games",
  metaTitle: "Bachelorette Party Games | Bridal Voting Game | FriendRank",
  metaDescription:
    "Create bachelorette party games on FriendRank. Vote anonymously on funny bridal roles, reveal results together, and play from any phone.",
  h1: "Bachelorette Party Games",
  intentSummaryTitle: "What are bachelorette party games?",
  intentSummary:
    "Bachelorette party games should be funny, fast, and easy to run between activities. FriendRank gives the bridal group a browser voting game: add names, share one link, vote anonymously on bachelorette roles, and reveal results together on the night out or at the Airbnb. No printed games, no app download, no signup required.",
  whyFriendRankTitle: "Why FriendRank works for bachelorette parties",
  exampleQuestionsTitle: "Popular bachelorette party game questions",
  faqTitle: "Bachelorette party games FAQ",
  schemaDescription:
    "Create bachelorette party games with FriendRank. Vote anonymously on funny bridal roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_bachelorette_party_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to cry at the wedding",
      "Who would plan the best bachelorette surprise",
      "Who gives the best toast",
    ],
    suggestedVibeTags: ["Soft drama", "Party", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const BACHELORETTE_PARTY_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make the bachelorette weekend more fun with a quick voting game. Share one link, vote anonymously, and reveal funny bridal roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank before the night out. Share the link in the bridal group chat and let everyone vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are bachelorette party questions your group can vote on.",
  finalCtaTitle: "Start your bachelorette party game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for the bridal squad.",
} as const;

/** @see CTA_VERSION */
export const BACHELORETTE_PARTY_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Bachelorette Party Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const BACHELORETTE_PARTY_GAMES_QUESTIONS = [
  { text: "Who is most likely to cry at the wedding?" },
  { text: "Who would plan the best bachelorette surprise?" },
  { text: "Who is most likely to give the wildest toast?" },
  { text: "Who would pick the best party playlist?" },
  { text: "Who is most likely to stay out the latest?" },
  { text: "Who would organize the group photo?" },
  { text: "Who is most likely to know the most bride secrets?" },
  { text: "Who would win a 'how well do you know the bride' round?" },
  { text: "Who is most likely to suggest one more round?" },
  { text: "Who would take the best candid photos?" },
  { text: "Who is most likely to make the bride laugh?" },
  { text: "Who would remember everyone's drink order?" },
  { text: "Who is most likely to start the dance floor?" },
  { text: "Who would give the best marriage advice?" },
  { text: "Who is most likely to suggest playing again at the rehearsal dinner?" },
];

/** @see FAQ_VERSION */
export const BACHELORETTE_PARTY_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are bachelorette parties?",
    "answer": "Bachelorette parties on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for bridal weekends, wedding celebrations, and girls trips."
  },
  {
    "question": "Can we play bachelorette parties on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_ADULTS_INTENT = {
  slug: "games-for-adults",
  title: "Games for Adults",
  metaTitle: "Games for Adults | Group Voting Game | FriendRank",
  metaDescription:
    "Create games for adults on FriendRank. Vote anonymously on funny roles, reveal shareable results, and play from any phone at your next hangout.",
  h1: "Games for Adults",
  intentSummaryTitle: "What are games for adults?",
  intentSummary:
    "Games for adults should feel fun without being childish or complicated. FriendRank gives grown-up groups a browser voting game: add names, share one link, vote anonymously on funny social roles, and reveal results together at dinner, a house party, or in the group chat. No board game setup, no app download, no signup required.",
  whyFriendRankTitle: "Why FriendRank works for adult groups",
  exampleQuestionsTitle: "Popular adult group game questions",
  faqTitle: "Games for adults FAQ",
  schemaDescription:
    "Create games for adults with FriendRank. Vote anonymously on funny roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_games_for_adults" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who brings the best party energy",
      "Who would pick the wine",
      "Who tells the best stories",
    ],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_ADULTS_AUDIENCE = {
  heroSubtitle:
    "Make your next adult hangout more fun with a quick voting game. Share one link, vote anonymously, and reveal funny results together.",
  playImmediatelyBody:
    "Create a game on FriendRank before your next dinner or house party. Share the link and let everyone vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are adult group questions your friends can vote on.",
  finalCtaTitle: "Start your adult group game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your next hangout.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_ADULTS_PRIMARY_CTA: LandingPageCta = {
  label: "Create Adult Group Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_ADULTS_QUESTIONS = [
  { text: "Who is most likely to suggest another round?" },
  { text: "Who would pick the best restaurant?" },
  { text: "Who is most likely to stay out the latest?" },
  { text: "Who would tell the funniest story?" },
  { text: "Who is most likely to plan the group trip?" },
  { text: "Who would win a trivia night?" },
  { text: "Who is most likely to send the follow-up text?" },
  { text: "Who would organize the dinner reservation?" },
  { text: "Who is most likely to know everyone's coffee order?" },
  { text: "Who would suggest the best after-party plan?" },
  { text: "Who is most likely to make the whole table laugh?" },
  { text: "Who would remember the most embarrassing story?" },
  { text: "Who is most likely to become the group planner?" },
  { text: "Who would pick the best playlist?" },
  { text: "Who is most likely to suggest playing again next month?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_ADULTS_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are adult groups?",
    "answer": "Adult groups on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for house parties, dinners, and grown-up friend hangouts."
  },
  {
    "question": "Can we play adult groups on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_TEENS_INTENT = {
  slug: "games-for-teens",
  title: "Games for Teens",
  metaTitle: "Games for Teens | Friend Voting Game | FriendRank",
  metaDescription:
    "Create games for teens on FriendRank. Vote anonymously on funny roles, reveal shareable results, and play together from any phone.",
  h1: "Games for Teens",
  intentSummaryTitle: "What are games for teens?",
  intentSummary:
    "Games for teens need to be quick, phone-native, and funny enough to share in the group chat. FriendRank turns hangouts into a browser voting game: add friends, share one link, vote anonymously on teen-life roles, and unlock results together. Works for sleepovers, lunch tables, and Discord servers. No app download or account needed.",
  whyFriendRankTitle: "Why FriendRank works for teen groups",
  exampleQuestionsTitle: "Popular teen group game questions",
  faqTitle: "Games for teens FAQ",
  schemaDescription:
    "Create games for teens with FriendRank. Vote anonymously on funny roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_games_for_teens" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to go viral",
      "Who has the best group chat energy",
      "Who would plan the best hangout",
    ],
    suggestedVibeTags: ["College", "Discord", "Party"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_TEENS_AUDIENCE = {
  heroSubtitle:
    "Make hangouts more fun with a quick teen voting game. Add friends, share one link, vote anonymously, and reveal results in the group chat.",
  playImmediatelyBody:
    "Create a game on FriendRank in under a minute. Share the link in iMessage, Snapchat, or Discord and let everyone vote.",
  exampleQuestionsIntro:
    "Need inspiration? Here are teen group questions your friends can vote on.",
  finalCtaTitle: "Start your teen group game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your friend group chat.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_TEENS_PRIMARY_CTA: LandingPageCta = {
  label: "Create Teen Group Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_TEENS_QUESTIONS = [
  { text: "Who is most likely to go viral on social media?" },
  { text: "Who would plan the best weekend hangout?" },
  { text: "Who is most likely to know everyone's drama?" },
  { text: "Who would pick the best playlist?" },
  { text: "Who is most likely to fall asleep during a movie?" },
  { text: "Who would win a group trivia round?" },
  { text: "Who is most likely to start a trend in the friend group?" },
  { text: "Who would give the best advice?" },
  { text: "Who is most likely to forget their charger?" },
  { text: "Who would organize the group photo?" },
  { text: "Who is most likely to make everyone laugh in class?" },
  { text: "Who would survive a phone-free day?" },
  { text: "Who is most likely to suggest a late-night snack run?" },
  { text: "Who would remember everyone's birthday?" },
  { text: "Who is most likely to suggest playing again tomorrow?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_TEENS_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are teen groups?",
    "answer": "Teen groups on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for high school hangouts, sleepovers, and friend group chats."
  },
  {
    "question": "Can we play teen groups on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_FAMILIES_INTENT = {
  slug: "games-for-families",
  title: "Games for Families",
  metaTitle: "Games for Families | Family Voting Game | FriendRank",
  metaDescription:
    "Create games for families on FriendRank. Vote anonymously on funny family roles, reveal results together, and play from any phone.",
  h1: "Games for Families",
  intentSummaryTitle: "What are games for families?",
  intentSummary:
    "Games for families should work when ages, opinions, and attention spans differ. FriendRank gives relatives a simple browser voting game: add family names, share one link, vote anonymously on funny family roles, and reveal results together at dinner or a holiday gathering. Wholesome enough for cousins and funny enough for siblings. No app download needed.",
  whyFriendRankTitle: "Why FriendRank works for families",
  exampleQuestionsTitle: "Popular family game questions",
  faqTitle: "Games for families FAQ",
  schemaDescription:
    "Create games for families with FriendRank. Vote anonymously on funny family roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_games_for_families" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who tells the best family stories",
      "Who would host the best holiday dinner",
      "Who remembers every birthday",
    ],
    suggestedVibeTags: ["Family", "Party", "College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_FAMILIES_AUDIENCE = {
  heroSubtitle:
    "Make family gatherings more fun with a quick voting game. Add relatives, share one link, vote anonymously, and reveal results together.",
  playImmediatelyBody:
    "Create a game on FriendRank before dinner or during a holiday visit. Share the link and let family members vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are family questions your relatives can vote on.",
  finalCtaTitle: "Start your family game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your next family gathering.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_FAMILIES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Family Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_FAMILIES_QUESTIONS = [
  { text: "Who is most likely to tell the best family story?" },
  { text: "Who would host the best holiday dinner?" },
  { text: "Who is most likely to remember every birthday?" },
  { text: "Who would win a family trivia round?" },
  { text: "Who is most likely to bring the best dessert?" },
  { text: "Who would organize the family photo?" },
  { text: "Who is most likely to start a group chat?" },
  { text: "Who would plan the best reunion?" },
  { text: "Who is most likely to fall asleep after dinner?" },
  { text: "Who would give the best advice to younger cousins?" },
  { text: "Who is most likely to suggest a board game next?" },
  { text: "Who would keep the kids entertained?" },
  { text: "Who is most likely to share old embarrassing photos?" },
  { text: "Who would pick the best holiday playlist?" },
  { text: "Who is most likely to make everyone laugh at the table?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_FAMILIES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are families?",
    "answer": "Families on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for holiday gatherings, family dinners, and reunions."
  },
  {
    "question": "Can we play families on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

/** @see INTENT_VERSION */
export const GAMES_FOR_GROUPS_INTENT = {
  slug: "games-for-groups",
  title: "Games for Groups",
  metaTitle: "Games for Groups | Anonymous Voting Game | FriendRank",
  metaDescription:
    "Create games for groups on FriendRank. Share one link, vote anonymously from phones, and reveal funny group results together in minutes.",
  h1: "Games for Groups",
  intentSummaryTitle: "What are games for groups?",
  intentSummary:
    "Games for groups need one link, zero setup, and results everyone can see together. FriendRank is a browser voting game built for exactly that: add names, share the link in any chat app, vote anonymously on funny roles, and unlock results when enough people have voted. Works for friend groups, events, trips, and any hangout where phones are already out.",
  whyFriendRankTitle: "Why FriendRank works for any group",
  exampleQuestionsTitle: "Popular group game questions",
  faqTitle: "Games for groups FAQ",
  schemaDescription:
    "Create games for groups with FriendRank. Share one link, vote anonymously, and reveal funny group results. No signup required.",
  ctaLocation: "landing_games_for_groups" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who brings the best group energy",
      "Who would plan the next hangout",
      "Who is most likely to start the group chat",
    ],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GAMES_FOR_GROUPS_AUDIENCE = {
  heroSubtitle:
    "Start a group voting game in under a minute. Add names, share one link, vote anonymously, and reveal results together.",
  playImmediatelyBody:
    "Create a game on FriendRank and share the link in WhatsApp, iMessage, Discord, or email. Everyone votes from their phone.",
  exampleQuestionsIntro:
    "Need inspiration? Here are group questions your friends can vote on.",
  finalCtaTitle: "Start your group game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for any hangout.",
} as const;

/** @see CTA_VERSION */
export const GAMES_FOR_GROUPS_PRIMARY_CTA: LandingPageCta = {
  label: "Create Group Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GAMES_FOR_GROUPS_QUESTIONS = [
  { text: "Who is most likely to suggest a group game?" },
  { text: "Who would plan the next hangout?" },
  { text: "Who is most likely to talk to everyone?" },
  { text: "Who would pick the best group playlist?" },
  { text: "Who is most likely to organize the group photo?" },
  { text: "Who would win a group trivia round?" },
  { text: "Who is most likely to send the follow-up text?" },
  { text: "Who would keep the conversation going?" },
  { text: "Who is most likely to make strangers feel welcome?" },
  { text: "Who would rally everyone for one more round?" },
  { text: "Who is most likely to remember everyone's order?" },
  { text: "Who would tell the funniest story?" },
  { text: "Who is most likely to start the inside joke?" },
  { text: "Who would survive the longest road trip?" },
  { text: "Who is most likely to become the group planner?" },
];

/** @see FAQ_VERSION */
export const GAMES_FOR_GROUPS_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are groups?",
    "answer": "Groups on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for friend hangouts, events, trips, and group chats."
  },
  {
    "question": "Can we play groups on phones?",
    "answer": "Yes. FriendRank runs in any modern browser. Share one link and everyone votes from their phones."
  },
  {
    "question": "Is voting anonymous?",
    "answer": "Yes. Votes stay private to each person. The group only sees winners and story-style results."
  },
  {
    "question": "Do players need accounts?",
    "answer": "No signup required. One person creates the game and shares the link."
  },
  {
    "question": "Can I customize the questions?",
    "answer": "Yes. Enter up to three custom prompts when you create the game."
  },
  {
    "question": "Does it work on mobile?",
    "answer": "Yes. Players vote from their phones in any browser."
  },
  {
    "question": "How many people can play?",
    "answer": "Add two to eight names when you set up the game. Everyone with the link can vote."
  },
  {
    "question": "When do results unlock?",
    "answer": "After enough votes are in, results open on the same link for the whole group."
  }
];

export const AUDIENCE_AUTHORITY_PAGE_SLUGS = [
  "games-for-large-groups",
  "games-for-small-groups",
  "games-for-roommates",
  "games-for-college-students",
  "games-for-work-meetings",
  "games-for-remote-teams",
  "friday-team-games",
  "team-lunch-games",
  "long-distance-couple-games",
  "newly-dating-games",
  "married-couple-games",
  "double-date-games",
  "sleepover-games",
  "house-party-games",
  "birthday-party-games",
  "bachelorette-party-games",
  "games-for-adults",
  "games-for-teens",
  "games-for-families",
  "games-for-groups",
] as const;
