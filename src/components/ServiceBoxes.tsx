"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/services";

// Shuffle array function
const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i]!;
    newArray[i] = newArray[j]!;
    newArray[j] = temp;
  }
  return newArray;
};

interface ServiceBoxesProps {
  selectedIndices: number[];
  onSelectionChange: (indices: number[]) => void;
}

export default function ServiceBoxes({
  selectedIndices,
  onSelectionChange,
}: ServiceBoxesProps) {
  const [displayedServices, setDisplayedServices] = useState<string[]>(
    services.slice(0, 6)
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize with unique shuffled services only on client
    const uniqueServices = shuffleArray(services).slice(0, 6);
    setDisplayedServices(uniqueServices);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      // Get indices that are not currently selected
      const availableIndices = [0, 1, 2, 3, 4, 5].filter(
        (index) => !selectedIndices.includes(index)
      );

      // Only proceed if we have boxes available to change
      if (availableIndices.length === 0) return;

      // Randomly select up to 2 boxes from available (non-selected) boxes
      const numToChange = Math.min(2, availableIndices.length);
      const selectedForChange = availableIndices
        .sort(() => 0.5 - Math.random())
        .slice(0, numToChange);

      // Directly update the services without intermediate state
      setDisplayedServices((prevServices) => {
        const newServices = [...prevServices];
        const availableServices = services.filter(
          (service) => !newServices.includes(service)
        );

        selectedForChange.forEach((index, i) => {
          // If we have available services that aren't currently displayed, use them
          if (availableServices.length > i) {
            newServices[index] = availableServices[i]!;
          } else {
            // If all services are being used, find a service from a non-changing box to swap
            const servicesToSwap = services.filter((service) => {
              const currentIndex = newServices.indexOf(service);
              return (
                currentIndex !== -1 && !selectedForChange.includes(currentIndex)
              );
            });

            if (servicesToSwap.length > 0) {
              newServices[index] =
                servicesToSwap[
                  Math.floor(Math.random() * servicesToSwap.length)
                ]!;
            }
          }
        });

        // Final check to ensure no duplicates
        const seen = new Set<string>();
        for (let i = 0; i < newServices.length; i++) {
          if (seen.has(newServices[i]!)) {
            // Find a service not in the current array
            const unusedService = services.find(
              (service) => !newServices.includes(service)
            );
            if (unusedService) {
              newServices[i] = unusedService;
            }
          }
          seen.add(newServices[i]!);
        }

        return newServices;
      });
    }, 8000); // Change every 8 seconds (slower)

    return () => clearInterval(interval);
  }, [isClient, selectedIndices]);

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

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        {displayedServices.map((service, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer"
            onClick={() => handleBoxClick(index)}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Square shaped box with aspect ratio - container stays stable */}
            <div className="aspect-square w-full">
              <div
                className={`h-full p-3 sm:p-6 lg:p-8 xl:p-10 border-2 lg:border-4 rounded-xl lg:rounded-2xl xl:rounded-3xl bg-transparent transition-all duration-500 transform hover:shadow-lg hover:shadow-primary/20 ${
                  selectedIndices.includes(index)
                    ? "border-primary bg-primary/20 shadow-lg ring-2 ring-primary/30"
                    : "border-primary hover:bg-primary/5 hover:border-primary/80"
                }`}
              >
                <div className="flex items-center justify-center h-full relative">
                  {/* Only animate the text content, not the container */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${index}-${service}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="text-secondary-foreground text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-relaxed absolute inset-0 flex items-center justify-center"
                    >
                      {service}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Subtle glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 transition-opacity duration-300 pointer-events-none -z-10 blur-sm"
              whileHover={{ opacity: 1 }}
            ></motion.div>

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
