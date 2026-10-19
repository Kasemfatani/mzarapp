export function formatPrivateTourMoney(value, lang) {
	const amount = Number(value || 0);
	if (lang === "ar") {
		const formatted = new Intl.NumberFormat("ar-SA", { maximumFractionDigits: 2 }).format(amount);
		return `${formatted} ريال`;
	}
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount / 3.75);
}

export function getPrivateTourFaqItems({ lang, minGuests, maxGuests, price }) {
	const isArabic = lang === "ar";
	const money = (value) => formatPrivateTourMoney(value, lang);

	return [
		[
			isArabic ? "هل الجولة خاصة بمجموعتي؟" : "Is the tour private?",
			isArabic
				? `نعم، المركبة مخصصة لمجموعتك. عدد المشاركين من ${minGuests} إلى ${maxGuests} أشخاص.`
				: `Yes. The vehicle is reserved for your group of ${minGuests}–${maxGuests} guests.`,
		],
		[
			isArabic ? "ماذا يشمل السعر؟" : "What does the price include?",
			isArabic
				? `يشمل سعر ${money(price)} للفرد الضريبة وتذكرة معرض الوحي لكل مشارك.`
				: `${money(price)} per guest, including VAT and a Revelation Exhibition ticket for each guest. Payment is processed in SAR.`,
		],
		[
			isArabic ? "كيف أدفع؟ وهل توجد رسوم إضافية؟" : "How can I pay? Are there extra fees?",
			isArabic
				? "الدفع الإلكتروني دون رسوم إضافية. الدفع النقدي يضيف ٥ ريالات مرة واحدة على الحجز."
				: "Online payment has no extra fee. Cash adds SAR 5 once per booking.",
		],
		[
			isArabic ? "كيف أستخدم الإرشاد الصوتي؟" : "How do I access the audio guidance?",
			isArabic
				? "استخدم تطبيق مزار للإرشاد الصوتي والنصي بست لغات."
				: "Use the Mzar app for smart audio and text guidance in six languages.",
		],
		[
			isArabic ? "من أين تبدأ الجولة؟" : "Where does the tour start?",
			isArabic
				? "الاستقبال والعودة من مقر إقامتكم المتفق عليه في مكة. مدة الجولة أربع ساعات."
				: "Pickup and return are at your agreed accommodation in Makkah. The tour lasts four hours.",
		],
	];
}
