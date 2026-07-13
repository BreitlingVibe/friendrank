# FriendRank AI Context

**Version:** 1.0  
**Audience:** Future AI assistants (Cursor, ChatGPT, and similar)  
**Purpose:** Onboard quickly without reading the full codebase or Product Bible  
**Product URL:** https://friendrank.app  
**Last updated:** July 2026

Read this document first when working on FriendRank. For depth, see `/docs/PRODUCT_BIBLE.md`.

---

## FriendRank Overview

**What it is:** A free, browser-based social voting game. A host creates a game, shares one link, and friends vote on humorous group roles (e.g. Main Character, Chaos Agent, Secret Villain). When enough votes are in, the group unlocks aggregated results and shareable story-style output.

**Who it is for:** Friend groups, parties, classrooms, teams, and couples who want a quick group activity in a chat thread — especially on mobile, without installing an app.

**Core value proposition:** One link → anonymous group votes → a shared result worth screenshotting. Low setup, high social payoff.

**How it differs from quizzes or personality tests:**

| Quizzes / personality tests | FriendRank |
|----------------------------|------------|
| Individual answers, often scored | Group votes on each other |
| Correct/incorrect or fixed outcomes | Subjective group consensus |
| Solo completion | Multiplayer-first; needs multiple voters |
| Static result for one person | Collective narrative about the group |

FriendRank is **not** a social network, **not** a blog, and **not** an AI chat product. SEO and GEO layers exist to drive people into the create → vote → reveal loop.

**North Star:** Host creates a game → friends vote within minutes → group gets a result they want to share.

---

## Product Philosophy

Principles that govern acceptable changes:

- **Emotion over complexity** — Fun and social beats feature depth. Prefer copy and pacing over new UI systems.
- **Multiplayer first** — Every change should strengthen create → invite → vote → reveal → share.
- **Conversation is more important than animation** — The group chat reaction matters more than on-screen effects.
- **Fast before flashy** — Responsiveness on real phones beats decorative motion.
- **AI readability should emerge naturally from good architecture** — Clear page structure, entities, and internal linking; not keyword stuffing or hidden text.
- **Simplicity scales** — Registries, engines, and build-time audits beat one-off page logic.
- **If an experiment is not clearly better, revert it** — Not every sprint ships. Complexity, readability regressions, and Clarity replay breakage are reasons to roll back.

Additional rules:

- Playful tone is allowed; **clarity is mandatory** (users always know the next step).
- **Pillars before long-tail** SEO pages.
- **Homepage is a product surface**, not a directory or blog.
- Use **Search Console, GA4, Vercel Analytics, and Clarity** for decisions — not assumptions.

---

## Current Product

### Homepage (`/`)

Primary conversion surface. Hero, game creation form (`#create-game`), categories, pillar discovery cards, reveal preview, how-it-works, FAQ, bottom CTA. On success, post-create share panel appears on the same page (invite link, copy, vote progress).

### Pillar pages

Category authority pages built with the Evergreen Hub Engine (`lib/evergreen-hubs/`). Examples: `/friend-games`, `/party-games`, `/team-building-games`, `/relationship-games`, `/icebreaker-games`, `/question-games`. Link to high-priority landing pages and back to homepage discovery.

### Evergreen pages

~100+ registry-driven static landing pages (e.g. `/best-friend-quiz`, `/office-icebreaker`). Landing Page Engine (`lib/landing-pages/`) handles metadata, schema, FAQ, CTAs, automatic internal linking. Planning: Intent Registry + Keyword Clusters.

### Game creation

Homepage form: friend names, vibe tags (≤3), tone, optional inside joke, optional custom categories (≤3). Five categories per game. Persisted via Supabase server actions. Events: `game_creation_started`, `game_created`, `game_creation_abandoned`.

### Invite / share

Unique URL: `https://friendrank.app/game/{share_code}`. Post-create: copy invite link (primary), vote now (secondary), live vote progress. Event: `invite_link_copied`.

### Voting

At `/game/[share_code]`. One category question at a time; tap to vote; progress UI; browser-local token prevents double voting on same device. Event: `vote_submitted`. Live polling on game page (disabled in Clarity replay-safe mode).

