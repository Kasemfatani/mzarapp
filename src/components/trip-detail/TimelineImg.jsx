"use client";

import { Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TimelineImg({ lang , data }) {

  const isAr = lang === "ar";


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

      <img src={data.timelineImg} alt={isAr ? "صورة الجدول الزمني" : "Timeline Image"} className='md:w-[50%] mx-auto rounded-[20px]'/>
    </motion.div>
  );
}