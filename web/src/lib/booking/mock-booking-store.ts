import type { Booking, BookingSelection } from "./types";
import { COURTS } from "../data/courts";
import { mockBookingRef } from "./availability";
import { HOLD_DURATION_SECONDS } from "../data/payment-methods";

/**
 * MOCK booking persistence. Bookings live in localStorage on the visitor's
 * own browser — there is no server, no transaction, and no real double-
 * booking protection. This exists purely so the checkout route
 * (/booking/[bookingId]) has something to read after a real client-side
 * navigation. Phase 2 replaces this module wholesale with a server
 * action / API route backed by Postgres, and deletes this file.
 */

const STORAGE_KEY = "tf:bookings";

function readAll(): Record<string, Booking> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Booking>) : {};
  } catch {
    return {};
  }
}

function writeAll(bookings: Record<string, Booking>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function getBooking(id: string): Booking | null {
  return readAll()[id] ?? null;
}

export function createHeldBooking(selection: BookingSelection, dateIndex: number): Booking {
  const court = COURTS.find((c) => c.id === selection.courtId);
  const price = court ? Math.round(court.price * (selection.duration / 60)) : 0;
  const id = mockBookingRef(selection.courtId, dateIndex, selection.time);
  const now = Date.now();
  const booking: Booking = {
    ...selection,
    id,
    ref: `TF-${id}`,
    price,
    status: "HELD",
    method: "instapay",
    receiptAttached: false,
    createdAt: now,
    heldUntil: now + HOLD_DURATION_SECONDS * 1000,
  };
  const all = readAll();
  all[id] = booking;
  writeAll(all);
  return booking;
}

export function updateBooking(id: string, patch: Partial<Booking>): Booking | null {
  const all = readAll();
  const existing = all[id];
  if (!existing) return null;
  const next = { ...existing, ...patch };
  all[id] = next;
  writeAll(all);
  return next;
}
