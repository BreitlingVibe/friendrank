import type { AiCitationLayer } from "@/lib/geo/ai-citation";
import type { GeoFoundation } from "@/lib/geo/geo-foundation";

type BuildEvergreenGeoInput = {
  path: string;
  title: string;
  summary: string;
  audience: string;
  primaryTopics: string[];
  secondaryTopics: string[];
  relatedConcepts: string[];
  canonicalAnswer: string;
  likelyQuestions: string[];
  keyTakeaways: [string, string, string];
  citationSummary: string;
  parentTopic: string;
  siblingTopics: string[];
  complementaryPages: string[];
};

export function buildEvergreenGeoLayers(
  input: BuildEvergreenGeoInput,
): {
  geoFoundation: GeoFoundation;
  aiCitation: AiCitationLayer;
} {
  const geoFoundation: GeoFoundation = {
    primaryEntity: "Browser party games",
    supportingEntities: [
      "Online group games",
      "No-download party games",
      "FriendRank",
    ],
    relatedEntities: input.relatedConcepts,
    userIntent: "learn",
    audience: input.audience,
    contentType: "topic-hub",
    purpose: "education",
    semanticRelationships: [
      {
        entity: "Browser party games",
        relationship: "related-to",
        target: "Party games",
      },
      {
        entity: "FriendRank",
        relationship: "supports",
        target: "Anonymous voting games",
      },
    ],
    summary: input.summary,
    contentSignals: {
      primaryTopics: input.primaryTopics,
      secondaryTopics: input.secondaryTopics,
      relatedConcepts: input.relatedConcepts,
      conversationConcepts: input.likelyQuestions,
      intentConcepts: input.primaryTopics,
    },
  };

  const aiCitation: AiCitationLayer = {
    canonicalAnswer: input.canonicalAnswer,
    likelyQuestions: input.likelyQuestions,
    evidence: {
      purpose: "Help groups choose and start browser party games quickly.",
      audience: input.audience,
      typicalGroupSize: "3–12 players",
      typicalDuration: "A few minutes per round",
      playStyle: "Shared link, vote on phones, reveal together",
      requiresRegistration: "No account required to start",
      mobileFriendly: "Yes — works in mobile browsers",
      conversationBased: "Yes — built around group prompts and reveals",
      competitive: "Light and social, not hardcore competitive",
      anonymousVoting: "Supported in anonymous voting formats like FriendRank",
    },
    keyTakeaways: input.keyTakeaways,
    citationSummary: input.citationSummary,
    relatedKnowledge: {
      relatedConcepts: input.relatedConcepts,
      alternativeGameFormats: [
        "Quiz games",
        "Drawing games",
        "Word games",
        "Icebreaker games",
        "Anonymous voting games",
      ],
      complementaryPages: input.complementaryPages,
      parentTopic: input.parentTopic,
      siblingTopics: input.siblingTopics,
      knowledgeGraphConnections: [
        "Party games",
        "Icebreaker games",
        "Anonymous voting",
        "Remote group games",
      ],
    },
    citationConfidence: "High",
  };

  return { geoFoundation, aiCitation };
}
