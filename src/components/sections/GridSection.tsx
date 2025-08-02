"use client";

import { lazy } from "react";

// Lazy load the heavy VerticalPhotoGrid component
const VerticalPhotoGrid = lazy(() => import("../VerticalPhotoGrid"));

export default function GridSection() {
  return (
    <section
      id="palestras"
      className="min-h-screen bg--color-primary-background text--color-primary-foreground flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32 isolate"
    >
      <div className="text-center mb-12">
        {/* Heading container adjusted for desktop */}
        <div className="text-5xl md:text-4xl lg:text-5xl font-bold text--color-primary-foreground space-y-2 md:space-y-4 lg:flex lg:space-y-0 lg:space-x-4 lg:justify-center">
          <div className="text-left md:text-left">OUTRAS</div>
          <div className="text-center md:text-center ml-10 md:ml-16 lg:ml-0">
            ÁREAS DE
          </div>
          <div className="text-center md:text-center mr-17 md:mr-16 lg:mr-0">
            ATUAÇÃO
          </div>
        </div>
      </div>

      {/* Directly rendering the interactive component */}
      <VerticalPhotoGrid />
    </section>
  );
}
