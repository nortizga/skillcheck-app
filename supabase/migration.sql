-- ═══════════════════════════════════════════════════
-- SkillCheck — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- 1. Create the entries table
CREATE TABLE IF NOT EXISTS entries (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_date    DATE NOT NULL,

  -- Behaviors (yes/no)
  suicidal_behavior   BOOLEAN,
  self_harm_behavior  BOOLEAN,
  substances          BOOLEAN,

  -- Thoughts (intensity 0-5)
  suicidal_thoughts   SMALLINT CHECK (suicidal_thoughts BETWEEN 0 AND 5),
  self_harm_thoughts  SMALLINT CHECK (self_harm_thoughts BETWEEN 0 AND 5),

  -- Emotions (intensity 0-5)
  guilt       SMALLINT CHECK (guilt    BETWEEN 0 AND 5),
  shame       SMALLINT CHECK (shame    BETWEEN 0 AND 5),
  fear        SMALLINT CHECK (fear     BETWEEN 0 AND 5),
  joy         SMALLINT CHECK (joy      BETWEEN 0 AND 5),
  sadness     SMALLINT CHECK (sadness  BETWEEN 0 AND 5),
  anger       SMALLINT CHECK (anger    BETWEEN 0 AND 5),

  -- Skills used (array of skill IDs)
  skills      TEXT[] DEFAULT '{}',

  -- Free-form notes
  notes       TEXT DEFAULT '',

  -- Timestamps
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),

  -- One entry per user per day
  UNIQUE(user_id, entry_date)
);

-- 2. Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_entries_user_date ON entries(user_id, entry_date);

-- 3. Enable Row Level Security
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — users can only access their own entries
CREATE POLICY "Users can view own entries"
  ON entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entries"
  ON entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries"
  ON entries FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own entries"
  ON entries FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER entries_updated_at
  BEFORE UPDATE ON entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
