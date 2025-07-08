"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FullscreenMenu from "./FullscreenMenu";
import { useScrollHeader } from "../hooks/useScrollHeader";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled, showShortName, isDarkSection } = useScrollHeader();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.header
        className={`
          ${isScrolled ? "fixed" : "absolute"} 
          top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50
        `}
        animate={{
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        {/* Logo/Name */}
        <div
          className={`
            text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide
            transition-colors duration-300 ease-in-out
            ${isDarkSection ? "text-white" : "text-black"}
          `}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={showShortName ? "short" : "full"}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              style={{ display: "inline-block" }}
            >
              {showShortName ? "LEO" : "LEONARDO AUGUSTO"}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Hamburger Menu */}
        <motion.div
          className="flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer"
          onClick={toggleMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`
              w-6 h-0.5 mb-1.5 sm:w-7 sm:h-0.5 sm:mb-2 lg:w-8 lg:h-1 lg:mb-2
            `}
            animate={{
              backgroundColor: isDarkSection ? "#ffffff" : "#000000",
            }}
            transition={{ duration: 0.3 }}
          ></motion.div>
          <motion.div
            className={`
              w-6 h-0.5 sm:w-7 sm:h-0.5 lg:w-8 lg:h-1
            `}
            animate={{
              backgroundColor: isDarkSection ? "#ffffff" : "#000000",
            }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </motion.div>
      </motion.header>

      {/* Fullscreen Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
