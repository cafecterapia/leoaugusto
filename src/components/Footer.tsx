"use client";

import { useLenis } from "lenis/react";

export default function Footer() {
  const lenis = useLenis();

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };
  return (
    <footer className="w-full py-16 bg-black text-white isolate">
      <div className="max-w-6xl mx-auto px-6">
        {/* Professional Information */}
        <div className="text-center mb-12">
          <h2 className="text-lg font-medium mb-1">Dr. Leonardo Augusto</h2>
          <p className="text-sm text-gray-300 mb-1">OAB RJ 266.250</p>
          <p className="text-sm text-gray-300 mb-8">Advocacia Militar</p>

          {/* Fine separator line */}
          <div className="w-full h-px bg-gray-700 mx-auto"></div>
        </div>

        {/* Address, Office Hours and Social Links */}
        <div className="flex justify-between items-start mb-8">
          {/* Address Column - Far Left */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-sm font-medium mb-2">Endereço</h3>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-300">Rio de Janeiro, RJ</p>
              <p className="text-sm text-gray-300">Rua Teófilo Otoni</p>
              <p className="text-sm text-gray-300">52 Sala 201, Centro RJ</p>
            </div>
          </div>

          {/* Office Hours Column - Middle (Desktop Only) */}
          <div className="flex-col space-y-3 max-lg:hidden">
            <h3 className="text-sm font-medium mb-2">
              Horário de Funcionamento
            </h3>
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-300">Segunda a Sexta</p>
              <p className="text-sm text-gray-300">09:00 - 18:00</p>
              <p className="text-sm text-gray-300">Sábado: Sob agendamento</p>
            </div>
          </div>

          {/* Social Icons Column - Right Side */}
          <div className="flex flex-col space-y-4 mr-8">
            {/* First row: WhatsApp and Facebook */}
            <div className="flex space-x-6">
              <a
                href="https://wa.me/5521971262427"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/augustoleonardo.prof" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            {/* Second row: LinkedIn and Email */}
            <div className="flex space-x-6">
              <a
                href="https://maps.google.com/?q=Rua+Teófilo+Otoni+52+Sala+201+Centro+Rio+de+Janeiro+RJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Localização no Google Maps"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </a>
              <a
                href="mailto:Imf.advocaciamilitar@gmail.com"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Email"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center mb-8">
          <button
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            onClick={handleScrollToTop}
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
          <a
            href="/politica-de-privacidade"
            className="text-sm hover:opacity-70 transition-opacity underline"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
