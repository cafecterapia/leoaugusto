"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StickyContactButtonProps {
  selectedServices: string[];
  onContactClick: () => void;
}

export default function StickyContactButton({
  selectedServices,
  onContactClick,
}: StickyContactButtonProps) {
  return (
    <AnimatePresence>
      {selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
        >
          <motion.button
            onClick={onContactClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 rounded-full lg:rounded-2xl font-medium lg:font-semibold transition-all duration-200 shadow-2xl hover:shadow-3xl border-2 border-white/20 text-sm lg:text-base xl:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center gap-2">
              <span>Entrar em contato</span>
              <div className="bg-white/20 rounded-full px-2 py-1 text-sm font-bold">
                {selectedServices.length}
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
