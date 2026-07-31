// Across — Cloudflare Worker.
//
// Same "holds the one GitHub token server-side" pattern as Boys Pushup
// Bonanza's worker, plus one new piece Bonanza didn't need: a Durable Object
// (PuzzleRoom) that holds *live* in-progress grid state and pushes it to
// connected players over WebSockets, since collaborative letter-by-letter
// typing needs sub-second propagation that a commit-per-write pattern can't
// give it. Completed/durable puzzle data still lives in data.json in GitHub,
// exactly like Bonanza's sessions.
//
//   GET  /data                       -> current data.json contents (no auth to read)
//   POST /register-user   { user }                              -> creates the user if new, assigns a stable color hue
//   POST /create-puzzle   { title, description, keywords[], size, difficulty, visibility, createdBy }
//                                                                 -> generates a grid from the word bank, creates the puzzle, server-assigns id
//   POST /join-puzzle     { puzzleId, user }                     -> adds user to the puzzle's player list
//   POST /complete-puzzle { puzzleId, cells, sessions, totalTimeMs, completed }
//                                                                 -> manual/fallback snapshot commit; the PuzzleRoom DO normally
//                                                                    commits snapshots directly (see commitSnapshot below) since it
//                                                                    shares this Worker's env/secrets, but this REST path exists too
//   GET/Upgrade /puzzle/:id/connect                              -> WebSocket, routed to that puzzle's PuzzleRoom Durable Object
//
// Required Worker secrets/variables (Settings -> Variables and Secrets):
//   GITHUB_TOKEN   (secret)  fine-grained PAT, Contents: Read and write, scoped to one repo
//   GH_OWNER       (var)     e.g. "heee"
//   GH_REPO        (var)     e.g. "across"
//   GH_BRANCH      (var)     e.g. "main"
//   APP_KEY        (secret)  any string; must match APP_KEY in config.js — a casual
//                            deterrent only, not real auth (visible in client source)
//   ALLOWED_ORIGIN (var)     e.g. "https://<you>.github.io"
//
// Required binding (Settings -> Bindings -> Durable Object, dashboard-only —
// see README, this is the one step that can't be done via Quick Edit):
//   PUZZLE_ROOM -> class PuzzleRoom (this file)

import { WORD_BANK } from "./corpus.js";
import { generatePuzzle } from "./generator.js";

