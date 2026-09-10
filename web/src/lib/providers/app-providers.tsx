"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { LocaleProvider } from "./locale-provider";
import { AuthProvider } from "./auth-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>{children}</AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
