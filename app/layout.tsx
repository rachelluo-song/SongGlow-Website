import type { Metadata } from "next";
import { Lora, Public_Sans } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "SongGlow — Electronic Components Sourcing & BOM Fulfillment",
  description:
    "SongGlow supplies electronic components and semiconductors with full supply-chain traceability — sourcing, procurement, logistics and inventory management for OEM and EMS teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${publicSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
