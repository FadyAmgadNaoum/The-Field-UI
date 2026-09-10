"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/providers/locale-provider";
import { useAuth } from "@/lib/providers/auth-provider";
import { useBookingSelection } from "@/lib/providers/booking-selection-provider";
import { useInView } from "@/lib/hooks/use-in-view";
import { LOCATIONS } from "@/lib/data/locations";
import { COURTS } from "@/lib/data/courts";
import { SESSION_TIMES, SESSION_DURATIONS, type SessionDuration } from "@/lib/data/payment-methods";
import { upcomingDates } from "@/lib/booking/dates";
import { mockSlotStatus } from "@/lib/booking/availability";
import { createHeldBooking } from "@/lib/booking/mock-booking-store";
import { setPendingSelection } from "@/lib/booking/pending-selection";
import { dayOfWeekLabel, monthLabel, dateLabel, formatDuration, formatMoney, localizeNumber, isoDate } from "@/lib/format";

const stepButtonClass =
  "flex cursor-pointer flex-col gap-1 rounded-xl border border-line bg-surface px-4 py-4 text-start";

export function Booking() {
  const { t, locale } = useLocale();
  const { signedIn } = useAuth();
  const router = useRouter();
  const [inViewRef, isIn] = useInView<HTMLDivElement>();
  const { locationId, courtId, dateIndex, time, duration, pickLocation, pickCourt, pickDate, pickDuration, pickTime } =
    useBookingSelection();

  const dates = useMemo(() => upcomingDates(7), []);
  const activeDate = dates[dateIndex];
  const iso = isoDate(activeDate);

  const courtsForLocation = COURTS.filter((c) => c.locationId === locationId && c.active);
  const activeCourt = COURTS.find((c) => c.id === courtId) ?? courtsForLocation[0];
  const sessionPrice = activeCourt ? Math.round(activeCourt.price * (duration / 60)) : 0;

  const slots = SESSION_TIMES.map((slotTime) => {
    const needsDouble = duration > 90;
    const idx = SESSION_TIMES.indexOf(slotTime);
    let status = activeCourt ? mockSlotStatus(activeCourt.id, iso, slotTime) : "booked";
    if (needsDouble) {
      const next = SESSION_TIMES[idx + 1];
      if (!next) status = "booked";
      else if (activeCourt && mockSlotStatus(activeCourt.id, iso, next) !== "available") status = "booked";
    }
    const display = time === slotTime && status === "available" ? "selected" : status;
    return { time: slotTime, status: display, selectable: status === "available" };
  });

  const bookNow = () => {
    if (!time || !activeCourt) return;
    const selection = { locationId, courtId: activeCourt.id, dateIso: iso, time, duration };
    if (!signedIn) {
      setPendingSelection({ ...selection, dateIndex });
      router.push("/sign-in");
      return;
    }
    const booking = createHeldBooking(selection, dateIndex);
    router.push(`/booking/${booking.id}`);
  };

  return (
    <section
      id="booking"
      className="px-4 sm:px-14"
      style={{ padding: "clamp(44px,5.5vw,88px) clamp(18px,4vw,56px)", backgroundImage: "var(--wash)", scrollMarginTop: 64 }}
    >
      <div ref={inViewRef} data-reveal className={isIn ? "is-in" : ""} style={{ marginBottom: 34 }}>
        <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-terra">{t.book.eyebrow}</div>
        <h2
          className="text-[clamp(28px,3.6vw,44px)] font-semibold uppercase leading-[1.03] tracking-tight"
          style={{ fontFamily: "var(--font-fd)" }}
        >
          {t.book.title}
        </h2>
      </div>

      <div className="grid items-start gap-7" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))" }}>
        {/* Step 01 — Location */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-wider text-muted">
            <span data-step>01</span>
            {t.book.s1}
          </div>
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => pickLocation(loc.id)}
              data-sel={locationId === loc.id ? "1" : "0"}
              data-dim={loc.active ? "0" : "1"}
              className={stepButtonClass}
            >
              <span className="text-[15px] font-semibold">{loc.text[locale].city}</span>
              <span className="text-xs opacity-70">{loc.active ? loc.text[locale].address : loc.text[locale].state}</span>
            </button>
          ))}
        </div>

        {/* Step 02 — Court */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-wider text-muted">
            <span data-step>02</span>
            {t.book.s2}
          </div>
          {courtsForLocation.map((court) => (
            <button
              key={court.id}
              type="button"
              onClick={() => pickCourt(court.id)}
              data-sel={courtId === court.id ? "1" : "0"}
              className={`${stepButtonClass} flex-row items-center justify-between`}
            >
              <span className="text-[15px] font-semibold">{court.text[locale].name}</span>
              <span className="whitespace-nowrap text-[12.5px] opacity-75">{formatMoney(court.price, locale)}</span>
            </button>
          ))}
        </div>

        {/* Step 03 — Date */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-wider text-muted">
            <span data-step>03</span>
            {t.book.s3}
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(64px,1fr))" }}>
            {dates.map((d, i) => (
              <button
                key={i}
                type="button"
                onClick={() => pickDate(i)}
                data-sel={dateIndex === i ? "1" : "0"}
                className="flex cursor-pointer flex-col items-center gap-0.5 rounded-xl border border-line bg-surface px-1.5 py-3.5"
              >
                <span className="text-[10.5px] uppercase tracking-wider opacity-70">{dayOfWeekLabel(d, locale)}</span>
                <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-fd)" }}>
                  {localizeNumber(d.getDate(), locale)}
                </span>
                <span className="text-[10.5px] opacity-70">{monthLabel(d, locale)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 04 — Duration + Time */}
        <div className="col-span-full flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-wider text-muted">
            <span className="flex items-center gap-2.5">
              <span data-step>04</span>
              {t.book.s4}
            </span>
            <span className="whitespace-nowrap text-[10.5px] tracking-wide">{formatDuration(duration, locale)}</span>
          </div>
          <div className="flex max-w-[280px] gap-2">
            {SESSION_DURATIONS.map((d: SessionDuration) => (
              <button
                key={d}
                type="button"
                onClick={() => pickDuration(d)}
                data-sel={duration === d ? "1" : "0"}
                className="flex-1 cursor-pointer whitespace-nowrap rounded-full border border-line bg-surface px-1.5 py-3 text-[13.5px] font-semibold"
              >
                {formatDuration(d, locale)}
              </button>
            ))}
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(84px,1fr))" }}>
            {slots.map((slot) => (
              <button
                key={slot.time}
                type="button"
                onClick={() => slot.selectable && pickTime(slot.time)}
                data-status={slot.status}
                className="rounded-full border border-line bg-surface px-1 py-3.5 text-sm font-semibold tracking-wide tabular-nums"
              >
                {localizeNumber(slot.time, locale)}
              </button>
            ))}
          </div>
          <div className="mt-0.5 flex flex-wrap gap-4 text-[11px] uppercase tracking-wider text-muted">
            <span className="flex items-center gap-1.5">
              <span className="block h-[9px] w-[9px] border border-line bg-surface" />
              {t.book.legendFree}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="block h-[9px] w-[9px] bg-muted opacity-50" />
              {t.book.legendTaken}
            </span>
          </div>
        </div>
      </div>

      <div
        data-reveal
        className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-surface px-5 py-6 is-in sm:px-7"
        style={{ backgroundImage: "var(--panel)", boxShadow: "var(--shadow)" }}
      >
        <div className="flex flex-wrap gap-5 sm:gap-12">
          <div>
            <div className="mb-1.5 text-[10.5px] uppercase tracking-wider text-muted">{t.book.sumCourt}</div>
            <div className="whitespace-nowrap text-[17px] font-semibold" style={{ fontFamily: "var(--font-fd)" }}>
              {activeCourt ? activeCourt.text[locale].name : t.empty}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[10.5px] uppercase tracking-wider text-muted">{t.book.sumWhen}</div>
            <div className="whitespace-nowrap text-[17px] font-semibold" style={{ fontFamily: "var(--font-fd)" }}>
              {time ? `${dateLabel(activeDate, locale)} · ${localizeNumber(time, locale)}` : t.pickFirst}
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-[10.5px] uppercase tracking-wider text-muted">{t.book.sumTotal}</div>
            <div className="text-[17px] font-semibold" style={{ fontFamily: "var(--font-fd)" }}>
              {time ? formatMoney(sessionPrice, locale) : t.empty}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={bookNow}
          data-btn
          data-dim={time ? "0" : "1"}
          className="cursor-pointer whitespace-nowrap rounded-full border-none px-9 py-[18px] text-xs font-semibold uppercase tracking-[0.17em] text-coal"
          style={{ backgroundImage: "var(--cta)", boxShadow: "0 18px 40px -18px rgba(211,254,1,.8)" }}
        >
          {t.book.cta}
        </button>
      </div>
      <p className="mt-3.5 text-[12.5px] text-muted">{t.book.foot}</p>
    </section>
  );
}
