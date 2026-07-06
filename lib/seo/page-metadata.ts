import type { Metadata } from "next";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/seo/site-metadata";
import {
  buildOpenGraphImage,
  GAME_PAGE_ROBOTS,
  INDEXABLE_PAGE_ROBOTS,
  SITE_FORMAT_DETECTION,
} from "@/lib/seo/technical-seo";

const ROOT_OG_IMAGE = buildOpenGraphImage(OG_IMAGE);

export const rootSiteMetadata: Metadata = {
  metadataBase: new URL(PRODUCTION_APP_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: PRODUCTION_APP_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: SITE_FORMAT_DETECTION,
  robots: INDEXABLE_PAGE_ROBOTS,
  alternates: {
    canonical: PRODUCTION_APP_URL,
    types: {
      "text/plain": "/llms.txt",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: PRODUCTION_APP_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [ROOT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [ROOT_OG_IMAGE],
  },
};

export function buildLandingPageMetadata(input: {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
}): Metadata {
  const { metaTitle, metaDescription, canonicalUrl } = input;

  return {
    title: {
      absolute: metaTitle,
    },
    description: metaDescription,
    robots: INDEXABLE_PAGE_ROBOTS,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [ROOT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ROOT_OG_IMAGE],
    },
  };
}

export function buildTopicHubMetadata(input: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  const metaTitle = `${input.title} | ${SITE_NAME}`;
  const canonicalUrl = `${PRODUCTION_APP_URL}/${input.slug}`;

  return {
    ...buildLandingPageMetadata({
      metaTitle,
      metaDescription: input.description,
      canonicalUrl,
    }),
    robots: INDEXABLE_PAGE_ROBOTS,
  };
}

export function buildGamePageMetadata(shareCode: string): Metadata {
  const canonicalUrl = `${PRODUCTION_APP_URL}/game/${shareCode}`;
  const title = "FriendRank Game";
  const description =
    "Vote in this FriendRank game with your friends and unlock your group's funny roles and results.";

  return {
    title,
    description,
    robots: GAME_PAGE_ROBOTS,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [ROOT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ROOT_OG_IMAGE],
    },
  };
}
