"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/providers/locale-provider";
import { useIsClient } from "@/lib/hooks/use-is-client";
import { getBooking, updateBooking } from "@/lib/booking/mock-booking-store";
import { COURTS } from "@/lib/data/courts";
import { LOCATIONS } from "@/lib/data/locations";
import { PAYMENT_METHODS, SUPPORT_WHATSAPP_NUMBER } from "@/lib/data/payment-methods";
import { dateLabel, formatDuration, formatMoney, localizeNumber } from "@/lib/format";

export default function CheckoutPage(props: PageProps<"/booking/[bookingId]">) {
  const { bookingId } = use(props.params);
  const { t, locale } = useLocale();
  const router = useRouter();
  const isClient = useIsClient();
  const [receiptAttached, setReceiptAttached] = useState(false);
  const [method, setMethod] = useState("instapay");
  const [now, setNow] = useState(() => Date.now());
  // Bumping this forces a render after submitPayment writes a status
  // change to localStorage; `booking` itself is re-read fresh below.
  const [, setVersion] = useState(0);

  const booking = isClient ? getBooking(bookingId) : null;

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(tick);
  }, []);

  const court = booking ? COURTS.find((c) => c.id === booking.courtId) : undefined;
  const location = booking ? LOCATIONS.find((l) => l.id === booking.locationId) : undefined;
  const activeMethod = PAYMENT_METHODS.find((m) => m.id === method) ?? PAYMENT_METHODS[0];

  const holdLeftSeconds = booking ? Math.max(0, Math.ceil((booking.heldUntil - now) / 1000)) : 0;
  const holdActive = !!booking && booking.status !== "PAYMENT_SUBMITTED" && holdLeftSeconds > 0;
  const holdLabel = useMemo(() => {
    const m = Math.floor(holdLeftSeconds / 60);
    const s = holdLeftSeconds % 60;
    return `${localizeNumber(m, locale)}:${localizeNumber(String(s).padStart(2, "0"), locale)}`;
  }, [holdLeftSeconds, locale]);

  if (!isClient) return null;
  if (!booking || !court || !location) {
    return (
      <main className="grid min-h-[60vh] place-items-center px-5 py-16 text-center text-muted">
        <p>{t.empty}</p>
      </main>
    );
  }

  const rows = [
    { k: t.co.rRef, v: booking.ref },
    { k: t.co.rCourt, v: court.text[locale].name },
    { k: t.co.rLoc, v: location.text[locale].city },
    { k: t.co.rDate, v: dateLabel(new Date(booking.dateIso), locale) },
    { k: t.co.rTime, v: localizeNumber(booking.time, locale) },
    { k: t.co.rDur, v: formatDuration(booking.duration, locale) },
  ];

  const submitPayment = () => {
    if (!receiptAttached) return;
    const lines = [
      `${t.brand} — ${t.co.rRef}: ${booking.ref}`,
      `${t.co.rCourt}: ${court.text[locale].name}`,
      `${t.co.rLoc}: ${location.text[locale].city}`,
      `${t.co.rDate}: ${dateLabel(new Date(booking.dateIso), locale)} · ${localizeNumber(booking.time, locale)}`,
      `${t.co.rDur}: ${formatDuration(booking.duration, locale)}`,
      `${t.co.total}: ${formatMoney(booking.price, locale)}`,
      `${t.co.pMethod}: ${activeMethod[locale]}`,
    ];
    window.open(
      `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener",
    );
    updateBooking(booking.id, { status: "PAYMENT_SUBMITTED", method, receiptAttached: true });
    setVersion((v) => v + 1);
  };

  const submitted = booking.status === "PAYMENT_SUBMITTED";

  return (
    <main className="mx-auto grid max-w-[1180px] gap-6 px-4 py-10 sm:px-14 sm:py-14" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))" }}>
      <div className="flex flex-col gap-5">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted">/booking/{booking.id}</div>
          <h2
            className="mt-2 text-[clamp(26px,3.2vw,38px)] font-semibold uppercase tracking-tight"
            style={{ fontFamily: "var(--font-fd)" }}
          >
            {t.co.title}
          </h2>
        </div>

        <div
          data-rise
          className="rounded-2xl border border-line bg-surface pb-1"
          style={{ backgroundImage: "var(--panel)", boxShadow: "var(--shadow)", animationDelay: ".08s" }}
        >
          <div className="flex items-center justify-between gap-3.5 border-b border-line px-5 py-4">
            <span className="text-[11px] uppercase tracking-wider text-muted">{t.co.status}</span>
            <span className="text-[13px] font-semibold tracking-wider text-terra" style={{ fontFamily: "var(--font-fd)" }}>
              {submitted ? "PAYMENT_SUBMITTED" : booking.status}
            </span>
          </div>
          {rows.map((row) => (
            <div key={row.k} className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-3.5">
              <span className="text-[11px] uppercase tracking-wider text-muted">{row.k}</span>
              <span className="whitespace-nowrap text-end text-[15.5px] font-medium">{row.v}</span>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 px-5 py-[18px]">
            <span className="text-[11px] uppercase tracking-wider text-muted">{t.co.total}</span>
            <span className="whitespace-nowrap text-2xl font-bold" style={{ fontFamily: "var(--font-fd)" }}>
              {formatMoney(booking.price, locale)}
            </span>
          </div>
        </div>

        {holdActive && (
          <div className="flex items-center justify-between gap-3.5 rounded-full border border-terra px-5 py-3.5">
            <span className="whitespace-nowrap text-[12.5px] text-muted">{t.co.hold}</span>
            <span className="text-[19px] font-semibold tabular-nums text-terra" style={{ fontFamily: "var(--font-fd)" }}>
              {holdLabel}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => router.push("/")}
          className="cursor-pointer self-start whitespace-nowrap border-none bg-transparent text-xs uppercase tracking-wider text-muted"
        >
          {t.co.back}
        </button>
      </div>

      {!submitted ? (
        <div className="flex flex-col gap-[18px]">
          <div
            className="flex flex-col gap-4 rounded-2xl border border-line p-6"
            style={{ backgroundImage: "var(--panel)" }}
          >
            <h3 className="text-[19px] font-semibold uppercase tracking-wide" style={{ fontFamily: "var(--font-fd)" }}>
              {t.co.payTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  data-sel={method === m.id ? "1" : "0"}
                  className="cursor-pointer whitespace-nowrap rounded-full border border-line bg-surface px-[18px] py-2.5 text-[13.5px] font-semibold"
                  style={{ backgroundImage: "var(--panel)" }}
                >
                  {m[locale]}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { k: t.co.pMethod, v: activeMethod[locale] },
                { k: t.co.pSendTo, v: /^[0-9+ ]+$/.test(activeMethod.handle) ? localizeNumber(activeMethod.handle, locale) : activeMethod.handle },
                { k: t.co.pName, v: "The Field Padel" },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-3.5 border-b border-line pb-2.5">
                  <span className="text-[11px] uppercase tracking-wider text-muted">{row.k}</span>
                  <span className="whitespace-nowrap text-[15px] font-medium tabular-nums">{row.v}</span>
                </div>
              ))}
            </div>
            <p className="m-0 text-[13.5px] text-muted">{t.co.payNote}</p>
          </div>

          <div
            className="flex flex-col gap-3.5 rounded-2xl border border-line p-6"
            style={{ backgroundImage: "var(--panel)" }}
          >
            <h3 className="text-[19px] font-semibold uppercase tracking-wide" style={{ fontFamily: "var(--font-fd)" }}>
              {t.co.upTitle}
            </h3>
            <button
              type="button"
              onClick={() => setReceiptAttached(true)}
              className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border border-dashed border-line bg-surface px-[18px] py-8"
              style={{ backgroundImage: "var(--panel)" }}
            >
              <span className="text-[13.5px] font-medium">{receiptAttached ? t.receiptSet : t.receiptNone}</span>
              <span className="text-[11.5px] text-muted">{t.co.upHint}</span>
            </button>
            <button
              type="button"
              onClick={submitPayment}
              data-btn
              data-dim={receiptAttached ? "0" : "1"}
              className="cursor-pointer rounded-full border-none py-4 text-xs font-semibold uppercase tracking-[0.16em] text-coal"
              style={{ backgroundImage: "var(--cta)" }}
            >
              {t.co.submit}
            </button>
            <p className="m-0 text-center text-xs text-muted">{t.co.whatsapp}</p>
          </div>
        </div>
      ) : (
        <div
          data-rise
          className="flex h-fit flex-col gap-3.5 rounded-2xl border border-ok p-8"
          style={{ backgroundImage: "var(--panel)" }}
        >
          <span className="block h-3 w-3 bg-ok" />
          <h3 className="text-2xl font-semibold uppercase tracking-tight" style={{ fontFamily: "var(--font-fd)" }}>
            {t.co.doneTitle}
          </h3>
          <p className="m-0 text-[15px] text-muted">{t.co.doneBody}</p>
          <div className="flex flex-col gap-2 border-t border-line pt-3 text-[13.5px] text-muted">
            <span>
              {t.co.doneRef} {booking.ref}
            </span>
            <span>{t.co.doneNext}</span>
          </div>
        </div>
      )}
    </main>
  );
}
