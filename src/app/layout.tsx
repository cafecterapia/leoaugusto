import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { homeMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload the main font
});

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL("https://leonardoaugusto.com"),
  openGraph: {
    ...homeMetadata.openGraph,
    images: [
      {
        url: "/images/header-photo.png",
        alt: "Leonardo Augusto - Advogado e Mestre em Direito especializado em Direito Militar",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    ...homeMetadata.twitter,
    images: ["/images/header-photo.png"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/header-photo.png"
          fetchPriority="high"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
