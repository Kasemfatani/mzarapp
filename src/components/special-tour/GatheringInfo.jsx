'use client'
import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Calendar, Users } from 'lucide-react';

export default function GatheringInfo() {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLanguage(localStorage.getItem('lang') === 'ar' ? 'ar' : 'en');
    }
  }, []);

  // Gathering information
  const gatheringInfo = {
    en: {
      title: 'Gathering Information',
      date: 'Tuesday, May 6, 2025',
      time: '8:00 AM',
      location: 'Mzar Meeting Point, Al Haram District',
      meetingPoint: 'In front of Gate 25, look for the Mzar flag',
      participants: 'Limited to 20 participants'
    },
    ar: {
      title: 'معلومات التجمع',
      date: 'الثلاثاء، 6 مايو 2025',
      time: '8:00 صباحًا',
      location: 'نقطة لقاء مزار، حي الحرم',
      meetingPoint: 'أمام البوابة 25، ابحث عن علم مزار',
      participants: 'محدود لـ 20 مشاركًا'
    }
  };

  const info = language === 'ar' ? gatheringInfo.ar : gatheringInfo.en;

  return (
    <section className="gathering-info py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {info.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Date and Time Card */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start mb-6">
              <Calendar className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1">{language === 'en' ? 'Date' : 'التاريخ'}</h3>
                <p className="text-gray-700">{info.date}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1">{language === 'en' ? 'Time' : 'الوقت'}</h3>
                <p className="text-gray-700">{info.time}</p>
              </div>
            </div>
          </div>
          
          {/* Location Card */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start mb-6">
              <MapPin className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1">{language === 'en' ? 'Location' : 'الموقع'}</h3>
                <p className="text-gray-700">{info.location}</p>
                <p className="text-gray-600 mt-1">{info.meetingPoint}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="w-8 h-8 text-green-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold mb-1">{language === 'en' ? 'Group Size' : 'حجم المجموعة'}</h3>
                <p className="text-gray-700">{info.participants}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}