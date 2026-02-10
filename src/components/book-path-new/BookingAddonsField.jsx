"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { getAddonUnitPrice } from "@/lib/addonPricing";

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
	vehicle = null, // <-- NEW (selected vehicle object)
}) {
	const isAr = lang === "ar";

	const handleToggle = (id) => {
		if (selected.includes(id)) {
			onChange(selected.filter((item) => item !== id));
		} else {
			onChange([...selected, id]);
		}
	};

	const vehicleId = vehicle?.id;

	return (
		<div className="flex flex-col gap-2 mt-4">
			<p className="text-[#364153] font-semibold mb-2">
				{isAr ? "إضافات اختيارية" : "Optional Add-ons"}
			</p>

			{addons.map((addon) => {
				const isByCar = !!addon?.is_price_by_car;
				const canShowPrice = !isByCar || !!vehicleId;

				const unitPrice = getAddonUnitPrice(addon, vehicleId);

				return (
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
							{addon.info && (
								<p className="text-[#6a7282] text-sm">{addon.info}</p>
							)}
						</div>

						<div className="flex flex-col items-center min-w-[40px]">
							{canShowPrice ? (
								<span className="text-[#3c6652] font-bold text-base ltr">
									+{isSaudi ? unitPrice : toDollar(unitPrice)}
								</span>
							) : (
								// Don't show price until vehicle selected
								<span className="text-[#9aa3b2] font-bold text-base ltr">
									—
								</span>
							)}
						</div>
					</label>
				);
			})}
		</div>
	);
}
