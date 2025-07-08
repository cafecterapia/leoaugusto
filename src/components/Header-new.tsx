"use client";

import { useState } from "react";
import FullscreenMenu from "./FullscreenMenu";
import { useScrollHeader } from "@/hooks/useScrollHeader";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled, showShortName, isDarkSection } = useScrollHeader();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Style classes based on scroll state and section background
  const textColor = isDarkSection ? "text-white" : "text-secondary-foreground";
  const hamburgerColor = isDarkSection ? "bg-white" : "bg-secondary-foreground";
  const headerBg = isScrolled
    ? isDarkSection
      ? "bg-black/80"
      : "bg-white/90"
    : "bg-transparent";

  return (
    <>
      <header
        className={`
          ${isScrolled ? "fixed" : "absolute"} 
          top-0 left-0 w-full 
          ${headerBg} 
          backdrop-blur-md
          px-6 py-4 
          flex justify-between items-center 
          z-50
          transition-all duration-300 ease-in-out
          ${isScrolled ? "shadow-lg" : ""}
        `}
      >
        {/* Logo/Name with smooth transition */}
        <div
          className={`
            ${
              showShortName
                ? "text-xl sm:text-2xl lg:text-3xl"
                : "text-2xl sm:text-3xl lg:text-4xl"
            } 
            font-bold ${textColor} tracking-wide
            transition-all duration-300 ease-in-out
            relative
          `}
        >
          <span
            className={`
              transition-opacity duration-300 
              ${showShortName ? "opacity-0 absolute" : "opacity-100"}
            `}
          >
            Leonardo Augusto
          </span>
          <span
            className={`
              transition-opacity duration-300 
              ${showShortName ? "opacity-100" : "opacity-0 absolute"}
            `}
          >
            Leo
          </span>
        </div>

        {/* Hamburger Menu */}
        <div
          className="flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer"
          onClick={toggleMenu}
        >
          <div
            className={`w-6 h-0.5 mb-1.5 sm:w-7 sm:h-0.5 sm:mb-2 lg:w-8 lg:h-1 lg:mb-2 ${hamburgerColor} transition-colors duration-300`}
          ></div>
          <div
            className={`w-6 h-0.5 sm:w-7 sm:h-0.5 lg:w-8 lg:h-1 ${hamburgerColor} transition-colors duration-300`}
          ></div>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
