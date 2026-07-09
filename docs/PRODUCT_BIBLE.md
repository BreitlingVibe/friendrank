# FriendRank Product Bible

**Version:** 1.0  
**Status:** Internal operating document  
**Last updated:** July 2026  
**Canonical product URL:** https://friendrank.app

This document is the practical source of truth for what FriendRank is, how it is built, what we have decided, and what we do next. It is not marketing copy.

---

## 1. Product vision

### What FriendRank is

FriendRank is a free, browser-based **social voting game** for friend groups. A host creates a game on the homepage, shares one link, and friends vote on humorous personality roles (Main Character, Chaos Agent, Secret Villain, and others). When enough votes are collected, the group unlocks aggregated results: ranked roles, group narrative sections, and shareable output.

The core experience is **multiplayer-first**, **mobile-friendly**, and **link-based** — no app install, no account required for players.

### What problem it solves

Friend groups need a low-friction way to turn inside jokes, group dynamics, and “who would win what title” energy into a shared moment. FriendRank replaces ad-hoc polls and screenshot chaos with:

- One link that works in any group chat
- Anonymous-ish voting (device token, aggregated results)
- Structured, shareable group story output

### What FriendRank is not

- **Not a social network** — no profiles, feeds, or persistent identity
- **Not a quiz platform with right answers** — votes are subjective group opinion
- **Not a content blog or directory** — SEO pages exist to bring people to the game loop, not to become the product
- **Not an AI-first product (yet)** — AI/GEO layers support discovery and readability; the product is still create → invite → vote → reveal
- **Not a performance showcase** — fast enough on real devices matters more than animation density

### North Star

**A host creates a game, friends vote within minutes, and the group gets a result they want to screenshot and share.**

Secondary north stars:

1. Organic discovery converts search visitors into game creation (`game_created`)
2. Invite/share loop drives return visits and word-of-mouth (`invite_link_copied`, `vote_submitted`, `results_unlocked`)
3. Pages are understandable by humans, search engines, and AI assistants without duplicating or cannibalizing intent

---

## 2. Product principles

These principles govern sprint decisions. When in doubt, apply them in order.

### Emotion over complexity

The product should feel fun, social, and memorable — not like software doing work. Prefer copy, pacing, and clarity over new UI layers, animation systems, or configuration.

**Test:** Would a first-time user describe this as exciting or as waiting?

### Multiplayer first

Every feature should strengthen the group loop: create, invite, vote, reveal, share. Single-player or solo-browsing features are secondary unless they clearly feed creation.

### Fast before flashy

Ship responsiveness and reliability before visual spectacle. Code-splitting and polling optimizations are valid when they protect the core loop; decorative motion is not.

### Search and AI readability support the product

SEO, GEO, structured data, and internal linking exist to **bring the right people to game creation**. They do not replace the game experience or turn pages into keyword farms.

### Every sprint should improve user perception or business value

A sprint must either:

- Make the core loop feel better to real users, or
- Improve measurable discovery, conversion, or retention signals

Refactors, tooling, and “nice to have” polish need an explicit hypothesis tied to one of the above.

### If an improvement is not clearly better, revert or stop

Not every sprint should ship. If a change increases complexity, hurts readability, breaks replay/analytics tooling, or fails a gut-check with real users — revert and document the lesson.

### Additional operating rules

- **Playful chaos/lore tone, but maintain clarity** — FriendRank can be funny and dramatic; users must always understand what to do next
- **Pillars before long-tail** — category authority pages come before spraying low-intent URLs
- **Homepage is a product surface, not a blog** — discovery supports creation; it does not replace it
- **Use data tools for decisions, not vibes** — Google Search Console, GA4, Vercel Analytics, and Microsoft Clarity inform UX and growth; they do not auto-drive rewrites

---

## 3. Current product architecture

End-to-end flow from discovery to payoff:

```
Homepage
  → Pillar pages (evergreen hubs)
    → Evergreen / long-tail landing pages
      → Game creation (homepage #create-game)
        → Invite / share (game link)
          → Voting (/game/[share_code])
            → Reveal / results
              → Share card / replay
```

### Homepage (`/`)

Primary conversion surface. Sections include hero, game creation form, categories, discovery (pillar cards), why FriendRank, reveal preview, how it works, FAQ, and bottom CTA. Game creation happens here; successful creation shows the post-create share panel without leaving the page.

### Pillar pages (evergreen hubs)

Category authority pages that group related intent. Examples:

| Pillar | Route |
|--------|-------|
| Friend games | `/friend-games` |
| Party games | `/party-games` |
| Team building games | `/team-building-games` |
| Relationship games | `/relationship-games` |
| Icebreaker games | `/icebreaker-games` |
| Question games | `/question-games` |

