# Across 🧩

A mobile-first PWA for solving crosswords together with 2–8 friends in real
time. GitHub Pages serves the static app. A Cloudflare Worker provides the API,
D1 stores durable users and puzzle snapshots, and one `PuzzleRoom` Durable
Object per puzzle coordinates live WebSocket play.

## Local front end

When `config.js` still has its placeholder `WORKER_URL`, the app uses a
localStorage + BroadcastChannel mock backend.

```bash
npm run serve
```

Open `http://localhost:8080`. Before any preview check, unregister service
workers, clear caches, and reload so the previous app shell cannot mask edits.

## Durable data model

`migrations/0001_initial.sql` creates:

- `users`, with stable global hue, creation time, and settings;
- `puzzles`, with indexed discovery metadata and the complete evolving puzzle
  payload in `payload_json`.

`GET /data` reconstructs the original `{ users: {}, puzzles: {} }` response, so
the client API shape is unchanged. Durable Objects still persist their live
room state locally for fast recovery and snapshot it into the matching D1 row
every 15 seconds and on completion. Revealed cells remain unattributed and
excluded from stats; Auto Check remains a per-player, per-puzzle half-weight
flag; player hue is assigned only on first-ever registration.

## First D1 import

The migration tool uses the Cloudflare HTTPS API, so it works on Windows ARM64
without Wrangler. Create a final JSON snapshot from the existing production
source and keep it outside the repository after migration.

Set:

- `CF_API_TOKEN` (or `CLOUDFLARE_API_TOKEN`) — token with D1 Edit permission;
- `CF_ACCOUNT_ID` (or `CLOUDFLARE_ACCOUNT_ID`) — Cloudflare account ID;
- optionally `CF_D1_DATABASE_ID`; otherwise `CF_D1_DATABASE_NAME` defaults to
  `across` and the script finds or creates it.

Then run:

```bash
node scripts/migrate-data-to-d1.cjs C:\path\to\final-data.json
```

The import is idempotent: users and puzzles are upserted, then every source
record is read back and compared by canonical SHA-256 digest. Key sets must
also match. Use `--verify-only` for a read-only audit. Use `--prune` only when
the destination must exactly mirror deletions in the source.

The script prints the database UUID. Set that as `CF_D1_DATABASE_ID` for Worker
deployment.

## Safe production cutover

1. Export the current GitHub `data.json` and run the initial D1 import.
2. Build and deploy with `WRITE_DISABLED=1`. `GET /data` stays available, but
   POST mutations and WebSocket connects return `503 maintenance`.
3. Export GitHub `data.json` again, rerun the D1 import, and confirm the
   record-by-record verification passes.
4. Deploy again without `WRITE_DISABLED`, then smoke-test `GET /data`, user
   registration, puzzle join/create, WebSocket updates, and persistence.
5. Remove the obsolete GitHub Worker variables/secrets if the upload did not
   already replace them. The repository no longer contains an active
   `data.json`; Git history is the rollback copy.

The maintenance gate is intentionally an explicit Worker binding. Omitting it
restores writes.

## Build and deploy the Worker

Generate the single-file dashboard/API bundle and validate it:

```bash
npm run bundle-worker
npm test
npm run validate-worker
```

Set these deployment variables:

- `CF_API_TOKEN` (or `CLOUDFLARE_API_TOKEN`) — Workers Scripts Edit permission;
- `CF_ACCOUNT_ID` (or `CLOUDFLARE_ACCOUNT_ID`);
- `CF_WORKER_NAME` — defaults to `across-worker`;
- `CF_D1_DATABASE_ID`;

The deploy script reads the current Worker settings and strictly inherits its
existing `ALLOWED_ORIGIN` and secret `APP_KEY` bindings; their values do not
need to be supplied locally. It replaces the obsolete GitHub bindings.

