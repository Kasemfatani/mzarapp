import { Clock3, Star, Users } from "lucide-react";

export default function HeroSection({ isAr, data , mockData}) {
	 const { t } = mockData; // Use mockData for static text in the hero section

	return (
		<section className="relative h-[340px] w-full overflow-hidden rounded-2xl shadow-xl md:h-[500px]">
			<img
				src={data.cover || mockData.heroImage}
				alt={data.name || ''}
				className="h-full w-full object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

			<div className="absolute bottom-6 left-5 right-5 text-white md:bottom-10 md:left-10 md:right-10">
				<span className="mb-4 inline-block rounded-full bg-[#fed488] px-3 py-1 text-xs font-semibold text-[#775a19] md:text-sm">
					{t.badge}
				</span>

				<h1 className="text-2xl font-bold md:text-5xl">{data.name || ''}</h1>

				<div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-base md:text-lg">
					<span className="flex items-center gap-2">
						<Clock3 className="h-4 w-4 md:h-5 md:w-5" />
						{data.duration}
					</span>

					<span className="flex items-center gap-2">
						<Star className="h-4 w-4 fill-current md:h-5 md:w-5" />
						{data.rate}
					</span>

					<span className="flex items-center gap-2">
						<Users className="h-4 w-4 md:h-5 md:w-5" />
						{data.max_people_count}
					</span>
				</div>
			</div>
		</section>
	);
}
