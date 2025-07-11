"use client";

import Image from "next/image";
import heroPhoto from "/public/images/hero-photo.png";

export default function HeroSection() {
  return (
    <section
      style={{
        color: "white",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "2rem 1rem", // More generous padding
        position: "relative",
        minHeight: "47rem", // Use rem-based min-height (roughly 800px on most devices)
        // Add some defensive spacing
        paddingTop: "23rem",
        paddingBottom: "4rem",
        isolation: "isolate", // Creates new stacking context for proper z-index layering
        backgroundColor: "#1e293b", // Immediate background color to prevent white flash
        overflow: "hidden", // Prevent any overflow issues during loading
      }}
    >
      <Image
        src={heroPhoto}
        alt="Professional lawyer background - Leonardo Augusto, Master of Law and Military Law Specialist"
        fill
        priority
        sizes="100vw"
        quality={90}
        loading="eager"
        style={{
          objectFit: "cover",
          zIndex: -1,
          backgroundColor: "#1e293b", // Fallback color
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "80rem",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <h1
          style={{
            fontWeight: 900,
            lineHeight: 1,
            fontSize: "2.70rem",
            opacity: 0.88, // Slightly dimmed
          }}
        >
          ADVOGADO
          <br />
          MESTRE EM DIREITO
          <br />
          E ESPECIALISTA EM
          <br />
          DIREITO MILITAR
        </h1>
        <div
          style={{
            marginTop: ".2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            opacity: 1,
          }}
        >
          <div
            style={{
              cursor: "pointer",
              color: "white",
              fontSize: "2.5rem", // Easy size control - adjust this value
              opacity: 0.88, // Slightly dimmed
            }}
          >
            <svg
              width="1em"
              height="2em"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
