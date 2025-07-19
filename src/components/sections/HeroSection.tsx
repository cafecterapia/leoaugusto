"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-section-stable relative min-h-[47rem] overflow-hidden bg-[#353537] text-white flex items-start justify-center p-8 pt-[23rem] pb-16 md:grid md:place-items-center md:grid-cols-1 lg:place-items-start xl:place-items-start">
      {/* Next.js Image - Flagship Performance with Artistic Control */}
      <Image
        src="/api/hero-image?name=lfam.avif"
        alt="Leonardo Augusto - Advogado especialista em Direito Militar"
        fill
        priority
        quality={95}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${btoa(`<svg width="32" height="24" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#666666"/></svg>`)}`}
        className="absolute inset-0 object-cover object-center lg:object-[center_20%] xl:object-[center_15%] -z-10"
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-[80rem] mx-auto text-left">
        <h1 className="font-black leading-none text-[2.70rem] opacity-[0.88]">
          ADVOGADO
          <br />
          MESTRE EM DIREITO
          <br />
          E ESPECIALISTA EM
          <br />
          DIREITO MILITAR
        </h1>
        <div className="mt-1 flex flex-col items-start">
          <div className="cursor-pointer text-white text-[2.5rem] opacity-[0.88]">
            <svg
              width="1em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
