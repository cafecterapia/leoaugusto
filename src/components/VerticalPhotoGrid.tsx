"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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

        // Set initial state - overlay covers the entire image from top
        gsap.set(overlay, {
          y: 0,
          height: "100%",
        });

        // Create ScrollTrigger for revealing the image
        ScrollTrigger.create({
          trigger: photo,
          start: "bottom bottom", // When bottom of photo hits bottom of viewport
          end: nextPhoto
            ? () =>
                `${nextPhoto.offsetTop + nextPhoto.offsetHeight / 2}px center`
            : "bottom top",
          onEnter: () => {
            // Slide overlay down automatically when trigger is hit
            gsap.to(overlay, {
              y: "70%",
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            // Reset overlay when moving to next section
            gsap.to(overlay, {
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            // Keep revealed state when scrolling back
            gsap.to(overlay, {
              y: "70%",
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            // Reset when scrolling back up past trigger
            gsap.to(overlay, {
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      });
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-8 w-full max-w-xs mx-auto"
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
            className="absolute inset-0 bg-secondary/90 flex items-center justify-center"
            data-overlay={`overlay-${index}`}
          >
            <span
              className="text-primary-foreground text-xl sm:text-2xl font-bold text-center z-10 px-4"
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
