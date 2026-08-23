/**
 * Centralized, verified Umrah Packages Data Model
 * Based directly on the official Mzar 8-page PDF brochure.
 */

export const umrahPackagesData = [
  // -------------------------------------------------------------
  // 1. باقة السيرة (Al-Seerah Package) - 7 Nights / 8 Days
  // -------------------------------------------------------------
  {
    id: "106",
    slug: "seerah",
    legacyIds: ["1", "106", "seerah", "seerah-plus"],
    name: "باقة السيرة",
    nameEn: "Al-Seerah Package",
    tag: "رحلة مركزة",
    tagEn: "Focused Journey",
    kicker: "7 ليالٍ من السيرة والمعرفة",
    kickerEn: "7 Nights of Seerah & Heritage",
    duration: "7 ليالٍ / 8 أيام",
    durationEn: "7 Nights / 8 Days",
    daysCount: 8,
    nightsCount: 7,
    makkahNights: "5 ليالٍ في مكة",
    makkahNightsEn: "5 Nights in Makkah",
    madinahNights: "ليلتان في المدينة",
    madinahNightsEn: "2 Nights in Madinah",
    arrival: "الوصول عبر مطار جدة",
    arrivalEn: "Arrival via Jeddah Airport",
    departure: "المغادرة من مطار المدينة أو جدة",
    departureEn: "Departure via Madinah or Jeddah Airport",
    pricingBase: "العدد الأساسي للتسعير: 3 أشخاص",
    pricingBaseEn: "Base pricing: 3 persons",
    description:
      "برنامج يجمع بين أداء العمرة وزيارة أبرز معالم مكة المكرمة والمدينة المنورة.",
    descriptionEn:
      "A focused program combining Umrah performance with iconic landmark visits in Makkah and Madinah.",
    extraCity: "مسار المشاعر",
    extraCityEn: "Holy Sites Trail",

    // Catalog highlights (3 distinct bullet points matching HTML)
    highlights: [
      "جولة مسار المشاعر المقدسة",
      "جولة المسجد الحرام ووادي ذي طوى",
      "الجولة الإثرائية وجولة المسجد النبوي",
    ],
    highlightsEn: [
      "Holy Sites Trail Tour",
      "Grand Mosque & Wadi Dhi Tuwa Tour",
      "Madinah Heritage & Prophet's Mosque Tour",
    ],

    // Pricing matrix (SAR per person, VAT included, based on 3 persons)
    pricing: {
      madinah: {
        standard: 1579,
        plus: 2582,
      },
      jeddah: {
        standard: 1779,
        plus: 2782,
      },
    },

    // Journey route stops
    routeStops: [
      { name: "مطار جدة", nameEn: "Jeddah Airport" },
      { name: "مكة المكرمة", nameEn: "Makkah Al-Mukarramah", isMajor: true },
      { name: "المدينة المنورة", nameEn: "Madinah Al-Munawwarah", isMajor: true },
      { name: "مطار المدينة أو جدة", nameEn: "Madinah or Jeddah Airport" },
    ],

    // Package Comparison Attributes (مقارنة الباقتين)
    comparison: [
      {
        feature: "النقل والجولات",
        featureEn: "Transfers & Tours",
        standard: "✓ مشمولة",
        standardEn: "✓ Included",
        plus: "✓ مشمولة",
        plusEn: "✓ Included",
      },
      {
        feature: "جولات الحرمين الإثرائية",
        featureEn: "Two Holy Mosques Tours",
        standard: "✓ مشمولة",
        standardEn: "✓ Included",
        plus: "✓ مشمولة",
        plusEn: "✓ Included",
      },
      {
        feature: "المرافق والإرشاد الرقمي",
        featureEn: "Host & Digital Guide",
        standard: "✓ مشمول",
        standardEn: "✓ Included",
        plus: "✓ مشمول",
        plusEn: "✓ Included",
      },
      {
        feature: "الإقامة الفندقية",
        featureEn: "Hotel Accommodation",
        standard: "غير مشمولة",
        standardEn: "Not Included",
        plus: "✓ مشمولة (4 نجوم)",
        plusEn: "✓ Included (4-Star)",
      },
      {
        feature: "توزيع الغرف",
        featureEn: "Room Distribution",
        standard: "غير مشمول",
        standardEn: "Not Included",
        plus: "غرفة ثلاثية",
        plusEn: "Triple Room",
      },
      {
        feature: "نقل ترددي للحرم",
        featureEn: "Haram Shuttle Service",
        standard: "غير مشمول",
        standardEn: "Not Included",
        plus: "✓ مشمول (بحسب الفندق)",
        plusEn: "✓ Included (per hotel)",
      },
    ],

    // 8-Day Daily Itinerary (البرنامج اليومي)
    itinerary: [
      {
        dayNum: 1,
        day: "الأول",
        dayEn: "Day 1",
        title: "الاستقبال من مطار جدة والنقل إلى مكة",
        titleEn: "Reception at Jeddah Airport & private transfer to Makkah hotel",
        type: "transfer",
      },
      {
        dayNum: 2,
        day: "الثاني",
        dayEn: "Day 2",
        title: "أداء العمرة والراحة",
        titleEn: "Performing Umrah & rest",
        type: "free",
      },
      {
        dayNum: 3,
        day: "الثالث",
        dayEn: "Day 3",
        title: "جولة مسار المشاعر المقدسة",
        titleEn: "Holy Sites Trail Tour (Hira Cultural District & Revelation Exhibition)",
        type: "tour",
      },
      {
        dayNum: 4,
        day: "الرابع",
        dayEn: "Day 4",
        title: "جولة المسجد الحرام",
        titleEn: "Grand Mosque Guided Tour with certified guide",
        type: "tour",
      },
      {
        dayNum: 5,
        day: "الخامس",
        dayEn: "Day 5",
        title: "جولة معالم وادي ذي طوى",
        titleEn: "Wadi Dhi Tuwa Landmarks Tour & Architecture Exhibition",
        type: "tour",
      },
      {
        dayNum: 6,
        day: "السادس",
        dayEn: "Day 6",
        title: "النقل الخاص من مكة إلى المدينة المنورة",
        titleEn: "Private transfer from Makkah to Madinah",
        type: "transfer",
      },
      {
        dayNum: 7,
        day: "السابع",
        dayEn: "Day 7",
        title: "الجولة الإثرائية بالمدينة وجولة المسجد النبوي",
        titleEn: "Madinah Seerah Tour (Bustan Al-Mustazall) & Prophet's Mosque Tour",
        type: "tour",
      },
      {
        dayNum: 8,
        day: "الثامن",
        dayEn: "Day 8",
        title: "التوديع إلى مطار المدينة أو جدة",
        titleEn: "Farewell transfer to Madinah or Jeddah Airport",
        type: "transfer",
      },
    ],

    // Included Experiences & Tours (التجارب والجولات المشمولة)
    experiences: [
      {
        title: "جولة مسار المشاعر المقدسة",
        titleEn: "Holy Sites Trail Tour",
        badge: "صباحية · 4 ساعات",
        badgeEn: "Morning · 4 Hours",
        desc: "جولة إثرائية لمدة 4 ساعات تمر بأبرز المواقع التاريخية والمشاعر المقدسة وتنتهي في حي حراء الثقافي — تشمل تذكرة دخول معرض الوحي.",
        descEn: "4-hour enriching tour covering major historical and sacred sites, concluding at Hira Cultural District including entry to Revelation Exhibition.",
      },
      {
        title: "جولة المسجد الحرام",
        titleEn: "Grand Mosque Guided Tour",
        badge: "مسائية · 90 دقيقة",
        badgeEn: "Evening · 90 Mins",
        desc: "جولة مسائية لمدة 90 دقيقة برفقة مرشد سياحي مرخص، وبترخيص من الهيئة العامة للعناية بالحرمين، لا تتضمن النقل إلى المسجد الحرام.",
        descEn: "90-minute evening tour with a licensed guide authorized by the General Authority for the Care of the Two Holy Mosques (excludes transport to the mosque).",
      },
      {
        title: "جولة معالم وادي ذي طوى",
        titleEn: "Wadi Dhi Tuwa Landmarks Tour",
        badge: "صباحية · 4 ساعات",
        badgeEn: "Morning · 4 Hours",
        desc: "جولة صباحية لمدة 4 ساعات تمر بأبرز المواقع التاريخية القريبة من المسجد الحرام وتنتهي بدخول معرض عمارة الحرمين الشريفين.",
        descEn: "4-hour morning tour exploring key heritage sites near the Grand Mosque, concluding at the Two Holy Mosques Architecture Exhibition.",
      },
      {
        title: "الجولة الإثرائية في المدينة المنورة",
        titleEn: "Madinah Heritage & Seerah Tour",
        badge: "صباحية · 4 ساعات",
        badgeEn: "Morning · 4 Hours",
        desc: "جولة صباحية لمدة 4 ساعات تمر بأبرز المواقع المرتبطة بسيرة الرسول ﷺ — تشمل تذاكر دخول بستان المستظل ومتحف السيرة في قباء.",
        descEn: "4-hour morning tour visiting key Prophetic Seerah sites, including entry tickets to Bustan Al-Mustazall and the Seerah Museum in Quba.",
      },
      {
        title: "جولة المسجد النبوي",
        titleEn: "Prophet's Mosque Guided Tour",
        badge: "مسائية · 90 دقيقة",
        badgeEn: "Evening · 90 Mins",
        desc: "جولة لمدة 90 دقيقة برفقة مرشد سياحي مرخص، وبترخيص من الهيئة العامة للعناية بالحرمين، لا تتضمن النقل إلى المسجد النبوي.",
        descEn: "90-minute tour with a licensed guide authorized by the General Authority for the Care of the Two Holy Mosques (excludes transport to the mosque).",
      },
    ],

    // Transfer segments (مقاطع النقل المشمولة)
    transfers: [
      "مطار جدة ← فندق مكة",
      "جولة مسار المشاعر المقدسة",
      "جولة معالم وادي ذي طوى",
      "النقل من مكة إلى المدينة",
      "جولة المدينة الإثرائية",
      "التوديع إلى المطار",
    ],
  },

  // -------------------------------------------------------------
  // 2. باقة المشاعر (Al-Mashaer Package) - 10 Nights / 11 Days
  // -------------------------------------------------------------
  {
    id: "108",
    slug: "mashair",
    legacyIds: ["2", "108", "mashair", "mashair-plus"],
    name: "باقة المشاعر",
    nameEn: "Al-Mashaer Package",
    tag: "الأكثر توازنًا",
    tagEn: "Most Balanced",
    kicker: "10 ليالٍ بين مكة والمدينة وجدة والطائف",
    kickerEn: "10 Nights Across Makkah, Madinah, Jeddah & Taif",
    duration: "10 ليالٍ / 11 يومًا",
    durationEn: "10 Nights / 11 Days",
    daysCount: 11,
    nightsCount: 10,
    makkahNights: "7 ليالٍ في مكة",
    makkahNightsEn: "7 Nights in Makkah",
    madinahNights: "3 ليالٍ في المدينة",
    madinahNightsEn: "3 Nights in Madinah",
    arrival: "الوصول عبر مطار جدة",
    arrivalEn: "Arrival via Jeddah Airport",
    departure: "المغادرة من مطار المدينة أو جدة",
    departureEn: "Departure via Madinah or Jeddah Airport",
    pricingBase: "العدد الأساسي للتسعير: 3 أشخاص",
    pricingBaseEn: "Base pricing: 3 persons",
    description:
      "برنامج يجمع بين مكة والمدينة، مع إضافة تجربتي جدة التاريخية والطائف والهدا.",
    descriptionEn:
      "A balanced journey combining Makkah and Madinah with historic Jeddah and scenic Taif/Al-Hada experiences.",
    extraCity: "جدة والطائف",
    extraCityEn: "Jeddah & Taif",

    // Catalog highlights (3 distinct bullet points matching HTML)
    highlights: [
      "جولات مكة والحرمين",
      "جولة جدة التاريخية",
      "جولة الطائف والهدا",
    ],
    highlightsEn: [
      "Makkah & Two Holy Mosques Tours",
      "Historic Jeddah (Al-Balad) Tour",
      "Taif & Al-Hada Mountain Tour",
    ],

    // Pricing matrix (SAR per person, VAT included, based on 3 persons)
    pricing: {
      madinah: {
        standard: 2031,
        plus: 3464,
      },
      jeddah: {
        standard: 2231,
        plus: 3664,
      },
    },

    // Journey route stops
    routeStops: [
      { name: "مطار جدة", nameEn: "Jeddah Airport" },
      { name: "مكة المكرمة", nameEn: "Makkah Al-Mukarramah", isMajor: true },
      { name: "جدة والطائف", nameEn: "Jeddah & Taif" },
      { name: "المدينة المنورة", nameEn: "Madinah Al-Munawwarah", isMajor: true },
      { name: "مطار المدينة أو جدة", nameEn: "Madinah or Jeddah Airport" },
    ],

    // Package Comparison Attributes
    comparison: [
      {
        feature: "النقل والجولات",
        featureEn: "Transfers & Tours",
        standard: "✓ مشمولة",
        standardEn: "✓ Included",
        plus: "✓ مشمولة",
        plusEn: "✓ Included",
      },
      {
        feature: "جولات جدة والطائف",
        featureEn: "Jeddah & Taif Tours",
        standard: "✓ مشمولتان",
        standardEn: "✓ Included",
        plus: "✓ مشمولتان",
        plusEn: "✓ Included",
      },
      {
        feature: "جولات الحرمين الإثرائية",
        featureEn: "Two Holy Mosques Tours",
        standard: "✓ مشمولة",
        standardEn: "✓ Included",
        plus: "✓ مشمولة",
        plusEn: "✓ Included",
      },
      {
        feature: "المرافق والإرشاد الرقمي",
        featureEn: "Host & Digital Guide",
        standard: "✓ مشمول",
        standardEn: "✓ Included",
        plus: "✓ مشمول",
        plusEn: "✓ Included",
      },
      {
        feature: "الإقامة الفندقية",
        featureEn: "Hotel Accommodation",
        standard: "غير مشمولة",
        standardEn: "Not Included",
        plus: "✓ مشمولة (4 نجوم)",
        plusEn: "✓ Included (4-Star)",
      },
      {
        feature: "توزيع الغرف",
        featureEn: "Room Distribution",
        standard: "غير مشمول",
        standardEn: "Not Included",
        plus: "غرفة ثلاثية",
        plusEn: "Triple Room",
      },
      {
        feature: "نقل ترددي للحرم",
        featureEn: "Haram Shuttle Service",
        standard: "غير مشمول",
        standardEn: "Not Included",
        plus: "✓ مشمول (بحسب الفندق)",
        plusEn: "✓ Included (per hotel)",
      },
    ],

    // 11-Day Daily Itinerary (البرنامج اليومي)
    itinerary: [
      {
        dayNum: 1,
        day: "الأول",
        dayEn: "Day 1",
        title: "الاستقبال من مطار جدة والنقل إلى مكة",
        titleEn: "Reception at Jeddah Airport & private transfer to Makkah",
        type: "transfer",
      },
      {
        dayNum: 2,
        day: "الثاني",
        dayEn: "Day 2",
        title: "أداء العمرة والراحة",
        titleEn: "Performing Umrah & rest",
        type: "free",
      },
      {
        dayNum: 3,
        day: "الثالث",
        dayEn: "Day 3",
        title: "جولة المشاعر المقدسة",
        titleEn: "Holy Sites Trail Tour (Hira Cultural District & Revelation Exhibition)",
        type: "tour",
      },
      {
        dayNum: 4,
        day: "الرابع",
        dayEn: "Day 4",
        title: "جولة المسجد الحرام",
        titleEn: "Grand Mosque Guided Tour with certified guide",
        type: "tour",
      },
      {
        dayNum: 5,
        day: "الخامس",
        dayEn: "Day 5",
        title: "جولة معالم وادي ذي طوى",
        titleEn: "Wadi Dhi Tuwa Landmarks Tour & Architecture Exhibition",
        type: "tour",
      },
      {
        dayNum: 6,
        day: "السادس",
        dayEn: "Day 6",
        title: "جولة جدة التاريخية",
        titleEn: "Historic Jeddah (Al-Balad) Tour & Red Sea Museum",
        type: "tour",
      },
      {
        dayNum: 7,
        day: "السابع",
        dayEn: "Day 7",
        title: "جولة الطائف والهدا",
        titleEn: "Taif & Al-Hada Mountain Tour with Cable Car tickets",
        type: "tour",
      },
      {
        dayNum: 8,
        day: "الثامن",
        dayEn: "Day 8",
        title: "النقل الخاص إلى المدينة المنورة",
        titleEn: "Private transfer to Madinah Al-Munawwarah",
        type: "transfer",
      },
      {
        dayNum: 9,
        day: "التاسع",
        dayEn: "Day 9",
        title: "الجولة الإثرائية في المدينة المنورة",
        titleEn: "Madinah Seerah Tour (Bustan Al-Mustazall & Quba Seerah Museum)",
        type: "tour",
      },
      {
        dayNum: 10,
        day: "العاشر",
        dayEn: "Day 10",
        title: "جولة المسجد النبوي",
        titleEn: "Prophet's Mosque Guided Tour with licensed guide",
        type: "tour",
      },
      {
        dayNum: 11,
        day: "الحادي عشر",
        dayEn: "Day 11",
        title: "التوديع إلى المطار",
        titleEn: "Farewell airport transfer",
        type: "transfer",
      },
    ],

    // Included Experiences & Tours (التجارب والجولات المشمولة)
    experiences: [
      {
        title: "جولة مسار المشاعر المقدسة",
        titleEn: "Holy Sites Trail Tour",
        badge: "صباحية · 4 ساعات",
        badgeEn: "Morning · 4 Hours",
        desc: "جولة إثرائية صباحية لمدة 4 ساعات تنتهي في حي حراء الثقافي — تشمل تذاكر دخول معرض الوحي.",
        descEn: "4-hour morning tour covering holy landmarks, concluding at Hira Cultural District including Revelation Exhibition tickets.",
      },
      {
        title: "جولة المسجد الحرام",
        titleEn: "Grand Mosque Guided Tour",
        badge: "مسائية · 90 دقيقة",
        badgeEn: "Evening · 90 Mins",
        desc: "جولة مسائية لمدة 90 دقيقة، برفقة مرشد مرخص وبترخيص هيئة العناية بالحرمين (لا تتضمن النقل إلى الحرم).",
        descEn: "90-minute evening tour with a licensed guide authorized by the Care of Two Holy Mosques Authority.",
      },
      {
        title: "جولة معالم وادي ذي طوى",
        titleEn: "Wadi Dhi Tuwa Landmarks Tour",
        badge: "صباحية · 4 ساعات",
        badgeEn: "Morning · 4 Hours",
        desc: "جولة صباحية 4 ساعات تنتهي بدخول معرض عمارة الحرمين الشريفين.",
        descEn: "4-hour morning tour concluding at the Two Holy Mosques Architecture Exhibition.",
      },
      {
        title: "جولة جدة التاريخية",
        titleEn: "Historic Jeddah Heritage Tour",
        badge: "مسائية · 6 ساعات",
        badgeEn: "Evening · 6 Hours",
        desc: "جولة مسائية لمدة 6 ساعات في قلب جدة التاريخية تنتهي بزيارة متحف البحر الأحمر.",
        descEn: "6-hour evening exploration in historic Al-Balad, concluding with Red Sea Museum visit.",
      },
      {
        title: "جولة الطائف والهدا",
        titleEn: "Taif & Al-Hada Scenic Tour",
        badge: "صباحية · 8 ساعات",
        badgeEn: "Morning · 8 Hours",
        desc: "رحلة صباحية مميزة إلى الطائف لمدة 8 ساعات تتضمن تذاكر تلفريك الهدا وزيارة المعالم الطبيعية والتاريخية.",
        descEn: "8-hour day trip to Taif and scenic mountains, including Al-Hada cable car tickets.",
      },
      {
        title: "الجولة الإثرائية في المدينة المنورة",
        titleEn: "Madinah Heritage & Seerah Tour",
        badge: "صباحية · 4 ساعات",
        badgeEn: "Morning · 4 Hours",
        desc: "جولة صباحية 4 ساعات تشمل تذاكر دخول بستان المستظل ومتحف السيرة في قباء.",
        descEn: "4-hour morning tour including entry to Bustan Al-Mustazall and Seerah Museum in Quba.",
      },
      {
        title: "جولة المسجد النبوي",
        titleEn: "Prophet's Mosque Guided Tour",
        badge: "مسائية · 90 دقيقة",
        badgeEn: "Evening · 90 Mins",
        desc: "جولة مسائية 90 دقيقة برفقة مرشد مرخص وبترخيص هيئة العناية بالحرمين.",
        descEn: "90-minute evening tour with a licensed guide authorized by the Care of Two Holy Mosques Authority.",
      },
    ],

    // Transfer segments
    transfers: [
      "مطار جدة ← فندق مكة",
      "جولة مسار المشاعر المقدسة",
      "جولة معالم وادي ذي طوى",
      "جولة جدة التاريخية",
      "جولة الطائف والهدا",
      "النقل من مكة إلى المدينة",
      "جولة المدينة الإثرائية",
      "التوديع إلى المطار",
    ],
  },

  // -------------------------------------------------------------
  // 3. باقة النور (Al-Noor Package) - 14 Nights / 15 Days
  // -------------------------------------------------------------
  {
    id: "109",
    slug: "noor",
    legacyIds: ["3", "109", "110", "noor", "noor-plus"],
    name: "باقة النور",
    nameEn: "Al-Noor Package",
    tag: "الأكثر شمولاً",
    tagEn: "Most Comprehensive",
    kicker: "14 ليلة من العبادة والثقافة والراحة",
    kickerEn: "14 Nights of Devotion, Culture & Comfort",
    duration: "14 ليلة / 15 يومًا",
    durationEn: "14 Nights / 15 Days",
    daysCount: 15,
    nightsCount: 14,
    makkahNights: "10 ليالٍ في مكة",
    makkahNightsEn: "10 Nights in Makkah",
    madinahNights: "4 ليالٍ في المدينة",
    madinahNightsEn: "4 Nights in Madinah",
    arrival: "الوصول عبر مطار جدة",
    arrivalEn: "Arrival via Jeddah Airport",
    departure: "المغادرة من مطار المدينة أو جدة",
    departureEn: "Departure via Madinah or Jeddah Airport",
    pricingBase: "العدد الأساسي للتسعير: 3 أشخاص",
    pricingBaseEn: "Base pricing: 3 persons",
    description:
      "برنامج ممتد يجمع بين العبادة والراحة والتجارب التاريخية والثقافية في مكة والمدينة وجدة والطائف.",
    descriptionEn:
      "An extended, comprehensive itinerary combining spiritual worship, comfort, and rich cultural experiences across Makkah, Madinah, Jeddah, and Taif.",
    extraCity: "جدة والطائف",
    extraCityEn: "Jeddah & Taif",

    // Catalog highlights (3 distinct bullet points matching HTML)
    highlights: [
      "جولات مكة وجدة والطائف والهدا",
      "معرض السيرة وتجربة خطاه",
      "آثار غزوة أحد ودروب الهجرة",
    ],
    highlightsEn: [
      "Makkah, Jeddah, Taif & Al-Hada Tours",
      "Seerah Museum & Interactive Thawr Tour",
      "Battle of Uhud & Migration Trails in Quba",
    ],

    // Pricing matrix (SAR per person, VAT included, based on 3 persons)
    pricing: {
      madinah: {
        standard: 2377,
        plus: 4328,
      },
      jeddah: {
        standard: 2577,
        plus: 4582,
      },
    },

    // Journey route stops
    routeStops: [
      { name: "مطار جدة", nameEn: "Jeddah Airport" },
      { name: "مكة المكرمة", nameEn: "Makkah Al-Mukarramah", isMajor: true },
      { name: "جدة والطائف", nameEn: "Jeddah & Taif" },
      { name: "المدينة المنورة", nameEn: "Madinah Al-Munawwarah", isMajor: true },
      { name: "مطار المدينة أو جدة", nameEn: "Madinah or Jeddah Airport" },
    ],

    // Package Comparison Attributes
    comparison: [
      {
        feature: "النقل والجولات",
        featureEn: "Transfers & Tours",
        standard: "✓ مشمولة",
        standardEn: "✓ Included",
        plus: "✓ مشمولة",
        plusEn: "✓ Included",
      },
      {
        feature: "جولات جدة والطائف",
        featureEn: "Jeddah & Taif Tours",
        standard: "✓ مشمولتان",
        standardEn: "✓ Included",
        plus: "✓ مشمولتان",
        plusEn: "✓ Included",
      },
      {
        feature: "المعارض والتجارب التفاعلية",
        featureEn: "Museums & Interactive Expos",
        standard: "✓ مشمولة بالتذاكر",
        standardEn: "✓ Tickets Included",
        plus: "✓ مشمولة بالتذاكر",
        plusEn: "✓ Tickets Included",
      },
      {
        feature: "المرافق والإرشاد الرقمي",
        featureEn: "Host & Digital Guide",
        standard: "✓ مشمول",
        standardEn: "✓ Included",
        plus: "✓ مشمول",
        plusEn: "✓ Included",
      },
      {
        feature: "الإقامة الفندقية",
        featureEn: "Hotel Accommodation",
        standard: "غير مشمولة",
        standardEn: "Not Included",
        plus: "✓ مشمولة (4 نجوم)",
        plusEn: "✓ Included (4-Star)",
      },
      {
        feature: "توزيع الغرف",
        featureEn: "Room Distribution",
        standard: "غير مشمول",
        standardEn: "Not Included",
        plus: "غرفة ثلاثية",
        plusEn: "Triple Room",
      },
      {
        feature: "نقل ترددي للحرم",
        featureEn: "Haram Shuttle Service",
        standard: "غير مشمول",
        standardEn: "Not Included",
        plus: "✓ مشمول (بحسب الفندق)",
        plusEn: "✓ Included (per hotel)",
      },
    ],

    // 15-Day Daily Itinerary (البرنامج اليومي)
    itinerary: [
      {
        dayNum: 1,
        day: "الأول",
        dayEn: "Day 1",
        title: "الاستقبال من مطار جدة والنقل إلى مكة",
        titleEn: "Airport reception & private transfer to Makkah",
        type: "transfer",
      },
      {
        dayNum: 2,
        day: "الثاني",
        dayEn: "Day 2",
        title: "أداء العمرة والراحة",
        titleEn: "Performing Umrah & rest",
        type: "free",
      },
      {
        dayNum: 3,
        day: "الثالث",
        dayEn: "Day 3",
        title: "جولة المشاعر المقدسة",
        titleEn: "Holy Sites Trail Tour (Hira Cultural District & Revelation Exhibition)",
        type: "tour",
      },
      {
        dayNum: 4,
        day: "الرابع",
        dayEn: "Day 4",
        title: "جولة المسجد الحرام",
        titleEn: "Grand Mosque Guided Tour with certified guide",
        type: "tour",
      },
      {
        dayNum: 5,
        day: "الخامس",
        dayEn: "Day 5",
        title: "جولة وادي ذي طوى + المعرض والمتحف الدولي للسيرة النبوية",
        titleEn: "Wadi Dhi Tuwa Tour & International Prophet's Seerah Museum",
        type: "tour",
      },
      {
        dayNum: 6,
        day: "السادس",
        dayEn: "Day 6",
        title: "جولة جدة التاريخية ومتحف البحر الأحمر",
        titleEn: "Historic Jeddah (Al-Balad) Tour & Red Sea Museum",
        type: "tour",
      },
      {
        dayNum: 7,
        day: "السابع",
        dayEn: "Day 7",
        title: "يوم حر للراحة والعبادة في الحرم المكي",
        titleEn: "Free day for worship & relaxation in Makkah",
        type: "free",
      },
      {
        dayNum: 8,
        day: "الثامن",
        dayEn: "Day 8",
        title: "جولة الطائف والهدا وتلفريك الهدا",
        titleEn: "Taif & Al-Hada Mountain Tour with Cable Car",
        type: "tour",
      },
      {
        dayNum: 9,
        day: "التاسع",
        dayEn: "Day 9",
        title: "تجربة على خطاه التفاعلية في جبل ثور",
        titleEn: "Interactive 'In His Footsteps' Experience at Jabal Thawr",
        type: "tour",
      },
      {
        dayNum: 10,
        day: "العاشر",
        dayEn: "Day 10",
        title: "يوم حر في مكة المكرمة",
        titleEn: "Free day in Makkah Al-Mukarramah",
        type: "free",
      },
      {
        dayNum: 11,
        day: "الحادي عشر",
        dayEn: "Day 11",
        title: "النقل الخاص إلى المدينة المنورة",
        titleEn: "Private transfer to Madinah Al-Munawwarah",
        type: "transfer",
      },
      {
        dayNum: 12,
        day: "الثاني عشر",
        dayEn: "Day 12",
        title: "جولة آثار غزوة أحد ومسجد القبلتين + جولة المسجد النبوي",
        titleEn: "Battle of Uhud Tour, Qiblatain Mosque & Prophet's Mosque Tour",
        type: "tour",
      },
      {
        dayNum: 13,
        day: "الثالث عشر",
        dayEn: "Day 13",
        title: "جولة دروب الهجرة (بستان المستظل ومتحف السيرة بقباء)",
        titleEn: "Migration Trails Tour (Bustan Al-Mustazall & Quba Seerah Museum)",
        type: "tour",
      },
      {
        dayNum: 14,
        day: "الرابع عشر",
        dayEn: "Day 14",
        title: "يوم حر في المدينة المنورة",
        titleEn: "Free day for reflection in Madinah Al-Munawwarah",
        type: "free",
      },
      {
        dayNum: 15,
        day: "الخامس عشر",
        dayEn: "Day 15",
        title: "التوديع إلى المطار",
        titleEn: "Farewell airport transfer",
        type: "transfer",
      },
    ],

    // Included Experiences & Tours (التجارب والجولات المشمولة)
    experiences: [
      {
        title: "جولة مسار المشاعر المقدسة",
        titleEn: "Holy Sites Trail Tour",
        badge: "4 ساعات",
        badgeEn: "4 Hours",
        desc: "جولة إثرائية لمدة 4 ساعات تنتهي في حي حراء الثقافي — تشمل تذاكر دخول معرض الوحي.",
        descEn: "4-hour tour exploring holy sites, ending at Hira Cultural District including Revelation Exhibition ticket.",
      },
      {
        title: "جولة المسجد الحرام",
        titleEn: "Grand Mosque Guided Tour",
        badge: "مسائية · 90 دقيقة",
        badgeEn: "Evening · 90 Mins",
        desc: "جولة مسائية لمدة 90 دقيقة برفقة مرشد مرخص وبترخيص هيئة العناية بالحرمين (لا تتضمن النقل إلى الحرم).",
        descEn: "90-minute evening tour with a licensed guide authorized by the Care of Two Holy Mosques Authority.",
      },
      {
        title: "جولة معالم وادي ذي طوى",
        titleEn: "Wadi Dhi Tuwa Landmarks Tour",
        badge: "صباحية · 4 ساعات",
        badgeEn: "Morning · 4 Hours",
        desc: "جولة صباحية 4 ساعات تنتهي بدخول معرض عمارة الحرمين الشريفين.",
        descEn: "4-hour morning tour concluding at the Two Holy Mosques Architecture Exhibition.",
      },
      {
        title: "المعرض والمتحف الدولي للسيرة النبوية",
        titleEn: "International Museum of the Prophet's Seerah",
        badge: "شامل التذاكر",
        badgeEn: "Tickets Included",
        desc: "الدخول إلى المعرض والمتحف الدولي للسيرة النبوية شامل التذاكر واستكشاف العرض التقني المتقدم.",
        descEn: "Full entry ticket and guided access to the International Fair and Museum of the Prophet's Biography.",
      },
      {
        title: "جولة جدة التاريخية ومتحف البحر الأحمر",
        titleEn: "Historic Jeddah & Red Sea Museum",
        badge: "مسائية · 6 ساعات",
        badgeEn: "Evening · 6 Hours",
        desc: "جولة مسائية 6 ساعات تنتهي بزيارة متحف البحر الأحمر داخل جدة التاريخية.",
        descEn: "6-hour evening tour through Al-Balad concluding at the Red Sea Museum.",
      },
      {
        title: "جولة الطائف والهدا وتلفريك الهدا",
        titleEn: "Taif & Al-Hada Scenic Tour",
        badge: "صباحية · 8 ساعات",
        badgeEn: "Morning · 8 Hours",
        desc: "رحلة صباحية 8 ساعات تتضمن تذاكر تلفريك الهدا وزيارة المعالم التراثية والورد الطائفي.",
        descEn: "8-hour day trip to Taif and scenic mountains including Al-Hada cable car tickets.",
      },
      {
        title: "تجربة على خطاه التفاعلية في جبل ثور",
        titleEn: "'In His Footsteps' Interactive Experience",
        badge: "جولة مسائية مع التذاكر",
        badgeEn: "Evening Tour with Tickets",
        desc: "جولة مسائية إلى جبل ثور مع تذاكر الدخول إلى معرض 'على خطاه' التفاعلي.",
        descEn: "Evening tour to Mount Thawr with tickets to the interactive 'In His Footsteps' exhibition.",
      },
      {
        title: "جولة آثار غزوة أحد ومسجد القبلتين",
        titleEn: "Battle of Uhud & Qiblatain Tour",
        badge: "صباحية · 3 ساعات",
        badgeEn: "Morning · 3 Hours",
        desc: "جولة صباحية لمدة 3 ساعات تمر بساحة غزوة أحد وجبل الرماة وتنتهي بزيارة مسجد القبلتين.",
        descEn: "3-hour morning historical tour covering Uhud battlefield, Archers' Hill, and Qiblatain Mosque.",
      },
      {
        title: "جولة المسجد النبوي",
        titleEn: "Prophet's Mosque Guided Tour",
        badge: "مسائية · 90 دقيقة",
        badgeEn: "Evening · 90 Mins",
        desc: "جولة مسائية 90 دقيقة برفقة مرشد مرخص وبترخيص هيئة العناية بالحرمين.",
        descEn: "90-minute evening tour with a licensed guide authorized by the Care of Two Holy Mosques Authority.",
      },
      {
        title: "جولة دروب الهجرة في قباء",
        titleEn: "Migration Trails Tour in Quba",
        badge: "مسائية · 3 ساعات",
        badgeEn: "Evening · 3 Hours",
        desc: "جولة مسائية لمدة 3 ساعات تتضمن تذاكر دخول بستان المستظل ومتحف السيرة في قباء.",
        descEn: "3-hour evening tour including tickets to Bustan Al-Mustazall and the Seerah Museum in Quba.",
      },
    ],

    // Transfer segments
    transfers: [
      "مطار جدة ← فندق مكة",
      "جولة مسار المشاعر المقدسة",
      "جولة معالم وادي ذي طوى",
      "جولة جدة التاريخية",
      "جولة الطائف والهدا",
      "تجربة جبل ثور التفاعلية",
      "النقل من مكة إلى المدينة",
      "جولة آثار غزوة أحد",
      "جولة دروب الهجرة",
      "التوديع إلى المطار",
    ],
  },
];

