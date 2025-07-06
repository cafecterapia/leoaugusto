import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Leonardo Augusto";
    const subtitle = searchParams.get("subtitle") || "Direito Militar";

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
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          }}
        >
          {/* Professional background pattern */}
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundImage:
                "radial-gradient(circle at 25px 25px, rgba(148, 163, 184, 0.1) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(148, 163, 184, 0.1) 2px, transparent 0)",
              backgroundSize: "100px 100px",
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

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              width: "120px",
              height: "120px",
              background: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
              borderRadius: "50%",
              opacity: 0.15,
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "40px",
              width: "80px",
              height: "80px",
              background: "linear-gradient(45deg, #10b981, #059669)",
              borderRadius: "50%",
              opacity: 0.15,
            }}
          />
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
