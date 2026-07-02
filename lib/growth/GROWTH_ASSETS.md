# FriendRank Growth Asset Generator

Build-time generator that prepares **deterministic promotional assets** for the highest-priority FriendRank page. Orchestrates existing growth, GEO, and AI citation modules — no runtime logic, UI, APIs, or LLMs.

```bash
npm run growth:assets
```

Source: `lib/growth/growth-assets.ts`

---

## Purpose

After SEO, GEO, AI citation, Search Console planning, CTR optimization, and the growth assistant are in place, the next operational step is **distribution**. This generator produces copy-ready assets for one priority page so you can publish manually without rewriting from scratch each week.

Assets are **suggestions for human review** — not auto-published, not injected into the app.

---

## Target page selection

The generator picks the **highest-priority promotion target** from the growth assistant:

- Default: **Best topic hub** (`/friend-games` — Friend Games)
- Classification from `growth-priority.ts`
- GEO + AI citation from assembled page models
- SEO snippet from `ctr-optimization.ts` when a candidate exists

Landing pages can be passed programmatically via `buildGrowthAssetsReport(classification)` for future CLI flags; the default CLI uses the assistant's top hub pick.

---

## Generated assets

| # | Asset | Contents |
|---|-------|----------|
| 1 | **Reddit post** | Title, body, suggested subreddit category, soft CTA |
| 2 | **LinkedIn post** | Short version, long version, CTA |
| 3 | **Pinterest** | Title, description, suggested image concept |
| 4 | **AI directory** | 1-sentence, 3-sentence, ~150-word description |
| 5 | **Backlink outreach** | Subject, body, CTA |
| 6 | **Product sharing** | WhatsApp, Discord, Slack messages |
| 7 | **SEO snippet** | Title + meta description (CTR candidate or current) |
| 8 | **Promotion checklist** | Where to publish, effort, expected impact |

All copy is derived from:

- `geoFoundation` (audience, summary, primary entity)
- `aiCitation` (canonical answer, citation summary, key takeaways, evidence)
- `ctr-optimization` (suggested title/meta when available)
- `growth-assistant` (page selection reason)

---

## CLI output

```
Overall asset readiness: Ready
Best page: /friend-games
Assets generated: ✓ Reddit ✓ LinkedIn ✓ Pinterest ...
Recommended publication order
Expected effort: medium
Expected reach: high
```

Full asset text follows in numbered sections.

---

## Recommended publication order

1. **Product sharing** — lowest effort, immediate viral loop
2. **Reddit / community** — authentic thread with soft CTA
3. **Pinterest pin** — visual discovery
4. **AI directory** — submission copy ready
5. **LinkedIn** — short post first
6. **Backlink outreach** — one blog per week
7. **SEO snippet** — adopt only after Search Console impressions

---

## How to use weekly

1. Run `npm run growth:assistant` — confirm focus channels
2. Run `npm run growth:assets` — copy assets for the priority page
3. Publish manually in recommended order
4. Log outcomes in Search Console / GA4 (external — not automated)
5. Do **not** change live metadata without impression data (see growth assistant guardrails)

---

## What this does NOT do

- No public routes or UI
- No runtime or scheduled jobs
- No OpenAI / LLM calls
- No auto-posting to Reddit, LinkedIn, or Pinterest
- No metadata changes in the codebase
- No duplicated SEO/GEO engines

---

## Related commands

```bash
npm run growth:assets       # This generator
npm run growth:assistant    # Weekly unified plan
npm run growth:ctr          # CTR candidates source
npm run geo:report          # GEO foundation source
npm run ai:citation         # AI citation source
npm run audit:all           # Build-time integrity
```

---

## Related docs

- `lib/growth/GROWTH_ASSISTANT.md` — Weekly growth orchestration
- `lib/growth/AUTHORITY_ROADMAP.md` — Channel priorities and authority targets
