import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/constants/site";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f382c",
};

export const metadata: Metadata = {
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: "Ultra-luxury beauty, electronics and fashion. Beyond ordinary.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
