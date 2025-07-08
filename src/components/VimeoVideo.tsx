"use client";

import { useEffect, useRef, useState } from "react";

interface VimeoVideoProps {
  videoId: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  background?: boolean;
  className?: string;
  controls?: boolean;
  quality?: "auto" | "240p" | "360p" | "540p" | "720p" | "1080p";
}

export default function VimeoVideo({
  videoId,
  autoplay = false,
  muted = false,
  loop = false,
  background = false,
  className = "",
  controls = true,
  quality = "auto",
}: VimeoVideoProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Construct Vimeo embed URL with parameters
  const buildVimeoUrl = () => {
    const baseUrl = `https://player.vimeo.com/video/${videoId}`;
    const params = new URLSearchParams();

    if (autoplay) params.set("autoplay", "1");
    if (muted) params.set("muted", "1");
    if (loop) params.set("loop", "1");
    if (background) {
      params.set("background", "1");
      params.set("controls", "0");
      params.set("title", "0");
      params.set("byline", "0");
      params.set("portrait", "0");
    } else {
      params.set("controls", controls ? "1" : "0");
    }

    if (quality !== "auto") {
      params.set("quality", quality);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    iframe.addEventListener("load", handleLoad);
    iframe.addEventListener("error", handleError);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      iframe.removeEventListener("error", handleError);
    };
  }, [videoId]);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="text-center text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>Failed to load video</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg
              className="w-8 h-8 mx-auto mb-2 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={buildVimeoUrl()}
        className="w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={`Vimeo video ${videoId}`}
      />
    </div>
  );
}
