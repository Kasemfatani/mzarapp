import React from "react";

export default function SchemaTourBus({ lang = "en" }) {
	const isAr = lang === "ar";

	// Shared content pulled from page data
	const name = isAr
		? "حافلة الجولات الإثرائية في مكة المكرمة"
		: "Enriching Bus Tours in Makkah";
	const description = isAr
		? "انضم إلى حافلة مزار الإثرائية في رحلة عبر معالم مكة التاريخية. استمع إلى القصص بلغتك وشاهدها تنبض بالحياة من خلال الواقع المعزز ودليلنا الصوتي الذكي."
		: "Join the Mzar Enrichment Bus for a historical journey through Makkah’s historic landmarks. Hear the stories in your language and watch them come alive through AR and our smart audio guide.";

	const images = [
		"https://mzarapp.com/tour-bus/hero-bg.webp",
		"https://mzarapp.com/tour-bus/bus-tour.webp",
		"https://mzarapp.com/tour-bus/map-en.webp",
		"https://mzarapp.com/tour-bus/map-ar.webp",
	];

	const price = "69";
	const currency = "SAR";
	const bookingUrl = "https://mzarapp.com/book-tour";

	// Stops (TouristAttraction)
	const attractions = [
		{ id: "tuwa", ar: "بئر طوى", en: "Tuwa Well" },
		{ id: "jinn", ar: "مسجد الجن", en: "Al-Jinn Mosque" },
		{ id: "palaces", ar: "القصور الملكية", en: "Royal Palaces" },
		{ id: "bayah", ar: "مسجد البيعة", en: "Bay’ah Mosque" },
		{ id: "rahmah", ar: "جبل الرحمة", en: "Jabal Al-Rahmah" },
		{ id: "hira", ar: "حي حراء الثقافي", en: "Hira Cultural District" },
	];

	// FAQ from your FAQ.jsx
	const faqItems = [
		{
			q: isAr ? "كيف يمكنني الحجز؟ " : "How can I make a booking?",
			a: isAr
				? "يمكنك الحجز مباشرة عبر تطبيق “مزار” أو من خلال نقاط البيع المعتمدة في الفنادق والمراكز السياحية بمكة."
				: "You can book directly through the “Mzar” app or through authorized sales points in hotels and tourist centers in Makkah.",
		},
		{
			q: isAr
				? "هل الجولات مخصصة للعوائل فقط؟"
				: "Are the tours for families only?",
			a: isAr
				? "لا، الجولات متاحة للأفراد والعوائل والمجموعات."
				: "No, the tours are available for individuals, families, and groups.",
		},
		{
			q: isAr
				? "بأي لغات يتوفر المرشد الصوتي؟"
				: "In which languages is the audio guide available?",
			a: isAr
				? "يتوفر بـ 6 لغات: العربية، الإنجليزية، الفرنسية، التركية، الأردية، الملايوية. "
				: "It is available in 6 languages: Arabic, English, French, Turkish, Urdu, and Malay.",
		},
		{
			q: isAr
				? "هل الجولة تشمل النقل من الفندق؟ "
				: "Does the tour include transportation from the hotel?",
			a: isAr
				? "نعم، تتوفر نقاط تجمع قريبة من معظم فنادق المنطقة المركزية ويمكن تنسيق النقل عند الحجز. "
				: "Yes, there are pickup points near most hotels in the central area, and transportation can be arranged when booking.",
		},
		{
			q: isAr
				? "هل التجربة مناسبة للأطفال وكبار السن؟ "
				: "Is the experience suitable for children and the elderly?",
			a: isAr
				? "نعم، تم تصميم الباصات لتناسب جميع الفئات العمرية مع خدمات مريحة وآمنة. "
				: "Yes, the buses are designed to accommodate all age groups with comfortable and safe services.",
		},
	];

	// Lightweight sample reviews (from Testimonials.jsx)
	const reviewsSample = [
		{
			author: "latif",
			rating: 5,
			body: "A truly remarkable experience! The audio guide made it extremely interesting. Comfortable bus. Highly recommend.",
		},
		{
			author: "Mr. Mohamed Lachhab",
			rating: 4,
			body: "Well-planned; augmented reality offered a fresh perspective on ancient locations.",
		},
		{
			author: "Dr. Munazaah Ebad",
			rating: 5,
			body: "Amazing sacred sites with AR to visualize their history. Verified content made everything feel authentic.",
		},
	];

	const aggregateRating = {
		"@type": "AggregateRating",
		ratingValue: "4.7",
		reviewCount: "200",
	};

	// Product schema (backed by Offer)
	const product = {
		"@context": "https://schema.org",
		"@type": "Product",
		name,
		description,
		image: images,
		brand: {
			"@type": "Organization",
			name: "MZAR",
			url: "https://mzarapp.com",
			logo: "https://mzarapp.com/Home/header-logo.png",
		},
		offers: {
			"@type": "Offer",
			price: price,
			priceCurrency: currency,
			availability: "https://schema.org/InStock",
			url: bookingUrl,
			validFrom: new Date().toISOString(),
		},
		aggregateRating,
		review: reviewsSample.map((r) => ({
			"@type": "Review",
			author: { "@type": "Person", name: r.author },
			reviewRating: { "@type": "Rating", ratingValue: r.rating },
			reviewBody: r.body,
		})),
	};

	// Event schema (daily tours)
	// Note: use example dates; ideally generate next available dates dynamically
	const events = [
		{
			"@context": "https://schema.org",
			"@type": "Event",
			name: isAr ? `${name} - جولة صباحية` : `${name} - Morning Tour`,
			description,
			image: images,
			startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
			eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
			eventStatus: "https://schema.org/EventScheduled",
			location: {
				"@type": "Place",
				name: isAr ? "مكة المكرمة" : "Makkah",
				address: {
					"@type": "PostalAddress",
					addressCountry: "SA",
					addressRegion: "Makkah",
				},
			},
			organizer: {
				"@type": "Organization",
				name: "MZAR",
				url: "https://mzarapp.com",
			},
			offers: product.offers,
		},
		{
			"@context": "https://schema.org",
			"@type": "Event",
			name: isAr ? `${name} - جولة مسائية` : `${name} - Evening Tour`,
			description,
			image: images,
			startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
			eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
			eventStatus: "https://schema.org/EventScheduled",
			location: {
				"@type": "Place",
				name: isAr ? "مكة المكرمة" : "Makkah",
				address: {
					"@type": "PostalAddress",
					addressCountry: "SA",
					addressRegion: "Makkah",
				},
			},
			organizer: {
				"@type": "Organization",
				name: "MZAR",
				url: "https://mzarapp.com",
			},
			offers: product.offers,
		},
	];

	// LocalBusiness (Tour operator in Makkah)
	const localBusiness = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: "MZAR",
		url: "https://mzarapp.com",
		image: images[1],
		address: {
			"@type": "PostalAddress",
			addressCountry: "SA",
			addressRegion: "Makkah",
		},
		areaServed: {
			"@type": "AdministrativeArea",
			name: isAr ? "مكة المكرمة" : "Makkah",
		},
		makesOffer: product.offers,
		aggregateRating,
	};

	// TouristAttraction (each stop)
	const touristAttractions = attractions.map((a) => ({
		"@context": "https://schema.org",
		"@type": "TouristAttraction",
		name: isAr ? a.ar : a.en,
		address: {
			"@type": "PostalAddress",
			addressCountry: "SA",
			addressRegion: "Makkah",
		},
		// Optional: link to a detail page if you have one
	}));

	// FAQPage
	const faqPage = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqItems.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	};

	// Render multiple JSON-LD blocks (valid and easy to inspect)
	const blocks = [
		product,
		...events,
		localBusiness,
		...touristAttractions,
		faqPage,
	];

	return blocks.map((data, i) => (
		<script
			key={`schema-${i}`}
			id={i === 0 ? "schema-tour-bus-product" : undefined}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	));
}
