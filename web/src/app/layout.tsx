import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/lib/providers/app-providers";
import { Header } from "@/components/layout/header";
import { Preloader } from "@/components/layout/preloader";
import { AuroraBackground } from "@/components/layout/aurora-background";
import { PointerGlow } from "@/components/layout/pointer-glow";

export const metadata: Metadata = {
  title: "The Field — Padel courts, Assiut",
  description: "THE FIELD is a padel-only court booking platform. Pick a court, pick an hour, and the slot is yours.",
};

// Applies the persisted theme/locale before paint so there is no
// light-mode / LTR flash for returning visitors.
const NO_FLASH_SCRIPT = `
(function () {
  try {
    var theme = localStorage.getItem('tf:theme');
    var locale = localStorage.getItem('tf:locale');
    var root = document.documentElement;
    if (theme === 'dark' || theme === 'light') root.setAttribute('data-theme', theme);
    if (locale === 'ar') { root.setAttribute('lang', 'ar'); root.setAttribute('dir', 'rtl'); }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Loaded as a stylesheet (not next/font) so the exact family set matches the
            prototype without a build-time Google Fonts fetch; applies site-wide via the root layout. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter+Tight:wght@400;500;600;700&family=Tajawal:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>
        <AppProviders>
          <div id="page-root" className="min-h-screen">
            <Preloader />
            <AuroraBackground />
            <PointerGlow />
            <Header />
            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
