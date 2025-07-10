"use client";

import { useEffect } from "react";

/**
 * Hook to handle viewport height changes on mobile browsers
 * Sets CSS custom property --vh for browsers that don't support dvh
 */
export function useViewportHeight() {
  useEffect(() => {
    // Check if dvh is supported
    const supportsDvh = CSS.supports("height", "100dvh");

    if (!supportsDvh) {
      // Function to update viewport height custom property
      const updateVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      };

      // Set initial value
      updateVH();

      // Update on resize and orientation change
      window.addEventListener("resize", updateVH);
      window.addEventListener("orientationchange", updateVH);

      // Update on viewport change (mobile address bar)
      window.addEventListener("scroll", updateVH, { passive: true });

      // Cleanup
      return () => {
        window.removeEventListener("resize", updateVH);
        window.removeEventListener("orientationchange", updateVH);
        window.removeEventListener("scroll", updateVH);
      };
    }
  }, []);
}
