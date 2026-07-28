import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Sans, Public_Sans } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import JsonLd from "@/components/json-ld";
import TawkTitleGuard from "@/components/tawk-title-guard";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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
  title: "SongGlow - Electronic Components Sourcing & BOM Fulfillment",
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
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description: SITE_DESCRIPTION,
  sameAs: ["https://www.linkedin.com/company/songglow"],
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
        <Analytics />
        {/* Tawk.to live chat. IDs are public (visible client-side on any
            Tawk site). lazyOnload keeps it off the critical path. */}
        <Script
          id="tawk-to"
          src="https://embed.tawk.to/6a64d3a185c9821d4774c059/1juctlcm5"
          strategy="lazyOnload"
        />
        <TawkTitleGuard />
      </body>
    </html>
  );
}