Then run `node scripts/deploy-worker.cjs`. The upload binds D1 as `DB` and the
existing Durable Object namespace as `PUZZLE_ROOM`. Set
`CF_APPLY_MIGRATION=1` only for the first deployment of the `PuzzleRoom` class,
not for this D1 migration. The D1 schema is applied by the import script.

The dashboard Quick Edit alternative is to paste `worker/dist/bundle.js`, then
manually configure the `DB` D1 binding and `PUZZLE_ROOM` Durable Object binding.
Quick Edit cannot create the Durable Object binding itself.

## Static deployment and install

GitHub Pages deploys from `main` at the repository root; there is no front-end
build step. On iPhone, open the Pages URL in Safari, use Share → Add to Home
Screen, and launch the installed PWA.

## Puzzle generation and current limits

`worker/corpus.js` combines the original hand-authored clue bank, the curated
community themes in `worker/corpus.community.js`, and the generated, openly
licensed expansion in `worker/corpus.generated.js`.
`worker/generator.js` performs template-first, symmetric interlocking fill
based on category, three creation sizes (5x5 Mini, 9x9 Standard, and
15x15 Full), and five clue-difficulty profiles. The legacy 7x7 and 11x11 keys
remain readable for existing puzzles. Generation runs in a dedicated browser
Web Worker because searching the expanded corpus can take several seconds and
must neither block the UI nor consume the Cloudflare Worker's request CPU
budget. The browser generator enforces the quality policy; the Worker performs
structural validation before persisting the submitted grid to D1 and seeding
its Durable Object room. Private puzzles remain invite-link-only.

The combined corpus currently contains 25,440 clue records and 22,915 unique
usable answers from 3–15 letters. The generated expansion adds native coverage
for all 27 Discover categories and deliberately strengthens 3- and 6-letter
fill plus positional letter diversity. The curated module supplies deep
coverage for Houston & Texas and Beer & Brewing. The generated expansion is
adapted from Open English WordNet 2025 under CC BY 4.0; see
`THIRD_PARTY_NOTICES.md`.

To rebuild the generated half, download
`https://en-word.net/downloads/english-wordnet-2025-json.zip`, expand it, and
pass the extracted directory to `node scripts/build-corpus.js <directory>`.
The generated module is committed, while the large source download is not.

### Generation quality status

- Editorial inventory and every public pre-created puzzle enforce at least 80%
  playable-cell coverage. Manual generation uses the same 80% floor for Mini,
  with explicit availability floors of 70% for Standard (9x9) and 65% for Full
  (15x15). This two-tier policy keeps public releases at the editorial bar while
  allowing people to create larger themed puzzles when an inventory bucket is
  empty.
- Mini and Standard require 40–60% explicitly themed answers. Full currently
  uses a 20–30% answer band plus at least 30% themed answer-cell coverage; its
  lower band is a documented feasibility compromise.
- Theme classification uses exact corpus category membership only. The title is
  decorative and never makes an answer themed.
- At least half of the longest 30% of Mini/Standard answers must be themed.
  Full currently requires 30% of that long-answer group to be themed.
- Difficulty changes clue selection and prioritization, not grid density or the
  answer vocabulary available to the interlock solver. The best clue variant is
  selected only after a valid fill is found.
- Mini has all eight valid rotationally symmetric 5x5 patterns at 80% or higher
  density. The browser worker retries bounded failures automatically: Mini 8,
  legacy Quick 6, Standard/legacy Standard 4, and Full 3, all under the outer
  45-second browser-worker timeout.
- Standard and Full reserve part of each attempt for the placement fallback
  (40% and 70%, respectively). Before this change, template search could spend
  the entire deadline and make the documented fallback unreachable. The
  fallback now selects an attempt that passes density and theme gates instead
  of blindly retaining the densest attempt and rejecting it afterward.
- Legacy corpus categories are canonicalized during generation (`movies` to
  `movies & tv`, `food` to `food & drink`, and `general` to
  `general knowledge`).
- Keep the current light block-cell design language when improving density; do
  not introduce solid dark blocks by default.

