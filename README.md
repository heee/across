# Across 🧩

A mobile-first PWA for solving crosswords together with 2–8 friends in real
time. Same philosophy as Boys Pushup Bonanza: no build step, no framework,
GitHub Pages for the static front-end, a Cloudflare Worker holding the one
GitHub credential server-side. The one new piece Bonanza didn't need: a
Cloudflare **Durable Object** holding live in-progress grid state, so
letters typed by one player show up on everyone else's screen in well under
a second — a plain commit-to-GitHub-per-write pattern is far too slow for
that.

Everything the front-end needs is static: `index.html` + `style.css` +
`app.js`, plus `manifest.json` and `sw.js` for installing it as a PWA.
`worker/` holds the Worker code — REST endpoints, the puzzle generator, and
the `PuzzleRoom` Durable Object class.

---

## 1. Try it locally first (no Cloudflare/GitHub needed yet)

The app runs entirely client-side against a localStorage + BroadcastChannel
mock backend whenever `config.js` still has its placeholder `WORKER_URL` —
this is what's active out of the box. Open two browser tabs on the same
puzzle and typed letters sync between them live, same as the real thing
will, just scoped to one browser instead of the internet.

```bash
npm run serve
```

Then open `http://localhost:8080`. Pick a name (or add one), create a
puzzle, open it in a second tab to see live sync.

**Before checking any change**, per this repo's own convention below:
unregister service workers and clear caches, or you'll be debugging a
stale cached copy instead of your actual edit (DevTools → Application →
Service Workers → Unregister, and Clear storage).

## 2. Create the GitHub repo and seed `data.json`

1. Create a new GitHub repository (public or private both work), e.g. `across`.
2. Push all the files in this project to it.
3. Add a `data.json` file at the repo root with exactly:
   ```json
   { "users": {}, "puzzles": {} }
   ```
   This is the shared database — the Worker reads/writes it via the GitHub
   Contents API, same as Bonanza's `data.json`.

## 3. Generate one fine-grained GitHub token (you only, one time)

Same as Bonanza: **Settings → Developer settings → Personal access tokens →
Fine-grained tokens**. Repository access: only the `across` repo.
Permissions: **Contents: Read and write**. Set an expiration and note it
to renew later. Copy the token — you'll paste it into the Worker next.

## 4. Deploy the Cloudflare Worker + Durable Object

This project has **two ways to do this** — pick whichever applies to you.

### Option A — Cloudflare MCP (if you set it up)

If you installed the Cloudflare MCP plugin (`claude plugin install
cloudflare@cloudflare` + `/reload-plugins`, with a one-time OAuth login),
Claude can create the Worker, push `worker/index.js` (or the bundled
`worker/dist/bundle.js`), and configure the `PUZZLE_ROOM` Durable Object
binding directly through that connection — no dashboard clicking required.
Ask Claude to deploy once you're ready; it'll walk you through anything
that still needs your direct approval (e.g. the OAuth consent itself).

### Option B — Cloudflare dashboard, by hand

This is the same "no wrangler" path Bonanza uses, since `wrangler`/`workerd`
still has no Windows-ARM64 build (confirmed — `npm install wrangler` fails
outright on this kind of machine, not just `wrangler dev`).

1. Sign in at <https://dash.cloudflare.com> (free plan is enough).
2. **Workers & Pages → Create → Create Worker.** Name it e.g. `across-worker`,
   deploy the default template first, then open **Edit code**.
3. If your dashboard's code editor supports multiple files (the modern
   "Edit code" view generally does): create `corpus.js`, `generator.js`,
   and `index.js` matching this repo's `worker/` folder, paste each file's
   contents in, and deploy. **If it's the older single-file Quick Edit**
   instead, run `node scripts/bundle-worker.cjs` and paste the single
   resulting `worker/dist/bundle.js` instead — same code, pre-flattened.
4. **Settings → Variables and Secrets**, add:
   - `GH_OWNER` (var) — your GitHub username/org
   - `GH_REPO` (var) — `across`
   - `GH_BRANCH` (var) — `main`
   - `ALLOWED_ORIGIN` (var) — your GitHub Pages URL, e.g. `https://<owner>.github.io`
   - `GITHUB_TOKEN` (**secret**) — the fine-grained token from step 3
   - `APP_KEY` (**secret**) — any random string; paste the same string into `config.js` next
5. **Settings → Bindings → Add → Durable Object.** This is the one
   dashboard-only step with no Quick-Edit equivalent — binding name
   `PUZZLE_ROOM`, class name `PuzzleRoom`. The dashboard handles the
   storage migration automatically the first time you do this.
