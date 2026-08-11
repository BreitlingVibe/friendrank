# FriendRank Technical Handover

**Generated:** 2026-08-11  
**Repo:** local FriendRank / Project-A (GitHub: `BreitlingVibe/friendrank`)  
**Production URL:** `https://friendrank.app`  
**Branch observed:** `main`  
**Purpose:** Durable technical reference for pausing active development and resuming later.  
**Scope:** Code and config inspection only. No product/code changes except this document.

---

# 1. PRODUCT / SYSTEM OVERVIEW

FriendRank is a **browser-based anonymous group voting game**. One host creates a game with friend names, shares a link, participants vote privately on phones, and results unlock when enough votes arrive, followed by a cinematic reveal and share cards.

| Layer | Current stack |
| --- | --- |
| Framework | **Next.js 16.2.9** (App Router), **React 19.2.4**, **TypeScript 5** |
| Styling | **Tailwind CSS v4** (`app/globals.css`, PostCSS) |
| Frontend | Mostly **client components** for gameplay/homepage create flow; many SEO pages are thin server wrappers around data assemblies |
| Backend | **Next.js Server Actions** (`app/actions/games.ts`, `app/actions/votes.ts`) — no separate API server |
| Database | **Supabase** (Postgres) via `@supabase/supabase-js` anon client (`lib/supabase.ts`) |
| Hosting | **Vercel** (inferred from `@vercel/analytics`, `@vercel/speed-insights`, README deploy notes; **no `vercel.json` in repo**) |
| Analytics | GA4 (`@next/third-parties/google` + `lib/analytics.ts`), Vercel Analytics, Speed Insights, Microsoft Clarity |
| External services | Supabase; Clarity CDN; Google Analytics (prod); Vercel Analytics/Speed Insights |
| Patterns | Registry-driven SEO (landing / evergreen hubs / categories / entities); deterministic category/question build in `lib/game-build.ts`; narrative generators for results copy; share-code public games under `/game/[share_code]` |

**Not present in repo:** auth/accounts, payments/Stripe, admin UI, edge middleware auth, service-role Supabase key usage.

---

# 2. REPOSITORY MAP

## Top-level

| Path | Responsibility |
| --- | --- |
| `app/` | Routes: homepage, ~101 intent landings, evergreen hubs, category hubs, `/game/[share_code]`, `sitemap.ts`, `robots.ts`, icons, server actions |
| `components/` | UI: homepage, landing pages, evergreen hubs, voting, reveal, results, share card |
| `lib/` | Domain logic: game build, games/votes repositories, analytics, SEO, entities, growth tooling |
| `supabase/migrations/` | SQL source of truth for `games` and `vote_sessions` |
| `scripts/` | Audit/growth/quality CLI (`audit:all`, CTR, distribution, etc.) |
| `docs/` | Product/SEO/growth docs + **this handover** |
| `public/` | Brand/icons/OG/distribution assets |
| `hooks/` | Client hooks (e.g. live vote progress, Clarity replay-safe mode) |
| `distribution/` | Itch/distribution packaging artifacts |

## Where to look later

| If you need to change… | Look here |
| --- | --- |
| Homepage create UX | `components/homepage/home-page.tsx`, below-fold sections under `components/homepage/` |
| Game persistence | `app/actions/games.ts` → `lib/games/repository.ts` |
| Categories / questions generation | `lib/game-build.ts` |
| Voting UI | `components/vote-game.tsx`, `components/game-voting-section.tsx` |
| Vote persistence / unlock | `lib/votes/repository.ts`, `lib/votes/constants.ts`, `app/actions/votes.ts` |
| Results aggregation | `lib/votes/aggregate.ts`, `lib/votes/results.ts` |
| Cinematic reveal | `components/friend-rank-results-with-reveal.tsx`, `components/friend-rank-reveal.tsx`, `lib/reveal/` |
| Results narrative/copy | `lib/narrative/`, `lib/results/presentation.ts` |
| Share cards | `components/friend-rank-results-share-section.tsx`, `lib/share/`, `components/friend-rank-share-card*.tsx` |
| Analytics events | `lib/analytics.ts` + call sites listed in §6 |
| Intent landing pages | `lib/landing-pages/landing-page-data.ts` + `lib/landing-pages/content/` + `app/<slug>/page.tsx` |
| Evergreen hubs | `lib/evergreen-hubs/*`, `components/evergreen-hubs/` |
| Category hubs | `lib/discovery/category-registry.ts`, `app/categories/*/page.tsx` |
| Entities / internal linking | `lib/entities/` |
| Metadata / canonical / OG | `lib/seo/page-metadata.ts`, `lib/seo/site-metadata.ts`, `lib/app-url.ts` |
| Sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |
| Supabase client | `lib/supabase.ts` |
| Share URL helpers | `lib/game-url.ts`, `lib/game-url-server.ts`, `lib/share-code.ts` |
| Snippet experiments | `lib/growth/snippet-optimization/experiment-registry.ts`, `docs/GROWTH_EXPERIMENTS.md` |

