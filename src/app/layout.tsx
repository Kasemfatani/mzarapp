import Head from 'next/head';
import type { Metadata } from 'next';
import React, { Suspense } from 'react'
import './globals.css';
import './video-react.css';
import mzarImg from '../assets/images/home/og.png';
import Header from '@/components/header/Header';
import Footer from '@/components/home/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../style/main.css';
import { GoogleTagManager } from '@next/third-parties/google';


export async function generateMetadata(): Promise<Metadata> {
  const lang = typeof window !== 'undefined' && localStorage.getItem('lang') === 'ar' ? 'ar' : 'en';
  return {
    title: lang === 'ar' ? 'مزار: رحلتك إلى أعماق التاريخ والروحانية' : 'Mzar: Your Journey into the Depths of History and Spirituality',
    keywords: "مزار, مزارات, رحلات سياحية, رحلات دينية, الخضارة الإسلامية, المعالم المشهورة, إرشاد سياحي, وسيلة مواصلات, برامج سياحية, الأماكن المقدسة, تطبيق سياحي",
    description: "مزار هو تطبيق مبتكر يقدم تجربة استثنائية لاستكشاف المعالم الدينية والتاريخية والثقافية في مكة المكرمة. اختر من بين أربعة مسارات مميزة، واستمتع بخدمة الإثراء المعرفي الصوتي والنصي بـ6 لغات، مع تخطيط سهل ومريح لرحلتك الروحانية",
    openGraph: {
      title: "MzarApp | تطبيق مزار",
      description: 'مزار هو تطبيق مبتكر يقدم تجربة استثنائية لاستكشاف المعالم الدينية والتاريخية والثقافية في مكة المكرمة. اختر من بين أربعة مسارات مميزة، واستمتع بخدمة الإثراء المعرفي الصوتي والنصي بـ6 لغات، مع تخطيط سهل ومريح لرحلتك الروحانية',
      url: 'https://www.mzarapp.com',
      siteName: "MzarApp | تطبيق مزار",
      images: [
        {
          url: mzarImg.src,
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
      <Head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
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
        {children}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
