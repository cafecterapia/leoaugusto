"use client";

import { lazy, useEffect, useState } from "react";

// Lazy load the heavy ServiceBoxes component
const ServiceBoxes = lazy(() => import("@/components/ServiceBoxes"));

interface ServicesSectionProps {
  selectedServiceIndices: number[];
  onServiceSelectionChange: (indices: number[]) => void;
}

// Static placeholder component that looks like ServiceBoxes
const ServiceBoxesPlaceholder = () => {
  const placeholderServices = [
    "Acompanhamento de procedimento administrativos (Sindicância e IPM) e judiciais",
    "Ressarcimento de Preterição",
    "Conselho de Disciplina e Conselho de Justificação",
    "Remoção/Movimentação com ou sem ônus",
    "Reintegração/Reinclusão ao SAM, EB e FAB",
    "Impedimentos a Cursos de Formação de Cabo, Sargento e Oficiais",
    "Reforma de Militares na Esfera Administrativa/Judicial",
    "Descontos e/ou cobranças indevidas",
  ];

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <div className="text-center mb-6 lg:mb-8">
        <p className="text--color-primary-foreground/70 text-sm lg:text-base font-medium">
          💡 Clique nos serviços para selecioná-los e entrar em contato
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
        {placeholderServices.map((service, index) => (
          <div key={index} className="group relative">
            <div className="aspect-square w-full">
              <div className="h-full p-3 sm:p-6 lg:p-8 xl:p-10 border-2 lg:border-4 rounded-xl lg:rounded-2xl xl:rounded-3xl bg-transparent border-primary">
                <div className="flex items-center justify-center h-full relative">
                  <p className="text-secondary-foreground text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-relaxed">
                    {service}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ServicesSection({
  selectedServiceIndices,
  onServiceSelectionChange,
}: ServicesSectionProps) {
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Start loading the interactive component after initial render
    const timer = setTimeout(() => {
      setIsInteractive(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="servicos"
      className="min-h-fit bg--color-primary-background text--color-primary-foreground py-16 sm:py-20 lg:py-24 xl:py-28 2xl:py-32 px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 @container isolate"
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
          <div className="text-5xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl @lg:text-4xl @xl:text-5xl @2xl:text-6xl @[1400px]:text-7xl font-black leading-none space-y-2 md:space-y-4 lg:space-y-6">
            <div className="text-left">Nossos</div>
            <div className="text-center ml-6 md:ml-16 lg:ml-20 xl:ml-24">
              Serviços
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl @lg:text-xl @xl:text-2xl @2xl:text-3xl mt-4 lg:mt-6 xl:mt-8 opacity-90">
            Advocacia militar especializada para defender seus direitos
          </p>
        </div>

        {isInteractive ? (
          <ServiceBoxes
            selectedIndices={selectedServiceIndices}
            onSelectionChange={onServiceSelectionChange}
          />
        ) : (
          <ServiceBoxesPlaceholder />
        )}

        {/* Contact Information */}
        <div className="mt-12 lg:mt-16 xl:mt-20 text-center">
          <div className="bg-gray-300 dark:bg-gray-900 rounded-lg lg:rounded-xl xl:rounded-2xl p-6 lg:p-8 xl:p-10 @lg:p-8 @xl:p-10 @2xl:p-12 inline-block">
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl @lg:text-base @xl:text-lg @2xl:text-xl">
              <span className="font-semibold">(21) 97126 2427</span> |{" "}
              <span className="mx-2">
                Rua Teófilo Otoni, 52 Sala 201, Centro RJ
              </span>{" "}
              |{" "}
              <span className="font-semibold">
                Imf.advocaciamilitar@gmail.com
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
