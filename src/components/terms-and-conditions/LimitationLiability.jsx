"use client";

import { useState } from 'react';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';



export function LimitationLiability( { isAr }) {

  const liabilityItems = [
  {
    id: '1',
    title: isAr ? 'حدود المسؤولية' : 'Limitation of Liability',
    content: isAr ? 'تبذل مزار أقصى الجهود لتقديم خدماتها بأعلى جودة، لكنها غير مسؤولة عن أي أضرار أو خسائر تنشأ نتيجة أحداث خارجة عن إرادتها مثل الأعطال التقنية، أو الظروف الجوية، أو القرارات التنظيمية الطارئة. ' : 'Mzar makes every effort to provide its services at the highest quality, but it is not responsible for any damages or losses resulting from events beyond its control such as technical failures, weather conditions, or emergency regulatory decisions.',
  },
  {
    id: '2',
    title:  isAr ? 'مسؤولية مقدمي الخدمات' : 'Service Providers Liability',
    content: isAr ? 'تتولى مزار تنظيم وإدارة الرحلات والتجارب السياحية بشكل مباشر من خلال فريقها وشركائها المعتمدين، لضمان تقديم خدمات عالية الجودة تلبي تطلعات الزوار. \n\n جميع مقدمي الخدمات (من مرشدين وسائقين ومنظمين) يعملون تحت إشراف مزار وبما يتوافق مع المعايير المعتمدة لضمان تجربة آمنة وموثوقة. ' : 'Mzar directly organizes and manages trips and tourist experiences through its team and accredited partners to ensure high-quality services that meet visitors\' expectations. \n\n All service providers (guides, drivers, organizers) operate under Mzar\'s supervision and in accordance with approved standards to ensure a safe and reliable experience.',
  },
  {
    id: '3',
    title: isAr ? 'الممتلكات الشخصية' : 'Personal Property',
    content: isAr ? 'لا تتحمل مزار أو شركاؤها أي مسؤولية عن فقدان أو تلف الممتلكات الشخصية أثناء الرحلات أو الجولات، لذا يُنصح بالحفاظ على المقتنيات الثمينة بعناية. ' : 'Mzar and its partners are not responsible for any loss or damage to personal property during trips or tours, so it is advised to take care of valuable belongings carefully.',
  },
  {
    id: '4',
    title: isAr ? 'الإصابات والحوادث' : 'Injuries and Accidents',
    content: isAr ? 'تولي مزار سلامة زوارها أولوية قصوى، وتلتزم بتطبيق جميع معايير الأمن والسلامة خلال الرحلات والجولات. \n\n وفي حال وقوع أي حادث أو طارئ، تتعامل مزار مع الموقف مباشرة عبر فرقها المختصة، وتقدّم الدعم اللازم وفق الإجراءات النظامية المعتمدة في المملكة العربية السعودية. ' : 'Mzar prioritizes the safety of its visitors and adheres to all security and safety standards during trips and tours. \n\n In the event of any accident or emergency, Mzar directly handles the situation through its specialized teams and provides the necessary support according to the approved regulatory procedures in the Kingdom of Saudi Arabia.',
  },
  {
    id: '5',
    title: isAr ? 'التغييرات في الأسعار' : 'Price Changes',
    content: isAr ? 'قد تتغير الأسعار بناءً على الظروف التشغيلية أو تكاليف مقدمي الخدمات أو الضرائب الحكومية. \n\n تبذل مزار جهدها لإخطار المستخدمين مسبقاً بأي تعديل في الأسعار قبل تأكيد الحجز. ' : 'Prices may change based on operational conditions, service provider costs, or government taxes. \n\n Mzar makes every effort to notify users in advance of any price adjustments before booking confirmation.',
  },
];

  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#f5f2ed] py-20 md:py-32" >
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#c9a961]">
            <AlertTriangle className="h-10 w-10 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
           {isAr ? "حدود المسؤولية والإعفاءات" : "Limitation of Liability and Disclaimers"}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            {isAr ? "معلومات مهمة عن نطاق مسؤوليتنا والحالات الاستثنائية" : "Important information about the scope of our liability and exceptional cases"}
          </p>
        </div>

        <div className="space-y-4">
          {liabilityItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border-2 border-transparent bg-white transition-all duration-300 hover:border-[#c9a961] hover:shadow-lg"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between gap-6 px-8 py-6 text-start"
                >
                  <h3 className="flex-1 text-2xl text-[#0d5940]">
                    {item.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-7 w-7 text-[#c9a961]" strokeWidth={2.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="border-t-2 border-[#f5f2ed] px-8 pb-8 pt-6">
                        <p className="text-xl leading-relaxed text-[#4a5568]" style={{ whiteSpace: "pre-line" }}>
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 rounded-3xl bg-white p-8 text-center shadow-md">
          <p className="text-xl leading-relaxed text-[#4a5568]">
            💬 <strong>{isAr ? "نحن هنا لمساعدتك:" : "We're here to help:"}</strong>  {isAr ? "في حال واجهت أي مشكلة أو استفسار، فريق الدعم متاح دائماً لمساعدتك في حل النزاعات أو تقديم الدعم الفني والإجرائي." : "If you encounter any issues or inquiries, our support team is always available to assist you in resolving disputes or providing technical and procedural support."}
          </p>
        </div>
      </div>
    </section>
  );
}
