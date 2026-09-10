"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { LOCATIONS } from "../data/locations";
import { COURTS } from "../data/courts";
import type { SessionDuration } from "../data/payment-methods";

/**
 * Scoped to the landing page: lets the Courts grid and the Booking
 * section share one in-progress selection, the way the prototype's
 * single component state did. Not persisted past this page — a real
 * booking only exists once lib/booking/mock-booking-store creates one.
 */

interface BookingSelectionState {
  locationId: string;
  courtId: string;
  dateIndex: number;
  time: string | null;
  duration: SessionDuration;
}

interface BookingSelectionContextValue extends BookingSelectionState {
  pickLocation: (id: string) => void;
  pickCourt: (id: string) => void;
  pickDate: (index: number) => void;
  pickDuration: (duration: SessionDuration) => void;
  pickTime: (time: string) => void;
}

const defaultLocation = LOCATIONS.find((l) => l.active) ?? LOCATIONS[0];
const defaultCourt = COURTS.find((c) => c.locationId === defaultLocation.id && c.active) ?? COURTS[0];

const BookingSelectionContext = createContext<BookingSelectionContextValue | null>(null);

export function BookingSelectionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingSelectionState>({
    locationId: defaultLocation.id,
    courtId: defaultCourt.id,
    dateIndex: 0,
    time: null,
    duration: 90,
  });

  const pickLocation = useCallback((id: string) => {
    const location = LOCATIONS.find((l) => l.id === id);
    if (!location?.active) return;
    const firstCourt = COURTS.find((c) => c.locationId === id && c.active);
    setState((s) => ({ ...s, locationId: id, courtId: firstCourt ? firstCourt.id : s.courtId, time: null }));
  }, []);

  const pickCourt = useCallback((id: string) => {
    const court = COURTS.find((c) => c.id === id);
    if (!court) return;
    setState((s) => ({ ...s, locationId: court.locationId, courtId: id, time: null }));
  }, []);

  const pickDate = useCallback((index: number) => {
    setState((s) => ({ ...s, dateIndex: index, time: null }));
  }, []);

  const pickDuration = useCallback((duration: SessionDuration) => {
    setState((s) => ({ ...s, duration, time: null }));
  }, []);

  const pickTime = useCallback((time: string) => {
    setState((s) => ({ ...s, time }));
  }, []);

  const value = useMemo(
    () => ({ ...state, pickLocation, pickCourt, pickDate, pickDuration, pickTime }),
    [state, pickLocation, pickCourt, pickDate, pickDuration, pickTime],
  );

  return <BookingSelectionContext.Provider value={value}>{children}</BookingSelectionContext.Provider>;
}

export function useBookingSelection(): BookingSelectionContextValue {
  const ctx = useContext(BookingSelectionContext);
  if (!ctx) throw new Error("useBookingSelection must be used within BookingSelectionProvider");
  return ctx;
}
