import type {
  FriendRankCategory,
  GeneratedGame,
  Tone,
  VibeTag,
} from "@/lib/game-build";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";

const CUSTOM_AGREE_QUOTE_TEMPLATES = [
  "{name} is the undisputed winner of \"{label}\".",
  "The group didn't even hesitate — {name} for {label}.",
  "If {label} had a face, it would look exactly like {name}.",
  "{name} and \"{label}\" are basically the same sentence.",
  "This category might as well be named after {name}.",
];

function hashSeed(values: string[]): number {
  let hash = 0;
  for (const value of values) {
    for (let index = 0; index < value.length; index += 1) {
      hash = (hash * 31 + value.charCodeAt(index)) | 0;
    }
  }
  return Math.abs(hash);
}

function pickIndex(seed: number, offset: number, length: number): number {
  if (length === 0) return 0;
  return Math.abs(seed + offset * 17) % length;
}

const GROUP_VERDICTS = [
  "Your group chose chaos.",
  "Nobody trusts each other and that's beautiful.",
  "This friend group should never be left unsupervised.",
  "The group chat is one bad decision away from disaster.",
  "Democracy happened. Regret is optional.",
  "The votes are in and accountability is not.",
  "Your group has officially lost the plot.",
  "Friendship survived. Barely.",
] as const;

const GROUP_REPUTATIONS = [
  "Certified Chaos Crew",
  "Emotionally Unstable Legends",
  "Professional Bad Influences",
  "Group Chat Menaces",
  "Elite Meme Department",
  "Unsupervised Adults Club",
  "Plot Twist Enthusiasts",
  "Chaos With WiFi",
] as const;

const COMBO_POTENTIAL_OUTCOMES = [
  "Starts drama",
  "Finishes nobody's plans",
  "Somehow becomes group leader",
  "Turns one meme into a group policy",
  "Plans a trip nobody asked for",
  "Accidentally creates a new inside joke",
  "Escalates a harmless comment",
  "Wins an argument nobody was having",
] as const;

const RISK_LEVELS = ["Moderate", "High", "Extreme"] as const;

const ENDING_CARD_VARIANTS = [
  {
    lines: [
      { text: "Congratulations.", large: false },
      { text: "Your friend group is officially:", large: false },
      { text: "CERTIFIED CHAOS.", large: true },
    ],
  },
  {
    lines: [
      { text: "GROUP CHAT THREAT LEVEL:", large: false },
      { text: "MAXIMUM.", large: true },
    ],
  },
  {
    lines: [
      { text: "Official diagnosis:", large: false },
      { text: "TOO ONLINE TO FUNCTION.", large: true },
    ],
  },
  {
    lines: [
      { text: "The jury has ruled.", large: false },
      { text: "GUILTY OF BEING UNHINGED.", large: true },
    ],
  },
] as const;

const CATEGORY_AGREE_QUOTES: Record<string, string[]> = {
  "Main Character": [
    "{name} definitely thinks this is their origin story.",
    "{name} has main character energy and the group knows it.",
    "The camera always finds {name} first.",
  ],
  "Chaos Agent": [
    "{name} treats peace like a personal challenge.",
    "If chaos needs a volunteer, {name} already raised their hand.",
    "{name} shows up and the plan immediately changes.",
  ],
  "Secret Villain": [
    "{name} always knows more than they admit.",
    "{name} has been suspiciously quiet this whole time.",
    "Trust {name} at your own risk — lovingly.",
  ],
  "Most Delusional": [
    "{name} believes their own hype and that's iconic.",
    "{name}'s confidence is unmatched and unverified.",
    "Reality is optional when {name} is involved.",
  ],
  "Chronically Online": [
    "{name} has seen every meme before you send it.",
    "{name} lives in the group chat like it's rent-free.",
    "Touch grass? {name} would rather refresh.",
  ],
  "Future Influencer": [
    "{name} is one good lighting day away from fame.",
    "Brand deals are already orbiting {name}.",
    "{name} treats every moment like content.",
  ],
  "Most Likely To Go Viral": [
    "{name} could go viral by accident before lunch.",
    "The algorithm would love {name}. The group is nervous.",
    "{name} is one screenshot away from trending.",
  ],
  "Group Therapist": [
    "{name} emotionally supports everyone for free.",
    "Someone had to be the therapist. It was {name}.",
    "{name} listens first, judges second, helps always.",
  ],
  "Walking Red Flag": [
    "{name} is a red flag with excellent presentation.",
    "Everyone saw the signs. Everyone still loves {name}.",
    "{name} is chaos in a cute outfit.",
  ],
  "Green Flag Award": [
    "{name} is the group chat's emotional support human.",
    "If {name} says it's fine, it's probably fine.",
    "{name} is the reason this group still functions.",
  ],
  "Plot Twist Generator": [
    "{name} will surprise you at the worst possible moment.",
    "Just when you think you know {name} — plot twist.",
    "{name} keeps the storyline interesting.",
  ],
  "Most Likely To Get Cancelled": [
    "{name} says what everyone else was thinking out loud.",
    "{name} has fearless posting energy.",
    "Cancel culture could never keep up with {name}.",
  ],
};

