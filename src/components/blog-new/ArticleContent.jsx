import { Lightbulb } from "lucide-react";
import parse from "html-react-parser";

export function ArticleContent({ content, isAr, BLOG_URL }) {
	return (
		<section className="bg-white py-8 md:py-12">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				<article className="prose prose-lg max-w-none md:w-[70%]">
					{content.map((block, index) => {
						switch (block.type) {
							case "paragraph":
								return (
									<div
										key={index}
										className="mb-6 text-xl leading-relaxed text-[#4a5568] [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800"
									>
										{parse(block.content)}
									</div>
								);

							case "heading2":
								return (
									<h2
										key={index}
										id={block.id || undefined} // <-- attach id for TOC links
										className="mb-6 mt-12 text-3xl text-[#3C6652] md:text-4xl"
									>
										{block.content}
									</h2>
								);

							case "heading3":
								return (
									<h3
										key={index}
										className="mb-4 mt-8 text-2xl text-[#3C6652] md:text-3xl"
									>
										{block.content}
									</h3>
								);

							case "highlight":
								return (
									<div
										key={index}
										className="my-8 rounded-2xl border-2 border-[#867957] bg-[#f5f2ed] p-6"
									>
										<div className="mb-3 flex items-center gap-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#867957]">
												<Lightbulb
													className="h-5 w-5 text-white"
													strokeWidth={2.5}
												/>
											</div>
											<span className="text-xl text-[#867957]">
												{isAr ? "معلومة سريعة" : "Quick Tip"}
											</span>
										</div>
										<p className="text-xl leading-relaxed text-[#4a5568]">
											{block.content}
										</p>
									</div>
								);

							case "list":
								return (
									<ul key={index} className="my-8 space-y-3 px-6">
										{block.content.map((item, itemIndex) => (
											<li
												key={itemIndex}
												className={`relative text-xl leading-relaxed text-[#4a5568] before:absolute  ${
													isAr ? "before:-right-6" : "before:-left-6"
												} before:text-[#867957] before:content-['•']`}
											>
												{item}
											</li>
										))}
									</ul>
								);

							case "image":
								return (
									<div key={index} className="my-10">
										<div className="overflow-hidden rounded-2xl">
											<img
												src={`${BLOG_URL}${block.content}`}
												alt="Article content"
												className="h-auto w-full object-cover"
											/>
										</div>
										{block.caption && (
											<p className="mt-3 text-center text-lg text-[#718096]">
												{block.caption}
											</p>
										)}
									</div>
								);

							default:
								return null;
						}
					})}
				</article>
			</div>
		</section>
	);
}
