# Content Opportunity Engine

**Version:** 1.0  
**Status:** Internal planning tool  
**Command:** `npm run opportunities`  
**Audience:** Founders, engineers, content operators

This engine analyzes FriendRank's **existing content architecture only**. It does not modify production pages, routes, metadata, registries, or experiments. It does not use search volumes or external traffic data.

---

## Purpose

Answer one question: **where should the next content investment go?**

The engine reads:

- Intent registry (`lib/landing-pages/planning/intent-registry.ts`)
- Keyword clusters (`lib/landing-pages/planning/keyword-clusters.ts`)
- Evergreen hub registry (`lib/evergreen-hubs/registry.ts`)
- Category hub registry (`lib/discovery/category-registry.ts`)
- Discovery graph utilities (`lib/discovery/discovery-utils.ts`)

It produces a **scorecard per topic cluster** and a **ranked roadmap** from highest to lowest opportunity.

---

## Topic model

Topics map 1:1 to **keyword clusters** (Friendship, Party, Teams, etc.) with user-friendly display names (e.g. "Party Games", "Team Building Games").

Each topic includes:

| Field | Source |
|-------|--------|
| Parent pillar | Cluster → pillar mapping in `topic-definitions.ts` |
| Landing pages | Intent registry slugs listed in cluster `memberSlugs` |
| Evergreen hubs | Pillar slug + supplemental hubs + cluster member hub slugs |
| Category hubs | `getCategoriesByPillar()` + category slugs in cluster membership |

The **Audience** cluster is cross-cutting (no single parent pillar).

---

## Scoring philosophy

All scores are **0–100** and derived from FriendRank's own registries. Targets come from the Content Authority Blueprint layer expectations (landing depth, category hub count) — not from Search Console or keyword volume.

### Dimension scores

| Score | What it measures | How it is calculated |
|-------|------------------|----------------------|
| **Landing coverage** | Live landing page depth for the cluster | `live landing pages ÷ blueprint target` (capped at 100) |
| **Evergreen coverage** | Pillar / hub presence | Primary pillar live + supplemental hub count vs expected |
| **Category coverage** | Mid-layer hub depth | `live category hubs ÷ blueprint target` |
| **Linking completeness** | Discovery graph connectivity | % of live landing pages linked to a live category hub via `findCategoriesForEvergreenPage()`, plus bonus for category hubs whose registry evergreen slugs are all live |
| **Authority completeness** | Pyramid stack maturity | Pillar live (+40), any evergreen hub (+20), live category hub (+20), landing target met (+20) |

### Composite scores

| Score | Formula | Use |
|-------|---------|-----|
| **Authority score** | 25% landing + 20% evergreen + 25% category + 20% linking + 10% authority completeness | Overall topical authority readiness |
| **Content completeness** | 35% landing + 15% evergreen + 25% category + 25% linking | How complete the content pyramid is today |
| **Opportunity score** | `(100 − content completeness) × 0.7 + missing-asset weight` | **Ranking metric** — higher means more architectural gap |

Higher **opportunity score** = more reason to invest next. This is the inverse of completeness, weighted by detected missing assets.

---

## Missing assets detection

The engine flags structural gaps such as:

- Primary pillar not live in evergreen hub layer
- Live category hubs below blueprint target
- Planned or seed category registry entries without live routes
- Live landing pages below cluster target
- Planned landing pages in registry backlog
- Live landing pages without a live category hub parent in the discovery graph
- Pillar `categoryCards` marked `comingSoon`

No search volume or CTR data is used.

---

## Recommendations

Each topic receives one recommendation:

| Recommendation | When |
|----------------|------|
| **Build Evergreen Hub** | Primary pillar page missing from live evergreen layer |
| **Build Category Hub** | Sufficient landing depth (≥5 live or ≥60% of target) but category mid-layer gap |
| **Expand Landing Pages** | Registry backlog or landing coverage below 75% of target |
| **Maintain** | Landing ≥85%, linking ≥70%, category ≥80%, ≤2 missing assets |
| **No action** | No dominant gap; monitor |

Recommendations are **planning hints**, not automatic publish triggers.

---

## Ranked roadmap

Topics sort by **opportunity score descending**, then content completeness ascending, then name.

Example output order (illustrative — run `npm run opportunities` for current values):

1. Party Games — category hub now live at `/categories/party-games` (run `npm run opportunities` for current scores)  
2. Audience Games — broad cluster, no pillar, many occasion pages  
3. Icebreaker Games — supplemental hub exists, category layer thin  
4. …

### Future backlog (do not ship from engine recommendation alone)

**Entertainment Games topic:** The keyword-cluster topic maps to `/question-games` as parent pillar. Review this mapping and cluster boundaries before building any production hub from that recommendation — entertainment and question intents overlap and the parent assignment may not reflect the best mid-layer architecture.

---

## Module layout

```
lib/growth/content-opportunities/
├── types.ts
├── topic-definitions.ts
├── opportunity-sources.ts
├── opportunity-scoring.ts
├── opportunity-report.ts
└── index.ts

scripts/content-opportunities.ts
```

---

## Operating rules

- **Read-only** — never writes to registries or production content
- **No search volumes** — architecture and coverage only
- **No metadata changes** — planning output stays in CLI / docs
- **Independent** — does not modify Growth Assistant or Snippet Optimization Engine

---

## Cross-references

- Content pyramid: `/docs/CONTENT_AUTHORITY_BLUEPRINT.md`
- Discovery graph: `/docs/DISCOVERY_SYSTEM.md`
- Growth playbook: `lib/growth/README.md`