### Reveal

When vote threshold is met (~all friends voted, minimum 2). Optional ~3.2s overlay sequence (context-aware copy from `lib/narrative/`, timing from `lib/reveal/`). Skipped with `prefers-reduced-motion` or Clarity replay detection. Then hero emphasis on #1 category, cascaded sections for remaining results.

### Results

Ranked category cards, group verdict, group vibe, dangerous combo, group reputation, ending card. Share section: preview, download, copy text. Event: `results_unlocked` plus share events.

---

## Technical Stack

| Component | Role |
|-----------|------|
| **Next.js** | App Router, RSC, server actions |
| **Supabase** | PostgreSQL; games and votes; anon client + RLS |
| **Vercel** | Hosting and deployment |
| **GA4** | Product funnel events (`lib/analytics.ts`) |
| **Vercel Analytics** | Traffic and Web Vitals |
| **Microsoft Clarity** | Session replay; app has replay-safe guards |
| **Search Console** | Organic performance; manual weekly review |
| **Cloudflare** | Domain / DNS in front of Vercel |

Pre-deploy validation:

```bash
npm run audit:all
npm run build
```

---

## Current Architecture

```
Homepage
  ↓
Pillars (evergreen hub pages)
  ↓
Evergreen pages (long-tail landing pages)
  ↓
Dynamic game pages (/game/[share_code])
  ↓
Create Game (homepage form → Supabase)
  ↓
Invite Friends (share link)
  ↓
Vote (per-category taps, aggregated)
  ↓
Reveal (overlay → hero → cascade)
  ↓
Results (narrative sections + share card)
```

**Key code locations:**

| Area | Path |
|------|------|
| Homepage | `components/homepage/`, `app/page.tsx` |
| Pillars | `lib/evergreen-hubs/`, `components/evergreen-hubs/` |
| Landing pages | `lib/landing-pages/`, `app/{slug}/page.tsx` |
| Game page | `app/game/[share_code]/` |
| Game build | `lib/game-build.ts` |
| Votes | `lib/votes/` |
| Narrative / results | `lib/narrative/`, `lib/results/` |
| Reveal | `lib/reveal/` |
| SEO / audits | `lib/seo/`, `scripts/audit-all.ts` |
| GEO | `lib/geo/` |
| Growth ops | `lib/growth/` |

**Note:** `lib/topic-hubs/` is an internal planning layer. Public hub UI is evergreen hubs, not a separate route system.

---

## Important Decisions

Do not re-litigate without new data:

1. **Pillars before long-tail** — Build category authority before adding isolated SEO URLs.
2. **Homepage is intentionally stable** — Good enough after Phases 19–21; avoid layout churn without GA4/Clarity evidence.
3. **Reveal storytelling experiment was refined, not expanded** — Phase 22 added copy then removed visual tricks. More overlay text alone still risked “loading” feel. Keep reveal ~3.2s; prefer short narrative copy over animations.
4. **UX decisions are data-informed** — Clarity for behavior, Search Console for search, GA4 for conversion.
5. **AI/GEO optimization is long-term strategy** — Build-time GEO + AI citation layers (`lib/geo/`); no runtime LLM in the product loop yet.
6. **Product quality over unnecessary features** — Revert if not clearly better.
7. **Clarity replay-safe mode is required** — Disable polling/animations in replay environments; do not break session replay for performance wins.
8. **Discovery extends pillars** — New discovery work links into existing evergreen hubs; do not replace them with parallel systems.
9. **No auto-publishing to Reddit/forums** — Manual, authentic distribution only.

This is a **custom Next.js version** with possible API differences from training data. Check `node_modules/next/dist/docs/` and `AGENTS.md` before assuming Next.js conventions.

---

## Current Priorities

Active focus areas (in rough order):

