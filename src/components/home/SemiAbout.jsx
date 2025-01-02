'use client' // This indicates that this component will use client-side rendering in Next.js
import Link from 'next/link'; // Importing the Link component for navigation within the app
import React, { useEffect, useState } from 'react'; // Importing React to use JSX and create the component
import img from '/public/semiAbout.png'; // Importing the image for the section (e.g., a logo or background image)
import Image from 'next/image'; // Importing the Image component for optimized image rendering
import { motion } from 'framer-motion'; // Importing the motion component from Framer Motion for animations

// The GenSection component that displays the content and handles animations
export default function SemiAbout() {
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
        // The parent div with a background image and no-repeat style
        <div className='semi-about'>
            <div className="genGeb"> {/* Wrapper for the section content */}
                <div className="container m-auto genSection "> {/* Main container for the section content */}

                    {/* Left-side content with animation */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }} // Initial animation state (faded and shifted left)
                        whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
                        viewport={{ once: true }}
                        transition={{
                            type: 'spring', // Using spring animation for smooth motion
                            bounce: 0.2, // Small bounce effect for the animation
                            duration: .9, // Duration of the animation
                        }}
                        className={`${language === 'en' ? 'ltr' : 'rtl'} l-side`} > {/* Styling for the left side content */}
                        
                        {/* Section heading */}
                        <h2 className='font-bold text-[#141414]'>{language==='en'?'Mzar App':'تطبيق مزار'}</h2>
                        <h3 className='font-bold text-[#141414]'>{language==='en'?'Tourist transport, religious tourism, routes & destinations':'نقل السياحة، السياحة الدينية، الطرق والوجهات'}</h3>
                        
                        {/* Description text */}
                        <p className="text-2xl font-medium mb-4 text-[#5A5A5A]">{language==='en'?'It gives you the freedom to choose between programs with various destinations or design a program according to your preferences and then choose the vehicle that is appropriate for you':'يوفر لك الحرية لاختيار برنامج مع وجود وجهات مختلفة او تصميم برنامج حسب احتياجاتك واختيار السيارة المناسبة لك'}</p>
                        
                    </motion.div>

                    {/* Right-side image container with animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted right)
                        whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
                        viewport={{ once: true }}
                        transition={{
                            type: 'spring', // Using spring animation for smooth motion
                            bounce: 0.2, // Small bounce effect for the animation
                            duration: .9, // Duration of the animation
                        }}
                        className="img-cont-semi"> {/* Styling for the image container */}
                        
                        
                        {/* Image component for optimized rendering */}
                        <Image src={img} alt="Mazar" className="img" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
