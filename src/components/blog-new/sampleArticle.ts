export interface ArticleDetail {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  readTime: number;
  publishDate: string;
  views: number;
  featuredImage: string;
  content: ArticleContent[];
  author: {
    name: string;
    avatar: string;
    description: string;
  };
}

export interface ArticleContent {
  type: 'paragraph' | 'heading2' | 'heading3' | 'highlight' | 'list' | 'image';
  content: string | string[];
  caption?: string;
}

export const sampleArticle: ArticleDetail = {
  id: '1',
  category: 'تاريخ مكة',
  title: '10 معالم في مكة لا يعرف قصتها كثيرون',
  subtitle: 'رحلة عبر الزمن لاكتشاف الأماكن التي صنعت تاريخ المدينة المقدسة',
  readTime: 6,
  publishDate: '12 مارس 2025',
  views: 8430,
  featuredImage: 'mecca-landmarks',
  content: [
    {
      type: 'paragraph',
      content: 'مكة المكرمة ليست فقط قبلة المسلمين ومهوى أفئدتهم، بل هي أيضًا متحف تاريخي مفتوح يحكي قصص الأنبياء والصحابة والحضارات التي مرت على هذه البقعة المباركة. في هذا المقال، نأخذكم في رحلة استكشافية لعشرة معالم قد تمر عليها دون أن تعرف القصة العظيمة التي تحملها.',
    },
    {
      type: 'heading2',
      content: '1. جبل النور وغار حراء',
    },
    {
      type: 'paragraph',
      content: 'على ارتفاع 642 متراً عن سطح البحر، يقف جبل النور شامخاً يحمل في قمته غار حراء، المكان الذي نزل فيه الوحي على النبي محمد ﷺ لأول مرة. كان النبي يعتزل في هذا الغار للتعبد والتفكر في خلق الله، وهنا بدأت رسالة الإسلام.',
    },
    {
      type: 'highlight',
      content: 'معلومة سريعة: المسافة من قاعدة الجبل إلى الغار تستغرق حوالي ساعتين سيراً على الأقدام، ويُنصح بارتداء أحذية مريحة والصعود في الصباح الباكر أو المساء.',
    },
    {
      type: 'heading2',
      content: '2. مقام إبراهيم',
    },
    {
      type: 'paragraph',
      content: 'الحجر الذي وقف عليه نبي الله إبراهيم عليه السلام أثناء بناء الكعبة المشرفة. لا يزال أثر قدميه ظاهراً على الحجر إلى يومنا هذا، وهي معجزة باقية تشهد على عظمة هذا المكان. يقع المقام اليوم في مبنى زجاجي أمام باب الكعبة.',
    },
    {
      type: 'heading2',
      content: '3. بئر زمزم',
    },
    {
      type: 'paragraph',
      content: 'بئر مباركة تفجرت بأمر الله تحت قدمي إسماعيل عليه السلام وهو رضيع، عندما تركه والده إبراهيم مع أمه هاجر في هذا الوادي الجاف. لا تزال البئر تتدفق بالماء المبارك منذ آلاف السنين، ويشرب منها ملايين المسلمين سنوياً.',
    },
    {
      type: 'list',
      content: [
        'عمق البئر: حوالي 30 متراً',
        'يضخ البئر ما بين 11 إلى 18.5 لتراً من الماء في الثانية',
        'تم تحليل ماء زمزم علمياً ووجد أنه غني بالمعادن المفيدة',
      ],
    },
    {
      type: 'heading2',
      content: '4. جبل الرحمة (عرفة)',
    },
    {
      type: 'paragraph',
      content: 'الموقع الذي وقف فيه النبي محمد ﷺ في حجة الوداع وألقى خطبته الشهيرة. يقع الجبل في مشعر عرفات، وهو أهم ركن من أركان الحج. يبلغ ارتفاعه حوالي 70 متراً، وعليه علامة بيضاء مميزة.',
    },
    {
      type: 'heading2',
      content: '5. مسجد الجن (مسجد البيعة)',
    },
    {
      type: 'paragraph',
      content: 'يقع في منطقة الحجون بمكة، وسمي بهذا الاسم لأن النبي ﷺ قرأ القرآن على الجن في هذا المكان. كما شهد هذا الموقع بيعة العقبة الأولى والثانية التي كانت من أهم الأحداث قبل الهجرة النبوية.',
    },
    {
      type: 'heading2',
      content: '6. مسجد التنعيم (مسجد عائشة)',
    },
    {
      type: 'paragraph',
      content: 'أقرب نقطة في الحل (خارج حدود الحرم) إلى الكعبة. سمي بمسجد عائشة لأن أم المؤمنين عائشة رضي الله عنها أحرمت منه بأمر النبي ﷺ للعمرة. اليوم، يستخدمه كثير من المعتمرين كميقات للإحرام بالعمرة.',
    },
  ],
  author: {
    name: 'فريق مزار',
    avatar: 'https://ui-avatars.com/api/?name=Mzar+Team&background=3C6652&color=fff&size=200',
    description: 'باحثون متخصصون في التاريخ الإسلامي والمعالم المكية والمدنية',
  },
};

export interface Trip {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
}

export const relatedTrips: Trip[] = [
  {
    id: '1',
    title: 'جولة المعالم التاريخية في مكة',
    description: 'زيارة شاملة لجبل النور، غار حراء، وأهم المعالم التاريخية',
    image: 'mecca-tour',
    price: 250,
    rating: 4.8,
    reviewCount: 156,
    duration: '4 ساعات',
  },
  {
    id: '2',
    title: 'رحلة روحانية إلى جبل عرفة',
    description: 'تجربة خاصة لزيارة جبل الرحمة والتعرف على تاريخ الحج',
    image: 'arafat-tour',
    price: 180,
    rating: 4.9,
    reviewCount: 203,
    duration: '3 ساعات',
  },
  {
    id: '3',
    title: 'على خطى النبي في مكة',
    description: 'رحلة تفصيلية لأماكن السيرة النبوية والمواقع المباركة',
    image: 'prophetic-tour',
    price: 300,
    rating: 5.0,
    reviewCount: 98,
    duration: '6 ساعات',
  },
];
