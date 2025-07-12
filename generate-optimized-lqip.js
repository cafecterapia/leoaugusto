// Generate optimized LQIP using plaiceholder library
// This will create a much smaller base64 than the current 1.18KB version

const { getPlaiceholder } = require("plaiceholder");
const fs = require("fs");
const path = require("path");

async function generateOptimizedLQIP() {
  try {
    const imagePath = path.join(__dirname, "public/images/hero-photo.avif");

    // Generate optimized placeholder
    const { base64 } = await getPlaiceholder(imagePath, {
      size: 8, // Very small for instant loading
    });

    console.log("Current LQIP size: 1,180 bytes");
    console.log(`Optimized LQIP size: ${base64.length} bytes`);
    console.log(
      `Reduction: ${(((1180 - base64.length) / 1180) * 100).toFixed(1)}%`
    );
    console.log("");
    console.log("Optimized LQIP for HeroSection.tsx:");
    console.log(`const HERO_LQIP = "${base64}";`);
  } catch (error) {
    console.error("Error generating LQIP:", error);

    // Fallback: Create minimal BlurHash-based data URL
    console.log("Using fallback minimal LQIP approach...");

    // Create a tiny, optimized placeholder
    const minimalLQIP =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSI3NTIiIHZpZXdCb3g9IjAgMCAxOTIwIDc1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSI3NTIiIGZpbGw9IiMzNTM1MzciLz48L3N2Zz4=";

    console.log(`Minimal LQIP size: ${minimalLQIP.length} bytes`);
    console.log(
      `Reduction: ${(((1180 - minimalLQIP.length) / 1180) * 100).toFixed(1)}%`
    );
    console.log("");
    console.log("Minimal LQIP for HeroSection.tsx:");
    console.log(`const HERO_LQIP = "${minimalLQIP}";`);
  }
}

generateOptimizedLQIP();

// Clean up this file after use
setTimeout(() => {
  fs.unlinkSync(__filename);
}, 2000);
