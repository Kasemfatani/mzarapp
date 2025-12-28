"use client";

import { Headphones, MessageCircle, Phone } from 'lucide-react';



export function ContactOptions( { isAr }) {

  const contactOptions = [
  {
    icon: Headphones,
    title: 'الدعم الفوري',
    description: 'تواصل مباشر مع فريق الدعم',
    buttonText: 'الدردشة الآن',
    color: 'green',
    action: () => console.log('Open live chat'),
  },
  {
    icon: MessageCircle,
    title: 'واتساب',
    description: 'رد سريع عبر واتساب',
    buttonText: 'راسلنا على واتساب',
    color: 'gold',
    action: () => window.open('https://wa.me/966500000000', '_blank'),
  },
  {
    icon: Phone,
    title: 'اتصال هاتفي',
    description: '+966 50 123 4567',
    caption: 'يوميًا من 9 صباحًا حتى 11 مساءً',
    buttonText: 'اتصل الآن',
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
