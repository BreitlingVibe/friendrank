import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(PRODUCTION_APP_URL),
  title: {
    default: "FriendRank — Discover your group's lore",
    template: "%s | FriendRank",
  },
  description:
    "Create a social ranking game for your group. Vote, reveal the chaos, and share cinematic results.",
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
    description:
      "Create a social ranking game for your group. Vote, reveal the chaos, and share cinematic results.",
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
    description:
      "Create a social ranking game for your group. Vote, reveal the chaos, and share cinematic results.",
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
      </body>
    </html>
  );
}
