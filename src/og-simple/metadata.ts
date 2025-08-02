import type { Metadata } from "next";

const baseUrl = "https://leonardoaugusto.com";

export const defaultMetadata: Metadata = {
  title: "Leonardo Augusto - Direito Militar",
  description: "Advogado e Mestre em Direito Especializado em Direito Militar",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Leonardo Augusto - Direito Militar",
    description:
      "Advogado e Mestre em Direito Especializado em Direito Militar",
    url: baseUrl,
    siteName: "Leonardo Augusto",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/lfam.avif",
        alt: "Leonardo Augusto - Advogado especializado em Direito Militar",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonardo Augusto - Direito Militar",
    description: "Advogado especializado em Direito Militar",
    images: ["/images/hero-photo.png"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};
