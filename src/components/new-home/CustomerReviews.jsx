"use client";

import { Star, Quote, CheckCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./CustomerReviews.module.css";

function ReviewCard({ name, rating, tour, review, avatar, verified = true }) {
	return (
		<div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] border border-gray-100 relative flex flex-col h-full">
			{/* Quote Icon */}
			{/* <div className="absolute top-6 right-6 text-[#E7D3AF] opacity-30">
        <Quote size={48} fill="currentColor" />
      </div> */}

			<div className="flex-1">
				{/* Profile Section */}
				<div className="flex items-start gap-4 mb-4 relative z-10">
					{/* Avatar */}
					{/* <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-[#857856] to-[#6d6245] flex items-center justify-center text-white flex-shrink-0 ring-2 ring-[#E7D3AF]/30">
            <img 
              src={avatar} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div> */}

					{/* Name and Verified Badge */}
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<h4
								className="text-[#3C6652]"
								style={{
									fontSize: "1.125rem",
									fontWeight: 600,
								}}
							>
								{name}
							</h4>
							{/* {verified && (
                <div className="flex items-center gap-1 bg-[#3C6652]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle size={14} className="text-[#3C6652]" />
                  <span className="text-xs text-[#3C6652]" style={{ fontFamily: '"Readex Pro", sans-serif', fontWeight: 500 }}>موثّق</span>
                </div>
              )} */}
						</div>

						{/* Star Rating */}
						<div className="flex items-center gap-1">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={16}
									className={
										i < rating
											? "fill-[#857856] text-[#857856]"
											: "text-gray-300"
									}
								/>
							))}
						</div>
					</div>
				</div>

				{/* Review Text */}
				<p className="text-gray-700 leading-relaxed mb-4 text-sm relative z-10 ">
					"{review}"
				</p>
			</div>

			{/* Tour Name (stays at bottom) */}
			<div className="pt-4 border-t border-gray-100 relative z-10 mt-4">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 bg-[#857856] rounded-full"></div>
					<span
						className="text-sm text-gray-600"
						style={{ fontFamily: '"Readex Pro", sans-serif' }}
					>
						{tour}
					</span>
				</div>
			</div>
		</div>
	);
}

export default function CustomerReviews({ lang }) {
	const isAr = lang === "ar";
	const reviews = isAr
		? [
				{
					name: "على",
					rating: 5,
					tour: "تجربة المسجد الحرام  ",
					review:
						"جولة المسجد الحرام كانت تجربة إثرائية بكل تفاصيلها! المرشد المرافق كان رائع، والصور التاريخية خلتنا نعيش الماضي لحظة بلحظة، وأجمل شيء كانت شهادة الزيارة في النهاية.",
					avatar:
						"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
				},
				{
					name: "عبد العزيز",
					rating: 5,
					tour: "تجربة المدينة المنورة",
					review:
						"تجربة إثرائية حديثة بروح الماضي!استمتعنا بشرح واضح من المرشد المرافق ، والأسئلة التفاعلية خلت الرحلة تعليمية ومسلية في نفس الوقت ، لن تكون الرحلة الأخيرة مع مزار",
					avatar:
						"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
				},
				{
					name: "محمود حمزة",
					rating: 4,
					tour: "تجربة المدينة المنورة",
					review:
						"رحلة جميلة ومناسبة للعائلات. كان في شوية زحمة بس استمتعنا جداً.",
					avatar:
						"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
				},
				{
					name: "سفيان",
					rating: 5,
					tour: "تجربة المسجد الحرام  ",
					review:
						"جمعت بين المتعة والمعرفة، المرشد المرافق شرح القصص بأسلوب جميل، واللغة كانت واضحة ومفهومة، أما الصور التاريخية فقدمت لنا مشاهد ما كنا نعرفها من قبل، وختمنا بشهادة نفتخر فيها.",
					avatar:
						"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
				},
		  ]
		: [
				{
					name: "Drame Samba",
					rating: 5,
					tour: "Masjid al-Haram Experience",
					review:
						"Every stop was immersive thanks to the tour guide ; Selecting my language was easy with the app’s instant translation feature, the historical images beautifully told the stories, and the interactive questions kept me interested the entire time.",
					avatar:
						"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
				},
				{
					name: "Omar Khalid",
					rating: 5,
					tour: "Masjid al-Haram Experience",
					review:
						"What a cleverly planned Masjid Haram tour! The rare historical images were fascinating and the quiz questions made it both educational and enjoyable. It felt official because of the certificate.",
					avatar:
						"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
				},
				{
					name: "Arif Mirza",
					rating: 4,
					tour: "Masjid An-Nabawi Experience",
					review:
						"My Masjid an-Nabawi tour was made much more meaningful by the  Accompanied Tour Guide’s stories. The interactive questions kept us interested, the historical images brought the past to life, and receiving the visit certificate at the conclusion made me feel like I had accomplished something truly unique.",
					avatar:
						"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
				},
				{
					name: "Abdullah Alrashed",
					rating: 5,
					tour: "Masjid An-Nabawi Experience",
					review:
						"the tour guide made every stop an exploration of Masjid an-Nabawi. The final certificate was a beautiful way to wrap things up.",
					avatar:
						"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
				},
		  ];

	return (
		<section className="py-24 bg-gradient-to-b from-[#E7D3AF]/5 to-white relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-[#857856] rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3C6652] rounded-full blur-3xl"></div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2
						className="text-[#3C6652] mb-3 font-bold"
						style={{ fontFamily: '"Amiri", serif', fontSize: "2.5rem" }}
					>
						{isAr ? "آراء العملاء" : "Customer Reviews"}
					</h2>
					<p
						className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
						style={{
							fontFamily: '"Readex Pro", sans-serif',
							lineHeight: "1.7",
						}}
					>
						{isAr
							? "انطباعات حقيقية من زوار خاضوا تجارب إثرائية مع مزار "
							: "Real impressions from visitors who enjoyed enriching experiences with Mzar"}
					</p>
				</div>

				{/* Reviews Slider */}
				<Swiper
					modules={[Autoplay]}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					loop={true}
					spaceBetween={24}
					slidesPerView={1.1}
					breakpoints={{
						640: { slidesPerView: 1.1 },
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
						1280: { slidesPerView: 4 }, // show 4 on larger screens
					}}
					className={styles.quickCategories}
				>
					{reviews.map((review, index) => (
						<SwiperSlide key={index}>
							{/* ensure slide stretches and card fills height */}
							<div className="h-full flex">
								<ReviewCard {...review} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* CTA Section */}
				<div className="text-center mt-6">
					<a href="/reviews" className="bg-[#3C6652] text-white px-10 py-4 rounded-xl hover:bg-[#1E3A5F] transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-3" style={{ fontFamily: '"Readex Pro", sans-serif', fontWeight: 500 }}>
            <span>{isAr ? 'استعرض جميع التقييمات' : 'View All Reviews'}</span>
            <div className="flex items-center gap-0.5">
              <Star size={16} className="fill-[#867957] text-[#867957]" />
              <span className="text-sm">4.9/5</span>
            </div>
          </a>

					{/* Trust Badge */}
					{/* <div className="mt-8 flex items-center justify-center gap-3 text-sm text-gray-600">
            <CheckCircle size={20} className="text-[#3C6652]" />
            <span style={{ fontFamily: '"Readex Pro", sans-serif' }}>{isAr ? 'أكثر من 10,000 تقييم موثّق من مسافرين حقيقيين' : 'Over 10,000 verified reviews from real travelers'}</span>
          </div> */}
				</div>
			</div>
		</section>
	);
}
