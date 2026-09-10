"use client";

import { useLocale } from "@/lib/providers/locale-provider";
import { useInView } from "@/lib/hooks/use-in-view";
import { getMediaUrl } from "@/lib/media";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span data-label className="text-[clamp(26px,3vw,34px)] text-ink">
        {value}
      </span>
      <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
    </div>
  );
}

export function MinimalBands() {
  const { t } = useLocale();
  const [rightRef, rightIn] = useInView<HTMLDivElement>();
  const [leftRef, leftIn] = useInView<HTMLDivElement>();

  return (
    <section className="flex flex-col gap-10 overflow-hidden py-12 sm:gap-24 sm:py-28">
      <div
        ref={rightRef}
        data-band-row="right"
        className={`grid items-center gap-5 ps-4 sm:gap-10 sm:ps-14 ${rightIn ? "is-in" : ""}`}
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))" }}
      >
        <div data-textin className="flex max-w-[42ch] flex-col gap-4">
          <div data-label className="text-[13px] uppercase tracking-wider text-terra">
            {t.min.l1}
          </div>
          <h3 className="text-[clamp(26px,3.4vw,44px)] leading-[1.08]">{t.min.h1}</h3>
          <p className="m-0 text-base leading-relaxed text-muted">{t.min.p1}</p>
          <div className="mt-2.5 flex flex-wrap gap-6 border-t border-line pt-5 sm:gap-11">
            <Stat value={t.min.s1v} label={t.min.s1k} />
            <Stat value={t.min.s2v} label={t.min.s2k} />
          </div>
        </div>
        <div
          data-band
          className="h-[clamp(240px,34vw,420px)] overflow-hidden rounded-e-none bg-raise ltr:rounded-l-2xl rtl:rounded-r-2xl"
        >
          <div
            data-drift="a"
            role="img"
            aria-label="Padel glass wall"
            className="h-full w-full bg-no-repeat"
            style={{ backgroundImage: `url(${getMediaUrl("band.glass")})`, backgroundSize: "250% auto", backgroundPosition: "98% 42%" }}
          />
        </div>
      </div>

      <div
        ref={leftRef}
        data-band-row="left"
        className={`grid items-center gap-5 pe-4 sm:gap-10 sm:pe-14 ${leftIn ? "is-in" : ""}`}
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))" }}
      >
        <div
          data-band
          className="h-[clamp(240px,34vw,420px)] overflow-hidden bg-raise ltr:rounded-r-2xl rtl:rounded-l-2xl"
        >
          <div
            data-drift="b"
            role="img"
            aria-label="Padel court surface"
            className="h-full w-full bg-no-repeat"
            style={{ backgroundImage: `url(${getMediaUrl("band.surface")})`, backgroundSize: "400% auto", backgroundPosition: "58% 96%" }}
          />
        </div>
        <div data-textin className="flex max-w-[42ch] flex-col gap-4 justify-self-end">
          <div data-label className="text-[13px] uppercase tracking-wider text-terra">
            {t.min.l2}
          </div>
          <h3 className="text-[clamp(26px,3.4vw,44px)] leading-[1.08]">{t.min.h2}</h3>
          <p className="m-0 text-base leading-relaxed text-muted">{t.min.p2}</p>
          <div className="mt-2.5 flex flex-wrap gap-6 border-t border-line pt-5 sm:gap-11">
            <Stat value={t.min.s3v} label={t.min.s3k} />
            <Stat value={t.min.s4v} label={t.min.s4k} />
          </div>
        </div>
      </div>
    </section>
  );
}
