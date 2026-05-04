import { TrendingUp, Clock } from "lucide-react";

export function TrendingArticles({ isAr, articles = [] }) {
	const trendingArticles = (articles || []).slice(0, 4);

	return (
		<section className="bg-white py-16 md:py-24">
			<div className="container mx-auto max-w-5xl px-6 lg:px-8">
				<div className="">
					<div className="">
						<div className="sticky top-24 rounded-3xl bg-[#e8f2ed] p-8 shadow-md">
							<div className="mb-8 flex items-center gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3C6652]">
									<TrendingUp
										className="h-6 w-6 text-white"
										strokeWidth={2.5}
									/>
								</div>
								<h2 className="text-3xl text-[#3C6652]">
									{isAr ? "الأكثر قراءة" : "Trending"}
								</h2>
							</div>

							<div className="space-y-6">
								{trendingArticles.map((article, index) => (
									<article
										key={article.slug || article.id}
										className="group  border-b border-[#3C6652]/10 pb-6 last:border-0 last:pb-0"
									>
										<div className="mb-3 flex items-start gap-4">
											<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#3C6652] text-xl text-white">
												{index + 1}
											</div>
											<div className="flex-1">
												<a href={`/blog/${article.slug}`} className="mb-2 line-clamp-2 text-xl leading-snug text-[#3C6652] transition-colors group-hover:text-[#867957]">
													{article.title}
												</a>
												<div className="flex items-center gap-4 text-base text-[#718096]">
													<div className="flex items-center gap-1">
														<Clock className="h-4 w-4" />
														<span>
															{article.readTime} {isAr ? "دقائق" : "min"}
														</span>
													</div>
													
												</div>
											</div>
										</div>
									</article>
								))}
							</div>

							{/* View All Button */}
							{/* <button className="mt-8 w-full rounded-full bg-[#3C6652] py-4 text-lg text-white transition-all hover:bg-[#2d4d3d] hover:shadow-lg">
                عرض جميع المقالات الرائجة
              </button> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
