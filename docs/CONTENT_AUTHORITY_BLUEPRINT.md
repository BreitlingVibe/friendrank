# FriendRank Content Authority Blueprint

**Version:** 1.0  
**Status:** Master publishing roadmap (6–12 months)  
**Audience:** Founders, engineers, content operators, AI assistants  
**Last updated:** July 2026  
**Related:** `/docs/PRODUCT_BIBLE.md`, `/docs/DISCOVERY_SYSTEM.md`, `/docs/AI_CONTEXT.md`

This document is the **publishing strategy** that the discovery architecture (`lib/discovery/`) executes. It does not change product code, routes, metadata, or UI.

---

## 1. Vision

FriendRank should become the **authority on multiplayer social games** — not merely a game creator with SEO pages attached.

Three discovery channels converge on the same product loop:

| Channel | What it indexes | What FriendRank must provide |
|---------|-----------------|------------------------------|
| **Google** | Pages, links, intent match | Topical depth, clear hierarchy, fast UX |
| **AI assistants** | Entities, structure, answers | Consistent taxonomy, citable summaries |
| **Users** | Outcomes, shareability | Games worth creating and sending to a group |

**Google discovers content.** Crawlers follow a pyramid: homepage → pillars → category hubs → evergreen landing pages. Each layer must earn its place with substantive, distinct intent — not keyword variants.

**AI discovers knowledge.** ChatGPT, Gemini, Claude, and Perplexity cite sources they can summarize confidently. FriendRank wins when hierarchy, entity relationships, and page purpose are explicit in public copy and build-time GEO layers.

**Users discover games.** Search and AI bring visitors; the product converts them. Every page in the pyramid exists to answer a real question and **naturally lead toward Create Game** (`/#create-game`). Authority without conversion is vanity traffic.

**North star for publishing:** A visitor lands with intent, understands the category, trusts FriendRank as the expert, and starts a game within two clicks.

---

## 2. Content Pyramid

Four layers sit between discovery and conversion:

```
Homepage
  ↓
Pillars (evergreen hub pages)
  ↓
Category Hubs (/categories/{slug})
  ↓
Evergreen Landing Pages (/{slug})
  ↓
Create Game
```

### Layer roles

| Layer | Route pattern | Role | Current state |
|-------|---------------|------|---------------|
| **Homepage** | `/` | Brand, conversion, game creation | Live — freeze unless data shows issues |
| **Pillars** | `/friend-games`, `/party-games`, etc. | Topical authority; category overview | 5 primary pillars + 3 supplemental hubs live |
| **Category hubs** | `/categories/best-friends` | Mid-layer intent; groups related evergreen pages | Framework live; 1 hub live, ~40 planned |
| **Evergreen pages** | `/best-friend-quiz`, etc. | Long-tail capture; specific search intent | ~100 live, ~10 planned in registry |
| **Create game** | `/#create-game` | Product conversion | Live |

**Homepage** is the product. It does not become a directory or blog.

**Pillars** answer “what is [topic] and how do I choose?” They link down to category hubs and exemplar landing pages.

**Category hubs** answer “what games fit [specific group or occasion]?” They aggregate 5–12 evergreen pages under one narrative.

**Evergreen pages** answer “how do I [specific intent]?” Each maps to one primary query and one CTA.

**Create game** is the payoff. No page ships without a clear path here.

---

## 3. Pillar Inventory

### Primary pillars (PILLAR_REGISTRY)

| Pillar | Route | Purpose | Target audience | Main intent | Priority | Expected category hubs |
|--------|-------|---------|-----------------|-------------|----------|------------------------|
| **Friend Games** | `/friend-games` | Authority for close-friend group activities | Besties, roommates, group chats | “Games to play with friends online” | **High** | 8–10 |
| **Party Games** | `/party-games` | Authority for social gatherings and celebrations | Party hosts, birthdays, hangouts | “Party games for groups” | **High** | 8–10 |
| **Team Building Games** | `/team-building-games` | Authority for workplace and remote team activities | Managers, HR, team leads | “Team building games for work” | **High** | 6–8 |
| **Relationship Games** | `/relationship-games` | Authority for couples and romantic pairs | Couples, date nights, anniversaries | “Couple games and relationship quizzes” | **High** | 6–8 |
| **Question Games** | `/question-games` | Authority for prompt-based group games | Any group needing conversation starters | “Question games for friends” | **Medium** | 4–6 |

