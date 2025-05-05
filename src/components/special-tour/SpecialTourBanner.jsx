'use client'
import React from 'react';
import Image from 'next/image';
import bannerImg from '/public/banner_img.jpeg';

export default function SpecialTourBanner() {
  return (
    <div className="special-tour-banner relative h-[60vh] md:h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bannerImg}
          alt="مكة المكرمة"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="transform scale-100 md:scale-100 sm:scale-[0.9] xs:scale-[0.8]"
        />
        
      </div>
      
    </div>
  );
}



