"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const photos = [
  {
    src: "/images/AngeloMiranda.avif",
    alt: "Grid photo 1",
    text: "PALESTRAS",
    position: "left",
  },
  {
    src: "/images/LuizFelipe.avif",
    alt: "Grid photo 2",
    text: "AULAS & MENTORIAS",
    position: "right",
  },
  {
    src: "/api/hero-image?name=lfam.avif",
    alt: "Header photo",
    text: "EMPREENDIMENTOS",
    position: "left",
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

    // Add a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(async () => {
      const photos = containerRef.current?.querySelectorAll("[data-photo]");
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

          // logAnimationState(photoIndex, 0, 0);
          // console.log(`[RESET] Photo ${photoIndex} reset to initial state`);
        }
      };

      photos.forEach((photo, index) => {
        const overlay = photo.querySelector(
          `[data-overlay="overlay-${index}"]`
        ) as HTMLElement;
        const text = photo.querySelector(
          `[data-text="text-${index}"]`
        ) as HTMLElement;
        // const nextPhoto = photos[index + 1] as HTMLElement;

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

        // Debug: Log trigger setup
        // console.log(`[SETUP] Photo ${index} trigger setup:`, {
        //   start: "bottom bottom",
        //   end: `+=${(photo as HTMLElement).offsetHeight * (index === 0 ? 1.2 : index === 1 ? 0.8 : 0.5)}`,
        //   photoHeight: (photo as HTMLElement).offsetHeight,
        //   photoTop: (photo as HTMLElement).offsetTop,
        // });

        // Create ScrollTrigger for revealing the image
        ScrollTrigger.create({
          trigger: photo,
          start: "bottom bottom", // When bottom of photo hits bottom of viewport
          end: () =>
            `+=${(photo as HTMLElement).offsetHeight * (index === 0 ? 1.2 : index === 1 ? 1.19 : 1.2)}`, // Photo 0 & 1 get longer triggers (120%), Photo 2 gets 50%
          scrub: false,
          markers: false, // Disabled markers for clean mobile experience
          id: `photo-${index}`, // Give each trigger a unique ID
          onEnter: () => {
            // logScrollState(index, "onEnter", window.scrollY);
            // logTriggerEvent(
            //   index,
            //   "onEnter",
            //   "bottom bottom",
            //   nextPhoto ? "next photo top" : "bottom bottom"
            // );

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

            // logAnimationState(index, "80%", textPosition);
          },
          onLeave: () => {
            // logScrollState(index, "onLeave", window.scrollY);
            // logTriggerEvent(index, "onLeave", "bottom bottom", "next trigger");

            // For the last photo (photo 2), reset it when leaving the trigger
            if (index === photos.length - 1) {
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
              // logAnimationState(index, 0, 0);
              // console.log(`[RESET] Last photo ${index} reset on leave`);
            }
            // For other photos, don't reset here - let the next photo's onEnter handle it
          },
          onEnterBack: () => {
            // logScrollState(index, "onEnterBack", window.scrollY);
            // logTriggerEvent(
            //   index,
            //   "onEnterBack",
            //   "scrolling up",
            //   "re-entering"
            // );

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

            // logAnimationState(index, "80%", textPosition);

            // Reset all following photos (those that come after current one)
            for (let i = index + 1; i < photos.length; i++) {
              resetPhoto(i);
            }
          },
          onLeaveBack: () => {
            // logScrollState(index, "onLeaveBack", window.scrollY);
            // logTriggerEvent(
            //   index,
            //   "onLeaveBack",
            //   "scrolling back up",
            //   "past trigger"
            // );

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

            // logAnimationState(index, 0, 0);
          },
        });
      });
    }, 100);

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
        className="flex flex-col gap-19 w-full max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-4xl mx-auto px-2 sm:px-3 lg:px-4 @container"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.src}
            data-photo={`photo-${index}`}
            className={`relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6] xl:aspect-[3/4] overflow-hidden rounded-xl shadow-2xl ${
              photo.position === "left"
                ? "self-start w-full sm:w-5/6 lg:w-4/5"
                : "self-end w-full sm:w-5/6 lg:w-4/5"
            }`}
            // Framer Motion animations for hover/tap
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
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
    </>
  );
}
