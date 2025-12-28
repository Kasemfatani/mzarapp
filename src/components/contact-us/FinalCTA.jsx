"use client";

import { ArrowLeft, Calendar } from 'lucide-react';

export function FinalCTA( { isAr }) {
  return (
    <section className="bg-gradient-to-br from-[#0d5940] to-[#116149] py-20 md:py-28" >
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="mb-6 text-4xl text-white md:text-5xl">
          جاهزون لمرافقتك في رحلتك خطوة بخطوة
        </h2>

        <p className="mb-10 text-xl text-white/90 md:text-2xl">
          اكتشف تجربة سياحية روحانية لا تُنسى
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button className="group flex items-center justify-center gap-3 rounded-full bg-[#c9a961] px-10 py-5 transition-all duration-300 hover:bg-[#e5d4a8] hover:shadow-lg">
            <span className="text-xl text-[#0d5940]">استعرض الجولات</span>
            <ArrowLeft className="h-6 w-6 text-[#0d5940] transition-transform group-hover:-translate-x-1" />
          </button>

          <button className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-white/10 px-10 py-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
            <span className="text-xl text-white">احجز الآن</span>
            <Calendar className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
