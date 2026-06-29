import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { CUSTOM_CATEGORY_PLACEHOLDERS } from "@/lib/game-build";
import type {
  LandingPageData,
  LandingPageRelatedPage,
  LandingPageWhyItem,
} from "@/lib/landing-pages/landing-page-types";

const CREATE_GAME_HREF = `${PRODUCTION_APP_URL}/#create-game`;

export const PLAY_IMMEDIATELY_TITLE = "Create your game in under a minute";

const SHARED_EXAMPLE_RESULTS = [
  {
    title: "Main Character",
    emoji: "👑",
    description:
      "The friend your group picks as the center of the story. Voted by the group, not assigned by a quiz.",
  },
  {
    title: "Chaos Agent",
    emoji: "🔥",
    description:
      "The friend who stirs things up. A classic outcome when the whole group votes.",
  },
  {
    title: "Secret Villain",
    emoji: "💀",
    description:
      "The quiet mastermind role. Perfect for drama, secrets, and inside jokes.",
  },
  {
    title: "Final group story",
    emoji: "🎭",
    description:
      "A narrative wrap-up with verdict, vibe, and a shareable ending card for the group chat.",
  },
] as const;

const SHARED_WHY_FRIEND_RANK: LandingPageWhyItem[] = [
  {
    title: "Anonymous voting",
    description:
      "Friends vote without signing in. The group sees results, not individual ballots.",
  },
  {
    title: "No sign-up required",
    description:
      "Create a game on the homepage and share the link. That is the whole setup.",
  },
  {
    title: "One link for everyone",
    description:
      "Same URL for voting and results. Drop it in WhatsApp, iMessage, or Discord.",
  },
  {
    title: "Works on any phone",
    description:
      "Built for the mobile browser. Friends vote in seconds from the group chat.",
  },
  {
    title: "Results unlock after everyone votes",
    description:
      "The game stays locked until enough friends vote. Then you reveal together.",
  },
];

const ACTIVE_RELATED_PAGES = [
  { slug: "most-likely-to-generator", title: "Most Likely To Generator" },
  { slug: "best-friend-quiz", title: "Best Friend Quiz" },
  { slug: "who-knows-me-best", title: "Who Knows Me Best" },
  { slug: "friendship-test", title: "Friendship Test" },
  { slug: "anonymous-voting-game", title: "Anonymous Voting Game" },
  { slug: "group-voting-game", title: "Group Voting Game" },
  { slug: "party-voting-game", title: "Party Voting Game" },
] as const;

const FUTURE_RELATED_PAGES = [
  { slug: "icebreaker-game", title: "Icebreaker Game" },
  { slug: "bestie-quiz", title: "Bestie Quiz" },
  { slug: "couple-quiz", title: "Couple Quiz" },
  { slug: "team-building-game", title: "Team Building Game" },
] as const;

function buildRelatedPages(currentSlug: string): LandingPageRelatedPage[] {
  return [
    ...ACTIVE_RELATED_PAGES.filter((page) => page.slug !== currentSlug).map(
      (page) => ({
        ...page,
        available: true,
      }),
    ),
    ...FUTURE_RELATED_PAGES.map((page) => ({
      ...page,
      available: false,
    })),
  ];
}

const POPULAR_MOST_LIKELY_TO_QUESTIONS = [
  { text: "Who is most likely to become famous?" },
  { text: "Who is most likely to survive a zombie apocalypse?" },
  { text: "Who is most likely to reply last?" },
  { text: "Who is most likely to forget a birthday?" },
  { text: "Who is most likely to become CEO?" },
  { text: "Who is most likely to go viral?" },
  { text: "Who is most likely to disappear for a week?" },
  { text: "Who is most likely to make everyone laugh?" },
  { text: "Who is most likely to win the lottery?" },
  { text: "Who is most likely to get lost while using Google Maps?" },
  { text: "Who is most likely to start a business?" },
  { text: "Who is most likely to accidentally become famous?" },
  { text: "Who is most likely to text the wrong person?" },
  { text: "Who is most likely to sleep through an alarm?" },
  { text: "Who is most likely to plan the next trip?" },
];

