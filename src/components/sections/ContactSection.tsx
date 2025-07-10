"use client";

import { useState, useEffect } from "react";
import ContactForm from "../ContactForm";

interface ContactSectionProps {
  preSelectedServices?: string[];
}

export default function ContactSection({
  preSelectedServices,
}: ContactSectionProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (preSelectedServices) {
      setSelectedServices(preSelectedServices);
    }
  }, [preSelectedServices]);

  return (
    <section
      id="contact-section"
      className="min-h-screen bg--color-primary-background text--color-primary-foreground flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32 isolate"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Entre em Contato
        </h2>
        <p className="text-lg md:text-xl mb-12 text--color-primary-foreground/80 max-w-2xl mx-auto">
          Precisa de orientação jurídica especializada em Direito Militar? Envie
          sua mensagem e retornaremos em breve.
        </p>

        <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-8 shadow-lg">
          <ContactForm
            email="seuemail@gmail.com"
            preSelectedServices={selectedServices}
          />
        </div>
      </div>
    </section>
  );
}
