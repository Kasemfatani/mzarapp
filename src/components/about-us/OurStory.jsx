

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
               {isAr ? 'انطلقت مزاه من إيماننا بأن الرحلة الروحانية تستحق تنظيمًا يليق بها.' : 'Mzar was launched from our belief that the spiritual journey deserves proper organization.'}
            </p>
            <p className="mt-4 text-xl leading-relaxed text-[#4a5568] md:text-2xl">
              {isAr ? 'عملنا على بناء منصة تجمع بين التقنية، الخبرة الميدانية، والالتزام الكامل براحة الزائر.' : 'We worked on building a platform that combines technology, field experience, and full commitment to visitor comfort.'}
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
