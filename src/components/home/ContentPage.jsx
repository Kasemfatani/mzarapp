'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import soonImage from '/public/soon_overlay.png'

import "swiper/css/pagination";
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import parse from 'html-react-parser';

export default function ContentPage() {

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
    function formatArabicDate(dateString) {
        // Parse the input date string into a JavaScript Date object
        const date = new Date(dateString);

        // Ensure the date is valid
        if (isNaN(date)) return "Invalid date";

        // Format the date to Arabic
        const arabicFormatter = new Intl.DateTimeFormat('ar-EG', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

        return arabicFormatter.format(date);
    }

    return (
        <>
            {
                loading ? <Loading /> :
                    data.length > 0 ?
                        <div className="content" style={{ direction: `${language === 'ar' ? 'rtl' : 'ltr'}` }} id='blogs'>
                            <div className="container m-auto">
                                <h3>{language === 'en' ? 'Blogs' : 'المقالات'}</h3>
                                <div className="path-swiper w-full" >

                                    <div className="grid-blogs-cont">
                                        {data?.map((path) =>
                                            <div className="content-card" key={path.id}>
                                                <div className="img-cont">
                                                    <Image src={path.image} alt="Mazar" width={200} height={200} />
                                                    <div className="overlay"></div>
                                                </div>
                                                <h4>{path.title}</h4>
                                                <p>{parse(path.description)}</p>
                                                <div className="date-book">
                                                    <div className="date">
                                                        <i className="fa-regular fa-calendar-days"></i>
                                                        <span>{language === 'ar' ? formatArabicDate(path?.date) : path?.date}</span>
                                                    </div>
                                                    <div className="book">
                                                        <a href={`/${path.slug}`} className='book-link'>{language === 'en' ? 'Read more' : 'قراءة المزيد'}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="soon" style={{ backgroundImage: `url(${soonImage.src}`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            }
        </>
    );
}
