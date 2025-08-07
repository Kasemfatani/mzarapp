'use client'
import Link from 'next/link';
import exp from '/public/exp.png'
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Explore() {
    const [language, setLanguage] = useState('en');
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setLanguage(localStorage.getItem('lang') || 'en');
      }
    }, []);
    return (
        <div className="explore" style={{ backgroundImage: `url(${exp.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' , direction: language === 'en' ? 'ltr' : 'rtl' }}>
            <div className="overll">
                <div className="container m-auto">
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration:  .5,
                        }}
                        viewport={{ once: true }} className="text">
                        <div className="padg">
                            <h3>{language === 'en' ? 'Ascend to the Peak of Light… with Ease' : 'اصعد إلى قمة النور... بسهولة'}</h3>
                        </div>
                        <h2>{language=== 'en'?"Explore the Hira Cave comfortably, With a direct car ride to AlNoor Mountain":"استكشف غار حراء بكل أريحية، مع خدمة الصعود إلى جبل النور بالسيارة"}</h2>
                        <Link href="/book" className='px-8 py-2 text-white rounded-lg bg-primaryColor inline-block w-fit'>{language === 'en' ? 'Book Now' : 'احجز الان'}</Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
