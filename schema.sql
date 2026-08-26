CREATE TABLE IF NOT EXISTS user_progress (
  user_email TEXT NOT NULL,
  track_id TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_email, track_id)
);

CREATE TABLE IF NOT EXISTS quiz_scores (
  user_email TEXT NOT NULL,
  track_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_email, track_id)
);

CREATE TABLE IF NOT EXISTS user_stats (
  user_email TEXT PRIMARY KEY,
  reviewed_count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
