"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True once the component has hydrated on the client. Lets a component
 * read browser-only state (localStorage, etc.) directly during render
 * without a hydration mismatch: the server and the first client render
 * both see `false`, then React re-renders with `true` right after hydrate.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
