import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Leonardo Augusto - Professional Portfolio";
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
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            padding: "60px",
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Left side - Header photo */}
          <div
            style={{
              display: "flex",
              width: "400px",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <img
              src={imageUrl}
              alt="Leonardo Augusto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Right side - Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              flex: 1,
              marginLeft: "80px",
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "20px",
                lineHeight: 1.1,
                margin: "0 0 20px 0",
              }}
            >
              Leonardo Augusto
            </h1>

            {/* Domain */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f3f4f6",
                padding: "20px 30px",
                borderRadius: "12px",
                border: "2px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                  marginRight: "16px",
                }}
              />
              <span
                style={{
                  fontSize: "32px",
                  color: "#374151",
                  fontWeight: "600",
                }}
              >
                leonardoaugusto.com
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
