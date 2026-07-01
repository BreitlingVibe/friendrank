# FriendRank Entity Knowledge Graph

The entity layer lives under `lib/entities/` and powers chips, explorer navigation, authority panels, recommendations, and JSON-LD across landing pages and topic hubs.

## Architecture

| Module | Role |
| --- | --- |
| `entity-registry.ts` | Single source of truth for entities and mapping rules |
| `entity-utils.ts` | Registry accessors and landing page entity resolution |
| `entity-graph.ts` | Relationship traversal and `buildEntitySummary()` |
| `entity-targets.ts` | Safe href resolution against live routes |
| `entity-navigation.ts` | Explorer groups and navigation chips |
| `entity-authority.ts` | Authority panels, summaries, relationship microcopy |
| `validation/` | Development-time audit helpers |

Landing pages consume entity data through `assembleLandingPage()` in `lib/landing-pages/landing-page-data.ts`. Topic hubs resolve entity navigation at render time from live hub member pages.

## Entity registry rules

Every entity must define:

- `id` and `slug` (unique across the registry)
- `name` and `description`
- `entityType` from the supported type list

Optional relationship fields:

- `relatedEntities` must reference existing entity ids
- `relatedTopicHubs` must reference existing topic hub ids or slugs
- `relatedLandingPages` must reference intent registry slugs
- `aliases` must not conflict with another entity slug

Add entities to `ENTITY_REGISTRY` only. Do not hardcode entity relationships on individual pages.

When adding mapping rules, prefer declarative maps in the registry file:

- `INTENT_CATEGORY_ENTITY_MAP`
- `CLUSTER_FORMAT_ENTITY_MAP`
- `HUB_ENTITY_BOOSTS`
- `ENTITY_SIGNAL_PATTERNS`

## Entity chip linking rules

Chip hrefs are resolved by `resolveEntityNavigationTarget()` in `entity-targets.ts`.

Rules:

1. Broad topic entities prefer topic hub routes.
2. Formats, occasions, and specific audiences prefer live landing page routes.
3. Only live landing pages and topic hub slugs may be linked.
4. Planned intents are never linked as active URLs.
5. If no valid target exists, the chip renders as non-clickable text.

Never link to `/entities/*`. Entity pages are not public routes.

## Schema safety rules

Structured data is built in:

- `lib/landing-pages/landing-page-schema.ts`
- `lib/topic-hubs/hub-schema.ts`

Rules:

1. Every node in a `@graph` must have a unique `@id`.
2. `WebPage.about` may reference `#webapp`, primary entity nodes, or known site-level ids.
3. `WebPage.mentions` must reference entity nodes present in the same graph.
4. `DefinedTerm` and `Thing` nodes must include both `name` and `description`.
5. `FAQPage` questions must include non-empty `name` and answer text.
6. `ItemList` URLs must use absolute production URLs for clickable entries.
7. Do not add experimental or invalid schema types.

Use `buildEntitySummary()` for entity descriptions in JSON-LD when possible.

## How to add a future entity

1. Add the entity object to `ENTITY_REGISTRY`.
2. Link it through registry maps (`INTENT_CATEGORY_ENTITY_MAP`, `CLUSTER_FORMAT_ENTITY_MAP`, etc.) instead of page-level code.
3. Set `relatedTopicHubs` and/or `relatedLandingPages` to existing live routes.
4. Run the audit:

```bash
npm run audit:entities
```

5. Fix any registry, resolver, or schema issues reported by the audit.

No landing page edits are required when the resolver maps are updated correctly.

## How to avoid broken links

- Reference only live intent slugs in `relatedLandingPages`.
- Reference only existing hub ids/slugs in `relatedTopicHubs`.
- Run `npm run audit:entities` before merging SEO changes.
- Do not create manual related-page arrays on landing pages.
- Let `assembleLandingPage()` and the recommendation engine derive links from registry data.

## Development audit

Run audits locally before pushing SEO, entity, or routing changes.

### Commands

| Command | Scope |
| --- | --- |
| `npm run audit:entities` | Entity registry, landing/hub entities, internal links, JSON-LD |
| `npm run audit:all` | Full pipeline: entity audit + route integrity + sitemap + recommendations |

Recommended pre-push sequence:

```bash
npm run audit:all
npm run build
```

### What `audit:all` checks

**Entity audit** (same as `audit:entities`):

- entity registry integrity (ids, slugs, relationships)
- landing page entity resolution and explorer output
- topic hub entity navigation
- internal link safety in recommendation sections
- JSON-LD graph validity

**Route integrity** (`lib/seo/validation/route-validation.ts`):

- every `LANDING_PAGES` slug has `app/[slug]/page.tsx`
- every topic hub slug has a matching route
- route wrappers import landing page data and render `IntentLandingPage` or `createTopicHubRoute()`
- no orphan routes outside landing pages and topic hubs
- no planned intents exposed as live routes
- no duplicate route directories

**Sitemap integrity** (`lib/seo/validation/sitemap-validation.ts`):

- home, all live landing pages, and all topic hubs are listed
- no duplicate sitemap URLs
- canonical URLs use the production app URL prefix
- no planned intents in the sitemap

**Recommendations and links** (`lib/seo/validation/recommendation-validation.ts`):

- no recommendation section links to the current page
- no duplicate recommendation links in the same section
- no links to planned or missing routes
- entity chips resolve to valid navigation targets when clickable

Validation runs at development/build time only via `scripts/audit-all.ts`. It is not imported by public page rendering code.

Programmatic usage:

```ts
import { runFullAudit, formatFullAuditReport } from "@/lib/audit/run-full-audit";

const report = runFullAudit();
console.log(formatFullAuditReport(report));
```

Entity-only audit:

```ts
import { runEntityAudit, formatEntityAuditReport } from "@/lib/entities/validation/run-entity-audit";

const report = runEntityAudit();
console.log(formatEntityAuditReport(report));
```

## Common audit failures

| Failure | Fix |
| --- | --- |
| `registry.invalid_landing_page_ref` | Point `relatedLandingPages` at a live intent slug from the intent registry |
| `registry.invalid_hub_ref` | Use an existing topic hub id/slug in `relatedTopicHubs` |
| `routes.missing_landing_route` | Add `app/[slug]/page.tsx` using the standard landing page wrapper |
| `routes.planned_page_exposed` | Remove the route or promote the intent to live in the intent registry |
| `routes.orphan_route` | Delete the stray route or register the page in `LANDING_PAGES` / topic hubs |
| `sitemap.missing_landing_page` | Ensure `app/sitemap.ts` includes all `LANDING_PAGES` canonical URLs |
| `sitemap.planned_page_listed` | Remove planned slugs from `LANDING_PAGES` assembly |
| `links.self_recommendation` | Remove the current slug from related / you-may-also-like sections |
| `links.invalid_active_recommendation` | Link only to live landing pages or topic hubs |
| `landing.broken_chip_href` | Fix entity `relatedLandingPages` / `relatedTopicHubs` or hub routing in `entity-targets.ts` |
| `schema.duplicate_id` | Ensure unique `@id` values in landing page or hub JSON-LD graphs |

## Deployment checklist

Before deploying SEO or content graph changes:

1. Run `npm run audit:all` and fix all errors.
2. Run `npm run build` and confirm route count is unchanged.
3. Spot-check one landing page and one topic hub in preview (entity chips, recommendations, JSON-LD in page source).
4. Confirm no new public routes were added unless intentionally shipped.
5. Deploy.

After deploy:

1. Verify `/sitemap.xml` includes expected landing pages and topic hubs.
2. Submit updated sitemap in Search Console if URLs changed materially.

