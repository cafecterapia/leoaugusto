"use client";

import { motion, AnimatePresence } from "framer-motion";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({
  isOpen,
  onClose,
}: FullscreenMenuProps) {
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
          <div className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center">
            {/* Logo/Name - perfectly matching header position */}
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              Leonardo Augusto
            </div>

            {/* Animated hamburger to X */}
            <div
              className="flex flex-col justify-center items-center w-6 h-6 cursor-pointer relative"
              onClick={onClose}
            >
              {/* Top line - transforms to top part of X */}
              <motion.div
                initial={false}
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 2 : -2,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-5 h-0.5 bg-white"
              />

              {/* Bottom line - transforms to bottom part of X */}
              <motion.div
                initial={false}
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -2 : 2,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-5 h-0.5 bg-white"
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
            >
              <ul className="space-y-8">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <a
                    href="#home"
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    onClick={onClose}
                  >
                    Home
                  </a>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <a
                    href="#about"
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    onClick={onClose}
                  >
                    About
                  </a>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <a
                    href="#work"
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    onClick={onClose}
                  >
                    Work
                  </a>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <a
                    href="#contact"
                    className="text-4xl md:text-6xl font-light text-white hover:text-gray-300 transition-colors duration-300"
                    onClick={onClose}
                  >
                    Contact
                  </a>
                </motion.li>
              </ul>
            </motion.nav>

            {/* Additional menu footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute bottom-8 left-6 right-6"
            >
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>© 2025 Leonardo Augusto</span>
                <div className="space-x-6">
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
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
