'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import part1 from '/public/conf/1.png';
import part2 from '/public/conf/2.svg';
import part3 from '/public/conf/9.png';
import part4 from '/public/conf/4.svg';
import part6 from '/public/conf/6.png';
import part5 from '/public/conf/5.png';
import part8 from '/public/conf/8.png';
import part7 from '/public/conf/7.png';
import part9 from '/public/conf/10.svg';
import part10 from '/public/conf/12.png';
import part11 from '/public/conf/11.svg';
import part12 from '/public/conf/anjum.png';
import Marquee from '../ui/marquee';
import { cn } from '@/lib/utils';

export default function Parteners() {
    const [language, setLanguage] = useState('en');  // Default language is 'en'
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang'));
            // Define the headers with the selected language
            const headers = {
                lang: localStorage.getItem('lang'), // Change language dynamically based on state
            };
        }
    }, []);

    const ReviewCard = ({
        img,
    }) => {
        return (
            <figure
                className={cn(

                )}
            >
                <div className="part-cont" >
                    <Image src={img} alt="Mazar" width={200} height={200} priority/>
                </div>
            </figure>
        );
    };
    let parts = [{ img: part1.src }, { img: part2 }, { img: part3 }, { img: part4 }, { img: part6 } , { img: part5 }, { img: part7 }, { img: part8 }, { img: part9 }, { img: part10 }, { img: part11 } , { img: part12 }];
    
    return (
        <div className="parteners" style={{ direction: language === 'en' ? 'ltr' : 'rtl' }}>
            <div className="container m-auto">
                <h2>{language === 'en' ? 'Accredited by':'معتمدون لدى'  }</h2>
            </div>
            <div className="parts-cont">
                <div className="partss" style={{ direction:'ltr' }}>
                    <div className="relative flex  w-full flex-col items-center gap-4 justify-center overflow-hidden  ">
                        <Marquee pauseOnHover className="[--duration:20s]">
                            {parts.map((review, index) => (
                                <ReviewCard key={index} {...review} />
                            ))}
                        </Marquee>
                    </div>
                </div>

            </div>
        </div>
    )
}
