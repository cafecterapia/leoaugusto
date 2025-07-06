"use client";

export default function Footer() {
  return (
    <footer
      className="w-full py-16"
      style={{
        backgroundColor: "var(--color-background-secondary)",
        color: "var(--color-secondary-foreground)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top section with "De volta ao top" and "Privacy Policy" */}
        <div className="flex justify-between items-center mb-8">
          <button
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
          >
            <span className="text-sm">De volta ao top</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button className="text-sm hover:opacity-70 transition-opacity">
            Privacy Policy
          </button>
        </div>

        {/* Copyright at the bottom */}
        <div className="text-center">
          <span className="text-sm">Copyright 2025 Leonardo Augusto</span>
        </div>
      </div>
    </footer>
  );
}
