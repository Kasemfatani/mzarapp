import { ArrowLeft, MessageCircle , ArrowRight} from 'lucide-react';

export function CTA({ lang }) {
  const isAr = lang === 'ar';
  return (
    <section className="bg-white py-20 md:py-28" >
      <div className="container mx-auto max-w-4xl px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0d5940] to-[#116149] p-12 text-center shadow-2xl md:p-16">
          {/* Title */}
          <h2 className="mb-4 text-4xl text-white md:text-5xl">
          {isAr ? 'ابدأ رحلتك بثقة' : 'Start Your Journey with Confidence'}
          </h2>

          {/* Subtitle */}
          <p className="mb-10 text-xl text-white/90 md:text-2xl">
            {isAr ? 'نحن هنا لنجعل تجربتك أسهل، أوضح، وأقرب للقلب.' : 'We are here to make your experience easier, clearer, and closer to the heart.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href='/all-trips' className="group flex items-center justify-center gap-3 rounded-full bg-[#c9a961] px-10 py-5 transition-all duration-300 hover:bg-[#e5d4a8] hover:shadow-lg">
              <span className="text-xl text-[#0d5940]">{isAr ? 'استعرض التجارب' : 'Browse Experiences'}</span>
              {isAr ? <ArrowLeft className="h-6 w-6 text-[#0d5940] transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="h-6 w-6 text-[#0d5940] transition-transform group-hover:translate-x-1" />}
            </a>

            <button className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-white/10 px-10 py-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
              <span className="text-xl text-white">{isAr ? 'تواصل معنا' : 'Contact Us'}</span>
              <MessageCircle className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