Supporting hub-style pages include `/anonymous-voting-games`, `/browser-party-games`, and similar cluster anchors.

Pillars link down to high-priority landing pages and back up through homepage discovery. They are built with the **Evergreen Hub Engine** (`lib/evergreen-hubs/`).

### Evergreen / long-tail landing pages

~100+ registry-driven static routes (e.g. `/best-friend-quiz`, `/office-icebreaker`, `/most-likely-to-generator`). Each page has metadata, schema, FAQ, CTA to homepage creation, and automatic internal linking via the **Landing Page Engine** (`lib/landing-pages/`).

Planning layer: Intent Registry + Keyword Clusters (`lib/landing-pages/planning/`).  
Legacy **Topic Hub Engine** (`lib/topic-hubs/`) remains an internal planning/resolver layer; public hub UI is served by evergreen hubs.

### Dynamic game pages (`/game/[share_code]`)

Server-rendered game session. Host and players land here after creation or invite. Host may see creation confirmation; players vote. Vote progress and results unlock state update as votes arrive. Excluded from sitemap.

### Game creation

Homepage form: friend names, vibe tags (up to 3), tone, optional inside joke, optional custom categories (up to 3). Five categories total per game. Persisted via Supabase through server actions (`app/actions/games`).

### Invite / share

Post-create panel: read-only invite link, copy action, vote-now link, “what happens next” guidance, live vote progress snippet. Share uses `getInviteLinkText` + `invite_link_copied` analytics.

### Voting

One question per category; tap to vote; progress indicator; duplicate-vote prevention via browser-local token. Live progress polling on game page (disabled in Clarity replay-safe mode).

### Reveal / results

When vote threshold is met, results unlock. Flow:

1. Optional reveal overlay sequence (~3.2s total, skippable with reduced motion / Clarity replay)
2. Hero emphasis on #1 category card
3. Cascaded sections: secondary categories, group vibe, dangerous combo, group reputation, ending card
4. Share section: preview, download, copy share text

Narrative copy is vibe/tone-aware (`lib/narrative/`). Reveal timing lives in `lib/reveal/`.

---

## 4. Current feature inventory

### Homepage

- Game creation form with progressive disclosure (optional fields collapsed)
- Live “your game is taking shape” preview
- Post-create share panel (Phase 21)
- Reveal preview section (static, pre-results curiosity)
- Pillar discovery cards with child links
- FAQ, how-it-works, bottom CTA
- Code-split below-fold sections for performance

### Pillar pages

- Evergreen hub layout: hero, sections, category cards, featured guides, comparison table, FAQ, structured data
- GEO + AI citation layers on assembly
- Internal links to live landing pages and sibling pillars

### Evergreen landing pages

- Intent-driven copy libraries (FAQ, benefits, questions, CTAs)
- Content quality, variation, and experience layers
- Automatic Related Games internal linking
- Per-page analytics `cta_clicked` locations
- Sitemap inclusion for live pages

### Game creation

- Server action persistence to Supabase `games` table
- Category builder with defaults + custom slots
- Tone and vibe tag influence on questions and narrative
- GA4: `game_creation_started`, `game_created`, `game_creation_abandoned`

### Invite / share flow

- Unique share codes / URLs
- Copy invite link (primary action)
- Vote now (secondary)
- Vote progress snippet on homepage post-create panel

### Voting

- Mobile-first tap UI
- Per-game vote storage and aggregation
- Unlock threshold based on group size (minimum 2)
- GA4: `vote_submitted`

### Reveal / results

- Timed reveal overlay (context-aware copy)
- Hero moment + cascade sections
- Category cards with group quotes and stats
- Group verdict, vibe, dangerous combo, reputation, ending card
- Share card export (preview, download, share, copy text)
- GA4: `results_unlocked`, share events
- Clarity replay-safe mode (disables animations/polling when replay detected)

### Analytics

| Tool | Role |
|------|------|
| **GA4** | Product funnel: creation, CTA, invite, vote, results, share |
| **Vercel Analytics** | Traffic and Web Vitals at platform level |
| **Microsoft Clarity** | Session replay and UX diagnosis; replay-safe guards in app code |

Events defined in `lib/analytics.ts`. Production-only firing for GA4.

### SEO / GEO

- Build-time audits: `npm run audit:all`, `npm run audit:index`, `npm run audit:entities`
- Canonical URLs, metadata, sitemap, robots
- Entity registry and knowledge graph (`lib/entities/`)
- GEO foundation + AI citation layers (`lib/geo/`)
- Search Console workflow documented in `lib/seo/SEARCH_CONSOLE.md`
- Growth tooling: priorities, CTR candidates, authority roadmap, campaign planner (`lib/growth/`)

