import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase, db } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

interface RegisterData {
  email: string;
  full_name: string;
  phone_number?: string;
  role: 'user' | 'owner' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await db.profiles.getById(userId);
      setUser(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    if (data.user) {
      await loadUserProfile(data.user.id);
    }
  };

  const register = async (userData: RegisterData, password: string) => {
    // First, create the auth user
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password,
    });

    if (error) throw error;
    
    if (data.user) {
      // Create the profile
      const profile = await db.profiles.create({
        id: data.user.id,
        email: userData.email,
        full_name: userData.full_name,
        phone_number: userData.phone_number || null,
        role: userData.role,
      });
      
      setUser(profile);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedProfile = await db.profiles.update(user.id, updates);
    setUser(updatedProfile);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};