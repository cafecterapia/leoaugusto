export const runtime = "edge";

export const alt = "Leo Augusto - Advogado especialista em Direito Militar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// This component serves a simple OpenGraph image
export default function DynamicImage() {
  // Return a simple static image or redirect to the hero image
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/images/lfam.avif",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
