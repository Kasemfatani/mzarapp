import { ArrowLeft , ArrowRight } from 'lucide-react';

export default function FinalCTA({isAr}) {

  return (
    <section className="bg-gradient-to-br from-[#0d5940] to-[#116149] py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="mb-8 text-4xl text-white md:text-5xl">
           {isAr ? "جاهز تبدأ تجربتك؟ " : "Ready to start your Experience?"}
        </h2>

        <p className="mb-10 text-xl text-white/90 md:text-2xl">
          {isAr ? "استكشف تجارب سياحية تاريخية لا تُنسى في مكة والمدينة." : "Discover unforgettable historical tourism experiences in Makkah and Madinah. "}
        </p>

        <a href="/all-trips" className="group inline-flex items-center gap-3 rounded-full bg-[#c9a961] px-12 py-6 text-sm md:text-xl text-white transition-all duration-300 hover:bg-[#e5d4a8] hover:shadow-xl">
          <span>{isAr ? "استعرض جميع التجارب" : "Browse All Experiences"}</span>
          {isAr ? <ArrowLeft className="h-6 w-6 transition-transform group-hover:translate-x-1" /> : <ArrowRight  className="h-6 w-6 transition-transform group-hover:-translate-x-1" />}
        </a>
      </div>
    </section>
  );
}
