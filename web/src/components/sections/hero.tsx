"use client";

import { useLocale } from "@/lib/providers/locale-provider";
import { getMediaUrl } from "@/lib/media";

export function Hero() {
  const { t } = useLocale();

  return (
    <section
      className="relative grid overflow-hidden bg-[#0b1c2a]"
      style={{ height: "auto", minHeight: "100svh", marginTop: "calc(-1 * var(--hdr, 74px))" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          data-zoom="in"
          role="img"
          aria-label="THE FIELD — padel player striking a forehand"
          className="absolute -inset-[3%] bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${getMediaUrl("hero.primary")})`, backgroundPosition: "center 42%" }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(0,20,14,0) 0%,rgba(0,20,14,0) 55%,rgba(0,20,14,.55) 82%,var(--bg) 100%)",
        }}
      />
      <h1 className="absolute h-px w-px overflow-hidden [clip-path:inset(50%)]">
        {t.brand} — {t.hero.tag}
      </h1>
      <div
        className="relative flex flex-wrap items-center justify-center gap-3.5"
        style={{
          alignSelf: "end",
          padding: "clamp(120px,28svh,300px) clamp(20px,5vw,64px) clamp(30px,6svh,72px)",
        }}
      >
        <a
          href="#booking"
          data-btn
          data-rise
          style={{
            animationDelay: ".5s",
            backgroundImage: "var(--cta)",
            boxShadow: "0 20px 46px -18px rgba(211,254,1,.6)",
          }}
          className="whitespace-nowrap rounded-full px-[38px] py-[18px] font-semibold uppercase text-coal"
        >
          {t.hero.cta1}
        </a>
        <a
          href="#courts"
          data-btn
          data-hero-cta2
          data-rise
          style={{ animationDelay: ".62s" }}
          className="whitespace-nowrap rounded-full border border-[#F1F6EF]/40 bg-[#0b1c2a]/42 px-[38px] py-[18px] font-semibold uppercase text-[#F1F6EF] backdrop-blur-sm"
        >
          {t.hero.cta2}
        </a>
      </div>
    </section>
  );
}
