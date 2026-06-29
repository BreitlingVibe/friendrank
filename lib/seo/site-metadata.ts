import { PRODUCTION_APP_URL } from "@/lib/app-url";

export const SITE_NAME = "FriendRank";

export const SITE_TITLE =
  "FriendRank – Discover Your Group's Lore | Fun Friend Voting Game";

export const SITE_DESCRIPTION =
  "Create a FriendRank game for your friends. Invite the group, vote on funny roles, and unlock results that reveal Main Character, Chaos Agent, Secret Villain, and more lore.";

export const SITE_KEYWORDS = [
  "friend ranking game",
  "group voting game",
  "friend group game",
  "party game online",
  "vote on friends",
  "group lore",
  "Main Character",
  "Chaos Agent",
  "social game",
  "FriendRank",
];

export const OG_IMAGE = {
  url: "/og/friendrank-og.png",
  width: 1200,
  height: 630,
  alt: "FriendRank – Discover your group's lore",
} as const;

export const MANIFEST_THEME_COLOR = "#7c3aed";
export const MANIFEST_BACKGROUND_COLOR = "#020617";

export function getGamePageUrl(shareCode: string): string {
  return `${PRODUCTION_APP_URL}/game/${shareCode}`;
}

export function buildStructuredDataGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${PRODUCTION_APP_URL}/#website`,
        url: PRODUCTION_APP_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: {
          "@id": `${PRODUCTION_APP_URL}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${PRODUCTION_APP_URL}/#organization`,
        name: SITE_NAME,
        url: PRODUCTION_APP_URL,
        logo: {
          "@type": "ImageObject",
          url: `${PRODUCTION_APP_URL}/icon-512.png`,
          width: 512,
          height: 512,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${PRODUCTION_APP_URL}/#webapp`,
        name: SITE_NAME,
        url: PRODUCTION_APP_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@id": `${PRODUCTION_APP_URL}/#organization`,
        },
        isPartOf: {
          "@id": `${PRODUCTION_APP_URL}/#website`,
        },
      },
    ],
  };
}
