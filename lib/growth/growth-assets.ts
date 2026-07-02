import { applyAiCitationLayer } from "@/lib/geo/ai-citation";
import { applyGeoFoundation } from "@/lib/geo/geo-foundation";
import { applyTopicHubExperience } from "@/lib/landing-pages/topic-hub-experience";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { buildGrowthAssistantReport } from "@/lib/growth/growth-assistant";
import {
  getAllGrowthClassifications,
  type GrowthPageClassification,
} from "@/lib/growth/growth-priority";
import { getCtrImprovementCandidates } from "@/lib/growth/ctr-optimization";
import { getAllHubs } from "@/lib/topic-hubs";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import { assembleTopicHubPage } from "@/lib/topic-hubs/hub-page-data";
import type { GeoFoundation } from "@/lib/geo/geo-foundation";
import type { AiCitationLayer } from "@/lib/geo/ai-citation";

export type RedditPostAsset = {
  title: string;
  body: string;
  suggestedSubredditCategory: string;
  softCta: string;
};

export type LinkedInPostAsset = {
  shortVersion: string;
  longVersion: string;
  cta: string;
};

export type PinterestAsset = {
  title: string;
  description: string;
  suggestedImageConcept: string;
};

export type AiDirectoryAsset = {
  oneSentence: string;
  threeSentence: string;
  oneHundredFiftyWords: string;
};

export type BacklinkOutreachAsset = {
  subject: string;
  body: string;
  cta: string;
};

export type ProductSharingAsset = {
  whatsapp: string;
  discord: string;
  slack: string;
};

export type SeoSnippetAsset = {
  title: string;
  metaDescription: string;
};

export type PromotionChecklistItem = {
  channel: string;
  whereToPublish: string;
  estimatedEffort: "low" | "medium" | "high";
  expectedImpact: "low" | "medium" | "high";
};

export type GrowthPageAssetBundle = {
  reddit: RedditPostAsset;
  linkedIn: LinkedInPostAsset;
  pinterest: PinterestAsset;
  aiDirectory: AiDirectoryAsset;
  backlinkOutreach: BacklinkOutreachAsset;
  productSharing: ProductSharingAsset;
  seoSnippet: SeoSnippetAsset;
  promotionChecklist: PromotionChecklistItem[];
};

export type GrowthAssetsReport = {
  assetReadiness: "Ready" | "Incomplete";
  bestPage: {
    path: string;
    url: string;
    title: string;
    pageType: GrowthPageClassification["pageType"];
    growthTier: GrowthPageClassification["growthTier"];
    categoryGroup: string | null;
    selectionReason: string;
  };
  assets: GrowthPageAssetBundle;
  recommendedPublicationOrder: string[];
  expectedEffort: "low" | "medium" | "high";
  expectedReach: "low" | "medium" | "high";
};

type GrowthAssetPageContext = {
  classification: GrowthPageClassification;
  url: string;
  path: string;
  title: string;
  primaryKeyword: string;
  audience: string;
  geo: GeoFoundation;
  aiCitation: AiCitationLayer;
  currentMetaTitle: string;
  currentMetaDescription: string;
  suggestedMetaTitle: string | null;
  suggestedMetaDescription: string | null;
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function fitWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) {
    return text.trim();
  }
  return `${words.slice(0, maxWords).join(" ").replace(/[,;]$/, "")}.`;
}

function resolveSubredditCategory(
  categoryGroup: GrowthPageClassification["categoryGroup"],
  pageType: GrowthPageClassification["pageType"],
): string {
  if (pageType === "topic-hub") {
    return "Party games / friend groups (e.g. r/PartyGames, r/boardgames)";
  }

  switch (categoryGroup) {
    case "party":
      return "Party planning (e.g. r/PartyGames, r/weddingplanning)";
    case "team":
      return "Team building (e.g. r/Teambuilding, r/remotework)";
    case "relationship":
      return "Couples and social games (e.g. r/relationships, r/dating)";
    case "question":
      return "Conversation games (e.g. r/PartyGames, r/AskReddit-style threads)";
    default:
      return "Friend groups and hangouts (e.g. r/PartyGames, r/friends)";
  }
}

