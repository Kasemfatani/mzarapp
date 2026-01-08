"use client";

import { Checkbox } from "@/components/ui/checkbox";


const SAR_RATE = 3.75;

function toDollar(amount) {
	return (amount / SAR_RATE).toFixed(2);
}


export function BookingAddonsField({
	addons = [],
	selected = [],
	onChange,
	lang = "ar",
	isSaudi = true,
}) {
	const isAr = lang === "ar";

	const handleToggle = (id) => {
		if (selected.includes(id)) {
			onChange(selected.filter((item) => item !== id));
		} else {
			onChange([...selected, id]);
		}
	};

	return (
		<div className="flex flex-col gap-2 mt-4">
			<p className="text-[#364153] font-semibold mb-2">
				{isAr ? "إضافات اختيارية" : "Optional Add-ons"}
			</p>
			{addons.map((addon) => (
				<label
					key={addon.id}
					className="flex items-start gap-3 py-3 border-b last:border-b-0 cursor-pointer"
				>
					<Checkbox
						checked={selected.includes(addon.id)}
						onCheckedChange={() => handleToggle(addon.id)}
						className="mt-1"
					/>
					<div className="flex-1">
						<p className="text-[#364153] font-medium">{addon.name}</p>
						<p className="text-[#6a7282] text-sm">{addon.info}</p>
					</div>
					
          <div className="flex flex-col items-center min-w-[40px]">
						<span className="text-[#3c6652] font-bold text-base ltr">
							+{ isSaudi ? addon.price : toDollar(addon.price)}
						</span>
					</div>
				</label>
			))}
		</div>
	);
}
