"use client";

import Link from "next/link";
import { FriendRankBrand } from "@/components/friend-rank-brand";
import { useMemo, useRef, useState } from "react";
import { createGameAction } from "@/app/actions/games";
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
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20";

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
  const [feedbackResponse, setFeedbackResponse] = useState<
    "yes" | "not-yet" | null
  >(null);
  const [shareabilityNote, setShareabilityNote] = useState("");

  const previewCategories = useMemo(
    () => buildGameCategories(customCategories, parseGroupNames(groupNames)),
    [customCategories, groupNames],
  );

  const enteredFriends = useMemo(
    () => parseEnteredGroupNames(groupNames),
    [groupNames],
  );
  const hasEnoughFriends = enteredFriends.length >= MIN_GROUP_FRIENDS;

  function updateCustomCategory(index: number, value: string) {
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
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2000);
    } catch {
      setInviteCopied(false);
    }
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
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 text-center sm:pb-12 sm:pt-28">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Discover your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              group&apos;s lore.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
            Create your game. Vote. Reveal the chaos.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={scrollToCreateGame}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/40 sm:w-auto"
            >
              Start the Chaos
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

        <section
          ref={createGameRef}
          id="create-game"
          className="scroll-mt-8 border-t border-white/5 bg-white/[0.02] pb-20 pt-10 sm:pt-12"
        >
          <div className="mx-auto max-w-2xl px-6">
            <p className="mb-6 text-center text-base font-semibold text-violet-200">
              Create a real game for your group
            </p>

            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Who&apos;s in your group?
              </h2>
              <p className="mt-3 text-slate-400">
                Fill in your group details and share the link with friends
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
                  disabled={isSavingGame || !hasEnoughFriends}
                  className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSavingGame ? "Saving game..." : "Start the Chaos"}
                </button>

                {!hasEnoughFriends && (
                  <p className="text-center text-xs text-slate-400">
                    Add at least 2 friends to start a game.
                  </p>
                )}

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
                          {getVotesRequired(generatedGame.friends.length)} votes.
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
                      <Link
                        href={`/game/${shareCode}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500"
                      >
                        Open Share Link
                      </Link>
                    </div>
                  </div>
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

        <section className="scroll-mt-8 border-t border-white/5 py-20">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 px-6 py-8 backdrop-blur-sm sm:px-8 sm:py-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Would you share this with your group chat?
              </h2>

              {feedbackResponse ? (
                <div className="mt-6 space-y-5 text-left">
                  <p className="text-center text-sm text-emerald-400">
                    Thanks — this helps us improve FriendRank.
                  </p>

                  {feedbackResponse === "not-yet" && (
                    <div>
                      <p className="mb-3 text-sm font-medium text-slate-300">
                        What would make it more shareable?
                      </p>
                      <textarea
                        value={shareabilityNote}
                        onChange={(e) => setShareabilityNote(e.target.value)}
                        placeholder="Example: funnier results, better categories, easier sharing..."
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

        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-slate-900 to-cyan-500/10 px-8 py-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to rank your friends?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Create your group game in under a minute. The group
              chat will never be the same.
            </p>
            <button
              type="button"
              onClick={scrollToCreateGame}
              className="mt-8 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500"
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
