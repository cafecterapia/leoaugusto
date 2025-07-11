import { ogImageConfig, getHeroImageBase64 } from "@/lib/ogImageGenerator";

export const runtime = "edge";

export const alt = ogImageConfig.alt;
export const size = {
  width: ogImageConfig.width,
  height: ogImageConfig.height,
};
export const contentType = ogImageConfig.contentType;

// This component serves the actual hero image for OpenGraph sharing
export default function DynamicImage() {
  // Return the base64 hero image data directly
  const heroImageData = getHeroImageBase64();
  const base64Data = heroImageData.split(",")[1];

  if (!base64Data) {
    throw new Error("Invalid base64 image data");
  }

  return new Response(Buffer.from(base64Data, "base64"), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
