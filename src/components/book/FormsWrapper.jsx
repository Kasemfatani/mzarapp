'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PathBookForm from './PathBookForm';
import MapSelector from './MapSelector';
import AddOns from './AddOns';
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';

export default function FormsWrapper() {
    const searchParams = useSearchParams();
    const router = useRouter();  // ✅ Initialize router
    const [pathId, setPathId] = useState(searchParams.get('id'));
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('en');
    const [step, setStep] = useState(1);
    const [mainData, setMainData] = useState({});

    const sendPostRequest = async () => {
        if (!mainData?.phone || !mainData?.name) {
            console.error("Missing required fields in mainData:", mainData);
            return;
        }
    
        const payload = {
            package_id: Number(pathId),
            mobile: mainData?.phone?.replace(mainData.country_key, ''),
            name: mainData?.name,
            country_code: mainData?.country_key?.replace("+", ""),
            address_name: mainData?.address,
            lat: mainData?.lat,
            lng: mainData?.lng,
            visit_time_id: Number(mainData.time),
            visit_date: mainData.date,
            transportation_type_id: Number(mainData.car),
            seats: Number(mainData.persons),
            coupon_code: "",
            add_ons: mainData?.addons || [],  
        };
    
        console.log("Sending API Request with payload:", payload);
    
        try {
            const response = await axios.post(`${API_BASE_URL}/landing/home/packages-booking-now`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    lang: 'en'
                }
            });
    
            console.log("API Response:", response.data);
            router.push('/congats?name=' + mainData?.name + '&phone=' + mainData?.phone + '&package=' + data?.name);
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
        }
    };
    

    useEffect(() => {
        if (step === 4) {
            sendPostRequest();  // ✅ Call the function properly
        }
    }, [step, mainData]);  // ✅ Ensure mainData updates trigger the request

    useEffect(() => {
        setLoading(true);
        if (typeof window !== 'undefined') {
            setLanguage(localStorage.getItem('lang') || 'en');

            axios.get(`${API_BASE_URL}/landing/home/packages-booking-data?package_id=${pathId}`, {
                headers: { lang: localStorage.getItem('lang') || 'en' }
            }).then(response => {
                setData(response.data);
                setLoading(false);
            }).catch(error => {
                setError(error);
                console.error('Error fetching data:', error);
                setLoading(false);
            });
        }
    }, []);

    return (
        <div className="form-connt new-form" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
            {loading ? <Loading /> : (
                <>
                    <div className="step-header">({step}/3)</div>
                    <div className="nameofpath">
                        <h1>{data?.data?.package_name}</h1>
                    </div>
                    <div className="form-image-cont">
                        <img src={data?.data?.package_image} alt="" />
                    </div>
                    {
                        step === 1 ?
                            <PathBookForm data={data.data} step={step} setStep={setStep} mainData={mainData} setMainData={setMainData} />
                            : step === 2 ?
                                <MapSelector data={data.data} step={step} setStep={setStep} mainData={mainData} setMainData={setMainData} />
                                :
                                <AddOns data={data.data} step={step} setStep={setStep} mainData={mainData} setMainData={setMainData} />
                    }
                </>
            )}
        </div>
    );
}
