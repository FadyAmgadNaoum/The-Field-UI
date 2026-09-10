"use client";

import Link from "next/link";
import { LogoMark } from "../ui/logo-mark";
import { useLocale } from "@/lib/providers/locale-provider";
import { useTheme } from "@/lib/providers/theme-provider";
import { useAuth } from "@/lib/providers/auth-provider";

export function Header() {
  const { t, dir, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const { signedIn, signOut } = useAuth();

  return (
    <header
      data-header
      className="sticky top-0 z-[60] grid grid-cols-[auto_1fr_auto] items-center gap-5 px-4 py-4 text-ink sm:px-8"
    >
      <Link href="/#top" className="flex flex-shrink-0 items-center gap-3 text-inherit">
        <LogoMark size={32} />
        <span data-wordmark className="whitespace-nowrap text-[15px] font-bold uppercase text-inherit">
          {t.brand}
        </span>
      </Link>

      <nav className="flex min-w-0 items-center justify-center gap-4 overflow-hidden whitespace-nowrap text-sm font-medium uppercase sm:gap-8">
        <Link data-navlink href="/#top" className="text-inherit">
          {t.nav.home}
        </Link>
        <Link data-navlink href="/#courts" className="text-inherit">
          {t.nav.courts}
        </Link>
        <Link data-navlink href="/#locations" className="text-inherit">
          {t.nav.locations}
        </Link>
        <Link data-navlink href="/#booking" className="text-inherit">
          {t.nav.booking}
        </Link>
      </nav>

      <div className="flex flex-shrink-0 items-center gap-2 whitespace-nowrap">
        <button
          type="button"
          onClick={toggleLocale}
          data-btn-sm
          className="cursor-pointer rounded-full border border-ink/28 bg-transparent px-3.5 py-2.5 text-[11px] tracking-wider text-inherit"
        >
          {t.langSwitch}
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          data-btn-sm
          className="cursor-pointer rounded-full border border-ink/28 bg-transparent px-3.5 py-2.5 text-[11px] tracking-wider text-inherit"
        >
          {theme === "dark" ? t.themeSwitchDark : t.themeSwitchLight}
        </button>
        {signedIn ? (
          <button
            type="button"
            onClick={signOut}
            data-btn-sm
            data-pill
            className="cursor-pointer whitespace-nowrap rounded-full border-none px-5 py-2.5 font-semibold text-coal"
            style={{ backgroundImage: "var(--cta)" }}
          >
            {t.signOut}
          </button>
        ) : (
          <Link
            href="/sign-in"
            data-btn-sm
            data-pill
            className="flex items-center gap-2 whitespace-nowrap rounded-full border-none px-5 py-2.5 font-semibold text-coal"
            style={{ backgroundImage: "var(--cta)" }}
          >
            {t.joinNow}
            <span className="text-sm leading-none" aria-hidden>
              {dir === "rtl" ? "←" : "→"}
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
