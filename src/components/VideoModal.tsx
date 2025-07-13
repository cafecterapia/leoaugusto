"use client";

import { useEffect, useRef } from "react";
import VimeoVideo from "./VimeoVideo";
import { useLenis } from "./LenisProvider";
import { useVideoModalState } from "../hooks/useVideoModalState";

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
  const { setVideoModalOpen } = useVideoModalState();

  // Sync with global video modal state
  useEffect(() => {
    setVideoModalOpen(isOpen);
  }, [isOpen, setVideoModalOpen]);

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

      // Create proper isolation from underlying content
      // This prevents mix-blend-mode effects from bleeding through
      document.body.style.isolation = "isolate";

      // Add a class to body to help with any global CSS adjustments
      document.body.classList.add("video-modal-open");
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.isolation = "";
      document.body.classList.remove("video-modal-open");

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
      document.body.style.isolation = "";
      document.body.classList.remove("video-modal-open");
      start(); // Ensure Lenis is always restarted on cleanup
    };
  }, [isOpen, stop, start]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Enhanced dark overlay background with proper isolation */}
      <div
        className="absolute inset-0 bg-black backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.95)", // More opaque for better isolation
          isolation: "isolate", // Create new stacking context
        }}
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
