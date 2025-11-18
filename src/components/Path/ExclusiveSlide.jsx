import React from "react";
import Image from "next/image";

export default function ExclusiveSlide({ language = "en" }) {
	return (
		<div className="pt-16 ">
			<div className="flex flex-col items-center justify-center  bg-[#F8F6F1] border-2 border-[#EAD7A1] rounded-[20px] shadow-2xl px-6 py-4 text-center">
				<div className="flex justify-center mb-3">
					<Image
						src="/path/exclusive-logo.png"
						alt="Exclusive by MZAR"
						width={60}
						height={60}
						className="mx-auto"
						style={{ objectFit: "contain" }}
					/>
				</div>
				<h3 className="text-xl md:text-2xl font-bold text-[#857856] mb-2">
					{language === "ar" ? "حصري من مزار" : "Exclusive by MZAR"}
				</h3>
				<p className="text-base  text-[#333] font-semibold mb-2">
					{language === "ar"
						? "وصول إلى جبل الرحمة بدخول أولوية، حصريًا لمركبات مزار."
						: "Reach Jabal Al-Rahmah with priority entry, exclusive to Mzar vehicles."}
				</p>
				
			</div>
		</div>
	);
}
