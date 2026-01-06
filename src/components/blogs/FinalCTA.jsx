import { Compass, BookOpen } from 'lucide-react';

export function FinalCTA({ isAr }) {
  return (
    <section className="bg-gradient-to-br from-[#3C6652] via-[#2d4d3d] to-[#3C6652] py-20 md:py-32" >
      <div className="container mx-auto max-w-4xl px-6 text-center lg:px-8">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#867957] shadow-2xl">
          <Compass className="h-12 w-12 text-white" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h2 className="mb-6 text-4xl text-white md:text-5xl">
          {isAr ? "المعرفة بداية الرحلة" : "Knowledge is the Beginning of the Journey"}
        </h2>

        {/* Text */}
        <p className="mb-12 text-2xl leading-relaxed text-white/95" >
          {isAr ? "اقرأ، تعرّف، ثم عِش التجربة بنفسك مع مزار. \n كل مقال هو خطوة نحو فهمٍ أعمق وتجربةٍ أكثر ثراءً.  " : "Read, learn, then live the experience yourself with Mzar. \n Every article is a step toward deeper understanding and a richer journey. "}
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col justify-center gap-5 sm:flex-row">
          <a href='/all-trips' className="group flex items-center justify-center gap-3 rounded-full bg-[#867957] px-10 py-5 text-xl text-white transition-all duration-300 hover:bg-[#E7D3AF] hover:text-[#3C6652] hover:shadow-2xl">
            <span>{isAr ? "ابدأ تجربتك الآن" : "Start Your Experience Now"}</span>
            <Compass className="h-6 w-6 transition-transform group-hover:rotate-45" />
          </a>

          {/* <button className="flex items-center justify-center gap-3 rounded-full border-2 border-white bg-transparent px-10 py-5 text-xl text-white transition-all duration-300 hover:bg-white hover:text-[#3C6652] hover:shadow-2xl">
            <BookOpen className="h-6 w-6" />
            <span>{isAr ? "تصفح المزيد من المقالات" : "Browse More Articles"}</span>
          </button> */}
        </div>

        {/* Trust Indicators */}
        {/* <div className="grid gap-6 border-t border-white/20 pt-12 md:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-3xl text-[#867957]">50+</p>
            <p className="text-lg text-white/80">{isAr ? "مقال متخصص" : "Specialized Articles"}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-3xl text-[#867957]">100k+</p>
            <p className="text-lg text-white/80">{isAr ? "قراءة شهرياً" : "Monthly Reads"}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-3xl text-[#867957]">⭐ 4.9</p>
            <p className="text-lg text-white/80">{isAr ? "تقييم المحتوى" : "Content Rating"}</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
