# FriendRank Generative Engine Optimization (GEO)

Internal build-time layer that makes FriendRank pages easier for modern AI systems (ChatGPT, Gemini, Claude, Perplexity, Copilot, and future LLM search engines) to understand, summarize, and reference confidently.

GEO does **not** change public UI, routes, or runtime behavior. It adds deterministic internal metadata during page assembly.

## What GEO is

Generative Engine Optimization prepares content for **AI-assisted discovery** — the way users find answers through chat interfaces and AI overviews instead of only traditional blue links.

FriendRank GEO adds a structured `geoFoundation` object to assembled pages with:

- Primary and supporting entities
- User intent, audience, content type, and page purpose
- Semantic relationships between concepts
- A machine-readable summary (internal only, not JSON-LD or hidden HTML)
- Content signal graphs (`primaryTopics`, `secondaryTopics`, `relatedConcepts`, `conversationConcepts`, `intentConcepts`)

## SEO vs GEO

| SEO | GEO |
|-----|-----|
| Optimizes for crawlers and search result snippets | Optimizes for LLM comprehension and citation |
| Titles, meta, canonical, sitemap | Entity clarity, intent, purpose, semantic graph |
| Keyword and CTR focus | Summarization and confidence focus |
| Public metadata | Internal build metadata + existing public content |

FriendRank keeps SEO and GEO separate. SEO layers (`metadata`, schema, sitemap) remain unchanged. GEO enriches assembled page models after content experience transforms.

## How AI assistants consume content

LLM systems typically:

1. Crawl or retrieve page text and structured signals
2. Identify the **primary topic** and **audience**
3. Infer **intent** (discover, create, learn, play)
4. Summarize whether the page is a trustworthy answer
5. Cross-link related concepts for follow-up questions

GEO makes steps 2–4 explicit in build metadata so internal audits can verify every indexable page has:

- A clear primary entity
- A defined audience
- An approved intent label
- A concise summary under 300 characters
- A populated topic graph

## How FriendRank is prepared

Assembly pipeline:

```
Landing pages:
assembleLandingPage()
  → content quality
  → content variation
  → content experience
  → applyGeoFoundation()
  → applyAiCitationLayer()

Topic hubs:
assembleTopicHubPage()
  → applyTopicHubExperience()
  → applyGeoFoundation()
  → applyAiCitationLayer()
```

Homepage GEO and AI citation are generated at audit/report time via `buildHomepageGeoFoundation()` and `buildHomepageAiCitation()`.

Run validation:

```bash
npm run geo:report
npm run ai:citation
```

## GEO foundation fields

| Field | Example |
|-------|---------|
| `primaryEntity` | Friend Games |
| `supportingEntities` | Best Friend Quiz, Party Games |
| `relatedEntities` | Icebreaker Questions |
| `userIntent` | discover |
| `audience` | friends |
| `contentType` | topic-hub |
| `purpose` | exploration |
| `summary` | This page helps groups discover online friend games… |
| `contentSignals` | Topic and concept graphs for machine readability |

## Validation rules

`validateGeoFoundation()` checks:

- Every page has a primary entity
- Every page has an audience
- Every page has an approved intent
- Summary exists and is ≤ 300 characters
- Topic graph is populated (primary topics + related layers)
- All landing pages include `geoFoundation` after assembly

## AI Citation Layer

The AI Citation layer runs **after** GEO Foundation and prepares every page to be easily understood, summarized, and confidently cited by modern AI assistants.

It adds an internal `aiCitation` object (not rendered, not JSON-LD, not hidden HTML) with:

| Field | Purpose |
|-------|---------|
| `canonicalAnswer` | 60–140 word answer to “What is this page about?” |
| `likelyQuestions` | Deterministic user questions an AI might ask |
| `evidence` | Structured facts (audience, duration, play style, etc.) |
| `keyTakeaways` | Exactly three concise bullet points |
| `citationSummary` | ≤280 character paragraph an AI should quote |
| `relatedKnowledge` | Concept graph, alternatives, complementary pages |
| `citationConfidence` | High / Medium / Low based on metadata completeness |

### SEO vs GEO vs AI Citation

| Layer | Focus |
|-------|-------|
| **SEO** | Crawlers, snippets, rankings |
| **GEO** | Entity clarity, intent, topic graphs |
| **AI Citation** | Canonical answers, evidence, quotable summaries |

SEO handles public discovery. GEO structures semantic meaning. AI Citation packages that meaning into citation-ready blocks for LLM summarization.

### How modern AI assistants summarize pages

LLM systems typically:

1. Retrieve page content and any structured signals
2. Identify the primary topic and audience
3. Generate or match a concise answer
4. Pull supporting evidence for follow-up questions
5. Decide whether to cite the page with confidence

The AI Citation layer makes steps 3–5 explicit in build metadata so audits can verify every indexable page has a canonical answer, question mapping, evidence, takeaways, and a quotable summary.

### AI Citation validation

`validateAiCitationLayer()` checks:

- Canonical answer exists (60–140 words)
- Citation summary exists (≤ 280 characters)
- At least 3 likely questions
- Exactly 3 key takeaways
- Evidence block fully populated
- Related knowledge graph populated
- Citation confidence assigned

## Future GEO roadmap

Potential follow-up sprints (not in scope yet):

- **Sprint 3:** FAQ and how-to answer blocks tuned for LLM citation patterns
- **Sprint 4:** Cross-page entity graph exports for internal RAG tooling
- **Sprint 5:** GEO-aware content experiments tied to Search Console + AI referral monitoring
- **Sprint 6:** Optional public schema alignment once summaries prove stable in audits

## Related commands

```bash
npm run geo:report
npm run ai:citation
npm run growth:ctr
npm run growth:search-console-plan
npm run audit:all
```

## Source files

- `lib/geo/geo-foundation.ts` — `applyGeoFoundation()`, types, builders
- `lib/geo/ai-citation.ts` — `applyAiCitationLayer()`, types, builders
- `lib/seo/validation/geo-validation.ts` — GEO validation and report formatting
- `lib/seo/validation/ai-citation-validation.ts` — AI citation validation and report formatting
