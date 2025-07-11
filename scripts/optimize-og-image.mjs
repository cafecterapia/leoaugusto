#!/usr/bin/env node

import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = "./public/images";
const INPUT_IMAGE = path.join(PUBLIC_DIR, "hero-photo.png");
const OUTPUT_IMAGE = path.join(PUBLIC_DIR, "hero-og-optimized.png");

async function optimizeImage() {
  try {
    console.log("Optimizing hero image for OG usage...");

    // Create a much smaller, optimized version
    await sharp(INPUT_IMAGE)
      .resize(400, 210, {
        // Much smaller size, maintaining aspect ratio
        fit: "cover",
        position: "center",
      })
      .png({
        quality: 80,
        compressionLevel: 9,
        progressive: true,
      })
      .toFile(OUTPUT_IMAGE);

    const inputStats = fs.statSync(INPUT_IMAGE);
    const outputStats = fs.statSync(OUTPUT_IMAGE);

    console.log(`Original size: ${(inputStats.size / 1024).toFixed(2)} KB`);
    console.log(`Optimized size: ${(outputStats.size / 1024).toFixed(2)} KB`);
    console.log(
      `Size reduction: ${(((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(2)}%`
    );

    // Generate base64 for the optimized image
    const optimizedBuffer = fs.readFileSync(OUTPUT_IMAGE);
    const base64String = optimizedBuffer.toString("base64");
    const dataUri = `data:image/png;base64,${base64String}`;

    console.log(`Base64 size: ${(base64String.length / 1024).toFixed(2)} KB`);

    // Write to a file for reference
    fs.writeFileSync("./hero-og-base64.txt", dataUri);

    console.log(
      "Optimization complete! New base64 saved to hero-og-base64.txt"
    );
  } catch (error) {
    console.error("Error optimizing image:", error);
    process.exit(1);
  }
}

optimizeImage();
