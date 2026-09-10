"use client";

import { useLocale } from "@/lib/providers/locale-provider";
import { useInView } from "@/lib/hooks/use-in-view";
import { LOCATIONS } from "@/lib/data/locations";
import { getMediaUrl } from "@/lib/media";
import { localizeNumber } from "@/lib/format";

export function Locations() {
  const { t, locale } = useLocale();
  const [inViewRef, isIn] = useInView<HTMLDivElement>();

  return (
    <section
      id="locations"
      className="grid"
      style={{ scrollMarginTop: 64, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))" }}
    >
      <div
        ref={inViewRef}
        data-reveal
        className={`flex flex-col gap-[26px] px-4 sm:px-14 ${isIn ? "is-in" : ""}`}
        style={{ padding: "clamp(40px,5vw,80px) clamp(18px,4vw,56px)" }}
      >
        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-terra">{t.loc.eyebrow}</div>
          <h2
            className="text-[clamp(28px,3.4vw,42px)] font-semibold uppercase leading-[1.03] tracking-tight"
            style={{ fontFamily: "var(--font-fd)" }}
          >
            {t.loc.title}
          </h2>
        </div>
        <div className="flex flex-col">
          {LOCATIONS.map((loc) => {
            const text = loc.text[locale];
            return (
              <div key={loc.id} className="flex items-baseline justify-between gap-4 border-t border-line py-5">
                <div>
                  <div className="text-[22px] font-semibold" style={{ fontFamily: "var(--font-fd)" }}>
                    {text.city}
                  </div>
                  <div className="mt-1 text-[13px] text-muted">{text.address}</div>
                </div>
                <div className="whitespace-nowrap text-end">
                  <div className="text-[11px] uppercase tracking-wider text-terra">{text.state}</div>
                  <div className="mt-1 text-xs text-muted">
                    {localizeNumber(loc.courtCount, locale)} {t.nav.courts}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative min-h-[340px] overflow-hidden">
        <div
          data-zoom="out"
          role="img"
          aria-label="Padel court"
          className="absolute inset-0 bg-no-repeat bg-[#00140E]"
          style={{ backgroundImage: `url(${getMediaUrl("locations.panel")})`, backgroundSize: "240% auto", backgroundPosition: "100% 45%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg,var(--bg) 0%,rgba(0,28,20,.45) 34%,rgba(0,28,20,0) 72%)" }}
        />
      </div>
    </section>
  );
}
