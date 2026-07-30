# Handoff: Across — Collaborative Crossword App (Mobile)

## Overview
Across is a mobile-first PWA for solving crosswords together with a small group of friends (2–8 people). This handoff covers the primary screens and interaction model designed and refined in this session: Home, Search, Create, Crossword (solve), Completion, native Share handoff, Rankings, and Profile.

## About the Design Files
The bundled files (`Look and Feel Options.dc.html`, `ios-frame.jsx`) are **design references built in HTML**, not production code. They show intended layout, spacing, color, typography, and states inside a simulated iPhone frame. The task is to **recreate these designs in the target codebase's real environment** (React Native, SwiftUI, Flutter, or a PWA framework — whichever the project uses, or the best fit if none exists yet), using that environment's own component/navigation patterns. Do not port the HTML/inline-style markup directly.

## Fidelity
**High-fidelity.** Colors, spacing, type sizes, and layout structure shown are intentional and should be matched closely. Copy shown (puzzle names, clue text, stats) is placeholder/sample data — replace with real data bindings.

## Design System Summary
- **Palette**: warm off-white background `#faf8f4`, near-white card surfaces `#ffffff`, ink text `#2b2926`. Per-user identity colors are OKLCH hues rotated per player (e.g. `oklch(58% .1 250)` blue, `oklch(58% .1 30)` coral, `oklch(58% .1 140)` green, `oklch(58% .1 90)` amber) — assign each player a stable hue at first join.
- **Typography**: Sora (500/600/700 weights) throughout. Screen titles ~20px/700, section headers ~15px/600, body ~13px/500-600, captions ~11px/500.
- **Shape language**: 4px radius on grid tiles, 8–12px radius on cards/buttons, 100px (pill) radius on chips/filters/badges.
- **Elevation**: cards use a single soft shadow `0 1px 2px rgba(0,0,0,.05)` — no heavy drop shadows anywhere.
- **Grid tile styling (locked/filled letters)**: near-flat with a whisper of emboss — `box-shadow: inset 0 1px 0 rgba(255,255,255,.7), inset 0 -1px 0 rgba(0,0,0,.04)` plus a 1px hairline border. Block/unusable cells render as **empty space, no tile at all** (not a colored square) — this was an explicit correction during design review.
- **Active word state**: the entire active word's tiles switch to a **black-on-white embossed** treatment (`background:#fff; color:#2b2926;` same emboss shadow) instead of a colored halo/outline — this reads more clearly than a glow at small sizes and was chosen over three alternatives (tint wash, underline bar, hairline outline) during review.

## Screens / Views

### 1. Home
- Header: wordmark "Across", no avatar (avatar lives only in bottom nav Profile tab — an earlier duplicate top-right avatar was removed).
- Three list sections, each with a header row containing a sentence-case title + a pill-shaped "More" button (top-right) that pushes to a dedicated full-list screen:
  1. **Continue playing** — vertical list (not horizontal-scroll; an earlier horizontal carousel was explicitly rejected to avoid off-screen content) of in-progress puzzles: 44px mini crossword-grid thumbnail (real grid pattern, not an icon), title, "N players · NN% done", stacked player-avatar dots.
  2. **New open crosswords** — vertical list rows: 40px mini-grid thumbnail, title, "Difficulty · size · N joined", chevron.
  3. **Recently completed** — compact rows: checkmark badge, title, "time · player count".
- Bottom nav: Home, Search, **+** (raised circular create button, brand-blue, floats above the bar), Rankings, Profile — exactly per spec, 5 items, no 6th "Discover" item (Discovery lives inside Search).

### 2. Search
- Header "Search" + search bar (rounded, icon + placeholder "Search crosswords or topics").
- Horizontal-scroll category chip row: Geography, Movies, History, Sports, Science, Food, Kids (first chip active/filled, rest outlined-on-white).
- "Newest first" list below, same row pattern as Home's open-crosswords list.
- This screen is where the spec's "Discovery" (newest-first, infinite scroll, categories) lives — there is no separate Discover tab.

