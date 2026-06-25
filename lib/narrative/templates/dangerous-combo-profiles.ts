export type DangerousComboProfile = {
  headline: string;
  riskLevel: "Moderate" | "High" | "Extreme";
  outcomes: readonly [string, string, string];
};

export const MAIN_CHARACTER_CHAOS_PROFILE: DangerousComboProfile = {
  headline: "One creates the chaos. The other quietly keeps it alive.",
  riskLevel: "High",
  outcomes: [
    "Somehow becomes group leader.",
    "Turns one joke into group policy.",
    "Plans a trip nobody asked for.",
  ],
};

export const SECRET_VILLAIN_CHAOS_PROFILE: DangerousComboProfile = {
  headline: "The mastermind found their chaos co-pilot.",
  riskLevel: "Extreme",
  outcomes: [
    "Accidentally starts another argument.",
    "Convinces everyone it wasn't them.",
    "Somehow benefits from every situation.",
  ],
};

export const CHRONICALLY_ONLINE_DELUSIONAL_PROFILE: DangerousComboProfile = {
  headline: "This duo is terminally online and confidently wrong.",
  riskLevel: "High",
  outcomes: [
    "Sends memes before anyone wakes up.",
    "Creates theories out of nothing.",
    "Keeps the chat alive until 3AM.",
  ],
};

export const CHAOS_CALM_PROFILE: DangerousComboProfile = {
  headline: "One creates the chaos. The other quietly keeps it alive.",
  riskLevel: "Moderate",
  outcomes: [
    "Turns a small issue into a group-wide debate.",
    "Gets forgiven before anyone else could.",
    "Somehow restores peace after making it worse.",
  ],
};

export const TITLE_COLLECTORS_PROFILE: DangerousComboProfile = {
  headline: "Together they collected most of the group's titles.",
  riskLevel: "Extreme",
  outcomes: [
    "Split the spotlight like it belongs to them.",
    "Leave everyone else fighting for leftovers.",
    "Make every category feel like their shared empire.",
  ],
};

export const AGREEMENT_THREAT_PROFILE: DangerousComboProfile = {
  headline:
    "If these two ever agree on something, everyone else should be worried.",
  riskLevel: "High",
  outcomes: [
    "Lock in a plan before anyone can object.",
    "Turn one idea into a group-wide mission.",
    "Make the rest of the chat feel outvoted instantly.",
  ],
};

export const DRAMA_MAGNETS_PROFILE: DangerousComboProfile = {
  headline: "Somehow these two keep showing up wherever the drama starts.",
  riskLevel: "High",
  outcomes: [
    "Escalate a harmless comment into lore.",
    "Start drama and deny it with confidence.",
    "Become the reason the chat needed a cooldown.",
  ],
};

export const FALLBACK_COMBO_PROFILES: readonly DangerousComboProfile[] = [
  {
    headline: "An unpredictable pair with dangerous chemistry.",
    riskLevel: "Moderate",
    outcomes: [
      "Start something the group wasn't ready for.",
      "Make a normal night feel suspiciously eventful.",
      "Leave everyone else checking the chat twice.",
    ],
  },
  {
    headline: "Together they are a threat to group chat peace.",
    riskLevel: "High",
    outcomes: [
      "Invent a new inside joke by accident.",
      "Turn one decision into a whole saga.",
      "Somehow become the center of every story.",
    ],
  },
];
