import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "AniList Dashboard - Your Anime Statistics & Analytics",
    template: "%s | AniList Dashboard"
  },
  description: "Beautiful, comprehensive dashboard for your AniList anime statistics. Track watch time, view activity heatmaps, analyze genres, studios, and discover personalized anime recommendations.",
  keywords: [
    "AniList",
    "anime dashboard",
    "anime statistics",
    "anime tracker",
    "anime analytics",
    "AniList stats",
    "anime watch time",
    "anime recommendations",
    "MyAnimeList alternative",
    "anime list manager",
    "anime activity tracker",
    "anime heatmap",
    "anime genres",
    "anime studios",
    "seasonal anime"
  ],
  authors: [{ name: "AniList Dashboard" }],
  creator: "AniList Dashboard",
  publisher: "AniList Dashboard",
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AniList Dashboard - Your Anime Statistics & Analytics",
    description: "Beautiful, comprehensive dashboard for your AniList anime statistics. Track watch time, view activity heatmaps, analyze genres, studios, and discover personalized anime recommendations.",
    siteName: "AniList Dashboard",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AniList Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AniList Dashboard - Your Anime Statistics & Analytics",
    description: "Beautiful, comprehensive dashboard for your AniList anime statistics. Track watch time, view activity heatmaps, analyze genres, studios, and discover personalized recommendations.",
    images: ["/og-image.png"],
    creator: "@anilist",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
