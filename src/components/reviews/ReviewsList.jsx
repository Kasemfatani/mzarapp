import { useState, useEffect } from "react";
import { ReviewCard } from "./ReviewCard";
import { Pagination } from "./Pagination";
// import { Review } from '../../data/reviews';

export function ReviewsList({ reviews = [], isAr }) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const totalPages = Math.max(1, Math.ceil(reviews.length / itemsPerPage));
	useEffect(() => {
		if (currentPage > totalPages) setCurrentPage(1);
	}, [reviews.length, totalPages, currentPage]);

	const start = (currentPage - 1) * itemsPerPage;
	const visibleReviews = reviews.slice(start, start + itemsPerPage);

	return (
		<section className="bg-white py-12 md:py-16">
			<div className="container mx-auto max-w-7xl px-6 lg:px-8">
				{reviews.length === 0 ? (
					<div className="rounded-2xl bg-[#f5f2ed] py-16 text-center">
						<p className="text-2xl text-[#718096]">
						{isAr ? 'لا توجد تقييمات تطابق الفلاتر المحددة' : 'No reviews match the selected filters'}
						</p>
					</div>
				) : (
					<>
						<div className="grid gap-8">
							{visibleReviews.map((review) => (
								<ReviewCard key={review.id} review={review} isAr={isAr} />
							))}
						</div>

						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={(p) => {
								setCurrentPage(p);
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
							isAr={isAr}
						/>
					</>
				)}
			</div>
		</section>
	);
}
