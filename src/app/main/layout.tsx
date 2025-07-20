import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactLenis } from "lenis/react";
import { defaultMetadata } from "@/og-simple/metadata";

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

        {/* Critical image preloads */}
        <link
          rel="preload"
          as="image"
          href="/api/hero-image?name=lfam.avif"
          fetchPriority="high"
        />
        <link rel="preload" as="image" href="/la.avif" fetchPriority="high" />
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
            <Header />
            {children}
            <Footer />
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
