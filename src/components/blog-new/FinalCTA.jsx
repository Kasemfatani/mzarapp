import { Compass, Sparkles } from 'lucide-react';

export function FinalCTA({ isAr }) {
  return (
    <section className="bg-gradient-to-br from-[#3C6652] via-[#2d4d3d] to-[#3C6652] py-20 md:py-32" dir="rtl">
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        {/* Decorative Element */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#867957] shadow-2xl">
          <Sparkles className="h-10 w-10 text-white" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h2 className="mb-6 text-4xl text-white md:text-5xl">
         {isAr ? "القراءة بداية الرحلة… والتجربة تكملها" : "Reading is the beginning of the journey… and experience completes it"}
        </h2>

        {/* Description */}
        <p className="mb-12 text-2xl leading-relaxed text-white/95">
          {isAr ? "الآن بعد أن عرفت القصص والمعاني، حان وقت العيش والمشاهدة. ابدأ رحلتك مع مزار واجعل كل خطوة مليئة بالمعنى." : "Now that you know the stories and meanings, it's time to live and see. Start your journey with Mzar and make every step meaningful."}
        </p>

        {/* CTA Button */}
        <button className="group inline-flex items-center gap-4 rounded-full bg-[#867957] px-12 py-6 text-2xl text-white shadow-2xl transition-all duration-300 hover:bg-[#E7D3AF] hover:text-[#3C6652] hover:shadow-[0_20px_60px_rgba(134,121,87,0.4)]">
          <span>{isAr ? "ابدأ رحلتك مع مزار" : "Start your journey with Mzar"}</span>
          <Compass className="h-7 w-7 transition-transform duration-300 group-hover:rotate-45" />
        </button>

        {/* Trust Indicators */}
        <div className="mt-16 grid gap-6 border-t border-white/20 pt-12 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-3xl text-[#867957]">500+</p>
            <p className="text-lg text-white/80">{isAr ? "جولة متاحة" : "Tours Available"}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-3xl text-[#867957]">10,000+</p>
            <p className="text-lg text-white/80">{isAr ? "زائر راضٍ" : "Satisfied Visitors"}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-3xl text-[#867957]">⭐ 4.9</p>
            <p className="text-lg text-white/80">{isAr ? "تقييم العملاء" : "Customer Ratings"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
