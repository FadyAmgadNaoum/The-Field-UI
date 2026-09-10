export type BookingStatus =
  | "AVAILABLE"
  | "HELD"
  | "PENDING_PAYMENT"
  | "PAYMENT_SUBMITTED"
  | "CONFIRMED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED";

/** A single confirmed selection: which court, which day, which start time, for how long. */
export interface BookingSelection {
  locationId: string;
  courtId: string;
  dateIso: string;
  time: string;
  duration: number;
}

export interface Booking extends BookingSelection {
  id: string;
  ref: string;
  price: number;
  status: BookingStatus;
  method: string;
  receiptAttached: boolean;
  createdAt: number;
  /** createdAt + hold window; past this the HELD slot should be treated as expired. */
  heldUntil: number;
}
