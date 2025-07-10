"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      className="relative hero-height w-full overflow-hidden rounded-b-[1rem] sm:rounded-b-[2rem] lg:rounded-b-[3rem]"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: imageLoaded ? "none" : "url(/images/header-photo.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/header-photo.png"
          alt="Header background"
          fill
          className={`object-cover transition-opacity duration-0 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          quality={100}
          sizes="100vw"
          onLoad={() => setImageLoaded(true)}
          placeholder="empty"
        />
      </div>

      {/* Left-aligned text content - safer positioning for mobile */}
      <div className="absolute inset-0 flex items-center justify-start md:items-end px-4 py-8 sm:px-8 md:pb-16 lg:pb-20">
        <div className="w-full sm:w-3/4 lg:w-1/2 max-w-4xl">
          <div className="text-white">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl 2xl:text-9xl font-black leading-tight mb-1 sm:mb-2 md:mb-4 lg:mb-8">
              ADVOGADO
            </h3>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] xl:text-[7rem] 2xl:text-[8rem] font-black leading-tight mb-1 sm:mb-2 md:mb-3 lg:mb-6">
              MESTRE EM DIREITO
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[4rem] xl:text-[5rem] 2xl:text-[6rem] font-light leading-tight mb-1 sm:mb-2 md:mb-3 lg:mb-6">
              E <span className="font-black">ESPECIALISTA</span> EM
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:gap-8">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-[7rem] xl:text-[9rem] 2xl:text-[11rem] font-black leading-tight">
                DIREITO MILITAR
              </h2>

              {/* Down arrow - responsive sizing */}
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex-shrink-0 self-start sm:mt-2 md:mt-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