const BEST_FRIEND_QUIZ_QUESTIONS = [
  { text: "Who knows the group best?" },
  { text: "Who gives the best advice?" },
  { text: "Who is most likely to make everyone laugh?" },
  { text: "Who is most likely to keep a secret?" },
  { text: "Who is the most loyal friend?" },
  { text: "Who is most likely to plan the next trip?" },
  { text: "Who replies fastest?" },
  { text: "Who replies last?" },
  { text: "Who is most likely to start drama?" },
  { text: "Who is the friend everyone trusts?" },
  { text: "Who is most likely to remember every birthday?" },
  { text: "Who is most likely to send the best memes?" },
  { text: "Who is the funniest friend?" },
  { text: "Who is secretly the most responsible?" },
  { text: "Who would survive a group trip best?" },
];

const WHO_KNOWS_ME_BEST_QUESTIONS = [
  { text: "Who knows me best?" },
  { text: "Who would guess my favorite food?" },
  { text: "Who knows my worst habit?" },
  { text: "Who remembers my funniest story?" },
  { text: "Who knows what annoys me most?" },
  { text: "Who knows my dream vacation?" },
  { text: "Who would know my coffee order?" },
  { text: "Who knows my favorite movie?" },
  { text: "Who knows when I am lying?" },
  { text: "Who knows what I would do in a crisis?" },
  { text: "Who knows my most embarrassing moment?" },
  { text: "Who knows my biggest fear?" },
  { text: "Who knows my comfort show?" },
  { text: "Who knows my secret talent?" },
  { text: "Who would guess my next big decision?" },
];

const FRIENDSHIP_TEST_QUESTIONS = [
  { text: "Who is the most loyal friend?" },
  { text: "Who gives the best advice?" },
  { text: "Who is most likely to check in on everyone?" },
  { text: "Who is the funniest friend?" },
  { text: "Who is the most dramatic friend?" },
  { text: "Who is secretly the responsible one?" },
  { text: "Who is most likely to forgive first?" },
  { text: "Who is most likely to forget plans?" },
  { text: "Who is most likely to organize the group?" },
  { text: "Who is most likely to start a group chat?" },
  { text: "Who is most likely to keep everyone together?" },
  { text: "Who is most likely to be late?" },
  { text: "Who is most likely to defend a friend?" },
  { text: "Who is most likely to disappear for a week?" },
  { text: "Who is most likely to make the group laugh?" },
];

