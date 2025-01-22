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
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
export default function Content() {
    // Run this effect whenever the `language` changes
    // let data = [
    //     { id: 1, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
    //     { id: 3, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
    //     { id: 2, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
    //     { id: 4, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
    //     { id: 5, img: img1, title: 'About umrah and hajj',titleAr: 'عن العمرة والحج', descripition: 'About umrah and hajj About umrah and hajjAbout umrah and hajj....' ,descriptionAr:"عن العمرة والحج عن العمرة والحج عن العمرة والحج عن العمرة والحج"},
    // ]
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        // setLoading(true);
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            // Fetch data from the API with Axios
            axios.get(`${API_BASE_URL}/landing/home/blogs`
                , {
                    headers: headers,
                }).then(response => {
                    setData(response.data.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false

                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);  // Run this effect whenever the `language` changes
    console.log(data);

    return (
        <>
            {
                loading ? <Loading /> :
                    data.length > 0 ?
                        <div className="content" style={{ direction: `${language === 'ar' ? 'rtl' : 'ltr'}` }} >
                            <div className="container m-auto">
                                <h3>{language === 'en' ? 'Blogs' : 'المقالات'}</h3>
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
                                        {data?.map((path) =>
                                            <SwiperSlide key={path.id}>
                                                <div className="content-card">
                                                    <div className="img-cont">
                                                        <Image src={path.image} alt="Mazar" width={200} height={200} />
                                                        <div className="overlay"></div>
                                                    </div>
                                                    <h4>{path.title}</h4>
                                                    <p>{path.description}</p>
                                                    <div className="date-book">
                                                        <div className="date">
                                                            <i className="fa-regular fa-calendar-days"></i>
                                                            <span>{path.date}</span>
                                                        </div>
                                                        <div className="book">
                                                            <Link href={`/blog?id=${path.slug}`} className='book-link'>{language === 'en' ? 'Read more' : 'قراءة المزيد'}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        : null
            }
        </>
    );
}
