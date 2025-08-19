'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import img from '/public/iPhone.webp';
import img2 from '/public/iPhoneArabic.webp';
import bg from '/public/mecca.jpg';
import apple from '/public/apple.png';
import google from '/public/gogle.png';
import Image from 'next/image';
export default function AppExplore() {
    const [language, setLanguage] = useState('ar');  // Changed default from 'en' to 'ar'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang') || 'ar');  // Added fallback to 'ar'
            const headers = {
                lang: localStorage.getItem('lang') || 'ar', // Added fallback to 'ar'
            };
        }
    }, []);
    return (
        <div style={{ backgroundImage: `url(${bg.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="AppExplore">
                <div className="container m-auto genSection">
                    <div className="img-cont">
                        {
                            language === 'en' ?<Image src={img} alt="Mazar" className="img" />:<Image src={img2} alt="Mazar" className="img" />
                        }
                    </div>
                    <div className={`l-side ${language === 'en' ? 'ltr' : 'rtl'}`}>
                        <p className='font-bold text-[#141414] text-[40px] md:text-[32px] sm:text-[26px] xs:text-[22px] leading-[1.4] md:leading-[1.3] sm:leading-[1.25]'>
                            {language === 'en' ? "Download Mzar App Now and Discover Makkah and Madinah Like Never Before" : 'حمّل تطبيق مزار الآن واكتشف مكة والمدينة كما لم ترهما من قبل'}
                        </p>
                        <p className='font-bold text-start text-[#141414] text-[40px] md:text-[32px] sm:text-[26px] xs:text-[22px] leading-[1.4] md:leading-[1.3] sm:leading-[1.25]'>
                            {language === 'en' ? "Enjoy unique on-site journeys, interactive educational content, and a digital audio guide in 6 languages" : 'استمتع برحلات ميدانية فريدة، محتوى معرفي تفاعلي، ومرشد صوتي رقمي بـ 6 لغات'}
                        </p>
                        <p className="font-medium text-[#5A5A5A]">
                            {language === 'en' ? 'Customize your trip to match your schedule' : 'يمكنك تخصيص رحلتك بما يناسب وقتك'}
                        </p>
                        <p className="font-medium mb-4 text-[#5A5A5A]">
                            {language === 'en' ? 'Book, Explore, and Enjoy history and faith in simple steps' : 'احجز، استكشف، واستمتع مع التاريخ والإيمان بخطوات بسيطة'}
                        </p>
                        <div className="app-dowmload">
                            <Link href="https://onelink.to/yb2xky"><Image src={google} alt="Mazar" className="img" /></Link>
                            <Link href="https://onelink.to/yb2xky"><Image src={apple} alt="Mazar" className="img" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
