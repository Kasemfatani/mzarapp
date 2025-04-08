'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import Loading from '@/app/loading';
import { API_BASE_URL } from '@/lib/apiConfig';
import Image from 'next/image';
import parse from 'html-react-parser';

export default function SingleBlog() {

    const searchParams = useSearchParams()
    const [pathId, setPathId] = useState(searchParams.get('id'))
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('en');  // Default language is 'en'

    useEffect(() => {
        
        setLoading(true);
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
            // Fetch data from the API with Axios
            axios.get(`${API_BASE_URL}/landing/home/blogs/${pathId}`
                , {
                    headers: headers,
                })
                .then(response => {
                    setData(response.data.data);  // Set the response data to state
                    setLoading(false);  // Set loading to false
                    document.title = response.data.data.title;

                })
                .catch(error => {
                    setError(error);  // Handle any errors
                    console.error('Error fetching data:', error);
                    setLoading(false)
                });
        }
    }, []);  // Run this effect whenever the `language` changes

    useEffect(() => {
        if (data?.structured_data) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = 'structured-data-script';
    
            try {
                // Remove any existing script to avoid duplicates
                const existingScript = document.getElementById('structured-data-script');
                if (existingScript) existingScript.remove();
    
                // Parse and inject JSON
                script.text = JSON.stringify(JSON.parse(data.structured_data));
                document.head.appendChild(script);
            } catch (err) {
                console.error('Error parsing structured data JSON:', err);
            }
        }
    }, [data]);

    
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
                    <div className={`container mx-auto ${language === 'en' ? 'ltr' : 'rtl'}`}>
                        <div className="img-cont">
                            <div className="overlay"></div>
                            <Image src={data?.image} width={500} height={500} alt="Mazar" className="img" />
                        </div>
                        <div className="date-book mb-3">
                            <div className="date">
                                <i className="fa-regular fa-calendar-days"></i>
                                <span className='date-span'>{language === 'ar' ? formatArabicDate(data?.date) : data?.date}</span>
                            </div>
                        </div>
                        <div className="toc">
                            <h2>{language === 'ar' ? 'محتوى المقالة' : 'Table of Contents'}</h2>
                            <ul>
                                {
                                    data.toc.map((item) =>
                                        <li key={item.id}>
                                            <a href={`#${item.id}`}>{item.title}</a>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <h3 className="title-cont mb-3">{data?.title}</h3>
                        <p className="description-cont mb-10">{parse(data?.description)}</p>
                        
                    </div>
            }
        </>

    );
}