// Common checklist of general inclusions across all packages (PDF Page 8)
export const commonInclusions = {
  standard: [
    "خدمات النقل المحددة لكل باقة والمركبات الخاصة",
    "النقل الخاص والمريح بين مكة المكرمة والمدينة المنورة",
    "جميع الجولات الإثرائية والتاريخية الموضحة في البرنامج",
    "جولة المسجد الحرام وجولة المسجد النبوي مع مرشدين مرخصين",
    "مرافق معتمد خلال المسارات والجولات الخارجية",
    "الإرشاد الرقمي الصوتي والنصي التفاعلي عبر تطبيق مزار",
    "الدعم المباشر والمستمر عبر واتساب طوال فترة الرحلة",
    "المياه والضيافة الخفيفة داخل المركبة طوال الجولات",
    "ضريبة القيمة المضافة شاملة لكافة الخدمات",
  ],
  standardEn: [
    "Dedicated private transfers and comfortable vehicles for all scheduled itineraries",
    "Private intercity transfer between Makkah Al-Mukarramah and Madinah Al-Munawwarah",
    "All enriching and historical guided tours detailed in the program",
    "Licensed guided tours of the Grand Mosque and the Prophet's Mosque",
    "Certified tour coordinator accompanying external landmark trails",
    "Smart interactive audio and textual digital guide via Mzar App",
    "Direct continuous WhatsApp support throughout your journey",
    "Complimentary mineral water and hospitality in vehicles during tours",
    "All prices inclusive of Value Added Tax (VAT)",
  ],
  plusBonus: [
    "الإقامة المؤكدة في فنادق 4 نجوم بمكة المكرمة والمدينة المنورة (غرفة ثلاثية)",
    "نقل ترددي مجاني بين الفندق والحرم الشريف (بحسب سياسة الفندق)",
  ],
  plusBonusEn: [
    "Guaranteed 4-star hotel accommodation in Makkah & Madinah (triple occupancy)",
    "Complimentary shuttle service between hotel and the Holy Mosque (per hotel policy)",
  ],
  excluded: [
    "تذاكر الطيران الدولي/الداخلي والتأشيرة والتأمين الطبي",
    "شرائح الاتصال والإنترنت والوجبات الغذائية اليومية",
    "تذاكر الفعاليات والمزارات غير المذكورة صراحة ضمن البرنامج",
    "المصروفات والمشتريات الشخصية",
    "أي خدمة إضافية غير مدرجة في تفاصيل البرنامج المعتمد",
  ],
  excludedEn: [
    "International/domestic flights, visa fees, and travel medical insurance",
    "SIM cards, data plans, and daily meals",
    "Entry tickets to attractions not explicitly listed in the program",
    "Personal expenses, shopping, and incidental charges",
    "Any additional private services not listed in the confirmed itinerary",
  ],
  bookingPolicy: {
    ar: "يتم الحجز عبر واتساب مزار ويُعد مؤكدًا بعد سداد كامل القيمة. جولات الحرمين الشريفين تتطلب حجزًا مسبقًا قبل يومين على الأقل لإصدار التصاريح الرسمية. التعديل والإلغاء متاح قبل 24 ساعة على الأقل وفق السياسات المعتمدة.",
    en: "Bookings are arranged via Mzar WhatsApp and confirmed upon full payment. Haramain tours require at least 2 days advance booking for official permit issuance. Modifications and cancellations are available up to 24 hours prior according to policy terms.",
  },
};

/**
 * Retrieve all 3 packages
 */
export function getAllUmrahPackages() {
  return umrahPackagesData;
}

/**
 * Find a package by slug or legacy numeric ID
 */
export function getUmrahPackageByIdOrSlug(idOrSlug) {
  if (!idOrSlug) return umrahPackagesData[0];
  const query = String(idOrSlug).toLowerCase().trim();

  const found = umrahPackagesData.find(
    (pkg) =>
      pkg.slug === query ||
      pkg.id === query ||
      (pkg.legacyIds && pkg.legacyIds.includes(query))
  );

  return found || umrahPackagesData[0];
}
