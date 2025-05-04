'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, Info , Clock } from 'lucide-react';

export default function TourDetails() {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLanguage(localStorage.getItem('lang') === 'ar' ? 'ar' : 'en');
    }
  }, []);

  // Tour details content
  const tourDetails = {
    en: {
      title: 'Tour Details',
      description: 'Experience a unique guided tour of the historical and spiritual sites around Makkah with our expert guides.',
      duration: '6 hours',
      highlights: [
        'Visit to historical landmarks around Al Haram',
        'Expert commentary on the significance of each site',
        'Traditional lunch experience at a local restaurant',
        'Transportation in air-conditioned vehicles',
        'Small group for personalized experience'
      ],
      included: [
        'Professional guide',
        'Transportation',
        'Lunch and refreshments',
        'Entry fees to sites',
        'Souvenir prayer mat'
      ],
      notIncluded: [
        'Personal expenses',
        'Additional food outside of included meals',
        'Gratuities (optional)'
      ],
      notes: 'Please wear modest clothing and comfortable walking shoes. Bring a hat and sunscreen as some parts of the tour will be outdoors.'
    },
    ar: {
      title: 'تفاصيل الجولة',
      description: 'استمتع بجولة إرشادية فريدة للمواقع التاريخية والروحية حول مكة مع مرشدينا الخبراء.',
      duration: '6 ساعات',
      highlights: [
        'زيارة للمعالم التاريخية حول الحرم',
        'شرح خبير عن أهمية كل موقع',
        'تجربة غداء تقليدية في مطعم محلي',
        'المواصلات في مركبات مكيفة',
        'مجموعة صغيرة لتجربة شخصية'
      ],
      included: [
        'مرشد محترف',
        'المواصلات',
        'الغداء والمرطبات',
        'رسوم الدخول للمواقع',
        'سجادة صلاة تذكارية'
      ],
      notIncluded: [
        'المصاريف الشخصية',
        'طعام إضافي خارج الوجبات المشمولة',
        'الإكراميات (اختيارية)'
      ],
      notes: 'يرجى ارتداء ملابس محتشمة وأحذية مريحة للمشي. أحضر قبعة وواقي من الشمس حيث ستكون بعض أجزاء الجولة في الهواء الطلق.'
    }
  };

  const details = language === 'ar' ? tourDetails.ar : tourDetails.en;

  // Sample images for the tour
  const tourImages = [
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600255940203-05fd89e1d7af?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1610973374471-e667335f1b39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  return (
    <section className="tour-details py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {details.title}
        </h2>
        
        {/* Tour Description */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-xl text-gray-700">{details.description}</p>
          <div className="mt-4 inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <Clock className="w-5 h-5 mr-2" />
            <span>{details.duration}</span>
          </div>
        </div>
        
        {/* Tour Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {tourImages.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md h-64 relative">
              <Image 
                src={image}
                alt={`Tour highlight ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        
        {/* Tour Highlights and Inclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Highlights */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 text-green-700">
              {language === 'en' ? 'Tour Highlights' : 'معالم الجولة'}
            </h3>
            <ul className="space-y-3">
              {details.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* What's Included */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 text-green-700">
              {language === 'en' ? 'What\'s Included' : 'ما هو مشمول'}
            </h3>
            <ul className="space-y-3">
              {details.included.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <h3 className="text-2xl font-semibold mb-4 mt-8 text-red-700">
              {language === 'en' ? 'Not Included' : 'غير مشمول'}
            </h3>
            <ul className="space-y-3">
              {details.notIncluded.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1 flex-shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Important Notes */}
        <div className="max-w-4xl mx-auto mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
          <div className="flex items-start">
            <Info className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-xl font-semibold text-blue-800 mb-2">
                {language === 'en' ? 'Important Notes' : 'ملاحظات مهمة'}
              </h4>
              <p className="text-blue-800">{details.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}