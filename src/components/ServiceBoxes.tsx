"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/services";

interface ServiceBoxesProps {
  selectedIndices: number[];
  onSelectionChange: (indices: number[]) => void;
}

export default function ServiceBoxes({
  selectedIndices,
  onSelectionChange,
}: ServiceBoxesProps) {
  const handleBoxClick = (index: number) => {
    const newSelectedIndices = selectedIndices.includes(index)
      ? selectedIndices.filter((i) => i !== index)
      : [...selectedIndices, index];

    onSelectionChange(newSelectedIndices);
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Subtle instruction text */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="text-center mb-6 lg:mb-8"
      >
        <p className="text--color-primary-foreground/70 text-sm lg:text-base font-medium">
          💡 Clique nos serviços para selecioná-los e entrar em contato
        </p>
      </motion.div>

      {/* Display all services in a grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer"
            onClick={() => handleBoxClick(index)}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Square shaped box with aspect ratio */}
            <div className="aspect-square w-full">
              <div
                className={`h-full p-3 sm:p-6 lg:p-8 xl:p-10 border-2 lg:border-4 rounded-xl lg:rounded-2xl xl:rounded-3xl bg-transparent transition-all duration-500 transform hover:shadow-lg hover:shadow-primary/20 ${
                  selectedIndices.includes(index)
                    ? "border-primary bg-primary/20 shadow-lg ring-2 ring-primary/30"
                    : "border-primary hover:bg-primary/5 hover:border-primary/80"
                }`}
              >
                <div className="flex items-center justify-center h-full relative">
                  <p className="text-secondary-foreground text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-relaxed">
                    {service}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced selection indicator */}
            {selectedIndices.includes(index) && (
              <motion.div
                className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-white text-xs font-bold">✓</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
