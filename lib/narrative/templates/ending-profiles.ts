export type EndingCopy = {
  title: string;
  subtitle: string;
};

export type EndingThemeProfile = {
  heading: string;
  endings: readonly EndingCopy[];
};

export type EndingPresentation = {
  heading: string;
  title: string;
  subtitle: string;
};

export type EndingTheme =
  | "generic"
  | "gaming"
  | "office"
  | "school"
  | "family"
  | "courtroom";

export const GAMING_ENDING_PROFILE: EndingThemeProfile = {
  heading: "POST-MATCH REPORT",
  endings: [
    { title: "GG.", subtitle: "Nobody saw this coming." },
    { title: "MVPs identified.", subtitle: "Friendships remain questionable." },
    { title: "Victory achieved.", subtitle: "Collateral damage acceptable." },
    { title: "Respawn recommended.", subtitle: "Same squad. New drama." },
  ],
};

export const OFFICE_ENDING_PROFILE: EndingThemeProfile = {
  heading: "EXECUTIVE SUMMARY",
  endings: [
    { title: "ACTION REQUIRED.", subtitle: "Morale is now a KPI." },
    { title: "ALIGNMENT ACHIEVED.", subtitle: "Synergy remains unverified." },
    { title: "FOLLOW-UP SCHEDULED.", subtitle: "HR has entered the chat." },
  ],
};

export const SCHOOL_ENDING_PROFILE: EndingThemeProfile = {
  heading: "REPORT CARD",
  endings: [
    { title: "SEMESTER COMPLETE.", subtitle: "Campus lore has been updated." },
    { title: "GROUP PROJECT GRADED.", subtitle: "Someone definitely carried." },
    { title: "ATTENDANCE NOTED.", subtitle: "The drama was extracurricular." },
  ],
};

export const FAMILY_ENDING_PROFILE: EndingThemeProfile = {
  heading: "HOUSEHOLD DECISION",
  endings: [
    { title: "TABLE TALK COMPLETE.", subtitle: "Someone is still grounded." },
    { title: "FAMILY VOTE CLOSED.", subtitle: "Feelings were not discussed." },
    { title: "HOUSE RULES UPDATED.", subtitle: "Nobody agreed to them." },
  ],
};

export const COURTROOM_ENDING_PROFILE: EndingThemeProfile = {
  heading: "FINAL VERDICT",
  endings: [
    { title: "GUILTY OF BEING UNHINGED.", subtitle: "The jury has ruled." },
    { title: "CASE DISMISSED.", subtitle: "Chaos remains admissible." },
    { title: "SENTENCING COMPLETE.", subtitle: "Appeals will be ignored." },
  ],
};

export const GENERIC_ENDING_PROFILE: EndingThemeProfile = {
  heading: "OFFICIAL DIAGNOSIS",
  endings: [
    { title: "CERTIFIED CHAOS.", subtitle: "Your friend group is officially:" },
    { title: "MAXIMUM.", subtitle: "GROUP CHAT THREAT LEVEL:" },
    { title: "TOO ONLINE TO FUNCTION.", subtitle: "Official diagnosis:" },
    { title: "GUILTY OF BEING UNHINGED.", subtitle: "The jury has ruled." },
  ],
};

export const ENDING_THEME_PROFILES: Record<EndingTheme, EndingThemeProfile> = {
  generic: GENERIC_ENDING_PROFILE,
  gaming: GAMING_ENDING_PROFILE,
  office: OFFICE_ENDING_PROFILE,
  school: SCHOOL_ENDING_PROFILE,
  family: FAMILY_ENDING_PROFILE,
  courtroom: COURTROOM_ENDING_PROFILE,
};
