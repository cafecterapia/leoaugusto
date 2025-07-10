import { ImageResponse } from "next/og";

export const ogImageConfig = {
  width: 1200,
  height: 630,
  alt: "Leonardo Augusto - Direito Militar",
  contentType: "image/png" as const,
};

interface OGImageOptions {
  title?: string;
  subtitle?: string | undefined;
}

export function generateOGImageJSX({
  title = "Leonardo Augusto",
  subtitle,
}: OGImageOptions) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#000000",
      }}
    >
      {/* Zig-zag text container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* Check if it's the default Leonardo Augusto for zig-zag effect */}
        {title === "Leonardo Augusto" ? (
          <>
            {/* First word "Leonardo" - positioned higher */}
            <div
              style={{
                fontSize: "80px",
                fontWeight: "bold",
                color: "#ffffff",
                lineHeight: 0.8,
                transform: "translateX(-50px) translateY(-20px)",
                marginBottom: "10px",
              }}
            >
              Leonardo
            </div>

            {/* Second word "Augusto" - positioned lower and to the right */}
            <div
              style={{
                fontSize: "80px",
                fontWeight: "bold",
                color: "#ffffff",
                lineHeight: 0.8,
                transform: "translateX(50px) translateY(20px)",
                marginTop: "10px",
              }}
            >
              Augusto
            </div>
          </>
        ) : (
          /* Fallback for custom titles */
          <div
            style={{
              fontSize: title.length > 20 ? "56px" : "72px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: 1.1,
              textAlign: "center",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        )}

        {/* Subtitle if provided */}
        {subtitle && (
          <div
            style={{
              fontSize: "32px",
              color: "#ffffff",
              marginTop: "24px",
              opacity: 0.8,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

export function createOGImageResponse(options: OGImageOptions = {}) {
  return new ImageResponse(generateOGImageJSX(options), {
    width: ogImageConfig.width,
    height: ogImageConfig.height,
    headers: {
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

export function createFallbackOGImageResponse() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#ffffff",
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
      width: ogImageConfig.width,
      height: ogImageConfig.height,
    }
  );
}
