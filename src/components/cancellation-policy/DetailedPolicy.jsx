"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { is } from 'date-fns/locale';



export function DetailedPolicy({ isAr }) {
  const [openId, setOpenId] = useState('1');

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };


  
const policyItems = [
  {
    id: '1',
    question: isAr ? 'متى يمكنني الإلغاء؟' : 'When can I cancel?',
    answer: isAr ? 'يمكنك إلغاء حجزك قبل موعد الرحلة بـ 24 ساعة على الأقل دون أي رسوم إضافية. سيتم استرجاع المبلغ كاملاً إلى نفس وسيلة الدفع التي استخدمتها.' : 'You can cancel your booking at least 24 hours before the trip without any additional fees. The full amount will be refunded to the same payment method you used.',
  },
  {
    id: '2',
    question: isAr ? 'ماذا يحدث إذا ألغيت متأخرًا؟' : 'What happens if I cancel late?',
    answer: isAr ? 'في حال الإلغاء خلال أقل من 24 ساعة من موعد الرحلة، قد لا يكون الاسترجاع متاحًا أو قد يتم خصم رسوم إدارية تصل إلى 50% من قيمة الحجز. الإلغاء في يوم الرحلة نفسه لا يشمل استرجاع المبلغ.' : 'If you cancel less than 24 hours before the trip, a refund may not be available or an administrative fee of up to 50% of the booking value may be deducted. Cancellation on the day of the trip itself does not include a refund.',
  },
  {
    id: '3',
    question: isAr ? 'هل توجد رحلات غير قابلة للإلغاء؟' : 'Are there non-refundable trips?',
    answer: isAr ? 'بعض التجارب الخاصة أو الجولات الجماعية المحدودة قد تخضع لشروط إلغاء مختلفة. يتم توضيح سياسة الإلغاء الخاصة بكل رحلة بوضوح في صفحة الحجز قبل إتمام عملية الدفع.' : 'Some private experiences or limited group tours may be subject to different cancellation terms. The cancellation policy for each trip is clearly stated on the booking page before completing the payment.',
  },
  {
    id: '4',
    question: isAr ? 'كم من الوقت يستغرق استرجاع المبلغ؟' : 'How long does it take to refund?',
    answer: isAr ? 'بعد تأكيد الإلغاء، يتم استرجاع المبلغ خلال 5–7 أيام عمل إلى نفس وسيلة الدفع. قد يستغرق ظهور المبلغ في حسابك البنكي وقتًا إضافيًا حسب سياسة البنك الخاص بك.' : 'After cancellation is confirmed, the amount is refunded within 5–7 business days to the same payment method. It may take additional time for the amount to appear in your bank account depending on your bank\'s policy.',
  },
  {
    id: '5',
    question: isAr ? 'هل يمكنني تعديل الحجز بدلاً من الإلغاء؟' : 'Can I modify my booking instead of canceling?',
    answer: isAr ? 'نعم، يمكنك تعديل تاريخ الحجز أو عدد الأشخاص قبل موعد الرحلة بـ 48 ساعة على الأقل من خلال التواصل مع فريق الدعم. التعديلات متاحة حسب توفر الأماكن.' : 'Yes, you can modify the booking date or the number of people at least 48 hours before the trip by contacting the support team. Modifications are subject to availability.',
  },
  {
    id: '6',
    question: isAr ? 'ماذا يحدث إذا ألغت مزاه الرحلة؟' : 'What happens if Mzar cancels the trip?',
    answer: isAr ? 'في حال اضطرت مزاه لإلغاء الرحلة لأي سبب (ظروف جوية، أعطال تقنية)، سيتم استرجاع المبلغ كاملاً بدون أي خصومات، أو يمكنك إعادة الجدولة لموعد آخر بدون رسوم إضافية.' : 'If Mzar has to cancel the trip for any reason (weather conditions, technical issues), the full amount will be refunded without any deductions, or you can reschedule for another date without additional fees.',
  },
  {
    id: '7',
    question: isAr ? 'هل يمكنني إلغاء جزء من الحجز فقط؟' : 'Can I cancel only part of the booking?',
    answer: isAr ? 'نعم، إذا قمت بالحجز لعدة أشخاص، يمكنك إلغاء بعض المقاعد قبل موعد الرحلة بـ 24 ساعة. سيتم احتساب الاسترجاع بناءً على عدد المقاعد الملغاة.' : 'Yes, if you have booked for multiple people, you can cancel some seats at least 24 hours before the trip. The refund will be calculated based on the number of seats canceled.',
  },
  {
    id: '8',
    question: isAr ? 'هل تُسترد الرسوم الإدارية؟' : 'Are administrative fees refundable?',
    answer: isAr ? 'في حال الإلغاء المجاني (قبل 24 ساعة)، يتم استرجاع المبلغ كاملاً بدون أي خصومات. لا توجد رسوم إدارية مخفية في حال التزامك بشروط الإلغاء.' : 'In the case of free cancellation (before 24 hours), the full amount is refunded without any deductions. There are no hidden administrative fees if you comply with the cancellation terms.',
  },
];

  return (
    <section className="bg-[#f5f2ed] py-20 md:py-32">
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
            {isAr ? 'التفاصيل الكاملة' : 'Detailed Information'}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-[#718096]">
            {isAr ? 'كل ما تحتاج معرفته عن سياسة الإلغاء والاسترجاع' : 'Everything you need to know about the cancellation and refund policy'}
          </p>
        </div>

        <div className="space-y-4">
          {policyItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border-2 border-transparent bg-white transition-all duration-300 hover:border-[#c9a961] hover:shadow-lg"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-start justify-between gap-6 px-8 py-6 text-start"
                >
                  <h3 className="flex-1 text-2xl text-[#0d5940]">
                    {item.question}
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
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
