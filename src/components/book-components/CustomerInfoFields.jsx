import { User, Phone, Lock } from "lucide-react";

export function CustomerInfoFields() {
  return (
    <div className="bg-white rounded-[20px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border-[0.8px] border-[rgba(243,244,246,0.6)] w-full">
      <div className="p-6 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col  ">
            <h3 className="text-[#3c6652] text-2xl tracking-[-0.24px]">معلوماتك الشخصية</h3>
            <p className="text-[#4a5565]">نحتاج بعض المعلومات لإتمام حجزك</p>
          </div>
          <div className="bg-[rgba(231,211,175,0.2)] border-[0.8px] border-[#e7d3af] rounded-full px-2 py-1">
            <p className="text-[#867957]">خطوة 2 من 2</p>
          </div>
          
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center  gap-2 px-2">
              <User className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
              <p className="text-[#364153]">الاسم الكامل</p>
              <span className="text-[#fb2c36]">*</span>
            </label>
            <input
              type="text"
              placeholder="أدخل اسمك الكامل"
              className="w-full bg-gradient-to-b from-[#f8f4ed] to-[#f5f1eb] border-[0.8px] border-[rgba(229,231,235,0.6)] rounded-[18px] px-4 py-2  placeholder:text-[#9ca3af]"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center  gap-2 px-2">
              <Phone className="w-5 h-5 text-[#867957]" strokeWidth={1.67} />
              <p className="text-[#364153]">رقم الجوال</p>
              <span className="text-[#fb2c36]">*</span>
            </label>
            <div className="relative w-full bg-gradient-to-b from-[#f8f4ed] to-[#f5f1eb] border-[0.8px] border-[rgba(229,231,235,0.6)] rounded-[18px] px-4 py-2 flex items-center  gap-4">
              <input
                type="tel"
                placeholder="05xxxxxxxx"
                className="flex-1 bg-transparent  placeholder:text-[#9ca3af] outline-none"
                dir="rtl"
              />
              <div className="flex items-center gap-2">
                <div className="h-5 w-px bg-[#9CA3AF]" />
                <p className="text-[#9ca3af]">+966</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-gradient-to-r from-[#eff6ff] to-[#eef2ff] border-[0.8px] border-[#bedbff] rounded-[18px] px-4 py-6 flex items-start  gap-2">
          <Lock className="w-5 h-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" />
          <div className="flex flex-col  ">
            <p className="text-[#193cb8]">معلوماتك في أمان تام</p>
            <p className="text-[#155dfc] text-sm">
              نحن نحترم خصوصيتك بشكل كامل. جميع البيانات مشفّرة ولن نشارك معلوماتك مع أي جهة خارجية
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
