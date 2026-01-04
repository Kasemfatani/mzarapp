"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';



export function FAQAccordion({ faqs, activeCategory, searchQuery , isAr }) {
  const [openId, setOpenId] = useState(null);

  // Filter FAQs
  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (filteredFAQs.length === 0) {
    return (
      <section className="bg-white py-10">
        <div className="container mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-2xl text-[#718096]">
             {isAr ? "لم يتم العثور على نتائج مطابقة لبحثك" : "No matching results found for your search"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10" >
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-3xl border-2 border-[#e2e8f0] bg-white transition-all duration-300 hover:border-[#c9a961] hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-start justify-between gap-6 px-8 py-6 transition-colors"
                >
                  <h3 className=" text-2xl text-[#0d5940]">
                    {faq.question}
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
                          {faq.answer}
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
