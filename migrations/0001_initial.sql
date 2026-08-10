CREATE TABLE IF NOT EXISTS users (
  name TEXT PRIMARY KEY,
  hue INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  settings_json TEXT NOT NULL CHECK (json_valid(settings_json)),
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS puzzles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  keywords_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(keywords_json)),
  size TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  visibility TEXT NOT NULL,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  state TEXT NOT NULL,
  completed_at TEXT,
  fork_of TEXT,
  forked_by TEXT,
  payload_json TEXT NOT NULL CHECK (json_valid(payload_json)),
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_puzzles_discovery
  ON puzzles (visibility, state, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_puzzles_created_by
  ON puzzles (created_by, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_puzzles_fork_of
  ON puzzles (fork_of);
