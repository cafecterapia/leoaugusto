"use client";

export default function AboutSection() {
  return (
    <section
      id="sobre"
      className="min-h-fit bg--color-primary-background text--color-primary-foreground py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 isolate"
    >
      {/* 
        Column 1: The "(sobre)" heading
      */}
      <div className="w-half md:grid md:grid-cols-[auto_1fr] md:items-baseline md:gap-x-4 lg:gap-x-6">
        {/* Column 1: The "(sobre)" heading */}
        <h2 className="text-1xl sm:text-3xl lg:text-3xl xl:text-4xl font-extralight leading-none mb-2 md:mb-0">
          (sobre)
        </h2>

        {/* Column 2: Contains the name and the paragraph */}
        <div>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-none mb-6 sm:mb-8 lg:mb-12">
            Leonardo Augusto
          </h3>

          <div className="max-w-4xl">
            <p className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-light leading-relaxed">
              Une 25 anos de experiência como Fuzileiro Naval na Marinha do
              Brasil a expertise jurídica de Mestre e especialista em Direito
              Militar. Por ter vivido a vida castrense, ele compreende suas
              complexidades como ninguém. Por isso, sua defesa vai além da
              teoria legal — ela nasce da compreensão visceral de quem conhece
              cada desafio de quem porta farda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
