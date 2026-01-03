

export function OurStory( { lang } ) {
  const isAr = lang === 'ar';
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Right: Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="mb-6 text-4xl text-[#0d5940] md:text-5xl">
               {isAr ? 'قصتنا' : 'Our Story'}
            </h2>
            <p className="text-xl leading-relaxed text-[#4a5568] md:text-2xl">
               {isAr ? 'من قلب مكة المكرمة، انطلقت فكرة مزار لتقدم تجربة زيارة متكاملة تجمع بين الثقافة والإثراء والتقنية الحديثة. ' : 'From the heart of Makkah Al-Mukarramah, the idea of Mzar was born to offer a comprehensive visitation experience that brings together culture, enrichment, and modern technology.'}
            </p>
            <p className="mt-4 text-xl leading-relaxed text-[#4a5568] md:text-2xl">
              {isAr ? 'نهدف إلى إعادة إحياء قصص الأماكن التاريخية بأسلوب الحاضر، نربط الزائر بالمكان من خلال تجربة تفاعلية تثري زيارته وتضيف لها معنى. ' : 'We aim to revive the stories of historical sites through a contemporary approach, connecting visitors to each place through interactive experiences that enrich their journey and add deeper meaning to it.'}
            </p>
          </div>

          {/* Left: Image */}
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1574246719289-a931e511c33d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBwaWxncmltcyUyMGd1aWRlZCUyMHRvdXJ8ZW58MXx8fHwxNzY1OTY1MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="رحلة روحانية مع مزاه"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
