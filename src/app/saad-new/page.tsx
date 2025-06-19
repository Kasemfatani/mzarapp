import { HeroSection } from './components/HeroSection';
import PromoCode from './components/PromoCode';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function CustomPage() {
  return (
    <main className="min-h-screen flex flex-col items-stretch" dir='rtl'>

      <HeroSection />
      <PromoCode />
      <FAQ />
      <Footer />
    </main>
    
  );
}
