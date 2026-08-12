// Across — app shell, routing, and screen logic.
//
// Backend is abstracted behind `Backend` so the same UI code runs two ways:
//  - Remote mode: talks to the deployed Cloudflare Worker (REST + WebSocket).
//  - Local mode: falls back to localStorage + BroadcastChannel so the app
//    is fully testable in a browser with no Worker deployed yet — this is
//    what's active whenever config.js still has its placeholder WORKER_URL.
//    It reuses the real generator/corpus modules, so puzzles generated in
//    local mode are produced by the same algorithm the Worker uses.
import { hasStartedPuzzle, puzzleParticipantNames, sortPuzzlesByUserActivity } from "./home-order.js";
import { profilePuzzleCollections, puzzleLeaderboard, puzzleProgress, puzzleSeriesId } from "./profile-puzzles.js";
import { hasActiveDiscoverCriteria, pickRandomItem, shuffledCopy } from "./create-options.js?v=2";

const PLAYER_HUES = [250, 30, 140, 90, 320, 190, 10, 220, 60, 165, 285, 345];
const USING_LOCAL_BACKEND = !window.WORKER_URL || window.WORKER_URL.includes("YOUR-SUBDOMAIN");
if (USING_LOCAL_BACKEND) {
  console.info("[Across] No Worker configured (config.js still has placeholder values) — running in local-only dev mode. See README before deploying.");
}

// ===========================================================================
// Backend: local (localStorage + BroadcastChannel) implementation
// ===========================================================================

const LOCAL_KEY = "across_local_data";

function loadLocalData() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { users: {}, puzzles: {} };
}

function saveLocalData(data) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

function nowIso() {
  return new Date().toISOString();
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
}

function newSession() {
  const joinedAt = nowIso();
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

function generatePuzzleOffThread(req) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./puzzle-generator-worker.js", { type: "module" });
    const timeout = setTimeout(() => {
      worker.terminate();
      reject(new Error("Dense crossword generation took too long — please try again"));
    }, 45000);
    worker.onmessage = ({ data }) => {
      clearTimeout(timeout);
      worker.terminate();
      if (data?.ok) resolve(data.grid);
      else reject(new Error(data?.error || "Couldn't generate this crossword"));
    };
    worker.onerror = () => {
      clearTimeout(timeout);
      worker.terminate();
      reject(new Error("Couldn't load the crossword generator — reload Across and try again"));
    };
    worker.postMessage(req);
  });
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

const LocalBackend = {
  async getData() {
    return loadLocalData();
  },
  async registerUser(name) {
    const data = loadLocalData();
    if (!data.users[name]) {
      const hue = PLAYER_HUES[Object.keys(data.users).length % PLAYER_HUES.length];
      data.users[name] = { hue, createdAt: nowIso(), settings: { push: true, sound: true, haptic: true, showTimers: true, alwaysAutoCheck: false } };
      saveLocalData(data);
    }
    return { name, ...data.users[name] };
  },
  async updateUserSettings(name, settings) {
    const data = loadLocalData();
    if (data.users[name]) {
      data.users[name].settings = { ...data.users[name].settings, ...settings };
      saveLocalData(data);
    }
  },
  async updateUserColor(name, hue) {
    const data = loadLocalData();
    if (data.users[name]) {
      data.users[name].hue = hue;
      saveLocalData(data);
    }
  },
  async renameUser(oldName, newName) {
    const data = loadLocalData();
    if (!data.users[oldName]) throw new Error("Player not found");
    if (data.users[newName]) throw new Error("That name is already taken");
    data.users[newName] = data.users[oldName];
    delete data.users[oldName];
    for (const [puzzleId, puzzle] of Object.entries(data.puzzles)) {
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
      for (const cell of Object.values(puzzle.cells || {})) if (cell.owner === oldName) { cell.owner = newName; changed = true; }
      puzzle.highlights = (puzzle.highlights || []).map((line) => line.replaceAll(oldName, newName));
      if (changed) new BroadcastChannel(`across-room-${puzzleId}`).postMessage({ type: "user-renamed", oldName, newName, puzzle });
    }
    saveLocalData(data);
    return { name: newName, ...data.users[newName] };
  },
  async deleteUser(name) {
    const data = loadLocalData();
    delete data.users[name];
    for (const [puzzleId, p] of Object.entries(data.puzzles)) {
      p.players = (p.players || []).filter((n) => n !== name);
      if (p.sessions && name in p.sessions) {
        delete p.sessions[name];
        new BroadcastChannel(`across-room-${puzzleId}`).postMessage({ type: "user-scrubbed", user: name, players: p.players, sessions: p.sessions });
      }
    }
    saveLocalData(data);
  },
  async deletePuzzle(puzzleId) {
    const data = loadLocalData();
    delete data.puzzles[puzzleId];
    saveLocalData(data);
    new BroadcastChannel(`across-room-${puzzleId}`).postMessage({ type: "puzzle-deleted" });
  },
  async createPuzzle(req) {
    const grid = await generatePuzzleOffThread(req);
    const id = `${slugify(req.title) || "puzzle"}-${Date.now().toString(36)}`;
    const puzzle = {
      id,
      title: req.title,
      keywords: req.keywords,
      size: req.size,
      difficulty: req.difficulty,
      visibility: req.visibility,
      createdBy: req.createdBy,
      createdAt: nowIso(),
      grid,
      cells: {},
      players: [req.createdBy],
      sessions: { [req.createdBy]: newSession() },
      state: "open",
      completedAt: null,
      totalTimeMs: 0,
      highlights: [],
    };
    const data = loadLocalData();
    data.puzzles[id] = puzzle;
    saveLocalData(data);
    return puzzle;
  },
  async joinPuzzle(puzzleId, user) {
    const data = loadLocalData();
    const puzzle = data.puzzles[puzzleId];
    if (!puzzle) throw new Error("puzzle not found");
    if (!puzzle.players.includes(user)) puzzle.players.push(user);
    if (!puzzle.sessions[user]) puzzle.sessions[user] = newSession();
    saveLocalData(data);
  },
  async forkPuzzle(puzzleId, user, { newAttempt = false } = {}) {
    const data = loadLocalData();
    const source = data.puzzles[puzzleId];
    if (!source) throw new Error("puzzle not found");
    const seriesId = source.seriesId || source.forkOf || source.id;
    const series = Object.values(data.puzzles).filter((p) => (p.seriesId || p.forkOf || p.id) === seriesId);
    const attemptNumber = Math.max(0, ...series.map((p) => Number(p.attemptNumber) || 1)) + (newAttempt ? 1 : 0);
    const id = newAttempt
      ? `${slugify(source.title) || "puzzle"}-r${attemptNumber}-${Date.now().toString(36)}`
      : `${puzzleId}-priv-${slugify(user)}`;
    if (!newAttempt && data.puzzles[id]) return data.puzzles[id];
    const forked = {
      id,
      title: source.title,
      description: source.description,
      keywords: source.keywords,
      size: source.size,
      difficulty: source.difficulty,
      visibility: "private",
      createdBy: source.createdBy,
      forkOf: seriesId,
      forkedBy: user,
      seriesId,
      attemptOf: newAttempt ? source.id : null,
      attemptNumber: newAttempt ? attemptNumber : 1,
      isReplay: newAttempt,
      statsEligible: true,
      createdAt: nowIso(),
      grid: source.grid,
      cells: {},
      players: [user],
      sessions: { [user]: newSession() },
      state: "open",
      completedAt: null,
      totalTimeMs: 0,
      highlights: [],
    };
    data.puzzles[id] = forked;
    saveLocalData(data);
    return forked;
  },
  connectPuzzle(puzzleId, user, handlers) {
    const data = loadLocalData();
    const puzzle = data.puzzles[puzzleId];
    const channel = new BroadcastChannel(`across-room-${puzzleId}`);
    const presence = new Map();
    presence.set(user, Date.now());

    const heartbeat = setInterval(() => {
      // Renew our own entry every tick — BroadcastChannel never delivers a
      // tab's own messages back to itself, so without this the pruning
      // below would age *us* out of our own presence list after 8s.
      presence.set(user, Date.now());
      channel.postMessage({ type: "presence-ping", user });
      for (const [u, t] of presence) if (Date.now() - t > 8000) presence.delete(u);
      handlers.onPresence?.([...presence.keys()]);
    }, 3000);
    channel.postMessage({ type: "presence-ping", user });

    channel.onmessage = (evt) => {
      const msg = evt.data;
      if (msg.user === user && msg.type !== "presence-ping") return;
      if (msg.type === "presence-ping") {
        presence.set(msg.user, Date.now());
        handlers.onPresence?.([...presence.keys()]);
        return;
      }
      if (msg.type === "puzzle-deleted") {
        handlers.onPuzzleDeleted?.();
        return;
      }
      const fresh = loadLocalData();
      const p = fresh.puzzles[puzzleId];
      if (!p) return;
      if (msg.type === "cell-update") {
        handlers.onCellUpdate?.({ row: msg.row, col: msg.col, letter: msg.letter, owner: msg.owner, revealed: msg.revealed });
      } else if (msg.type === "cursor") {
        handlers.onCursor?.({ user: msg.user, row: msg.row, col: msg.col, direction: msg.direction });
      } else if (msg.type === "completed") {
        handlers.onCompleted?.();
      } else if (msg.type === "time-update") {
        handlers.onTimeUpdate?.({ sessions: p.sessions, totalTimeMs: p.totalTimeMs });
      } else if (msg.type === "user-scrubbed") {
        handlers.onUserScrubbed?.({ user: msg.user, players: msg.players, sessions: msg.sessions });
      } else if (msg.type === "user-renamed") {
        handlers.onUserRenamed?.(msg);
      }
    };

    setTimeout(() => handlers.onInit?.(puzzle, [user]), 0);

    // `meta` (isCorrect/corrected/wordCompleted) is only meaningful for
    // non-revealed cell-updates; reveals always credit revealsUsed to the
    // acting user (`user`, from the connection), regardless of `owner`
    // (which stays null for reveals — that's a display/attribution concern,
    // separate from whose stats the action counts toward).
    function persistCell(row, col, letter, owner, revealed, meta = {}) {
      const fresh = loadLocalData();
      const p = fresh.puzzles[puzzleId];
      if (!p) return;
      p.cells[`${row}-${col}`] = { letter, owner, revealed: !!revealed };
      if (!p.sessions[user]) p.sessions[user] = newSession();
      const sess = p.sessions[user];
      sess.lastActiveAt = nowIso();
      if (revealed) {
        sess.revealsUsed += 1;
      } else if (letter) {
        sess.lettersEntered += 1;
        if (meta.isCorrect) sess.correctLetters += 1;
        else sess.incorrectLetters += 1;
        if (meta.corrected) sess.correctionsMade += 1;
      }
      if (meta.wordCompleted) sess.wordsCompleted += 1;
      const complete = p.grid.cells.every((c) => c.block || (p.cells[`${c.row}-${c.col}`]?.letter === c.letter));
      if (complete && !p.completedAt) {
        p.completedAt = nowIso();
        p.state = "completed";
        p.highlights = computeHighlights(p);
        channel.postMessage({ type: "completed", user });
      }
      saveLocalData(fresh);
      return complete;
    }

    return {
      sendCellUpdate(row, col, letter, meta) {
        const complete = persistCell(row, col, letter, user, false, meta);
        channel.postMessage({ type: "cell-update", row, col, letter, owner: user, user });
        if (complete) handlers.onCompleted?.();
      },
      sendCursor(row, col, direction) {
        channel.postMessage({ type: "cursor", row, col, direction, user });
      },
      sendReveal(row, col, letter) {
        const complete = persistCell(row, col, letter, null, true);
        channel.postMessage({ type: "cell-update", row, col, letter, owner: null, revealed: true, user });
        if (complete) handlers.onCompleted?.();
      },
      sendAutoCheckOn() {
        const fresh = loadLocalData();
        const p = fresh.puzzles[puzzleId];
        if (p) {
          if (!p.sessions[user]) p.sessions[user] = newSession();
          p.sessions[user].autoCheckUsed = true;
          p.sessions[user].lastActiveAt = nowIso();
          saveLocalData(fresh);
        }
      },
      sendTimeHeartbeat(deltaMs) {
        if (!(deltaMs > 0)) return;
        const fresh = loadLocalData();
        const p = fresh.puzzles[puzzleId];
        if (!p) return;
        if (!p.sessions[user]) p.sessions[user] = newSession();
        p.sessions[user].timeSpentMs = (p.sessions[user].timeSpentMs || 0) + deltaMs;
        p.sessions[user].lastActiveAt = nowIso();
        p.totalTimeMs = Object.values(p.sessions).reduce((s, sess) => s + (sess.timeSpentMs || 0), 0);
        saveLocalData(fresh);
        channel.postMessage({ type: "time-update", user });
      },
      close() {
        clearInterval(heartbeat);
        channel.close();
      },
    };
  },
};

// ===========================================================================
// Backend: remote (Cloudflare Worker) implementation
// ===========================================================================

