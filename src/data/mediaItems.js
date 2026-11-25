const mediaRaw = [
  { id: 1, categoryKey: 'arch', type: 'photo', photo: '/images/khiva-hero.jpg', year: 2024, uz: { title: "Ichan-Qal'a — Oltin soat", category: 'Arxitektura', location: 'Xiva shahri' }, ru: { title: 'Ичан-Кала — Золотой час', category: 'Архитектура', location: 'Хива' }, en: { title: 'Ichan-Kala — Golden Hour', category: 'Architecture', location: 'Khiva City' } },
  { id: 2, categoryKey: 'nature', type: 'photo', photo: '/images/amudarya-oasis.jpg', year: 2024, uz: { title: 'Amudaryo bahor manzarasi', category: 'Tabiat', location: 'Hazorasp' }, ru: { title: 'Амударья весной', category: 'Природа', location: 'Хазарасп' }, en: { title: 'Amu Darya Spring Panorama', category: 'Nature', location: 'Khazarasp' } },
  { id: 3, categoryKey: 'culture', type: 'photo', photo: '/images/lazgi-dance.jpg', year: 2024, uz: { title: 'Lazgi festivali lavhalari', category: 'Madaniyat', location: 'Xiva' }, ru: { title: 'Фестиваль Лазги', category: 'Культура', location: 'Хива' }, en: { title: 'Lazgi Festival Highlights', category: 'Culture', location: 'Khiva' } },
  { id: 4, categoryKey: 'history', type: 'photo', photo: '/images/ancient-fortress.jpg', year: 2023, uz: { title: "Tuproqqal'a qadimiy qal'asi", category: 'Tarixiy', location: "Tuproqqal'a" }, ru: { title: 'Древняя крепость Топрак-Кала', category: 'Исторические', location: 'Тупраккала' }, en: { title: 'Ancient Fortress of Toprak-Kala', category: 'Historical', location: 'Tuproqqala' } },
  { id: 5, categoryKey: 'modern', type: 'photo', photo: '/images/urgench-modern.jpg', year: 2024, uz: { title: 'Zamonaviy Urganch xiyobonlari', category: 'Zamonaviy', location: 'Urganch' }, ru: { title: 'Проспекты Ургенча', category: 'Современные', location: 'Ургенч' }, en: { title: 'Modern Urgench Boulevards', category: 'Modern', location: 'Urgench' } },
  { id: 6, categoryKey: 'arch', type: 'photo', photo: '/images/kalta-minor.jpg', year: 2024, uz: { title: 'Kalta Minor koshinlari', category: 'Arxitektura', location: 'Xiva' }, ru: { title: 'Майолика Кальта-Минора', category: 'Архитектура', location: 'Хива' }, en: { title: 'Kalta Minor Tilework', category: 'Architecture', location: 'Khiva' } },
  { id: 7, categoryKey: 'nature', type: 'photo', photo: '/images/kyzylkum-desert.jpg', year: 2023, uz: { title: "Qizilqum cho'l barxanlari", category: 'Tabiat', location: 'Xorazm' }, ru: { title: 'Барханы Кызылкума', category: 'Природа', location: 'Хорезм' }, en: { title: 'Kyzylkum Desert Dunes', category: 'Nature', location: 'Khorezm' } },
  { id: 8, categoryKey: 'culture', type: 'photo', photo: '/images/woodcarving.jpg', year: 2024, uz: { title: "Xiva yog'och o'ymakorligi", category: 'Madaniyat', location: 'Xiva' }, ru: { title: 'Резьба по дереву в Хиве', category: 'Культура', location: 'Хива' }, en: { title: 'Khiva Woodcarving Craft', category: 'Culture', location: 'Khiva' } },
  { id: 9, categoryKey: 'history', type: 'photo', photo: '/images/koy-krylgan.jpg', year: 2023, uz: { title: "Ayaz-Qal'a tepaliklari", category: 'Tarixiy', location: "Qal'alar vodiysi" }, ru: { title: 'Холмы Аяз-Калы', category: 'Исторические', location: 'Долина крепостей' }, en: { title: 'Ayaz-Kala Hilltop Citadel', category: 'Historical', location: 'Fortress Valley' } },
  { id: 10, categoryKey: 'arch', type: 'video', photo: '/images/khiva-hero.jpg', year: 2024, duration: '8:24', uz: { title: 'Xiva — jahon merosi (hujjatli film)', category: 'Arxitektura', location: 'Xiva' }, ru: { title: 'Хива — всемирное наследие (док. фильм)', category: 'Архитектура', location: 'Хива' }, en: { title: 'Khiva — World Heritage Documentary', category: 'Architecture', location: 'Khiva' } },
  { id: 11, categoryKey: 'nature', type: 'video', photo: '/images/amudarya-oasis.jpg', year: 2024, duration: '6:17', uz: { title: 'Amudaryo va Xorazm tabiati', category: 'Tabiat', location: 'Xorazm' }, ru: { title: 'Амударья и природа Хорезма', category: 'Природа', location: 'Хорезм' }, en: { title: 'Amu Darya & Khorezm Nature', category: 'Nature', location: 'Khorezm' } },
  { id: 12, categoryKey: 'culture', type: 'video', photo: '/images/lazgi-dance.jpg', year: 2024, duration: '4:56', uz: { title: '«Lazgi» — Xorazm raqs san\'ati', category: 'Madaniyat', location: 'Urganch' }, ru: { title: '«Лазги» — искусство хорезмского танца', category: 'Культура', location: 'Ургенч' }, en: { title: 'Lazgi — The Living Dance of Khorezm', category: 'Culture', location: 'Urgench' } },
  { id: 13, categoryKey: 'modern', type: 'video', photo: '/images/modern-office.jpg', year: 2025, duration: '3:49', uz: { title: 'IT Park Xorazm — kelajak texnologiyalari', category: 'Zamonaviy', location: 'Urganch' }, ru: { title: 'IT Park Хорезм — технологии будущего', category: 'Современные', location: 'Ургенч' }, en: { title: 'IT Park Khorezm Innovation Report', category: 'Modern', location: 'Urgench' } },
];

