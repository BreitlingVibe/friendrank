import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";

export type IntentStatus = "planned" | "live";

export type IntentDefinition = {
  slug: string;
  title: string;
  intentCategory: (typeof INTENT_CATEGORIES)[keyof typeof INTENT_CATEGORIES];
  searchIntent: string;
  audience: string;
  /** Static planning score (0–100). Use getPriorityTier() to derive High/Medium/Low. */
  estimatedPriority: number;
  status: IntentStatus;
};

export const INTENT_REGISTRY: IntentDefinition[] = [
  // Live landing pages
  {
    slug: "most-likely-to-generator",
    title: "Most Likely To Generator",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Create a Most Likely To game for friends with anonymous voting and shareable results.",
    audience: "Friend groups, parties, college groups, Discord communities",
    estimatedPriority: 90,
    status: "live",
  },
  {
    slug: "best-friend-quiz",
    title: "Best Friend Quiz",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Run a fun best friend quiz where the group votes anonymously on roles.",
    audience: "Close friend groups, roommates, best friend circles",
    estimatedPriority: 85,
    status: "live",
  },
  {
    slug: "who-knows-me-best",
    title: "Who Knows Me Best",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Find out which friend knows you best through a group voting game.",
    audience: "Friend groups, birthdays, group chats",
    estimatedPriority: 82,
    status: "live",
  },
  {
    slug: "friendship-test",
    title: "Friendship Test",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Turn a friendship test into a social group game with shared results.",
    audience: "Friend groups, casual hangouts, online communities",
    estimatedPriority: 80,
    status: "live",
  },
  {
    slug: "anonymous-voting-game",
    title: "Anonymous Voting Game",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Run anonymous polls among friends without accounts or exposed ballots.",
    audience: "Friend groups, group chats, private social voting",
    estimatedPriority: 78,
    status: "live",
  },
  {
    slug: "group-voting-game",
    title: "Group Voting Game",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Create a general friend-group voting game with create-invite-vote-reveal flow.",
    audience: "Friend groups, roommates, Discord servers",
    estimatedPriority: 76,
    status: "live",
  },
  {
    slug: "party-voting-game",
    title: "Party Voting Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Add anonymous party voting entertainment for birthdays and hangouts.",
    audience: "Parties, birthday groups, college hangouts, game nights",
    estimatedPriority: 75,
    status: "live",
  },

  // Planned landing pages
  {
    slug: "who-is-most-likely-to",
    title: "Who Is Most Likely To",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Play Who Is Most Likely To with friends using a shareable voting game.",
    audience: "Friend groups, parties, icebreakers",
    estimatedPriority: 74,
    status: "planned",
  },
  {
    slug: "icebreaker-game",
    title: "Icebreaker Game",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Quick icebreaker game for new groups with anonymous friend voting.",
    audience: "New groups, classes, teams, events",
    estimatedPriority: 72,
    status: "live",
  },
  {
    slug: "couple-quiz",
    title: "Couple Quiz",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Playful couple quiz extended to friend groups with group voting.",
    audience: "Couples, double dates, friend groups with partners",
    estimatedPriority: 66,
    status: "live",
  },
  {
    slug: "bestie-quiz",
    title: "Bestie Quiz",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Fun bestie quiz where close friends vote on roles and inside jokes.",
    audience: "Best friend pairs, tight friend circles",
    estimatedPriority: 66,
    status: "live",
  },
  {
    slug: "friend-ranking-game",
    title: "Friend Ranking Game",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Rank friends on funny categories through a group voting game.",
    audience: "Friend groups, meme-heavy group chats",
    estimatedPriority: 66,
    status: "planned",
  },
  {
    slug: "team-building-game",
    title: "Team Building Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Light team building activity with anonymous group voting and shared results.",
    audience: "Work teams, remote teams, office socials",
    estimatedPriority: 70,
    status: "live",
  },
  {
    slug: "team-bonding-game",
    title: "Team Bonding Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Team bonding activity with anonymous voting to spark conversation and laughs.",
    audience: "Work teams, team socials, remote happy hours",
    estimatedPriority: 66,
    status: "live",
  },
  {
    slug: "work-team-game",
    title: "Work Team Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Workplace team game with anonymous coworker voting and shared results.",
    audience: "Office teams, hybrid teams, managers",
    estimatedPriority: 62,
    status: "live",
  },
  {
    slug: "friend-test",
    title: "Friend Test",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Friend test game where the group votes on traits and roles.",
    audience: "Friend groups, casual social games",
    estimatedPriority: 68,
    status: "live",
  },
  {
    slug: "funny-friend-quiz",
    title: "Funny Friend Quiz",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Humorous friend quiz with anonymous voting and funny group results.",
    audience: "Friend groups, party pre-games, group chats",
    estimatedPriority: 62,
    status: "live",
  },
  {
    slug: "party-game-for-adults",
    title: "Party Game for Adults",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Adult party game with phone-based anonymous voting, no app install.",
    audience: "Adult friend groups, house parties, social gatherings",
    estimatedPriority: 60,
    status: "planned",
  },
  {
    slug: "college-party-game",
    title: "College Party Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "College party game for dorms and friend groups with quick mobile voting.",
    audience: "College students, dorm groups, campus parties",
    estimatedPriority: 58,
    status: "live",
  },
  {
    slug: "office-icebreaker",
    title: "Office Icebreaker",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Office icebreaker using anonymous group voting for team socials.",
    audience: "Office teams, new hires, team offsites",
    estimatedPriority: 58,
    status: "live",
  },
  {
    slug: "birthday-party-game",
    title: "Birthday Party Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Birthday party game where friends vote on roles and share results.",
    audience: "Birthday groups, celebrations, friend gatherings",
    estimatedPriority: 68,
    status: "live",
  },
  {
    slug: "relationship-quiz",
    title: "Relationship Quiz",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Relationship quiz turned into a group voting game for couples and friends.",
    audience: "Couples, friend groups, double dates",
    estimatedPriority: 70,
    status: "live",
  },
  {
    slug: "boyfriend-girlfriend-quiz",
    title: "Boyfriend & Girlfriend Quiz",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Boyfriend and girlfriend quiz for dating couples with anonymous group voting.",
    audience: "Dating couples, new relationships, friend groups",
    estimatedPriority: 62,
    status: "live",
  },
  {
    slug: "sleepover-game",
    title: "Sleepover Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Sleepover game with friend voting on phones and shareable results.",
    audience: "Teen and young adult friend groups, sleepovers",
    estimatedPriority: 64,
    status: "live",
  },
  {
    slug: "girls-night-game",
    title: "Girls Night Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Girls night game with anonymous voting and funny group roles.",
    audience: "Friend groups, girls nights, casual hangouts",
    estimatedPriority: 62,
    status: "live",
  },
  {
    slug: "classroom-icebreaker",
    title: "Classroom Icebreaker",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Classroom icebreaker with student-friendly group voting on phones.",
    audience: "Teachers, students, new classes, youth groups",
    estimatedPriority: 52,
    status: "live",
  },
  {
    slug: "friend-group-game",
    title: "Friend Group Game",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "General friend group game with voting, roles, and shared results.",
    audience: "Friend groups of any size, group chats",
    estimatedPriority: 52,
    status: "planned",
  },
  {
    slug: "roommate-quiz",
    title: "Roommate Quiz",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Roommate quiz where housemates vote on funny roles anonymously.",
    audience: "Roommates, shared houses, college dorms",
    estimatedPriority: 50,
    status: "planned",
  },
  {
    slug: "social-game",
    title: "Social Game",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Browser social game for friend groups with anonymous voting.",
    audience: "Social groups, online communities, casual players",
    estimatedPriority: 50,
    status: "planned",
  },
  {
    slug: "personality-quiz-friends",
    title: "Personality Quiz for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Personality-style quiz where friends vote on who fits each trait.",
    audience: "Friend groups, personality quiz fans, group chats",
    estimatedPriority: 48,
    status: "planned",
  },
  {
    slug: "family-game-night",
    title: "Family Game Night",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Family game night activity with group voting on phones.",
    audience: "Families, mixed-age friend groups, home gatherings",
    estimatedPriority: 45,
    status: "planned",
  },
  {
    slug: "this-or-that-friends",
    title: "This or That for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "This or That style prompts adapted to a friend group voting game.",
    audience: "Friend groups, casual icebreakers, group chats",
    estimatedPriority: 42,
    status: "live",
  },
  {
    slug: "never-have-i-ever-friends",
    title: "Never Have I Ever for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Never Have I Ever style social game with group voting mechanics.",
    audience: "Friend groups, parties, casual hangouts",
    estimatedPriority: 40,
    status: "live",
  },
  {
    slug: "would-you-rather-friends",
    title: "Would You Rather for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Would You Rather prompts as a group voting game for friends.",
    audience: "Friend groups, party games, online chats",
    estimatedPriority: 38,
    status: "live",
  },
  {
    slug: "most-likely-to-questions",
    title: "Most Likely To Questions",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Most Likely To question prompts turned into a live friend group voting game.",
    audience: "Friend groups, parties, college groups, Discord communities",
    estimatedPriority: 44,
    status: "live",
  },
  {
    slug: "friendship-questions",
    title: "Friendship Questions",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Friendship question prompts for a group voting game with anonymous results.",
    audience: "Close friend groups, roommates, group chats",
    estimatedPriority: 43,
    status: "live",
  },
  {
    slug: "icebreaker-questions",
    title: "Icebreaker Questions",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Icebreaker question prompts for new groups with phone-based group voting.",
    audience: "Teams, classrooms, events, new friend groups",
    estimatedPriority: 42,
    status: "live",
  },
  {
    slug: "team-building-questions",
    title: "Team Building Questions",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Team building question prompts for workplace group voting activities.",
    audience: "Office teams, remote teams, managers, HR socials",
    estimatedPriority: 41,
    status: "live",
  },
  {
    slug: "party-questions",
    title: "Party Questions",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Party question prompts for friend group voting games at hangouts.",
    audience: "Party hosts, birthday groups, college parties, hangouts",
    estimatedPriority: 40,
    status: "live",
  },
  {
    slug: "couple-questions",
    title: "Couple Questions",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Couple question prompts for a playful relationship voting game.",
    audience: "Couples, date nights, double dates, friend groups",
    estimatedPriority: 39,
    status: "live",
  },
  {
    slug: "truth-or-dare-questions",
    title: "Truth or Dare Questions",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Truth or dare style question prompts adapted to a group voting game.",
    audience: "Friend groups, parties, casual hangouts",
    estimatedPriority: 36,
    status: "planned",
  },
  {
    slug: "deep-questions-for-friends",
    title: "Deep Questions for Friends",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Deep conversation questions for close friend groups with group voting.",
    audience: "Close friend groups, late-night hangouts, meaningful conversations",
    estimatedPriority: 37,
    status: "live",
  },
  {
    slug: "funny-questions-for-friends",
    title: "Funny Questions for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Funny question prompts for a lighthearted friend group voting game.",
    audience: "Friend groups, parties, meme-heavy group chats",
    estimatedPriority: 36,
    status: "live",
  },
  {
    slug: "random-questions-for-friends",
    title: "Random Questions for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Random question prompts for spontaneous friend group voting games.",
    audience: "Friend groups, casual game nights, group chats",
    estimatedPriority: 35,
    status: "live",
  },
  {
    slug: "deep-questions-for-couples",
    title: "Deep Questions for Couples",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Deep relationship questions for couples with playful group voting.",
    audience: "Couples, date nights, anniversaries, double dates",
    estimatedPriority: 38,
    status: "live",
  },
  {
    slug: "romantic-questions",
    title: "Romantic Questions",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Romantic question prompts for a couple voting game with shared results.",
    audience: "Couples, date nights, anniversaries",
    estimatedPriority: 37,
    status: "live",
  },
  {
    slug: "couple-conversation-starters",
    title: "Couple Conversation Starters",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Couple conversation starter prompts turned into a playful voting game.",
    audience: "Couples, new relationships, date nights",
    estimatedPriority: 36,
    status: "live",
  },
  {
    slug: "funny-icebreaker-questions",
    title: "Funny Icebreaker Questions",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Funny icebreaker question prompts for new groups with phone voting.",
    audience: "Teams, classes, parties, new friend groups",
    estimatedPriority: 38,
    status: "live",
  },
  {
    slug: "virtual-icebreaker-questions",
    title: "Virtual Icebreaker Questions",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Virtual icebreaker questions for remote teams and online groups.",
    audience: "Remote teams, online classes, virtual events",
    estimatedPriority: 37,
    status: "live",
  },
  {
    slug: "work-icebreaker-questions",
    title: "Work Icebreaker Questions",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Workplace icebreaker questions for team meetings and office socials.",
    audience: "Office teams, managers, onboarding groups",
    estimatedPriority: 36,
    status: "live",
  },
  {
    slug: "team-meeting-questions",
    title: "Team Meeting Questions",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Team meeting question prompts for light coworker group voting.",
    audience: "Office teams, standups, all-hands, workshops",
    estimatedPriority: 38,
    status: "live",
  },
  {
    slug: "team-check-in-questions",
    title: "Team Check-In Questions",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Team check-in question prompts for workplace group voting activities.",
    audience: "Remote teams, managers, team leads",
    estimatedPriority: 37,
    status: "live",
  },
  {
    slug: "team-conversation-starters",
    title: "Team Conversation Starters",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Team conversation starter prompts for coworker group voting games.",
    audience: "Office teams, onboarding, team socials",
    estimatedPriority: 36,
    status: "live",
  },
  {
    slug: "drinking-questions",
    title: "Drinking Questions",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Drinking question prompts as a party group voting game alternative.",
    audience: "Adult friend groups, parties, pregames",
    estimatedPriority: 37,
    status: "live",
  },
  {
    slug: "birthday-questions",
    title: "Birthday Questions",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Birthday question prompts for party group voting games.",
    audience: "Birthday groups, celebrations, friend gatherings",
    estimatedPriority: 36,
    status: "live",
  },
  {
    slug: "conversation-starter-questions",
    title: "Conversation Starter Questions",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Conversation starter prompts turned into a group voting game.",
    audience: "New groups, dates, team socials, friend meetups",
    estimatedPriority: 35,
    status: "live",
  },
  {
    slug: "group-questions",
    title: "Group Questions",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Collection of group questions turned into a live friend voting game.",
    audience: "Friend groups looking for question prompts",
    estimatedPriority: 35,
    status: "planned",
  },
  {
    slug: "remote-team-game",
    title: "Remote Team Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Remote team activity with anonymous voting for distributed coworkers.",
    audience: "Remote teams, distributed teams, async teams",
    estimatedPriority: 48,
    status: "live",
  },
  {
    slug: "virtual-team-building",
    title: "Virtual Team Building",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Virtual team building with phone-based anonymous group voting.",
    audience: "Remote teams, virtual offsites, online team socials",
    estimatedPriority: 46,
    status: "live",
  },
  {
    slug: "employee-engagement-game",
    title: "Employee Engagement Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Employee engagement activity using anonymous team voting and shared results.",
    audience: "HR teams, managers, workplace culture leads",
    estimatedPriority: 44,
    status: "live",
  },
  {
    slug: "anniversary-game",
    title: "Anniversary Game",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Anniversary game for couples with anonymous voting and shareable results.",
    audience: "Couples, anniversary celebrations, friend groups",
    estimatedPriority: 50,
    status: "live",
  },
  {
    slug: "date-night-game",
    title: "Date Night Game",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Date night game with quick phone voting for couples at home or out.",
    audience: "Couples, date nights, long-distance partners",
    estimatedPriority: 48,
    status: "live",
  },
  {
    slug: "newlywed-game",
    title: "Newlywed Game",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Newlywed-style game with group voting for couples and wedding parties.",
    audience: "Newlyweds, wedding parties, couples game nights",
    estimatedPriority: 46,
    status: "live",
  },
  {
    slug: "adult-party-game",
    title: "Adult Party Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Adult party game with phone-based anonymous voting and shareable results.",
    audience: "Adult friend groups, house parties, social gatherings",
    estimatedPriority: 58,
    status: "live",
  },
  {
    slug: "drinking-game",
    title: "Drinking Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Drinking game alternative with anonymous group voting on phones.",
    audience: "Adult friend groups, parties, casual hangouts",
    estimatedPriority: 52,
    status: "live",
  },
  {
    slug: "childhood-friends-quiz",
    title: "Childhood Friends Quiz",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Childhood friends quiz with group voting on nostalgic roles and memories.",
    audience: "Long-term friend groups, childhood besties, reunions",
    estimatedPriority: 54,
    status: "live",
  },
  {
    slug: "new-friends-game",
    title: "New Friends Game",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "New friends game to help groups bond with anonymous phone voting.",
    audience: "New friend groups, orientation, social meetups",
    estimatedPriority: 50,
    status: "live",
  },
  {
    slug: "friendship-challenge",
    title: "Friendship Challenge",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Friendship challenge game with group voting and shareable results.",
    audience: "Friend groups, group chats, social challenges",
    estimatedPriority: 48,
    status: "live",
  },
  {
    slug: "team-introduction-game",
    title: "Team Introduction Game",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Team introduction game for new groups with anonymous phone voting and shared results.",
    audience: "New teams, clubs, orientation groups, first-day meetings",
    estimatedPriority: 47,
    status: "live",
  },
  {
    slug: "get-to-know-you-game",
    title: "Get to Know You Game",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Get to know you game for new groups with quick anonymous voting on phones.",
    audience: "Events, new classes, team socials, friend meetups",
    estimatedPriority: 46,
    status: "live",
  },
  {
    slug: "meeting-icebreaker",
    title: "Meeting Icebreaker",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Quick meeting icebreaker with anonymous group voting before the agenda starts.",
    audience: "Teams, workshops, standups, all-hands meetings",
    estimatedPriority: 45,
    status: "live",
  },
  {
    slug: "games-for-large-groups",
    title: "Games for Large Groups",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Find browser games for large groups with anonymous phone voting and one shared link.",
    audience: "Large friend groups, reunions, big parties, and event hosts",
    estimatedPriority: 52,
    status: "live",
  },
  {
    slug: "games-for-small-groups",
    title: "Games for Small Groups",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Find intimate browser games for small groups with anonymous voting and shared results.",
    audience: "Small friend circles, trios, foursomes, and tight hangouts",
    estimatedPriority: 51,
    status: "live",
  },
  {
    slug: "games-for-roommates",
    title: "Games for Roommates",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Find funny roommate games with anonymous voting and shareable results in the browser.",
    audience: "Roommates, housemates, and shared-living friend groups",
    estimatedPriority: 50,
    status: "live",
  },
  {
    slug: "games-for-college-students",
    title: "Games for College Students",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find browser games for college students with anonymous voting and one link for the group chat.",
    audience: "College students, dorm groups, campus clubs, and student friend circles",
    estimatedPriority: 49,
    status: "live",
  },
  {
    slug: "games-for-work-meetings",
    title: "Games for Work Meetings",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Find light games for work meetings with anonymous voting that works on phones in minutes.",
    audience: "Managers, team leads, and coworkers in meetings and workshops",
    estimatedPriority: 48,
    status: "live",
  },
  {
    slug: "games-for-remote-teams",
    title: "Games for Remote Teams",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Find browser games for remote teams with anonymous voting over video calls and chat apps.",
    audience: "Remote teams, distributed coworkers, and virtual team leads",
    estimatedPriority: 47,
    status: "live",
  },
  {
    slug: "friday-team-games",
    title: "Friday Team Games",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Find fun Friday team games with anonymous voting to end the work week on a light note.",
    audience: "Office teams, managers, and coworkers winding down on Fridays",
    estimatedPriority: 46,
    status: "live",
  },
  {
    slug: "team-lunch-games",
    title: "Team Lunch Games",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Find quick team lunch games with anonymous phone voting while everyone eats together.",
    audience: "Coworkers, managers, and office teams at lunch or team meals",
    estimatedPriority: 45,
    status: "live",
  },
  {
    slug: "long-distance-couple-games",
    title: "Long Distance Couple Games",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Find browser games for long-distance couples with anonymous voting over video calls.",
    audience: "Long-distance couples, partners in different cities, and LDR relationships",
    estimatedPriority: 44,
    status: "live",
  },
  {
    slug: "newly-dating-games",
    title: "Newly Dating Games",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Find light games for newly dating couples with anonymous voting and playful results.",
    audience: "New couples, early dating pairs, and people in the first few months together",
    estimatedPriority: 43,
    status: "live",
  },
  {
    slug: "married-couple-games",
    title: "Married Couple Games",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Find fun games for married couples with anonymous voting and shareable results at home.",
    audience: "Married couples, long-term partners, and spouses at home or on date night",
    estimatedPriority: 42,
    status: "live",
  },
  {
    slug: "double-date-games",
    title: "Double Date Games",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Find games for double dates with anonymous group voting and shareable results for four people.",
    audience: "Couples on double dates, friend couples, and pairs hanging out together",
    estimatedPriority: 41,
    status: "live",
  },
  {
    slug: "sleepover-games",
    title: "Sleepover Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find sleepover games with anonymous phone voting and funny late-night results.",
    audience: "Friend groups at sleepovers, overnight hangs, and late-night get-togethers",
    estimatedPriority: 40,
    status: "live",
  },
  {
    slug: "house-party-games",
    title: "House Party Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find house party games with anonymous phone voting and one link for the whole room.",
    audience: "House party hosts, friend groups, and casual home celebrations",
    estimatedPriority: 39,
    status: "live",
  },
  {
    slug: "birthday-party-games",
    title: "Birthday Party Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find birthday party games with anonymous voting and shareable results for the celebration.",
    audience: "Birthday hosts, party guests, and friend groups celebrating together",
    estimatedPriority: 38,
    status: "live",
  },
  {
    slug: "bachelorette-party-games",
    title: "Bachelorette Party Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find bachelorette party games with anonymous voting and funny bridal-party results.",
    audience: "Bachelorette parties, bridal groups, and wedding celebration weekends",
    estimatedPriority: 37,
    status: "live",
  },
  {
    slug: "games-for-adults",
    title: "Games for Adults",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find browser games for adults with anonymous voting and funny group results.",
    audience: "Adult friend groups, house parties, and grown-up hangouts",
    estimatedPriority: 36,
    status: "live",
  },
  {
    slug: "games-for-teens",
    title: "Games for Teens",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find browser games for teens with anonymous voting and shareable group results.",
    audience: "Teen friend groups, youth hangouts, and high school social circles",
    estimatedPriority: 35,
    status: "live",
  },
  {
    slug: "games-for-families",
    title: "Games for Families",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find browser games for families with anonymous voting that works for mixed ages.",
    audience: "Families, relatives, holiday gatherings, and mixed-age groups",
    estimatedPriority: 34,
    status: "live",
  },
  {
    slug: "games-for-groups",
    title: "Games for Groups",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Find browser games for groups with anonymous voting and one shared link.",
    audience: "General groups, friend circles, events, and any social gathering",
    estimatedPriority: 53,
    status: "live",
  },
  {
    slug: "pregame-games",
    title: "Pregame Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find quick pregame games with anonymous phone voting before the main event starts.",
    audience: "Friend groups warming up before a night out, house party, or celebration",
    estimatedPriority: 33,
    status: "live",
  },
  {
    slug: "boys-night-games",
    title: "Boys Night Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find browser games for boys night with anonymous voting and one shared link.",
    audience: "Guys nights, bachelor hangs, and male friend groups",
    estimatedPriority: 32,
    status: "live",
  },
  {
    slug: "vacation-games",
    title: "Vacation Games",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find vacation games for travel groups with anonymous phone voting.",
    audience: "Friend groups on vacation, travel crews, and holiday trips",
    estimatedPriority: 31,
    status: "live",
  },
  {
    slug: "road-trip-games",
    title: "Road Trip Games",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find road trip games with anonymous voting that work from phones in the car.",
    audience: "Road trip crews, carpool groups, and long-drive friend groups",
    estimatedPriority: 30,
    status: "live",
  },
  {
    slug: "classroom-games",
    title: "Classroom Games",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Find classroom games with anonymous phone voting for students and teachers.",
    audience: "Teachers, students, and classroom groups looking for quick activities",
    estimatedPriority: 29,
    status: "live",
  },
  {
    slug: "high-school-games",
    title: "High School Games",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find high school games with anonymous voting for teen friend groups.",
    audience: "High school students, teen friend groups, and school social circles",
    estimatedPriority: 28,
    status: "live",
  },
  {
    slug: "middle-school-games",
    title: "Middle School Games",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find middle school games with anonymous voting for younger teen groups.",
    audience: "Middle school students, youth groups, and younger teen friend circles",
    estimatedPriority: 27,
    status: "live",
  },
  {
    slug: "student-orientation-games",
    title: "Student Orientation Games",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Find student orientation games with anonymous voting for new campus groups.",
    audience: "New students, orientation leaders, and campus welcome groups",
    estimatedPriority: 26,
    status: "live",
  },
  {
    slug: "new-employee-games",
    title: "New Employee Games",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Find new employee games with anonymous voting for welcome sessions.",
    audience: "HR teams, managers, and new hires in their first weeks",
    estimatedPriority: 25,
    status: "live",
  },
  {
    slug: "onboarding-games",
    title: "Onboarding Games",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Find onboarding games with anonymous voting for structured new-hire sessions.",
    audience: "HR leaders, people ops, and teams running structured onboarding",
    estimatedPriority: 24,
    status: "live",
  },
  {
    slug: "workshop-games",
    title: "Workshop Games",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Find workshop games with anonymous voting for training sessions and offsites.",
    audience: "Facilitators, trainers, and teams running workshops or offsites",
    estimatedPriority: 23,
    status: "live",
  },
  {
    slug: "conference-icebreaker-games",
    title: "Conference Icebreaker Games",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Find conference icebreaker games with anonymous voting for large attendee groups.",
    audience: "Conference attendees, event hosts, and large professional gatherings",
    estimatedPriority: 22,
    status: "live",
  },
  {
    slug: "family-reunion-games",
    title: "Family Reunion Games",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find family reunion games with anonymous voting for mixed-age relatives.",
    audience: "Extended families, reunion hosts, and multi-generation gatherings",
    estimatedPriority: 21,
    status: "live",
  },
  {
    slug: "holiday-family-games",
    title: "Holiday Family Games",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find holiday family games with anonymous voting for seasonal gatherings.",
    audience: "Families celebrating holidays together at home or visiting relatives",
    estimatedPriority: 20,
    status: "live",
  },
  {
    slug: "christmas-family-games",
    title: "Christmas Family Games",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find Christmas family games with anonymous voting for holiday gatherings.",
    audience: "Families celebrating Christmas together at home or visiting relatives",
    estimatedPriority: 19,
    status: "live",
  },
  {
    slug: "thanksgiving-games",
    title: "Thanksgiving Games",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Find Thanksgiving games with anonymous voting for holiday dinner groups.",
    audience: "Families and friends gathering for Thanksgiving dinner",
    estimatedPriority: 18,
    status: "live",
  },
  {
    slug: "graduation-party-games",
    title: "Graduation Party Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find graduation party games with anonymous voting for celebration guests.",
    audience: "Graduation hosts, families, and friends celebrating a graduate",
    estimatedPriority: 17,
    status: "live",
  },
  {
    slug: "baby-shower-games",
    title: "Baby Shower Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find baby shower games with anonymous voting for shower guests.",
    audience: "Baby shower hosts, expecting parents, and celebration guests",
    estimatedPriority: 16,
    status: "live",
  },
  {
    slug: "bridal-shower-games",
    title: "Bridal Shower Games",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Find bridal shower games with anonymous voting for wedding celebrations.",
    audience: "Bridal shower hosts, wedding parties, and celebration guests",
    estimatedPriority: 15,
    status: "live",
  },
  {
    slug: "reunion-games",
    title: "Reunion Games",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Find reunion games for friend and alumni groups with anonymous phone voting.",
    audience: "Friend groups, alumni crews, and class reunions reconnecting after time apart",
    estimatedPriority: 14,
    status: "live",
  },
];

export function getIntentBySlug(slug: string): IntentDefinition | undefined {
  return INTENT_REGISTRY.find((intent) => intent.slug === slug);
}

export function getLiveIntents(): IntentDefinition[] {
  return INTENT_REGISTRY.filter((intent) => intent.status === "live");
}

export function getPlannedIntents(): IntentDefinition[] {
  return INTENT_REGISTRY.filter((intent) => intent.status === "planned");
}

export function getIntentsByCategory(
  category: IntentDefinition["intentCategory"],
): IntentDefinition[] {
  return INTENT_REGISTRY.filter((intent) => intent.intentCategory === category);
}
