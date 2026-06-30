import type { LandingPageFaqItem } from "@/lib/landing-pages/landing-page-types";
import type { LandingPageCta } from "@/lib/landing-pages/landing-page-types";
import type { LandingPageGamePreset } from "@/lib/landing-pages/landing-page-types";
import { CREATE_GAME_HREF } from "@/lib/landing-pages/content/cta-library";
import { INTENT_VERSION } from "@/lib/landing-pages/content/version";
import { AUDIENCE_VERSION } from "@/lib/landing-pages/content/version";
import { FAQ_VERSION } from "@/lib/landing-pages/content/version";
import { QUESTION_VERSION } from "@/lib/landing-pages/content/version";
import { CTA_VERSION } from "@/lib/landing-pages/content/version";

/** Audience authority landing page definitions — Phase 7G Sprint 2. */

/** @see INTENT_VERSION */
export const PREGAME_GAMES_INTENT = {
  slug: "pregame-games",
  title: "Pregame Games",
  metaTitle: "Pregame Games | Phone Voting Before the Party | FriendRank",
  metaDescription:
    "Create pregame games on FriendRank. Warm up the group with anonymous voting, funny roles, and shareable results before the night out.",
  h1: "Pregame Games",
  intentSummaryTitle: "What are pregame games?",
  intentSummary:
    "Pregame games get everyone in the same mood before the real party starts. FriendRank turns the warm-up into a browser voting game: add friends, share one link, vote anonymously on funny pregame roles, and reveal results together while you get ready. Works for house pregames, group chats, and rideshare waits. No app download needed.",
  whyFriendRankTitle: "Why FriendRank works for pregames",
  exampleQuestionsTitle: "Popular pregame game questions",
  faqTitle: "Pregame games FAQ",
  schemaDescription:
    "Create pregame games with FriendRank. Warm up the group with anonymous voting and shareable results before the party. No signup required.",
  ctaLocation: "landing_pregame_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gets ready the fastest",
      "Who picks the best pregame playlist",
      "Who hypes the group up",
    ],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const PREGAME_GAMES_AUDIENCE = {
  heroSubtitle:
    "Start the night with a quick voting game. Add friends, share one link, vote anonymously, and reveal funny pregame roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank while everyone gets ready. Share the link in the group chat and vote before you head out.",
  exampleQuestionsIntro:
    "Need inspiration? Here are pregame questions your group can vote on.",
  finalCtaTitle: "Start your pregame",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the Uber arrives.",
} as const;

/** @see CTA_VERSION */
export const PREGAME_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Pregame Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const PREGAME_GAMES_QUESTIONS = [
  { text: "Who is most likely to suggest one more pregame round?" },
  { text: "Who would pick the best getting-ready playlist?" },
  { text: "Who is most likely to arrive fashionably late?" },
  { text: "Who would hype the group up before leaving?" },
  { text: "Who is most likely to forget something and run back inside?" },
  { text: "Who would take the best pregame selfie?" },
  { text: "Who is most likely to start the group toast early?" },
  { text: "Who would plan the best after-party move?" },
  { text: "Who is most likely to know every bouncer in town?" },
  { text: "Who would win a quick trivia round before heading out?" },
  { text: "Who is most likely to suggest a group photo in the mirror?" },
  { text: "Who would keep the energy up in the rideshare?" },
  { text: "Who is most likely to have the best outfit reveal?" },
  { text: "Who would remember everyone's drink order?" },
  { text: "Who is most likely to make the whole group laugh before you leave?" },
];

