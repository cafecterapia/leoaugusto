import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Leonardo Augusto - Direito Militar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function DynamicImage({
  params = {},
}: {
  params?: { title?: string; subtitle?: string };
}) {
  const title = params.title || "Leonardo Augusto";
  const subtitle = params.subtitle || "Direito Militar";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2px, transparent 0), radial-gradient(circle at 75px 75px, #1e293b 2px, transparent 0)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            textAlign: "center",
          }}
        >
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
              opacity: 0.1,
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
              opacity: 0.1,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

// Helper function to generate OpenGraph images for specific pages
export function generateOGImage(title: string, subtitle?: string) {
  return {
    alt: `${title} - Leonardo Augusto`,
    size,
    contentType,
    params: { title, subtitle },
  };
}
