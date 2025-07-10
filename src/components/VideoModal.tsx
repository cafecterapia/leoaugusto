"use client";

import { useEffect, useRef } from "react";
import VimeoVideo from "./VimeoVideo";
import { useLenis } from "./LenisProvider";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId,
}: VideoModalProps) {
  const savedScrollY = useRef(0);
  const { stop, start } = useLenis();

  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  // Lock/unlock scroll when modal opens/closes using Lenis
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      savedScrollY.current = window.scrollY;

      // Stop Lenis smooth scrolling
      stop();

      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      // Restore scroll position instantly without smooth scrolling
      if (savedScrollY.current !== 0) {
        window.scrollTo({
          top: savedScrollY.current,
          left: 0,
          behavior: "auto", // Instant jump, no smooth scrolling
        });
      }

      // Re-enable Lenis smooth scrolling after a brief delay
      setTimeout(() => {
        start();
      }, 50);
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "";
      start(); // Ensure Lenis is always restarted on cleanup
    };
  }, [isOpen, stop, start]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-6xl mx-4 flex flex-col items-center">
        {/* Video container */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          <VimeoVideo
            videoId={videoId}
            autoplay={true}
            muted={false}
            loop={false}
            background={false}
            controls={true}
            className="w-full h-full"
          />
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-6 bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 border border-gray-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