const DEFAULT_AGREE_QUOTES = [
  "The group has spoken about {name}.",
  "{name} earned this one fair and square.",
  "No notes. Just {name}.",
];

type GroupTheme = "party" | "college" | "online" | "generic";

type DangerousComboCard = {
  name1: string;
  name2: string;
  riskLevel: (typeof RISK_LEVELS)[number];
  outcomes: string[];
};

export type CategoryResultDetail = {
  category: FriendRankCategory;
  winner: string;
  votePercent: number;
  agreeQuote: string;
  stats: string[];
  rank: number;
};

export type ResultsPresentation = {
  seed: number;
  groupVerdict: string;
  groupReputation: string;
  categoryDetails: CategoryResultDetail[];
  dangerousCombo: DangerousComboCard;
  endingCard: (typeof ENDING_CARD_VARIANTS)[number];
  endingHighlight: string;
};

type RealCategoryStats = Pick<
  AggregatedCategoryResult,
  "voteCount" | "totalSessions" | "isTie" | "tiedFriends"
>;

export function generateMockCategoryVotes(game: GeneratedGame): string[] {
  return game.categories.map(
    (_, index) => game.friends[index % game.friends.length],
  );
}

export function buildFriendRankShareText(
  topThree: { category: FriendRankCategory; winner: string; votePercent: number }[],
  groupVerdict: string,
  groupVibe: string,
  groupReputation: string,
  endingHighlight: string,
): string {
  const lines = topThree.map(
    ({ category, winner, votePercent }) =>
      `${category.emoji} ${category.label}: ${winner} (${votePercent}% of votes)`,
  );

  return [
    "Your FriendRank Results",
    "",
    groupVerdict,
    "",
    ...lines,
    "",
    groupVibe,
    "",
    `Group reputation: ${groupReputation}`,
    "",
    endingHighlight,
    "",
    "Made with FriendRank",
  ].join("\n");
}

function pickComboFriends(friends: string[], seed: number): [string, string] {
  if (friends.length === 0) return ["Friend A", "Friend B"];
  if (friends.length === 1) return [friends[0], "the group chat"];
  const firstIndex = seed % friends.length;
  const secondIndex = (firstIndex + 1 + (seed % (friends.length - 1))) % friends.length;
  return [friends[firstIndex], friends[secondIndex]];
}

function generateVotePercent(seed: number, rank: number): number {
  const bases = [78, 68, 61, 57, 53];
  const base = bases[rank] ?? 50;
  return Math.min(91, base + (seed % 14));
}

function generateCategoryAgreeQuote(
  category: FriendRankCategory,
  winner: string,
  seed: number,
): string {
  if (category.isCustom) {
    const template =
      CUSTOM_AGREE_QUOTE_TEMPLATES[
        pickIndex(seed, category.label.length, CUSTOM_AGREE_QUOTE_TEMPLATES.length)
      ];
    return template
      .replace(/\{name\}/g, winner)
      .replace(/\{label\}/g, category.label);
  }

  const templates = CATEGORY_AGREE_QUOTES[category.label] ?? DEFAULT_AGREE_QUOTES;
  const template = templates[pickIndex(seed, category.label.length, templates.length)];
  return template.replace(/\{name\}/g, winner);
}

