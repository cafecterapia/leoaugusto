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

      // Track if user is interacting with form elements
      const handleFormFocus = () => {
        // Temporarily disable smooth scrolling when form is active
        lenis.destroy();
      };

      const handleFormBlur = () => {
        // Small delay to allow for tab navigation between form fields
        setTimeout(() => {
          const activeElement = document.activeElement;
          const isStillInForm =
            activeElement &&
            (activeElement.tagName === "INPUT" ||
              activeElement.tagName === "TEXTAREA" ||
              activeElement.tagName === "SELECT" ||
              activeElement.closest("form"));

          if (!isStillInForm) {
            // Re-initialize Lenis when no longer focused on forms
            const newLenis = new Lenis({
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
              eventsTarget: window,
              lerp: 0.1,
            });

            function newRaf(time: number) {
              newLenis.raf(time);
              requestAnimationFrame(newRaf);
            }
            requestAnimationFrame(newRaf);
          }
        }, 100);
      };

      // Add event listeners to all form elements
      const formElements = document.querySelectorAll("input, textarea, select");
      formElements.forEach((element) => {
        element.addEventListener("focus", handleFormFocus);
        element.addEventListener("blur", handleFormBlur);
      });

      // Use MutationObserver to handle dynamically added form elements
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              const newFormElements = element.querySelectorAll(
                "input, textarea, select"
              );
              newFormElements.forEach((formElement) => {
                formElement.addEventListener("focus", handleFormFocus);
                formElement.addEventListener("blur", handleFormBlur);
              });
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Add passive wheel event listener to improve performance
      const handleWheel = () => {
        // This helps reduce the main thread blocking
      };

      window.addEventListener("wheel", handleWheel, { passive: true });

      // Cleanup
      return () => {
        // Remove form event listeners
        formElements.forEach((element) => {
          element.removeEventListener("focus", handleFormFocus);
          element.removeEventListener("blur", handleFormBlur);
        });

        // Disconnect observer
        observer.disconnect();

        // Remove wheel listener and destroy lenis
        window.removeEventListener("wheel", handleWheel);
        lenis.destroy();
      };
    }
  }, []);

  return null;
}