export const mostLikelyToGeneratorPage: LandingPageData = {
  slug: "most-likely-to-generator",
  title: "Most Likely To Generator",
  metaTitle:
    "Most Likely To Generator | Create a Friend Voting Game | FriendRank",
  metaDescription:
    "Create a Most Likely To game for your friends. Invite your group, vote anonymously, reveal funny roles, and share the results.",
  canonicalUrl: `${PRODUCTION_APP_URL}/most-likely-to-generator`,
  h1: "Most Likely To Generator for Friends",
  heroSubtitle:
    'Create a hilarious "Most Likely To" game in under a minute. Add your friends, share one link, let everyone vote anonymously, then reveal the funniest results together.',
  primaryCta: {
    label: "Create Your Most Likely To Game",
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See Example Questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is a Most Likely To generator?",
  intentSummary:
    'A Most Likely To generator turns classic "most likely to" prompts into a live voting game for your friend group. With FriendRank, you add names, share one link, and everyone votes on their phone. When enough friends have voted, results unlock with ranked winners and a group story you can share back to the chat. No app download. No account needed.',
  whyFriendRankTitle: "Why FriendRank works for Most Likely To",
  whyFriendRank: SHARED_WHY_FRIEND_RANK,
  playImmediatelyTitle: PLAY_IMMEDIATELY_TITLE,
  playImmediatelyBody:
    "Head to the FriendRank homepage, add your group, and paste in any Most Likely To prompts you like. You will get a share link in under a minute.",
  exampleQuestionsTitle: "Popular Most Likely To Questions",
  exampleQuestionsIntro:
    'Need inspiration? Here are some of the funniest "Most Likely To" questions to play with your friends.',
  exampleQuestions: POPULAR_MOST_LIKELY_TO_QUESTIONS,
  exampleResultsTitle: "What your group unlocks after voting",
  exampleResults: [...SHARED_EXAMPLE_RESULTS],
  faqTitle: "Most Likely To game FAQ",
  faq: [
    {
      question: "Is this a free Most Likely To generator?",
      answer:
        "Yes. FriendRank is free at friendrank.app. Create a game, share the link, and play with your group.",
    },
    {
      question: "Can we play without creating an account?",
      answer:
        "Yes. No sign-up, email, or password. The host creates a game and shares the link.",
    },
    {
      question: "Can I create my own Most Likely To questions?",
      answer:
        "Yes. Enter up to three custom prompts when you create a game. FriendRank fills the rest with defaults.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Votes are private to each person. The group only sees aggregated winners and story-style results.",
    },
    {
      question: "How many friends can join a Most Likely To game?",
      answer:
        "Add two to eight names when you create the game. Results unlock after enough friends vote.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes. Share the link in any chat app and friends vote on their phones. No install needed.",
    },
    {
      question: "When do results show up?",
      answer:
        "After enough friends vote, results unlock on the same link for everyone to view together.",
    },
    {
      question: "Who is this for?",
      answer:
        "Friend groups, parties, college groups, Discord servers, couples, icebreakers, and casual hangouts.",
    },
  ],
  relatedPagesTitle: "Related games",
  relatedPages: buildRelatedPages("most-likely-to-generator"),
  finalCtaTitle: "Make your Most Likely To game",
  finalCtaSubtitle:
    "Free, works on any phone, and ready to share in under a minute.",
  ctaLocation: "landing_most_likely_to_generator",
  gamePreset: {
    suggestedCustomCategories: [...CUSTOM_CATEGORY_PLACEHOLDERS],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  },
  schemaDescription:
    "Create a Most Likely To voting game for your friends with FriendRank. Groups vote anonymously on phone, unlock funny roles after enough votes, and share results. No signup required.",
};

export const bestFriendQuizPage: LandingPageData = {
  slug: "best-friend-quiz",
  title: "Best Friend Quiz",
  metaTitle: "Best Friend Quiz | Create a Fun Friend Voting Game | FriendRank",
  metaDescription:
    "Create a best friend quiz for your group. Add friends, vote anonymously, reveal funny roles, and share the results in minutes.",
  canonicalUrl: `${PRODUCTION_APP_URL}/best-friend-quiz`,
  h1: "Best Friend Quiz for Groups",
  heroSubtitle:
    "Create a fun best friend quiz for your group. Add friends, share one link, vote anonymously, then reveal who gets each role.",
  primaryCta: {
    label: "Create Your Best Friend Quiz",
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See Example Questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is a best friend quiz?",
  intentSummary:
    "A best friend quiz is a playful way to see how well your group knows each other. FriendRank is not a boring compatibility test. It is a group voting game where friends pick who fits each role, vote anonymously on their phones, and unlock funny results together. Perfect for best friend groups, roommates, and close friend circles.",
  whyFriendRankTitle: "Why FriendRank beats a typical best friend quiz",
  whyFriendRank: SHARED_WHY_FRIEND_RANK,
  playImmediatelyTitle: PLAY_IMMEDIATELY_TITLE,
  playImmediatelyBody:
    "Open FriendRank, add your friend group, and pick a few quiz-style prompts. Share the link and let everyone vote from the group chat.",
  exampleQuestionsTitle: "Popular best friend quiz questions",
  exampleQuestionsIntro:
    "Need inspiration? Here are fun best friend quiz questions your group can vote on.",
  exampleQuestions: BEST_FRIEND_QUIZ_QUESTIONS,
  exampleResultsTitle: "What your group unlocks after voting",
  exampleResults: [...SHARED_EXAMPLE_RESULTS],
  faqTitle: "Best friend quiz FAQ",
  faq: [
    {
      question: "What is a best friend quiz?",
      answer:
        "It is a fun game where your group votes on who fits each role or question. FriendRank turns it into a shared game with anonymous voting and group results.",
    },
    {
      question: "Can we play without creating an account?",
      answer:
        "Yes. Create a game on the homepage and share the link. No sign-up for anyone.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Yes. Each friend votes privately. The group sees winners and story-style results, not individual ballots.",
    },
    {
      question: "Can more than two friends play?",
      answer:
        "Yes. Add two to eight names when you create the game. The whole group can vote.",
    },
    {
      question: "Can I create my own questions?",
      answer:
        "Yes. Enter up to three custom prompts when you set up the game. FriendRank fills the rest.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes. Share the link in any chat app and friends vote on their phones.",
    },
    {
      question: "Can I share it on WhatsApp?",
      answer:
        "Yes. Copy the game link after creation and paste it into WhatsApp or any group chat.",
    },
    {
      question: "When do results unlock?",
      answer:
        "After enough friends vote, results open on the same link for everyone to see together.",
    },
  ],
  relatedPagesTitle: "Related games",
  relatedPages: buildRelatedPages("best-friend-quiz"),
  finalCtaTitle: "Start your best friend quiz",
  finalCtaSubtitle:
    "Free, works on any phone, and ready to share in under a minute.",
  ctaLocation: "landing_best_friend_quiz",
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows the group best",
      "Who gives the best advice",
      "Who is the most loyal friend",
    ],
    suggestedVibeTags: ["College", "Discord", "Party"],
    suggestedTone: "Wholesome",
  },
  schemaDescription:
    "Create a best friend quiz for your group with FriendRank. Friends vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
};

