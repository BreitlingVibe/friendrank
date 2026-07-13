# FriendRank Snippet Optimization Engine

**Version:** 1.0  
**Status:** Internal tooling — human review only  
**Related:** `/docs/GROWTH_EXPERIMENTS.md`, `lib/growth/GROWTH_ASSISTANT.md`, `lib/growth/ctr-optimization.ts`

The Snippet Optimization Engine helps identify, evaluate, and document title/meta-description experiments for existing FriendRank pages. It **does not** change production metadata automatically.

---

## Purpose

FriendRank already has:

- 100+ indexable pages
- CTR candidate detection (`lib/growth/ctr-optimization.ts`)
- Growth Assistant weekly reporting
- GEO and AI citation audits
- Manual experiment tracking (`/docs/GROWTH_EXPERIMENTS.md`)

This engine closes the gap between **heuristic CTR candidates** and **evidence-based snippet experiments** by:

1. Recording real Search Console query-to-page evidence
2. Evaluating whether a page is ready for optimization
3. Generating safe snippet alternatives for human review
4. Flagging cannibalization risk across related URLs
5. Protecting active/pending experiments from repeated edits

---

## Evidence hierarchy

| Level | Meaning | Source |
|-------|---------|--------|
| **VERIFIED** | Query-to-page evidence recorded manually from Search Console | `lib/growth/search-console-opportunities.ts` |
| **PARTIAL** | Some context exists but not full query metrics (reserved for future use) | Manual enrichment |
| **HEURISTIC ONLY** | Codebase-derived CTR candidate with no Search Console evidence | `ctr-optimization.ts`, growth priority |

### Rules

- Internal code analysis alone **cannot** produce `verified` evidence.
- Impressions, clicks, CTR, average position, and date ranges must **not** be invented.
- Missing external data stays explicitly `missing`.
- Growth Assistant recommendations are **hypotheses** until backed by Search Console evidence.

**Strong rule:** No production metadata change should be made solely because a page appears in an automated CTR-candidate list.

---

## Architecture

```
lib/growth/search-console-opportunities.ts   Manual SC query-to-page records
lib/growth/snippet-optimization/
  types.ts                                   Evidence + candidate types
  experiment-registry.ts                     Active experiment protection
  page-metadata.ts                           Read current title/H1/canonical from codebase
  candidate-generator.ts                     A/B/C snippet candidates
  candidate-evaluator.ts                     Internal quality scoring (not CTR prediction)
  cannibalization.ts                         Related-page overlap checks
  run-snippet-report.ts                        Report orchestration
  format-snippet-report.ts                     CLI formatting
  index.ts                                     Public exports
scripts/snippets-report.ts                   npm run snippets:report
```

The engine **reads** metadata from:

- Landing pages → `lib/landing-pages/content/intent-library.ts` + assembled `LANDING_PAGES`
- Evergreen hubs → `lib/evergreen-hubs/*-data.ts`
- Topic hubs → `lib/topic-hubs/hub-registry.ts`
- Category hubs → `lib/discovery/category-hub-content.ts`

It does **not** duplicate CTR profile logic — it complements `ctr-optimization.ts` with evidence gates and experiment workflow.

---

## Candidate generation

For each verified opportunity (when not blocked by an active experiment), the engine generates **three** candidates:

| Variant | Intent |
|---------|--------|
| **A. Search-intent-first** | Lead with verified query or registry search intent |
| **B. Benefit-first** | Lead with browser voting benefit and accurate claims |
| **C. Brand-balanced** | Include FriendRank branding where useful |

Each candidate includes:

- title and meta description
- rationale, target intent, claims used, possible risk
- character counts
- qualitative fit (`strong fit` / `reasonable fit` / `weak fit`) — **not** predicted CTR

### Rules

- No keyword stuffing
- No unsupported claims (`free`, `anonymous`, `no app download` only when accurate for the page)
- No fake urgency or social proof
- No duplicate candidates with minor word-order changes
- Snippets must describe the **existing** page accurately

---

## Scoring limitations

The internal quality score (0–100) is labeled:

**“Internal quality score — not predicted CTR.”**

It evaluates:

- query alignment (when verified query exists)
- intent clarity and product accuracy
- title/description length and readability
- brand usage and CTA clarity
- duplication and cannibalization risk

It does **not** predict ranking changes or click-through rate.

---

## Cannibalization logic

Before recommending a candidate, the engine compares against:

- titles and H1s of related pages
- canonical URLs and page types
- Search Console competing URLs on the same query cluster

Flags include:

- nearly identical titles
- singular/plural siblings without clear intent distinction (e.g. playable vs guide)
- informational vs playable pages with indistinguishable snippets
- Search Console impressions split across sibling URLs

The engine **never** merges, redirects, or edits pages automatically.

---

## Search Console input process

1. Open Google Search Console → **Performance**
2. Filter by query (e.g. `voting game online`)
3. Open the **Pages** tab to see which URL received impressions
4. Record metrics in `lib/growth/search-console-opportunities.ts`:

```typescript
{
  targetQuery: "your query",
  targetSlug: "page-slug",
  impressions: 19,        // from Search Console
  clicks: 1,              // from Search Console
  averagePosition: null,  // null if not recorded — do not invent
  observationStartDate: null,
  observationEndDate: null,
  competingUrls: [ ... ],
  evidenceStatus: "verified",
  source: "manual-search-console",
}
```

5. Run `npm run snippets:report`
6. Review candidates and approve **one** experiment manually
7. Update `lib/growth/snippet-optimization/experiment-registry.ts` and `/docs/GROWTH_EXPERIMENTS.md`

---

## Experiment workflow

Experiment statuses:

`proposed` · `approved` · `active` · `pending_measurement` · `successful` · `inconclusive` · `unsuccessful` · `reverted`

Pages with `active`, `pending_measurement`, or `approved` status are **excluded** from new snippet recommendations.

### Operating workflow

1. Find a query in Search Console
2. Open the Pages tab
3. Record query-to-page evidence in `search-console-opportunities.ts`
4. Run `npm run snippets:report`
5. Review candidates A/B/C and cannibalization warnings
6. Approve one experiment manually
7. Change **one page only** in `intent-library.ts` (or relevant metadata source)
8. Request indexing once if appropriate
9. Wait **7–14 days** after Google recrawls
10. Record results in `/docs/GROWTH_EXPERIMENTS.md`

---

## CLI usage

```bash
npm run snippets:report
npm run growth:assistant   # includes verified snippet opportunity summary
```

Report sections:

1. Executive summary
2. VERIFIED OPPORTUNITY
3. PARTIAL EVIDENCE
4. HEURISTIC ONLY
5. Experiment recommendations (needs human approval)
6. Active experiments
7. Pages that should not be changed yet

---

## What the engine must never do

- Automatically modify production metadata
- Invent Search Console metrics
- Present heuristic candidates as verified opportunities
- Predict CTR or assign fake percentage improvements
- Recommend metadata changes on active/pending experiments
- Merge, redirect, or canonicalize pages automatically
- Replace human approval for experiments

---

## Current seeded evidence

| Query | Target URL | Evidence |
|-------|------------|----------|
| `voting game online` | `/group-voting-game` | 19 impressions, 1 click (~5.3% CTR) |

Active experiment: **Voting Game Online CTR Test** — status `pending_measurement`. Do not change `/group-voting-game` metadata again until the measurement window completes.
