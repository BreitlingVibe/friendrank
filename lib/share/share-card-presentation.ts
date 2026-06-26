import type {
  CategoryResultDetail,
  ResultsPresentation,
} from "@/lib/results/presentation";

export type ShareCardFormat = "story" | "square";

export const SHARE_CARD_DIMENSIONS: Record<
  ShareCardFormat,
  { width: number; height: number }
> = {
  story: { width: 1080, height: 1920 },
  square: { width: 1080, height: 1080 },
};

export type ShareCardRoleBlock = {
  emoji: string;
  label: string;
  winner: string;
};

export type ShareCardPresentation = {
  hero: {
    emoji: string;
    label: string;
    winner: string;
  };
  secondaryRoles: ShareCardRoleBlock[];
  dangerousCombo: {
    sectionLabel: string;
    names: string;
  };
  reputation: {
    sectionLabel: string;
    value: string;
  };
  diagnosis: {
    sectionLabel: string;
    value: string;
  };
};

const DEFAULT_SECONDARY_CATEGORY_LABELS = ["Chaos Agent", "Secret Villain"] as const;

function toRoleBlock(detail: CategoryResultDetail): ShareCardRoleBlock {
  return {
    emoji: detail.category.emoji,
    label: detail.category.label,
    winner: detail.winner,
  };
}

function buildDefaultSecondaryRoles(
  categoryDetails: CategoryResultDetail[],
): ShareCardRoleBlock[] {
  const blocks: ShareCardRoleBlock[] = [];

  for (const label of DEFAULT_SECONDARY_CATEGORY_LABELS) {
    const match = categoryDetails.find(
      (detail) => detail.category.label === label,
    );
    if (match) {
      blocks.push(toRoleBlock(match));
    }
  }

  const thirdStrongest = categoryDetails[2];
  if (
    thirdStrongest &&
    !blocks.some((block) => block.label === thirdStrongest.category.label)
  ) {
    blocks.push(toRoleBlock(thirdStrongest));
  }

  return blocks.slice(0, 3);
}

function buildCustomSecondaryRoles(
  categoryDetails: CategoryResultDetail[],
  hero: CategoryResultDetail | undefined,
): ShareCardRoleBlock[] {
  const heroLabel = hero?.category.label;
  const blocks: ShareCardRoleBlock[] = [];

  for (const detail of categoryDetails) {
    if (!detail.category.isCustom) {
      continue;
    }

    if (detail.category.label === heroLabel) {
      continue;
    }

    blocks.push(toRoleBlock(detail));

    if (blocks.length >= 3) {
      return blocks;
    }
  }

  for (const detail of categoryDetails) {
    if (blocks.some((block) => block.label === detail.category.label)) {
      continue;
    }

    if (detail.category.label === heroLabel) {
      continue;
    }

    blocks.push(toRoleBlock(detail));

    if (blocks.length >= 3) {
      break;
    }
  }

  return blocks.slice(0, 3);
}

function buildSecondaryRoles(
  categoryDetails: CategoryResultDetail[],
): ShareCardRoleBlock[] {
  const hero = categoryDetails[0];
  const usesCustomCategories = categoryDetails.some(
    (detail) => detail.category.isCustom,
  );

  if (usesCustomCategories) {
    return buildCustomSecondaryRoles(categoryDetails, hero);
  }

  return buildDefaultSecondaryRoles(categoryDetails);
}

/**
 * Maps narrative results into the minimal share-card content model.
 */
export function buildShareCardPresentation(
  presentation: ResultsPresentation,
): ShareCardPresentation {
  const heroDetail = presentation.categoryDetails[0];
  const { dangerousCombo, labels } = presentation;

  return {
    hero: heroDetail
      ? {
          emoji: heroDetail.category.emoji,
          label: heroDetail.category.label,
          winner: heroDetail.winner,
        }
      : {
          emoji: "👑",
          label: "Main Character",
          winner: "Unknown",
        },
    secondaryRoles: buildSecondaryRoles(presentation.categoryDetails),
    dangerousCombo: {
      sectionLabel: labels.dangerousCombo,
      names: `${dangerousCombo.name1} + ${dangerousCombo.name2}`,
    },
    reputation: {
      sectionLabel: labels.groupReputation,
      value: presentation.groupReputation,
    },
    diagnosis: {
      sectionLabel: labels.endingSection,
      value: presentation.endingHighlight,
    },
  };
}
