"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register GSAP plugins
gsap.registerPlugin(Flip, ScrollTrigger);

const photos = [
  { src: "/images/grid.png", alt: "Grid photo 1", text: "Palestras" },
  { src: "/images/grid-2.png", alt: "Grid photo 2", text: "Aulas" },
  { src: "/images/grid-3.png", alt: "Grid photo 3", text: "Mentoria" },
  {
    src: "/images/header-photo.png",
    alt: "Header photo",
    text: "Empreendimentos",
  },
];

export default function VerticalPhotoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Add a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      const photos = containerRef.current?.querySelectorAll("[data-photo]");
      if (!photos || photos.length === 0) {
        return;
      }

      photos.forEach((photo, index) => {
        const overlay = photo.querySelector(
          `[data-overlay="overlay-${index}"]`
        ) as HTMLElement;
        const nextPhoto = photos[index + 1] as HTMLElement;

        if (!overlay) {
          return;
        }

        // Set initial state - overlay covers the entire image
        gsap.set(overlay, {
          height: "100%",
          transformOrigin: "bottom",
        });

        // Create ScrollTrigger for revealing the image
        ScrollTrigger.create({
          trigger: photo,
          start: "bottom bottom",
          end: nextPhoto
            ? () => `${nextPhoto.offsetTop + nextPhoto.offsetHeight / 2}px`
            : "bottom top",
          onEnter: () => {
            // Reveal image by reducing overlay to bottom portion
            gsap.to(overlay, {
              height: "30%",
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            // Reset to covered state when scrolling past the next photo's middle
            gsap.to(overlay, {
              height: "100%",
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            // Reveal again when scrolling back up
            gsap.to(overlay, {
              height: "30%",
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            // Reset when scrolling back up past trigger
            gsap.to(overlay, {
              height: "100%",
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      });
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-4 w-full max-w-xs mx-auto"
    >
      {photos.map((photo, index) => (
        <motion.div
          key={photo.src}
          data-photo={`photo-${index}`}
          className="relative aspect-square overflow-hidden rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          viewport={{ once: true, margin: "-10%" }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 320px, 384px"
          />
          {/* Overlay for GSAP control */}
          <div
            className="absolute inset-0 bg-secondary/80 flex items-end justify-center pb-4"
            data-overlay={`overlay-${index}`}
          >
            <span
              className="text-primary-foreground text-xl sm:text-2xl font-bold text-center z-10"
              data-text={`text-${index}`}
            >
              {photo.text}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
