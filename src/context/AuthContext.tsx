"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, UserRole } from "@/types/auth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  stateOfResidence?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (params: SignUpParams) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  demoSignIn: (role?: UserRole) => void;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "pits_member_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initAuth() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Member",
              phone: session.user.user_metadata?.phone,
              role: (session.user.user_metadata?.role as UserRole) || "member",
              stateOfResidence: session.user.user_metadata?.state_of_residence || "Lagos",
              isVerified: Boolean(session.user.email_confirmed_at),
              joinedDate: session.user.created_at ? session.user.created_at.substring(0, 10) : "2026-01-01",
              membershipNumber: `PITS-${session.user.id.substring(0, 6).toUpperCase()}`,
            });
          }

          const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
              if (session?.user) {
                setUser({
                  id: session.user.id,
                  email: session.user.email || "",
                  fullName: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Member",
                  phone: session.user.user_metadata?.phone,
                  role: (session.user.user_metadata?.role as UserRole) || "member",
                  stateOfResidence: session.user.user_metadata?.state_of_residence || "Lagos",
                  isVerified: Boolean(session.user.email_confirmed_at),
                  joinedDate: session.user.created_at ? session.user.created_at.substring(0, 10) : "2026-01-01",
                  membershipNumber: `PITS-${session.user.id.substring(0, 6).toUpperCase()}`,
                });
              } else {
                setUser(null);
              }
            }
          );

          setLoading(false);
          return () => {
            authListener?.subscription.unsubscribe();
          };
        } else {
          // Fallback to local storage for test/demo mode
          const saved = typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
          if (saved) {
            try {
              setUser(JSON.parse(saved));
            } catch {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
          }
          setLoading(false);
        }
      } catch (err: unknown) {
        console.error("Auth init error:", err);
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    setError(null);
    setLoading(true);

    if (isSupabaseConfigured) {
      const { error: sbError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return { error: sbError.message };
      }
      setLoading(false);
      return {};
    } else {
      // Local fallback simulation
      const fallbackUser: UserProfile = {
        id: "usr-" + Math.random().toString(36).substring(2, 8),
        email,
        fullName: email.split("@")[0].toUpperCase() + " (Citizen)",
        role: "member",
        stateOfResidence: "Lagos",
        isVerified: true,
        joinedDate: "2026-01-15",
        membershipNumber: `PITS-${Math.floor(100000 + Math.random() * 900000)}`,
      };
      setUser(fallbackUser);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallbackUser));
      }
      setLoading(false);
      return {};
    }
  };

  const signUp = async (params: SignUpParams): Promise<{ error?: string }> => {
    setError(null);
    setLoading(true);

    if (isSupabaseConfigured) {
      const { error: sbError } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
          data: {
            full_name: params.fullName,
            phone: params.phone,
            state_of_residence: params.stateOfResidence,
            role: "member",
          },
        },
      });

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return { error: sbError.message };
      }
      setLoading(false);
      return {};
    } else {
      const fallbackUser: UserProfile = {
        id: "usr-" + Math.random().toString(36).substring(2, 8),
        email: params.email,
        fullName: params.fullName,
        phone: params.phone,
        role: "volunteer",
        stateOfResidence: params.stateOfResidence || "Lagos",
        isVerified: false,
        joinedDate: "2026-01-15",
        membershipNumber: `PITS-${Math.floor(100000 + Math.random() * 900000)}`,
      };
      setUser(fallbackUser);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fallbackUser));
      }
      setLoading(false);
      return {};
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const resetPassword = async (email: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured) {
      const { error: sbError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/portal/reset-password`,
      });
      if (sbError) {
        return { error: sbError.message };
      }
      return {};
    }
    return {};
  };

  const demoSignIn = (role: UserRole = "member") => {
    const demoUser: UserProfile = {
      id: "demo-pits-001",
      email: "citizen.grassroots@amvora.org",
      fullName: "Dabira Adeyemi",
      phone: "+234 816 885 0257",
      role,
      stateOfResidence: "Oyo",
      lga: "Ibadan North",
      isVerified: true,
      joinedDate: "2026-01-15",
      membershipNumber: "PITS-704921",
    };
    setUser(demoUser);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(demoUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
        demoSignIn,
        isConfigured: isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
