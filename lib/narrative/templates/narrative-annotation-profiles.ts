import { pickIndex } from "@/lib/narrative/utils/seed";

export type ResultsNarrativeAnnotations = {
  topRank: string;
  groupVerdict: string;
  groupVibe: string;
  dangerousCombo: string;
  groupReputation: string;
  ending: string;
};

export type NarrativeAnnotationTheme =
  | "generic"
  | "gaming"
  | "office"
  | "school"
  | "family"
  | "courtroom";

export type NarrativeAnnotationProfile = {
  topRank: readonly string[];
  groupVerdict: readonly string[];
  groupVibe: readonly string[];
  dangerousCombo: readonly string[];
  groupReputation: readonly string[];
  ending: readonly string[];
};

export const GENERIC_ANNOTATION_PROFILE: NarrativeAnnotationProfile = {
  topRank: ["Profile confirmed"],
  groupVerdict: ["Verdict recorded"],
  groupVibe: ["Group dynamics recorded", "Group pattern recognized"],
  dangerousCombo: ["Pair interaction identified"],
  groupReputation: ["Group consensus recorded"],
  ending: ["Final report archived", "Consensus archived"],
};

export const GAMING_ANNOTATION_PROFILE: NarrativeAnnotationProfile = {
  topRank: ["Character profile confirmed"],
  groupVerdict: ["Match outcome logged"],
  groupVibe: ["Team composition locked"],
  dangerousCombo: ["Duo synergy flagged"],
  groupReputation: ["Scoreboard finalized"],
  ending: ["Match report archived"],
};

export const OFFICE_ANNOTATION_PROFILE: NarrativeAnnotationProfile = {
  topRank: ["Employee profile confirmed"],
  groupVerdict: ["Meeting notes filed"],
  groupVibe: ["Team dynamics recorded"],
  dangerousCombo: ["Risk pairing noted"],
  groupReputation: ["Review completed"],
  ending: ["Executive report archived"],
};

export const SCHOOL_ANNOTATION_PROFILE: NarrativeAnnotationProfile = {
  topRank: ["Student profile confirmed"],
  groupVerdict: ["Campus report filed"],
  groupVibe: ["Hallway intel recorded"],
  dangerousCombo: ["Alliance flagged"],
  groupReputation: ["Semester outcome logged"],
  ending: ["Semester report archived"],
};

export const FAMILY_ANNOTATION_PROFILE: NarrativeAnnotationProfile = {
  topRank: ["Family profile confirmed"],
  groupVerdict: ["Council ruling filed"],
  groupVibe: ["Household dynamics recorded"],
  dangerousCombo: ["Trouble pairing noted"],
  groupReputation: ["Household verdict logged"],
  ending: ["Family ruling archived"],
};

export const COURTROOM_ANNOTATION_PROFILE: NarrativeAnnotationProfile = {
  topRank: ["Witness statement accepted"],
  groupVerdict: ["Case summary filed"],
  groupVibe: ["Evidence catalogued"],
  dangerousCombo: ["Persons linked"],
  groupReputation: ["Jury consensus recorded"],
  ending: ["Verdict archived"],
};

export const NARRATIVE_ANNOTATION_PROFILES: Record<
  NarrativeAnnotationTheme,
  NarrativeAnnotationProfile
> = {
  generic: GENERIC_ANNOTATION_PROFILE,
  gaming: GAMING_ANNOTATION_PROFILE,
  office: OFFICE_ANNOTATION_PROFILE,
  school: SCHOOL_ANNOTATION_PROFILE,
  family: FAMILY_ANNOTATION_PROFILE,
  courtroom: COURTROOM_ANNOTATION_PROFILE,
};

export function resolveAnnotationProfile(
  profile: NarrativeAnnotationProfile,
  seed: number,
): ResultsNarrativeAnnotations {
  const pick = (options: readonly string[], offset: number) =>
    options[pickIndex(seed, offset, options.length)] ?? options[0];

  return {
    topRank: pick(profile.topRank, 0),
    groupVerdict: pick(profile.groupVerdict, 1),
    groupVibe: pick(profile.groupVibe, 2),
    dangerousCombo: pick(profile.dangerousCombo, 3),
    groupReputation: pick(profile.groupReputation, 4),
    ending: pick(profile.ending, 5),
  };
}

export const GENERIC_NARRATIVE_ANNOTATIONS = resolveAnnotationProfile(
  GENERIC_ANNOTATION_PROFILE,
  0,
);
