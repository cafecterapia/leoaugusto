"use client";

import ServiceBoxes from "@/components/ServiceBoxes";

interface ServicesSectionProps {
  onContactWithServices?: (selectedServices: string[]) => void;
}

export default function ServicesSection({
  onContactWithServices,
}: ServicesSectionProps) {
  return (
    <section
      id="servicos"
      className="min-h-fit bg-secondary-foreground text-secondary py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full mb-8 sm:mb-12">
          <div className="text-5xl sm:text-3xl lg:text-4xl xl:text-4xl font-black leading-none space-y-2 md:space-y-4">
            <div className="text-left">Nossos</div>
            <div className="text-center ml-6 md:ml-16">Serviços</div>
          </div>
          <p className="text-lg sm:text-xl mt-4 opacity-90">
            Advocacia militar especializada para defender seus direitos
          </p>
        </div>
        <ServiceBoxes
          onContactWithServices={onContactWithServices || undefined}
        />

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <div className="bg-secondary/10 rounded-lg p-6 inline-block">
            <p className="text-sm sm:text-base">
              <span className="font-semibold">(21) 97126 2427</span> |{" "}
              <span className="mx-2">
                Rua Tecno Otoni, 52 Sala 201, Centro RJ
              </span>{" "}
              |{" "}
              <span className="font-semibold">
                Imf.advocacia militar@gmail.com
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
