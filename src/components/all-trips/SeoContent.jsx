"use client";

import { MapPin, Star, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function SeoContent({ lang }) {
  const isAr = lang === "ar";

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="container mx-auto">
        <div
          ref={sectionRef}
          className={`
            relative overflow-hidden rounded-[24px] px-8 sm:px-12 lg:px-16 py-12 sm:py-14 lg:py-16
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{
            backgroundColor: 'rgba(231, 211, 175, 0.12)',
          }}
        >
          {/* Decorative Background Icons */}
          <div className="absolute top-8 right-12 opacity-[0.05]">
            <MapPin className="w-24 h-24 text-[#867957]" strokeWidth={1} />
          </div>
          <div className="absolute bottom-12 left-16 opacity-[0.05]">
            <Star className="w-28 h-28 text-[#3C6652]" strokeWidth={1} />
          </div>
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-[0.04]">
            <Users className="w-32 h-32 text-[#867957]" strokeWidth={1} />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Title */}
            <h2
              className="text-3xl sm:text-4xl text-[#3C6652] mb-6 leading-relaxed"
              style={{
                fontFamily: 'Tajawal, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.01em',
              }}
            >
              {isAr ? 'أفضل الجولات السياحية في مكة والمدينة' : 'Best Tours in Mecca and Medina'}
            </h2>

            {/* SEO Paragraph */}
            <p
              className="text-base sm:text-lg text-[#867957] leading-[170%] text-center max-w-4xl mx-auto sm:mx-0"
              style={{
                fontFamily: 'Tajawal, sans-serif',
                fontWeight: 400,
              }}
            >
              {isAr ? 
              `استكشف مجموعة واسعة من الجولات السياحية في مكة المكرمة والمدينة المنورة مع مرشدين معتمدين وتجارب
              ثقافية وروحانية فريدة. نقدم لك رحلات مصممة بعناية لتناسب جميع الزوار، سواء للزيارات الدينية أو الجولات
              التاريخية. احجز جولتك بسهولة وثقة مع Mzar وتمتع بتجربة لا تُنسى.` 
              : 
              `Explore a wide range of tours in Mecca and Medina with certified guides and unique cultural and spiritual experiences. We offer carefully designed trips to suit all visitors, whether for religious visits or historical tours. Book your tour easily and confidently with Mzar and enjoy an unforgettable experience.`}
            </p>

            {/* Optional: Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-sm">
              <div className="flex items-center gap-2 text-[#3C6652]">
                <div className="w-8 h-8 rounded-full bg-[#3C6652]/10 flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#3C6652]" />
                </div>
                <span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                  {isAr ? 'مرشدين معتمدين' : 'Certified Guides'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#3C6652]">
                <div className="w-8 h-8 rounded-full bg-[#3C6652]/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#3C6652]" />
                </div>
                <span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                  {isAr ? 'جولات متنوعة' : 'Diverse Tours'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#3C6652]">
                <div className="w-8 h-8 rounded-full bg-[#3C6652]/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#3C6652]" />
                </div>
                <span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                  {isAr ? 'حجز سهل وآمن' : 'Easy and Secure Booking'}
                </span>
              </div>
            </div>
          </div>

          {/* Decorative Corner Accent */}
          <div className="absolute top-0 left-0 w-20 h-20 opacity-20">
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#867957] rounded-tl-[12px]" />
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 opacity-20">
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#867957] rounded-br-[12px]" />
          </div>
        </div>
      </div>
    </section>
  );
}