const comparisonsRaw = [
  {
    id: 1,
    before: { photo: '/images/kunya-ark.jpg', year: '1900' },
    after: { photo: '/images/khiva-hero.jpg', year: '2025' },
    uz: { title: 'Xiva Ichan-Qal\'a markazi' },
    ru: { title: 'Центр Хивы — Ичан-Кала' },
    en: { title: 'Historic Core of Khiva' },
  },
  {
    id: 2,
    before: { photo: '/images/amudarya-oasis.jpg', year: '1960' },
    after: { photo: '/images/aral-crisis.jpg', year: '2025' },
    uz: { title: 'Orol dengizi havzasi' },
    ru: { title: 'Бассейн Аральского моря' },
    en: { title: 'Aral Sea Basin' },
  },
  {
    id: 3,
    before: { photo: '/images/highway-uz.jpg', year: '1980' },
    after: { photo: '/images/urgench-modern.jpg', year: '2025' },
    uz: { title: 'Urganch shahar markazi' },
    ru: { title: 'Центр города Ургенч' },
    en: { title: 'Urgench City Center' },
  },
  {
    id: 4,
    before: { photo: '/images/amudarya-oasis.jpg', year: '1970' },
    after: { photo: '/images/soil-oasis.jpg', year: '2025' },
    uz: { title: "Amudaryo bo'ylari" },
    ru: { title: 'Берега Амударьи' },
    en: { title: 'Amu Darya Riverbanks' },
  },
];

export const getMediaItems = (lang = 'uz') =>
  mediaRaw.map((m) => ({
    id: m.id,
    categoryKey: m.categoryKey,
    type: m.type,
    photo: m.photo,
    year: m.year,
    duration: m.duration,
    ...(m[lang] || m.uz),
  }));

export const getComparisonPairs = (lang = 'uz') =>
  comparisonsRaw.map((c) => ({
    id: c.id,
    before: c.before,
    after: c.after,
    ...(c[lang] || c.uz),
  }));

export const mediaItems = getMediaItems('uz');
export const comparisonPairs = getComparisonPairs('uz');
