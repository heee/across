export function shuffledCopy(items, random = Math.random) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function pickRandomItem(items, random = Math.random) {
  if (items.length === 0) return null;
  return items[Math.floor(random() * items.length)];
}

export function hasActiveDiscoverCriteria({ query = "", category = "all", difficulty = "all", size = "all" } = {}) {
  return String(query).trim().length > 0 || category !== "all" || difficulty !== "all" || size !== "all";
}
