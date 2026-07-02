# FriendRank Traffic & Authority Growth Roadmap

Practical operating plan for growing organic traffic, domain authority, and product usage after SEO, GEO, AI citation, content quality, internal linking, sitemap, audit, and Search Console foundations are in place.

This document is **planning and reporting only**. It does not add routes, UI, runtime logic, external APIs, or monetization.

Run the live report:

```bash
npm run growth:authority-roadmap
```

Source of truth for structured data: `lib/growth/authority-roadmap.ts`.

---

## Purpose

FriendRank has strong build-time SEO and semantic layers. The next phase is **consistent execution**: monitor Search Console, iterate snippets, distribute authentically, earn mentions, and track product conversion — without rebuilding engines or shipping monetization prematurely.

---

## Growth channels

| Channel | Priority | Effort | Upside | Time to impact | Risk |
|---------|:--------:|--------|--------|----------------|------|
| Search Console / SEO | 1 | Medium | High | Weeks | Low |
| GEO / AI discoverability | 2 | Low | Medium | Months | Low |
| Product-led sharing | 2 | Low | High | Immediate | Low |
| Direct / referral traffic | 3 | Low | Medium | Immediate | Low |
| Reddit / community | 3 | Medium | Medium | Weeks | Medium |
| Backlink outreach | 4 | High | Medium | Months | Low |
| Pinterest | 4 | Medium | Medium | Months | Low |
| Partnerships | 5 | High | Medium | Quarter+ | Medium |
| TikTok / Reels / Shorts | 5 | High | Medium | Months | Medium |

### Why each channel matters for FriendRank

**Search Console / SEO** — 107 indexable pages and six topic hubs are the primary traffic engine. Impressions, indexing, and CTR optimization on existing URLs have the best risk-adjusted return.

**GEO / AI discoverability** — GEO Foundation and AI Citation layers structure entity clarity and quotable summaries. Run `npm run geo:report` and `npm run ai:citation` weekly to keep pages ready for LLM-assisted discovery.

**Product-led sharing** — Every game produces a shareable link, invite loop, and group results moment. This is the lowest-cost growth loop and should be measured in GA4 (`invite_link_copied`, `game_created`).

**Direct / referral** — Word-of-mouth from hosts compounds over time. Track referral sources when running community or outreach experiments.

**Reddit / community** — Party games, icebreakers, and friend quizzes map to active communities. Participate authentically; avoid spam.

**Backlink outreach** — Authority links from party-game blogs, classroom resources, and team-building sites strengthen topical trust for competitive queries.

**Pinterest** — Visual, occasion-based content (parties, classrooms, date nights) fits FriendRank landing pages and compounds slowly.

**Partnerships** — HR tools, event planners, and education communities can unlock qualified traffic but require relationship building.

**TikTok / Reels / Shorts** — Short demos of funny group results can spike awareness but are production-heavy and less intent-matched than search.

---

## Priority matrix summary

Prioritize channels where FriendRank already has assets:

1. **Own the index** — Search Console, indexing batches, CTR candidates (`npm run growth:search-console-plan`, `npm run growth:ctr`).
2. **Keep semantic layers healthy** — GEO and AI citation audits (`npm run geo:report`, `npm run ai:citation`).
3. **Activate the product loop** — CTA → game creation → share → return (`game_created`, `cta_clicked`).
4. **Test distribution lightly** — One community post, one outreach email, one directory submission per week max at first.
5. **Defer heavy video and partnership sprints** until search baseline exists.

---

## Weekly operating cadence

| Day | Focus |
|-----|-------|
| **Monday** | Search Console / GA4 review — impressions, clicks, indexed pages, top queries |
| **Tuesday** | Metadata / title opportunities — `npm run growth:ctr`, one experiment max |
| **Wednesday** | Community / content distribution — one authentic post or pin |
| **Thursday** | AI / GEO checks — `npm run geo:report`, `npm run ai:citation`, `npm run audit:all` |
| **Friday** | Backlink / partner experiments — one outreach or directory submission |
| **Weekend** | Optional social demo or page review |

See `WEEKLY_OPERATING_PLAN` in `authority-roadmap.ts` for the full task checklist per day.

---

## First 30-day plan

### Week 1 — Search Console baseline + priority URL monitoring

