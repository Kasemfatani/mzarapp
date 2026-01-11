"use client";

import { Star, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const formatPrice = (val) => {
	const n = Number(val);
	if (Number.isNaN(n)) return "";
	return n.toFixed(2);
};

const SAR_RATE = 3.75;

function toDollar(amount) {
	return (amount / SAR_RATE).toFixed(2);
}

export function RelatedTrips({ isAr, blog = {}, API_BASE_URL_NEW , isSaudi = true }) {
	const [trips, setTrips] = useState([]);
	const [loading, setLoading] = useState(true);

	// --- Currency Logic ---
	let currencySymbol;

	if (isSaudi) {
		currencySymbol = isAr ? "ريال (SAR)" : "SAR";
	} else {
		currencySymbol = isAr ? "دولار" : "USD";
	}
	// --- End Currency Logic ---

	useEffect(() => {
		if (!API_BASE_URL_NEW) {
			setTrips([]);
			setLoading(false);
			return;
		}

		const fetchTrips = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`${API_BASE_URL_NEW.replace(/\/$/, "")}/landing/packages/list`,
					{
						headers: { lang: isAr ? "ar" : "en" },
					}
				);
				if (!res.ok) {
					setTrips([]);
					setLoading(false);
					return;
				}
				const json = await res.json();
				const data = Array.isArray(json) ? json : json?.data ?? [];

				// Convert blog.relatedTrips items to numbers and filter valid ids
				const wantedIds = (blog.relatedTrips || [])
					.map((id) => Number(id))
					.filter((n) => Number.isInteger(n));

				const matched = data.filter((pkg) => wantedIds.includes(pkg.id));
				setTrips(matched);
			} catch (e) {
				setTrips([]);
			} finally {
				setLoading(false);
			}
		};

		fetchTrips();
	}, []);

	const getImageUrl = (imageUrl) =>
		imageUrl ||
		"https://images.unsplash.com/photo-1734572410061-7823529c93f7?w=800";

	return (
		<section id="related-experiences" className="bg-white py-16 md:py-24">
			<div className="container mx-auto max-w-6xl px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="mb-3 text-3xl text-[#3C6652] md:text-4xl">
						{isAr ? "تجارب مرتبطة بهذا المقال" : "Related Experiences"}
					</h2>
					<p className="text-xl text-[#718096]">
						{isAr
							? "حوّل المعرفة إلى تجربة حية"
							: "Turn knowledge into a living experience"}
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{loading
						? Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="h-64 rounded-3xl bg-gray-100" />
						  ))
						: trips.map((trip) =>
								(() => {
									let link = `/book-path/${trip.id}`;
									if (trip.id === 88) link = `/book-haram`;
									else if (trip.id === 96) link = `/book-tour`;
									else if (trip.id === 87) link = `/book-madinah`;

									return (
										<article
											key={trip.id}
											className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
										>
											<div className="relative h-64 overflow-hidden">
												<img
													src={getImageUrl(trip.image)}
													alt={trip.name}
													className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

												<div className="absolute left-4 top-4">
													<div className="rounded-full bg-white px-4 py-2 shadow-lg">
														<p className="text-sm text-[#718096]">
															{isAr ? "ابدأ من" : "Starting from"}
														</p>
														<p className="text-sm text-[#3C6652]">
															{ isSaudi ? formatPrice(trip.start_price ?? trip.startPrice) : toDollar(formatPrice(trip.start_price ?? trip.startPrice))} {" "}
															{currencySymbol}
														</p>
													</div>
												</div>

												<div className="absolute bottom-4 right-4">
													<div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 backdrop-blur-sm">
														<Star className="h-4 w-4 fill-[#867957] text-[#867957]" />
														<span className="text-lg text-[#3C6652]">
															{trip.rating}
														</span>
														<span className="text-base text-[#718096]">
															({trip.rating_count ?? trip.ratingCount ?? 0})
														</span>
													</div>
												</div>
											</div>

											<div className="p-6">
												<h3 className="mb-3 text-2xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
													{trip.name}
												</h3>

												<p className="mb-6 line-clamp-2 text-lg leading-relaxed text-[#4a5568]">
													{trip.short_description}
												</p>

												<div className="flex items-center justify-between border-t border-[#e2e8f0] pt-4">
													<div className="flex items-center gap-2 text-base text-[#718096]">
														<Clock className="h-4 w-4" />
														<span>{trip.duration}</span>
													</div>

													<a
														href={link}
														className="group/btn flex items-center gap-2 rounded-full bg-[#3C6652] px-6 py-3  text-white transition-all hover:bg-[#2d4d3d] hover:shadow-lg"
													>
														<span>{isAr ? "احجز الآن" : "Book Now"}</span>
														{isAr ? (
															<ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
														) : (
															<ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
														)}
													</a>
												</div>
											</div>
										</article>
									);
								})()
						  )}
				</div>

				<div className="mt-12 text-center">
					<a
						href="/all-trips"
						className="rounded-full border-2 border-[#3C6652] px-10 py-4 text-xl text-[#3C6652] transition-all hover:bg-[#3C6652] hover:text-white hover:shadow-lg"
					>
						{isAr ? "عرض جميع التجارب" : "View All Experiences"}
					</a>
				</div>
			</div>
		</section>
	);
}
