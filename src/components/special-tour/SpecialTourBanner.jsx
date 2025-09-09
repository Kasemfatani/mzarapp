'use client'
import React from 'react';
import Image from 'next/image';
import bannerImg from '/public/banner_no_text.png';

export default function SpecialTourBanner() {
  return (
    <div className="special-tour-banner relative h-[50vh] sm:h-[60vh] md:h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bannerImg}
          alt="مكة المكرمة"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="transform scale-100 md:scale-100 sm:scale-[0.9] xs:scale-[0.8]"
        />
        
      </div>
      
      {/* Centered Text Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            رحلة إثرائية لا تنسى من قلب أبراج الساعة
          </h1>
          <p className="text-center text-lg sm:text-lg md:text-xl lg:text-2xl mb-2 mx-auto">
            أهلاً بكم في تجربة فريدة تجمع بين التاريخ،
          </p>
          <p className="text-center text-lg sm:text-lg md:text-xl lg:text-2xl mx-auto">
            الروحانية، والإطلالة الساحرة على أطهر بقاع الأرض.
          </p>
        </div>
      </div>
    </div>
  );
}



