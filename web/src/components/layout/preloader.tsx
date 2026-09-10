"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "../ui/logo-mark";
import { useLocale } from "@/lib/providers/locale-provider";
import { getMediaUrl } from "@/lib/media";
import { localizeNumber } from "@/lib/format";

const IMAGE_SOURCES = [getMediaUrl("hero.primary"), getMediaUrl("court.wide")];

export function Preloader() {
  const { t, locale } = useLocale();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [closing, setClosing] = useState(false);
  const targetRef = useRef(0);
  const startedRef = useRef(0);

  useEffect(() => {
    startedRef.current = Date.now();
    // ~35% of loads hold the full 15s "cinematic" preloader; the rest clear in ~2.6-4.4s.
    targetRef.current = Math.random() < 0.35 ? 15000 : 2600 + Math.random() * 1800;

    let loadedCount = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const settle = () => {
      if (loadedCount < IMAGE_SOURCES.length) return;
      const elapsed = Date.now() - startedRef.current;
      const wait = Math.max(0, targetRef.current - elapsed);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        setProgress(1);
        setClosing(true);
      }, wait);
    };

    IMAGE_SOURCES.forEach((src) => {
      const img = new Image();
      const finish = () => {
        loadedCount += 1;
        settle();
      };
      img.onload = finish;
      img.onerror = finish;
      img.src = src;
    });

    const progTick = setInterval(() => {
      const p = Math.min(1, (Date.now() - startedRef.current) / targetRef.current);
      setProgress(p);
      if (p >= 1) clearInterval(progTick);
    }, 90);

    const failsafe = setTimeout(() => setClosing(true), targetRef.current + 4000);

    return () => {
      clearInterval(progTick);
      clearTimeout(hideTimer);
      clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    if (!closing) return;
    const t = setTimeout(() => setLoading(false), 480);
    return () => clearTimeout(t);
  }, [closing]);

  if (!loading) return null;

  const pct = Math.round(progress * 100);

  return (
    <div
      data-pre
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-[#001C14] p-6 text-[#F1F6EF] transition-opacity duration-500 sm:p-11"
      style={{ opacity: closing ? 0 : 1, visibility: closing ? "hidden" : "visible" }}
    >
      <div
        aria-hidden
        className="absolute -inset-[6%] bg-cover opacity-50"
        style={{
          backgroundImage: `url(${getMediaUrl("court.close")})`,
          backgroundPosition: "center 45%",
          filter: "blur(26px) saturate(1.1)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 42%, rgba(0,28,20,.5) 0%, rgba(0,28,20,.92) 68%, #001C14 100%)",
        }}
      />
      <div
        data-prelight="a"
        aria-hidden
        className="absolute -inset-[20%]"
        style={{
          background:
            "radial-gradient(30% 34% at 24% 30%, rgba(211,254,1,.28) 0%, rgba(211,254,1,0) 70%), radial-gradient(26% 30% at 78% 22%, rgba(50,140,114,.34) 0%, rgba(50,140,114,0) 72%)",
        }}
      />
      <div
        data-prelight="b"
        aria-hidden
        className="absolute -inset-[20%]"
        style={{
          background:
            "radial-gradient(32% 36% at 72% 76%, rgba(0,141,90,.36) 0%, rgba(0,141,90,0) 72%), radial-gradient(24% 28% at 18% 84%, rgba(211,254,1,.18) 0%, rgba(211,254,1,0) 74%)",
        }}
      />
      <div className="relative flex max-w-[720px] flex-col items-center gap-5 text-center">
        <div data-rise className="flex items-center gap-3">
          <LogoMark size={34} />
          <span className="flex flex-col items-start text-start leading-none">
            <span className="text-[15px] font-bold uppercase tracking-[0.22em]">{t.brand}</span>
            <span className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-[#8FA79C]">
              {t.brandTag}
            </span>
          </span>
        </div>
        <div className="text-[11px] uppercase tracking-[0.24em] text-[#D3FE01]">{t.pre.eyebrow}</div>
        <div
          className="whitespace-pre-line text-[clamp(30px,5.4vw,68px)] font-bold uppercase leading-[0.96] tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-fd)" }}
        >
          {t.pre.line}
        </div>
        <div className="mt-1.5 flex w-full max-w-[360px] flex-col gap-3">
          <div className="h-[3px] overflow-hidden rounded-full bg-[#F1F6EF]/[.14]">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{ width: `${pct}%`, backgroundImage: "linear-gradient(90deg,#328C72,#D3FE01)" }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#8FA79C]">
            <span>{t.pre.loading}</span>
            <span className="tabular-nums">{localizeNumber(pct, locale)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