const PLAYER_HUES = [250, 30, 140, 90, 320, 190, 10, 220];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(env);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const puzzleConnectMatch = url.pathname.match(/^\/puzzle\/([a-zA-Z0-9_-]+)\/connect$/);
    if (puzzleConnectMatch) {
      const id = env.PUZZLE_ROOM.idFromName(puzzleConnectMatch[1]);
      const stub = env.PUZZLE_ROOM.get(id);
      return stub.fetch(request);
    }

    if (url.pathname === "/data" && request.method === "GET") {
      try {
        const { data } = await fetchGithubFile(env);
        return json(data, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/register-user" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const name = typeof body?.user === "string" ? body.user.trim().slice(0, 40) : "";
      if (!name) return json({ error: "invalid user" }, 400, cors);

      try {
        let user;
        await commitMutation(env, (data) => {
          if (!data.users[name]) {
            const hue = PLAYER_HUES[Object.keys(data.users).length % PLAYER_HUES.length];
            data.users[name] = {
              hue,
              createdAt: new Date().toISOString(),
              settings: { push: true, sound: true, haptic: true },
            };
          }
          user = data.users[name];
        }, `Register user: ${name}`);
        return json({ ok: true, user: { name, ...user } }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/create-puzzle" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const validated = validateCreateRequest(body);
      if (!validated) return json({ error: "invalid puzzle payload" }, 400, cors);

      let puzzle;
      try {
        puzzle = buildPuzzle(validated, WORD_BANK);
      } catch (e) {
        return json({ error: `generation failed: ${e.message}` }, 422, cors);
      }

      try {
        await commitMutation(env, (data) => {
          data.puzzles[puzzle.id] = puzzle;
        }, `Create puzzle: ${puzzle.title}`);
        // Seed the live room so the creator's first connect has state immediately.
        const roomId = env.PUZZLE_ROOM.idFromName(puzzle.id);
        const stub = env.PUZZLE_ROOM.get(roomId);
        await stub.fetch("https://internal/seed", {
          method: "POST",
          body: JSON.stringify(puzzle),
          headers: { "Content-Type": "application/json" },
        });
        return json({ ok: true, puzzle }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/join-puzzle" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const puzzleId = typeof body?.puzzleId === "string" ? body.puzzleId.slice(0, 64) : "";
      const user = typeof body?.user === "string" ? body.user.trim().slice(0, 40) : "";
      if (!puzzleId || !user) return json({ error: "invalid payload" }, 400, cors);

      try {
        await commitMutation(env, (data) => {
          const puzzle = data.puzzles[puzzleId];
          if (!puzzle) throw new Error("puzzle not found");
          if (!puzzle.players.includes(user)) puzzle.players.push(user);
          if (!puzzle.sessions[user]) puzzle.sessions[user] = newSession();
        }, `Join puzzle: ${user} -> ${puzzleId}`);
        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    // Internal — called by PuzzleRoom DO only, never directly by clients.
    if (url.pathname === "/complete-puzzle" && request.method === "POST") {
      const body = await safeJson(request);
      const { puzzleId, cells, sessions, totalTimeMs, completed } = body || {};
      if (!puzzleId) return json({ error: "invalid payload" }, 400, cors);

      try {
        await commitMutation(env, (data) => {
          const puzzle = data.puzzles[puzzleId];
          if (!puzzle) throw new Error("puzzle not found");
          puzzle.cells = cells;
          puzzle.sessions = sessions;
          puzzle.totalTimeMs = totalTimeMs;
          if (completed && !puzzle.completedAt) {
            puzzle.completedAt = new Date().toISOString();
            puzzle.state = "completed";
            puzzle.highlights = computeHighlights(puzzle);
          }
        }, `Snapshot puzzle: ${puzzleId}${completed ? " (completed)" : ""}`);
        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    return json({ error: "not found" }, 404, cors);
  },
};

// ===========================================================================
// PuzzleRoom Durable Object — one instance per active puzzle.
// ===========================================================================

export class PuzzleRoom {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sockets = new Map(); // WebSocket -> { user }
    this.puzzle = null; // loaded lazily from storage
    this.lastPersist = 0;
  }

  async loadPuzzle() {
    if (this.puzzle) return this.puzzle;
    this.puzzle = (await this.state.storage.get("puzzle")) || null;
    return this.puzzle;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/seed" && request.method === "POST") {
      const puzzle = await request.json();
      await this.state.storage.put("puzzle", puzzle);
      this.puzzle = puzzle;
      return new Response("ok");
    }

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("expected websocket", { status: 426 });
    }

    const user = url.searchParams.get("user") || "anonymous";
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    server.accept();
    await this.loadPuzzle();

    this.sockets.set(server, { user });
    this.sendTo(server, { type: "init", puzzle: this.puzzle, presence: this.presenceList() });
    this.broadcastPresence();

    server.addEventListener("message", (evt) => this.handleMessage(server, user, evt));
    server.addEventListener("close", () => {
      this.sockets.delete(server);
      this.broadcastPresence();
    });
    server.addEventListener("error", () => {
      this.sockets.delete(server);
      this.broadcastPresence();
    });

    return new Response(null, { status: 101, webSocket: client });
  }

  presenceList() {
    return [...this.sockets.values()].map((v) => v.user);
  }

  broadcastPresence() {
    this.broadcast({ type: "presence", players: this.presenceList() }, null);
  }

  sendTo(socket, msg) {
    try {
      socket.send(JSON.stringify(msg));
    } catch (e) {
      // socket already gone; will be cleaned up on next close/error event
    }
  }

  broadcast(msg, exceptSocket) {
    const payload = JSON.stringify(msg);
    for (const socket of this.sockets.keys()) {
      if (socket === exceptSocket) continue;
      try {
        socket.send(payload);
      } catch (e) {
        // ignore; cleaned up on close
      }
    }
  }

  async handleMessage(socket, user, evt) {
    let msg;
    try {
      msg = JSON.parse(evt.data);
    } catch (e) {
      return;
    }
    await this.loadPuzzle();
    if (!this.puzzle) return;

    if (msg.type === "cell-update") {
      const { row, col, letter, isCorrect, corrected, wordCompleted } = msg;
      if (!Number.isInteger(row) || !Number.isInteger(col)) return;
      if (typeof letter !== "string" || letter.length > 1) return;
      const key = `${row}-${col}`;
      if (!this.puzzle.grid.cells.some((c) => c.row === row && c.col === col && !c.block)) return;

      this.puzzle.cells[key] = { letter: letter.toUpperCase(), owner: user, revealed: false };
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      const sess = this.puzzle.sessions[user];
      if (letter) {
        sess.lettersEntered += 1;
        if (isCorrect) sess.correctLetters += 1;
        else sess.incorrectLetters += 1;
        if (corrected) sess.correctionsMade += 1;
      }
      if (wordCompleted) sess.wordsCompleted += 1;

      this.broadcast({ type: "cell-update", row, col, letter: letter.toUpperCase(), owner: user }, socket);

      const isComplete = this.checkComplete();
      await this.persist(isComplete);
      if (isComplete) {
        this.broadcast({ type: "completed" }, null);
      }
    } else if (msg.type === "cursor") {
      this.broadcast({ type: "cursor", user, row: msg.row, col: msg.col, direction: msg.direction }, socket);
    } else if (msg.type === "reveal") {
      const { row, col, letter } = msg;
      const key = `${row}-${col}`;
      this.puzzle.cells[key] = { letter, owner: null, revealed: true };
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      this.puzzle.sessions[user].revealsUsed += 1;
      this.broadcast({ type: "cell-update", row, col, letter, owner: null, revealed: true }, null);
      const isComplete = this.checkComplete();
      await this.persist(isComplete);
      if (isComplete) {
        this.broadcast({ type: "completed" }, null);
      }
    } else if (msg.type === "auto-check-on") {
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      this.puzzle.sessions[user].autoCheckUsed = true;
      await this.persist(false);
    } else if (msg.type === "time-heartbeat") {
      // Bounded sanity check — a heartbeat should only ever cover the client's
      // own flush interval (see FLUSH_INTERVAL_MS in app.js), never something
      // wildly larger (clock skew, a resumed/suspended tab, a bad client).
      const deltaMs = Number(msg.deltaMs);
      if (!Number.isFinite(deltaMs) || deltaMs <= 0 || deltaMs > 120000) return;
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      this.puzzle.sessions[user].timeSpentMs = (this.puzzle.sessions[user].timeSpentMs || 0) + deltaMs;
      this.puzzle.totalTimeMs = Object.values(this.puzzle.sessions).reduce((s, sess) => s + (sess.timeSpentMs || 0), 0);
      this.broadcast({ type: "time-update", sessions: this.puzzle.sessions, totalTimeMs: this.puzzle.totalTimeMs }, socket);
      await this.persist(false);
    }
  }

  checkComplete() {
    for (const cell of this.puzzle.grid.cells) {
      if (cell.block) continue;
      const key = `${cell.row}-${cell.col}`;
      const filled = this.puzzle.cells[key];
      if (!filled || filled.letter !== cell.letter) return false;
    }
    return true;
  }

  async persist(completed) {
    await this.state.storage.put("puzzle", this.puzzle);
    const now = Date.now();
    // Snapshot to GitHub on completion always; otherwise throttle to avoid
    // hammering the GitHub API on every keystroke from every player.
    if (completed || now - this.lastPersist > 15000) {
      this.lastPersist = now;
      await this.commitSnapshot(completed);
    }
  }

  async commitSnapshot(completed) {
    // The DO has the same env bindings/secrets as the parent Worker, so it
    // commits directly rather than round-tripping through the Worker's fetch.
    await commitMutation(this.env, (data) => {
      const puzzle = data.puzzles[this.puzzle.id];
      if (!puzzle) return;
      puzzle.cells = this.puzzle.cells;
      puzzle.sessions = this.puzzle.sessions;
      if (completed && !puzzle.completedAt) {
        puzzle.completedAt = new Date().toISOString();
        puzzle.state = "completed";
        puzzle.grid = this.puzzle.grid;
        puzzle.highlights = computeHighlights(puzzle);
      }
    }, `Snapshot puzzle: ${this.puzzle.id}${completed ? " (completed)" : ""}`);
  }
}

// ===========================================================================
// Puzzle generation
// ===========================================================================

function validateCreateRequest(body) {
  if (!body || typeof body !== "object") return null;
  const title = String(body.title || "").trim().slice(0, 60);
  const description = String(body.description || "").trim().slice(0, 140);
  const keywords = Array.isArray(body.keywords) ? body.keywords.map((k) => String(k).trim().toLowerCase()).filter(Boolean).slice(0, 10) : [];
  const size = ["mini", "standard", "large"].includes(body.size) ? body.size : "standard";
  const difficulty = ["easy", "medium", "hard"].includes(body.difficulty) ? body.difficulty : "medium";
  const visibility = body.visibility === "private" ? "private" : "open";
  const createdBy = String(body.createdBy || "").trim().slice(0, 40);
  if (!title || !createdBy) return null;
  return { title, description, keywords, size, difficulty, visibility, createdBy };
}

function buildPuzzle(req, wordBank) {
  const grid = generatePuzzle({ keywords: req.keywords, size: req.size, difficulty: req.difficulty, wordBank });
  const slug = slugify(req.title) || "puzzle";
  const id = `${slug}-${Date.now().toString(36)}`;
  return {
    id,
    title: req.title,
    description: req.description,
    keywords: req.keywords,
    size: req.size,
    difficulty: req.difficulty,
    visibility: req.visibility,
    createdBy: req.createdBy,
    createdAt: new Date().toISOString(),
    grid,
    cells: {},
    players: [req.createdBy],
    sessions: { [req.createdBy]: newSession() },
    state: "open",
    completedAt: null,
    totalTimeMs: 0,
    highlights: [],
  };
}

function computeHighlights(puzzle) {
  const highlights = [];
  const sessions = Object.entries(puzzle.sessions || {});
  if (sessions.length === 0) return highlights;
  const totalLetters = sessions.reduce((sum, [, s]) => sum + (s.lettersEntered || 0), 0);
  const top = sessions.slice().sort((a, b) => (b[1].lettersEntered || 0) - (a[1].lettersEntered || 0))[0];
  if (top && totalLetters > 0) {
    highlights.push(`${top[0]} typed the most letters — ${top[1].lettersEntered} of ${totalLetters}`);
  }
  const autoCheckers = sessions.filter(([, s]) => s.autoCheckUsed).map(([n]) => n);
  if (autoCheckers.length > 0) {
    highlights.push(`${autoCheckers.join(", ")} played with Auto Check on (half credit this round)`);
  }
  return highlights;
}

function newSession() {
  return {
    lettersEntered: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    correctionsMade: 0,
    revealsUsed: 0,
    wordsCompleted: 0,
    timeSpentMs: 0,
    autoCheckUsed: false,
    joinedAt: new Date().toISOString(),
  };
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

// ===========================================================================
// Shared helpers
// ===========================================================================

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-App-Key",
  };
}

function checkAppKey(request, env) {
  return !env.APP_KEY || request.headers.get("X-App-Key") === env.APP_KEY;
}

async function safeJson(request) {
  try {
    return await request.json();
  } catch (e) {
    return null;
  }
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

async function ghHeaders(env) {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    "User-Agent": "across-worker",
  };
}

function decodeBase64Utf8(b64) {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function encodeBase64Utf8(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

async function fetchGithubFile(env) {
  const url = `https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/data.json?ref=${encodeURIComponent(env.GH_BRANCH || "main")}`;
  const res = await fetch(url, { headers: await ghHeaders(env) });
  if (!res.ok) throw new Error(`GitHub fetch failed (${res.status})`);
  const fileJson = await res.json();
  let data;
  try {
    data = JSON.parse(decodeBase64Utf8(fileJson.content));
  } catch (e) {
    data = { users: {}, puzzles: {} };
  }
  if (!data.users || typeof data.users !== "object") data.users = {};
  if (!data.puzzles || typeof data.puzzles !== "object") data.puzzles = {};
  return { data, sha: fileJson.sha };
}

async function putGithubFile(env, data, sha, message) {
  const url = `https://api.github.com/repos/${env.GH_OWNER}/${env.GH_REPO}/contents/data.json`;
  const body = {
    message,
    content: encodeBase64Utf8(JSON.stringify(data, null, 2)),
    sha,
    branch: env.GH_BRANCH || "main",
  };
  const res = await fetch(url, {
    method: "PUT",
    headers: { ...(await ghHeaders(env)), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub write failed (${res.status}): ${text.slice(0, 200)}`);
  }
}

// Re-fetches immediately before writing (and retries a few times) so
// concurrent writes (two puzzles finishing, a create + a join) don't
// clobber each other's `sha` — same pattern as Bonanza's commitMutation.
async function commitMutation(env, mutate, message, attempts = 4) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const { data, sha } = await fetchGithubFile(env);
      mutate(data);
      await putGithubFile(env, data, sha, message);
      return;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 250 * (i + 1)));
    }
  }
  throw lastErr;
}