### 3. Create
Single scrollable screen (an earlier 8-step wizard prototype was explicitly collapsed into one screen per review — still covers the same fields):
- Title input, optional short description, keyword chips (+ Add chip to add more).
- Puzzle size: Mini / Standard / Large segmented control (Standard selected state = tinted background + colored border+text).
- Difficulty: Easy / Medium / Hard segmented control, same selected styling.
- "Advanced controls" row with a toggle switch (off by default) — expands to fine-grained controls (grid dimensions, vocabulary sliders) when on; not detailed pixel-by-pixel here, implement as a collapsible section.
- Live preview card: mini grid render + "Standard · Medium · Up to 8 players" caption.
- Visibility row: "Open · anyone with the link can join" (should be tappable to switch Private/Open per spec).
- Primary CTA: full-width pill button "Generate & publish" (single action — generation and publish are combined in this flow; adjust if the real product needs a separate preview-then-publish step).

### 4. Crossword (solve) screen
- Header: puzzle title + "N playing · MM:SS mins (HH:MM:SS total)" — personal timer for this session, muted/parenthetical total time across all players in lighter, unbolded text so it doesn't visually compete.
- Top-right, tightly grouped (2px gap) as a pair: **Home** button (⌂ icon, circular white chip) and **Assist** button (✦ sparkle icon, amber-tinted, circular white chip) — opens Reveal/Auto-check assistant actions. Grouped tightly per explicit review feedback (was previously spaced further apart).
- To the right of that pair: stacked player avatar circles (colored per player, white 2px ring, initials).
- Grid: ~75–80% of screen height. Each filled cell is colored by **whichever player last locked that letter** (permanent attribution — even after being overwritten by a different player, the tile just updates to the new filler's color; it does not fade to neutral). Small number badges (1, 2, 3…) top-left of word-start cells. One selected cell shows a solid accent ring (the user's own cursor). One other cell may show a small circular avatar-initial badge top-right corner — a static "presence" marker showing where a specific friend currently has their cursor (no live-moving ghost cursor — chosen as a lightweight middle ground over full presence tracking, which was explicitly scoped out for now). The entire active word (all its cells) renders in the black-on-white embossed state described above.
- Below grid: clue bar — "‹ [clue number + direction] · [clue text] ›" — the ‹ › arrows step to the previous/next word without touching the grid.
- Bottom: custom QWERTY keyboard, white rounded keys on the page background, wide backspace key bottom-left, wide colored "Done" key bottom-right.

