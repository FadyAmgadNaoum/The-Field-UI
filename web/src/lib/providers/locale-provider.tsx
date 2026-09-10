"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import type { Locale, Translations } from "../content/types";
import { getDictionary } from "../content";

const STORAGE_KEY = "tf:locale";
type Listener = () => void;
let listeners: Listener[] = [];

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): Locale {
  return window.localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

function notify() {
  listeners.forEach((l) => l());
}

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Translations;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", dir);
  }, [locale, dir]);

  const toggleLocale = useCallback(() => {
    const next: Locale = getSnapshot() === "en" ? "ar" : "en";
    window.localStorage.setItem(STORAGE_KEY, next);
    notify();
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, dir, t: getDictionary(locale), toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
