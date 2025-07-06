import type { Metadata } from "next";

interface OGConfig {
  title: string;
  description: string;
  path?: string;
  image?: {
    url: string;
    alt: string;
  };
}

const baseUrl = "https://leonardoaugusto.com";

export function generateOpenGraphMetadata({
  title,
  description,
  path = "",
  image,
}: OGConfig): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image || {
    url: `${baseUrl}/opengraph-image`,
    alt: "Leonardo Augusto - Professional Portfolio",
  };

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url,
      siteName: "Leonardo Augusto",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage.url,
          alt: ogImage.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@leonardoaugusto",
      images: [ogImage.url],
    },
  };
}

// Pre-configured metadata for common pages
export const homeMetadata = generateOpenGraphMetadata({
  title: "Leonardo Augusto - Professional Portfolio",
  description:
    "A clean, professional portfolio showcasing creative work and smooth user experiences",
});

export const aboutMetadata = generateOpenGraphMetadata({
  title: "About - Leonardo Augusto",
  description:
    "Learn more about Leonardo Augusto's background, skills, and creative journey",
  path: "/about",
});

export const contactMetadata = generateOpenGraphMetadata({
  title: "Contact - Leonardo Augusto",
  description:
    "Get in touch with Leonardo Augusto for collaboration opportunities and inquiries",
  path: "/contact",
});
