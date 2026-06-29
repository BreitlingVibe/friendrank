# FriendRank Topic Hub Engine

Internal planning and assembly layer for **category hub pages**. Hubs group live and planned landing pages into topical authority pages for SEO (for example `/topics/friend-games` in a future sprint).

This folder does **not** render UI, routes, metadata, or sitemap entries yet. It only resolves hub data from existing planning sources.

## How the systems work together

```
Intent Registry     →  roadmap (live + planned slugs, priority, audience)
Keyword Clusters    →  topical membership (which slugs belong to which cluster)
Topic Hub Registry  →  hub metadata + clusterIds (which clusters form each hub)
Topic Hub Engine    →  discovers members, stats, and resolved hub objects
Landing Page Engine →  renders individual landing pages (unchanged by this layer)
```

| Layer | Location | Role |
|-------|----------|------|
| **Intent Registry** | `lib/landing-pages/planning/intent-registry.ts` | Source of truth for slug status, title, priority |
| **Keyword Clusters** | `lib/landing-pages/planning/keyword-clusters.ts` | Defines cluster membership via `memberSlugs` |
| **Topic Hub Registry** | `hub-registry.ts` | Hub copy, slug, and `clusterIds` (no hardcoded page lists) |
| **Topic Hub Engine** | `hub-engine.ts` | Resolves live/planned pages and statistics |
| **Landing Page Engine** | `lib/landing-pages/` | Assembles and ships individual `/slug` pages |

## Data flow

1. A hub definition lists one or more `clusterIds`.
2. The engine unions every `memberSlug` from those clusters.
3. Each slug is looked up in `INTENT_REGISTRY`.
4. Pages split into **live** (`landingPages`) and **planned** (`plannedPages`).
5. `featuredLandingPages` only affects sort order (pinned first), not membership.

Landing page definitions are **never duplicated** in the hub layer.

## Files

| File | Purpose |
|------|---------|
| `hub-types.ts` | TypeScript types for definitions, page refs, stats, resolved hubs |
| `hub-registry.ts` | Static hub definitions (`TOPIC_HUBS`) |
| `hub-utils.ts` | Slug discovery, partitioning, sorting, statistics |
| `hub-engine.ts` | Public resolver API |
| `index.ts` | Barrel exports |

## Public API

```typescript
import {
  getHub,
  getAllHubs,
  getHubLandingPages,
  getHubPlannedPages,
  getHubStats,
} from "@/lib/topic-hubs";
```

| Function | Returns |
|----------|---------|
| `getHub(id)` | Full resolved hub: metadata, live pages, planned pages, statistics |
| `getAllHubs()` | All resolved hubs |
| `getHubLandingPages(id)` | Live member pages only |
| `getHubPlannedPages(id)` | Planned member pages only |
| `getHubStats(id)` | Counts, highest priority page, average priority |

## Statistics

`getHubStats()` / `TopicHub.statistics` includes:

- `liveCount` — pages with `status: "live"`
- `plannedCount` — pages with `status: "planned"`
- `totalCount` — live + planned
- `highestPriorityPage` — highest `estimatedPriority` in the hub
- `averagePriority` — mean priority across all hub members (one decimal)

## Current hubs

| Hub id | Slug | Clusters |
|--------|------|----------|
| friend-games | friend-games | friendship, social-voting, most-likely |
| party-games | party-games | party |
| team-building-games | team-building-games | teams |
| relationship-games | relationship-games | relationships |
| icebreaker-games | icebreaker-games | icebreakers |

## Adding a new hub

1. Ensure member slugs exist in `INTENT_REGISTRY` and relevant `keyword-clusters.ts` `memberSlugs`.
2. Add a `TopicHubDefinition` to `TOPIC_HUBS` in `hub-registry.ts` with `clusterIds` (not a full slug list).
3. Optionally set `featuredLandingPages` for pinned ordering.
4. Use `getHub("your-hub-id")` to verify live/planned counts and stats.

No landing page, route, or sitemap changes are required until a future sprint wires hub UI.

## Relationship to internal linking

Both **Topic Hubs** and **Related Games** derive membership from the same Intent Registry and Keyword Clusters. Hubs are category-level indexes; internal links are page-level cross-links. Keep cluster membership in sync so hubs and related sections stay consistent.
