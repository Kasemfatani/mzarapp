import { Star, Clock, ArrowLeft } from 'lucide-react';
import { relatedTrips } from './sampleArticle';

export function RelatedTrips({ isAr } ) {
  const getImageUrl = (imageName) => {
    const imageMap = {
      'mecca-tour': 'https://images.unsplash.com/photo-1734572410061-7823529c93f7?w=800',
      'arafat-tour': 'https://images.unsplash.com/photo-1759994976016-cd0799b2f480?w=800',
      'prophetic-tour': 'https://images.unsplash.com/photo-1763262196540-203e797b4f32?w=800',
    };
    return imageMap[imageName] || imageMap['mecca-tour'];
  };

  return (
    <section className="bg-white py-16 md:py-24" dir="rtl">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl text-[#3C6652] md:text-4xl">
            {isAr ? "جولات مرتبطة بهذا المقال" : "Related Trips"}
          </h2>
          <p className="text-xl text-[#718096]">
            {isAr ? "حوّل المعرفة إلى تجربة حية" : "Turn knowledge into a living experience"}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {relatedTrips.map((trip) => (
            <article
              key={trip.id}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getImageUrl(trip.image)}
                  alt={trip.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute left-4 top-4">
                  <div className="rounded-full bg-white px-4 py-2 shadow-lg">
                    <p className="text-sm text-[#718096]">{isAr ? "ابدأ من" : "Starting from"}</p>
                    <p className="text-xl text-[#3C6652]">{trip.price}  {isAr ? "ريال" : "SAR"}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 backdrop-blur-sm">
                    <Star className="h-4 w-4 fill-[#867957] text-[#867957]" />
                    <span className="text-lg text-[#3C6652]">{trip.rating}</span>
                    <span className="text-base text-[#718096]">({trip.reviewCount})</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-3 text-2xl text-[#3C6652] transition-colors group-hover:text-[#867957]">
                  {trip.title}
                </h3>

                <p className="mb-6 line-clamp-2 text-lg leading-relaxed text-[#4a5568]">
                  {trip.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[#e2e8f0] pt-4">
                  <div className="flex items-center gap-2 text-base text-[#718096]">
                    <Clock className="h-4 w-4" />
                    <span>{trip.duration}</span>
                  </div>

                  <button className="group/btn flex items-center gap-2 rounded-full bg-[#3C6652] px-6 py-3 text-lg text-white transition-all hover:bg-[#2d4d3d] hover:shadow-lg">
                    <span>احجز الآن</span>
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Trips */}
        <div className="mt-12 text-center">
          <button className="rounded-full border-2 border-[#3C6652] px-10 py-4 text-xl text-[#3C6652] transition-all hover:bg-[#3C6652] hover:text-white hover:shadow-lg">
           {isAr ? "عرض جميع الجولات" : "View All Trips"}
          </button>
        </div>
      </div>
    </section>
  );
}
