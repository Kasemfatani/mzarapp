"use client";

import HeroSection from "./components/HeroSection";
import GallerySection from "./components/GallerySection";

import { useState, useEffect } from 'react';


export default function Gallary() {
  const [language, setLanguage] = useState('ar');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      setLanguage(storedLang);
    } else {
      // Default to Arabic if no language is set
      localStorage.setItem('lang', 'ar');
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-stretch" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <HeroSection />
      <GallerySection />
    </main>
    
  );
}
