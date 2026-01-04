import { Target, Compass } from 'lucide-react';

export function MissionVision( { lang } ) {
  const isAr = lang === 'ar';
  return (
    <section className="bg-[#f5f2ed] py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <div className="group rounded-3xl bg-white p-10 shadow-md transition-shadow duration-300 hover:shadow-xl md:p-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d5940]">
              <Target className="h-9 w-9 text-[#c9a961]" strokeWidth={2.5} />
            </div>
            <h3 className="mb-4 text-3xl text-[#0d5940] md:text-4xl">
             {isAr ? 'رسالتنا' : 'Our Mission'}
            </h3>
            <p className="text-xl leading-relaxed text-[#4a5568]">
              {isAr ? 'نقدّم تجارب زيارة تثري معرفة الزائر بالمواقع التاريخية والثقافية في مكة والمدينة، من خلال حلول تقنية مبتكرة تضمن له تجربة مريحة وموثوقة وسهلة الوصول. ' : "We provide visitation experiences that deepen visitors’ knowledge of historical and cultural landmarks in Makkah and Madinah through innovative technological solutions that ensure a comfortable, reliable, and easily accessible experience. "}
            </p>
          </div>

          {/* Vision Card */}
          <div className="group rounded-3xl bg-white p-10 shadow-md transition-shadow duration-300 hover:shadow-xl md:p-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c9a961]">
              <Compass className="h-9 w-9 text-[#0d5940]" strokeWidth={2.5} />
            </div>
            <h3 className="mb-4 text-3xl text-[#0d5940] md:text-4xl">
              {isAr ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className="text-xl leading-relaxed text-[#4a5568]">
              {isAr ? 'أن تكون مزار المنصة الرائدة للتجارب الإثرائية في مكة المكرمة والمدينة المنورة، تجمع بين الأصالة والتقنية لتقديم تجربة استكشاف ذكية ومتكاملة. ' : 'To become the leading enrichment-experience platform in Makkah and Madinah, combining authenticity and technology to deliver a smart and fully integrated exploration experience. '}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
