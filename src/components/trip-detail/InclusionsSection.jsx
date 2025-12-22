"use client";

import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function InclusionsSection({ lang , data }) {
  
  const isAr = lang === "ar";

  const included = isAr ? [
    'مرشد سياحي معتمد ومتحدث بلغات متعددة',
    'نقل مريح ومكيف من وإلى الفندق',
    'ضيافة خفيفة ومياه معدنية طوال الرحلة',
    'دخول جميع المواقع والأماكن المقدسة',
    'سماعات لاسلكية للاستماع للمرشد بوضوح',
    'تأمين شامل على المجموعة'
  ] : [
    'Certified multilingual tour guide',
    'Comfortable air-conditioned transport to and from the hotel',
    'Light refreshments and mineral water throughout the trip',
    'Entry to all holy sites and places',
    'Wireless headsets for clear guide listening',
    'Comprehensive group insurance'
  ];

  const notIncluded = isAr ? [
    'المشتريات والهدايا الشخصية',
    'وجبات إضافية غير مذكورة',
    'الإقامة الفندقية',
    'تذاكر الطيران'
  ] : [
    'Personal purchases and gifts',
    'Additional meals not mentioned',
    'Hotel accommodation',
    'Air tickets'
  ];

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* Included */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50/30 rounded-[20px] p-8 border-2 border-green-200/50"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-md"
          >
            <CheckCircle2 className="w-7 h-7 text-white" />
          </motion.div>
          <h3 className="text-[24px] leading-[1.3] text-[#0f3d2e]">{isAr ? "يشمل" : "Included"}</h3>
        </div>

        {/* List */}
        <div className="space-y-4">
          {data.consists.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-[16px] leading-[1.7] text-gray-700  flex-1">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Not Included */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-50 to-slate-50/30 rounded-[20px] p-8 border-2 border-gray-200/50"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-gray-500 to-slate-500 flex items-center justify-center shadow-md"
          >
            <XCircle className="w-7 h-7 text-white" />
          </motion.div>
          <h3 className="text-[24px] leading-[1.3] text-[#0f3d2e]">{isAr ? "لا يشمل" : "Not Included"}</h3>
        </div>

        {/* List */}
        <div className="space-y-4">
          {data.unconsists.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <XCircle className="w-6 h-6 text-gray-500 flex-shrink-0 mt-0.5" />
              <span className="text-[16px] leading-[1.7] text-gray-600  flex-1">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}