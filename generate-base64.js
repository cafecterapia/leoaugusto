const fs = require("fs");
const path = require("path");

// Read the hero image and convert to base64
const imagePath = path.join(__dirname, "public", "images", "hero-photo.png");
const imageBuffer = fs.readFileSync(imagePath);
const base64String = imageBuffer.toString("base64");

// Create the data URI
const dataUri = `data:image/png;base64,${base64String}`;

console.log("// Embedded base64 hero image data");
console.log("const HERO_IMAGE_BASE64 =");
console.log(`  "${dataUri}";`);
