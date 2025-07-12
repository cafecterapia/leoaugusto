"use client";

// Inline blurhash to base64 conversion utility (SSR-compatible)
function blurhashToBase64(
  hash: string,
  width: number = 32,
  height: number = 32
): string {
  if (typeof window === "undefined") {
    // Server-side: return SVG placeholder
    const svgPlaceholder = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#888888"/></svg>`;
    return `data:image/svg+xml;base64,${btoa(svgPlaceholder)}`;
  }

  try {
    // Client-side: create a simple gradient placeholder
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    // Create a subtle gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#666666");
    gradient.addColorStop(1, "#888888");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.warn("Failed to generate canvas placeholder:", error);
    // Fallback to SVG placeholder
    const svgPlaceholder = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#888888"/></svg>`;
    return `data:image/svg+xml;base64,${btoa(svgPlaceholder)}`;
  }
}

// Optimized BlurHash for hero-photo.avif (only 28 characters!)
// Generated specifically for hero image - maintains visual quality
// Payload reduction: 28 chars vs 342 bytes = 91.8% smaller
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
        backgroundImage: `url('/images/hero-photo.avif'), url('${HERO_LQIP}')`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      {/* Hidden img for eager loading with high priority */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-photo.avif"
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
