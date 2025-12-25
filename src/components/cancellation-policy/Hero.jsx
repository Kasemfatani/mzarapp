import { Shield, Eye, CheckCircle2 } from 'lucide-react';



export function Hero({ isAr }) {

  const trustBadges = [
  { icon: Eye, text: isAr ? 'سياسة شفافة' : 'Transparent Policy' },
  { icon: Shield, text: isAr ? 'بدون رسوم مخفية' : 'No Hidden Fees' },
  { icon: CheckCircle2, text: isAr ? 'استرجاع مضمون حسب الشروط' : 'Guaranteed Refunds as per Terms' },
];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d5940] via-[#116149] to-[#0d5940] py-20 md:py-32">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="container relative mx-auto max-w-6xl px-6 lg:px-8" >
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
            {isAr ? "سياسة الإلغاء والاسترجاع" : "Cancellation and Refund Policy"}
          </h1>
          <p className="mx-auto max-w-3xl text-2xl leading-relaxed text-white/95 md:text-3xl">
            {isAr ? "حجزك معنا آمن — وحقوقك واضحة من البداية." : "Your booking is secure — and your rights are clear from the start."}
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-5 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#c9a961]">
                  <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl text-white">{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
