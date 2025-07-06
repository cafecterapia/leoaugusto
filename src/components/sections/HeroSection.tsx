"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section 
      className="bg-primary-background relative h-screen w-full overflow-hidden rounded-b-[1rem] sm:rounded-b-[2rem] lg:rounded-b-[3rem]"
    >
      <Image
        src="/images/header-photo.png"
        alt="Header background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Left-aligned text content - moved lower and bigger for mobile */}
      <div className="absolute inset-0 flex items-end pb-8 sm:pb-16 lg:pb-20">
        <div className="w-full sm:w-3/4 lg:w-1/2 pl-4 sm:pl-6 lg:pl-12">
          <div className="text-white">
            <h3 className="text-6xl sm:text-8xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-blck leading-none mb-2 sm:mb-3 lg:mb-4">
              ADVOGADO
            </h3>
            <h1 className="text-7xl sm:text-8xl lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-extralight leading-none mb-1 sm:mb-2 lg:mb-4">
              Especialista em
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-8">
              <h2 className="text-7xl sm:text-8xl lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-black leading-none">
                Direito Militar
              </h2>
              
              {/* Down arrow - bigger and more prominent */}
              <svg 
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex-shrink-0 self-start sm:mt-4" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
