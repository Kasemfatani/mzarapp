export interface Review {
  id: string;
  userName: string;
  avatar: string;
  date: string;
  rating: number;
  city: string;
  tourName: string;
  tourId: string;
  reviewText: string;
  helpfulCount: number;
  hasImage?: boolean;
  imageUrl?: string;
}

export const reviews: Review[] = [
  {
    id: '1',
    userName: 'عبدالله م.',
    avatar: 'https://ui-avatars.com/api/?name=Abdullah+M&background=3C6652&color=fff&size=200',
    date: '15 ديسمبر 2024',
    rating: 5,
    city: 'مكة المكرمة',
    tourName: 'جولة المعالم التاريخية في مكة',
    tourId: '1',
    reviewText: 'تجربة رائعة وممتازة! المرشد السياحي كان على دراية عالية بالتاريخ الإسلامي وقدم معلومات قيمة جداً. الجولة كانت منظمة بشكل احترافي والوقت كان مناسباً لزيارة جميع المعالم. أنصح بها بشدة لكل من يريد التعرف على تاريخ مكة المكرمة.',
    helpfulCount: 47,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1617182195886-21a605900f11?w=400',
  },
  {
    id: '2',
    userName: 'فاطمة س.',
    avatar: 'https://ui-avatars.com/api/?name=Fatima+S&background=867957&color=fff&size=200',
    date: '12 ديسمبر 2024',
    rating: 5,
    city: 'المدينة المنورة',
    tourName: 'رحلة روحانية إلى المدينة المنورة',
    tourId: '2',
    reviewText: 'من أجمل التجارب الروحانية التي مررت بها. الفريق محترف للغاية ويهتم بأدق التفاصيل. زرنا المسجد النبوي والمواقع التاريخية المهمة مع شرح وافي ومؤثر. الخدمة كانت ممتازة من البداية للنهاية.',
    helpfulCount: 38,
  },
  {
    id: '3',
    userName: 'محمد ع.',
    avatar: 'https://ui-avatars.com/api/?name=Mohammed+A&background=3C6652&color=fff&size=200',
    date: '10 ديسمبر 2024',
    rating: 5,
    city: 'مكة المكرمة',
    tourName: 'على خطى النبي في مكة',
    tourId: '3',
    reviewText: 'تجربة غنية بالمعلومات والمعرفة. المرشد أخذنا في رحلة عبر الزمن وشرح لنا قصص الأنبياء والصحابة بطريقة مشوقة. الأماكن التي زرناها كانت رائعة والتنظيم كان في القمة. شكراً لفريق مزار على هذه الرحلة الاستثنائية.',
    helpfulCount: 52,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1674313505558-206662f3de03?w=400',
  },
  {
    id: '4',
    userName: 'نورة خ.',
    avatar: 'https://ui-avatars.com/api/?name=Noura+K&background=867957&color=fff&size=200',
    date: '8 ديسمبر 2024',
    rating: 4,
    city: 'الطائف',
    tourName: 'جولة الطائف التراثية',
    tourId: '4',
    reviewText: 'جولة جميلة جداً في الطائف. استمتعت بزيارة الأسواق التقليدية والمزارع. المرشد كان لطيفاً ومتعاوناً. الوحيد الملاحظة أن الوقت كان قصيراً بعض الشيء وكنت أتمنى لو استمرت الجولة فترة أطول.',
    helpfulCount: 23,
  },
  {
    id: '5',
    userName: 'خالد ب.',
    avatar: 'https://ui-avatars.com/api/?name=Khaled+B&background=3C6652&color=fff&size=200',
    date: '5 ديسمبر 2024',
    rating: 5,
    city: 'مكة المكرمة',
    tourName: 'رحلة روحانية إلى جبل عرفة',
    tourId: '5',
    reviewText: 'زيارة جبل عرفة كانت تجربة روحانية عميقة. الوقوف في نفس المكان الذي وقف فيه النبي ﷺ شعور لا يوصف. المرشد شرح لنا أهمية المكان وقصته بشكل مؤثر. التنظيم كان رائعاً والنقل كان مريحاً.',
    helpfulCount: 65,
    hasImage: true,
    imageUrl: 'https://images.unsplash.com/photo-1759994976016-cd0799b2f480?w=400',
  },
  {
    id: '6',
    userName: 'سارة ر.',
    avatar: 'https://ui-avatars.com/api/?name=Sara+R&background=867957&color=fff&size=200',
    date: '3 ديسمبر 2024',
    rating: 5,
    city: 'المدينة المنورة',
    tourName: 'جولة المساجد السبعة',
    tourId: '6',
    reviewText: 'تجربة رائعة لزيارة المساجد السبعة. تعرفت على قصة كل مسجد وأهميته التاريخية. المرشدة كانت متمكنة جداً ولديها معلومات قيمة. أنصح كل زائر للمدينة بهذه الجولة المميزة.',
    helpfulCount: 31,
  },
  {
    id: '7',
    userName: 'أحمد ح.',
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+H&background=3C6652&color=fff&size=200',
    date: '1 ديسمبر 2024',
    rating: 4,
    city: 'مكة المكرمة',
    tourName: 'جولة المعالم التاريخية في مكة',
    tourId: '1',
    reviewText: 'جولة جيدة بشكل عام. المرشد كان يملك معلومات كثيرة لكن كان يتحدث بسرعة بعض الشيء. المواقع التي زرناها كانت مذهلة والتنظيم جيد. أتمنى لو كان هناك وقت أطول في كل موقع.',
    helpfulCount: 19,
  },
  {
    id: '8',
    userName: 'مريم د.',
    avatar: 'https://ui-avatars.com/api/?name=Mariam+D&background=867957&color=fff&size=200',
    date: '28 نوفمبر 2024',
    rating: 5,
    city: 'المدينة المنورة',
    tourName: 'رحلة روحانية إلى المدينة المنورة',
    tourId: '2',
    reviewText: 'لا توجد كلمات تصف جمال هذه التجربة. كل شيء كان مثالياً من البداية للنهاية. الفريق محترف جداً والمرشد كان رائعاً. زيارة المسجد النبوي وقبر النبي ﷺ كانت لحظات لن أنساها أبداً. جزاكم الله خيراً.',
    helpfulCount: 89,
  },
];

