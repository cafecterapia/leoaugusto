import { useState, useEffect } from "react";

interface ScrollState {
  scrollY: number;
  isScrolled: boolean;
  showShortName: boolean;
  isDarkSection: boolean;
}

export function useScrollHeader(): ScrollState {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showShortName, setShowShortName] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Header becomes sticky immediately when scrolling
      setIsScrolled(currentScrollY > 0);

      // Show short name after scrolling a bit into hero section
      setShowShortName(currentScrollY > 50);

      // Simple and reliable section detection based on scroll position
      const viewportHeight = window.innerHeight;

      // Get all sections for height calculations
      const sections = document.querySelectorAll("section");
      let isDark = false;

      if (sections.length > 0) {
        // Calculate approximate positions based on actual elements
        const heroSection = sections[0];
        const heroHeight =
          heroSection?.getBoundingClientRect().height || viewportHeight;

        // Find video section by looking for video content
        let videoSectionTop = 0;
        let videoSectionBottom = 0;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + currentScrollY;
          const sectionBottom = sectionTop + rect.height;

          // Check if this is the video section
          const hasVideo = section.querySelector("video") !== null;
          const hasVideoOverlay =
            section.querySelector(".bg-black.bg-opacity-40") !== null;
          const hasVideoContent =
            section.textContent?.includes("Transformando Vidas") || false;

          if (hasVideo || hasVideoOverlay || hasVideoContent) {
            videoSectionTop = sectionTop;
            videoSectionBottom = sectionBottom;
            // Debug logging
            console.log("Video section detected:", {
              hasVideo,
              hasVideoOverlay,
              hasVideoContent,
              videoSectionTop,
              videoSectionBottom,
              currentScrollY,
            });
          }
        });

        // Determine if current position is in a dark section
        if (currentScrollY < heroHeight * 0.8) {
          // Hero section
          isDark = true;
        } else if (
          videoSectionTop > 0 &&
          currentScrollY >= videoSectionTop - 100 &&
          currentScrollY < videoSectionBottom
        ) {
          // Video section (with small buffer)
          isDark = true;
          console.log("In video section - setting dark mode", {
            currentScrollY,
            videoSectionTop,
            videoSectionBottom,
          });
        } else {
          // Light sections (text, services, grid, contact)
          isDark = false;
        }
      } else {
        // Fallback
        isDark = currentScrollY < viewportHeight * 0.8;
      }

      setIsDarkSection(isDark);
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
    isDarkSection,
  };
}
