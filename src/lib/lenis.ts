"use client";

import Lenis from "lenis";

// Global Lenis instance
let lenis: Lenis | null = null;

// Initialize Lenis with optimal settings
export const initLenis = () => {
  if (typeof window === "undefined") return null;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    return null;
  }

  // Create Lenis instance with recommended settings
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    lerp: 0.1,
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    infinite: false,
    syncTouch: false,
    autoResize: true,
    eventsTarget: window,
    autoRaf: true, // Let Lenis handle its own RAF loop
  });

  return lenis;
};

// Get the global Lenis instance
export const getLenis = (): Lenis | null => lenis;

// Destroy Lenis instance
export const destroyLenis = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

// Export commonly used methods for convenience
export const lenisScrollTo = (
  target: string | number | HTMLElement,
  options?: object
) => {
  lenis?.scrollTo(target, options);
};

export const lenisStop = () => {
  lenis?.stop();
};

export const lenisStart = () => {
  lenis?.start();
};

export const lenisOn = (event: "scroll", callback: (lenis: Lenis) => void) => {
  return lenis?.on(event, callback);
};

export const lenisOff = (event: "scroll", callback: (lenis: Lenis) => void) => {
  lenis?.off(event, callback);
};
