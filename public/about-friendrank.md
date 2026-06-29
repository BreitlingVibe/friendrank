# About FriendRank

FriendRank is a free, browser-based social voting game for friend groups. A host creates a game, shares a link, and friends vote on humorous personality roles. When enough votes are collected, the group unlocks results that reveal who earned each title and a final group story.

Website: https://friendrank.app

## What FriendRank is

FriendRank turns your friend group into a playful ranking game. Each game asks a short series of questions—one per category—such as who is the Main Character or the Chaos Agent. Friends vote for each other. Results aggregate into role assignments, group verdicts, and shareable story-style output.

The experience is designed for group chats, parties, and icebreakers. It works on phones without installing an app.

## How it works

The core loop has four steps:

1. **Create** — The host enters friend names, optional vibe tags, tone, and optional custom categories on the homepage.
2. **Invite** — FriendRank generates a unique game link. The host copies and shares it (WhatsApp, iMessage, Discord, etc.).
3. **Vote** — Each friend opens the link and votes through five category questions on their phone.
4. **Reveal** — When enough friends have voted, results unlock with ranked roles, group narrative sections, and shareable cards.

## Create

On https://friendrank.app, the host fills in:

- **Group members** — Comma-separated names (minimum two friends).
- **Group vibe** — Up to three optional tags (for example Chaotic, College, Discord) that influence question flavor.
- **Inside joke / extra context** — Optional free text to personalize questions.
- **Game tone** — Funny, Savage but friendly, Wholesome, or Chaotic.
- **Custom categories** — Up to three optional custom prompts; blank slots use FriendRank defaults.

Each game includes five categories total. Custom entries replace default slots when provided.

## Invite

After creation, the host receives a share link in the form:

`https://friendrank.app/game/{share_code}`

The host sends this link to the group. No account or app download is required for invitees.

## Vote

When someone opens the game link, they see the voting flow:

- One question at a time, mapped to a category.
- They tap a friend name to vote.
- Progress is shown until all five questions are answered.
- A browser-local token prevents the same device from voting twice in the same game.

Votes are stored per game session. Individual vote choices are not shown to other players in the UI.

## Reveal

Results unlock after enough distinct votes are collected. For current games, the threshold is at least two votes and scales with group size (the required count matches the number of friends in the game, with a minimum of two).

When unlocked, the results page shows:

- Top ranked friends per category
- Group verdict and vibe narrative
- Dangerous combo pairings
- Group reputation summary
- Ending highlight card
- Options to share or download a results card

## Anonymous voting

FriendRank does not require sign-in. Each voter is identified only by a random token stored in the browser for that game. Vote choices are aggregated; the product does not expose a public leaderboard of who voted for whom.

## Categories

Each game uses five categories. FriendRank ships with a library of built-in roles (Main Character, Chaos Agent, Secret Villain, and others). The host can override slots with custom category prompts. See `/docs/categories.md` for the full built-in list.

## Tone selection

Tone affects how questions and results are phrased:

- **Funny** — Light, playful wording.
- **Savage but friendly** — Sharper humor with a social-safe edge.
- **Wholesome** — Warm, low-drama framing.
- **Chaotic** — Maximum group-chat energy.

Tone is chosen at game creation and applies to the whole game.

## Custom categories

Hosts can enter up to three custom category prompts, such as “Most likely to disappear from the group chat.” FriendRank converts these into category labels and vote questions. Empty custom fields fall back to curated defaults from the built-in library.

## Reveal system

Results remain locked until the vote threshold is met. A progress indicator shows votes collected versus required. After unlock, narrative sections are generated from aggregated votes and the group’s tone and vibe tags.

## Privacy

- No account signup is required to create or play.
- Games are accessed by unlisted share links (`share_code` URLs).
- Voter identity is a browser-local token, not a personal profile.
- Individual ballots are not displayed to the group; only aggregated outcomes appear in results.

## Mobile friendly

FriendRank runs in the mobile browser. The voting UI, progress indicators, and results views are optimized for phone screens. No native app install is needed.

## No signup required

Creators and voters can use FriendRank immediately. Game creation, voting, and viewing results do not require email, password, or OAuth.

## Typical use cases

- **Parties** — Quick group activity between friends in the same room or on group chat.
- **Friend groups** — Inside-joke rankings and “main character” debates.
- **Couples** — Playful duo or double-date icebreaker with extended friend lists.
- **Icebreakers** — Low-friction intro activity for new groups, classes, or teams.
- **Team building** — Light-hearted remote bonding; optional Office vibe tag.
- **Online communities** — Discord servers, gaming groups, and meme-heavy group chats sharing results cards.

## Learn more

- FAQ: https://friendrank.app/docs/faq.md
- Categories reference: https://friendrank.app/docs/categories.md
- LLM entry point: https://friendrank.app/llms.txt
