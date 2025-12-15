"use client";

import { MapPin, Users, Compass, Globe, Calendar, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const ICONS = {
  "map-pin": MapPin,
  "compass": Compass,
  "globe": Globe,
  "calendar": Calendar,
  "shield": Shield,
  "users": Users,
};

export function HighlightsSection({ lang , data }) {

  const isAr = lang === "ar";

  const items = data?.highlights || [];


  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {items.map((item, index) => {
        const Icon = ICONS[item.icon] || MapPin;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group bg-white rounded-[20px] p-8 shadow-[0px_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0px_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center gap-5">
              {/* Icon */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-[#c9a463] to-[#b8914a] flex items-center justify-center shadow-md"
              >
                <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
              </motion.div>
              
              {/* Text Group */}
              <div className="space-y-2">
                <h3 className="text-[20px] leading-[1.4] text-[#0f3d2e]">{item.title}</h3>
                <p className="text-[15px] leading-[1.6] text-gray-600">{item.detail}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}