- Verify Search Console property and submit sitemap
- Run `npm run growth:search-console-plan` — execute Batch 1 indexing
- Record baseline: impressions, clicks, CTR, indexed page count
- Inspect all P0 URLs (homepage + 6 topic hubs)
- Link Search Console to GA4

### Week 2 — CTR / title / meta candidate review

- Run `npm run growth:ctr` — review top candidates
- Identify pages with impressions but zero clicks
- Adopt one P0/P1 title/meta change backed by Search Console data
- Request indexing once for the updated URL only
- Monitor CTR for 7 days after change

### Week 3 — First external distribution tests

- Post one authentic community contribution (Reddit or forum)
- Create one Pinterest pin linking to a topic hub or top landing page
- Send two backlink outreach emails to relevant blogs
- Submit FriendRank to one browser-game or AI-tool directory
- Track referral sessions in GA4

### Week 4 — Review early traffic signals and decide next experiments

- Compare week-4 vs week-1 impressions, clicks, and indexed pages
- Review top 10 queries and top 10 landing pages by clicks
- Decide whether to double down on SEO, community, or outreach
- Submit Batch 2 indexing for URLs still not indexed
- Set month-2 goals based on actual baseline

---

## Authority targets

Possible backlink and mention opportunities:

| Category | Examples | Approach |
|----------|----------|----------|
| Party game blogs | Birthday roundups, sleepover lists | Offer free game link or expert quote |
| Classroom activity resources | Teacher icebreakers, remote learning games | Pitch quick browser setup for groups |
| Team-building blogs | HR icebreakers, remote bonding | Highlight anonymous voting |
| Relationship / couple blogs | Date-night ideas, couple quizzes | Group-friendly voting angle |
| Reddit discussions | r/PartyGames, r/Teambuilding, r/Teachers | Answer helpfully; link when relevant |
| Pinterest boards | Party planning, classroom pins | Pin occasion-specific landing pages |
| AI tool directories | Group activity tool lists | Submit with GEO-ready summary |
| Browser game directories | No-download multiplayer lists | Emphasize no signup, phone voting |
| Startup / product directories | Indie launch sites | Product-led growth story |

Full list with examples: `AUTHORITY_TARGET_CATEGORIES` in `authority-roadmap.ts`.

---

## Growth KPI model

| KPI | Source | Cadence |
|-----|--------|---------|
| Impressions | Search Console → Performance | Weekly |
| Clicks | Search Console → Performance | Weekly |
| CTR | Search Console → Performance | Weekly |
| Indexed pages | Search Console → Pages | Weekly |
| Ranking positions 8–30 | Search Console → Performance | Weekly |
| Referral traffic | GA4 → Traffic acquisition | Weekly |
| AI assistant traffic | GA4 → referral sources | Monthly |
| Games created | GA4 → `game_created` | Weekly |
| CTA clicks | GA4 → `cta_clicked` | Weekly |
| Creation completion rate | `game_created` ÷ `game_creation_started` | Weekly |
| Returning users | GA4 → Retention | Monthly |

North-star: topic hubs and P0/P1 landing pages earn impressions **and** convert to `game_created`.

---

## Monetization readiness

**Rule:** No monetization sprint until there is meaningful traffic and usage — target sustained organic clicks, recurring game creation, and returning users before testing revenue.

Documented future options (not implemented):

| Option | When to consider |
|--------|------------------|
| Ads | 5k+ monthly organic clicks without hurting UX |
| Sponsored placements | Brand partners align with game categories |
| Affiliate partnerships | Occasion pages drive enough clicks to test |
| Premium templates | Repeat creators request advanced packs |
| Branded group games | Teams request white-label experiences |
| B2B / team-building version | Workplace pages drive qualified leads |
| Classroom / teacher version | Classroom pages show consistent retention |

---

## Related commands

```bash
npm run growth:authority-roadmap   # This roadmap (CLI report)
npm run growth:priorities            # Priority URL monitor list
npm run growth:search-console-plan   # Indexing batches + weekly checklist
npm run growth:ctr                   # Title/meta candidates (suggestions only)
npm run geo:report                   # GEO foundation audit
npm run ai:citation                  # AI citation audit
npm run audit:all                    # Full build-time SEO audit
npm run build                        # Production build (114 static routes)
```

---

## Architecture note

The authority roadmap **reads** existing growth registries (`growth-priority.ts`, `search-console-action-plan.ts`) for dynamic first actions. It does **not** duplicate SEO, GEO, or metadata engines.
