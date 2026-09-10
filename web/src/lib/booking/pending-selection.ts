import type { BookingSelection } from "./types";

/**
 * Bridges a court/date/time selection across the /sign-in hop: the
 * booking section writes the selection here before redirecting an
 * unauthenticated visitor to sign in, and /sign-in reads + clears it
 * after a successful (mock) sign-in to resume booking creation.
 */

const STORAGE_KEY = "tf:pending-selection";

export interface PendingSelection extends BookingSelection {
  dateIndex: number;
}

export function setPendingSelection(selection: PendingSelection) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
}

export function takePendingSelection(): PendingSelection | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  window.sessionStorage.removeItem(STORAGE_KEY);
  try {
    return JSON.parse(raw) as PendingSelection;
  } catch {
    return null;
  }
}
