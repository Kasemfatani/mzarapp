import { CheckCircle2 } from 'lucide-react';


export function AuthorCard({ name, avatar, description , isAr }) {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border-2 border-[#e2e8f0] bg-[#f5f2ed] p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={avatar}
                alt={name}
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* Author Info */}
            <div className={`flex-1 text-center `}>
              <p className="mb-2 text-lg text-[#718096]">{isAr ? "إعداد:" : "Author:"}</p>
              <h3 className="mb-3 text-2xl text-[#3C6652] md:text-3xl">
                {name}
              </h3>
              <p className="mb-6 text-xl leading-relaxed text-[#4a5568]">
                {description}
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
                  <CheckCircle2 className="h-5 w-5 text-[#3C6652]" strokeWidth={2.5} />
                  <span className="text-lg text-[#3C6652]">{isAr ? "محتوى موثّق" : "Verified Content"}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
                  <CheckCircle2 className="h-5 w-5 text-[#3C6652]" strokeWidth={2.5} />
                  <span className="text-lg text-[#3C6652]">{isAr ? "مرتبط بتجارب ميدانية" : "Field Experience Related"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
