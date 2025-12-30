"use client";

import { HelpCircle, ArrowLeft , ArrowRight } from 'lucide-react';

export function FAQShortcut( { isAr }) {
  return (
    <section className="bg-[#f5f2ed] py-20 md:py-28" >
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0d5940]">
          <HelpCircle className="h-10 w-10 text-[#c9a961]" strokeWidth={2.5} />
        </div>

        <h2 className="mb-6 text-4xl text-[#0d5940] md:text-5xl">
          {isAr ? 'هل تحتاج مساعدة سريعة؟' : 'Need Quick Help?'}
        </h2>

        <p className="mb-10 text-xl leading-relaxed text-[#4a5568] md:text-2xl">
          {isAr ? 'اطّلع على الأسئلة الشائعة قبل التواصل معنا ــ فقد تجد إجابتك فوراً.' : 'Check out the frequently asked questions before contacting us — you might find your answer immediately.'}
        </p>

        <a href="/faq" className="group inline-flex items-center gap-3 rounded-full bg-[#c9a961] px-10 py-5 text-xl text-white transition-all duration-300 hover:bg-[#e5d4a8] hover:shadow-lg">
          <span>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
          {isAr ? <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />  : 
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />}
        </a>
      </div>
    </section>
  );
}
