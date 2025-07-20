import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leonardo Augusto",
  description: "Advogado e Mestre em Direito Especializado em Direito Militar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
