export type HomepageFaqItem = {
  question: string;
  answer: string;
};

export const HOMEPAGE_FAQ_TITLE = "FriendRank FAQ";

export const HOMEPAGE_FAQ_ITEMS: HomepageFaqItem[] = [
  {
    question: "What is FriendRank?",
    answer:
      "FriendRank is a free browser-based party game where groups vote on funny prompts and reveal surprising results together.",
  },
  {
    question: "How does FriendRank work?",
    answer:
      "Create a game, add your group, share the invite link, vote anonymously, and reveal results such as Main Character, Chaos Agent, Secret Villain, and more.",
  },
  {
    question: "Is FriendRank free?",
    answer: "Yes. FriendRank is free to play.",
  },
  {
    question: "Do players need to download an app?",
    answer:
      "No. FriendRank works directly in the browser on desktop and mobile.",
  },
  {
    question: "Is voting anonymous?",
    answer:
      "Yes. FriendRank is designed around anonymous group voting so results feel more surprising and fun.",
  },
  {
    question: "Who is FriendRank for?",
    answer:
      "FriendRank is for friends, parties, teams, students, Discord groups, families, and any group that wants a quick social game.",
  },
  {
    question: "Can FriendRank be used for parties?",
    answer:
      "Yes. FriendRank works well as a party game because players can join from their phones and reveal funny group results together.",
  },
  {
    question: "Can FriendRank be used for team building?",
    answer:
      "Yes. FriendRank can be used as a light team-building or icebreaker game for small groups.",
  },
  {
    question: "How long does a FriendRank game take?",
    answer:
      "Most groups can start a FriendRank game in under 60 seconds. The full game usually takes a few minutes depending on group size.",
  },
  {
    question: "What kind of results does FriendRank reveal?",
    answer:
      "FriendRank reveals playful group roles such as Main Character, Chaos Agent, Secret Villain, and other funny rankings based on group votes.",
  },
];

export const HOMEPAGE_FAQ_QUESTIONS = HOMEPAGE_FAQ_ITEMS.map((item) => item.question);