### Supplemental evergreen hubs (cluster anchors)

These are live hub pages that map to a parent pillar for discovery (`EVERGREEN_HUB_PARENT_PILLAR`). They are not separate pillars but strengthen topical clusters.

| Hub | Route | Parent pillar | Purpose | Priority |
|-----|-------|---------------|---------|----------|
| **Anonymous Voting Games** | `/anonymous-voting-games` | Friend Games | Anonymous group voting intent | **High** |
| **Icebreaker Games** | `/icebreaker-games` | Team Building Games | Icebreaker-specific discovery | **High** |
| **Browser Party Games** | `/browser-party-games` | Party Games | Browser/no-download party angle | **Medium** |

### Pillar priority rationale

**High** pillars align with core FriendRank loops (friends voting on each other), existing traffic targets in Search Console, and the strongest GA4 conversion paths.

**Medium** pillars (Question Games, Browser Party Games) expand reach without diluting brand focus — ship hubs after high-priority categories have supporting evergreen pages.

---

## 4. Category Hub Roadmap

Target: **~40 category hubs** over 12 months (within the 30–50 range). One live today: **Best Friends** (`/categories/best-friends`).

Priority key: **H** = High, **M** = Medium, **L** = Low. Status: **Live**, **Planned** (in registry), **New** (blueprint only).

### Friend Games → parent: `/friend-games`

| Hub slug | Title | Priority | Status | Notes |
|----------|-------|----------|--------|-------|
| `best-friends` | Best Friends | H | Live | Anchor hub; 4+ evergreen pages linked |
| `childhood-friends` | Childhood Friends | M | New | Reunion, nostalgia angle |
| `college-friends` | College Friends | H | New | Dorm, campus, group chat |
| `online-friends` | Online Friends | H | New | Discord, remote friend groups |
| `long-distance-friends` | Long Distance Friends | M | New | Pairs with existing long-distance content |
| `new-friends` | New Friends | M | New | Icebreaker-adjacent for new groups |
| `friend-groups` | Friend Groups | M | New | Generic 4+ person circles |
| `roommates` | Roommates | M | New | Overlap with party; distinct housing intent |

### Party Games → parent: `/party-games`

| Hub slug | Title | Priority | Status | Notes |
|----------|-------|----------|--------|-------|
| `birthday-party` | Birthday Party | H | New | Strong existing landing page cluster |
| `drinking-games` | Drinking Games | H | New | Adult party; careful tone |
| `sleepover` | Sleepover | H | New | Teen/young adult overnight |
| `girls-night` | Girls Night | H | New | Existing `/girls-night-game` anchor |
| `house-party` | House Party | M | New | General home gathering |
| `graduation-party` | Graduation Party | M | New | Seasonal opportunity |
| `summer-party` | Summer Party | L | New | Seasonal |
| `pregame` | Pregame | M | New | Pre-event warm-up games |
| `bachelor-bachelorette` | Bachelor & Bachelorette | M | New | Occasion-specific |

### Team Building → parent: `/team-building-games`

| Hub slug | Title | Priority | Status | Notes |
|----------|-------|----------|--------|-------|
| `coworkers` | Coworkers | H | Planned | In registry; 3 evergreen links ready |
| `remote-teams` | Remote Teams | H | New | Strong market; existing remote pages |
| `office-icebreakers` | Office Icebreakers | H | New | Overlap icebreaker hub |
| `meetings` | Meetings | M | New | Standup, all-hands |
| `workshops` | Workshops | M | New | Facilitator-led sessions |
| `new-employees` | New Employees | M | New | Onboarding angle |
| `team-lunch` | Team Lunch | L | New | Low-friction social |

