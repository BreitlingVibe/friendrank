"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_FRIENDS = ["Alex", "Taylor", "Jordan", "Casey"];

const FRIEND_RANK_CATEGORIES = [
  { label: "Main Character", emoji: "👑", nickname: "The Main Character" },
  { label: "Chaos Agent", emoji: "🔥", nickname: "Certified Chaos" },
  { label: "Secret Villain", emoji: "💀", nickname: "Secret Mastermind" },
  { label: "Most Delusional", emoji: "🌪️", nickname: "Walking Plot Twist" },
  { label: "Chronically Online", emoji: "📱", nickname: "Chronically Online Legend" },
  { label: "Future Influencer", emoji: "✨", nickname: "Future Influencer" },
  { label: "Most Likely To Go Viral", emoji: "🚀", nickname: "Viral Waiting to Happen" },
  { label: "Group Therapist", emoji: "🧠", nickname: "Emotional Support Human" },
  { label: "Walking Red Flag", emoji: "🚩", nickname: "Red Flag With Confidence" },
  { label: "Green Flag Award", emoji: "💚", nickname: "Green Flag Energy" },
  { label: "Plot Twist Generator", emoji: "🎭", nickname: "Plot Twist Generator" },
  { label: "Most Likely To Get Cancelled", emoji: "😬", nickname: "Cancel-Worthy Legend" },
] as const;

const EXTRA_NICKNAMES = [
  "The Main Character",
  "Walking Plot Twist",
  "Certified Chaos",
  "Secret Mastermind",
  "Emotional Support Human",
  "Chronically Online Legend",
  "Green Flag Energy",
  "Red Flag With Confidence",
  "Group Chat Menace",
  "Unhinged But Lovable",
];

