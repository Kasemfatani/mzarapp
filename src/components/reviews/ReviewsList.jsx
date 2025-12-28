import { ReviewCard } from './ReviewCard';
// import { Review } from '../../data/reviews';



export function ReviewsList({ reviews , isAr }) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {reviews.length === 0 ? (
          <div className="rounded-2xl bg-[#f5f2ed] py-16 text-center">
            <p className="text-2xl text-[#718096]">
              لا توجد تقييمات تطابق الفلاتر المحددة
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} isAr={isAr} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
