"use client";

import { useState } from 'react';
import { Star, ThumbsUp, MapPin } from 'lucide-react';
// import { Review } from '../../data/reviews';



export function ReviewCard({ review , isAr }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);

  const shouldShowReadMore = review.reviewText.length > 200;
  const displayText = isExpanded || !shouldShowReadMore
    ? review.reviewText
    : review.reviewText.slice(0, 200) + '...';

  const handleHelpful = () => {
    if (!helpfulClicked) {
      setHelpfulCount(helpfulCount + 1);
      setHelpfulClicked(true);
    }
  };

  let cityName = 'Makkah';
  if (review.city=="makkah") 
    cityName = isAr ? 'مكة المكرمة' : 'Makkah';
  else if (review.city=="madinah") 
    cityName = isAr ? 'المدينة المنورة' : 'Madinah';

  return (
    <article className="rounded-2xl border-2 border-[#e2e8f0] bg-white p-6 shadow-md transition-all hover:shadow-lg md:p-8" >
      {/* Header */}
      <div className="mb-6 flex items-start gap-4">
        {/* Avatar */}
        {/* <img
          src={review.avatar}
          alt={review.userName}
          className="h-14 w-14 flex-shrink-0 rounded-full border-2 border-[#E7D3AF]"
        /> */}

        {/* User Info */}
        <div className="flex-1">
          <h3 className="mb-1 text-xl text-[#3C6652]">
            {review.userName}
          </h3>
          <p className="mb-2 text-base text-[#718096]">{review.date}</p>
          
          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < review.rating
                    ? 'fill-[#867957] text-[#867957]'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* City Badge */}
        <div className="flex items-center gap-2 rounded-full bg-[#f5f2ed] px-4 py-2">
          <MapPin className="h-4 w-4 text-[#867957]" />
          <span className="text-base text-[#3C6652]">{cityName}</span>
        </div>
      </div>

      {/* Tour Name */}
      <div className="mb-4">
        <a href={`/trip-detail/${review.tourId}`} className="text-lg text-[#867957] transition-colors hover:text-[#3C6652] hover:underline">
          {review.tourName}
        </a>
      </div>

      {/* Review Text */}
      <p className="mb-4 text-lg leading-relaxed text-[#4a5568]">
        {displayText}
      </p>

      {shouldShowReadMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-4 text-lg text-[#3C6652] transition-colors hover:text-[#867957]"
        >
          {isExpanded ? 'عرض أقل' : 'قراءة المزيد'}
        </button>
      )}

      {/* Review Image */}
      {review.hasImage && review.imageUrl && (
        <div className="mb-6 overflow-hidden rounded-xl">
          <img
            src={review.imageUrl}
            alt="Customer photo"
            className="h-auto w-full object-cover"
          />
          <p className="mt-2 text-sm text-[#718096]">صورة من التجربة الفعلية</p>
        </div>
      )}

      {/* Footer */}
      {/* <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleHelpful}
            className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
              helpfulClicked
                ? 'bg-[#3C6652] text-white'
                : 'bg-[#f5f2ed] text-[#3C6652] hover:bg-[#e8dcc4]'
            }`}
          >
            <ThumbsUp className="h-5 w-5" />
            <span className="text-base">مفيد</span>
          </button>
          <span className="text-base text-[#718096]">({helpfulCount})</span>
        </div>
      </div> */}
    </article>
  );
}
