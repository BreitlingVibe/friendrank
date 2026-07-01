import { buildTopicHubBreadcrumbItems } from "@/lib/seo/breadcrumbs";
import type { CtaLocation } from "@/lib/analytics";
import type { EntityAuthorityPanel } from "@/lib/entities/entity-authority";
import { getHubAuthorityPanel } from "@/lib/entities/entity-authority";
import type { EntityNavigation } from "@/lib/entities/entity-navigation";
import { getEntityNavigationForHub } from "@/lib/entities/entity-navigation";
import {
  getAllHubs,
  getHubFeaturedLivePages,
  getHubLandingPages,
  getHubPlannedPages,
  getTopicHubCtaLocation,
  resolveHubHeroCopy,
  resolveHubSectionCopy,
} from "@/lib/topic-hubs";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import type { HubBenefit, HubFaqItem, HubPageContent } from "@/lib/topic-hubs/hub-content-types";
import type {
  HubLandingPageRef,
  TopicHub,
} from "@/lib/topic-hubs/hub-types";
import type {
  ResolvedHubHeroCopy,
  ResolvedHubSectionCopy,
} from "@/lib/topic-hubs/hub-section-copy";

function sortByPriorityDesc(pages: HubLandingPageRef[]): HubLandingPageRef[] {
  return [...pages].sort(
    (pageA, pageB) => pageB.estimatedPriority - pageA.estimatedPriority,
  );
}

/** Raw hub page payload before topic hub experience transforms. */
export type AssembledTopicHubPage = {
  hub: TopicHub;
  content: HubPageContent | null;
  heroCopy: ResolvedHubHeroCopy;
  sectionCopy: ResolvedHubSectionCopy;
  benefitsTitle: string | null;
  benefits: HubBenefit[];
  faqTitle: string | null;
  faq: HubFaqItem[];
  featuredPages: HubLandingPageRef[];
  allLivePages: HubLandingPageRef[];
  plannedPages: HubLandingPageRef[];
  otherHubs: TopicHub[];
  entityNavigation: EntityNavigation;
  authorityPanel: EntityAuthorityPanel;
  ctaLocation: CtaLocation;
  breadcrumbs: ReturnType<typeof buildTopicHubBreadcrumbItems>;
};

/** Gathers registry-driven hub page data before experience transforms. */
export function assembleTopicHubPage(hub: TopicHub): AssembledTopicHubPage {
  const content = getHubPageContent(hub.id);
  const heroCopy = resolveHubHeroCopy(hub, content);
  const sectionCopy = resolveHubSectionCopy(hub, content);

  return {
    hub,
    content: content ?? null,
    heroCopy,
    sectionCopy,
    benefitsTitle: content?.benefitsTitle ?? null,
    benefits: content?.benefits ?? [],
    faqTitle: content?.faqTitle ?? null,
    faq: content?.faq ?? [],
    featuredPages: getHubFeaturedLivePages(hub.id),
    allLivePages: sortByPriorityDesc(getHubLandingPages(hub.id)),
    plannedPages: sortByPriorityDesc(getHubPlannedPages(hub.id)),
    otherHubs: getAllHubs(),
    entityNavigation: getEntityNavigationForHub(hub.id),
    authorityPanel: getHubAuthorityPanel(hub.id),
    ctaLocation: getTopicHubCtaLocation(hub.id),
    breadcrumbs: buildTopicHubBreadcrumbItems(hub.slug, hub.title),
  };
}