const RemoteBackend = {
  async apiGet(path) {
    const res = await fetch(`${window.WORKER_URL}${path}`);
    if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
    return res.json();
  },
  async apiPost(path, body) {
    const res = await fetch(`${window.WORKER_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-App-Key": window.APP_KEY },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || `POST ${path} failed (${res.status})`);
    return json;
  },
  async getData() {
    return this.apiGet("/data");
  },
  async registerUser(name) {
    const res = await this.apiPost("/register-user", { user: name });
    return res.user;
  },
  async updateUserSettings(name, settings) {
    await this.apiPost("/update-user-settings", { user: name, settings });
  },
  async updateUserColor(name, hue) {
    await this.apiPost("/update-user-color", { user: name, hue });
  },
  async renameUser(oldName, newName) {
    const res = await this.apiPost("/rename-user", { oldName, newName });
    return res.user;
  },
  async deleteUser(name) {
    await this.apiPost("/delete-user", { user: name });
  },
  async deletePuzzle(puzzleId) {
    await this.apiPost("/delete-puzzle", { puzzleId });
  },
  async createPuzzle(req) {
    // Prefer an instant, quality-gated inventory blueprint. During inventory
    // rollout, a depleted bucket may still use the strict client generator;
    // it fails closed instead of submitting a sparse or off-theme grid.
    try {
      const res = await this.apiPost("/create-puzzle", req);
      return res.puzzle;
    } catch (error) {
      if (!String(error?.message || "").startsWith("No unseen puzzle is ready")) throw error;
      const grid = await generatePuzzleOffThread(req);
      const res = await this.apiPost("/create-puzzle", { ...req, grid });
      return res.puzzle;
    }
  },
  async joinPuzzle(puzzleId, user) {
    await this.apiPost("/join-puzzle", { puzzleId, user });
  },
  async forkPuzzle(puzzleId, user, options = {}) {
    const res = await this.apiPost("/fork-puzzle", { puzzleId, user, newAttempt: !!options.newAttempt });
    return res.puzzle;
  },
  connectPuzzle(puzzleId, user, handlers) {
    const wsUrl = `${window.WORKER_URL.replace(/^http/, "ws")}/puzzle/${puzzleId}/connect?user=${encodeURIComponent(user)}`;
    const socket = new WebSocket(wsUrl);
    const checkpointWaiters = new Map();
    socket.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.type === "checkpoint-saved") {
        const waiter = checkpointWaiters.get(msg.requestId);
        if (waiter) {
          checkpointWaiters.delete(msg.requestId);
          waiter(true);
        }
      } else if (msg.type === "init") handlers.onInit?.(msg.puzzle, msg.presence);
      else if (msg.type === "cell-update") handlers.onCellUpdate?.(msg);
      else if (msg.type === "presence") handlers.onPresence?.(msg.players);
      else if (msg.type === "cursor") handlers.onCursor?.(msg);
      else if (msg.type === "completed") handlers.onCompleted?.();
      else if (msg.type === "time-update") handlers.onTimeUpdate?.({ sessions: msg.sessions, totalTimeMs: msg.totalTimeMs });
      else if (msg.type === "puzzle-deleted") handlers.onPuzzleDeleted?.();
      else if (msg.type === "user-scrubbed") handlers.onUserScrubbed?.({ user: msg.user, players: msg.players, sessions: msg.sessions });
      else if (msg.type === "user-renamed") handlers.onUserRenamed?.(msg);
    };
    socket.addEventListener("close", () => {
      for (const resolve of checkpointWaiters.values()) resolve(false);
      checkpointWaiters.clear();
    });
    const send = (msg) => {
      if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(msg));
      else socket.addEventListener("open", () => socket.send(JSON.stringify(msg)), { once: true });
    };
    return {
      sendCellUpdate(row, col, letter, meta) { send({ type: "cell-update", row, col, letter, ...meta }); },
      sendCursor(row, col, direction) { send({ type: "cursor", row, col, direction }); },
      sendReveal(row, col, letter) { send({ type: "reveal", row, col, letter }); },
      sendAutoCheckOn() { send({ type: "auto-check-on" }); },
      sendTimeHeartbeat(deltaMs) { if (deltaMs > 0) send({ type: "time-heartbeat", deltaMs }); },
      requestCheckpoint() {
        if (socket.readyState !== WebSocket.OPEN) return Promise.resolve(false);
        const requestId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        return new Promise((resolve) => {
          const finish = (saved) => {
            clearTimeout(timeout);
            resolve(saved);
          };
          const timeout = setTimeout(() => {
            checkpointWaiters.delete(requestId);
            finish(false);
          }, 3000);
          checkpointWaiters.set(requestId, finish);
          socket.send(JSON.stringify({ type: "checkpoint", requestId }));
        });
      },
      close() { socket.close(); },
    };
  },
};

const Backend = USING_LOCAL_BACKEND ? LocalBackend : RemoteBackend;

// ===========================================================================
// App state
// ===========================================================================

let currentUser = null; // { name, hue, settings }
let currentPuzzleConn = null;
let currentPuzzle = null;
let currentPresence = []; // last known "who's online right now" list for the open puzzle
let selectedCell = null;
let selectedDirection = "across";
let sessionStartTime = null;
let sessionTimerHandle = null;
let autoCheckOn = false;
let impatientMode = false; // local-only visual flourish toggle, default off
let extremelyImpatientMode = false; // same, but celebrates every correct letter, not just completed words
let createCategory = null;
let rankingsWindow = "week";
let rankingsMetric = "Contribution";
let lastSearchQuery = "";
let activeSearchCategory = "all";
let activeSearchDifficulty = "all";
let activeSearchSize = "all";
let profilePickerExpanded = false;
let completedWordKeys = new Set(); // reset per puzzle open — avoids double-counting wordsCompleted

const RANKING_METRICS = ["Completed", "Contribution", "Accuracy"];
const SEARCH_CATEGORIES = [
  "Geography", "History", "Science", "Nature", "Animals", "Space",
  "Literature", "Language", "Philosophy", "Mythology", "Art & Design", "Music",
  "Movies & TV", "Pop Culture", "Technology", "Business & Economics",
  "Politics & Society", "Food & Drink", "Travel", "Sports", "Games", "Kids",
  "People", "Houston & Texas", "Beer & Brewing", "Whisky", "General Knowledge",
];
// New creation deliberately exposes three meaningfully different sessions.
// The legacy 7x7 and 11x11 keys remain understood everywhere puzzles are
// read, so existing crosswords never need migration.
const SIZE_OPTIONS = { mini: 5, compact: 9, large: 15 };
const ALL_SIZE_DIMENSIONS = { mini: 5, quick: 7, compact: 9, standard: 11, large: 15 };
const SIZE_LABELS = { mini: "Mini", quick: "Legacy 7×7", compact: "Standard", standard: "Legacy 11×11", large: "Full" };
const sizeLabel = (value) => SIZE_LABELS[value] || cap(value);
function normalizedCreateSize(value) {
  const dimension = ALL_SIZE_DIMENSIONS[value] || Number(value) || 9;
  return dimension <= 5 ? "mini" : dimension >= 15 ? "large" : "compact";
}
const DIFFICULTY_OPTIONS = ["beginner", "easy", "medium", "hard", "expert"];
const DIFFICULTY_HELP = {
  beginner: "Uses only the most familiar clue tier.",
  easy: "Favors familiar clues, with a broader pool when needed.",
  medium: "Balances familiar and moderately obscure clues.",
  hard: "Uses the full corpus and favors upper-tier clues.",
  expert: "Strongly prioritizes the most obscure clue tier.",
};
const CATEGORY_ALIASES = { movies: "Movies & TV", food: "Food & Drink", general: "General Knowledge" };

function normalizedCategory(value) {
  const key = String(value || "").toLowerCase();
  return (CATEGORY_ALIASES[key] || value || "").toLowerCase();
}

// Sentence case throughout (only the first letter capitalized) — no
// title-case styling. Deliberately long lists: with only a handful per
// category the shuffle button repeated itself within a few taps.
const TITLE_IDEAS = {
  geography: [
    "Passport required", "Where in the world", "Off the map", "Continental drift",
    "The grand tour", "Border patrol", "Peak conditions", "Capital gains",
    "River deep, mountain high", "Latitude adjustment", "Terra incognita", "The scenic route",
    "Wish you were here", "Compass points", "Global positioning", "Map quest",
    "Sea level", "Wanderlust", "Postcards home", "Elevation anxiety",
    "European capitals", "Island nations", "Deserts & dunes", "Around the globe",
  ],
  movies: [
    "Now showing", "Roll credits", "Popcorn required", "Silver screen",
    "Based on a true story", "Coming soon", "Director's cut", "Opening weekend",
    "The sequel nobody asked for", "Two thumbs up", "Spoiler alert", "Final cut",
    "Blockbuster season", "Straight to streaming", "Award season", "Method acting",
    "The plot thickens", "Cut and print", "Screen time", "Box office gold",
    "Fade to black", "Animated classics", "Superhero showdown", "Behind the scenes",
  ],
  history: [
    "Ancient history", "Once upon a timeline", "Old news", "Before your time",
    "The past is prologue", "Rise and fall", "History repeats", "Written in stone",
    "Dusty archives", "Empire building", "Turning points", "Back in the day",
    "Age of discovery", "Living memory", "The long view", "Yesterday's headlines",
    "Founding moments", "Time capsule", "Relics and ruins", "Revolution required",
    "History's greatest hits", "Kings & queens", "Empires & explorers", "Ancient civilizations",
  ],
  sports: [
    "Game on", "Extra innings", "Overtime", "Home field advantage",
    "Sudden death", "The final whistle", "Benchwarmers", "Photo finish",
    "Personal best", "Championship season", "Full contact", "Play by play",
    "Sweat equity", "Down to the wire", "Team spirit", "Off the bench",
    "Second half", "Victory lap", "Training day", "The comeback",
    "Season openers", "Halftime", "No pain, no gain", "Olympic spirit",
  ],
  science: [
    "Lab results", "Hypothesis confirmed", "Elementary", "Under the microscope",
    "Peer reviewed", "Chain reaction", "Critical mass", "The scientific method",
    "Room temperature", "Cosmic questions", "Small wonders", "Natural selection",
    "Test conditions", "Eureka moments", "Periodic tendencies", "Deep space",
    "Life sciences", "Reaction time", "Field notes", "Observable universe",
    "Bright ideas", "Matter of fact", "Space explorers", "Elements & energy",
  ],
  food: [
    "Second helpings", "Chef's kiss", "Table for two", "Comfort food",
    "Guilty pleasures", "Farm to table", "Just desserts", "Midnight snack",
    "Family recipe", "Taste test", "Seasoned to taste", "Menu options",
    "Food for thought", "Leftovers", "Slow cooked", "Bite sized",
    "Pantry raid", "Daily special", "Home cooking", "Sugar rush",
    "Well done", "The main course", "Sweet treats", "World cuisine",
  ],
  kids: [
    "Bedtime stories", "Recess", "Show and tell", "Once upon a time",
    "Playground rules", "Snack time", "Are we there yet", "Imaginary friends",
    "Blanket fort", "Saturday morning", "Kid tested", "Nap time",
    "Crayon colors", "Backyard adventures", "Story hour", "Make believe",
    "Rainy day fun", "First day jitters", "Sticker rewards", "Puddle jumping",
    "Cartoon logic", "Growing pains", "Fairy tale fun", "Storybook adventures",
  ],
  "houston & texas": [
    "Bayou City", "Space City", "Rodeo season", "Lone Star landmarks",
    "Boots & bayous", "Gulf Coast state of mind", "Deep in the grid", "Houston, we have answers",
    "Along the ship channel", "Under the Astrodome", "From the Heights to the coast", "Texas sized",
    "Trail rides & skylines", "The Gulf Coast guide", "Bluebonnets & brisket", "Remember the Alamo",
    "Big Bend to Buffalo Bayou", "The Texas triangle", "H town know how", "Stars over Texas",
    "Ranches, rockets & rodeos", "Bayous after dark", "A Houston field guide", "Lone Star lore",
  ],
  "beer & brewing": [
    "Hoppy hour", "On tap", "Malt intentions", "Lager than life",
    "Flight school", "Brewed awakening", "Ale's well", "Yeast mode",
    "Grain expectations", "The bitter end", "Another round", "Perfect head",
    "From grain to glass", "Small batch", "House pour", "Cellar notes",
    "Fresh hops", "Worth the wait", "Brew day", "Pint sized",
    "Barrel aged", "Taproom trivia", "A proper pour", "Prost",
  ],
  whisky: [
    "The spirit of things", "Cask conditions", "A quiet dram", "Malt matters",
    "Whisky business", "Oak and time", "The angel's share", "Straight from the cask",
    "Proof of character", "Still life", "Barrel notes", "A proper measure",
    "From grain to glass", "The long maturation", "Nose to finish", "House style",
    "Peat and patience", "Single-minded", "The master blender", "Warehouse secrets",
    "A world of whisky", "Spirit safe", "No age statement", "Time in oak",
  ],
};

const TITLE_SUBJECTS = {
  nature: ["Wild things", "Field notes", "The understory", "Weather permitting", "Root causes", "Natural consequences"],
  animals: ["Creature comforts", "The taxonomy department", "Fur, fins & feathers", "Animal logic", "A brief history of beaks", "Kingdom business"],
  space: ["Mostly void", "Orbital mechanics", "Cosmic housekeeping", "The gravity of it all", "Deep thoughts, deeper space", "A modest universe"],
  literature: ["Well read", "Between the lines", "Narrative tension", "The unreliable narrator", "Required reading, allegedly", "A novel approach"],
  language: ["Words about words", "Semantic drift", "Lost in translation", "The last word", "Syntax matters", "Conjugation station"],
  philosophy: ["I clue, therefore I am", "Categorical imperatives", "An examined grid", "Existential squares", "The meaning of maybe", "Plato's playbook"],
  mythology: ["Myth management", "Gods behaving badly", "Heroic complications", "Classical monsters", "Legend has it", "An oracle walks into a grid"],
  "art & design": ["Form follows fun", "Negative space", "The cultured grid", "A matter of taste", "Bauhaus rules", "Still life, moving clues"],
  music: ["Minor complications", "Noteworthy", "Classical conditioning", "The sound argument", "Rhythm section", "A measured response", "Rodeo headliners", "Festival season", "Garage playlist", "Opening act", "Live from the lawn", "One more song"],
  "movies & tv": ["Now showing", "The plot thickens", "Prestige television", "Roll credits", "Continuity errors", "The sequel problem"],
  "pop culture": ["Zeitgeist watch", "Cultural literacy", "Main character energy", "Trending, historically", "The discourse", "Fame, briefly"],
  technology: ["Known issues", "Feature, not bug", "Human-readable", "Terms and conditions", "A series of tubes", "Technical debt society"],
  "business & economics": ["Capital ideas", "Market corrections", "The invisible hand waves", "Serious business", "Supply meets demand", "Marginal gains"],
  "politics & society": ["The public square", "Civic complications", "Power structures", "A more perfect grid", "Policy wonks welcome", "The social contract"],
  "food & drink": ["Food for thought", "Second helpings", "A balanced argument", "Tasteful questions", "Just desserts", "The well-read menu", "Houston eats", "Cajun country", "Breakfast tacos", "Crawfish season", "Backyard cookout", "Smoke & spice"],
  travel: ["Departures and arrivals", "A slight detour", "Frequent flyer theory", "The scenic route", "Cultural baggage", "Away with words", "Galveston weekend", "Gulf Coast getaway", "Weekend away", "The open road", "Coastal detour", "Pack light"],
  sports: ["Rodeo run", "World Cup fever", "Municipal course legends", "Tailgate season", "Tee time", "Full time"],
  games: ["Rules lawyer", "Player one thinks", "Strategic ambiguity", "A sporting chance", "Game theory, lightly", "Critical hits", "Daily streak", "One more round", "Five cards and a dream", "Puzzle rivalry", "Guess again", "Score to settle"],
  kids: ["Dad mode", "Pool full of kids", "Birthday party circuit", "Saturday sideline", "School night chaos", "Backyard energy"],
  people: ["Notable characters", "Human interest", "A few good names", "Biographical details", "People of consequence", "The social register"],
  "general knowledge": ["Things one ought to know", "Broadly speaking", "A civilized miscellany", "Useful at dinner", "The informed guess", "General intelligence"],
};
const TITLE_FRAMES = [
  "{category}, reconsidered", "A short course in {category}", "Notes toward {category}",
  "The {category} question", "An incomplete theory of {category}", "Further studies in {category}",
  "{category} for the reasonably curious", "A working knowledge of {category}",
  "The civilized guide to {category}", "{category}, more or less", "Some assembly required",
  "No footnotes necessary", "An argument in several squares", "The clue is in the title",
];

function titleIdeasFor(category) {
  const key = (category || "").toLowerCase();
  const legacyKey = key === "movies & tv" ? "movies" : key === "food & drink" ? "food" : key;
  const specific = [...(TITLE_IDEAS[legacyKey] || []), ...(TITLE_SUBJECTS[key] || [])];
  const framed = TITLE_FRAMES.map((title) => title.replaceAll("{category}", key));
  return [...new Set([...specific, ...framed])];
}

// ===========================================================================
// Small helpers
// ===========================================================================

function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return [...root.querySelectorAll(sel)]; }
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const child of [].concat(children)) node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  return node;
}
function navIcon(paths) {
  const icon = el("div", { class: "nav-icon" });
  icon.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
  return icon;
}
function hueClass(hue) {
  const idx = Math.max(0, PLAYER_HUES.indexOf(hue));
  return `player-hue-${idx}`;
}
function initials(name) { return (name || "?").trim().charAt(0).toUpperCase(); }
function formatMinSec(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function formatClock(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return formatMinSec(ms);
}
let toastTimer = null;
function showToast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function navigate(screenId) {
  $all(".screen").forEach((s) => s.classList.remove("active"));
  $(`#${screenId}`).classList.add("active");
  $("#app-brand-header").classList.toggle("hidden", screenId === "screen-puzzle");
  $all("[data-nav]").forEach((nav) => renderBottomNav(nav, screenId));
  syncPuzzleTiming();
  window.scrollTo(0, 0);
}

function renderBottomNav(nav, activeScreen) {
  const items = [
    { id: "screen-home", label: "Home", icon: () => navIcon('<path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.2V21h13V9.2M9.5 21v-7h5v7"/>') },
    { id: "screen-search", label: "Discover", icon: () => navIcon('<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/>') },
    { id: "__create__", label: "", icon: null },
    { id: "screen-rankings", label: "Rankings", icon: () => navIcon('<path d="M5 20v-6h4v6M10 20V8h4v12M15 20V4h4v16M3 20h18"/>') },
    { id: "screen-settings", label: "Settings", icon: () => navIcon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.09A1.7 1.7 0 0 0 8.96 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3v-4h.09A1.7 1.7 0 0 0 4.6 8.96a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 8.96 4.6 1.7 1.7 0 0 0 10 3.04V3h4v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.6.72 1.02 1.34 1.02H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/>') },
  ];
  nav.innerHTML = "";
  for (const item of items) {
    if (item.id === "__create__") {
      nav.appendChild(el("button", { class: "nav-create", onclick: () => openCreate() }, "+"));
      continue;
    }
    const btn = el("button", { class: "nav-item" + (item.id === activeScreen ? " active" : "") });
    btn.appendChild(item.icon());
    btn.appendChild(el("div", { class: "nav-label", text: item.label }));
    btn.addEventListener("click", () => {
      if (item.id === "screen-home") renderHome();
      if (item.id === "screen-search") renderSearch();
      if (item.id === "screen-rankings") renderRankings();
      if (item.id === "screen-settings") renderSettings();
      navigate(item.id);
    });
    nav.appendChild(btn);
  }
}

$("#app-brand").addEventListener("click", () => {
  leavePuzzleConnection();
  renderHome();
  navigate("screen-home");
});

// A puzzle earns the gold treatment when it was finished with zero reveals
// and nobody had Auto Check on — genuinely solved unassisted, not just
// "completed" in the broader sense (which also counts revealed/assisted
// finishes).
function isPerfectCompletion(puzzle) {
  if (puzzle?.state !== "completed") return false;
  const sessions = Object.values(puzzle.sessions || {});
  if (sessions.length === 0) return false;
  return sessions.every((s) => (s.revealsUsed || 0) === 0 && !s.autoCheckUsed);
}

function miniGrid(puzzle, sizeClass) {
  const grid = el("div", { class: `mini-grid ${sizeClass}` });
  const cells = puzzle?.grid?.cells || [];
  const rows = puzzle?.grid?.rows || 4;
  const cols = puzzle?.grid?.cols || 4;
  const golden = isPerfectCompletion(puzzle);
  grid.style.gridTemplateColumns = `repeat(4, 1fr)`;
  grid.style.gridTemplateRows = `repeat(4, 1fr)`;
  // Sample a 4x4 preview from the real grid's block pattern for a thumbnail.
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const sr = Math.floor((r / 4) * rows);
      const sc = Math.floor((c / 4) * cols);
      const cell = cells.find((cc) => cc.row === sr && cc.col === sc);
      const filled = cell && !cell.block;
      const cellEl = el("div", { class: "mini-grid-cell" + (filled ? " filled owned" : "") });
      if (filled) {
        if (golden) {
          cellEl.style.background = "var(--gold)";
        } else {
          const owner = puzzle.cells?.[`${sr}-${sc}`]?.owner;
          const hue = owner && dataCache?.users?.[owner]?.hue;
          cellEl.style.background = hue != null ? `oklch(58% .1 ${hue})` : "var(--block-cell)";
        }
      }
      grid.appendChild(cellEl);
    }
  }
  return grid;
}

// ===========================================================================
// Bootstrap
// ===========================================================================

let dataCache = { users: {}, puzzles: {} };

async function refreshData() {
  dataCache = await Backend.getData();
  return dataCache;
}

// A puzzle share link looks like https://.../#/s/{puzzleId} (see the Share
// button in the puzzle header and Completion screen). Parsed once login is
// established and consumed (hash cleared) so a later reload of the same tab
// doesn't re-trigger it.
function getSharedPuzzleIdFromHash() {
  const m = location.hash.match(/^#\/s\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

// Every "just finished logging in" path (boot() with a saved name, picking
// a profile card, or submitting a new name) needs the same next step: if
// this tab was opened from a share link, join+open that puzzle directly;
// otherwise go to the normal Home screen.
async function enterAppAfterLogin() {
  const sharedId = getSharedPuzzleIdFromHash();
  renderHome();
  navigate("screen-home");
  if (sharedId) {
    history.replaceState(null, "", location.pathname + location.search);
    if (dataCache.puzzles[sharedId]) {
      openSharedPuzzle(sharedId);
    } else {
      showToast("That crossword link looks invalid or was deleted");
    }
  }
}

async function boot() {
  const savedName = localStorage.getItem("across_user_name");
  await refreshData();
  if (savedName && dataCache.users[savedName]) {
    currentUser = { name: savedName, ...dataCache.users[savedName] };
    await enterAppAfterLogin();
  } else if (savedName) {
    // Known locally but not yet in the fetched data (e.g. first remote sync) — register.
    currentUser = await Backend.registerUser(savedName);
    await refreshData();
    await enterAppAfterLogin();
  } else {
    renderProfilePicker();
    navigate("screen-name-entry");
  }
}

function renderProfilePicker() {
  const grid = $("#profile-picker-grid");
  grid.innerHTML = "";
  $("#new-player-form").style.display = "none";
  $("#name-entry-input").value = "";

  const entries = Object.entries(dataCache.users);
  const recentName = localStorage.getItem("across_user_name");
  entries.sort(([a], [b]) => (a === recentName ? -1 : b === recentName ? 1 : a.localeCompare(b)));
  const visibleEntries = profilePickerExpanded ? entries : entries.slice(0, 1);

  for (const [name, user] of visibleEntries) {
    const card = el("div", { class: "profile-card" + (name === recentName ? " selected" : "") }, [
      el("div", { class: "profile-card-avatar", style: `background:oklch(58% .1 ${user.hue})`, text: initials(name) }),
      el("div", { class: "profile-card-name", text: name }),
    ]);
    card.addEventListener("click", async () => {
      currentUser = { name, ...user };
      localStorage.setItem("across_user_name", name);
      await enterAppAfterLogin();
    });
    grid.appendChild(card);
  }

  if (entries.length > 1) {
    const more = el("button", {
      class: "profile-card more-players",
      text: profilePickerExpanded ? "Show recent only" : `More players (${entries.length - 1})`,
      onclick: () => { profilePickerExpanded = !profilePickerExpanded; renderProfilePicker(); },
    });
    grid.appendChild(more);
  }

  const newCard = el("div", { class: "profile-card new-player" }, [
    el("div", { class: "profile-card-avatar", text: "+" }),
    el("div", { class: "profile-card-name", text: "New player" }),
  ]);
  newCard.addEventListener("click", () => {
    $("#new-player-form").style.display = "flex";
    $("#name-entry-input").focus();
  });
  grid.appendChild(newCard);
}

$("#name-entry-submit").addEventListener("click", async () => {
  const input = $("#name-entry-input");
  const name = input.value.trim().slice(0, 40);
  if (!name) return;
  if (dataCache.users[name]) { showToast(`"${name}" is already taken — pick that card instead, or use a different name`); return; }
  currentUser = await Backend.registerUser(name);
  localStorage.setItem("across_user_name", name);
  await refreshData();
  await enterAppAfterLogin();
});
$("#name-entry-input").addEventListener("keydown", (e) => { if (e.key === "Enter") $("#name-entry-submit").click(); });

let returningHome = false;
document.addEventListener("click", async (e) => {
  if (e.target.closest("[data-action='go-home']")) {
    if (returningHome) return;
    returningHome = true;
    try {
      await saveAndLeavePuzzleConnection();
      try {
        await refreshData();
      } catch (error) {
        showToast(error.message || "Couldn't refresh the home screen");
      }
      renderHome();
      navigate("screen-home");
    } finally {
      returningHome = false;
    }
  }
});

// ===========================================================================
// Home screen
// ===========================================================================

function puzzleActivityTime(puzzle) {
  const own = puzzle?.sessions?.[currentUser?.name];
  return new Date(own?.lastActiveAt || puzzle?.completedAt || puzzle?.createdAt || 0).getTime();
}

function attemptsForPuzzle(puzzle) {
  const seriesId = puzzleSeriesId(puzzle);
  return Object.values(dataCache.puzzles)
    .filter((candidate) => candidate.players?.includes(currentUser.name) && puzzleSeriesId(candidate) === seriesId)
    .sort((a, b) => puzzleActivityTime(b) - puzzleActivityTime(a));
}

function latestPuzzlePerSeries(puzzles) {
  const latest = new Map();
  for (const puzzle of puzzles) {
    const seriesId = puzzleSeriesId(puzzle);
    const previous = latest.get(seriesId);
    if (!previous || puzzleActivityTime(puzzle) > puzzleActivityTime(previous)) latest.set(seriesId, puzzle);
  }
  return [...latest.values()];
}

function renderHome() {
  const scroll = $("#home-scroll");
  scroll.innerHTML = "";

  const myPuzzles = Object.values(dataCache.puzzles).filter((p) => p.players.includes(currentUser.name));
  const latest = latestPuzzlePerSeries(myPuzzles);
  const continuing = sortPuzzlesByUserActivity(
    latest.filter((p) => p.state === "open" && hasStartedPuzzle(p, currentUser.name)),
    currentUser.name,
  );
  const completed = latest.filter((p) => p.state === "completed").sort((a, b) => puzzleActivityTime(b) - puzzleActivityTime(a));
  const openToJoin = Object.values(dataCache.puzzles)
    .filter((p) => p.state === "open" && p.visibility === "open" && !hasStartedPuzzle(p, currentUser.name))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  scroll.appendChild(section("Continue playing", continuing, "No puzzles in progress — tap + to start one.", continueRow));
  scroll.appendChild(section("New open crosswords", openToJoin, "No open crosswords yet — tap + to start one.", openRow));
  scroll.appendChild(section("Recently completed", completed, "Nothing finished yet.", completedRow));
}

const HOME_SECTION_CAP = 3;
// Which sections the user has tapped "More" on — persists across re-renders
// within the session (e.g. a puzzle finishing shouldn't silently re-collapse
// a list you just expanded), reset only implicitly by a fresh page load.
const expandedHomeSections = new Set();

// The "More" pill only renders when the list actually has more than the cap
// (previously it always showed, even on an empty section); clicking it
// expands that section in place rather than just showing a placeholder toast.
function section(title, list, emptyText, renderRow) {
  const wrap = el("div");
  const expanded = expandedHomeSections.has(title);
  const shown = expanded ? list.length : HOME_SECTION_CAP;
  const headerChildren = [el("div", { class: "section-title", text: title })];
  if (list.length > HOME_SECTION_CAP && !expanded) {
    headerChildren.push(el("button", {
      class: "pill-more",
      onclick: () => { expandedHomeSections.add(title); renderHome(); },
    }, "More"));
  }
  wrap.appendChild(el("div", { class: "section-header" }, headerChildren));
  if (list.length === 0) {
    wrap.appendChild(el("div", { class: "empty-note", text: emptyText }));
  } else {
    const rowsWrap = el("div", { class: "puzzle-list" });
    for (const p of list.slice(0, shown)) rowsWrap.appendChild(renderRow(p));
    wrap.appendChild(rowsWrap);
  }
  return wrap;
}

function continueRow(p) {
  const filled = Object.keys(p.cells || {}).length;
  const total = p.grid.cells.filter((c) => !c.block).length;
  const pct = total ? Math.round((filled / total) * 100) : 0;
  const participants = puzzleParticipantNames(p);
  const row = el("div", { class: "puzzle-row continue", role: "button", tabindex: "0", onclick: () => openPuzzle(p.id) });
  row.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") openPuzzle(p.id); });
  row.appendChild(miniGrid(p, "size-44"));
  row.appendChild(el("div", { class: "puzzle-info" }, [
    el("div", { class: "puzzle-title", text: p.title }),
    el("div", { class: "puzzle-meta", text: `${participants.length} player${participants.length === 1 ? "" : "s"} · ${pct}% done` }),
  ]));
  const stack = el("div", { class: "avatar-stack" });
  for (const name of participants.slice(0, 4)) {
    const hue = dataCache.users[name]?.hue ?? 250;
    stack.appendChild(el("div", {
      class: `avatar-dot ${hueClass(hue)}`,
      style: `background:oklch(58% .1 ${hue})`,
      text: initials(name),
      title: name,
      "aria-label": name,
    }));
  }
  row.appendChild(stack);
  appendAttemptHistoryControl(row, p);
  return row;
}

function openRow(p) {
  const participants = puzzleParticipantNames(p);
  const row = el("button", { class: "puzzle-row", onclick: () => openSharedPuzzle(p.id) });
  row.appendChild(miniGrid(p, "size-40"));
  row.appendChild(el("div", { class: "puzzle-info" }, [
    el("div", { class: "puzzle-title", text: p.title }),
    el("div", { class: "puzzle-meta", text: `${cap(p.difficulty)} · ${p.grid.rows}×${p.grid.cols} · ${participants.length} joined` }),
  ]));
  row.appendChild(el("span", { class: "chevron", text: "›" }));
  return row;
}

function completedRow(p) {
  const row = el("div", { class: "completed-row", role: "button", tabindex: "0", onclick: () => openCompletedPuzzleOptions(p.id) });
  row.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") openCompletedPuzzleOptions(p.id); });
  row.appendChild(miniGrid(p, "size-40"));
  row.appendChild(el("div", { class: "completed-title", text: p.title }));
  const mins = p.totalTimeMs ? formatMinSec(p.totalTimeMs) : "—";
  row.appendChild(el("div", { class: "completed-meta", text: `${mins} · ${p.players.length}p` }));
  appendAttemptHistoryControl(row, p);
  return row;
}

function appendAttemptHistoryControl(row, puzzle) {
  const attempts = attemptsForPuzzle(puzzle);
  if (attempts.length < 2) return;
  const control = el("span", {
    class: "attempt-history-link",
    text: `${attempts.length} attempts`,
    title: "View attempt history",
  });
  control.setAttribute("role", "button");
  control.setAttribute("tabindex", "0");
  const open = (event) => { event.stopPropagation(); showAttemptHistory(puzzleSeriesId(puzzle)); };
  control.addEventListener("click", open);
  control.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") open(event);
  });
  row.appendChild(control);
}

function viewCompletedPuzzle(puzzleId) {
  const p = dataCache.puzzles[puzzleId];
  if (!p) return;
  currentPuzzle = p;
  renderCompletion(p);
  navigate("screen-completion");
}

let pendingCompletedPuzzleId = null;

function openCompletedPuzzleOptions(puzzleId) {
  const puzzle = dataCache.puzzles[puzzleId];
  if (!puzzle) return;
  pendingCompletedPuzzleId = puzzleId;
  $("#completed-choice-title").textContent = puzzle.title;
  $("#completed-choice-menu").style.display = "flex";
}

async function startReplay(puzzleId) {
  try {
    const replay = await Backend.forkPuzzle(puzzleId, currentUser.name, { newAttempt: true });
    await refreshData();
    openPuzzle(replay.id);
  } catch (error) {
    showToast(error.message || "Couldn't start a new attempt");
  }
}

function showAttemptHistory(seriesId) {
  const list = $("#attempt-history-list");
  list.innerHTML = "";
  const attempts = Object.values(dataCache.puzzles)
    .filter((puzzle) => puzzle.players?.includes(currentUser.name) && puzzleSeriesId(puzzle) === seriesId)
    .sort((a, b) => puzzleActivityTime(b) - puzzleActivityTime(a));
  attempts.forEach((puzzle, index) => {
    const label = puzzle.state === "completed" ? `Completed · ${formatMinSec(puzzle.totalTimeMs || 0)}` : "In progress";
    const attempt = Number(puzzle.attemptNumber) || Math.max(1, attempts.length - index);
    list.appendChild(el("button", {
      class: "attempt-history-row",
      onclick: () => {
        $("#attempt-history-menu").style.display = "none";
        if (puzzle.state === "completed") openCompletedPuzzleOptions(puzzle.id);
        else openPuzzle(puzzle.id);
      },
    }, [
      el("span", { class: "attempt-history-number", text: `Attempt ${attempt}` }),
      el("span", { class: "attempt-history-state", text: label }),
    ]));
  });
  $("#attempt-history-menu").style.display = "flex";
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

async function joinAndOpen(puzzleId) {
  try {
    await Backend.joinPuzzle(puzzleId, currentUser.name);
    await refreshData();
    openPuzzle(puzzleId);
  } catch (e) {
    showToast(e.message || "Couldn't open that shared crossword");
  }
}

async function openPrivateCopy(puzzleId) {
  const existing = Object.values(dataCache.puzzles).find((p) => p.forkOf === puzzleId && p.forkedBy === currentUser.name && !p.isReplay);
  if (existing) { openPuzzle(existing.id); return; }
  try {
    const forked = await Backend.forkPuzzle(puzzleId, currentUser.name);
    await refreshData();
    openPuzzle(forked.id);
  } catch (e) {
    showToast(e.message || "Couldn't create your private copy");
  }
}

// Opening a crossword created by someone else you haven't joined prompts a
// choice between joining the shared puzzle and playing a private solo copy;
// anything else (your own puzzle, or one you're already in) opens directly.
let pendingForkPuzzleId = null;

function openSharedPuzzle(puzzleId) {
  const puzzle = dataCache.puzzles[puzzleId];
  if (!puzzle) return;
  if (puzzle.players.includes(currentUser.name)) {
    openPuzzle(puzzleId);
    return;
  }
  pendingForkPuzzleId = puzzleId;
  $("#join-fork-title").textContent = `Join "${puzzle.title}"?`;
  $("#join-fork-menu").style.display = "flex";
}

document.addEventListener("click", (e) => {
  const choice = e.target.closest("[data-fork-choice]")?.dataset.forkChoice;
  if (!choice) return;
  const puzzleId = pendingForkPuzzleId;
  $("#join-fork-menu").style.display = "none";
  pendingForkPuzzleId = null;
  if (!puzzleId) return;
  if (choice === "join") joinAndOpen(puzzleId);
  else if (choice === "private") openPrivateCopy(puzzleId);
});

document.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-completed-choice]")?.dataset.completedChoice;
  if (!choice) return;
  const puzzleId = pendingCompletedPuzzleId;
  $("#completed-choice-menu").style.display = "none";
  pendingCompletedPuzzleId = null;
  if (!puzzleId || choice === "cancel") return;
  if (choice === "restart") startReplay(puzzleId);
  else if (choice === "view") viewCompletedPuzzle(puzzleId);
  else if (choice === "history") showAttemptHistory(puzzleSeriesId(dataCache.puzzles[puzzleId]));
});

