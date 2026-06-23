export const DEFAULT_FRIENDS = ["Alex", "Taylor", "Jordan", "Casey"];

export const FRIEND_RANK_CATEGORIES = [
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

export const VIBE_TAGS = [
  "Chaotic",
  "Meme-heavy",
  "College",
  "School",
  "Gaming",
  "Discord",
  "Sports",
  "Party",
  "Office",
  "Family",
  "Soft drama",
  "Brutal honesty",
] as const;

export const MAX_VIBE_TAGS = 3;

export type VibeTag = (typeof VIBE_TAGS)[number];

export type Tone = "Funny" | "Savage but friendly" | "Wholesome" | "Chaotic";

export type FriendRankCategory = {
  label: string;
  emoji: string;
  nickname: string;
  isCustom?: boolean;
  question?: string;
};

export type GeneratedGame = {
  tone: Tone;
  vibeTags: VibeTag[];
  extraContext: string;
  questions: string[];
  friends: string[];
  categories: FriendRankCategory[];
};

export const GAME_CATEGORY_COUNT = 5;

export const CUSTOM_CATEGORY_PLACEHOLDERS = [
  "Most likely to disappear from the group chat",
  "Most likely to start drama and deny it",
  "Most likely to be late but somehow forgiven",
] as const;

const CUSTOM_CATEGORY_EMOJIS = ["✨", "🎯", "💬"] as const;

export const tones: Tone[] = [
  "Funny",
  "Savage but friendly",
  "Wholesome",
  "Chaotic",
];

export function parseGroupNames(input: string): string[] {
  const names = input
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
  return names.length > 0 ? names.slice(0, 8) : [...DEFAULT_FRIENDS];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function titleCaseWords(text: string): string {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function stripNameIsTraitPrefix(
  text: string,
  friendNames: string[],
): string | null {
  for (const name of friendNames) {
    const pattern = new RegExp(`^${escapeRegExp(name)}\\s+is\\s+(.+)$`, "i");
    const match = pattern.exec(text);
    if (match) return match[1].trim();
  }

  const genericMatch = /^([A-Za-z][A-Za-z'-]{0,24})\s+is\s+(.+)$/i.exec(text);
  if (
    genericMatch &&
    !/^(most|who|the|always|never)$/i.test(genericMatch[1]) &&
    genericMatch[1].split(/\s+/).length <= 2
  ) {
    return genericMatch[2].trim();
  }

  return null;
}

function mostLikelyRestToCategoryLabel(rest: string): string {
  const lower = rest.toLowerCase();

  if (/disappear.*group chat/.test(lower)) return "Group Chat Ghost";
  if (/start.*drama.*deny/.test(lower)) return "Drama Denier";
  if (/start.*drama/.test(lower)) return "Drama Starter";
  if (/late/.test(lower)) return "Always Late";

  return titleCaseWords(rest).slice(0, 40);
}

function traitToCategoryAndQuestion(trait: string): {
  label: string;
  question: string;
} {
  const lower = trait.toLowerCase().trim();
  const words = lower.split(/\s+/).filter(Boolean);

  if (/always late|late but|somehow forgiven/.test(lower)) {
    return { label: "Always Late", question: "Who is always late?" };
  }
  if (lower === "chaotic") {
    return { label: "Chaotic One", question: "Who is the chaotic one?" };
  }
  if (words.length === 1 && /^[a-z'-]+$/i.test(words[0])) {
    return {
      label: `${titleCaseWords(trait)} One`,
      question: `Who is the ${lower} one?`,
    };
  }

  return {
    label: titleCaseWords(trait),
    question: `Who is ${lower}?`,
  };
}

function verbPhraseToCategoryAndQuestion(text: string): {
  label: string;
  question: string;
} {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const question = `Who ${lower}?`;

  if (/disappear(s)? from (the )?group chat/.test(lower)) {
    return { label: "Group Chat Ghost", question };
  }
  if (/start(s)? drama and deny it/.test(lower)) {
    return { label: "Drama Denier", question: "Who starts drama and denies it?" };
  }
  if (/start(s)? drama/.test(lower)) {
    return { label: "Drama Starter", question: "Who starts drama?" };
  }

  const startsMatch = /^starts?\s+(.+)$/i.exec(trimmed);
  if (startsMatch) {
    const object = startsMatch[1].trim();
    return {
      label: `${titleCaseWords(object)} Starter`,
      question: `Who starts ${object.toLowerCase()}?`,
    };
  }

  return {
    label: titleCaseWords(trimmed).slice(0, 40),
    question,
  };
}

function normalizeCustomCategoryInput(
  input: string,
  friendNames: string[],
): { label: string; question: string } {
  const text = input.trim().replace(/\?+$/, "").trim();
  if (!text) return { label: "", question: "" };

  const mostLikelyMatch = /^most likely to (.+)$/i.exec(text);
  if (mostLikelyMatch) {
    const rest = mostLikelyMatch[1].trim();
    return {
      label: mostLikelyRestToCategoryLabel(rest),
      question: `Who is most likely to ${rest.toLowerCase()}?`,
    };
  }

  const trait = stripNameIsTraitPrefix(text, friendNames);
  if (trait) {
    return traitToCategoryAndQuestion(trait);
  }

  if (/^who is (the )?/i.test(text)) {
    const rest = text.replace(/^who is (the )?/i, "").trim().toLowerCase();
    const traitForLabel = rest.endsWith(" one") ? rest.slice(0, -4).trim() : rest;
    const parsed = traitToCategoryAndQuestion(traitForLabel || rest);
    return {
      label: parsed.label,
      question: `Who is ${rest}?`,
    };
  }

  if (
    /^(starts?|disappears?|finishes?|creates?|causes?|never|always)\b/i.test(
      text,
    )
  ) {
    return verbPhraseToCategoryAndQuestion(text);
  }

  return traitToCategoryAndQuestion(text);
}

function parseCustomCategoryLabels(inputs: string[]): string[] {
  return inputs.map((value) => value.trim()).filter(Boolean).slice(0, 3);
}

function createCustomCategoryNickname(label: string): string {
  const normalized = label.toLowerCase();

  if (normalized.includes("group chat ghost")) return "Group Chat Ghost";
  if (normalized.includes("drama starter")) return "Certified Drama Starter";
  if (normalized.includes("drama denier")) return "Denial Expert";
  if (normalized.includes("always late")) return "Forgiven Latecomer";
  if (normalized.includes("chaotic")) return "Chaos Specialist";

  return `${label} Legend`;
}

function createCustomCategory(
  rawInput: string,
  index: number,
  friendNames: string[],
): FriendRankCategory {
  const { label, question } = normalizeCustomCategoryInput(
    rawInput,
    friendNames,
  );

  return {
    label,
    question,
    emoji: CUSTOM_CATEGORY_EMOJIS[index % CUSTOM_CATEGORY_EMOJIS.length],
    nickname: createCustomCategoryNickname(label),
    isCustom: true,
  };
}

export function buildGameCategories(
  customInputs: string[],
  friendNames: string[],
): FriendRankCategory[] {
  const customCategories = parseCustomCategoryLabels(customInputs).map(
    (input, index) => createCustomCategory(input, index, friendNames),
  );

  let defaultCount = GAME_CATEGORY_COUNT - customCategories.length;
  if (customCategories.length < 3) {
    defaultCount = Math.max(defaultCount, 3);
  }

  const defaults: FriendRankCategory[] = [];
  for (const category of FRIEND_RANK_CATEGORIES) {
    if (defaults.length >= defaultCount) break;

    const isDuplicate = customCategories.some(
      (custom) => custom.label.toLowerCase() === category.label.toLowerCase(),
    );

    if (!isDuplicate) {
      defaults.push({ ...category });
    }
  }

  return [...customCategories, ...defaults].slice(0, GAME_CATEGORY_COUNT);
}

export function generateFriendRankQuestions(
  categories: FriendRankCategory[],
): string[] {
  return categories.map((category) => {
    if (category.question) return category.question;

    const label = category.label.trim();

    if (/^most likely\b/i.test(label)) {
      const normalized = label.endsWith("?") ? label.slice(0, -1) : label;
      return `Who is ${normalized.toLowerCase()}?`;
    }

    return `Who is the ${label}?`;
  });
}

export function buildGeneratedGame(input: {
  friends: string[];
  vibeTags: VibeTag[];
  extraContext: string;
  customCategories: string[];
  tone: Tone;
}): GeneratedGame {
  const categories = buildGameCategories(input.customCategories, input.friends);

  return {
    tone: input.tone,
    vibeTags: input.vibeTags,
    extraContext: input.extraContext,
    friends: input.friends,
    categories,
    questions: generateFriendRankQuestions(categories),
  };
}

export function buildGeneratedGameFromRecord(input: {
  friends: string[];
  vibe_tags: VibeTag[];
  custom_categories: string[];
  tone: Tone;
}): GeneratedGame {
  return buildGeneratedGame({
    friends: input.friends,
    vibeTags: input.vibe_tags,
    extraContext: "",
    customCategories: input.custom_categories,
    tone: input.tone,
  });
}
