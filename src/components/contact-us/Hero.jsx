import { Clock, Zap, Users } from 'lucide-react';

export function Hero({ isAr }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-[#0d5940] via-[#116149] to-[#f5f2ed] py-20 md:py-28">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative mx-auto max-w-5xl px-6 text-center lg:px-8">
        {/* Main Title */}
        <h1 className="mb-6 text-5xl text-white md:text-6xl lg:text-7xl">
          تواصل معنا
        </h1>

        {/* Subtitle */}
        <p className="mb-10 text-2xl leading-relaxed text-white/95 md:text-3xl">
          نحن هنا لمساعدتك في أي وقت — قبل الحجز، أثناء الرحلة، أو بعدها.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
            <Clock className="h-5 w-5 text-[#c9a961]" strokeWidth={2.5} />
            <span className="text-lg text-white">دعم على مدار الساعة</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
            <Zap className="h-5 w-5 text-[#c9a961]" strokeWidth={2.5} />
            <span className="text-lg text-white">استجابة سريعة</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
            <Users className="h-5 w-5 text-[#c9a961]" strokeWidth={2.5} />
            <span className="text-lg text-white">فريق سعودي متخصص</span>
          </div>
        </div>
      </div>
    </section>
  );
}
