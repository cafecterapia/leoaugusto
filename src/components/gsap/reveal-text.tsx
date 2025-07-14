"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  trigger?: "load" | "scroll";
  threshold?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  delay = 0,
  duration = 1,
  stagger = 0.1,
  className = "",
  trigger = "load",
  threshold = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const animateText = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      // Show the container when animation starts
      gsap.set(container, { opacity: 1 });

      // Get all text elements and split them into lines
      const textElements = container.querySelectorAll(
        "p, h1, h2, h3, h4, h5, h6"
      );

      textElements.forEach((element, index) => {
        // Create a wrapper for the overflow hidden effect
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.position = "relative";

        // Clone the element and wrap it
        const clone = element.cloneNode(true) as HTMLElement;
        clone.style.transform = "translateY(100%)";
        clone.style.opacity = "0";

        // Replace original with wrapped version
        element.parentNode?.insertBefore(wrapper, element);
        wrapper.appendChild(clone);
        element.remove();

        // Animate the reveal
        gsap.to(clone, {
          y: "0%",
          opacity: 1,
          duration: duration,
          delay: delay + index * stagger,
          ease: "power3.out",
        });
      });
    };

    if (trigger === "load") {
      animateText();
    } else if (trigger === "scroll") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !animatedRef.current) {
              animateText();
            }
          });
        },
        { threshold }
      );

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }

    // Cleanup function
    return () => {
      const allClones = container.querySelectorAll("*");
      allClones.forEach((clone) => {
        gsap.killTweensOf(clone);
      });
    };
  }, [delay, duration, stagger, trigger, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
