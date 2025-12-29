import { UserCheck, DollarSign, Zap, MapPin, Headphones, Sparkles } from 'lucide-react';



export function WhyMazah( { lang } ) {

  const isAr = lang === 'ar';

  const benefits = [
    {
    icon: Zap,
    title: isAr ? 'حجز فوري' : 'Instant Booking',
    description: isAr ? 'احجز رحلتك في ثوانٍ واستلم التأكيد فورًا' : 'Book your trip in seconds and receive instant confirmation',
  },
  {
    icon: DollarSign,
    title: isAr ? 'أسعار شفافة و واضحة' : 'Transparent and Clear Pricing',
    description: isAr ? 'لا رسوم خفية ــ فقط أسعار محددة مسبقاً تمنحك وضوحاً في كل خطوة. ' : 'No hidden fees — just upfront pricing that gives you clarity at every step.',
  },
  {
    icon: UserCheck,
    title:  isAr ? 'مرشدون متخصصون ومعتمدون' : ' Specialized and Certified Guides',
    description: isAr ? 'فريق من الخبراء المؤهلين يملكون معرفة دقيقة بالمواقع الدينية والتاريخية. ' : 'A team of qualified experts with precise knowledge of religious and historical sites.',
  },
  {
    icon: Sparkles,
    title: isAr ? 'تجارب مصممة خصيصاً لك ' : ' Custom-Tailored Experiences',
    description: isAr ? 'خيارات تناسب الأفراد والعائلات والمجموعات، لتعيش تجربة تناسب اهتماماتك. ' : 'Options that suit individuals, families, and groups, to live an experience that matches your interests.',
  },
  {
    icon: Headphones,
    title: isAr ? 'دعم متواصل على مدار الساعة' : ' 24/7 Continuous Support',
    description: isAr ? 'فريق دعم جاهز دائماً للرد على استفساراتك ومساعدتك في كل مرحلة من رحلتك. ' : 'A support team always ready to answer your inquiries and assist you at every stage of your journey.',
  },
  {
    icon: MapPin,
    title: isAr ? 'نقاط انطلاق مرنة' : ' Flexible Starting Points',
    description: isAr ? 'اختر من بين عدة مواقع تجمع قريبة منك لتبدأ رحلتك بسهولة وراحة. ' : 'Choose from several nearby gathering points to start your journey with ease and comfort.',
  },
  
  
];

  return (
    <section className="bg-white py-20 md:py-28" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <h2 className="mb-16 text-center text-4xl text-[#0d5940] md:text-5xl">
          {isAr ? 'لماذا يختار الآلاف "مزار"؟ ' : 'Why Do Thousands Choose "Mzar"?'}
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
