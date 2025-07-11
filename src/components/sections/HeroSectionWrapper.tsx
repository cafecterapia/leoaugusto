import { getPlaiceholder } from "plaiceholder";
import HeroSection from "./HeroSection";
import fs from "fs";
import path from "path";

export default async function HeroSectionWrapper() {
  // Read the image file at build time
  const imagePath = path.join(process.cwd(), "public/images/hero-photo.png");
  const imageBuffer = fs.readFileSync(imagePath);

  // Generate base64 blur placeholder at build time
  const { base64 } = await getPlaiceholder(imageBuffer);

  return <HeroSection blurDataURL={base64} />;
}
