'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from '/public/mecca.jpg';
import { title } from 'process';
export default function Content() {
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
        }
    }, []);  // Run this effect whenever the `language` changes
    let data = [
        { id: 1, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
        { id: 3, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
        { id: 2, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
        { id: 4, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
        { id: 5, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
    ]
    return (
        <div className="content"
         style={{direction: `${language === 'ar' ? 'rtl' : 'ltr'}`}}
        >
            <div className="container m-auto">
                <h3>{language === 'en' ? 'Read our content' : 'قراءة المحتوى'}</h3>
                <div className="path-swiper w-full">
                    <Swiper
                        // navigation
                        // pagination={{ type: "bullets", clickable: true }}
                        spaceBetween={24}
                        slidesPerView={7.5}
                        autoplay={false}
                        dir='ltr'
                        loop={true}
                        modules={[Autoplay, Navigation, Pagination]}
                        breakpoints={{
                            1400: {
                                slidesPerView: 3.2,
                            },
                            1100: {
                                slidesPerView: 3.1,
                            },
                            767: {
                                slidesPerView: 2.5,
                            },
                            768: {
                                slidesPerView: 2.5,
                                autoplay: false,
                            },
                            640: {
                                slidesPerView: 2.1,
                                autoplay: false,
                                spaceBetween: 16
                            },
                            100: {
                                slidesPerView: 1.1,
                                autoplay: false,
                                spaceBetween: 16

                            }
                        }}
                    >
                        {data.map((path) =>
                            <SwiperSlide key={path.id}>
                                <div className="content-card">
                                    <div className="img-cont">
                                        <Image src={path.img} alt="Mazar" />
                                        <div className="overlay"></div>
                                    </div>
                                    <h4>{language === 'en' ? path.title : path.titleAr}</h4>
                                    <p>{language === 'en' ? path.descripition : path.descriptionAr}</p>
                                    <div className="date-book">
                                        <div className="date">
                                            <i className="fa-regular fa-calendar-days"></i>
                                            <span>15 June 2025</span>
                                        </div>
                                        <div className="book">
                                            <Link href={'/blog'} className='book-link'>{language === 'en' ? 'Read more' : 'قراءة المزيد'}</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