// ===========================================================================
// Search screen
// ===========================================================================

function renderSearch() {
  populateSelect($("#search-category"), [["all", "All categories"], ...SEARCH_CATEGORIES.map((cat) => [cat, cat])], activeSearchCategory);
  populateSelect($("#search-difficulty"), [["all", "All difficulties"], ...DIFFICULTY_OPTIONS.map((value) => [value, cap(value)])], activeSearchDifficulty);
  populateSelect($("#search-size"), [["all", "All sizes"], ...Object.keys(ALL_SIZE_DIMENSIONS).map((value) => [value, `${sizeLabel(value)} (${ALL_SIZE_DIMENSIONS[value]}×${ALL_SIZE_DIMENSIONS[value]})`])], activeSearchSize);
  const searchInput = $("#search-input");
  const searchClear = $("#search-clear");
  const syncSearchClear = () => { searchClear.hidden = searchInput.value.length === 0; };
  searchInput.value = lastSearchQuery;
  syncSearchClear();
  $("#search-category").onchange = (e) => { activeSearchCategory = e.target.value; renderSearchResults(); };
  $("#search-difficulty").onchange = (e) => { activeSearchDifficulty = e.target.value; renderSearchResults(); };
  $("#search-size").onchange = (e) => { activeSearchSize = e.target.value; renderSearchResults(); };
  renderSearchResults();
  searchInput.oninput = (e) => {
    lastSearchQuery = e.target.value;
    syncSearchClear();
    renderSearchResults();
  };
  searchClear.onclick = () => {
    searchInput.value = "";
    lastSearchQuery = "";
    syncSearchClear();
    renderSearchResults();
    searchInput.focus();
  };
}

