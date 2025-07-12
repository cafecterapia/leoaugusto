// Simple performance measurement script
const fs = require("fs");
const path = require("path");

console.log("Hero Section Performance Analysis");
console.log("================================");

// Check if hero image exists
const heroImagePath = path.join(__dirname, "../public/images/hero-photo.avif");
if (fs.existsSync(heroImagePath)) {
  const stats = fs.statSync(heroImagePath);
  console.log(`Hero image size: ${(stats.size / 1024).toFixed(2)} KB`);
} else {
  console.log("Hero image not found at expected path");
}

// Check LQIP size
const lqipPath = path.join(__dirname, "../src/app/hero-photo.txt");
if (fs.existsSync(lqipPath)) {
  const lqipContent = fs.readFileSync(lqipPath, "utf8");
  console.log(`LQIP size: ${(lqipContent.length / 1024).toFixed(2)} KB`);

  // Extract base64 payload size
  const base64Start = lqipContent.indexOf(",");
  if (base64Start > -1) {
    const base64Data = lqipContent.substring(base64Start + 1);
    console.log(
      `LQIP base64 payload: ${(base64Data.length / 1024).toFixed(2)} KB`
    );
  }
}

console.log("\nCurrent Implementation Analysis:");
console.log("- Using background-image with LQIP fallback");
console.log("- Hidden img tag for eager loading");
console.log("- Target: <1ms image loading time");
console.log("\nNext steps: Create optimized version with BlurhashComponent");
