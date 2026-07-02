# FriendRank Manual Distribution Workflow

Build-time workflow that turns the **Publishing Package** into a safe first-campaign execution checklist, account/channel readiness plan, and backlink/reach workflow.

```bash
npm run growth:manual-distribution
```

Source: `lib/growth/manual-distribution-workflow.ts`

---

## Purpose

FriendRank has copy-ready assets and a publishing package. This sprint adds the **execution layer**: what accounts to prepare, which channels to use first, exact manual steps, backlink rules, ten ordered actions, and a 7-day measurement plan — without automation, credentials, or account creation.

---

## Combined modules

| Module | Role |
|--------|------|
| Publishing Package | Copy blocks, account notes, automation classification |
| Campaign Planner | Six core manual actions, guardrails |
| Distribution Opportunities | Channel fit for priority page |
| Growth Assets | Asset references for each action |
| Authority Roadmap | Backlink target categories |
| Growth Assistant | Defer/ignore channels, confidence |

---

## Workflow sections

### 1. Account readiness plan

- Brand: **FriendRank**
- Handles: `friendrankapp`, `playfriendrank`
- Emails: `hello@friendrank.app`, `team@friendrank.app`
- **Create first:** Search Console, Reddit, Pinterest (prepare)
- **Defer:** LinkedIn company page, TikTok, assistant-deferred channels
- **Avoid:** Paid spam, automation bots, TikTok ads

No credentials stored. No accounts created by this tool.

### 2. First campaign checklist

Default page: **`/friend-games`**

1. Inspect / request indexing  
2. Prepare copy (`npm run growth:publishing-package`)  
3. Pick first channel (product-led sharing)  
4. Publish manually  
5. Record date  
6. Check metrics after 7 days  

### 3. Channel readiness classification

Each channel: **create now · prepare later · defer · avoid · automation candidate later · manual only**

### 4. Backlink / reach workflow

Six target types with effort, risk, reach, backlink value, and first action:

- AI directories  
- Browser game directories  
- Team-building blogs  
- Teacher/classroom resources  
- Party planning resources  
- Indie/startup directories  

### 5. Valid backlink rules

No paid spam · no irrelevant directories · no automated commenting · no fake engagement · no mass outreach · prefer contextual relevant links.

### 6. First 10 manual actions

Ordered list with channel, page, asset, effort, impact, backlink/reach value, approval flag, and metric to check.

### 7. Future automation readiness

Documents what could become draft/reminder/scheduler automation vs **never automate** (Reddit, outreach send, indexing, personal sharing).

### 8. Measurement checklist (7 days)

Vercel visitors · referrers · Search Console impressions/clicks · AI assistant traffic · CTA clicks · games created · external replies · backlinks acquired.

---

## Recommended command sequence

```bash
npm run growth:publishing-package    # Copy-ready assets
npm run growth:manual-distribution     # Execution checklist (this workflow)
npm run growth:campaign              # Campaign context
```

---

## Constraints

- No public routes or UI  
- No runtime logic or external APIs  
- No scraping, auto-posting, or LLMs  
- No credentials or account creation  
- No metadata or page content changes  
- Orchestration only  

---

## Related docs

- `lib/growth/PUBLISHING_PACKAGE.md`  
- `lib/growth/CAMPAIGN_PLANNER.md`  
- `lib/growth/DISTRIBUTION_OPPORTUNITIES.md`  
- `lib/growth/AUTHORITY_ROADMAP.md`  
