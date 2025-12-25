import { ArrowLeft , ArrowRight } from 'lucide-react';

export function FinalCTA({isAr}) {

  return (
    <section className="bg-gradient-to-br from-[#0d5940] to-[#116149] py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="mb-8 text-4xl text-white md:text-5xl">
           {isAr ? "جاهز تبدأ رحلتك معنا؟" : "Ready to start your journey with us?"}
        </h2>

        <p className="mb-10 text-xl text-white/90 md:text-2xl">
          {isAr ? "اكتشف تجارب سياحية روحانية لا تُنسى" : "Discover unforgettable spiritual travel experiences"}
        </p>

        <a href="/all-trips" className="group inline-flex items-center gap-3 rounded-full bg-[#c9a961] px-12 py-6 text-xl text-white transition-all duration-300 hover:bg-[#e5d4a8] hover:shadow-xl">
          <span>{isAr ? "استعرض جميع الرحلات" : "Browse All Trips"}</span>
          {isAr ? <ArrowLeft className="h-6 w-6 transition-transform group-hover:translate-x-1" /> : <ArrowRight  className="h-6 w-6 transition-transform group-hover:-translate-x-1" />}
        </a>
      </div>
    </section>
  );
}
