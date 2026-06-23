"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createGameAction } from "@/app/actions/games";
import { VoteGame } from "@/components/vote-game";
import {
  buildGameCategories,
  buildGeneratedGame,
  CUSTOM_CATEGORY_PLACEHOLDERS,
  FRIEND_RANK_CATEGORIES,
  MAX_VIBE_TAGS,
  parseGroupNames,
  tones,
  VIBE_TAGS,
  type FriendRankCategory,
  type GeneratedGame,
  type Tone,
  type VibeTag,
} from "@/lib/game-build";
import { getGameShareUrl, getInviteLinkText } from "@/lib/game-url";
import { VOTES_REQUIRED } from "@/lib/votes/constants";

const steps = [
  {
    number: "01",
    title: "Add your friends",
    description:
      "Enter your group's names, pick up to 3 vibe tags, and add optional inside jokes.",
  },
  {
    number: "02",
    title: "The game is created",
    description:
      "Get playful FriendRank categories, questions, and results tailored to your group vibe.",
  },
  {
    number: "03",
    title: "Share with friends",
    description:
      "Send a link. Everyone votes on their phone — no app download needed.",
  },
  {
    number: "04",
    title: "Share the results",
    description:
      "Reveal who got Main Character, Chaos Agent, Secret Villain — and copy results to flex in the group chat.",
  },
];

const CUSTOM_AGREE_QUOTE_TEMPLATES = [
  "{name} is the undisputed winner of \"{label}\".",
  "The group didn't even hesitate — {name} for {label}.",
  "If {label} had a face, it would look exactly like {name}.",
  "{name} and \"{label}\" are basically the same sentence.",
  "This category might as well be named after {name}.",
];

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20";

type GroupTheme = "party" | "college" | "online" | "generic";

function generateMockCategoryVotes(game: GeneratedGame): string[] {
  return game.categories.map(
    (_, index) => game.friends[index % game.friends.length],
  );
}

const DEFAULT_INVITE_NAMES = ["Emma", "Liam", "Olivia"];

type InviteStatus = "voted" | "invited" | "waiting";

function getInviteFriends(friends: string[]): string[] {
  const result = [...friends];
  for (const name of DEFAULT_INVITE_NAMES) {
    if (result.length >= VOTES_REQUIRED) break;
    if (!result.some((n) => n.toLowerCase() === name.toLowerCase())) {
      result.push(name);
    }
  }
  return result.slice(0, VOTES_REQUIRED);
}

function getInviteStatus(friendIndex: number, voteCount: number): InviteStatus {
  if (friendIndex < voteCount) return "voted";
  if (friendIndex === voteCount && voteCount < VOTES_REQUIRED) return "invited";
  return "waiting";
}

const inviteStatusConfig: Record<
  InviteStatus,
  { dot: string; label: string; className: string }
> = {
  voted: {
    dot: "🟢",
    label: "Voted",
    className: "text-emerald-400",
  },
  invited: {
    dot: "🟡",
    label: "Invited",
    className: "text-amber-400",
  },
  waiting: {
    dot: "⚪",
    label: "Waiting",
    className: "text-slate-400",
  },
};

function buildFriendRankShareText(
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
    "Made with FriendRank AI",
  ].join("\n");
}

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

type CategoryResultDetail = {
  category: FriendRankCategory;
  winner: string;
  votePercent: number;
  agreeQuote: string;
  stats: string[];
  rank: number;
};

type DangerousComboCard = {
  name1: string;
  name2: string;
  riskLevel: (typeof RISK_LEVELS)[number];
  outcomes: string[];
};

