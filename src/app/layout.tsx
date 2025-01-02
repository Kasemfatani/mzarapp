//Edited date :14/10/2024
//change Main layout structure
import type { Metadata } from 'next';
import './globals.css';
import './video-react.css';
import Header from '@/components/header/Header';
import Footer from '@/components/home/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../style/main.css';
import { GoogleTagManager } from '@next/third-parties/google'
import {Merriweather} from 'next/font/google'
// import { Navigation } from 'lucide-react';
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' })


export const metadata: Metadata = {
  title: 'Mzar',
  description: 'مزار, مزارات, رحلات سياحية, رحلات دينية, الخضارة الإسلامية, المعالم المشهورة, إرشاد سياحي, وسيلة مواصلات, برامج سياحية, الأماكن المقدسة, تطبيق سياحي',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id='root'>
      <GoogleTagManager gtmId='GTM-WS294KJ' />
      <body className="w-full" suppressHydrationWarning={true}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WS294KJ" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <Header />
        <>{children}</>
        <Footer />

      </body>
    </html>
  );
}
