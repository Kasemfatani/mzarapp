import { Award, Sparkles, Ticket, CreditCard, Headphones, Star } from 'lucide-react';

export function WhyChooseUs( { lang } ) {
  const isAr = lang === "ar";
  const advantages = [
    {
      icon: <Award size={52} strokeWidth={1.5} />,
      title: isAr ? 'تجربة معرفية موثقة' : 'Verified Knowledge Experience',
      description: isAr ? 'محتوى معرفي بعدة لغات عالمية معتمد من هيئة التراث.' : 'Multilingual educational content approved by the Heritage Commission. '
    },
    {
      icon: <Sparkles size={52} strokeWidth={1.5} />,
      title: isAr ? 'تجارب حصرية' : 'Exclusive Experiences',
      description: isAr ? 'وصول حصري لمواقع تاريخية مثل جبل الرحمة ومسجد البيعة.' : 'Special access to historical sites such as Jabal Al-Rahmah and Al-Bay’ah Mosque. '
    },
    {
      icon: <Ticket size={52} strokeWidth={1.5} />,
      title: isAr ? 'تأكيد فوري عند الحجز' : 'Instant Booking Confirmation',
      description: isAr ? 'احجز الآن واستمتع بتجربة رقمية فريدة عبر تطبيق مزار.' : 'Book now and enjoy a seamless digital experience through Mzar App.'
    },
    // {
    //   icon: <CreditCard size={52} strokeWidth={1.5} />,
    //   title: isAr ? 'طرق دفع آمنة ومتعددة' : 'Secure and Multiple Payment Methods',
    //   description: isAr ? 'الدفع الإلكتروني، Apple Pay، STC Pay.' : 'Electronic payment, Apple Pay, STC Pay.'
    // },
    {
      icon: <Headphones size={52} strokeWidth={1.5} />,
      title: isAr ? 'دعم على مدار الساعة' : '24/7 Support',
      description: isAr ? 'فريق خدمة عملاء جاهز لمساعدتك قبل وأثناء وبعد الرحلة.' : 'A dedicated customer support team ready to assist you before, during, and after your experience.'
    },
    // {
    //   icon: <Star size={52} strokeWidth={1.5} />,
    //   title: isAr ? 'تقييمات مستخدمين ممتازة' : 'Excellent User Reviews',
    //   description: isAr ? 'آلاف التجارب الناجحة بمتوسط تقييم +4.8' : 'Thousands of successful experiences with an average rating of +4.8'
    // }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#E7D3AF]/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#A8C3BC]/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#9FC9C9]/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            {/* Section Header */}
            <div className="mb-12">
              <h2 className="text-[#3C6652] mb-4 font-bold" style={{  fontSize: '2.5rem' }}>
                {isAr ? 'لماذا تختار مزار؟' : 'Why Choose Mzar?'}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed" style={{  lineHeight: '1.7' }}>
                {isAr ? 'تجارب سياحية موثوقة مع خدمات حصرية لا مثيل لها' : 'Trusted tourism experiences with exclusive services like no other.'}
              </p>
            </div>

            {/* Advantages List */}
            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02] border border-gray-100 flex gap-5 items-start"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 text-[#867957] group-hover:text-[#3C6652] transition-colors group-hover:scale-110 transform duration-300">
                    {advantage.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-[#3C6652] mb-2 text-lg font-semibold" >
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm" style={{  lineHeight: '1.6' }}>
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <a href="/all-trips" className="bg-[#3C6652] text-white px-10 py-4 rounded-xl hover:bg-[#1E3A5F] transition-all shadow-lg hover:shadow-xl hover:scale-105" style={{  fontWeight: 500 }}>
                {isAr ? 'اكتشف الفرق بنفسك' : 'Discover the Difference Yourself'}
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Main Image */}
              <img
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB0b3VyJTIwZ3JvdXAlMjBoYXBweXxlbnwxfHx8fDE3NjQ0OTUzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Mzar Tours Experience"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Badge Overlay */}
              <div className="absolute bottom-8 right-8 left-8">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-[#E7D3AF]/30">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-3xl text-[#867957] mb-1" style={{  fontWeight: 700 }}>+50</div>
                      <div className="text-[#3C6652]" >{isAr ? 'تجربة سياحية موثوقة' : 'Reliable Tourist Experience'}</div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-[#867957] to-[#3C6652] rounded-full flex items-center justify-center">
                      <Sparkles size={32} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Badge */}
              <div className="absolute top-8 right-8">
                <div className="bg-gradient-to-r from-[#867957] to-[#3C6652] text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2">
                  <Star size={20} className="fill-white" />
                  <span style={{  fontWeight: 500 }}>{isAr ? 'تقييم 4.8 من 5' : 'Rating 4.8 out of 5'}</span>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#E7D3AF] rounded-3xl -z-10 opacity-50"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#857856]/20 rounded-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}