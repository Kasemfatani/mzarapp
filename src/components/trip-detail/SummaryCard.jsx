"use client";

import { Calendar, MapPin, Clock } from 'lucide-react';
import { motion } from "motion/react";

export function SummaryCard({ lang , data }) {
  const isAr = lang === "ar";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative container mx-auto my-10"
    >
      <div className="bg-gradient-to-b from-[#0f3d2e] to-[#1a5a42] rounded-[20px] shadow-[0px_6px_20px_rgba(0,0,0,0.06)] border-t-4 border-[#c9a463] p-6">
        {/* Title Section - Grouped with stronger separation */}
        <div className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-[32px] leading-[1.3] text-white mb-3 "
            
          >
            {data.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-[18px] leading-[1.6] text-[#c9a463] "
          >
            {data.description}
          </motion.p>
        </div>

        {/* Info Grid - With proper card padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[90%] ">
          {/* Available Date */}
          <motion.div 
            
            className="bg-white/10 backdrop-blur-sm rounded-[16px] p-4 border border-white/20"
          >
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-[#c9a463] flex-shrink-0 mt-0.5" />
              <div className="">
                <p className="text-xs text-white/70 mb-2 leading-[1.5]" >{isAr ? "التاريخ المتاح" : "Available Date"}</p>
                <p className="text-[16px] leading-[1.5] text-white" >
                  {data.availability}
                </p>
              </div>
              
            </div>
          </motion.div>

          {/* Meeting Point */}
          <motion.div 
           
            className="bg-white/10 backdrop-blur-sm rounded-[16px] p-4 border border-white/20"
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#c9a463] flex-shrink-0 mt-0.5" />
              <div className="">
                <p className="text-xs text-white/70 mb-2 leading-[1.5]">{isAr ? "نقطة التجمع" : "Meeting Point"}</p>
                <p className="text-[16px] leading-[1.5] text-white" >
                  {data.meetingPoint}
                </p>
              </div>
              
            </div>
          </motion.div>

          {/* Timing */}
          <motion.div 
           
            className="bg-white/10 backdrop-blur-sm rounded-[16px] p-4 border border-white/20"
          >
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-[#c9a463] flex-shrink-0 mt-0.5" />
              <div className="">
                <p className="text-xs text-white/70 mb-2 leading-[1.5]" >{isAr ? "أوقات التحرك" : "Timing"}</p>
                <p className="text-[16px] leading-[1.5] text-white" >
                  {data.times}
                </p>
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}