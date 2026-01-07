"use client";

import { useEffect, useState } from "react";
import { Clock, ArrowLeft , ArrowRight} from "lucide-react";

export function RelatedArticles({ isAr, BLOG_URL, slug }) {
	const [relatedArticles, setRelatedArticles] = useState([]);

	useEffect(() => {
		if (!slug || !BLOG_URL) return;
		const lang = isAr ? "ar" : "en";
		(async () => {
			try {
				const res = await fetch(
					`${BLOG_URL.replace(/\/$/, "")}/api/blogs/${slug}/related`,
					{
						headers: { lang },
					}
				);
				const json = await res.json();
				const data = Array.isArray(json) ? json : json?.data ?? [];
				setRelatedArticles(data);
        console.log("Related articles fetched:", data);
			} catch (e) {
				setRelatedArticles([]);
				// optionally console.error(e);
			}
		})();
	}, []);

	return (
		<section className="bg-[#f5f2ed] py-16 md:py-24">
			<div className="container mx-auto max-w-6xl px-6 lg:px-8">
				<div className="mb-12 text-center">
					<h2 className="mb-3 text-3xl text-[#3C6652] md:text-4xl">
						{isAr ? "مقالات ذات صلة" : "Related Articles"}
					</h2>
					<p className="text-xl text-[#718096]">
						{isAr
							? "استمر في رحلتك المعرفية"
							: "Continue your knowledge journey"}
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					{relatedArticles.length === 0
						? Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="h-56 rounded-3xl bg-gray-100" />
						  ))
						: relatedArticles.map((article) => (
								<article
									key={article.slug ?? article.id}
									className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
								>
									<div className="relative h-56 overflow-hidden">
										<img
											src={
												BLOG_URL+article.featuredImage 
											}
											alt={article.title}
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
									</div>

									<div className="p-6">
										<h3 className="mb-4 line-clamp-2 text-2xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
											{article.title}
										</h3>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2 text-base text-[#718096]">
												<Clock className="h-4 w-4" />
												<span>
													{article.readTime ?? article.read_time ?? 0}{" "}
													{isAr ? "دقائق" : "minutes"}
												</span>
											</div>
											<a href={`/blog/${article.slug}`} className="flex items-center gap-2 text-lg text-[#3C6652] transition-colors hover:text-[#867957]">
												<span>{isAr ? "اقرأ المقال" : "Read Article"}</span>
                        {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
											</a>
										</div>
									</div>
								</article>
						  ))}
				</div>
			</div>
		</section>
	);
}
