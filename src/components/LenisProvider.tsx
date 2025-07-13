"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

// Context type definition
interface LenisContextType {
  lenis: Lenis | null;
  start: () => void;
  stop: () => void;
  scrollTo: (target: string | number | HTMLElement, options?: object) => void;
}

// Create the context
const LenisContext = createContext<LenisContextType | null>(null);

// Hook to use the Lenis context
export const useLenis = (): LenisContextType => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
};

// Provider component props
interface LenisProviderProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    lerp?: number;
  };
}

export default function LenisProvider({
  children,
  options = {},
}: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === "undefined") return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Add loading class to prevent layout shifts during initialization
    document.documentElement.classList.add("lenis-loading");

    // Default Lenis configuration
    const lenisOptions = {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      lerp: 0.1,
      orientation: "vertical" as const,
      gestureOrientation: "vertical" as const,
      smoothWheel: true,
      infinite: false,
      syncTouch: true,
      autoResize: true,
      eventsTarget: window,
      ...options,
    };

    // Initialize Lenis instance
    lenisRef.current = new Lenis(lenisOptions);

    // Start the RAF loop
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    // Remove loading class after a brief delay to ensure stable initialization
    setTimeout(() => {
      document.documentElement.classList.remove("lenis-loading");
    }, 100);

    // Handle window load event to fix initial layout race condition
    const handleWindowLoad = () => {
      // Force Lenis to recalculate dimensions after all resources have loaded
      lenisRef.current?.resize();
    };

    // Handle Visual Viewport API for mobile browser UI changes
    const handleVisualViewportResize = () => {
      // Force Lenis to recalculate layout when mobile browser UI appears/disappears
      lenisRef.current?.resize();
    };

    // Add window load event listener
    window.addEventListener("load", handleWindowLoad);

    // Add Visual Viewport API listener for mobile viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        "resize",
        handleVisualViewportResize
      );
    }

    // Modern native approach for form input focus/blur handling
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;

      // Check if the focused element is a form input
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.contentEditable === "true"
      ) {
        // Store current scroll position before stopping Lenis
        scrollPositionRef.current = window.scrollY;

        // Immediately stop Lenis to prevent conflicts
        lenisRef.current?.stop();

        // Use native browser API for smooth, reliable scrolling
        // This handles virtual keyboards and viewport changes automatically
        requestAnimationFrame(() => {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        });
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement;

      // Check if we're leaving a form input
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.contentEditable === "true"
      ) {
        // Use requestAnimationFrame to ensure DOM updates are complete
        // and handle any pending layout changes from virtual keyboards
        requestAnimationFrame(() => {
          const activeElement = document.activeElement as HTMLElement;
          const isStillInFormInput =
            activeElement &&
            (activeElement.tagName === "INPUT" ||
              activeElement.tagName === "TEXTAREA" ||
              activeElement.tagName === "SELECT" ||
              activeElement.contentEditable === "true");

          // Only restart Lenis when completely outside form inputs
          if (!isStillInFormInput) {
            // Additional frame delay for mobile virtual keyboard animations
            requestAnimationFrame(() => {
              lenisRef.current?.start();
              // Force Lenis to recalculate after virtual keyboard changes
              lenisRef.current?.resize();
            });
          }
        });
      }
    };

    // Use event delegation on document for better performance
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    // Cleanup function
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("load", handleWindowLoad);

      // Clean up Visual Viewport API listener
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleVisualViewportResize
        );
      }

      // Remove loading class if still present
      document.documentElement.classList.remove("lenis-loading");

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  // Context value with control methods
  const contextValue: LenisContextType = {
    lenis: lenisRef.current,
    start: () => lenisRef.current?.start(),
    stop: () => lenisRef.current?.stop(),
    scrollTo: (target, options) => lenisRef.current?.scrollTo(target, options),
  };

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
