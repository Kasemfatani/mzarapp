import { Shield, Lock, Heart, Award, Smile , Sparkles , History , Lightbulb , Coffee , Target } from 'lucide-react';


export function Values({ lang }) {

  const isAr = lang === 'ar';

  const values = [
  {
    icon: Sparkles,
    label: isAr ? 'الإثراء' : 'Enrichment',
    description: isAr 
      ? 'نُضيف معنى ومعرفة لكل زيارة لنجعلها تجربة لا تُنسى.' 
      : 'We add meaning and knowledge to every visit to make it an unforgettable experience.',
  },
  {
    icon : History,
    label: isAr ? 'الأصالة' : 'Authenticity',
    description: isAr 
      ? 'نُبرز تاريخ المكان وهويته الحقيقية ونعتز بالتراث الوطني.' 
      : 'We highlight the history and true identity of the place, taking pride in national heritage.',
  },
  {
    icon: Lightbulb,
    label: isAr ? 'الابتكار' : 'Innovation',
    description: isAr 
      ? 'ندمج التقنية لتجربة تفاعلية حديثة تجعل الوصول للمعلومة أسهل.' 
      : 'We integrate technology for a modern interactive experience that makes accessing information easier.',
  },
  {
    icon: Coffee,
    label: isAr ? 'الضيافة' : 'Hospitality',
    description: isAr 
      ? 'نُقدم تجربة تعكس كرم المجتمع السعودي وحفاوة الاستقبال.' 
      : 'We provide an experience that reflects the generosity and warm welcome of Saudi society.',
  },
  {
    icon: Target,
    label: isAr ? 'التميز' : 'Excellence',
    description: isAr 
      ? 'نلتزم بالجودة في كل تفاصيل التجربة لضمان رضا زوارنا.' 
      : 'We are committed to quality in every detail of the experience to ensure our visitors\' satisfaction.',
  },
];


  return (
    <section className="bg-white py-20 md:py-28" dir="rtl">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <h2 className="mb-16 text-center text-4xl text-[#0d5940] md:text-5xl">
          {isAr ? 'قيمنا' : 'Our Values'}
        </h2>

        {/* Values List */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-3xl border-2 border-[#e2e8f0] bg-white p-8 transition-all duration-300 hover:border-[#c9a961]"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f2ed]">
                  <Icon className="h-8 w-8 text-[#c9a961]" strokeWidth={2.5} />
                </div>
                <p className="text-center text-xl text-[#0d5940]">
                  {value.label}
                </p>
                <p className="mt-2 text-center text-lg leading-relaxed text-[#718096]">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
