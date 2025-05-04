'use client'
import React, { useEffect, useState } from 'react';
import SpecialTourBanner from '../../components/special-tour/SpecialTourBanner';
import GatheringInfo from '../../components/special-tour/GatheringInfo';
import TourDetails from '../../components/special-tour/TourDetails';

export default function SpecialTour() {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang') === 'ar') {
        setLanguage('ar');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  return (
    <main className="special-tour-page" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <SpecialTourBanner />
      <GatheringInfo />
      <TourDetails />
    </main>
  );
}

