import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito, Caveat } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/chrome/NavBar";
import { Footer } from "@/components/chrome/Footer";
import { AUTHOR } from "@/content/author";

/* Three families, strict jobs.
   Baloo 2  — display, h1/h2, giant numerals only.
   Nunito   — every word a parent actually reads. 18px floor.
   Caveat   — author's name, pull quotes, hand-drawn labels. 28px floor. */

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // TODO(deploy): point at the real origin so OG/Twitter images resolve absolutely.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4310"),
  title: {
    default: `${AUTHOR.name} — ${AUTHOR.role}`,
    template: `%s · ${AUTHOR.name}`,
  },
  description: AUTHOR.tagline,
  openGraph: {
    title: `${AUTHOR.name} — ${AUTHOR.role}`,
    description: AUTHOR.tagline,
    type: "website",
    images: [{ url: "/cover.jpg", width: 1500, height: 1141, alt: "UNPLUG! book cover" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F9DE55",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${nunito.variable} ${caveat.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:border-3 focus:border-ink-navy focus:bg-cream focus:px-6 focus:py-3 focus:text-body focus:font-black"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
