# FriendRank itch.io Launcher

Static launcher package for itch.io distribution.

## What this is

- A tiny HTML launcher that explains FriendRank and links to the official hosted app.
- Not a standalone game build.
- No backend, tracking, credentials, or external APIs.

## Files

- `index.html` — branded landing screen with CTA opening `https://friendrank.app` in a new tab
- `styles.css` — launcher styling using approved FriendRank colors
- `icon-192.png` — approved logo mark copied from `public/icon-192.png`
- `README.md` — this file

## Upload package

Use the generated ZIP at `distribution/friendrank-itch-launcher.zip`.

It contains the launcher files with valid relative paths for itch.io HTML projects.

## Regenerate

```bash
node scripts/generate-distribution-assets.mjs
```

This also regenerates distribution images under `public/distribution/`.
