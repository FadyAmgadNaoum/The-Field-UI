/**
 * MOCK availability only. This deterministically derives a slot's status
 * from a hash of (court, date, time) so the UI has believable booked/held
 * slots to render. It performs no real check and must never ship as-is —
 * Phase 2 replaces this with a server-verified query against the bookings
 * table (see original brief: "Do not trust frontend availability").
 */

export type SlotStatus = "available" | "booked" | "held";

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mockSlotStatus(courtId: string, isoDate: string, time: string): SlotStatus {
  const n = hashString(courtId + isoDate + time) % 10;
  if (n < 2) return "booked";
  if (n === 2) return "held";
  return "available";
}

export function mockBookingRef(courtId: string, dateIdx: number, time: string): string {
  return String(hashString(courtId + dateIdx + time)).slice(0, 6);
}
