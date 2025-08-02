import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactLenis } from "lenis/react";
import { defaultMetadata } from "@/og-simple/metadata";
import "./globals.css";

// Script to disable scroll restoration and ensure top position on reload
const scrollRestorationScript = `
  if (typeof window !== 'undefined') {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top immediately on page load
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Prevent any scroll restoration during page load
    const preventScroll = (e) => {
      window.scrollTo(0, 0);
    };
    
    // Listen for scroll events during initial load and force to top
    window.addEventListener('scroll', preventScroll, { passive: false });
    
    // Remove the scroll prevention after DOM is ready
    const removeScrollPrevention = () => {
      window.removeEventListener('scroll', preventScroll);
    };
    
    // Use both DOMContentLoaded and a short timeout as fallback
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', removeScrollPrevention);
    } else {
      setTimeout(removeScrollPrevention, 100);
    }
  }
`;

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
    <html lang="en" suppressHydrationWarning className={geistSans.variable}>
      <head>
        {/* Scroll restoration script - must run before any other scripts */}
        <script dangerouslySetInnerHTML={{ __html: scrollRestorationScript }} />
        {/* Resource hints for external resources */}
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
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
              // Ensure smooth scrolling doesn't interfere with manual scroll restoration
              infinite: false,
            }}
          >
            <ConditionalLayout>{children}</ConditionalLayout>
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
