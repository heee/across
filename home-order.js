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
