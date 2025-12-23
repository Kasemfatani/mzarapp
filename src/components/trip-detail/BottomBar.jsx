import { ArrowLeft, Clock, Shield } from 'lucide-react';
import { motion } from 'motion/react';


const CURRENCY_SVG = (
	<svg
		viewBox="0 0 1124.14 1256.39"
		width="1.5em"
		height="1.5em"
		fill="white"
		style={{ display: "inline", verticalAlign: "top" }}
	>
		<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
		<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
	</svg>
);

export function BottomBar( { lang , data } ) {
  const isAr = lang === "ar";

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed  bottom-0 w-full  bg-gradient-to-b from-[#0f3d2e] to-[#1a5a42] border-t-4 border-[#c9a463] shadow-[0px_-6px_20px_rgba(0,0,0,0.08)] z-50"
    >
      <div className="container mx-auto  px-10 py-1">
        {/* Main Content - Primary CTA Section */}
        <div className="flex items-center justify-between mb-1">
          {/* Price Section */}
          <div className="flex flex-row items-center gap-1">
            <p className="text-[13px] md:text-[20px] leading-[1.5] text-white/80">{isAr ? "السعر يبدأ من" : "Price starts from"}</p>
            <div className="flex items-center gap-3 ltr">
              {/* SAR Icon */}
              <div className=" relative">
                {CURRENCY_SVG}
              </div>
              <div className="">
                <span className="text-[13px] md:text-[20px] leading-[1.2] text-white" >
                  {data.start_price}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button - Premium spacing */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#857856] hover:bg-[#756849] text-white px-6 py-3 rounded-[18px] flex items-center gap-3 transition-all shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[11px] md:text-[18px]  leading-[1.3]">{isAr ? "احجز الآن" : "Book Now"}</span>
          </motion.button>
        </div>

        {/* Trust Badges - Secondary Info */}
        <div className="flex items-center justify-center gap-10 pt-1 border-t border-white/10">
          <div className="flex items-center gap-2.5 py-1">
            <Shield className="w-4 h-4 text-[#c9a463]" />
            <span className="text-[11px] leading-[1.5] text-white/70">{isAr ? "إلغاء مجاني قبل 24 ساعة" : "Free cancellation before 24 hours"}</span>
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2.5 py-1">
            <Clock className="w-4 h-4 text-[#c9a463]" />
            <span className="text-[11px] leading-[1.5] text-white/70">{isAr ? "تأكيد فوري" : "Instant confirmation"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}