-- Add appointment marker to entries table
ALTER TABLE entries
  ADD COLUMN IF NOT EXISTS is_appointment BOOLEAN DEFAULT FALSE;
