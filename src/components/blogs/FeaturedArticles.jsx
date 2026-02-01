import { Clock, ArrowLeft, ArrowRight } from "lucide-react";

export function FeaturedArticles({ isAr, articles, BLOG_URL }) {
	const mainFeatured = articles[0];
	const secondaryFeatured = articles.slice(1, 3);

	return (
		<section className="bg-white py-16 md:py-24">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mb-12">
					<h2 className="mb-3 text-3xl text-[#3C6652] md:text-4xl">
						{isAr ? "مقالات مميزة" : "Featured Articles"}
					</h2>
					<p className="text-xl text-[#718096]">
						{isAr
							? "أبرز المقالات الشاملة لتعميق معرفتك"
							: "A selection of comprehensive articles to deepen your knowledge "}
					</p>
				</div>

				<div className="grid gap-8 lg:grid-cols-3">
					{/* Main Featured Article */}
					{mainFeatured && (
						<div className="group lg:col-span-2">
							<article className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
								<div className="relative h-80 overflow-hidden lg:h-96">
									<a
										href={`/blog/${mainFeatured.slug}`}
										className="absolute inset-0 z-10"
									></a>
									<img
										src={BLOG_URL + mainFeatured.featuredImage}
										alt={mainFeatured.title}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
								</div>

								<div className="p-8">
									<a href={`/blog/${mainFeatured.slug}`}>
										<h3 className="mb-4 text-3xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
											{mainFeatured.title}
										</h3>
									</a>
									<p className="mb-6 line-clamp-2 text-xl leading-relaxed text-[#4a5568]">
										{mainFeatured.subtitle}
									</p>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2 text-lg text-[#718096]">
											<Clock className="h-5 w-5" />
											<span>
												{mainFeatured.readTime}{" "}
												{isAr ? "دقائق قراءة" : "min read"}
											</span>
										</div>
										<a
											href={`/blog/${mainFeatured.slug}`}
											className="group/btn flex items-center gap-2 text-xl text-[#3C6652] transition-colors hover:text-[#867957]"
										>
											<span>{isAr ? "اقرأ المقال" : "Read Article"}</span>
											{isAr ? (
												<ArrowLeft className="h-5 w-5 transition-transform group-hover/btn:-translate-x-1" />
											) : (
												<ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
											)}
										</a>
									</div>
								</div>
							</article>
						</div>
					)}

					{/* Secondary Featured Articles */}
					<div className="space-y-8">
						{secondaryFeatured.map((article) => (
							<article
								key={article.slug}
								className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
							>
								<div className="relative h-48 overflow-hidden">
									<a
										href={`/blog/${article.slug}`}
										className="absolute inset-0 z-10"
									></a>
									<img
										src={BLOG_URL + article.featuredImage}
										alt={article.title}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
								</div>

								<div className="p-6">
									<a href={`/blog/${article.slug}`}>
										<h3 className="mb-3 line-clamp-2 text-xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
											{article.title}
										</h3>
									</a>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2 text-base text-[#718096]">
											<Clock className="h-4 w-4" />
											<span>
												{article.readTime} {isAr ? "دقائق" : "min"}
											</span>
										</div>
										<a
											href={`/blog/${article.slug}`}
											className="text-lg text-[#3C6652] transition-colors hover:text-[#867957]"
										>
											{isAr ? "اقرأ ←" : "Read →"}
										</a>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
