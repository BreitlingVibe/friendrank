import type { EntityAuthorityPanel } from "@/lib/entities/entity-authority";
import { EntityAuthorityPanelSection } from "@/components/shared/entity-authority-panel";

type TopicHubAuthorityPanelProps = {
  panel: EntityAuthorityPanel;
};

export function TopicHubAuthorityPanel({ panel }: TopicHubAuthorityPanelProps) {
  return (
    <EntityAuthorityPanelSection
      panel={panel}
      headingId="topic-hub-authority-heading"
    />
  );
}
