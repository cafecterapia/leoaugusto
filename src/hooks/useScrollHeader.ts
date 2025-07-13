import { useState, useEffect } from "react";

interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  showShortName: boolean;
}

export function useScrollHeader(): ScrollState {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showShortName, setShowShortName] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Check if modal is closing to prevent jarring transitions
      const isModalClosing = document.body.classList.contains("modal-closing");

      if (!isModalClosing) {
        // Header becomes sticky immediately when scrolling
        setIsScrolled(currentScrollY > 0);

        // Show short name after scrolling a bit into hero section
        setShowShortName(currentScrollY > 50);
      }
    };

    // Initial call to set state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    scrollY,
    isScrolled,
    showShortName,
  };
}
