import { supabase } from "../lib/supabase";

export const useSupabase = () => {
  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error('Error getting session:', error);
      // Handle error (e.g., log out user, redirect to login)
      return null;
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error('Error refreshing session:', error);
      // Handle error (e.g., prompt user to log in again)
      return null;
    }
  };

  const setSession = async ({
    access_token,
    refresh_token,
  }: {
    access_token: string;
    refresh_token: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error('Error setting session:', error);
      // Handle error (e.g., prompt user to log in again)
      return null;
    }
  };

  const getUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('Error getting user:', error);
      // Handle error (e.g., log out user, redirect to login)
      return null;
    }
  };

  return {
    supabase,
    getSession,
    refreshSession,
    setSession,
    getUser,
  };
};
