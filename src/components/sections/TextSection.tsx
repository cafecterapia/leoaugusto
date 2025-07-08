"use client";

export default function AboutSection() {
  return (
    <section
      id="sobre"
      className="min-h-fit bg-secondary-foreground text-secondary py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12"
    >
      <div className="w-half">
        {/* Header line with "sobre" and "Leonardo Augusto" */}
        <div className="flex items-baseline justify-between mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-1xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight leading-none">
            (sobre)
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-8xl xl:text-9xl font-light leading-none">
            Leonardo Augusto
          </h3>
        </div>

        {/* Description text */}
        <div className="max-w-4xl">
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light leading-relaxed">
            Une 25 anos de experiência como Fuzileiro Naval da Marinha do Brasil
            ao expertise jurídico de mestre e especialista em direito militar.
            Por ter vivido a vida castrense, ele compreende suas complexidades
            como ninguém. Por isso, sua defesa vai além da teoria legal — ela
            nasce da compreensão visceral de quem conhece cada desafio de quem
            porta farda.
          </p>
        </div>
      </div>
    </section>
  );
}
