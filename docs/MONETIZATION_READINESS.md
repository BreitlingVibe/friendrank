# FriendRank Monetization Readiness

**Status:** Decision record — **no monetization implemented**  
**Last updated:** 2026-08-11  
**Companion docs:** `docs/TECHNICAL_HANDOVER.md`, `docs/PRODUCT_BIBLE.md`  
**Canonical product:** https://friendrank.app

This document answers:

> If FriendRank starts getting enough real usage to test monetization, what should we test first, why, when, and where would it attach to the existing product?

It preserves research conclusions so we do not repeat the market/product debate later.  
**Willingness to pay is unproven.** Do not treat this as a mandate to build payments.

---

## 1. Monetization principles

Current product principles for any future monetization work:

1. The core **create → invite → vote → unlock → reveal** loop stays **free**.
2. **Players/guests** stay frictionless: no payment or account to participate.
3. Do **not** gate the cinematic reveal.
4. Keep the **current** standard share / download free.
5. Do **not** put advertising in the voting / reveal / invite critical path.
6. Do **not** introduce subscriptions until **repeat-host** behavior justifies them.
7. Monetization should be **optional and additive**, not by removing free value.
8. **Growth and completion of the social loop** outrank short-term revenue.

These align with `docs/PRODUCT_BIBLE.md` (multiplayer-first, no accounts for players, emotion/shareable payoff) and the technical handover (monetization readiness currently **2/10** — no billing in code).

---

## 2. Monetization hypotheses — prioritized

### Hypothesis #1 — Premium Group / Memory Pack (highest priority)

**Idea:** Free game stays exactly as today. After reveal, optionally offer a paid **personalized artifact** based on *this group’s* voting results — not merely “sharper PNG exports.”

**Possible contents (future):**

- Official Group Poster  
- Individual FriendRank collectible / role cards  
- Group Awards  
- Story / social formats  
- Later: “Yearbook”-style group artifact  

**Price hypothesis:** start **€2.99**; optionally test **€4.99** later.  
**WTP:** **UNPROVEN.**

**Why first:** Best fit to the north star (“result they want to screenshot and share”), attaches after emotional peak, preserves viral free loop, reuses existing share-card generation.

### Hypothesis #2 — Optional themed / content packs

Examples: Brutal Friends, Couples, Bachelorette, Christmas Party, Office Chaos / Team.

**Do not build now.** Use Search Console + actual game/SEO usage to see which occasions deserve packs — do not invent packs from imagination.

### Hypothesis #3 — Advertising

**Not recommended now.** Economics at low traffic are weak; brand/UX risk on gameplay is high.

**If ever:** informational / SEO pages only — never voting, reveal, invite, or core viral UI.

### Hypothesis #4 — Event / B2B offering

Only if organic demand appears (teams, HR, facilitators, events). Mentimeter-style event packages are a distant analogy. **Do not build now.**

### Hypothesis #5 — Host subscription

**Lowest priority.** Requires evidence of meaningful **repeat hosting** before reconsideration. Conflicts with current no-account, low-friction host path.

---

## 3. When monetization becomes worth testing

No fake precision. Watch **practical signals**.

Rough readiness cue (not a hard KPI): on the order of **dozens of completed / unlocked games per week** — enough that a demand test can produce interpretable click data.

### Signal matrix vs current analytics

| Signal | Status | How (today) |
| --- | --- | --- |
| Organic / site traffic | **A — measurable** | Vercel Analytics pageviews; GA4 pageviews (prod) |
| Games created | **A — measurable** | GA4 `game_created` |
| Creation funnel start / abandon | **A — measurable** | `game_creation_started`, `game_creation_abandoned` |
| Invite intent | **A — measurable** | `invite_link_copied` |
| Game opened | **A — measurable** | `game_page_opened` |
| Voting engagement | **A — measurable** | `voting_started`, `vote_submitted` |
| Completed / unlocked games | **A — measurable** | `results_unlocked` |
| Reveal watched | **A — measurable** | `reveal_started`, `reveal_completed` |
| Share / download | **A — measurable** | `share_card_previewed`, `share_card_shared`, `share_card_downloaded`, `copy_share_text` |
| SEO landing performance | **A — measurable** | Google Search Console + landing CTAs (`cta_clicked` with `landing_*` / hub locations) |
| Occasion / category concentration | **B — partial** | GSC by page + SEO route traffic; **not** “which pack sold” |
| Repeat hosting | **C — needs more** | No host identity; hard to attribute “same person hosted again” without accounts or durable host id |
| Premium purchase intent | **C — needs POC #0 events** | Not in code yet (`premium_offer_*`) |
| Paid conversion | **C — needs payment POC** | No Stripe / entitlements |

**A** = measurable today · **B** = partial · **C** = needs new instrumentation / product work  

Custom GA events fire only in **production** (`lib/analytics.ts`).

---

## 4. POC #0 — Fake-door demand test (preferred first experiment)

**Do not implement in this pause.** Documented for restart.

### Question

> Do real users who finished a FriendRank game show purchase intent for a personalized group artifact?

### Offer (UI only)

After reveal, in the **existing results-sharing area**, show an optional offer e.g.:

**“Unlock Premium Group Pack”** — short preview of Group Poster / Individual Cards / Group Awards / Story Pack — display price **€2.99**.

**Click does not charge.** Show a lightweight “coming soon / early access” state.

### Suggested analytics (future)

- `premium_offer_shown`  
- `premium_offer_clicked`  
- Optional: `premium_early_access_requested`  

### Natural attachment (current architecture)

