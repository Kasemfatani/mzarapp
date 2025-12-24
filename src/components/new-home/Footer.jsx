import {
	Mail,
	Phone,
	Whatsapp,
	MapPin,
	Shield,
	Headphones,
	Facebook,
	Instagram,
	Twitter,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";


// TikTok Icon
const TikTokIcon = () => (
	<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
		<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
	</svg>
);

export default function Footer() {

  const [language, setLanguage] = useState("en"); // Default language is 'en'

  useEffect(() => {
		if (typeof window !== "undefined") {
			
			setLanguage(localStorage.getItem("lang"));
		}
	}, [language]);

  const isAr = language === "ar";

	return (
		<footer
			className={`bg-gradient-to-b from-[#F5F5F5] to-[#E7D3AF]/20 ${language === "en" ? "ltr" : "rtl"}`}
		>
			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 justify-center">
					{/* Column 1 - Logo & Description */}
					<div className="lg:col-span-1 mx-auto text-center md:text-start">
						{/* Logo */}
						<div className="flex justify-center md:justify-start items-center gap-3 mb-4">
							<Link href="/">
								<img
									src="/Home/header-logo.png"
									alt="logo"
									width={138}
									height={46}
								/>
							</Link>
						</div>

						{/* Description */}
						<p
							className="text-gray-600 text-sm leading-relaxed mb-6"
							style={{
								fontFamily: '"Readex Pro", sans-serif',
								lineHeight: "1.7",
							}}
						>
              {isAr ? 'منصة مزار توفر لك أفضل التجارب والرحلات داخل مكة والمدينة مع حجز فوري وتجربة موثوقة.' : 'The Mzar platform offers you the finest experiences and journeys in Makkah and Madinah, with instant booking and a trusted experience.'}
						</p>

						{/* Trust Badges */}
						<div className="space-y-3">
							<div className="flex justify-center md:justify-start items-center gap-2 text-[#3C6652]">
								<Shield size={18} className="text-[#867957]" />
								<span
									className="text-xs"
									style={{
										fontFamily: '"Readex Pro", sans-serif',
										fontWeight: 500,
									}}
								>
									{isAr ? 'حجز آمن وموثوق' : 'Secure and Trusted Booking'}
								</span>
							</div>
							<div className="flex justify-center md:justify-start items-center gap-2 text-[#3C6652]">
								<Headphones size={18} className="text-[#867957]" />
								<span
									className="text-xs"
									style={{
										fontFamily: '"Readex Pro", sans-serif',
										fontWeight: 500,
									}}
								>
									{isAr ? 'دعم على مدار الساعة' : '24/7 Support'}
								</span>
							</div>
						</div>
					</div>

					{/* Column 2 - Quick Links */}
					<div className="mx-auto  text-center">
						<h3
							className="text-[#3C6652] mb-5 font-semibold"
							
						>
							{isAr ? 'روابط سريعة' : 'Quick Links'}
						</h3>
						<ul
							className="space-y-3"
							
						>
							<li>
								<a
									href="/"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'الرئيسية' : 'Home'}
								</a>
							</li>
							<li>
								<a
									href="/all-trips"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'التجارب' : 'Experiences'}
								</a>
							</li>
							{/* <li>
								<a
									href="#offers"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'العروض' : 'Offers'}
								</a>
							</li>
							<li>
								<a
									href="#about"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'من نحن' : 'About Us'}
								</a>
							</li>
							<li>
								<a
									href="#gallery"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'المعرض' : 'Gallery'}
								</a>
							</li>
							<li>
								<a
									href="#articles"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'المقالات' : 'Articles'}
								</a>
							</li> */}
						</ul>
					</div>

					{/* Column 3 - Categories */}
					{/* <div>
						<h3
							className="text-[#3C6652] mb-5 font-semibold"
							
						>
							{isAr ? 'أنواع الجولات' : 'Tour Types'}
						</h3>
						<ul
							className="space-y-3"
							
						>
							<li>
								<a
									href="#haramain"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'جولات الحرمين' : 'Haramain Tours'}
								</a>
							</li>
							<li>
								<a
									href="#cultural"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'جولات ثقافية' : 'Cultural Tours'}
								</a>
							</li>
							<li>
								<a
									href="#oneday"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'رحلات اليوم الواحد' : 'One Day Trips'}
								</a>
							</li>
							<li>
								<a
									href="#family"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'رحلات العائلات' : 'Family Trips'}
								</a>
							</li>
							<li>
								<a
									href="#private"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'جولات خاصة' : 'Private Tours'}
								</a>
							</li>
						</ul>
					</div> */}

					{/* Column 4 - Customer Support */}
					{/* <div className="mx-auto  text-center">
						<h3
							className="text-[#3C6652] mb-5 font-semibold"
							
						>
							{isAr ? 'خدمة العملاء' : 'Customer Support'}
						</h3>
						<ul
							className="space-y-3"
							
						>
							<li>
								<a
									href="#faq"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
								 	{isAr ? 'الأسئلة الشائعة' : 'FAQ'}
								</a>
							</li>
							<li>
								<a
									href="#cancellation"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'سياسة الإلغاء' : 'Cancellation Policy'}
								</a>
							</li>
							<li>
								<a
									href="#privacy"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
									{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
								</a>
							</li>
							<li>
								<a
									href="#terms"
									className="text-gray-600 hover:text-[#867957] transition-colors text-sm block"
								>
								 	{isAr ? 'شروط الاستخدام' : 'Terms of Use'}
								</a>
							</li>
							
						</ul>
					</div> */}

					{/* Column 5 - Contact Information */}
					<div className="mx-auto  text-center">
						<h3
							className="text-[#3C6652] mb-5 font-semibold"
							
						>
						 	{isAr ? 'تواصل معنا' : 'Contact Us'}
						</h3>
						<div
							className="space-y-4"
							
						>
							{/* Email */}
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-envelope text-[#867957]"></i>
								<a
									href="mailto:contact@mzarapp.com"
									className="ltr:ml-2 rtl:mr-2 text-gray-600 hover:text-[#867957]"
								>
									contact@mzarapp.com
								</a>
							</div>

							{/* Phone */}
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-phone text-[#867957]"></i>
								<a
									href="tel:920005785"
									className="ltr:ml-2 rtl:mr-2 text-gray-600 hover:text-[#867957]"
									dir="ltr"
								>
									920005785
								</a>
							</div>
							<div className="flex items-center gap-2">
								<i className="fa-brands fa-whatsapp text-[#867957]"></i>
								<a
									href="https://wa.me/+966580121025"
									target="_blank"
									rel="noopener noreferrer"
									className="ltr:ml-2 rtl:mr-2 text-gray-600 hover:text-[#867957] ltr"
								>
									+966580121025
								</a>
							</div>

							

							{/* Location */}
							<div className="flex items-start gap-3">
								<MapPin
									size={18}
									className="text-[#867957] flex-shrink-0 mt-0.5"
								/>
								<span className="text-gray-600 text-sm">
									{isAr ? 'المملكة العربية السعودية ــ جدة ' : 'Saudi Arabia ــ Jeddah'}
								</span>
							</div>

							{/* Social Media */}
							<div className="pt-4">
								<p
									className="text-xs text-gray-500 mb-3"
									
								>
								 	{isAr ? 'تابعنا على' : 'Follow us on'}
								</p>
								<div className="flex items-center gap-3">
									<a
										href="https://www.facebook.com/mzarapp" target="_blank" rel="noopener noreferrer"
										className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-[#867957] hover:border-[#867957] transition-all flex items-center justify-center group shadow-md"
										aria-label="Facebook"
									>
										<Facebook
											size={16}
											className="text-gray-600 group-hover:text-white transition-colors"
										/>
									</a>
									<a
										href="https://www.instagram.com/mzarapp/" target="_blank" rel="noopener noreferrer"
										className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-[#867957] hover:border-[#867957] transition-all flex items-center justify-center group shadow-md"
										aria-label="Instagram"
									>
										<Instagram
											size={16}
											className="text-gray-600 group-hover:text-white transition-colors"
										/>
									</a>
									<a
										href="https://x.com/mzarapp" target="_blank" rel="noopener noreferrer"
										className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-[#867957] hover:border-[#867957] transition-all flex items-center justify-center group shadow-md"
										aria-label="Twitter"
									>
										<Twitter
											size={16}
											className="text-gray-600 group-hover:text-white transition-colors"
										/>
									</a>
									<a
										href="https://www.tiktok.com/@mzarapp" target="_blank" rel="noopener noreferrer"
										className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-[#867957] hover:border-[#867957] transition-all flex items-center justify-center group shadow-md"
										aria-label="TikTok"
									>
										<div className="text-gray-600 group-hover:text-white transition-colors">
											<TikTokIcon />
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div
						className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
						
					>
						{/* Copyright */}
						<div className="text-gray-600 text-center md:text-right order-2 md:order-1">
							© {language === "en"
								? "Licensed by the Ministry of Tourism, license number 73104705 | Licensed Activity: Tour Organization"
								: "مرخصة من وزارة السياحة رقم الترخيص 73104705 | تنظيم الرحلات السياحية"}
						</div>

						{/* Powered by */}
						<div className="text-gray-500 text-xs text-center md:text-left order-1 md:order-2">
							{language === "en" ? (
							<>CR: 4031282010</>
						) : (
							<>السجل التجاري : 4031282010</>
						)}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
