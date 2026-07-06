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
  const logoId = `${PRODUCTION_APP_URL}/#logo`;
  const organizationId = `${PRODUCTION_APP_URL}/#organization`;
  const websiteId = `${PRODUCTION_APP_URL}/#website`;
  const webappId = `${PRODUCTION_APP_URL}/#webapp`;
  const homepageId = `${PRODUCTION_APP_URL}/#webpage`;
  const ogImageUrl = `${PRODUCTION_APP_URL}${OG_IMAGE.url}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: PRODUCTION_APP_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: {
          "@id": organizationId,
        },
        potentialAction: {
          "@type": "CreateAction",
          name: "Create a FriendRank game",
          target: {
            "@type": "EntryPoint",
            urlTemplate: PRODUCTION_APP_URL,
            actionPlatform: [
              "https://schema.org/DesktopWebPlatform",
              "https://schema.org/MobileWebPlatform",
            ],
          },
        },
      },
      {
        "@type": "ImageObject",
        "@id": logoId,
        url: `${PRODUCTION_APP_URL}/icon-512.png`,
        contentUrl: `${PRODUCTION_APP_URL}/icon-512.png`,
        width: 512,
        height: 512,
        caption: SITE_NAME,
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: PRODUCTION_APP_URL,
        description: SITE_DESCRIPTION,
        logo: {
          "@id": logoId,
        },
        image: {
          "@id": logoId,
        },
      },
      {
        "@type": "WebApplication",
        "@id": webappId,
        name: SITE_NAME,
        url: PRODUCTION_APP_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: "GameApplication",
        applicationSubCategory: "Social Party Game",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        image: ogImageUrl,
        screenshot: ogImageUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@id": organizationId,
        },
        isPartOf: {
          "@id": websiteId,
        },
      },
      {
        "@type": "WebPage",
        "@id": homepageId,
        url: PRODUCTION_APP_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": webappId,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogImageUrl,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#friendrank-hero-heading", "#landing-faq-heading"],
        },
      },
    ],
  };
}
