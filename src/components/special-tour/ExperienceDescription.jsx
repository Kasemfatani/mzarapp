'use client'
import React from 'react';

export default function ExperienceDescription() {
  return (
    <section className="experience-description py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primaryColor">عن التجربة</h2>
          <p className="text-xl leading-relaxed mb-6">
            يسرنا في تطبيق مزار دعوتكم إلى رحلة معرفية استثنائية لاكتشاف المعالم التاريخية لمكة المكرمة من قمة أبراج الساعة، 
            حيث يلتقي الماضي العريق بالحاضر التقني لتصنعوا معنا لحظات لا تُنسى.
          </p>
          <p className="text-xl leading-relaxed">
            انضموا إلينا في هذه التجربة المثرية التي تمتزج فيها الحكايات المنسوجة من عبق التاريخ أمام الكعبة المشرفة مع التقنيات التفاعلية الحديثة
          </p>
        </div>
      </div>
    </section>
  );
}

