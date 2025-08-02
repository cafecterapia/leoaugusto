import Image from "next/image";
import heroImage from "../../../public/images/lfam.avif";

export default function HeroSection() {
  return (
    <section className="hero-section-stable relative min-h-[47rem] overflow-hidden bg-[#353537] text-white flex items-start justify-center p-8 pt-[27rem] pb-20 md:pl-24 lg:pb-28 xl:pb-2 md:grid md:place-items-center md:grid-cols-1 lg:place-items-end xl:place-items-end">
      {/* 3. Use the imported image object as the src */}
      <Image
        src={heroImage}
        alt="Leonardo Augusto - Advogado especialista em Direito Militar"
        fill
        priority
        quality={95}
        sizes="100vw"
        placeholder="blur" // Next.js will handle the blur placeholder
        className="absolute inset-0 object-cover object-center lg:object-[center_90%] xl:object-[center_15%] -z-10"
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-[80rem] mx-auto text-left">
        <h1 className="font-black leading-none text-[2rem] sm:text-[2.1rem] md:text-[3rem] lg:text-[4rem] opacity-[0.85]">
          ADVOGADO,
          <br />
          MESTRE EM DIREITO
          <br />
          <span className="font-light italic whitespace-nnowrap">
            COM ESPECIALIZAÇÃO
          </span>
          <br />
          EM DIREITO MILITAR
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
