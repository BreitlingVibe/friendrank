import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TopicHubPage } from "@/components/topic-hubs/topic-hub-page";
import { getHub } from "@/lib/topic-hubs";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import { buildTopicHubMetadata } from "@/lib/seo/page-metadata";

export function createTopicHubRoute(hubId: string) {
  function TopicHubRoutePage() {
    const hub = getHub(hubId);
    if (!hub) {
      notFound();
    }

    return <TopicHubPage hub={hub} />;
  }

  function generateTopicHubMetadata(): Metadata {
    const hub = getHub(hubId);
    if (!hub) {
      return {};
    }

    return buildTopicHubMetadata({
      title: hub.title,
      description:
        getHubPageContent(hubId)?.metaDescription ?? hub.description,
      slug: hub.slug,
    });
  }

  return {
    TopicHubRoutePage,
    generateTopicHubMetadata,
  };
}