function populateSelect(select, options, value) {
  select.innerHTML = "";
  for (const [optionValue, label] of options) select.appendChild(el("option", { value: optionValue, text: label }));
  select.value = value;
}

function renderSearchResults() {
  const results = $("#search-results");
  results.innerHTML = "";
  let list = Object.values(dataCache.puzzles).filter((p) => p.visibility === "open");
  const query = lastSearchQuery.trim().toLowerCase();
  if (query) list = list.filter((p) => `${p.title} ${p.description || ""} ${(p.keywords || []).join(" ")}`.toLowerCase().includes(query));
  if (activeSearchCategory !== "all") list = list.filter((p) => (p.keywords || []).some((k) => normalizedCategory(k) === normalizedCategory(activeSearchCategory)));
  if (activeSearchDifficulty !== "all") list = list.filter((p) => p.difficulty === activeSearchDifficulty);
  if (activeSearchSize !== "all") list = list.filter((p) => p.size === activeSearchSize || p.grid?.rows === ALL_SIZE_DIMENSIONS[activeSearchSize]);
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (list.length === 0) {
    const hasCriteria = hasActiveDiscoverCriteria({
      query,
      category: activeSearchCategory,
      difficulty: activeSearchDifficulty,
      size: activeSearchSize,
    });
    const emptyChildren = [
      el("div", {
        class: "empty-note",
        text: hasCriteria ? "No crosswords match these filters yet." : "No open crosswords yet.",
      }),
    ];
    if (hasCriteria) {
      emptyChildren.push(el("button", {
        class: "cta-secondary",
        text: "Create one with these choices",
        onclick: () => openCreate({
          category: activeSearchCategory === "all" ? null : activeSearchCategory,
          difficulty: activeSearchDifficulty === "all" ? "medium" : activeSearchDifficulty,
          size: activeSearchSize === "all" ? "compact" : normalizedCreateSize(activeSearchSize),
          title: lastSearchQuery.trim(),
        }),
      }));
    }
    results.appendChild(el("div", { class: "discover-empty" }, emptyChildren));
    return;
  }
  for (const p of list) {
    const isMine = p.players.includes(currentUser.name);
    const row = el("button", { class: "puzzle-row", onclick: () => (isMine ? (p.state === "completed" ? openCompletedPuzzleOptions(p.id) : openPuzzle(p.id)) : openSharedPuzzle(p.id)) });
    row.appendChild(miniGrid(p, "size-40"));
    row.appendChild(el("div", { class: "puzzle-info" }, [
      el("div", { class: "puzzle-title", text: p.title }),
      el("div", { class: "puzzle-meta", text: `${cap((p.keywords || [])[0] || "General")} · ${cap(p.difficulty)} · ${p.grid.rows}×${p.grid.cols}` }),
    ]));
    row.appendChild(el("span", { class: "chevron", text: "›" }));
    results.appendChild(row);
  }
}

// ===========================================================================
// Create screen
// ===========================================================================

let createSize = "compact";
let createDifficulty = "medium";
let createVisibility = "open";

function openCreate(prefill = {}) {
  createCategory = prefill.category || null;
  createSize = normalizedCreateSize(prefill.size || "compact");
  createDifficulty = prefill.difficulty || "medium";
  createVisibility = "open";
  offeredTitles = new Set();
  $("#create-title").value = prefill.title || "";
  renderCreateCategoryList();
  updateGenerateTitleButton();
  renderSegmented("#create-size", createSize, (v) => { createSize = v; renderCreatePreview(); });
  renderSegmented("#create-difficulty", createDifficulty, (v) => { createDifficulty = v; renderDifficultyHelp(); renderCreatePreview(); });
  applyCreateAvailability();
  renderDifficultyHelp();
  renderSegmented("#create-visibility", createVisibility, (v) => { createVisibility = v; renderVisibilityHelp(); });
  renderVisibilityHelp();
  renderCreatePreview();
  navigate("screen-create");
}

function renderCreateCategoryList() {
  const select = $("#create-category");
  const categories = shuffledCopy(SEARCH_CATEGORIES);
  populateSelect(select, [["", "Choose a category"], ...categories.map((cat) => [cat, cat])], createCategory || "");
  select.onchange = () => {
    createCategory = select.value || null;
    offeredTitles = new Set();
    offerRandomTitle();
    updateGenerateTitleButton();
    applyCreateAvailability();
  };
}

function applyCreateAvailability() {
  $all("#create-size .segmented-option").forEach((button) => {
    button.disabled = false;
  });
  $all("#create-difficulty .segmented-option").forEach((button) => {
    button.disabled = false;
  });
  renderSegmented("#create-size", createSize, (value) => { createSize = value; renderCreatePreview(); });
  renderSegmented("#create-difficulty", createDifficulty, (value) => {
    createDifficulty = value;
    renderDifficultyHelp();
    renderCreatePreview();
  });
  renderDifficultyHelp();
  renderCreatePreview();
}

function updateGenerateTitleButton() {
  $("#create-generate-title").disabled = !createCategory;
}

// Tracks titles already offered this visit so repeated taps cycle through
// the whole pool before any repeats, rather than sampling independently
// (which produces obvious dupes within a few taps even from a big list).
let offeredTitles = new Set();

function offerRandomTitle() {
  if (!createCategory) return;
  const ideas = titleIdeasFor(createCategory);
  if (ideas.length === 0) return;
  const current = $("#create-title").value.trim();
  let pool = ideas.filter((t) => !offeredTitles.has(t) && t !== current);
  if (pool.length === 0) {
    offeredTitles = new Set(); // exhausted the pool — start a fresh cycle
    pool = ideas.filter((t) => t !== current);
  }
  const pick = pickRandomItem(pool);
  if (!pick) return;
  offeredTitles.add(pick);
  $("#create-title").value = pick;
}

$("#create-generate-title").addEventListener("click", () => {
  offerRandomTitle();
});

function renderSegmented(sel, value, onChange) {
  $all(`${sel} .segmented-option`).forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.value === value);
    btn.onclick = () => { onChange(btn.dataset.value); renderSegmented(sel, btn.dataset.value, onChange); };
  });
}

