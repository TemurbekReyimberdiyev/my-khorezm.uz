// Authoritative geographic data compiled from:
// - Xorazm viloyati statistika boshqarmasi (xorazmstat.uz, April 1, 2025: area 6,050 km², pop 2,039,558)
// - O'zbekiston Milliy Ensiklopediyasi & Wikipedia (Xorazm viloyati, Toshsaqa kanali, Shovot kanali, Tuyamo'yin suv ombori, Quyi Amudaryo biosfera rezervati)
// - UzHydromet (O'zgidromet) climate norms for Urgench & Lower Amu Darya basin

const geoContent = {
  uz: {
    overview:
      "Xorazm viloyati O'zbekistonning shimoli-g'arbida, Amudaryoning quyi chap sohili vohasida (40°31'–42°01' sh.k., 60°03'–62°29' sh.u.) joylashgan. Maydoni 6 050 km² bo'lib, Qizilqum va Qoraqum cho'llari tutashgan hududda qadimdan sug'orma dehqonchilik markazi sifatida shakllangan.",
    locationDesc: "Shimoli-g'arbiy O'zbekiston · Quyi Amudaryo vohasi",
    boundaries: [
      "Shimol va sharqda: Qoraqalpog'iston Respublikasi (Amudaryo bo'ylab To'rtko'l va Beruniy tumanlari)",
      "Janubi-sharqda: Buxoro viloyati (Qizilqum cho'l hududi)",
      "Janubda: Turkmaniston (Lebap va Toshhovuz viloyatlari)",
      "G'arbda: Turkmaniston (Toshhovuz viloyati)",
    ],
    keyStats: [
      { l: 'Maydoni', v: '6 050 km²' },
      { l: 'Aholi soni (2025)', v: '2 039 558' },
      { l: 'Tuman va shaharlar', v: '13 ta (11+2)' },
      { l: 'Balandlik diapazoni', v: '70–145 m' },
      { l: 'Asosiy suv arteriyasi', v: 'Amudaryo' },
    ],
    climate: {
      description:
        "O'zgidromet kuzatuvlariga ko'ra Xorazm iqlimi keskin kontinental va quruq: yanvar o'rtacha harorati -3...-4°C (qattiq sovuqlarda -25...-32°C gacha), iyul o'rtacha harorati +28...+29°C (kunduzgi maksimal +42...+44°C). Yillik yog'in miqdori 80–100 mm, quyoshli kunlar 280–300 kun, vegetatsiya davri ~205 kun.",
      highlights: [
        { k: 'sunny', l: 'Quyoshli kunlar', v: '280–300 kun/yil' },
        { k: 'rain', l: "Yillik yog'in", v: '80–100 mm' },
        { k: 'temp', l: "Harorat amplitudasi", v: '-32°C ... +44°C' },
        { k: 'veg', l: 'Vegetatsiya davri', v: '200–210 kun' },
      ],
      seasons: [
        { name: 'Bahor', months: 'Mart–May', temp: '+12...+26°C', desc: "Iliq va tez isuvchi mavsum; yillik yog'inning asosiy qismi bahorda tushadi." },
        { name: 'Yoz', months: 'Iyun–Avgust', temp: '+35...+44°C', desc: "Juda issiq, quyoshli va quruq; garmsel shamollari va past namlik kuzatiladi." },
        { name: 'Kuz', months: 'Sentabr–Noyabr', temp: '+8...+23°C', desc: "Salqin, tiniq va barqaror quruq ob-havo; paxta va sholi yig'im mavsumi." },
        { name: 'Qish', months: 'Dekabr–Fevral', temp: '-4...-15°C', desc: "Sovuq, kam qorli; shimoliy havo oqimlari ta'sirida -25°C gacha sovishi mumkin." },
      ],
      avgTemps: [
        { month: 'Yan', temp: -3 }, { month: 'Fev', temp: 0 }, { month: 'Mar', temp: 8 }, { month: 'Apr', temp: 16 },
        { month: 'May', temp: 23 }, { month: 'Iyn', temp: 27 }, { month: 'Iyl', temp: 29 }, { month: 'Avg', temp: 27 },
        { month: 'Sen', temp: 21 }, { month: 'Okt', temp: 13 }, { month: 'Noy', temp: 6 }, { month: 'Dek', temp: 0 },
      ],
      precipitation: [
        { month: 'Yan', mm: 11 }, { month: 'Fev', mm: 10 }, { month: 'Mar', mm: 16 }, { month: 'Apr', mm: 13 },
        { month: 'May', mm: 9 }, { month: 'Iyn', mm: 3 }, { month: 'Iyl', mm: 1 }, { month: 'Avg', mm: 1 },
        { month: 'Sen', mm: 3 }, { month: 'Okt', mm: 7 }, { month: 'Noy', mm: 10 }, { month: 'Dek', mm: 12 },
      ],
    },
    waterSummary:
      "Viloyatda yog'ingarchilik kam (80–100 mm) bo'lgani uchun barcha dehqonchilik va ichimlik suv ta'minoti Amudaryo oqimiga tayangan. Asosiy gidrouzel — Tuyamo'yin suv ombori bo'lib, suv Toshsaqa, Shovot, Polvon va G'ozovot magistral kanallari tizimi orqali barcha tumanlarga taqsimlanadi, ortiqcha zovur suvlari esa Ozerniy va Daryoliq kollektorlari orqali chiqariladi.",
    waterStats: [
      { l: "Sug'oriladigan yerlar", v: '~260 000 ga' },
      { l: 'Magistral kanallar', v: '350+ km' },
      { l: 'Asosiy gidrouzel', v: "Tuyamo'yin" },
      { l: 'Yirik cho‘l ko‘llari', v: '30+ ta' },
    ],
    rivers: [
      { name: 'Amudaryo', length: '2 574 km (umumiy)', role: 'Asosiy suv manbai', desc: "Markaziy Osiyodagi eng sersuv daryo; Xorazm vohasi uning quyi chap sohil deltasi hududida joylashgan." },
      { name: "Tuyamo'yin suv ombori", length: '4 ta havza (GES)', role: 'Mavsumiy rostlash', desc: "Asosiy o'zan hamda Kaparas, Sultonsanjar va Qo'shbuloq havzalaridan iborat strategik gidroenergetika majmuasi." },
      { name: 'Toshsaqa kanali', length: '~60 km (tizim 300+ km)', role: 'Bosh magistral', desc: "1938–1940-yillarda yagona tizimga birlashtirilgan bosh sug'orish tarmog'i; Shovot, Polvon va G'ozovotga suv beradi." },
      { name: 'Shovot kanali', length: '~150 km', role: "Xalqaro sug'orish", desc: "XVII asr oxirida qazilgan (ilk nomi Shohobod); Urganch markazidan o'tib Turkmanistonning Toshhovuz viloyatigacha boradi." },
      { name: 'Polvon kanali', length: '~80 km', role: "Janubiy sug'orish", desc: "Xonqa, Hazorasp, Yangiariq va Xiva tumanlari dehqonchiligini ta'minlovchi tarixiy magistral kanal." },
      { name: "Eshonrava va G'ovukko'l", length: "Cho'l ko'llari", role: 'Ekotizim va baliqchilik', desc: "Qoraqum chekkasida joylashgan ko'llar va Ozerniy-Daryoliq kollektor tizimlari suv balansini saqlaydi." },
    ],
    soilOverview:
      "Xorazm tuproqlari asosan Amudaryoning ko'p asrlik allyuvial yotqiziqlari ustida shakllangan. Qadimgi agroirrigatsion (madaniy sug'oriladigan) qatlam qalinligi ayrim tumanlarda 1–3 metrga yetadi; yer osti suvlari yaqin joylashgani sababli muntazam zovur drenaji va sho'r yuvish melioratsiyasi olib boriladi.",
    soilTypes: [
      { name: "Alluvial-o'tloqi tuproqlar", share: '~48%', desc: "Amudaryo yotqiziqlari ustida shakllangan, paxta, g'alla, sholi va poliz ekinlari uchun eng unumdor qatlam." },
      { name: "Sho'rlangan o'tloqi tuproqlar", share: '~32%', desc: "Mineralizatsiyalashgan yer osti suvlari ta'sirida yuzaga kelgan; qishki-bahorgi sho'r yuvish va drenaj talab etadi." },
      { name: "Qumli va cho'l tuproqlari", share: '~14%', desc: "Qizilqum (Tuproqqal'a) va Qoraqum (Qo'shko'pir, Xiva) chegaralarida uchraydigan yengil mexanik tarkibli yerlar." },
      { name: 'Taqir va taqirsimon yerlar', share: '~6%', desc: "Qadimiy delta tekisliklari va cho'l chekkalarida joylashgan zich loyli qatlamlar." },
    ],
    resources: [
      'Neft va tabiiy gaz konlari (Tuproqqal’a va janubiy hududlar)',
      'Osh tuzi va mirabilit zaxiralari',
      'Bentonit va kaolin gillari (g‘isht va kulolchilik xomashyosi)',
      'Qurilish qumi, ohaktosh va shag‘al',
      "Unimdor sug'oriladigan agroirrigatsion yerlar (~260 ming ga)",
    ],
    biosphereNote: {
      title: 'Quyi Amudaryo davlat biosfera rezervati (UNESCO)',
      text: "1971-yilda «Baday-To'qay» davlat qo'riqxonasi sifatida tashkil etilib, 2011-yilda kengaytirilgan (68,7 ming ga). Gurlan va Qo'shko'pir yaqinidagi Amudaryo to'qay ekotizimlarini hamda Buxoro bug'usi (xongul) populyatsiyasini muhofaza qilishda hal qiluvchi ahamiyatga ega.",
    },
    flora: [
      "Turang'i (to'qay teragi — Populus diversifolia)",
      "Qora va oq saksovul (cho'l qumlarini mustahkamlovchi)",
      "Jiyda (Elaeagnus) va yulg'un (Tamarix)",
      "Qamish, qo'g'a va to'qay lianalari (fors sarsabili)",
      'Xorazm guli, yantoq va sho‘ra o‘simliklari',
      'Voha bog‘lari: o‘rik, behi, uzum, anjir va tutzorlar',
    ],
    fauna: [
      "Buxoro bug'usi — Xongul (O'zbekiston Qizil kitobi)",
      "Jayron (Qizilqum va Qoraqum cho'llari)",
      "Xiva qirg'ovuli va pushti flamingo (cho'l ko'llarida)",
      'Amudaryo kurakburuni (noyob endemik baliq)',
      'Qum tulkisi (korsak), bo‘rsiq va tolay quyoni',
      "O'rta Osiyo cho'l toshbaqasi va kulrang echkiemar",
    ],
    facts: [
      "Xorazm viloyati hududining 90% dan ortig'i Amudaryoning qadimiy va hozirgi allyuvial deltasi cho'kindilaridan tashkil topgan.",
      "Yillik quyoshli kunlar soni 280–300 kunga yetib, O'zbekistondagi eng quyoshli hududlar qatoriga kiradi.",
      "Vohaning bosh kanallari — Toshsaqa, Shovot va Polvon ming yillik sug'orma dehqonchilik an'anasining davomidir.",
      "Gurlan va Xiva tumanlari atrofidagi to'qay hamda ko'l ekotizimlari noyob qushlar va xongul bug'usi makoni hisoblanadi.",
    ],
    sourceNote: "Manbalar: O'zbekiston Milliy Ensiklopediyasi, xorazmstat.uz (2025), O'zgidromet va Vikipediya (Xorazm viloyati).",
  },
  ru: {
    overview:
      'Хорезмская область расположена на северо-западе Узбекистана в нижнем левобережье Амударьи (40°31′–42°01′ с.ш., 60°03′–62°29′ в.д.). Площадь составляет 6 050 км²; древний плодородный оазис окружён пустынями Кызылкум и Каракумы.',
    locationDesc: 'Северо-Западный Узбекистан · Нижнее течение Амударьи',
    boundaries: [
      'На севере и востоке: Республика Каракалпакстан (вдоль Амударьи — Турткульский и Берунийский районы)',
      'На юго-востоке: Бухарская область (пустыня Кызылкум)',
      'На юге: Туркменистан (Лебапский и Дашогузский велаяты)',
      'На западе: Туркменистан (Дашогузский велаят)',
    ],
    keyStats: [
      { l: 'Площадь', v: '6 050 км²' },
      { l: 'Население (2025)', v: '2 039 558' },
      { l: 'Районы и города', v: '13 (11+2)' },
      { l: 'Высота над ур. моря', v: '70–145 м' },
      { l: 'Главная река', v: 'Амударья' },
    ],
    climate: {
      description:
        'По данным Узгидромета климат резко континентальный и засушливый: средняя температура января -3...-4°C (в суровые зимы до -25...-32°C), июля +28...+29°C (дневные максимумы +42...+44°C). Осадки — 80–100 мм в год, солнечных дней 280–300, вегетационный период ~205 дней.',
      highlights: [
        { k: 'sunny', l: 'Солнечных дней', v: '280–300 дн./год' },
        { k: 'rain', l: 'Осадки в год', v: '80–100 мм' },
        { k: 'temp', l: 'Амплитуда температур', v: '-32°C ... +44°C' },
        { k: 'veg', l: 'Вегетационный период', v: '200–210 дней' },
      ],
      seasons: [
        { name: 'Весна', months: 'Март–Май', temp: '+12...+26°C', desc: 'Быстрое потепление; на весну приходится максимум годовых дождей.' },
        { name: 'Лето', months: 'Июнь–Август', temp: '+35...+44°C', desc: 'Очень жаркое, сухое и ясное; нередки суховеи (гармсиль).' },
        { name: 'Осень', months: 'Сентябрь–Ноябрь', temp: '+8...+23°C', desc: 'Мягкая, сухая и солнечная погода, время сбора урожая.' },
        { name: 'Зима', months: 'Декабрь–Февраль', temp: '-4...-15°C', desc: 'Холодная и малоснежная; при арктических вторжениях до -25°C.' },
      ],
      avgTemps: [
        { month: 'Янв', temp: -3 }, { month: 'Фев', temp: 0 }, { month: 'Мар', temp: 8 }, { month: 'Апр', temp: 16 },
        { month: 'Май', temp: 23 }, { month: 'Июн', temp: 27 }, { month: 'Июл', temp: 29 }, { month: 'Авг', temp: 27 },
        { month: 'Сен', temp: 21 }, { month: 'Окт', temp: 13 }, { month: 'Ноя', temp: 6 }, { month: 'Дек', temp: 0 },
      ],
      precipitation: [
        { month: 'Янв', mm: 11 }, { month: 'Фев', mm: 10 }, { month: 'Мар', mm: 16 }, { month: 'Апр', mm: 13 },
        { month: 'Май', mm: 9 }, { month: 'Июн', mm: 3 }, { month: 'Июл', mm: 1 }, { month: 'Авг', mm: 1 },
        { month: 'Сен', mm: 3 }, { month: 'Окт', mm: 7 }, { month: 'Ноя', mm: 10 }, { month: 'Дек', mm: 12 },
      ],
    },
    waterSummary:
      'При годовых осадках 80–100 мм всё земледелие и водоснабжение области зависит от стока Амударьи. Ключевой гидроузел — Туямуюнское водохранилище, от которого вода через магистральные каналы Ташсака, Шават, Палван и Газават распределяется по районам, а дренаж отводится по коллекторам Озерный и Дарьялык.',
    waterStats: [
      { l: 'Орошаемые земли', v: '~260 000 га' },
      { l: 'Магистральные каналы', v: '350+ км' },
      { l: 'Главный гидроузел', v: 'Туямуюн' },
      { l: 'Природные озёра', v: 'более 30' },
    ],
    rivers: [
      { name: 'Амударья', length: '2 574 км (общая)', role: 'Главная водная артерия', desc: 'Крупнейшая река Центральной Азии; Хорезмский оазис сформирован на её левобережной дельтовой равнине.' },
      { name: 'Туямуюнское водохранилище', length: '4 бассейна + ГЭС', role: 'Сезонное регулирование', desc: 'Гидроузел с русловым водохранилищем и наливными чашами Капарас, Султансанджар и Кошбулак.' },
      { name: 'Канал Ташсака', length: '~60 км (система 300+ км)', role: 'Головной канал', desc: 'Объединённая в 1938–1940 гг. головная система, питающая каналы Шават, Палван и Газават.' },
      { name: 'Канал Шават', length: '~150 км', role: 'Межгосударственное орошение', desc: 'Построен в конце XVII века (Шахабад); проходит через центр Ургенча и орошает земли вплоть до Дашогуза.' },
      { name: 'Канал Палван', length: '~80 км', role: 'Южное орошение', desc: 'Старинный магистральный канал, снабжающий водой Ханкинский, Хазараспский, Янгиарыкский и Хивинский районы.' },
      { name: 'Озёра Эшанрава и Гавуккуль', length: 'Озёрно-дренажная сеть', role: 'Экосистема и рыболовство', desc: 'Пустынные озёра на кромке Каракумов и коллекторы Озерный–Дарьялык.' },
    ],
    soilOverview:
      'Почвы Хорезма сформированы многовековыми аллювиальными наносами Амударьи. Мощность окультуренного агроирригационного слоя достигает 1–3 метров; близость грунтовых вод требует системного дренажа и зимне-весенней промывки засолённых участков.',
    soilTypes: [
      { name: 'Аллювиально-луговые почвы', share: '~48%', desc: 'Наиболее плодородные орошаемые земли для выращивания хлопка, риса, пшеницы и знаменитых дынь.' },
      { name: 'Засолённые луговые почвы', share: '~32%', desc: 'Почвы с повышенной минерализацией; требуют регулярного промывного полива и работы коллекторов.' },
      { name: 'Песчаные пустынные почвы', share: '~14%', desc: 'Лёгкие песчаные массивы вдоль границ с Кызылкумом и Каракумами.' },
      { name: 'Такыры и такыровидные земли', share: '~6%', desc: 'Плотные глинистые участки древних дельтовых равнин.' },
    ],
    resources: [
      'Нефть и природный газ (Тупраккалинский район и южные участки)',
      'Поваренная соль и сульфат натрия (мирабилит)',
      'Бентонитовые и каолиновые глины для керамики и стройматериалов',
      'Строительный песок, известняк и гравий',
      'Плодородные орошаемые земли (~260 тыс. га)',
    ],
    biosphereNote: {
      title: 'Нижне-Амударьинский государственный биосферный резерват (ЮНЕСКО)',
      text: 'Основан в 1971 году как заповедник «Бадай-Тугай», преобразован в биосферный резерват в 2011 году (более 68,7 тыс. га). Сохраняет реликтовые тугайные леса низовьев Амударьи на стыке с Хорезмом и крупнейшую популяцию бухарского оленя (хангула).',
    },
    flora: [
      'Туранга (тугайный разнолистный тополь)',
      'Чёрный и белый саксаул (закрепители песков)',
      'Джида (лох восточный) и тамариск (юлгун)',
      'Тростник, рогоз и лианы тугайных лесов',
      'Пустынная верблюжья колючка (янток) и солянки',
      'Плодовые сады оазиса: урюк, айва, виноград, тутовник',
    ],
    fauna: [
      'Бухарский олень — хангул (Красная книга)',
      'Джейран (Кызылкум и Каракумы)',
      'Хивинский фазан и розовый фламинго (на озёрах)',
      'Большой амударьинский лопатонос (редкий эндемик)',
      'Лисица-корсак, барсук и заяц-толай',
      'Среднеазиатская черепаха и серый варан',
    ],
    facts: [
      'Более 90% территории Хорезма сложено аллювиальными отложениями древней и современной дельты Амударьи.',
      'Регион получает 280–300 солнечных дней в году и входит в число самых солнечных районов Узбекистана.',
      'Магистральные каналы Ташсака, Шават и Палван продолжают тысячелетнюю традицию хорезмской ирригации.',
      'Тугайные рощи и пустынные озёра Приаралья служат местом обитания редких видов Красной книги.',
    ],
    sourceNote: 'Источники: Национальная энциклопедия Узбекистана, xorazmstat.uz (2025), Узгидромет и Википедия.',
  },
  en: {
    overview:
      'Khorezm Region lies in northwestern Uzbekistan across the lower left-bank oasis of the Amu Darya River (40°31′–42°01′ N, 60°03′–62°29′ E). Covering 6,050 km² between the Kyzylkum and Karakum deserts, it is one of Central Asia’s oldest irrigated agricultural oases.',
    locationDesc: 'Northwestern Uzbekistan · Lower Amu Darya Oasis',
    boundaries: [
      'North & East: Republic of Karakalpakstan (Turtkul & Beruniy districts along the Amu Darya)',
      'Southeast: Bukhara Region (Kyzylkum desert frontier)',
      'South: Turkmenistan (Lebap and Dashoguz regions)',
      'West: Turkmenistan (Dashoguz region)',
    ],
    keyStats: [
      { l: 'Area', v: '6,050 km²' },
      { l: 'Population (2025)', v: '2,039,558' },
      { l: 'Districts & Cities', v: '13 (11+2)' },
      { l: 'Elevation Range', v: '70–145 m' },
      { l: 'Primary River', v: 'Amu Darya' },
    ],
    climate: {
      description:
        'According to UzHydromet records, Khorezm has a sharply continental arid climate: January averages -3 to -4°C (cold waves drop to -25..-32°C), while July averages +28 to +29°C (daytime peaks reach +42..+44°C). Annual rainfall is 80–100 mm with 280–300 sunny days and a ~205-day growing season.',
      highlights: [
        { k: 'sunny', l: 'Sunny Days', v: '280–300 days/yr' },
        { k: 'rain', l: 'Annual Rainfall', v: '80–100 mm' },
        { k: 'temp', l: 'Extreme Range', v: '-32°C to +44°C' },
        { k: 'veg', l: 'Growing Season', v: '200–210 days' },
      ],
      seasons: [
        { name: 'Spring', months: 'Mar–May', temp: '+12...+26°C', desc: 'Rapid warming; receives the majority of the year’s light rainfall.' },
        { name: 'Summer', months: 'Jun–Aug', temp: '+35...+44°C', desc: 'Very hot, bright, and arid with occasional dry desert winds.' },
        { name: 'Autumn', months: 'Sep–Nov', temp: '+8...+23°C', desc: 'Crisp, sunny, and dry weather ideal for harvest.' },
        { name: 'Winter', months: 'Dec–Feb', temp: '-4...-15°C', desc: 'Cold with light snow; Arctic outbreaks can bring sharp freezes.' },
      ],
      avgTemps: [
        { month: 'Jan', temp: -3 }, { month: 'Feb', temp: 0 }, { month: 'Mar', temp: 8 }, { month: 'Apr', temp: 16 },
        { month: 'May', temp: 23 }, { month: 'Jun', temp: 27 }, { month: 'Jul', temp: 29 }, { month: 'Aug', temp: 27 },
        { month: 'Sep', temp: 21 }, { month: 'Oct', temp: 13 }, { month: 'Nov', temp: 6 }, { month: 'Dec', temp: 0 },
      ],
      precipitation: [
        { month: 'Jan', mm: 11 }, { month: 'Feb', mm: 10 }, { month: 'Mar', mm: 16 }, { month: 'Apr', mm: 13 },
        { month: 'May', mm: 9 }, { month: 'Jun', mm: 3 }, { month: 'Jul', mm: 1 }, { month: 'Aug', mm: 1 },
        { month: 'Sep', mm: 3 }, { month: 'Oct', mm: 7 }, { month: 'Nov', mm: 10 }, { month: 'Dec', mm: 12 },
      ],
    },
    waterSummary:
      'With minimal annual rainfall (80–100 mm), Khorezm’s agriculture and water security rely entirely on the Amu Darya River. Regulated by the Tuyamuyun Hydrocomplex, river water flows through the Toshsaqa, Shavat, Palvan, and Gazavat trunk canals, while drainage collectors (Ozerniy and Daryalik) protect soils from waterlogging.',
    waterStats: [
      { l: 'Irrigated Farmland', v: '~260,000 ha' },
      { l: 'Trunk Canals', v: '350+ km' },
      { l: 'Main Reservoir', v: 'Tuyamuyun' },
      { l: 'Desert Lakes', v: '30+ lakes' },
    ],
    rivers: [
      { name: 'Amu Darya River', length: '2,574 km (total)', role: 'Primary Lifeline', desc: 'Central Asia’s largest river by volume; Khorezm occupies its lower left-bank deltaic oasis.' },
      { name: 'Tuyamuyun Reservoir', length: '4 Basins + HPP', role: 'Seasonal Regulation', desc: 'Strategic hydrocomplex comprising the channel reservoir plus Kaparas, Sultansanjar, and Koshbulak off-stream basins.' },
      { name: 'Toshsaqa Main System', length: '~60 km (300+ km net)', role: 'Headworks Network', desc: 'Unified in 1938–1940 to feed the Shavat, Palvan, and Gazavat regional irrigation branches.' },
      { name: 'Shavat Canal', length: '~150 km', role: 'Transboundary Canal', desc: 'Built in the late 17th century (originally Shahabad); flows through Urgench toward Dashoguz in Turkmenistan.' },
      { name: 'Palvan Canal', length: '~80 km', role: 'Southern Irrigation', desc: 'Historic trunk canal watering Khonka, Khazarasp, Yangiarik, and Khiva farmlands.' },
      { name: 'Eshanrava & Gavukkul Lakes', length: 'Lake-Drainage System', role: 'Wetlands & Fisheries', desc: 'Karakum desert fringe lakes alongside the Ozerniy and Daryalik drainage collectors.' },
    ],
    soilOverview:
      'Khorezm soils developed on centuries-old Amu Darya alluvial silt. Long-cultivated agro-irrigation horizons reach 1–3 meters deep; because groundwater tables sit close to the surface, winter-spring leaching and collector drainage remain essential.',
    soilTypes: [
      { name: 'Alluvial-Meadow Soils', share: '~48%', desc: 'Rich river-deposited oasis soils supporting cotton, wheat, rice, and Khorezm melons.' },
      { name: 'Saline Meadow Soils', share: '~32%', desc: 'Mineralized oasis tracts requiring seasonal leaching and subsurface/collector drainage.' },
      { name: 'Sandy Desert Soils', share: '~14%', desc: 'Light sandy-loam soils bordering the Kyzylkum and Karakum dunes.' },
      { name: 'Takyr Clay Plains', share: '~6%', desc: 'Compact clay-pan surfaces across ancient river delta terraces.' },
    ],
    resources: [
      'Oil and natural gas fields (Tuproqqala and southern sectors)',
      'Rock salt and mirabilite (Glauber’s salt)',
      'Bentonite and kaolin clays (ceramics & construction)',
      'Construction sand, limestone, and gravel',
      'Irrigated alluvial farmland (~260,000 hectares)',
    ],
    biosphereNote: {
      title: 'Lower Amu Darya State Biosphere Reserve (UNESCO)',
      text: 'Established in 1971 as the Baday-Tugai Reserve and expanded to 68,700+ hectares in 2011 adjacent to Gurlan District, it protects relict riparian tugai woodlands and one of the world’s largest populations of endangered Bukhara deer (Khangul).',
    },
    flora: [
      'Turanga poplar (Populus diversifolia riparian woodland)',
      'Black and white saxaul (desert sand stabilizers)',
      'Russian olive (jiyda) and tamarisk shrubs',
      'Reeds, cattails, and tugai climbing vines',
      'Camelthorn and halophyte desert flora',
      'Oasis orchards: apricots, quince, grapes, figs, mulberries',
    ],
    fauna: [
      'Bukhara deer — Khangul (Uzbekistan Red Book)',
      'Goitered gazelle (Kyzylkum & Karakum steppes)',
      'Khiva pheasant & greater flamingo (wetland lakes)',
      'Amu Darya shovelnose sturgeon (endemic species)',
      'Corsac desert fox, badger, and tolai hare',
      'Central Asian tortoise and desert monitor lizard',
    ],
    facts: [
      'Over 90% of Khorezm’s surface consists of ancient and modern Amu Darya alluvial delta sediments.',
      'Receiving 280–300 sunny days per year, Khorezm ranks among Uzbekistan’s sunniest provinces.',
      'The Toshsaqa, Shavat, and Palvan canals continue a multi-millennial oasis irrigation heritage.',
      'Bordering tugai forests and desert lakes shelter rare Red Book birds and Bukhara deer.',
    ],
    sourceNote: 'Sources: National Encyclopedia of Uzbekistan, xorazmstat.uz (2025), UzHydromet & Wikipedia.',
  },
};

export const getGeographyData = (lang = 'uz') => ({
  location: { lat: 41.55, lng: 60.63 },
  ...(geoContent[lang] || geoContent.uz),
});
export const geographyData = getGeographyData('uz');
