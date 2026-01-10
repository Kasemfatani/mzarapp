export function pushDataLayer(obj) {
	if (typeof window === "undefined") return;
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push(obj);
}

/**
 * Track a GA4 view_item ecommerce event.
 * Required: id, name, start_price (number). Other fields optional.
 */
export function trackViewItem({
	id,
	type,
	city,
	name,
	rating,
	start_price,
	currency = "SAR",
}) {
	const price = Number(start_price) || 0;
	const item = {
		item_id: String(id),
		item_name: name || "",
		// use GA4 recommended name for category and ensure it's a string
		item_category:
			type !== undefined && type !== null ? String(type) : undefined,
		// include both a GA4-recognized field and a custom field for location
		// location_id: city || undefined,
		//	item_location: city || undefined, // custom; configure GA4 if you want to report on it
		price,
		//	rating: rating ?? undefined, // custom property on item
	};

	// Reset ecommerce then push event (per your guide)
	pushDataLayer({ ecommerce: null });
	pushDataLayer({
		event: "view_item",
		ecommerce: {
			currency,
			value: price,
			items: [item],
		},
	});
}

// add: track add_to_cart event
// change this event to begin_checkout
export function trackAddToCart({
	busData,
	finalTotal,
	promoCode,
	quantity = 1,
	currency = "SAR",
}) {
	if (typeof window === "undefined") return;
	const price = Number(finalTotal) || 0;
	const item = {
		item_id: String(busData?.id ?? ""),
		item_name: busData?.name ?? "",
		price,
		quantity,
		// include coupon if provided
		coupon: promoCode || undefined,
	};

	pushDataLayer({ ecommerce: null });
	pushDataLayer({
		event: "begin_checkout",
		ecommerce: {
			currency,
			value: price,
			items: [item],
		},
	});
}

// Add purchase tracking
export function trackPurchase({
	transaction_id,
	value = 0,
	tax = 0,
	currency = "SAR",
	coupon,
	items = [], // array of { item_id, item_name, price, quantity, coupon? }
}) {
	if (typeof window === "undefined") return;
	pushDataLayer({ ecommerce: null });
	pushDataLayer({
		event: "purchase",
		ecommerce: {
			transaction_id: transaction_id || undefined,
			value: Number(value) || 0,
			tax: Number(tax) || 0,
			currency,
			coupon: coupon || undefined,
			items,
		},
	});
}
