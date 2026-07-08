"use client";

import { useEffect, useMemo } from "react";
import { FriendRankResultsShareSection } from "@/components/friend-rank-results-share-section";
import { FriendRankSectionAnnotation } from "@/components/friend-rank-section-annotation";
import { useHeroMoment } from "@/components/friend-rank-hero-moment";
import {
  ResultsCascadeSection,
  useResultsCascade,
} from "@/components/friend-rank-results-cascade";
import type { GeneratedGame } from "@/lib/game-build";
import type { AggregatedCategoryResult } from "@/lib/votes/aggregate";
import {
  buildDemoResultsPresentation,
  buildFriendRankShareText,
  buildRealResultsPresentation,
  extractGroupVibePhrase,
  generateGroupVibe,
  generateMockCategoryVotes,
  type CategoryResultDetail,
} from "@/lib/results/presentation";
import {
  CATEGORY_FRAMING_CLASS,
  getCategoryRevealFraming,
} from "@/lib/reveal/category-reveal-framing";

export function FriendRankResultsView({
  game,
  legacyVotes,
  aggregatedResults,
  unlockLabel,
  showPlayAgain = true,
  onPlayAgain,
}: {
  game: GeneratedGame;
  legacyVotes?: string[];
  aggregatedResults?: AggregatedCategoryResult[];
  unlockLabel?: string;
  showPlayAgain?: boolean;
  onPlayAgain?: () => void;
}) {
  const { enabled: heroMomentEnabled, stage: heroStage } = useHeroMoment();
  const { enabled: cascadeEnabled, sectionCount, setSectionCount } =
    useResultsCascade();
  const heroActive = heroMomentEnabled && heroStage !== "waiting";
  const heroCardActive =
    !heroMomentEnabled ||
    heroStage === "hero" ||
    heroStage === "rest" ||
    heroStage === "done";

  const presentation = useMemo(() => {
    if (aggregatedResults) {
      return buildRealResultsPresentation(game, aggregatedResults);
    }

    const votes = legacyVotes ?? generateMockCategoryVotes(game);
    return buildDemoResultsPresentation(game, votes);
  }, [aggregatedResults, game, legacyVotes]);

  const { categoryDetails, dangerousCombo, labels, annotations } = presentation;
  const topThree = categoryDetails.slice(0, 3);
  const [first, second, third] = topThree;
  const extraCategories = categoryDetails.slice(3);
  const hasSecondaryGrid = Boolean(second || third);

  const cascadeSectionCount = useMemo(() => {
    let count = 0;
    if (hasSecondaryGrid) count += 1;
    count += extraCategories.length;
    count += 5;
    return count;
  }, [extraCategories.length, hasSecondaryGrid]);

  useEffect(() => {
    if (!cascadeEnabled || sectionCount === cascadeSectionCount) {
      return;
    }

    setSectionCount(cascadeSectionCount);
  }, [cascadeEnabled, cascadeSectionCount, sectionCount, setSectionCount]);

  let cascadeIndex = 0;

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

  function renderCategoryCard(
    detail: CategoryResultDetail,
    options: { featured: boolean; rank: number },
  ) {
    const { featured, rank } = options;
    const framing = getCategoryRevealFraming(detail.category.label, rank);

    return (
      <div
        key={detail.category.label}
        className={
          featured
            ? "rounded-2xl border-2 border-violet-400/50 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-cyan-600/20 p-6 shadow-lg shadow-violet-500/20"
            : "rounded-2xl border border-white/15 bg-white/[0.04] p-5"
        }
      >
        {framing && (
          <p
            className={`${featured ? "mb-3 text-center" : "mb-2"} ${CATEGORY_FRAMING_CLASS}`}
          >
            {framing}
          </p>
        )}

        {featured && (
          <div className="mb-3 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-200">
              #1 · Top Rank
            </p>
            <FriendRankSectionAnnotation
              text={annotations.topRank}
              className="text-center"
            />
          </div>
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
          Here&apos;s your group&apos;s story
        </h2>
        <p className="mt-2 text-base text-violet-200">
          Starting with who your friends crowned first.
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Based on your group vibe:{" "}
          <span className="text-violet-300">{groupVibePhrase}</span>
        </p>
      </div>

      <div className="space-y-4 px-5 py-6 sm:px-6">
        <div className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-5 py-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">
            {labels.groupVerdict}
          </p>
          <FriendRankSectionAnnotation
            text={annotations.groupVerdict}
            className="text-center"
          />
          <p className="mt-2 text-lg font-bold leading-snug text-white">
            {presentation.groupVerdict}
          </p>
        </div>

        {first && (
          <div className="relative">
            {heroMomentEnabled && (
              <div
                aria-hidden
                className={`friendrank-hero-glow absolute -inset-3 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.45),transparent_72%)] ${
                  heroActive ? "friendrank-hero-glow--visible" : ""
                }`}
              />
            )}
            <div
              className={
                heroMomentEnabled
                  ? `friendrank-hero-card ${heroCardActive ? "friendrank-hero-card--active" : ""}`
                  : undefined
              }
            >
              {renderCategoryCard(first, { featured: true, rank: 1 })}
            </div>
          </div>
        )}

        {(second || third) && (
          <ResultsCascadeSection
            index={cascadeIndex++}
            className="grid gap-3 sm:grid-cols-2"
          >
            {second && renderCategoryCard(second, { featured: false, rank: 2 })}
            {third && renderCategoryCard(third, { featured: false, rank: 3 })}
          </ResultsCascadeSection>
        )}

        {extraCategories.map((detail, extraIndex) => (
          <ResultsCascadeSection key={detail.category.label} index={cascadeIndex++}>
            {renderCategoryCard(detail, {
              featured: false,
              rank: extraIndex + 4,
            })}
          </ResultsCascadeSection>
        ))}

        <ResultsCascadeSection index={cascadeIndex++}>
        <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
            {labels.groupVibe}
          </p>
          <FriendRankSectionAnnotation text={annotations.groupVibe} />
          <p className="mt-3 text-base font-medium leading-relaxed text-white">
            {groupVibe}
          </p>
        </div>
        </ResultsCascadeSection>

        <ResultsCascadeSection index={cascadeIndex++}>
        <div className="rounded-2xl border border-orange-500/25 bg-orange-500/10 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-300">
            {labels.dangerousCombo}
          </p>
          <FriendRankSectionAnnotation text={annotations.dangerousCombo} />
          <p className="mt-3 text-xl font-extrabold text-white">
            {dangerousCombo.name1} + {dangerousCombo.name2}
          </p>
          <p className="mt-2 text-sm font-semibold text-orange-200">
            Risk level: {dangerousCombo.riskLevel}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-orange-300/80">
            {labels.dangerousComboOutcomes}
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
        </ResultsCascadeSection>

        <ResultsCascadeSection index={cascadeIndex++}>
        <div className="rounded-2xl border border-violet-500/25 bg-violet-500/10 p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-violet-300">
            {labels.groupReputation}
          </p>
          <FriendRankSectionAnnotation
            text={annotations.groupReputation}
            className="text-center"
          />
          <p className="mt-3 text-xl font-extrabold tracking-tight text-white">
            {presentation.groupReputation}
          </p>
        </div>
        </ResultsCascadeSection>

        <ResultsCascadeSection index={cascadeIndex++}>
        <div className="rounded-3xl border-2 border-violet-400/40 bg-gradient-to-br from-violet-600/35 via-fuchsia-600/20 to-cyan-600/25 px-6 py-10 text-center shadow-xl shadow-violet-500/25">
          <p className="mb-4 text-sm text-violet-200/90">
            This is how your group reads together.
          </p>
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-200">
              {presentation.endingCard.heading}
            </p>
            <FriendRankSectionAnnotation
              text={annotations.ending}
              className="text-center"
            />
          </div>
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
        </ResultsCascadeSection>

        <FriendRankResultsShareSection
          presentation={presentation}
          shareText={shareText}
        />

        {showPlayAgain && onPlayAgain && (
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-semibold transition hover:bg-white/10"
          >
            Play again
          </button>
        )}

        <p className="text-center text-xs text-slate-500">Made with FriendRank</p>
      </div>
    </div>
  );
}
