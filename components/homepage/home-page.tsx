"use client";

import Link from "next/link";
import { FriendRankBrand } from "@/components/friend-rank-brand";
import { HomepageFaqSection } from "@/components/homepage-faq-section";
import { HomepageWhyFriendRankSection } from "@/components/homepage/homepage-why-friendrank-section";
import { HomepageHubExploreSection } from "@/components/topic-hubs/homepage-hub-explore-section";
import { FriendRankRevealPreview } from "@/components/friend-rank-reveal-preview";
import { FriendRankVoteProgressSnippet } from "@/components/friend-rank-vote-progress-snippet";
import { useLiveVoteProgress } from "@/hooks/use-live-vote-progress";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createGameAction } from "@/app/actions/games";
import {
  markGameCreationCompleted,
  shouldTrackGameCreationAbandonment,
  trackGameCreated,
  trackGameCreationAbandoned,
  trackGameCreationStarted,
  trackInviteCopied,
  trackCtaClicked,
} from "@/lib/analytics";
import {
  buildGameCategories,
  buildGeneratedGame,
  CUSTOM_CATEGORY_PLACEHOLDERS,
  FRIEND_RANK_CATEGORIES,
  MAX_VIBE_TAGS,
  parseGroupNames,
  parseEnteredGroupNames,
  MIN_GROUP_FRIENDS,
  tones,
  VIBE_TAGS,
  type GeneratedGame,
  type Tone,
  type VibeTag,
} from "@/lib/game-build";
import { getGameShareUrl, getInviteLinkText } from "@/lib/game-url";
import { getVotesRequired } from "@/lib/votes/constants";

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

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition duration-200 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 hover:border-white/15";

const chipBase =
  "rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 ease-out motion-reduce:transition-none active:scale-[0.97]";

function chipClassName(isSelected: boolean, isDisabled: boolean) {
  if (isSelected) {
    return `${chipBase} border-violet-300/70 bg-violet-500/35 text-white shadow-md shadow-violet-500/35 ring-1 ring-violet-400/45`;
  }
  if (isDisabled) {
    return `${chipBase} cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-60`;
  }
  return `${chipBase} border-white/10 bg-white/5 text-slate-300 hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white hover:shadow-sm hover:shadow-violet-500/20`;
}

type FormSectionProps = {
  step: string;
  title: string;
  description?: string;
  optional?: boolean;
  children: ReactNode;
};

function FormSection({
  step,
  title,
  description,
  optional,
  children,
}: FormSectionProps) {
  return (
    <section className="border-b border-white/5 pb-8 last:border-b-0 last:pb-0">
      <header className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-400/90">
            {step}
          </p>
          <h3 className="mt-1 text-base font-semibold text-white">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {optional && (
          <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Optional
          </span>
        )}
      </header>
      {children}
    </section>
  );
}