function generateDramaticStats(
  votePercent: number,
  seed: number,
  rank: number,
  realStats?: RealCategoryStats,
): string[] {
  if (realStats) {
    const { voteCount, totalSessions, isTie, tiedFriends } = realStats;

    if (totalSessions === 0) {
      return ["No votes recorded yet."];
    }

    const pool = [
      `${votePercent}% of the group supports this result.`,
      `${voteCount} of ${totalSessions} vote${totalSessions === 1 ? "" : "s"} went to the winner.`,
    ];

    const otherVotes = totalSessions - voteCount;
    if (otherVotes > 0) {
      pool.push(
        `${otherVotes} vote${otherVotes === 1 ? "" : "s"} went elsewhere.`,
      );
    }

    if (isTie && tiedFriends && tiedFriends.length > 1) {
      pool.push(`Dead heat between ${tiedFriends.join(" and ")}.`);
    }

    const count = Math.min(pool.length, 2 + (seed % 2));
    return pool.slice(0, count);
  }

  const pool = [
    `${votePercent}% of the group supports this result.`,
    `${1 + (seed % 2)} person strongly disagreed.`,
    `${1 + ((seed + rank) % 3)} people tried to defend them.`,
    "Nobody came to their rescue.",
    "One person abstained out of pure fear.",
    "The vote happened suspiciously fast.",
    "Two people laughed, then voted anyway.",
  ];

  const count = 2 + (seed % 2);
  const stats: string[] = [];
  for (let index = 0; index < count; index += 1) {
    const line = pool[pickIndex(seed, rank * 3 + index, pool.length)];
    if (!stats.includes(line)) {
      stats.push(line);
    }
  }

  return stats.slice(0, count);
}

function buildDangerousComboCard(
  friends: string[],
  seed: number,
): DangerousComboCard {
  const [name1, name2] = pickComboFriends(friends, seed);
  const riskLevel = RISK_LEVELS[pickIndex(seed, 4, RISK_LEVELS.length)];
  const outcomes: string[] = [];

  for (let index = 0; outcomes.length < 3; index += 1) {
    const outcome = COMBO_POTENTIAL_OUTCOMES[
      pickIndex(seed, index + 7, COMBO_POTENTIAL_OUTCOMES.length)
    ];
    if (!outcomes.includes(outcome)) {
      outcomes.push(outcome);
    }
  }

  return { name1, name2, riskLevel, outcomes };
}

function buildPresentationSeed(
  game: GeneratedGame,
  categoryResults: { category: FriendRankCategory; winner: string }[],
): number {
  return hashSeed([
    ...game.friends,
    ...game.vibeTags,
    game.extraContext,
    game.tone,
    ...categoryResults.map((result) => `${result.category.label}:${result.winner}`),
  ]);
}

function buildCategoryDetailsFromWinners(
  categoryResults: { category: FriendRankCategory; winner: string }[],
  seed: number,
  getVotePercent: (rank: number) => number,
  getRealStats?: (rank: number) => RealCategoryStats | undefined,
): CategoryResultDetail[] {
  return categoryResults.map((result, rank) => {
    const votePercent = getVotePercent(rank);
    const realStats = getRealStats?.(rank);

    return {
      ...result,
      votePercent,
      agreeQuote: generateCategoryAgreeQuote(
        result.category,
        result.winner,
        seed + rank,
      ),
      stats: generateDramaticStats(
        votePercent,
        seed + rank * 5,
        rank,
        realStats,
      ),
      rank,
    };
  });
}

function finalizeResultsPresentation(
  game: GeneratedGame,
  seed: number,
  categoryDetails: CategoryResultDetail[],
): ResultsPresentation {
  const endingCard =
    ENDING_CARD_VARIANTS[pickIndex(seed, 9, ENDING_CARD_VARIANTS.length)];
  const endingHighlight =
    endingCard.lines.find((line) => line.large)?.text ??
    endingCard.lines[endingCard.lines.length - 1].text;

  return {
    seed,
    groupVerdict: GROUP_VERDICTS[pickIndex(seed, 0, GROUP_VERDICTS.length)],
    groupReputation:
      GROUP_REPUTATIONS[pickIndex(seed, 2, GROUP_REPUTATIONS.length)],
    categoryDetails,
    dangerousCombo: buildDangerousComboCard(game.friends, seed),
    endingCard,
    endingHighlight,
  };
}

export function buildDemoResultsPresentation(
  game: GeneratedGame,
  votes: string[],
): ResultsPresentation {
  const friends = game.friends;
  const categoryResults = game.categories.map((category, index) => ({
    category,
    winner: votes[index] ?? friends[index % friends.length],
  }));

  const seed = buildPresentationSeed(game, categoryResults);
  const categoryDetails = buildCategoryDetailsFromWinners(
    categoryResults,
    seed,
    (rank) => generateVotePercent(seed + rank * 11, rank),
  );

  return finalizeResultsPresentation(game, seed, categoryDetails);
}

