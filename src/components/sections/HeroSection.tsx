"use client";

export default function HeroSection() {
  return (
    <section
      style={{
        color: "white",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "2rem 1rem",
        minHeight: "47rem",
        paddingTop: "23rem",
        paddingBottom: "4rem",
        backgroundColor: "#1e293b", // Fallback color
        backgroundImage: "url('/images/hero-photo.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