export default function Home() {
  const createGameRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);

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

  const gameCreatedRef = useRef(false);
  const creationSnapshotRef = useRef({
    friend_count: 0,
    selected_tone: "Funny" as Tone,
    selected_vibe_count: 0,
  });

  const previewCategories = useMemo(
    () => buildGameCategories(customCategories, parseGroupNames(groupNames)),
    [customCategories, groupNames],
  );

  const enteredFriends = useMemo(
    () => parseEnteredGroupNames(groupNames),
    [groupNames],
  );
  const hasEnoughFriends = enteredFriends.length >= MIN_GROUP_FRIENDS;

  const inviteInitialProgress = useMemo(() => {
    if (!generatedGame) {
      return null;
    }

    return {
      voteCount: 0,
      votesRequired: getVotesRequired(generatedGame.friends.length),
      isUnlocked: false,
      hasVoted: false,
    };
  }, [generatedGame]);

  const { progress: inviteProgress } = useLiveVoteProgress(
    shareCode,
    inviteInitialProgress,
  );

  const notifyCreationFormStarted = useCallback(() => {
    trackGameCreationStarted({
      friend_count: enteredFriends.length,
      selected_tone: tone,
      selected_vibe_count: selectedVibeTags.length,
    });
  }, [enteredFriends.length, selectedVibeTags.length, tone]);

  useEffect(() => {
    creationSnapshotRef.current = {
      friend_count: enteredFriends.length,
      selected_tone: tone,
      selected_vibe_count: selectedVibeTags.length,
    };
  }, [enteredFriends.length, selectedVibeTags.length, tone]);

  useEffect(() => {
    function fireAbandonmentIfNeeded() {
      if (gameCreatedRef.current || !shouldTrackGameCreationAbandonment()) {
        return;
      }

      trackGameCreationAbandoned({
        friend_count: creationSnapshotRef.current.friend_count,
        selected_tone: creationSnapshotRef.current.selected_tone,
        selected_vibe_count: creationSnapshotRef.current.selected_vibe_count,
      });
    }

    window.addEventListener("pagehide", fireAbandonmentIfNeeded);

    return () => {
      window.removeEventListener("pagehide", fireAbandonmentIfNeeded);
      fireAbandonmentIfNeeded();
    };
  }, []);

  function updateCustomCategory(index: number, value: string) {
    notifyCreationFormStarted();
    setCustomCategories((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
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

  async function handleCopyInviteLink() {
    if (!shareCode) return;

    try {
      await navigator.clipboard.writeText(
        getInviteLinkText(shareCode, window.location.origin),
      );
      trackInviteCopied({ game_id: shareCode });
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2000);
    } catch {
      setInviteCopied(false);
    }
  }

  function toggleVibeTag(tag: VibeTag) {
    notifyCreationFormStarted();
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
    trackCtaClicked({ location: "form_submit" });
    const friends = parseEnteredGroupNames(groupNames);
    if (friends.length < MIN_GROUP_FRIENDS) {
      return;
    }
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
    gameCreatedRef.current = true;
    markGameCreationCompleted();
    trackGameCreated({
      friend_count: friends.length,
      tone,
      custom_categories_used: customCategories.some(
        (category) => category.trim().length > 0,
      ),
      category_count: game.categories.length,
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-[100px]" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <FriendRankBrand />
        </div>
      </header>

      <main className="relative z-10">
        <section
          aria-labelledby="friendrank-hero-heading"
          className="mx-auto max-w-6xl px-6 pb-10 pt-20 text-center sm:pb-12 sm:pt-28"
        >
          <h1
            id="friendrank-hero-heading"
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Vote. Reveal.{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Embrace the chaos.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
            Create hilarious voting games for friends, parties and teams.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={() => {
                trackCtaClicked({ location: "hero_start" });
                scrollToCreateGame();
              }}
              className="relative w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-xl shadow-violet-600/30 ring-1 ring-violet-400/35 transition duration-200 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/45 hover:ring-violet-400/55 active:scale-[0.99] motion-reduce:active:scale-100 sm:w-auto sm:min-w-[220px]"
            >
              Start the Chaos
            </button>
            <button
              type="button"
              onClick={() => {
                trackCtaClicked({ location: "categories" });
                scrollToCategories();
              }}
              className="w-full rounded-full border border-white/5 bg-transparent px-8 py-3.5 text-sm font-medium text-slate-500 transition duration-200 hover:border-white/10 hover:bg-white/[0.03] hover:text-slate-300 sm:w-auto"
            >
              See FriendRank categories ↓
            </button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span>✓ Anonymous voting</span>
            <span>✓ No app download</span>
            <span>✓ Ready in under 60 seconds</span>
          </div>
        </section>

        <section
          ref={createGameRef}
          id="create-game"
          aria-labelledby="create-game-heading"
          className="scroll-mt-8 border-t border-white/5 bg-white/[0.02] pb-20 pt-10 sm:pt-12"
        >
          <div className="mx-auto max-w-2xl px-6">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium text-violet-300/90">
                Create a real game for your group
              </p>
              <h2
                id="create-game-heading"
                className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Who&apos;s in your group?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Add your friends and vibe — ready to share in under a minute.
              </p>
            </div>

            <form
              onSubmit={handleGenerateGame}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm transition duration-200 hover:border-white/15 sm:p-8"
            >
              <div className="space-y-8">
                <FormSection
                  step="Step 1"
                  title="Group members"
                  description="Comma-separated names — at least 2 friends."
                >
                  <label htmlFor="group-names" className="sr-only">
                    Group member names
                  </label>
                  <input
                    id="group-names"
                    type="text"
                    value={groupNames}
                    onChange={(e) => {
                      notifyCreationFormStarted();
                      setGroupNames(e.target.value);
                    }}
                    placeholder="Alex, Taylor, Jordan, Casey"
                    className={inputClassName}
                  />
                  {enteredFriends.length === 0 ? (
                    <p className="mt-2.5 text-xs text-slate-600">
                      Example: Alex, Taylor, Jordan, Casey
                    </p>
                  ) : (
                    <p className="mt-2.5 text-xs text-violet-300/90">
                      {enteredFriends.length} friend
                      {enteredFriends.length === 1 ? "" : "s"} ·{" "}
                      {enteredFriends.join(", ")}
                    </p>
                  )}
                  {!hasEnoughFriends && enteredFriends.length > 0 && (
                    <p className="mt-1 text-xs text-amber-400/90">
                      Add at least 2 friends to continue.
                    </p>
                  )}
                </FormSection>

                <FormSection
                  step="Step 2"
                  title="Group vibe"
                  description={`Pick up to ${MAX_VIBE_TAGS} tags — or skip to move fast.`}
                >
                  <fieldset>
                    <legend className="sr-only">Group vibe tags</legend>
                    <div className="flex flex-wrap gap-2.5">
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
                            className={chipClassName(isSelected, isDisabled)}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </FormSection>

                <FormSection
                  step="Step 3"
                  title="Inside joke or extra context"
                  description="Helps tailor questions — skip if you want."
                  optional
                >
                  <label htmlFor="extra-context" className="sr-only">
                    Inside joke or extra context
                  </label>
                  <textarea
                    id="extra-context"
                    rows={2}
                    value={extraContext}
                    onChange={(e) => {
                      notifyCreationFormStarted();
                      setExtraContext(e.target.value);
                    }}
                    placeholder="Alex is always late, Taylor starts drama…"
                    className={`${inputClassName} min-h-[72px] resize-y text-sm`}
                  />
                </FormSection>

                <FormSection
                  step="Step 4"
                  title="Game setup"
                  description="Pick a tone and optionally personalize categories."
                >
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <label
                          htmlFor="tone"
                          className="text-xs font-medium text-slate-400"
                        >
                          Game tone
                        </label>
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          Required
                        </span>
                      </div>
                      <select
                        id="tone"
                        value={tone}
                        onChange={(e) => {
                          notifyCreationFormStarted();
                          setTone(e.target.value as Tone);
                        }}
                        className={`${inputClassName} cursor-pointer appearance-none text-sm`}
                      >
                        {tones.map((t) => (
                          <option key={t} value={t} className="bg-slate-900">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="rounded-xl border border-dashed border-amber-500/15 bg-amber-500/[0.03] p-4 transition duration-200 hover:border-amber-500/25">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-300">
                          Custom categories
                        </p>
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          Optional
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Leave blank to use our curated categories.
                      </p>
                      <div className="mt-3 space-y-2.5">
                        {CUSTOM_CATEGORY_PLACEHOLDERS.map(
                          (placeholder, index) => (
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
                          ),
                        )}
                      </div>
                    </div>

                    <div className="rounded-xl border border-pink-500/15 bg-pink-500/[0.04] p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-pink-300/90">
                        In this game
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {previewCategories.map((category) => (
                          <span
                            key={category.label}
                            className={`rounded-full border px-2.5 py-1 text-xs transition duration-200 ${
                              category.isCustom
                                ? "border-amber-500/35 bg-amber-500/12 text-amber-100"
                                : "border-white/10 bg-white/5 text-slate-300"
                            }`}
                          >
                            {category.emoji} {category.label}
                            {category.isCustom ? " · custom" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FormSection>

                <div className="border-t border-white/10 pt-6">
                  {hasEnoughFriends ? (
                    <p className="mb-3 text-center text-xs font-medium text-violet-300/80">
                      Ready — your group game is one tap away.
                    </p>
                  ) : (
                    <p className="mb-3 text-center text-xs text-slate-500">
                      Add at least 2 friends to unlock Start the Chaos.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSavingGame || !hasEnoughFriends}
                    className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-xl shadow-violet-600/30 ring-1 ring-violet-400/35 transition duration-200 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/45 hover:ring-violet-400/55 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:ring-0 motion-reduce:active:scale-100"
                  >
                    {isSavingGame ? "Saving game..." : "Start the Chaos"}
                  </button>

                  {saveGameError && (
                    <p className="mt-3 text-center text-sm text-red-400">
                      {saveGameError}
                    </p>
                  )}
                </div>
              </div>
            </form>

            {generatedGame && shareCode && inviteProgress && (
              <>
                <div className="friendrank-invite-ready relative mt-8 overflow-hidden rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-600/20 via-slate-900 to-cyan-600/15 p-6 shadow-xl shadow-violet-500/10 sm:p-8">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl" />

                  <div className="relative">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-lg">
                        👑
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-violet-300">
                          FriendRank invite ready
                        </p>
                        <h3 className="text-xl font-bold sm:text-2xl">
                          Invite your friends.
                        </h3>
                        <p className="mt-1 text-sm text-slate-300">
                          They&apos;ll decide who earns each title.
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          It only takes about 30 seconds.
                        </p>
                      </div>
                    </div>

                    <FriendRankVoteProgressSnippet
                      voteCount={inviteProgress.voteCount}
                      votesRequired={inviteProgress.votesRequired}
                      isUnlocked={inviteProgress.isUnlocked}
                      className="mb-5"
                    />

                    <div className="mb-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-violet-500/40 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200">
                        FriendRank
                      </span>
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                        {generatedGame.tone}
                      </span>
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
                        {inviteProgress.isUnlocked
                          ? "🔓 Results unlocked"
                          : "🔒 Locked until friends vote"}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-400">
                        {generatedGame.friends.join(", ")}
                      </span>
                    </div>

                    <p className="mb-5 break-all rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-400">
                      {getGameShareUrl(shareCode, window.location.origin)}
                    </p>

                    <div className="space-y-2">
                      <p className="text-center text-xs font-medium uppercase tracking-wider text-violet-300/80">
                        Next step
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyInviteLink}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 ring-1 ring-violet-400/30 transition duration-200 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/35"
                      >
                        {inviteCopied ? (
                          <>
                            <span className="text-emerald-200">✓</span>
                            Invite copied — send it to your group
                          </>
                        ) : (
                          <>📨 Share invite with your group</>
                        )}
                      </button>
                      <Link
                        href={`/game/${shareCode}`}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300 transition duration-200 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                      >
                        Vote now
                      </Link>
                    </div>
                  </div>
                </div>

                <FriendRankRevealPreview className="mt-4 friendrank-reveal-preview--enter" />

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

        <section
          ref={categoriesRef}
          id="friendrank-categories"
          aria-labelledby="friendrank-categories-heading"
          className="mx-auto max-w-6xl scroll-mt-8 border-t border-white/5 px-6 py-20"
        >
          <div className="mb-12 text-center">
            <h2
              id="friendrank-categories-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
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
                className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-violet-600/10 p-5 backdrop-blur-sm transition duration-200 hover:border-pink-500/35 hover:shadow-lg hover:shadow-violet-500/10"
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

        <HomepageHubExploreSection />

        <HomepageWhyFriendRankSection />

        <section
          id="how-it-works"
          aria-labelledby="how-it-works-heading"
          className="border-t border-white/5 bg-white/[0.02] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2
                id="how-it-works-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
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
                  <div className="relative flex flex-col items-center text-center transition duration-200 hover:translate-y-[-2px] motion-reduce:hover:translate-y-0 lg:items-start lg:text-left">
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

        <HomepageFaqSection />

        <section
          aria-labelledby="ready-to-rank-heading"
          className="mx-auto max-w-6xl px-6 py-24 text-center"
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-slate-900 to-cyan-500/10 px-8 py-16">
            <h2
              id="ready-to-rank-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Ready to rank your friends?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Create your group game in under a minute. The group
              chat will never be the same.
            </p>
            <button
              type="button"
              onClick={() => {
                trackCtaClicked({ location: "bottom_start" });
                scrollToCreateGame();
              }}
              className="mt-8 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-xl shadow-violet-600/30 ring-1 ring-violet-400/35 transition duration-200 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/45 hover:ring-violet-400/55 active:scale-[0.99] motion-reduce:active:scale-100"
            >
              Start the Chaos
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