export const whoKnowsMeBestPage: LandingPageData = {
  slug: "who-knows-me-best",
  title: "Who Knows Me Best",
  metaTitle: "Who Knows Me Best Game | Play With Friends Online | FriendRank",
  metaDescription:
    "Create a Who Knows Me Best game for friends. Share one link, vote anonymously, unlock funny roles, and reveal your group story.",
  canonicalUrl: `${PRODUCTION_APP_URL}/who-knows-me-best`,
  h1: "Who Knows Me Best Game",
  heroSubtitle:
    "Find out who really knows you best. Create a game, invite your friends, vote anonymously, and reveal the funniest group results.",
  primaryCta: {
    label: "Create Your Who Knows Me Best Game",
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See Example Questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is a Who Knows Me Best game?",
  intentSummary:
    "A Who Knows Me Best game tests which friend knows you the most. With FriendRank, the whole group votes on funny social roles instead of filling out a solo quiz. Everyone picks from the friend list, votes on their phone, and results unlock with ranked winners and a shareable group story. Great for birthdays, group chats, and friend hangouts.",
  whyFriendRankTitle: "Why FriendRank works for Who Knows Me Best",
  whyFriendRank: SHARED_WHY_FRIEND_RANK,
  playImmediatelyTitle: PLAY_IMMEDIATELY_TITLE,
  playImmediatelyBody:
    "Add your friend group on FriendRank, include a few personal prompts if you like, and share one link. Everyone votes in minutes.",
  exampleQuestionsTitle: "Popular Who Knows Me Best questions",
  exampleQuestionsIntro:
    "Need inspiration? Here are Who Knows Me Best questions your friends can vote on.",
  exampleQuestions: WHO_KNOWS_ME_BEST_QUESTIONS,
  exampleResultsTitle: "What your group unlocks after voting",
  exampleResults: [...SHARED_EXAMPLE_RESULTS],
  faqTitle: "Who Knows Me Best FAQ",
  faq: [
    {
      question: "What is a Who Knows Me Best game?",
      answer:
        "It is a group game where friends vote on who knows you best and who fits each role. FriendRank handles voting, results, and sharing.",
    },
    {
      question: "Can I play it with a group?",
      answer:
        "Yes. Add two to eight friends when you create the game. Everyone with the link can vote.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Yes. Votes stay private. The group only sees aggregated winners and results.",
    },
    {
      question: "Do players need an account?",
      answer:
        "No. The host creates a game and shares the link. Voters open it and tap through the questions.",
    },
    {
      question: "Can I customize the questions?",
      answer:
        "Yes. Add up to three custom prompts when you create the game.",
    },
    {
      question: "Can I send the game in a group chat?",
      answer:
        "Yes. Share the link in WhatsApp, iMessage, Discord, or any chat app.",
    },
    {
      question: "How long does it take?",
      answer:
        "Creating a game takes under a minute. Voting is five quick taps per person.",
    },
    {
      question: "When do results unlock?",
      answer:
        "After enough friends vote, results open on the same link for the whole group.",
    },
  ],
  relatedPagesTitle: "Related games",
  relatedPages: buildRelatedPages("who-knows-me-best"),
  finalCtaTitle: "Start your Who Knows Me Best game",
  finalCtaSubtitle:
    "Free, works on any phone, and ready to share in under a minute.",
  ctaLocation: "landing_who_knows_me_best",
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows me best",
      "Who would guess my favorite food",
      "Who knows my worst habit",
    ],
    suggestedVibeTags: ["College", "Family", "Discord"],
    suggestedTone: "Funny",
  },
  schemaDescription:
    "Create a Who Knows Me Best game for friends with FriendRank. Groups vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
};

