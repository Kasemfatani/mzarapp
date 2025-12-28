import { MapPin, Compass } from 'lucide-react';

export function ConversionBanner( { isAr } ) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#E7D3AF] via-[#867957] to-[#E7D3AF] shadow-2xl">
          <div className="relative px-10 py-12 md:px-16 md:py-16">
            

            <div className="relative text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Compass className="h-8 w-8 text-white" strokeWidth={2.5} />
              </div>

              {/* Title */}
              <h2 className="mb-4 text-3xl text-white md:text-4xl">
                هل تريد مشاهدة هذه المعالم على أرض الواقع؟
              </h2>

              {/* Description */}
              <p className="mb-8 text-xl leading-relaxed text-white/95">
                من القراءة إلى التجربة الحية — اختر جولة مصممة بعناية وعش اللحظة
              </p>

              {/* Buttons */}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="group flex items-center justify-center gap-3 rounded-full bg-[#3C6652] px-8 py-4 text-xl text-white shadow-lg transition-all duration-300 hover:bg-[#2d4d3d] hover:shadow-2xl">
                  <MapPin className="h-6 w-6 transition-transform group-hover:scale-110" />
                  <span>استكشف الجولات المرتبطة</span>
                </button>

                <button className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-white/10 px-8 py-4 text-xl text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#3C6652] hover:shadow-2xl">
                  <span>تصفح جميع الرحلات</span>
                </button>
              </div>

              {/* Trust Indicator */}
              <p className="mt-6 text-base text-white/80">
                ✓ أكثر من 10,000 زائر استمتعوا بجولاتنا المميزة
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
