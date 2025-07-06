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
        {/* Navigation and Social Links - Mobile First */}
        <div className="flex flex-col space-y-8 mb-8 md:flex-row md:justify-between md:space-y-0">
          {/* Navigation Column */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-medium mb-2">Navegação</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#home"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Início
              </a>
              <a
                href="#about"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Sobre
              </a>
              <a
                href="#work"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Trabalhos
              </a>
              <a
                href="#contact"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Contato
              </a>
              <button className="text-sm hover:opacity-70 transition-opacity text-left">
                Privacy Policy
              </button>
            </nav>
          </div>

          {/* Social Links Column */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-medium mb-2">Redes Sociais</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="https://linkedin.com/in/leoaugusto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/leoaugusto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                GitHub
              </a>
              <a
                href="https://instagram.com/leoaugusto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="mailto:contact@leoaugusto.com"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center mb-8">
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
        </div>

        {/* Copyright at the bottom */}
        <div className="text-center">
          <span className="text-sm">© 2025 Leonardo Augusto</span>
        </div>
      </div>
    </footer>
  );
}
