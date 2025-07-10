"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      className="relative h-screen w-full overflow-hidden isolate bg-white"
      style={{
        backgroundImage: imageLoaded ? "none" : "url(/images/header-photo.png)",
        backgroundSize: "cover",
        backgroundPosition: "center 30%", // Better positioning for desktop eye level
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
          style={{
            objectPosition: "center 30%", // Match the background positioning for consistency
          }}
          priority
          quality={100}
          sizes="100vw"
          onLoad={() => setImageLoaded(true)}
          placeholder="empty"
        />
      </div>

      {/* Left-aligned text content - moved lower and bigger for mobile */}
      <div
        className="absolute inset-0 flex items-end
                    pb-0 min-[23rem]:pb-8 sm:pb-15 md:pb-16 lg:pb-20"
      >
        <div
          className="w-full sm:w-3/4 lg:w-1/2
                      pl-4 sm:pl-6 md:pl-8 lg:pl-12
                      pr-3 sm:pr-4 md:pr-6 @container"
        >
          <div className="text-white">
            <h3
              className="text-5xl min-[23rem]:text-5xl sm:text-6xl md:text-7xl lg:text-4xl xl:text-5xl 2xl:text-6xl
                         @[25rem]:text-6xl @[35rem]:text-7xl @lg:text-4xl @xl:text-5xl @2xl:text-6xl
                         font-black leading-tight mb-3 sm:mb-4 @[25rem]:mb-4 @md:mb-5 lg:mb-3 xl:mb-4"
            >
              ADVOGADO
            </h3>
            <h1
              className="text-5xl min-[23rem]:text-5xl sm:text-6xl md:text-7xl lg:text-4xl xl:text-5xl 2xl:text-6xl
                         @[25rem]:text-6xl @[35rem]:text-7xl @lg:text-4xl @xl:text-5xl @2xl:text-6xl
                         font-black leading-tight mb-3 sm:mb-3 @[25rem]:mb-4 @md:mb-5 lg:mb-2 xl:mb-3"
            >
              MESTRE EM DIREITO
            </h1>
            <h2
              className="text-3xl min-[23rem]:text-4xl sm:text-5xl md:text-6xl lg:text-3xl xl:text-4xl 2xl:text-5xl
                         @[25rem]:text-5xl @[35rem]:text-6xl @lg:text-3xl @xl:text-4xl @2xl:text-5xl
                         font-light leading-tight mb-3 sm:mb-3 @[25rem]:mb-4 @md:mb-5 lg:mb-2 xl:mb-3"
            >
              E <span className="font-black">ESPECIALISTA</span> EM
            </h2>
            <div className="flex flex-col @[25rem]:flex-row @[25rem]:items-center gap-3 @[25rem]:gap-4 lg:gap-4 xl:gap-6 2xl:gap-8">
              <h2
                className="text-5xl min-[23rem]:text-5xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl
                           @[25rem]:text-6xl @[35rem]:text-7xl @lg:text-5xl @xl:text-6xl @2xl:text-7xl
                           font-black leading-tight"
              >
                DIREITO MILITAR
              </h2>

              {/* Down arrow - responsive for container size */}
              <svg
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16
                         @[25rem]:w-14 @[25rem]:h-14 @[35rem]:w-16 @[35rem]:h-16 @lg:w-12 @lg:h-12 @xl:w-14 @xl:h-14
                         flex-shrink-0 self-start mt-2 sm:mt-3 @[25rem]:mt-3 @[35rem]:mt-4 lg:mt-1 xl:mt-2"
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
