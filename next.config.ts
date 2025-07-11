import type { NextConfig } from "next";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
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

  // Bundle analyzer (optional)
  ...(process.env.ANALYZE === "true" && {
    webpack: (config: Configuration) => {
      config.plugins?.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
        })
      );
      return config;
    },
  }),
};

export default nextConfig;
