// Across — app shell, routing, and screen logic.
//
// Backend is abstracted behind `Backend` so the same UI code runs two ways:
//  - Remote mode: talks to the deployed Cloudflare Worker (REST + WebSocket).
//  - Local mode: falls back to localStorage + BroadcastChannel so the app
//    is fully testable in a browser with no Worker deployed yet — this is
//    what's active whenever config.js still has its placeholder WORKER_URL.
//    It reuses the real generator/corpus modules, so puzzles generated in
//    local mode are produced by the same algorithm the Worker uses.
import { generatePuzzle } from "./worker/generator.js";
import { WORD_BANK } from "./worker/corpus.js";

const PLAYER_HUES = [250, 30, 140, 90, 320, 190, 10, 220];
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
  return {
    lettersEntered: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    correctionsMade: 0,
    revealsUsed: 0,
    wordsCompleted: 0,
    timeSpentMs: 0,
    autoCheckUsed: false,
    joinedAt: nowIso(),
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

const LocalBackend = {
  async getData() {
    return loadLocalData();
  },
  async registerUser(name) {
    const data = loadLocalData();
    if (!data.users[name]) {
      const hue = PLAYER_HUES[Object.keys(data.users).length % PLAYER_HUES.length];
      data.users[name] = { hue, createdAt: nowIso(), settings: { push: true, sound: true, haptic: true } };
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
  async createPuzzle(req) {
    const grid = generatePuzzle({ keywords: req.keywords, size: req.size, difficulty: req.difficulty, wordBank: WORD_BANK });
    const id = `${slugify(req.title) || "puzzle"}-${Date.now().toString(36)}`;
    const puzzle = {
      id,
      title: req.title,
      description: req.description,
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
      const fresh = loadLocalData();
      const p = fresh.puzzles[puzzleId];
      if (msg.type === "cell-update") {
        handlers.onCellUpdate?.({ row: msg.row, col: msg.col, letter: msg.letter, owner: msg.owner, revealed: msg.revealed });
      } else if (msg.type === "cursor") {
        handlers.onCursor?.({ user: msg.user, row: msg.row, col: msg.col, direction: msg.direction });
      } else if (msg.type === "completed") {
        handlers.onCompleted?.();
      } else if (msg.type === "time-update") {
        handlers.onTimeUpdate?.({ sessions: p.sessions, totalTimeMs: p.totalTimeMs });
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
  async updateUserSettings() {
    // Not implemented server-side yet — settings are UI-local for now
    // (README notes this as a follow-up if it needs to sync across devices).
  },
  async createPuzzle(req) {
    const res = await this.apiPost("/create-puzzle", req);
    return res.puzzle;
  },
  async joinPuzzle(puzzleId, user) {
    await this.apiPost("/join-puzzle", { puzzleId, user });
  },
  connectPuzzle(puzzleId, user, handlers) {
    const wsUrl = `${window.WORKER_URL.replace(/^http/, "ws")}/puzzle/${puzzleId}/connect?user=${encodeURIComponent(user)}`;
    const socket = new WebSocket(wsUrl);
    socket.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.type === "init") handlers.onInit?.(msg.puzzle, msg.presence);
      else if (msg.type === "cell-update") handlers.onCellUpdate?.(msg);
      else if (msg.type === "presence") handlers.onPresence?.(msg.players);
      else if (msg.type === "cursor") handlers.onCursor?.(msg);
      else if (msg.type === "completed") handlers.onCompleted?.();
      else if (msg.type === "time-update") handlers.onTimeUpdate?.({ sessions: msg.sessions, totalTimeMs: msg.totalTimeMs });
    };
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
let selectedCell = null;
let selectedDirection = "across";
let sessionStartTime = null;
let sessionTimerHandle = null;
let autoCheckOn = false;
let createKeywords = [];
let rankingsWindow = "week";
let rankingsMetric = "Contribution score";
let lastSearchQuery = "";
let activeSearchChip = "geography";
let completedWordKeys = new Set(); // reset per puzzle open — avoids double-counting wordsCompleted

const RANKING_METRICS = [
  "Contribution score", "Letters entered", "Words completed", "Crosswords completed",
  "Crosswords created", "Correct letter %", "Incorrect letters corrected",
  "Average accuracy", "Average completion time", "Lowest reveal usage", "Lowest auto check usage",
];
const SEARCH_CATEGORIES = ["Geography", "Movies", "History", "Sports", "Science", "Food", "Kids"];

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
  $all("[data-nav]").forEach((nav) => renderBottomNav(nav, screenId));
  window.scrollTo(0, 0);
}

function renderBottomNav(nav, activeScreen) {
  const items = [
    { id: "screen-home", label: "Home", icon: () => el("div", { class: "nav-icon" }, el("div", { class: "nav-home-icon" })) },
    { id: "screen-search", label: "Search", icon: () => el("div", { class: "nav-icon" }, el("div", { class: "nav-search-icon" })) },
    { id: "__create__", label: "", icon: null },
    { id: "screen-rankings", label: "Rankings", icon: () => {
      const bars = el("div", { class: "nav-rankings-icon" });
      bars.append(el("span"), el("span"), el("span"));
      return el("div", { class: "nav-icon" }, bars);
    } },
    { id: "screen-profile", label: "Profile", icon: () => {
      // Real player color + initial (matches the avatars used everywhere
      // else) instead of a generic silhouette — falls back to the plain
      // icon only in the brief window before a profile is picked.
      if (currentUser) {
        const hue = currentUser.hue ?? 250;
        return el("div", { class: "nav-icon" }, el("div", { class: "nav-profile-avatar", style: `background:oklch(58% .1 ${hue})`, text: initials(currentUser.name) }));
      }
      return el("div", { class: "nav-icon" }, el("div", { class: "nav-profile-icon" }));
    } },
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
      if (item.id === "screen-profile") renderProfile();
      navigate(item.id);
    });
    nav.appendChild(btn);
  }
}

function miniGrid(puzzle, sizeClass) {
  const grid = el("div", { class: `mini-grid ${sizeClass}` });
  const cells = puzzle?.grid?.cells || [];
  const rows = puzzle?.grid?.rows || 4;
  const cols = puzzle?.grid?.cols || 4;
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
        const owner = puzzle.cells?.[`${sr}-${sc}`]?.owner;
        const hue = owner && dataCache?.users?.[owner]?.hue;
        cellEl.style.background = hue != null ? `oklch(58% .1 ${hue})` : "var(--block-cell)";
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

async function boot() {
  const savedName = localStorage.getItem("across_user_name");
  await refreshData();
  if (savedName && dataCache.users[savedName]) {
    currentUser = { name: savedName, ...dataCache.users[savedName] };
    renderHome();
    navigate("screen-home");
  } else if (savedName) {
    // Known locally but not yet in the fetched data (e.g. first remote sync) — register.
    currentUser = await Backend.registerUser(savedName);
    await refreshData();
    renderHome();
    navigate("screen-home");
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

  for (const [name, user] of Object.entries(dataCache.users)) {
    const card = el("div", { class: "profile-card" }, [
      el("div", { class: "profile-card-avatar", style: `background:oklch(58% .1 ${user.hue})`, text: initials(name) }),
      el("div", { class: "profile-card-name", text: name }),
    ]);
    card.addEventListener("click", async () => {
      currentUser = { name, ...user };
      localStorage.setItem("across_user_name", name);
      renderHome();
      navigate("screen-home");
    });
    grid.appendChild(card);
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
  renderHome();
  navigate("screen-home");
});
$("#name-entry-input").addEventListener("keydown", (e) => { if (e.key === "Enter") $("#name-entry-submit").click(); });

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-action='go-home']")) {
    if (currentPuzzleConn) {
      flushTime(true);
      clearInterval(timeFlushHandle);
      currentPuzzleConn.close();
      currentPuzzleConn = null;
    }
    renderProfilePicker();
    navigate("screen-name-entry");
  }
});

// ===========================================================================
// Home screen
// ===========================================================================

function renderHome() {
  const scroll = $("#home-scroll");
  scroll.innerHTML = "";

  const myPuzzles = Object.values(dataCache.puzzles).filter((p) => p.players.includes(currentUser.name));
  const continuing = myPuzzles.filter((p) => p.state === "open");
  const completed = myPuzzles.filter((p) => p.state === "completed").sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const openToJoin = Object.values(dataCache.puzzles)
    .filter((p) => p.state === "open" && p.visibility === "open" && !p.players.includes(currentUser.name))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  scroll.appendChild(section("Continue playing", continuing, "No puzzles in progress — tap + to start one.", Infinity, continueRow));
  scroll.appendChild(section("New open crosswords", openToJoin, "No open crosswords yet — tap + to start one.", 6, openRow));
  scroll.appendChild(section("Recently completed", completed, "Nothing finished yet.", 6, completedRow));
}

// `cap` is how many rows this section shows at once — the "More" pill only
// renders when the list actually has more than that (previously it always
// showed, even on an empty section).
function section(title, list, emptyText, cap, renderRow) {
  const wrap = el("div");
  const headerChildren = [el("div", { class: "section-title", text: title })];
  if (list.length > cap) {
    headerChildren.push(el("button", { class: "pill-more", onclick: () => showToast(`${title} — full list coming soon`) }, "More"));
  }
  wrap.appendChild(el("div", { class: "section-header" }, headerChildren));
  if (list.length === 0) {
    wrap.appendChild(el("div", { class: "empty-note", text: emptyText }));
  } else {
    const rowsWrap = el("div", { class: "puzzle-list" });
    for (const p of list.slice(0, cap)) rowsWrap.appendChild(renderRow(p));
    wrap.appendChild(rowsWrap);
  }
  return wrap;
}

function continueRow(p) {
  const filled = Object.keys(p.cells || {}).length;
  const total = p.grid.cells.filter((c) => !c.block).length;
  const pct = total ? Math.round((filled / total) * 100) : 0;
  const row = el("button", { class: "puzzle-row continue", onclick: () => openPuzzle(p.id) });
  row.appendChild(miniGrid(p, "size-44"));
  row.appendChild(el("div", { class: "puzzle-info" }, [
    el("div", { class: "puzzle-title", text: p.title }),
    el("div", { class: "puzzle-meta", text: `${p.players.length} player${p.players.length === 1 ? "" : "s"} · ${pct}% done` }),
  ]));
  const stack = el("div", { class: "avatar-stack" });
  for (const name of p.players.slice(0, 4)) {
    const hue = dataCache.users[name]?.hue ?? 250;
    stack.appendChild(el("div", { class: `avatar-dot ${hueClass(hue)}`, style: `background:oklch(58% .1 ${hue})` }));
  }
  row.appendChild(stack);
  return row;
}

function openRow(p) {
  const row = el("button", { class: "puzzle-row", onclick: () => joinAndOpen(p.id) });
  row.appendChild(miniGrid(p, "size-40"));
  row.appendChild(el("div", { class: "puzzle-info" }, [
    el("div", { class: "puzzle-title", text: p.title }),
    el("div", { class: "puzzle-meta", text: `${cap(p.difficulty)} · ${p.grid.rows}×${p.grid.cols} · ${p.players.length} joined` }),
  ]));
  row.appendChild(el("span", { class: "chevron", text: "›" }));
  return row;
}

function completedRow(p) {
  const row = el("button", { class: "completed-row", onclick: () => viewCompletedPuzzle(p.id) });
  row.appendChild(el("div", { class: "completed-check", text: "✓" }));
  row.appendChild(el("div", { class: "completed-title", text: p.title }));
  const mins = p.totalTimeMs ? formatMinSec(p.totalTimeMs) : "—";
  row.appendChild(el("div", { class: "completed-meta", text: `${mins} · ${p.players.length}p` }));
  return row;
}

function viewCompletedPuzzle(puzzleId) {
  const p = dataCache.puzzles[puzzleId];
  if (!p) return;
  currentPuzzle = p;
  renderCompletion(p);
  navigate("screen-completion");
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

async function joinAndOpen(puzzleId) {
  await Backend.joinPuzzle(puzzleId, currentUser.name);
  await refreshData();
  openPuzzle(puzzleId);
}

// ===========================================================================
// Search screen
// ===========================================================================

function renderSearch() {
  const chipRow = $("#search-chips");
  chipRow.innerHTML = "";
  for (const cat of SEARCH_CATEGORIES) {
    const chip = el("button", { class: "chip" + (cat.toLowerCase() === activeSearchChip ? " active" : ""), text: cat });
    chip.addEventListener("click", () => { activeSearchChip = cat.toLowerCase(); renderSearch(); });
    chipRow.appendChild(chip);
  }
  renderSearchResults();
  $("#search-input").oninput = (e) => { lastSearchQuery = e.target.value.toLowerCase(); renderSearchResults(); };
}

function renderSearchResults() {
  const results = $("#search-results");
  results.innerHTML = "";
  let list = Object.values(dataCache.puzzles).filter((p) => p.visibility === "open");
  if (lastSearchQuery) {
    list = list.filter((p) => `${p.title} ${p.description} ${(p.keywords || []).join(" ")}`.toLowerCase().includes(lastSearchQuery));
  } else if (activeSearchChip) {
    list = list.filter((p) => (p.keywords || []).some((k) => k.toLowerCase() === activeSearchChip) || p.title.toLowerCase().includes(activeSearchChip));
  }
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (list.length === 0) {
    results.appendChild(el("div", { class: "empty-note", text: "Nothing here yet — be the first to create one." }));
    return;
  }
  for (const p of list) {
    const isMine = p.players.includes(currentUser.name);
    const row = el("button", { class: "puzzle-row", onclick: () => (isMine ? openPuzzle(p.id) : joinAndOpen(p.id)) });
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

let createSize = "standard";
let createDifficulty = "medium";
let createVisibility = "open";

function openCreate() {
  createKeywords = [];
  createSize = "standard";
  createDifficulty = "medium";
  createVisibility = "open";
  $("#create-title").value = "";
  $("#create-description").value = "";
  renderCreateCategoryChips();
  renderCreateKeywords();
  renderSegmented("#create-size", createSize, (v) => { createSize = v; renderCreatePreview(); });
  renderSegmented("#create-difficulty", createDifficulty, (v) => { createDifficulty = v; renderCreatePreview(); });
  $("#create-visibility").textContent = "Open · anyone with the link can join";
  renderCreatePreview();
  navigate("screen-create");
}

// Category chips are just a quick-pick shortcut for the same keywords list
// free-text chips populate — tapping one toggles its name in/out of
// createKeywords, same as typing it via "+ Add".
function renderCreateCategoryChips() {
  const row = $("#create-category-chips");
  row.innerHTML = "";
  for (const cat of SEARCH_CATEGORIES) {
    const active = createKeywords.some((k) => k.toLowerCase() === cat.toLowerCase());
    const chip = el("button", { class: "chip" + (active ? " active" : ""), text: cat });
    chip.addEventListener("click", () => {
      if (active) createKeywords = createKeywords.filter((k) => k.toLowerCase() !== cat.toLowerCase());
      else createKeywords.push(cat);
      renderCreateCategoryChips();
      renderCreateKeywords();
    });
    row.appendChild(chip);
  }
}

function renderSegmented(sel, value, onChange) {
  $all(`${sel} .segmented-option`).forEach((btn) => {
    btn.classList.toggle("selected", btn.dataset.value === value);
    btn.onclick = () => { onChange(btn.dataset.value); renderSegmented(sel, btn.dataset.value, onChange); };
  });
}

function renderCreateKeywords() {
  const wrap = $("#create-keywords");
  wrap.innerHTML = "";
  for (const kw of createKeywords) {
    const chip = el("div", { class: "keyword-chip" }, [
      el("span", { text: kw }),
      el("button", { text: "×", onclick: () => { createKeywords = createKeywords.filter((k) => k !== kw); renderCreateCategoryChips(); renderCreateKeywords(); } }),
    ]);
    wrap.appendChild(chip);
  }
  wrap.appendChild(el("button", { class: "add-chip-btn", text: "+ Add", onclick: () => {
    const kw = prompt("Add a keyword or topic (e.g. a place, movie, category):");
    if (kw && kw.trim()) { createKeywords.push(kw.trim().slice(0, 24)); renderCreateCategoryChips(); renderCreateKeywords(); }
  } }));
}

function renderCreatePreview() {
  const grid = $("#create-preview-grid");
  const dims = { mini: 5, standard: 11, large: 15 };
  const n = dims[createSize];
  grid.style.gridTemplateColumns = `repeat(${Math.min(n, 5)}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${Math.min(n, 5)}, 1fr)`;
  grid.innerHTML = "";
  const sample = Math.min(n, 5);
  for (let i = 0; i < sample * sample; i++) {
    const on = Math.random() > 0.35;
    grid.appendChild(el("div", { style: `aspect-ratio:1;border-radius:2px;background:${on ? "oklch(94% .02 250)" : "var(--block-cell)"}` }));
  }
  $("#create-preview-caption").textContent = `${cap(createSize)} · ${cap(createDifficulty)} · Up to 8 players`;
}

$("#create-visibility").addEventListener("click", () => {
  createVisibility = createVisibility === "open" ? "private" : "open";
  $("#create-visibility").textContent = createVisibility === "open"
    ? "Open · anyone with the link can join"
    : "Private · only reachable via the invite link";
});

$("#create-submit").addEventListener("click", async () => {
  const title = $("#create-title").value.trim();
  if (!title) { showToast("Give your puzzle a title first"); return; }
  const btn = $("#create-submit");
  btn.disabled = true;
  btn.textContent = "Generating…";
  // No category/keywords picked — riff off the title itself instead of
  // falling back to a totally random puzzle. The generator already
  // tokenizes multi-word keywords, so the raw title works directly.
  const keywords = createKeywords.length > 0 ? createKeywords : [title];
  try {
    const puzzle = await Backend.createPuzzle({
      title,
      description: $("#create-description").value.trim(),
      keywords,
      size: createSize,
      difficulty: createDifficulty,
      visibility: createVisibility,
      createdBy: currentUser.name,
    });
    await refreshData();
    openPuzzle(puzzle.id);
  } catch (e) {
    showToast(e.message || "Couldn't generate that puzzle — try different keywords");
  } finally {
    btn.disabled = false;
    btn.textContent = "Generate & publish";
  }
});

function prefillCreateSimilar(puzzle) {
  openCreate();
  $("#create-title").value = `${puzzle.title} II`;
  createKeywords = [...(puzzle.keywords || [])];
  renderCreateCategoryChips();
  renderCreateKeywords();
  createSize = puzzle.size;
  createDifficulty = puzzle.difficulty;
  renderSegmented("#create-size", createSize, (v) => { createSize = v; renderCreatePreview(); });
  renderSegmented("#create-difficulty", createDifficulty, (v) => { createDifficulty = v; renderCreatePreview(); });
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

function flushTime(final) {
  if (!currentPuzzleConn || !sessionStartTime) return;
  const now = Date.now();
  const delta = now - sessionStartTime;
  if (delta <= 0) return;
  myBaselineMs += delta;
  sessionStartTime = now;
  currentPuzzleConn.sendTimeHeartbeat(delta);
}

function openPuzzle(puzzleId) {
  if (currentPuzzleConn) {
    flushTime(true);
    currentPuzzleConn.close();
    currentPuzzleConn = null;
  }
  clearInterval(timeFlushHandle);
  navigate("screen-puzzle");
  $("#puzzle-title").textContent = "Loading…";
  $("#puzzle-grid").innerHTML = "";
  myBaselineMs = 0;
  sessionStartTime = null; // set once onInit knows this session's persisted timeSpentMs
  autoCheckOn = false;
  clearInterval(sessionTimerHandle);
  sessionTimerHandle = setInterval(updatePuzzleTimers, 1000);
  timeFlushHandle = setInterval(() => flushTime(false), TIME_FLUSH_INTERVAL_MS);

  currentPuzzleConn = Backend.connectPuzzle(puzzleId, currentUser.name, {
    onInit(puzzle, presence) {
      currentPuzzle = puzzle;
      completedWordKeys = new Set();
      myBaselineMs = puzzle.sessions?.[currentUser.name]?.timeSpentMs || 0;
      sessionStartTime = Date.now();
      selectedCell = firstFillableCell(puzzle.grid);
      selectedDirection = "across";
      renderPuzzleHeader(presence);
      renderPuzzleGrid();
      renderPuzzleKeyboard();
      updateClueBar();
      updatePuzzleTimers();
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
  });
}

function firstFillableCell(grid) {
  const first = grid.cells.find((c) => !c.block);
  return first ? { row: first.row, col: first.col } : { row: 0, col: 0 };
}

function renderPuzzleHeader(presence) {
  if (!currentPuzzle) return;
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
  if (!sessionStartTime || !currentPuzzle) return;
  const myTimeMs = myBaselineMs + (Date.now() - sessionStartTime);
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
  node.textContent = "";
  if (currentPuzzle.grid.cells.find((c) => c.row === row && c.col === col)?.number) {
    node.appendChild(el("span", { class: "cell-number", text: currentPuzzle.grid.cells.find((c) => c.row === row && c.col === col).number }));
  }
  node.classList.remove("empty", "filled", "revealed");
  const hue = filled?.owner ? dataCache.users[filled.owner]?.hue : null;
  if (filled?.letter) {
    node.appendChild(document.createTextNode(filled.letter));
    node.classList.add("filled");
    if (filled.revealed) node.classList.add("revealed");
    node.style.background = filled.revealed || hue == null ? "#fff" : `oklch(94% .02 ${hue})`;
    node.style.color = filled.revealed ? "" : (hue != null ? `oklch(58% .1 ${hue})` : "");
  } else {
    node.classList.add("empty");
    node.style.background = "";
    node.style.color = "";
  }
  refreshGridState();
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
  if (sel && !currentPuzzle.cells[`${selectedCell.row}-${selectedCell.col}`]?.letter) {
    sel.classList.add("selected");
  }
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
  $("#clue-text").textContent = entry ? `${entry.number} ${cap(entry.direction)} · ${entry.clue}` : "";
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

function advanceSelection(reverse) {
  const cells = currentWord();
  const idx = cells.findIndex((c) => c.row === selectedCell.row && c.col === selectedCell.col);
  const nextIdx = idx + (reverse ? -1 : 1);
  if (nextIdx >= 0 && nextIdx < cells.length) {
    selectedCell = cells[nextIdx];
    refreshGridState();
  }
}

function typeLetter(letter) {
  if (!selectedCell || !currentPuzzleConn) return;
  const cellDef = currentPuzzle.grid.cells.find((c) => c.row === selectedCell.row && c.col === selectedCell.col);
  if (!cellDef || cellDef.block) return;
  const key = `${selectedCell.row}-${selectedCell.col}`;
  const prev = currentPuzzle.cells[key];
  const wasWrong = !!(prev?.letter && !prev.revealed && prev.letter !== cellDef.letter);
  const isCorrect = letter === cellDef.letter;
  // Optimistic local update — neither backend echoes a sender's own update
  // back to them (BroadcastChannel doesn't loop back to its own tab, and
  // the DO's broadcast() explicitly excludes the sending socket), so the
  // typing player has to see their own letter land without waiting on that.
  currentPuzzle.cells[key] = { letter, owner: currentUser.name, revealed: false };
  const wordCompleted = checkNewlyCompletedWord();
  currentPuzzleConn.sendCellUpdate(selectedCell.row, selectedCell.col, letter, { isCorrect, corrected: wasWrong && isCorrect, wordCompleted });
  updateCellDisplay(selectedCell.row, selectedCell.col);
  advanceSelection(false);
}

function backspace() {
  if (!selectedCell || !currentPuzzleConn) return;
  const key = `${selectedCell.row}-${selectedCell.col}`;
  if (currentPuzzle.cells[key]?.letter) {
    currentPuzzleConn.sendCellUpdate(selectedCell.row, selectedCell.col, "");
    delete currentPuzzle.cells[key];
    updateCellDisplay(selectedCell.row, selectedCell.col);
  } else {
    advanceSelection(true);
  }
}

function renderPuzzleKeyboard() {
  const kb = $("#puzzle-keyboard");
  kb.innerHTML = "";
  const rows = [["Q","W","E","R","T","Y","U","I","O","P"], ["A","S","D","F","G","H","J","K","L"], ["Z","X","C","V","B","N","M"]];
  rows.forEach((letters, i) => {
    const rowEl = el("div", { class: "keyboard-row" + (i === 1 ? " indent" : "") });
    if (i === 2) rowEl.appendChild(el("button", { class: "key backspace", text: "⌫", onclick: backspace }));
    for (const l of letters) rowEl.appendChild(el("button", { class: "key", text: l, onclick: () => typeLetter(l) }));
    if (i === 2) rowEl.appendChild(el("button", { class: "key done", text: "Done", onclick: () => {
      if (currentPuzzleConn) {
        flushTime(true);
        clearInterval(timeFlushHandle);
        currentPuzzleConn.close();
        currentPuzzleConn = null;
      }
      renderHome();
      navigate("screen-home");
    } }));
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

$("#puzzle-assist-btn").addEventListener("click", () => {
  $("#assist-menu").style.display = "flex";
  $("#autocheck-toggle").classList.toggle("on", autoCheckOn);
});
document.addEventListener("click", (e) => {
  const action = e.target.closest("[data-assist]")?.dataset.assist;
  if (!action) return;
  if (action === "close") { $("#assist-menu").style.display = "none"; return; }
  if (action === "reveal-cell") revealCells(currentWord().length ? [selectedCell] : []);
  if (action === "reveal-word") revealCells(currentWord());
  if (action === "reveal-puzzle") revealCells(currentPuzzle.grid.cells.filter((c) => !c.block));
  $("#assist-menu").style.display = "none";
});
$("#autocheck-toggle").addEventListener("click", () => {
  autoCheckOn = !autoCheckOn;
  $("#autocheck-toggle").classList.toggle("on", autoCheckOn);
  if (autoCheckOn) currentPuzzleConn?.sendAutoCheckOn();
});

function revealCells(cells) {
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
  for (let i = 0; i < 16; i++) {
    const owners = Object.values(p.sessions).length ? p.players : [currentUser.name];
    const owner = owners[i % owners.length];
    const hue = dataCache.users[owner]?.hue ?? 250;
    badgeGrid.appendChild(el("div", { style: `background:oklch(58% .1 ${hue})` }));
  }
  $("#completion-title").textContent = p.title;
  $("#completion-time").textContent = formatClock(p.totalTimeMs || 0);
  $("#completion-players").textContent = p.players.length;
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
  const chipRow = $("#rankings-window-chips");
  chipRow.innerHTML = "";
  for (const w of RANKINGS_WINDOWS) {
    const chip = el("button", { class: "chip" + (w.toLowerCase() === rankingsWindow ? " active" : ""), text: w });
    chip.addEventListener("click", () => { rankingsWindow = w.toLowerCase(); renderRankings(); });
    chipRow.appendChild(chip);
  }
  $("#rankings-metric-label").textContent = rankingsMetric.charAt(0).toLowerCase() + rankingsMetric.slice(1);
  renderRankingsList();
}

// One entry per RANKING_METRICS item. `ascending: true` means a *lower*
// value ranks first (e.g. fewest reveals used). `get` returns null when a
// player has no relevant data yet, which excludes them from that metric's
// list rather than showing a misleading 0.
const METRIC_DEFS = {
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
    const ts = p.completedAt ? new Date(p.completedAt).getTime() : new Date(p.createdAt).getTime();
    if (ts < since) continue;
    if (p.createdBy) ensure(p.createdBy).createdCount += 1;
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
      if (p.state === "completed") {
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
  const def = METRIC_DEFS[rankingsMetric] || METRIC_DEFS["Contribution score"];

  const ranked = Object.entries(totals)
    .map(([name, t]) => ({ name, value: def.get(t) }))
    .filter((r) => r.value !== null)
    .sort((a, b) => (def.ascending ? a.value - b.value : b.value - a.value));

  const list = $("#rankings-list");
  list.innerHTML = "";
  ranked.forEach((r, i) => {
    const hue = dataCache.users[r.name]?.hue ?? 250;
    list.appendChild(el("div", { class: "ranking-row" }, [
      el("div", { class: "ranking-num" + (i === 0 ? " gold" : ""), text: i + 1 }),
      el("div", { class: "ranking-avatar", style: `background:oklch(58% .1 ${hue})`, text: initials(r.name) }),
      el("div", { class: "ranking-name", text: r.name === currentUser.name ? "You" : r.name }),
      el("div", { class: "ranking-value", text: def.format(r.value) }),
    ]));
  });
  if (ranked.length === 0) list.appendChild(el("div", { class: "empty-note", text: "No activity in this window yet." }));
}

$("#rankings-metric-change").addEventListener("click", () => {
  const menu = $("#metric-menu-list");
  menu.innerHTML = "";
  for (const m of RANKING_METRICS) {
    menu.appendChild(el("button", { class: "settings-row", style: "width:100%;background:none;border:none;text-align:left;cursor:pointer", text: m, onclick: () => {
      rankingsMetric = m;
      $("#metric-menu").style.display = "none";
      renderRankings();
    } }));
  }
  $("#metric-menu").style.display = "flex";
});
document.addEventListener("click", (e) => {
  if (e.target === $("#metric-menu")) $("#metric-menu").style.display = "none";
  if (e.target === $("#assist-menu")) $("#assist-menu").style.display = "none";
});

// ===========================================================================
// Profile screen
// ===========================================================================

function renderProfile() {
  const hue = currentUser.hue ?? 250;
  $("#profile-avatar").style.background = `oklch(58% .1 ${hue})`;
  $("#profile-avatar").textContent = initials(currentUser.name);
  $("#profile-name").textContent = currentUser.name;

  const myPuzzles = Object.values(dataCache.puzzles);
  const completed = myPuzzles.filter((p) => p.state === "completed" && p.players.includes(currentUser.name));
  const created = myPuzzles.filter((p) => p.createdBy === currentUser.name);
  const avgTime = completed.length ? formatMinSec(completed.reduce((s, p) => s + (p.totalTimeMs || 0), 0) / completed.length) : "—";
  const myTotals = computeRankingTotals(0)[currentUser.name];
  const avgAccuracy = myTotals ? METRIC_DEFS["Average accuracy"].get(myTotals) : null;

  const stats = $("#profile-stats");
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

  const settings = currentUser.settings || { push: true, sound: true, haptic: true };
  $all("[data-setting]").forEach((btn) => {
    const key = btn.dataset.setting;
    btn.classList.toggle("on", !!settings[key]);
    btn.onclick = async () => {
      settings[key] = !settings[key];
      btn.classList.toggle("on", settings[key]);
      currentUser.settings = settings;
      await Backend.updateUserSettings(currentUser.name, settings);
    };
  });
}

// ===========================================================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((e) => console.warn("SW registration failed", e));
  });
}

boot();
