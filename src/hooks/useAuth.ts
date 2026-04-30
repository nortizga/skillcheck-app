import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

export interface AuthResult {
  error: AuthError | null;
  needsConfirmation?: boolean;
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'INITIAL_SESSION') {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string): Promise<AuthResult> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { error, needsConfirmation: !error && !data.session };
  };

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  return { user, loading, signIn, signUp, signOut };
}
