"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroller() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Only initialize Lenis if user hasn't requested reduced motion
    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        infinite: false,
        syncTouch: true,
        autoResize: true,
        // Make wheel events passive for better performance
        eventsTarget: window,
        // Reduce the number of RAF calls for better performance
        lerp: 0.1,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Add passive wheel event listener to improve performance
      const handleWheel = (e: WheelEvent) => {
        // This helps reduce the main thread blocking
      };
      
      window.addEventListener('wheel', handleWheel, { passive: true });

      // Cleanup
      return () => {
        window.removeEventListener('wheel', handleWheel);
        lenis.destroy();
      };
    }
  }, []);

  return null;
}
