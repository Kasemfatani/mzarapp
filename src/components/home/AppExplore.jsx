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
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
        }
    }, []);
    return (
        <div style={{ backgroundImage: `url(${bg.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="AppExplore">
                <div className="container m-auto  genSection ">
                    <div className="img-cont">
                        {
                            language === 'en' ?<Image src={img} alt="Mazar" className="img" />:<Image src={img2} alt="Mazar" className="img" />
                        }
                    </div>
                    <div className={`l-side ${language === 'en' ? 'ltr' : 'rtl'}`} >
                        <h2 className='font-bold text-[#141414]'>{language === 'en' ? 'Download Mzar app now and enjoy a seamless experience exploring Makkah’s landmarks and booking your journeys effortlessly.' : 'حمّل تطبيق مزار الآن واستمتع بتجربة لا مثيل لها لاستكشاف معالم مكة وحجز رحلاتك بسهولة.'}</h2>
                        <p className="text-2xl font-medium mb-4 text-[#5A5A5A]">{language === 'en' ? 'Unlock the full potential of our app today! Book trips seamlessly, access engaging content, and enjoy even more features designed to make your experience smooth and enjoyable' : 'استخدم إمكانات تطبيقنا الكاملة اليوم! احجز رحلاتك بسلاسة، واحصل على محتوى جذاب، واستمتع بمزيد من الميزات المصممة لجعل تجربتك سلسة وممتعة'}</p>
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
