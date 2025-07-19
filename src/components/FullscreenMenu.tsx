"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useLenis } from "lenis/react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  headerComponent: React.ReactElement;
}

export default function FullscreenMenu({
  isOpen,
  onClose,
  headerComponent,
}: FullscreenMenuProps) {
  const lenis = useLenis();

  const handleNavigation = (targetId: string) => {
    // Close menu first
    onClose();

    // Small delay to allow menu close animation to start
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement && lenis) {
        // Use Lenis for smooth scrolling
        lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 1.2,
        });
      } else {
        console.warn(
          `Navigation target element with ID "${targetId}" not found or Lenis not available`
        );
      }
    }, 100);
  };

  // Lenis scroll control for fullscreen menu
  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      // Stop Lenis scrolling when menu opens
      lenis.stop();
    } else {
      // Resume Lenis scrolling when menu closes
      lenis.start();
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
    <>
      {/* Always render header - it's the single source of truth */}
      {headerComponent}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black"
          >
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
    </>
  );
}
