"use client";

import { lazy, useEffect, useState } from "react";

// Lazy load the heavy VerticalPhotoGrid component
const VerticalPhotoGrid = lazy(() => import("../VerticalPhotoGrid"));

// Static placeholder component that looks like VerticalPhotoGrid
const VerticalPhotoGridPlaceholder = () => {
  const placeholderPhotos = [
    { text: "PALESTRAS", position: "left" },
    { text: "AULAS & MENTORIAS", position: "right" },
    { text: "EMPREENDIMENTOS", position: "left" },
  ];

  return (
    <div className="flex flex-col gap-19 w-full max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-4xl mx-auto px-2 sm:px-3 lg:px-4">
      {placeholderPhotos.map((photo, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl lg:rounded-3xl xl:rounded-4xl"
        >
          <div className="aspect-[3/4] w-full bg-gray-200 dark:bg-gray-800 relative">
            {/* Placeholder background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Text content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-wide text-center">
                {photo.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function GridSection() {
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Start loading the interactive component after initial render
    const timer = setTimeout(() => {
      setIsInteractive(true);
    }, 200); // Slightly longer delay since this component is more complex

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="palestras"
      className="min-h-screen bg--color-primary-background text--color-primary-foreground flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32 isolate"
    >
      <div className="text-center mb-12">
        <div className="text-5xl md:text-4xl lg:text-5xl font-bold text--color-primary-foreground space-y-2 md:space-y-4">
          <div className="text-left md:text-left">OUTRAS</div>
          <div className="text-center md:text-center ml-10 md:ml-16">
            ÁREAS DE
          </div>
          <div className="text-center md:text-center mr-17 md:mr-16">
            ATUAÇÃO
          </div>
        </div>
      </div>

      {isInteractive ? <VerticalPhotoGrid /> : <VerticalPhotoGridPlaceholder />}
    </section>
  );
}