---

# 3. END-TO-END PRODUCT FLOW

## Homepage → create

| Step | Files | Persistence | Analytics |
| --- | --- | --- | --- |
| View `/` | `app/page.tsx` → `components/homepage/home-page.tsx` | — | Vercel/GA pageviews (no custom `homepage_viewed`) |
| Hero CTA | `home-page.tsx` scrolls to `#create-game` | — | `cta_clicked` (`hero_start`) |
| Form started | First form interaction | — | `game_creation_started` (once/session) |
| Submit | `handleGenerateGame` → `createGameAction` | Insert `games` | `cta_clicked` (`form_submit`) then `game_created` on success |
| Invite UI | `homepage-game-created-panel.tsx` | — | `invite_link_copied` (`game_id` = share code) |

**Validation:** ≥2 friends (`MIN_GROUP_FRIENDS`); max 8 names; tone required (defaults to `"Funny"`); button disabled until enough friends.

## Persist game

- **Action:** `createGameAction` (`app/actions/games.ts`)
- **Repo:** `createGame` inserts `share_code`, `friends`, `vibe_tags`, `custom_categories`, `tone`
- **Share code:** `generateShareCode()` — 10-char base64url from `randomBytes` (`lib/share-code.ts`), collision retries ×5
- **Not persisted:** `extraContext` (“Inside jokes”) — see §5

## Participant opens game

| Step | Files | Notes | Analytics |
| --- | --- | --- | --- |
| `/game/[share_code]` | `app/game/[share_code]/page.tsx` | `force-dynamic`; `notFound()` if missing | — |
| Body | `game-page-body.tsx` | Loads game, progress, optional results | `game_page_opened` (once/session/game; share code **not** sent to GA) |
| Summary | `game-summary.tsx` | Share URL display | — |

`robots.ts` **disallows** `/game/`. Sitemap **excludes** game URLs.

## Voting

| Step | Files | DB | Analytics |
| --- | --- | --- | --- |
| Vote UI | `VoteGame` in `game-voting-section.tsx` | — | `voting_started` on first selection |
| Submit ballot | `submitVoteAction` → `submitVoteSession` | Insert `vote_sessions` | `vote_submitted` after successful full ballot |
| Progress | `getVoteProgress` | Count sessions; `hasVoted` by `voter_token` | — |
| Voter identity | `lib/voter-token.ts` | `localStorage` UUID per share code | — |

**Unlock rule** (`lib/votes/constants.ts`):

- Required votes = `max(2, friendCount)`
- Legacy: games with `created_at` **before** `2026-06-23T00:00:00.000Z` can unlock at **3** votes even if friend count would require more

## Results → reveal → share → loop

| Step | Files | Analytics |
| --- | --- | --- |
| Unlock + load results | `getGameResultsAction` / aggregate | `results_unlocked` when unlocked + results loaded (once/client ref) |
| Cinematic reveal | `FriendRankResultsWithReveal` | `reveal_started` / `reveal_completed` (once/session/game; skipped if reduced-motion / Clarity-safe) |
| Results UI | `FriendRankResultsView` | — |
| Share card | `friend-rank-results-share-section.tsx` | `share_card_previewed`, `share_card_shared`, `share_card_downloaded`, `copy_share_text` |
| Create own | Link in `game-page-body.tsx` → `/` | `create_own_game_clicked` (`location: "post_game"`) |