### Relationship Games → parent: `/relationship-games`

| Hub slug | Title | Priority | Status | Notes |
|----------|-------|----------|--------|-------|
| `couples` | Couples | H | Planned | In registry |
| `newly-dating` | Newly Dating | H | New | Early relationship |
| `married-couples` | Married Couples | M | New | Existing married content |
| `long-distance-couples` | Long Distance Couples | M | New | Existing LDR pages |
| `date-night` | Date Night | H | New | `/date-night-game` anchor |
| `anniversary` | Anniversary | M | New | Occasion hub |
| `valentines` | Valentine's | L | New | Seasonal; ship Jan |

### Question Games → parent: `/question-games`

| Hub slug | Title | Priority | Status | Notes |
|----------|-------|----------|--------|-------|
| `would-you-rather` | Would You Rather | M | New | Existing landing page |
| `never-have-i-ever` | Never Have I Ever | M | New | Party + friend crossover |
| `most-likely-to` | Most Likely To | H | New | Strongest generator intent |
| `this-or-that` | This or That | L | New | Lighter prompt games |
| `deep-questions` | Deep Questions | M | New | Conversation starters |

### Anonymous & voting cluster → parent: `/friend-games` (via supplemental hub)

| Hub slug | Title | Priority | Status | Notes |
|----------|-------|----------|--------|-------|
| `anonymous-voting` | Anonymous Voting | H | New | Distinct from hub page; category layer |
| `group-voting` | Group Voting | M | New | General voting intent |

### Summary counts

| Priority | Hub count |
|----------|-----------|
| High | 18 |
| Medium | 17 |
| Low | 5 |
| **Total** | **~40** |

---

## 5. Evergreen Opportunity Map

Each category hub should eventually support **5–12 evergreen landing pages**. Pages already live in the Intent Registry count toward the hub; gaps are publishing opportunities.

### Best Friends (live hub)

| Evergreen intent | Slug | Status |
|------------------|------|--------|
| Best Friend Quiz | `best-friend-quiz` | Live |
| Bestie Quiz | `bestie-quiz` | Live |
| Who Knows Me Best | `who-knows-me-best` | Live |
| Friendship Test | `friendship-test` | Live |
| Best Friend Challenge | `friendship-challenge` | Live |
| Funny Friend Quiz | `funny-friend-quiz` | Live |
| Friend Test | `friend-test` | Live |
| Friendship Questions | `friendship-questions` | Planned opportunity |
| Best Friend Poll | planned | New |
| Friendship Voting Game | `anonymous-voting-game` | Live (cross-link) |

**Hub coverage today:** ~7 live pages. Target: 10.

### Coworkers (planned hub)

| Evergreen intent | Slug | Status |
|------------------|------|--------|
| Office Icebreaker | `office-icebreaker` | Live |
| Team Building Game | `team-building-game` | Live |
| Meeting Icebreaker | `meeting-icebreaker` | Live |
| Work Team Game | `work-team-game` | Live |
| Team Bonding Game | `team-bonding-game` | Live |
| Employee Engagement Game | `employee-engagement-game` | Live |
| Virtual Team Building | `virtual-team-building` | Live |
| Remote Team Game | `remote-team-game` | Live |
| Workshop Games | `workshop-games` | Live |
| New Employee Games | `new-employee-games` | Live |

**Hub coverage today:** ~10 live pages ready to link on launch.

### Couples (planned hub)

| Evergreen intent | Slug | Status |
|------------------|------|--------|
| Couple Quiz | `couple-quiz` | Live |
| Relationship Quiz | `relationship-quiz` | Live |
| Boyfriend Girlfriend Quiz | `boyfriend-girlfriend-quiz` | Live |
| Date Night Game | `date-night-game` | Live |
| Couple Questions | `couple-questions` | Live |
| Deep Questions for Couples | `deep-questions-for-couples` | Live |
| Newlywed Game | `newlywed-game` | Live |
| Anniversary Game | `anniversary-game` | Live |
| Double Date Games | `double-date-games` | Live |

