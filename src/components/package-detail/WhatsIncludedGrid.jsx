import {
	UtensilsCrossed,
	Wifi,
	MapPin,
	ShieldCheck,
	Ticket,
	PlusCircle,
} from "lucide-react";

const iconMap = {
	restaurant: UtensilsCrossed,
	wifi: Wifi,
	mapPin: MapPin,
	shield: ShieldCheck,
	ticket: Ticket,
	plusCircle: PlusCircle,
};

export default function WhatsIncludedGrid({ isAr, data }) {
	const { t, features } = data;

	return (
		<section>
			<h2 className="mb-8 text-2xl font-semibold text-[#1b4332]">
				{t.featuresTitle}
			</h2>

			<div className="grid grid-cols-2 gap-6 md:grid-cols-3">
				{features.map((item) => {
					const Icon = iconMap[item.icon] || PlusCircle;

					return (
						<div
							key={item.id}
							className="space-y-3 rounded-xl border border-[#1B4332]/5 bg-white p-6 text-center shadow-2xl"
						>
							<Icon
								className="mx-auto h-7 w-7 text-[#775a19]"
								strokeWidth={2}
							/>
							<p className="text-sm font-bold text-[#1b4332]">{item.label}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
