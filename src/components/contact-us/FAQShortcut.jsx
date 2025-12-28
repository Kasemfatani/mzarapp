"use client";

import { HelpCircle, ArrowLeft } from 'lucide-react';

export function FAQShortcut( { isAr }) {
  return (
    <section className="bg-[#f5f2ed] py-20 md:py-28" >
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0d5940]">
          <HelpCircle className="h-10 w-10 text-[#c9a961]" strokeWidth={2.5} />
        </div>

        <h2 className="mb-6 text-4xl text-[#0d5940] md:text-5xl">
          هل تحتاج مساعدة سريعة؟
        </h2>

        <p className="mb-10 text-xl leading-relaxed text-[#4a5568] md:text-2xl">
          اطّلع على أكثر الأسئلة شيوعًا قبل التواصل معنا.
        </p>

        <button className="group inline-flex items-center gap-3 rounded-full bg-[#c9a961] px-10 py-5 text-xl text-white transition-all duration-300 hover:bg-[#e5d4a8] hover:shadow-lg">
          <span>الأسئلة الشائعة</span>
          <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>
    </section>
  );
}
