import Image from "next/image";
import DownloadButtons from "./DownloadButtons";

export default function HiraSection({ lang = "ar" }) {
	const isAr = lang === "ar";

	return (
		<section
			className="w-full relative"
			style={{
				backgroundImage: "url(/hotel/hira-bg.webp)",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Overlay */}
{/* 
			<div
				className="absolute inset-0 bg-black/60 z-0 pointer-events-none"
				aria-hidden="true"
			/>
       */}
			<div className="container md:m-auto md:px-4 py-4 md:py-14 relative z-10">
				<div className="flex flex-row items-end justify-between gap-2 ">

          {/* Texts + buttons side */}
					<div className=" flex flex-col items-start gap-3 sm:gap-4">
						<h3 className="font-bold leading-snug text-white text-[13px] xs:text-[20px] sm:text-[28px] md:text-[36px] lg:text-[44px] drop-shadow">
							{isAr
								? "استكشف غار حراء بكل أريحية مع خدمة الصعود بالسيارة إلى قمة جبل النور"
								: "Explore Hira Cave with ease using the car service to the top of Jabal Al-Noor"}
						</h3>
						<DownloadButtons language={lang} />
					</div>

					{/* Image side  */}
					<div className="-mb-4 md:-mb-14">
						<Image
							src="/hotel/hira_iPhone.png"
							alt={isAr ? "تطبيق مزار - غار حراء" : "Mzar App - Hira Cave"}
							width={360}
							height={720}
							priority
							className="h-auto w-[130px] xs:w-[150px] sm:w-[220px] md:w-[260px] lg:w-[300px] object-contain"
						/>
					</div>
					
				</div>
			</div>
		</section>
	);
}
