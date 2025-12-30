"use client";

import { Headphones, MessageCircle, Phone } from 'lucide-react';



export function ContactOptions( { isAr }) {

  const contactOptions = [
  {
    icon: Headphones,
    title: isAr ? 'الدعم الفوري' : 'Instant Support',
    description: isAr ? 'تواصل مباشرة مع فريق الدعم عبر القنوات الرسمية.' : 'Direct contact with the support team through official channels.',
    buttonText: isAr ? 'الدردشة الآن' : 'Chat Now',
    color: 'green',
    action: () => console.log('Open live chat'),
  },
  {
    icon: MessageCircle,
    title: isAr ? 'واتساب' : 'WhatsApp',
    description: isAr ? 'احصل على رد سريع وفوري على استفسارك عبر واتساب. ' : 'Get a quick and instant response to your inquiry via WhatsApp.',
    buttonText: isAr ? 'راسلنا على واتساب' : 'Message Us on WhatsApp',
    color: 'gold',
    action: () => window.open('https://wa.me/966500000000', '_blank'),
  },
  {
    icon: Phone,
    title: isAr ? 'اتصال هاتفي' : 'Phone Call',
    description: '+966580121025 ',
    caption: isAr ? 'خدمة العملاء متاحة يومياً من 9:00 صباحاً حتى 11:00 مساءً.' : 'Customer service is available daily from 9:00 AM to 11:00 PM.',
    buttonText: isAr ? 'اتصل الآن' : 'Call Now',
    color: 'green',
    action: () => window.location.href = 'tel:+966501234567',
  },
];

  return (
    <section className="bg-white py-20 md:py-28" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            const bgColor = option.color === 'green' ? 'bg-[#0d5940]' : 'bg-[#c9a961]';
            const hoverBg = option.color === 'green' ? 'hover:bg-[#116149]' : 'hover:bg-[#e5d4a8]';
            const iconBg = option.color === 'green' ? 'bg-[#f5f2ed]' : 'bg-[#0d5940]/10';
            const iconColor = option.color === 'green' ? 'text-[#c9a961]' : 'text-[#c9a961]';
            
            return (
              <div
                key={index}
                className="group flex cursor-pointer flex-col items-center rounded-3xl border-2 border-[#e2e8f0] bg-white p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#c9a961] hover:shadow-2xl"
                onClick={option.action}
              >
                <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${iconBg}`}>
                  <Icon className={`h-10 w-10 ${iconColor}`} strokeWidth={2.5} />
                </div>
                
                <h3 className="mb-3 text-3xl text-[#0d5940]">
                  {option.title}
                </h3>
                
                <p className="mb-2 text-xl text-[#4a5568]">
                  {option.description}
                </p>
                
                {option.caption && (
                  <p className="mb-6 text-lg text-[#718096]">
                    {option.caption}
                  </p>
                )}
                
                <button
                  className={`mt-auto w-full rounded-full ${bgColor} px-8 py-4 text-xl text-white transition-all duration-300 ${hoverBg}`}
                >
                  {option.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
