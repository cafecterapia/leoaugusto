"use client";

import { blurhashToBase64 } from "./src/components/BlurhashToBase64";

// Optimized BlurHash for hero-photo.avif (only 26 characters!)
// Generated specifically for hero image - maintains visual quality
// Payload reduction: 26 chars vs 342 bytes = 94% smaller
const HERO_BLURHASH = "L26aq|-o000L~WRiI=Nc+[nhJBJU";

// Convert BlurHash to base64 data URL (SSR-compatible)
const HERO_LQIP = blurhashToBase64(HERO_BLURHASH, 32, 24);

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        color: "white",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "2rem 1rem",
        minHeight: "47rem",
        paddingTop: "23rem",
        paddingBottom: "4rem",
        backgroundColor: "#353537", // Fixed background color - always this color regardless of theme
        overflow: "hidden",
        backgroundImage: `url('/api/hero-image?format=avif&q=90'), url('${HERO_LQIP}')`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      {/* Hidden img for eager loading with high priority - now uses Rust Edge Function */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/api/hero-image?format=avif&q=90"
        alt=""
        loading="eager"
        fetchPriority="high"
        style={{ display: "none" }}
      />

      {/* Content Layer */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "80rem",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <h1
          style={{
            fontWeight: 900,
            lineHeight: 1,
            fontSize: "2.70rem",
            opacity: 0.88, // Slightly dimmed
          }}
        >
          ADVOGADO
          <br />
          MESTRE EM DIREITO
          <br />
          E ESPECIALISTA EM
          <br />
          DIREITO MILITAR
        </h1>
        <div
          style={{
            marginTop: ".2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            opacity: 1,
          }}
        >
          <div
            style={{
              cursor: "pointer",
              color: "white",
              fontSize: "2.5rem", // Easy size control - adjust this value
              opacity: 0.88, // Slightly dimmed
            }}
          >
            <svg
              width="1em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
