"use client";

import { LogoMark } from "../ui/logo-mark";
import { useLocale } from "@/lib/providers/locale-provider";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] items-start gap-7 px-4 py-10 sm:px-8 sm:py-14"
      style={{ backgroundImage: "linear-gradient(180deg, rgba(211,254,1,.06), rgba(211,254,1,0))" }}
    >
      <div>
        <div className="mb-3.5 flex items-center gap-3">
          <LogoMark size={30} />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold uppercase tracking-[0.22em]">{t.brand}</span>
            <span className="mt-1.5 text-[9px] uppercase tracking-[0.3em] text-muted">{t.brandTag}</span>
          </span>
        </div>
        <p className="m-0 max-w-[30ch] text-[13.5px] text-muted">{t.footer.blurb}</p>
      </div>
      <div className="flex flex-col gap-2 text-[13px] text-muted">
        <span className="text-[10.5px] uppercase tracking-wider text-ink">{t.footer.visit}</span>
        <span>{t.footer.addr1}</span>
        <span>{t.footer.addr2}</span>
      </div>
      <div className="flex flex-col gap-2 text-[13px] text-muted">
        <span className="text-[10.5px] uppercase tracking-wider text-ink">{t.footer.contact}</span>
        <span>{t.footer.phone}</span>
        <span>{t.footer.email}</span>
      </div>
      <div className="flex flex-col gap-2 text-[13px] text-muted">
        <span className="text-[10.5px] uppercase tracking-wider text-ink">{t.footer.hours}</span>
        <span>{t.footer.hoursVal}</span>
        <span className="mt-2 text-xs">{t.footer.rights}</span>
      </div>
    </footer>
  );
}
