function timestamp(value) {
  const parsed = Date.parse(value || "");
  return Number.isFinite(parsed) ? parsed : 0;
}

export function userPuzzleActivityTimestamp(puzzle, userName) {
  const session = puzzle.sessions?.[userName];
  return timestamp(session?.lastActiveAt || session?.joinedAt || puzzle.createdAt);
}

export function sortPuzzlesByUserActivity(puzzles, userName) {
  return [...puzzles].sort((a, b) => {
    const activityDifference = userPuzzleActivityTimestamp(b, userName) - userPuzzleActivityTimestamp(a, userName);
    if (activityDifference) return activityDifference;
    return timestamp(b.createdAt) - timestamp(a.createdAt) || String(a.id).localeCompare(String(b.id));
  });
}

const SESSION_ACTIVITY_FIELDS = [
  "lettersEntered",
  "correctLetters",
  "incorrectLetters",
  "correctionsMade",
  "revealsUsed",
  "wordsCompleted",
  "timeSpentMs",
];

// Puzzle creation historically seeds the creator into players/sessions so
// the room is ready to open. That technical membership alone is not evidence
// that the creator has started solving it. Other users only enter players by
// explicitly joining, so their membership does count as participation.
export function hasStartedPuzzle(puzzle, userName) {
  if (!puzzle?.players?.includes(userName)) return false;
  if (userName !== puzzle.createdBy) return true;
  const session = puzzle.sessions?.[userName] || {};
  if (SESSION_ACTIVITY_FIELDS.some((field) => Number(session[field]) > 0) || session.autoCheckUsed) return true;
  return Object.values(puzzle.cells || {}).some((cell) => cell?.owner === userName);
}

export function puzzleParticipantNames(puzzle) {
  return (puzzle?.players || []).filter((name) => hasStartedPuzzle(puzzle, name));
}