export const friendshipTestPage: LandingPageData = {
  slug: "friendship-test",
  title: "Friendship Test",
  metaTitle: "Friendship Test | Create a Fun Group Voting Game | FriendRank",
  metaDescription:
    "Create a friendship test for your group. Invite friends, vote anonymously, reveal funny roles, and share the results.",
  canonicalUrl: `${PRODUCTION_APP_URL}/friendship-test`,
  h1: "Friendship Test for Groups",
  heroSubtitle:
    "Turn a friendship test into a group game. Add your friends, vote anonymously, and reveal the roles, jokes, and stories inside your group.",
  primaryCta: {
    label: "Create Your Friendship Test",
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See Example Questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is a friendship test?",
  intentSummary:
    "A friendship test is a fun way to explore how your group sees each other. Most online friendship quizzes are solo and static. FriendRank makes it social: the whole group votes on who fits each role, results unlock together, and you get shareable story-style output for the chat. No app download. No account needed.",
  whyFriendRankTitle: "Why FriendRank is a better friendship test",
  whyFriendRank: SHARED_WHY_FRIEND_RANK,
  playImmediatelyTitle: PLAY_IMMEDIATELY_TITLE,
  playImmediatelyBody:
    "Create a game on FriendRank, add your group, and share the link. Friends vote on their phones and you reveal the results together.",
  exampleQuestionsTitle: "Popular friendship test questions",
  exampleQuestionsIntro:
    "Need inspiration? Here are friendship test questions your group can vote on.",
  exampleQuestions: FRIENDSHIP_TEST_QUESTIONS,
  exampleResultsTitle: "What your group unlocks after voting",
  exampleResults: [...SHARED_EXAMPLE_RESULTS],
  faqTitle: "Friendship test FAQ",
  faq: [
    {
      question: "What is a friendship test?",
      answer:
        "It is a playful way for a friend group to vote on roles and traits. FriendRank turns it into a live group game with shared results.",
    },
    {
      question: "How is FriendRank different from a normal friendship quiz?",
      answer:
        "Instead of one person answering alone, the whole group votes. Results unlock together and you get funny roles plus a group story.",
    },
    {
      question: "Can a whole group play?",
      answer:
        "Yes. Add two to eight friends when you create the game. Everyone votes from the same link.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Yes. Individual votes stay private. The group sees winners and narrative results only.",
    },
    {
      question: "Do we need to sign up?",
      answer:
        "No. Create a game on the homepage and share the link. That is all you need.",
    },
    {
      question: "Can I add custom questions?",
      answer:
        "Yes. Enter up to three custom prompts when you set up your game.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes. Built for phones. Share the link in your group chat and vote in seconds.",
    },
    {
      question: "Can we share the results?",
      answer:
        "Yes. Unlocked results include ranked roles and a shareable card for the group chat.",
    },
  ],
  relatedPagesTitle: "Related games",
  relatedPages: buildRelatedPages("friendship-test"),
  finalCtaTitle: "Start your friendship test",
  finalCtaSubtitle:
    "Free, works on any phone, and ready to share in under a minute.",
  ctaLocation: "landing_friendship_test",
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the most loyal friend",
      "Who gives the best advice",
      "Who is most likely to keep everyone together",
    ],
    suggestedVibeTags: ["Party", "College", "Soft drama"],
    suggestedTone: "Savage but friendly",
  },
  schemaDescription:
    "Create a friendship test for your group with FriendRank. Friends vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
};

const ANONYMOUS_VOTING_QUESTIONS = [
  { text: "Who gives the best advice?" },
  { text: "Who is secretly the funniest?" },
  { text: "Who would survive a zombie apocalypse?" },
  { text: "Who always arrives late?" },
  { text: "Who would become famous?" },
  { text: "Who is most likely to keep a secret?" },
  { text: "Who is the friend everyone trusts?" },
  { text: "Who is most likely to start drama?" },
  { text: "Who replies last in the group chat?" },
  { text: "Who is most likely to make everyone laugh?" },
  { text: "Who is secretly the most responsible?" },
  { text: "Who is most likely to forget plans?" },
  { text: "Who would win an argument they should lose?" },
  { text: "Who is most likely to go viral?" },
  { text: "Who is the Main Character?" },
];

