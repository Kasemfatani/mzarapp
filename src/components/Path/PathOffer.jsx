import React, { useState } from "react";
import Offer from "./Offer";
import Link from "next/link";

export default function PathOffer({ language, startingPrice, originalPrice ,
  whatsappText,
  pathId, }) {
	// Calculate original price if not provided
	const orig =
		originalPrice && !isNaN(originalPrice)
			? Number(originalPrice)
			: Number(startingPrice) * 1.25; // fallback: 25% more

	return (
		<section className="py-4 bg-[var(--main-bg)]">
			<h2 className="text-2xl mb-4 text-center ">
				{language === "en" ? "Get 20% Off" : "احصل على خصم 20٪"}
			</h2>
			<div className="flex flex-col md:flex-row gap-2 md:gap-0">
				<div className="flex-1 btn-offer-cont md:border-e md:border-e-black">
					<Offer language={language} />
				</div>
				<div className="flex-1 border-t md:border-t-0 pt-2 md:pt-0 flex flex-col items-center justify-center">
					
          <div className="flex flex-col">
            <p className="mb-1 text-sm text-black font-semibold">
						{language === "en" ? "From" : "من"}
					</p>
					<div className="flex items-baseline gap-2">
						<span className="text-2xl md:text-3xl font-bold text-[#7B7154]">
							{startingPrice?.toFixed(2)} {language === "ar" ? "ر.س" : "SAR"}
						</span>
						<span className="text-sm  line-through text-gray-400 font-bold">
							{orig.toFixed(2)}
						</span>
						<span className="text-sm  text-red-600 font-bold ms-1">
							{language === "en" ? "20% discount" : "خصم 20٪"}
						</span>
					</div>
          <p className="mt-1 text-sm text-black font-semibold">
						{language === "en"
							? "Per group up to 4 persons"
							: "لكل مجموعة حتى 4 شخص"}
					</p>
          </div>
					
				</div>
			</div>
      {/* Booking link at the bottom center */}
      <div className="w-full flex justify-center mt-6">
        {whatsappText ? (
          <a
            href={`https://wa.me/+966580121025?text=${encodeURIComponent(
              whatsappText
            )}`}
            className="book-link-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
            <span>
              {language === "en"
                ? "Book now via WhatsApp"
                : "احجز الآن عبر واتساب"}
            </span>
          </a>
        ) : (
          <Link href={`/book-path?id=${pathId}`} className="book-link">
            {language === "en" ? "Book Now" : "احجز الآن"}
          </Link>
        )}
      </div>
		</section>
	);
}