### Distribution channels

| Channel | Status |
|---------|--------|
| **Organic search** | Primary; 100+ indexed intent pages + pillars |
| **Direct / referral** | Game links, word of mouth |
| **itch.io** | Static launcher ZIP → `https://friendrank.app` (`distribution/itch-launcher/`) |
| **Reddit** | Manual, authentic participation; assets via growth tooling |
| **Indie Hackers** | Presence for builder audience; manual posting |
| **Pinterest / LinkedIn / outreach** | Documented in growth playbook; no auto-publishing |
| **AI directories / GEO** | Prepared metadata; no runtime AI features |

Domain/DNS: **Cloudflare** fronting production on **Vercel**.

---

## 5. Technical stack

| Layer | Technology |
|-------|------------|
| Framework | **Next.js** (App Router, React Server Components, server actions) |
| Hosting | **Vercel** |
| Database | **Supabase** (PostgreSQL, anon client + RLS) |
| Product analytics | **Google Analytics 4** (`@next/third-parties/google`) |
| Platform analytics | **Vercel Analytics** |
| Session replay | **Microsoft Clarity** |
| Search monitoring | **Google Search Console** (manual weekly review) |
| DNS / CDN | **Cloudflare** |
| Distribution | **itch.io** launcher package |
| Community | **Reddit**, **Indie Hackers** (manual) |

Validation before deploy:

```bash
npm run audit:all
npm run build
```

---

## 6. Important decisions

Decisions that should not be re-litigated without new data:

| Decision | Rationale |
|----------|-----------|
| **Playful chaos/lore tone, but clarity first** | Humor drives shares; confusion kills conversion |
| **Build pillars before long-tail pages** | Topical authority and internal linking scale better than isolated URLs |
| **Homepage stays a product surface, not a blog/directory** | SEO supports creation; the form is the hero |
| **Freeze homepage unless data shows issues** | Homepage UX is good enough after Phases 19–21; further churn has high regression cost |
| **Phase 22 reveal storytelling: copy-first, no visual tricks** | Sprint 1 added typography/color/cascade effects; Sprint 2 removed them. More overlay text alone did not improve emotion — it still read as “loading” |
| **Keep reveal duration ~3.2s; redistribute ms, do not add waits** | Longer reveals feel like delays, not drama |
| **Clarity replay-safe mode is mandatory** | Performance/replay fixes that break session replay are unacceptable; disable polling/animations in replay instead |
| **No performance optimization without a measured bottleneck** | Code-splitting was valid for homepage; reverting game-page splits when they broke Clarity was correct |
| **Search Console + Clarity guide UX/growth, not hunches** | Title/meta changes only after impressions + weak CTR; UX changes validated in replay |
| **Revert or stop when not clearly better** | Applies to reveal copy, homepage experiments, and SEO page churn |
| **Discovery architecture extends pillars, does not replace them** | New discovery work links into existing evergreen hubs |
| **GEO/AI layers are build-time metadata** | No runtime LLM calls in product until core loop is proven |
| **No auto-publishing to Reddit or forums** | Spam risk outweighs short-term traffic |

---

## 7. Lessons learned

### Not every sprint should stay

Phase 22 taught that iterative reveal copy can still feel like a loading sequence. Sprint 1 visual emphasis did not fix perception; Sprint 2 refocused on narrative arc and removed visual tricks. If users still describe the wait as “loading,” simplify further or shorten copy — do not add effects.

### Performance fixes can introduce product/replay risk