function renderCreatePreview() {
  const grid = $("#create-preview-grid");
  const n = SIZE_OPTIONS[createSize];
  const previewPatterns = {
    mini: ["....#", "....#", ".....", "#....", "#...."],
    compact: ["...##....", "...#.....", "...#.....", "......###", "#.......#", "###......", ".....#...", ".....#...", "....##..."],
    large: ["#....##...#...#", "......#.......#", "......#........", "...#....##.....", "....##....##...", ".......#...#...", "......#....#...", "####.......####", "...#....#......", "...#...#.......", "...##....##....", ".....##....#...", "........#......", "#.......#......", "#...#...##....#"],
  };
  const pattern = previewPatterns[createSize];
  grid.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${n}, 1fr)`;
  grid.style.gap = n >= 15 ? "1px" : n >= 9 ? "2px" : "3px";
  grid.innerHTML = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const on = pattern?.[r]?.[c] !== "#";
    grid.appendChild(el("div", { style: `aspect-ratio:1;border-radius:2px;background:${on ? "oklch(94% .02 250)" : "var(--block-cell)"}` }));
  }
  $("#create-preview-caption").textContent = `${sizeLabel(createSize)} · ${cap(createDifficulty)} · Up to 8 players`;
}

function renderVisibilityHelp() {
  $("#create-visibility-help").textContent = createVisibility === "open"
    ? "Anyone who finds it in Discover or has the link can join."
    : "Only people with the invite link can join.";
}

function renderDifficultyHelp() {
  $("#create-difficulty-help").textContent = DIFFICULTY_HELP[createDifficulty];
}

async function createPuzzleFromForm(playAfterCreate) {
  if (!createCategory) { showToast("Pick a category first"); return; }
  const title = $("#create-title").value.trim();
  if (!title) { showToast("Give your puzzle a title first"); return; }
  const buttons = [$("#create-submit"), $("#create-only")];
  buttons.forEach((button) => { button.disabled = true; });
  const clicked = playAfterCreate ? buttons[0] : buttons[1];
  clicked.textContent = "Generating…";
  try {
    // Let the loading state paint before the CPU-bound client-side generator
    // starts searching the expanded corpus.
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const puzzle = await Backend.createPuzzle({
      title,
      keywords: [createCategory],
      size: createSize,
      difficulty: createDifficulty,
      visibility: createVisibility,
      createdBy: currentUser.name,
    });
    await refreshData();
    if (playAfterCreate) openPuzzle(puzzle.id);
    else {
      renderHome();
      navigate("screen-home");
      showToast(`“${puzzle.title}” created`);
    }
  } catch (e) {
    showToast(e.message || "Couldn't generate that puzzle — try a different category");
  } finally {
    buttons.forEach((button) => { button.disabled = false; });
    buttons[0].textContent = "Create & play";
    buttons[1].textContent = "Create only";
  }
}

$("#create-submit").addEventListener("click", () => createPuzzleFromForm(true));
$("#create-only").addEventListener("click", () => createPuzzleFromForm(false));

function prefillCreateSimilar(puzzle) {
  openCreate();
  $("#create-title").value = `${puzzle.title} II`;
  const prevCategory = (puzzle.keywords || [])[0];
  createCategory = SEARCH_CATEGORIES.find((c) => normalizedCategory(c) === normalizedCategory(prevCategory)) || null;
  renderCreateCategoryList();
  updateGenerateTitleButton();
  createSize = normalizedCreateSize(puzzle.size || puzzle.grid?.rows);
  createDifficulty = puzzle.difficulty;
  renderSegmented("#create-size", createSize, (v) => { createSize = v; renderCreatePreview(); });
  renderSegmented("#create-difficulty", createDifficulty, (v) => { createDifficulty = v; renderDifficultyHelp(); renderCreatePreview(); });
  applyCreateAvailability();
  renderDifficultyHelp();
  renderCreatePreview();
}

// ===========================================================================
// Crossword solve screen
// ===========================================================================

// Personal time-on-puzzle persists across visits instead of resetting each
// time you open it: myBaselineMs is the durable total from before this
// visit (seeded from the session's persisted timeSpentMs in onInit),
// sessionStartTime marks when the current visit's live-elapsed portion
// started, and flushTime() periodically folds that live portion into
// myBaselineMs while reporting the delta to the backend so it survives a
// closed tab. "My time" displayed is always myBaselineMs + live elapsed.
let myBaselineMs = 0;
let timeFlushHandle = null;
const TIME_FLUSH_INTERVAL_MS = 15000;

function markCurrentPuzzleActive() {
  if (!currentPuzzle || !currentUser) return;
  const lastActiveAt = nowIso();
  if (!currentPuzzle.sessions) currentPuzzle.sessions = {};
  if (!currentPuzzle.sessions[currentUser.name]) currentPuzzle.sessions[currentUser.name] = newSession();
  currentPuzzle.sessions[currentUser.name].lastActiveAt = lastActiveAt;

  // The puzzle connection owns a live snapshot separate from the home cache.
  // Keep the current player's timestamp in both so returning home reorders the
  // list immediately, without waiting for the next backend snapshot fetch.
  const cachedPuzzle = dataCache.puzzles[currentPuzzle.id];
  if (cachedPuzzle) {
    if (!cachedPuzzle.sessions) cachedPuzzle.sessions = {};
    if (!cachedPuzzle.sessions[currentUser.name]) cachedPuzzle.sessions[currentUser.name] = newSession();
    cachedPuzzle.sessions[currentUser.name].lastActiveAt = lastActiveAt;
  }
}

function flushTime(final) {
  if (!currentPuzzleConn || !sessionStartTime) return;
  const now = Date.now();
  const delta = now - sessionStartTime;
  if (delta <= 0) { if (final) sessionStartTime = null; return; }
  myBaselineMs += delta;
  sessionStartTime = final ? null : now;
  markCurrentPuzzleActive();
  currentPuzzleConn.sendTimeHeartbeat(delta);
}

function isPuzzleActivelyViewed() {
  return document.visibilityState === "visible" && document.hasFocus() && $("#screen-puzzle")?.classList.contains("active") && !!currentPuzzleConn && !!currentPuzzle;
}

function syncPuzzleTiming() {
  if (isPuzzleActivelyViewed()) {
    if (!sessionStartTime) sessionStartTime = Date.now();
  } else if (sessionStartTime) {
    flushTime(true);
  }
  updatePuzzleTimers();
}

document.addEventListener("visibilitychange", syncPuzzleTiming);
window.addEventListener("focus", syncPuzzleTiming);
window.addEventListener("blur", syncPuzzleTiming);
window.addEventListener("pagehide", () => flushTime(true));

function openPuzzle(puzzleId) {
  if (dataCache.puzzles[puzzleId]?.state === "completed") {
    openCompletedPuzzleOptions(puzzleId);
    return;
  }
  leavePuzzleConnection();
  navigate("screen-puzzle");
  $("#puzzle-title").textContent = "Loading…";
  $("#puzzle-grid").innerHTML = "";
  myBaselineMs = 0;
  sessionStartTime = null; // set once onInit knows this session's persisted timeSpentMs
  const savedPrefs = loadAssistPrefs();
  autoCheckOn = currentUser.settings?.alwaysAutoCheck === true;
  impatientMode = savedPrefs.impatient;
  extremelyImpatientMode = savedPrefs.extremelyImpatient;
  clearInterval(sessionTimerHandle);
  sessionTimerHandle = setInterval(updatePuzzleTimers, 1000);
  timeFlushHandle = setInterval(() => flushTime(false), TIME_FLUSH_INTERVAL_MS);

  // The home payload already contains a complete recent puzzle snapshot.
  // Paint it immediately while the live room connects, then replace it with
  // the authoritative room state in onInit below. Keyboard input stays hidden
  // until that live state arrives, avoiding edits against a stale snapshot.
  const cachedPuzzle = dataCache.puzzles[puzzleId];
  if (cachedPuzzle) {
    currentPuzzle = JSON.parse(JSON.stringify(cachedPuzzle));
    completedWordKeys = new Set();
    myBaselineMs = currentPuzzle.sessions?.[currentUser.name]?.timeSpentMs || 0;
    selectedCell = firstFillableCell(currentPuzzle.grid);
    selectedDirection = "across";
    renderPuzzleHeader([]);
    $("#puzzle-playing-count").textContent = "...";
    renderPuzzleGrid();
    $("#puzzle-keyboard").innerHTML = "";
    updateClueBar();
    updatePuzzleTimers();
  } else {
    currentPuzzle = null;
    $("#puzzle-keyboard").innerHTML = "";
  }

  currentPuzzleConn = Backend.connectPuzzle(puzzleId, currentUser.name, {
    onInit(puzzle, presence) {
      currentPuzzle = puzzle;
      completedWordKeys = new Set();
      myBaselineMs = puzzle.sessions?.[currentUser.name]?.timeSpentMs || 0;
      sessionStartTime = null;
      syncPuzzleTiming();
      selectedCell = firstFillableCell(puzzle.grid);
      selectedDirection = "across";
      renderPuzzleHeader(presence);
      renderPuzzleGrid();
      renderPuzzleKeyboard();
      updateClueBar();
      updatePuzzleTimers();
      // An account-level "Always use Auto check" preference still needs to flag this session
      // server-side (half-credit scoring), same as flipping the toggle by
      // hand would — the connection didn't exist yet when autoCheckOn was
      // set from account settings earlier in openPuzzle().
      if (autoCheckOn) currentPuzzleConn?.sendAutoCheckOn();
    },
    onCellUpdate({ row, col, letter, owner, revealed }) {
      if (!currentPuzzle) return;
      currentPuzzle.cells[`${row}-${col}`] = { letter, owner, revealed: !!revealed };
      updateCellDisplay(row, col);
    },
    onPresence(players) {
      // A player who joins while this client already has the puzzle open
      // otherwise never gets added to the in-memory currentPuzzle.players —
      // that list is only populated fresh at connect time.
      if (currentPuzzle) {
        for (const name of players) {
          if (!currentPuzzle.players.includes(name)) currentPuzzle.players.push(name);
        }
      }
      renderPuzzleHeader(players);
    },
    onCursor({ user, row, col }) {
      renderPresenceBadge(user, row, col);
    },
    onTimeUpdate({ sessions, totalTimeMs }) {
      if (!currentPuzzle) return;
      currentPuzzle.sessions = sessions;
      currentPuzzle.totalTimeMs = totalTimeMs;
      updatePuzzleTimers();
    },
    onCompleted() {
      handlePuzzleCompleted();
    },
    onPuzzleDeleted() {
      // Someone else deleted this puzzle while we had it open.
      leavePuzzleConnection();
      currentPuzzle = null;
      showToast("This crossword was deleted");
      refreshData().then(() => {
        renderHome();
        navigate("screen-home");
      });
    },
    onUserScrubbed({ players, sessions }) {
      // Someone else's account was deleted while this client had the puzzle
      // open — keep the avatar row and any stats live-accurate rather than
      // waiting for a reconnect.
      if (!currentPuzzle) return;
      currentPuzzle.players = players;
      currentPuzzle.sessions = sessions;
      renderPuzzleHeader(currentPresence);
    },
    onUserRenamed({ oldName, newName, puzzle }) {
      if (!currentPuzzle) return;
      if (puzzle) currentPuzzle = puzzle;
      currentPresence = currentPresence.map((name) => name === oldName ? newName : name);
      refreshData().then(() => renderPuzzleHeader(currentPresence));
    },
  });
}

function firstFillableCell(grid) {
  const first = grid.cells.find((c) => !c.block);
  return first ? { row: first.row, col: first.col } : { row: 0, col: 0 };
}

function renderPuzzleHeader(presence) {
  if (!currentPuzzle) return;
  currentPresence = presence;
  $("#puzzle-title").textContent = currentPuzzle.title;
  $("#puzzle-playing-count").textContent = presence.length;
  const avatars = $("#puzzle-avatars");
  avatars.innerHTML = "";
  const online = new Set(presence);
  // Show everyone who's ever contributed to this puzzle, not just who's
  // currently connected — solid color if they're online right now, muted
  // otherwise. `presence` alone (the previous behavior) only ever showed
  // whoever happened to have the puzzle open at that exact moment.
  const contributors = currentPuzzle.players?.length ? currentPuzzle.players : presence;
  for (const name of contributors.slice(0, 6)) {
    const hue = dataCache.users[name]?.hue ?? 250;
    avatars.appendChild(el("div", {
      class: "player-avatar" + (online.has(name) ? "" : " offline"),
      style: `background:oklch(58% .1 ${hue})`,
      text: initials(name),
    }));
  }
}

function updatePuzzleTimers() {
  if (!currentPuzzle) return;
  $("#puzzle-timer-summary").hidden = currentUser?.settings?.showTimers === false;
  const myTimeMs = myBaselineMs + (sessionStartTime ? Date.now() - sessionStartTime : 0);
  $("#puzzle-my-time").textContent = formatMinSec(myTimeMs);

  const sessions = currentPuzzle.sessions || {};
  const totalWrap = $(".total-time");
  // Only meaningful once more than one person has actually played this
  // puzzle — otherwise it's just your own time shown twice.
  if (Object.keys(sessions).length > 1) {
    let totalMs = 0;
    for (const [name, sess] of Object.entries(sessions)) {
      totalMs += name === currentUser.name ? myTimeMs : (sess.timeSpentMs || 0);
    }
    $("#puzzle-total-time").textContent = formatClock(totalMs);
    totalWrap.style.display = "";
  } else {
    totalWrap.style.display = "none";
  }
}

function wordCellsFor(cell, direction) {
  if (!currentPuzzle) return [];
  const grid = currentPuzzle.grid;
  const isBlockAt = (r, c) => {
    const found = grid.cells.find((cc) => cc.row === r && cc.col === c);
    return !found || found.block;
  };
  const cells = [];
  if (direction === "across") {
    let c = cell.col;
    while (!isBlockAt(cell.row, c - 1)) c--;
    while (!isBlockAt(cell.row, c)) { cells.push({ row: cell.row, col: c }); c++; }
  } else {
    let r = cell.row;
    while (!isBlockAt(r - 1, cell.col)) r--;
    while (!isBlockAt(r, cell.col)) { cells.push({ row: r, col: cell.col }); r++; }
  }
  return cells;
}

function currentWord() {
  let cells = wordCellsFor(selectedCell, selectedDirection);
  if (cells.length < 2) {
    const other = selectedDirection === "across" ? "down" : "across";
    const altCells = wordCellsFor(selectedCell, other);
    if (altCells.length >= 2) { selectedDirection = other; return altCells; }
  }
  return cells;
}

function findWordEntry(cells, direction) {
  if (!currentPuzzle || cells.length === 0) return null;
  const anchor = cells[0];
  return currentPuzzle.grid.words.find((w) => w.direction === direction && w.row === anchor.row && w.col === anchor.col) || null;
}

// Checks whether the currently-active word just became fully, correctly
// filled (used right after an optimistic cell update). Only checks the
// active word/direction, not any crossing word also completed by the same
// keystroke — a known v1 simplification, see README.
function checkNewlyCompletedWord() {
  const cells = currentWord();
  if (cells.length < 2) return false;
  const entry = findWordEntry(cells, selectedDirection);
  if (!entry) return false;
  const key = `${entry.direction}-${entry.row}-${entry.col}`;
  if (completedWordKeys.has(key)) return false;
  const allCorrect = cells.every((c) => {
    const filled = currentPuzzle.cells[`${c.row}-${c.col}`];
    const def = currentPuzzle.grid.cells.find((cc) => cc.row === c.row && cc.col === c.col);
    return filled?.letter === def?.letter;
  });
  if (allCorrect) { completedWordKeys.add(key); return true; }
  return false;
}

function renderPuzzleGrid() {
  const gridEl = $("#puzzle-grid");
  gridEl.innerHTML = "";
  const { rows, cols, cells } = currentPuzzle.grid;
  gridEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  gridEl.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  // Letters were a fixed 20px regardless of grid size, so a Large puzzle's
  // much smaller tiles ended up with oversized, cramped-looking letters.
  // Scale down as the grid's largest dimension grows.
  const maxDim = Math.max(rows, cols);
  const cellFontPx = Math.max(10, Math.min(22, Math.round(210 / maxDim)));
  gridEl.style.setProperty("--cell-font", `${cellFontPx}px`);

  for (const cell of cells) {
    const cellEl = el("div", { "data-row": cell.row, "data-col": cell.col });
    cellEl.classList.add("cell");
    if (cell.block) {
      cellEl.classList.add("block");
    } else {
      if (cell.number) cellEl.appendChild(el("span", { class: "cell-number", text: cell.number }));
      cellEl.addEventListener("click", () => selectCell(cell.row, cell.col));
    }
    gridEl.appendChild(cellEl);
  }
  // Paint in any letters already present (a reconnect, or another player's
  // moves that happened before this client connected) — the click handlers
  // above only build bare cells, they don't know the puzzle's current state.
  for (const cell of cells) {
    if (!cell.block) updateCellDisplay(cell.row, cell.col);
  }
  refreshGridState();
}

function cellNode(row, col) {
  return $(`.cell[data-row="${row}"][data-col="${col}"]`);
}

function updateCellDisplay(row, col) {
  const node = cellNode(row, col);
  if (!node) return;
  const filled = currentPuzzle.cells[`${row}-${col}`];
  const cellDef = currentPuzzle.grid.cells.find((c) => c.row === row && c.col === col);
  node.textContent = "";
  if (cellDef?.number) {
    node.appendChild(el("span", { class: "cell-number", text: cellDef.number }));
  }
  node.classList.remove("empty", "filled", "revealed", "wrong");
  const hue = filled?.owner ? dataCache.users[filled.owner]?.hue : null;
  if (filled?.letter) {
    node.appendChild(document.createTextNode(filled.letter));
    node.classList.add("filled");
    if (filled.revealed) node.classList.add("revealed");
    // Auto Check is a purely local/visual toggle — no need to round-trip
    // through the backend, we already have the correct answer client-side.
    if (autoCheckOn && !filled.revealed && cellDef && filled.letter !== cellDef.letter) {
      node.classList.add("wrong");
    }
    node.style.background = filled.revealed || hue == null ? "#fff" : `oklch(94% .02 ${hue})`;
    node.style.color = filled.revealed ? "" : (hue != null ? `oklch(58% .1 ${hue})` : "");
  } else {
    node.classList.add("empty");
    node.style.background = "";
    node.style.color = "";
  }
  refreshGridState();
}

function refreshAllCellsForAutoCheck() {
  if (!currentPuzzle) return;
  for (const c of currentPuzzle.grid.cells) {
    if (!c.block) updateCellDisplay(c.row, c.col);
  }
}

function refreshGridState() {
  if (!currentPuzzle || !selectedCell) return;
  const activeCells = currentWord();
  $all(".cell").forEach((n) => n.classList.remove("active-word", "selected"));
  for (const c of activeCells) {
    const node = cellNode(c.row, c.col);
    node?.classList.add("active-word");
  }
  const sel = cellNode(selectedCell.row, selectedCell.col);
  sel?.classList.add("selected");
}

function selectCell(row, col) {
  if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
    selectedDirection = selectedDirection === "across" ? "down" : "across";
  }
  selectedCell = { row, col };
  currentPuzzleConn?.sendCursor(row, col, selectedDirection);
  refreshGridState();
  updateClueBar();
}

function updateClueBar() {
  const cells = currentWord();
  const entry = findWordEntry(cells, selectedDirection);
  const clueText = $("#clue-text");
  clueText.innerHTML = "";
  if (entry) {
    clueText.appendChild(el("span", { class: "clue-number", text: `${entry.number} ${cap(entry.direction)}` }));
    clueText.appendChild(document.createTextNode(`\u00A0·\u00A0${entry.clue}`));
  }
}

function stepClue(delta) {
  if (!currentPuzzle) return;
  const words = currentPuzzle.grid.words;
  const currentEntry = findWordEntry(currentWord(), selectedDirection);
  let idx = currentEntry ? words.findIndex((w) => w === currentEntry) : 0;
  idx = (idx + delta + words.length) % words.length;
  const target = words[idx];
  selectedDirection = target.direction;
  selectedCell = { row: target.row, col: target.col };
  refreshGridState();
  updateClueBar();
}
$("#clue-prev").addEventListener("click", () => stepClue(-1));
$("#clue-next").addEventListener("click", () => stepClue(1));

function isLockedCell(cell) {
  if (!cell || !currentPuzzle) return true;
  const def = currentPuzzle.grid.cells.find((candidate) => candidate.row === cell.row && candidate.col === cell.col);
  const value = currentPuzzle.cells[`${cell.row}-${cell.col}`];
  return !!value?.revealed || !!(value?.letter && def && value.letter === def.letter);
}

function advanceSelection(reverse, clueHops = 0) {
  const cells = currentWord();
  const idx = cells.findIndex((c) => c.row === selectedCell.row && c.col === selectedCell.col);
  if (reverse) {
    for (let i = idx - 1; i >= 0; i--) {
      if (!isLockedCell(cells[i])) {
        selectedCell = cells[i];
        refreshGridState();
        return;
      }
    }
    return;
  }
  // Revealed and already-correct squares are immutable. Wrong guesses stay
  // editable, so typing naturally lands on them for correction.
  for (let i = idx + 1; i < cells.length; i++) {
    const c = cells[i];
    if (!isLockedCell(c)) {
      selectedCell = c;
      refreshGridState();
      return;
    }
  }
  // No empty cell left ahead in this word — typed the last letter, jump to
  // the next clue instead of just leaving the cursor stranded.
  stepClue(1);
  if (isLockedCell(selectedCell) && clueHops < currentPuzzle.grid.words.length) advanceSelection(false, clueHops + 1);
}

function retreatSelectionForBackspace() {
  const cells = currentWord();
  const idx = cells.findIndex((c) => c.row === selectedCell.row && c.col === selectedCell.col);
  for (let i = idx - 1; i >= 0; i--) {
    if (!isLockedCell(cells[i])) {
      selectedCell = cells[i];
      refreshGridState();
      updateClueBar();
      return;
    }
  }

  // Backspace at the start of a word continues into the preceding clue,
  // landing on its last editable square instead of becoming a no-op.
  const words = currentPuzzle.grid.words;
  const currentEntry = findWordEntry(cells, selectedDirection);
  const currentIdx = currentEntry ? words.indexOf(currentEntry) : 0;
  for (let offset = 1; offset < words.length; offset++) {
    const target = words[(currentIdx - offset + words.length) % words.length];
    const targetCells = wordCellsFor({ row: target.row, col: target.col }, target.direction);
    for (let i = targetCells.length - 1; i >= 0; i--) {
      if (!isLockedCell(targetCells[i])) {
        selectedDirection = target.direction;
        selectedCell = targetCells[i];
        currentPuzzleConn?.sendCursor(selectedCell.row, selectedCell.col, selectedDirection);
        refreshGridState();
        updateClueBar();
        return;
      }
    }
  }
}

function typeLetter(letter) {
  if (!selectedCell || !currentPuzzleConn) return;
  if (isLockedCell(selectedCell)) {
    const before = `${selectedCell.row}-${selectedCell.col}`;
    advanceSelection(false);
    if (`${selectedCell.row}-${selectedCell.col}` === before || isLockedCell(selectedCell)) return;
  }
  const cellDef = currentPuzzle.grid.cells.find((c) => c.row === selectedCell.row && c.col === selectedCell.col);
  if (!cellDef || cellDef.block) return;
  const key = `${selectedCell.row}-${selectedCell.col}`;
  const prev = currentPuzzle.cells[key];
  const wasWrong = !!(prev?.letter && !prev.revealed && prev.letter !== cellDef.letter);
  const isCorrect = letter === cellDef.letter;
  markCurrentPuzzleActive();
  // Optimistic local update — neither backend echoes a sender's own update
  // back to them (BroadcastChannel doesn't loop back to its own tab, and
  // the DO's broadcast() explicitly excludes the sending socket), so the
  // typing player has to see their own letter land without waiting on that.
  currentPuzzle.cells[key] = { letter, owner: currentUser.name, revealed: false };
  const typedCell = { row: selectedCell.row, col: selectedCell.col }; // captured before advanceSelection moves us off it
  const completedWordCells = currentWord();
  const wordCompleted = checkNewlyCompletedWord();
  currentPuzzleConn.sendCellUpdate(selectedCell.row, selectedCell.col, letter, { isCorrect, corrected: wasWrong && isCorrect, wordCompleted });
  updateCellDisplay(selectedCell.row, selectedCell.col);
  if (wordCompleted && impatientMode) celebrateWordCompletion(completedWordCells);
  if (isCorrect && extremelyImpatientMode) celebrateWordCompletion([typedCell]);
  advanceSelection(false);
}

function celebrateWordCompletion(cells) {
  const nodes = cells.map((c) => cellNode(c.row, c.col)).filter(Boolean);
  for (const node of nodes) node.classList.add("celebrate");
  setTimeout(() => {
    for (const node of nodes) node.classList.remove("celebrate");
  }, 650);
}

function backspace() {
  if (!selectedCell || !currentPuzzleConn) return;
  if (isLockedCell(selectedCell)) { retreatSelectionForBackspace(); return; }
  const key = `${selectedCell.row}-${selectedCell.col}`;
  if (currentPuzzle.cells[key]?.letter) {
    markCurrentPuzzleActive();
    currentPuzzleConn.sendCellUpdate(selectedCell.row, selectedCell.col, "");
    delete currentPuzzle.cells[key];
    updateCellDisplay(selectedCell.row, selectedCell.col);
  } else {
    retreatSelectionForBackspace();
  }
}

function renderPuzzleKeyboard() {
  const kb = $("#puzzle-keyboard");
  kb.innerHTML = "";
  const rows = [["Q","W","E","R","T","Y","U","I","O","P"], ["A","S","D","F","G","H","J","K","L"], ["Z","X","C","V","B","N","M"]];
  rows.forEach((letters, i) => {
    const rowEl = el("div", { class: "keyboard-row" + (i === 1 ? " indent" : "") });
    // "Done" no longer exits the puzzle (that's what the header's ⌂ button
    // is for) — it advances the cursor, same as finishing typing a letter
    // would: next cell, or the next word's first cell if already at the
    // end of this one.
    if (i === 2) rowEl.appendChild(el("button", { class: "key done", text: "Done", onclick: () => advanceSelection(false) }));
    for (const l of letters) rowEl.appendChild(el("button", { class: "key", text: l, onclick: () => typeLetter(l) }));
    if (i === 2) rowEl.appendChild(el("button", { class: "key backspace", text: "⌫", onclick: backspace }));
    kb.appendChild(rowEl);
  });
}

document.addEventListener("keydown", (e) => {
  if (!$("#screen-puzzle").classList.contains("active")) return;
  if (/^[a-zA-Z]$/.test(e.key)) typeLetter(e.key.toUpperCase());
  else if (e.key === "Backspace") backspace();
  else if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    moveArrow(e.key);
  }
});
function moveArrow(key) {
  const dir = key === "ArrowRight" || key === "ArrowLeft" ? "across" : "down";
  if (dir !== selectedDirection) { selectedDirection = dir; refreshGridState(); updateClueBar(); return; }
  const delta = key === "ArrowRight" || key === "ArrowDown" ? 1 : -1;
  advanceSelection(delta < 0);
}

function renderPresenceBadge(user, row, col) {
  $all(".cell-presence").forEach((n) => n.remove());
  if (user === currentUser.name) return;
  const hue = dataCache.users[user]?.hue ?? 250;
  const node = cellNode(row, col);
  if (node && !node.classList.contains("block")) {
    node.appendChild(el("div", { class: "cell-presence", style: `background:oklch(58% .1 ${hue})`, text: initials(user) }));
  }
}

// ---- Assist menu ----

// Keyed per-user (not just per-device) so switching profiles on a shared
// device doesn't leak one person's celebration preferences to another.
// Auto check is deliberately excluded: its Assist toggle applies only to the
// current puzzle visit, unless the account-level Settings override is on.
function assistPrefsKey() {
  return `across_assist_prefs_${currentUser?.name || "anon"}`;
}
function loadAssistPrefs() {
  try {
    const raw = localStorage.getItem(assistPrefsKey());
    if (raw) {
      const parsed = JSON.parse(raw);
      return { impatient: !!parsed.impatient, extremelyImpatient: !!parsed.extremelyImpatient };
    }
  } catch (e) {}
  return { impatient: false, extremelyImpatient: false };
}
function saveAssistPrefs() {
  localStorage.setItem(assistPrefsKey(), JSON.stringify({ impatient: impatientMode, extremelyImpatient: extremelyImpatientMode }));
}

// Randomized invite lines for the in-session Share button — a lighter,
// "come join right now" counterpart to the Completion screen's "we just
// finished" recap message. {title} is replaced with the puzzle's title.
const SHARE_INVITE_LINES = [
  `Come join me in "{title}" — I refuse to do this alone.`,
  `SOS: stuck on "{title}" and could use a partner in crime.`,
  `Join me in "{title}"? Two brains, one crossword, infinite possibilities.`,
  `"{title}" is happening right now and it needs more hands on deck.`,
  `Dropping into "{title}" — come make me look smarter than I am.`,
  `Crossword emergency: "{title}" needs backup. You in?`,
  `I've got 3 letters and a dream in "{title}". Join me?`,
  `Come solve "{title}" with me before I start guessing randomly.`,
  `"{title}" awaits. Bring your A-game (or your guessing game).`,
  `Tag yourself in — I'm working on "{title}" and it's a whole vibe.`,
];

