"use client";

import { useState } from "react";
import { Hero } from "@/components/faq/Hero";
import { CategoryTabs } from "@/components/faq/CategoryTabs";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { TrustReinforcement } from "@/components/faq/TrustReinforcement";
import { SupportCTA } from "@/components/faq/SupportCTA";
import { FinalCTA } from "@/components/faq/FinalCTA";

export default function FaqWrapper({ lang }) {
	const isAr = lang === "ar";

	const categories = [
		{ id: "all", label: isAr ? "الكل" : "All" },
		{ id: "mzar", label: isAr ? "عن مزار والتطبيق" : "About Mzar & the App" },
		{
			id: "booking-payment",
			label: isAr ? "الحجز والدفع" : "Booking & Payment",
		},
		{ id: "tours", label: isAr ? "الرحلات والجولات" : "Tours & Trips" },
		{
			id: "guides-services",
			label: isAr ? "المرشدون والخدمة الميدانية" : "Guides & Field Service",
		},
		{
			id: "support",
			label: isAr ? "الدعم والطوارئ" : "Support & Emergencies",
		},
		// {
		// 	id: "cancellation",
		// 	label: isAr ? "الإلغاء والاسترجاع" : "Cancellation & Refund",
		// },
		// {
		// 	id: "meetup-transport",
		// 	label: isAr ? "نقاط التجمع والتنقل" : "Meetup & Transport",
		// },
	];

	const faqs = [
		// MZAR
		{
			id: "1",
			category: "mzar",
			question: isAr ? "ما هو تطبيق مزار؟ " : "What is the Mzar app?",
			answer: isAr
				? "تطبيق مزار هو منصة رقمية متخصصة في الرحلات الإثرائية الدينية والثقافية، تتيح للمستخدم استكشاف المعالم التاريخية والدينية في مكة المكرمة والمدينة المنورة من خلال جولات ميدانية ذكية وتفاعلية. "
				: "Mzar app is a digital platform specializing in enriching religious and cultural trips, allowing users to explore historical and religious landmarks in Mecca and Medina through smart and interactive field tours. ",
		},
		{
			id: "2",
			category: "mzar",
			question: isAr
				? "كيف يمكنني تحميل تطبيق مزار؟ "
				: "How can I download the Mzar app?",
			answer: isAr
				? "يمكنك تحميل التطبيق مباشرة من متجر App Store أو Google Play عبر البحث عن كلمة Mzar وتثبيته على جهازك. "
				: "You can download the app directly from the App Store or Google Play by searching for Mzar and installing it on your device.",
		},
		{
			id: "3",
			category: "mzar",
			question: isAr
				? "كيف أستفيد من التطبيق في تخطيط رحلتي؟"
				: "How can I benefit from the app in planning my trip?",
			answer: isAr
				? "بعد تثبيت التطبيق، يمكنك تصفح الجولات المتاحة واختيار الجولة التي تناسب وقتك واهتماماتك، ثم حجزها والدفع إلكترونياً بسهولة. "
				: "After installing the app, you can browse available tours, choose the one that fits your time and interests, then book and pay electronically with ease.",
		},
		{
			id: "4",
			category: "mzar",
			question: isAr
				? "هل يقدم التطبيق معلومات عن المعالم التي تتم زيارتها؟ "
				: "Does the app provide information about the landmarks visited?",
			answer: isAr
				? "نعم، يقدم مزار محتوى معرفي شامل عن كل وجهة يتم زيارتها، يشمل التاريخ، الأهمية، والموقع الجغرافي."
				: "Yes, Mzar provides comprehensive informational content about each destination visited, including history, significance, and geographical location.",
		},

		{
			id: "5",
			category: "mzar",
			question: isAr
				? "هل يوفر التطبيق وسائل نقل؟ "
				: "Does the app provide transportation?",
			answer: isAr
				? "نعم، يمكنك اختيار وسيلة النقل المناسبة ضمن الجولات المتاحة، سواء كانت حافلات سياحية أو سيارات مريحة خاصة. "
				: "Yes, you can choose the appropriate transportation within the available tours, whether they are tourist buses or comfortable private cars.",
		},
		{
			id: "6",
			category: "mzar",
			question: isAr
				? "هل يقدم التطبيق إرشاداً صوتياً ونصياً؟ "
				: "Does the app provide audio and text guidance?",
			answer: isAr
				? "بكل تأكيد، يوفر مزار جولات بإرشاد صوتي ونصي بـ 6 لغات عالمية لسهولة فهم التجربة لجميع الزوار. "
				: "Certainly, Mzar offers tours with audio and text guidance in 6 global languages for easy understanding of the experience for all visitors.",
		},
		// BOOKING & PAYMENT
		{
			id: "7",
			category: "booking-payment",
			question: isAr
				? "كيف يمكنني حجز رحلة عبر مزار؟ "
				: "How can I book a trip through Mzar?",
			answer: isAr
				? "اختر الرحلة المناسبة من صفحة الجولات، حدّد التاريخ وعدد الأشخاص، ثم أكمل عملية الدفع بأمان عبر البوابة الإلكترونية. ستصلك رسالة تأكيد فورية على بريدك الإلكتروني ورقم جوالك."
				: "Select the suitable trip from the tours page, specify the date and number of people, then complete the payment securely through the electronic gateway. You will receive an instant confirmation message on your email and mobile number.",
		},

		{
			id: "8",
			category: "booking-payment",
			question: isAr ? "هل الحجز فوري؟" : "Is the booking instant?",
			answer: isAr
				? "نعم، يتم تأكيد الحجز تلقائياً بمجرد إتمام عملية الدفع بنجاح. "
				: "Yes, the booking is confirmed automatically once the payment is successfully completed.",
		},
		{
			id: "9",
			category: "booking-payment",
			question: isAr
				? "ما طرق الدفع المتوفرة؟ "
				: "What payment methods are available?",
			answer: isAr
				? "يدعم مزار جميع وسائل الدفع الإلكتروني المعتمدة في المملكة، بما في ذلك STC، بطاقات الائتمان، Apple Pay وغيرها. "
				: "Mzar supports all electronic payment methods approved in the Kingdom, including STC, credit cards, Apple Pay, and others.",
		},
		{
			id: "10",
			category: "booking-payment",
			question: isAr
				? "هل يمكنني الحجز لأكثر من شخص؟ "
				: "Can I book for more than one person?",
			answer: isAr
				? "نعم، يمكنك حجز الجولة لك ولعائلتك أو أصدقائك من خلال نفس العملية، مع تحديد عدد الأشخاص قبل الدفع. "
				: "Yes, you can book the tour for yourself and your family or friends through the same process, specifying the number of people before payment.",
		},

		{
			id: "11",
			category: "booking-payment",
			question: isAr
				? "هل يمكنني تعديل تفاصيل الحجز؟ "
				: "Can I modify my booking details?",
			answer: isAr
				? "يمكنك تعديل الموعد أو عدد المشاركين قبل موعد الرحلة بمدة لا تقل عن ساعتين، عبر التطبيق أو التواصل مع فريق الدعم."
				: "You can modify the date or number of participants at least two hours before the trip via the app or by contacting the support team.",
		},
		{
			id: "12",
			category: "booking-payment",
			question: isAr ? "هل يمكنني إلغاء الحجز؟ " : "Can I cancel my booking?",
			answer: isAr
				? "نعم، يمكنك الإلغاء بسهولة عبر التطبيق قبل ساعتين من موعد الرحلة دون رسوم. "
				: "Yes, you can easily cancel through the app at least two hours before the trip without any fees.",
		},
		{
			id: "13",
			category: "booking-payment",
			question: isAr
				? "متى يتم استرجاع المبلغ؟ "
				: "When is the refund processed?",
			answer: isAr
				? "يتم استرجاع المبلغ خلال 3 إلى 7 أيام عمل حسب البنك أو وسيلة الدفع المستخدمة. "
				: "The refund is processed within 3 to 7 business days depending on the bank or payment method used.",
		},

		{
			id: "14",
			category: "booking-payment",
			question: isAr
				? "ما هي سياسة الإلغاء المتأخر؟ "
				: "What is the late cancellation policy?",
			answer: isAr
				? "إذا تم الإلغاء قبل أقل من ساعتين من موعد الرحلة، يتم خصم 25% من قيمة الحجز، وبعد انطلاق الجولة لا يُسترد المبلغ. "
				: "If cancellation is made less than two hours before the trip, 25% of the booking amount is deducted, and after the tour starts, the amount is non-refundable.",
		},
		// TOURS & TRIPS
		{
			id: "15",
			category: "tours",
			question: isAr
				? "هل الجولات مناسبة للعائلات؟ "
				: "Are the tours suitable for families?",
			answer: isAr
				? "نعم، جميع الجولات مُصمّمة لتناسب العائلات والفئات المختلفة من الزوار، وتشمل محطات آمنة ومريحة. "
				: "Yes, all tours are designed to suit families and different categories of visitors, including safe and comfortable stops. ",
		},
		{
			id: "16",
			category: "tours",
			question: isAr
				? "ما مدة الجولات المتوفرة؟"
				: "What is the duration of the available tours?",
			answer: isAr
				? "تتراوح المدة بين ساعة ونصف إلى أربع ساعات حسب نوع المسار وعدد الوجهات المشمولة في الجولة. "
				: "The duration ranges from one and a half hours to four hours depending on the type of route and the number of destinations included in the tour. ",
		},

		{
			id: "17",
			category: "tours",
			question: isAr
				? "من أين تنطلق الرحلات؟ "
				: "Where do the tours depart from?",
			answer: isAr
				? "تختلف نقطة الانطلاق بحسب نوع الجولة. في معظم الجولات، يصل السائق إليك مباشرة في موقعك أو فندقك المحدد عند الحجز لتبدأ رحلتك براحة تامة. أما بعض الجولات الخاصة مثل باص الجولات الإثرائية، فلها محطات تجمع محددة موضحة في تفاصيل الجولة."
				: "The departure point varies depending on the type of tour. In most tours, the driver picks you up directly at your specified location or hotel at the time of booking to start your trip in complete comfort. However, some special tours like the Enrichment Tour Bus have specific meetup stations outlined in the tour details.",
		},
		{
			id: "18",
			category: "tours",
			question: isAr
				? "هل يشمل الحجز خدمة النقل؟ "
				: "Does the booking include transportation?",
			answer: isAr
				? "نعم، في معظم الجولات، تشمل الخدمة وسائل نقل مريحة وآمنة من وإلى نقطة التجمع."
				: "Yes, in most tours, the service includes comfortable and safe transportation to and from the meeting point.",
		},
		{
			id: "19",
			category: "tours",
			question: isAr
				? "ماذا أفعل إذا تأخرت عن موعد الانطلاق؟ "
				: "What should I do if I am late for the departure time?",
			answer: isAr
				? "نوصي بالوصول قبل الموعد بـ15 دقيقة. في حال التأخير، يرجى التواصل فوراً مع فريق الدعم لمعرفة إمكانية الانضمام أو إعادة الجدولة. "
				: "We recommend arriving 15 minutes before the scheduled time. In case of delay, please contact the support team immediately to check the possibility of joining or rescheduling. ",
		},
		{
			id: "20",
			category: "tours",
			question: isAr
				? "هل يتضمن الحجز برنامج الرحلة؟ "
				: "Does the booking include an itinerary?",
			answer: isAr
				? "نعم، يحتوي كل حجز على برنامج تفصيلي للمحطات والمعالم المدرجة ضمن الجولة. "
				: "Yes, each booking includes a detailed itinerary of the stops and landmarks included in the tour.",
		},
		//Guides & Field Service
		{
			id: "21",
			category: "guides-services",
			question: isAr
				? "هل يوجد مرشدون معتمدون؟"
				: "Are there certified guides?",
			answer: isAr
				? "نعم، جميع المرشدين في مزار مرخصون ومعتمدون من الجهات الرسمية، ويتلقون تدريباً متخصصاً لتقديم تجربة معرفية آمنة وثرية."
				: "Yes, all guides at Mazar are licensed and certified by official authorities, and they receive specialized training to provide a safe and enriching educational experience.",
		},
		{
			id: "22",
			category: "guides-services",
			question: isAr
				? "هل يتحدث المرشدون اللغة الإنجليزية؟"
				: "Do the guides speak English?",
			answer: isAr
				? "نعم، يتحدث المرشدون أكثر من لغة، والتطبيق نفسه يدعم 6 لغات لتسهيل التواصل مع جميع الزوار."
				: "Yes, the guides speak multiple languages, and the app itself supports 6 languages to facilitate communication with all visitors.",
		},
		{
			id: "23",
			category: "guides-services",
			question: isAr
				? "هل يمكنني التواصل مع المرشد قبل الرحلة؟"
				: "Can I contact the guide before the trip?",
			answer: isAr
				? "يمكنك التواصل مع فريق التنظيم من خلال التطبيق، وسيتولى الفريق تنسيق أي استفسار أو طلب مع المرشد مباشرة."
				: "You can contact the organizing team through the app, and the team will coordinate any inquiries or requests directly with the guide.",
		},
		{
			id: "24",
			category: "guides-services",
			question: isAr
				? "ماذا أفعل إذا تأخر المرشد؟"
				: "What should I do if the guide is late?",
			answer: isAr
				? "في حال تأخر المرشد عن الموعد المحدد، سيتم إشعارك فوراً عبر التطبيق أو الرسائل النصية، مع متابعة الدعم الفني للحالة حتى بدء الجولة."
				: "In case the guide is late for the scheduled time, you will be notified immediately via the app or text message, with technical support following up until the tour begins.",
		},
		{
			id: "25",
			category: "guides-services",
			question: isAr
				? "كيف يمكنني التواصل مع السائق من خلال التطبيق؟"
				: "How can I communicate with the driver through the app?",
			answer: isAr
				? "التطبيق يوفر واجهة تواصل (Live Chat) سلسة مع السائق، حيث يمكنك التحدث معه بلغتك المفضلة."
				: "The app provides a seamless Live Chat interface with the driver, where you can speak with them in your preferred language.",
		},
		{
			id: "26",
			category: "support",
			question: isAr
				? "كيف يمكنني التواصل مع فريق الدعم؟"
				: "How can I contact the support team?",
			answer: isAr
				? "يمكنك التواصل معنا على مدار الساعة عبر البريد الإلكتروني: info@mzarapp.com أو عبر الواتساب: 966580121025+"
				: "You can contact us 24/7 via email: info@mzarapp.com or via WhatsApp: +966580121025",
		},
		{
			id: "27",
			category: "support",
			question: isAr
				? "ماذا أفعل في حالة الطوارئ أثناء الرحلة؟"
				: "What should I do in case of an emergency during the trip?",
			answer: isAr
				? "في حال حدوث أي طارئ، تواصل مباشرة مع المرشد أو المنظم في الموقع، أو استخدم خيار “الطوارئ” في التطبيق ليتم توجيه الدعم المناسب فوراً."
				: "In case of any emergency, contact the guide or organizer on-site directly, or use the 'Emergency' option in the app to receive immediate support.",
		},
	];

	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("all");

	return (
		<div className={lang === "en" ? "ltr" : "rtl"}>
			<Hero
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				isAr={isAr}
			/>
			<CategoryTabs
				categories={categories}
				activeCategory={activeCategory}
				onCategoryChange={setActiveCategory}
				isAr={isAr}
			/>
			<FAQAccordion
				faqs={faqs}
				activeCategory={activeCategory}
				searchQuery={searchQuery}
				isAr={isAr}
			/>
			<TrustReinforcement isAr={isAr} />
			<SupportCTA isAr={isAr} />
			<FinalCTA isAr={isAr} />
		</div>
	);
}
