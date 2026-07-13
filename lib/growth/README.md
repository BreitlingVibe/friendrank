# FriendRank Growth Playbook

Internal growth measurement guide for shifting from build mode to growth mode. This folder defines KPIs, monitoring priorities, and Search Console workflow. It does not add routes, UI, or runtime logic.

## Current site status

| Surface | Count | Notes |
|---------|------:|-------|
| Public static routes | 114 | Homepage + live landing pages + topic hubs |
| Topic hubs | 6 | `/friend-games`, `/party-games`, `/team-building-games`, `/relationship-games`, `/icebreaker-games`, `/question-games` |
| Live landing pages | 101 | Registry-driven intent pages with metadata, schema, and sitemap entries |
| Dynamic game routes | 1 | `/game/[share_code]` — playable games, excluded from sitemap |
| Production URL | `https://friendrank.app` | Canonical domain |
| Sitemap | `/sitemap.xml` | Homepage, all live landing pages, all topic hubs |
| Analytics | Google Analytics 4 | Production-only events via `@next/third-parties/google` |
| SEO audits | `npm run audit:all` | Canonical, metadata, sitemap, robots, overlap, content, experience |

**Content systems in place**

- Landing Page Engine with content quality, variation, and experience layers
- Topic Hub Experience layer for discovery-first hub pages
- Entity knowledge graph, internal linking, and recommendation engines
- Build-time validation — no runtime SEO logic on public pages

**What is not tracked automatically yet**

Search Console metrics (impressions, clicks, CTR, average position, indexed pages) live in Google Search Console and must be reviewed manually or exported weekly. Product KPIs (games created, CTA clicks) live in GA4.

---

## Traffic goals

Starter goals for the first 90 days after active Search Console monitoring:

| Horizon | Impressions | Clicks | Indexed pages | Games created / week |
|---------|------------:|-------:|--------------:|---------------------:|
| Month 1 | 500+ | 25+ | 80+ of 107 indexable | 10+ |
| Month 2 | 2,000+ | 100+ | 95+ | 25+ |
| Month 3 | 5,000+ | 300+ | 107 | 50+ |

Adjust targets after four weekly reviews once baseline data exists.

**North-star outcomes**

1. Topic hubs and top landing pages earn consistent impressions for target queries.
2. Homepage and landing-page CTAs convert search visitors into game creation.
3. Pages ranking positions 8–30 move into page-one CTR range through title/snippet iteration.

---

## Core KPIs

### Search Console (weekly)

| KPI | Source | Why it matters |
|-----|--------|----------------|
| Google impressions | Search Console → Performance | Demand capture and visibility trend |
| Google clicks | Search Console → Performance | Actual traffic from organic search |
| CTR | Clicks ÷ impressions | Snippet and title effectiveness |
| Average position | Search Console → Performance | Ranking progress on priority queries |
| Indexed pages | Search Console → Pages | Index coverage vs. sitemap size |
| Queries (top 25) | Search Console → Performance | Content and internal linking opportunities |
| Pages ranking 8–30 | Search Console → Performance filtered by position | Highest-leverage optimization targets |

### Product (weekly, GA4)

| KPI | GA4 event | Why it matters |
|-----|-----------|----------------|
| Games created | `game_created` | Core product conversion |
| Game creation started | `game_creation_started` | Funnel top |
| Game creation abandoned | `game_creation_abandoned` | Drop-off diagnosis |
| CTA clicks | `cta_clicked` (`location` param) | Landing page and homepage intent |
| Homepage conversion | `cta_clicked` where `location` is `hero_start`, `categories`, `bottom_start` | Homepage effectiveness |
| Landing-page conversion | `cta_clicked` where `location` starts with `landing_` | SEO page effectiveness |
| Invite copied | `invite_link_copied` | Viral loop signal |
| Votes submitted | `vote_submitted` | Game engagement |
| Results unlocked | `results_unlocked` | Session completion |

### Derived KPIs (calculate in weekly review)

| KPI | Formula |
|-----|---------|
| Homepage CTA rate | Homepage `cta_clicked` ÷ homepage sessions |
| Landing-page CTA rate | Landing `cta_clicked` ÷ landing-page sessions |
| Creation completion rate | `game_created` ÷ `game_creation_started` |
| Top pages by traffic | Search Console pages report sorted by clicks |

