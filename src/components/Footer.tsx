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
          <p className="text-sm text-gray-300 mb-8">Advocacia militar</p>

          {/* Fine separator line */}
          <div className="w-full h-px bg-gray-700 mx-auto"></div>
        </div>

        {/* Address and Social Links */}
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
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>

            {/* Second row: LinkedIn and Email */}
            <div className="flex space-x-6">
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
