// Across — Cloudflare Worker.
//
// D1 is the durable source of truth for users and puzzle snapshots. One
// PuzzleRoom Durable Object per puzzle holds live state and pushes it to
// connected players over WebSockets, snapshotting that state back to D1.
//
//   GET  /data                       -> current D1 contents in the legacy API shape (no auth to read)
//   POST /register-user   { user }                              -> creates the user if new, assigns a stable color hue
//   POST /update-user-color { user, hue }                       -> changes a user's avatar color (hue must be one of PLAYER_HUES)
//   POST /rename-user     { oldName, newName }                  -> globally renames a user while preserving identity and history
//   POST /delete-user     { user }                              -> removes the user record and scrubs them from every puzzle's player list
//   POST /create-puzzle   { title, description, keywords[], size, difficulty, visibility, createdBy }
//                                                                 -> generates a grid from the word bank, creates the puzzle, server-assigns id
//   POST /join-puzzle     { puzzleId, user }                     -> adds user to the puzzle's player list
//   POST /fork-puzzle     { puzzleId, user }                     -> creates a private, blank, solo copy of an existing
//                                                                    puzzle for one user (idempotent per user+puzzle)
//   POST /delete-puzzle   { puzzleId }                           -> removes the puzzle from D1, wipes its PuzzleRoom DO
//                                                                    state, and disconnects anyone still in it
//   POST /complete-puzzle { puzzleId, cells, sessions, totalTimeMs, completed }
//                                                                 -> manual/fallback snapshot commit; the PuzzleRoom DO normally
//                                                                    commits snapshots directly (see commitSnapshot below) since it
//                                                                    shares this Worker's env/secrets, but this REST path exists too
//   GET/Upgrade /puzzle/:id/connect                              -> WebSocket, routed to that puzzle's PuzzleRoom Durable Object
//
// Required Worker secrets/variables (Settings -> Variables and Secrets):
//   APP_KEY        (secret)  any string; must match APP_KEY in config.js — a casual
//                            deterrent only, not real auth (visible in client source)
//   ALLOWED_ORIGIN (var)     e.g. "https://<you>.github.io"
//
// Required bindings (Settings -> Bindings):
//   DB          -> D1 database containing migrations/0001_initial.sql
//   PUZZLE_ROOM -> class PuzzleRoom (this file)

import { WORD_BANK } from "./corpus.js";
import { generatePuzzle } from "./generator.js";

