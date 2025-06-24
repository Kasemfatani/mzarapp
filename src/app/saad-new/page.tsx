"use client";

import { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import PromoCode from './components/PromoCode';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function CustomPage() {
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
      <HeroSection language={language} setLanguage={setLanguage} />
      <PromoCode language={language} />
      <FAQ language={language} />
      <Footer language={language} />
    </main>
    
  );
}
