'use client'
import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';

export default function GatheringInfo() {
  // Gathering information
  const gatheringInfo = {
    title: 'تفاصيل الدعوة',
    date: 'يوم الثلاثاء',
    time: 'من الساعة 4:00',
    location: 'فندق فيرمونت برج الساعة',
    meetingPoint: 'الطابق (M2) - الاستقبال الرئيسي'
  };

  return (
    <section className="gathering-info py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primaryColor">
          {gatheringInfo.title}
        </h2>
        
        <div className="max-w-xl mx-auto">
          {/* Date, Time and Location Card */}
          <div className="rounded-lg p-5 shadow-sm">
            <div className="flex items-start mb-4">
              <Calendar className="w-6 h-6 text-primaryColor ml-3" />
              <div>
                <h3 className="text-lg font-semibold mb-1">التاريخ</h3>
                <p className="text-gray-700">{gatheringInfo.date}</p>
                <p className="text-gray-700 text-sm">06-05-2025م | 08-11-1446هـ</p>
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <Clock className="w-6 h-6 text-primaryColor ml-3" />
              <div>
                <h3 className="text-lg font-semibold mb-1">الوقت</h3>
                <p className="text-gray-700">{gatheringInfo.time}</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-primaryColor ml-3" />
              <div>
                <h3 className="text-lg font-semibold mb-1">الموقع</h3>
                <p className="text-gray-700">{gatheringInfo.location}</p>
                <p className="text-gray-600 text-sm mt-1">{gatheringInfo.meetingPoint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



