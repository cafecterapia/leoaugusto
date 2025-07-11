import { getPlaiceholder } from "plaiceholder";
import fs from "fs";
import path from "path";

async function generateBlurDataURL() {
  try {
    const imagePath = path.join(process.cwd(), "public/images/hero-photo.png");
    const imageBuffer = fs.readFileSync(imagePath);
    const { base64 } = await getPlaiceholder(imageBuffer);

    console.log("Generated blur data URL:");
    console.log(base64);

    // Update the blurDataURL.ts file
    const blurDataContent = `// Pre-generated base64 blur data URL for hero image
// Generated using plaiceholder at build time
export const heroBlurDataURL =
  "${base64}";
`;

    const blurDataPath = path.join(process.cwd(), "src/lib/blurDataURL.ts");
    fs.writeFileSync(blurDataPath, blurDataContent);

    console.log("Successfully updated src/lib/blurDataURL.ts");
  } catch (error) {
    console.error("❌ Error generating blur data URL:", error);
  }
}

generateBlurDataURL();
