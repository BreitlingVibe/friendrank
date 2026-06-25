export type ResultsSectionLabels = {
  groupVerdict: string;
  groupVibe: string;
  dangerousCombo: string;
  dangerousComboOutcomes: string;
  groupReputation: string;
  endingSection: string;
};

export const GENERIC_SECTION_LABELS: ResultsSectionLabels = {
  groupVerdict: "Group Verdict",
  groupVibe: "Group Vibe",
  dangerousCombo: "Most Dangerous Combo",
  dangerousComboOutcomes: "Potential outcomes:",
  groupReputation: "Group Reputation",
  endingSection: "Official Diagnosis",
};

export const COURTROOM_SECTION_LABELS: ResultsSectionLabels = {
  groupVerdict: "Case Summary",
  groupVibe: "Witness Statements",
  dangerousCombo: "Persons of Interest",
  dangerousComboOutcomes: "Likely scenarios:",
  groupReputation: "Final Verdict",
  endingSection: "Court Ruling",
};

export const GAMING_SECTION_LABELS: ResultsSectionLabels = {
  groupVerdict: "Match Summary",
  groupVibe: "Team Composition",
  dangerousCombo: "Danger Duo",
  dangerousComboOutcomes: "Play-by-play:",
  groupReputation: "Final Score",
  endingSection: "Post-Match Report",
};

export const OFFICE_SECTION_LABELS: ResultsSectionLabels = {
  groupVerdict: "Meeting Notes",
  groupVibe: "Culture Check",
  dangerousCombo: "HR Concern",
  dangerousComboOutcomes: "Risk factors:",
  groupReputation: "Performance Review",
  endingSection: "Executive Summary",
};

export const SCHOOL_SECTION_LABELS: ResultsSectionLabels = {
  groupVerdict: "Campus Report",
  groupVibe: "Hallway Intel",
  dangerousCombo: "Suspicious Alliance",
  dangerousComboOutcomes: "Probable outcomes:",
  groupReputation: "Semester Outcome",
  endingSection: "Report Card",
};

export const FAMILY_SECTION_LABELS: ResultsSectionLabels = {
  groupVerdict: "Family Council",
  groupVibe: "Household Mood",
  dangerousCombo: "Trouble Makers",
  dangerousComboOutcomes: "What happens next:",
  groupReputation: "Household Verdict",
  endingSection: "Family Ruling",
};

export type SectionLabelTheme =
  | "generic"
  | "courtroom"
  | "gaming"
  | "office"
  | "school"
  | "family";

export const SECTION_LABEL_THEMES: Record<
  SectionLabelTheme,
  ResultsSectionLabels
> = {
  generic: GENERIC_SECTION_LABELS,
  courtroom: COURTROOM_SECTION_LABELS,
  gaming: GAMING_SECTION_LABELS,
  office: OFFICE_SECTION_LABELS,
  school: SCHOOL_SECTION_LABELS,
  family: FAMILY_SECTION_LABELS,
};