export function buildRealResultsPresentation(
  game: GeneratedGame,
  aggregatedResults: AggregatedCategoryResult[],
): ResultsPresentation {
  const friends = game.friends;
  const categoryResults = game.categories.map((category, index) => ({
    category,
    winner:
      aggregatedResults[index]?.winner ?? friends[index % friends.length],
  }));

  const seed = buildPresentationSeed(game, categoryResults);
  const categoryDetails = buildCategoryDetailsFromWinners(
    categoryResults,
    seed,
    (rank) => aggregatedResults[rank]?.votePercent ?? 0,
    (rank) => {
      const aggregated = aggregatedResults[rank];
      if (!aggregated) return undefined;

      return {
        voteCount: aggregated.voteCount,
        totalSessions: aggregated.totalSessions,
        isTie: aggregated.isTie,
        tiedFriends: aggregated.tiedFriends,
      };
    },
  );

  return finalizeResultsPresentation(game, seed, categoryDetails);
}

function buildGroupProfile(vibeTags: VibeTag[], extraContext: string): string {
  return [...vibeTags, extraContext.trim()].filter(Boolean).join(". ");
}

function detectGroupTheme(vibeTags: VibeTag[], extraContext: string): GroupTheme {
  if (vibeTags.includes("Party")) return "party";
  if (vibeTags.includes("College") || vibeTags.includes("School")) return "college";
  if (vibeTags.includes("Gaming") || vibeTags.includes("Discord")) return "online";

  const normalized = buildGroupProfile(vibeTags, extraContext).toLowerCase();

  if (/\b(beer|party|pub|drinks|bar|night out|club|wine|cocktail)\b/.test(normalized)) {
    return "party";
  }
  if (/\b(university|college|exam|campus|deadline|study|class|semester)\b/.test(normalized)) {
    return "college";
  }
  if (/\b(online|internet|gaming|discord|twitch|stream|wifi|game|gamer)\b/.test(normalized)) {
    return "online";
  }

  return "generic";
}

export function extractGroupVibePhrase(vibeTags: VibeTag[], extraContext: string): string {
  const trimmed = extraContext.trim();
  let contextSnippet = "";

  if (trimmed) {
    const firstClause = trimmed.split(/[,;!?]/)[0]?.trim() ?? trimmed;
    contextSnippet =
      firstClause.length <= 55
        ? firstClause
        : `${firstClause.slice(0, 52).trim()}...`;
  }

  if (vibeTags.length > 0 && contextSnippet) {
    return `${vibeTags.join(" · ")} — ${contextSnippet}`;
  }
  if (vibeTags.length > 0) return vibeTags.join(" · ");
  if (contextSnippet) return contextSnippet;

  return "your unique friend group";
}

function applyTonePrefix(text: string, tone: Tone): string {
  switch (tone) {
    case "Funny":
      return text;
    case "Savage but friendly":
      return text.replace(/^This group is /, "No cap, this group is ");
    case "Wholesome":
      return text.replace(/^This group is /, "Wholesome truth: this group is ");
    case "Chaotic":
      return text.replace(/^This group is /, "CHAOS ALERT: this group is ");
    default:
      return text;
  }
}

export function generateGroupVibe(
  topThree: { category: FriendRankCategory; winner: string }[],
  vibeTags: VibeTag[],
  extraContext: string,
  tone: Tone,
): string {
  const theme = detectGroupTheme(vibeTags, extraContext);

  const themeVibes: Record<Exclude<GroupTheme, "generic">, string[]> = {
    party: ["pub table chaos", "beer-fueled debates", "group chat after midnight"],
    college: ["exam stress", "deadline chaos", "campus drama"],
    online: ["chronically online energy", "Discord drama", "WiFi-powered chaos"],
  };

  const vibeMap: Record<string, string> = {
    "Main Character": "main character energy",
    "Chaos Agent": "chaos",
    "Secret Villain": "villain arc energy",
    "Most Delusional": "delusion",
    "Chronically Online": "chronically online energy",
    "Future Influencer": "influencer energy",
    "Most Likely To Go Viral": "viral energy",
    "Group Therapist": "therapy session energy",
    "Walking Red Flag": "red flag energy",
    "Green Flag Award": "green flag energy",
    "Plot Twist Generator": "plot twist energy",
    "Most Likely To Get Cancelled": "cancel-risk energy",
  };

  const percentages = [40, 35, 25];
  const parts = topThree.map((result, index) => {
    const themedVibe =
      theme !== "generic" ? themeVibes[theme][index] : undefined;
    const vibe =
      themedVibe ??
      vibeMap[result.category.label] ??
      result.category.label.toLowerCase();
    return `${percentages[index]}% ${vibe}`;
  });

  const vibeLabel =
    vibeTags.length > 0
      ? vibeTags.map((tag) => tag.toLowerCase()).join(" + ")
      : null;

  const base = vibeLabel
    ? `This ${vibeLabel} group is ${parts.join(", ")}.`
    : `This group is ${parts.join(", ")}.`;

  return applyTonePrefix(base, tone);
}
