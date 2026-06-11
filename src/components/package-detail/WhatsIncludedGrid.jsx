import {
	PlusCircle,
} from "lucide-react";

// const iconMap = {
// 	restaurant: UtensilsCrossed,
// 	wifi: Wifi,
// 	mapPin: MapPin,
// 	shield: ShieldCheck,
// 	ticket: Ticket,
// 	plusCircle: PlusCircle,
// };

import Image from "next/image";

export default function WhatsIncludedGrid({ isAr, data , mockData }) {
	const { t } = mockData;
	const features = data.features || [];

	return (
		<section>
			<h2 className="mb-8 text-2xl font-semibold text-[#1b4332]">
				{t.featuresTitle}
			</h2>

			<div className="grid grid-cols-2 gap-6 md:grid-cols-3">
				{features.map((item , index) => {
					

					return (
						<div
							key={index}
							className="space-y-3 rounded-xl border border-[#1B4332]/5 bg-white p-6 text-center shadow-2xl"
						>
							<Image
								src={item.image}
								alt={item.title}
								width={28}
								height={28}
								className="mx-auto h-7 w-7 text-[#775a19]"
								strokeWidth={2}
							/>
							<p className="text-sm font-bold text-[#1b4332]">{item.title}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