---

# 4. DATABASE / SUPABASE

Migrations in repo (authoritative for intended schema):

## Table: `games`

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | UUID PK | Internal game id |
| `share_code` | TEXT UNIQUE | Public route key |
| `created_at` | TIMESTAMPTZ | Creation time; used in legacy unlock |
| `friends` | TEXT[] | Participant name list |
| `vibe_tags` | TEXT[] | Optional vibe tags |
| `custom_categories` | TEXT[] | Up to 3 custom category strings |
| `tone` | TEXT | Tone enum string |

**RLS (migration):** enabled; policies allow **INSERT** and **SELECT** for `anon` and `authenticated` with `WITH CHECK (true)` / `USING (true)`.  
**No UPDATE/DELETE policies** in migration files.

## Table: `vote_sessions`

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | UUID PK | Session id |
| `game_id` | UUID FK → `games(id)` CASCADE | Parent game |
| `voter_token` | TEXT | Client-generated anonymous voter id |
| `choices` | TEXT[] | One friend name per category/question |
| `created_at` | TIMESTAMPTZ | Vote time |

**Constraint:** `UNIQUE (game_id, voter_token)` — one completed ballot per voter token per game.

**RLS:** same public insert/select pattern as `games`.

## Relationships

`games` 1—* `vote_sessions` via `game_id`.

## Server actions touching DB

- `createGameAction` → insert `games`
- `submitVoteAction` → insert `vote_sessions` + read progress
- `getVoteProgressAction` / `getGameResultsAction` → read

## Dangerous to change without care

- Share-code uniqueness / collision retry
- `voter_token` uniqueness (re-vote / double-submit behavior)
- Unlock threshold helpers and `DYNAMIC_VOTES_REQUIRED_SINCE`
- Public RLS (anyone with anon key can read all games/votes — **privacy assumption**)
- Dropping columns that production rows already use

## UNKNOWN / VERIFY IN SUPABASE

- Whether migrations were applied **exactly** as in repo (dashboard drift)
- Indexes beyond those in SQL files
- Actual row counts / retention
- Whether service role or additional policies exist outside repo
- Whether realtime or edge functions are enabled (none referenced in app code)

**Secrets:** never commit `.env.local`. Client uses **anon** key only (`NEXT_PUBLIC_SUPABASE_*`).

---

# 5. GAME GENERATION / CONTENT SYSTEM

Primary module: **`lib/game-build.ts`**.

## Name parsing

- `parseEnteredGroupNames`: split on **commas and newlines only** (not ordinary spaces)
- Trim, drop empties, **max 8**
- Helper `shouldHintFriendNameSeparators` when multi-word input without separators yields one “friend”
- `parseGroupNames`: falls back to `DEFAULT_FRIENDS` for preview when empty

## Tone

- Options: `Funny` | `Savage but friendly` | `Wholesome` | `Chaotic`
- **Persisted** on `games.tone`
- Does **not** change category/question labels in `buildGameCategories` / `generateFriendRankQuestions`
- Affects **results narrative** later (`lib/narrative/*` keyed off `game.tone`)

## Categories / vibes / custom

- Default pool: `FRIEND_RANK_CATEGORIES` (roles + “Most …” style)
- Final game uses **`GAME_CATEGORY_COUNT = 5`** categories via `buildGameCategories`
- Custom category inputs (up to 3) can replace/supplement defaults; **persisted**
- Vibe tags (`VIBE_TAGS`, max 3): **persisted**; used in narrative/theme helpers, **not** in category selection

## Inside jokes (`extraContext`)

| Stage | Behavior |
| --- | --- |
| UI | Collected in homepage optional personalization |
| Client `buildGeneratedGame` | Included on in-memory `GeneratedGame` |
| `createGameAction` / DB | **Not sent / not stored** (`CreateGameInput` has no `extraContext`) |
| Reload from DB | `buildGeneratedGameFromRecord` sets `extraContext: ""` |

**Flag:** Inside jokes are **collected but unused for persisted games**. Narrative helpers *can* consume `extraContext` if present, but production game pages rebuild from DB without it.

