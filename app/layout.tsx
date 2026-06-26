import type { Metadata } from "next";
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
    default: "FriendRank",
    template: "%s | FriendRank",
  },
  description: "Create your game. Vote. Reveal the chaos.",
  openGraph: {
    url: PRODUCTION_APP_URL,
    siteName: "FriendRank",
    type: "website",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