$("#puzzle-share-btn").addEventListener("click", async () => {
  if (!currentPuzzle) return;
  const line = SHARE_INVITE_LINES[Math.floor(Math.random() * SHARE_INVITE_LINES.length)];
  const text = line.replace("{title}", currentPuzzle.title);
  const url = `${location.origin}${location.pathname}#/s/${currentPuzzle.id}`;
  if (navigator.share) {
    try { await navigator.share({ text, url }); } catch (e) {}
  } else {
    try { await navigator.clipboard.writeText(`${text} → ${url}`); showToast("Copied invite link to clipboard"); }
    catch (e) { showToast("Sharing isn't supported in this browser"); }
  }
});

$("#puzzle-assist-btn").addEventListener("click", () => {
  const deleteButton = $("#assist-menu [data-assist='delete-puzzle']");
  deleteButton.hidden = currentPuzzle?.createdBy !== currentUser?.name;
  $("#assist-menu").style.display = "flex";
  $("#autocheck-toggle").classList.toggle("on", autoCheckOn);
  $("#impatient-toggle").classList.toggle("on", impatientMode);
  $("#extremely-impatient-toggle").classList.toggle("on", extremelyImpatientMode);
});
document.addEventListener("click", (e) => {
  const action = e.target.closest("[data-assist]")?.dataset.assist;
  if (!action) return;
  if (action === "close") { $("#assist-menu").style.display = "none"; return; }
  if (action === "delete-puzzle") {
    $("#assist-menu").style.display = "none";
    if (currentPuzzle?.createdBy === currentUser?.name) confirmDeletePuzzle();
    return;
  }
  if (action === "reveal-cell") revealCells(currentWord().length ? [selectedCell] : []);
  if (action === "reveal-word") revealCells(currentWord());
  if (action === "reveal-puzzle") revealCells(currentPuzzle.grid.cells.filter((c) => !c.block));
  $("#assist-menu").style.display = "none";
});