/** @see FAQ_VERSION */
export const PREGAME_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are pregame games?",
    "answer": "Pregame games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for house pregames, group chats, and getting-ready hangouts."
  },
  {
    "question": "Can we play pregame games on phones?",
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
export const BOYS_NIGHT_GAMES_INTENT = {
  slug: "boys-night-games",
  title: "Boys Night Games",
  metaTitle: "Boys Night Games | Group Voting Game | FriendRank",
  metaDescription:
    "Create boys night games on FriendRank. Vote anonymously on funny roles, reveal shareable results, and play from any phone.",
  h1: "Boys Night Games",
  intentSummaryTitle: "What are boys night games?",
  intentSummary:
    "Boys night games need to be quick, competitive, and funny without a complicated setup. FriendRank gives your crew a browser voting game: add names, share one link, vote anonymously on classic guys-night roles, and unlock results together. Perfect for watch parties, poker nights, and weekend hangs. No signup required.",
  whyFriendRankTitle: "Why FriendRank works for boys night",
  exampleQuestionsTitle: "Popular boys night game questions",
  faqTitle: "Boys night games FAQ",
  schemaDescription:
    "Create boys night games with FriendRank. Vote anonymously on funny roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_boys_night_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who would win fantasy league trash talk",
      "Who picks the best watch party snacks",
      "Who is most competitive",
    ],
    suggestedVibeTags: ["Party", "Sports", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const BOYS_NIGHT_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make guys night more fun with a quick voting game. Share one link, vote anonymously, and reveal funny results together.",
  playImmediatelyBody:
    "Create a game on FriendRank before kickoff or during halftime. Share the link and let everyone vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are boys night questions your group can vote on.",
  finalCtaTitle: "Start your boys night game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for the next hangout.",
} as const;

/** @see CTA_VERSION */
export const BOYS_NIGHT_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Boys Night Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const BOYS_NIGHT_GAMES_QUESTIONS = [
  { text: "Who is most likely to start a friendly argument?" },
  { text: "Who would win a sports trivia round?" },
  { text: "Who is most likely to suggest ordering food?" },
  { text: "Who would pick the best watch party playlist?" },
  { text: "Who is most likely to fall asleep on the couch first?" },
  { text: "Who would tell the best embarrassing story?" },
  { text: "Who is most likely to challenge someone to a rematch?" },
  { text: "Who would plan the best guys trip?" },
  { text: "Who is most likely to quote a movie no one else remembers?" },
  { text: "Who would dominate a fantasy league trash talk session?" },
  { text: "Who is most likely to suggest one more round?" },
  { text: "Who would fix the Wi-Fi before anyone else?" },
  { text: "Who is most likely to arrive with the best snacks?" },
  { text: "Who would remember every inside joke?" },
  { text: "Who is most likely to make the group laugh the hardest?" },
];

/** @see FAQ_VERSION */
export const BOYS_NIGHT_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are boys night games?",
    "answer": "Boys night games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for guys nights, watch parties, and male friend hangouts."
  },
  {
    "question": "Can we play boys night games on phones?",
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
export const VACATION_GAMES_INTENT = {
  slug: "vacation-games",
  title: "Vacation Games",
  metaTitle: "Vacation Games | Travel Group Voting Game | FriendRank",
  metaDescription:
    "Create vacation games on FriendRank. Vote anonymously on funny travel roles, reveal results together, and play from any phone on your trip.",
  h1: "Vacation Games",
  intentSummaryTitle: "What are vacation games?",
  intentSummary:
    "Vacation games turn travel downtime into something memorable. FriendRank works anywhere with phone signal: create a game, share one link, vote anonymously on trip roles, and reveal results together at the hotel, beach, or airport gate. No board games to pack, no app download required.",
  whyFriendRankTitle: "Why FriendRank works on vacation",
  exampleQuestionsTitle: "Popular vacation game questions",
  faqTitle: "Vacation games FAQ",
  schemaDescription:
    "Create vacation games with FriendRank. Vote anonymously on funny travel roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_vacation_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who would get lost without GPS",
      "Who picks the best vacation playlist",
      "Who finds the best food spot",
    ],
    suggestedVibeTags: ["Party", "College", "Family"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const VACATION_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make your trip more fun with a quick voting game. Share one link, vote anonymously, and reveal funny travel roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank during a flight delay or beach afternoon. Share the link and let the travel group vote.",
  exampleQuestionsIntro:
    "Need inspiration? Here are vacation questions your group can vote on.",
  finalCtaTitle: "Start your vacation game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready anywhere your group travels.",
} as const;

/** @see CTA_VERSION */
export const VACATION_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Vacation Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const VACATION_GAMES_QUESTIONS = [
  { text: "Who is most likely to get sunburned on day one?" },
  { text: "Who would find the best local food spot?" },
  { text: "Who is most likely to oversleep and miss breakfast?" },
  { text: "Who would plan the best day trip?" },
  { text: "Who is most likely to pack too much?" },
  { text: "Who would take the best vacation photos?" },
  { text: "Who is most likely to suggest a spontaneous adventure?" },
  { text: "Who would navigate without GPS the longest?" },
  { text: "Who is most likely to lose their room key?" },
  { text: "Who would win a travel trivia round?" },
  { text: "Who is most likely to suggest a group photo at every stop?" },
  { text: "Who would remember everyone's flight details?" },
  { text: "Who is most likely to bargain at a market?" },
  { text: "Who would pick the best pool playlist?" },
  { text: "Who is most likely to make the whole trip funnier?" },
];

/** @see FAQ_VERSION */
export const VACATION_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are vacation games?",
    "answer": "Vacation games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for friend trips, beach vacations, and travel group chats."
  },
  {
    "question": "Can we play vacation games on phones?",
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
export const ROAD_TRIP_GAMES_INTENT = {
  slug: "road-trip-games",
  title: "Road Trip Games",
  metaTitle: "Road Trip Games | Car Voting Game | FriendRank",
  metaDescription:
    "Create road trip games on FriendRank. Passengers vote anonymously on phones, reveal funny roles, and play together mile by mile.",
  h1: "Road Trip Games",
  intentSummaryTitle: "What are road trip games?",
  intentSummary:
    "Road trip games break up long drives without distracting the driver. FriendRank runs on phones in the back seat: add names, share one link, vote anonymously on road-trip roles, and reveal results at the next rest stop. Funny enough to kill an hour, simple enough to start in under a minute.",
  whyFriendRankTitle: "Why FriendRank works for road trips",
  exampleQuestionsTitle: "Popular road trip game questions",
  faqTitle: "Road trip games FAQ",
  schemaDescription:
    "Create road trip games with FriendRank. Passengers vote anonymously and reveal shareable results. No signup required.",
  ctaLocation: "landing_road_trip_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who picks the road trip playlist",
      "Who needs the most bathroom breaks",
      "Who navigates best",
    ],
    suggestedVibeTags: ["College", "Family", "Party"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const ROAD_TRIP_GAMES_AUDIENCE = {
  heroSubtitle:
    "Pass the miles with a quick voting game. Share one link, vote anonymously, and reveal funny road trip roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank when you hit the highway. Passengers vote from their phones while the playlist runs.",
  exampleQuestionsIntro:
    "Need inspiration? Here are road trip questions your crew can vote on.",
  finalCtaTitle: "Start your road trip game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for the next rest stop.",
} as const;

/** @see CTA_VERSION */
export const ROAD_TRIP_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Road Trip Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const ROAD_TRIP_GAMES_QUESTIONS = [
  { text: "Who is most likely to need the most bathroom breaks?" },
  { text: "Who would pick the best road trip playlist?" },
  { text: "Who is most likely to fall asleep first in the car?" },
  { text: "Who would navigate without looking at the phone?" },
  { text: "Who is most likely to bring the best snacks?" },
  { text: "Who would suggest the weirdest detour?" },
  { text: "Who is most likely to sing every lyric wrong?" },
  { text: "Who would win a license-plate spotting game?" },
  { text: "Who is most likely to spill a drink in the car?" },
  { text: "Who would tell the best story on a long drive?" },
  { text: "Who is most likely to suggest stopping for food?" },
  { text: "Who would remember every turn?" },
  { text: "Who is most likely to get car sick?" },
  { text: "Who would take the best window selfie?" },
  { text: "Who is most likely to make the drive feel shorter?" },
];

/** @see FAQ_VERSION */
export const ROAD_TRIP_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are road trip games?",
    "answer": "Road trip games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for long drives, carpools, and back-seat hangouts."
  },
  {
    "question": "Can we play road trip games on phones?",
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
export const CLASSROOM_GAMES_INTENT = {
  slug: "classroom-games",
  title: "Classroom Games",
  metaTitle: "Classroom Games | Student Voting Activity | FriendRank",
  metaDescription:
    "Create classroom games on FriendRank. Quick anonymous voting for students — reveal funny roles and share results together in class.",
  h1: "Classroom Games",
  intentSummaryTitle: "What are classroom games?",
  intentSummary:
    "Classroom games should be inclusive, quick, and easy to run without extra equipment. FriendRank turns any lesson break into a phone voting activity: add student names, share one link, vote anonymously on light classroom roles, and reveal results together. Works for first-day icebreakers, end-of-term fun, and group projects. No accounts required.",
  whyFriendRankTitle: "Why FriendRank works in classrooms",
  exampleQuestionsTitle: "Popular classroom game questions",
  faqTitle: "Classroom games FAQ",
  schemaDescription:
    "Create classroom games with FriendRank. Students vote anonymously on phones and reveal shareable results. No signup required.",
  ctaLocation: "landing_classroom_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who asks the best questions",
      "Who helps classmates first",
      "Who keeps the class laughing",
    ],
    suggestedVibeTags: ["School", "College", "Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const CLASSROOM_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make class more engaging with a quick voting game. Share one link, vote anonymously, and reveal funny classroom roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank at the start of class or during a break. Students vote from their phones in under five minutes.",
  exampleQuestionsIntro:
    "Need inspiration? Here are classroom questions your students can vote on.",
  finalCtaTitle: "Start your classroom game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the bell rings.",
} as const;

/** @see CTA_VERSION */
export const CLASSROOM_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Classroom Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const CLASSROOM_GAMES_QUESTIONS = [
  { text: "Who is most likely to raise their hand first?" },
  { text: "Who would win a class trivia round?" },
  { text: "Who is most likely to help a classmate?" },
  { text: "Who would organize the study group?" },
  { text: "Who is most likely to forget their homework?" },
  { text: "Who would give the best presentation?" },
  { text: "Who is most likely to make the class laugh?" },
  { text: "Who would remember every due date?" },
  { text: "Who is most likely to volunteer for a demo?" },
  { text: "Who would pick the best group project idea?" },
  { text: "Who is most likely to ask a thoughtful question?" },
  { text: "Who would keep the group on task?" },
  { text: "Who is most likely to share their notes?" },
  { text: "Who would win teacher's helper for a day?" },
  { text: "Who is most likely to suggest playing again?" },
];

/** @see FAQ_VERSION */
export const CLASSROOM_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are classroom games?",
    "answer": "Classroom games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for school classes, study groups, and teacher-led activities."
  },
  {
    "question": "Can we play classroom games on phones?",
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
export const HIGH_SCHOOL_GAMES_INTENT = {
  slug: "high-school-games",
  title: "High School Games",
  metaTitle: "High School Games | Teen Voting Game | FriendRank",
  metaDescription:
    "Create high school games on FriendRank. Vote anonymously on funny roles, reveal shareable results, and play together from any phone.",
  h1: "High School Games",
  intentSummaryTitle: "What are high school games?",
  intentSummary:
    "High school games work best when they are phone-native and shareable in the group chat. FriendRank gives teen friend groups a browser voting game: add names, share one link, vote anonymously on high-school-life roles, and unlock results together at lunch or after school. No app download or account needed.",
  whyFriendRankTitle: "Why FriendRank works for high school groups",
  exampleQuestionsTitle: "Popular high school game questions",
  faqTitle: "High school games FAQ",
  schemaDescription:
    "Create high school games with FriendRank. Vote anonymously on funny roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_high_school_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to become class president",
      "Who has the best group chat memes",
      "Who would plan prom",
    ],
    suggestedVibeTags: ["School", "College", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const HIGH_SCHOOL_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make lunch or after-school hangs more fun with a quick voting game. Share one link and vote anonymously together.",
  playImmediatelyBody:
    "Create a game on FriendRank between classes or after school. Share the link in the group chat and let everyone vote.",
  exampleQuestionsIntro:
    "Need inspiration? Here are high school questions your friends can vote on.",
  finalCtaTitle: "Start your high school game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your friend group chat.",
} as const;

/** @see CTA_VERSION */
export const HIGH_SCHOOL_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create High School Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const HIGH_SCHOOL_GAMES_QUESTIONS = [
  { text: "Who is most likely to become class president?" },
  { text: "Who would plan the best promposal?" },
  { text: "Who is most likely to know everyone's drama?" },
  { text: "Who would pick the best lunch table playlist?" },
  { text: "Who is most likely to ace a pop quiz?" },
  { text: "Who would organize the friend group photo?" },
  { text: "Who is most likely to fall asleep in class?" },
  { text: "Who would win a school spirit contest?" },
  { text: "Who is most likely to start a trend?" },
  { text: "Who would give the best advice?" },
  { text: "Who is most likely to forget their locker combo?" },
  { text: "Who would survive finals week on snacks alone?" },
  { text: "Who is most likely to make everyone laugh in the hallway?" },
  { text: "Who would plan the best weekend hangout?" },
  { text: "Who is most likely to become a meme in the group chat?" },
];

/** @see FAQ_VERSION */
export const HIGH_SCHOOL_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are high school games?",
    "answer": "High school games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for teen friend groups, lunch tables, and after-school hangouts."
  },
  {
    "question": "Can we play high school games on phones?",
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
export const MIDDLE_SCHOOL_GAMES_INTENT = {
  slug: "middle-school-games",
  title: "Middle School Games",
  metaTitle: "Middle School Games | Fun Group Vote | FriendRank",
  metaDescription:
    "Create middle school games on FriendRank. Wholesome anonymous voting, funny roles, and shareable results for younger groups.",
  h1: "Middle School Games",
  intentSummaryTitle: "What are middle school games?",
  intentSummary:
    "Middle school games should be fun, inclusive, and easy to start during lunch or at a sleepover. FriendRank gives younger groups a browser voting game: add names, share one link, vote anonymously on silly roles, and reveal results together. Wholesome enough for school friends, funny enough to share in the group chat.",
  whyFriendRankTitle: "Why FriendRank works for middle school groups",
  exampleQuestionsTitle: "Popular middle school game questions",
  faqTitle: "Middle school games FAQ",
  schemaDescription:
    "Create middle school games with FriendRank. Wholesome anonymous voting with shareable results. No signup required.",
  ctaLocation: "landing_middle_school_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the best team player",
      "Who makes everyone laugh",
      "Who remembers everyone's birthday",
    ],
    suggestedVibeTags: ["School", "Family", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const MIDDLE_SCHOOL_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make hangouts more fun with a quick voting game. Add friends, share one link, vote anonymously, and reveal results together.",
  playImmediatelyBody:
    "Create a game on FriendRank at lunch or during a sleepover. Share the link and let everyone vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are middle school questions your group can vote on.",
  finalCtaTitle: "Start your middle school game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for your friend group.",
} as const;

/** @see CTA_VERSION */
export const MIDDLE_SCHOOL_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Middle School Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const MIDDLE_SCHOOL_GAMES_QUESTIONS = [
  { text: "Who is most likely to make everyone laugh at lunch?" },
  { text: "Who would win a class trivia round?" },
  { text: "Who is most likely to share their snacks?" },
  { text: "Who would organize the group photo?" },
  { text: "Who is most likely to help a friend with homework?" },
  { text: "Who would pick the best playlist?" },
  { text: "Who is most likely to forget their gym clothes?" },
  { text: "Who would plan the best sleepover?" },
  { text: "Who is most likely to know everyone's favorite game?" },
  { text: "Who would keep the group together?" },
  { text: "Who is most likely to volunteer first?" },
  { text: "Who would tell the funniest story?" },
  { text: "Who is most likely to start an inside joke?" },
  { text: "Who would remember every friend's birthday?" },
  { text: "Who is most likely to suggest playing again?" },
];

/** @see FAQ_VERSION */
export const MIDDLE_SCHOOL_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are middle school games?",
    "answer": "Middle school games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for school lunches, youth hangouts, and younger friend groups."
  },
  {
    "question": "Can we play middle school games on phones?",
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
export const STUDENT_ORIENTATION_GAMES_INTENT = {
  slug: "student-orientation-games",
  title: "Student Orientation Games",
  metaTitle: "Student Orientation Games | Campus Icebreaker | FriendRank",
  metaDescription:
    "Create student orientation games on FriendRank. Help new students connect with anonymous voting and shareable results in minutes.",
  h1: "Student Orientation Games",
  intentSummaryTitle: "What are student orientation games?",
  intentSummary:
    "Student orientation games help new classmates connect without awkward small talk. FriendRank gives orientation leaders a five-minute activity: add names, share one link, vote anonymously on light campus roles, and reveal results together. Works for dorm meetups, club fairs, and first-week seminars. No signup required.",
  whyFriendRankTitle: "Why FriendRank works for orientation",
  exampleQuestionsTitle: "Popular orientation game questions",
  faqTitle: "Student orientation games FAQ",
  schemaDescription:
    "Create student orientation games with FriendRank. New students vote anonymously and reveal shareable results. No signup required.",
  ctaLocation: "landing_student_orientation_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who would join the most clubs",
      "Who makes friends fastest",
      "Who knows campus already",
    ],
    suggestedVibeTags: ["College", "School", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const STUDENT_ORIENTATION_GAMES_AUDIENCE = {
  heroSubtitle:
    "Help new students connect with a quick voting game. Share one link, vote anonymously, and reveal funny roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank during orientation week. Share the link in the dorm chat or seminar room and let everyone vote.",
  exampleQuestionsIntro:
    "Need inspiration? Here are orientation questions new students can vote on.",
  finalCtaTitle: "Start your orientation game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for welcome week.",
} as const;

/** @see CTA_VERSION */
export const STUDENT_ORIENTATION_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Orientation Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const STUDENT_ORIENTATION_GAMES_QUESTIONS = [
  { text: "Who is most likely to join five clubs at once?" },
  { text: "Who would make friends in the first hour?" },
  { text: "Who is most likely to get lost on campus?" },
  { text: "Who would win an orientation trivia round?" },
  { text: "Who is most likely to remember everyone's name?" },
  { text: "Who would plan the first weekend hangout?" },
  { text: "Who is most likely to ask the best question?" },
  { text: "Who would organize the dorm group chat?" },
  { text: "Who is most likely to explore campus first?" },
  { text: "Who would give the best campus tips?" },
  { text: "Who is most likely to become orientation friends forever?" },
  { text: "Who would pick the best dining hall order?" },
  { text: "Who is most likely to suggest a study group?" },
  { text: "Who would take the best welcome-week photos?" },
  { text: "Who is most likely to make orientation less awkward?" },
];

/** @see FAQ_VERSION */
export const STUDENT_ORIENTATION_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are student orientation games?",
    "answer": "Student orientation games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for welcome week, dorm meetups, and new student seminars."
  },
  {
    "question": "Can we play student orientation games on phones?",
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
export const NEW_EMPLOYEE_GAMES_INTENT = {
  slug: "new-employee-games",
  title: "New Employee Games",
  metaTitle: "New Employee Games | Welcome Week Icebreaker | FriendRank",
  metaDescription:
    "Create new employee games on FriendRank. Welcome new hires with anonymous voting, light roles, and shareable results in minutes.",
  h1: "New Employee Games",
  intentSummaryTitle: "What are new employee games?",
  intentSummary:
    "New employee games help hires feel welcome without forced awkwardness. FriendRank gives managers a quick browser activity: add team names, share one link, vote anonymously on light workplace roles, and reveal results together during welcome week. Professional enough for HR, fun enough that people participate.",
  whyFriendRankTitle: "Why FriendRank works for new employees",
  exampleQuestionsTitle: "Popular new employee game questions",
  faqTitle: "New employee games FAQ",
  schemaDescription:
    "Create new employee games with FriendRank. Welcome new hires with anonymous voting and shareable results. No signup required.",
  ctaLocation: "landing_new_employee_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who learns the office map fastest",
      "Who asks the best questions",
      "Who brings the best lunch",
    ],
    suggestedVibeTags: ["Office", "College", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const NEW_EMPLOYEE_GAMES_AUDIENCE = {
  heroSubtitle:
    "Welcome new hires with a quick voting game. Share one link, vote anonymously, and reveal light results together.",
  playImmediatelyBody:
    "Create a game on FriendRank during a welcome session. Share the link in Slack or the onboarding calendar invite.",
  exampleQuestionsIntro:
    "Need inspiration? Here are new employee questions your team can vote on.",
  finalCtaTitle: "Start your new employee game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for welcome week.",
} as const;

/** @see CTA_VERSION */
export const NEW_EMPLOYEE_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create New Employee Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const NEW_EMPLOYEE_GAMES_QUESTIONS = [
  { text: "Who is most likely to learn everyone's name first?" },
  { text: "Who would ask the best onboarding question?" },
  { text: "Who is most likely to find the best lunch spot?" },
  { text: "Who would win a company trivia round?" },
  { text: "Who is most likely to set up their desk perfectly?" },
  { text: "Who would mentor a fellow new hire?" },
  { text: "Who is most likely to join every optional social?" },
  { text: "Who would remember every process detail?" },
  { text: "Who is most likely to make the team laugh?" },
  { text: "Who would organize a new-hire coffee chat?" },
  { text: "Who is most likely to suggest a team lunch?" },
  { text: "Who would navigate Slack the fastest?" },
  { text: "Who is most likely to volunteer for a project?" },
  { text: "Who would give the best first-week impression?" },
  { text: "Who is most likely to feel at home by day three?" },
];

/** @see FAQ_VERSION */
export const NEW_EMPLOYEE_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are new employee games?",
    "answer": "New employee games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for welcome week, onboarding sessions, and first-day meetings."
  },
  {
    "question": "Can we play new employee games on phones?",
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
export const ONBOARDING_GAMES_INTENT = {
  slug: "onboarding-games",
  title: "Onboarding Games",
  metaTitle: "Onboarding Games | HR Team Icebreaker | FriendRank",
  metaDescription:
    "Create onboarding games on FriendRank. Structured anonymous voting for new hires — reveal results together in under five minutes.",
  h1: "Onboarding Games",
  intentSummaryTitle: "What are onboarding games?",
  intentSummary:
    "Onboarding games break up policy slides with something human. FriendRank fits structured onboarding agendas: create a game, share one link in the onboarding portal or meeting chat, vote anonymously on light roles, and reveal results before the next module. Scales from small teams to cohort onboarding without extra tools.",
  whyFriendRankTitle: "Why FriendRank works for onboarding",
  exampleQuestionsTitle: "Popular onboarding game questions",
  faqTitle: "Onboarding games FAQ",
  schemaDescription:
    "Create onboarding games with FriendRank. Structured anonymous voting for new hire cohorts. No signup required.",
  ctaLocation: "landing_onboarding_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who completes training first",
      "Who asks clarifying questions",
      "Who connects teammates",
    ],
    suggestedVibeTags: ["Office", "College", "Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const ONBOARDING_GAMES_AUDIENCE = {
  heroSubtitle:
    "Break up onboarding with a quick voting game. Share one link, vote anonymously, and reveal light results together.",
  playImmediatelyBody:
    "Create a game on FriendRank between onboarding modules. Drop the link in the cohort chat and let everyone vote in five minutes.",
  exampleQuestionsIntro:
    "Need inspiration? Here are onboarding questions your cohort can vote on.",
  finalCtaTitle: "Start your onboarding game",
  finalCtaSubtitle:
    "Free, browser-based, and ready for your next cohort session.",
} as const;

/** @see CTA_VERSION */
export const ONBOARDING_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Onboarding Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const ONBOARDING_GAMES_QUESTIONS = [
  { text: "Who is most likely to finish training modules early?" },
  { text: "Who would ask the clearest clarifying question?" },
  { text: "Who is most likely to connect two teammates?" },
  { text: "Who would win an onboarding scavenger hunt?" },
  { text: "Who is most likely to remember every policy detail?" },
  { text: "Who would suggest the best team intro format?" },
  { text: "Who is most likely to share helpful tips in chat?" },
  { text: "Who would organize a cohort lunch?" },
  { text: "Who is most likely to make onboarding fun?" },
  { text: "Who would give the best elevator pitch?" },
  { text: "Who is most likely to volunteer for a demo?" },
  { text: "Who would help troubleshoot IT setup?" },
  { text: "Who is most likely to send a welcome message first?" },
  { text: "Who would plan the best cohort social?" },
  { text: "Who is most likely to stay engaged through the last slide?" },
];

/** @see FAQ_VERSION */
export const ONBOARDING_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are onboarding games?",
    "answer": "Onboarding games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for HR onboarding cohorts, people ops sessions, and new-hire training."
  },
  {
    "question": "Can we play onboarding games on phones?",
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
export const WORKSHOP_GAMES_INTENT = {
  slug: "workshop-games",
  title: "Workshop Games",
  metaTitle: "Workshop Games | Training Session Icebreaker | FriendRank",
  metaDescription:
    "Create workshop games on FriendRank. Warm up training sessions with anonymous voting and shareable results in minutes.",
  h1: "Workshop Games",
  intentSummaryTitle: "What are workshop games?",
  intentSummary:
    "Workshop games help facilitators warm up a room before deep work begins. FriendRank gives trainers a browser icebreaker: add participant names, share one link, vote anonymously on workshop roles, and reveal results together before the first exercise. Works in-person and on hybrid calls. No extra apps required.",
  whyFriendRankTitle: "Why FriendRank works for workshops",
  exampleQuestionsTitle: "Popular workshop game questions",
  faqTitle: "Workshop games FAQ",
  schemaDescription:
    "Create workshop games with FriendRank. Warm up training sessions with anonymous voting. No signup required.",
  ctaLocation: "landing_workshop_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who asks the first question",
      "Who keeps the energy up",
      "Who summarizes best",
    ],
    suggestedVibeTags: ["Office", "College", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const WORKSHOP_GAMES_AUDIENCE = {
  heroSubtitle:
    "Warm up your workshop with a quick voting game. Share one link, vote anonymously, and reveal results before the agenda starts.",
  playImmediatelyBody:
    "Create a game on FriendRank before your workshop begins. Share the link on the room screen or in the session chat.",
  exampleQuestionsIntro:
    "Need inspiration? Here are workshop questions participants can vote on.",
  finalCtaTitle: "Start your workshop game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the first slide.",
} as const;

/** @see CTA_VERSION */
export const WORKSHOP_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Workshop Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const WORKSHOP_GAMES_QUESTIONS = [
  { text: "Who is most likely to ask the first question?" },
  { text: "Who would summarize the session best?" },
  { text: "Who is most likely to keep the energy up after lunch?" },
  { text: "Who would win a workshop trivia round?" },
  { text: "Who is most likely to suggest a great breakout idea?" },
  { text: "Who would take the best notes?" },
  { text: "Who is most likely to connect with every table?" },
  { text: "Who would facilitate the best discussion?" },
  { text: "Who is most likely to share a useful resource?" },
  { text: "Who would organize the group photo?" },
  { text: "Who is most likely to volunteer for a demo?" },
  { text: "Who would give the most thoughtful feedback?" },
  { text: "Who is most likely to stay until the last Q&A?" },
  { text: "Who would plan the best follow-up?" },
  { text: "Who is most likely to make the workshop memorable?" },
];

/** @see FAQ_VERSION */
export const WORKSHOP_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are workshop games?",
    "answer": "Workshop games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for training sessions, offsites, and facilitator-led workshops."
  },
  {
    "question": "Can we play workshop games on phones?",
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
export const CONFERENCE_ICEBREAKER_GAMES_INTENT = {
  slug: "conference-icebreaker-games",
  title: "Conference Icebreaker Games",
  metaTitle: "Conference Icebreaker Games | Event Voting Activity | FriendRank",
  metaDescription:
    "Create conference icebreaker games on FriendRank. Large groups vote anonymously on phones and reveal results together before sessions start.",
  h1: "Conference Icebreaker Games",
  intentSummaryTitle: "What are conference icebreaker games?",
  intentSummary:
    "Conference icebreaker games help strangers connect before sessions begin. FriendRank scales to big rooms without passing a mic: create a game, display the link on screen, vote anonymously on light conference roles, and reveal results together in the opening minutes. Works for networking breaks, summits, and company conferences.",
  whyFriendRankTitle: "Why FriendRank works at conferences",
  exampleQuestionsTitle: "Popular conference icebreaker questions",
  faqTitle: "Conference icebreaker games FAQ",
  schemaDescription:
    "Create conference icebreaker games with FriendRank. Large groups vote anonymously on phones. No signup required.",
  ctaLocation: "landing_conference_icebreaker_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who networks with everyone",
      "Who asks the best session question",
      "Who collects the most badges",
    ],
    suggestedVibeTags: ["Office", "Party", "College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const CONFERENCE_ICEBREAKER_GAMES_AUDIENCE = {
  heroSubtitle:
    "Break the ice at your conference with a quick voting game. Share one link, vote anonymously, and reveal results together.",
  playImmediatelyBody:
    "Create a game on FriendRank before the keynote. Put the link on screen and let attendees vote during the opening minutes.",
  exampleQuestionsIntro:
    "Need inspiration? Here are conference questions attendees can vote on.",
  finalCtaTitle: "Start your conference icebreaker",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the first session.",
} as const;

/** @see CTA_VERSION */
export const CONFERENCE_ICEBREAKER_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Conference Icebreaker",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const CONFERENCE_ICEBREAKER_GAMES_QUESTIONS = [
  { text: "Who is most likely to talk to every table?" },
  { text: "Who would ask the best session question?" },
  { text: "Who is most likely to collect every swag item?" },
  { text: "Who would win a conference trivia round?" },
  { text: "Who is most likely to schedule the most coffee chats?" },
  { text: "Who would take the best event photos?" },
  { text: "Who is most likely to suggest the best after-party?" },
  { text: "Who would remember every speaker's name?" },
  { text: "Who is most likely to live-tweet the keynote?" },
  { text: "Who would organize a dinner group?" },
  { text: "Who is most likely to arrive early every day?" },
  { text: "Who would give the best elevator pitch?" },
  { text: "Who is most likely to connect two strangers?" },
  { text: "Who would summarize the best session takeaway?" },
  { text: "Who is most likely to make the conference fun?" },
];

/** @see FAQ_VERSION */
export const CONFERENCE_ICEBREAKER_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are conference icebreaker games?",
    "answer": "Conference icebreaker games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for summits, networking events, and large professional gatherings."
  },
  {
    "question": "Can we play conference icebreaker games on phones?",
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
export const FAMILY_REUNION_GAMES_INTENT = {
  slug: "family-reunion-games",
  title: "Family Reunion Games",
  metaTitle: "Family Reunion Games | Multi-Gen Voting Game | FriendRank",
  metaDescription:
    "Create family reunion games on FriendRank. Relatives vote anonymously on phones, reveal funny family roles, and play together at the reunion.",
  h1: "Family Reunion Games",
  intentSummaryTitle: "What are family reunion games?",
  intentSummary:
    "Family reunion games bring cousins, aunts, and grandparents into the same activity. FriendRank runs on every phone at the picnic: add family names, share one link, vote anonymously on funny reunion roles, and reveal results together before dessert. Wholesome enough for all ages, funny enough to become a new tradition.",
  whyFriendRankTitle: "Why FriendRank works for family reunions",
  exampleQuestionsTitle: "Popular family reunion game questions",
  faqTitle: "Family reunion games FAQ",
  schemaDescription:
    "Create family reunion games with FriendRank. Relatives vote anonymously and reveal shareable results. No signup required.",
  ctaLocation: "landing_family_reunion_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who tells the best family stories",
      "Who brings the best dish",
      "Who organizes the group photo",
    ],
    suggestedVibeTags: ["Family", "Party", "College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const FAMILY_REUNION_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make the reunion more fun with a quick voting game. Share one link, vote anonymously, and reveal funny family roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank when relatives arrive. Share the link at the picnic table and let everyone vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are family reunion questions your relatives can vote on.",
  finalCtaTitle: "Start your family reunion game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for the whole family.",
} as const;

/** @see CTA_VERSION */
export const FAMILY_REUNION_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Family Reunion Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const FAMILY_REUNION_GAMES_QUESTIONS = [
  { text: "Who is most likely to tell the best family story?" },
  { text: "Who would bring the best potluck dish?" },
  { text: "Who is most likely to organize the group photo?" },
  { text: "Who would win a family trivia round?" },
  { text: "Who is most likely to remember every cousin's name?" },
  { text: "Who would plan the next reunion?" },
  { text: "Who is most likely to start the group chat?" },
  { text: "Who would keep the kids entertained?" },
  { text: "Who is most likely to share old photos?" },
  { text: "Who would give the best toast?" },
  { text: "Who is most likely to stay until cleanup?" },
  { text: "Who would pick the best reunion playlist?" },
  { text: "Who is most likely to teach a family game?" },
  { text: "Who would reconnect the most relatives?" },
  { text: "Who is most likely to make everyone laugh at dinner?" },
];

/** @see FAQ_VERSION */
export const FAMILY_REUNION_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are family reunion games?",
    "answer": "Family reunion games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for extended family picnics, reunion weekends, and multi-gen gatherings."
  },
  {
    "question": "Can we play family reunion games on phones?",
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
export const HOLIDAY_FAMILY_GAMES_INTENT = {
  slug: "holiday-family-games",
  title: "Holiday Family Games",
  metaTitle: "Holiday Family Games | Seasonal Voting Game | FriendRank",
  metaDescription:
    "Create holiday family games on FriendRank. Vote anonymously on funny seasonal roles and reveal results together at your holiday gathering.",
  h1: "Holiday Family Games",
  intentSummaryTitle: "What are holiday family games?",
  intentSummary:
    "Holiday family games add something fresh to traditions without replacing them. FriendRank gives relatives a browser voting game between meals: add names, share one link, vote anonymously on holiday roles, and reveal results together in the living room. Works for any seasonal gathering when phones are already out.",
  whyFriendRankTitle: "Why FriendRank works for holiday gatherings",
  exampleQuestionsTitle: "Popular holiday family game questions",
  faqTitle: "Holiday family games FAQ",
  schemaDescription:
    "Create holiday family games with FriendRank. Vote anonymously on funny seasonal roles. No signup required.",
  ctaLocation: "landing_holiday_family_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who decorates the most",
      "Who picks the best holiday playlist",
      "Who tells the best seasonal stories",
    ],
    suggestedVibeTags: ["Family", "Party", "College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const HOLIDAY_FAMILY_GAMES_AUDIENCE = {
  heroSubtitle:
    "Add a new tradition with a quick holiday voting game. Share one link, vote anonymously, and reveal funny results together.",
  playImmediatelyBody:
    "Create a game on FriendRank after dinner or during a lull. Share the link and let relatives vote from the couch.",
  exampleQuestionsIntro:
    "Need inspiration? Here are holiday family questions your relatives can vote on.",
  finalCtaTitle: "Start your holiday family game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for this year's gathering.",
} as const;

/** @see CTA_VERSION */
export const HOLIDAY_FAMILY_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Holiday Family Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const HOLIDAY_FAMILY_GAMES_QUESTIONS = [
  { text: "Who is most likely to go overboard on decorations?" },
  { text: "Who would pick the best holiday playlist?" },
  { text: "Who is most likely to tell the best seasonal story?" },
  { text: "Who would win a holiday trivia round?" },
  { text: "Who is most likely to burn the cookies?" },
  { text: "Who would organize the family photo?" },
  { text: "Who is most likely to fall asleep after dinner?" },
  { text: "Who would give the best gift?" },
  { text: "Who is most likely to start a sing-along?" },
  { text: "Who would remember every relative's dietary restriction?" },
  { text: "Who is most likely to suggest a group game?" },
  { text: "Who would keep the kids busy?" },
  { text: "Who is most likely to share old holiday photos?" },
  { text: "Who would plan next year's gathering?" },
  { text: "Who is most likely to make the holiday feel special?" },
];

/** @see FAQ_VERSION */
export const HOLIDAY_FAMILY_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are holiday family games?",
    "answer": "Holiday family games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for seasonal family gatherings, holiday dinners, and visiting relatives."
  },
  {
    "question": "Can we play holiday family games on phones?",
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
export const CHRISTMAS_FAMILY_GAMES_INTENT = {
  slug: "christmas-family-games",
  title: "Christmas Family Games",
  metaTitle: "Christmas Family Games | Holiday Voting Game | FriendRank",
  metaDescription:
    "Create Christmas family games on FriendRank. Vote anonymously on funny holiday roles and reveal results together on Christmas Day.",
  h1: "Christmas Family Games",
  intentSummaryTitle: "What are Christmas family games?",
  intentSummary:
    "Christmas family games give everyone something to do between presents and dinner. FriendRank turns Christmas Day into a phone voting game: add family names, share one link, vote anonymously on festive roles, and reveal results together by the tree. No board games to unwrap, no accounts required.",
  whyFriendRankTitle: "Why FriendRank works on Christmas",
  exampleQuestionsTitle: "Popular Christmas family game questions",
  faqTitle: "Christmas family games FAQ",
  schemaDescription:
    "Create Christmas family games with FriendRank. Vote anonymously on festive roles and reveal shareable results. No signup required.",
  ctaLocation: "landing_christmas_family_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who wraps gifts the messiest",
      "Who loves Christmas music most",
      "Who eats the most cookies",
    ],
    suggestedVibeTags: ["Family", "Party", "College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const CHRISTMAS_FAMILY_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make Christmas Day more fun with a quick voting game. Share one link, vote anonymously, and reveal festive results together.",
  playImmediatelyBody:
    "Create a game on FriendRank after presents or before dinner. Share the link and let relatives vote from the living room.",
  exampleQuestionsIntro:
    "Need inspiration? Here are Christmas questions your family can vote on.",
  finalCtaTitle: "Start your Christmas family game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the cookies come out.",
} as const;

/** @see CTA_VERSION */
export const CHRISTMAS_FAMILY_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Christmas Family Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const CHRISTMAS_FAMILY_GAMES_QUESTIONS = [
  { text: "Who is most likely to shake presents before Christmas?" },
  { text: "Who would pick the best Christmas playlist?" },
  { text: "Who is most likely to eat the most cookies?" },
  { text: "Who would win a Christmas trivia round?" },
  { text: "Who is most likely to wear the ugliest sweater proudly?" },
  { text: "Who would give the most thoughtful gift?" },
  { text: "Who is most likely to fall asleep during a Christmas movie?" },
  { text: "Who would organize the family photo by the tree?" },
  { text: "Who is most likely to sing every carol?" },
  { text: "Who would decorate the tree the fastest?" },
  { text: "Who is most likely to burn the roast?" },
  { text: "Who would remember every stocking?" },
  { text: "Who is most likely to start a snowball fight?" },
  { text: "Who would tell the best Christmas story?" },
  { text: "Who is most likely to make the whole room laugh?" },
];

/** @see FAQ_VERSION */
export const CHRISTMAS_FAMILY_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are Christmas family games?",
    "answer": "Christmas family games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for Christmas Day gatherings, family dinners, and holiday visits."
  },
  {
    "question": "Can we play Christmas family games on phones?",
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
export const THANKSGIVING_GAMES_INTENT = {
  slug: "thanksgiving-games",
  title: "Thanksgiving Games",
  metaTitle: "Thanksgiving Games | Holiday Dinner Voting Game | FriendRank",
  metaDescription:
    "Create Thanksgiving games on FriendRank. Vote anonymously on funny holiday roles and reveal results together at the dinner table.",
  h1: "Thanksgiving Games",
  intentSummaryTitle: "What are Thanksgiving games?",
  intentSummary:
    "Thanksgiving games keep the table laughing between courses. FriendRank gives your gathering a browser voting game: add names, share one link, vote anonymously on Thanksgiving roles, and reveal results together before pie. Works for family dinners, Friendsgiving, and big holiday tables.",
  whyFriendRankTitle: "Why FriendRank works on Thanksgiving",
  exampleQuestionsTitle: "Popular Thanksgiving game questions",
  faqTitle: "Thanksgiving games FAQ",
  schemaDescription:
    "Create Thanksgiving games with FriendRank. Vote anonymously on funny holiday roles. No signup required.",
  ctaLocation: "landing_thanksgiving_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who eats the most pie",
      "Who falls asleep after dinner",
      "Who gives the best toast",
    ],
    suggestedVibeTags: ["Family", "Party", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const THANKSGIVING_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make Thanksgiving dinner more fun with a quick voting game. Share one link, vote anonymously, and reveal results at the table.",
  playImmediatelyBody:
    "Create a game on FriendRank while the turkey rests. Share the link and let everyone vote from their phones at the table.",
  exampleQuestionsIntro:
    "Need inspiration? Here are Thanksgiving questions your group can vote on.",
  finalCtaTitle: "Start your Thanksgiving game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before dessert.",
} as const;

/** @see CTA_VERSION */
export const THANKSGIVING_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Thanksgiving Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const THANKSGIVING_GAMES_QUESTIONS = [
  { text: "Who is most likely to eat the most pie?" },
  { text: "Who would give the best gratitude toast?" },
  { text: "Who is most likely to fall asleep after dinner?" },
  { text: "Who would win a Thanksgiving trivia round?" },
  { text: "Who is most likely to burn the rolls?" },
  { text: "Who would organize the group photo?" },
  { text: "Who is most likely to start the food debate?" },
  { text: "Who would remember everyone's dietary needs?" },
  { text: "Who is most likely to watch football all day?" },
  { text: "Who would plan the best Friendsgiving?" },
  { text: "Who is most likely to take the best food photo?" },
  { text: "Who would clean up without being asked?" },
  { text: "Who is most likely to suggest seconds?" },
  { text: "Who would tell the best family story?" },
  { text: "Who is most likely to make the table laugh?" },
];

/** @see FAQ_VERSION */
export const THANKSGIVING_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are Thanksgiving games?",
    "answer": "Thanksgiving games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for Thanksgiving dinner, Friendsgiving, and holiday tables."
  },
  {
    "question": "Can we play Thanksgiving games on phones?",
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
export const GRADUATION_PARTY_GAMES_INTENT = {
  slug: "graduation-party-games",
  title: "Graduation Party Games",
  metaTitle: "Graduation Party Games | Celebration Voting Game | FriendRank",
  metaDescription:
    "Create graduation party games on FriendRank. Guests vote anonymously on funny grad roles and reveal shareable results at the party.",
  h1: "Graduation Party Games",
  intentSummaryTitle: "What are graduation party games?",
  intentSummary:
    "Graduation party games celebrate the grad with something interactive. FriendRank turns the party into a phone voting game: add names, share one link, vote anonymously on graduation roles, and reveal results together in the backyard or group chat. Perfect for high school, college, and family celebrations.",
  whyFriendRankTitle: "Why FriendRank works for graduation parties",
  exampleQuestionsTitle: "Popular graduation party game questions",
  faqTitle: "Graduation party games FAQ",
  schemaDescription:
    "Create graduation party games with FriendRank. Guests vote anonymously and reveal shareable results. No signup required.",
  ctaLocation: "landing_graduation_party_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the best toast",
      "Who is most likely to cry",
      "Who planned the best party",
    ],
    suggestedVibeTags: ["Party", "College", "Family"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const GRADUATION_PARTY_GAMES_AUDIENCE = {
  heroSubtitle:
    "Celebrate the grad with a quick voting game. Share one link, vote anonymously, and reveal funny graduation roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank before guests arrive. Share the link and let everyone vote during the party.",
  exampleQuestionsIntro:
    "Need inspiration? Here are graduation party questions guests can vote on.",
  finalCtaTitle: "Start your graduation party game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the cap toss.",
} as const;

/** @see CTA_VERSION */
export const GRADUATION_PARTY_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Graduation Party Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const GRADUATION_PARTY_GAMES_QUESTIONS = [
  { text: "Who is most likely to cry during the toast?" },
  { text: "Who would give the best graduation speech?" },
  { text: "Who is most likely to throw the cap the highest?" },
  { text: "Who would plan the best after-party?" },
  { text: "Who is most likely to photobomb every picture?" },
  { text: "Who would win a grad trivia round?" },
  { text: "Who is most likely to keep the party going?" },
  { text: "Who would remember every embarrassing school story?" },
  { text: "Who is most likely to suggest a group photo?" },
  { text: "Who would pick the best celebration playlist?" },
  { text: "Who is most likely to give the most heartfelt gift?" },
  { text: "Who would organize the surprise?" },
  { text: "Who is most likely to start the dance floor?" },
  { text: "Who would tell the funniest school story?" },
  { text: "Who is most likely to make the grad feel like a star?" },
];

/** @see FAQ_VERSION */
export const GRADUATION_PARTY_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are graduation party games?",
    "answer": "Graduation party games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for graduation celebrations, backyard parties, and family gatherings."
  },
  {
    "question": "Can we play graduation party games on phones?",
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
export const BABY_SHOWER_GAMES_INTENT = {
  slug: "baby-shower-games",
  title: "Baby Shower Games",
  metaTitle: "Baby Shower Games | Celebration Voting Game | FriendRank",
  metaDescription:
    "Create baby shower games on FriendRank. Guests vote anonymously on funny shower roles and reveal shareable results together.",
  h1: "Baby Shower Games",
  intentSummaryTitle: "What are baby shower games?",
  intentSummary:
    "Baby shower games should be sweet, funny, and easy to run without printed worksheets. FriendRank gives hosts a browser voting game: add guest names, share one link, vote anonymously on baby-shower roles, and reveal results together before gifts. Works for co-ed showers, brunches, and virtual celebrations.",
  whyFriendRankTitle: "Why FriendRank works for baby showers",
  exampleQuestionsTitle: "Popular baby shower game questions",
  faqTitle: "Baby shower games FAQ",
  schemaDescription:
    "Create baby shower games with FriendRank. Guests vote anonymously and reveal shareable results. No signup required.",
  ctaLocation: "landing_baby_shower_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the best parenting advice",
      "Who picks the cutest gift",
      "Who cries first",
    ],
    suggestedVibeTags: ["Family", "Party", "Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const BABY_SHOWER_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make the shower more fun with a quick voting game. Share one link, vote anonymously, and reveal funny results together.",
  playImmediatelyBody:
    "Create a game on FriendRank before guests arrive. Share the link at the brunch table or in the shower group chat.",
  exampleQuestionsIntro:
    "Need inspiration? Here are baby shower questions guests can vote on.",
  finalCtaTitle: "Start your baby shower game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the gifts are opened.",
} as const;

/** @see CTA_VERSION */
export const BABY_SHOWER_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Baby Shower Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const BABY_SHOWER_GAMES_QUESTIONS = [
  { text: "Who is most likely to cry during gift opening?" },
  { text: "Who would give the best parenting advice?" },
  { text: "Who is most likely to pick the cutest outfit?" },
  { text: "Who would win a baby trivia round?" },
  { text: "Who is most likely to organize the group photo?" },
  { text: "Who would tell the funniest childhood story?" },
  { text: "Who is most likely to suggest the best baby name?" },
  { text: "Who would remember every guest's gift?" },
  { text: "Who is most likely to offer to babysit first?" },
  { text: "Who would plan the best diaper game?" },
  { text: "Who is most likely to bring the most thoughtful gift?" },
  { text: "Who would keep the party energy up?" },
  { text: "Who is most likely to share the best advice?" },
  { text: "Who would take the best candid photos?" },
  { text: "Who is most likely to make the parents feel supported?" },
];

/** @see FAQ_VERSION */
export const BABY_SHOWER_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are baby shower games?",
    "answer": "Baby shower games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for baby shower brunches, co-ed showers, and celebration guests."
  },
  {
    "question": "Can we play baby shower games on phones?",
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
export const BRIDAL_SHOWER_GAMES_INTENT = {
  slug: "bridal-shower-games",
  title: "Bridal Shower Games",
  metaTitle: "Bridal Shower Games | Wedding Party Voting Game | FriendRank",
  metaDescription:
    "Create bridal shower games on FriendRank. Guests vote anonymously on funny bridal roles and reveal shareable results at the shower.",
  h1: "Bridal Shower Games",
  intentSummaryTitle: "What are bridal shower games?",
  intentSummary:
    "Bridal shower games should feel special without complicated setup. FriendRank gives the wedding party a browser voting game: add names, share one link, vote anonymously on bridal-shower roles, and reveal results together over brunch. Distinct from the bachelorette — sweeter tone, mixed guest lists, and family-friendly fun.",
  whyFriendRankTitle: "Why FriendRank works for bridal showers",
  exampleQuestionsTitle: "Popular bridal shower game questions",
  faqTitle: "Bridal shower games FAQ",
  schemaDescription:
    "Create bridal shower games with FriendRank. Guests vote anonymously and reveal shareable results. No signup required.",
  ctaLocation: "landing_bridal_shower_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows the bride best",
      "Who gives the best toast",
      "Who planned the best shower",
    ],
    suggestedVibeTags: ["Soft drama", "Party", "Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const BRIDAL_SHOWER_GAMES_AUDIENCE = {
  heroSubtitle:
    "Make the bridal shower more fun with a quick voting game. Share one link, vote anonymously, and reveal funny bridal roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank before brunch starts. Share the link and let guests vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are bridal shower questions guests can vote on.",
  finalCtaTitle: "Start your bridal shower game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for the wedding party.",
} as const;

/** @see CTA_VERSION */
export const BRIDAL_SHOWER_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Bridal Shower Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const BRIDAL_SHOWER_GAMES_QUESTIONS = [
  { text: "Who knows the bride the best?" },
  { text: "Who would give the sweetest toast?" },
  { text: "Who is most likely to cry during gift opening?" },
  { text: "Who would win a how-well-do-you-know-the-bride round?" },
  { text: "Who is most likely to suggest the best honeymoon idea?" },
  { text: "Who would organize the group photo?" },
  { text: "Who is most likely to tell the best couple story?" },
  { text: "Who would pick the best shower playlist?" },
  { text: "Who is most likely to give the most thoughtful gift?" },
  { text: "Who would plan the best bachelorette backup plan?" },
  { text: "Who is most likely to offer the best marriage advice?" },
  { text: "Who would remember every registry item?" },
  { text: "Who is most likely to make the bride laugh?" },
  { text: "Who would take the best candid photos?" },
  { text: "Who is most likely to make the shower unforgettable?" },
];

/** @see FAQ_VERSION */
export const BRIDAL_SHOWER_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are bridal shower games?",
    "answer": "Bridal shower games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for bridal shower brunches, wedding parties, and celebration guests."
  },
  {
    "question": "Can we play bridal shower games on phones?",
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
export const REUNION_GAMES_INTENT = {
  slug: "reunion-games",
  title: "Reunion Games",
  metaTitle: "Reunion Games | Alumni & Friend Group Vote | FriendRank",
  metaDescription:
    "Create reunion games on FriendRank. Old friends vote anonymously on phones, reveal funny roles, and reconnect through shared results.",
  h1: "Reunion Games",
  intentSummaryTitle: "What are reunion games?",
  intentSummary:
    "Reunion games help old friends pick up where they left off. FriendRank gives alumni and friend crews a browser voting game: add names, share one link, vote anonymously on reunion roles, and reveal results together at the bar or group chat. Works for class reunions, camp reunions, and friend-group trips — distinct from family reunion gatherings.",
  whyFriendRankTitle: "Why FriendRank works for reunions",
  exampleQuestionsTitle: "Popular reunion game questions",
  faqTitle: "Reunion games FAQ",
  schemaDescription:
    "Create reunion games with FriendRank. Old friends vote anonymously and reveal shareable results. No signup required.",
  ctaLocation: "landing_reunion_games" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who changed the least",
      "Who has the best stories now",
      "Who would plan the next reunion",
    ],
    suggestedVibeTags: ["College", "Party", "Family"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see AUDIENCE_VERSION */
export const REUNION_GAMES_AUDIENCE = {
  heroSubtitle:
    "Reconnect with a quick voting game. Share one link, vote anonymously, and reveal funny reunion roles together.",
  playImmediatelyBody:
    "Create a game on FriendRank before the reunion dinner. Share the link and let old friends vote from their phones.",
  exampleQuestionsIntro:
    "Need inspiration? Here are reunion questions your group can vote on.",
  finalCtaTitle: "Start your reunion game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready for old friends.",
} as const;

/** @see CTA_VERSION */
export const REUNION_GAMES_PRIMARY_CTA: LandingPageCta = {
  label: "Create Reunion Game",
  href: CREATE_GAME_HREF,
};

/** @see QUESTION_VERSION */
export const REUNION_GAMES_QUESTIONS = [
  { text: "Who is most likely to look exactly the same?" },
  { text: "Who would tell the best update story?" },
  { text: "Who is most likely to remember every inside joke?" },
  { text: "Who would plan the next reunion?" },
  { text: "Who is most likely to bring the old photos?" },
  { text: "Who would win a reunion trivia round?" },
  { text: "Who is most likely to suggest a group photo?" },
  { text: "Who would pick the best reunion playlist?" },
  { text: "Who is most likely to stay out the latest?" },
  { text: "Who would reconnect with the most people?" },
  { text: "Who is most likely to start the nostalgia spiral?" },
  { text: "Who would organize the after-party?" },
  { text: "Who is most likely to share the wildest update?" },
  { text: "Who would remember every name from school?" },
  { text: "Who is most likely to make the reunion feel like no time passed?" },
];

/** @see FAQ_VERSION */
export const REUNION_GAMES_FAQ: LandingPageFaqItem[] = [
  {
    "question": "What are reunion games?",
    "answer": "Reunion games on FriendRank are browser voting games where people vote anonymously on funny roles and reveal results together. Perfect for class reunions, alumni meetups, and old friend group trips."
  },
  {
    "question": "Can we play reunion games on phones?",
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

export const AUDIENCE_AUTHORITY_WAVE2_PAGE_SLUGS = [
  "pregame-games",
  "boys-night-games",
  "vacation-games",
  "road-trip-games",
  "classroom-games",
  "high-school-games",
  "middle-school-games",
  "student-orientation-games",
  "new-employee-games",
  "onboarding-games",
  "workshop-games",
  "conference-icebreaker-games",
  "family-reunion-games",
  "holiday-family-games",
  "christmas-family-games",
  "thanksgiving-games",
  "graduation-party-games",
  "baby-shower-games",
  "bridal-shower-games",
  "reunion-games",
] as const;