6. Note the Worker's URL from its overview page
   (`https://across-worker.<subdomain>.workers.dev`).
7. Edit `config.js` in this repo:
   ```js
   const WORKER_URL = "https://across-worker.<subdomain>.workers.dev";
   const APP_KEY = "<the same random string from step 4>";
   ```
   Commit and push — the app switches out of local-mock mode automatically
   once `WORKER_URL` no longer contains the placeholder text.

> **On `APP_KEY`:** same caveat as Bonanza — it's visible in public client
> source, so it's a speed bump against casual poking at your Worker URL,
> not real security. `GITHUB_TOKEN` is the actual secret and never leaves
> the Worker.

## 5. Deploy to GitHub Pages

Same as Bonanza: **Settings → Pages → Deploy from a branch → main → / (root)**.
No build step — any push redeploys.

## 6. Add it to your phone

Open the Pages URL in **Safari** on iPhone (must be Safari for the PWA
install to work) → Share icon → **Add to Home Screen**. Launches fullscreen,
Wake Lock keeps the screen on during a session.

---

## How the shared data + realtime sync works

- **Durable, cross-session data** (users, puzzle metadata, final grids,
  completion stats) lives in `data.json` in GitHub, written through the
  Worker's REST endpoints using the same fetch-fresh-sha/retry pattern as
  Bonanza's `commitMutation` — so two things finishing at once (two puzzles
  completing, a join + a create) don't clobber each other.
- **Live in-progress grid state** (the actual letter-by-letter typing) never
  touches GitHub directly. Each active puzzle gets one `PuzzleRoom` Durable
  Object instance; players connect to it over WebSocket, and every cell
  update broadcasts to everyone else's socket in real time. The DO
  periodically (and always on completion) snapshots its state back into
  `data.json` via the Worker's GitHub-commit helpers, so a finished puzzle
  is durably recorded even though the play-by-play wasn't.
- If a client disconnects mid-puzzle, reconnecting re-fetches the DO's
  current state — nothing is lost, since the DO's own storage (not just
  in-memory) is the source of truth while a puzzle is active.

## Puzzle generation

`worker/corpus.js` is a **hand-authored** word/clue bank (a few hundred
entries across Geography, Movies, History, Sports, Science, Food, Kids, and
general fill words) — written from scratch rather than pulled from a
published/scraped crossword corpus, to avoid redistributing someone else's
copyrighted clue text. `worker/generator.js` runs a real constraint-based
interlocking fill (place the longest word, then greedily place further
words at valid intersections, crop to the used bounding box, number per
standard crossword convention) constrained by the requested keywords, size,
and difficulty.

This is **v1-quality, not NYT-quality**: grids are sparser than a proper
symmetric-block-pattern constructor would produce, and the corpus is small
enough that repeat plays will start recognizing words. Two natural
follow-ups once real usage shows where it pinches:
- Grow `corpus.js`, or swap in a larger licensed word/clue dataset.
- Replace the greedy fill with proper backtracking against a symmetric
  block template for denser, more traditional-looking grids.

## Scoring rules (in case they're surprising)

- **Reveal** (Assist → Reveal cell/word/puzzle): revealed letters are
  attributed to no player and excluded entirely from contribution %,
  letters-entered, and accuracy stats — reveal is a genuine assist, not a
  way to inflate your stats.
- **Auto Check**: a binary per-puzzle-session flag per player. If it was
  ever on during a given puzzle, that player's entire contribution to that
  puzzle counts at half weight in Completion's Contribution card and in
  Rankings.
- **Player color** (the OKLCH hue used everywhere — tiles, avatars,
  rankings) is assigned once, globally, the first time a name is ever used
  on the app. It never changes, and it's the same across every puzzle.

## Notes & limitations

- Identity is name-only, exactly like Bonanza — no password. Fine for a
  small trusted friend group; someone could type a friend's name on
  purpose. Not a real auth system.
- "Private" visibility means invite-link-only (never appears in
  Search/Discovery); it is not a fixed per-user invite list.
- All 11 spec'd Rankings metrics are implemented from real per-session data
  (`METRIC_DEFS` in `app.js`), including the two "lowest is best" ones
  (reveal usage, auto check usage), which sort ascending instead of
  descending. "Words completed" only tracks the actively-selected word at
  the moment it's finished — a crossing word completed by the same
  keystroke but not currently selected won't count. Players with no
  relevant activity in a given window/metric are excluded from that list
  rather than shown at 0%.
- Create's "Advanced controls" toggle is present but intentionally inert
  for v1 (per the build plan) — fine-grained grid-size/vocabulary controls
  are a later phase.

## Working conventions

See `CLAUDE.md`.
