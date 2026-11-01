import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-display", axes: ["opsz", "SOFT"] });
const sans = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — efficiovirtual" },
  description: site.description,
  applicationName: "efficiovirtual",
  openGraph: { siteName: "efficiovirtual", type: "website", locale: "en" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  // Search Console / Bing verification codes (set them in lib/site.ts or as environment variables)
  verification: {
    google: site.googleSiteVerification || undefined,
    other: site.bingSiteVerification ? { "msvalidate.01": site.bingSiteVerification } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#5d0755",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-sm focus:text-plum-950"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
