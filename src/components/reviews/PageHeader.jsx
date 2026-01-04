
export function PageHeader({ isAr }) {
  return (
    <section className="bg-gradient-to-b from-[#f5f2ed] to-white py-16 md:py-20" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-6 text-4xl text-[#3C6652] md:text-5xl lg:text-6xl">
          {isAr ? "استعرض جميع التقييمات" : "View All Reviews"}
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#718096] md:text-2xl">
            {isAr ? "اطّلع على آراء وتجارب زوّار مزار بعد خوض الجولات والخدمات السياحية المعتمدة." : "Check out the opinions and experiences of Mazah visitors after taking the approved tours and tourist services."}
          </p>
          <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-l from-transparent via-[#867957] to-transparent" />
        </div>
      </div>
    </section>
  );
}
