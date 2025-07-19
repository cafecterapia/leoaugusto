"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const targetRef = useRef<HTMLElement>(null);

  // Track scroll progress specifically for the hero section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to header states
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const logoOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.98]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Header component that will be passed to FullscreenMenu
  const headerComponent = (
    <>
      {/* Target ref for scroll detection - tracks hero section */}
      <section
        ref={targetRef}
        className="hero-section-stable"
        style={{
          position: "absolute",
          top: 2,
          left: 0,
          width: "100%",
          height: "47rem",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
        style={{ scale: headerScale }}
      >
        <nav
          className="@container w-full"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Subgrid container for alignment with hero content */}
          <div
            className="grid grid-cols-[1fr_auto] items-center gap-8 px-6 py-6 @sm:px-8 @sm:gap-12 @md:px-12 @md:gap-16 @lg:px-16 @lg:gap-20"
            style={{
              maxWidth: "80rem",
              margin: "0 auto",
              display: "subgrid",
              gridColumn: "1 / -1",
            }}
          >
            {/* Logo/Brand with scroll transitions */}
            <div className="flex-1 relative">
              {/* Full name for initial state */}
              <motion.h1
                className="text-white font-medium text-lg @sm:text-xl @md:text-2xl @lg:text-3xl tracking-wide"
                style={{ opacity: textOpacity }}
              >
                LEONARDO AUGUSTO
              </motion.h1>

              {/* Logo image for scrolled state */}
              <motion.div
                className="flex items-center absolute inset-0"
                style={{ opacity: logoOpacity }}
              >
                <Image
                  src="/la.avif"
                  alt="LA"
                  width={48}
                  height={48}
                  className="h-8 @sm:h-10 @md:h-12 w-auto brightness-0 invert"
                />
              </motion.div>
            </div>

            {/* Hamburger Menu - 2 lines */}
            <button
              onClick={toggleMenu}
              className="relative w-8 h-8 @sm:w-10 @sm:h-10 @md:w-12 @md:h-12 flex flex-col justify-center items-center group"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {/* Top line */}
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                  isMenuOpen
                    ? "rotate-45 translate-y-[1px]"
                    : "translate-y-[-2px] group-hover:translate-y-[-3px]"
                }`}
              />
              {/* Bottom line */}
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out transform origin-center ${
                  isMenuOpen
                    ? "-rotate-45 translate-y-[-1px]"
                    : "translate-y-[2px] group-hover:translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>
    </>
  );

  return (
    <FullscreenMenu
      isOpen={isMenuOpen}
      onClose={closeMenu}
      headerComponent={headerComponent}
    />
  );
}
