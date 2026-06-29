import { createTopicHubRoute } from "@/lib/topic-hubs/create-topic-hub-route";

const { TopicHubRoutePage, generateTopicHubMetadata } =
  createTopicHubRoute("relationship-games");

export const generateMetadata = generateTopicHubMetadata;
export default TopicHubRoutePage;