| Piece | Role |
| --- | --- |
| `components/friend-rank-results-with-reveal.tsx` | Reveal timing; `reveal_completed` already fires here |
| `components/friend-rank-results.tsx` | Renders results UI and mounts share section |
| `components/friend-rank-results-share-section.tsx` | **Best mount point** for offer CTA next to free Share / Download — users already in “keep/share this” mode |

### What NOT to change for POC #0

- Voting, unlock thresholds, reveal gating  
- Free share / download behavior  
- Create flow, SEO pages, schema, analytics event names already in production  
- No Stripe, no DB tables, no account system  

---

## 5. Real payment POC — only if demand warrants it

Smallest future implementation **if** POC #0 (or clear qualitative demand) is encouraging.

### Free (unchanged)

Create → invite → vote → unlock → reveal → **existing** standard share/download.

### Paid

One **Premium Group Pack** for **one** completed game (`share_code`).

### Likely flow

```
premium offer → Stripe Checkout → webhook confirmation
  → entitlement for that game → generate/download premium artifacts
```

Prefer **no FriendRank account** for v1 if a one-time unlock token / download gated by payment session is enough.

### Out of scope for first payment POC

Subscriptions · multiple tiers · marketplace · complex entitlements · large admin · many themes.

### Architecture outline (not a build plan)

| Area | Likely touch |
| --- | --- |
| UI | `friend-rank-results-share-section.tsx` (+ maybe thin premium download panel) |
| Export | `lib/share/*`, `friend-rank-share-card*.tsx`, `html-to-image` already used for PNGs |
| Identity | `share_code` on `games` (`lib/games/types.ts`, `/game/[share_code]`) |
| Backend | Stripe Checkout + webhook route/action; entitlement record keyed by `share_code` / payment id |
| DB | New table/rows for purchases — **not** present today; design with `TECHNICAL_HANDOVER` RLS notes in mind |
| Analytics | `premium_checkout_started`, `premium_purchased`, download success |
| Privacy | Do **not** put names, votes, or unnecessary PII in Stripe metadata; minimize what payment rows store |

Complexity class from research: **MEDIUM** — not a billing platform.

---

## 6. Current technical attachment points

Inspected repo locations (do not modify casually):

| Area | Location | Why it matters |
| --- | --- | --- |
| Reveal completion | `components/friend-rank-results-with-reveal.tsx` (`trackRevealCompleted`) | Defines “experience finished”; timing for offer |
| Results + share mount | `components/friend-rank-results.tsx` → `FriendRankResultsShareSection` | Composition root for post-reveal UI |
| Share / download UX | `components/friend-rank-results-share-section.tsx` | Natural premium CTA beside free actions |
| Card rendering | `components/friend-rank-share-card.tsx`, `friend-rank-share-card-from-presentation.tsx` | Visual basis for premium artifacts |
| PNG export / native share | `lib/share/export-share-card-png.ts`, `lib/share/native-share.ts` | Existing download/share pipeline |
| Presentation data | `lib/results/presentation.ts` | Names/roles/narrative for personalization |
| Analytics | `lib/analytics.ts` | Funnel + future premium events (prod-only) |
| Game identity | `share_code` / `games` table; `app/game/[share_code]/page.tsx` | Entitlement key without accounts |
| Create flow (stay free) | `components/homepage/home-page.tsx`, `app/actions/games.ts` | Do not place first monetization here |
| Supabase | `supabase/migrations/*`, `lib/games/repository.ts` | Persistence; public anon RLS is a known sensitivity for any payment-related tables |

---

## 7. Monetization safety / guardrails

**DO NOT:**

- Paywall voting  
- Paywall reveal  
- Remove existing free sharing to force premium value  
- Put ads in the core gameplay loop  
- Require players to create accounts  
- Build subscriptions without repeat-use evidence  
- Build many premium assets before proving purchase intent  
- Build payment infrastructure “because we can”  
- Put player names, voting answers, or unnecessary personal data into payment metadata  
- Ignore existing Supabase/RLS exposure (`TECHNICAL_HANDOVER`) when adding payment records  

---

## 8. Decision tree

```
IF traffic / completed games remain very low
  → Keep growing free FriendRank. No monetization engineering.

IF completed games become meaningful but premium demand is unknown
  → Run POC #0 fake-door (offer + click analytics only).

IF premium offer gets meaningful clicks / early-access interest
  → Build smallest real €2.99 payment POC for one pack.

IF many impressions and essentially no interest
  → Do NOT build Stripe. Change offer or park monetization.

IF specific occasion/category pages dominate usage + GSC
  → Evaluate one themed content pack for that use case (Hypothesis #2).

IF repeat hosting becomes substantial (needs better measurement)
  → Reconsider host premium / subscription (Hypothesis #5).

IF large informational SEO traffic develops
  → Reconsider ads on SEO pages only (Hypothesis #3).

IF team / HR / event demand appears organically
  → Investigate B2B / event package separately (Hypothesis #4).
```

---

## 9. WHEN WE RETURN TO MONETIZATION

Before asking Cursor/AI to build payments or premium UI:

1. Open **`docs/TECHNICAL_HANDOVER.md`** (how the product works).  
2. Open **this file** (what we decided and what evidence is required).  
3. Collect current data:  
   - Vercel Analytics traffic  
   - Google Search Console (queries + landing pages)  
   - GA4: `game_created`, `results_unlocked`, `reveal_completed`, share events  
   - Rough completed-game volume (e.g. unlocks/week)  
   - Top SEO landings / occasions  
4. Decide branch of the **decision tree** (§8).  
5. If testing demand: implement **POC #0 only** (fake door + analytics) — still no Stripe.  
6. Only if POC #0 is encouraging: design the **smallest** payment POC (§5).  

**Do not** start with subscriptions, ads-in-game, or a content marketplace.

---

*End of monetization readiness record. Application code was not modified for this document.*