**Hub coverage today:** ~9 live pages.

### Birthday Party (new hub)

| Evergreen intent | Slug | Status |
|------------------|------|--------|
| Birthday Party Game | `birthday-party-game` | Live |
| Birthday Party Games | `birthday-party-games` | Live |
| Birthday Questions | `birthday-questions` | Live |
| Party Voting Game | `party-voting-game` | Live |
| Girls Night Game | `girls-night-game` | Live (cross-link) |

**Hub coverage today:** ~5 live; target 8.

### Most Likely To (new hub)

| Evergreen intent | Slug | Status |
|------------------|------|--------|
| Most Likely To Generator | `most-likely-to-generator` | Live |
| Most Likely To Questions | `most-likely-to-questions` | Live |
| Who Knows Me Best | `who-knows-me-best` | Live (cross-link) |

**Hub coverage today:** ~3 live; target 6.

### Total page count estimate

| Layer | Current | 12-month target |
|-------|---------|-----------------|
| Homepage | 1 | 1 |
| Pillars + supplemental hubs | 8 | 8–10 |
| Category hubs | 1 | 35–45 |
| Evergreen landing pages | ~100 | 120–140 |
| Game pages (dynamic) | — | excluded from index |

**Net new publishing:** ~25–40 category hubs, ~20–40 new evergreen pages (many intents already live but unclustered).

---

## 6. Publishing Order

Hubs ship when they have **≥5 supporting evergreen pages** (live or shipping same sprint). Never publish an empty hub.

### Phase A — Foundation (complete)

- Discovery architecture (Phase 23)
- Connected internal linking (Phase 23 Sprint 2)
- Content Authority Blueprint (this document)

### Phase B — High-priority hubs (months 1–3)

| Order | Hub | Why first |
|-------|-----|-----------|
| 1 | **Best Friends** | Live; anchors friend pillar |
| 2 | **Coworkers** | 10+ live pages; B2B search demand |
| 3 | **Couples** | 9+ live pages; relationship pillar strength |
| 4 | **Most Likely To** | Highest-priority generator intent (priority 90) |
| 5 | **Birthday Party** | Occasion volume; existing cluster |
| 6 | **Online Friends** | Discord/remote friend alignment with product |
| 7 | **Remote Teams** | Remote work evergreen cluster already live |
| 8 | **Girls Night** | Strong party crossover |

**Selection criteria applied:**

- **Search demand** — intents with existing impressions in Search Console P1 list
- **Commercial value** — pages that convert to `game_created`
- **Internal linking value** — hubs that connect isolated live pages
- **AI discoverability** — clear entity (e.g. “best friend quiz”) with FAQ-ready hubs
- **Topical authority** — strengthens pillars before long-tail sprawl

### Phase C — Medium-priority hubs (months 4–6)

College Friends, Date Night, Office Icebreakers, Drinking Games, Sleepover, Newly Dating, Anonymous Voting, Would You Rather, Never Have I Ever, Pregame, New Friends, Long Distance Couples.

### Phase D — Long tail & seasonal (months 7–12)

Graduation, Summer Party, Valentine's, Anniversary, This or That, Deep Questions, Team Lunch, Workshop, Bachelor/Bachelorette, Childhood Friends, Roommates.

### Evergreen page publishing (ongoing)

When a hub launches, audit its `relatedEvergreenSlugs` in the Category Registry:

1. Link all live pages immediately
2. Ship 2–4 missing high-priority intents from registry `planned` status
3. Request indexing for hub + new pages in Search Console Batch 2

---

## 7. Internal Linking Strategy

Every new page must connect to the graph documented in `/docs/DISCOVERY_SYSTEM.md`.

### Required link paths

```
Landing page
  ↑↓ Category hub (if matched in registry)
  ↑  Pillar (parentPillar)
  ↔  Related landing pages (siblings via internal-links + registry)
  →  Create Game
```

