/*
  # Fix Profile RLS Policies

  1. Changes
    - Add INSERT policy for profiles table
    - Update existing policies to be more specific
    - Add storage bucket policies for avatars

  2. Security
    - Enable RLS for storage bucket
    - Allow authenticated users to manage their own profile
    - Allow authenticated users to upload their own avatars
*/

-- Drop existing policies to recreate them with proper settings
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create comprehensive policies for the profiles table
CREATE POLICY "Users can manage their own profile"
  ON profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('avatars', 'avatars')
ON CONFLICT DO NOTHING;

-- Enable RLS for the avatars bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for avatar uploads
CREATE POLICY "Users can upload their own avatar"
  ON storage.objects
  FOR ALL
  TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);