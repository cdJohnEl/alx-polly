"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      if (data.session?.user) {
        setUser({ id: data.session.user.id, email: data.session.user.email });
      }
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email });
      } else {
        setUser(null);
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user) setUser({ id: data.user.id, email: data.user.email });
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function register(email: string, password: string) {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) setUser({ id: data.user.id, email: data.user.email });
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
