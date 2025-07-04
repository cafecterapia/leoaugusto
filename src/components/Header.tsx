"use client";

import { useState } from "react";
import FullscreenMenu from "./FullscreenMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-10">
        {/* Logo/Name */}
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
          Leonardo Augusto
        </div>

        {/* Hamburger Menu */}
        <div
          className="flex flex-col justify-center items-center w-6 h-6 cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="w-5 h-0.5 mb-1 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
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