---

## Weekly review process

Every Monday (30–45 minutes):

1. **Run local audits**
   - `npm run audit:all` — confirm build-time SEO integrity
   - `npm run growth:priorities` — refresh priority URL list

2. **Search Console**
   - Export last 7 days Performance (queries + pages)
   - Check Pages → Indexed vs. not indexed counts
   - Review pages with average position 8–30
   - Inspect any priority URL flagged as “Crawled – currently not indexed”

3. **GA4**
   - Filter events: `cta_clicked`, `game_created`, `game_creation_started`
   - Compare homepage vs. top 10 landing pages by sessions
   - Note CTA locations with highest click volume

4. **Decide actions** (max 3 per week)
   - Title/meta tweak for one page ranking 8–30 with low CTR
   - Internal link boost from a topic hub to an underperforming landing page
   - Content refinement on a hub intro if bounce rate is high

5. **Log outcomes**
   - Record baseline and delta for impressions, clicks, games created
   - Note which URLs were inspected or re-submitted

---

## Search Console checklist

### One-time setup

- [ ] Verify `https://friendrank.app` property (Domain or URL-prefix)
- [ ] Submit sitemap: `https://friendrank.app/sitemap.xml`
- [ ] Confirm robots.txt allows crawling: `https://friendrank.app/robots.txt`
- [ ] Link Search Console to GA4 for query ↔ behavior analysis

### After each major deploy

- [ ] Run `npm run audit:all`
- [ ] URL Inspection → homepage → Request indexing (if content changed)
- [ ] URL Inspection → each topic hub (if hub content changed)
- [ ] URL Inspection → top 20 landing pages (see `npm run growth:priorities`)

### Weekly monitoring

- [ ] Performance → last 7 days → review top queries
- [ ] Performance → filter average position 8–30 → export page list
- [ ] Pages → compare **Indexed**, **Crawled – currently not indexed**, **Discovered – currently not indexed**
- [ ] Inspect priority URLs stuck in non-indexed states
- [ ] Check Core Web Vitals and HTTPS report (monthly)

### Query review prompts

- Which queries drive impressions but zero clicks? (snippet/title opportunity)
- Which landing pages rank for the same query? (cannibalization check)
- Which topic hub queries are rising? (double down on internal links)

---

## First priority URLs to monitor

Run `npm run growth:priorities` for the live list. The monitor set includes homepage, all topic hubs, and the strongest pages per category.

### P0 — Homepage and topic hubs

| URL | Type | Search Console action |
|-----|------|----------------------|
| `https://friendrank.app/` | Homepage | Inspect weekly; confirm indexed; review branded queries |
| `https://friendrank.app/friend-games` | Topic hub | Inspect; monitor hub queries |
| `https://friendrank.app/party-games` | Topic hub | Inspect; monitor hub queries |
| `https://friendrank.app/team-building-games` | Topic hub | Inspect; monitor hub queries |
| `https://friendrank.app/relationship-games` | Topic hub | Inspect; monitor hub queries |
| `https://friendrank.app/icebreaker-games` | Topic hub | Inspect; monitor hub queries |
| `https://friendrank.app/question-games` | Topic hub | Inspect; monitor hub queries |

### P1 — Strongest category landing pages

**Friend / social voting**

- `/most-likely-to-generator`
- `/best-friend-quiz`
- `/who-knows-me-best`
- `/friendship-test`
- `/anonymous-voting-game`

**Party**

- `/party-voting-game`
- `/birthday-party-game`
- `/girls-night-game`

**Team / icebreaker**

- `/team-building-game`
- `/icebreaker-game`
- `/office-icebreaker`
- `/team-bonding-game`

**Relationship**

- `/relationship-quiz`
- `/couple-quiz`
- `/boyfriend-girlfriend-quiz`

**Question**

- `/never-have-i-ever-friends`
- `/would-you-rather-friends`

### Search Console inspect batch (top 20 landing pages)

Use the “Search Console landing page inspect targets” section from `npm run growth:priorities`. These are the highest `estimatedPriority` live pages — inspect after deploys and when monitoring index coverage.

---

## Priority URL logic

