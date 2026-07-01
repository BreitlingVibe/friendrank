# Search Console Readiness

Use this checklist after deploying FriendRank SEO changes and before scaling content.

## Pre-submit local checks

```bash
npm run audit:index
npm run audit:all
npm run build
```

Fix all audit errors before requesting indexing in Search Console.

## Search Console setup checklist

1. **Verify domain property**
   - Add `friendrank.app` as a Domain property in [Google Search Console](https://search.google.com/search-console).
   - Complete DNS verification through your domain provider.

2. **Submit sitemap**
   - Submit `https://friendrank.app/sitemap.xml`.
   - Confirm the submitted URL count matches live landing pages + topic hubs + homepage.

3. **Request indexing for priority URLs**
   - Use URL Inspection for the priority list below.
   - Request indexing for new or materially updated pages only.

4. **Monitor Coverage / Pages report**
   - Watch for `Indexed`, `Crawled - currently not indexed`, and `Discovered - currently not indexed`.
   - Investigate spikes in excluded pages after deploys.

5. **Monitor Crawl stats**
   - Confirm crawl rate is stable after sitemap submission.
   - Watch for sudden increases in 404 or redirect responses.

6. **Monitor Performance**
   - Track queries and pages weekly.
   - Compare hub pages vs landing pages to spot cannibalization early.

7. **Watch canonical issues**
   - Review **Duplicate without user-selected canonical** in the Pages report.
   - Fix conflicting canonicals in metadata helpers before re-requesting indexing.

8. **Watch indexing backlog signals**
   - **Discovered – currently not indexed**: usually discovery or quality signals; confirm internal links and sitemap inclusion.
   - **Crawled – currently not indexed**: review content depth, overlap warnings from `npm run audit:index`, and page uniqueness.

9. **Track the first 20 priority URLs manually**
   - Record index status weekly for the list below until stable.

## Recommended initial indexing priority

Submit and inspect these URLs first after launch or major SEO deploys.

### Tier 1 — Core entry points

1. `https://friendrank.app/`
2. `https://friendrank.app/friend-games`
3. `https://friendrank.app/party-games`
4. `https://friendrank.app/team-building-games`
5. `https://friendrank.app/relationship-games`
6. `https://friendrank.app/icebreaker-games`
7. `https://friendrank.app/question-games`

### Tier 2 — Strongest landing pages

8. `https://friendrank.app/most-likely-to-generator`
9. `https://friendrank.app/best-friend-quiz`
10. `https://friendrank.app/who-knows-me-best`
11. `https://friendrank.app/party-voting-game`
12. `https://friendrank.app/team-building-game`
13. `https://friendrank.app/icebreaker-game`
14. `https://friendrank.app/relationship-quiz`
15. `https://friendrank.app/anonymous-voting-game`

### Tier 3 — Newest authority pages

16. `https://friendrank.app/pregame-games`
17. `https://friendrank.app/family-reunion-games`
18. `https://friendrank.app/new-employee-games`
19. `https://friendrank.app/classroom-games`
20. `https://friendrank.app/vacation-games`

## What each index audit checks

| Audit section | Purpose |
| --- | --- |
| Canonical URLs | Production domain, slug alignment, no duplicates |
| Metadata consistency | Titles, descriptions, Open Graph, robots for live pages |
| Sitemap quality | Complete URL set, valid priority/changefreq, no planned URLs |
| Robots readiness | Sitemap reference, no accidental public blocks |
| Search overlap | Similar slugs, titles, descriptions, shared keywords |
| Content completeness | Hero, FAQ, entity sections, structured data essentials |

See also [lib/entities/README.md](../entities/README.md) for the full audit pipeline.

## Fixing common Search Console issues

| Signal | Likely cause | Fix |
| --- | --- | --- |
| Duplicate without user-selected canonical | Conflicting canonical or near-duplicate pages | Run `npm run audit:index`, fix canonical/metadata overlap warnings |
| Discovered – currently not indexed | Weak internal links or new URL | Confirm sitemap + hub/landing internal links; request indexing after fixes |
| Crawled – currently not indexed | Thin or overlapping content | Review content completeness audit and overlap warnings |
| Soft 404 | Missing route or bad metadata | Run `npm run audit:all` route and metadata checks |
| Sitemap could not be read | Robots or deploy issue | Verify `https://friendrank.app/robots.txt` references sitemap |

## Ongoing cadence

- Before every SEO deploy: `npm run audit:all` + `npm run build`
- Weekly after launch: review Search Console Coverage and Performance for priority URLs
- After adding live pages: re-submit sitemap and inspect new canonical URLs only

No Search Console API integration is included yet. Track status manually in the Search Console UI.
