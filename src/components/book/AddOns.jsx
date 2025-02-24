'use client';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import sar from '/public/sar.png';
import Image from 'next/image';


export default function MapSelector({ data, step, setStep, mainData, setMainData }) {
    const [language, setLanguage] = useState('en'); // Default language is 'en'
    const [addOns, setAddOns] = useState([]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const lang = localStorage.getItem('lang') || 'en';
            setLanguage(lang);
        }
    }, []);

    const handleNext = () => {
        const updatedData = { ...mainData, addons:addOns };
        setMainData(updatedData);
        setStep(4);
    };

    return (
        <div className="addons-cont">
            {
                data.add_ons.map((addOn, index) =>
                    <div className={addOns.includes(addOn.id) ? 'addon active-addon' : 'addon'} key={index} onClick={() => {
                        if (addOns.includes(addOn.id)) {
                            setAddOns(addOns.filter((id) => id !== addOn.id));
                        } else {
                            setAddOns([...addOns, addOn.id]);
                        }
                    }}>
                        <div className="check">
                            {addOns.includes(addOn.id) ? <i class="fa-solid fa-check"></i> : null}
                        </div>
                        <div className="addon-cont">
                            <h3>{addOn.name}</h3>
                            <span className='addon-price flex gap-3' style={{direction:"rtl"}}>{addOn.price}  <Image src={sar} width={20} height={20} alt='sar' /> </span>
                            <p>{addOn.info}</p>
                            {/* {
                                addOn.allow_multiple ? <sapn className='allow-multiple'>{language === 'en' ? 'Allow Multiple' : 'السماح بالكثيرة'}</sapn> : null
                            } */}
                        </div>
                    </div>
                )
            }
            <Button className="submit" onClick={handleNext}>
                {language === 'ar' ? 'التالي' : 'Next'}
            </Button>
        </div>
    );
}
