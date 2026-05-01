-- Run this in your Supabase SQL Editor (Step 2c of the setup guide)
-- This creates the single table that stores all your app data

CREATE TABLE IF NOT EXISTS wos_data (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text NOT NULL,
  key text NOT NULL,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, key)
);

-- Allow anyone with the anon key to read and write their own data
ALTER TABLE wos_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own data"
  ON wos_data
  FOR ALL
  USING (true)
  WITH CHECK (true);
