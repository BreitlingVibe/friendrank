# FriendRank Distribution Assets

Build-time distribution asset pack for itch.io, browser game directories, Product Hunt, Reddit, LinkedIn, Pinterest, and AI directories.

This is not a product redesign, not a public route, and not runtime logic inside the main FriendRank app.

## Asset inventory

| File | Dimensions | Used for |
|------|------------|----------|
| `public/distribution/friendrank-itch-cover.png` | 630×500 | itch.io cover image |
| `public/distribution/friendrank-itch-screenshot-1.png` | 1280×720 | Hero / product overview screenshot |
| `public/distribution/friendrank-itch-screenshot-2.png` | 1280×720 | Voting / cards / gameplay screenshot |
| `public/distribution/friendrank-itch-screenshot-3.png` | 1280×720 | Results / social proof screenshot |
| `public/distribution/friendrank-og-distribution.png` | 1200×630 | Open Graph / social sharing for directories |
| `public/distribution/friendrank-directory-square.png` | 512×512 | Square directory thumbnail |
| `public/distribution/friendrank-product-hunt-preview.png` | 1270×760 | Product Hunt gallery preview |

All images are generated from the approved FriendRank logo (`public/icon-512.png`) and existing OG artwork (`public/og/friendrank-og.png`). No new logo or production UI changes are introduced.

## itch.io launcher package

| Path | Purpose |
|------|---------|
| `distribution/itch-launcher/index.html` | Branded launcher landing screen |
| `distribution/itch-launcher/styles.css` | Launcher styling |
| `distribution/itch-launcher/icon-192.png` | Approved logo mark |
| `distribution/itch-launcher/README.md` | Launcher notes |
| `distribution/friendrank-itch-launcher.zip` | Upload-ready ZIP for itch.io |

The launcher only points users to the official hosted FriendRank web app at `https://friendrank.app`. It does not include gameplay, login, tracking, credentials, or external APIs.

## itch.io setup instructions

1. Create a new itch.io project.
2. Choose project kind **HTML**.
3. Upload **`distribution/friendrank-itch-launcher.zip`** as the downloadable/playable package.
4. Set cover image to **`public/distribution/friendrank-itch-cover.png`**.
5. Upload screenshots:
   - `public/distribution/friendrank-itch-screenshot-1.png`
   - `public/distribution/friendrank-itch-screenshot-2.png`
   - `public/distribution/friendrank-itch-screenshot-3.png`
6. Set the project URL / external link field to **`https://friendrank.app`** if available.
7. Publish manually after human review. No auto-posting.

## Recommended itch.io listing

| Field | Recommendation |
|-------|----------------|
| Title | FriendRank |
| Tagline | Create hilarious voting games for friends, parties, and teams. |
| Genre | Party |
| Tags | browser, multiplayer, party, friends, voting, web |
| Pricing | Free or name your own price ($0 recommended) |
| Visibility | Draft first, then public after copy approval |
| Project type | HTML |

## Reuse beyond itch.io

| Channel | Assets to use |
|---------|---------------|
| Browser game directories | cover, screenshots 1–3, square thumbnail, OG image |
| Product Hunt | `friendrank-product-hunt-preview.png`, OG image, square thumbnail |
| Reddit / LinkedIn | OG image, screenshot 1 or 3 |
| Pinterest | OG image or square thumbnail |
| AI directories | square thumbnail, OG image, one-sentence copy from growth assets |

## Generate assets

```bash
node scripts/generate-distribution-assets.mjs
```

This regenerates:

- all files under `public/distribution/`
- launcher icon copy
- `distribution/friendrank-itch-launcher.zip`

## Verify assets

```bash
npm run distribution:verify
```

Checks:

- required distribution PNG files exist with expected dimensions
- launcher HTML/CSS/icon exist
- launcher ZIP exists
- launcher references `https://friendrank.app`
- launcher has no forbidden external scripts

Registry source of truth: `lib/growth/distribution-assets.ts`

Validation: `lib/seo/validation/distribution-assets-validation.ts`

## Guardrails

- No new public app routes
- No production gameplay or page content changes
- No runtime logic in the main app
- No analytics or tracking in the launcher
- No credentials or external APIs
- Human approval required before any external publish
