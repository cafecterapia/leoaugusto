import { useState, useEffect } from "react";
import { useLenis } from "@/components/LenisProvider";

export function useViewportHeight() {
  const [height, setHeight] = useState(0);
  const { lenis } = useLenis();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateHeight = () => {
      const newHeight = window.innerHeight;
      setHeight(newHeight);

      // Update CSS custom property for use in components
      document.documentElement.style.setProperty(
        "--vh-dynamic",
        `${newHeight * 0.01}px`
      );

      // Force Lenis to recalculate dimensions immediately
      if (lenis) {
        lenis.resize();
      }
    };

    const debouncedUpdateHeight = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateHeight, 16); // ~60fps
    };

    // Set initial height
    updateHeight();

    // Handle resize events (covers browser UI changes)
    window.addEventListener("resize", debouncedUpdateHeight);

    // Handle orientation changes
    window.addEventListener("orientationchange", () => {
      // Delay to account for iOS Safari animation
      setTimeout(updateHeight, 100);
    });

    // Handle visual viewport changes (newer API for better mobile support)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", debouncedUpdateHeight);
    }

    // Handle focus/blur events that might trigger address bar changes
    window.addEventListener("focus", updateHeight);
    window.addEventListener("blur", updateHeight);

    // Handle page visibility changes (critical for the address bar scenario)
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        // When page becomes visible again (user returning from address bar),
        // update immediately and then again after a short delay
        updateHeight();
        setTimeout(updateHeight, 50);
        setTimeout(updateHeight, 150); // Additional check for slower devices
      }
    });

    // Handle page show event (back/forward navigation)
    window.addEventListener("pageshow", updateHeight);

    // Handle touch events that might trigger browser UI changes
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0 && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (
        e.changedTouches &&
        e.changedTouches.length > 0 &&
        e.changedTouches[0]
      ) {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        // If significant vertical scroll, check viewport in case browser UI changed
        if (Math.abs(deltaY) > 50) {
          setTimeout(updateHeight, 100);
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedUpdateHeight);
      window.removeEventListener("orientationchange", updateHeight);
      window.removeEventListener("focus", updateHeight);
      window.removeEventListener("blur", updateHeight);
      window.removeEventListener("pageshow", updateHeight);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          debouncedUpdateHeight
        );
      }

      document.removeEventListener("visibilitychange", updateHeight);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lenis]);

  return height;
}