```
Category hub
  ↑  Pillar
  ↔  Sibling category hubs
  ↓  Evergreen pages (relatedEvergreenSlugs)
  →  Create Game
```

```
Pillar
  ↓  Live category hubs (Explore More)
  ↓  Featured guides / exemplar landing pages
  →  Create Game
```

### Examples

**`/best-friend-quiz` (landing):**

- Up: `/categories/best-friends` → `/friend-games`
- Sideways: `/who-knows-me-best`, `/friendship-test`, `/bestie-quiz`
- Convert: `/#create-game`

**`/categories/coworkers` (future hub):**

- Up: `/team-building-games`
- Sideways: `/categories/remote-teams`, `/categories/meetings`
- Down: `/office-icebreaker`, `/team-building-game`, `/meeting-icebreaker`
- Convert: `/#create-game`

**`/party-games` (pillar):**

- Down: `/categories/birthday-party`, `/categories/girls-night` (when live)
- Exemplar: `/birthday-party-game`, `/party-voting-game`
- Convert: `/#create-game`

### Rules

- Register every hub in `CATEGORY_REGISTRY` before shipping route
- Every live hub must pass `validateCategoryRegistry()` (parent pillar, ≥1 evergreen, CTA)
- Do not hand-maintain Related Games lists — use registry + `getRelatedContentForSlug()`
- Cross-link hubs that share audience (e.g. Best Friends ↔ Girls Night) via `relatedCategorySlugs`

---

## 8. AI / GEO Strategy

AI assistants benefit from the same hierarchy humans do — expressed clearly in public content and `lib/geo/` build metadata.

| GEO principle | Publishing action |
|---------------|-------------------|
| **Structured hierarchy** | Hub intro states parent pillar and audience; landing pages link up to hub |
| **Consistent taxonomy** | Use registry slugs and titles consistently across copy, FAQ, and anchors |
| **Category ownership** | One hub owns “best friend games”; avoid duplicate hub intents |
| **Cross-linking** | Discovery sections expose entity relationships AI can traverse |
| **Clear page intent** | First paragraph answers “what is this page for?” before CTA |
| **Entity relationships** | Registry `parentPillar`, `relatedCategorySlugs`, `relatedEvergreenSlugs` mirror GEO graphs |

**Perplexity / ChatGPT citation pattern:** User asks “what’s a good game for best friends?” → AI cites `/categories/best-friends` or `/friend-games` → visitor converts on homepage.

**Do not:** Hide GEO text, keyword-stuff FAQ, or create AI-only pages. GEO layers are build-time validation; public copy must read naturally.

---

## 9. Success Metrics

Qualitative metrics for 6–12 month reviews. Establish baselines in Search Console and GA4 before setting numeric targets.

| Metric | Why it matters |
|--------|----------------|
| **Category hubs live** | Mid-layer depth; target 35–45 |
| **Evergreen pages live** | Long-tail capture; target 120–140 |
| **Avg internal links per page** | Graph connectivity; discovery sections + Related Games |
| **Avg crawl depth to Create Game** | Should be ≤3 clicks from any indexable page |
| **Pages indexed** | Sitemap coverage vs. live routes |
| **Organic sessions** | Search Console clicks trend |
| **AI referrals** | UTM/referrer from AI products (when measurable) |
| **Game creations** | GA4 `game_created` from organic landing pages |
| **Invite copies** | GA4 `invite_link_copied` — viral loop |
| **Repeat games** | Same-host multi-session (future instrumentation) |

**Hub readiness checklist (qualitative):**

- [ ] ≥5 supporting evergreen pages linked
- [ ] Parent pillar linked up and down
- [ ] Discovery audit passes
- [ ] Search Console URL inspected after deploy
- [ ] No overlap warning with sibling hub on same primary query

---

## 10. Future Ideas

Not commitments. Evaluate after core pyramid proves conversion.

