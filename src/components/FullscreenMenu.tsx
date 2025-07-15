"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useLenis } from "lenis/react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({
  isOpen,
  onClose,
}: FullscreenMenuProps) {
  const lenis = useLenis();

  const handleNavigation = (targetId: string) => {
    // Close menu first
    onClose();

    // Small delay to allow menu close animation to start
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement && lenis) {
        // Use Lenis for smooth scrolling with optimized easing
        lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else if (targetElement) {
        // Fallback for browser compatibility
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        // Log error for debugging
        console.warn(
          `Navigation target element with ID "${targetId}" not found`
        );
      }
    }, 100);
  };

  // Use Lenis stop/start instead of manual body manipulation
  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop(); // Stop Lenis scrolling when menu opens
    } else {
      lenis.start(); // Resume Lenis scrolling when menu closes
    }

    // Cleanup: ensure scrolling is resumed when component unmounts
    return () => {
      lenis.start();
    };
  }, [isOpen, lenis]);

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black"
        >
          {/* Header matching the original header layout */}
          <div
            className="absolute top-2 left-0 w-full 
          /* @container DISABLED FOR DEBUGGING */ 
          px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 flex justify-between items-center"
          >
            {/* Logo/Name - perfectly matching header position */}
            <div className="text-xl @sm:text-2xl @md:text-3xl @lg:text-4xl @xl:text-5xl font-bold text-white tracking-wide">
              LEONARDO AUGUSTO
            </div>

            {/* Animated hamburger to X */}
            <div
              className="flex flex-col justify-center items-center w-6 h-6 @sm:w-8 @sm:h-8 @md:w-10 @md:h-10 @lg:w-12 @lg:h-12 cursor-pointer relative"
              onClick={onClose}
            >
              {/* Top line - transforms to top part of X */}
              <motion.div
                initial={false}
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 3 : -3,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-4 h-0.5 mb-1 @sm:w-6 @sm:h-0.5 @sm:mb-1.5 @md:w-7 @md:h-0.5 @md:mb-2 @lg:w-8 @lg:h-1 @lg:mb-2 bg-white"
              />

              {/* Bottom line - transforms to bottom part of X */}
              <motion.div
                initial={false}
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -3 : 3,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-4 h-0.5 @sm:w-6 @sm:h-0.5 @md:w-7 @md:h-0.5 @lg:w-8 @lg:h-1 bg-white"
              />
            </div>
          </div>

          {/* Menu content */}
          <div className="flex flex-col items-center justify-center h-full">
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="text-center"
              role="navigation"
              aria-label="Main navigation"
            >
              <ul className="space-y-8">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <button
                    onClick={() => handleNavigation("sobre")}
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    aria-label="Navigate to About section"
                  >
                    Sobre
                  </button>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <button
                    onClick={() => handleNavigation("servicos")}
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    aria-label="Navigate to Services section"
                  >
                    Serviços
                  </button>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <button
                    onClick={() => handleNavigation("palestras")}
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    aria-label="Navigate to Lectures section"
                  >
                    Palestras
                  </button>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <button
                    onClick={() => handleNavigation("mentorias")}
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    aria-label="Navigate to Mentorship section"
                  >
                    Mentorias
                  </button>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <button
                    onClick={() => handleNavigation("contact-section")}
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    aria-label="Navigate to Contact section"
                  >
                    Contato
                  </button>
                </motion.li>
              </ul>
            </motion.nav>

            {/* Additional menu footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="absolute bottom-8 left-6 right-6"
            >
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>© 2025 Leonardo Augusto</span>
                <div className="space-x-6">
                  <a
                    href="https://linkedin.com/in/leoaugusto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://instagram.com/augustoleonardo.prof"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="mailto:Imf.advocaciamilitar@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
