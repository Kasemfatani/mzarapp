"use client";

import { Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function TimelineSection({ lang , data }) {

  const isAr = lang === "ar";

  const [expandedStep, setExpandedStep] = useState(null);

  

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
          {data.timeline.map((step, index) => (
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
                  <div className="w-20 h-20 rounded-[18px] bg-gradient-to-br from-[#c9a463] to-[#b8914a] flex items-center justify-center shadow-md ps-1">
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