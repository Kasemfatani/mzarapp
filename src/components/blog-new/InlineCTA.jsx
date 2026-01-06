import { MapPin, Compass } from 'lucide-react';

export function InlineCTA({ isAr }) {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto max-w-4xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#E7D3AF] to-[#e8dcc4] shadow-lg">
          <div className="px-8 py-10 text-center md:px-12">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm">
              <MapPin className="h-8 w-8 text-[#3C6652]" strokeWidth={2.5} />
            </div>

            {/* Text */}
            <h3 className="mb-4 text-2xl text-[#3C6652] md:text-3xl">
              {isAr ? "هل ترغب في زيارة هذا المعلم بنفسك؟" : "Would you like to visit this landmark yourself?"}
            </h3>
            <p className="mb-8 text-xl leading-relaxed text-[#4a5568]">
              {isAr ? "من القراءة إلى التجربة الحية — اختر تجربة مصممة بعناية" : "From reading to live experience — choose a carefully designed experience"}
            </p>

            {/* Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a href='#related-experiences' className="group flex items-center justify-center gap-3 rounded-full bg-[#3C6652] px-8 py-4 text-xl text-white transition-all hover:bg-[#2d4d3d] hover:shadow-xl">
                <span >{isAr ? "استكشف التجارب المرتبطة" : "Explore Related Experiences"}</span>
                <Compass className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </a>
              <a href='/all-trips' className="flex items-center justify-center rounded-full border-2 border-[#3C6652] bg-transparent px-8 py-4 text-xl text-[#3C6652] transition-all hover:bg-[#3C6652] hover:text-white hover:shadow-xl">
                <span>{isAr ? "تصفح جميع التجارب" : "Browse All Experiences"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
