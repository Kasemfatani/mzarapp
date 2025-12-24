"use client";

import { Search, ClipboardList, CreditCard, Ticket } from 'lucide-react';

export default function HowItWorks( { lang } ) {
  const isAr = lang === "ar";

  const steps = [
    {
      number: '01',
      icon: <Search size={64} strokeWidth={1.5} />,
      title: isAr ? 'اختر تجربتك' : 'Choose Your Experience',
      description: isAr ? 'تصفّح الجولات المتاحة حسب المدينة أو نوع النشاط' : ' Browse experiences by city or activity type'
    },
    {
      number: '02',
      icon: <ClipboardList size={64} strokeWidth={1.5} />,
      title: isAr ? 'حدّد التفاصيل' : 'Select the Details',
      description: isAr ? 'اختر التاريخ، عدد الأفراد، ونقطة التجمع الأقرب لك' : 'Choose the date, number of people, and the nearest meeting point'
    },
    {
      number: '03',
      icon: <CreditCard size={64} strokeWidth={1.5} />,
      title: isAr ? 'احجز فورًا' : 'Book Now',
      description: isAr ? 'ادفع إلكترونياً بأمان واحصل على تأكيد فوري لتذكرتك' : 'Pay securely online and receive instant confirmation of your ticket'
    },
    {
      number: '04',
      icon: <Ticket size={64} strokeWidth={1.5} />,
      title: isAr ? 'استعد للرحلة' : 'Get Ready for the Journey',
      description: isAr ? 'تذكرتك وكل المعلومات المهمة ستظهر داخل التطبيق' : 'Your ticket and all essential information will be available inside the app'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#E7D3AF]/10 relative overflow-hidden" >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#A8C3BC]/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#9FC9C9]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-[#3C6652] mb-4 font-bold" style={{  fontSize: '2.5rem' }}>
            {isAr ? "كيف تنضم إلى تجارب مزار؟" : "How to Join Mzar Experiences"}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed" style={{  lineHeight: '1.7' }}>
            {isAr ? "خطوات بسيطة تحجز بها جولتك وتبدأ رحلتك بسهولة" : "Simple steps to book your tour and start your journey easily"}
          </p>
        </div>

        {/* Steps Container with connecting line */}
        <div className="relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden lg:block absolute top-24 right-0 left-0 h-0.5 bg-gradient-to-l from-[#857856]/20 via-[#857856]/40 to-[#857856]/20 mx-32"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.03] border border-gray-100 relative"
              >
                {/* Step Card */}
                <div className="p-8 flex flex-col items-center text-center">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-br from-[#867957] to-[#3C6652] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10">
                    <span className="text-sm" style={{  fontWeight: 600 }}>{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="mt-6 mb-6 text-[#867957] group-hover:text-[#3C6652] transition-colors group-hover:scale-110 transform duration-300">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-[#3C6652] mb-4 font-semibold" style={{  fontSize: '1.5rem' }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed" style={{  lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a href="/all-trips" className="bg-[#3C6652] text-white px-12 py-4 rounded-xl hover:bg-[#1E3A5F] transition-all shadow-lg hover:shadow-xl hover:scale-105" style={{  fontWeight: 500 }}>
            {isAr ? "ابدأ الحجز الآن" : "Start Booking Now"}
          </a>
        </div>
      </div>
    </section>
  );
}