Classification lives in `lib/growth/growth-priority.ts`. It reads existing registries only — no external APIs.

Each page is classified by:

| Field | Source |
|-------|--------|
| Page type | Homepage, topic hub, or landing page |
| Estimated priority | `INTENT_REGISTRY.estimatedPriority` |
| Priority tier | High (70+), Medium (40–69), Low (<40) |
| Topic hub | Hub membership via keyword clusters |
| Category group | Friend, party, team, relationship, question |
| Search intent | Registry `searchIntent` |
| CTA location | Landing page `ctaLocation` or hub analytics mapping |
| Traffic potential | Derived score (homepage 100, hubs 92, landing pages priority ± featured boost) |
| Growth tier | P0 (homepage/hubs), P1 (high priority or featured), P2, P3 |
| Search Console action | Suggested next step based on tier |

---

## Search Console action plan

Sprint 2 adds an operating workflow in `lib/growth/search-console-action-plan.ts`. Run:

```bash
npm run growth:search-console-plan
```

Each indexable page gets a deterministic action item with:

| Field | Meaning |
|-------|---------|
| URL / path | Production URL to inspect |
| Page type | Homepage, topic hub, or landing page |
| Hub / category | Topic hub slug and growth category group |
| Priority tier | P0–P3 from `growth-priority.ts` |
| Suggested action | Inspect, request indexing, monitor, review title/meta, watch overlap |
| Reason | Why this action applies |
| Monitoring frequency | daily, weekly, biweekly, monthly |
| Expected signal | What success looks like in Search Console |

### Action categories

| Tier | Scope | Typical actions |
|------|-------|-----------------|
| **P0** | Homepage, topic hubs, highest-priority landing pages | Inspect URL, request indexing after deploy |
| **P1** | Strong landing pages (priority 70+ or featured) | Request indexing, monitor CTR, track position 8–30 |
| **P2** | Long-tail authority and audience/occasion pages | Monitor impressions; inspect if crawled but not indexed |
| **P3** | Support pages for internal linking | Quarterly indexing check; act only if impressions appear |

### Suggested action types

| Action | When to use |
|--------|-------------|
| Inspect URL | Confirm index status and canonical after deploy |
| Request indexing | Batch 1–2 pages after sitemap submission (use sparingly) |
| Monitor impressions | P2/P3 pages waiting for first visibility |
| Monitor CTR | P1 pages with impressions but weak snippet performance |
| Review title/meta later | High-priority pages flagged by candidate logic — suggestions only |
| Watch cannibalization warning | Overlap audit flagged similar title/description/intent |
| Ignore low-risk overlap | Intentional singular/plural slug pairs |

---

## Indexing queue

Manual indexing batches (generated by `buildIndexingQueue()`):

| Batch | Contents | Guidance |
|-------|----------|----------|
| **Batch 1** | Homepage + all 6 topic hubs + top 10 landing pages | Request once after sitemap submission |
| **Batch 2** | Next 20 highest-priority landing pages | Spread over several days |
| **Batch 3** | Remaining P1/P2 pages | Request after Batches 1–2 are indexed |
| **Batch 4** | P3 support pages | Only if crawled but not indexed after 30 days |

**Important:** Do not spam Search Console indexing requests. Re-request only after meaningful content or metadata changes.

---

## Weekly Search Console workflow

Use the checklist from `getWeeklySearchConsoleChecklist()` (printed by `npm run growth:search-console-plan`):

1. Check **Pages** report — indexed vs crawled-not-indexed vs discovered-not-indexed
2. Confirm **sitemap** submitted and processed
3. Inspect indexing status for Batch 1 URLs
4. Review queries with impressions but low CTR
5. Review pages ranking positions **8–30**
6. Identify pages with impressions but **no clicks**
7. Identify pages with clicks but **weak GA4 conversion** (`cta_clicked`, `game_created`)
8. Record **top 10 queries** and **top 10 pages**
9. Update next-week actions from the action plan output
10. Run `npm run audit:all` — fix errors; triage warnings (see below)

---

## Title/meta candidate logic

`getTitleMetaCandidates()` flags pages for **future** title/meta work. It does not modify metadata.

A page is flagged when several signals align:

- Growth tier P0, P1, or P2 (P3 excluded)
- Generic meta title (short template or `{title} | FriendRank` pattern)
- Generic or short meta description (< 95 chars or generic opening)
- Belongs to a competitive hub (friend, party, relationship, question)
- Hub-level page (category snippet owner)
- Overlap audit warning on the slug

Use Search Console Performance data before changing titles — prioritize candidates with impressions and CTR below 2%.

---

## Overlap triage rules

`getOverlapTriageSummary()` classifies `audit:index` overlap warnings:

| Triage | Overlap type | Action |
|--------|--------------|--------|
| **Ignore for now** | `overlap.similar_slug` | Intentional singular/plural pairs (e.g. `sleepover-game` / `sleepover-games`) |
| **Monitor** | `overlap.similar_title`, `overlap.shared_primary_keyword` | Watch query mapping in Search Console weekly |
| **Fix later** | `overlap.similar_description`, same intent + same audience titles | Differentiate metadata when editing those pages |

No page deletion or renaming in this workflow — triage only.

### Audit warning triage (safe vs worth fixing)

| Warning | Disposition | Notes |
|---------|-------------|-------|
| `overlap.similar_slug` | Safe | Ignore unless both URLs rank for the same query |
| `content.missing_enhanced_intro` | Safe | Expected after content experience dedup |
| `overlap.similar_title` | Monitor | Fix later if same query + low CTR |
| `overlap.similar_description` | Fix when capacity | Not blocking indexing |
| `overlap.shared_primary_keyword` | Monitor | Keep both pages if intents differ |
| `metadata.duplicate_hub_*` | Monitor | Refresh hub copy later |
| `experience.*` / `topic_hub.*` errors | Fix in code | Warnings usually safe when audit passes |

---

## After first 7 days of Search Console data

1. Confirm Batch 1 URLs are **Indexed** (or inspect stuck URLs)
2. Record baseline impressions, clicks, CTR, and indexed page count
3. Identify top 5 queries and top 5 landing pages by clicks
4. Flag any P1 page with impressions but zero clicks for title/meta review
5. Submit Batch 2 indexing requests only for URLs still not indexed
6. Cross-check GA4: do top Search Console pages drive `cta_clicked` and `game_created`?

---

## After first 30 days of Search Console data

1. Compare indexed pages vs sitemap size (target: 95%+ coverage)
2. Review all pages ranking positions **8–30** — pick 3 for title/meta experiments
3. Process overlap triage **monitor** items that now have impressions
4. Submit Batch 3 indexing for remaining P1/P2 pages not yet indexed
5. Adjust traffic goals in this doc based on actual baseline
6. Double down on internal links from topic hubs to underperforming P1 pages

---

## AI Growth Assistant

Sprint 2 adds a unified weekly report in `lib/growth/growth-assistant.ts` that orchestrates all existing growth modules — no external APIs, no LLMs, no engine duplication. Run:

```bash
npm run growth:assistant
```

The report combines priority URLs, Search Console actions, CTR candidates, authority roadmap, GEO foundation, AI citation coverage, and audit health into one actionable plan with executive summary, weekly actions (max 6), channel recommendations, content picks, authority targets, anti-waste guardrails, and next sprint focus.

See `lib/growth/GROWTH_ASSISTANT.md` for workflow and decision model.

---

## Content Opportunity Engine

Phase 27 adds a read-only architecture analyzer in `lib/growth/content-opportunities/`. Run:

```bash
npm run opportunities
```

Scores keyword-cluster topics by landing coverage, evergreen hub depth, category hub depth, discovery linking, and authority completeness. Produces a ranked investment roadmap using FriendRank registry data only — no search volumes, no production changes.

See `docs/CONTENT_OPPORTUNITY_ENGINE.md` for scoring philosophy.

---

## Growth Asset Generator

Sprint 3 adds a build-time promotional asset generator in `lib/growth/growth-assets.ts`. Run:

```bash
npm run growth:assets
```

Generates deterministic Reddit, LinkedIn, Pinterest, AI directory, outreach email, product sharing, SEO snippet, and promotion checklist assets for the highest-priority page (default: Friend Games topic hub). Reuses GEO, AI citation, CTR optimization, and growth assistant selection — no runtime, no APIs, no auto-publishing.