export const cities = [
  { id: 'all', label: 'جميع المدن' },
  { id: 'makkah', label: 'مكة المكرمة' },
  { id: 'madinah', label: 'المدينة المنورة' },
  { id: 'taif', label: 'الطائف' },
  { id: 'other', label: 'أخرى' },
];

export const tourTypes = [
  { id: 'all', label: 'جميع الجولات' },
  { id: 'historical', label: 'جولات تاريخية' },
  { id: 'spiritual', label: 'جولات روحانية' },
  { id: 'heritage', label: 'جولات تراثية' },
];

export const ratingFilters = [
  { id: 'all', label: 'جميع التقييمات', minRating: 0 },
  { id: '5-stars', label: '5 نجوم فقط', minRating: 5 },
  { id: '4-plus', label: '4 نجوم فأعلى', minRating: 4 },
  { id: '3-plus', label: '3 نجوم فأعلى', minRating: 3 },
];

export const sortOptions = [
  { id: 'newest', label: 'الأحدث' },
  { id: 'highest', label: 'الأعلى تقييمًا' },
  { id: 'helpful', label: 'الأكثر فائدة' },
];

export const ratingBreakdown = [
  { stars: 5, percentage: 78, count: 936 },
  { stars: 4, percentage: 16, count: 192 },
  { stars: 3, percentage: 4, count: 48 },
  { stars: 2, percentage: 1, count: 12 },
  { stars: 1, percentage: 1, count: 12 },
];
