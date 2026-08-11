import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Sans, Public_Sans } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import JsonLd from "@/components/json-ld";
import TawkTitleGuard from "@/components/tawk-title-guard";
import InquiryAttribution from "@/components/inquiry-attribution";
import TawkChat from "@/components/tawk-chat";
import {
  SITE_BRAND_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Electronic Component Sourcing & BOM Fulfillment | SongGlow",
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 2400,
        height: 1260,
        alt: "SongGlow - electronic component sourcing and BOM fulfillment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: SITE_BRAND_IMAGE,
    width: 2400,
    height: 1260,
  },
  description: SITE_DESCRIPTION,
  foundingDate: "2026",
  sameAs: ["https://www.linkedin.com/company/songglow"],
  // Offices across the Shenzhen / Hong Kong sourcing corridor.
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Futian District",
      addressLocality: "Shenzhen",
      addressRegion: "Guangdong",
      addressCountry: "CN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Longhua District",
      addressLocality: "Shenzhen",
      addressRegion: "Guangdong",
      addressCountry: "CN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Tuen Mun",
      addressLocality: "Hong Kong",
      addressRegion: "Hong Kong",
      addressCountry: "HK",
    },
  ],
  areaServed: "Worldwide",
  // Topical signals: what AI assistants should associate SongGlow with.
  knowsAbout: [
    "Electronic component sourcing",
    "Semiconductor procurement",
    "Bill of materials (BOM) fulfillment",
    "Obsolete and end-of-life components",
    "Capacitor sourcing",
    "Electronic component quote comparison",
    "Supplier documentation coordination",
    "Visual packaging receiving checks",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${SITE_URL}/contact`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${publicSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <JsonLd data={organizationSchema} />
        <SiteNav />
        {children}
        <SiteFooter />
        <InquiryAttribution />
        <Analytics />
        <TawkChat />
        <TawkTitleGuard />
      </body>
    </html>
  );
}
