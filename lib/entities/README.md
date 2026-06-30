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

Run the full entity, route, link, and schema audit locally:

```bash
npm run audit:entities
```

The audit checks:

- entity registry integrity
- landing page entity resolution
- topic hub entity navigation
- internal link safety
- JSON-LD graph validity

Validation helpers are development-only. They are not imported by production page rendering code.

Programmatic usage:

```ts
import { runEntityAudit, formatEntityAuditReport } from "@/lib/entities/validation/run-entity-audit";

const report = runEntityAudit();
console.log(formatEntityAuditReport(report));
```
