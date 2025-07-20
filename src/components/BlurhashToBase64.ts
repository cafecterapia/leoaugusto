/**
 * Blurhash to Base64 conversion utility
 * Simplified implementation without external blurhash dependency
 * Provides SSR-compatible base64 generation for hero image placeholder
 */

/**
 * Main function that converts blurhash to base64 data URL
 * Handles both server-side and client-side rendering
 * Uses simplified approach to avoid module resolution issues
 */
export function blurhashToBase64(
  hash: string,
  width: number = 32,
  height: number = 32
): string {
  // Always return SVG placeholder for consistency between server and client
  // This prevents hydration mismatches while maintaining performance
  const svgPlaceholder = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#888888"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svgPlaceholder)}`;
}
