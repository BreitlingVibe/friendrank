# FriendRank Categories

Reference for built-in categories and custom category behavior. Website: https://friendrank.app

Each FriendRank game uses **five categories**. Each category becomes one vote question and one results slot. The host can replace up to three slots with custom prompts; remaining slots are filled from the built-in library below.

## How categories work in a game

- **Vote question** — Built-in categories generate questions like “Who is the Main Character?” Categories whose labels start with “Most likely” become “Who is most likely to …?”
- **Results label** — The category label and emoji appear on the results page.
- **Nickname** — A longer display title (for example “Certified Chaos” for Chaos Agent) may appear in narrative sections.
- **Ranking** — Votes are tallied per category; top-voted friends surface in that category’s results.

Games always include exactly five categories, regardless of how many custom entries the host provides.

## Built-in categories

FriendRank ships with twelve curated categories. A given game uses five of them (unless custom categories take some slots).

### Main Character 👑

**Nickname:** The Main Character

The friend who feels like the center of every story—the one events orbit around. The vote question is: “Who is the Main Character?”

### Chaos Agent 🔥

**Nickname:** Certified Chaos

The friend who starts or escalates chaos, often accidentally. Vote question: “Who is the Chaos Agent?”

### Secret Villain 💀

**Nickname:** Secret Mastermind

The friend secretly pulling strings or stirring drama from the shadows. Vote question: “Who is the Secret Villain?”

### Most Delusional 🌪️

**Nickname:** Walking Plot Twist

The friend with the most unhinged or confidently wrong takes. Vote question: “Who is the Most Delusional?”

### Chronically Online 📱

**Nickname:** Chronically Online Legend

The friend who lives in group chats, memes, and internet culture. Vote question: “Who is the Chronically Online?”

### Future Influencer ✨

**Nickname:** Future Influencer

The friend most likely to turn personality into content or clout. Vote question: “Who is the Future Influencer?”

### Most Likely To Go Viral 🚀

**Nickname:** Viral Waiting to Happen

The friend whose moments are one post away from blowing up. Vote question: “Who is most likely to go viral?”

### Group Therapist 🧠

**Nickname:** Emotional Support Human

The friend who listens, mediates, and keeps the group emotionally steady. Vote question: “Who is the Group Therapist?”

### Walking Red Flag 🚩

**Nickname:** Red Flag With Confidence

The friend with questionable choices delivered with full confidence. Vote question: “Who is the Walking Red Flag?”

### Green Flag Award 💚

**Nickname:** Green Flag Energy

The friend who is consistently kind, reliable, or emotionally safe. Vote question: “Who is the Green Flag Award?”

### Plot Twist Generator 🎭

**Nickname:** Plot Twist Generator

The friend who surprises the group with unexpected news or behavior. Vote question: “Who is the Plot Twist Generator?”

### Most Likely To Get Cancelled 😬

**Nickname:** Cancel-Worthy Legend

The friend most likely to say something that ages poorly online. Vote question: “Who is most likely to get cancelled?”

## What each category changes

| Aspect | Effect |
|--------|--------|
| Vote screen | One dedicated question per category |
| Results page | One ranked outcome block per category |
| Narrative | Category winners feed group verdict, combos, and story text |
| Tone | Wording of questions and results follows the game tone (Funny, Savage but friendly, Wholesome, Chaotic) |
| Vibe tags | Optional tags (Chaotic, College, etc.) further flavor generated copy |

Categories do not change game rules, vote count required, or the five-question structure.

## Custom categories

Hosts can enter up to three custom prompts when creating a game. FriendRank normalizes the text into a category label and vote question.

### How custom slots are filled

- Custom entries you provide are used first.
- If you enter fewer than three customs, built-in defaults fill the remaining slots until the game has five categories total.
- If a custom label duplicates a built-in label (case-insensitive), that built-in category is skipped when filling defaults.

### Custom question formats

FriendRank accepts several input styles:

- **Plain trait** — `Chaos Agent` → “Who is the Chaos Agent?”
- **Most likely** — `Most likely to disappear from the group chat` → “Who is most likely to disappear from the group chat?”
- **Name-is-trait** — `Alex is always late` → label derived from the trait; question asks who fits it

Custom categories receive an emoji from a small rotating set (✨, 🎯, 💬) and a generated nickname based on the label.

### Example custom categories

These are typical host-written prompts (also suggested as placeholders in the create form):

- Most likely to disappear from the group chat
- Most likely to start drama and deny it
- Most likely to be late but somehow forgiven

Other examples that work well:

- Who always has the worst takes
- Most likely to become famous by accident
- The friend who never reads the room
- Most likely to win an argument they should lose

### Custom vs built-in

| | Built-in | Custom |
|---|----------|--------|
| Source | FriendRank library | Host-entered text |
| Count per game | Up to five (minus customs) | Up to three |
| Emoji | Fixed per category | ✨, 🎯, or 💬 |
| Nickname | Predefined | Generated from label |

## Vibe tags (related)

Vibe tags are not categories. They are optional context chips (up to three per game) such as Meme-heavy, Gaming, Discord, or Office. They influence tone of generated questions and results but do not add extra vote questions.

## Learn more

- Product overview: https://friendrank.app/about-friendrank.md
- FAQ: https://friendrank.app/docs/faq.md
- LLM entry point: https://friendrank.app/llms.txt