const GROUP_VOTING_QUESTIONS = [
  { text: "Who is the Main Character?" },
  { text: "Who is the Chaos Agent?" },
  { text: "Who is the Secret Villain?" },
  { text: "Who is the biggest foodie?" },
  { text: "Who is the most competitive?" },
  { text: "Who is most likely to plan the next hangout?" },
  { text: "Who is the group therapist?" },
  { text: "Who is most likely to go viral?" },
  { text: "Who is chronically online?" },
  { text: "Who is the walking red flag?" },
  { text: "Who has the green flag energy?" },
  { text: "Who is most likely to start a group chat?" },
  { text: "Who is most likely to be late?" },
  { text: "Who is the plot twist generator?" },
  { text: "Who is most likely to make everyone laugh?" },
];

const PARTY_VOTING_QUESTIONS = [
  { text: "Who is most likely to start dancing first?" },
  { text: "Who is the most dramatic?" },
  { text: "Who is the biggest flirt?" },
  { text: "Who has the loudest laugh?" },
  { text: "Who is most likely to lose their phone?" },
  { text: "Who is most likely to become famous tonight?" },
  { text: "Who is most likely to start karaoke?" },
  { text: "Who is most likely to disappear to the snack table?" },
  { text: "Who is most likely to take the best photos?" },
  { text: "Who is most likely to stay until the end?" },
  { text: "Who is most likely to tell the best story?" },
  { text: "Who is most likely to start a dance circle?" },
  { text: "Who is the life of the party?" },
  { text: "Who is most likely to forget someone's name?" },
  { text: "Who is most likely to suggest an after-party?" },
];

export const anonymousVotingGamePage: LandingPageData = {
  slug: "anonymous-voting-game",
  title: "Anonymous Voting Game",
  metaTitle:
    "Anonymous Voting Game | Vote With Friends Online | FriendRank",
  metaDescription:
    "Create an anonymous voting game for friends. Share one link, vote privately, unlock group results, and reveal funny roles together.",
  canonicalUrl: `${PRODUCTION_APP_URL}/anonymous-voting-game`,
  h1: "Anonymous Voting Game for Friends",
  heroSubtitle:
    "Run a private vote with your friend group. No signup, one shared link, and results unlock after everyone votes.",
  primaryCta: {
    label: "Create Anonymous Voting Game",
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See Example Questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is an anonymous voting game?",
  intentSummary:
    "An anonymous voting game lets a group pick winners for fun categories without exposing individual ballots. FriendRank handles the whole flow: add friend names, share one link, everyone votes on their phone, and results unlock when enough votes are in. No accounts, no app download, and no public record of who voted for whom.",
  whyFriendRankTitle: "Why FriendRank for anonymous group voting",
  whyFriendRank: SHARED_WHY_FRIEND_RANK,
  playImmediatelyTitle: PLAY_IMMEDIATELY_TITLE,
  playImmediatelyBody:
    "Create a game on FriendRank, add your group, and share the link. Friends vote in private and you reveal the results together when the vote count is met.",
  exampleQuestionsTitle: "Popular anonymous voting questions",
  exampleQuestionsIntro:
    "Need inspiration? Here are fun questions your group can vote on anonymously.",
  exampleQuestions: ANONYMOUS_VOTING_QUESTIONS,
  exampleResultsTitle: "What your group unlocks after voting",
  exampleResults: [...SHARED_EXAMPLE_RESULTS],
  faqTitle: "Anonymous voting FAQ",
  faq: [
    {
      question: "Is voting anonymous?",
      answer:
        "Yes. Friends vote without signing in. The group sees aggregated winners and story-style results, not individual ballots.",
    },
    {
      question: "Can players see who voted for them?",
      answer:
        "No. FriendRank shows category winners and group narrative results. It does not reveal who picked whom.",
    },
    {
      question: "When are results revealed?",
      answer:
        "Results unlock after enough friends vote. Then anyone with the link can open it and view together.",
    },
    {
      question: "Do players need accounts?",
      answer:
        "No. The host creates a game and shares the link. Voters open it and tap through five questions.",
    },
    {
      question: "How many people can vote?",
      answer:
        "Add two to eight names when you create the game. Each friend can vote once from their device.",
    },
    {
      question: "Can I use this in a group chat?",
      answer:
        "Yes. Paste the game link in WhatsApp, iMessage, Discord, or any chat app.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes. FriendRank is built for the mobile browser. No install required.",
    },
    {
      question: "Is the game link private?",
      answer:
        "The link is unlisted. Anyone with the URL can vote, so share it only with your group.",
    },
  ],
  relatedPagesTitle: "Related games",
  relatedPages: buildRelatedPages("anonymous-voting-game"),
  finalCtaTitle: "Start your anonymous voting game",
  finalCtaSubtitle:
    "Free, private voting for friend groups. Ready to share in under a minute.",
  ctaLocation: "landing_anonymous_voting_game",
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the best advice",
      "Who is secretly the funniest",
      "Who would survive a zombie apocalypse",
    ],
    suggestedVibeTags: ["Discord", "College", "Brutal honesty"],
    suggestedTone: "Funny",
  },
  schemaDescription:
    "Create an anonymous voting game for friends with FriendRank. Share one link, vote privately, unlock group results and funny roles. No signup required.",
};