## Crossword generation and inventory evolution (August 2026)

This section records the decisions behind the current system so future work
does not repeat unsuccessful approaches or silently weaken quality gates.

### Product requirements now encoded

- Creation exposes Mini (5x5), Standard (9x9, internal key `compact`), and Full
  (15x15, internal key `large`). Legacy 7x7 and 11x11 records remain readable.
- Beer & Brewing and Whisky expose all sizes and difficulties. The former
  Beginner-Mini-only UI restriction was removed in commit `0678552`.
- New crosswords have no description field in the creator or create request.
  The D1 column remains for backward compatibility; legacy descriptions remain
  readable/searchable and are preserved when replaying an older puzzle.
- Whisky is a separate whisky-only category covering world styles, production,
  maturation, regions, regulation, terminology, and tasting. Cocktails and
  mixed drinks are explicitly excluded.
- Discover shows `Create one with these choices` only when a search term or a
  non-default category, difficulty, or size filter is active. An unfiltered
  empty result shows only `No open crosswords yet` (commit `b5049d3`).
- The generator reliability release in `2dee2c9` applies globally, not only to
  Travel: broader fill vocabulary, post-fill difficulty clues, eight Mini
  templates, category aliases, and size-specific retries are shared by every
  creator category. Travel Mini passed 20/20 retry groups in its release test.

### Inventory-first architecture

`migrations/0002_puzzle_blueprints.sql` adds reusable blueprint inventory and
per-user exposure tracking. A blueprint contains a fully validated grid but no
room/play state. `/create-puzzle` claims an unseen ready blueprint matching the
canonical category, size, and difficulty, clones it into a new D1 puzzle, and
seeds its `PuzzleRoom` Durable Object. Exposures prevent a player from receiving
the same blueprint repeatedly while allowing an editorial puzzle to serve
different players.

Blueprints are not themselves public Discover puzzles. They become visible
only after a player creates a puzzle and the blueprint is cloned into the
`puzzles` table; therefore an empty Discover screen can coexist with seeded
inventory.

If no blueprint exists, the browser runs the manual generator off-thread and
submits its completed grid. The server validates its structure before
persistence. Theme relevance remains mandatory; only the documented manual
density floors differ from the 80% editorial inventory gate. Inventory remains
the reliable instant path, especially for Standard and Full.

Inventory workflow:

```powershell
# Generate with checkpoints; --resume preserves accepted work.
node scripts/puzzle-inventory.mjs generate --category geography --size mini `
  --difficulty beginner --count 45 --time-budget-ms 2500 `
  --theme-plan-attempts 200 --max-answer-uses 5 `
  --out data/inventory-geography-mini-release.json --resume

# Balance, validate, then explicitly seed.
node scripts/balance-inventory-difficulties.mjs `
  --file data/inventory-geography-mini-release.json
node scripts/puzzle-inventory.mjs validate `
  --file data/inventory-geography-mini-release.json
$env:CF_D1_DATABASE_ID='a9c154d5-ffcd-472d-ae78-aab806420746'
node scripts/puzzle-inventory.mjs seed `
  --file data/inventory-geography-mini-release.json --confirm-seed
```

Generation writes each accepted puzzle immediately and supports `--resume`, so
timeouts cannot discard finished work. `--max-answer-uses` limits repetition
across an editorial set and forces useful grid diversity.

### Production reset and release state

The legacy reset was executed on August 11, 2026:

- 14 puzzle rows and their D1-known Durable Object room/play state were deleted;
- two user accounts, settings, colors, and blueprint inventory were preserved;
- the purge used a separate `PURGE_KEY` and maintenance-mode Worker deployment;
- Cloudflare cannot enumerate orphan Durable Object IDs, so the purge clears
  every D1-referenced room but cannot discover an already-orphaned room. Normal
  application invariants create D1 first, making D1 the expected room index.

Safe purge order:

