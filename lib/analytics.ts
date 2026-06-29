"use client";

import { sendGAEvent } from "@next/third-parties/google";

const isProduction = process.env.NODE_ENV === "production";

const SESSION_KEYS = {
  creationStarted: "friendrank_ga_creation_started",
  creationAbandoned: "friendrank_ga_creation_abandoned",
} as const;

type GaEventParams = Record<string, string | number | boolean>;

function trackEvent(eventName: string, params?: GaEventParams) {
  if (!isProduction) {
    return;
  }

  sendGAEvent("event", eventName, params ?? {});
}

function hasSessionFlag(key: string): boolean {
  if (typeof sessionStorage === "undefined") {
    return false;
  }

  return sessionStorage.getItem(key) === "1";
}

function setSessionFlag(key: string) {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  sessionStorage.setItem(key, "1");
}

export type GameCreationStartedParams = {
  friend_count: number;
  selected_tone: string;
  selected_vibe_count: number;
};

export function trackGameCreationStarted(params: GameCreationStartedParams) {
  if (hasSessionFlag(SESSION_KEYS.creationStarted)) {
    return;
  }

  setSessionFlag(SESSION_KEYS.creationStarted);
  trackEvent("game_creation_started", params);
}

export type GameCreatedParams = {
  friend_count: number;
  tone: string;
  custom_categories_used: boolean;
  category_count: number;
};

export function trackGameCreated(params: GameCreatedParams) {
  trackEvent("game_created", params);
}

export type GameCreationAbandonedParams = {
  friend_count: number;
  selected_tone: string;
  selected_vibe_count: number;
};

export function trackGameCreationAbandoned(params: GameCreationAbandonedParams) {
  if (
    hasSessionFlag(SESSION_KEYS.creationAbandoned) ||
    !hasSessionFlag(SESSION_KEYS.creationStarted)
  ) {
    return;
  }

  setSessionFlag(SESSION_KEYS.creationAbandoned);
  trackEvent("game_creation_abandoned", params);
}

export type InviteCopiedParams = {
  game_id: string;
};

export function trackInviteCopied(params: InviteCopiedParams) {
  trackEvent("invite_link_copied", params);
}

export type VoteSubmittedParams = {
  question_index: number;
  question_count: number;
};

export function trackVoteSubmitted(params: VoteSubmittedParams) {
  trackEvent("vote_submitted", params);
}

export type ResultsUnlockedParams = {
  friend_count: number;
  vote_count: number;
};

export function trackResultsUnlocked(params: ResultsUnlockedParams) {
  trackEvent("results_unlocked", params);
}

export function trackSharePreview() {
  trackEvent("share_card_previewed");
}

export function trackShareDownloaded() {
  trackEvent("share_card_downloaded");
}

export function trackShareShared() {
  trackEvent("share_card_shared");
}

export function trackCopyShareText() {
  trackEvent("copy_share_text");
}

export type CtaLocation =
  | "hero_start"
  | "categories"
  | "form_submit"
  | "bottom_start"
  | "landing_most_likely_to_generator"
  | "landing_best_friend_quiz"
  | "landing_who_knows_me_best"
  | "landing_friendship_test"
  | "landing_anonymous_voting_game"
  | "landing_group_voting_game"
  | "landing_party_voting_game"
  | "landing_icebreaker_game"
  | "landing_office_icebreaker"
  | "landing_classroom_icebreaker"
  | "landing_team_building_game"
  | "landing_team_bonding_game"
  | "landing_work_team_game"
  | "landing_relationship_quiz"
  | "landing_couple_quiz"
  | "landing_boyfriend_girlfriend_quiz"
  | "landing_birthday_party_game"
  | "landing_sleepover_game"
  | "landing_girls_night_game"
  | "landing_friend_test"
  | "landing_bestie_quiz"
  | "landing_funny_friend_quiz"
  | "landing_friend_games"
  | "landing_party_games"
  | "landing_team_building_games"
  | "landing_relationship_games"
  | "landing_icebreaker_games"
  | "homepage_friend_games"
  | "homepage_party_games"
  | "homepage_team_building_games"
  | "homepage_relationship_games"
  | "homepage_icebreaker_games";

export type CtaClickedParams = {
  location: CtaLocation;
};

export function trackCtaClicked(params: CtaClickedParams) {
  trackEvent("cta_clicked", params);
}

export function markGameCreationCompleted() {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  sessionStorage.setItem(`${SESSION_KEYS.creationStarted}_done`, "1");
}

export function shouldTrackGameCreationAbandonment(): boolean {
  if (typeof sessionStorage === "undefined") {
    return false;
  }

  return (
    hasSessionFlag(SESSION_KEYS.creationStarted) &&
    sessionStorage.getItem(`${SESSION_KEYS.creationStarted}_done`) !== "1" &&
    !hasSessionFlag(SESSION_KEYS.creationAbandoned)
  );
}
