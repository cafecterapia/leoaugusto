"use client";

import { useRef } from "react";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      id="mentorias"
      className="relative h-screen overflow-hidden isolate bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/videosection.avif"
          alt="Background"
          fill
          className="object-cover"
          // MODIFIED: Changed default position to show the lower part of the image
          style={{
            objectPosition: "center 80%", // Pushes the image up, showing its lower-middle
          }}
          priority
        />
        {/* Desktop-specific image positioning adjusted to be lower */}
        <style jsx>{`
          /* MODIFIED: Increased percentage values to lower the image's visible area */

          /* Tablet landscape and small desktop - position at 75% from the top */
          @media (min-width: 64rem) {
            img {
              object-position: center 75%;
            }
          }

          /* Large desktop - position at 70% */
          @media (min-width: 80rem) {
            img {
              object-position: center 70%;
            }
          }

          /* Extra large desktop - refined lower positioning at 65% */
          @media (min-width: 90rem) {
            img {
              object-position: center 65%;
            }
          }

          /* Desktop typography optimizations for better readability */
          @media (min-width: 64rem) {
            .video-section-content h2 {
              font-size: 4.5rem;
              line-height: 1.1;
            }

            .video-section-content p {
              font-size: 1.25rem;
              line-height: 1.6;
            }
          }

          @media (min-width: 80rem) {
            .video-section-content h2 {
              font-size: 5.5rem;
              line-height: 1;
            }

            .video-section-content p {
              font-size: 1.5rem;
              line-height: 1.7;
            }
          }
        `}</style>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white video-section-content">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Leonardo Augusto
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
            Advogado especializado em soluções jurídicas estratégicas.
          </p>
          <a
            href="https://wa.me/5521971262427"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            Agende orientação
          </a>

          {/* Social Links */}
          <SocialLinks className="mt-12" />
        </div>
      </div>
    </section>
  );
}
