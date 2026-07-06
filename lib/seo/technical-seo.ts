import type { Metadata } from "next";

/** Shared indexable-page robots directives for search and AI crawlers. */
export const INDEXABLE_PAGE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

/** Private share-link game pages should not compete with canonical marketing URLs. */
export const GAME_PAGE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

export const SITE_FORMAT_DETECTION: NonNullable<Metadata["formatDetection"]> = {
  email: false,
  address: false,
  telephone: false,
};

export function buildOpenGraphImage(image: {
  url: string;
  width: number;
  height: number;
  alt: string;
}) {
  return {
    url: image.url,
    secureUrl: image.url,
    width: image.width,
    height: image.height,
    alt: image.alt,
    type: "image/png" as const,
  };
}
