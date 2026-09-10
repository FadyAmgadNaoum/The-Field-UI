"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "tf:theme";
type Listener = () => void;
let listeners: Listener[] = [];

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): Theme {
  return window.localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function notify() {
  listeners.forEach((l) => l());
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, next);
    notify();
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
