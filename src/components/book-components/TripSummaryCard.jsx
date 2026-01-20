"use client";

import { Star, MapPin, Users, Clock } from "lucide-react";

const CURRENCY_SVG = (
	<svg
		viewBox="0 0 1124.14 1256.39"
		width="1.3em"
		height="1.3em"
		fill="currentColor"
		style={{ display: "inline", verticalAlign: "top" }}
	>
		<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
		<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
	</svg>
);

const SAR_RATE = 3.75;

const SAR_LABEL = (
	<span className="">
		{CURRENCY_SVG}
		<span className="mx-1 font-thin">(SAR)</span>
	</span>
);

export function TripSummaryCard({
  imageUrl,
  location,
  rating,
  reviewCount,
  title,
  subtitle,
  duration,
  maxPeople,
  price,
  minPeople,
  lang = "ar",
  tax = 0,
  isSaudi = true,
}) {
  const isAr = lang === "ar";
  const numericPrice = Number(price) || 0;
  const numericTax = Number(tax) || 0;
  const finalPrice = numericPrice * (1 + numericTax);

  // --- Currency Logic ---
	
	let displayPrice;
	let currencySymbol;

	if (isSaudi) {
		displayPrice = finalPrice;
		currencySymbol = isAr ? SAR_LABEL : "SAR";
	} else {
		displayPrice = finalPrice / SAR_RATE;
		currencySymbol = isAr ? "دولار" : "USD";
	}
	// --- End Currency Logic ---

  return (
    <div className="bg-white rounded-[20px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] border-[0.8px] border-[rgba(243,244,246,0.6)] overflow-hidden ">
      {/* Image Section */}
      <div className="relative h-[256px] w-full">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0)]" />
        
        {/* Location Badge */}
        <div className="absolute bottom-6 md:top-6 md:bottom-auto right-4 bg-[rgba(255,255,255,0.95)] rounded-[20px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] px-2 py-0 flex items-center gap-2">
          <p className="text-[#3c6652]">{location}</p>
          <MapPin className="w-4 h-4 text-[#3c6652]" strokeWidth={1.33} />
        </div>

        {/* Rating Badge */}
        <div className="absolute top-6 left-4 bg-[rgba(255,255,255,0.95)] rounded-full shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] px-2 py-0 flex items-center gap-2.5">
          <Star className="w-5 h-5 fill-[#FDC700] text-[#FDC700]" strokeWidth={1.67} />
          <p className="text-[#101828]">{rating}</p>
          <p className="text-[#4a5565] text-sm">({reviewCount} {isAr ? "تقييم" : "reviews"})</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2  ">
          <h2 className="text-[#3c6652] text-[30px] tracking-[-0.45px]">{title}</h2>
          <p className="text-[#4a5565]">{subtitle}</p>
        </div>

        {/* Tags */}
        <div className="flex gap-4 justify-center">
          <div className="bg-gradient-to-r from-[rgba(231,211,175,0.3)] to-[rgba(231,211,175,0.2)] border-[0.8px] border-[rgba(231,211,175,0.6)] rounded-full px-[16.8px] py-[4.8px] flex items-center gap-1">
            <p className="text-[#1e2939] ">1 - {maxPeople}</p>
            <Users className="w-4 h-4 text-[#867957]" strokeWidth={1.33} />
          </div>
          <div className="bg-gradient-to-r from-[rgba(231,211,175,0.3)] to-[rgba(231,211,175,0.2)] border-[0.8px] border-[rgba(231,211,175,0.6)] rounded-full px-[16.8px] py-[4.8px] flex items-center gap-1">
            <p className="text-[#1e2939]">{duration}</p>
            <Clock className="w-4 h-4 text-[#867957]" strokeWidth={1.33} />
          </div>
        </div>

        {/* Divider with Label */}
        <div className="relative h-[25.6px] w-full">
          <div className="absolute inset-x-0 top-[12.3px] h-px bg-gradient-to-r from-transparent via-[#d1d5dc] to-transparent" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-white px-2">
            <p className="text-[#6a7282] uppercase tracking-[0.8px]">{isAr ? "التسعير" : "Pricing"}</p>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="relative rounded-[18px] border-[1.6px] border-[rgba(231,211,175,0.6)] overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(173.577deg, rgba(231, 211, 175, 0.4) 0%, rgba(231, 211, 175, 0.25) 50%, rgba(0, 0, 0, 0) 100%)"
          }}
        >
          <div className="flex items-center  px-4 py-3 gap-2">
            <p className="text-[#3c6652] text-center">
              {isAr ? "" : "Costs"}{" "}
              <span className="">{displayPrice.toFixed(2)} {currencySymbol}</span>{" "}
              {isAr ? "للفرد" : "per person"}{" "}
              (<span className="text-[#867957]">{isAr ? "حد أدنى" : "Minimum"} {minPeople} {isAr ? "أشخاص" : "people"}</span>)
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex gap-5 justify-center items-center border-t border-[#f3f4f6] pt-2">
          <div className="flex items-center gap-2">
            <p className="text-[#4a5565]">{isAr ? "تأكيد فوري" : "Instant Confirmation"}</p>
            <p className="text-[#00a63e]">✓</p>
          </div>
          <div className="w-px h-10 bg-[#d1d5dc]" />
          <div className="flex items-center gap-2">
            <p className="text-[#4a5565]">{isAr ? "إلغاء مجاني" : "Free Cancellation"}</p>
            <p className="text-[#00a63e]">✓</p>
          </div>
        </div>
      </div>
    </div>
  );
}
