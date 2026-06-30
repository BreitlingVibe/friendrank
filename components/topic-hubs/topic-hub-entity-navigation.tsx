import type { EntityNavigation } from "@/lib/entities/entity-navigation";
import { EntityExplorer } from "@/components/shared/entity-explorer";

type TopicHubEntityNavigationProps = {
  navigation: EntityNavigation;
};

export function TopicHubEntityNavigation({
  navigation,
}: TopicHubEntityNavigationProps) {
  return (
    <EntityExplorer
      navigation={navigation}
      headingId="topic-hub-entity-navigation-heading"
    />
  );
}
