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
                {isAr ? "هل تريد مشاهدة هذه المعالم على أرض الواقع؟" : "Want to See These Landmarks in Real Life?"}
              </h2>

              {/* Description */}
              <p className="mb-8 text-xl leading-relaxed text-white/95">
                {isAr ? "من القراءة إلى التجربة الحيّة ــ اختر تجربة مصمّمة بعناية، وعِش اللحظة بكل تفاصيلها " : "From reading to live experience ــ choose a carefully designed journey and live every moment in full detail "}
              </p>

              {/* Buttons */}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">

                <a href="/all-trips" className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-white/10 px-8 py-4 text-xl text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#3C6652] hover:shadow-2xl">
                  <span>{isAr ? "تصفح جميع التجارب" : "Browse All Experiences"}</span>
                </a>
              </div>

              {/* Trust Indicator */}
              <p className="mt-6 text-base text-white/80">
                {isAr ? "✓ أكثر من 1,000 زائر استمتعوا بتجارب مزار الفريدة" : "✓ More than 1,000 visitors have enjoyed Mzar’s unique experiences "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