const steps = [
  {
    number: "01",
    title: "Add your friends",
    description:
      "Enter your group's names and describe the vibe — inside jokes, chaos levels, all of it.",
  },
  {
    number: "02",
    title: "AI creates the game",
    description:
      "Get personalized FriendRank categories, questions, and roasts tailored to your crew.",
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

type Tone = "Funny" | "Savage but friendly" | "Wholesome" | "Chaotic";
type FriendRankCategory = (typeof FRIEND_RANK_CATEGORIES)[number];

const tones: Tone[] = [
  "Funny",
  "Savage but friendly",
  "Wholesome",
  "Chaotic",
];

function parseGroupNames(input: string): string[] {
  const names = input
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
  return names.length > 0 ? names.slice(0, 8) : [...DEFAULT_FRIENDS];
}

function getFriendRankCategories(count = 5): FriendRankCategory[] {
  return [...FRIEND_RANK_CATEGORIES.slice(0, count)];
}

function generateFriendRankQuestions(
  categories: FriendRankCategory[],
): string[] {
  return categories.map((category) => `Who is the ${category.label}?`);
}

const DEMO_GAME_URL = "https://friendrank.ai/game/demo";

const INVITE_LINK_TEXT = `I made a FriendRank game for our group 😂 Vote here: ${DEMO_GAME_URL}`;

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20";

type GeneratedGame = {
  tone: Tone;
  groupDescription: string;
  questions: string[];
  friends: string[];
  categories: FriendRankCategory[];
};

type GroupTheme = "party" | "college" | "online" | "generic";

function assignFriendNicknames(
  friends: string[],
  categoryResults: { category: FriendRankCategory; winner: string }[],
): Record<string, string> {
  const nicknames: Record<string, string> = {};
  let extraIndex = 0;

  categoryResults.forEach(({ category, winner }) => {
    if (!nicknames[winner]) {
      nicknames[winner] = category.nickname;
    }
  });

  friends.forEach((friend) => {
    if (!nicknames[friend]) {
      nicknames[friend] =
        EXTRA_NICKNAMES[extraIndex % EXTRA_NICKNAMES.length];
      extraIndex += 1;
    }
  });

  return nicknames;
}

function generateMockCategoryVotes(game: GeneratedGame): string[] {
  return game.categories.map(
    (_, index) => game.friends[index % game.friends.length],
  );
}

const VOTES_REQUIRED = 3;
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
  topThree: { category: FriendRankCategory; winner: string }[],
  groupVibe: string,
): string {
  const lines = topThree.map(
    ({ category, winner }) => `${category.emoji} ${category.label}: ${winner}`,
  );

  return [
    "Your FriendRank Results",
    "",
    ...lines,
    "",
    groupVibe,
    "",
    "Made with FriendRank AI",
  ].join("\n");
}

function detectGroupTheme(description: string): GroupTheme {
  const normalized = description.toLowerCase();

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

function extractGroupVibePhrase(description: string): string {
  const trimmed = description.trim();
  if (!trimmed) return "your unique friend group";

  const firstClause = trimmed.split(/[,;!?]/)[0]?.trim() ?? trimmed;
  if (firstClause.length <= 55) return firstClause;

  return `${firstClause.slice(0, 52).trim()}...`;
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

function applyToneToComboTagline(tagline: string, tone: Tone): string {
  switch (tone) {
    case "Funny":
      return tagline;
    case "Savage but friendly":
      return `${tagline} — and they're not sorry`;
    case "Wholesome":
      return `${tagline}, but somehow it works`;
    case "Chaotic":
      return `${tagline} — UNHINGED EDITION`;
    default:
      return tagline;
  }
}

function generateGroupVibe(
  topThree: { category: FriendRankCategory; winner: string }[],
  groupDescription: string,
  tone: Tone,
): string {
  const theme = detectGroupTheme(groupDescription);

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

  const base = `This group is ${parts.join(", ")}.`;
  return applyTonePrefix(base, tone);
}

function generateDangerousCombo(
  friends: string[],
  groupDescription: string,
  tone: Tone,
): string {
  const theme = detectGroupTheme(groupDescription);

  const themeTaglines: Record<GroupTheme, string[]> = {
    party: [
      "one more round",
      "bad ideas after drinks",
      "pub table chaos unlocked",
    ],
    college: [
      "all-nighter energy",
      "exam panic mode",
      "campus drama unfolding",
    ],
    online: [
      "Discord drama at 2am",
      "WiFi-powered chaos",
      "ranked queue rage",
    ],
    generic: [
      "chaos with a WiFi connection",
      "a group chat that never sleeps",
      "main character energy squared",
      "delusion on delusion crime",
      "two tabs open, zero boundaries",
      "unhinged but somehow functional",
    ],
  };

  if (friends.length === 0) {
    return applyToneToComboTagline(
      "This group + group chat = chaos unlocked",
      tone,
    );
  }

  if (friends.length === 1) {
    const tagline = themeTaglines[theme][0] ?? themeTaglines.generic[0];
    return applyToneToComboTagline(
      `${friends[0]} + the group chat = ${tagline}`,
      tone,
    );
  }

  const name1 = friends[0];
  const name2 = friends[1];
  const options = themeTaglines[theme];
  const tagline = applyToneToComboTagline(
    options[(name1.length + name2.length) % options.length],
    tone,
  );

  return `${name1} + ${name2} = ${tagline}`;
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
  const friends = game.friends;
  const categories = game.categories;
  const [resultsCopied, setResultsCopied] = useState(false);

  const categoryResults = categories.map((category, index) => ({
    category,
    winner: votes[index] ?? friends[index % friends.length],
  }));
  const friendNicknames = assignFriendNicknames(friends, categoryResults);
  const topThree = categoryResults.slice(0, 3);
  const groupVibePhrase = extractGroupVibePhrase(game.groupDescription);
  const groupVibe = generateGroupVibe(
    topThree,
    game.groupDescription,
    game.tone,
  );
  const dangerousCombo = generateDangerousCombo(
    friends,
    game.groupDescription,
    game.tone,
  );
  const shareText = buildFriendRankShareText(topThree, groupVibe);

  async function handleCopyResults() {
    try {
      await navigator.clipboard.writeText(shareText);
      setResultsCopied(true);
      setTimeout(() => setResultsCopied(false), 2000);
    } catch {
      setResultsCopied(false);
    }
  }

  const [first, second, third] = topThree;

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border-2 border-violet-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl shadow-violet-500/30">
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
        {first && (
          <div className="rounded-2xl border-2 border-violet-400/50 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-cyan-600/20 p-6 text-center shadow-lg shadow-violet-500/20">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-200">
              #1 · Top Rank
            </p>
            <p className="mt-3 text-5xl">{first.category.emoji}</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
              {first.category.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-white">
              {first.winner}
            </p>
            <p className="mt-2 text-sm font-medium text-cyan-300">
              {friendNicknames[first.winner]}
            </p>
          </div>
        )}

        {(second || third) && (
          <div className="grid grid-cols-2 gap-3">
            {second && (
              <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  #2
                </p>
                <p className="mt-2 text-2xl">{second.category.emoji}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  {second.category.label}
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  {second.winner}
                </p>
              </div>
            )}
            {third && (
              <div className="rounded-xl border border-white/15 bg-white/5 p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  #3
                </p>
                <p className="mt-2 text-2xl">{third.category.emoji}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  {third.category.label}
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  {third.winner}
                </p>
              </div>
            )}
          </div>
        )}

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
          <p className="mt-3 text-base font-semibold leading-relaxed text-white">
            {dangerousCombo}
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-4 py-5 text-center">
          <p className="text-sm font-medium text-slate-300">
            Screenshot this and send it to the group chat.
          </p>
          <p className="mt-2 text-xs text-slate-500">Made with FriendRank AI</p>
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
        {children}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
    </div>
  );
}

function PlayPreviewGame({
  game,
  onVoteComplete,
  onInviteMoreFriends,
  onViewDemoResults,
}: {
  game: GeneratedGame;
  onVoteComplete?: (votes: string[]) => void;
  onInviteMoreFriends?: () => void;
  onViewDemoResults?: () => void;
}) {
  const friends = game.friends;
  const [votes, setVotes] = useState<string[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [hasNotifiedComplete, setHasNotifiedComplete] = useState(false);

  const totalQuestions = game.questions.length;
  const isComplete = votes.length >= totalQuestions;
  const currentQuestionNumber = votes.length + 1;
  const progressPercent = isComplete
    ? 100
    : (votes.length / totalQuestions) * 100;

  useEffect(() => {
    if (isComplete && !hasNotifiedComplete) {
      onVoteComplete?.(votes);
      setHasNotifiedComplete(true);
    }
  }, [isComplete, hasNotifiedComplete, votes, onVoteComplete]);

  function handleSelect(friend: string) {
    if (selectedFriend || isComplete) return;

    const isLastQuestion = votes.length >= totalQuestions - 1;

    if (isLastQuestion) {
      setVotes((prev) => [...prev, friend]);
      return;
    }

    setSelectedFriend(friend);

    setTimeout(() => {
      setVotes((prev) => [...prev, friend]);
      setSelectedFriend(null);
    }, 450);
  }

  function handlePlayAgain() {
    setVotes([]);
    setSelectedFriend(null);
    setHasNotifiedComplete(false);
  }

  if (isComplete) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-2xl shadow-violet-500/20">
        <div className="border-b border-white/10 bg-gradient-to-r from-emerald-600/25 to-cyan-600/20 px-5 py-8 text-center">
          <p className="text-4xl">✅</p>
          <h4 className="mt-3 text-2xl font-bold">Your vote is in.</h4>
          <p className="mt-2 text-sm text-slate-400">
            Thanks for ranking the group in this FriendRank preview.
          </p>
        </div>
        <div className="space-y-3 p-5 sm:p-6">
          <button
            type="button"
            onClick={onInviteMoreFriends}
            className="w-full rounded-full border border-white/15 bg-white/10 py-3.5 text-sm font-semibold transition hover:bg-white/15"
          >
            📨 Invite more friends
          </button>
          <button
            type="button"
            onClick={onViewDemoResults}
            className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 py-3.5 text-sm font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500"
          >
            View unlocked FriendRank results
          </button>
          <button
            type="button"
            onClick={handlePlayAgain}
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/10"
          >
            Vote again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = game.questions[votes.length];
  const currentCategory = game.categories[votes.length];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-2xl shadow-violet-500/20">
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/80 px-5 py-3">
        <span className="text-xs font-medium text-slate-400">FriendRank</span>
        <span className="text-xs font-semibold text-violet-300">
          {currentQuestionNumber} / {totalQuestions}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {currentCategory && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
            <span>{currentCategory.emoji}</span>
            {currentCategory.label}
          </div>
        )}

        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-400">
          Vote now
        </p>
        <p className="mb-6 text-base font-medium leading-relaxed text-white sm:text-lg">
          {currentQuestion}
        </p>

        <div className="space-y-2.5">
          {friends.map((friend) => {
            const isSelected = selectedFriend === friend;

            return (
              <button
                key={friend}
                type="button"
                onClick={() => handleSelect(friend)}
                disabled={selectedFriend !== null}
                className={`w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition active:scale-[0.98] disabled:cursor-default ${
                  isSelected
                    ? "border-violet-400 bg-violet-500/25 text-white shadow-lg shadow-violet-500/20"
                    : "border-white/10 bg-white/5 text-slate-200 hover:border-violet-500/40 hover:bg-violet-500/10 disabled:opacity-50"
                }`}
              >
                <span className="flex items-center justify-between">
                  {friend}
                  {isSelected && (
                    <span className="animate-pulse text-violet-300">✓</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Tap a friend to vote — next question loads automatically
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const createGameRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const friendVotingRef = useRef<HTMLElement>(null);
  const unlockedResultsRef = useRef<HTMLElement>(null);

  const [groupNames, setGroupNames] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [tone, setTone] = useState<Tone>("Funny");
  const [generatedGame, setGeneratedGame] = useState<GeneratedGame | null>(
    null,
  );
  const [inviteCopied, setInviteCopied] = useState(false);
  const [friendVotingStarted, setFriendVotingStarted] = useState(false);
  const [pendingFriendVotingScroll, setPendingFriendVotingScroll] =
    useState(false);
  const [simulatedVoteCount, setSimulatedVoteCount] = useState(0);
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false);
  const [demoResultsUnlocked, setDemoResultsUnlocked] = useState(false);
  const [previewVotes, setPreviewVotes] = useState<string[] | null>(null);
  const [pendingResultsScroll, setPendingResultsScroll] = useState(false);

  const multiplayerResultsUnlocked = simulatedVoteCount >= VOTES_REQUIRED;
  const showResultsView = multiplayerResultsUnlocked || demoResultsUnlocked;

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
    try {
      await navigator.clipboard.writeText(INVITE_LINK_TEXT);
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

  function handleGenerateGame(e: React.FormEvent) {
    e.preventDefault();
    const friends = parseGroupNames(groupNames);
    const categories = getFriendRankCategories(5);

    setGeneratedGame({
      tone,
      groupDescription,
      friends,
      categories,
      questions: generateFriendRankQuestions(categories),
    });
    setInviteCopied(false);
    setFriendVotingStarted(false);
    setPendingFriendVotingScroll(false);
    setSimulatedVoteCount(0);
    setShowUnlockCelebration(false);
    setDemoResultsUnlocked(false);
    setPreviewVotes(null);
    setPendingResultsScroll(false);
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
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            AI-powered FriendRank games
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Find out who your friends{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              really are
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
            Create hilarious AI-powered FriendRank games, vote on your group,
            and share the results.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={scrollToCreateGame}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/40 sm:w-auto"
            >
              Create Your FriendRank
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
            <SectionLabel>Creator View</SectionLabel>

            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create your FriendRank
              </h2>
              <p className="mt-3 text-slate-400">
                Add your friends, describe the vibe, and generate your game
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

                <div>
                  <label
                    htmlFor="group-description"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Group description
                  </label>
                  <textarea
                    id="group-description"
                    rows={4}
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Example: college friends in their 20s who are chronically online and roast each other constantly"
                    className={`${inputClassName} resize-y min-h-[100px]`}
                  />
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
                    FriendRank categories
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {getFriendRankCategories(5).map((category) => (
                      <span
                        key={category.label}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                      >
                        {category.emoji} {category.label}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/40"
                >
                  Generate FriendRank
                </button>
              </div>
            </form>

            {generatedGame && (
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
              <SectionLabel>Friend Voting View</SectionLabel>

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
                    <PlayPreviewGame
                      key={`${generatedGame.questions.join("|")}-${generatedGame.friends.join(",")}`}
                      game={generatedGame}
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
              <SectionLabel>Results View</SectionLabel>

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
              Gen Z ranking categories your group will obsess over
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
              Create Your FriendRank
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
