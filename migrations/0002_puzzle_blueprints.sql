CREATE TABLE IF NOT EXISTS puzzle_blueprints (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  size TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  grid_hash TEXT NOT NULL UNIQUE,
  grid_json TEXT NOT NULL CHECK (json_valid(grid_json)),
  density REAL NOT NULL CHECK (density >= 0.8 AND density <= 1.0),
  themed_answer_count INTEGER NOT NULL CHECK (themed_answer_count >= 0),
  answer_count INTEGER NOT NULL CHECK (answer_count > 0),
  source TEXT NOT NULL DEFAULT 'offline',
  metadata_json TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(metadata_json)),
  status TEXT NOT NULL DEFAULT 'ready' CHECK (status IN ('ready', 'disabled')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (CAST(themed_answer_count AS REAL) / answer_count >= 0.4),
  CHECK (CAST(themed_answer_count AS REAL) / answer_count <= 0.6)
);

CREATE INDEX IF NOT EXISTS idx_puzzle_blueprints_selection
  ON puzzle_blueprints (category, size, difficulty, status, created_at, id);

CREATE TABLE IF NOT EXISTS blueprint_exposures (
  blueprint_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  puzzle_id TEXT NOT NULL,
  used_at TEXT NOT NULL,
  PRIMARY KEY (blueprint_id, user_name),
  FOREIGN KEY (blueprint_id) REFERENCES puzzle_blueprints(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_blueprint_exposures_user
  ON blueprint_exposures (user_name, used_at DESC);

CREATE INDEX IF NOT EXISTS idx_blueprint_exposures_puzzle
  ON blueprint_exposures (puzzle_id);