export const groupVotingGamePage: LandingPageData = {
  slug: "group-voting-game",
  title: "Group Voting Game",
  metaTitle: "Group Voting Game | Create a Friend Vote Online | FriendRank",
  metaDescription:
    "Create a group voting game for friends. Invite your group, vote on funny roles, unlock results together, and share the story.",
  canonicalUrl: `${PRODUCTION_APP_URL}/group-voting-game`,
  h1: "Group Voting Game for Friends",
  heroSubtitle:
    "Create a game, invite your group, vote on funny roles, and reveal the results together. One link, no signup, works on any phone.",
  primaryCta: {
    label: "Create Group Voting Game",
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See Example Questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is a group voting game?",
  intentSummary:
    "A group voting game turns your friend list into a live poll with personality. FriendRank follows a simple flow: create a game with names, invite the group with one link, let everyone vote on their phone, then reveal ranked roles and a group story when enough votes are in. It works for friend groups, roommates, Discord servers, and casual hangouts.",
  whyFriendRankTitle: "Why FriendRank for group voting",
  whyFriendRank: SHARED_WHY_FRIEND_RANK,
  playImmediatelyTitle: PLAY_IMMEDIATELY_TITLE,
  playImmediatelyBody:
    "Add your group on the FriendRank homepage, pick a tone, share the link, and let friends vote. Results unlock when the group is ready to reveal.",
  exampleQuestionsTitle: "Popular group voting questions",
  exampleQuestionsIntro:
    "Need inspiration? Here are group voting questions your friends can rank each other on.",
  exampleQuestions: GROUP_VOTING_QUESTIONS,
  exampleResultsTitle: "What your group unlocks after voting",
  exampleResults: [...SHARED_EXAMPLE_RESULTS],
  faqTitle: "Group voting game FAQ",
  faq: [
    {
      question: "How many friends can join?",
      answer:
        "Add two to eight names when you create the game. Everyone in the list appears as a vote option.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes. Share the link in your group chat and friends vote on their phones in seconds.",
    },
    {
      question: "Can I add custom categories?",
      answer:
        "Yes. Enter up to three custom prompts when you create the game. FriendRank fills the rest.",
    },
    {
      question: "Can we replay the same game?",
      answer:
        "The same link stays live for viewing results. To run a fresh round, create a new game on the homepage.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Yes. The group sees winners and narrative results, not who voted for whom.",
    },
    {
      question: "Do we need accounts?",
      answer:
        "No signup required. Create a game, share the link, and start voting.",
    },
    {
      question: "When do results unlock?",
      answer:
        "After enough distinct votes are collected. Then the whole group opens the link to reveal together.",
    },
    {
      question: "Can I share results in the group chat?",
      answer:
        "Yes. Unlocked results include ranked roles and a shareable card for WhatsApp or iMessage.",
    },
  ],
  relatedPagesTitle: "Related games",
  relatedPages: buildRelatedPages("group-voting-game"),
  finalCtaTitle: "Start your group voting game",
  finalCtaSubtitle:
    "Free for friend groups. Create, invite, vote, and reveal in under a minute.",
  ctaLocation: "landing_group_voting_game",
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the Main Character",
      "Who is the Chaos Agent",
      "Who is the biggest foodie",
    ],
    suggestedVibeTags: ["Gaming", "Discord", "Meme-heavy"],
    suggestedTone: "Chaotic",
  },
  schemaDescription:
    "Create a group voting game for friends with FriendRank. Invite the group, vote on funny roles, unlock results together, and share the story. No signup required.",
};

