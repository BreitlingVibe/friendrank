import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { CUSTOM_CATEGORY_PLACEHOLDERS } from "@/lib/game-build";
import type { LandingPageGamePreset } from "@/lib/landing-pages/landing-page-types";
import { INTENT_VERSION } from "@/lib/landing-pages/content/version";

/** @see INTENT_VERSION */
export const MOST_LIKELY_TO_INTENT = {
  slug: "most-likely-to-generator",
  title: "Most Likely To Generator",
  metaTitle:
    "Most Likely To Generator | Create a Friend Voting Game | FriendRank",
  metaDescription:
    "Create a Most Likely To game for your friends. Invite your group, vote anonymously, reveal funny roles, and share the results.",
  h1: "Most Likely To Generator for Friends",
  intentSummaryTitle: "What is a Most Likely To generator?",
  intentSummary:
    'A Most Likely To generator creates a playable online Most Likely To game for friends — not a static question list. You add names, optionally customize a few prompts, share one link, and everyone votes from their phone or browser. When enough friends have voted, results unlock with ranked winners and a group story you can share back to the chat. No app download. No account needed.',
  whyFriendRankTitle: "Why this Most Likely To generator works for friends",
  exampleQuestionsTitle: "Popular Most Likely To Questions",
  faqTitle: "Most Likely To game FAQ",
  schemaDescription:
    "Create a Most Likely To voting game for your friends with FriendRank. Groups vote anonymously on phone, unlock funny roles after enough votes, and share results. No signup required.",
  ctaLocation: "landing_most_likely_to_generator" as const,
  gamePreset: {
    suggestedCustomCategories: [...CUSTOM_CATEGORY_PLACEHOLDERS],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const BEST_FRIEND_QUIZ_INTENT = {
  slug: "best-friend-quiz",
  title: "Best Friend Quiz",
  metaTitle: "Best Friend Quiz | Create a Fun Friend Voting Game | FriendRank",
  metaDescription:
    "Create a best friend quiz for your group. Add friends, vote anonymously, reveal funny roles, and share the results in minutes.",
  h1: "Best Friend Quiz for Groups",
  intentSummaryTitle: "What is a best friend quiz?",
  intentSummary:
    "A best friend quiz is a playful way to see how well your group knows each other. FriendRank is not a boring compatibility test. It is a group voting game where friends pick who fits each role, vote anonymously on their phones, and unlock funny results together. Perfect for best friend groups, roommates, and close friend circles.",
  whyFriendRankTitle: "Why FriendRank beats a typical best friend quiz",
  exampleQuestionsTitle: "Popular best friend quiz questions",
  faqTitle: "Best friend quiz FAQ",
  schemaDescription:
    "Create a best friend quiz for your group with FriendRank. Friends vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
  ctaLocation: "landing_best_friend_quiz" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows the group best",
      "Who gives the best advice",
      "Who is the most loyal friend",
    ],
    suggestedVibeTags: ["College", "Discord", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const WHO_KNOWS_ME_BEST_INTENT = {
  slug: "who-knows-me-best",
  title: "Who Knows Me Best",
  metaTitle: "Who Knows Me Best Game | Play With Friends Online | FriendRank",
  metaDescription:
    "Create a Who Knows Me Best game for friends. Share one link, vote anonymously, unlock funny roles, and reveal your group story.",
  h1: "Who Knows Me Best Game",
  intentSummaryTitle: "What is a Who Knows Me Best game?",
  intentSummary:
    "A Who Knows Me Best game tests which friend knows you the most. With FriendRank, the whole group votes on funny social roles instead of filling out a solo quiz. Everyone picks from the friend list, votes on their phone, and results unlock with ranked winners and a shareable group story. Great for birthdays, group chats, and friend hangouts.",
  whyFriendRankTitle: "Why FriendRank works for Who Knows Me Best",
  exampleQuestionsTitle: "Popular Who Knows Me Best questions",
  faqTitle: "Who Knows Me Best FAQ",
  schemaDescription:
    "Create a Who Knows Me Best game for friends with FriendRank. Groups vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
  ctaLocation: "landing_who_knows_me_best" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows me best",
      "Who would guess my favorite food",
      "Who knows my worst habit",
    ],
    suggestedVibeTags: ["College", "Family", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const FRIENDSHIP_TEST_INTENT = {
  slug: "friendship-test",
  title: "Friendship Test",
  metaTitle: "Friendship Test | Create a Fun Group Voting Game | FriendRank",
  metaDescription:
    "Create a friendship test for your group. Invite friends, vote anonymously, reveal funny roles, and share the results.",
  h1: "Friendship Test for Groups",
  intentSummaryTitle: "What is a friendship test?",
  intentSummary:
    "A friendship test is a fun way to explore how your group sees each other. Most online friendship quizzes are solo and static. FriendRank makes it social: the whole group votes on who fits each role, results unlock together, and you get shareable story-style output for the chat. No app download. No account needed.",
  whyFriendRankTitle: "Why FriendRank is a better friendship test",
  exampleQuestionsTitle: "Popular friendship test questions",
  faqTitle: "Friendship test FAQ",
  schemaDescription:
    "Create a friendship test for your group with FriendRank. Friends vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
  ctaLocation: "landing_friendship_test" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the most loyal friend",
      "Who gives the best advice",
      "Who is most likely to keep everyone together",
    ],
    suggestedVibeTags: ["Party", "College", "Soft drama"],
    suggestedTone: "Savage but friendly",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const ANONYMOUS_VOTING_INTENT = {
  slug: "anonymous-voting-game",
  title: "Anonymous Voting Game",
  metaTitle: "Anonymous Voting Game | Vote With Friends Online | FriendRank",
  metaDescription:
    "Create an anonymous voting game for friends. Share one link, vote privately, unlock group results, and reveal funny roles together.",
  h1: "Anonymous Voting Game for Friends",
  intentSummaryTitle: "What is an anonymous voting game?",
  intentSummary:
    "An anonymous online voting game is a private voting game for friends and groups — not elections or surveys. You add names, share one link, and everyone votes anonymously in the browser on a phone or desktop. Ballots stay private, results unlock on the same link, and the group reveals funny roles together with no account and no download. It works for anonymous group voting, anonymous friend voting, and any hangout where people want honest picks without calling each other out.",
  whyFriendRankTitle: "Why this anonymous voting game works for friends",
  exampleQuestionsTitle: "Popular anonymous voting questions",
  faqTitle: "Anonymous voting game FAQ",
  schemaDescription:
    "Create an anonymous voting game for friends with FriendRank. Share one link, vote privately, unlock group results and funny roles. No signup required.",
  ctaLocation: "landing_anonymous_voting_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the best advice",
      "Who is secretly the funniest",
      "Who would survive a zombie apocalypse",
    ],
    suggestedVibeTags: ["Discord", "College", "Brutal honesty"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const GROUP_VOTING_INTENT = {
  slug: "group-voting-game",
  title: "Group Voting Game",
  metaTitle: "Online Voting Game for Groups | FriendRank",
  metaDescription:
    "Start a free online voting game for groups and friends. Share one link, vote privately from any phone, reveal results together — no app download.",
  h1: "Online Voting Game for Groups",
  intentSummaryTitle: "What is an online group voting game?",
  intentSummary:
    "An online voting game lets your group vote on funny roles from their phones without a complicated setup. FriendRank is built for friend groups, roommates, and Discord communities: create a game, share one link, let everyone vote privately, then reveal ranked results together. No accounts and no app download.",
  whyFriendRankTitle: "Why FriendRank for group voting",
  exampleQuestionsTitle: "Popular group voting questions",
  faqTitle: "Group voting game FAQ",
  schemaDescription:
    "Start a free online voting game for groups with FriendRank. Share one link, vote privately, reveal funny roles together. No signup required.",
  ctaLocation: "landing_group_voting_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the Main Character",
      "Who is the Chaos Agent",
      "Who is the biggest foodie",
    ],
    suggestedVibeTags: ["Gaming", "Discord", "Meme-heavy"],
    suggestedTone: "Chaotic",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const PARTY_VOTING_INTENT = {
  slug: "party-voting-game",
  title: "Party Voting Game",
  metaTitle: "Party Voting Game | Fun Group Vote for Parties | FriendRank",
  metaDescription:
    "Create a party voting game for your group. Anonymous votes, funny roles, and shareable results for birthdays, game nights, and college parties.",
  h1: "Party Voting Game for Birthdays and Game Nights",
  intentSummaryTitle: "What is a party voting game?",
  intentSummary:
    "A party voting game is a browser party game for birthdays, game nights, celebrations, sleepovers, and casual friend gatherings. One person creates the game, shares one link, and everyone votes on funny prompts from their phones while the party is happening. Results unlock on the same link so the room can react together — no app download, no accounts, and nothing that feels like a survey or election. It is built for parties and hangouts, not workplace polls.",
  whyFriendRankTitle: "Why this party voting game works at celebrations",
  exampleQuestionsTitle: "Popular party voting questions",
  faqTitle: "Party voting game FAQ",
  schemaDescription:
    "Create a party voting game for your group with FriendRank. Anonymous votes, funny roles, and shareable results for birthdays, game nights, and friend parties. No signup required.",
  ctaLocation: "landing_party_voting_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Most likely to start dancing first",
      "Who has the loudest laugh",
      "Who is most likely to lose their phone",
    ],
    suggestedVibeTags: ["Party", "College", "Chaotic"],
    suggestedTone: "Chaotic",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const ICEBREAKER_INTENT = {
  slug: "icebreaker-game",
  title: "Icebreaker Game",
  metaTitle: "Icebreaker Game | Create a Fun Group Voting Game | FriendRank",
  metaDescription:
    "Create an icebreaker game for your group. Add people, vote anonymously, reveal funny roles, and make everyone feel involved.",
  h1: "Icebreaker Game for Groups",
  intentSummaryTitle: "What is an icebreaker game?",
  intentSummary:
    "An icebreaker game helps a group warm up fast. FriendRank turns it into a phone voting game: add names, share one link, everyone votes on fun roles, and results unlock together. Works for parties, classrooms, teams, clubs, and groups where not everyone knows each other yet. No app download. No account needed.",
  whyFriendRankTitle: "Why FriendRank works as an icebreaker",
  exampleQuestionsTitle: "Popular icebreaker questions",
  faqTitle: "Icebreaker game FAQ",
  schemaDescription:
    "Create an icebreaker game for your group with FriendRank. Add people, vote anonymously, reveal funny roles, and make everyone feel involved. No signup required.",
  ctaLocation: "landing_icebreaker_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to make everyone laugh",
      "Who gives the best first impression",
      "Who is most likely to start a conversation",
    ],
    suggestedVibeTags: ["Party", "College", "Office"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const OFFICE_ICEBREAKER_INTENT = {
  slug: "office-icebreaker",
  title: "Office Icebreaker",
  metaTitle: "Office Icebreaker Game | Fun Team Voting Game | FriendRank",
  metaDescription:
    "Create an office icebreaker game for your team. Invite coworkers, vote anonymously, reveal funny roles, and make meetings more fun.",
  h1: "Office Icebreaker Game",
  intentSummaryTitle: "What is an office icebreaker game?",
  intentSummary:
    "An office icebreaker helps teams connect without forced small talk. FriendRank gives you a quick voting game: add coworkers, share a link, vote anonymously on light workplace roles, and reveal results together. Works for in-person teams, remote calls, and new hire onboarding. No signup required.",
  whyFriendRankTitle: "Why FriendRank for office icebreakers",
  exampleQuestionsTitle: "Popular office icebreaker questions",
  faqTitle: "Office icebreaker FAQ",
  schemaDescription:
    "Create an office icebreaker game for your team with FriendRank. Invite coworkers, vote anonymously, reveal funny roles, and make meetings more fun. No signup required.",
  ctaLocation: "landing_office_icebreaker" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is secretly the funniest coworker",
      "Who is most likely to save the project",
      "Who keeps the best meeting energy",
    ],
    suggestedVibeTags: ["Office", "Party", "Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const CLASSROOM_ICEBREAKER_INTENT = {
  slug: "classroom-icebreaker",
  title: "Classroom Icebreaker",
  metaTitle:
    "Classroom Icebreaker Game | Fun Student Voting Game | FriendRank",
  metaDescription:
    "Create a classroom icebreaker game for students. Add classmates, vote anonymously, reveal fun roles, and help everyone get involved.",
  h1: "Classroom Icebreaker Game",
  intentSummaryTitle: "What is a classroom icebreaker game?",
  intentSummary:
    "A classroom icebreaker helps students feel included quickly. FriendRank makes it a group voting game on phones: add classmates, share one link, vote on fun roles, and unlock results together. Great for teachers, clubs, orientation days, and school activities. No app install needed.",
  whyFriendRankTitle: "Why FriendRank for classroom icebreakers",
  exampleQuestionsTitle: "Popular classroom icebreaker questions",
  faqTitle: "Classroom icebreaker FAQ",
  schemaDescription:
    "Create a classroom icebreaker game for students with FriendRank. Add classmates, vote anonymously, reveal fun roles, and help everyone get involved. No signup required.",
  ctaLocation: "landing_classroom_icebreaker" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the best group project teammate",
      "Who is most likely to help a classmate",
      "Who brings the best energy to class",
    ],
    suggestedVibeTags: ["School", "College", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const TEAM_BUILDING_INTENT = {
  slug: "team-building-game",
  title: "Team Building Game",
  metaTitle: "Team Building Game | Fun Team Activity | FriendRank",
  metaDescription:
    "Create a team building game for your coworkers. Invite the team, vote anonymously, reveal fun roles, and bring everyone closer together.",
  h1: "Team Building Game",
  intentSummaryTitle: "What is a team building game?",
  intentSummary:
    "A team building game helps coworkers connect without forced activities. FriendRank turns it into a quick voting game: add teammates, share one link, vote anonymously on fun roles, and reveal results together. Works for in-person teams, remote syncs, and offsites. No signup required.",
  whyFriendRankTitle: "Why FriendRank for team building",
  exampleQuestionsTitle: "Popular team building questions",
  faqTitle: "Team building game FAQ",
  schemaDescription:
    "Create a team building game for your coworkers with FriendRank. Invite the team, vote anonymously, reveal fun roles, and bring everyone closer together. No signup required.",
  ctaLocation: "landing_team_building_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who keeps the team motivated",
      "Who is the best problem solver",
      "Who makes everyone feel included",
    ],
    suggestedVibeTags: ["Office", "Party", "Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const TEAM_BONDING_INTENT = {
  slug: "team-bonding-game",
  title: "Team Bonding Game",
  metaTitle: "Team Bonding Game | Fun Group Activity | FriendRank",
  metaDescription:
    "Create a team bonding game for your group. Share one link, vote anonymously, reveal lighthearted roles, and spark real conversation.",
  h1: "Team Bonding Game",
  intentSummaryTitle: "What is a team bonding game?",
  intentSummary:
    "A team bonding game helps teammates connect beyond daily tasks. FriendRank makes it a phone voting game: add names, share one link, vote on light roles, and unlock results together. Great for team socials, onboarding, and remote happy hours. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for team bonding",
  exampleQuestionsTitle: "Popular team bonding questions",
  faqTitle: "Team bonding game FAQ",
  schemaDescription:
    "Create a team bonding game for your group with FriendRank. Share one link, vote anonymously, reveal lighthearted roles, and spark real conversation. No signup required.",
  ctaLocation: "landing_team_bonding_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who makes new teammates feel welcome",
      "Who would plan the best team outing",
      "Who keeps the group chat fun",
    ],
    suggestedVibeTags: ["Office", "Party", "Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const WORK_TEAM_INTENT = {
  slug: "work-team-game",
  title: "Work Team Game",
  metaTitle: "Work Team Game | Anonymous Team Activity | FriendRank",
  metaDescription:
    "Create a work team game for coworkers. Add names, vote anonymously, reveal fun workplace roles, and break the routine together.",
  h1: "Work Team Game",
  intentSummaryTitle: "What is a work team game?",
  intentSummary:
    "A work team game is a quick workplace activity that gets coworkers talking. FriendRank gives you anonymous voting on phones: add the team, share a link, vote on fun roles, and reveal results together. Works for hybrid teams, all-hands warmups, and Friday socials. No account needed.",
  whyFriendRankTitle: "Why FriendRank for work teams",
  exampleQuestionsTitle: "Popular work team questions",
  faqTitle: "Work team game FAQ",
  schemaDescription:
    "Create a work team game for coworkers with FriendRank. Add names, vote anonymously, reveal fun workplace roles, and break the routine together. No signup required.",
  ctaLocation: "landing_work_team_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the most reliable coworker",
      "Who handles pressure the best",
      "Who keeps the team organized",
    ],
    suggestedVibeTags: ["Office", "Soft drama", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const RELATIONSHIP_QUIZ_INTENT = {
  slug: "relationship-quiz",
  title: "Relationship Quiz",
  metaTitle: "Relationship Quiz | Fun Compatibility Game | FriendRank",
  metaDescription:
    "Create a relationship quiz for your group. Vote anonymously on playful roles, reveal compatibility results, and share the fun together.",
  h1: "Relationship Quiz",
  intentSummaryTitle: "What is a relationship quiz?",
  intentSummary:
    "A relationship quiz is a playful way to explore chemistry and compatibility. FriendRank is not a long solo test. It is a group voting game where people pick who fits each role, vote anonymously on their phones, and unlock funny results together. Great for couples, double dates, and friend groups.",
  whyFriendRankTitle: "Why FriendRank beats a typical relationship quiz",
  exampleQuestionsTitle: "Popular relationship quiz questions",
  faqTitle: "Relationship quiz FAQ",
  schemaDescription:
    "Create a relationship quiz with FriendRank. Vote anonymously on playful roles, reveal compatibility results, and share the fun together. No signup required.",
  ctaLocation: "landing_relationship_quiz" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the most romantic",
      "Who gives the best relationship advice",
      "Who keeps the relationship fun",
    ],
    suggestedVibeTags: ["Party", "Soft drama", "Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const COUPLE_QUIZ_INTENT = {
  slug: "couple-quiz",
  title: "Couple Quiz",
  metaTitle: "Couple Quiz | Play Together Online | FriendRank",
  metaDescription:
    "Create a couple quiz you can play together. Vote anonymously, reveal funny roles, and share results on date night or with friends.",
  h1: "Couple Quiz",
  intentSummaryTitle: "What is a couple quiz?",
  intentSummary:
    "A couple quiz is a fun game for partners to play together. FriendRank turns it into a phone voting game: add both names, share one link, vote on cute roles, and reveal results together. Works for date night, anniversaries, and double dates with friends. No app download needed.",
  whyFriendRankTitle: "Why FriendRank works for couple quizzes",
  exampleQuestionsTitle: "Popular couple quiz questions",
  faqTitle: "Couple quiz FAQ",
  schemaDescription:
    "Create a couple quiz with FriendRank. Vote anonymously, reveal funny roles, and share results on date night or with friends. No signup required.",
  ctaLocation: "landing_couple_quiz" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who sends the sweetest texts",
      "Who is the planner in the relationship",
      "Who is the romantic one",
    ],
    suggestedVibeTags: ["Party", "Family", "Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const BOYFRIEND_GIRLFRIEND_QUIZ_INTENT = {
  slug: "boyfriend-girlfriend-quiz",
  title: "Boyfriend & Girlfriend Quiz",
  metaTitle: "Boyfriend & Girlfriend Quiz | Dating Game | FriendRank",
  metaDescription:
    "Create a boyfriend and girlfriend quiz for dating couples. Vote anonymously, reveal cute roles, and play together in minutes.",
  h1: "Boyfriend & Girlfriend Quiz",
  intentSummaryTitle: "What is a boyfriend and girlfriend quiz?",
  intentSummary:
    "A boyfriend and girlfriend quiz is a light dating game for couples who want something fun to do together. FriendRank makes it a quick voting game on phones: add names, share a link, vote on cute date-night roles, and unlock results together. Perfect for new couples, long-distance dating, and friend groups. No account needed.",
  whyFriendRankTitle: "Why FriendRank for dating couples",
  exampleQuestionsTitle: "Popular boyfriend and girlfriend quiz questions",
  faqTitle: "Boyfriend and girlfriend quiz FAQ",
  schemaDescription:
    "Create a boyfriend and girlfriend quiz with FriendRank. Vote anonymously, reveal cute roles, and play together in minutes. No signup required.",
  ctaLocation: "landing_boyfriend_girlfriend_quiz" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who sends the best good morning text",
      "Who would pick the perfect date spot",
      "Who is the sweetest when dating",
    ],
    suggestedVibeTags: ["Party", "Soft drama", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const BIRTHDAY_PARTY_GAME_INTENT = {
  slug: "birthday-party-game",
  title: "Birthday Party Game",
  metaTitle: "Birthday Party Game | Fun Group Vote | FriendRank",
  metaDescription:
    "Create a birthday party game for your group. Vote anonymously on funny roles, reveal shareable results, and make the celebration more fun.",
  h1: "Birthday Party Game",
  intentSummaryTitle: "What is a birthday party game?",
  intentSummary:
    "A birthday party game gives guests something quick and funny to do together. FriendRank turns it into a phone voting game: add names, share one link, vote on birthday roles, and unlock results for the room or group chat. Works for house parties, restaurant dinners, and friend celebrations. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for birthday parties",
  exampleQuestionsTitle: "Popular birthday party questions",
  faqTitle: "Birthday party game FAQ",
  schemaDescription:
    "Create a birthday party game with FriendRank. Vote anonymously on funny roles, reveal shareable results, and make the celebration more fun. No signup required.",
  ctaLocation: "landing_birthday_party_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to start the dance floor",
      "Who gives the best birthday toast",
      "Who brings the best party energy",
    ],
    suggestedVibeTags: ["Party", "College", "Family"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const SLEEPOVER_GAME_INTENT = {
  slug: "sleepover-game",
  title: "Sleepover Game",
  metaTitle: "Sleepover Game | Fun Friend Voting Game | FriendRank",
  metaDescription:
    "Create a sleepover game for your friend group. Vote anonymously on silly roles, reveal funny results, and play together all night.",
  h1: "Sleepover Game",
  intentSummaryTitle: "What is a sleepover game?",
  intentSummary:
    "A sleepover game is a late-night activity that keeps the group laughing. FriendRank makes it a quick voting game on phones: add friends, share one link, vote on fun roles, and reveal results together. Perfect for teen and young adult sleepovers, movie nights, and friend hangouts. No signup required.",
  whyFriendRankTitle: "Why FriendRank for sleepovers",
  exampleQuestionsTitle: "Popular sleepover game questions",
  faqTitle: "Sleepover game FAQ",
  schemaDescription:
    "Create a sleepover game with FriendRank. Vote anonymously on silly roles, reveal funny results, and play together all night. No signup required.",
  ctaLocation: "landing_sleepover_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to stay awake until sunrise",
      "Who is most likely to fall asleep first",
      "Who would suggest truth or dare",
    ],
    suggestedVibeTags: ["Party", "College", "Chaotic"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const GIRLS_NIGHT_GAME_INTENT = {
  slug: "girls-night-game",
  title: "Girls Night Game",
  metaTitle: "Girls Night Game | Fun Group Voting Game | FriendRank",
  metaDescription:
    "Create a girls night game for your friend group. Vote anonymously, reveal funny roles, and add laughs to your night out or night in.",
  h1: "Girls Night Game",
  intentSummaryTitle: "What is a girls night game?",
  intentSummary:
    "A girls night game adds something playful to dinner, drinks, or getting ready together. FriendRank is a group voting game on phones: add friends, share one link, vote on funny roles, and unlock shareable results. Works at home or out on the town. No account needed.",
  whyFriendRankTitle: "Why FriendRank for girls night",
  exampleQuestionsTitle: "Popular girls night questions",
  faqTitle: "Girls night game FAQ",
  schemaDescription:
    "Create a girls night game with FriendRank. Vote anonymously, reveal funny roles, and add laughs to your night out or night in. No signup required.",
  ctaLocation: "landing_girls_night_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to order dessert for the table",
      "Who would plan the perfect night out",
      "Who is most likely to convince everyone to take selfies",
    ],
    suggestedVibeTags: ["Party", "Soft drama", "College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const FRIEND_TEST_INTENT = {
  slug: "friend-test",
  title: "Friend Test",
  metaTitle: "Friend Test | Fun Friend Compatibility Game | FriendRank",
  metaDescription:
    "Create a friend test for your group. Vote anonymously on friendship roles, reveal compatibility results, and share the fun together.",
  h1: "Friend Test",
  intentSummaryTitle: "What is a friend test?",
  intentSummary:
    "A friend test is a playful way to see how well your group knows each other. FriendRank is not a boring solo quiz. It is a group voting game where friends pick who fits each role, vote anonymously on their phones, and unlock results together. Perfect for friend groups, roommates, and close circles.",
  whyFriendRankTitle: "Why FriendRank beats a typical friend test",
  exampleQuestionsTitle: "Popular friend test questions",
  faqTitle: "Friend test FAQ",
  schemaDescription:
    "Create a friend test for your group with FriendRank. Vote anonymously on friendship roles, reveal compatibility results, and share the fun together. No signup required.",
  ctaLocation: "landing_friend_test" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the most loyal friend",
      "Who gives the best advice",
      "Who keeps the group together",
    ],
    suggestedVibeTags: ["College", "Discord", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const BESTIE_QUIZ_INTENT = {
  slug: "bestie-quiz",
  title: "Bestie Quiz",
  metaTitle: "Bestie Quiz | Fun Best Friend Voting Game | FriendRank",
  metaDescription:
    "Create a bestie quiz for your closest friends. Vote anonymously, reveal funny roles, and celebrate your best friend group.",
  h1: "Bestie Quiz",
  intentSummaryTitle: "What is a bestie quiz?",
  intentSummary:
    "A bestie quiz is a fun game for your closest friends. FriendRank turns it into a phone voting game: add names, share one link, vote on inside-joke roles, and reveal results together. Great for best friend groups, roommates, and tight friend circles. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for bestie quizzes",
  exampleQuestionsTitle: "Popular bestie quiz questions",
  faqTitle: "Bestie quiz FAQ",
  schemaDescription:
    "Create a bestie quiz for your closest friends with FriendRank. Vote anonymously, reveal funny roles, and celebrate your best friend group. No signup required.",
  ctaLocation: "landing_bestie_quiz" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is your ride-or-die bestie",
      "Who sends the best memes",
      "Who knows your inside jokes best",
    ],
    suggestedVibeTags: ["College", "Discord", "Party"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const FUNNY_FRIEND_QUIZ_INTENT = {
  slug: "funny-friend-quiz",
  title: "Funny Friend Quiz",
  metaTitle: "Funny Friend Quiz | Hilarious Group Voting Game | FriendRank",
  metaDescription:
    "Create a funny friend quiz for your group. Vote anonymously on hilarious roles, reveal laugh-out-loud results, and share them in the chat.",
  h1: "Funny Friend Quiz",
  intentSummaryTitle: "What is a funny friend quiz?",
  intentSummary:
    "A funny friend quiz is a lighthearted group game built for laughs. FriendRank lets everyone vote on their phone about who fits each silly role, keeps votes anonymous, and unlocks shareable results for the group chat. Perfect for hangouts, pre-games, and meme-heavy friend groups. No account needed.",
  whyFriendRankTitle: "Why FriendRank for funny friend quizzes",
  exampleQuestionsTitle: "Popular funny friend quiz questions",
  faqTitle: "Funny friend quiz FAQ",
  schemaDescription:
    "Create a funny friend quiz for your group with FriendRank. Vote anonymously on hilarious roles, reveal laugh-out-loud results, and share them in the chat. No signup required.",
  ctaLocation: "landing_funny_friend_quiz" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is secretly the biggest goofball",
      "Who would win a meme championship",
      "Who is most likely to trip over nothing",
    ],
    suggestedVibeTags: ["Meme-heavy", "Chaotic", "Party"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};


/** @see INTENT_VERSION */
export const NEW_FRIENDS_GAME_INTENT = {
  slug: "new-friends-game",
  title: "New Friends Game",
  metaTitle: "New Friends Game | Fun Group Voting Game | FriendRank",
  metaDescription:
    "Create a new friends game for your group. Vote anonymously on fun roles, break the ice fast, and reveal shareable results together.",
  h1: "New Friends Game",
  intentSummaryTitle: "What is a new friends game?",
  intentSummary:
    "A new friends game helps people bond when the group is still getting to know each other. FriendRank turns it into a quick phone voting game: add names, share one link, vote on lighthearted roles, and reveal results together. Perfect for orientation, meetups, new roommates, and fresh group chats. No signup required.",
  whyFriendRankTitle: "Why FriendRank for new friend groups",
  exampleQuestionsTitle: "Popular new friends game questions",
  faqTitle: "New friends game FAQ",
  schemaDescription:
    "Create a new friends game with FriendRank. Vote anonymously on fun roles, break the ice fast, and reveal shareable results together. No signup required.",
  ctaLocation: "landing_new_friends_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who makes the best first impression",
      "Who is most likely to start a conversation",
      "Who would plan the next hangout",
    ],
    suggestedVibeTags: ["College","Party","Discord"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const CHILDHOOD_FRIENDS_QUIZ_INTENT = {
  slug: "childhood-friends-quiz",
  title: "Childhood Friends Quiz",
  metaTitle: "Childhood Friends Quiz | Nostalgic Friend Voting Game | FriendRank",
  metaDescription:
    "Create a childhood friends quiz for your crew. Vote anonymously on nostalgic roles, reveal funny memories, and share results together.",
  h1: "Childhood Friends Quiz",
  intentSummaryTitle: "What is a childhood friends quiz?",
  intentSummary:
    "A childhood friends quiz celebrates the friends who have known you forever. FriendRank makes it a group voting game on phones: add names, share one link, vote on nostalgic roles and inside jokes, and unlock shareable results. Great for reunions, hometown visits, and long-term friend groups. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for childhood friend groups",
  exampleQuestionsTitle: "Popular childhood friends quiz questions",
  faqTitle: "Childhood friends quiz FAQ",
  schemaDescription:
    "Create a childhood friends quiz with FriendRank. Vote anonymously on nostalgic roles, reveal funny memories, and share results together. No signup required.",
  ctaLocation: "landing_childhood_friends_quiz" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who has the oldest friendship story",
      "Who remembers the most embarrassing moment",
      "Who stayed friends the longest",
    ],
    suggestedVibeTags: ["Family","College","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const FRIENDSHIP_CHALLENGE_INTENT = {
  slug: "friendship-challenge",
  title: "Friendship Challenge",
  metaTitle: "Friendship Challenge | Fun Friend Voting Game | FriendRank",
  metaDescription:
    "Create a friendship challenge for your group. Vote anonymously on funny roles, compete for bragging rights, and share results in the chat.",
  h1: "Friendship Challenge",
  intentSummaryTitle: "What is a friendship challenge?",
  intentSummary:
    "A friendship challenge turns your group chat into a playful competition. FriendRank is a phone voting game where friends pick who fits each role, vote anonymously, and unlock shareable results together. Perfect for social challenges, group dares, and meme-heavy friend circles. No account needed.",
  whyFriendRankTitle: "Why FriendRank for friendship challenges",
  exampleQuestionsTitle: "Popular friendship challenge questions",
  faqTitle: "Friendship challenge FAQ",
  schemaDescription:
    "Create a friendship challenge with FriendRank. Vote anonymously on funny roles, compete for bragging rights, and share results in the chat. No signup required.",
  ctaLocation: "landing_friendship_challenge" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who would win the ultimate friend challenge",
      "Who is most likely to accept any dare",
      "Who keeps the best challenge streak",
    ],
    suggestedVibeTags: ["Chaotic","Party","Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const DATE_NIGHT_GAME_INTENT = {
  slug: "date-night-game",
  title: "Date Night Game",
  metaTitle: "Date Night Game | Fun Couple Voting Game | FriendRank",
  metaDescription:
    "Create a date night game for couples. Vote anonymously on playful roles, spark conversation, and reveal shareable results together.",
  h1: "Date Night Game",
  intentSummaryTitle: "What is a date night game?",
  intentSummary:
    "A date night game adds something playful to dinner, drinks, or a cozy night in. FriendRank is a quick phone voting game: add names, share one link, vote on romantic and funny roles, and unlock results together. Works for couples at home, restaurants, and long-distance video dates. No signup required.",
  whyFriendRankTitle: "Why FriendRank for date night",
  exampleQuestionsTitle: "Popular date night game questions",
  faqTitle: "Date night game FAQ",
  schemaDescription:
    "Create a date night game with FriendRank. Vote anonymously on playful roles, spark conversation, and reveal shareable results together. No signup required.",
  ctaLocation: "landing_date_night_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who plans the better date night",
      "Who is the more romantic partner",
      "Who picks the best restaurant",
    ],
    suggestedVibeTags: ["Soft drama","Party","Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const NEWLYWED_GAME_INTENT = {
  slug: "newlywed-game",
  title: "Newlywed Game",
  metaTitle: "Newlywed Game | Fun Couple Voting Game | FriendRank",
  metaDescription:
    "Create a newlywed-style game for couples and wedding parties. Vote anonymously, reveal funny answers, and share results with the group.",
  h1: "Newlywed Game",
  intentSummaryTitle: "What is a newlywed game?",
  intentSummary:
    "A newlywed game is a classic couples activity where partners guess how the other would answer. FriendRank adapts it into a group voting game: add names, share one link, vote on playful couple roles, and reveal results together. Great for wedding parties, bridal showers, and couple game nights. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for newlywed games",
  exampleQuestionsTitle: "Popular newlywed game questions",
  faqTitle: "Newlywed game FAQ",
  schemaDescription:
    "Create a newlywed-style game with FriendRank. Vote anonymously, reveal funny answers, and share results with the group. No signup required.",
  ctaLocation: "landing_newlywed_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows their partner best",
      "Who would win the newlywed round",
      "Who gives the funniest answer",
    ],
    suggestedVibeTags: ["Party","Family","Soft drama"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const ANNIVERSARY_GAME_INTENT = {
  slug: "anniversary-game",
  title: "Anniversary Game",
  metaTitle: "Anniversary Game | Fun Couple Celebration Game | FriendRank",
  metaDescription:
    "Create an anniversary game for couples. Vote anonymously on sweet roles, celebrate your relationship, and share results together.",
  h1: "Anniversary Game",
  intentSummaryTitle: "What is an anniversary game?",
  intentSummary:
    "An anniversary game celebrates your relationship with something playful and shareable. FriendRank is a phone voting game: add names, share one link, vote on romantic and funny roles, and unlock results together. Perfect for anniversary dinners, couple trips, and celebrations with friends. No account needed.",
  whyFriendRankTitle: "Why FriendRank for anniversary celebrations",
  exampleQuestionsTitle: "Popular anniversary game questions",
  faqTitle: "Anniversary game FAQ",
  schemaDescription:
    "Create an anniversary game with FriendRank. Vote anonymously on sweet roles, celebrate your relationship, and share results together. No signup required.",
  ctaLocation: "landing_anniversary_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the more romantic partner",
      "Who remembers the anniversary first",
      "Who plans the best celebration",
    ],
    suggestedVibeTags: ["Soft drama","Family","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const ADULT_PARTY_GAME_INTENT = {
  slug: "adult-party-game",
  title: "Adult Party Game",
  metaTitle: "Adult Party Game | Fun Group Voting Game | FriendRank",
  metaDescription:
    "Create an adult party game for your group. Vote anonymously on funny roles, keep the energy high, and share results in the chat.",
  h1: "Adult Party Game",
  intentSummaryTitle: "What is an adult party game?",
  intentSummary:
    "An adult party game keeps the night moving without complicated setup. FriendRank is a phone voting game: add friends, share one link, vote on hilarious roles, and reveal shareable results. Works for house parties, dinner parties, and adult hangouts. No app install or signup required.",
  whyFriendRankTitle: "Why FriendRank for adult parties",
  exampleQuestionsTitle: "Popular adult party game questions",
  faqTitle: "Adult party game FAQ",
  schemaDescription:
    "Create an adult party game with FriendRank. Vote anonymously on funny roles, keep the energy high, and share results in the chat. No signup required.",
  ctaLocation: "landing_adult_party_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the life of the party",
      "Who is most likely to start a dance floor",
      "Who tells the best stories",
    ],
    suggestedVibeTags: ["Party","Chaotic","Meme-heavy"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const DRINKING_GAME_INTENT = {
  slug: "drinking-game",
  title: "Drinking Game",
  metaTitle: "Drinking Game Alternative | Group Voting Game | FriendRank",
  metaDescription:
    "Create a drinking game alternative with group voting. Vote anonymously on funny roles, keep the party fun, and share results together.",
  h1: "Drinking Game",
  intentSummaryTitle: "What is a drinking game on FriendRank?",
  intentSummary:
    "FriendRank is a drinking game alternative that keeps the focus on laughs, not rules. Add friends, share one link, vote anonymously on funny roles, and reveal shareable results. Works for pregames, house parties, and casual hangouts. Play responsibly. No signup required.",
  whyFriendRankTitle: "Why FriendRank as a party voting game",
  exampleQuestionsTitle: "Popular drinking game questions",
  faqTitle: "Drinking game FAQ",
  schemaDescription:
    "Create a drinking game alternative with FriendRank. Vote anonymously on funny roles, keep the party fun, and share results together. No signup required.",
  ctaLocation: "landing_drinking_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to suggest another round",
      "Who tells the best party stories",
      "Who keeps the best energy in the room",
    ],
    suggestedVibeTags: ["Party","Chaotic","College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const COLLEGE_PARTY_GAME_INTENT = {
  slug: "college-party-game",
  title: "College Party Game",
  metaTitle: "College Party Game | Fun Dorm Voting Game | FriendRank",
  metaDescription:
    "Create a college party game for your friend group. Vote anonymously on funny roles, play from any phone, and share results in the chat.",
  h1: "College Party Game",
  intentSummaryTitle: "What is a college party game?",
  intentSummary:
    "A college party game needs to be fast, funny, and phone-friendly. FriendRank is a group voting game: add friends, share one link, vote on dorm and party roles, and unlock shareable results. Perfect for dorm hangouts, campus parties, and college group chats. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for college parties",
  exampleQuestionsTitle: "Popular college party game questions",
  faqTitle: "College party game FAQ",
  schemaDescription:
    "Create a college party game with FriendRank. Vote anonymously on funny roles, play from any phone, and share results in the chat. No signup required.",
  ctaLocation: "landing_college_party_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to survive finals week then party",
      "Who knows every campus spot",
      "Who keeps the dorm energy alive",
    ],
    suggestedVibeTags: ["College","Party","Chaotic"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const REMOTE_TEAM_GAME_INTENT = {
  slug: "remote-team-game",
  title: "Remote Team Game",
  metaTitle: "Remote Team Game | Fun Virtual Team Activity | FriendRank",
  metaDescription:
    "Create a remote team game for distributed coworkers. Vote anonymously, spark conversation, and reveal lighthearted results together.",
  h1: "Remote Team Game",
  intentSummaryTitle: "What is a remote team game?",
  intentSummary:
    "A remote team game helps distributed coworkers connect beyond status updates. FriendRank is a phone voting game: add teammates, share one link in Slack or Zoom chat, vote anonymously on light roles, and reveal results together. Works for remote standups, virtual happy hours, and async teams. No signup required.",
  whyFriendRankTitle: "Why FriendRank for remote teams",
  exampleQuestionsTitle: "Popular remote team game questions",
  faqTitle: "Remote team game FAQ",
  schemaDescription:
    "Create a remote team game with FriendRank. Vote anonymously, spark conversation, and reveal lighthearted results together. No signup required.",
  ctaLocation: "landing_remote_team_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who keeps the best remote meeting energy",
      "Who is most likely to unmute with a good idea",
      "Who makes new teammates feel welcome",
    ],
    suggestedVibeTags: ["Office","Party","Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const EMPLOYEE_ENGAGEMENT_GAME_INTENT = {
  slug: "employee-engagement-game",
  title: "Employee Engagement Game",
  metaTitle: "Employee Engagement Game | Fun Workplace Activity | FriendRank",
  metaDescription:
    "Create an employee engagement game for your team. Vote anonymously on lighthearted roles, boost morale, and share results together.",
  h1: "Employee Engagement Game",
  intentSummaryTitle: "What is an employee engagement game?",
  intentSummary:
    "An employee engagement game is a light activity that helps teams feel connected. FriendRank gives you a quick voting game: add coworkers, share one link, vote anonymously on positive roles, and reveal results together. Works for all-hands warmups, HR socials, and culture events. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for employee engagement",
  exampleQuestionsTitle: "Popular employee engagement questions",
  faqTitle: "Employee engagement game FAQ",
  schemaDescription:
    "Create an employee engagement game with FriendRank. Vote anonymously on lighthearted roles, boost morale, and share results together. No signup required.",
  ctaLocation: "landing_employee_engagement_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who celebrates teammates the most",
      "Who brings the best energy to meetings",
      "Who makes new hires feel welcome",
    ],
    suggestedVibeTags: ["Office","Soft drama","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const VIRTUAL_TEAM_BUILDING_INTENT = {
  slug: "virtual-team-building",
  title: "Virtual Team Building",
  metaTitle: "Virtual Team Building Game | Fun Remote Activity | FriendRank",
  metaDescription:
    "Create a virtual team building game for remote coworkers. Vote anonymously, connect your team, and reveal shareable results together.",
  h1: "Virtual Team Building",
  intentSummaryTitle: "What is virtual team building on FriendRank?",
  intentSummary:
    "Virtual team building needs something quick that works on every device. FriendRank is a phone voting game: add teammates, share one link, vote anonymously on lighthearted roles, and unlock results together on a video call. Perfect for remote offsites, virtual happy hours, and distributed teams. No signup required.",
  whyFriendRankTitle: "Why FriendRank for virtual team building",
  exampleQuestionsTitle: "Popular virtual team building questions",
  faqTitle: "Virtual team building FAQ",
  schemaDescription:
    "Create a virtual team building game with FriendRank. Vote anonymously, connect your team, and reveal shareable results together. No signup required.",
  ctaLocation: "landing_virtual_team_building" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who would plan the best virtual team event",
      "Who keeps remote collaboration fun",
      "Who makes everyone feel included on calls",
    ],
    suggestedVibeTags: ["Office","Party","Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const TEAM_INTRODUCTION_GAME_INTENT = {
  slug: "team-introduction-game",
  title: "Team Introduction Game",
  metaTitle: "Team Introduction Game | Fun Group Icebreaker | FriendRank",
  metaDescription:
    "Create a team introduction game for new groups. Vote anonymously on fun roles, help everyone connect, and reveal results together.",
  h1: "Team Introduction Game",
  intentSummaryTitle: "What is a team introduction game?",
  intentSummary:
    "A team introduction game helps new groups learn names and personalities fast. FriendRank is a phone voting game: add people, share one link, vote on light roles, and reveal results together. Works for new teams, clubs, orientation, and first-day meetings. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for team introductions",
  exampleQuestionsTitle: "Popular team introduction questions",
  faqTitle: "Team introduction game FAQ",
  schemaDescription:
    "Create a team introduction game with FriendRank. Vote anonymously on fun roles, help everyone connect, and reveal results together. No signup required.",
  ctaLocation: "landing_team_introduction_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the best first impression",
      "Who is most likely to remember every name",
      "Who would make a great team ambassador",
    ],
    suggestedVibeTags: ["Office","College","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const GET_TO_KNOW_YOU_GAME_INTENT = {
  slug: "get-to-know-you-game",
  title: "Get to Know You Game",
  metaTitle: "Get to Know You Game | Fun Group Icebreaker | FriendRank",
  metaDescription:
    "Create a get to know you game for your group. Vote anonymously on fun roles, break the ice fast, and reveal shareable results.",
  h1: "Get to Know You Game",
  intentSummaryTitle: "What is a get to know you game?",
  intentSummary:
    "A get to know you game helps people open up without awkward small talk. FriendRank turns it into a phone voting game: add names, share one link, vote on playful roles, and unlock results together. Great for events, new classes, team socials, and friend meetups. No signup required.",
  whyFriendRankTitle: "Why FriendRank for get to know you games",
  exampleQuestionsTitle: "Popular get to know you questions",
  faqTitle: "Get to know you game FAQ",
  schemaDescription:
    "Create a get to know you game with FriendRank. Vote anonymously on fun roles, break the ice fast, and reveal shareable results. No signup required.",
  ctaLocation: "landing_get_to_know_you_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to share a fun fact first",
      "Who asks the best questions",
      "Who makes everyone feel comfortable",
    ],
    suggestedVibeTags: ["Party","College","Office"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const MEETING_ICEBREAKER_INTENT = {
  slug: "meeting-icebreaker",
  title: "Meeting Icebreaker",
  metaTitle: "Meeting Icebreaker Game | Quick Team Warmup | FriendRank",
  metaDescription:
    "Create a meeting icebreaker for your team. Vote anonymously on light roles, warm up fast, and reveal results before the agenda starts.",
  h1: "Meeting Icebreaker",
  intentSummaryTitle: "What is a meeting icebreaker?",
  intentSummary:
    "A meeting icebreaker gets everyone engaged before the real agenda starts. FriendRank is a two-minute phone voting game: add attendees, share one link, vote on light roles, and reveal results together. Works for team meetings, workshops, standups, and all-hands. No signup required.",
  whyFriendRankTitle: "Why FriendRank for meeting icebreakers",
  exampleQuestionsTitle: "Popular meeting icebreaker questions",
  faqTitle: "Meeting icebreaker FAQ",
  schemaDescription:
    "Create a meeting icebreaker with FriendRank. Vote anonymously on light roles, warm up fast, and reveal results before the agenda starts. No signup required.",
  ctaLocation: "landing_meeting_icebreaker" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who brings the best meeting energy",
      "Who is most likely to ask a great question",
      "Who keeps discussions on track",
    ],
    suggestedVibeTags: ["Office","Party","College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};


/** @see INTENT_VERSION */
export const WOULD_YOU_RATHER_FRIENDS_INTENT = {
  slug: "would-you-rather-friends",
  title: "Would You Rather for Friends",
  metaTitle: "Would You Rather for Friends | Group Voting Game | FriendRank",
  metaDescription:
    "Turn Would You Rather prompts into a friend group voting game. Vote anonymously, reveal funny picks, and share results in the chat.",
  h1: "Would You Rather for Friends",
  intentSummaryTitle: "What is Would You Rather for friends?",
  intentSummary:
    "Would You Rather is a classic choice game that gets funnier in a group. FriendRank turns prompts into a phone voting game: add friends, share one link, vote on who fits each side, and reveal shareable results. Perfect for group chats, parties, and game nights. No signup required.",
  whyFriendRankTitle: "Why FriendRank for Would You Rather",
  exampleQuestionsTitle: "Popular Would You Rather questions for friends",
  faqTitle: "Would You Rather for friends FAQ",
  schemaDescription:
    "Play Would You Rather with friends using FriendRank. Vote anonymously on funny choices, reveal group picks, and share results together. No signup required.",
  ctaLocation: "landing_would_you_rather_friends" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who would pick the weirder option",
      "Who takes choices too seriously",
      "Who would debate every answer",
    ],
    suggestedVibeTags: ["Party","Meme-heavy","Chaotic"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const NEVER_HAVE_I_EVER_FRIENDS_INTENT = {
  slug: "never-have-i-ever-friends",
  title: "Never Have I Ever for Friends",
  metaTitle: "Never Have I Ever for Friends | Group Voting Game | FriendRank",
  metaDescription:
    "Play Never Have I Ever as a friend group voting game. Vote anonymously on funny confessions, reveal results, and share laughs together.",
  h1: "Never Have I Ever for Friends",
  intentSummaryTitle: "What is Never Have I Ever for friends?",
  intentSummary:
    "Never Have I Ever is a party classic that works even better as a group vote. FriendRank lets friends pick who fits each prompt on their phones, keeps votes anonymous, and unlocks shareable results for the group chat. Great for hangouts, pregames, and casual nights in. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for Never Have I Ever",
  exampleQuestionsTitle: "Popular Never Have I Ever prompts for friends",
  faqTitle: "Never Have I Ever for friends FAQ",
  schemaDescription:
    "Play Never Have I Ever with friends on FriendRank. Vote anonymously on funny prompts, reveal group picks, and share results together. No signup required.",
  ctaLocation: "landing_never_have_i_ever_friends" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to get picked",
      "Who has the wildest stories",
      "Who keeps the game fun and light",
    ],
    suggestedVibeTags: ["Party","Chaotic","College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const THIS_OR_THAT_FRIENDS_INTENT = {
  slug: "this-or-that-friends",
  title: "This or That for Friends",
  metaTitle: "This or That for Friends | Quick Group Voting Game | FriendRank",
  metaDescription:
    "Play This or That with your friend group. Vote anonymously on quick choices, reveal funny group picks, and share results together.",
  h1: "This or That for Friends",
  intentSummaryTitle: "What is This or That for friends?",
  intentSummary:
    "This or That is a fast choice game perfect for group chats. FriendRank turns each prompt into a voting round: add friends, share one link, vote on who picks each side, and reveal results together. Works for icebreakers, road trips, and lazy hangouts. No account needed.",
  whyFriendRankTitle: "Why FriendRank for This or That",
  exampleQuestionsTitle: "Popular This or That questions for friends",
  faqTitle: "This or That for friends FAQ",
  schemaDescription:
    "Play This or That with friends on FriendRank. Vote anonymously on quick choices, reveal funny group picks, and share results together. No signup required.",
  ctaLocation: "landing_this_or_that_friends" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who picks the bolder option",
      "Who overthinks simple choices",
      "Who would start a debate about both",
    ],
    suggestedVibeTags: ["Party","College","Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const MOST_LIKELY_TO_QUESTIONS_INTENT = {
  slug: "most-likely-to-questions",
  title: "Most Likely To Questions",
  metaTitle: "Most Likely To Questions | Friend Group Voting Game | FriendRank",
  metaDescription:
    "Browse Most Likely To questions and turn them into a live friend voting game. Vote anonymously and reveal shareable group results.",
  h1: "Most Likely To Questions",
  intentSummaryTitle: "What are Most Likely To questions?",
  intentSummary:
    "Most Likely To questions are the backbone of every great group chat game. FriendRank lets you pick prompts, add friends, share one link, and vote anonymously on who fits each role. Results unlock together for laughs and screenshots. Perfect for parties, Discord servers, and college groups. No signup required.",
  whyFriendRankTitle: "Why FriendRank for Most Likely To questions",
  exampleQuestionsTitle: "Popular Most Likely To questions",
  faqTitle: "Most Likely To questions FAQ",
  schemaDescription:
    "Use Most Likely To questions with FriendRank. Vote anonymously with your group, reveal funny winners, and share results together. No signup required.",
  ctaLocation: "landing_most_likely_to_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to become famous",
      "Who is most likely to start drama",
      "Who is most likely to win an argument",
    ],
    suggestedVibeTags: ["Party","College","Chaotic"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const FRIENDSHIP_QUESTIONS_INTENT = {
  slug: "friendship-questions",
  title: "Friendship Questions",
  metaTitle: "Friendship Questions | Friend Group Voting Game | FriendRank",
  metaDescription:
    "Use friendship questions in a live group voting game. Vote anonymously on roles, reveal how your friends see each other, and share results.",
  h1: "Friendship Questions",
  intentSummaryTitle: "What are friendship questions?",
  intentSummary:
    "Friendship questions help groups learn how they see each other in a playful way. FriendRank is not a solo quiz. It is a phone voting game where friends pick who fits each prompt, vote anonymously, and unlock shareable results together. Great for close crews, roommates, and group chats. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for friendship questions",
  exampleQuestionsTitle: "Popular friendship questions",
  faqTitle: "Friendship questions FAQ",
  schemaDescription:
    "Play with friendship questions on FriendRank. Vote anonymously as a group, reveal funny roles, and share results together. No signup required.",
  ctaLocation: "landing_friendship_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the most loyal friend",
      "Who gives the best advice",
      "Who keeps the group together",
    ],
    suggestedVibeTags: ["College","Discord","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const ICEBREAKER_QUESTIONS_INTENT = {
  slug: "icebreaker-questions",
  title: "Icebreaker Questions",
  metaTitle: "Icebreaker Questions | Group Voting Game | FriendRank",
  metaDescription:
    "Use icebreaker questions in a quick group voting game. Vote anonymously, warm up fast, and reveal fun results together.",
  h1: "Icebreaker Questions",
  intentSummaryTitle: "What are icebreaker questions?",
  intentSummary:
    "Icebreaker questions help new groups connect without forced small talk. FriendRank turns them into a two-minute phone voting game: add names, share one link, vote on light roles, and reveal results together. Works for teams, classes, events, and friend meetups. No signup required.",
  whyFriendRankTitle: "Why FriendRank for icebreaker questions",
  exampleQuestionsTitle: "Popular icebreaker questions",
  faqTitle: "Icebreaker questions FAQ",
  schemaDescription:
    "Use icebreaker questions with FriendRank. Vote anonymously as a group, warm up fast, and reveal fun results together. No signup required.",
  ctaLocation: "landing_icebreaker_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the best first impression",
      "Who is most likely to make everyone laugh",
      "Who asks the best questions",
    ],
    suggestedVibeTags: ["Office","College","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const TEAM_BUILDING_QUESTIONS_INTENT = {
  slug: "team-building-questions",
  title: "Team Building Questions",
  metaTitle: "Team Building Questions | Workplace Voting Game | FriendRank",
  metaDescription:
    "Use team building questions in a light coworker voting game. Vote anonymously, spark conversation, and reveal results together.",
  h1: "Team Building Questions",
  intentSummaryTitle: "What are team building questions?",
  intentSummary:
    "Team building questions help coworkers connect beyond daily tasks. FriendRank makes them a quick phone voting game: add teammates, share one link, vote anonymously on positive roles, and reveal results together. Works for office socials, remote teams, and onboarding. No signup required.",
  whyFriendRankTitle: "Why FriendRank for team building questions",
  exampleQuestionsTitle: "Popular team building questions",
  faqTitle: "Team building questions FAQ",
  schemaDescription:
    "Use team building questions with FriendRank. Vote anonymously with coworkers, spark conversation, and reveal results together. No signup required.",
  ctaLocation: "landing_team_building_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who celebrates teammates the most",
      "Who makes new hires feel welcome",
      "Who keeps collaboration positive",
    ],
    suggestedVibeTags: ["Office","Soft drama","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const PARTY_QUESTIONS_INTENT = {
  slug: "party-questions",
  title: "Party Questions",
  metaTitle: "Party Questions | Fun Group Voting Game | FriendRank",
  metaDescription:
    "Use party questions in a live friend voting game. Vote anonymously on funny roles, keep the energy high, and share results together.",
  h1: "Party Questions",
  intentSummaryTitle: "What are party questions?",
  intentSummary:
    "Party questions keep the night moving when you need something quick and funny. FriendRank turns them into a phone voting game: add friends, share one link, vote on hilarious roles, and unlock shareable results. Perfect for birthdays, pregames, and house parties. No app install needed.",
  whyFriendRankTitle: "Why FriendRank for party questions",
  exampleQuestionsTitle: "Popular party questions",
  faqTitle: "Party questions FAQ",
  schemaDescription:
    "Use party questions with FriendRank. Vote anonymously with your group, keep the energy high, and share results together. No signup required.",
  ctaLocation: "landing_party_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the life of the party",
      "Who tells the best stories",
      "Who is most likely to start dancing",
    ],
    suggestedVibeTags: ["Party","Chaotic","College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const COUPLE_QUESTIONS_INTENT = {
  slug: "couple-questions",
  title: "Couple Questions",
  metaTitle: "Couple Questions | Fun Relationship Voting Game | FriendRank",
  metaDescription:
    "Use couple questions in a playful voting game. Vote anonymously on romantic roles, spark conversation, and reveal results together.",
  h1: "Couple Questions",
  intentSummaryTitle: "What are couple questions?",
  intentSummary:
    "Couple questions add something playful to date night or a double date. FriendRank turns them into a phone voting game: add names, share one link, vote on sweet and funny roles, and unlock results together. Works for couples at home, restaurants, and video dates. No signup required.",
  whyFriendRankTitle: "Why FriendRank for couple questions",
  exampleQuestionsTitle: "Popular couple questions",
  faqTitle: "Couple questions FAQ",
  schemaDescription:
    "Use couple questions with FriendRank. Vote anonymously, spark conversation, and reveal playful results together. No signup required.",
  ctaLocation: "landing_couple_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the more romantic partner",
      "Who plans the better date",
      "Who remembers important dates first",
    ],
    suggestedVibeTags: ["Soft drama","Party","Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};


/** @see INTENT_VERSION */
export const DEEP_QUESTIONS_FOR_FRIENDS_INTENT = {
  slug: "deep-questions-for-friends",
  title: "Deep Questions for Friends",
  metaTitle: "Deep Questions for Friends | Group Voting Game | FriendRank",
  metaDescription:
    "Use deep questions for friends in a live group voting game. Vote anonymously, spark real conversation, and reveal shareable results.",
  h1: "Deep Questions for Friends",
  intentSummaryTitle: "What are deep questions for friends?",
  intentSummary:
    "Deep questions for friends go beyond small talk and help close groups connect on a meaningful level. FriendRank turns them into a phone voting game: add names, share one link, vote on who fits each prompt, and reveal results together. Perfect for late-night hangouts, road trips, and tight friend circles. No signup required.",
  whyFriendRankTitle: "Why FriendRank for deep friend questions",
  exampleQuestionsTitle: "Popular deep questions for friends",
  faqTitle: "Deep questions for friends FAQ",
  schemaDescription:
    "Play deep questions for friends with FriendRank. Vote anonymously, spark real conversation, and reveal shareable group results. No signup required.",
  ctaLocation: "landing_deep_questions_for_friends" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the most honest advice",
      "Who asks the deepest questions",
      "Who makes hard talks feel safe",
    ],
    suggestedVibeTags: ["College","Discord","Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const FUNNY_QUESTIONS_FOR_FRIENDS_INTENT = {
  slug: "funny-questions-for-friends",
  title: "Funny Questions for Friends",
  metaTitle: "Funny Questions for Friends | Hilarious Group Voting Game | FriendRank",
  metaDescription:
    "Use funny questions for friends in a live voting game. Vote anonymously on hilarious roles, reveal laugh-out-loud results, and share them in the chat.",
  h1: "Funny Questions for Friends",
  intentSummaryTitle: "What are funny questions for friends?",
  intentSummary:
    "Funny questions for friends are built for laughs, not lectures. FriendRank turns them into a group voting game on phones: add names, share one link, vote on silly roles, and unlock shareable results for the group chat. Great for hangouts, pregames, and meme-heavy crews. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for funny friend questions",
  exampleQuestionsTitle: "Popular funny questions for friends",
  faqTitle: "Funny questions for friends FAQ",
  schemaDescription:
    "Play funny questions for friends with FriendRank. Vote anonymously on hilarious roles and share laugh-out-loud results together. No signup required.",
  ctaLocation: "landing_funny_questions_for_friends" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is secretly the biggest goofball",
      "Who would win a meme championship",
      "Who is most likely to trip over nothing",
    ],
    suggestedVibeTags: ["Meme-heavy","Chaotic","Party"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const RANDOM_QUESTIONS_FOR_FRIENDS_INTENT = {
  slug: "random-questions-for-friends",
  title: "Random Questions for Friends",
  metaTitle: "Random Questions for Friends | Spontaneous Group Voting Game | FriendRank",
  metaDescription:
    "Use random questions for friends in a spontaneous voting game. Vote anonymously, reveal funny picks, and share results in the group chat.",
  h1: "Random Questions for Friends",
  intentSummaryTitle: "What are random questions for friends?",
  intentSummary:
    "Random questions for friends keep hangouts unpredictable and fun. FriendRank is a phone voting game where you add names, share one link, vote on who fits each weird prompt, and reveal results together. Perfect when nobody planned a game night but the group chat needs energy. No account needed.",
  whyFriendRankTitle: "Why FriendRank for random friend questions",
  exampleQuestionsTitle: "Popular random questions for friends",
  faqTitle: "Random questions for friends FAQ",
  schemaDescription:
    "Play random questions for friends with FriendRank. Vote anonymously on spontaneous prompts and share funny group results. No signup required.",
  ctaLocation: "landing_random_questions_for_friends" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who would pick the weirdest superpower",
      "Who has the most random fun fact",
      "Who would win random trivia",
    ],
    suggestedVibeTags: ["Party","College","Chaotic"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const DEEP_QUESTIONS_FOR_COUPLES_INTENT = {
  slug: "deep-questions-for-couples",
  title: "Deep Questions for Couples",
  metaTitle: "Deep Questions for Couples | Relationship Voting Game | FriendRank",
  metaDescription:
    "Use deep questions for couples in a playful voting game. Vote anonymously, spark meaningful conversation, and reveal results together.",
  h1: "Deep Questions for Couples",
  intentSummaryTitle: "What are deep questions for couples?",
  intentSummary:
    "Deep questions for couples help partners learn more about each other in a low-pressure way. FriendRank turns them into a phone voting game: add names, share one link, vote on romantic and thoughtful roles, and unlock results together. Works for date night, anniversaries, and double dates. No signup required.",
  whyFriendRankTitle: "Why FriendRank for deep couple questions",
  exampleQuestionsTitle: "Popular deep questions for couples",
  faqTitle: "Deep questions for couples FAQ",
  schemaDescription:
    "Play deep questions for couples with FriendRank. Vote anonymously, spark meaningful conversation, and reveal results together. No signup required.",
  ctaLocation: "landing_deep_questions_for_couples" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is more emotionally open",
      "Who remembers the little things",
      "Who plans the deeper conversations",
    ],
    suggestedVibeTags: ["Soft drama","Family","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const ROMANTIC_QUESTIONS_INTENT = {
  slug: "romantic-questions",
  title: "Romantic Questions",
  metaTitle: "Romantic Questions | Couple Voting Game | FriendRank",
  metaDescription:
    "Use romantic questions in a fun couple voting game. Vote anonymously on sweet roles, spark date night conversation, and reveal results together.",
  h1: "Romantic Questions",
  intentSummaryTitle: "What are romantic questions?",
  intentSummary:
    "Romantic questions add something sweet to date night without feeling cheesy. FriendRank is a phone voting game where couples pick who fits each prompt, vote anonymously, and reveal playful results together. Great for dinners, anniversaries, and cozy nights in. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for romantic questions",
  exampleQuestionsTitle: "Popular romantic questions",
  faqTitle: "Romantic questions FAQ",
  schemaDescription:
    "Play romantic questions with FriendRank. Vote anonymously on sweet roles and reveal playful couple results together. No signup required.",
  ctaLocation: "landing_romantic_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the more romantic partner",
      "Who plans the better surprise",
      "Who gives the sweeter compliments",
    ],
    suggestedVibeTags: ["Soft drama","Party","Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const COUPLE_CONVERSATION_STARTERS_INTENT = {
  slug: "couple-conversation-starters",
  title: "Couple Conversation Starters",
  metaTitle: "Couple Conversation Starters | Fun Voting Game | FriendRank",
  metaDescription:
    "Use couple conversation starters in a playful voting game. Vote anonymously, break awkward silence, and reveal fun results together.",
  h1: "Couple Conversation Starters",
  intentSummaryTitle: "What are couple conversation starters?",
  intentSummary:
    "Couple conversation starters help partners open up without staring at menus in silence. FriendRank turns them into a quick phone voting game: add names, share one link, vote on fun prompts, and reveal results together. Works for new couples, long-term partners, and video dates. No signup required.",
  whyFriendRankTitle: "Why FriendRank for couple conversation starters",
  exampleQuestionsTitle: "Popular couple conversation starters",
  faqTitle: "Couple conversation starters FAQ",
  schemaDescription:
    "Use couple conversation starters with FriendRank. Vote anonymously, spark date night talk, and reveal fun results together. No signup required.",
  ctaLocation: "landing_couple_conversation_starters" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who asks the better questions",
      "Who starts the deeper talks",
      "Who keeps date conversation flowing",
    ],
    suggestedVibeTags: ["Soft drama","Party","Family"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const FUNNY_ICEBREAKER_QUESTIONS_INTENT = {
  slug: "funny-icebreaker-questions",
  title: "Funny Icebreaker Questions",
  metaTitle: "Funny Icebreaker Questions | Group Voting Game | FriendRank",
  metaDescription:
    "Use funny icebreaker questions in a quick group voting game. Vote anonymously, warm up fast, and reveal laugh-out-loud results together.",
  h1: "Funny Icebreaker Questions",
  intentSummaryTitle: "What are funny icebreaker questions?",
  intentSummary:
    "Funny icebreaker questions help new groups relax without forced small talk. FriendRank turns them into a two-minute phone voting game: add names, share one link, vote on hilarious roles, and reveal results together. Works for teams, classes, parties, and meetups. No signup required.",
  whyFriendRankTitle: "Why FriendRank for funny icebreakers",
  exampleQuestionsTitle: "Popular funny icebreaker questions",
  faqTitle: "Funny icebreaker questions FAQ",
  schemaDescription:
    "Use funny icebreaker questions with FriendRank. Vote anonymously, warm up fast, and reveal laugh-out-loud group results. No signup required.",
  ctaLocation: "landing_funny_icebreaker_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to make everyone laugh",
      "Who would tell the worst pun proudly",
      "Who breaks awkward silence best",
    ],
    suggestedVibeTags: ["Party","Office","College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const VIRTUAL_ICEBREAKER_QUESTIONS_INTENT = {
  slug: "virtual-icebreaker-questions",
  title: "Virtual Icebreaker Questions",
  metaTitle: "Virtual Icebreaker Questions | Remote Group Voting Game | FriendRank",
  metaDescription:
    "Use virtual icebreaker questions for remote teams and online groups. Vote anonymously on video calls and reveal fun results together.",
  h1: "Virtual Icebreaker Questions",
  intentSummaryTitle: "What are virtual icebreaker questions?",
  intentSummary:
    "Virtual icebreaker questions help remote groups connect beyond muted microphones. FriendRank is a browser voting game: add names, share a link in Zoom or Slack chat, vote anonymously, and reveal results live on call. Perfect for remote teams, online classes, and virtual events. No app install needed.",
  whyFriendRankTitle: "Why FriendRank for virtual icebreakers",
  exampleQuestionsTitle: "Popular virtual icebreaker questions",
  faqTitle: "Virtual icebreaker questions FAQ",
  schemaDescription:
    "Use virtual icebreaker questions with FriendRank. Vote anonymously on remote calls and reveal fun group results together. No signup required.",
  ctaLocation: "landing_virtual_icebreaker_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who keeps the best Zoom energy",
      "Who is most likely to unmute with a good joke",
      "Who makes remote intros fun",
    ],
    suggestedVibeTags: ["Office","Party","College"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const WORK_ICEBREAKER_QUESTIONS_INTENT = {
  slug: "work-icebreaker-questions",
  title: "Work Icebreaker Questions",
  metaTitle: "Work Icebreaker Questions | Workplace Voting Game | FriendRank",
  metaDescription:
    "Use work icebreaker questions for team meetings and office socials. Vote anonymously on light roles and reveal fun results together.",
  h1: "Work Icebreaker Questions",
  intentSummaryTitle: "What are work icebreaker questions?",
  intentSummary:
    "Work icebreaker questions warm up meetings without crossing professional lines. FriendRank turns them into a quick coworker voting game: add teammates, share one link, vote anonymously on light prompts, and reveal results together. Works for onboarding, standups, and team socials. No signup required.",
  whyFriendRankTitle: "Why FriendRank for work icebreakers",
  exampleQuestionsTitle: "Popular work icebreaker questions",
  faqTitle: "Work icebreaker questions FAQ",
  schemaDescription:
    "Use work icebreaker questions with FriendRank. Vote anonymously with coworkers and reveal lighthearted team results. No signup required.",
  ctaLocation: "landing_work_icebreaker_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who brings the best meeting energy",
      "Who makes new hires feel welcome",
      "Who keeps workplace icebreakers fun",
    ],
    suggestedVibeTags: ["Office","Soft drama","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const TEAM_MEETING_QUESTIONS_INTENT = {
  slug: "team-meeting-questions",
  title: "Team Meeting Questions",
  metaTitle: "Team Meeting Questions | Workplace Voting Game | FriendRank",
  metaDescription:
    "Use team meeting questions in a light coworker voting game. Vote anonymously, spark conversation, and reveal results before the agenda.",
  h1: "Team Meeting Questions",
  intentSummaryTitle: "What are team meeting questions?",
  intentSummary:
    "Team meeting questions help groups engage before diving into slides and status updates. FriendRank makes them a quick phone voting game: add teammates, share one link, vote anonymously on positive roles, and reveal results together. Works for standups, all-hands, and workshops. No signup required.",
  whyFriendRankTitle: "Why FriendRank for team meeting questions",
  exampleQuestionsTitle: "Popular team meeting questions",
  faqTitle: "Team meeting questions FAQ",
  schemaDescription:
    "Use team meeting questions with FriendRank. Vote anonymously with coworkers and reveal lighthearted results together. No signup required.",
  ctaLocation: "landing_team_meeting_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who asks the best meeting questions",
      "Who keeps discussions on track",
      "Who brings the best update energy",
    ],
    suggestedVibeTags: ["Office","Soft drama","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const TEAM_CHECK_IN_QUESTIONS_INTENT = {
  slug: "team-check-in-questions",
  title: "Team Check-In Questions",
  metaTitle: "Team Check-In Questions | Coworker Voting Game | FriendRank",
  metaDescription:
    "Use team check-in questions in a light workplace voting game. Vote anonymously, connect with coworkers, and reveal results together.",
  h1: "Team Check-In Questions",
  intentSummaryTitle: "What are team check-in questions?",
  intentSummary:
    "Team check-in questions help coworkers connect beyond task updates. FriendRank turns them into a phone voting game: add teammates, share one link, vote anonymously on supportive roles, and reveal results together. Great for standups, remote syncs, and team socials. No app download needed.",
  whyFriendRankTitle: "Why FriendRank for team check-ins",
  exampleQuestionsTitle: "Popular team check-in questions",
  faqTitle: "Team check-in questions FAQ",
  schemaDescription:
    "Use team check-in questions with FriendRank. Vote anonymously with coworkers and reveal supportive team results. No signup required.",
  ctaLocation: "landing_team_check_in_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who celebrates teammates the most",
      "Who notices when someone needs support",
      "Who keeps check-ins positive",
    ],
    suggestedVibeTags: ["Office","Soft drama","Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const TEAM_CONVERSATION_STARTERS_INTENT = {
  slug: "team-conversation-starters",
  title: "Team Conversation Starters",
  metaTitle: "Team Conversation Starters | Workplace Voting Game | FriendRank",
  metaDescription:
    "Use team conversation starters in a light coworker voting game. Vote anonymously, spark real talk, and reveal fun results together.",
  h1: "Team Conversation Starters",
  intentSummaryTitle: "What are team conversation starters?",
  intentSummary:
    "Team conversation starters help coworkers learn about each other beyond job titles. FriendRank is a quick voting game: add names, share one link, vote on light roles, and reveal results together. Works for onboarding, offsites, and virtual happy hours. No signup required.",
  whyFriendRankTitle: "Why FriendRank for team conversation starters",
  exampleQuestionsTitle: "Popular team conversation starters",
  faqTitle: "Team conversation starters FAQ",
  schemaDescription:
    "Use team conversation starters with FriendRank. Vote anonymously with coworkers and reveal fun team results together. No signup required.",
  ctaLocation: "landing_team_conversation_starters" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who asks the best getting-to-know-you questions",
      "Who makes new teammates feel welcome",
      "Who keeps team talk engaging",
    ],
    suggestedVibeTags: ["Office","Party","Soft drama"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const DRINKING_QUESTIONS_INTENT = {
  slug: "drinking-questions",
  title: "Drinking Questions",
  metaTitle: "Drinking Questions | Party Group Voting Game | FriendRank",
  metaDescription:
    "Use drinking questions as a party voting game alternative. Vote anonymously on funny roles and share results with your group.",
  h1: "Drinking Questions",
  intentSummaryTitle: "What are drinking questions on FriendRank?",
  intentSummary:
    "FriendRank drinking questions work as a party voting game focused on laughs, not complicated rules. Add friends, share one link, vote anonymously on funny prompts, and reveal shareable results. Works for pregames, house parties, and group chats. Play responsibly. No signup required.",
  whyFriendRankTitle: "Why FriendRank for party question games",
  exampleQuestionsTitle: "Popular drinking questions for groups",
  faqTitle: "Drinking questions FAQ",
  schemaDescription:
    "Use drinking questions with FriendRank as a party voting game. Vote anonymously on funny roles and share results together. No signup required.",
  ctaLocation: "landing_drinking_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is most likely to suggest another round",
      "Who tells the best party stories",
      "Who keeps the best energy in the room",
    ],
    suggestedVibeTags: ["Party","Chaotic","College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const BIRTHDAY_QUESTIONS_INTENT = {
  slug: "birthday-questions",
  title: "Birthday Questions",
  metaTitle: "Birthday Questions | Fun Party Voting Game | FriendRank",
  metaDescription:
    "Use birthday questions in a live party voting game. Vote anonymously on funny roles, celebrate together, and share results in the chat.",
  h1: "Birthday Questions",
  intentSummaryTitle: "What are birthday questions?",
  intentSummary:
    "Birthday questions add something interactive to the celebration beyond cake and candles. FriendRank turns them into a phone voting game: add friends, share one link, vote on funny birthday roles, and reveal results together. Perfect for parties, group chats, and surprise plans. No app install needed.",
  whyFriendRankTitle: "Why FriendRank for birthday questions",
  exampleQuestionsTitle: "Popular birthday questions",
  faqTitle: "Birthday questions FAQ",
  schemaDescription:
    "Use birthday questions with FriendRank. Vote anonymously at birthday parties and share funny group results together. No signup required.",
  ctaLocation: "landing_birthday_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who would plan the best surprise party",
      "Who gives the best birthday toast",
      "Who remembers everyone's birthday",
    ],
    suggestedVibeTags: ["Party","Family","College"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};
/** @see INTENT_VERSION */
export const CONVERSATION_STARTER_QUESTIONS_INTENT = {
  slug: "conversation-starter-questions",
  title: "Conversation Starter Questions",
  metaTitle: "Conversation Starter Questions | Group Voting Game | FriendRank",
  metaDescription:
    "Use conversation starter questions in a live group voting game. Vote anonymously, break the ice fast, and reveal fun results together.",
  h1: "Conversation Starter Questions",
  intentSummaryTitle: "What are conversation starter questions?",
  intentSummary:
    "Conversation starter questions help any group move past awkward silence. FriendRank turns them into a phone voting game: add names, share one link, vote on who fits each prompt, and reveal results together. Works for dates, meetups, teams, and group chats. No signup required.",
  whyFriendRankTitle: "Why FriendRank for conversation starters",
  exampleQuestionsTitle: "Popular conversation starter questions",
  faqTitle: "Conversation starter questions FAQ",
  schemaDescription:
    "Use conversation starter questions with FriendRank. Vote anonymously, break the ice fast, and reveal fun group results. No signup required.",
  ctaLocation: "landing_conversation_starter_questions" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who asks the best opening questions",
      "Who makes new people feel welcome",
      "Who keeps conversation flowing",
    ],
    suggestedVibeTags: ["Party","College","Office"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

export function getCanonicalUrl(slug: string): string {
  return `${PRODUCTION_APP_URL}/${slug}`;
}
