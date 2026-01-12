"use client";

import { ArrowLeft, Calendar , ArrowRight } from 'lucide-react';

export default function FinalCTA( { isAr }) {
  return (
    <section className="bg-gradient-to-br from-[#0d5940] to-[#116149] py-20 md:py-28" >
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="mb-6 text-4xl text-white md:text-5xl">
          {isAr ? 'جاهزون لمرافقتك في رحلتك خطوة بخطوة' : 'We are ready to accompany you step by step on your journey '}
        </h2>

        <p className="mb-10 text-xl text-white/90 md:text-2xl">
          {isAr ? 'اكتشف تجربة تاريخية لا تُنسى' : 'Discover an unforgettable historical experience'}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a href="/all-trips" className="group flex items-center justify-center gap-3 rounded-full bg-[#c9a961] px-10 py-5 transition-all duration-300 hover:bg-[#e5d4a8] hover:shadow-lg">
            <span className="text-xl text-[#0d5940]">{isAr ? 'استعرض التجارب' : 'Browse Experiences'}</span>
            {isAr ?
            <ArrowLeft className="h-6 w-6 text-[#0d5940] transition-transform group-hover:-translate-x-1" /> :
            <ArrowRight className="h-6 w-6 text-[#0d5940] transition-transform group-hover:translate-x-1" />}
          </a>

          <a href="/all-trips" className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-white/10 px-10 py-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
            <span className="text-xl text-white">{isAr ? 'احجز الآن' : 'Book Now'}</span>
            <Calendar className="h-6 w-6 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
