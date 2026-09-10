"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/providers/locale-provider";
import { useAuth } from "@/lib/providers/auth-provider";
import { takePendingSelection } from "@/lib/booking/pending-selection";
import { createHeldBooking } from "@/lib/booking/mock-booking-store";

export default function SignInPage() {
  const { t } = useLocale();
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doSignIn = (e: FormEvent) => {
    e.preventDefault();
    signIn(email || "player@thefield.eg");

    const pending = takePendingSelection();
    if (pending) {
      const booking = createHeldBooking(pending, pending.dateIndex);
      router.push(`/booking/${booking.id}`);
      return;
    }
    router.push("/");
  };

  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-16">
      <form
        onSubmit={doSignIn}
        data-rise
        className="w-full max-w-[420px] rounded-2xl border border-line bg-surface p-8"
        style={{ backgroundImage: "var(--panel)", boxShadow: "var(--shadow)" }}
      >
        <div className="mb-2.5 text-[11px] uppercase tracking-[0.22em] text-terra">{t.auth.eyebrow}</div>
        <h2
          className="mb-1.5 text-[28px] font-semibold uppercase tracking-tight"
          style={{ fontFamily: "var(--font-fd)" }}
        >
          {t.auth.title}
        </h2>
        <p className="mb-6 text-sm text-muted">{t.auth.sub}</p>
        <div className="flex flex-col gap-3.5">
          <label className="flex flex-col gap-1.5 text-[11px] uppercase tracking-wider text-muted">
            {t.auth.email}
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-line bg-bg px-4 py-3.5 text-[15px] tracking-normal text-ink"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-[11px] uppercase tracking-wider text-muted">
            {t.auth.password}
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-line bg-bg px-4 py-3.5 text-[15px] tracking-normal text-ink"
            />
          </label>
          <button
            type="submit"
            data-btn
            className="mt-1.5 cursor-pointer rounded-full border-none py-4 text-xs font-semibold uppercase tracking-[0.16em] text-coal"
            style={{ backgroundImage: "var(--cta)" }}
          >
            {t.auth.cta}
          </button>
          <button
            type="button"
            onClick={() => router.push("/#booking")}
            className="cursor-pointer border-none bg-transparent text-xs tracking-wider text-muted"
          >
            {t.auth.back}
          </button>
        </div>
      </form>
    </main>
  );
}
