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
        {/* Navigation and Social Links */}
        <div className="flex justify-start mb-8 gap-16 md:gap-24">
          {/* Navigation Column */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-medium mb-2">Navegação</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#sobre"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Sobre
              </a>
              <a
                href="#servicos"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Serviços
              </a>
              <a
                href="#palestras"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Palestras
              </a>
              <a
                href="#mentorias"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Mentorias
              </a>
              <a
                href="#contact-section"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Contato
              </a>
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
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com/augustoleonardo.prof"
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
          <span className="text-sm mx-2">•</span>
          <button className="text-sm hover:opacity-70 transition-opacity">
            Política de Privacidade
          </button>
        </div>
      </div>
    </footer>
  );
}
