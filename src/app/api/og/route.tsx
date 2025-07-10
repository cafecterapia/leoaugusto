import { createOGImageResponse } from "@/lib/ogImageGenerator";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const subtitle = searchParams.get("subtitle");

    const options: { title?: string; subtitle?: string } = {};

    if (title) {
      options.title = title;
    }

    if (subtitle) {
      options.subtitle = subtitle;
    }

    return createOGImageResponse(options);
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