function resolveOutreachBlogCategory(
  categoryGroup: GrowthPageClassification["categoryGroup"],
): string {
  switch (categoryGroup) {
    case "team":
      return "team-building or workplace icebreaker blog";
    case "relationship":
      return "relationship or date-night activity blog";
    case "party":
      return "party game roundup blog";
    case "question":
      return "conversation starter or classroom activity blog";
    default:
      return "party game or friend activity blog";
  }
}

/** Picks the highest-priority promotion target from the growth assistant. */
export function pickHighestPriorityPageForAssets(): GrowthPageClassification {
  const assistantReport = buildGrowthAssistantReport();
  const bestTopicHub = assistantReport.contentRecommendations.find(
    (entry) => entry.label === "Best topic hub",
  );
  const targetPath = bestTopicHub?.path ?? "/friend-games";

  const classification = getAllGrowthClassifications().find(
    (page) => page.path === targetPath,
  );

  if (!classification) {
    return getAllGrowthClassifications().find((page) => page.pageType === "topic-hub")!;
  }

  return classification;
}

function buildTopicHubContext(
  classification: GrowthPageClassification,
): GrowthAssetPageContext {
  const hubSlug = classification.path.slice(1);
  const hub = getAllHubs().find((entry) => entry.slug === hubSlug);
  if (!hub) {
    throw new Error(`Topic hub not found for path ${classification.path}`);
  }

  const page = applyAiCitationLayer(
    applyGeoFoundation(applyTopicHubExperience(assembleTopicHubPage(hub))),
  );
  const content = getHubPageContent(hub.id);
  const ctrCandidate = getCtrImprovementCandidates().find(
    (candidate) => candidate.path === classification.path,
  );

  return {
    classification,
    url: classification.url,
    path: classification.path,
    title: hub.title,
    primaryKeyword: hub.primaryKeyword,
    audience: page.geoFoundation.audience,
    geo: page.geoFoundation,
    aiCitation: page.aiCitation,
    currentMetaTitle: `${hub.title} | FriendRank`,
    currentMetaDescription: content?.metaDescription ?? hub.description,
    suggestedMetaTitle: ctrCandidate?.suggestedTitle ?? null,
    suggestedMetaDescription: ctrCandidate?.suggestedMeta ?? null,
  };
}

function buildLandingPageContext(
  classification: GrowthPageClassification,
): GrowthAssetPageContext {
  const slug = classification.path.slice(1);
  const page = LANDING_PAGES.find((entry) => entry.slug === slug);
  if (!page) {
    throw new Error(`Landing page not found for path ${classification.path}`);
  }

  const ctrCandidate = getCtrImprovementCandidates().find(
    (candidate) => candidate.path === classification.path,
  );

  return {
    classification,
    url: classification.url,
    path: classification.path,
    title: page.title,
    primaryKeyword: page.title.toLowerCase(),
    audience: page.geoFoundation.audience,
    geo: page.geoFoundation,
    aiCitation: page.aiCitation,
    currentMetaTitle: page.metaTitle,
    currentMetaDescription: page.metaDescription,
    suggestedMetaTitle: ctrCandidate?.suggestedTitle ?? null,
    suggestedMetaDescription: ctrCandidate?.suggestedMeta ?? null,
  };
}

function resolvePageContext(
  classification: GrowthPageClassification,
): GrowthAssetPageContext {
  if (classification.pageType === "landing-page") {
    return buildLandingPageContext(classification);
  }

  if (classification.pageType === "topic-hub") {
    return buildTopicHubContext(classification);
  }

  throw new Error(
    "Homepage asset generation is not supported — pick a topic hub or landing page.",
  );
}

