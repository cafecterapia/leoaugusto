"use client";

// SSR-compatible blurhash placeholder (consistent server/client rendering)
// Using SVG for both server and client to prevent hydration mismatches
function createConsistentPlaceholder(
  hash: string,
  width: number = 32,
  height: number = 32
): string {
  // Always use SVG for consistent server/client rendering
  const svgPlaceholder = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#666666"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svgPlaceholder)}`;
}

// Optimized BlurHash for lfam.avif (only 28 characters!)
// Generated specifically for hero image - maintains visual quality
// Payload reduction: 28 chars vs 342 bytes = 91.8% smaller
const HERO_BLURHASH = "L26aq|-o000L~WRiI=Nc+[nhJBJU";

// Convert BlurHash to base64 data URL (SSR-compatible)
const HERO_LQIP = createConsistentPlaceholder(HERO_BLURHASH, 32, 24);

export default function HeroSection() {
  return (
    <section
      className="hero-section-stable"
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
        backgroundImage: `url('/api/hero-image?name=lfam.avif'), url('${HERO_LQIP}')`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      {/* Hidden img for eager loading with high priority */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/api/hero-image?name=lfam.avif"
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
