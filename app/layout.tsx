import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const isProduction = process.env.NODE_ENV === "production";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Create a social ranking game for your group. Vote with friends, reveal the chaos, and share cinematic results everyone will want to screenshot.";

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_APP_URL),
  title: {
    default: "FriendRank — Discover your group's lore",
    template: "%s | FriendRank",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: PRODUCTION_APP_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "FriendRank — Discover your group's lore",
    description: SITE_DESCRIPTION,
    url: PRODUCTION_APP_URL,
    siteName: "FriendRank",
    type: "website",
    images: [
      {
        url: "/og/friendrank-og.png",
        width: 1200,
        height: 630,
        alt: "FriendRank — Discover your group's lore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FriendRank — Discover your group's lore",
    description: SITE_DESCRIPTION,
    images: ["/og/friendrank-og.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
        {isProduction && gaMeasurementId ? (
          <GoogleAnalytics gaId={gaMeasurementId} />
        ) : null}
      </body>
    </html>
  );
}
