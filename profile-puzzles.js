import { hasStartedPuzzle, puzzleParticipantNames, sortPuzzlesByUserActivity } from "./home-order.js";

export function puzzleSeriesId(puzzle) {
  return puzzle?.seriesId || puzzle?.forkOf || puzzle?.id;
}

export function profilePuzzleCollections(puzzles, profileName, viewerName) {
  const visible = puzzles.filter((puzzle) => viewerName === profileName || puzzle.visibility === "open");
  return {
    active: sortPuzzlesByUserActivity(
      visible.filter((puzzle) => puzzle.state === "open" && hasStartedPuzzle(puzzle, profileName)),
      profileName,
    ),
    completed: sortPuzzlesByUserActivity(
      visible.filter((puzzle) => puzzle.state === "completed" && hasStartedPuzzle(puzzle, profileName)),
      profileName,
    ),
    created: [...visible]
      .filter((puzzle) => puzzle.createdBy === profileName && !puzzle.forkOf)
      .sort((a, b) => Date.parse(b.createdAt || "") - Date.parse(a.createdAt || "")),
  };
}

export function puzzleProgress(puzzle) {
  const playable = (puzzle.grid?.cells || []).filter((cell) => !cell.block);
  if (!playable.length) return 0;
  const filled = playable.filter((cell) => puzzle.cells?.[`${cell.row}-${cell.col}`]?.letter).length;
  return Math.round((filled / playable.length) * 100);
}

function assistsForPuzzle(puzzle, names) {
  return names.flatMap((name) => {
    const session = puzzle.sessions?.[name];
    if (!session?.autoCheckUsed && !(session?.revealsUsed > 0)) return [];
    return [{ name, autoCheckUsed: !!session.autoCheckUsed, revealsUsed: session.revealsUsed || 0 }];
  });
}

function completedTime(puzzle) {
  return Number(puzzle.totalTimeMs) || 0;
}

export function puzzleLeaderboard(puzzles, selectedPuzzle) {
  const seriesId = puzzleSeriesId(selectedPuzzle);
  const completed = puzzles.filter((puzzle) => puzzle.state === "completed" && puzzleSeriesId(puzzle) === seriesId);
  const entries = [];
  const teamPuzzle = completed.find((puzzle) => puzzle.id === seriesId || !puzzle.forkOf);

  if (teamPuzzle) {
    const names = puzzleParticipantNames(teamPuzzle);
    const teamNames = names.length ? names : (teamPuzzle.players || []);
    entries.push({
      kind: "team",
      names: teamNames,
      timeMs: completedTime(teamPuzzle),
      completedAt: teamPuzzle.completedAt,
      assists: assistsForPuzzle(teamPuzzle, teamNames),
      puzzleId: teamPuzzle.id,
    });
  }

  const fastestByPlayer = new Map();
  for (const puzzle of completed) {
    if (puzzle === teamPuzzle || !puzzle.forkOf) continue;
    const names = puzzleParticipantNames(puzzle);
    const player = puzzle.forkedBy || names[0] || puzzle.players?.[0];
    if (!player) continue;
    const entry = {
      kind: "solo",
      names: [player],
      timeMs: completedTime(puzzle),
      completedAt: puzzle.completedAt,
      assists: assistsForPuzzle(puzzle, [player]),
      puzzleId: puzzle.id,
    };
    const previous = fastestByPlayer.get(player);
    if (!previous || entry.timeMs < previous.timeMs) fastestByPlayer.set(player, entry);
  }
  entries.push(...fastestByPlayer.values());

  return entries.sort((a, b) =>
    a.timeMs - b.timeMs || Date.parse(a.completedAt || "") - Date.parse(b.completedAt || ""),
  );
}
