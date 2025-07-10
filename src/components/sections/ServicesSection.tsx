"use client";

import ServiceBoxes from "@/components/ServiceBoxes";

interface ServicesSectionProps {
  selectedServiceIndices: number[];
  onServiceSelectionChange: (indices: number[]) => void;
}

export default function ServicesSection({
  selectedServiceIndices,
  onServiceSelectionChange,
}: ServicesSectionProps) {
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
        <ServiceBoxes
          selectedIndices={selectedServiceIndices}
          onSelectionChange={onServiceSelectionChange}
        />

        {/* Contact Information */}
        <div className="mt-12 lg:mt-16 xl:mt-20 text-center">
          <div className="bg-secondary/10 rounded-lg lg:rounded-xl xl:rounded-2xl p-6 lg:p-8 xl:p-10 @lg:p-8 @xl:p-10 @2xl:p-12 inline-block">
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl @lg:text-base @xl:text-lg @2xl:text-xl">
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
