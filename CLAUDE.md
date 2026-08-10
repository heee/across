# Working conventions for this repo

- **Minimize dialogue.** Keep responses terse — critical messages and summaries only, no play-by-play narration.
- Worker (`worker/index.js`) redeploys are manual: paste into Cloudflare dashboard Quick Edit. No wrangler (Windows ARM64 has no `workerd` build) — see README for the one-time dashboard-based Durable Object binding step, which has no Quick-Edit equivalent and must be redone by hand if the DO class name ever changes.
- Before any preview check: unregister service workers + clear caches, then reload.
- Before `git push`: `git fetch` + check `origin/main` for new commits — merge if needed. Live gameplay data is stored in D1 and no longer changes this working tree.
- **Push finished work straight to `origin/main` by default** — don't wait for an explicit "push" instruction each time. Still do the fetch/merge safety check above first, and still call out any manual step the user has to do themselves (e.g. the Worker dashboard paste-deploy).
- Bump `sw.js`'s `CACHE_NAME` on every shipped change.
- Root scripts are ESM (`package.json` has `"type": "module"`); the older CommonJS scripts are `.cjs`.
- **Design-implementation tasks aren't done until verified against the reference, element by element.** Rendering without errors is not the same as matching the design. Before marking any visual/redesign task complete: reload the actual live/preview page (cache-busted), and check every distinct element named in `design_handoff_across_mobile/Look and Feel Options.dc.html` — colors, spacing, order, badges, icons, copy — against that reference directly, not from memory of having "already built that." Do this per screen as each is finished, not as one pass at the very end.
- **For major/new-feature work, ask clarifying questions one-by-one before planning.** Don't guess at ambiguous requirements or batch every open question into one message — surface them one at a time, let the answer inform the next question, then present a plan for confirmation before handing off to an executing agent.
- Revealed cells (Assist menu) are attributed to no player and excluded from all stats. Auto Check is a binary per-puzzle-session flag on a player — if it was ever on during that puzzle, that whole puzzle's contribution counts at half weight for that player.
- Player color (OKLCH hue) is assigned once per account, globally, at first-ever use — never reassigned, never per-puzzle.
