"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if the current path is a legal page
  const isLegalPage =
    pathname.startsWith("/politica-de-privacidade") ||
    pathname.startsWith("/termos-de-uso") ||
    pathname.startsWith("/legal");

  // For legal pages, don't render Header and Footer
  if (isLegalPage) {
    return <>{children}</>;
  }

  // For all other pages, render with Header and Footer
  return (
    <div className="relative">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
