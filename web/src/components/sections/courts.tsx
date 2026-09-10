"use client";

import { useLocale } from "@/lib/providers/locale-provider";
import { useInView } from "@/lib/hooks/use-in-view";
import { COURTS } from "@/lib/data/courts";
import { LOCATIONS } from "@/lib/data/locations";
import { getMediaUrl } from "@/lib/media";
import { formatMoney } from "@/lib/format";
import { useBookingSelection } from "@/lib/providers/booking-selection-provider";

function CourtCard({ court }: { court: (typeof COURTS)[number] }) {
  const { locale, t } = useLocale();
  const [inViewRef, isIn] = useInView<HTMLElement>();
  const { pickCourt } = useBookingSelection();
  const text = court.text[locale];
  const location = LOCATIONS.find((l) => l.id === court.locationId);

  return (
    <article
      ref={inViewRef}
      data-reveal
      className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-bg ${isIn ? "is-in" : ""}`}
      style={{ backgroundImage: "var(--panel)" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <div
          role="img"
          aria-label={text.name}
          className="h-full w-full bg-raise bg-no-repeat"
          style={{ backgroundImage: `url(${getMediaUrl(court.cover.key)})`, backgroundSize: court.cover.size, backgroundPosition: court.cover.position }}
        />
        <span className="absolute top-3 rounded-full bg-[#0e0d10]/82 px-2.5 py-1.5 text-[10.5px] uppercase tracking-wider text-[#F1F6EF] backdrop-blur-sm ltr:left-3 rtl:right-3">
          {locale === "ar" ? "متاح" : "Active"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3.5" style={{ padding: 22 }}>
        <div className="flex items-start justify-between gap-3.5">
          <div>
            <h3 className="mb-1 text-xl font-semibold tracking-wide">{text.name}</h3>
            <div className="text-xs uppercase tracking-wider text-muted">{location?.text[locale].city}</div>
          </div>
          <div className="whitespace-nowrap text-end">
            <div className="text-[19px] font-semibold" style={{ fontFamily: "var(--font-fd)" }}>
              {formatMoney(court.price, locale)}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-muted">{t.courts.perHour}</div>
          </div>
        </div>
        <p className="m-0 text-[14.5px] text-muted">{text.description}</p>
        <div className="flex flex-wrap items-start gap-1.5">
          {text.amenities.map((amenity) => (
            <span
              key={amenity}
              className="whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted"
              style={{ backgroundImage: "var(--panel)" }}
            >
              {amenity}
            </span>
          ))}
        </div>
        <div className="mt-auto flex gap-3.5 pt-2">
          <a
            href="#booking"
            onClick={() => pickCourt(court.id)}
            className="border-b border-terra pb-0.5 text-[11.5px] font-semibold uppercase tracking-wider text-terra"
          >
            {t.courts.book}
          </a>
        </div>
      </div>
    </article>
  );
}

export function Courts() {
  const { t } = useLocale();
  const [inViewRef, isIn] = useInView<HTMLDivElement>();
  const assiutCourts = COURTS.filter((c) => c.locationId === "assiut");

  return (
    <section
      id="courts"
      className="px-4 sm:px-14"
      style={{ padding: "clamp(44px,5.5vw,88px) clamp(18px,4vw,56px)", backgroundImage: "var(--wash)", scrollMarginTop: 64 }}
    >
      <div
        ref={inViewRef}
        data-reveal
        className={`flex flex-wrap items-end justify-between gap-5 ${isIn ? "is-in" : ""}`}
        style={{ marginBottom: 34 }}
      >
        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-terra">{t.courts.eyebrow}</div>
          <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold uppercase leading-[1.03] tracking-tight" style={{ fontFamily: "var(--font-fd)" }}>
            {t.courts.title}
          </h2>
        </div>
        <p className="m-0 max-w-[38ch] text-[15px] text-muted">{t.courts.note}</p>
      </div>
      <div className="grid gap-4 sm:gap-6" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))" }}>
        {assiutCourts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </section>
  );
}
