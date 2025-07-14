"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "../components/LenisProvider";

interface UseScrollLockOptions {
  /**
   * Whether scroll should be locked
   */
  isLocked: boolean;
  /**
   * Whether to save and restore scroll position when locking/unlocking
   * @default true
   */
  preserveScrollPosition?: boolean;
  /**
   * Whether to add isolation styles to prevent visual issues with overlays
   * @default true
   */
  useIsolation?: boolean;
  /**
   * Custom body class to add when scroll is locked
   * @default undefined
   */
  bodyClass?: string;
  /**
   * Delay before restarting Lenis after unlocking (in ms)
   * @default 50
   */
  restartDelay?: number;
  /**
   * Scroll lock method: 'overflow' (simple) or 'fixed' (sophisticated)
   * @default 'fixed'
   */
  method?: "overflow" | "fixed";
}

/**
 * Custom hook for managing scroll lock with Lenis integration
 *
 * This hook provides a unified way to lock/unlock scrolling across the application,
 * properly integrating with Lenis smooth scrolling and handling common modal/overlay scenarios.
 *
 * @param options Configuration options for scroll lock behavior
 * @returns Object with current lock state and manual control methods
 */
export function useScrollLock({
  isLocked,
  preserveScrollPosition = true,
  useIsolation = true,
  bodyClass,
  restartDelay = 50,
  method = "fixed",
}: UseScrollLockOptions) {
  const savedScrollY = useRef(0);
  const { stop, start } = useLenis();

  useEffect(() => {
    if (isLocked) {
      // Save current scroll position if preservation is enabled
      if (preserveScrollPosition) {
        savedScrollY.current = window.scrollY;
      }

      // Stop Lenis smooth scrolling
      stop();

      if (method === "fixed") {
        // Sophisticated approach: Use position fixed to prevent visual jumps
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollY.current}px`;
        document.body.style.width = "100%";
      } else {
        // Simple approach: Just hide overflow
        document.body.style.overflow = "hidden";
      }

      // Add isolation styles to prevent mix-blend-mode and other visual issues
      if (useIsolation) {
        document.body.style.isolation = "isolate";
      }

      // Add custom body class if provided
      if (bodyClass) {
        document.body.classList.add(bodyClass);
      }
    } else {
      // Restore body scroll based on method used
      if (method === "fixed") {
        // Restore all fixed position styles
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
      } else {
        // Simple restore
        document.body.style.overflow = "";
      }

      // Remove isolation styles
      if (useIsolation) {
        document.body.style.isolation = "";
      }

      // Remove custom body class if provided
      if (bodyClass) {
        document.body.classList.remove(bodyClass);
      }

      // Restore scroll position if preservation is enabled
      if (preserveScrollPosition && savedScrollY.current !== 0) {
        if (method === "fixed") {
          // For fixed method, use sophisticated restoration
          requestAnimationFrame(() => {
            // Temporarily disable any CSS smooth scrolling
            const htmlElement = document.documentElement;
            const originalScrollBehavior = htmlElement.style.scrollBehavior;
            htmlElement.style.scrollBehavior = "auto";

            // Use scrollTo with instant behavior to avoid Lenis smooth scrolling
            window.scrollTo({
              top: savedScrollY.current,
              left: 0,
              behavior: "auto",
            });

            // Reset the saved scroll position
            savedScrollY.current = 0;

            // Restore original scroll behavior after a short delay
            setTimeout(() => {
              htmlElement.style.scrollBehavior = originalScrollBehavior;
            }, restartDelay);
          });
        } else {
          // Simple restoration for overflow method
          window.scrollTo({
            top: savedScrollY.current,
            left: 0,
            behavior: "auto",
          });
        }
      }

      // Re-enable Lenis smooth scrolling after a delay
      setTimeout(() => {
        start();
      }, restartDelay);
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "";
      if (method === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
      }
      if (useIsolation) {
        document.body.style.isolation = "";
      }
      if (bodyClass) {
        document.body.classList.remove(bodyClass);
      }
      start(); // Ensure Lenis is always restarted on cleanup
    };
  }, [
    isLocked,
    stop,
    start,
    preserveScrollPosition,
    useIsolation,
    bodyClass,
    restartDelay,
    method,
  ]);

  // Manual control methods for advanced use cases
  const lockScroll = () => {
    if (preserveScrollPosition) {
      savedScrollY.current = window.scrollY;
    }
    stop();

    if (method === "fixed") {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollY.current}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "hidden";
    }

    if (useIsolation) {
      document.body.style.isolation = "isolate";
    }
    if (bodyClass) {
      document.body.classList.add(bodyClass);
    }
  };

  const unlockScroll = () => {
    if (method === "fixed") {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    } else {
      document.body.style.overflow = "";
    }

    if (useIsolation) {
      document.body.style.isolation = "";
    }
    if (bodyClass) {
      document.body.classList.remove(bodyClass);
    }

    if (preserveScrollPosition && savedScrollY.current !== 0) {
      if (method === "fixed") {
        requestAnimationFrame(() => {
          const htmlElement = document.documentElement;
          const originalScrollBehavior = htmlElement.style.scrollBehavior;
          htmlElement.style.scrollBehavior = "auto";

          window.scrollTo({
            top: savedScrollY.current,
            left: 0,
            behavior: "auto",
          });

          savedScrollY.current = 0;

          setTimeout(() => {
            htmlElement.style.scrollBehavior = originalScrollBehavior;
          }, restartDelay);
        });
      } else {
        window.scrollTo({
          top: savedScrollY.current,
          left: 0,
          behavior: "auto",
        });
      }
    }

    setTimeout(() => {
      start();
    }, restartDelay);
  };

  return {
    isLocked,
    lockScroll,
    unlockScroll,
    savedScrollPosition: savedScrollY.current,
  };
}
