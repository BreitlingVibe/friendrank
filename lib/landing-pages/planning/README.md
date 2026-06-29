# FriendRank Landing Page Planning

Internal planning layer for programmatic SEO. This folder defines **what** landing pages exist or are planned. It does not render public pages.

Live pages are implemented in:

- `lib/landing-pages/content/` — reusable copy libraries
- `lib/landing-pages/landing-page-data.ts` — page assembly
- `app/{slug}/page.tsx` — thin routes

## Files

| File | Purpose |
|------|---------|
| `intent-registry.ts` | Master list of all intents (live + planned) |
| `intent-categories.ts` | Shared category labels |
| `intent-priority.ts` | Static priority tier helpers |

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

### 2. Build content (when ready to ship)

When an intent moves from planning to implementation:

1. Add copy to `lib/landing-pages/content/` (FAQ, questions, audience, intent blocks).
2. Wire the page in `landing-page-data.ts` via `assembleLandingPage()`.
3. Create `app/{slug}/page.tsx` using the existing thin route pattern.
4. Add a CTA location to `lib/analytics.ts` if needed.

The page is automatically included in the sitemap through `LANDING_PAGES`.

### 3. Mark the intent live

Update the registry entry:

```typescript
status: "live",
```

Keep `estimatedPriority` as-is unless opportunity changes during planning reviews.

Optionally verify the slug matches:

- A route in `app/{slug}/`
- An entry in `LANDING_PAGES`

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

Those remain in the Landing Page Engine. This folder is the **backlog and taxonomy** for future pages.
