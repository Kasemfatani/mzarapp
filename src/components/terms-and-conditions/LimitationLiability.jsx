"use client";

import { useState } from 'react';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';



export function LimitationLiability( { isAr }) {

  const liabilityItems = [
  {
    id: '1',
    title: 'حدود المسؤولية',
    content: 'لا تتحمل مزاه مسؤولية الظروف القهرية مثل الطقس السيء، الكوارث الطبيعية، أو قرارات الجهات الرسمية التي قد تؤدي إلى إلغاء أو تعديل الرحلات.',
  },
  {
    id: '2',
    title: 'مسؤولية مقدمي الخدمات',
    content: 'مزاه تعمل كوسيط بين المستخدمين ومقدمي الخدمات السياحية. المسؤولية الأساسية عن جودة الخدمة وتنفيذ الرحلة تقع على عاتق مقدم الخدمة المعني.',
  },
  {
    id: '3',
    title: 'الممتلكات الشخصية',
    content: 'لا تتحمل مزاه أو مقدمو الخدمات مسؤولية فقدان أو تلف الممتلكات الشخصية خلال الرحلات. ننصح بالحفاظ على متعلقاتك والتأمين عليها.',
  },
  {
    id: '4',
    title: 'الإصابات والحوادث',
    content: 'المشاركة في الأنشطة السياحية تكون على مسؤولية المستخدم الخاصة. يجب الالتزام بتعليمات السلامة واتباع إرشادات المرشد السياحي.',
  },
  {
    id: '5',
    title: 'التغييرات في الأسعار',
    content: 'نحتفظ بالحق في تعديل الأسعار دون إشعار مسبق، لكن السعر المؤكد عند الحجز هو السعر النهائي الذي ستدفعه.',
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
            حدود المسؤولية والإعفاءات
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            معلومات مهمة عن نطاق مسؤوليتنا والحالات الاستثنائية
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
                  className="flex w-full items-center justify-between gap-6 px-8 py-6 text-right"
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
                        <p className="text-xl leading-relaxed text-[#4a5568]">
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
            💬 <strong>نحن هنا لمساعدتك:</strong> في حال حدوث أي مشكلة، فريق الدعم متاح للمساعدة في حل أي نزاع أو استفسار
          </p>
        </div>
      </div>
    </section>
  );
}
