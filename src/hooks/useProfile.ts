import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    if (!user) return;

    try {
      // First try to get the existing profile
      // eslint-disable-next-line prefer-const
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                username: null,
                avatar_url: null,
              }
            ])
            .select()
            .single();

          if (insertError) {
            throw insertError;
          }

          data = newProfile;
        } else {
          throw error;
        }
      }

      setProfile(data);
    } catch (error) {
      
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username }: { username: string }) {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      // Fetch the updated profile
      await fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async function uploadAvatar(file: File) {
    if (!user) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;

      // Fetch the updated profile
      await fetchProfile();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  }

  return {
    profile,
    loading,
    updateProfile,
    uploadAvatar,
  };
}