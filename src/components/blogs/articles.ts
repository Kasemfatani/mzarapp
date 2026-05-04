export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  views: number;
  image: string;
  featured?: boolean;
  trending?: boolean;
}

export const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'mecca-history', label: 'تاريخ مكة' },
  { id: 'medina-history', label: 'تاريخ المدينة' },
  { id: 'haramain', label: 'الحرمين' },
  { id: 'umrah-hajj', label: 'العمرة والحج' },
  { id: 'islamic-landmarks', label: 'معالم إسلامية' },
  { id: 'visitor-tips', label: 'نصائح الزائر' },
  { id: 'mzar-experiences', label: 'تجارب مزار' },
];

export const articles: Article[] = [
  {
    id: '1',
    title: '10 معالم في مكة لا يعرف قصتها كثيرون',
    excerpt: 'اكتشف القصص المخفية وراء أشهر المعالم في مكة المكرمة، من جبل النور إلى مقام إبراهيم، وتعرف على التاريخ العميق الذي يربط هذه الأماكن بالإسلام.',
    category: 'تاريخ مكة',
    readTime: 5,
    views: 12500,
    image: 'mecca-landmarks',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: 'رحلة في تاريخ المسجد النبوي',
    excerpt: 'من بنائه الأول في عهد النبي محمد ﷺ إلى توسعاته الحديثة، تعرف على تاريخ أحد أقدس المساجد في الإسلام.',
    category: 'تاريخ المدينة',
    readTime: 7,
    views: 9800,
    image: 'medina-mosque',
    featured: true,
  },
  {
    id: '3',
    title: 'دليل المعتمر الشامل: خطوة بخطوة',
    excerpt: 'كل ما تحتاج معرفته قبل وأثناء رحلة العمرة، من التحضيرات إلى الأدعية والمناسك.',
    category: 'العمرة والحج',
    readTime: 10,
    views: 15200,
    image: 'umrah-guide',
    featured: true,
    trending: true,
  },
  {
    id: '4',
    title: 'غار حراء: مكان نزول الوحي',
    excerpt: 'تعرف على أهمية غار حراء التاريخية والروحانية، وكيف يمكنك زيارته اليوم.',
    category: 'معالم إسلامية',
    readTime: 4,
    views: 8500,
    image: 'hira-cave',
    trending: true,
  },
  {
    id: '5',
    title: 'نصائح ذهبية للزائر الأول للحرمين',
    excerpt: 'إرشادات عملية ونصائح من خبراء السياحة الدينية لجعل زيارتك أكثر راحة وروحانية.',
    category: 'نصائح الزائر',
    readTime: 6,
    views: 11000,
    image: 'visitor-tips',
  },
  {
    id: '6',
    title: 'مسجد قباء: أول مسجد في الإسلام',
    excerpt: 'تعرف على قصة بناء مسجد قباء وفضل الصلاة فيه كما ورد في السنة النبوية.',
    category: 'تاريخ المدينة',
    readTime: 5,
    views: 7200,
    image: 'quba-mosque',
  },
  {
    id: '7',
    title: 'تجربة الطواف في الأوقات الهادئة',
    excerpt: 'اكتشف أفضل الأوقات لأداء الطواف بخشوع وهدوء، مع نصائح من زوار متكررين.',
    category: 'تجارب مزار',
    readTime: 4,
    views: 6800,
    image: 'tawaf-experience',
  },
  {
    id: '8',
    title: 'معالم طريق الهجرة النبوية',
    excerpt: 'رحلة تاريخية على خطى الهجرة النبوية من مكة إلى المدينة، والمعالم الموجودة حتى اليوم.',
    category: 'تاريخ مكة',
    readTime: 8,
    views: 9400,
    image: 'hijra-path',
    trending: true,
  },
  {
    id: '9',
    title: 'الروضة الشريفة: فضلها وآدابها',
    excerpt: 'دليل شامل للروضة الشريفة في المسجد النبوي، مع الأدعية المستحبة وآداب الزيارة.',
    category: 'الحرمين',
    readTime: 5,
    views: 13500,
    image: 'rawdah',
  },
  {
    id: '10',
    title: 'جبل أحد: شاهد على غزوة تاريخية',
    excerpt: 'تعرف على أحداث غزوة أحد وأهمية هذا الجبل في التاريخ الإسلامي.',
    category: 'معالم إسلامية',
    readTime: 6,
    views: 8900,
    image: 'uhud-mountain',
  },
  {
    id: '11',
    title: 'كيف تستعد روحانياً قبل زيارة الحرمين',
    excerpt: 'نصائح لتهيئة النفس والقلب قبل السفر إلى أطهر بقاع الأرض.',
    category: 'نصائح الزائر',
    readTime: 5,
    views: 7600,
    image: 'spiritual-preparation',
  },
  {
    id: '12',
    title: 'مقابر البقيع: تاريخ ومكانة',
    excerpt: 'تعرف على أهمية البقيع كمقبرة لكثير من الصحابة وآل البيت.',
    category: 'تاريخ المدينة',
    readTime: 4,
    views: 6200,
    image: 'baqi-cemetery',
  },
];
