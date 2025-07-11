const fs = require("fs");
const path = require("path");

// Read the base64 data
const base64Data = fs
  .readFileSync(path.join(__dirname, "..", "hero-base64-clean.txt"), "utf8")
  .trim();
const dataUri = `data:image/png;base64,${base64Data}`;

// Read the current ogImageGenerator.tsx file
const ogImagePath = path.join(
  __dirname,
  "..",
  "src",
  "lib",
  "ogImageGenerator.tsx"
);
let content = fs.readFileSync(ogImagePath, "utf8");

// Replace the HERO_IMAGE_BASE64 constant
const oldBase64Pattern = /const HERO_IMAGE_BASE64 =\s*"[^"]*";/;
const newBase64Constant = `const HERO_IMAGE_BASE64 =\n  "${dataUri}";`;

content = content.replace(oldBase64Pattern, newBase64Constant);

// Write the updated file
fs.writeFileSync(ogImagePath, content, "utf8");

console.log(
  "Successfully updated ogImageGenerator.tsx with the hero photo base64 data"
);
console.log(`Base64 data length: ${base64Data.length} characters`);
