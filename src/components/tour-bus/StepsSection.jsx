"use client";
import React from "react";

const steps = [
  {
    icon: (
      <div className="bg-[var(--second-bg)] p-4 rounded-lg">
        <img src="/tour-bus/zoom.png" alt="zoom" />
      </div>
    ),
    ar: (
      <>
        التقط أجمل اللحظات
        <br />
        وشاركها مع وسم
        <br />
        #جولات_مزار
      </>
    ),
    en: (
      <>
        Capture your best moments
        <br />
        and share with
        <br />
        #Mzar_Tours
      </>
    ),
  },
  {
    icon: (
      <div className="bg-[var(--sec-color)] p-4 rounded-lg">
        <img src="/tour-bus/hand.png" alt="hand" />
      </div>
    ),
    ar: (
      <>
        استمتع للقصص بلغتك عند
        <br />
        كل معلم.
      </>
    ),
    en: (
      <>
        Listen to stories in your language
        <br />
        at every landmark.
      </>
    ),
  },
  {
    icon: (
      <div className="bg-[var(--second-bg)] p-4 rounded-lg">
        <img src="/tour-bus/building.png" alt="building" />
      </div>
    ),
    ar: (
      <>
        التحق بالباص من أقرب
        <br />
        نقطة تجمع.
      </>
    ),
    en: (
      <>
        Join the bus from the
        <br />
        nearest gathering point.
      </>
    ),
  },
  {
    icon: (
      <div className="bg-[var(--sec-color)] p-4 rounded-lg">
        <img src="/tour-bus/building.png" alt="building" />
      </div>
    ),
    ar: (
      <>
        احجز جولتك عبر تطبيق
        <br />
        "مزار" أو من الفندق.
      </>
    ),
    en: (
      <>
        Book your tour via the
        <br />
        "Mzar" app or from the hotel.
      </>
    ),
  },
];

export default function StepsSection({ initialLang = "ar" }) {
  const isAr = initialLang === "ar";
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
          {isAr
            ? "أربع خطوات بسيطة لتبدأ رحلتك"
            : "Four simple steps to start your journey"}
        </h2>
        <div
          className={`flex flex-col md:flex-row   items-center md:items-start  justify-between gap-10 md:gap-0 relative`}
        >
          {steps.map((step, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div className="mb-4">{step.icon}</div>
              <div
                className={`text-center text-gray-900 font-medium text-base md:text-lg leading-snug ${
                  isAr ? "md:min-h-[72px]" : "md:min-h-[56px]"
                }`}
              >
                {isAr ? step.ar : step.en}
              </div>
              
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <span className="bg-[#8B7B5A] text-white rounded-lg px-8 py-3 text-base md:text-lg text-center font-semibold">
            {isAr
              ? "التقِ بالمكان حيث حدثت القصة"
              : "Meet the place where the story happened"}
          </span>
        </div>
      </div>
    </section>
  );
}