'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BlurFade from '../ui/blur-fade';
import img1 from '/public/gallery/client1.png';
import img2 from '/public/gallery/client2.png';
import img3 from '/public/gallery/client3.png';
import img5 from '/public/gallery/client4.png';
import img6 from '/public/gallery/client6.png';
import img7 from '/public/gallery/client7.png';
import img9 from '/public/gallery/client9.png';
import img10 from '/public/gallery/client10.png';
import img12 from '/public/gallery/client12.png';
import { Fancybox } from "@fancyapps/ui";
import { motion } from 'framer-motion'; // Importing the motion component from Framer Motion for animations
import "@fancyapps/ui/dist/fancybox/fancybox.css";


const images = Array.from({ length: 9 }, (_, i) => {
    const isLandscape = i % 2 === 0;
    const width = isLandscape ? 800 : 600;
    const height = isLandscape ? 600 : 800;
    return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});

export default function Parteners() {
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));      
        }
    }, []);  // Run this effect whenever the `language` changes
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
    let imgs =
        [
            { url: img1, category: 'photos' },
            { url: img3, category: 'photos' },
            { url: img5, category: 'videos' },
            { url: img2, category: 'photos' },
            { url: img6, category: 'videos' },
            { url: img7, category: 'videos' },
            { url: img9, category: 'videos' },
            { url: img10, category: 'photos' },
            { url: img12, category: 'photos' },
        ]
    let [activeTab, setActiveTab] = useState('all');

    return (
        <div className="gallery" id='gallery' style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}>
            <div className="container mx-auto">
                <h2>{language === 'en' ? 'Gallery' : 'المعرض' }</h2>
                <p>{language === 'en' ? 'Come to see our visitors how enjoy they experience.' : 'استمتع بالتجربة الكاملة مع تطبيقنا'} </p>
                {/* <div className="tabs">
                    <button className={`tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>{language === 'en' ? 'All' : 'الكل' }</button>
                    <button className={`tab ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => setActiveTab('photos')}>{language === 'en' ? 'Photos' : 'الصور'}</button>
                    <button className={`tab ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => setActiveTab('videos')}>{language === 'en' ? 'Videos' : 'الفيديوهات' }</button>
                </div> */}
                <section id="photos">
                    <div className="columns-2 gap-4 sm:columns-3">
                        {imgs.map((img, idx) => (
                            (img.category === activeTab || activeTab === 'all') ?
                                <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
                                    {/* <Image
                                        className="mb-4 size-full rounded-lg object-contain"
                                        src={img.url}
                                        alt={`Random stock image ${idx + 1}`}
                                    /> */}
                                    <a href={img.url.src} data-fancybox="gallery">
                                        <figure>
                                            <Image src={img.url} alt="Mazar" width={200} height={200} className="mb-4 size-full rounded-lg object-contain" />
                                        </figure>
                                    </a>
                                </BlurFade>
                                :
                                null

                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
