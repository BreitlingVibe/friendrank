# FriendRank Landing Page Planning

Internal planning layer for programmatic SEO. This folder defines **what** landing pages exist or are planned, how they are prioritized, and how they group into topical clusters. It does not render public pages.

## How the systems work together

```
Intent Registry     →  roadmap (what pages exist / are planned)
Keyword Clusters    →  topical authority (how pages group for SEO)
Content Libraries   →  reusable copy (FAQ, questions, benefits, CTAs)
Landing Engine      →  rendering (metadata, schema, UI, sitemap)
```

| Layer | Location | Role |
|-------|----------|------|
| **Intent Registry** | `intent-registry.ts` | Master backlog of every landing page slug with status, priority, and audience |
| **Keyword Clusters** | `keyword-clusters.ts` | Topical groupings for internal linking and future topic hubs |
| **Content Libraries** | `../content/` | Shared FAQ, questions, benefits, CTAs, and intent copy |
| **Landing Engine** | `../landing-page-data.ts`, `../../components/landing-pages/` | Assembles and renders live pages |

**Typical workflow**

1. Add a slug to `INTENT_REGISTRY` with `status: "planned"`.
2. Assign it to a cluster in `keyword-clusters.ts` via `memberSlugs`.
3. When ready to ship, add content libraries and wire `assembleLandingPage()`.
4. Mark the registry entry `status: "live"`.

Future sprints can use cluster data to auto-generate related links, breadcrumbs, topic hubs, cluster analytics, and internal linking without duplicating slug lists.

## Files

| File | Purpose |
|------|---------|
| `intent-registry.ts` | Master list of all intents (live + planned) |
| `intent-categories.ts` | Shared category labels |
| `intent-priority.ts` | Static priority tier helpers |
| `keyword-clusters.ts` | Topical SEO cluster definitions |
| `cluster-utils.ts` | Cluster comparison and filtering helpers |

## Adding a new landing page

### 1. Plan the intent

Add an entry to `INTENT_REGISTRY` in `intent-registry.ts`:

```typescript
{
  slug: "icebreaker-game",
  title: "Icebreaker Game",
  intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
  searchIntent: "Short description of the search query goal.",
  audience: "Who this page is for.",
  estimatedPriority: 72,
  status: "planned",
}
```

Use a unique `slug` (kebab-case, matches future route path).

Pick a category from `intent-categories.ts`.

Set `estimatedPriority` as a static score from 0–100. Use `getPriorityTier()` in `intent-priority.ts` to interpret it.

### 2. Assign a keyword cluster

Add the slug to `memberSlugs` in the appropriate cluster in `keyword-clusters.ts`:

```typescript
memberSlugs: [
  "icebreaker-game",
  "office-icebreaker",
  // ...
],
```

A slug may appear in more than one cluster when it serves multiple topical angles (for example `party-voting-game` in both Social Voting and Party). `getClusterBySlug()` returns the first matching cluster by definition order. Use `getClustersBySlug()` or `getAllRelatedSlugs()` when you need the full picture.

### 3. Build content (when ready to ship)

When an intent moves from planning to implementation:

1. Add copy to `lib/landing-pages/content/` (FAQ, questions, audience, intent blocks).
2. Wire the page in `landing-page-data.ts` via `assembleLandingPage()`.
3. Create `app/{slug}/page.tsx` using the existing thin route pattern.
4. Add a CTA location to `lib/analytics.ts` if needed.

The page is automatically included in the sitemap through `LANDING_PAGES`.

### 4. Mark the intent live

Update the registry entry:

```typescript
status: "live",
```

Keep `estimatedPriority` as-is unless opportunity changes during planning reviews.

Optionally verify the slug matches:

- A route in `app/{slug}/`
- An entry in `LANDING_PAGES`
- A `memberSlugs` entry in at least one keyword cluster

## Status lifecycle

```
planned → live
```

| Status | Meaning |
|--------|---------|
| `planned` | Intent is documented for future SEO. No public route yet. |
| `live` | Page is shipped: route, content, metadata, and sitemap entry exist. |

There is no `archived` status yet. Remove or comment entries only if an intent is permanently dropped.

## Priority interpretation

`estimatedPriority` is a **static planning score**, not analytics data.

| Score | Tier (`getPriorityTier`) | Typical use |
|-------|--------------------------|-------------|
| 70–100 | High | Ship first, strong search intent, broad audience |
| 40–69 | Medium | Good opportunity, schedule after high-tier intents |
| 0–39 | Low | Long-tail or experimental, ship when capacity allows |

Helpers in `intent-priority.ts`:

- `getPriorityTier(score)` — returns `"High"`, `"Medium"`, or `"Low"`
- `sortByPriority(entries)` — sort registry by score descending
- `filterByPriorityTier(entries, tier)` — filter by tier

Priorities are planning opinions. Re-score entries during quarterly SEO reviews.

## Keyword clusters

Clusters group slugs under a **primary keyword** for topical authority planning.

| Cluster | Primary keyword | Example members |
|---------|-----------------|-----------------|
| Friendship | friend quiz | best-friend-quiz, who-knows-me-best |
| Social Voting | anonymous voting game | anonymous-voting-game, group-voting-game |
| Most Likely | most likely to generator | most-likely-to-generator |
| Party | party games | birthday-party-game, sleepover-game |
| Icebreakers | icebreaker game | icebreaker-game, team-building-game |
| Relationships | relationship quiz | couple-quiz, relationship-quiz |
| Entertainment | group games | social-game, would-you-rather-friends |

### Cluster helpers

```typescript
getClusters()
getCluster("party")
getClusterBySlug("party-voting-game")
getClusterMembers("best-friend-quiz")
getPrimaryKeyword("most-likely-to-generator")
getSupportingKeywords("group-voting-game")
getRelatedSlugs("friendship-test")
getAllRelatedSlugs("party-voting-game") // spans multiple clusters
```

### Cluster utils

```typescript
isSameCluster("best-friend-quiz", "who-knows-me-best") // true
sortByCluster(slugs, "friendship")
filterClusterMembers(slugs, "party")
groupSlugsByCluster(slugs)
```

Clusters are **not wired to the UI yet**. They exist so future sprints can drive related links, breadcrumbs, topic hubs, and internal linking from one source of truth.

## Registry helpers

```typescript
getIntentBySlug("party-voting-game")
getLiveIntents()
getPlannedIntents()
getIntentsByCategory(INTENT_CATEGORIES.PARTY)
```

## What this folder does not do

- No UI rendering
- No routing
- No metadata or JSON-LD generation
- No sitemap or analytics wiring
- No changes to live related-pages components

Those remain in the Landing Page Engine. This folder is the **backlog, taxonomy, and topical map** for current and future pages.
