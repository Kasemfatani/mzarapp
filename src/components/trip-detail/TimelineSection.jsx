"use client";

import { Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TimelineSection({ lang }) {

  const isAr = lang === "ar";

  const [expandedStep, setExpandedStep] = useState(null);

  const timeline = [
    {
      time: isAr ? '6:00 م' : '6:00 PM',
      title: isAr ? 'التجمع والانطلاق' : 'Gathering and Departure',
      shortDesc: isAr ? 'لقاء المجموعة في نقطة التجمع المحددة' : 'Meeting the group at the designated gathering point',
      fullDesc: isAr ? 'سيتم استقبالكم من قبل المرشد السياحي في ساحة الحرم المكي. سيتم التعارف وتوزيع السماعات اللاسلكية وشرح برنامج الرحلة بالتفصيل.' : 'You will be welcomed by the tour guide at the Grand Mosque square. Introduction and distribution of wireless headsets and detailed explanation of the trip program.'
    },
    {
      time: isAr ? '7:00 م' : '7:00 PM',
      title: isAr ? 'الوصول والجولة التعريفية' : 'Arrival and Introductory Tour',
      shortDesc: isAr ? 'الدخول إلى المسجد الحرام وبداية الجولة' : 'Entering the Grand Mosque and starting the tour',
      fullDesc: isAr ? 'جولة شاملة حول المسجد الحرام مع شرح تاريخي مفصل عن البناء والتوسعات عبر العصور. ستتعرف على أهم المعالم والأماكن المقدسة.' : 'A comprehensive tour around the Grand Mosque with a detailed historical explanation of the construction and expansions over the ages. You will learn about the most important landmarks and holy places.'
    },
    {
      time: isAr ? '8:30 م' : '8:30 PM',
      title: isAr ? 'التجربة التفاعلية' : 'Interactive Experience',
      shortDesc: isAr ? 'الطواف والسعي مع الإرشاد الكامل' : 'Tawaf and Sa’i with full guidance',
      fullDesc: isAr ? 'فرصة لأداء الطواف حول الكعبة المشرفة والسعي بين الصفا والمروة مع إرشادات روحانية وتاريخية. سيكون هناك وقت كافٍ للتأمل والدعاء.' : 'Opportunity to perform Tawaf around the Kaaba and Sa’i between Safa and Marwah with spiritual and historical guidance. There will be ample time for reflection and prayer.'
    },
    {
      time: isAr ? '9:30 م' : '9:30 PM',
      title: isAr ? 'استراحة وضيافة' : 'Break and Hospitality',
      shortDesc: isAr ? 'استراحة قصيرة مع وجبة خفيفة' : 'Short break with a light meal',
      fullDesc: isAr ? 'وقت للراحة وتناول وجبة خفيفة في أحد المطاعم القريبة من الحرم. فرصة للتعارف أكثر وتبادل الانطباعات.' : 'Time to rest and have a light meal at one of the restaurants near the mosque. An opportunity to get to know each other better and exchange impressions.'
    },
    {
      time: isAr ? '10:30 م' : '10:30 PM',
      title: isAr ? 'العودة والختام' : 'Return and Conclusion',
      shortDesc: isAr ? 'جولة ختامية والعودة إلى نقطة الانطلاق' : 'Final tour and return to the starting point',
      fullDesc: isAr ? 'جولة أخيرة لزيارة أي مواقع متبقية والتقاط الصور التذكارية، ثم العودة بأمان إلى نقطة الانطلاق أو الفندق.' : 'A final tour to visit any remaining sites and take souvenir photos, then safely return to the starting point or hotel.'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container mx-auto bg-white rounded-[20px] p-10 shadow-[0px_6px_20px_rgba(0,0,0,0.06)] mb-10"
    >
      {/* Section Header - Grouped */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#0f3d2e] to-[#1a5a42] flex items-center justify-center"
          >
            <Clock className="w-7 h-7 text-white" />
          </motion.div>
          <h2 className="text-[26px] leading-[1.3] text-[#0f3d2e]" >{isAr ? "جدول الرحلة" : "Trip Schedule"}</h2>
        </div>

        <div className="h-px bg-gradient-to-r from-[#c9a463] via-gray-200 to-transparent"></div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className={`absolute ${isAr ? "right-8" : "left-8"} top-8 bottom-8 w-1 bg-gradient-to-b from-[#c9a463] via-[#0f3d2e] to-[#c9a463] rounded-full`}></div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {timeline.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex gap-6">
                {/* Time Badge */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0 relative z-10"
                >
                  <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-[#c9a463] to-[#b8914a] flex items-center justify-center shadow-md">
                    <span className="text-[14px] leading-[1.3] text-white">{step.time}</span>
                  </div>
                </motion.div>

                {/* Content Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`
                      bg-gradient-to-br from-[#F8F5F0] to-white rounded-[20px] p-6 
                      border-2 border-transparent hover:border-[#c9a463]/30 
                      transition-all cursor-pointer shadow-[0px_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0px_6px_20px_rgba(0,0,0,0.08)]
                      ${expandedStep === index ? 'border-[#c9a463]/50' : ''}
                    `}
                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-[20px] leading-[1.4] text-[#0f3d2e]  flex-1">{step.title}</h3>
                      <motion.div
                        animate={{ rotate: expandedStep === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-[#c9a463] flex-shrink-0" />
                      </motion.div>
                    </div>

                    {/* Short Description */}
                    <p className="text-[16px] leading-[1.7] text-gray-600 ">
                      {step.shortDesc}
                    </p>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedStep === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-[#c9a463]/20">
                            <p className="text-[15px] leading-[1.7] text-gray-700 ">
                              {step.fullDesc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}