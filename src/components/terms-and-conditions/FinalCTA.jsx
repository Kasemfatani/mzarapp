import { Home, MessageCircle, FileText } from 'lucide-react';

export function FinalCTA( { isAr }) {
  return (
    <section className="bg-gradient-to-br from-[#0d5940] to-[#116149] py-20 md:py-32" >
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        <div className="mb-12">
          <h2 className="mb-6 text-4xl text-white md:text-5xl">
            شكراً لقراءتك الشروط
          </h2>
          <p className="mx-auto max-w-2xl text-2xl leading-relaxed text-white/90">
            نحن ملتزمون بتوفير خدمة عادلة وشفافة لجميع مستخدمينا
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-16 flex flex-col justify-center gap-5 sm:flex-row">
          <button className="group flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-xl text-[#0d5940] transition-all duration-300 hover:bg-[#c9a961] hover:text-white hover:shadow-2xl">
            <span>العودة إلى الصفحة الرئيسية</span>
            <Home className="h-6 w-6 transition-transform group-hover:scale-110" />
          </button>

          <button className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-transparent px-10 py-5 text-xl text-white transition-all duration-300 hover:bg-white hover:text-[#0d5940] hover:shadow-2xl">
            <span>تواصل مع الدعم</span>
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>

        {/* Additional Links */}
        <div className="grid gap-6 border-t border-white/20 pt-12 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20">
            <FileText className="mx-auto mb-3 h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
            <p className="text-lg text-white">سياسة الخصوصية</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20">
            <FileText className="mx-auto mb-3 h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
            <p className="text-lg text-white">سياسة الإلغاء</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20">
            <FileText className="mx-auto mb-3 h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
            <p className="text-lg text-white">الأسئلة الشائعة</p>
          </div>
        </div>
      </div>
    </section>
  );
}
