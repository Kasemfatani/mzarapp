import { BookOpen } from 'lucide-react';

export function Hero({ isAr } ) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#3C6652] via-[#2d4d3d] to-[#3C6652] py-24 md:py-36">
      

      <div className="container relative mx-auto max-w-6xl px-6 text-center lg:px-8">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#867957] shadow-2xl">
          <BookOpen className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>

        {/* Title (H1) */}
        <h1 className="mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
        {isAr ? "مقالات مزار" : "Mzar Articles"}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-4xl text-2xl leading-relaxed text-white/95 md:text-3xl">
          {isAr ? "اكتشف تاريخ مكة والمدينة، أسرار المعالم، ودليل الزائر لتجربة أعمق وأكثر وعيًا." : "Discover the history of Mecca and Medina, landmark secrets, and a visitor's guide for a deeper, more informed experience."}
        </p>

        {/* Trust Micro Text */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-lg text-white/80 md:gap-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#867957]" />
            <span>{isAr ? "محتوى موثوق" : "Trusted Content"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#867957]" />
            <span>{isAr ? "كتاب وباحثون متخصصون" : "Specialized Writers and Researchers"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#867957]" />
            <span>{isAr ? "مرتبط بتجارب حقيقية" : "Connected to Real Experiences"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
