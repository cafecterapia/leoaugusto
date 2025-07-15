"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";
import { useLenis } from "lenis/react";

export default function VideoSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lenis = useLenis();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOpenVideo = () => {
    if (!sectionRef.current) {
      setIsVideoModalOpen(true);
      return;
    }

    setIsNavigating(true);

    // Get current scroll position and section bounds
    const currentScrollY = window.scrollY;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionTop = currentScrollY + sectionRect.top;
    const sectionHeight = sectionRect.height;
    const viewportHeight = window.innerHeight;

    // Calculate the ideal scroll position to center the section
    const idealScrollY = sectionTop + sectionHeight / 2 - viewportHeight / 2;

    // Check if we're already close to the center (within 100px tolerance)
    const tolerance = 100;
    const isAlreadyCentered =
      Math.abs(currentScrollY - idealScrollY) < tolerance;

    if (isAlreadyCentered) {
      // Already centered, open modal immediately
      setIsNavigating(false);
      setIsVideoModalOpen(true);
    } else {
      // Use Lenis for smooth scrolling to avoid conflicts
      const targetScrollY = Math.max(0, idealScrollY);

      // Ensure we have a valid scroll target
      if (targetScrollY !== currentScrollY && lenis) {
        lenis.scrollTo(targetScrollY, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Wait for scroll to complete before opening modal
        timeoutRef.current = setTimeout(() => {
          setIsNavigating(false);
          setIsVideoModalOpen(true);
        }, 1200); // Match Lenis duration
      } else {
        // No need to scroll, open immediately
        setIsNavigating(false);
        setIsVideoModalOpen(true);
      }
    }
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
  };
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
          priority
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Transformando Vidas
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Através de palestras inspiradoras, mentorias personalizadas e
            empreendimentos inovadores, construímos juntos um melhor futuro.
          </p>
          <button
            onClick={handleOpenVideo}
            disabled={isNavigating}
            className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isNavigating ? "Preparando..." : "Conheça Meu Trabalho"}
          </button>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        videoId="1094815419" // Replace with your actual video ID
      />
    </section>
  );
}
