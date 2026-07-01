import type { EntityNavigation } from "@/lib/entities/entity-navigation";
import { EntityExplorer } from "@/components/shared/entity-explorer";

type TopicHubEntityNavigationProps = {
  navigation: EntityNavigation;
  intro?: string;
};

export function TopicHubEntityNavigation({
  navigation,
  intro,
}: TopicHubEntityNavigationProps) {
  return (
    <EntityExplorer
      navigation={navigation}
      headingId="topic-hub-entity-navigation-heading"
      intro={intro}
    />
  );
}
