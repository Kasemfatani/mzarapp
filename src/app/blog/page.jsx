'use client'
import React, { useEffect, useState } from 'react';
import SingleBlog from '../../components/blog/SingleBlog';
import Content from '../../components/home/Content';
export default function Blog() {

    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLanguage(localStorage.getItem('lang'));
        }
    }, []);  // Run this effect whenever the `language` changes



    return (
        <div className="blog" style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}>
            <SingleBlog />
            <Content />
        </div>
    );
}
