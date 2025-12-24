import { UserCheck, DollarSign, Zap, MapPin, Headphones, Sparkles } from 'lucide-react';



export function WhyMazah( { lang } ) {

  const isAr = lang === 'ar';

  const benefits = [
  {
    icon: UserCheck,
    title:  isAr ? 'مرشدون متخصصون' : 'Expert Guides',
    description: isAr ? 'فريق من الخبراء المعتمدين يملكون معرفة عميقة بالمواقع الدينية' : 'A team of certified experts with deep knowledge of religious sites',
  },
  {
    icon: DollarSign,
    title: isAr ? 'أسعار شفافة' : 'Transparent Pricing',
    description: isAr ? 'لا رسوم مخفية، أسعار واضحة ومحددة مسبقًا' : 'No hidden fees, clear and pre-determined prices',
  },
  {
    icon: Zap,
    title: isAr ? 'حجز فوري' : 'Instant Booking',
    description: isAr ? 'احجز رحلتك في ثوانٍ واستلم التأكيد فورًا' : 'Book your trip in seconds and receive instant confirmation',
  },
  {
    icon: MapPin,
    title: isAr ? 'مواقع تجمع مرنة' : 'Flexible Meeting Points',
    description: isAr ? 'نقاط انطلاق متعددة تناسب موقعك وتوفر راحتك' : 'Multiple starting points to suit your location and provide your comfort',
  },
  {
    icon: Headphones,
    title: isAr ? 'دعم حقيقي' : 'Real Support',
    description: isAr ? 'فريق دعم متاح 24/7 للإجابة على استفساراتك' : 'A support team available 24/7 to answer your inquiries',
  },
  {
    icon: Sparkles,
    title: isAr ? 'تجارب مخصصة' : 'Customized Experiences',
    description: isAr ? 'خيارات متنوعة تناسب الأفراد، العائلات، والمجموعات' : 'Various options suitable for individuals, families, and groups',
  },
];

  return (
    <section className="bg-white py-20 md:py-28" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <h2 className="mb-16 text-center text-4xl text-[#0d5940] md:text-5xl">
          {isAr ? 'لماذا يختارنا آلاف الزوّار؟' : 'Why do thousands of visitors choose us?'}
        </h2>

        {/* Benefits Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl border border-[#e2e8f0] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a961] hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f5f2ed]">
                  <Icon className="h-7 w-7 text-[#c9a961]" strokeWidth={2.5} />
                </div>
                <h3 className="mb-3 text-2xl text-[#0d5940]">
                  {benefit.title}
                </h3>
                <p className="text-lg leading-relaxed text-[#718096]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
