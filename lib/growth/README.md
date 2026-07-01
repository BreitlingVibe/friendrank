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

## Commands

```bash
# Refresh priority URL report
npm run growth:priorities

# Full SEO and content audit
npm run audit:all

# Production build (114 static routes)
npm run build
```

---

## Related docs

- Landing page planning: `lib/landing-pages/planning/README.md`
- Entity validation: `npm run audit:entities`
- Analytics events: `lib/analytics.ts`
