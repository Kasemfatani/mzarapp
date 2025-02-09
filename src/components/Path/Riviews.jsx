'use client'
import React, { useEffect, useState } from 'react';
import SingleNews from '../../components/blog/SingleNews';
export default function Riviews({ id }) {

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
            // axios.get(`${API_BASE_URL}/landing/home/packages/details?package_id=${pathId}`
            //     , {
            //         headers: headers,
            //     })
            //     .then(response => {
            //         setData(response.data);  // Set the response data to state
            //         setLoading(false);  // Set loading to false

            //     })
            //     .catch(error => {
            //         setError(error);  // Handle any errors
            //         console.error('Error fetching data:', error);
            //         setLoading(false)
            //     });
        }
    }, []);  // Run this effect whenever the `language` changes
    return (
        <div className="blog" style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}>
          
        </div>
    );
}