type ResultsPresentation = {
  seed: number;
  groupVerdict: string;
  groupReputation: string;
  categoryDetails: CategoryResultDetail[];
  dangerousCombo: DangerousComboCard;
  endingCard: (typeof ENDING_CARD_VARIANTS)[number];
  endingHighlight: string;
};

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
): string[] {
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

function buildResultsPresentation(
  game: GeneratedGame,
  votes: string[],
): ResultsPresentation {
  const friends = game.friends;
  const categoryResults = game.categories.map((category, index) => ({
    category,
    winner: votes[index] ?? friends[index % friends.length],
  }));

  const seed = hashSeed([
    ...friends,
    ...game.vibeTags,
    game.extraContext,
    game.tone,
    ...categoryResults.map((result) => `${result.category.label}:${result.winner}`),
  ]);

  const categoryDetails = categoryResults.map((result, rank) => {
    const votePercent = generateVotePercent(seed + rank * 11, rank);
    return {
      ...result,
      votePercent,
      agreeQuote: generateCategoryAgreeQuote(
        result.category,
        result.winner,
        seed + rank,
      ),
      stats: generateDramaticStats(votePercent, seed + rank * 5, rank),
      rank,
    };
  });

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
    dangerousCombo: buildDangerousComboCard(friends, seed),
    endingCard,
    endingHighlight,
  };
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

function extractGroupVibePhrase(vibeTags: VibeTag[], extraContext: string): string {
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

function generateGroupVibe(
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

function FriendRankResultsView({
  game,
  votes,
  unlockLabel,
  showPlayAgain = true,
  onPlayAgain,
}: {
  game: GeneratedGame;
  votes: string[];
  unlockLabel?: string;
  showPlayAgain?: boolean;
  onPlayAgain?: () => void;
}) {
  const [resultsCopied, setResultsCopied] = useState(false);

  const presentation = useMemo(
    () => buildResultsPresentation(game, votes),
    [game, votes],
  );

  const { categoryDetails, dangerousCombo } = presentation;
  const topThree = categoryDetails.slice(0, 3);
  const [first, second, third] = topThree;

  const groupVibePhrase = extractGroupVibePhrase(
    game.vibeTags,
    game.extraContext,
  );
  const groupVibe = generateGroupVibe(
    topThree,
    game.vibeTags,
    game.extraContext,
    game.tone,
  );
  const shareText = buildFriendRankShareText(
    topThree,
    presentation.groupVerdict,
    groupVibe,
    presentation.groupReputation,
    presentation.endingHighlight,
  );

  async function handleCopyResults() {
    try {
      await navigator.clipboard.writeText(shareText);
      setResultsCopied(true);
      setTimeout(() => setResultsCopied(false), 2000);
    } catch {
      setResultsCopied(false);
    }
  }

  function renderCategoryCard(detail: CategoryResultDetail, featured: boolean) {
    return (
      <div
        key={detail.category.label}
        className={
          featured
            ? "rounded-2xl border-2 border-violet-400/50 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-cyan-600/20 p-6 shadow-lg shadow-violet-500/20"
            : "rounded-2xl border border-white/15 bg-white/[0.04] p-5"
        }
      >
        {featured && (
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-violet-200">
            #1 · Top Rank
          </p>
        )}

        {detail.category.isCustom && (
          <p className="mb-2 text-center">
            <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">
              Custom category
            </span>
          </p>
        )}

        <p
          className={`font-bold uppercase tracking-wide text-white ${
            featured ? "text-lg" : "text-base"
          }`}
        >
          {detail.category.emoji} {detail.category.label}
        </p>

        <p
          className={`mt-2 font-extrabold text-white ${
            featured ? "text-3xl" : "text-2xl"
          }`}
        >
          {detail.winner}
        </p>

        <p className="mt-1 text-sm font-medium text-cyan-300/90">
          {detail.category.nickname}
        </p>

        <p className="mt-2 text-sm text-violet-200">
          {detail.winner} received {detail.votePercent}% of the votes.
        </p>

        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            The group agrees:
          </p>
          <p className="mt-2 text-sm italic leading-relaxed text-slate-200">
            &ldquo;{detail.agreeQuote}&rdquo;
          </p>
        </div>

        <ul className="mt-4 space-y-1.5 text-left">
          {detail.stats.map((stat) => (
            <li
              key={stat}
              className="flex items-start gap-2 text-xs text-slate-400"
            >
              <span className="mt-0.5 text-violet-400">•</span>
              <span>{stat}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-[2rem] border-2 border-violet-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl shadow-violet-500/30">
      {unlockLabel && (
        <div className="border-b border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            {unlockLabel}
          </p>
        </div>
      )}

      <div className="bg-gradient-to-r from-violet-600/25 via-fuchsia-600/15 to-cyan-600/25 px-6 py-7 text-center">
        <p className="text-3xl">👑</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Your FriendRank Results
        </h2>
        <p className="mt-2 text-base text-violet-200">Your group has spoken.</p>
        <p className="mt-3 text-sm text-slate-400">
          Based on your group vibe:{" "}
          <span className="text-violet-300">{groupVibePhrase}</span>
        </p>
      </div>

      <div className="space-y-4 px-5 py-6 sm:px-6">
        <div className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-5 py-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">
            Group Verdict
          </p>
          <p className="mt-2 text-lg font-bold leading-snug text-white">
            {presentation.groupVerdict}
          </p>
        </div>

        {first && renderCategoryCard(first, true)}

        {(second || third) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {second && renderCategoryCard(second, false)}
            {third && renderCategoryCard(third, false)}
          </div>
        )}

        {categoryDetails.slice(3).map((detail) => renderCategoryCard(detail, false))}

        <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            Group Vibe
          </p>
          <p className="mt-3 text-base font-medium leading-relaxed text-white">
            {groupVibe}
          </p>
        </div>

        <div className="rounded-2xl border border-orange-500/25 bg-orange-500/10 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-300">
            Most Dangerous Combo
          </p>
          <p className="mt-3 text-xl font-extrabold text-white">
            {dangerousCombo.name1} + {dangerousCombo.name2}
          </p>
          <p className="mt-2 text-sm font-semibold text-orange-200">
            Risk level: {dangerousCombo.riskLevel}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-orange-300/80">
            Potential outcomes:
          </p>
          <ul className="mt-2 space-y-1.5">
            {dangerousCombo.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex items-start gap-2 text-sm text-orange-100/90"
              >
                <span className="text-orange-400">⚡</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-violet-500/25 bg-violet-500/10 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-300">
            Group Reputation
          </p>
          <p className="mt-3 text-xl font-extrabold tracking-tight text-white">
            {presentation.groupReputation}
          </p>
        </div>

        <div className="rounded-3xl border-2 border-violet-400/40 bg-gradient-to-br from-violet-600/35 via-fuchsia-600/20 to-cyan-600/25 px-6 py-10 text-center shadow-xl shadow-violet-500/25">
          {presentation.endingCard.lines.map((line, index) => (
            <p
              key={`${line.text}-${index}`}
              className={
                line.large
                  ? `${index > 0 ? "mt-3" : ""} text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl`
                  : `${index > 0 ? "mt-2" : ""} text-base font-semibold text-violet-100`
              }
            >
              {line.text}
            </p>
          ))}
          <p className="mt-6 text-xs italic text-violet-200/80">
            Screenshot this before your friends deny everything.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyResults}
          className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500"
        >
          {resultsCopied ? (
            <span className="text-white">✓ Copied!</span>
          ) : (
            "📋 Copy Share Text"
          )}
        </button>

        {showPlayAgain && onPlayAgain && (
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-semibold transition hover:bg-white/10"
          >
            Play again
          </button>
        )}

        <p className="text-center text-xs text-slate-500">Made with FriendRank AI</p>
      </div>
    </div>
  );
}

function WaitingForVotesCard({
  friends,
  voteCount,
  isUnlocked,
  showCelebration,
  onSimulateVote,
}: {
  friends: string[];
  voteCount: number;
  isUnlocked: boolean;
  showCelebration: boolean;
  onSimulateVote: () => void;
}) {
  const inviteFriends = getInviteFriends(friends);
  const progressPercent = (voteCount / VOTES_REQUIRED) * 100;

  if (isUnlocked) {
    return (
      <div
        className={`rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-violet-600/10 p-6 text-center sm:p-8 ${
          showCelebration ? "animate-pulse" : ""
        }`}
      >
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl ring-4 ring-emerald-500/30">
          🔓
        </div>
        <p className="text-2xl font-bold text-emerald-300">Results Unlocked</p>
        <p className="mt-2 text-sm text-slate-400">
          {VOTES_REQUIRED} friend votes collected — your group results are below
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
      <div className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          Live
        </div>
        <h3 className="text-xl font-bold sm:text-2xl">
          Waiting for your friends...
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Results unlock after {VOTES_REQUIRED} friend votes.
        </p>
      </div>

      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
        <span>Votes collected</span>
        <span className="font-semibold text-violet-300">
          {voteCount} / {VOTES_REQUIRED} friend votes
        </span>
      </div>
      <div className="mb-6 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mb-6 space-y-2">
        {inviteFriends.map((name, index) => {
          const status = getInviteStatus(index, voteCount);
          const config = inviteStatusConfig[status];

          return (
            <div
              key={`${name}-${index}`}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
            >
              <span className="font-medium">
                {config.dot} {name}
              </span>
              <span className={`text-sm ${config.className}`}>
                {config.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mb-3 text-center text-xs leading-relaxed text-slate-500">
        Demo only: this simulates friends opening your invite link and voting.
      </p>
      <button
        type="button"
        onClick={onSimulateVote}
        disabled={voteCount >= VOTES_REQUIRED}
        className="w-full rounded-full border border-white/15 bg-white/10 py-3.5 text-sm font-semibold transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Simulate Friend Vote
      </button>
    </div>
  );
}

function SectionLabel({
  children,
  description,
}: {
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
          {children}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>
      {description && (
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}

export default function Home() {
  const createGameRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const friendVotingRef = useRef<HTMLElement>(null);
  const unlockedResultsRef = useRef<HTMLElement>(null);

  const [groupNames, setGroupNames] = useState("");
  const [selectedVibeTags, setSelectedVibeTags] = useState<VibeTag[]>([]);
  const [extraContext, setExtraContext] = useState("");
  const [customCategories, setCustomCategories] = useState(["", "", ""]);
  const [tone, setTone] = useState<Tone>("Funny");
  const [generatedGame, setGeneratedGame] = useState<GeneratedGame | null>(
    null,
  );
  const [shareCode, setShareCode] = useState<string | null>(null);
  const [isSavingGame, setIsSavingGame] = useState(false);
  const [saveGameError, setSaveGameError] = useState<string | null>(null);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [friendVotingStarted, setFriendVotingStarted] = useState(false);
  const [pendingFriendVotingScroll, setPendingFriendVotingScroll] =
    useState(false);
  const [simulatedVoteCount, setSimulatedVoteCount] = useState(0);
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false);
  const [demoResultsUnlocked, setDemoResultsUnlocked] = useState(false);
  const [previewVotes, setPreviewVotes] = useState<string[] | null>(null);
  const [pendingResultsScroll, setPendingResultsScroll] = useState(false);
  const [feedbackResponse, setFeedbackResponse] = useState<
    "yes" | "not-yet" | null
  >(null);
  const [shareabilityNote, setShareabilityNote] = useState("");

  const multiplayerResultsUnlocked = simulatedVoteCount >= VOTES_REQUIRED;
  const showResultsView = multiplayerResultsUnlocked || demoResultsUnlocked;

  const previewCategories = useMemo(
    () => buildGameCategories(customCategories, parseGroupNames(groupNames)),
    [customCategories, groupNames],
  );

  function updateCustomCategory(index: number, value: string) {
    setCustomCategories((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  useEffect(() => {
    if (pendingFriendVotingScroll && friendVotingRef.current) {
      friendVotingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setPendingFriendVotingScroll(false);
    }
  }, [pendingFriendVotingScroll]);

  useEffect(() => {
    if (pendingResultsScroll && showResultsView && unlockedResultsRef.current) {
      unlockedResultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setPendingResultsScroll(false);
    }
  }, [pendingResultsScroll, showResultsView]);

  useEffect(() => {
    if (multiplayerResultsUnlocked) {
      setShowUnlockCelebration(true);
      setPendingResultsScroll(true);
      const celebrationTimer = setTimeout(
        () => setShowUnlockCelebration(false),
        2000,
      );
      return () => clearTimeout(celebrationTimer);
    }
  }, [multiplayerResultsUnlocked]);

  function handleSimulateVote() {
    setSimulatedVoteCount((prev) =>
      prev < VOTES_REQUIRED ? prev + 1 : prev,
    );
  }

  function scrollToCreateGame() {
    createGameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToCategories() {
    categoriesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToFriendVotingView() {
    setPendingFriendVotingScroll(true);
  }

  function handleViewDemoResults() {
    setDemoResultsUnlocked(true);
    setPendingResultsScroll(true);
  }

  function handleFriendVoteComplete(votes: string[]) {
    setPreviewVotes(votes);
  }

  async function handleCopyInviteLink() {
    if (!shareCode) return;

    try {
      await navigator.clipboard.writeText(
        getInviteLinkText(shareCode, window.location.origin),
      );
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2000);
    } catch {
      setInviteCopied(false);
    }
  }

  function handleInviteMoreFriends() {
    handleCopyInviteLink();
    scrollToCreateGame();
  }

  function toggleVibeTag(tag: VibeTag) {
    setSelectedVibeTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((item) => item !== tag);
      }
      if (prev.length >= MAX_VIBE_TAGS) {
        return prev;
      }
      return [...prev, tag];
    });
  }

  async function handleGenerateGame(e: React.FormEvent) {
    e.preventDefault();
    const friends = parseGroupNames(groupNames);
    const game = buildGeneratedGame({
      friends,
      vibeTags: selectedVibeTags,
      extraContext,
      customCategories,
      tone,
    });

    setIsSavingGame(true);
    setSaveGameError(null);
    setGeneratedGame(null);
    setShareCode(null);
    setInviteCopied(false);
    setFriendVotingStarted(false);
    setPendingFriendVotingScroll(false);
    setSimulatedVoteCount(0);
    setShowUnlockCelebration(false);
    setDemoResultsUnlocked(false);
    setPreviewVotes(null);
    setPendingResultsScroll(false);

    const result = await createGameAction({
      friends,
      vibeTags: selectedVibeTags,
      customCategories,
      tone,
    });

    setIsSavingGame(false);

    if (!result.ok) {
      setSaveGameError(result.error);
      return;
    }

    setGeneratedGame(game);
    setShareCode(result.shareCode);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold">
              FR
            </span>
            <span className="font-semibold tracking-tight">FriendRank</span>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 text-center sm:pt-28">
          <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-200">
            Prototype demo
          </div>

          <p className="mx-auto mb-8 max-w-xl text-sm text-amber-100/80 sm:text-base">
            This is an early demo. Invite links and votes are simulated for now.
          </p>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Rank your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              friend group.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
            Find out who&apos;s the main character, secret villain, and future
            influencer.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={scrollToCreateGame}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/40 sm:w-auto"
            >
              Try FriendRank Demo
            </button>
            <button
              type="button"
              onClick={scrollToCategories}
              className="w-full rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-slate-300 transition hover:bg-white/10 sm:w-auto"
            >
              See FriendRank categories ↓
            </button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span>✓ No app download</span>
            <span>✓ Ready in under 60 seconds</span>
            <span>✓ Share results instantly</span>
          </div>
        </section>

        {/* Creator View */}
        <section
          ref={createGameRef}
          id="create-game"
          className="scroll-mt-8 border-t border-white/5 bg-white/[0.02] py-20"
        >
          <div className="mx-auto max-w-2xl px-6">
            <SectionLabel description="Create a demo game">
              Creator View
            </SectionLabel>

            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create a demo FriendRank
              </h2>
              <p className="mt-3 text-slate-400">
                Fill in your group details — everything below runs locally in
                your browser
              </p>
            </div>

            <form
              onSubmit={handleGenerateGame}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="group-names"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Who&apos;s in your group?
                  </label>
                  <input
                    id="group-names"
                    type="text"
                    value={groupNames}
                    onChange={(e) => setGroupNames(e.target.value)}
                    placeholder="Alex, Taylor, Jordan, Casey"
                    className={inputClassName}
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Comma-separated names · defaults to Alex, Taylor, Jordan,
                    Casey
                  </p>
                </div>

                <fieldset>
                  <legend className="mb-2 block text-sm font-medium text-slate-300">
                    Pick your group vibe
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {VIBE_TAGS.map((tag) => {
                      const isSelected = selectedVibeTags.includes(tag);
                      const isDisabled =
                        !isSelected &&
                        selectedVibeTags.length >= MAX_VIBE_TAGS;

                      return (
                        <button
                          key={tag}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => toggleVibeTag(tag)}
                          disabled={isDisabled}
                          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                            isSelected
                              ? "border-violet-400/60 bg-violet-500/25 text-white shadow-sm shadow-violet-500/20"
                              : isDisabled
                                ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600"
                                : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-500/30 hover:bg-violet-500/10"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Pick up to {MAX_VIBE_TAGS} tags — skip if you want to jump
                    in fast
                  </p>
                </fieldset>

                <div>
                  <label
                    htmlFor="extra-context"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Add inside joke or extra context (optional)
                  </label>
                  <textarea
                    id="extra-context"
                    rows={2}
                    value={extraContext}
                    onChange={(e) => setExtraContext(e.target.value)}
                    placeholder="Example: Alex is always late, Taylor starts drama, Jordan disappears from group chats…"
                    className={`${inputClassName} resize-y min-h-[72px] text-sm`}
                  />
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-sm font-medium text-slate-200">
                    Add your own categories
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Optional — make it personal with inside jokes.
                  </p>
                  <div className="mt-4 space-y-3">
                    {CUSTOM_CATEGORY_PLACEHOLDERS.map((placeholder, index) => (
                      <input
                        key={placeholder}
                        type="text"
                        value={customCategories[index]}
                        onChange={(e) =>
                          updateCustomCategory(index, e.target.value)
                        }
                        placeholder={placeholder}
                        className={`${inputClassName} text-sm`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="tone"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Tone
                  </label>
                  <select
                    id="tone"
                    value={tone}
                    onChange={(e) => setTone(e.target.value as Tone)}
                    className={`${inputClassName} cursor-pointer appearance-none`}
                  >
                    {tones.map((t) => (
                      <option key={t} value={t} className="bg-slate-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-pink-300">
                    FriendRank categories in this game
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {previewCategories.map((category) => (
                      <span
                        key={category.label}
                        className={`rounded-full border px-2.5 py-1 text-xs ${
                          category.isCustom
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-100"
                            : "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {category.emoji} {category.label}
                        {category.isCustom ? " · custom" : ""}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSavingGame}
                  className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingGame ? "Saving game..." : "Generate Demo FriendRank"}
                </button>

                {saveGameError && (
                  <p className="text-center text-sm text-red-400">
                    {saveGameError}
                  </p>
                )}
              </div>
            </form>

            {generatedGame && shareCode && (
              <>
                <div className="relative mt-8 overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-600/20 via-slate-900 to-cyan-600/15 p-6 shadow-xl shadow-violet-500/10 sm:p-8">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl" />

                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-lg">
                        👑
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
                          FriendRank invite ready
                        </p>
                        <h3 className="text-xl font-bold sm:text-2xl">
                          Your FriendRank game is ready
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          Share it with your group. Results unlock after{" "}
                          {VOTES_REQUIRED} votes.
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-2">
                      <span className="rounded-full border border-violet-500/40 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200">
                        FriendRank
                      </span>
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                        {generatedGame.tone}
                      </span>
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
                        🔒 Results locked
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                        {generatedGame.friends.join(", ")}
                      </span>
                    </div>

                    <p className="mb-4 break-all rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                      {getGameShareUrl(shareCode, window.location.origin)}
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={handleCopyInviteLink}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/15"
                      >
                        {inviteCopied ? (
                          <>
                            <span className="text-emerald-400">✓</span>
                            Invite copied!
                          </>
                        ) : (
                          <>📨 Copy Invite Link</>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={scrollToFriendVotingView}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500"
                      >
                        Open Friend Voting View
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <WaitingForVotesCard
                    friends={generatedGame.friends}
                    voteCount={simulatedVoteCount}
                    isUnlocked={multiplayerResultsUnlocked}
                    showCelebration={showUnlockCelebration}
                    onSimulateVote={handleSimulateVote}
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm sm:p-5">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                    FriendRank sample questions
                  </p>
                  <ol className="space-y-3">
                    {generatedGame.questions.map((question, index) => (
                      <li
                        key={index}
                        className="flex gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3 sm:gap-4 sm:p-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-500/20 text-sm font-bold text-violet-300">
                          {generatedGame.categories[index]?.emoji}
                        </span>
                        <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                          {question}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            )}
          </div>
        </section>

        {generatedGame && (
          <section
            ref={friendVotingRef}
            id="friend-voting"
            className="scroll-mt-8 border-t border-white/5 py-20"
          >
            <div className="mx-auto max-w-2xl px-6">
              <SectionLabel description="Preview what friends would see">
                Friend Voting View
              </SectionLabel>

              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  You&apos;ve been invited to a FriendRank
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
                  Vote honestly. FriendRank results unlock when enough friends
                  vote.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 sm:p-8">
                {!friendVotingStarted ? (
                  <div className="text-center">
                    <p className="text-sm text-slate-400">
                      Preview what a friend sees when they open your invite link.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFriendVotingStarted(true)}
                      className="mt-5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500"
                    >
                      ▶ Friend Voting Preview
                    </button>
                  </div>
                ) : (
                  <div className="mx-auto max-w-sm">
                    <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-cyan-300">
                      Friend Voting Preview
                    </p>
                    <VoteGame
                      key={`${generatedGame.questions.join("|")}-${generatedGame.friends.join(",")}`}
                      game={generatedGame}
                      mode="preview"
                      onVoteComplete={handleFriendVoteComplete}
                      onInviteMoreFriends={handleInviteMoreFriends}
                      onViewDemoResults={handleViewDemoResults}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {showResultsView && generatedGame && (
          <section
            ref={unlockedResultsRef}
            id="results-view"
            className="scroll-mt-8 border-t border-white/5 bg-white/[0.02] py-20"
          >
            <div className="mx-auto max-w-2xl px-6">
              <SectionLabel description="Preview shareable results">
                Results View
              </SectionLabel>

              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  FriendRank results are in
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Share your FriendRank screenshot with the group chat
                </p>
              </div>

              <FriendRankResultsView
                game={generatedGame}
                votes={previewVotes ?? generateMockCategoryVotes(generatedGame)}
                unlockLabel={
                  demoResultsUnlocked && !multiplayerResultsUnlocked
                    ? "FriendRank demo results unlocked"
                    : "FriendRank results unlocked"
                }
                showPlayAgain={false}
              />
            </div>
          </section>
        )}

        {/* Feedback */}
        <section className="scroll-mt-8 border-t border-white/5 py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 px-6 py-8 backdrop-blur-sm sm:px-8 sm:py-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Would you share this with your group chat?
              </h2>

              {feedbackResponse ? (
                <div className="mt-6 space-y-5 text-left">
                  <p className="text-center text-sm text-emerald-400">
                    Thanks — this helps us improve the demo.
                  </p>

                  {feedbackResponse === "not-yet" && (
                    <div>
                      <p className="mb-3 text-sm font-medium text-slate-300">
                        What would make it more shareable?
                      </p>
                      <textarea
                        value={shareabilityNote}
                        onChange={(e) => setShareabilityNote(e.target.value)}
                        placeholder="Example: funnier results, real invite links, better categories..."
                        rows={3}
                        className={`${inputClassName} resize-y min-h-[96px] text-left text-sm`}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={() => setFeedbackResponse("yes")}
                    className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500 sm:w-auto sm:min-w-[220px]"
                  >
                    👍 Yes, I&apos;d share it
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackResponse("not-yet")}
                    className="w-full rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-base font-semibold transition hover:bg-white/15 sm:w-auto sm:min-w-[220px]"
                  >
                    👎 Not yet
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FriendRank Categories */}
        <section
          ref={categoriesRef}
          className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20"
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              FriendRank Categories
            </h2>
            <p className="mt-3 text-slate-400">
              Friend group categories built for chaos
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FRIEND_RANK_CATEGORIES.map((category) => (
              <div
                key={category.label}
                className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-violet-600/10 p-5 backdrop-blur-sm"
              >
                <p className="text-3xl">{category.emoji}</p>
                <h3 className="mt-3 text-lg font-semibold">{category.label}</h3>
                <p className="mt-1 text-sm text-violet-300">
                  {category.nickname}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-white/5 bg-white/[0.02] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-3 text-slate-400">
                From friend group to viral results in four steps
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-8 hidden h-px w-full bg-gradient-to-r from-violet-500/40 to-transparent lg:block" />
                  )}
                  <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-lg font-bold text-violet-400">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-slate-900 to-cyan-500/10 px-8 py-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to rank your friends?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Create your first FriendRank game in under a minute. The group
              chat will never be the same.
            </p>
            <button
              type="button"
              onClick={scrollToCreateGame}
              className="mt-8 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500"
            >
              Try FriendRank Demo
            </button>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} FriendRank</p>
      </footer>
    </div>
  );
}