## Questions

- Derived deterministically from category labels (`generateFriendRankQuestions`)
- Custom categories may supply normalized questions via `normalizeCustomCategoryInput`

## Determinism / randomness

- Category selection from fixed list order (deterministic given customs)
- Share codes are **random**
- Voter tokens are **random UUIDs**
- Reveal narrative generators use structured templates (inspect `lib/narrative` before assuming RNG)

## Persisted vs client-only

| Data | Persisted | Client-only / ephemeral |
| --- | --- | --- |
| friends, tone, vibe_tags, custom_categories, share_code | Yes | |
| Generated questions/categories at play time | Rebuilt from record | Preview also client-built |
| extraContext | No | Yes (create session only) |
| Votes | `vote_sessions.choices` | |

---

# 6. ANALYTICS / FUNNEL INSTRUMENTATION

## Stack (from `app/layout.tsx` + `lib/analytics.ts`)

| Provider | Role |
| --- | --- |
| **Vercel Analytics** | Automatic Web Analytics pageviews (`<Analytics />`) — no custom `track()` calls in repo |
| **GA4** | `GoogleAnalytics` when production + `NEXT_PUBLIC_GA_MEASUREMENT_ID`; custom events via `sendGAEvent` |
| **Speed Insights** | `<SpeedInsights />` performance |
| **Microsoft Clarity** | `components/microsoft-clarity.tsx`, `afterInteractive`, production only |

**Important:** `trackEvent` in `lib/analytics.ts` **no-ops unless `NODE_ENV === "production"`**. Local/dev will not emit GA custom events.

## Custom product events

