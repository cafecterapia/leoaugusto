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
    url: `${baseUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description)}`,
    alt: "Leonardo Augusto - Direito Militar",
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
  title: "Leonardo Augusto - Direito Militar",
  description: "Advogado especializado em Direito Militar",
});

export const aboutMetadata = generateOpenGraphMetadata({
  title: "About - Leonardo Augusto",
  description:
    "Conheça mais sobre Leonardo Augusto, advogado especializado em Direito Militar.",
  path: "/about",
});

export const contactMetadata = generateOpenGraphMetadata({
  title: "Leonardo Augusto",
  description:
    "Entre em contato com Leonardo Augusto para oportunidades de colaboração e consultas.",
  path: "/contact",
});