### 5. Native Share handoff
Tapping "Share" on the Completion screen does **not** open an in-app share screen — it hands off directly to the OS-native share sheet, landing in Messages (or the user's default share target) with a prefilled message: fun tone + emoji + stats + deep link, e.g. *"We just crushed Prague Getaway together 🧩🔥 3 friends, 18:42, zero regrets. Come solve the next one with us → across.app/s/prague-getaway"*. Implement via the platform's native share API (Web Share API for the PWA case), not a custom in-app compose UI.

### 6. Completion screen
- Centered: small radial-glow badge behind a mini finished-grid icon (restrained celebration, no confetti), puzzle title, "Completed together" caption.
- Three stat columns: Time, Players, Letters.
- **Contribution** card: ranked list (1st/2nd/3rd, gold-tinted rank number for 1st), avatar, name, contribution %. This is an actual ranking, not just soft "MVP-style" callouts — confirmed explicitly during review, appropriate for a small-friend-group context.
- **Highlights** card directly below Contribution: 2–3 short callout lines with a small leading icon, e.g. "Mia solved 24-Down in 4 seconds flat", "You typed the most letters — 11 of 25", "Jordan bounced back from 2 wrong guesses." This satisfies the spec's "Interesting highlights" line, which was missing from earlier iterations.
- Bottom actions, all **in one row**: Share (primary, filled), Create similar (secondary, white), Done (text-only, muted) — explicitly requested to be one row rather than stacked.

### 7. Rankings (bottom-nav tab, not part of the linear session flow)
- Header "Rankings" + horizontal filter chips: Today, Week, Month, Quarter, Year, All time.
- Metric row: "Contribution score" (default per spec) + a "Change ▾" control that should let the user switch to any of the other spec'd metrics: Letters Entered, Words Completed, Crosswords Completed, Crosswords Created, Correct Letter %, Incorrect Letters Corrected, Average Accuracy, Average Completion Time, Lowest Reveal Usage, Lowest Auto Check Usage. Only one metric is shown at a time by design — deliberately not a dense multi-column stats table, to preserve the calm/minimal principle.
- Ranked list rows: rank number (gold for 1st), avatar, name, metric value.

### 8. Profile (bottom-nav tab)
- Centered avatar (large), display name + edit-pencil affordance.
- 2×2 stat card grid: Crosswords completed, Average accuracy, Avg. completion time, Crosswords created.
- **Settings — flattened to one screen, no sub-pages** (explicit requirement — do not build Account/Notifications/Appearance/Help as separate drill-in screens): a single card with direct toggle rows for Push notifications, Sound effects, Haptic feedback. No Email field, no Sign out row — those were explicitly excluded.

## Interactions & Behavior
- Tapping a cell selects it and highlights its active word; tapping the same cell again toggles Across/Down (per spec).
- Clue bar's ‹ › arrows move to the previous/next word.
- Letters lock permanently in the color of whoever entered them; overwriting a letter reassigns the tile's color to the new author.
- A player's presence marker is a static badge at their current cell — it does not animate/move live; it should update on each of their moves without a transition, or with a very subtle cross-fade at most.
- Completion triggers on the final correct letter: restrained animation (e.g. a soft glow pulse on the grid) + light haptic feedback, no confetti.
- "Share" triggers the OS share sheet (Web Share API `navigator.share`), not an in-app screen.
- Bottom nav "+" always opens Create; Create's primary action is a single "Generate & publish" step (or split into generate-then-publish if the real generation flow needs a distinct preview step before going live).

## State Management (suggested)
- Per-puzzle: grid state (letter, owner color/id, locked?), current active cell + direction per local user, list of currently-present players + their last-known cell, personal session timer, cross-session total time.
- Per-player: assigned hue/color (stable, assigned once at first join to a given puzzle — or globally per account, product decision needed), contribution counts (letters entered) for scoring.
- Global: rankings aggregation windows (today/week/month/quarter/year/all-time) per metric.

## Design Tokens
- Background: `#faf8f4` (screens), `#f0eee9` (canvas/system chrome), `#ffffff` (cards).
- Ink: `#2b2926`.
- Muted text: `rgba(0,0,0,.4–.55)` depending on hierarchy.
- Player hues (OKLCH, rotate per player): 250 (blue), 30 (coral), 140 (green), 90 (amber), extend with additional hues spaced ~60–70° apart in OKLCH hue for more players.
- Accent/brand action color: `oklch(58% .1 250)` (same as player-1 blue) — used for primary buttons, active states, selection ring.
- Radii: 4px (grid tiles), 8–12px (cards/buttons/list rows), 100px (pills/chips/badges).
- Shadow: `0 1px 2px rgba(0,0,0,.05)` (cards), `inset 0 1px 0 rgba(255,255,255,.7), inset 0 -1px 0 rgba(0,0,0,.04)` (locked tile emboss).
- Font: Sora, weights 500/600/700.

## Assets
No custom icons/illustrations — all iconography in the mocks is drawn with basic CSS shapes (circles, borders) as placeholders; source real iconography from the target app's existing icon set (or a system icon set for the target platform) rather than recreating these CSS shapes.

## Files
- `Look and Feel Options.dc.html` — full set of mocks (all screens listed above), viewable in any browser.
- `ios-frame.jsx` — iPhone device-frame component used purely for presentation in the mocks; not needed in the real app.

## Open Product Questions for Engineering
- Exact assist-menu contents behind the ✦ button (Reveal Cell / Reveal Word / Reveal Puzzle per spec — not yet mocked as an expanded menu).
- Auto Check mode visuals (red/strikethrough incorrect letters, half leaderboard credit) — not yet mocked.
- "Advanced controls" fine-grained fields in Create — not yet mocked in detail.
- Visibility toggle (Private/Open) interaction — currently a static row in the mock.