function buildRedditAsset(context: GrowthAssetPageContext): RedditPostAsset {
  const { aiCitation, geo, title, url } = context;

  return {
    title: `Free browser ${geo.primaryEntity.toLowerCase()} for ${geo.audience} — no app needed`,
    body: [
      `We built FriendRank for groups who want quick ${context.primaryKeyword} without downloads or signup.`,
      aiCitation.keyTakeaways.join(". ") + ".",
      aiCitation.canonicalAnswer.split(".").slice(0, 2).join(".") + ".",
      "Works on phones — share one link, vote anonymously, reveal group results together.",
    ].join("\n\n"),
    suggestedSubredditCategory: resolveSubredditCategory(
      context.classification.categoryGroup,
      context.classification.pageType,
    ),
    softCta: `If you want to try it: ${url} (free, browser-based)`,
  };
}

function buildLinkedInAsset(context: GrowthAssetPageContext): LinkedInPostAsset {
  const { aiCitation, geo, title, url } = context;

  return {
    shortVersion: [
      `Looking for a fast ${title.toLowerCase()} activity for ${geo.audience}?`,
      `FriendRank runs in the browser — anonymous phone voting, shareable results, no signup.`,
      aiCitation.citationSummary,
    ].join(" "),
    longVersion: [
      `Groups keep asking for simple ways to run ${context.primaryKeyword} without apps, accounts, or awkward setup.`,
      aiCitation.canonicalAnswer,
      `Why teams and friend groups use it: ${aiCitation.keyTakeaways.join("; ")}.`,
      geo.summary,
    ].join("\n\n"),
    cta: `Browse ${title} and create a free game: ${url}`,
  };
}

function buildPinterestAsset(context: GrowthAssetPageContext): PinterestAsset {
  const { geo, title, primaryKeyword } = context;

  return {
    title: `${title} — Free Online ${primaryKeyword} for Groups`,
    description: [
      geo.summary,
      `Perfect for ${geo.audience}.`,
      "No signup, phone-friendly, share one link.",
      aiCitationTakeawayLine(context),
    ].join(" "),
    suggestedImageConcept: `Vertical pin: phone screens showing anonymous votes + "${title}" headline, bright party/social palette, text overlay "Free • No app • ${geo.audience}"`,
  };
}

function aiCitationTakeawayLine(context: GrowthAssetPageContext): string {
  return context.aiCitation.keyTakeaways.join(" • ");
}

function buildAiDirectoryAsset(context: GrowthAssetPageContext): AiDirectoryAsset {
  const { aiCitation, geo, title } = context;

  const oneSentence = aiCitation.citationSummary;
  const threeSentence = [
    aiCitation.citationSummary,
    aiCitation.canonicalAnswer.split(".").slice(0, 1).join(".") + ".",
    `Built for ${geo.audience} with anonymous phone voting and shareable group results.`,
  ].join(" ");

  const oneHundredFiftyWords = fitWords(
    [
      aiCitation.canonicalAnswer,
      geo.summary,
      `Key benefits: ${aiCitation.keyTakeaways.join(", ")}.`,
      `Evidence: ${aiCitation.evidence.playStyle}, ${aiCitation.evidence.typicalDuration}, ${aiCitation.evidence.mobileFriendly}.`,
      `${title} on FriendRank helps ${geo.audience} ${geo.userIntent} ${context.primaryKeyword} with no signup required.`,
    ].join(" "),
    150,
  );

  return {
    oneSentence,
    threeSentence,
    oneHundredFiftyWords,
  };
}

function buildBacklinkOutreachAsset(
  context: GrowthAssetPageContext,
): BacklinkOutreachAsset {
  const { aiCitation, geo, title, url } = context;
  const blogCategory = resolveOutreachBlogCategory(context.classification.categoryGroup);

  return {
    subject: `Free ${title.toLowerCase()} resource for your ${blogCategory} readers`,
    body: [
      "Hi there,",
      "",
      `I came across your ${blogCategory} and thought your readers might like a free browser tool for ${context.primaryKeyword}.`,
      "",
      aiCitation.citationSummary,
      "",
      `FriendRank lets ${geo.audience} create a game in under a minute, share one link, and collect anonymous phone votes — no app download.`,
      "",
      `Happy to suggest a specific game format if useful. The live page is here: ${url}`,
      "",
      "Thanks for considering it,",
      "FriendRank team",
    ].join("\n"),
    cta: `Would a link to ${title} fit an upcoming roundup on your site?`,
  };
}