const PLAYER_HUES = [250, 30, 140, 90, 320, 190, 10, 220, 60, 165, 285, 345];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(env);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    const puzzleConnectMatch = url.pathname.match(/^\/puzzle\/([a-zA-Z0-9_-]+)\/connect$/);
    if (env.WRITE_DISABLED === "1" && (request.method === "POST" || puzzleConnectMatch)) {
      return json({ error: "maintenance" }, 503, { ...cors, "Retry-After": "60" });
    }
    if (puzzleConnectMatch) {
      const puzzle = await getPuzzle(env.DB, puzzleConnectMatch[1]);
      if (!puzzle) return json({ error: "puzzle not found" }, 404, cors);
      const id = env.PUZZLE_ROOM.idFromName(puzzleConnectMatch[1]);
      const stub = env.PUZZLE_ROOM.get(id);
      await stub.fetch("https://internal/seed-if-empty", {
        method: "POST",
        body: JSON.stringify(puzzle),
        headers: { "Content-Type": "application/json" },
      });
      return stub.fetch(request);
    }

    if (url.pathname === "/data" && request.method === "GET") {
      try {
        return json(await loadData(env.DB), 200, cors);
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
        const user = await registerUser(env.DB, name);
        return json({ ok: true, user: { name, ...user } }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/update-user-color" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const name = typeof body?.user === "string" ? body.user.trim().slice(0, 40) : "";
      const hue = Number(body?.hue);
      if (!name || !PLAYER_HUES.includes(hue)) return json({ error: "invalid payload" }, 400, cors);

      try {
        await updateUserColor(env.DB, name, hue);
        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/rename-user" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const oldName = typeof body?.oldName === "string" ? body.oldName.trim().slice(0, 40) : "";
      const newName = typeof body?.newName === "string" ? body.newName.trim().slice(0, 40) : "";
      if (!oldName || !newName) return json({ error: "invalid payload" }, 400, cors);

      try {
        const { user, affectedPuzzleIds } = await renameUser(env.DB, oldName, newName);
        await Promise.all(affectedPuzzleIds.map(async (puzzleId) => {
          const roomId = env.PUZZLE_ROOM.idFromName(puzzleId);
          const stub = env.PUZZLE_ROOM.get(roomId);
          try {
            await stub.fetch("https://internal/rename-user", {
              method: "POST",
              body: JSON.stringify({ oldName, newName }),
              headers: { "Content-Type": "application/json" },
            });
          } catch (e) {}
        }));
        return json({ ok: true, user: { name: newName, ...user } }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, e.code === "NAME_TAKEN" ? 409 : e.code === "NOT_FOUND" ? 404 : 502, cors);
      }
    }

    if (url.pathname === "/delete-user" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const name = typeof body?.user === "string" ? body.user.trim().slice(0, 40) : "";
      if (!name) return json({ error: "invalid user" }, 400, cors);

      try {
        const affectedPuzzleIds = await deleteUser(env.DB, name);

        // Each puzzle's Durable Object holds its own separate live copy —
        // without this, a puzzle whose room later persists again (e.g. from
        // an unrelated player's next keystroke) would silently resurrect
        // the deleted user's session data right back into D1.
        await Promise.all(
          affectedPuzzleIds.map(async (puzzleId) => {
            const roomId = env.PUZZLE_ROOM.idFromName(puzzleId);
            const stub = env.PUZZLE_ROOM.get(roomId);
            try {
              await stub.fetch("https://internal/scrub-user", {
                method: "POST",
                body: JSON.stringify({ user: name }),
                headers: { "Content-Type": "application/json" },
              });
            } catch (e) {
              // Best-effort — D1 is already the source of truth and
              // is already correct; a room that fails to scrub just risks
              // re-committing stale data if it happens to persist again.
            }
          })
        );

        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/delete-puzzle" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const puzzleId = typeof body?.puzzleId === "string" ? body.puzzleId.slice(0, 64) : "";
      if (!puzzleId) return json({ error: "invalid payload" }, 400, cors);

      try {
        await deletePuzzle(env.DB, puzzleId);
        // Also clear the DO's own live copy and kick anyone still connected,
        // otherwise it keeps serving (and re-committing) the deleted puzzle.
        const roomId = env.PUZZLE_ROOM.idFromName(puzzleId);
        const stub = env.PUZZLE_ROOM.get(roomId);
        await stub.fetch("https://internal/delete", { method: "POST" });
        return json({ ok: true }, 200, cors);
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
        await upsertPuzzle(env.DB, puzzle);
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
        await joinPuzzle(env.DB, puzzleId, user);
        return json({ ok: true }, 200, cors);
      } catch (e) {
        return json({ error: e.message }, 502, cors);
      }
    }

    if (url.pathname === "/fork-puzzle" && request.method === "POST") {
      if (!checkAppKey(request, env)) return json({ error: "unauthorized" }, 401, cors);
      const body = await safeJson(request);
      const sourceId = typeof body?.puzzleId === "string" ? body.puzzleId.slice(0, 64) : "";
      const user = typeof body?.user === "string" ? body.user.trim().slice(0, 40) : "";
      if (!sourceId || !user) return json({ error: "invalid payload" }, 400, cors);

      let forkedPuzzle;
      let created = false;
      try {
        const source = await getPuzzle(env.DB, sourceId);
        if (!source) throw new Error("puzzle not found");
        const id = `${sourceId}-priv-${slugify(user)}`;
        forkedPuzzle = await getPuzzle(env.DB, id);
        if (!forkedPuzzle) {
          created = true;
          forkedPuzzle = {
            id,
            title: `${source.title} — Private Copy`,
            description: source.description,
            keywords: source.keywords,
            size: source.size,
            difficulty: source.difficulty,
            visibility: "private",
            createdBy: source.createdBy,
            forkOf: sourceId,
            forkedBy: user,
            createdAt: new Date().toISOString(),
            grid: source.grid,
            cells: {},
            players: [user],
            sessions: { [user]: newSession() },
            state: "open",
            completedAt: null,
            totalTimeMs: 0,
            highlights: [],
          };
          await upsertPuzzle(env.DB, forkedPuzzle);
        }

        if (created) {
          // Only seed a brand-new fork's room — re-seeding an existing fork
          // would clobber its live in-progress DO state with this D1 snapshot.
          const roomId = env.PUZZLE_ROOM.idFromName(forkedPuzzle.id);
          const stub = env.PUZZLE_ROOM.get(roomId);
          await stub.fetch("https://internal/seed", {
            method: "POST",
            body: JSON.stringify(forkedPuzzle),
            headers: { "Content-Type": "application/json" },
          });
        }
        return json({ ok: true, puzzle: forkedPuzzle }, 200, cors);
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
        const puzzle = await getPuzzle(env.DB, puzzleId);
        if (!puzzle) throw new Error("puzzle not found");
        puzzle.cells = cells;
        puzzle.sessions = sessions;
        puzzle.totalTimeMs = totalTimeMs;
        if (completed && !puzzle.completedAt) {
          puzzle.completedAt = new Date().toISOString();
          puzzle.state = "completed";
          puzzle.highlights = computeHighlights(puzzle);
        }
        await upsertPuzzle(env.DB, puzzle);
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
    this.deleted = false;
  }

  async loadPuzzle() {
    if (this.deleted) return null;
    if (this.puzzle) return this.puzzle;
    this.puzzle = (await this.state.storage.get("puzzle")) || null;
    return this.puzzle;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/seed" && request.method === "POST") {
      const puzzle = await request.json();
      this.deleted = false;
      await this.state.storage.put("puzzle", puzzle);
      this.puzzle = puzzle;
      return new Response("ok");
    }

    if (url.pathname === "/seed-if-empty" && request.method === "POST") {
      await this.loadPuzzle();
      if (!this.puzzle) {
        const puzzle = await request.json();
        this.deleted = false;
        await this.state.storage.put("puzzle", puzzle);
        this.puzzle = puzzle;
      }
      return new Response("ok");
    }

    if (url.pathname === "/delete" && request.method === "POST") {
      this.deleted = true; // blocks any in-flight persist from re-committing it
      this.broadcast({ type: "puzzle-deleted" }, null);
      for (const socket of this.sockets.keys()) {
        try { socket.close(1000, "puzzle deleted"); } catch (e) {}
      }
      this.sockets.clear();
      this.puzzle = null;
      await this.state.storage.deleteAll();
      return new Response("ok");
    }

    // Internal — called by /delete-user so a deleted account's data doesn't
    // get silently resurrected into D1 the next time this room
    // persists (it holds its own separate live copy in durable storage;
    // deleting from D1 alone doesn't touch that).
    if (url.pathname === "/scrub-user" && request.method === "POST") {
      const { user: scrubUser } = await request.json();
      await this.loadPuzzle();
      if (this.puzzle && scrubUser) {
        this.puzzle.players = (this.puzzle.players || []).filter((n) => n !== scrubUser);
        if (this.puzzle.sessions) delete this.puzzle.sessions[scrubUser];
        await this.state.storage.put("puzzle", this.puzzle);
        this.broadcast({ type: "user-scrubbed", user: scrubUser, players: this.puzzle.players, sessions: this.puzzle.sessions }, null);
      }
      return new Response("ok");
    }

    if (url.pathname === "/rename-user" && request.method === "POST") {
      const { oldName, newName } = await request.json();
      await this.loadPuzzle();
      if (this.puzzle && oldName && newName) {
        renamePuzzleIdentity(this.puzzle, oldName, newName);
        for (const metadata of this.sockets.values()) if (metadata.user === oldName) metadata.user = newName;
        await this.state.storage.put("puzzle", this.puzzle);
        this.broadcast({ type: "user-renamed", oldName, newName, puzzle: this.puzzle }, null);
        this.broadcastPresence();
      }
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

    // /join-puzzle (a plain REST call) only updates D1
    // — it never reaches this Durable Object, which holds its own separate
    // live copy of the puzzle in durable storage. Without this, a player
    // who joined but wasn't the original creator would never appear in
    // this.puzzle.players (what onInit actually sends to clients), even
    // though they're actively connected and typing. Connecting via
    // WebSocket is required to play at all, so it's a reliable signal to
    // self-heal that list here regardless of whether /join-puzzle ran.
    if (this.puzzle && !this.puzzle.players.includes(user)) {
      this.puzzle.players.push(user);
      await this.state.storage.put("puzzle", this.puzzle);
    }

    this.sockets.set(server, { user });
    this.sendTo(server, { type: "init", puzzle: this.puzzle, presence: this.presenceList() });
    this.broadcastPresence();

    server.addEventListener("message", (evt) => this.handleMessage(server, this.sockets.get(server)?.user || user, evt));
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
      const cellDef = this.puzzle.grid.cells.find((c) => c.row === row && c.col === col && !c.block);
      if (!cellDef) return;
      const existing = this.puzzle.cells[key];
      if (existing?.revealed || (existing?.letter && existing.letter === cellDef.letter)) return;

      this.puzzle.cells[key] = { letter: letter.toUpperCase(), owner: user, revealed: false };
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      const sess = this.puzzle.sessions[user];
      sess.lastActiveAt = new Date().toISOString();
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
      this.puzzle.sessions[user].lastActiveAt = new Date().toISOString();
      this.broadcast({ type: "cell-update", row, col, letter, owner: null, revealed: true }, null);
      const isComplete = this.checkComplete();
      await this.persist(isComplete);
      if (isComplete) {
        this.broadcast({ type: "completed" }, null);
      }
    } else if (msg.type === "auto-check-on") {
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      this.puzzle.sessions[user].autoCheckUsed = true;
      this.puzzle.sessions[user].lastActiveAt = new Date().toISOString();
      await this.persist(false);
    } else if (msg.type === "time-heartbeat") {
      // Bounded sanity check — a heartbeat should only ever cover the client's
      // own flush interval (see FLUSH_INTERVAL_MS in app.js), never something
      // wildly larger (clock skew, a resumed/suspended tab, a bad client).
      const deltaMs = Number(msg.deltaMs);
      if (!Number.isFinite(deltaMs) || deltaMs <= 0 || deltaMs > 120000) return;
      if (!this.puzzle.sessions[user]) this.puzzle.sessions[user] = newSession();
      this.puzzle.sessions[user].timeSpentMs = (this.puzzle.sessions[user].timeSpentMs || 0) + deltaMs;
      this.puzzle.sessions[user].lastActiveAt = new Date().toISOString();
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
    // A message that arrived just before/during deletion must not resurrect
    // the puzzle in storage or snapshot it to D1.
    if (this.deleted || !this.puzzle) return;
    await this.state.storage.put("puzzle", this.puzzle);
    const now = Date.now();
    // Snapshot to D1 on completion always; otherwise throttle writes.
    if (completed || now - this.lastPersist > 15000) {
      this.lastPersist = now;
      await this.commitSnapshot(completed);
    }
  }

  async commitSnapshot(completed) {
    const puzzle = await getPuzzle(this.env.DB, this.puzzle.id);
    if (!puzzle) return;
    puzzle.cells = this.puzzle.cells;
    puzzle.sessions = this.puzzle.sessions;
    puzzle.players = this.puzzle.players;
    puzzle.totalTimeMs = this.puzzle.totalTimeMs;
    if (completed && !puzzle.completedAt) {
      puzzle.completedAt = new Date().toISOString();
      puzzle.state = "completed";
      puzzle.grid = this.puzzle.grid;
      puzzle.highlights = computeHighlights(puzzle);
    }
    await upsertPuzzle(this.env.DB, puzzle);
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
  const size = ["mini", "quick", "compact", "standard", "large"].includes(body.size) ? body.size : "standard";
  const difficulty = ["beginner", "easy", "medium", "hard", "expert"].includes(body.difficulty) ? body.difficulty : "medium";
  const visibility = body.visibility === "private" ? "private" : "open";
  const createdBy = String(body.createdBy || "").trim().slice(0, 40);
  if (!title || !createdBy) return null;
  return { title, description, keywords, size, difficulty, visibility, createdBy };
}

function buildPuzzle(req, wordBank) {
  const grid = generatePuzzle({ keywords: req.keywords, title: req.title, size: req.size, difficulty: req.difficulty, wordBank });
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
  const joinedAt = new Date().toISOString();
  return {
    lettersEntered: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    correctionsMade: 0,
    revealsUsed: 0,
    wordsCompleted: 0,
    timeSpentMs: 0,
    autoCheckUsed: false,
    joinedAt,
    lastActiveAt: joinedAt,
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

function parseJson(value, fallback) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return fallback;
  }
}

function userFromRow(row) {
  return {
    hue: row.hue,
    createdAt: row.created_at,
    settings: parseJson(row.settings_json, { push: true, sound: true, haptic: true }),
  };
}

function puzzleFromRow(row) {
  return parseJson(row.payload_json, null);
}

function renamePuzzleIdentity(puzzle, oldName, newName) {
  let changed = false;
  if (puzzle.createdBy === oldName) { puzzle.createdBy = newName; changed = true; }
  if (puzzle.forkedBy === oldName) { puzzle.forkedBy = newName; changed = true; }
  if ((puzzle.players || []).includes(oldName)) {
    puzzle.players = [...new Set(puzzle.players.map((name) => name === oldName ? newName : name))];
    changed = true;
  }
  if (puzzle.sessions?.[oldName]) {
    puzzle.sessions[newName] = puzzle.sessions[oldName];
    delete puzzle.sessions[oldName];
    changed = true;
  }
  for (const cell of Object.values(puzzle.cells || {})) {
    if (cell.owner === oldName) { cell.owner = newName; changed = true; }
  }
  if (changed) puzzle.highlights = (puzzle.highlights || []).map((line) => line.replaceAll(oldName, newName));
  return changed;
}

async function loadData(db) {
  const [userResult, puzzleResult] = await db.batch([
    db.prepare("SELECT name, hue, created_at, settings_json FROM users ORDER BY rowid"),
    db.prepare("SELECT payload_json FROM puzzles ORDER BY rowid"),
  ]);
  const users = {};
  const puzzles = {};
  for (const row of userResult.results || []) users[row.name] = userFromRow(row);
  for (const row of puzzleResult.results || []) {
    const puzzle = puzzleFromRow(row);
    if (puzzle?.id) puzzles[puzzle.id] = puzzle;
  }
  return { users, puzzles };
}

async function registerUser(db, name) {
  const existing = await db.prepare(
    "SELECT name, hue, created_at, settings_json FROM users WHERE name = ?"
  ).bind(name).first();
  if (existing) return userFromRow(existing);

  const count = Number(await db.prepare("SELECT COUNT(*) AS count FROM users").first("count")) || 0;
  const createdAt = new Date().toISOString();
  const settings = { push: true, sound: true, haptic: true };
  await db.prepare(
    "INSERT OR IGNORE INTO users (name, hue, created_at, settings_json, updated_at) VALUES (?, ?, ?, ?, ?)"
  ).bind(name, PLAYER_HUES[count % PLAYER_HUES.length], createdAt, JSON.stringify(settings), createdAt).run();
  const row = await db.prepare(
    "SELECT name, hue, created_at, settings_json FROM users WHERE name = ?"
  ).bind(name).first();
  if (!row) throw new Error("user insert failed");
  return userFromRow(row);
}

async function updateUserColor(db, name, hue) {
  await db.prepare("UPDATE users SET hue = ?, updated_at = ? WHERE name = ?")
    .bind(hue, new Date().toISOString(), name).run();
}

async function renameUser(db, oldName, newName) {
  const [existing, collision, puzzleRows] = await Promise.all([
    db.prepare("SELECT name, hue, created_at, settings_json FROM users WHERE name = ?").bind(oldName).first(),
    db.prepare("SELECT name FROM users WHERE lower(name) = lower(?) AND name <> ?").bind(newName, oldName).first(),
    db.prepare("SELECT payload_json FROM puzzles").all(),
  ]);
  if (!existing) { const error = new Error("Player not found"); error.code = "NOT_FOUND"; throw error; }
  if (collision) { const error = new Error("That name is already taken"); error.code = "NAME_TAKEN"; throw error; }

  const affectedPuzzleIds = [];
  const statements = [db.prepare("UPDATE users SET name = ?, updated_at = ? WHERE name = ?").bind(newName, new Date().toISOString(), oldName)];
  for (const row of puzzleRows.results || []) {
    const puzzle = puzzleFromRow(row);
    if (!puzzle || !renamePuzzleIdentity(puzzle, oldName, newName)) continue;
    affectedPuzzleIds.push(puzzle.id);
    statements.push(puzzleUpsertStatement(db, puzzle));
  }
  await db.batch(statements);
  return { user: userFromRow(existing), affectedPuzzleIds };
}

async function getPuzzle(db, puzzleId) {
  const row = await db.prepare("SELECT payload_json FROM puzzles WHERE id = ?").bind(puzzleId).first();
  return row ? puzzleFromRow(row) : null;
}

function puzzleUpsertStatement(db, puzzle) {
  const now = new Date().toISOString();
  return db.prepare(`
    INSERT INTO puzzles (
      id, title, description, keywords_json, size, difficulty, visibility,
      created_by, created_at, state, completed_at, fork_of, forked_by,
      payload_json, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      keywords_json = excluded.keywords_json,
      size = excluded.size,
      difficulty = excluded.difficulty,
      visibility = excluded.visibility,
      created_by = excluded.created_by,
      created_at = excluded.created_at,
      state = excluded.state,
      completed_at = excluded.completed_at,
      fork_of = excluded.fork_of,
      forked_by = excluded.forked_by,
      payload_json = excluded.payload_json,
      updated_at = excluded.updated_at
  `).bind(
    puzzle.id,
    puzzle.title || "",
    puzzle.description || "",
    JSON.stringify(puzzle.keywords || []),
    puzzle.size || "standard",
    puzzle.difficulty || "medium",
    puzzle.visibility || "open",
    puzzle.createdBy || "",
    puzzle.createdAt || now,
    puzzle.state || "open",
    puzzle.completedAt || null,
    puzzle.forkOf || null,
    puzzle.forkedBy || null,
    JSON.stringify(puzzle),
    now
  );
}

async function upsertPuzzle(db, puzzle) {
  await puzzleUpsertStatement(db, puzzle).run();
}

async function joinPuzzle(db, puzzleId, user) {
  const puzzle = await getPuzzle(db, puzzleId);
  if (!puzzle) throw new Error("puzzle not found");
  if (!Array.isArray(puzzle.players)) puzzle.players = [];
  if (!puzzle.players.includes(user)) puzzle.players.push(user);
  if (!puzzle.sessions || typeof puzzle.sessions !== "object") puzzle.sessions = {};
  if (!puzzle.sessions[user]) puzzle.sessions[user] = newSession();
  await upsertPuzzle(db, puzzle);
}

async function deletePuzzle(db, puzzleId) {
  await db.prepare("DELETE FROM puzzles WHERE id = ?").bind(puzzleId).run();
}

async function deleteUser(db, name) {
  const rows = await db.prepare("SELECT payload_json FROM puzzles").all();
  const affectedPuzzleIds = [];
  const statements = [db.prepare("DELETE FROM users WHERE name = ?").bind(name)];
  for (const row of rows.results || []) {
    const puzzle = puzzleFromRow(row);
    if (!puzzle) continue;
    const hadUser = (puzzle.players || []).includes(name) || (puzzle.sessions && name in puzzle.sessions);
    if (!hadUser) continue;
    affectedPuzzleIds.push(puzzle.id);
    puzzle.players = (puzzle.players || []).filter((player) => player !== name);
    if (puzzle.sessions) delete puzzle.sessions[name];
    statements.push(puzzleUpsertStatement(db, puzzle));
  }
  await db.batch(statements);
  return affectedPuzzleIds;
}

export { loadData, registerUser, updateUserColor, renameUser, renamePuzzleIdentity, getPuzzle, upsertPuzzle, joinPuzzle, deletePuzzle, deleteUser };
