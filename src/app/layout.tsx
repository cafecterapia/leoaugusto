import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload the main font
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
        <link
          rel="preload"
          as="image"
          href="/api/hero-image?name=lfam.avif"
          fetchPriority="high"
        />
        <link rel="preload" as="image" href="/la.avif" fetchPriority="high" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.add('theme-loading');
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                  // Remove theme-loading class immediately to prevent flashing
                  document.documentElement.classList.remove('theme-loading');
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Scroll restoration scripts temporarily removed for testing */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