1. **Discovery Blueprint** — Document mapping homepage → pillars → landing pages → CTAs *(not yet created)*
2. **Organic acquisition** — Search Console weekly cadence; impressions → clicks → `game_created`
3. **Internal linking** — Registry-driven Related Games; pillar ↔ landing ↔ homepage
4. **Long-tail supporting pages** — Ship planned intents from registry; improve intros where impressions rise
5. **Shareability improvements** — Results card, share text, screenshot-worthy output
6. **Replay loop** — Reduce friction to play again with same group (UX-first)
7. **AI discoverability** — GEO foundation, entity graph, clear public copy; future `AI_CONTEXT` sync with product changes

**Explicitly deferred:** Runtime AI personalization, monetization sprints, homepage redesign, animation libraries, performance refactors without measured bottlenecks.

---

## Things AI Should Know

When suggesting work on FriendRank:

1. **Preserve architecture** — Use existing engines (landing pages, evergreen hubs, narrative, reveal, analytics). Do not introduce parallel systems.
2. **Avoid unnecessary redesigns** — Especially homepage, reveal flow, and game page unless user or data explicitly requires it.
3. **Build on existing pillars** — Link new content into `/friend-games`, `/party-games`, etc. Do not create competing hub structures.
4. **Prefer small iterative improvements** — Focused diffs over large rewrites.
5. **Check previous decisions** — Read this file and Product Bible before proposing reversals.
6. **Prioritize user value and business impact** — Core loop perception and `game_created` / share metrics beat cosmetic changes.
7. **Keep documentation synchronized** — Update `/docs/PRODUCT_BIBLE.md` and this file when strategic decisions change.
8. **Do not modify without scope** — User rules often forbid commits, route changes, or metadata edits unless explicitly requested.
9. **Validate with audits** — Run `npm run audit:all` and `npm run build` after substantive changes.
10. **Next.js quirks** — Read project Next.js docs; heed deprecation notices in this repo.

**Common mistakes to avoid:**

- Turning the homepage into a blog or link directory
- Adding reveal duration, particles, Lottie, or heavy client bundles
- Breaking Clarity replay (test replay-safe paths)
- Duplicating slug lists outside Intent Registry / keyword clusters
- Marketing copy in technical or internal docs

---

## Current Product Maturity

### Strengths

- End-to-end core loop works (create → invite → vote → reveal → share)
- Homepage conversion path with post-create share panel
- ~118 static routes; 100+ live landing pages; 6 primary pillars
- Build-time SEO/entity/GEO audits and growth tooling (`npm run audit:all`, `npm run growth:assistant`, `npm run quality:landing`, `npm run opportunities`, `npm run snippets:report`)
- Full GA4 funnel instrumentation
- Supabase-backed persistence
- itch.io launcher and distribution asset pipeline

### Weaknesses

- Organic traffic still early; Search Console baselines need consistent monitoring
- Reveal emotional arc not fully validated with users
- Weak structured “play again” replay loop
- Share virality not optimized
- Uneven long-tail page content (`missing_enhanced_intro` warnings in audits)
- SEO overlap on some similar slugs/titles
- Community distribution is manual (Reddit, Indie Hackers)

### Highest-leverage opportunities

1. **Convert search traffic to games** — Pillar and landing page CTR + CTA → `game_created`
2. **Improve results shareability** — What groups send back to the chat after reveal
3. **Replay loop** — Same group, new round, minimal friction
4. **Internal linking from pillars** — Boost underperforming P1 pages with impressions
5. **Validate reveal with Clarity** — Confirm first-time sessions feel like an event, not a wait

---

## Related Documents

| Document | Status |
|----------|--------|
| `/docs/PRODUCT_BIBLE.md` | **Available** — Full internal operating document |
| Discovery Blueprint | Planned |
| Roadmap | Partially covered in Product Bible §9 |
| Decisions log | Partially covered in Product Bible §6–7 |

**Also useful in repo:**

- `public/about-friendrank.md` — Factual product description for external/AI citation
- `lib/growth/README.md` — Growth KPIs and Search Console workflow
- `lib/geo/README.md` — GEO layer overview
- `lib/landing-pages/planning/README.md` — Landing page and internal linking model
- `AGENTS.md` — Next.js agent rules for this repo

---

*When in doubt: protect the core loop, preserve architecture, revert if not clearly better.*
