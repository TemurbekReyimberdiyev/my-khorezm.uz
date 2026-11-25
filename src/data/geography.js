const geoContent = {
  uz: {
    overview: "Xorazm viloyati O'zbekistonning shimoli-g'arbiy qismida, Amudaryoning quyi oqimida joylashgan. Hudud qadimdan unumdor voha sifatida rivojlanib, Qizilqum va Qoraqum cho'l landshaftlari orasida joylashgan.",
    locationDesc: "Shimoli-g'arbiy O'zbekiston",
    boundaries: [
      "Shimolda: Qoraqalpog'iston Respublikasi",
      "Sharqda: Buxoro viloyati",
      "Janubda: Turkmaniston",
      "G'arbda: Turkmaniston",
    ],
    keyStats: [
      { l: "Maydoni", v: "6 100 km²" },
      { l: "Aholi soni", v: "~2,0 mln" },
      { l: "Tuman va shaharlar", v: "13 ta" },
      { l: "O'rtacha balandlik", v: "80–120 m" },
      { l: "Asosiy daryo", v: "Amudaryo" },
    ],
    climate: {
      description: "Keskin kontinental, quruq va issiq iqlim. Yozda harorat +35...+42°C gacha ko'tariladi, qishda -5...-15°C gacha pasayadi. Yillik yog'in 80–120 mm.",
      seasons: [
        { name: 'Bahor', months: 'Mart–May', temp: '+15...+28°C', desc: "Iliq, o'zgaruvchan va kam yomg'irli" },
        { name: 'Yoz', months: 'Iyun–Avgust', temp: '+35...+42°C', desc: 'Juda issiq, quyoshli va quruq' },
        { name: 'Kuz', months: 'Sentabr–Noyabr', temp: '+10...+25°C', desc: 'Salqin, quruq va hosil mavsumi' },
        { name: 'Qish', months: 'Dekabr–Fevral', temp: '-5...-15°C', desc: 'Sovuq, kam qorli' },
      ],
      avgTemps: [
        { month: 'Yan', temp: -2 }, { month: 'Fev', temp: 1 }, { month: 'Mar', temp: 10 }, { month: 'Apr', temp: 18 },
        { month: 'May', temp: 26 }, { month: 'Iyn', temp: 33 }, { month: 'Iyl', temp: 38 }, { month: 'Avg', temp: 36 },
        { month: 'Sen', temp: 28 }, { month: 'Okt', temp: 18 }, { month: 'Noy', temp: 8 }, { month: 'Dek', temp: 1 },
      ],
      precipitation: [
        { month: 'Yan', mm: 12 }, { month: 'Fev', mm: 10 }, { month: 'Mar', mm: 15 }, { month: 'Apr', mm: 10 },
        { month: 'May', mm: 8 }, { month: 'Iyn', mm: 4 }, { month: 'Iyl', mm: 2 }, { month: 'Avg', mm: 2 },
        { month: 'Sen', mm: 5 }, { month: 'Okt', mm: 8 }, { month: 'Noy', mm: 12 }, { month: 'Dek', mm: 14 },
      ],
    },
    rivers: [
      { name: 'Amudaryo', length: '2 574 km (umumiy)', role: 'Asosiy suv manbai', desc: "Xorazm vohasini suv bilan ta'minlaydigan Markaziy Osiyodagi eng yirik daryo." },
      { name: 'Shovot kanali', length: '~120 km', role: "Sug'orish", desc: "Viloyatning shimoliy va markaziy tumanlarini sug'oruvchi qadimiy magistral kanal." },
      { name: 'Polvon kanali', length: '~80 km', role: "Sug'orish", desc: "Xiva va atrofdagi hududlarni suv bilan ta'minlaydigan tarixiy kanal." },
    ],
    soilTypes: [
      { name: "Alluvial-o'tloqi tuproqlar", share: "~48%", desc: "Amudaryo vodiysida shakllangan, sug'orma dehqonchilik uchun eng unumdor qatlam." },
      { name: "Sho'rlangan tuproqlar", share: "~32%", desc: "Quritish va yuvish melioratsiyasini talab qiluvchi mineral tarkibli tuproqlar." },
      { name: "Qumli va cho'l tuproqlari", share: "~14%", desc: "Qizilqum va Qoraqum chegaralarida uchraydigan yengil mexanik tarkibli yerlar." },
      { name: "Taqir va taqirsimon yerlar", share: "~6%", desc: "Qadimiy delta tekisliklarida joylashgan zich loyli qatlamlar." },
    ],
    resources: ['Neft va tabiiy gaz', 'Osh tuzi va mirabilit', 'Bentonit va kaolin gillari', 'Qurilish qumi va shag\'al', 'Unimdor sug\'oriladigan yerlar'],
    flora: ['Qora va oq saksovul', 'Qamish va ro\'vak', 'Yulg\'un (tamarisk)', 'Turang\'i (to\'qay daraxti)', 'Voha mevali va terak daraxtlari'],
    fauna: ['Jayron', 'Qum tulkisi', 'Qo\'shoyoq', 'Pushti flamingo (ko\'llarda)', 'Qirg\'ovul', 'Cho\'l toshbaqasi'],
    facts: [
      "Xorazm hududining katta qismi Amudaryo deltasi cho'kindilaridan shakllangan.",
      "Yillik quyoshli kunlar soni 280–300 kunni tashkil etadi.",
      "Hududda iqlimning keskin kontinental xususiyati yaqqol namoyon bo'ladi.",
      "Voha hududlarida qadimdan sug'oriladigan dehqonchilik rivojlangan.",
    ],
  },
  ru: {
    overview: "Хорезмская область расположена на северо-западе Узбекистана, в нижнем течении Амударьи. С древности регион развивался как плодородный оазис между пустынями Кызылкум и Каракумы.",
    locationDesc: "Северо-Западный Узбекистан",
    boundaries: [
      "На севере: Республика Каракалпакстан",
      "На востоке: Бухарская область",
      "На юге: Туркменистан",
      "На западе: Туркменистан",
    ],
    keyStats: [
      { l: "Площадь", v: "6 100 км²" },
      { l: "Население", v: "~2,0 млн" },
      { l: "Районы и города", v: "13" },
      { l: "Средняя высота", v: "80–120 м" },
      { l: "Главная река", v: "Амударья" },
    ],
    climate: {
      description: "Резко континентальный, сухой и жаркий климат. Летом температура достигает +35...+42°C, зимой опускается до -5...-15°C. Годовые осадки — 80–120 мм.",
      seasons: [
        { name: 'Весна', months: 'Март–Май', temp: '+15...+28°C', desc: 'Тёплая, переменчивая, малодождливая' },
        { name: 'Лето', months: 'Июнь–Август', temp: '+35...+42°C', desc: 'Очень жаркое, солнечное и сухое' },
        { name: 'Осень', months: 'Сентябрь–Ноябрь', temp: '+10...+25°C', desc: 'Мягкая, сухая, сезон урожая' },
        { name: 'Зима', months: 'Декабрь–Февраль', temp: '-5...-15°C', desc: 'Холодная, малоснежная' },
      ],
      avgTemps: [
        { month: 'Янв', temp: -2 }, { month: 'Фев', temp: 1 }, { month: 'Мар', temp: 10 }, { month: 'Апр', temp: 18 },
        { month: 'Май', temp: 26 }, { month: 'Июн', temp: 33 }, { month: 'Июл', temp: 38 }, { month: 'Авг', temp: 36 },
        { month: 'Сен', temp: 28 }, { month: 'Окт', temp: 18 }, { month: 'Ноя', temp: 8 }, { month: 'Дек', temp: 1 },
      ],
      precipitation: [
        { month: 'Янв', mm: 12 }, { month: 'Фев', mm: 10 }, { month: 'Мар', mm: 15 }, { month: 'Апр', mm: 10 },
        { month: 'Май', mm: 8 }, { month: 'Июн', mm: 4 }, { month: 'Июл', mm: 2 }, { month: 'Авг', mm: 2 },
        { month: 'Сен', mm: 5 }, { month: 'Окт', mm: 8 }, { month: 'Ноя', mm: 12 }, { month: 'Дек', mm: 14 },
      ],
    },
    rivers: [
      { name: 'Амударья', length: '2 574 км (общая)', role: 'Главный источник воды', desc: 'Крупнейшая река Центральной Азии, питающая Хорезмский оазис.' },
      { name: 'Канал Шават', length: '~120 км', role: 'Орошение', desc: 'Древний магистральный канал, питающий северные и центральные районы.' },
      { name: 'Канал Палван', length: '~80 км', role: 'Орошение', desc: 'Исторический канал, обеспечивающий водой Хиву и окрестные земли.' },
    ],
    soilTypes: [
      { name: "Аллювиально-луговые почвы", share: "~48%", desc: "Сформированы наносами Амударьи, наиболее плодородны для орошаемого земледелия." },
      { name: "Засолённые почвы", share: "~32%", desc: "Минерализованные почвы, требующие регулярной промывки и дренажа." },
      { name: "Песчаные и пустынные почвы", share: "~14%", desc: "Лёгкие по составу почвы на границе с Кызылкумом и Каракумами." },
      { name: "Такыры и такыровидные земли", share: "~6%", desc: "Плотные глинистые участки древних дельтовых равнин." },
    ],
    resources: ['Нефть и природный газ', 'Поваренная соль и мирабилит', 'Бентонитовые и каолиновые глины', 'Строительный песок и гравий', 'Плодородные орошаемые земли'],
    flora: ['Чёрный и белый саксаул', 'Тростник и рогоз', 'Тамариск (юлгун)', 'Туранга (тугайный тополь)', 'Плодовые и тополиные рощи оазиса'],
    fauna: ['Джейран', 'Песчаная лисица', 'Тушканчик', 'Розовый фламинго (на озёрах)', 'Хивинский фазан', 'Степная черепаха'],
    facts: [
      "Большая часть территории Хорезма сформирована аллювиальными отложениями дельты Амударьи.",
      "Количество солнечных дней в году составляет 280–300 дней.",
      "В регионе ярко выражена резкая континентальность климата.",
      "На землях оазиса с древних времён развивалось орошаемое земледелие.",
    ],
  },
  en: {
    overview: "Khorezm region lies in northwestern Uzbekistan along the lower reaches of the Amu Darya River. Since antiquity it has flourished as a fertile oasis framed by the Kyzylkum and Karakum deserts.",
    locationDesc: "Northwestern Uzbekistan",
    boundaries: [
      "North: Republic of Karakalpakstan",
      "East: Bukhara Region",
      "South: Turkmenistan",
      "West: Turkmenistan",
    ],
    keyStats: [
      { l: "Area", v: "6,100 km²" },
      { l: "Population", v: "~2.0M" },
      { l: "Districts & Cities", v: "13" },
      { l: "Avg Elevation", v: "80–120 m" },
      { l: "Main River", v: "Amu Darya" },
    ],
    climate: {
      description: "Sharply continental, arid and sunny climate. Summer highs reach +35...+42°C, while winter lows drop to -5...-15°C. Annual precipitation averages 80–120 mm.",
      seasons: [
        { name: 'Spring', months: 'Mar–May', temp: '+15...+28°C', desc: 'Mild, breezy with light rain' },
        { name: 'Summer', months: 'Jun–Aug', temp: '+35...+42°C', desc: 'Hot, sunny and very dry' },
        { name: 'Autumn', months: 'Sep–Nov', temp: '+10...+25°C', desc: 'Warm days, harvest season' },
        { name: 'Winter', months: 'Dec–Feb', temp: '-5...-15°C', desc: 'Cold with light snowfall' },
      ],
      avgTemps: [
        { month: 'Jan', temp: -2 }, { month: 'Feb', temp: 1 }, { month: 'Mar', temp: 10 }, { month: 'Apr', temp: 18 },
        { month: 'May', temp: 26 }, { month: 'Jun', temp: 33 }, { month: 'Jul', temp: 38 }, { month: 'Aug', temp: 36 },
        { month: 'Sep', temp: 28 }, { month: 'Oct', temp: 18 }, { month: 'Nov', temp: 8 }, { month: 'Dec', temp: 1 },
      ],
      precipitation: [
        { month: 'Jan', mm: 12 }, { month: 'Feb', mm: 10 }, { month: 'Mar', mm: 15 }, { month: 'Apr', mm: 10 },
        { month: 'May', mm: 8 }, { month: 'Jun', mm: 4 }, { month: 'Jul', mm: 2 }, { month: 'Aug', mm: 2 },
        { month: 'Sep', mm: 5 }, { month: 'Oct', mm: 8 }, { month: 'Nov', mm: 12 }, { month: 'Dec', mm: 14 },
      ],
    },
    rivers: [
      { name: 'Amu Darya', length: '2,574 km (total)', role: 'Primary Water Source', desc: "Central Asia's largest river and the main lifeline sustaining the Khorezm oasis." },
      { name: 'Shavat Canal', length: '~120 km', role: 'Irrigation', desc: 'Historic main canal feeding the central and northern districts of the region.' },
      { name: 'Palvan Canal', length: '~80 km', role: 'Irrigation', desc: 'Centuries-old irrigation canal supplying Khiva and surrounding farmland.' },
    ],
    soilTypes: [
      { name: "Alluvial-Meadow Soils", share: "~48%", desc: "Formed by Amu Darya river deposits; highly fertile for irrigated crops." },
      { name: "Saline Soils", share: "~32%", desc: "Mineral-rich soils requiring drainage and seasonal leaching." },
      { name: "Sandy Desert Soils", share: "~14%", desc: "Light-textured soils along the Kyzylkum and Karakum desert margins." },
      { name: "Takyr Clay Soils", share: "~6%", desc: "Dense clay-pan formations across ancient delta flats." },
    ],
    resources: ['Oil and natural gas', 'Rock salt and mirabilite', 'Bentonite and kaolin clays', 'Construction sand & gravel', 'Fertile irrigated farmland'],
    flora: ['Black and white saxaul', 'Reeds and cattails', 'Tamarisk (yulgun)', 'Euphrates poplar (turanga)', 'Oasis orchards and poplars'],
    fauna: ['Goitered gazelle', 'Corsac desert fox', 'Jerboa', 'Greater flamingo (lakes)', 'Khiva pheasant', 'Central Asian tortoise'],
    facts: [
      "Most of Khorezm's territory was formed by alluvial deposits of the Amu Darya delta.",
      "The region enjoys 280–300 sunny days per year.",
      "Its climate displays classic Central Asian continental temperature swings.",
      "Irrigated oasis agriculture has thrived here for several thousand years.",
    ],
  },
};

export const getGeographyData = (lang = 'uz') => ({
  location: { lat: 41.55, lng: 60.63 },
  ...(geoContent[lang] || geoContent.uz),
});
export const geographyData = getGeographyData('uz');
