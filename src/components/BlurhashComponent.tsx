"use client";

import React, { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import Image from "next/image";

interface BlurhashComponentProps {
  blurhash?: string;
  width?: number;
  height?: number;
  punch?: number;
  className?: string;
  src?: string;
  alt?: string;
  resolutionX?: number;
  resolutionY?: number;
}

export default function BlurhashComponent({
  blurhash = "L26aq|-o000L~WRiI=Nc+[nhJBJU",
  width = 400,
  height = 300,
  punch = 1,
  className = "",
  src,
  alt = "Blurhash placeholder",
  resolutionX = 32,
  resolutionY = 32,
}: BlurhashComponentProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    if (src) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [src]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Blurhash placeholder - always rendered when there's a blurhash */}
      {blurhash && (
        <Blurhash
          hash={blurhash}
          width={width}
          height={height}
          resolutionX={resolutionX}
          resolutionY={resolutionY}
          punch={punch}
          className={`absolute inset-0 transition-opacity duration-300 ${
            imageLoaded && !imageError ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Actual image - only rendered if src is provided */}
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded && !imageError ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Error state - shown if image fails to load */}
      {imageError && src && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