See `lib/growth/GROWTH_ASSETS.md`.

---

## Distribution Opportunity Registry

Sprint 1 adds a build-time registry in `lib/growth/distribution-opportunities.ts` of realistic external publishing opportunities (Reddit, Pinterest, directories, teacher/team/party resources, product-led sharing). Run:

```bash
npm run growth:distribution
```

Matches pages and asset types to channels with effort, risk, cadence, and spam-avoidance rules. Informs Growth Assistant avoid lists and Growth Assets target selection — no automation, no APIs, no crawling.

See `lib/growth/DISTRIBUTION_OPPORTUNITIES.md`.

---

## Weekly Campaign Planner

Sprint 2 adds a build-time campaign planner in `lib/growth/campaign-planner.ts` that combines Growth Assistant, Growth Assets, Distribution Opportunities, Growth Priority, Search Console Action Plan, and Authority Roadmap into one weekly campaign. Run:

```bash
npm run growth:campaign
```

Outputs campaign summary, channel decisions (publish / prepare / ignore), asset checklist, six manual actions, publishing order, guardrails, 7-day measurement plan, and next campaign suggestion — human approval required for all publishing.

See `lib/growth/CAMPAIGN_PLANNER.md`.

---

## Weekly Publishing Package

Sprint 3 adds a build-time publishing package in `lib/growth/publishing-package.ts` that merges Campaign Planner, Growth Assets, Distribution Opportunities, Growth Assistant, Authority Roadmap, and Search Console Action Plan into one copy-ready weekly package. Run:

```bash
npm run growth:publishing-package
```

Includes campaign overview, seven publication blocks, publishing order, account/handle/email readiness notes (no credentials), automation readiness classification, guardrails, 7-day measurement checklist, and next-step recommendation.

See `lib/growth/PUBLISHING_PACKAGE.md`.

---

## Manual Distribution Workflow

Sprint 4 adds a build-time manual distribution workflow in `lib/growth/manual-distribution-workflow.ts` — account readiness, first-campaign checklist for `/friend-games`, channel classification, backlink/reach targets, valid backlink rules, ten ordered manual actions, future automation documentation, and 7-day measurement checklist. Run:

```bash
npm run growth:manual-distribution
```

No credentials, no account creation, no auto-posting. Pairs with `npm run growth:publishing-package` for copy-ready execution.

See `lib/growth/MANUAL_DISTRIBUTION_WORKFLOW.md`.

---

## Traffic & authority growth roadmap

Sprint 1 adds a practical traffic and authority operating plan in `lib/growth/authority-roadmap.ts` and `lib/growth/AUTHORITY_ROADMAP.md`. Run:

```bash
npm run growth:authority-roadmap
```

The report includes:

- **Growth channel priorities** — Search Console/SEO, GEO/AI, community, Pinterest, short-form video, outreach, partnerships, product-led sharing, direct/referral
- **Priority matrix** — effort, upside, time to impact, risk, and why each channel fits FriendRank
- **Weekly operating cadence** — Mon Search Console/GA4, Tue metadata, Wed distribution, Thu GEO/AI audits, Fri outreach, weekend optional
- **30-day plan** — baseline → CTR review → distribution tests → signal review
- **Authority targets** — party blogs, classroom resources, team-building, relationship blogs, Reddit, Pinterest, directories
- **KPI model** — impressions, clicks, CTR, indexed pages, positions 8–30, referral/AI traffic, games created, CTA clicks, completion rate, returning users
- **Monetization readiness** — documented future options only; no monetization sprint until meaningful traffic and usage

---

## Commands

```bash
# Refresh priority URL report
npm run growth:priorities

# Search Console action plan, indexing queue, and weekly checklist
npm run growth:search-console-plan

# CTR title/meta optimization candidates (suggestions only)
npm run growth:ctr

# Traffic & authority growth roadmap (channels, 30-day plan, KPIs)
npm run growth:authority-roadmap

# Unified weekly growth assistant (all modules combined)
npm run growth:assistant

# Promotional assets for highest-priority page
npm run growth:assets

# Distribution opportunity registry and page matching
npm run growth:distribution

# Weekly campaign plan (assistant + assets + distribution combined)
npm run growth:campaign

# Complete copy-ready weekly publishing package
npm run growth:publishing-package

# Manual distribution workflow and account readiness
npm run growth:manual-distribution

# Full SEO and content audit
npm run audit:all

# Production build (114 static routes)
npm run build
```

