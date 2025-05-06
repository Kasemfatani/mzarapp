'use client'
import React from 'react';
import { Check, Phone, MessageCircle } from 'lucide-react';

export default function TourDetails() {
  // Tour details content
  const tourDetails = {
    title: 'ماذا ينتظركم؟',
    highlights: [
      'جولة معرفية تطل على الكعبة مباشرة',
      'قصص تاريخية تروى من قلب مكة',
      'تجربة تفاعلية مصممة خصيصًا لضيوف الرحمن',
      'لقاء نخبة من المتخصصين في تاريخ مكة'
    ]
  };

  return (
    <section className="tour-details py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          {tourDetails.title}
        </h2>
        
        <div className="max-w-2xl mx-auto">
          {/* Tour Highlights */}
          <div className="bg-white rounded-lg p-5 shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-3 text-primaryColor">
              معالم الجولة
            </h3>
            <ul className="space-y-2">
              {tourDetails.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-primaryColor ml-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="bg-primaryColor/10 border-r-4 border-primaryColor p-5 rounded-l-lg">
            <h4 className="text-lg font-semibold text-primaryColor mb-3 text-center">
              للتواصل والاستفسار
            </h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primaryColor ml-2 flex-shrink-0" />
                <div>
                  <p className="text-primaryColor font-medium">للاستفسارات: 0594426243</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-primaryColor ml-2 flex-shrink-0" />
                <div>
                  <p className="text-primaryColor font-medium">يمكنكم التواصل عبر تطبيقات واتساب أو عبر قنوات مزار الرسمية.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





