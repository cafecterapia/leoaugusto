"use client";

import VerticalPhotoGrid from "../VerticalPhotoGrid";

export default function GridSection() {
  return (
    <section 
      className="min-h-screen bg-secondary-foreground text-secondary flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <h2 
        className="text-4xl md:text-6xl font-bold text-center mb-12"
      >
        Grid
      </h2>
      <VerticalPhotoGrid />
    </section>
  );
}
