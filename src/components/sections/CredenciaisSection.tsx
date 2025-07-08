"use client";

import ServiceBoxes from "@/components/ServiceBoxes";

export default function ServicesSection() {
  return (
    <section className="min-h-fit bg-secondary-foreground text-secondary py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="w-full mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black leading-none">
            Nossos Serviços
          </h2>
          <p className="text-lg sm:text-xl mt-4 opacity-90">
            Advocacia militar especializada para defender seus direitos
          </p>
        </div>
        <ServiceBoxes />

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
