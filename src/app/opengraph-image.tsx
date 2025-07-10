import {
  createOGImageResponse,
  createFallbackOGImageResponse,
  ogImageConfig,
} from "@/lib/ogImageGenerator";

export const runtime = "edge";

export const alt = ogImageConfig.alt;
export const size = {
  width: ogImageConfig.width,
  height: ogImageConfig.height,
};
export const contentType = ogImageConfig.contentType;

export default async function Image() {
  try {
    return createOGImageResponse();
  } catch (error) {
    console.error("Failed to generate OpenGraph image:", error);
    return createFallbackOGImageResponse();
  }
}
