export default function AccommodationsSection({ isAr, data }) {
	const { t, accommodations } = data;

	const renderStars = (count) =>
		Array.from({ length: count }).map((_, i) => (
			<span key={i} className="text-[#775a19] text-sm leading-none">
				★
			</span>
		));

	return (
		<section>
			<h2 className="mb-8 text-2xl font-semibold text-[#1b4332]">
				{t.accommodationsTitle}
			</h2>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{accommodations.map((hotel, index) => {
					const stars = index === 0 ? 4 : 5;

					return (
						<article
							key={hotel.id}
							className="flex min-h-[180px] overflow-hidden rounded-xl bg-white shadow-2xl"
						>
							<div className="w-1/3 min-h-[180px]">
								<img
									src={hotel.image}
									alt={hotel.name}
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="w-2/3 p-6 flex flex-col justify-center">
								<h3 className="text-lg font-semibold text-[#1b4332]">
									{hotel.name}
								</h3>

								<p className="mt-1 text-sm text-[#414844]">{hotel.subtitle}</p>

								<div className="mt-3 flex items-center gap-1">
									{renderStars(stars)}
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
