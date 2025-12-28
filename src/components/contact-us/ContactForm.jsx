"use client";

import { useState } from 'react';
import { Send, Shield } from 'lucide-react';


export function ContactForm( { isAr }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-[#f5f2ed] py-20 md:py-28" >
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Right: Form */}
          <div className="order-2 lg:order-1">
            <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
              أرسل لنا رسالة
            </h2>
            <p className="mb-10 text-xl text-[#718096]">
              املأ النموذج وسنقوم بالرد عليك في أسرع وقت.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block text-xl text-[#4a5568]">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-xl text-[#4a5568]">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
                  placeholder="example@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="mb-2 block text-xl text-[#4a5568]">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
                  placeholder="+966 5XX XXX XXX"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label htmlFor="inquiryType" className="mb-2 block text-xl text-[#4a5568]">
                  نوع الاستفسار
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
                >
                  <option value="">اختر نوع الاستفسار</option>
                  <option value="tour">استفسار عن رحلة</option>
                  <option value="booking">مشكلة في الحجز</option>
                  <option value="suggestion">اقتراح</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-2 block text-xl text-[#4a5568]">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full resize-none rounded-2xl border-2 border-[#e2e8f0] bg-white px-6 py-4 text-xl text-[#1a1a1a] transition-colors focus:border-[#c9a961] focus:outline-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#0d5940] px-8 py-5 text-xl text-white transition-all duration-300 hover:bg-[#116149] hover:shadow-xl"
              >
                <span>إرسال الرسالة</span>
                <Send className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Privacy Note */}
              <div className="flex items-center justify-center gap-2 text-center">
                <Shield className="h-5 w-5 text-[#c9a961]" />
                <p className="text-lg text-[#718096]">
                  جميع بياناتك محفوظة بسرية تامة
                </p>
              </div>
            </form>
          </div>

          {/* Left: Illustration */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1709715357479-591f9971fb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cHBvcnQlMjBoZWxwfGVufDF8fHx8MTc2NTg3OTM1MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="دعم العملاء"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
