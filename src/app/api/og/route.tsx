import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Leonardo Augusto";
    const subtitle = searchParams.get("subtitle") || "Direito Militar";

    // Get the base URL for the image
    const baseUrl = new URL(request.url).origin;
    const headerPhotoUrl = `${baseUrl}/images/image.png`;

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
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={headerPhotoUrl}
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

          {/* Dark overlay for better text readability */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "rgba(15, 23, 42, 0.7)",
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              textAlign: "center",
              position: "relative",
              zIndex: 10,
              width: "100%",
              height: "100%",
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: title.length > 20 ? "56px" : "72px",
                fontWeight: "bold",
                color: "transparent",
                marginBottom: "24px",
                background: "linear-gradient(to right, #f8fafc, #e2e8f0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                maxWidth: "1000px",
                lineHeight: "1.1",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: subtitle.length > 30 ? "24px" : "32px",
                color: "#94a3b8",
                marginBottom: "40px",
                fontWeight: "300",
                maxWidth: "800px",
              }}
            >
              {subtitle}
            </p>

            {/* Website badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#1e293b",
                padding: "16px 32px",
                borderRadius: "12px",
                border: "1px solid #334155",
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
                  fontSize: "28px",
                  color: "#f1f5f9",
                  fontWeight: "500",
                }}
              >
                leonardoaugusto.com
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (error) {
    console.error("Failed to generate OpenGraph image:", error);

    // Return a simple fallback
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f172a",
            color: "#f8fafc",
            fontSize: "48px",
            fontWeight: "bold",
            fontFamily:
              'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Leonardo Augusto - Direito Militar
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
