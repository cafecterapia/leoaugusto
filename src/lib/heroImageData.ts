// This file contains the base64 encoded hero image
import fs from "fs";
import path from "path";

const getBase64Image = () => {
  const imagePath = path.join(process.cwd(), "hero-data-uri.txt");
  return fs.readFileSync(imagePath, "utf8").trim();
};

export const HERO_IMAGE_BASE64 = getBase64Image();
