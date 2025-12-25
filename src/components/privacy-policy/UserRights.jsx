
import { Trash2, Edit, BellOff, Download, UserX, RefreshCw } from 'lucide-react';

export function UserRights({ isAr }) {

  const rights = [
  {
    icon: Trash2,
    title:  isAr ? 'حذف بياناتك' : 'Delete Your Data',
    description: isAr ? 'يمكنك طلب حذف جميع بياناتك الشخصية من نظامنا في أي وقت' : 'You can request the deletion of all your personal data from our system at any time',
    action: isAr ? 'طلب الحذف' : 'Request Deletion',
  },
  {
    icon: Edit,
    title: isAr ? 'تحديث معلوماتك' : 'Update Your Information',
    description: isAr ? 'يمكنك تعديل وتحديث معلوماتك الشخصية من خلال حسابك' : 'You can edit and update your personal information through your account',
    action: isAr ? 'تحديث البيانات' : 'Update Information',
  },
  {
    icon: BellOff,
    title: isAr ? 'إيقاف الرسائل الترويجية' : 'Stop Promotional Messages',
    description: isAr ? 'يمكنك إلغاء الاشتراك من رسائل التسويق في أي وقت' : 'You can unsubscribe from marketing messages at any time',
    action: isAr ? 'إدارة الإشعارات' : 'Manage Notifications',
  },
  {
    icon: Download,
    title: isAr ? 'تحميل بياناتك' : 'Download Your Data',
    description: isAr ? 'يمكنك الحصول على نسخة من جميع بياناتك المخزنة لدينا' : 'You can obtain a copy of all your data stored with us',
    action: isAr ? 'تحميل البيانات' : 'Download Data',
  },
  {
    icon: UserX,
    title: isAr ? 'إلغاء حسابك' : 'Delete Your Account',
    description: isAr ? 'يمكنك إغلاق حسابك وحذف جميع معلوماتك نهائياً' : 'You can close your account and permanently delete all your information',
    action: isAr ? 'إلغاء الحساب' : 'Delete Account',
  },
  {
    icon: RefreshCw,
    title: isAr ? 'تحديث التفضيلات' : 'Update Preferences',
    description: isAr ? 'يمكنك التحكم في نوعية البيانات التي نجمعها عنك' : 'You can control the types of data we collect about you',
    action: isAr ? 'تخصيص الخصوصية' : 'Customize Privacy',
  },
];

  return (
    <section className="bg-[#f5f2ed] py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl text-[#0d5940] md:text-5xl">
            {isAr ? 'حقوقك في التحكم ببياناتك' : 'Your Rights to Control Your Data'}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-[#718096]">
            {isAr ? 'نؤمن بحقك الكامل في التحكم بمعلوماتك الشخصية' : 'We believe in your full right to control your personal information'}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rights.map((right, index) => {
            const Icon = right.icon;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f4f0]">
                    <Icon className="h-8 w-8 text-[#0d5940]" strokeWidth={2.5} />
                  </div>
                  <h3 className="mb-3 text-2xl text-[#0d5940]">
                    {right.title}
                  </h3>
                  <p className="mb-6 text-lg leading-relaxed text-[#4a5568]">
                    {right.description}
                  </p>
                  <button className="text-lg text-[#c9a961] transition-colors hover:text-[#0d5940]">
                    {right.action} {isAr ? '←' : '→'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Notice */}
        <div className="mt-16 rounded-3xl bg-white p-10 text-center shadow-md">
          <h3 className="mb-4 text-2xl text-[#0d5940]">
           {isAr ? 'كيف تمارس حقوقك؟' : 'How to Exercise Your Rights?'}
          </h3>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-[#4a5568]">
            {isAr ? 'لممارسة أي من حقوقك، يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني أو من خلال إعدادات حسابك. سنستجيب لطلبك خلال 7 أيام عمل.' : 'To exercise any of your rights, you can contact us directly via email or through your account settings. We will respond to your request within 7 business days.'}
          </p>
        </div>
      </div>
    </section>
  );
}
