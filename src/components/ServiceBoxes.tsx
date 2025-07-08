"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  "Ressarcimento de Preterição",
  "Acompanhamento de procedimento administrativos (Sindicância e IPM) e judiciais",
  "Conselho de Disciplina e Conselho de Justificação",
  "Remoção/Movimentação com ou sem ônus",
  "Reintegração/Reinclusão ao SAM, EB e FAB",
  "Impedimentos a Cursos de Formação de Cabo, Sargento e Oficiais",
  "Reforma de Militares na Esfera Administrativa/Judicial",
  "Descontos e/ou cobranças indevidas",
];

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
  onContactWithServices?: ((selectedServices: string[]) => void) | undefined;
}

export default function ServiceBoxes({
  onContactWithServices,
}: ServiceBoxesProps) {
  const [displayedServices, setDisplayedServices] = useState<string[]>(
    services.slice(0, 6)
  );
  const [changingIndices, setChangingIndices] = useState<number[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
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

      setChangingIndices(selectedForChange);
      setTimeout(() => {
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
                  currentIndex !== -1 &&
                  !selectedForChange.includes(currentIndex)
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

        setChangingIndices([]);
      }, 300); // Half of transition duration
    }, 5000); // Change every 5 seconds (slower)

    return () => clearInterval(interval);
  }, [isClient, selectedIndices]);

  const handleBoxClick = (index: number) => {
    setSelectedIndices((prev) => {
      if (prev.includes(index)) {
        // Unselect the box
        return prev.filter((i) => i !== index);
      } else {
        // Select the box
        return [...prev, index];
      }
    });
  };

  const handleContactClick = () => {
    const selectedServices = selectedIndices.map(
      (index) => displayedServices[index]!
    );

    // Call the callback with selected services first
    if (onContactWithServices) {
      onContactWithServices(selectedServices);
    }

    // Clear selected indices to hide the button and unselect boxes
    setSelectedIndices([]);

    // Small delay to ensure state updates, then scroll
    setTimeout(() => {
      const contactSection =
        document.querySelector("#contact-section") ||
        document.querySelector('section:has([id="contact-form"])') ||
        document.querySelector('[id*="contact"]') ||
        document.querySelector("section:last-of-type");

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Floating Contact Button - fixed position, doesn't affect layout */}
      <AnimatePresence>
        {selectedIndices.length > 0 && (
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
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.button
              onClick={handleContactClick}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-full font-medium transition-all duration-200 shadow-2xl hover:shadow-3xl border-2 border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <span>Entrar em contato</span>
                <div className="bg-white/20 rounded-full px-2 py-1 text-sm font-bold">
                  {selectedIndices.length}
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedServices.map((service, index) => (
          <motion.div
            key={index}
            className="group relative cursor-pointer"
            onClick={() => handleBoxClick(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Square shaped box with aspect ratio */}
            <div className="aspect-square w-full">
              <motion.div
                className={`h-full p-3 sm:p-6 border-2 rounded-xl bg-transparent transition-all duration-500 transform hover:shadow-lg ${
                  selectedIndices.includes(index)
                    ? "border-secondary bg-secondary/20 shadow-lg ring-2 ring-secondary/30"
                    : "border-secondary hover:bg-secondary/5"
                }`}
                animate={{
                  opacity: changingIndices.includes(index) ? 0 : 1,
                  scale: changingIndices.includes(index) ? 0.95 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center h-full">
                  <p className="text-secondary text-center text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                    {service}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Subtle glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-secondary/10 opacity-0 transition-opacity duration-300 pointer-events-none -z-10 blur-sm"
              whileHover={{ opacity: 1 }}
            ></motion.div>

            {/* Selection indicator */}
            {selectedIndices.includes(index) && (
              <motion.div
                className="absolute top-2 right-2 w-3 h-3 bg-secondary rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
