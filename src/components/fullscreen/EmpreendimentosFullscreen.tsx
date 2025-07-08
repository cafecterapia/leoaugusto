"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface EmpreendimentosFullscreenProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export default function EmpreendimentosFullscreen({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}: EmpreendimentosFullscreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !backgroundRef.current || !contentRef.current)
      return;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      timelineRef.current = tl;

      gsap.set(containerRef.current, { display: "flex" });
      gsap.set(backgroundRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(contentRef.current, { y: 50, opacity: 0 });

      tl.to(containerRef.current, { opacity: 1, duration: 0.3 })
        .to(backgroundRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          contentRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );
    } else {
      document.body.style.overflow = "";

      if (timelineRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            if (containerRef.current) {
              gsap.set(containerRef.current, { display: "none" });
            }
          },
        });

        tl.to(contentRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
          .to(
            backgroundRef.current,
            {
              scale: 0.8,
              opacity: 0,
              duration: 0.4,
              ease: "power2.in",
            },
            "-=0.1"
          )
          .to(containerRef.current, { opacity: 0, duration: 0.2 });
      }
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center opacity-0"
      style={{ display: "none" }}
      onClick={onClose}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-secondary/70" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-8 py-12 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
          Empreendimentos
        </h1>

        <div className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed space-y-6">
          <p>
            Desenvolvemos projetos e empreendimentos inovadores na área do
            Direito Militar, buscando sempre expandir o conhecimento e a
            aplicação prática desta especialização jurídica.
          </p>

          <p>
            Nossos empreendimentos incluem iniciativas de pesquisa,
            desenvolvimento de metodologias de ensino, criação de conteúdo
            especializado e parcerias estratégicas com instituições militares e
            educacionais.
          </p>

          <p>
            Cada projeto é concebido com foco na excelência técnica e na
            contribuição efetiva para o avanço do Direito Militar no Brasil,
            sempre priorizando a qualidade e relevância das soluções oferecidas.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-12 px-8 py-3 bg-white text-primary font-semibold rounded-lg 
                     hover:bg-white/90 transition-colors duration-300"
        >
          Fechar
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm 
                   rounded-full flex items-center justify-center text-white hover:bg-white/30 
                   transition-colors duration-300"
        aria-label="Fechar"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
