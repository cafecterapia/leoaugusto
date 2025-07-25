import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactLenis } from "lenis/react";
import { defaultMetadata } from "@/og-simple/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = defaultMetadata;

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
        {/* Resource hints for external resources */}
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactLenis
            root
            options={{
              autoRaf: true,
              lerp: 0.07,
              wheelMultiplier: 0.8,
              touchMultiplier: 0.8,
              smoothWheel: true,
              syncTouch: false,
            }}
          >
            <ConditionalLayout>{children}</ConditionalLayout>
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
