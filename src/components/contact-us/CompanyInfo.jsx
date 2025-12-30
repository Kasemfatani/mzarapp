"use client";

import { MapPin, Mail, Phone, Clock } from 'lucide-react';


export function CompanyInfo( { isAr }) {

  
const infoBlocks = [
  {
    icon: MapPin,
    title:  isAr ? 'العنوان' : 'Address',
    content: isAr ? 'مكة المكرمة، المملكة العربية السعودية' : 'Mecca, Saudi Arabia',
  },
  {
    icon: Mail,
    title: isAr ? 'البريد الإلكتروني' : 'Email',
    content: 'contact@mzarapp.com',
    link: 'mailto:contact@mzarapp.com',
  },
  {
    icon: Phone,
    title: isAr ? 'الهاتف' : 'Phone',
    content: '+966580121025',
    link: 'tel:+966580121025',
  },
  {
    icon: Clock,
    title: isAr ? 'ساعات العمل' : 'Working Hours',
    content: isAr ? 'يوميًا من 9:00 صباحًا إلى 11:00 مساءً' : 'Daily from 9:00 AM to 11:00 PM',
  },
];

  return (
    <section className="bg-[#f8f5f0] py-20 md:py-28" dir="rtl">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="mb-12 text-center text-4xl text-[#0d5940] md:text-5xl">
          {isAr ? 'معلومات التواصل' : 'Contact Information'}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {infoBlocks.map((block, index) => {
            const Icon = block.icon;
            const content = block.link ? (
              <a
                href={block.link}
                className="text-xl text-[#4a5568] transition-colors hover:text-[#c9a961]"
              >
                {block.content}
              </a>
            ) : (
              <p className="text-xl text-[#4a5568]">{block.content}</p>
            );

            return (
              <div
                key={index}
                className="rounded-3xl bg-white p-8 text-center shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d5940]">
                  <Icon className="h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
                </div>
                <h3 className="mb-3 text-2xl text-[#0d5940]">
                  {block.title}
                </h3>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
