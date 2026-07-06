import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { FriendRankStructuredData } from "@/components/friend-rank-structured-data";
import { rootSiteMetadata } from "@/lib/seo/page-metadata";
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

export const metadata: Metadata = rootSiteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FriendRankStructuredData />
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