1. Apply migration 0002 and configure an encrypted `PURGE_KEY`.
2. Deploy with `WRITE_DISABLED=1`.
3. Run `node scripts/purge-legacy-puzzles.cjs --confirm-delete-all-puzzles-keep-users`.
4. Verify users are unchanged, seed approved inventory, and redeploy without
   `WRITE_DISABLED`.

`data/inventory-geography-mini-release.json` is the first release artifact in
the all-category program: 45 validated Geography Minis, nine at each
difficulty. It was seeded and committed in `4cf0e30`. At that checkpoint,
production also held five Beer Beginner Minis, one Beer Medium Mini, and five
Whisky Beginner Minis. History
Mini generation is checkpointed but must not be seeded until it reaches 45, is
balanced nine-per-difficulty, and passes the same release review.

### What did not work

Do not ask an LLM to emit completed crossword rows. Two controlled experiments
failed structurally:

- an 810-request batch used high reasoning and a 6,000-token cap; every response
  exhausted the cap on reasoning and produced zero grids;
- a corrected 10-request batch used `reasoning.effort: none`, 1,200 output
  tokens, and strict JSON rows, but all ten invented invalid crossing strings
  and failed the closed-word-list validator.

The first batch consumed approximately $32.19 and the microbatch approximately
$0.11. LLMs are useful for vocabulary, clue writing, relevance classification,
and editorial scoring; they are not the interlock engine. Construction remains
local and every output must pass deterministic validation.

More runtime also does not fix structurally weak templates or sparse themed
crossing domains. Generic Standard can solve on the newer short-slot template,
but themed Standard remained unsatisfied in bounded tests. Purpose-built and
exact Z3 Full searches also missed the reliability bar. The strongest Full
candidate solved only four of seven trials and was rejected.

### Current LLM role and spend gate

`scripts/openai-corpus-batch.mjs` provides an auditable Responses Batch flow:
prepare, explicit confirmed submit, status, download, import, validate, and
deterministic promotion. Receipts contain request hashes and IDs but never the
API key. Whisky imports reject cocktail answers, and imports never overwrite a
curated corpus.

The current strategy audits fixed crossword-friendly answers for legitimate
category senses and writes original clues only for accepted senses. The model
cannot add answers outside the list. Pilot batch
`batch_6a7bb8310bd08190a544260ea0e80c46` covers Beer & Brewing, Whisky,
Mythology, Pop Culture, Technology, and Houston & Texas, with a conservative
$1.36 maximum estimate. Do not submit the rest of the approved $10 expansion
budget until imported pilot vocabulary demonstrably produces valid Standard
and Full grids. Politics & Society and Games are known weak Mini categories and
should join the next expansion tranche if the pilot passes.

### Release gates and next steps

Every inventory release must pass:

- exact dimensions and at least 80% open cells;
- valid cells, numbering, word paths, crossings, clues, answer/letter alignment,
  and unique answers;
- the size-specific theme answer, long-answer, and themed-cell policies above;
- a unique canonical grid hash within the manifest;
- no placeholders, Whisky cocktails, invented terms, forced relevance,
  promotional filler, or answer leakage in clues;
- an even difficulty allocation for balanced release sets;
- `npm test`, plus `npm run bundle-worker` and `npm run validate-worker` when
  Worker code changes;
- a service-worker cache-name bump for frontend releases, followed by a
  cache-busted GitHub Pages check and clean browser console.

The agreed target is 90 puzzles per category: 45 Mini, 30 Standard, and 15 Full,
divided evenly across five difficulties (9/6/3 per difficulty). Finish and seed
validated Minis while the vocabulary pilot runs, then require a representative
Standard/Full proof set before spending the remaining Batch budget or scaling
local construction.

## Replay attempts

Starting a completed crossword from scratch creates a new private attempt with
the same title and a shared `seriesId`. Home shows only the latest attempt for
that series; the history sheet exposes older attempts. Replay records set
`statsEligible: false`, so only the original completion contributes to player
statistics and rankings.

See `CLAUDE.md` for repository working conventions.
