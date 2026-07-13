# FriendRank AI Growth Assistant

Unified weekly growth report that **orchestrates existing systems only**. It does not call external APIs, LLMs, or duplicate SEO/GEO engines.

```bash
npm run growth:assistant
```

Source: `lib/growth/growth-assistant.ts`

---

## Purpose

FriendRank has separate growth tools for priorities, Search Console planning, CTR candidates, authority roadmap, GEO foundation, AI citation, and audits. The Growth Assistant combines them into **one actionable weekly report** with:

- Executive summary and confidence score
- Traffic signals and monitoring targets
- Prioritized weekly actions (max 6)
- Channel focus / defer / ignore decisions
- Content promotion picks
- Authority outreach targets
- Things NOT to do (anti-waste guardrails)
- Next sprint recommendation

---

## Aggregated sources

| Module | Data used |
|--------|-----------|
| `growth-priority.ts` | Priority URLs, P0/P1 tiers, position 8–30 targets |
| `search-console-action-plan.ts` | Indexing queue, action plan, monitoring URLs |
| `ctr-optimization.ts` | CTR candidates and validation status |
| `authority-roadmap.ts` | Channel matrix, authority targets, weekly cadence |
| `geo-validation.ts` | GEO coverage and validation |
| `ai-citation-validation.ts` | Citation coverage and confidence |
| `run-full-audit.ts` | Build-time audit health |
| `landing-quality/` | Stored landing page quality audit summary |

No new engines. No runtime logic. No metadata changes.

---

## Operating cadence

| When | Command |
|------|---------|
| Weekly | `npm run growth:assistant` |
| When Search Console provides query-to-page evidence | `npm run snippets:report` |
| When choosing what content to build | `npm run opportunities` |
| Monthly or before landing-page refresh work | `npm run quality:landing` |
| Occasionally after major discovery/content changes | `npm run geo:report` |
| Only when AI citation-related code changes | `npm run ai:citation` |

---

## How to use

### Weekly workflow (recommended)

1. **Monday** — Run `npm run growth:assistant` and read Section 2 (Traffic Signals)
2. **Execute** — Work through Section 3 (Weekly Action Plan), max 6 items
3. **Cross-check** — Use Search Console and GA4 manually for impression/click data the assistant cannot access
4. **Avoid waste** — Read Section 7 (Things NOT to do) before starting experiments
5. **Plan ahead** — Use Section 8 (Next Sprint Recommendation) for the following week

### Supporting commands

```bash
npm run growth:priorities          # Detailed priority URL list
npm run growth:search-console-plan   # Indexing batches + checklist
npm run growth:ctr                   # Full CTR candidate report
npm run growth:authority-roadmap     # Channel matrix + 30-day plan
npm run geo:report                   # GEO foundation audit
npm run ai:citation                  # AI citation audit
npm run quality:landing              # Landing page quality audit (monthly / pre-refresh)
npm run opportunities                # Content opportunity roadmap
npm run snippets:report              # Snippet optimization report
npm run audit:all                    # Full build-time SEO audit
```

---

## Decision model

### Overall health (0–100 confidence)

| Score | Label | Meaning |
|------:|-------|---------|
| 85+ | Excellent | Audits pass, semantic layers healthy, growth registries complete |
| 70–84 | Good | Minor gaps — proceed with weekly plan |
| <70 | Needs Attention | Fix audit or validation failures first |

Signals weighted: audit validity, GEO pass, AI citation pass, growth priority pass, CTR validation, indexable page count, citation High-confidence coverage.

### Channel decisions

Channels are ranked using `authority-roadmap.ts` priorities, mapped to assistant labels:

Search · GEO · Reddit · Pinterest · Direct · Referral · Partnerships · LinkedIn · TikTok

Each channel gets **focus**, **defer**, or **ignore** with a deterministic reason.

### Weekly actions (max 6)

1. Request indexing (Batch 1)
2. Review Search Console (P0 URLs)
3. Review CTR candidates
4. Run backlink experiment
5. Run Reddit / community experiment
6. Monitor AI assistant traffic

Each action includes expected impact, effort, and why now.

### Content picks

Deterministic recommendations from growth priority scores and category groups:

- Best landing page to promote
- Best topic hub
- Best page for Reddit / Pinterest / AI citations / backlinks

### Things NOT to do

Prevents common waste: metadata changes without Search Console data, new landing pages, TikTok before baseline, indexing spam, engine duplication.

**Search Console rule:** Growth Assistant recommendations are hypotheses. Search Console query-to-page evidence determines which URL is optimized. Do not apply metadata experiments to multiple sibling pages from assistant output alone.

---

## Report sections

1. **Executive Summary** — Health, confidence, reasoning, top priorities
2. **Traffic Signals** — Priority URLs, indexable pages, CTR candidates, position 8–30
3. **Weekly Action Plan** — Max 6 prioritized actions
4. **Channel Recommendation** — Focus / defer / ignore
5. **Content Recommendation** — Six promotion picks with reasons
6. **Authority Recommendation** — Roadmap targets (blogs, directories, communities)
7. **Things NOT to do** — Anti-waste guardrails
8. **Next Sprint Recommendation** — One improvement focus for the following cycle

---

## Future automation vision

Potential follow-ups (not implemented):

- **Search Console import** — Parse weekly CSV exports to replace manual cross-checks
- **GA4 snapshot** — Ingest games created and CTA rates into confidence scoring
- **Experiment log** — Track which weekly actions were completed and outcomes
- **Scheduled report** — CI or cron job that posts the assistant summary after deploys
- **LLM summary layer** — Optional narrative wrapper **only after** structured report is stable (still no runtime in production app)

The assistant will remain **orchestration-only** — all intelligence stays in existing deterministic growth modules.

---

## Related docs

- `lib/growth/README.md` — Growth playbook
- `lib/growth/AUTHORITY_ROADMAP.md` — Traffic and authority roadmap
