'use client'
import React, { useEffect , useState } from 'react';
import doneImage from '/public/done.svg';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Book() {
    const searchParams = useSearchParams();  // Fixed variable name
    const [language, setLanguage] = useState("en");
    // const name = searchParams.get('name');
    // const phone = searchParams.get('phone');
    // const package_name = searchParams.get('package');

    // useEffect(() => {
    //     // Ensure window object is available before accessing dataLayer
    //     if (typeof window !== "undefined") {
    //         window.dataLayer = window.dataLayer || [];
    //         window.dataLayer.push({
    //             event: 'form_submission',
    //             customer_name: name,
    //             customer_whatsapp: "+" + phone.split(' ').join(''),
    //             package_name: package_name,
    //         });
    //     }
    // }, [name, phone, package_name]); // Added dependency array

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLanguage(localStorage.getItem("lang") || "en");
        }
    }, []);

    const texts = {
        en: {
            title: "Welcome to Mazar",
            desc: "Our team will contact you shortly on WhatsApp to guide you through the next steps of your journey. We look forward to assisting you!",
        },
        ar: {
            title: "مرحبًا بك في مزار",
            desc: "سيتواصل معك فريقنا قريبًا عبر الواتساب لإرشادك في الخطوات التالية من رحلتك. نتطلع لخدمتك!",
        },
    };

    const t = language === "ar" ? texts.ar : texts.en;

     return (
        <div className="popup" dir={language === "ar" ? "rtl" : "ltr"}>
            <div className="popup-cont">
                <Image src={doneImage} alt="Mazar" className="img" />
                <h2>{t.title}</h2>
                <p>{t.desc}</p>
            </div>
        </div>
    );
}