async function confirmDeletePuzzle() {
  if (!currentPuzzle) return;
  const title = currentPuzzle.title;
  if (!confirm(`Delete "${title}"? This deletes it for everyone playing it, and can't be undone.`)) return;
  const puzzleId = currentPuzzle.id;
  leavePuzzleConnection();
  try {
    await Backend.deletePuzzle(puzzleId);
    await refreshData();
    showToast(`Deleted "${title}"`);
  } catch (e) {
    showToast(e.message || "Couldn't delete that crossword");
  }
  currentPuzzle = null;
  renderHome();
  navigate("screen-home");
}

// Shared teardown for every path that leaves an open puzzle — flushes the
// pending time delta, stops the timers, and closes the socket.
function leavePuzzleConnection() {
  if (currentPuzzleConn) {
    flushTime(true);
    currentPuzzleConn.close();
    currentPuzzleConn = null;
  }
  clearInterval(timeFlushHandle);
  clearInterval(sessionTimerHandle);
}

// The header Home button is an intentional exit, so wait for the room to
// confirm that every earlier WebSocket update has been copied to D1 before
// closing it and refreshing the home snapshot.
async function saveAndLeavePuzzleConnection() {
  if (currentPuzzleConn) {
    flushTime(true);
    await currentPuzzleConn.requestCheckpoint?.();
    currentPuzzleConn.close();
    currentPuzzleConn = null;
  }
  clearInterval(timeFlushHandle);
  clearInterval(sessionTimerHandle);
}
$("#autocheck-toggle").addEventListener("click", () => {
  autoCheckOn = !autoCheckOn;
  $("#autocheck-toggle").classList.toggle("on", autoCheckOn);
  if (autoCheckOn) {
    markCurrentPuzzleActive();
    currentPuzzleConn?.sendAutoCheckOn();
  }
  refreshAllCellsForAutoCheck();
});
$("#impatient-toggle").addEventListener("click", () => {
  impatientMode = !impatientMode;
  $("#impatient-toggle").classList.toggle("on", impatientMode);
  saveAssistPrefs();
});
$("#extremely-impatient-toggle").addEventListener("click", () => {
  extremelyImpatientMode = !extremelyImpatientMode;
  $("#extremely-impatient-toggle").classList.toggle("on", extremelyImpatientMode);
  saveAssistPrefs();
});

function revealCells(cells) {
  if (cells.length) markCurrentPuzzleActive();
  for (const c of cells) {
    const def = currentPuzzle.grid.cells.find((cc) => cc.row === c.row && cc.col === c.col);
    if (!def || def.block) continue;
    currentPuzzleConn.sendReveal(c.row, c.col, def.letter);
    currentPuzzle.cells[`${c.row}-${c.col}`] = { letter: def.letter, owner: null, revealed: true };
    updateCellDisplay(c.row, c.col);
  }
}

async function handlePuzzleCompleted() {
  clearInterval(sessionTimerHandle);
  clearInterval(timeFlushHandle);
  flushTime(true);
  await refreshData();
  const fresh = dataCache.puzzles[currentPuzzle.id];
  if (fresh) currentPuzzle = fresh;
  renderCompletion(currentPuzzle);
  navigate("screen-completion");
}

// ===========================================================================
// Completion screen
// ===========================================================================

function renderCompletion(p) {
  const badgeGrid = $("#completion-badge-grid");
  badgeGrid.innerHTML = "";
  const perfect = isPerfectCompletion(p);
  for (let i = 0; i < 16; i++) {
    if (perfect) {
      badgeGrid.appendChild(el("div", { style: "background:var(--gold)" }));
      continue;
    }
    const owners = Object.values(p.sessions).length ? p.players : [currentUser.name];
    const owner = owners[i % owners.length];
    const hue = dataCache.users[owner]?.hue ?? 250;
    badgeGrid.appendChild(el("div", { style: `background:oklch(58% .1 ${hue})` }));
  }
  $("#completion-title").textContent = p.title;
  $("#completion-sub").textContent = p.forkOf ? "Completed solo" : "Completed together";
  $("#completion-time").textContent = formatClock(p.totalTimeMs || 0);
  $("#completion-players").textContent = p.players.length;
  $("#completion-words").textContent = p.grid?.words?.length || 0;
  const totalLetters = Object.values(p.sessions || {}).reduce((s, v) => s + (v.lettersEntered || 0), 0);
  $("#completion-letters").textContent = totalLetters;

  const contribWrap = $("#completion-contribution");
  contribWrap.innerHTML = "";
  const ranked = Object.entries(p.sessions || {})
    .map(([name, s]) => ({ name, letters: s.lettersEntered || 0, weight: s.autoCheckUsed ? 0.5 : 1 }))
    .sort((a, b) => b.letters * b.weight - a.letters * a.weight);
  const totalWeighted = ranked.reduce((s, r) => s + r.letters * r.weight, 0) || 1;
  ranked.forEach((r, i) => {
    const pct = Math.round((r.letters * r.weight / totalWeighted) * 100);
    const hue = dataCache.users[r.name]?.hue ?? 250;
    contribWrap.appendChild(el("div", { class: "contribution-row" }, [
      el("div", { class: "rank-num" + (i === 0 ? " gold" : ""), text: i + 1 }),
      el("div", { class: "contribution-avatar", style: `background:oklch(58% .1 ${hue})`, text: initials(r.name) }),
      el("div", { class: "contribution-name", text: r.name === currentUser.name ? "You" : r.name }),
      el("div", { class: "contribution-pct", text: `${pct}%` }),
    ]));
  });

  const highlightsWrap = $("#completion-highlights");
  highlightsWrap.innerHTML = "";
  const icons = ["⚡", "✎", "↺"];
  (p.highlights || []).forEach((h, i) => {
    highlightsWrap.appendChild(el("div", { class: "highlight-row" }, [
      el("span", { class: "highlight-icon", text: icons[i % icons.length] }),
      el("div", { class: "highlight-text", text: h }),
    ]));
  });
  if ((p.highlights || []).length === 0) {
    highlightsWrap.appendChild(el("div", { class: "empty-note", text: "No highlights this round." }));
  }

  renderPuzzleLeaderboard(p);
}

function assistBadges(assists) {
  const wrap = el("div", { class: "leaderboard-assists" });
  for (const assist of assists) {
    const prefix = assists.length > 1 ? `${assist.name}: ` : "";
    if (assist.autoCheckUsed) wrap.appendChild(el("span", {
      class: "assist-badge",
      text: "A✓",
      title: `${prefix}Auto Check used`,
      "aria-label": `${prefix}Auto Check used`,
    }));
    if (assist.revealsUsed > 0) wrap.appendChild(el("span", {
      class: "assist-badge",
      text: "◉",
      title: `${prefix}${assist.revealsUsed} reveal${assist.revealsUsed === 1 ? "" : "s"} used`,
      "aria-label": `${prefix}${assist.revealsUsed} reveal${assist.revealsUsed === 1 ? "" : "s"} used`,
    }));
  }
  return wrap;
}

function renderPuzzleLeaderboard(puzzle) {
  const list = $("#completion-leaderboard");
  list.innerHTML = "";
  const entries = puzzleLeaderboard(Object.values(dataCache.puzzles), puzzle);
  entries.forEach((entry, index) => {
    const label = entry.kind === "team" ? entry.names.join(", ") : entry.names[0];
    list.appendChild(el("div", { class: "leaderboard-row" }, [
      el("div", { class: `rank-num${index === 0 ? " gold" : ""}`, text: index + 1 }),
      el("div", { class: "leaderboard-identity" }, [
        el("div", { class: "leaderboard-name", text: label || "Team" }),
        el("div", { class: "leaderboard-kind", text: entry.kind === "team" ? "Team solve" : "Solo solve" }),
      ]),
      assistBadges(entry.assists),
      el("div", { class: "leaderboard-time", text: formatClock(entry.timeMs) }),
    ]));
  });
  if (!entries.length) list.appendChild(el("div", { class: "empty-note", text: "No completed solves yet." }));
}

function showCompletedFullGrid(puzzle) {
  if (!puzzle?.grid) return;
  $("#completed-grid-title").textContent = puzzle.title;
  const grid = $("#completed-full-grid");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${puzzle.grid.cols}, 1fr)`;
  for (const cell of puzzle.grid.cells) {
    const square = el("div", { class: "completed-full-cell" + (cell.block ? " block" : "") });
    if (!cell.block) {
      if (cell.number) square.appendChild(el("span", { class: "completed-full-number", text: cell.number }));
      square.appendChild(el("span", {
        class: "completed-full-letter",
        text: puzzle.cells?.[`${cell.row}-${cell.col}`]?.letter || cell.letter || "",
      }));
    }
    grid.appendChild(square);
  }
  $("#completed-grid-menu").style.display = "flex";
}

$("#completion-share").addEventListener("click", async () => {
  const p = currentPuzzle;
  const text = `We just crushed ${p.title} together 🧩🔥 ${p.players.length} friends, ${formatClock(p.totalTimeMs || 0)}, zero regrets. Come solve the next one with us`;
  const url = `${location.origin}${location.pathname}#/s/${p.id}`;
  if (navigator.share) {
    try { await navigator.share({ text, url }); } catch (e) {}
  } else {
    try { await navigator.clipboard.writeText(`${text} → ${url}`); showToast("Copied share text to clipboard"); }
    catch (e) { showToast("Sharing isn't supported in this browser"); }
  }
});
$("#completion-create-similar").addEventListener("click", () => prefillCreateSimilar(currentPuzzle));
$("#completion-view-grid").addEventListener("click", () => showCompletedFullGrid(currentPuzzle));
$("#completion-challenge").addEventListener("click", () => startReplay(currentPuzzle.id));
$("#completion-done").addEventListener("click", () => {
  if (currentPuzzleConn) { currentPuzzleConn.close(); currentPuzzleConn = null; }
  renderHome();
  navigate("screen-home");
});

// ===========================================================================
// Rankings screen
// ===========================================================================

const RANKINGS_WINDOWS = ["Today", "Week", "Month", "Quarter", "Year", "All time"];

function windowStart(windowLabel) {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  switch (windowLabel) {
    case "Today": return now - day;
    case "Week": return now - 7 * day;
    case "Month": return now - 30 * day;
    case "Quarter": return now - 91 * day;
    case "Year": return now - 365 * day;
    default: return 0;
  }
}

function renderRankings() {
  const windowSelect = $("#rankings-window-select");
  windowSelect.value = rankingsWindow;

  const chipRow = $("#rankings-metric-chips");
  chipRow.innerHTML = "";
  for (const metric of RANKING_METRICS) {
    const selected = metric === rankingsMetric;
    const chip = el("button", {
      class: "chip" + (selected ? " active" : ""),
      text: metric,
      type: "button",
      "aria-pressed": String(selected),
    });
    chip.addEventListener("click", () => { rankingsMetric = metric; renderRankings(); });
    chipRow.appendChild(chip);
  }
  renderRankingsList();
}

// One entry per RANKING_METRICS item. `ascending: true` means a *lower*
// value ranks first (e.g. fewest reveals used). `get` returns null when a
// player has no relevant data yet, which excludes them from that metric's
// list rather than showing a misleading 0.
const METRIC_DEFS = {
  "Completed": { get: (t) => (t.completedCount > 0 ? t.completedCount : null), ascending: false, format: (v) => Math.round(v) },
  "Contribution": { get: (t) => (t.contribution > 0 ? t.contribution : null), ascending: false, format: (v) => Math.round(v) },
  "Accuracy": {
    get: (t) => {
      const attempts = t.correctLetters + t.incorrectLetters;
      return attempts >= 20 ? (t.correctLetters / attempts) * 100 : null;
    },
    ascending: false, format: (v) => `${Math.round(v)}%`,
  },
  "Contribution score": { get: (t) => t.contribution, ascending: false, format: (v) => Math.round(v) },
  "Letters entered": { get: (t) => t.lettersEntered, ascending: false, format: (v) => Math.round(v) },
  "Words completed": { get: (t) => t.wordsCompleted, ascending: false, format: (v) => Math.round(v) },
  "Crosswords completed": { get: (t) => t.completedCount, ascending: false, format: (v) => Math.round(v) },
  "Crosswords created": { get: (t) => t.createdCount, ascending: false, format: (v) => Math.round(v) },
  "Correct letter %": {
    get: (t) => (t.correctLetters + t.incorrectLetters > 0 ? (t.correctLetters / (t.correctLetters + t.incorrectLetters)) * 100 : null),
    ascending: false, format: (v) => `${Math.round(v)}%`,
  },
  "Incorrect letters corrected": { get: (t) => t.correctionsMade, ascending: false, format: (v) => Math.round(v) },
  "Average accuracy": {
    get: (t) => (t.puzzleAccuracies.length ? t.puzzleAccuracies.reduce((a, b) => a + b, 0) / t.puzzleAccuracies.length : null),
    ascending: false, format: (v) => `${Math.round(v)}%`,
  },
  "Average completion time": {
    get: (t) => (t.completionTimes.length ? t.completionTimes.reduce((a, b) => a + b, 0) / t.completionTimes.length : null),
    ascending: true, format: (v) => formatMinSec(v),
  },
  "Lowest reveal usage": { get: (t) => t.revealsUsed, ascending: true, format: (v) => Math.round(v) },
  "Lowest auto check usage": { get: (t) => t.autoCheckPuzzleCount, ascending: true, format: (v) => Math.round(v) },
};

function computeRankingTotals(since) {
  const totals = {};
  const ensure = (name) => {
    if (!totals[name]) {
      totals[name] = {
        lettersEntered: 0, correctLetters: 0, incorrectLetters: 0, correctionsMade: 0,
        revealsUsed: 0, wordsCompleted: 0, contribution: 0, completedCount: 0, createdCount: 0,
        autoCheckPuzzleCount: 0, puzzleAccuracies: [], completionTimes: [],
      };
    }
    return totals[name];
  };
  for (const name of Object.keys(dataCache.users)) ensure(name);

  for (const p of Object.values(dataCache.puzzles)) {
    if (p.statsEligible === false) continue;
    const ts = p.completedAt ? new Date(p.completedAt).getTime() : new Date(p.createdAt).getTime();
    if (ts < since) continue;
    if (p.createdBy && !p.forkOf) ensure(p.createdBy).createdCount += 1;
    for (const [name, s] of Object.entries(p.sessions || {})) {
      const t = ensure(name);
      const weight = s.autoCheckUsed ? 0.5 : 1;
      t.lettersEntered += s.lettersEntered || 0;
      t.contribution += (s.lettersEntered || 0) * weight;
      t.correctLetters += s.correctLetters || 0;
      t.incorrectLetters += s.incorrectLetters || 0;
      t.correctionsMade += s.correctionsMade || 0;
      t.revealsUsed += s.revealsUsed || 0;
      t.wordsCompleted += s.wordsCompleted || 0;
      if (s.autoCheckUsed) t.autoCheckPuzzleCount += 1;
      const puzzleTotal = (s.correctLetters || 0) + (s.incorrectLetters || 0);
      if (puzzleTotal > 0) t.puzzleAccuracies.push((s.correctLetters / puzzleTotal) * 100);
      if (p.state === "completed" && (s.lettersEntered || 0) > 0) {
        t.completedCount += 1;
        t.completionTimes.push(p.totalTimeMs || 0);
      }
    }
  }
  return totals;
}

