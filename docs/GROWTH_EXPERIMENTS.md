# FriendRank Growth Experiments

Controlled page-level tests tied to Search Console query-to-page evidence. One target URL per experiment; measure before changing additional pages.

---

## Active experiments

### Voting Game Online CTR Test

| Field | Value |
|-------|-------|
| **Status** | pending_measurement |
| **Target query** | `voting game online` |
| **Target page** | `/group-voting-game` |
| **Deployment date** | _TBD — fill when deployed to production_ |
| **Measurement date** | _TBD — 7–14 days after Google recrawls_ |

#### Search Console before-state

| Page | Impressions | Clicks | CTR |
|------|-------------|--------|-----|
| `/group-voting-game` (primary) | 19 | 1 | ~5.3% |
| `/anonymous-voting-game` | 6 | 1 | ~16.7% |
| `/anonymous-voting-games` | 2 | 0 | 0% |

#### Metadata change (target page only)

| Field | Before | After |
|-------|--------|-------|
| **Title** | Group Voting Game \| Create a Friend Vote Online \| FriendRank | Online Voting Game for Groups \| FriendRank |
| **Description** | Create a group voting game for friends. Invite your group, vote on funny roles, unlock results together, and share the story. | Start a free online voting game for groups and friends. Share one link, vote privately from any phone, reveal results together — no app download. |

#### Visible copy changes (target page only)

- **H1:** Group Voting Game for Friends → Online Voting Game for Groups
- **Hero subtitle:** Reframed around online voting, one link, private votes, shared reveal, no app download
- **Primary CTA:** Create your FriendRank game → Start an online voting game
- **Intent summary:** Tightened to emphasize browser-based online group voting

#### Supporting differentiation (non-metadata)

- Contextual cross-links on `/group-voting-game` and `/anonymous-voting-game`
- Guide copy note on `/anonymous-voting-games` internal links intro
- No metadata changes on non-target pages

#### Metrics to track

- Impressions for query `voting game online`
- Clicks and CTR on `/group-voting-game`
- Average position for target query
- Organic visits to `/group-voting-game`
- Create-game CTA clicks (`landing_group_voting_game`)
- Games created from page entry, if measurable in GA4

#### Recommended measurement window

7–14 days after Google recrawls the page. Compare against the before-state table above.

#### Result

_Pending — record impressions, clicks, CTR, and decision here after measurement window._

---

## Experiment rules

1. One primary target URL per Search Console query cluster unless evidence shows a different page owns the query.
2. Do not change metadata on sibling pages during a single-URL experiment.
3. Growth Assistant recommendations are hypotheses; Search Console query-to-page evidence determines which URL is optimized.
4. Record before-state, deployment date, and measurement date for every experiment.
