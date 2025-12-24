import { Check } from 'lucide-react';

export function Hero( { lang } ) {
  const isAr = lang === 'ar';
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-bl from-[#0d5940] via-[#116149] to-[#f5f2ed]">
      {/* Subtle Islamic Geometric Pattern */}
      {/* <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M40 0 L50 20 L70 20 L55 35 L60 55 L40 40 L20 55 L25 35 L10 20 L30 20 Z"
                fill="currentColor"
              />
              <circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-geo)" />
        </svg>
      </div> */}

      <div className="container relative mx-auto max-w-7xl px-6 py-20 md:py-32 lg:px-8">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 className="mb-6 text-6xl text-white md:text-7xl lg:text-8xl">
            {isAr ? 'من نحن' : 'About Us'}
          </h1>

          {/* Subheadline */}
          <h2 className="mb-6 text-3xl text-[#c9a961] md:text-4xl lg:text-5xl">
            {isAr ? 'مزاه — منصة سعودية معتمدة لحجز الجولات الدينية والثقافية' : 'Mzar — A Saudi platform accredited for booking religious and cultural tours'}
          </h2>

          {/* Supporting Text */}
          <p className="mb-10 max-w-2xl text-xl text-white/95 md:text-2xl">
            {isAr ? 'نربطك بأفضل المرشدين المعتمدين لنقدّم لك تجربة منظمة، آمنة، وروحانية في مكة المكرمة والمدينة المنورة.' : 'We connect you with the best certified guides to offer you an organized, safe, and spiritual experience in Mecca and Medina.'}
          </p>

          {/* Trust Chips */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
              <Check className="h-5 w-5 text-[#c9a961]" strokeWidth={3} />
              <span className="text-lg text-white">{isAr ? 'مرخّصون رسميًا' : 'Officially Licensed'}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
              <Check className="h-5 w-5 text-[#c9a961]" strokeWidth={3} />
              <span className="text-lg text-white">{isAr ? 'مرشدون معتمدون' : 'Certified Guides'}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-full bg-white/15 px-6 py-3.5 backdrop-blur-md">
              <Check className="h-5 w-5 text-[#c9a961]" strokeWidth={3} />
              <span className="text-lg text-white">{isAr ? 'دعم على مدار الساعة' : '24/7 Support'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
