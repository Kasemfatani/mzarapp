export function getAddonUnitPrice(addon, transportationTypeId) {
	if (!addon) return 0;

	// Price depends on selected vehicle
	if (addon?.is_price_by_car) {
		if (!transportationTypeId) return 0;

		const list = Array.isArray(addon.prices_by_car) ? addon.prices_by_car : [];
		const match = list.find(
			(p) => String(p.transportation_type_id) === String(transportationTypeId),
		);

		return Number(match?.price ?? 0);
	}

	// Normal fixed price
	return Number(addon?.price ?? 0);
}