function buildProductSharingAsset(context: GrowthAssetPageContext): ProductSharingAsset {
  const { aiCitation, title, url } = context;

  return {
    whatsapp: `Found a free ${title.toLowerCase()} — everyone votes on their phone, results reveal together 🎉 ${url}`,
    discord: `**${title}** — browser game, no signup. Share one link, anonymous votes, funny group results → ${url}`,
    slack: `Quick team activity idea: ${title} on FriendRank (${aiCitation.keyTakeaways[0]?.toLowerCase()}, ${aiCitation.keyTakeaways[1]?.toLowerCase()}). Free browser link: ${url}`,
  };
}

function buildSeoSnippetAsset(context: GrowthAssetPageContext): SeoSnippetAsset {
  return {
    title: context.suggestedMetaTitle ?? context.currentMetaTitle,
    metaDescription:
      context.suggestedMetaDescription ?? context.currentMetaDescription,
  };
}

function buildPromotionChecklist(
  context: GrowthAssetPageContext,
): PromotionChecklistItem[] {
  const subreddit = resolveSubredditCategory(
    context.classification.categoryGroup,
    context.classification.pageType,
  );

  return [
    {
      channel: "Reddit",
      whereToPublish: subreddit,
      estimatedEffort: "medium",
      expectedImpact: "medium",
    },
    {
      channel: "LinkedIn",
      whereToPublish: "Personal or company feed — team-building angle for workplace pages",
      estimatedEffort: "low",
      expectedImpact: context.classification.categoryGroup === "team" ? "medium" : "low",
    },
    {
      channel: "Pinterest",
      whereToPublish: "Party planning or activity board with vertical pin",
      estimatedEffort: "medium",
      expectedImpact: "medium",
    },
    {
      channel: "AI directory",
      whereToPublish: "AI tool or browser game directory submission form",
      estimatedEffort: "low",
      expectedImpact: "low",
    },
    {
      channel: "Backlink outreach",
      whereToPublish: resolveOutreachBlogCategory(context.classification.categoryGroup),
      estimatedEffort: "high",
      expectedImpact: "medium",
    },
    {
      channel: "Product sharing",
      whereToPublish: "WhatsApp group chat, Discord server, or Slack channel",
      estimatedEffort: "low",
      expectedImpact: "high",
    },
    {
      channel: "SEO snippet",
      whereToPublish: "Search Console — adopt only after impression data confirms need",
      estimatedEffort: "medium",
      expectedImpact: "high",
    },
  ];
}

function resolvePublicationOrder(): string[] {
  return [
    "Product sharing (WhatsApp / Discord / Slack) — lowest effort, immediate loop",
    "Reddit / community — authentic thread with soft CTA",
    "Pinterest pin — visual discovery for occasion keywords",
    "AI directory submission — one-sentence + 150-word descriptions",
    "LinkedIn post — short version first, long version if engagement is strong",
    "Backlink outreach email — one targeted blog per week",
    "SEO snippet candidate — only after Search Console shows impressions",
  ];
}

function resolveExpectedEffort(
  checklist: PromotionChecklistItem[],
): GrowthAssetsReport["expectedEffort"] {
  const highCount = checklist.filter((item) => item.estimatedEffort === "high").length;
  const lowCount = checklist.filter((item) => item.estimatedEffort === "low").length;

  if (highCount >= 2) {
    return "high";
  }
  if (lowCount >= 4) {
    return "low";
  }
  return "medium";
}

function resolveExpectedReach(
  classification: GrowthPageClassification,
): GrowthAssetsReport["expectedReach"] {
  if (classification.growthTier === "P0" || classification.growthTier === "P1") {
    return "high";
  }
  if (classification.growthTier === "P2") {
    return "medium";
  }
  return "low";
}

