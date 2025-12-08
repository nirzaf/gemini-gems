-- Turso Database Schema for Gemini Gems
-- ========================================

-- Table: gems_stats
-- Tracks copy counts and view counts for each gem
CREATE TABLE IF NOT EXISTS gems_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gem_slug TEXT NOT NULL UNIQUE,
    copy_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster lookups by gem_slug
CREATE INDEX IF NOT EXISTS idx_gems_stats_slug ON gems_stats(gem_slug);

-- Index for sorting by copy_count
CREATE INDEX IF NOT EXISTS idx_gems_stats_copy_count ON gems_stats(copy_count DESC);

-- Table: gem_labels
-- Stores available labels (name, color, description)
CREATE TABLE IF NOT EXISTS gem_labels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL DEFAULT '#3B82F6',
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: gem_label_mappings
-- Many-to-many relationship between gems and labels
CREATE TABLE IF NOT EXISTS gem_label_mappings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gem_slug TEXT NOT NULL,
    label_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (label_id) REFERENCES gem_labels(id) ON DELETE CASCADE,
    UNIQUE(gem_slug, label_id)
);

-- Index for faster lookups by gem_slug
CREATE INDEX IF NOT EXISTS idx_gem_label_mappings_slug ON gem_label_mappings(gem_slug);

-- Index for faster lookups by label_id
CREATE INDEX IF NOT EXISTS idx_gem_label_mappings_label ON gem_label_mappings(label_id);
