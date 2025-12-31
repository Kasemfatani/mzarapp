"use client";

import { Star, CheckCircle2 } from 'lucide-react';
import { ratingBreakdown } from './reviews';
import { is } from 'date-fns/locale';

export function ReviewsSummary({ isAr }) {
  const renderStars = (count) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < count
                ? 'fill-[#867957] text-[#867957]'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-white py-12 md:py-16" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-[#e2e8f0] bg-gradient-to-br from-[#f5f2ed] to-white p-8 shadow-lg md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-12">
            {/* Left: Overall Rating */}
            <div className="text-center lg:text-start">
              <div className="mb-4 text-7xl text-[#3C6652] md:text-8xl">
                4.9
                <span className="text-4xl text-[#718096]"> / 5</span>
              </div>
              <div className="mb-6 flex justify-center gap-2 lg:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-8 w-8 fill-[#867957] text-[#867957]"
                  />
                ))}
              </div>
              <p className="mb-8 text-xl leading-relaxed text-[#4a5568]">
                {isAr ? "بناءً على أكثر من 1,200 تقييم موثّق من عملاء مزار" : "Based on more than 1,200 verified reviews from Mzar customers"}
              </p>

              {/* Trust Indicators */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3 lg:justify-start">
                  <CheckCircle2 className="h-6 w-6 text-[#3C6652]" strokeWidth={2.5} />
                  <span className="text-lg text-[#3C6652]" >{isAr ? 'تقييمات حقيقية' : 'Real Reviews'}</span>
                </div>
                <div className="flex items-center justify-center gap-3 lg:justify-start">
                  <CheckCircle2 className="h-6 w-6 text-[#3C6652]" strokeWidth={2.5} />
                  <span className="text-lg text-[#3C6652]">{isAr ? 'حجوزات مؤكدة' : 'Confirmed Bookings'}</span>
                </div>
                <div className="flex items-center justify-center gap-3 lg:justify-start">
                  <CheckCircle2 className="h-6 w-6 text-[#3C6652]" strokeWidth={2.5} />
                  <span className="text-lg text-[#3C6652]">{isAr ? 'مراجعة تلقائية بدون تعديل' : 'Automatic Review Without Modification'}</span>
                </div>
              </div>
            </div>

            {/* Right: Rating Breakdown */}
            <div className="space-y-4">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-4">
                  {/* Stars */}
                  <div className="w-32 flex-shrink-0">
                    {renderStars(item.stars)}
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1">
                    <div className="h-3 overflow-hidden rounded-full bg-[#e2e8f0]">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-[#867957] to-[#3C6652] transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Percentage */}
                  <div className="w-16 text-left text-lg text-[#4a5568]">
                    {item.percentage}%
                  </div>

                  {/* Count */}
                  <div className="w-20 text-left text-base text-[#718096]">
                    ({item.count})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
