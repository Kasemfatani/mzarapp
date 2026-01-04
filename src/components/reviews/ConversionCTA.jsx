"use client";
import { Compass, CalendarCheck, Sparkles } from 'lucide-react';

export function ConversionCTA({ isAr }) {
  return (
    <section className="bg-gradient-to-br from-[#3C6652] via-[#2d4d3d] to-[#3C6652] py-20 md:py-32" >
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        {/* Decorative Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#867957] shadow-2xl">
          <Sparkles className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h2 className="mb-6 text-center text-4xl text-white md:text-5xl">
           {isAr ? "انضم إلى آلاف الزوّار الذين وثقوا بمزار" : "Join thousands of visitors who trusted Mzar"}
        </h2>

        {/* Description */}
        <p className="mb-12 text-center text-2xl leading-relaxed text-white/95">
          {isAr ? "احجز جولتك القادمة مع مرشدين معتمدين وتجربة موثوقة. اجعل رحلتك القادمة لا تُنسى مع أفضل الخدمات السياحية في المملكة." : "Book your next tour with certified guides and a trusted experience. Make your next trip unforgettable with the best tourist services in the Kingdom."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a href="/all-trips" className="group flex items-center justify-center gap-3 rounded-full bg-[#867957] px-10 py-5 text-2xl text-white shadow-2xl transition-all duration-300 hover:bg-[#E7D3AF] hover:text-[#3C6652] hover:shadow-[0_20px_60px_rgba(134,121,87,0.4)]">
            <span>{isAr ? "استعرض الجولات" : "Browse Tours"}</span>
            <Compass className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
          </a>
          <a href="/all-trips" className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-transparent px-10 py-5 text-2xl text-white transition-all duration-300 hover:bg-white hover:text-[#3C6652] hover:shadow-2xl">
            <span>{isAr ? "احجز الآن" : "Book Now"}</span>
            <CalendarCheck className="h-6 w-6" />
          </a>
        </div>

        {/* Trust Stats */}
        <div className="mt-20 grid gap-8 border-t border-white/20 pt-16 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-3 text-5xl text-[#E7D3AF]">4.9⭐</div>
            <p className="text-xl text-white/80">{isAr ? "متوسط التقييم" : "Average Rating"}</p>
          </div>
          <div className="text-center">
            <div className="mb-3 text-5xl text-[#E7D3AF]">1,200+</div>
            <p className="text-xl text-white/80">{isAr ? "تقييم موثق" : "Verified Reviews"}</p>
          </div>
          <div className="text-center">
            <div className="mb-3 text-5xl text-[#E7D3AF]">10,000+</div>
            <p className="text-xl text-white/80">{isAr ? "زائر سعيد" : "Happy Visitors"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
