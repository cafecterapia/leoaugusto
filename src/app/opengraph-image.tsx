import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Leonardo Augusto - Direito Militar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Get the base URL dynamically
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === "production"
      ? "https://leonardoaugusto.com"
      : "http://localhost:3000";

  const imageUrl = `${baseUrl}/images/header-photo.png`;

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            position: "relative",
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Background photo - full size */}
          <img
            src={imageUrl}
            alt="Leonardo Augusto"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Dark overlay for text readability */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          />

          {/* Text content overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "60px",
              right: "60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              zIndex: 10,
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: "56px",
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: "20px",
                lineHeight: 1.1,
                margin: "0 0 20px 0",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Leonardo Augusto - Direito Militar
            </h1>

            {/* Subtitle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                padding: "20px 30px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  color: "#1f2937",
                  fontWeight: "600",
                  lineHeight: 1.2,
                }}
              >
                Advogado Especialista em Direito Militar
              </span>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (error) {
    console.error("Failed to generate OpenGraph image:", error);
    // Return a simple fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            color: "#1f2937",
            fontSize: "48px",
            fontWeight: "bold",
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Leonardo Augusto
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
