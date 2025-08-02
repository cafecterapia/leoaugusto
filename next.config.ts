import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap", "lenis"],
    optimizeCss: true, // Enable CSS optimization
    serverMinification: true, // Enable server code minification
    serverSourceMaps: false, // Disable in production for smaller bundles
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false,
  },

  // Compression
  compress: true,

  // Remove console.logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Output configuration for Vercel Edge Runtime compatibility
  output: "standalone", // Optimize for serverless/edge deployment
};
