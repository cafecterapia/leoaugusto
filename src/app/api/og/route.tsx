import { createOGImageResponse } from "@/lib/ogImageGenerator";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || undefined;
    const subtitle = searchParams.get("subtitle") || undefined;

    return createOGImageResponse(title, subtitle);
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
