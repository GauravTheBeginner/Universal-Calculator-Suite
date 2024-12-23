/*
  # User Authentication and Calculations History Schema

  1. New Tables
    - `calculations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `calculator_type` (text)
      - `input_values` (jsonb)
      - `result` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on calculations table
    - Add policies for users to manage their own calculations
*/

CREATE TABLE IF NOT EXISTS calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  calculator_type text NOT NULL,
  input_values jsonb NOT NULL,
  result text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own calculations"
  ON calculations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calculations"
  ON calculations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX calculations_user_id_idx ON calculations(user_id);
CREATE INDEX calculations_created_at_idx ON calculations(created_at DESC);