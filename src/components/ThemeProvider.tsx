"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    // Font loading optimization - runs only on client side
    if (typeof window !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add("fonts-loaded");
      });
    }
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
