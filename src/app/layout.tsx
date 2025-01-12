import type { Metadata } from 'next';
import './globals.css';
import './video-react.css';
import mzarImg from '../assets/images/home/og.png';
import Header from '@/components/header/Header';
import Footer from '@/components/home/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../style/main.css';
import { GoogleTagManager } from '@next/third-parties/google';
import { Merriweather } from 'next/font/google';
import Script from 'next/script';

const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' });

const HOTJAR_ID = 5254855;
const HOTJAR_SRC = 'https://static.hj.contentsquare.net/c/csq-';

async function fetchSEOData() {
  try {
    const res = await fetch('https://dash.mzarapp.com/api/landing/home/seo-landing', {
      cache: 'no-store', // Ensures fresh data is fetched on each request
    });
    if (!res.ok) {
      throw new Error('Failed to fetch SEO data');
    }
    return res.json(); // Return the parsed JSON data
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return null; // Return null in case of an error
  }
}

// Function to generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await fetchSEOData();
  console.log(seoData.data.keywords.split(','));
  
  const lang = typeof window !== 'undefined' && localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'; // Default to 'en'

  return {
    title: lang === 'ar' ? 'مزار: رحلتك إلى أعماق التاريخ والروحانية' : 'Mzar: Your Journey into the Depths of History and Spirituality',
    keywords:seoData.data.keywords,
    description: seoData?.description,
    openGraph: {
      title: lang === 'ar' ? 'مزار' : 'Mzar',
      description:'مزار, مزارات, رحلات سياحية, رحلات دينية, الخضارة الإسلامية, المعالم المشهورة, إرشاد سياحي, وسيلة مواصلات, برامج سياحية, الأماكن المقدسة, تطبيق سياحي',
      url: 'https://yourwebsite.com', // Replace with your website URL
      siteName: lang === 'ar' ? 'مزار' : 'Mzar',
      
      images: [
        {
          url: mzarImg.src, // Automatically resolves the URL for the imported image
          width: 1200,
          height: 630,
          alt: lang === 'ar' ? 'مزار - واجهة ومسار' : 'Mzar - A destination and path',
        },
      ],
      type: 'website',
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="root">
      <GoogleTagManager gtmId="GTM-WS294KJ" />
      <body className="w-full" suppressHydrationWarning={true}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WS294KJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Header />
        <>{children}</>
        <Footer />
      </body>
    </html>
  );
}
