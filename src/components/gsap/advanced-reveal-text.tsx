"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AdvancedRevealTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  splitBy?: "lines" | "words" | "chars";
}

export const AdvancedRevealText: React.FC<AdvancedRevealTextProps> = ({
  children,
  delay = 0,
  duration = 1,
  stagger = 0.1,
  className = "",
  splitBy = "lines",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Show the container when animation starts (after delay)
    gsap.set(container, { opacity: 1, delay: delay });

    const textElements = container.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span"
    );

    textElements.forEach((element, elementIndex) => {
      const text = element.textContent || "";
      const words = text.split(/\s+/);

      // Clear the element
      element.innerHTML = "";

      if (splitBy === "lines") {
        // Create line containers
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement("span");
          wordSpan.textContent = word;
          wordSpan.style.display = "inline-block";
          wordSpan.style.overflow = "hidden";
          wordSpan.style.verticalAlign = "top";

          // Create the reveal wrapper
          const revealWrapper = document.createElement("span");
          revealWrapper.style.display = "inline-block";
          revealWrapper.style.transform = "translateY(100%)";
          revealWrapper.style.opacity = "0";
          revealWrapper.textContent = word;

          wordSpan.appendChild(revealWrapper);
          element.appendChild(wordSpan);

          // Add space after word (except last word)
          if (wordIndex < words.length - 1) {
            element.appendChild(document.createTextNode(" "));
          }

          // Animate each word
          gsap.to(revealWrapper, {
            y: "0%",
            opacity: 1,
            duration: duration,
            delay: delay + elementIndex * stagger + wordIndex * 0.05,
            ease: "power3.out",
          });
        });
      } else if (splitBy === "words") {
        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement("span");
          wordSpan.style.display = "inline-block";
          wordSpan.style.transform = "translateY(100%)";
          wordSpan.style.opacity = "0";
          wordSpan.textContent = word;

          element.appendChild(wordSpan);

          // Add space after word (except last word)
          if (wordIndex < words.length - 1) {
            element.appendChild(document.createTextNode(" "));
          }

          // Animate each word
          gsap.to(wordSpan, {
            y: "0%",
            opacity: 1,
            duration: duration,
            delay: delay + elementIndex * stagger + wordIndex * 0.1,
            ease: "power3.out",
          });
        });
      }
    });

    // Cleanup function
    return () => {
      const allElements = container.querySelectorAll("*");
      allElements.forEach((el) => {
        gsap.killTweensOf(el);
      });
    };
  }, [delay, duration, stagger, splitBy]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
