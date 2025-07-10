"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import PalestrasFullscreen from "./fullscreen/PalestrasFullscreen";
import AulasMentoriasFullscreen from "./fullscreen/AulasMentoriasFullscreen";
import EmpreendimentosFullscreen from "./fullscreen/EmpreendimentosFullscreen";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "/images/Palestras-Grid.jpeg",
    alt: "Grid photo 1",
    text: "PALESTRAS",
    position: "left",
  },
  {
    src: "/images/Aulas-Grid.jpeg",
    alt: "Grid photo 2",
    text: "AULAS & MENTORIAS",
    position: "right",
  },
  {
    src: "/images/header-photo.png",
    alt: "Header photo",
    text: "EMPREENDIMENTOS",
    position: "left",
  },
];

export default function VerticalPhotoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fullscreenState, setFullscreenState] = useState<{
    isOpen: boolean;
    type: "palestras" | "aulas" | "empreendimentos" | null;
    imageSrc: string;
    imageAlt: string;
  }>({
    isOpen: false,
    type: null,
    imageSrc: "",
    imageAlt: "",
  });

  const handlePhotoClick = (
    type: "palestras" | "aulas" | "empreendimentos",
    imageSrc: string,
    imageAlt: string
  ) => {
    setFullscreenState({
      isOpen: true,
      type,
      imageSrc,
      imageAlt,
    });
  };

  const handleCloseFullscreen = () => {
    setFullscreenState({
      isOpen: false,
      type: null,
      imageSrc: "",
      imageAlt: "",
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Add a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      const photos = containerRef.current?.querySelectorAll("[data-photo]");
      if (!photos || photos.length === 0) {
        return;
      }

      // Function to calculate responsive text position
      const calculateTextPosition = (overlay: HTMLElement) => {
        const overlayHeight = overlay.offsetHeight;
        // When overlay moves down by 80%, we want text at the top of the visible overlay area
        // The overlay shows only the bottom 20%, so we move text up by 30% to position it
        // at the top of that visible 20% area (from center to top of visible overlay)
        return -(overlayHeight * 0.4);
      };

      // Helper function to reset a photo's overlay and text
      const resetPhoto = (photoIndex: number) => {
        const photo = photos[photoIndex];
        if (!photo) return;

        const overlay = photo.querySelector(
          `[data-overlay="overlay-${photoIndex}"]`
        ) as HTMLElement;
        const text = photo.querySelector(
          `[data-text="text-${photoIndex}"]`
        ) as HTMLElement;

        if (overlay && text) {
          gsap.to(overlay, {
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
          gsap.to(text, {
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      };

      photos.forEach((photo, index) => {
        const overlay = photo.querySelector(
          `[data-overlay="overlay-${index}"]`
        ) as HTMLElement;
        const text = photo.querySelector(
          `[data-text="text-${index}"]`
        ) as HTMLElement;
        const nextPhoto = photos[index + 1] as HTMLElement;

        if (!overlay || !text) {
          return;
        }

        // Set initial state - overlay covers the entire image from top
        gsap.set(overlay, {
          y: 0,
          height: "100%",
        });

        // Set initial text position (centered)
        gsap.set(text, {
          y: 0,
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
            console.log(`onEnter photo ${index}`);
            // Reset all previous photos when entering a new one
            for (let i = 0; i < index; i++) {
              resetPhoto(i);
            }

            // Calculate responsive text positioning
            const textPosition = calculateTextPosition(overlay);

            // Slide overlay down and move text to top for current photo
            gsap.to(overlay, {
              y: "80%",
              duration: 0.8,
              ease: "power2.out",
            });
            gsap.to(text, {
              y: textPosition,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            // Reset overlay and text when moving to next section
            gsap.to(overlay, {
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
            gsap.to(text, {
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            // Calculate responsive text positioning first
            const textPosition = calculateTextPosition(overlay);

            // Show overlay down and move text to top when scrolling back into view
            gsap.to(overlay, {
              y: "80%",
              duration: 0.8,
              ease: "power2.out",
            });
            gsap.to(text, {
              y: textPosition,
              duration: 0.8,
              ease: "power2.out",
            });

            // Reset all following photos after a small delay to avoid conflicts
            setTimeout(() => {
              for (let i = index + 1; i < photos.length; i++) {
                resetPhoto(i);
              }
            }, 50);
          },
          onLeaveBack: () => {
            // Reset when scrolling back up past trigger
            gsap.to(overlay, {
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
            gsap.to(text, {
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          },
        });
      });

      // Create a ScrollTrigger for the entire grid section to reset all photos when leaving
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => {
          // Reset all photos when leaving the grid section (scrolling down)
          for (let i = 0; i < photos.length; i++) {
            resetPhoto(i);
          }
        },
        onLeaveBack: () => {
          // Reset all photos when leaving the grid section (scrolling up)
          for (let i = 0; i < photos.length; i++) {
            resetPhoto(i);
          }
        },
      });
    }, 100);

    // Handle window resize to recalculate text positions
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-col gap-19 w-full max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-4xl mx-auto px-2 sm:px-3 lg:px-4 @container"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.src}
            data-photo={`photo-${index}`}
            className={`relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6] xl:aspect-[3/4] overflow-hidden rounded-xl shadow-2xl cursor-pointer ${
              photo.position === "left"
                ? "self-start w-full sm:w-5/6 lg:w-4/5"
                : "self-end w-full sm:w-5/6 lg:w-4/5"
            }`}
            // Framer Motion animations for hover/tap
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onClick={() => {
              const typeMap: Record<
                string,
                "palestras" | "aulas" | "empreendimentos"
              > = {
                "Conhecimento Compartilhado": "palestras",
                "Formação Especializada": "aulas",
                "Projetos Inovadores": "empreendimentos",
              };
              handlePhotoClick(typeMap[photo.text]!, photo.src, photo.alt);
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 95vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, 60vw"
            />
            {/* Overlay for GSAP control */}
            <div
              className={`absolute inset-0 bg-primary/90 flex items-center ${
                photo.position === "left"
                  ? "justify-start pl-6"
                  : "justify-end pr-6"
              }`}
              data-overlay={`overlay-${index}`}
            >
              <span
                className="text-primary-foreground text-xl min-[23rem]:text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl
                         @[25rem]:text-3xl @[35rem]:text-4xl @lg:text-3xl @xl:text-4xl @2xl:text-5xl
                         font-bold text-center z-10 px-4 py-2 max-w-[80%] leading-tight"
                data-text={`text-${index}`}
              >
                {photo.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Components */}
      <PalestrasFullscreen
        isOpen={fullscreenState.isOpen && fullscreenState.type === "palestras"}
        onClose={handleCloseFullscreen}
        imageSrc={fullscreenState.imageSrc}
        imageAlt={fullscreenState.imageAlt}
      />

      <AulasMentoriasFullscreen
        isOpen={fullscreenState.isOpen && fullscreenState.type === "aulas"}
        onClose={handleCloseFullscreen}
        imageSrc={fullscreenState.imageSrc}
        imageAlt={fullscreenState.imageAlt}
      />

      <EmpreendimentosFullscreen
        isOpen={
          fullscreenState.isOpen && fullscreenState.type === "empreendimentos"
        }
        onClose={handleCloseFullscreen}
        imageSrc={fullscreenState.imageSrc}
        imageAlt={fullscreenState.imageAlt}
      />
    </>
  );
}
