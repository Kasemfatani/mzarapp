'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SpecialTourBanner() {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLanguage(localStorage.getItem('lang') === 'ar' ? 'ar' : 'en');
    }
  }, []);

  // Placeholder image URL - replace with actual image
  const bannerImageUrl = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1788&auto=format&fit=crop";

  return (
    <div className="special-tour-banner relative w-full h-[60vh] md:h-[80vh]">
      {/* Banner Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={bannerImageUrl}
          alt="Special Tour Event"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Banner Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {language === 'en' ? 'Special Tour Event' : ' جولة خاصة'}
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          {language === 'en' 
            ? 'Join us for an exclusive tour experience on May 6, 2025' 
            : 'انضم إلينا في تجربة جولة حصرية في 6 مايو 2025'}
        </p>
        <div className="bg-white text-black py-2 px-6 rounded-full text-lg font-semibold">
          {language === 'en' ? 'Tuesday, May 6, 2025' : 'الثلاثاء، 6 مايو 2025'}
        </div>
      </div>
    </div>
  );
}