export const partyVotingGamePage: LandingPageData = {
  slug: "party-voting-game",
  title: "Party Voting Game",
  metaTitle: "Party Voting Game | Fun Group Vote for Parties | FriendRank",
  metaDescription:
    "Create a party voting game for your group. Anonymous votes, funny roles, and shareable results for birthdays, game nights, and college parties.",
  canonicalUrl: `${PRODUCTION_APP_URL}/party-voting-game`,
  h1: "Party Voting Game for Groups",
  heroSubtitle:
    "Make every party more fun with anonymous voting. Add your friends, share one link, vote on funny roles, and reveal the results together.",
  primaryCta: {
    label: "Create Party Voting Game",
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See Example Questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is a party voting game?",
  intentSummary:
    "A party voting game gives your group something quick and funny to do together. FriendRank lets everyone vote on their phone while the party is going. Pick categories like who starts dancing first or who has the loudest laugh, collect anonymous votes, and unlock shareable results for the room or the group chat. Works with or without drinks, and fine for mixed-age friend groups.",
  whyFriendRankTitle: "Why FriendRank works at parties",
  whyFriendRank: SHARED_WHY_FRIEND_RANK,
  playImmediatelyTitle: PLAY_IMMEDIATELY_TITLE,
  playImmediatelyBody:
    "Create a game before the party or on the spot. Share the link at the table or in the group chat and let votes roll in while everyone hangs out.",
  exampleQuestionsTitle: "Popular party voting questions",
  exampleQuestionsIntro:
    "Need inspiration? Here are party voting questions that get laughs fast.",
  exampleQuestions: PARTY_VOTING_QUESTIONS,
  exampleResultsTitle: "What your group unlocks after voting",
  exampleResults: [...SHARED_EXAMPLE_RESULTS],
  faqTitle: "Party voting game FAQ",
  faq: [
    {
      question: "Does this work for birthday parties?",
      answer:
        "Yes. Create a game with the friend group, share the link at the party, and reveal results together.",
    },
    {
      question: "Is it good for college parties?",
      answer:
        "Yes. Friends vote on their phones from the room or the group chat. No app install needed.",
    },
    {
      question: "Can we use it for game night?",
      answer:
        "Yes. It is a quick side activity between rounds or a fun opener when everyone arrives.",
    },
    {
      question: "Do we need drinking for this to be fun?",
      answer:
        "No. FriendRank is funny on its own. Drinks optional.",
    },
    {
      question: "Is it family friendly?",
      answer:
        "You control the tone and custom questions. Pick Wholesome or Funny for lighter party vibes.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Yes. The group sees winners and story results, not individual ballots.",
    },
    {
      question: "How fast can we start?",
      answer:
        "Under a minute to create. Share the link and friends vote in a few taps each.",
    },
    {
      question: "Can we share results after the party?",
      answer:
        "Yes. Results stay on the same link and include a shareable card for the group chat.",
    },
  ],
  relatedPagesTitle: "Related games",
  relatedPages: buildRelatedPages("party-voting-game"),
  finalCtaTitle: "Start your party voting game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready before the party gets going.",
  ctaLocation: "landing_party_voting_game",
  gamePreset: {
    suggestedCustomCategories: [
      "Most likely to start dancing first",
      "Who has the loudest laugh",
      "Who is most likely to lose their phone",
    ],
    suggestedVibeTags: ["Party", "College", "Chaotic"],
    suggestedTone: "Chaotic",
  },
  schemaDescription:
    "Create a party voting game for your group with FriendRank. Anonymous votes, funny roles, and shareable results for birthdays, game nights, and friend parties. No signup required.",
};

export const LANDING_PAGES: LandingPageData[] = [
  mostLikelyToGeneratorPage,
  bestFriendQuizPage,
  whoKnowsMeBestPage,
  friendshipTestPage,
  anonymousVotingGamePage,
  groupVotingGamePage,
  partyVotingGamePage,
];

export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
