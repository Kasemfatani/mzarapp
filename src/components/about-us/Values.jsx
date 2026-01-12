import {
	Shield,
	Lock,
	Heart,
	Award,
	Smile,
	Sparkles,
	History,
	Lightbulb,
	Coffee,
	Target,
	BadgeCheck, // add for Authenticity
	Star, // add for Excellence
} from "lucide-react";

export default function Values({ lang }) {
	const isAr = lang === "ar";

	const values = [
		{
			icon: Sparkles,
			label: isAr ? "الإثراء" : "Enrichment",
			description: isAr
				? "نُضيف معنى ومعرفة لكل زيارة."
				: "Adding meaning and knowledge to every visit.",
		},
		{
			icon: BadgeCheck, // changed from History to BadgeCheck
			label: isAr ? "الأصالة" : "Authenticity",
			description: isAr
				? "نُبرز تاريخ المكان وهويته الحقيقية."
				: "Highlighting the true history and identity of each place.",
		},
		{
			icon: Lightbulb,
			label: isAr ? "الابتكار" : "Innovation",
			description: isAr
				? "ندمج التقنية لتجربة تفاعلية حديثة."
				: "Integrating technology for a modern interactive experience.",
		},
		{
			icon: Coffee,
			label: isAr ? "الضيافة" : "Hospitality",
			description: isAr
				? "نُقدم تجربة تعكس كرم المجتمع السعودي."
				: "Delivering an experience that reflects Saudi generosity.",
		},
		{
			icon: Star, // changed from Target to Star
			label: isAr ? "التميز" : "Excellence",
			description: isAr
				? "نلتزم بالجودة في كل تفاصيل التجربة."
				: "Commitment to quality in every detail.",
		},
	];

	return (
		<section className="bg-white py-20 md:py-28">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				{/* Title */}
				<h2 className="mb-16 text-center text-4xl text-[#0d5940] md:text-5xl">
					{isAr ? "قيمنا" : "Our Values"}
				</h2>

				{/* Values List */}
				<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					{values.map((value, index) => {
						const Icon = value.icon;
						return (
							<div
								key={index}
								className="flex flex-col items-center rounded-3xl border-2 border-[#e2e8f0] bg-white p-8 transition-all duration-300 hover:border-[#c9a961]"
							>
								<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f2ed]">
									<Icon className="h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
								</div>
								<p className="text-center text-xl text-[#0d5940]">
									{value.label}
								</p>
								<p className="mt-2 text-center text-lg leading-relaxed text-[#718096]">
									{value.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
