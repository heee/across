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

`worker/corpus.js` is a hand-authored clue bank. `worker/generator.js` performs
constraint-based interlocking fill based on keywords, size, and difficulty.
The current constructor favors simplicity over newspaper-style density and
symmetry. Identity is name-only, and private puzzles are invite-link-only.

See `CLAUDE.md` for repository working conventions.
