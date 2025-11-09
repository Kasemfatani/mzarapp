import Image from "next/image";

const featuresAr = [
	"الدليل الصوتي: استمع إلى القصص الأصلية من خلال المرشد الصوتي المتوفر بـ6 لغات مختلفة.",
	"التحقق من الوجهة: عند وصولك إلى الموقع، يبدأ المرشد الصوتي تلقائيًا ليؤكد أنك في المكان الصحيح تمامًا.",
	"فلاترنا المميزة: التقط ذكرياتك باستخدام فلاترنا الفريدة التي تتضمن اسم الوجهة وتاريخ الزيارة.",
	"تجربة الواقع المعزز: افتح كاميرتك ووجّهها نحو المعلم لتكتشف قصة كل موقع من خلال تقنية الواقع المعزز.",
];
const featuresEn = [
	"Audio Guide: Listen to authentic stories with our audio guide available in 6 different languages.",
	"Destination Verification: When you arrive, the audio guide starts automatically to confirm you’re in the right place.",
	"Unique Filters: Capture your memories with our special filters showing the destination name and visit date.",
	"AR Experience: Open your camera and point it at the landmark to discover each site's story with AR technology.",
];

export default function WhyMzarSection({ lang = "ar" }) {
	const isAr = lang === "ar";
	return (
		<section className="w-full bg-white py-10 px-2 flex justify-center">
			<div
				className={`flex flex-col md:flex-row  items-center gap-8 max-w-6xl w-full`}
			>
				{/* Image side */}
				<div className="w-full md:w-1/2 flex justify-center">
					<div className="overflow-hidden">
						<Image
							src="/hotel/why-img.webp"
							alt={isAr ? "لماذا مزار" : "Why Mzar"}
							width={600}
							height={400}
							className="object-cover w-full h-auto"
							priority
						/>
					</div>
				</div>
				{/* Text side */}
				<div className="w-full md:w-1/2 flex flex-col items-start md:items-start gap-6">
					<h2 className="text-2xl md:text-3xl font-bold text-[#222] mb-2">
						{isAr ? "لماذا مزار . . . ؟" : "Why Mzar...?"}
					</h2>
					<ul className="flex flex-col gap-4">
						{(isAr ? featuresAr : featuresEn).map((text, i) => (
							<li
								key={i}
								className="flex items-start gap-2 text-base md:text-lg text-[#222]"
							>
								<span className="mt-1 flex-shrink-0">
									{/* Check icon */}
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
										<circle cx="11" cy="11" r="11" fill="#BFAE8A" />
										<path
											d="M7 11.5l3 3 5-6"
											stroke="#fff"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								<span>{text}</span>
							</li>
						))}
					</ul>
					<div className="flex flex-col gap-3 w-full mt-4">
						<div className="bg-[#e5ddcb] text-[#7a6a4d] rounded-lg px-4 py-2 text-sm md:text-base font-semibold w-fit mx-auto text-center">
							{isAr
								? "مزار.. وجهتك الأولى لاكتشاف الحكاية خلف كل معلم."
								: "Mzar... Your first destination to discover the story behind every landmark."}
						</div>
						<a
							href="#"
							className="bg-[#3a6c5a] hover:bg-[#29513f] text-white text-center rounded-xl px-6 py-2 text-base font-bold transition w-full"
						>
							{isAr ? "للمزيد تواصل معنا الآن" : "Contact us now for more"}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