/** Builds promotional asset bundle for the highest-priority page. */
export function buildGrowthAssetsReport(
  classification?: GrowthPageClassification,
): GrowthAssetsReport {
  const target = classification ?? pickHighestPriorityPageForAssets();
  const assistantReport = buildGrowthAssistantReport();
  const selectionReason =
    assistantReport.contentRecommendations.find(
      (entry) => entry.label === "Best topic hub",
    )?.reason ??
    "Highest traffic-potential topic hub from growth priority classification.";

  const context = resolvePageContext(target);

  const assets: GrowthPageAssetBundle = {
    reddit: buildRedditAsset(context),
    linkedIn: buildLinkedInAsset(context),
    pinterest: buildPinterestAsset(context),
    aiDirectory: buildAiDirectoryAsset(context),
    backlinkOutreach: buildBacklinkOutreachAsset(context),
    productSharing: buildProductSharingAsset(context),
    seoSnippet: buildSeoSnippetAsset(context),
    promotionChecklist: buildPromotionChecklist(context),
  };

  const assetReadiness = validateGrowthAssetsBundle(assets).valid
    ? "Ready"
    : "Incomplete";

  return {
    assetReadiness,
    bestPage: {
      path: target.path,
      url: target.url,
      title: context.title,
      pageType: target.pageType,
      growthTier: target.growthTier,
      categoryGroup: target.categoryGroup,
      selectionReason,
    },
    assets,
    recommendedPublicationOrder: resolvePublicationOrder(),
    expectedEffort: resolveExpectedEffort(assets.promotionChecklist),
    expectedReach: resolveExpectedReach(target),
  };
}

function validateGrowthAssetsBundle(assets: GrowthPageAssetBundle): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (!assets.reddit.title.trim() || !assets.reddit.body.trim()) {
    issues.push("Reddit asset is incomplete.");
  }
  if (!assets.linkedIn.shortVersion.trim() || !assets.linkedIn.longVersion.trim()) {
    issues.push("LinkedIn asset is incomplete.");
  }
  if (!assets.pinterest.title.trim() || !assets.pinterest.description.trim()) {
    issues.push("Pinterest asset is incomplete.");
  }
  if (
    !assets.aiDirectory.oneSentence.trim() ||
    !assets.aiDirectory.threeSentence.trim() ||
    countWords(assets.aiDirectory.oneHundredFiftyWords) < 50
  ) {
    issues.push("AI directory asset is incomplete.");
  }
  if (!assets.backlinkOutreach.subject.trim() || !assets.backlinkOutreach.body.trim()) {
    issues.push("Backlink outreach asset is incomplete.");
  }
  if (
    !assets.productSharing.whatsapp.trim() ||
    !assets.productSharing.discord.trim() ||
    !assets.productSharing.slack.trim()
  ) {
    issues.push("Product sharing asset is incomplete.");
  }
  if (!assets.seoSnippet.title.trim() || !assets.seoSnippet.metaDescription.trim()) {
    issues.push("SEO snippet asset is incomplete.");
  }
  if (assets.promotionChecklist.length < 5) {
    issues.push("Promotion checklist is incomplete.");
  }

  return { valid: issues.length === 0, issues };
}

/** Validates the growth assets report. */
export function validateGrowthAssetsReport(
  report?: GrowthAssetsReport,
): { valid: boolean; issues: string[] } {
  const data = report ?? buildGrowthAssetsReport();
  const bundleValidation = validateGrowthAssetsBundle(data.assets);
  const issues = [...bundleValidation.issues];

  if (!data.bestPage.path.startsWith("/")) {
    issues.push("Best page path is invalid.");
  }

  if (data.recommendedPublicationOrder.length < 5) {
    issues.push("Publication order is incomplete.");
  }

  return { valid: issues.length === 0, issues };
}

