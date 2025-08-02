"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const photos = [
  {
    src: "/images/palestras4.avif",
    alt: "Luiz",
    text: "PALESTRAS",
  },
  {
    src: "/images/LuizFelipe.avif",
    alt: "Felipe",
    text: "AULAS & MENTORIAS",
  },
  {
    src: "/api/hero-image?name=lfam.avif",
    alt: "Angelo Miranda",
    text: "EMPREENDIMENTOS",
  },
];

export default function VerticalPhotoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  // DEBUG TOOL 1: Scroll Position Tracker
  // const logScrollState = (
  //   photoIndex: number,
  //   event: string,
  //   scrollY: number
  // ) => {
  //   console.log(
  //     `[SCROLL] Photo ${photoIndex} | Event: ${event} | ScrollY: ${scrollY}px`
  //   );
  // };

  // DEBUG TOOL 2: Animation State Monitor
  // const logAnimationState = (
  //   photoIndex: number,
  //   overlayY: string | number,
  //   textY: number
  // ) => {
  //   console.log(
  //     `[ANIMATION] Photo ${photoIndex} | Overlay Y: ${overlayY} | Text Y: ${textY}px`
  //   );
  // };

  // DEBUG TOOL 3: ScrollTrigger Debug
  // const logTriggerEvent = (
  //   photoIndex: number,
  //   event: string,
  //   triggerStart: string,
  //   triggerEnd: string
  // ) => {
  //   console.log(
  //     `[TRIGGER] Photo ${photoIndex} | ${event} | Start: ${triggerStart} | End: ${triggerEnd}`
  //   );
  // };

  useEffect(() => {
    if (!containerRef.current) return;

    // Store container ref to avoid React warning
    const container = containerRef.current;

    // Check if device is desktop (lg breakpoint and above)
    const isDesktop = () => window.innerWidth >= 1024;

    // Increased delay to ensure proper DOM rendering and reduce early calculations
    const timer = setTimeout(async () => {
      const photos = container?.querySelectorAll("[data-photo]");
      if (!photos || photos.length === 0) {
        return;
      }

      // Dynamically import GSAP to reduce initial bundle size
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      // Register GSAP plugins after dynamic import
      gsap.registerPlugin(ScrollTrigger);

      // Pre-calculate all dimensions to minimize reflows during scroll
      const photoData = Array.from(photos)
        .map((photo, index) => {
          const photoElement = photo as HTMLElement;
          const overlay = photo.querySelector(
            `[data-overlay="overlay-${index}"]`
          ) as HTMLElement;
          const text = photo.querySelector(
            `[data-text="text-${index}"]`
          ) as HTMLElement;

          if (!overlay || !text) return null;

          // Batch all DOM reads together
          const photoHeight = photoElement.offsetHeight;
          const overlayHeight = overlay.offsetHeight;
          const textPosition = -(overlayHeight * 0.4);

          return {
            photo: photoElement,
            overlay,
            text,
            photoHeight,
            textPosition,
            index,
          };
        })
        .filter(Boolean);

      // Helper function to reset a photo's overlay and text - now uses pre-calculated data
      const resetPhoto = (photoIndex: number) => {
        const data = photoData[photoIndex];
        if (!data) return;

        gsap.to(data.overlay, {
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
        gsap.to(data.text, {
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      // Helper function to show photo content
      const showPhoto = (data: {
        overlay: HTMLElement;
        text: HTMLElement;
        textPosition: number;
      }) => {
        gsap.to(data.overlay, {
          y: "80%",
          duration: 0.8,
          ease: "power2.out",
        });
        gsap.to(data.text, {
          y: data.textPosition,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      photoData.forEach((data) => {
        if (!data) return;

        // Set initial state - overlay covers the entire image from top
        gsap.set(data.overlay, {
          y: 0,
          height: "100%",
        });

        // Set initial text position (centered)
        gsap.set(data.text, {
          y: 0,
        });

        // Desktop hover behavior
        if (isDesktop()) {
          const handleMouseEnter = () => showPhoto(data);
          const handleMouseLeave = () => resetPhoto(data.index);

          data.photo.addEventListener("mouseenter", handleMouseEnter);
          data.photo.addEventListener("mouseleave", handleMouseLeave);

          // Store cleanup functions
          (
            data.photo as HTMLElement & { _hoverCleanup?: () => void }
          )._hoverCleanup = () => {
            data.photo.removeEventListener("mouseenter", handleMouseEnter);
            data.photo.removeEventListener("mouseleave", handleMouseLeave);
          };
        } else {
          // Mobile scroll behavior (existing logic)
          ScrollTrigger.create({
            trigger: data.photo,
            start: "bottom bottom",
            end: `+=${data.photoHeight * (data.index === 0 ? 1.2 : data.index === 1 ? 1.19 : 1.2)}`,
            scrub: false,
            markers: false,
            id: `photo-${data.index}`,
            onEnter: () => {
              // Reset all previous photos when entering a new one
              for (let i = 0; i < data.index; i++) {
                resetPhoto(i);
              }
              showPhoto(data);
            },
            onLeave: () => {
              // For the last photo, reset it when leaving the trigger
              if (data.index === photos.length - 1) {
                resetPhoto(data.index);
              }
            },
            onEnterBack: () => {
              showPhoto(data);
              // Reset all following photos
              for (let i = data.index + 1; i < photos.length; i++) {
                resetPhoto(i);
              }
            },
            onLeaveBack: () => {
              resetPhoto(data.index);
            },
          });
        }
      });
    }, 150); // Slightly increased delay for better stability

    // Handle window resize to recalculate text positions
    const handleResize = async () => {
      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        ScrollTrigger.refresh();
      } catch {
        // GSAP might not be loaded yet, ignore resize error
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);

      // Clean up hover listeners for desktop
      const photos = container?.querySelectorAll("[data-photo]");
      if (photos) {
        photos.forEach((photo) => {
          const cleanup = (
            photo as HTMLElement & { _hoverCleanup?: () => void }
          )._hoverCleanup;
          if (cleanup) cleanup();
        });
      }

      // Clean up ScrollTrigger instances - use dynamic import in cleanup too
      Promise.resolve().then(async () => {
        try {
          const { ScrollTrigger } = await import("gsap/ScrollTrigger");
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        } catch {
          // GSAP might not be loaded yet, ignore cleanup error
        }
      });
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        // MODIFIED: Increased max-width on lg/xl screens and adjusted the gap for desktop
        className="flex flex-col lg:flex-row gap-16 lg:gap-8 w-full max-w-md sm:max-w-xl lg:max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 @container"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.src}
            data-photo={`photo-${index}`}
            className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6] xl:aspect-[3/4] overflow-hidden rounded-xl shadow-2xl w-full sm:w-5/6 lg:w-1/3"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              // MODIFIED: Updated sizes to reflect the larger desktop dimensions for better performance
              sizes="(max-width: 768px) 80vw, (max-width: 1280px) 30vw, 33vw"
            />
            {/* Overlay for GSAP control */}
            <div
              className="absolute inset-0 bg-primary/90 flex items-center justify-center"
              data-overlay={`overlay-${index}`}
            >
              <span
                className="text-primary-foreground text-xl min-[23rem]:text-2xl sm:text-3xl md:text-4xl lg:text-lg xl:text-xl 2xl:text-2xl
                         @[25rem]:text-3xl @[35rem]:text-4xl @lg:text-lg @xl:text-xl @2xl:text-2xl
                         font-bold text-center z-10 px-4 py-2 max-w-[80%] leading-tight"
                data-text={`text-${index}`}
              >
                {photo.text}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
