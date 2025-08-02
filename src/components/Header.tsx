"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const heroSection = document.querySelector(".hero-section-stable");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInHero(entry.isIntersecting);
        }
      },
      {
        rootMargin: "-100px 0px -50% 0px", // Trigger when 100px past top and 50% visible
        threshold: 0,
      }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Header component that will be passed to FullscreenMenu
  const headerComponent = (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      initial={{ scale: 1 }}
      animate={{ scale: isInHero ? 1 : 0.99 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
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
              initial={{ opacity: 1 }}
              animate={{ opacity: isInHero ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              LEONARDO AUGUSTO
            </motion.h1>

            {/* Logo image for scrolled state */}
            <motion.div
              className="flex items-center absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInHero ? 0 : 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
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
  );

  return (
    <FullscreenMenu
      isOpen={isMenuOpen}
      onClose={closeMenu}
      headerComponent={headerComponent}
    />
  );
}
