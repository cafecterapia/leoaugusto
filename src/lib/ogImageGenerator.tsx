import { ImageResponse } from "next/og";

export const ogImageConfig = {
  width: 1200,
  height: 630,
  alt: "Leonardo Augusto - Direito Militar",
  contentType: "image/png" as const,
};

export function generateOGImageJSX({
  title = "Leonardo Augusto",
  subtitle,
}: {
  title?: string;
  subtitle?: string;
} = {}) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Hero photo as background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-photo.png"
        alt="Leonardo Augusto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Overlay for text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 3,
          color: "white",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            margin: 0,
            marginBottom: subtitle ? "1rem" : 0,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: "1.5rem",
              margin: 0,
              opacity: 0.9,
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export function createOGImageResponse(title?: string, subtitle?: string) {
  return new ImageResponse(
    generateOGImageJSX({
      ...(title && { title }),
      ...(subtitle && { subtitle }),
    }),
    {
      width: ogImageConfig.width,
      height: ogImageConfig.height,
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    }
  );
}

export function createFallbackOGImageResponse(
  title?: string,
  subtitle?: string
) {
  return new ImageResponse(
    generateOGImageJSX({
      ...(title && { title }),
      ...(subtitle && { subtitle }),
    }),
    {
      width: ogImageConfig.width,
      height: ogImageConfig.height,
    }
  );
}
