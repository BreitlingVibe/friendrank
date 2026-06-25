export type ReputationBucket =
  | "family"
  | "office"
  | "school"
  | "gaming"
  | "online"
  | "chaos"
  | "democracy"
  | "mainCharacterOrbit"
  | "drama"
  | "therapists"
  | "custom"
  | "fallback";

export const GROUP_REPUTATION_PROFILES: Record<
  ReputationBucket,
  readonly string[]
> = {
  family: [
    "🏡 Family Group Chat Survivors",
    "🧃 Somehow Still Functional",
    "👨‍👩‍👧 The Holiday Table Menaces",
  ],
  office: [
    "💼 After-Hours Damage Control Unit",
    "📎 Unofficial Slack Support Group",
    "☕ Break Room Reputation Crisis",
  ],
  school: [
    "📚 Campus Lore Committee",
    "🎒 Hallway Rumor Department",
    "📝 Unpaid Group Project Survivors",
  ],
  gaming: [
    "🎮 Discord Degenerates Union",
    "🕹️ Late-Night Queue Enthusiasts",
    "🎧 Voice Chat War Criminals",
  ],
  online: [
    "📱 Permanently Online Citizens",
    "📡 The Algorithm's Favorites",
    "Elite Meme Department",
  ],
  chaos: [
    "🚨 Public Disturbance Unit",
    "🔥 Certified Bad Influence",
    "Group Chat Menaces",
  ],
  democracy: [
    "🧃 Somehow Still Functional",
    "🗳️ Messy Democracy Enjoyers",
    "🎪 Too Many Opinions, One Group Chat",
  ],
  mainCharacterOrbit: [
    "🏆 Main Character Support Group",
    "👑 Protagonist Entourage LLC",
    "🌟 One Star, Many Supporting Roles",
  ],
  drama: [
    "🎭 Drama Appreciation Society",
    "🍿 Certified Plot Twist Fans",
    "🫖 Soft Drama Scholars",
  ],
  therapists: [
    "🧠 Unlicensed Group Therapists",
    "💚 Emotional Support Contractors",
    "🛋️ Free Therapy, No Refunds",
  ],
  custom: [
    "🎯 Inside Joke Preservation Society",
    "✨ Personalized Chaos Collective",
    "🔮 Custom Category Connoisseurs",
  ],
  fallback: [
    "Certified Chaos Crew",
    "Emotionally Unstable Legends",
    "Professional Bad Influences",
    "Unsupervised Adults Club",
    "Plot Twist Enthusiasts",
    "Chaos With WiFi",
  ],
};
