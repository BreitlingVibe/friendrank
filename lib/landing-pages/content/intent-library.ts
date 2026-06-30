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
    'A Most Likely To generator turns classic "most likely to" prompts into a live voting game for your friend group. With FriendRank, you add names, share one link, and everyone votes on their phone. When enough friends have voted, results unlock with ranked winners and a group story you can share back to the chat. No app download. No account needed.',
  whyFriendRankTitle: "Why FriendRank works for Most Likely To",
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
    "An anonymous voting game lets a group pick winners for fun categories without exposing individual ballots. FriendRank handles the whole flow: add friend names, share one link, everyone votes on their phone, and results unlock when enough votes are in. No accounts, no app download, and no public record of who voted for whom.",
  whyFriendRankTitle: "Why FriendRank for anonymous group voting",
  exampleQuestionsTitle: "Popular anonymous voting questions",
  faqTitle: "Anonymous voting FAQ",
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
  metaTitle: "Group Voting Game | Create a Friend Vote Online | FriendRank",
  metaDescription:
    "Create a group voting game for friends. Invite your group, vote on funny roles, unlock results together, and share the story.",
  h1: "Group Voting Game for Friends",
  intentSummaryTitle: "What is a group voting game?",
  intentSummary:
    "A group voting game turns your friend list into a live poll with personality. FriendRank follows a simple flow: create a game with names, invite the group with one link, let everyone vote on their phone, then reveal ranked roles and a group story when enough votes are in. It works for friend groups, roommates, Discord servers, and casual hangouts.",
  whyFriendRankTitle: "Why FriendRank for group voting",
  exampleQuestionsTitle: "Popular group voting questions",
  faqTitle: "Group voting game FAQ",
  schemaDescription:
    "Create a group voting game for friends with FriendRank. Invite the group, vote on funny roles, unlock results together, and share the story. No signup required.",
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
  h1: "Party Voting Game for Groups",
  intentSummaryTitle: "What is a party voting game?",
  intentSummary:
    "A party voting game gives your group something quick and funny to do together. FriendRank lets everyone vote on their phone while the party is going. Pick categories like who starts dancing first or who has the loudest laugh, collect anonymous votes, and unlock shareable results for the room or the group chat. Works with or without drinks, and fine for mixed-age friend groups.",
  whyFriendRankTitle: "Why FriendRank works at parties",
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

export function getCanonicalUrl(slug: string): string {
  return `${PRODUCTION_APP_URL}/${slug}`;
}
