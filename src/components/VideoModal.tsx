"use client";

import { useEffect } from "react";
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
  const { stop, start } = useLenis();
  const { setVideoModalOpen } = useVideoModalState();

  // Sync with global video modal state
  useEffect(() => {
    setVideoModalOpen(isOpen);
  }, [isOpen, setVideoModalOpen]);

  // Handle Lenis scroll control for modal
  useEffect(() => {
    if (isOpen) {
      // Stop Lenis scrolling when modal opens
      stop();
    } else {
      // Resume Lenis scrolling when modal closes
      start();
    }

    // Cleanup: ensure scrolling is resumed when component unmounts
    return () => {
      start();
    };
  }, [isOpen, stop, start]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Dark overlay background */}
      <div
        className="absolute inset-0 bg-black backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.95)",
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