---

## CTR optimization workflow

Sprint 3 adds a deterministic CTR optimization layer in `lib/growth/ctr-optimization.ts`. It generates **suggestions only** — it does not change live metadata, routes, or UI.

```bash
npm run growth:ctr
```

### Metadata profiles

| Profile | Title pattern | Meta pattern | CTA ending |
|---------|---------------|--------------|------------|
| **Homepage** | Brand + group voting value prop | Active benefit + audience + CTA | Create your free game on FriendRank today. |
| **Topic hub** | Hub title + free online keyword & voting | Category benefit + audience + CTA | Browse live games and start playing in minutes. |
| **Quiz** | Title + search-intent hook (or question form) | Quiz benefit + audience + CTA | Create your quiz free and share one link. |
| **Generator** | Title + free audience game online | Generator benefit + audience + CTA | Generate prompts and start voting in minutes. |
| **Game** | Title + free online game for audience | Game benefit + audience + CTA | Create your game free — no app download. |
| **Questions** | Title + audience conversation starters | Question benefit + audience + CTA | Turn prompts into a live voting game today. |
| **Voting** | Title + anonymous audience voting online | Voting benefit + audience + CTA | Start anonymous voting with one shareable link. |

Profiles resolve from page type and slug tokens (`quiz`, `generator`, `questions`, `voting`) plus intent category fallbacks — no manual page lists.

### Validation rules

Every suggested title/meta set is checked for:

- No duplicate titles across candidates
- No duplicate descriptions across candidates
- Title length 30–60 characters (warning if outside)
- Meta length 140–160 characters (required)
- FriendRank brand at most once in title
- No repeated keywords (3+ occurrences)
- No empty values

### When to adopt suggestions

Adopt a suggested title/meta in the content registry when **all** of the following are true:

1. Search Console shows **impressions** for the page
2. **CTR is below 2%** or the page ranks positions 8–30
3. `npm run growth:ctr` validation passes for that suggestion
4. The page is **P0 or P1** (or P2 with rising impressions)
5. You can verify the snippet reads naturally in a SERP preview

Update the intent block in `lib/landing-pages/content/intent-library.ts` or hub `metaDescription` in `lib/topic-hubs/hub-content.ts`, then redeploy and request indexing once.

### When NOT to rewrite titles

Do **not** change live metadata when:

- The page has **no impressions yet** — wait for baseline data
- The page already has **strong CTR** (> 4%) on its primary query
- Overlap triage marks a related page as **fix-later** for the same query
- `npm run growth:ctr` reports duplicate title/description validation errors
- You are reacting to a single day of Search Console noise — wait for a weekly trend

### Relationship with Search Console

1. Run `npm run growth:search-console-plan` to find pages flagged **review-title-meta-later** or **monitor-ctr**
2. Run `npm run growth:ctr` to get deterministic rewrite candidates
3. Cross-check the query in Search Console Performance before adopting
4. After adopting, inspect the URL once and monitor CTR for 14 days
5. Keep a log of old vs new titles to revert if CTR drops

---

## Related docs

- **Manual Distribution Workflow:** `lib/growth/MANUAL_DISTRIBUTION_WORKFLOW.md`
- **Weekly Publishing Package:** `lib/growth/PUBLISHING_PACKAGE.md`
- **Weekly Campaign Planner:** `lib/growth/CAMPAIGN_PLANNER.md`
- **Distribution Opportunity Registry:** `lib/growth/DISTRIBUTION_OPPORTUNITIES.md`
- **Growth Asset Generator:** `lib/growth/GROWTH_ASSETS.md`
- **AI Growth Assistant:** `lib/growth/GROWTH_ASSISTANT.md`
- **Traffic & authority roadmap:** `lib/growth/AUTHORITY_ROADMAP.md`
- Landing page planning: `lib/landing-pages/planning/README.md`
- Entity validation: `npm run audit:entities`
- Analytics events: `lib/analytics.ts`
