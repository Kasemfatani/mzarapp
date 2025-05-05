'use client'
import React from 'react';
import SpecialTourBanner from '../../components/special-tour/SpecialTourBanner';
import ExperienceDescription from '../../components/special-tour/ExperienceDescription';
import GatheringInfo from '../../components/special-tour/GatheringInfo';
import TourDetails from '../../components/special-tour/TourDetails';
import AppExplore from '../../components/home/AppExplore';

export default function SpecialTour() {
  return (
    <main className="special-tour-page" style={{ direction: 'rtl' }}>
      <SpecialTourBanner />
      <ExperienceDescription />
      <GatheringInfo />
      <TourDetails />
      <AppExplore />
    </main>
  );
}

