"use client";

// LQIP base64 from hero-photo.txt
const HERO_LQIP =
  "data:image/webp;base64,UklGRnIDAABXRUJQVlA4IGYDAAAQIwCdASoAAUABP/3+/3+/u7ayIPOYo/A/iWduj15mHebvtzWp0P4SaOyTCIK7sqaaaaijsGMQTojHNsLZvvIc93i9duf//olVik7mur6wQFLtN/61Jn/lb6QqgIQlwtQB4GaTtvNBMKaWPJS/Ka6byXzQ7H/ljwb/tNlg/9wez7etnXbINs/rV7mixFa/3mwMpDRldSSTePKvCWc2q+QXWNJpUpIoCLdc51m3tufHXP3VPDRCX2MXlGMFKmHzODB+iWMhsm+S/zl9ajcvvRxlZoz+fvu2zxWuZ+gOsMGtIj1HZgP8zjVghWCnUZxgyo+12GITuG+8fJwj5niPuX00aLgO0UXJiatqOU4SdZ1Xstpb1xoVlg7J+NSqlrV3/B2AAP7eBTkWIX/ix2eXrsPo0Z08M7l2+SmvyG5MweSfZ725lyYuqum4Nj14PnhVM7wZA6U+I1UCs70BRa90XAUZFkBPKecAXZbscdM1tJ4uaqX6iumRGoaxwAOiwAS7Vu1WAvBf91KLefl4JQUtmx2rJJfGClFx7/Eq9WSdfWikbseByLxvl19Jlv0i4le2xUVdByjL68j/GEfvESIjB0x+pPYsLs+YdgCg3NzUBgHE+xOyI9+pJnU69OpuNDNR2WS6RzUvdbtGj1qwfk+fLXF8F+pllepbgQCprFXP4TKJMG3hxCPAunf6tB5jK1whbTcWZEIO723kO0RMuDcQ+esYn6zMpEsw8iNcCeHFy+K58vn0YiOPi3emhvesse7RE3kPgpO4qj2espZy21oDXcq5l0oiq27puLnL9lJyJWJcdWkGz+61k7Wupga6j1ySUQsdeBmn+o7UKofRtQuIz722IyOD6+Wj8Z+xn8aiMo2CfF9fUK8cbj9q68Tup3fB88ZTifmM9BOf1fFmzi+fZvxmELaGJZF/npjhTeETf53SoXUjQNeAuec855XSx2X4efsrnF7LZtzxFytLBwyOhrKB9tFg0tLQ4eKh7UCEBRuiGS1gmfiKDdlGcjGwdnqoZHFgvwnxMy9/p9joFWTZjg91W+Puq9yUgvKPbEFq6oGJiicf1Ga84gqt7DnsRR4jpH02EXgQKL3TFwnAMeX1R4zXurGF+c63zy3OequIM/lKwomuE66vMARyc3IDTQPVckQ7e6bPwAA=";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        color: "white",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "2rem 1rem",
        minHeight: "47rem",
        paddingTop: "23rem",
        paddingBottom: "4rem",
        backgroundColor: "#353537", // Fixed background color - always this color regardless of theme
        overflow: "hidden",
        backgroundImage: `url('/images/hero-photo.avif'), url('${HERO_LQIP}')`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      {/* Hidden img for eager loading with high priority */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-photo.avif"
        alt=""
        loading="eager"
        fetchPriority="high"
        style={{ display: "none" }}
      />

      {/* Content Layer */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
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
