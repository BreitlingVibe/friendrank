# FriendRank Weekly Campaign Planner

Build-time planner that turns growth intelligence into **one practical weekly campaign plan**. Orchestrates existing modules only — no runtime, UI, APIs, automation, or content changes.

```bash
npm run growth:campaign
```

Source: `lib/growth/campaign-planner.ts`

---

## Purpose

FriendRank has separate tools for priorities, Search Console, assets, distribution, and weekly assistant guidance. The Campaign Planner **combines them into a single executable campaign** with channels, assets, actions, guardrails, and a 7-day measurement checklist.

Nothing is auto-published. Every external step requires human approval.

---

## Combined modules

| Module | Contribution |
|--------|----------------|
| **Growth Assistant** | Confidence score, guardrails, next sprint focus |
| **Growth Assets** | Reddit, LinkedIn, Pinterest, AI directory, outreach, sharing copy |
| **Distribution Opportunities** | Channel fit, targets, cadence, avoid rules |
| **Growth Priority** | Priority page selection and tier |
| **Search Console Action Plan** | Batch 1 indexing action |
| **Authority Roadmap** | Next campaign rotation and weekly cadence |

---

## Campaign plan sections

### 1. Weekly campaign summary

- Campaign name
- Priority page (path, title, URL)
- Target audience
- Campaign goal
- Confidence score (from Growth Assistant)

### 2. Recommended channels

From the distribution registry, classified as:

- **Publish this week** — product-led sharing, Reddit, directories
- **Prepare but wait** — Pinterest, high-effort outreach, indie directories
- **Ignore this week** — TikTok, Growth Assistant defer/ignore channels

### 3. Assets to use

Pulled from `npm run growth:assets` for the priority page:

- Reddit post
- LinkedIn post
- Pinterest concept
- AI directory description
- Backlink outreach email
- Product sharing message

### 4. Manual action plan (max 6)

Each action includes: action, channel, asset, target page, effort, expected impact, approval needed, why now.

Default sequence:

1. Request indexing (Search Console)
2. Publish Reddit / community post
3. Share with small private group
4. Submit to one directory
5. Send one backlink outreach email
6. Review results after 7 days

### 5. Publishing order

Numbered steps matching the action plan.

### 6. Guardrails

- No spam
- Do not post same copy everywhere
- Avoid TikTok until video strategy exists
- No automated publishing
- Human approval required
- Plus Growth Assistant “things NOT to do”

### 7. Measurement plan (7 days)

Check manually in Vercel / Search Console / GA4:

- Vercel visitors
- Search Console impressions
- Search Console clicks
- Referrers
- AI assistant traffic
- CTA clicks
- Games created

### 8. Next campaign recommendation

Suggests the following week's focus page and theme from Authority Roadmap + Growth Assistant next sprint.

---

## Weekly workflow

```bash
npm run growth:campaign      # Full campaign plan
npm run growth:assets        # Copy assets for priority page
npm run growth:distribution  # Channel targets and rules
npm run growth:assistant     # Broader weekly context
```

1. Read campaign plan
2. Human-approve each action
3. Execute manually in publishing order
4. Wait 7 days
5. Run measurement checklist
6. Start next campaign suggestion

---

## Constraints

- No public routes or UI
- No runtime logic or external APIs
- No scraping, crawling, or auto-posting
- No OpenAI / LLM calls
- No metadata or page content modifications
- No duplicated growth engines

---

## Related docs

- `lib/growth/GROWTH_ASSISTANT.md`
- `lib/growth/GROWTH_ASSETS.md`
- `lib/growth/DISTRIBUTION_OPPORTUNITIES.md`
- `lib/growth/AUTHORITY_ROADMAP.md`
