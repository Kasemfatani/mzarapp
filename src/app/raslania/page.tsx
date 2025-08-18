'use client'
import { HeroSection } from './components/HeroSection';
import RegisterApp from './components/RegisterApp';
import PromoCode from './components/PromoCode';

export default function CustomPage() {
  return (
    <main className="min-h-screen flex flex-col items-stretch" dir='rtl'>

      <HeroSection />
      <RegisterApp />
      <PromoCode />
    </main>
    
  );
}