| Event | Where it fires | Properties | Dedup | Funnel question |
| --- | --- | --- | --- | --- |
| `cta_clicked` | Homepage CTAs, landing CTAs, hub explore | `location` (large enum) | None | Which CTA drove action? |
| `game_creation_started` | First create-form interaction | `friend_count`, `selected_tone`, `selected_vibe_count` | Once/browser session | Did creation begin? |
| `game_creation_abandoned` | `pagehide`/unmount if started & not completed | same snapshot fields | Once/session; requires started | Did they leave mid-create? |
| `game_created` | After successful `createGameAction` | `friend_count`, `tone`, `custom_categories_used`, `category_count` | None | Successful creates |
| `invite_link_copied` | Homepage invite panel copy | `game_id` (**share code**) | None | Did host copy invite? |
| `game_page_opened` | `GamePageBody` mount (valid game) | none | Once/session/**game** (key local only) | Was game URL opened? |
| `voting_started` | First live vote tap | `question_count`, `friend_count` | Once/session/game | Did voting begin? |
| `vote_submitted` | After successful full ballot | `question_index`, `question_count` | None | Completed ballot? |
| `results_unlocked` | Unlock + results loaded | `friend_count`, `vote_count` | Once/client via ref | Did group unlock? |
| `reveal_started` | Cinematic path starts | none | Once/session/game | Reveal began? |
| `reveal_completed` | Cinematic sequence `onComplete` | none | Once/session/game | Reveal finished? |
| `create_own_game_clicked` | Post-game link | `location: "post_game"` | None | Viral loop click? |
| `share_card_previewed` | Share UI | none | None | Previewed share card? |
| `share_card_shared` | Native/share success | none | None | Shared results? |
| `share_card_downloaded` | Download success | none | None | Downloaded card? |
| `copy_share_text` | Copy share text button | none | None | Copied share text? |

Game-scoped dedup uses sessionStorage keys like `friendrank_ga_<event>:<shareCode>` — **share code is not sent to GA** for those events (unlike `invite_link_copied`).

## Measurable funnel (current)

Visitor (pageview) → `game_creation_started` → `game_created` → `invite_link_copied` → `game_page_opened` → `voting_started` → `vote_submitted` → `results_unlocked` → `reveal_*` → share / `create_own_game_clicked`

## Known measurement gaps (do not implement now)

- No first/second-friend milestones
- No distinct “player joined” ordinal (only page open)
- `vote_submitted` is full ballot, not per-question; no `game_id` on vote events
- Homepage view is pageview-only
- Inside-jokes field unused → no related analytics
- Dev/staging custom events silent

---

# 7. SEO / DISCOVERY ARCHITECTURE

## Route inventory (approximate, from registries + build)

| Surface | Count / notes |
| --- | --- |
| Homepage | `/` |
| Intent landing pages | **101** (`LANDING_PAGES`) |
| Evergreen hubs | **8** (party, friend, team-building, relationship, question, browser-party, anonymous-voting, icebreaker) |
| Category hubs (`/categories/...`) | **4 live** in registry (+ seed entries) |
| Topic hubs | **0** (`TOPIC_HUBS` empty array) |
| Game pages | Dynamic `/game/[share_code]` — **noindex via robots disallow**, not in sitemap |

## How pages are built

1. **Intent registry / planning:** `lib/landing-pages/planning/` (roadmap; not all planned = live)
2. **Assemble:** `assembleLandingPage()` in `landing-page-data.ts` (benefits, FAQ enrichment, variation, GEO/AI citation layers, entities, recommendations)
3. **Route file:** `app/<slug>/page.tsx` exports metadata + `<IntentLandingPage page={...} />`
4. **Evergreen:** data modules under `lib/evergreen-hubs/*` + `EvergreenHubPage`
5. **Categories:** `CATEGORY_REGISTRY` + `app/categories/<slug>/page.tsx`

## Technical SEO

| Concern | Location |
| --- | --- |
| Canonical / meta / OG | `lib/seo/page-metadata.ts`, `PRODUCTION_APP_URL` in `lib/app-url.ts` |
| Site JSON-LD | `FriendRankStructuredData`, `lib/seo/site-metadata.ts` |
| Homepage FAQ schema | `homepage-faq-structured-data.tsx` |
| Sitemap | `app/sitemap.ts` |
| Robots | `app/robots.ts` — allow `/`, disallow `/game/` |
| Audits | `npm run audit:all` → `scripts/audit-all.ts` |

## Internal linking

- Landing related games / recommendations (`internal-links.ts`, `page-recommendations.ts`)
- Homepage pillar discovery (`homepage-pillar-discovery.ts`)
- Entity navigation chips

## Adding new SEO pages without thin duplicates

Follow `lib/landing-pages/planning/README.md`:

1. Add intent to registry (`planned` → later `live`)
2. Assign keyword cluster
3. Wire content libraries + `assembleLandingPage`
4. Add `app/<slug>/page.tsx`
5. Ensure entities/links/sitemap inclusion via registries
6. Run `npm run audit:all` and `npm run build`
7. Avoid near-duplicate slugs/titles (audit already warns on pairs like `birthday-party-game` / `birthday-party-games`)

**Do not casually retitle** `/group-voting-game` while snippet experiment `voting-game-online-ctr-test` is `pending_measurement` (`lib/growth/snippet-optimization/experiment-registry.ts`).

---

# 8. PERFORMANCE

## Current setup (code-verified)

| Item | State |
| --- | --- |
| Geist Sans | Loaded via `next/font`; CSS variable `--font-geist-sans`; `body` uses `font-family: var(--font-geist-sans), system-ui, sans-serif` |
| Geist Mono | Still registered for `font-mono`, but **`preload: false`** (not critical-path preloaded) |
| Homepage orbs | Reduced cost vs original: ~480/320px, lower opacity, `blur-[72px]` / `blur-[64px]` (`home-page.tsx`) |
| Speed Insights | Enabled in root layout |
| Homepage architecture | Large `"use client"` create surface; below-fold `dynamic()` import (still SSR’d into HTML) |

## Remaining risks (do not optimize in this pause)

- Render-blocking global CSS weight
- Large client JS + hydration for homepage create form
- Third-party scripts (Clarity / GA / Vercel) on main thread
- Decorative blurs still have GPU cost on low-end mobile
- Gradient `bg-clip-text` H1 likely LCP text element

**Evaluate desktop and mobile separately** in Vercel Speed Insights / CrUX; mobile LCP historically more sensitive.

---

# 9. DEPLOYMENT / ENVIRONMENT

## Pipeline

```
Local repo → Git → GitHub (BreitlingVibe/friendrank) → Vercel → https://friendrank.app
```

No `vercel.json` in repository; deployment assumed to be Vercel project defaults connected to GitHub `main`. **VERIFY IN VERCEL** exact production branch and env sync.

## Environment variables (names only)

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public key |
| `NEXT_PUBLIC_APP_URL` | Optional absolute origin for share links |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement id (prod GA component) |
| `NODE_ENV` | Framework; gates analytics/Clarity |
| `FRIENDRANK_ICON_SOURCE` | Optional, brand asset generation script only |

## Commands

| Command | Use |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build / typecheck |
| `npm run start` | Serve production build locally |
| `npm run audit:all` | Full SEO/entity/index quality audit |
| `npm run lint` | ESLint |
| Other `growth:*` / `quality:landing` / `snippets:report` | Growth tooling — optional |

## Standard pre-push verification

```bash
npm run build
npm run audit:all
```

README also mentions `audit:index` for SEO/routing work.

---

# 10. CURRENT KNOWN WARNINGS / TECHNICAL DEBT

## Verification run (2026-08-11)

| Check | Result |
| --- | --- |
| `npm run build` | **PASS** |
| `npm run audit:all` | **PASS** — **0 errors**, **34 warnings** |

Warnings are **pre-existing / non-blocking** for deploy:

- **4** search-overlap (similar slug/title pairs)
- **30** `content.missing_enhanced_intro` on various landings

## TODO/FIXME

Repo search found **no** `TODO` / `FIXME` / `HACK` markers in `*.ts` / `*.tsx` at audit time.

## Debt classification

### A. Harmless / low priority

- Missing enhanced intros (audit warnings)
- Empty topic hub registry (feature reserved, unused)
- Seed category registry entries without live routes
- Large SEO content surface relative to core gameplay code

### B. Worth revisiting

- Homepage entirely client-heavy create flow (perf + maintainability)
- Inside jokes UI field unused downstream
- Public RLS read of all games/votes (privacy/abuse surface)
- Near-duplicate landing slug pairs
- Snippet experiment still `pending_measurement` for `/group-voting-game`

### C. Potentially dangerous

- Changing unlock thresholds / legacy date without migrating expectations for live games
- Tightening RLS without breaking anon create/vote
- Renaming share_code format or vote_sessions uniqueness
- Shipping SEO title changes that invalidate unfinished CTR experiments
- Relying on `extraContext` for product behavior without schema + persistence

---

# 11. DO-NOT-BREAK LIST

| Area | Why sensitive |
| --- | --- |
| Vote unlock (`getVotesRequired` / `isResultsUnlocked` + legacy date) | Controls when results appear; breaks in-flight games if changed casually |
| `vote_sessions` unique `(game_id, voter_token)` | Prevents double ballots; changes alter anonymity/abuse model |
| Share-code generation + `/game/[share_code]` routing | Breaks all invite links |
| `games` / `vote_sessions` schema + RLS | Production data + client anon access model |
| Analytics production gate + session dedupe keys | Corrupts funnel history if renamed without GA plan |
| `robots` disallow `/game/` + sitemap exclusions | Accidentally indexing private games |
| Canonical/`PRODUCTION_APP_URL` assumptions | Duplicate/canonical SEO damage |
| Reveal start/complete vs `results_unlocked` separation | Measurement + UX timing |
| Category count = 5 + question generation | Changes every new game’s length/feel |
| Name parsing (comma/newline only, max 8, min 2) | Activation UX + validation |
| Snippet experiment registry pending entries | Contaminates CTR tests |
| Anon Supabase client without service role in app | Introducing service key to client would be a security incident |

---

# 12. SAFE RESUME CHECKLIST

1. `git pull origin main` (or current production branch — **VERIFY IN VERCEL**)
2. `npm install` only if `node_modules` / lockfile drift
3. Confirm `.env.local` has Supabase (+ optional GA / APP_URL) **names present**; restart after changes
4. `npm run build`
5. `npm run audit:all` (expect 0 errors; note warning count)
6. Local: homepage create with ≥2 names → success panel + copy invite
7. Open `/game/<code>` in a second browser/profile → vote
8. Repeat until unlock threshold (`max(2, friendCount)`) → confirm results + reveal
9. Click “Create your own FriendRank” → lands `/`
10. Production smoke: same flow on `friendrank.app`
11. Spot-check SEO: `/`, `/group-voting-game`, one evergreen hub, one `/categories/*`
12. Confirm Vercel deployment succeeded; Speed Insights / GA receiving prod traffic
13. Read `docs/GROWTH_EXPERIMENTS.md` + snippet registry before metadata edits
14. Re-read §11 Do-Not-Break before any “quick fix”

---

# 13. CURRENT PRODUCT READINESS SNAPSHOT

| Area | Score | Why |
| --- | --- | --- |
| Core gameplay | **8/10** | Create → share → vote → unlock → reveal → share loop is implemented end-to-end with persistence |
| Production stability | **7/10** | Build/audit pass; simple schema; risks are public RLS + unlock legacy edge cases, not compile failures |
| Analytics readiness | **7/10** | Strong mid/late funnel custom events; production-only; some early/join gaps remain |
| SEO/discovery readiness | **8/10** | Large audited landing/hub system, sitemap/robots/schema; topic hubs unused; some overlap warnings |
| Performance readiness | **5/10** | Some font/blur fixes landed; homepage still client-heavy with third parties; mobile LCP still a concern |
| Monetization readiness | **2/10** | No accounts, billing, entitlements, or paywall seams in code |
| Maintainability (small AI-assisted team) | **7/10** | Clear registries + audits help SEO; gameplay concentrated; SEO surface area is large and easy to bloat |

*(Scores are technical readiness, not market demand.)*

---

# 14. FUTURE MONETIZATION TOUCHPOINTS — MAP ONLY

Not recommendations — architecture attachment points only.

| Touchpoint | Would touch | Complexity | Dependency | Risk to free/viral loop |
| --- | --- | --- | --- | --- |
| Premium create options (extra categories, tones) | `home-page.tsx`, `game-build.ts`, `games` schema | Medium | Schema + create action | Medium if free defaults worsen |
| Category / content packs | `FRIEND_RANK_CATEGORIES`, landing CTAs | Medium | Content ops + unlock flags | Low–Medium |
| Premium personalization (persist inside jokes) | Create form, `CreateGameInput`, DB column, narrative | Medium | Migration + rebuild path | Low if optional |
| Premium reveal / share cosmetics | Reveal/share components, `lib/share` | Medium | Asset pipeline | Low if free reveal remains |
| Larger group limits (>8) | Parsing, unlock math, UI | Low–Medium | Unlock semantics | Medium (social dynamics) |
| One-off paid session | New table / payment provider | High | Auth or pay-per-link | High if creates friction before share |
| Subscription / accounts | Auth, RLS rewrite, ownership | High | Supabase Auth + policy redesign | High — changes public anon model |

---

# 15. FINAL HANDOVER SUMMARY

### A. FriendRank can safely remain mostly untouched for a while because…

The core loop is shipped, persisted on Supabase, covered by production analytics, and the SEO surface builds/audits cleanly with **0 errors**. There is no payment/auth complexity that will silently rot if left idle (beyond normal dependency/hosting upkeep).

### B. When development resumes, check these things first…

Env + Supabase connectivity, `npm run build` / `audit:all`, create→vote→unlock smoke on prod, and whether the `/group-voting-game` snippet experiment is still pending before any metadata edits.

### C. The three largest technical risks are…

1. **Public anon RLS** (readable games/votes) / abuse potential  
2. **Unlock threshold + legacy date** coupling to live games  
3. **SEO/experiment drift** (duplicate intents, unfinished CTR tests)

### D. The three strongest pieces of the current architecture are…

1. **Simple durable gameplay schema** (`games` + `vote_sessions`) with clear server actions  
2. **Registry-driven SEO factory** with automated audits  
3. **Instrumentation covering create → invite → open → vote → reveal → loop**

### E. Areas that should only be changed after evidence/data justifies them…

Homepage conversion copy/structure; voting unlock rules; GA event names/properties; `/group-voting-game` titles while experiment pending; adding large volumes of new thin landings; monetization that adds friction before the viral share step.

---

*End of technical handover. Application code was not modified for this document.*
