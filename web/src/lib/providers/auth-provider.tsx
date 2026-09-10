"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";

const STORAGE_KEY = "tf:auth-email";
type Listener = () => void;
let listeners: Listener[] = [];

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): string | null {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

function notify() {
  listeners.forEach((l) => l());
}

interface AuthContextValue {
  signedIn: boolean;
  email: string | null;
  /**
   * MOCK sign-in only — accepts any non-empty email/password and marks the
   * visitor "signed in" client-side. Phase 2 replaces this with Auth.js
   * (email/password, hashed, server-verified sessions). Never wire real
   * credentials or authorization decisions to this provider.
   */
  signIn: (email: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const email = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const signIn = useCallback((nextEmail: string) => {
    window.localStorage.setItem(STORAGE_KEY, nextEmail);
    notify();
  }, []);

  const signOut = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    notify();
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn: !!email, email, signIn, signOut }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