function formatSection(title: string, lines: string[]): string[] {
  return ["", title, ...lines.map((line) => (line ? line : ""))];
}

/** Formats growth assets report for CLI output. */
export function formatGrowthAssetsReport(report?: GrowthAssetsReport): string {
  const data = report ?? buildGrowthAssetsReport();
  const validation = validateGrowthAssetsReport(data);

  const lines: string[] = [
    "FriendRank Growth Asset Generator",
    `Status: ${validation.valid ? "PASS" : "FAIL"}`,
    "",
    `Overall asset readiness: ${data.assetReadiness}`,
    "",
    "Best page:",
    `- path: ${data.bestPage.path}`,
    `- url: ${data.bestPage.url}`,
    `- title: ${data.bestPage.title}`,
    `- type: ${data.bestPage.pageType} (${data.bestPage.growthTier})`,
    `- reason: ${data.bestPage.selectionReason}`,
    "",
    "Assets generated:",
    "✓ Reddit",
    "✓ LinkedIn",
    "✓ Pinterest",
    "✓ AI Directory",
    "✓ Outreach Email",
    "✓ Product Sharing",
    "✓ SEO Snippet",
    "",
    "Recommended publication order",
  ];

  for (const [index, step] of data.recommendedPublicationOrder.entries()) {
    lines.push(`${index + 1}. ${step}`);
  }

  lines.push(
    "",
    `Expected effort: ${data.expectedEffort}`,
    `Expected reach: ${data.expectedReach}`,
  );

  lines.push(
    ...formatSection("1. Reddit post", [
      `Title: ${data.assets.reddit.title}`,
      `Subreddit category: ${data.assets.reddit.suggestedSubredditCategory}`,
      `Soft CTA: ${data.assets.reddit.softCta}`,
      "Body:",
      data.assets.reddit.body,
    ]),
    ...formatSection("2. LinkedIn post", [
      "Short version:",
      data.assets.linkedIn.shortVersion,
      "",
      "Long version:",
      data.assets.linkedIn.longVersion,
      "",
      `CTA: ${data.assets.linkedIn.cta}`,
    ]),
    ...formatSection("3. Pinterest", [
      `Title: ${data.assets.pinterest.title}`,
      `Description: ${data.assets.pinterest.description}`,
      `Image concept: ${data.assets.pinterest.suggestedImageConcept}`,
    ]),
    ...formatSection("4. AI directory description", [
      `1 sentence: ${data.assets.aiDirectory.oneSentence}`,
      "",
      `3 sentences: ${data.assets.aiDirectory.threeSentence}`,
      "",
      `150 words (${countWords(data.assets.aiDirectory.oneHundredFiftyWords)} words):`,
      data.assets.aiDirectory.oneHundredFiftyWords,
    ]),
    ...formatSection("5. Backlink outreach email", [
      `Subject: ${data.assets.backlinkOutreach.subject}`,
      "Body:",
      data.assets.backlinkOutreach.body,
      "",
      `CTA: ${data.assets.backlinkOutreach.cta}`,
    ]),
    ...formatSection("6. Product sharing messages", [
      `WhatsApp: ${data.assets.productSharing.whatsapp}`,
      `Discord: ${data.assets.productSharing.discord}`,
      `Slack: ${data.assets.productSharing.slack}`,
    ]),
    ...formatSection("7. SEO snippet candidate", [
      `Title: ${data.assets.seoSnippet.title}`,
      `Meta description: ${data.assets.seoSnippet.metaDescription}`,
    ]),
    ...formatSection("8. Promotion checklist", []),
  );

  for (const item of data.assets.promotionChecklist) {
    lines.push(
      `- ${item.channel}: ${item.whereToPublish} | effort ${item.estimatedEffort} | impact ${item.expectedImpact}`,
    );
  }

  if (validation.issues.length > 0) {
    lines.push("", "Validation issues");
    for (const issue of validation.issues) {
      lines.push(`- ${issue}`);
    }
  }

  return lines.join("\n").trimEnd();
}

export { countWords };