| Idea | Notes |
|------|-------|
| **Localized hubs** | UK vs US occasion language; defer until English loop proven |
| **Country-specific pages** | Only with genuine audience difference |
| **School edition** | Classroom-safe tone; teacher resource backlinks |
| **Creator pages** | Streamers/teachers embedding games |
| **Public game templates** | Pre-filled category sets by occasion |
| **Player profiles** | Host history; privacy-first |
| **Seasonal hubs** | Valentine's, Halloween, Christmas — ship 4–6 weeks before peak |
| **Event hubs** | Super Bowl, New Year's Eve — high effort, narrow window |
| **AI-generated hub copy** | Editorial guardrails required; registry keywords as input only |
| **Comparison pages** | “FriendRank vs Kahoot” — only if search demand appears |

---

## 11. What NOT to Do

| Anti-pattern | Why |
|--------------|-----|
| **Duplicate keywords** | Two hubs or pages targeting same primary query cannibalize |
| **Thin pages** | Hubs with &lt;3 paragraphs and no linked evergreen pages waste crawl |
| **Publish hubs without supporting pages** | Empty mid-layer hurts trust and audits |
| **Break pillar hierarchy** | Orphan hubs without `parentPillar` break discovery graph |
| **Optimize for bots over users** | Keyword stuffing, hidden text, AI fluff |
| **Chase every keyword** | Registry discipline; planned ≠ ship immediately |
| **Prefer quantity over authority** | 40 well-linked hubs beat 100 thin URLs |
| **Skip registry updates** | Code and content diverge; linking breaks |
| **Auto-publish to Reddit/forums** | Manual, authentic distribution only |
| **Change homepage into directory** | Discovery supports creation; does not replace it |

**Product Bible rule:** If a publishing batch is not clearly better for users and conversion, stop or revert.

---

## 12. Recommended Roadmap

Execution order aligned with Phase numbering. Each sprint assumes prior sprint complete and `npm run audit:all` passing.

| Phase | Sprint | Deliverable |
|-------|--------|-------------|
| **Phase 23** | Sprint 1 | Category hub architecture ✅ |
| **Phase 23** | Sprint 2 | Connected discovery graph ✅ |
| **Phase 24** | Sprint 1 | **Content Authority Blueprint** (this document) ✅ |
| **Phase 24** | Sprint 2 | First high-priority hubs: Coworkers, Couples, Most Likely To |
| **Phase 25** | Sprint 1 | Registry + routes for 3 hubs; hub copy; sitemap entries |
| **Phase 25** | Sprint 2 | First 10 evergreen gap pages for Phase B hubs |
| **Phase 26** | Sprint 1 | Cross-link audit; pillar Explore More for all live hubs |
| **Phase 26** | Sprint 2 | Search Console indexing review; CTR pass on hub pages |
| **Phase 27** | Sprint 1 | Phase C hubs batch 1 (8 hubs) |
| **Phase 27** | Sprint 2 | Phase C hubs batch 2 + remaining evergreen gaps |
| **Phase 28** | Sprint 1 | Seasonal hub pipeline (Valentine's, Graduation) |
| **Phase 28** | Sprint 2 | GEO/AI citation review; `AI_CONTEXT.md` sync |

**Immediate next actions (post Sprint 1):**

1. Mark `coworkers`, `couples` as `planned` → prepare copy in `CATEGORY_HUB_CONTENT`
2. Add blueprint hubs to a tracking sheet (not code) until Sprint 2 prioritization confirmed
3. Run Search Console report: which live pages lack category hub parent in discovery graph
4. Identify 5 `planned` intents in registry to ship with first hub batch

---

## Cross-references

- **Discovery execution:** `/docs/DISCOVERY_SYSTEM.md`
- **Product principles:** `/docs/PRODUCT_BIBLE.md`
- **AI onboarding:** `/docs/AI_CONTEXT.md`
- **Category Registry (code):** `lib/discovery/category-registry.ts`
- **Intent Registry (code):** `lib/landing-pages/planning/intent-registry.ts`
- **Growth KPIs:** `lib/growth/README.md`

---

**FriendRank Content Authority Blueprint v1.0**