function renderRankingsList() {
  const since = windowStart(RANKINGS_WINDOWS.find((w) => w.toLowerCase() === rankingsWindow) || "Week");
  const totals = computeRankingTotals(since);
  const def = METRIC_DEFS[rankingsMetric] || METRIC_DEFS["Contribution"];

  const ranked = Object.entries(totals)
    .map(([name, t]) => ({ name, value: def.get(t) }))
    .filter((r) => r.value !== null)
    .sort((a, b) => {
      const valueOrder = def.ascending ? a.value - b.value : b.value - a.value;
      return valueOrder || a.name.localeCompare(b.name);
    });

  const list = $("#rankings-list");
  list.innerHTML = "";
  ranked.forEach((r, i) => {
    const hue = dataCache.users[r.name]?.hue ?? 250;
    list.appendChild(el("button", { class: "ranking-row", onclick: () => openProfileDetail(r.name) }, [
      el("div", { class: "ranking-num" + (i === 0 ? " gold" : ""), text: i + 1 }),
      el("div", { class: "ranking-avatar", style: `background:oklch(58% .1 ${hue})`, text: initials(r.name) }),
      el("div", { class: "ranking-name", text: r.name === currentUser.name ? "You" : r.name }),
      el("div", { class: "ranking-value", text: def.format(r.value) }),
    ]));
  });
  if (ranked.length === 0) {
    const text = rankingsMetric === "Accuracy"
      ? "No one has attempted 20 letters in this period yet."
      : "No activity in this period yet.";
    list.appendChild(el("div", { class: "empty-note", text }));
  }
}

$("#rankings-window-select").addEventListener("change", (event) => {
  rankingsWindow = event.target.value;
  renderRankingsList();
});
document.addEventListener("click", (e) => {
  if (e.target === $("#assist-menu")) $("#assist-menu").style.display = "none";
  if (e.target === $("#join-fork-menu")) { $("#join-fork-menu").style.display = "none"; pendingForkPuzzleId = null; }
  if (e.target === $("#completed-choice-menu")) { $("#completed-choice-menu").style.display = "none"; pendingCompletedPuzzleId = null; }
  if (e.target === $("#attempt-history-menu") || e.target.closest("[data-close-attempt-history]")) $("#attempt-history-menu").style.display = "none";
  if (e.target === $("#completed-grid-menu") || e.target.closest("[data-close-completed-grid]")) $("#completed-grid-menu").style.display = "none";
});

// ===========================================================================
// Settings screen (user management) + profile detail (viewed via Rankings)
// ===========================================================================

function renderColorPicker() {
  const grid = $("#settings-color-picker");
  grid.innerHTML = "";
  for (const hue of PLAYER_HUES) {
    const swatch = el("button", {
      class: "color-swatch" + (hue === currentUser.hue ? " selected" : ""),
      style: `background:oklch(58% .1 ${hue})`,
      title: `oklch hue ${hue}`,
    });
    swatch.addEventListener("click", async () => {
      if (hue === currentUser.hue) return;
      await Backend.updateUserColor(currentUser.name, hue);
      currentUser.hue = hue;
      await refreshData();
      renderSettings();
      // Nav-bar Profile icon shows the live avatar color — refresh it
      // immediately rather than waiting for the next navigate() call.
      $all("[data-nav]").forEach((nav) => renderBottomNav(nav, "screen-settings"));
    });
    grid.appendChild(swatch);
  }
}

function renderSettings() {
  $("#settings-name").value = currentUser.name;
  renderColorPicker();
  const timerToggle = $("#settings-show-timers");
  const timersOn = currentUser.settings?.showTimers !== false;
  timerToggle.classList.toggle("on", timersOn);
  timerToggle.onclick = async () => {
    const previous = currentUser.settings?.showTimers !== false;
    const settings = { ...(currentUser.settings || {}), showTimers: !previous };
    currentUser.settings = settings;
    if (dataCache.users[currentUser.name]) dataCache.users[currentUser.name].settings = settings;
    timerToggle.classList.toggle("on", settings.showTimers);
    try {
      await Backend.updateUserSettings(currentUser.name, settings);
    } catch (error) {
      settings.showTimers = previous;
      timerToggle.classList.toggle("on", previous);
      showToast(error.message || "Couldn't save timer setting");
    }
  };
  const autoCheckToggle = $("#settings-always-autocheck");
  const alwaysAutoCheck = currentUser.settings?.alwaysAutoCheck === true;
  autoCheckToggle.classList.toggle("on", alwaysAutoCheck);
  autoCheckToggle.onclick = async () => {
    const previous = currentUser.settings?.alwaysAutoCheck === true;
    const settings = { ...(currentUser.settings || {}), alwaysAutoCheck: !previous };
    currentUser.settings = settings;
    if (dataCache.users[currentUser.name]) dataCache.users[currentUser.name].settings = settings;
    autoCheckToggle.classList.toggle("on", settings.alwaysAutoCheck);
    try {
      await Backend.updateUserSettings(currentUser.name, settings);
    } catch (error) {
      settings.alwaysAutoCheck = previous;
      autoCheckToggle.classList.toggle("on", previous);
      showToast(error.message || "Couldn't save Auto check setting");
    }
  };
  const list = $("#settings-user-list");
  list.innerHTML = "";
  const names = Object.keys(dataCache.users);
  if (names.length === 0) {
    list.appendChild(el("div", { class: "settings-row", text: "No players yet." }));
    return;
  }
  for (const name of names) {
    const hue = dataCache.users[name]?.hue ?? 250;
    const deleteBtn = el("button", { class: "delete-user-btn", text: "Delete" });
    deleteBtn.addEventListener("click", () => confirmDeleteUser(name));
    list.appendChild(el("div", { class: "settings-row" }, [
      el("div", { class: "user-row-identity" }, [
        el("div", { class: "user-row-avatar", style: `background:oklch(58% .1 ${hue})`, text: initials(name) }),
        el("span", { text: name === currentUser.name ? `${name} (you)` : name }),
      ]),
      deleteBtn,
    ]));
  }
}

async function renameCurrentUser() {
  const oldName = currentUser.name;
  const newName = $("#settings-name").value.trim().slice(0, 40);
  if (!newName || newName === oldName) return;
  if (Object.keys(dataCache.users).some((name) => name !== oldName && name.toLowerCase() === newName.toLowerCase())) {
    showToast("That name is already taken");
    return;
  }
  const button = $("#settings-name-save");
  button.disabled = true;
  try {
    const renamed = await Backend.renameUser(oldName, newName);
    currentUser = { ...currentUser, ...renamed, name: newName };
    localStorage.setItem("across_user_name", newName);
    await refreshData();
    renderSettings();
    showToast(`Renamed ${oldName} to ${newName}`);
  } catch (error) {
    showToast(error.message || "Couldn't change that name");
  } finally {
    button.disabled = false;
  }
}

$("#settings-name-save").addEventListener("click", renameCurrentUser);
$("#settings-name").addEventListener("keydown", (event) => { if (event.key === "Enter") renameCurrentUser(); });

async function confirmDeleteUser(name) {
  if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
  await Backend.deleteUser(name);
  await refreshData();
  if (name === currentUser.name) {
    // Deleted your own account — log out back to the profile picker.
    localStorage.removeItem("across_user_name");
    currentUser = null;
    renderProfilePicker();
    navigate("screen-name-entry");
  } else {
    renderSettings();
  }
}

function openProfileDetail(name) {
  profilePuzzleTab = "active";
  profilePuzzleExpanded = { active: false, completed: false, created: false };
  renderProfileDetail(name);
  navigate("screen-profile-detail");
}

function renderProfileDetail(name) {
  const user = dataCache.users[name];
  if (!user) return;
  const hue = user.hue ?? 250;
  $("#profile-detail-avatar").style.background = `oklch(58% .1 ${hue})`;
  $("#profile-detail-avatar").textContent = initials(name);
  $("#profile-detail-name").textContent = name === currentUser.name ? `${name} (you)` : name;

  const allPuzzles = Object.values(dataCache.puzzles);
  const completed = allPuzzles.filter((p) => p.state === "completed" && hasStartedPuzzle(p, name));
  const created = allPuzzles.filter((p) => p.createdBy === name && !p.forkOf);
  const avgTime = completed.length ? formatMinSec(completed.reduce((s, p) => s + (p.totalTimeMs || 0), 0) / completed.length) : "—";
  const totals = computeRankingTotals(0)[name];
  const avgAccuracy = totals ? METRIC_DEFS["Average accuracy"].get(totals) : null;

  const stats = $("#profile-detail-stats");
  stats.innerHTML = "";
  const tiles = [
    [completed.length, "Crosswords completed"],
    [avgAccuracy != null ? METRIC_DEFS["Average accuracy"].format(avgAccuracy) : "—", "Average accuracy"],
    [avgTime, "Avg. completion time"],
    [created.length, "Crosswords created"],
  ];
  for (const [value, label] of tiles) {
    stats.appendChild(el("div", { class: "stat-tile" }, [
      el("div", { class: "stat-tile-value", text: value }),
      el("div", { class: "stat-tile-label", text: label }),
    ]));
  }

  renderProfilePuzzleHistory(name);

  // Device settings only make sense for your own account, not someone
  // else's profile you're just viewing via Rankings.
  const settingsWrap = $("#profile-detail-settings-wrap");
  settingsWrap.innerHTML = "";
  if (name === currentUser.name) {
    settingsWrap.appendChild(el("div", { class: "field-label", style: "color:var(--muted-45)", text: "Settings" }));
    const card = el("div", { class: "settings-card" });
    const settings = currentUser.settings || { push: true, sound: true, haptic: true };
    const rows = [["push", "Push notifications"], ["sound", "Sound effects"], ["haptic", "Haptic feedback"]];
    for (const [key, label] of rows) {
      const toggle = el("button", { class: "toggle" + (settings[key] ? " on" : "") });
      toggle.addEventListener("click", async () => {
        settings[key] = !settings[key];
        toggle.classList.toggle("on", settings[key]);
        currentUser.settings = settings;
        await Backend.updateUserSettings(currentUser.name, settings);
      });
      card.appendChild(el("div", { class: "settings-row" }, [el("div", { text: label }), toggle]));
    }
    settingsWrap.appendChild(card);
  }
}

let profilePuzzleTab = "active";
let profilePuzzleExpanded = { active: false, completed: false, created: false };

function profilePuzzleDate(puzzle, profileName) {
  const value = puzzle.sessions?.[profileName]?.lastActiveAt || puzzle.completedAt || puzzle.createdAt;
  const date = new Date(value || 0);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function profilePuzzleRow(puzzle, profileName) {
  const isCompleted = puzzle.state === "completed";
  const progress = puzzleProgress(puzzle);
  const category = cap((puzzle.keywords || [])[0] || "General");
  const dimensions = puzzle.grid ? `${puzzle.grid.rows}×${puzzle.grid.cols}` : sizeLabel(puzzle.size);
  const privacy = puzzle.visibility === "private" ? " · 🔒" : "";
  const row = el("button", { class: "profile-puzzle-row" }, [
    el("div", { class: `profile-puzzle-status${isCompleted ? " completed" : ""}`, text: isCompleted ? "✓" : `${progress}%` }),
    el("div", { class: "profile-puzzle-info" }, [
      el("div", { class: "profile-puzzle-title", text: puzzle.title }),
      el("div", { class: "profile-puzzle-meta", text: `${category} · ${cap(puzzle.difficulty)} · ${dimensions}${privacy}` }),
    ]),
    el("div", { class: "profile-puzzle-tail" }, [
      el("div", { class: "profile-puzzle-value", text: isCompleted ? formatMinSec(puzzle.totalTimeMs || 0) : "Active" }),
      el("div", { class: "profile-puzzle-date", text: profilePuzzleDate(puzzle, profileName) }),
    ]),
    el("span", { class: "chevron", text: "›" }),
  ]);
  row.onclick = () => {
    if (isCompleted) viewCompletedPuzzle(puzzle.id);
    else if (puzzle.players?.includes(currentUser.name) || puzzle.createdBy === currentUser.name) openPuzzle(puzzle.id);
    else openSharedPuzzle(puzzle.id);
  };
  return row;
}

function renderProfilePuzzleHistory(name) {
  const wrap = $("#profile-puzzle-history");
  wrap.innerHTML = "";
  const collections = profilePuzzleCollections(Object.values(dataCache.puzzles), name, currentUser.name);
  const tabs = el("div", { class: "profile-puzzle-tabs", role: "tablist", "aria-label": "Crosswords" });
  for (const key of ["active", "completed", "created"]) {
    const button = el("button", {
      class: `profile-puzzle-tab${profilePuzzleTab === key ? " selected" : ""}`,
      text: cap(key),
      role: "tab",
      "aria-selected": profilePuzzleTab === key ? "true" : "false",
    });
    button.onclick = () => { profilePuzzleTab = key; renderProfilePuzzleHistory(name); };
    tabs.appendChild(button);
  }
  wrap.appendChild(tabs);

  const puzzles = collections[profilePuzzleTab];
  const visible = profilePuzzleExpanded[profilePuzzleTab] ? puzzles : puzzles.slice(0, 5);
  const list = el("div", { class: "profile-puzzle-list" });
  visible.forEach((puzzle) => list.appendChild(profilePuzzleRow(puzzle, name)));
  if (!visible.length) list.appendChild(el("div", { class: "profile-puzzle-empty", text: `No ${profilePuzzleTab} crosswords yet.` }));
  if (puzzles.length > 5) {
    const all = el("button", {
      class: "profile-puzzle-all",
      text: profilePuzzleExpanded[profilePuzzleTab] ? "Show less" : `All (${puzzles.length})`,
    });
    all.onclick = () => {
      profilePuzzleExpanded[profilePuzzleTab] = !profilePuzzleExpanded[profilePuzzleTab];
      renderProfilePuzzleHistory(name);
    };
    list.appendChild(all);
  }
  wrap.appendChild(list);
}

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-action='back-to-rankings']")) {
    renderRankings();
    navigate("screen-rankings");
  }
});

// ===========================================================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((e) => console.warn("SW registration failed", e));
  });
}

boot();