Homepage code-splitting helped. Dynamic imports on the game results page conflicted with Microsoft Clarity replay (React #185). Fix: replay-safe guards + static imports where replay matters. **Measure before optimizing; validate in Clarity after.**

### More reveal text did not improve emotion

Overlay lines like “Almost there…” and process verbs (“Loading…”, “Syncing…”) hurt more than they helped. Story-framed copy (“Every vote told part of the story…”) is directionally correct but must stay **short and readable**. If the overlay is hard to read on mobile, cut words, not add styling.

### Homepage is good enough to freeze unless data shows issues

Progressive disclosure, live preview, post-create share panel, and reveal preview landed well. Avoid homepage layout churn without GA4/Clarity evidence (drop-off on create, share, or vote).

### Discovery architecture must build on pillars, not replace them

Topic hub planning (`lib/topic-hubs/`) and evergreen hub pages serve the same strategic goal. Public discovery should deepen pillar ↔ landing ↔ homepage links, not introduce parallel hub systems or homepage directory sprawl.

### SEO scale needs discipline

100+ live pages create overlap warnings (singular/plural slugs, similar titles). Triage with Search Console: ignore safe overlap, monitor competing queries, fix metadata only when impressions justify it.

### Growth tooling ≠ growth results

`lib/growth/` produces priorities, assets, and checklists. Publishing remains manual. Weekly cadence: Search Console + GA4 → max 3 actions.

---

## 8. Current state

### Strong

- **Core loop works end-to-end** — create, invite, vote, reveal, share
- **Homepage conversion path** — form, preview, post-create share, discovery cards
- **SEO infrastructure** — landing page engine, audits, sitemap, entity graph, internal linking
- **Pillar + long-tail coverage** — 6 primary pillars, 100+ live intent pages, 118 static routes
- **Analytics instrumentation** — full funnel events in GA4
- **GEO/AI readiness** — build-time foundation on indexable pages
- **Growth operating system** — Search Console plan, CTR candidates, campaign planner, distribution registry
- **Clarity replay safety** — guards prevent replay breakage
- **Distribution assets** — itch.io launcher, promotional image pack

### Weak

- **Organic traffic still early** — Search Console baselines need consistent weekly review
- **Reveal emotional arc unproven** — copy improved twice; user testing still needed to confirm “exciting” vs “waiting”
- **Replay loop underdeveloped** — no strong “play again with same group” habit loop beyond manual re-create
- **Results shareability** — share card exists; viral coefficient not yet optimized
- **Long-tail page intros** — many pages flagged `missing_enhanced_intro`; content depth uneven
- **Overlap / cannibalization** — similar slugs and titles need ongoing Search Console monitoring
- **No lightweight AI personalization in product** — intentional deferral until core loop metrics justify it
- **Community distribution manual** — Reddit / Indie Hackers presence depends on founder cadence, not product hooks

---

## 9. Strategic roadmap

Prioritized directions. Not a commitment timeline — a decision stack.

### Near term (prove the loop)

1. **Validate reveal + results with Clarity and user feedback** — watch first-time sessions; cut overlay copy if readability fails
2. **Results / shareability** — improve what groups screenshot and send back to the chat (copy, share text, card layout) without new animation systems
3. **Replay loop** — reduce friction to “one more round” with same friends (UX only; no backend scope creep without hypothesis)
4. **Search Console + GA4 weekly cadence** — impressions → clicks → `game_created` per pillar and top landing pages

### Medium term (discovery)

5. **Discovery Blueprint** *(document to create)* — single map of homepage → pillars → landing pages → CTAs; governs new links and sections
6. **Organic discovery / internal linking** — strengthen pillar ↔ landing ↔ homepage paths using existing registries; no duplicate hub systems
7. **Supporting long-tail pages** — ship planned intents from registry when clusters have pillar coverage; enhance intros on pages with rising impressions
8. **`AI_CONTEXT.md`** *(document to create)* — concise machine-readable product summary for AI assistants, support, and directory submissions; aligns with GEO layer

### Long term (after core loop metrics)

9. **Lightweight AI personalization** — only after creation, vote completion, and share rates justify it; must not slow mobile create flow
10. **Authority and distribution** — classroom, team, party resource outreach; Pinterest; authentic Reddit; itch.io listing maintenance
11. **Monetization** — documented in growth roadmap as future option; no sprint until traffic and usage thresholds met

### Explicitly out of scope until proven

- New animation libraries, particles, Lottie, heavy client bundles
- Runtime LLM features in the vote/reveal path
- Homepage redesign or blogification
- Performance refactors without Clarity/Web Vitals evidence
- Auto-posting to communities

---

## Appendix: Key file map

| Area | Location |
|------|----------|
| Homepage | `components/homepage/`, `app/page.tsx` |
| Game page | `app/game/[share_code]/` |
| Landing pages | `lib/landing-pages/`, `app/{slug}/page.tsx` |
| Evergreen pillars | `lib/evergreen-hubs/`, `components/evergreen-hubs/` |
| Game logic | `lib/game-build.ts`, `lib/votes/` |
| Narrative / results | `lib/narrative/`, `lib/results/` |
| Reveal | `lib/reveal/`, `components/friend-rank-reveal.tsx` |
| Analytics | `lib/analytics.ts` |
| SEO audits | `scripts/audit-all.ts`, `lib/seo/` |
| Growth playbook | `lib/growth/README.md` |
| GEO | `lib/geo/README.md` |
| Supabase | `lib/supabase.ts`, `supabase/migrations/` |

---

## Document maintenance

Update this bible when:

- A strategic decision is made and kept (or reverted with reason)
- A major system is added or retired (e.g. new pillar, new analytics event)
- The core loop changes (vote rules, unlock threshold, creation fields)
- A sprint lesson applies to future work

Do **not** update for routine landing page copy or individual metadata tweaks — those live in registries and content libraries.

**Owner:** Product / founder  
**Review cadence:** After each phase sprint or monthly, whichever comes first
