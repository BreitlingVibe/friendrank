# FriendRank Weekly Publishing Package

Build-time generator that combines **Campaign Planner**, **Growth Assets**, **Distribution Opportunities**, **Growth Assistant**, **Authority Roadmap**, and **Search Console Action Plan** into one complete weekly package Milan can publish manually today.

```bash
npm run growth:publishing-package
```

Source: `lib/growth/publishing-package.ts`

---

## Purpose

Previous sprints produced assets, distribution targets, and a campaign plan separately. The Publishing Package merges them into **one copy-ready document** with guardrails, measurement checklist, account notes, and automation readiness — structured for future approved automation without implementing it now.

Nothing is auto-posted. No credentials are stored.

---

## Combined modules

| Module | Role in package |
|--------|-----------------|
| Campaign Planner | Overview, guardrails, measurement base |
| Growth Assets | All copy-ready publication blocks |
| Distribution Opportunities | Channel context (via campaign) |
| Growth Assistant | Confidence score, defer/ignore signals |
| Authority Roadmap | Next-step recommendation context |
| Search Console Action Plan | Batch 1 indexing URLs |

---

## Package sections

### 1. Campaign overview

Campaign name, priority page, audience, goal, confidence score, expected effort and reach.

### 2. Publication package (copy-ready)

- Reddit / community post  
- LinkedIn post (short + long)  
- Pinterest title, description, image concept  
- AI directory description (1 / 3 / ~150 words)  
- Browser game directory description  
- Backlink outreach email  
- WhatsApp / Discord / Slack messages  

### 3. Recommended publishing order

1. Request/confirm indexing  
2. Share with small private group  
3. Publish Reddit/community post  
4. Submit to one AI/browser directory  
5. Prepare Pinterest asset  
6. Send one backlink outreach email  
7. Review metrics after 7 days  

### 4. Account / channel readiness

Documentation only — **no account creation, no credentials**:

- Brand: **FriendRank**  
- Handles: `friendrankapp`, `playfriendrank`  
- Email: `hello@friendrank.app`, `team@friendrank.app`  
- Future automation candidates vs channels that stay manual  

### 5. Automation readiness classification

Per channel:

- manual only  
- draft automation only  
- scheduler-ready later  
- API automation possible later  
- not recommended for automation  

### 6. Guardrails

Human approval, no spam, no duplicate copy, no auto-posting, no credentials, no policy bypassing, no fake engagement.

### 7. 7-day measurement checklist

Vercel visitors, referrers, Search Console impressions/clicks, AI assistant traffic, CTA clicks, games created, external comments/replies.

### 8. Next-step recommendation

Suggests whether the next sprint should focus on manual distribution workflow, lightweight scheduling, directory submissions, analytics feedback loop, or account readiness.

---

## Weekly workflow

```bash
npm run growth:publishing-package   # Full copy-ready package
npm run growth:campaign             # Campaign plan only
npm run growth:assets               # Assets only
```

1. Run publishing package  
2. Human-approve each copy block  
3. Follow publishing order  
4. Check measurement list after 7 days  

---

## Future automation vision (not implemented)

The package classifies channels so a future sprint can add:

- Draft pre-fill for directories and outreach (human submits)  
- LinkedIn/Pinterest schedulers after approval workflow  
- Internal reminders — not public auto-posting  

Reddit, community participation, and personal sharing **stay manual**.

---

## Constraints

- No public routes or UI  
- No runtime logic or external APIs  
- No auto-posting, scraping, or LLMs  
- No credentials or account creation  
- No metadata or page content changes  
- Orchestration only — no duplicated engines  

---

## Related docs

- `lib/growth/CAMPAIGN_PLANNER.md`  
- `lib/growth/GROWTH_ASSETS.md`  
- `lib/growth/DISTRIBUTION_OPPORTUNITIES.md`  
- `lib/growth/GROWTH_ASSISTANT.md`  
