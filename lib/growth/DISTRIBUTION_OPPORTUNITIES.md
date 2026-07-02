# FriendRank Distribution Opportunity Registry

Build-time registry of **realistic external distribution opportunities** for FriendRank. Helps the Growth Assistant and Growth Asset Generator decide where generated assets could be published — without automation, runtime logic, APIs, crawling, or auto-posting.

```bash
npm run growth:distribution
```

Source: `lib/growth/distribution-opportunities.ts`

---

## Purpose

Growth assets (Reddit posts, Pinterest pins, outreach emails, etc.) need a destination. This registry documents **where** each page type fits, **how** to post, **what to avoid**, and **how often** to try — all deterministically from internal classification rules.

No scraping. No live website data. No auto-posting.

---

## Opportunity categories (10)

| ID | Channel |
|----|---------|
| `reddit-community` | Reddit / community forums |
| `pinterest` | Pinterest |
| `ai-tool-directories` | AI tool directories |
| `browser-game-directories` | Browser game directories |
| `team-building-resources` | Team-building blogs / HR resources |
| `teacher-classroom-resources` | Teacher / classroom activity sites |
| `party-planning-resources` | Party planning blogs / occasion roundups |
| `relationship-couples-resources` | Relationship / couples activity blogs |
| `startup-indie-directories` | Startup / indie product directories |
| `product-led-sharing` | WhatsApp, Discord, Slack, iMessage |

Each category defines:

- Channel and audience
- Suitable page types (homepage, topic hub, landing page)
- Suitable asset types (reddit, pinterest, ai-directory, etc.)
- Effort, expected upside, risk
- Approval required (manual review before posting)
- Posting style and avoid/spam rules
- Example use case and recommended cadence

---

## Matching logic

### By page path

`getDistributionOpportunitiesForPath(path)` returns ranked matches using:

1. **Explicit path overrides** (e.g. `/friend-games`, `/icebreaker-game`, `/birthday-party-games`, `/best-friend-quiz`)
2. **Topic hub defaults** (hub id → categories)
3. **Category group defaults** (friend, party, team, relationship, question from `growth-priority.ts`)
4. **Scoring** by page tier, effort, upside, and featured-hub status

Example matches:

| Path | Top categories |
|------|----------------|
| `/friend-games` | Reddit, Pinterest, AI directories, browser game directories |
| `/icebreaker-game` | Team-building, teacher resources, Reddit |
| `/birthday-party-games` | Pinterest, party planning, Reddit |
| `/best-friend-quiz` | Pinterest, Reddit, product-led sharing |

### By asset type

`getDistributionOpportunitiesForAssetType(assetType)` filters categories whose `suitableAssetTypes` include the asset (e.g. `reddit` → Reddit/community).

### Concrete targets

`DISTRIBUTION_TARGETS` lists named targets (e.g. r/PartyGames, party planning boards, teacher resource sites) with example paths — not live URLs scraped from the web.

---

## CLI output

- Top distribution opportunity categories
- Recommended first 10 targets
- Best opportunities for current highest-priority page (from `growth-assets` selection)
- Channels to avoid this week (from `growth-assistant` defer/ignore decisions)
- Cadence recommendation
- Manual approval reminder

---

## Relationship with Growth Assistant / Growth Assets

| Module | How it uses the registry |
|--------|--------------------------|
| **Growth Assistant** | Channel focus/defer/ignore informs `channelsToAvoidThisWeek` |
| **Growth Assets** | Asset types map to `suitableAssetTypes`; priority page drives `bestForPriorityPage` |
| **Authority roadmap** | Complements backlink and community categories with operating cadence |

The registry does **not** modify assets or assistant output automatically in Sprint 1 — it provides shared vocabulary and matching functions for future integration.

---

## Manual approval rule

> All distribution is manual. Review each post, email, pin, and directory submission before publishing. Never auto-post. Respect community rules and `approvalRequired` flags.

---

## Related commands

```bash
npm run growth:distribution   # This registry
npm run growth:assets         # Generated promotional copy
npm run growth:assistant      # Weekly unified plan
npm run growth:authority-roadmap
npm run audit:all
```

---

## Constraints

- No public routes or UI
- No runtime logic or external APIs
- No crawling or auto-posting
- No duplicated SEO/GEO/growth engines
- Registry and matching only
