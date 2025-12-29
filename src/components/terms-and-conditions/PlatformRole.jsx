import { Info } from 'lucide-react';

export function PlatformRole( { isAr }) {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
           {isAr ? "دورنا في مزار" : "Our Role in Mzar"}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            {isAr ? "عن مزار " : "About Mzar "}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border-2 border-[#c9a961] bg-gradient-to-br from-[#e8f4f0] to-white p-10 shadow-xl md:p-12">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c9a961]">
            <Info className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>
          <p className="text-2xl leading-relaxed text-[#0d5940] md:text-3xl">
             {isAr ? "مزار هي منصة رقمية مبتكرة تهدف إلى إثراء تجربة الحجاج والمعتمرين والزوار عبر تجارب معرفية وتاريخية وإيمانية تروي قصة المكان وتُشعر الزائر بعظمة الرحلة." : "Mzar is an innovative digital platform aimed at enriching the experience of pilgrims and visitors through informative, historical, and spiritual experiences that tell the story of the place and make the visitor feel the grandeur of the journey."}
          </p>
          <div className="mt-8 rounded-2xl bg-white p-6">
            <p className="text-xl leading-relaxed text-[#4a5568]">
              💡 {isAr ? "من خلال مزار، يمكن للمستخدمين استكشاف أبرز المواقع الدينية والتاريخية والثقافية في مكة المكرمة والمدينة المنورة بسهولة ومرونة، عبر جولات إرشادية ذكية وخيارات نقل مريحة وتقنيات تفاعلية حديثة." : "Through Mzar, users can explore the most prominent religious, historical, and cultural sites in Mecca and Medina with ease and flexibility, via smart guided tours, comfortable transportation options, and modern interactive technologies."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
