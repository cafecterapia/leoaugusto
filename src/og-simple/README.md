# Simple OG (Open Graph) Implementation

This folder contains a simple, reliable Open Graph implementation for Facebook and WhatsApp sharing.

## What it does

- Uses the existing `lfam.avif` directly (no complex generation)
- Provides proper metadata for social media sharing
- Works reliably with Facebook and WhatsApp link previews

## Files

- `metadata.ts` - Simple metadata configuration using Next.js 15 standard

## How it works

Instead of complex base64 encoding and dynamic image generation, this approach:

1. Uses the static `lfam.avif` from `/public/images/`
2. Sets proper OpenGraph metadata
3. Lets Next.js handle the rest

## Usage

The metadata is imported and used in `src/app/layout.tsx`:

```tsx
import { defaultMetadata } from "@/og-simple/metadata";
export const metadata: Metadata = defaultMetadata;
```

That's it! No complex API routes, no base64 encoding, just simple and reliable OG tags.
