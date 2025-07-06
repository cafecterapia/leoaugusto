"use client";

export default function AboutSection() {
  return (
    <section className="min-h-fit bg-secondary-foreground text-secondary py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-12">
      <div className="w-half">
        {/* Header line with "sobre" and "Leonardo Augusto" */}
        <div className="flex items-baseline justify-between mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight leading-none">
            (sobre)
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-8xl xl:text-9xl font-light leading-none">
            Leonardo Augusto
          </h3>
        </div>

        {/* Description text */}
        <div className="max-w-4xl">
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extralight leading-relaxed">
            une a vivência de Fuzileiro Naval à autoridade de Mestre em Direito
            Militar. Por ter estado em campo, ele compreende os desafios da vida
            na caserna como poucos. O resultado é uma defesa estratégica que não
            se limita à lei, mas entende profundamente a realidade de quem veste
            a farda.
          </p>
        </div>
      </div>
    </section>
  );
}
