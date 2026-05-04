import { Menu, TableOfContents } from "lucide-react";

export function FeaturedImage({
	image,
	caption,
	BLOG_URL,
	isAr,
	tocItems = [],
}) {
	// fallback: if no tocItems provided keep an empty list (handled above)
	const imgSrc = image ? `${BLOG_URL}${image}` : "";

	return (
		<section className="bg-white pb-8 md:pb-12">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<div className="flex flex-col justify-start gap-10 md:flex-row md:items-start">
					{/* Image */}
					<div className="md:w-[70%]">
						<img
							src={imgSrc}
							alt="Featured article image"
							className="w-full md:h-[556px]  object-cover mx-auto rounded-2xl"
						/>
						{caption && (
							<p className="mt-4 text-center text-lg text-[#718096]">
								{caption}
							</p>
						)}
					</div>

					{/* Table of Contents (sidebar) */}
					<aside
						className=" shrink-0 rounded-2xl bg-white p-4 shadow-md"
						aria-labelledby="toc-title"
					>
						<div className="flex">
							<TableOfContents />
							<h3 id="toc-title" className="mb-4 px-2 text-lg font-semibold ">
								{isAr ? "محتويات المقال" : "Table of contents"}
							</h3>
						</div>

						<nav className="border-t border-b py-2">
							<ul className="space-y-3 ">
								{tocItems.map((item) => (
									<li key={item.id}>
										<a
											href={`#${item.id}`}
											className="group flex items-center  gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[#857856]/10"
										>
											<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f2ed] text-sm text-[#3C6652] group-hover:bg-[#867957] group-hover:text-white">
												{item.number}
											</span>
											<span className="text-sm text-[#718096] line-clamp-2">
												{item.label}
											</span>
										</a>
									</li>
								))}
							</ul>
						</nav>

						<div className="mt-6">
							<a
								href="#related-experiences"
								className="block w-full rounded-full bg-gradient-to-b from-[#857856] to-[#BFAA71] px-4 py-3 text-center text-white transition hover:opacity-60"
							>
								{isAr
									? "جولات مزار المرتبطة بهذا المقال"
									: "Mzar trips related to this article"}
							</a>
							<p className="mt-3 text-center text-sm text-[#718096]">
								{isAr
									? "اكتشف تجارب فريدة مع مرشدين محترفين"
									: "Discover unique experiences with professional guides"}
							</p>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
