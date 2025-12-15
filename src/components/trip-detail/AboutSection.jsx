"use client";

import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutSection({ lang , data }) {
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
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#c9a463] to-[#b8914a] flex items-center justify-center"
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
          <h2 className="text-[26px] leading-[1.3] text-[#0f3d2e]">{isAr ? "نبذة عن الرحلة" : "About the Trip"}</h2>
        </div>

        <div className="h-px bg-gradient-to-r from-[#c9a463] via-gray-200 to-transparent"></div>
      </div>

      {/* Description Paragraph - Separated */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <p className="text-[16px] leading-[1.7] text-gray-700 ">
          {data.about.desc}
        </p>
      </motion.div>

      {/* Bullet List - Proper spacing */}
      <div className="space-y-4">
        {data.about.list.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start gap-4 group"
          >
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="flex-shrink-0 w-9 h-9 rounded-[14px] bg-gradient-to-br from-[#0f3d2e]/10 to-[#c9a463]/10 flex items-center justify-center transition-transform"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#c9a463] to-[#b8914a]"></div>
            </motion.div>
            <p className="text-[16px] leading-[1.7] text-gray-700 flex-1  pt-1">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}