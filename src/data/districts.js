// Verified statistical data sources:
// - Population: Xorazm viloyati statistika boshqarmasi (xorazmstat.uz), as of April 1, 2025 (Regional total: 2,039,558)
// - Area, administrative centers, founding years, mahalla counts & historical facts:
//   Wikipedia (uz/ru/en), stat.uz / citypopulation.de, gov.uz & istc.uz (Regional total: 6,050 km²)

const districtsRaw = [
  {
    id: 'urganch-shahar',
    slug: 'urganch-shahar',
    typeKey: 'city',
    type: 'shahar',
    area: '30 km²',
    areaNum: 30,
    population: '156 110',
    populationNum: 156110,
    density: '5 204',
    mahallas: 40,
    postalCode: '220100',
    photo: '/images/districts/urganch-shahar.jpg',
    gallery: [
      '/images/districts/urganch-shahar.jpg',
      '/images/districts/urganch-shahar-2.jpg',
      '/images/districts/xonqa-tumani-2.jpg',
    ],
    coordinates: [41.55, 60.6333],
    uz: {
      name: 'Urganch shahri',
      center: 'Viloyat markazi',
      founded: '1643-yil',
      subdivisions: '40 ta mahalla',
      description:
        "Urganch shahri — Xorazm viloyatining ma'muriy, iqtisodiy va madaniy markazi. 1643-yilda Xiva xoni Abulg'oziy Bahodirxon tomonidan Amudaryo o'zanining o'zgarishi ortidan Toza Urganch (Yangi Urganch) sifatida asos solingan. Shahar o'rtasidan Shovot kanali oqib o'tib, uni shimoliy (ijtimoiy-madaniy va turar joy) hamda janubiy (sanoat va ishlab chiqarish) qismlarga ajratadi.",
      economy:
        "Urganch shahrida viloyatning asosiy sanoat korxonalari, yengil sanoat va oziq-ovqat fabrikalari, qurilish materiallari ishlab chiqarish quvvatlari, yirik savdo markazlari, bank filiallari hamda IT Park Xorazm rezidentlari faoliyat yuritadi. Shahar xalqaro aeroporti, temir yo'l vokzali va trolleybus liniyasi orqali Xiva hamda mamlakat hududlari bilan bog'langan.",
      agriculture:
        "Shahar hududida yirik issiqxona majmualari, shahar atrofi qishloq xo'jaligi mahsulotlarini qayta ishlash va logistika markazlari rivojlangan. Shovot kanali bo'ylarida obodonlashtirilgan istirohat bog'lari va yashil hududlar barpo etilgan.",
      education:
        "Urganch davlat universiteti (1935-yilda o'qituvchilar instituti sifatida asos solingan), TATU Urganch filiali, Toshkent tibbiyot akademiyasi Urganch filiali, Xorazm Ma'mun akademiyasi bo'linmalari, o'nlab umumta'lim maktablari hamda Ogahiy nomidagi viloyat musiqali drama teatri (1931-yilda Xivadan ko'chirilgan) faoliyat yuritadi.",
      tourism:
        "Shovot kanali ustidagi Avesto bog'i va me'moriy majmuasi, Al-Xorazmiy va Jaloliddin Manguberdi haykallari, Xorazm tasviriy san'at galereyasi, markaziy istirohat bog'lari hamda Urganch — Xiva zamonaviy transport yo'nalishlari sayyohlar uchun asosiy manzillardir.",
      facts: [
        "Rasmiy aholi soni 2025-yil 1-aprel holatiga 156 110 kishini tashkil etadi (xorazmstat.uz).",
        "Shahar hududida 40 ta mahalla fuqarolar yig'ini mavjud; pochta indeksi — 220100.",
        "Shahar 1643-yilda Abulg'oziy Bahodirxon davrida Buyuk Ipak yo'lidagi savdo qo'rg'oni sifatida qurilgan.",
        "Markaziy Osiyodagi kam sonli faol trolleybus tizimlaridan biri — Urganch–Xiva yo'nalishi aynan shu yerdan boshlanadi.",
        "Shahar chetlarini qo'shib hisoblaganda zamonaviy kengaytirilgan shahar aglomeratsiya chegarasi ~38,1 km² ni (tarixiy shahar yadrosi 30 km²) tashkil etadi.",
      ],
    },
    ru: {
      name: 'город Ургенч',
      center: 'Областной центр',
      founded: '1643 год',
      subdivisions: '40 махаллей',
      description:
        'Ургенч — административный, экономический и культурный центр Хорезмской области. Основан в 1643 году хивинским ханом Абульгази Бахадурханом как Тоза-Ургенч (Новый Ургенч) после изменения русла Амударьи. Через центр города проходит канал Шават, разделяющий его на северную жилую и культурную часть и южную промышленную зону.',
      economy:
        'В Ургенче сосредоточены ведущие предприятия пищевой, лёгкой и строительной промышленности области, торговые центры, финансовые институты и резиденты технопарка IT Park. Город обслуживают международный аэропорт, железнодорожный вокзал и междугородняя троллейбусная линия до Хивы.',
      agriculture:
        'На территории города и пригородной зоны развиты тепличные хозяйства, логистические хабы по переработке сельхозпродукции и благоустроенные набережные парковые зоны вдоль канала Шават.',
      education:
        'Функционируют Ургенчский государственный университет (истоки с 1935 года), филиалы ТУИТ и Ташкентской медицинской академии, научные школы и Хорезмский областной музыкально-драматический театр имени Огахи (переведённый из Хивы в 1931 году).',
      tourism:
        'Главные точки притяжения — мемориальный комплекс «Авесто» и мост на канале Шават, монументы Аль-Хорезми и Джалаладдину Мангуберди, парки культуры и удобная база для путешествий в Хиву и древние крепости Хорезма.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 156 110 человек (xorazmstat.uz).',
        'В административном составе города действуют 40 махаллей; почтовый индекс — 220100.',
        'Основан в 1643 году как укреплённый торговый центр на Великом шёлковом пути в 170 км от Куня-Ургенча.',
        'Ургенч связан с Хивой одной из самых протяжённых действующих троллейбусных линий Центральной Азии.',
        'Базовая площадь городской застройки составляет ~30 км² (с учётом новых границ агломерации — ~38,1 км²).',
      ],
    },
    en: {
      name: 'Urgench City',
      center: 'Regional Capital',
      founded: '1643',
      subdivisions: '40 neighborhoods (MFY)',
      description:
        'Urgench is the administrative, economic, and cultural capital of the Khorezm region. Founded in 1643 by Khan Abulghazi Bahadur as Toza Urganch ("New Urgench") after the Amu Darya shifted away from medieval Kunya-Urgench, the city is bisected by the Shavat Canal into a northern civic/academic half and a southern industrial zone.',
      economy:
        'Urgench hosts the region’s primary food-processing, textile, and construction industries, commercial hubs, banking headquarters, and the Khorezm IT Park branch. Transport connectivity relies on Urgench International Airport, the main railway station, and the Urgench–Khiva electric trolleybus line.',
      agriculture:
        'Peri-urban greenhouses, agricultural cold-storage and processing centers, and landscaped green belts along the Shavat Canal support regional supply chains.',
      education:
        'Key institutions include Urgench State University (originating in 1935), regional branches of TUIT and the Tashkent Medical Academy, specialized lyceums, and the Ogahiy Regional Musical Drama Theater (relocated from Khiva in 1931).',
      tourism:
        'Visitors explore the Avesta Memorial Park and bridge over the Shavat Canal, monuments to Muhammad ibn Musa al-Khwarizmi and Jaloliddin Manguberdi, fine arts galleries, and use Urgench as the gateway to Khiva.',
      facts: [
        'Official population is 156,110 as of April 1, 2025 (xorazmstat.uz).',
        'Administers 40 neighborhood communities (MFY); primary postal code is 220100.',
        'Established in 1643 along a branch of the Silk Road roughly 170 km from ancient Kunya-Urgench.',
        'Operates one of Central Asia’s few remaining electric trolleybus routes, linking Urgench directly with Khiva.',
        'Urban core covers ~30 km² (extending to ~38.1 km² under updated municipal boundaries).',
      ],
    },
  },

  {
    id: 'xiva-shahar',
    slug: 'xiva-shahar',
    typeKey: 'city',
    type: 'shahar',
    area: '28 km²',
    areaNum: 28,
    population: '100 312',
    populationNum: 100312,
    density: '3 583',
    mahallas: 21,
    postalCode: '220900',
    photo: '/images/districts/xiva-shahar.jpg',
    gallery: [
      '/images/districts/xiva-shahar.jpg',
      '/images/districts/xiva-shahar-2.jpg',
      '/images/kalta-minor.jpg',
    ],
    coordinates: [41.3783, 60.3639],
    uz: {
      name: 'Xiva shahri',
      center: 'Tarixiy shahar',
      founded: 'Mil. avv. VI–V asr',
      subdivisions: 'Shahar hududi (Polvonyop bo‘yi)',
      description:
        "Xiva — 2500 yildan ortiq tarixga ega afsonaviy ochiq osmon ostidagi muzey-shahar, Urganchdan 30 km janubi-g'arbda, Polvonyop (qadimgi Xeykaniq) kanali bo'yida joylashgan. 1990-yilda shaharning Ichan-Qal'a qismi Markaziy Osiyoda birinchi bo'lib UNESCO Jahon merosi ro'yxatiga kiritilgan. Xiva Xiva xonligining poytaxti sifatida jahon me'morchiligida noyob iz qoldirgan.",
      economy:
        "Shahar iqtisodiyotining yetakchi tarmog'i — xalqaro va ichki turizm, mehmonxona va restoran xizmatlari, shuningdek an'anaviy yog'och o'ymakorligi, gilamdo'zlik, ipakchilik va kulolchilik hunarmandchiligi. Urganch–Xiva temir yo'l vokzalining ishga tushirilishi transport-logistika salohiyatini keskin oshirdi.",
      agriculture:
        "Tarixiy Dishan-Qal'a va shahar chetlarida bog'dorchilik, tokzorlar hamda Xiva oshxonasi uchun sholi, sabzavot va poliz mahsulotlari yetishtirish an'anasi davom etmoqda.",
      education:
        "Xivada Xorazm Ma'mun akademiyasi (UNESCO hamkorligidagi nufuzli ilmiy markaz), Ichan-Qal'a davlat muzey-qo'riqxonasi ilmiy bo'limi, xalqaro hunarmandchilik maktablari hamda kasb-hunar muassasalari faoliyat ko'rsatadi.",
      tourism:
        "Ichan-Qal'a tarkibida 50 dan ortiq tarixiy yodgorlik va 250 ga yaqin qadimiy turar joy saqlangan: Kalta Minor, Islom Xo'ja minorasi, Ko'hna Ark, Juma masjidi (213 yog'och ustun), Toshhovli saroyi, Pahlavon Mahmud maqbarasi hamda Dishan-Qal'adagi Nurullaboy saroyi har yili yuz minglab sayyohlarni jalb etadi.",
      facts: [
        "2025-yil 1-aprel holatiga ko'ra Xiva shahrining doimiy aholisi 100 312 kishini tashkil qiladi (xorazmstat.uz).",
        "Shahar maydoni Vikipediya ma'lumotlariga ko'ra 2,8 ming gektar (28 km², ichki tarixiy shahar chegarasi ~18,6 km²).",
        "Ichan-Qal'a 1990-yilda O'zbekiston va Markaziy Osiyodan UNESCO Jahon merosi ro'yxatiga kirgan ilk ob'ektdir.",
        "Rivoyatlar va tarixiy manbalarga ko'ra shahar nomi Ichan-Qal'adagi qadimgi Xeyvaq qudug'i bilan bog'lanadi.",
        "Xiva 2020-yilda TURKSOY tomonidan «Turk dunyosining madaniy poytaxti» deb e'lon qilingan.",
      ],
    },
    ru: {
      name: 'город Хива',
      center: 'Исторический город',
      founded: 'VI–V вв. до н. э.',
      subdivisions: 'Городская администрация',
      description:
        'Хива — легендарный город-музей под открытым небом с историей более 2500 лет, расположенный в 30 км к юго-западу от Ургенча на канале Палван-яп. В 1990 году внутренний город Ичан-Кала первым в Центральной Азии был включён в Список всемирного наследия ЮНЕСКО.',
      economy:
        'Основу экономики составляют международный и внутренний туризм, гостиничный бизнес и традиционные ремёсла: резьба по дереву, ковроткачество, шелководство и керамика. Высокоскоростное железнодорожное сообщение с Ташкентом и Бухарой стимулирует сервисный сектор.',
      agriculture:
        'В пригородной зоне Дишан-Калы исторически развиты садоводство, виноградарство и выращивание бахчевых культур.',
      education:
        'В Хиве работает Хорезмская академия Мамуна (возрождённая при поддержке ЮНЕСКО), научный отдел государственного музея-заповедника «Ичан-Кала» и школы прикладного искусства.',
      tourism:
        'Ансамбль Ичан-Кала насчитывает свыше 50 исторических памятников: минареты Кальта-Минар и Ислам-Ходжа, Куня-Арк, Джума-мечеть с 213 резными колоннами, дворец Таш-Хаули, мавзолей Пахлаван Махмуда и дворец Нуруллабая в Дишан-Кале.',
      facts: [
        'Численность постоянного населения на 1 апреля 2025 года — 100 312 человек (xorazmstat.uz).',
        'Площадь города — 28 км² (2,8 тыс. га; центральное городское ядро — 18,6 км²).',
        'Ичан-Кала внесена в Список всемирного наследия ЮНЕСКО в 1990 году.',
        'По легендам и источникам, название города восходит к древнему колодцу Хейвак внутри цитадели.',
        'В 2020 году Хива была объявлена культурной столицей тюркского мира (ТЮРКСОЙ).',
      ],
    },
    en: {
      name: 'Khiva City',
      center: 'Historic City',
      founded: '6th–5th c. BC',
      subdivisions: 'Municipal City Area',
      description:
        'Khiva is a legendary open-air museum city boasting over 2,500 years of history, situated 30 km southwest of Urgench along the Polvonyop Canal. Its mud-brick inner citadel, Ichan-Kala, became Central Asia’s first UNESCO World Heritage site in 1990.',
      economy:
        'Hospitality, heritage tourism, culinary enterprise, and traditional crafts — woodcarving, silk carpet weaving, and Khorezm glazed ceramics — drive the city economy alongside modern rail links directly connecting Khiva Station with Bukhara, Samarkand, and Tashkent.',
      agriculture:
        'Orchards, vineyards, and melon gardens flourish in the outer Dishan-Kala belt surrounding the historic walls.',
      education:
        'Khiva houses the restored Khorezm Mamun Academy of Sciences, the research department of the Ichan-Kala State Museum-Reserve, and traditional artisan guild workshops.',
      tourism:
        'Highlights encompass more than 50 monuments inside Ichan-Kala — Kalta Minor, Islam Khoja Minaret, Kunya-Ark, the 213-column Juma Mosque, Toshhovli Palace, and Pahlavon Mahmud Mausoleum — plus Nurullaboy Palace in Dishan-Kala.',
      facts: [
        'Official population reached 100,312 residents as of April 1, 2025 (xorazmstat.uz).',
        'Municipal territory is 28 km² (2,800 ha per Wikipedia; urban core ~18.6 km²).',
        'Ichan-Kala was inscribed onto the UNESCO World Heritage list in 1990.',
        'Historical tradition ties Khiva’s name to the ancient Heyvaq Well still preserved inside Ichan-Kala.',
        'Named Cultural Capital of the Turkic World by TURKSOY in 2020.',
      ],
    },
  },

  {
    id: 'urganch-tumani',
    slug: 'urganch-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '450 km²',
    areaNum: 450,
    population: '219 706',
    populationNum: 219706,
    density: '488',
    mahallas: 25,
    postalCode: '220500',
    photo: '/images/districts/urganch-tumani.jpg',
    gallery: [
      '/images/districts/urganch-tumani.jpg',
      '/images/districts/urganch-tumani-2.jpg',
    ],
    coordinates: [41.55, 60.64],
    uz: {
      name: 'Urganch tumani',
      center: 'Qorovul qishlog‘i',
      founded: '1926-yil 29-sentabr',
      subdivisions: '1 shaharcha (Chalish), 10 QFY',
      description:
        "Urganch tumani — Xorazm viloyatining aholisi eng ko'p bo'lgan tumani bo'lib, 1926-yil 29-sentabrda tashkil etilgan (1964-yilda qayta tuzilgan). Sharqda Xonqa, g'arbda Qo'shko'pir va Shovot, shimoli-g'arbda Yangibozor, shimolda Qoraqalpog'iston Respublikasi, janubda Xiva tumani bilan chegaradosh. Hududi G'ozovot, Shovot, Qulobod va Do'rman kanallari bilan sug'oriladi.",
      economy:
        "Tumanda paxta tozalash zavodi, g'isht va qurilish materiallari korxonalari, to'qimachilik, sut va uzumni qayta ishlash sexlari, parrandachilik fabrikasi hamda Urganch shahri atrofidagi logistika va xizmat ko'rsatish majmualari faoliyat yuritadi. Hududdan Toshkent–Shovot va Toshkent–Xiva temir yo'llari o'tadi.",
      agriculture:
        "Qishloq xo'jaligi paxtachilik, g'allachilik, sholichilik (3,3 ming ga dan ortiq sholi maydoni), sabzavot-poliz ekinlari hamda bog'dorchilikka ixtisoslashgan. O'rik, olma, anjir, shaftoli, anor va uzum bog'lari, shuningdek chorvachilik va pillachilik keng rivojlangan.",
      education:
        "Tumanda 44 dan ortiq umumta'lim maktabi, kasb-hunar maktablari, bolalar musiqa va sport maktablari, markaziy va tarmoq kutubxonalari hamda qishloq madaniyat uylari faoliyat ko'rsatadi.",
      tourism:
        "Tumanning G'oybu qishlog'ida XVII asrga oid mashhur «Ulli Hovli» (o'zbek-turkman do'stlik va tarixiy qo'rg'on) majmuasi joylashgan bo'lib, sayyohlar uchun qadimiy me'morchilik va etnoturizm maskani sifatida xizmat qiladi.",
      facts: [
        "2025-yil 1-aprel holatiga ko'ra aholi soni 219 706 kishini tashkil etib, Xorazm viloyatida 1-o'rinda turadi (xorazmstat.uz).",
        "Umumiy yer maydoni 450 km² (0,46 ming km²); ma'muriy markazi — Qorovul qishlog'i.",
        "Tuman tarkibida Chalish shaharchasi va 10 ta qishloq fuqarolar yig'ini (Bekobod, Qorovul, G'oybu, Chakkasholikor va b.) mavjud.",
        "XVII asrda bunyod etilgan tarixiy «Ulli Hovli» qo'rg'oni aynan Urganch tumani hududida joylashgan.",
        "Amudaryo bo'yidagi to'qayzorlarda turang'il, jiyda va saksovullar o'sadi; asosiy suv manbalari — Shovot va G'ozovot kanallari.",
      ],
    },
    ru: {
      name: 'Ургенчский район',
      center: 'село Караул (Qorovul)',
      founded: '29 сентября 1926 г.',
      subdivisions: '1 посёлок (Чалиш), 10 сельских сходов',
      description:
        'Ургенчский район — самый густонаселённый и крупнейший по числу жителей район Хорезмской области, образован 29 сентября 1926 года. Окружает областной центр и орошается магистральными каналами Газават, Шават, Кулабад и Дурман.',
      economy:
        'Развиты хлопкоочистительная промышленность, производство кирпича и стройматериалов, текстильные предприятия, цеха переработки молока и винограда, птицефабрики. Через район проходят железнодорожные линии Ташкент–Шават и Ташкент–Хива.',
      agriculture:
        'Ведущие направления — хлопководство, зерноводство, рисоводство, бахчеводство, садоводство (абрикос, виноград, гранат, инжир), животноводство и шелководство.',
      education:
        'Работают более 44 общеобразовательных школ, профессиональные колледжи, музыкальные и спортивные школы, центральная и сельские библиотеки.',
      tourism:
        'Главный исторический объект района — отреставрированный XVII-вековый комплекс-крепость «Улли Ховли» в селе Гайбу, символизирующий культурное единство народов Хорезма и принимающий иностранных туристов.',
      facts: [
        'Крупнейший район области по населению — 219 706 жителей на 1 апреля 2025 года (xorazmstat.uz).',
        'Площадь территории — 450 км²; административный центр — село Караул (Qorovul).',
        'Включает городской посёлок Чалиш и 10 сельских сходов граждан.',
        'На территории района в селе Гайбу расположен знаменитый исторический комплекс «Улли Ховли».',
      ],
    },
    en: {
      name: 'Urgench District',
      center: 'Qorovul village',
      founded: 'September 29, 1926',
      subdivisions: '1 town (Chalish), 10 rural councils',
      description:
        'Urgench District is the most populous district in Khorezm Region, established on September 29, 1926, and re-formed in 1964. Bordering Karakalpakstan to the north and irrigated by the Gazavat, Shavat, Qulobod, and Do‘rman canals, it forms the fertile agricultural belt surrounding Urgench City.',
      economy:
        'Local industry includes cotton ginning, brick and construction materials, textile weaving, dairy and grape processing, poultry farming, and regional logistics along the Tashkent–Shovot and Tashkent–Khiva railway lines.',
      agriculture:
        'Specializes in cotton, winter wheat, rice (over 3,300 ha), melons, vegetables, orchards (apricot, fig, pomegranate, grapes), livestock, and sericulture.',
      education:
        'Maintains over 44 general schools, vocational colleges, music and sports schools, and an extensive public library network.',
      tourism:
        'The 17th-century fortified homestead complex Ulli Hovli in G‘oybu village serves as a renowned historical and ethno-tourism center.',
      facts: [
        'Ranks first in Khorezm by population with 219,706 inhabitants as of April 1, 2025 (xorazmstat.uz).',
        'Covers 450 km²; administrative center is Qorovul village.',
        'Comprises Chalish settlement and 10 rural citizen assemblies including G‘oybu and Qorovul.',
        'Home to the historic 17th-century Ulli Hovli fortress-homestead.',
      ],
    },
  },

  {
    id: 'bogot-tumani',
    slug: 'bogot-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '440 km²',
    areaNum: 440,
    population: '180 209',
    populationNum: 180209,
    density: '410',
    mahallas: 43,
    postalCode: '220200',
    photo: '/images/districts/bogot-tumani.jpg',
    gallery: [
      '/images/districts/bogot-tumani.jpg',
      '/images/districts/bogot-tumani-2.jpg',
    ],
    coordinates: [41.3519, 60.8183],
    uz: {
      name: 'Bog‘ot tumani',
      center: 'Bog‘ot shaharchasi',
      founded: '1970-yil 7-dekabr',
      subdivisions: '43 ta mahalla, 11 QFY',
      description:
        "Bog‘ot tumani Xorazm viloyatining janubi-sharqiy qismida joylashgan bo'lib, hozirgi shaklda 1970-yil 7-dekabrda tashkil etilgan. Shimolda Xonqa, g'arbda Yangiariq, sharqda Hazorasp tumanlari, shimoli-sharqda Amudaryo orqali Qoraqalpog'iston va janubda Turkmaniston bilan chegaradosh. Ekin maydonlari Toshsoqa kanali va uning Bayramsoqa, Qizilrabot shoxobchalari orqali sug'oriladi.",
      economy:
        "Tumanda to'qimachilik va tikuvchilik klasterlari, paxta tozalash zavodlari, qishloq xo'jaligi mahsulotlarini quritish va qayta ishlash korxonalari, qurilish materiallari sexlari hamda kichik biznes sub'ektlari rivojlanmoqda.",
      agriculture:
        "Tuman nomi («Bog‘lar diyori») bejiz emas — Bog‘ot Xorazmda bog'dorchilik, uzumchilik va agroturizm bo'yicha yetakchi hududlardan biri hisoblanadi. Paxta, g'alla, sholi va shirin qovun-tarvuzlar yetishtiriladi; hududda Otako'l, Sho'rko'l, Ko'kko'l va To'qayko'l kabi 50 dan ziyod tabiiy ko'l bor.",
      education:
        "Tumanda o'nlab umumiy o'rta ta'lim maktablari, kasb-hunar maktablari, ixtisoslashtirilgan sport seksiyalari hamda madaniyat markazlari faoliyat ko'rsatadi.",
      tourism:
        "Bog‘ot tumani uzumzor bog'lari va oilaviy agroturizm maskanlari, shuningdek Amudaryo bo'yi manzaralari va Qoraqumga tutash tabiiy ko'llari bilan ekoturizm ixlosmandlarini o'ziga tortadi.",
      facts: [
        "2025-yil 1-aprel holatiga aholisi 180 209 kishini tashkil etadi (xorazmstat.uz).",
        "Umumiy maydoni 440 km² (0,44 ming km²); tuman tarkibida 43 ta mahalla va 11 ta QFY bor.",
        "«Bog‘ot» atamasi arabcha ko‘plik qo‘shimchasi orqali «bog‘lar diyori, bog‘zor» ma'nosini anglatadi.",
        "Tuman hududida Qoraqumga tutash hududlarda 50 dan ortiq ko‘l (Otako‘l, Ko‘kko‘l, Sho‘rko‘l va b.) joylashgan.",
      ],
    },
    ru: {
      name: 'Багатский район',
      center: 'посёлок Багат (Bog‘ot)',
      founded: '7 декабря 1970 г.',
      subdivisions: '43 махалли, 11 сельских сходов',
      description:
        'Багатский (Богатский) район расположен в юго-восточной части Хорезмской области и в современном статусе образован 7 декабря 1970 года. Главной водной артерией служит канал Ташсака с ветвями Байрамсака и Кызылработ; на юге территория граничит с пустыней Каракумы и Туркменистаном.',
      economy:
        'В районе работают текстильные кластеры, хлопкоочистительный завод, предприятия по переработке плодоовощной продукции и винограда, а также строительные организации.',
      agriculture:
        'Название района переводится как «Край садов»: Багат славится виноградниками, садоводством, хлопководством, выращиванием риса и бахчевых культур. В пределах района насчитывается свыше 50 озёр, среди которых Атакуль, Коккуль и Шоркуль.',
      education:
        'Действует развитая сеть общеобразовательных школ, профессиональных училищ, детско-юношеских спортивных и музыкальных учреждений.',
      tourism:
        'Перспективно развивается агротуризм на базе образцовых виноградных хозяйств и экотуризм у природных озёр и берегов Амударьи.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 180 209 человек (xorazmstat.uz).',
        'Площадь территории — 440 км²; включает 43 махалли и 11 сельских сходов.',
        'Топоним «Bog‘ot» восходит к слову со значением «множество садов».',
        'Насчитывается более 50 природных озёр в понижениях на границе с Каракумами.',
      ],
    },
    en: {
      name: 'Bogʻot District',
      center: 'Bogʻot town',
      founded: 'December 7, 1970',
      subdivisions: '43 mahallas, 11 rural councils',
      description:
        'Bogʻot District lies in southeastern Khorezm and was established in its current form on December 7, 1970. Irrigated by the Toshsoqa Canal and its branches, it borders Turkmenistan and the Karakum fringes to the south and the Amu Darya to the northeast.',
      economy:
        'Key drivers include cotton-textile clusters, agricultural dehydration and fruit processing, building materials manufacturing, and small enterprise.',
      agriculture:
        'True to its name meaning "Land of Gardens," Bogʻot excels in viticulture and horticulture alongside cotton, grain, rice, and sweet melons; more than 50 natural lakes dot its southern lowland margin.',
      education:
        'Operates general secondary schools, vocational institutions, youth sports facilities, and cultural clubs.',
      tourism:
        'Famous locally for vineyard agrotourism farms, lakeside nature routes (Otako‘l, Ko‘kko‘l), and traditional Khorezmian rural hospitality.',
      facts: [
        'Official population is 180,209 as of April 1, 2025 (xorazmstat.uz).',
        'Area covers 440 km²; includes 43 mahallas and 11 rural assemblies; postal code 220200.',
        'Its name "Bog‘ot" historically translates to "Land of Orchards and Gardens."',
        'Over 50 small natural lakes lie along the Karakum-adjacent lowlands.',
      ],
    },
  },

  {
    id: 'gurlan-tumani',
    slug: 'gurlan-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '447 km²',
    areaNum: 447,
    population: '160 471',
    populationNum: 160471,
    density: '359',
    mahallas: 48,
    postalCode: '220300',
    photo: '/images/districts/gurlan-tumani.jpg',
    gallery: [
      '/images/districts/gurlan-tumani.jpg',
      '/images/districts/gurlan-tumani-2.jpg',
    ],
    coordinates: [41.8417, 60.3958],
    uz: {
      name: 'Gurlan tumani',
      center: 'Gurlan shaharchasi',
      founded: '1926-yil 29-sentabr',
      subdivisions: '48 ta mahalla, 9 QFY',
      description:
        "Gurlan tumani — Xorazm viloyatining eng shimoliy tumani bo'lib, 1926-yil 29-sentabrda tashkil etilgan. Shimol va sharqda Amudaryo orqali Qoraqalpog'iston Respublikasi, janubi-sharqda Yangibozor, janubda Shovot va janubi-g'arbda Turkmaniston bilan chegaradosh. Ekinzorlari Qilichboyarna, Qiyotqo'ng'irot va Daryoliq kanallari suvlaridan sug'oriladi.",
      economy:
        "Tumanda yirik «Gurlan Global Textile» va ip-kalava korxonalari, sholini qayta ishlash va un tegirmonlari, yog'-moy hamda qurilish materiallari ishlab chiqarish quvvatlari faoliyat yuritadi. Amudaryo bo'yidagi chegara savdosi va transport aloqalari rivojlangan.",
      agriculture:
        "Gurlan Xorazm viloyatida sholichilik, paxtachilik va bug'doychilik bo'yicha yetakchi tumanlardan biridir. Amudaryo bo'yidagi unumdor allyuvial yerlarda yuqori sifatli Xorazm guruchi («Alanga», «Lazer» navlari), poliz mahsulotlari va sut-go'sht chorvachiligi yo'lga qo'yilgan.",
      education:
        "Tumanda umumta'lim va ixtisoslashtirilgan maktablar, kasb-hunar muassasalari, axborot-kutubxona markazi hamda sport komplekslari faoliyat ko'rsatadi.",
      tourism:
        "Gurlan tumanida Vazir shahar xarobalari (o'rta asrlardagi Xorazmning muhim shahri), Usmon Said bobo maqbara-masjidi, Amudaryo bo'yi to'qaylari va qadimiy sug'orish kanallari tarixiy qiziqish uyg'otadi.",
      facts: [
        "2025-yil 1-aprel holatiga ko'ra aholi soni 160 471 kishini tashkil qiladi (xorazmstat.uz).",
        "Aniq hududi 447,4 km² (viloyat umumiy maydonining qariyb 7,3 foizi); tarkibida 48 ta mahalla va 9 ta QFY bor.",
        "Tumanning Vazir qishlog'i o'rnida XVI asrda Abulg'oziy Bahodirxon davrigacha gullab-yashnagan qadimiy Vazir shahri mavjud bo'lgan.",
        "Gurlan sholikorlari respublika miqyosida yuqori sifatli guruch yetishtiruvchilar qatorida e'tirof etiladi.",
      ],
    },
    ru: {
      name: 'Гурленский район',
      center: 'посёлок Гурлен (Gurlan)',
      founded: '29 сентября 1926 г.',
      subdivisions: '48 махаллей, 9 сельских сходов',
      description:
        'Гурленский район — самый северный район Хорезмской области, основанный 29 сентября 1926 года. На севере и востоке омывается Амударьёй (граница с Каракалпакстаном), а на юго-западе граничит с Туркменистаном. Орошается каналами Клычбайарна, Кияткунград и Дарьялык.',
      economy:
        'В районе работают текстильные комбинаты, рисоочистительные и мукомольные заводы, масложировые предприятия и стройиндустрия.',
      agriculture:
        'Один из главных центров рисоводства Хорезма («Лазер», «Аланга» и местные сорта), хлопководства, зерноводства, выращивания бахчевых культур и мясо-молочного животноводства.',
      education:
        'Функционируют десятки общеобразовательных школ, специализированные учебные заведения, центры культуры и спортивные комплексы.',
      tourism:
        'Исторический интерес представляют городище древнего города Вазир (крупного средневекового центра Хорезма), мечеть-мавзолей Усмон Саид-бобо и тугайные ландшафты вдоль Амударьи.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 160 471 человек (xorazmstat.uz).',
        'Точная площадь — 447,4 км² (около 7,3% территории области); насчитывает 48 махаллей.',
        'На месте села Вазир в средневековье располагался известный город Вазир — одна из столиц Хорезмского ханства.',
        'Ведущий рисоводческий район северного Хорезма.',
      ],
    },
    en: {
      name: 'Gurlan District',
      center: 'Gurlan town',
      founded: 'September 29, 1926',
      subdivisions: '48 mahallas, 9 rural councils',
      description:
        'Gurlan District is the northernmost district of Khorezm Region, created on September 29, 1926. Bounded by the Amu Darya to the north and east and Turkmenistan to the southwest, its fertile alluvial plains are fed by the Qilichboyarna and Qiyotqo‘ng‘irot canals.',
      economy:
        'Modern spinning and textile factories, rice milling, grain elevators, vegetable-oil processing, and building-material production anchor the local industrial base.',
      agriculture:
        'Renowned as one of Khorezm’s premier rice-growing hubs alongside cotton, winter wheat, melons, and dairy/beef husbandry.',
      education:
        'Supports a network of secondary and specialized schools, vocational centers, public libraries, and athletic arenas.',
      tourism:
        'Notable heritage attractions include the medieval ruins of Vazir city, the Usmon Said Bobo mosque-minaret, and Amu Darya tugai riverside scenery.',
      facts: [
        'Official population is 160,471 as of April 1, 2025 (xorazmstat.uz).',
        'Precise territory equals 447.4 km² (7.3% of Khorezm Region) across 48 mahallas and 9 rural councils.',
        'Vazir village preserves the legacy of medieval Vazir, once an important capital before the 1643 shift to New Urgench.',
        'Gurlan leads northern Khorezm in high-yield alluvial rice production.',
      ],
    },
  },

  {
    id: 'hazorasp-tumani',
    slug: 'hazorasp-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '130 km²',
    areaNum: 130,
    population: '210 774',
    populationNum: 210774,
    density: '1 621',
    mahallas: 46,
    postalCode: '220700',
    photo: '/images/districts/hazorasp-tumani.jpg',
    gallery: [
      '/images/districts/hazorasp-tumani.jpg',
      '/images/districts/hazorasp-tumani-2.jpg',
    ],
    coordinates: [41.3167, 61.0667],
    uz: {
      name: 'Hazorasp tumani',
      center: 'Hazorasp shahri',
      founded: '1926-yil 29-sentabr',
      subdivisions: '46 ta mahalla, 8 QFY',
      description:
        "Hazorasp tumani 1926-yil 29-sentabrda tashkil etilgan bo'lib, vohaning eng qadimiy tarixiy markazlaridan biridir. 2020-yil may oyida tumanning sharqiy hududidan Tuproqqal'a tumani ajratilib, mustaqil tuman tashkil etilgandan so'ng Hazorasp tumanining hududi 130 km² ni tashkil etdi (avvalgi umumiy ko'rsatkich 450 km²). Hazorasp shahri esa 2500 yildan ziyod tarixga ega «Ming ot» ma'nosidagi qadimiy qal'a shahridir.",
      economy:
        "Hazorasp erkin iqtisodiy zonasi («Hazorasp EIZ»), paxta tozalash, qandolat, qurilish materiallari va to'qimachilik korxonalari, yirik ulgurji bozorlar tuman iqtisodiyotining asosini tashkil etadi.",
      agriculture:
        "Tumanning zich sug'oriladigan hududida Polvon va Toshsoqa kanallari suvlari yordamida bog'dorchilik, sabzavotchilik, paxtachilik, issiqxona xo'jaliklari va baliqchilik keng rivojlangan.",
      education:
        "Tumanda o'nlab umumta'lim maktablari, kasb-hunar kollejlari, Hazorasp tarixiy muzey-bo'linmalari hamda yoshlar ijodiyot markazlari faoliyat yuritadi.",
      tourism:
        "Miloddan avvalgi V–IV asrlarga oid qadimiy Hazorasp qal'asi, muhtasham Hazorasp Qo'y darvozasi va devorlari, Sulaymonqal'a yodgorligi hamda Shayx Husayn Bobo majmuasi tarixiy ziyorat va sayohat ob'ektlaridir.",
      facts: [
        "2025-yil 1-aprel holatiga ko'ra aholi soni 210 774 kishi — viloyatda Urganch tumanidan keyin 2-o'rin (xorazmstat.uz).",
        "2020-yilda Tuproqqal'a tumani ajratilgandan keyingi maydoni ~130 km² (Vikipediya ma'lumotiga ko'ra); 46 ta mahalla mavjud.",
        "«Hazor-asp» nomi fors-xorazmiy manbalarda «Ming otli» qal'a deb talqin qilinadi va Beruniy asarlarida tilga olingan.",
        "Hazorasp Xiva va Ko'hna Urganch kabi Buyuk Ipak yo'lining sharqiy darvozasi vazifasini bajargan.",
      ],
    },
    ru: {
      name: 'Хазараспский район',
      center: 'город Хазарасп',
      founded: '29 сентября 1926 г.',
      subdivisions: '46 махаллей, 8 сельских сходов',
      description:
        'Хазараспский район образован 29 сентября 1926 года и опирается на один из древнейших городов Хорезмского оазиса. После выделения в мае 2020 года Тупраккалинского района площадь Хазараспского района составляет 130 км² при крайне высокой плотности населения.',
      economy:
        'Ключевой точкой роста служит свободная экономическая зона «Хазарасп» (СЭЗ), а также текстильные фабрики, пищевая промышленность, производство стройматериалов и крупный оптовый торговый узел на юге области.',
      agriculture:
        'На орошаемых землях вдоль каналов Палван и Ташсака возделываются хлопчатник, овощи, плодовые сады; развиты тепличные хозяйства и рыбоводство.',
      education:
        'Функционируют десятки школ, профессиональные учебные заведения, библиотеки и центры народных ремёсел.',
      tourism:
        'Туристов привлекают знаменитые ворота Хазараспа (Куй-дарвоза) с бирюзовыми куполами, руины античной крепости Хазарасп V–IV вв. до н. э. и исторические мавзолеи.',
      facts: [
        'Второй по численности населения район Хорезма — 210 774 жителя на 1 апреля 2025 года (xorazmstat.uz).',
        'Площадь после реорганизации 2020 года — 130 км²; объединяет 46 махаллей; почтовый индекс — 220700.',
        'Название «Хазорасп» традиционно переводится как «Земля тысячи лошадей» и упоминается в трудах аль-Бируни.',
        'На территории района работает свободная экономическая зона «Хазарасп».',
      ],
    },
    en: {
      name: 'Hazorasp District',
      center: 'Hazorasp city',
      founded: 'September 29, 1926',
      subdivisions: '46 mahallas, 8 rural councils',
      description:
        'Hazorasp District was formed on September 29, 1926, centered on an oasis citadel dating back over 2,500 years. Following the May 2020 separation of its eastern wing into Tuproqqalʼa District, Hazorasp District covers a compact 130 km² densely populated core.',
      economy:
        'Home to the Hazorasp Free Economic Zone (FEZ), modern textile and building-materials factories, food processing plants, and major regional wholesale trade.',
      agriculture:
        'Fed by the Polvon and Toshsoqa canals, intensively farmed plots produce orchards, vegetables, cotton, greenhouse crops, and aquaculture.',
      education:
        'Supported by comprehensive secondary schools, vocational colleges, local museum collections, and youth training centers.',
      tourism:
        'Major landmarks include the monumental turquoise-domed Hazorasp Gate (Qo‘y Darvoza), remains of the 5th–4th century BC fortress walls, and regional shrines.',
      facts: [
        'Second most populous district in Khorezm with 210,774 residents as of April 1, 2025 (xorazmstat.uz).',
        'Covers ~130 km² post-2020 boundary split (formerly 450 km²) across 46 mahallas; postal code 220700.',
        'Hazorasp ("Land of a Thousand Horses") served as Khorezm’s eastern fortress-gateway along the Silk Road.',
        'Houses the Hazorasp Free Economic Zone attracting industrial investment.',
      ],
    },
  },

  {
    id: 'xiva-tumani',
    slug: 'xiva-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '440 km²',
    areaNum: 440,
    population: '158 765',
    populationNum: 158765,
    density: '361',
    mahallas: 38,
    postalCode: '220900',
    photo: '/images/districts/xiva-tumani.jpg',
    gallery: [
      '/images/districts/xiva-tumani.jpg',
      '/images/districts/xiva-tumani-2.jpg',
    ],
    coordinates: [41.3833, 60.3667],
    uz: {
      name: 'Xiva tumani',
      center: 'Shomoxulum qishlog‘i',
      founded: '1926-yil 29-sentabr',
      subdivisions: '9 QFY (Shomoxulum, Gandimiyon va b.)',
      description:
        "Xiva tumani 1926-yil 29-sentabrda tashkil etilgan bo'lib, Xiva shahri atrofidagi voha yerlarini egallaydi. Shimoldan Qo'shko'pir, shimoli-sharqdan Urganch va Xonqa, sharqdan Yangiariq tumanlari, janubdan esa Turkmaniston bilan chegaradosh. Tuman markazi — Shomoxulum qishlog'i (tarkibida Gandimiyon, Dashyoq, Sayot, Chinobod, Eski Qiyot kabi 9 ta QFY bor).",
      economy:
        "Tumanda paxta tozalash, sopol va kulolchilik buyumlari, tikuvchilik va to'qimachilik, sut va qurilish materiallari ishlab chiqarish korxonalari, shuningdek Xiva shahri bilan bog'liq turistik xizmat ko'rsatish va mehmonxona klasterlari faoliyat yuritadi.",
      agriculture:
        "Polvonyop, G'ozovot va Sirchali kanallari orqali sug'oriladigan maydonlarda paxta, g'alla, kartoshka, poliz va sabzavotlar, bog'dorchilik va tokchilik rivojlangan. Qoramolchilik va parrandachilik viloyat bozorining muhim qismini ta'minlaydi.",
      education:
        "Tumanda zamonaviy umumta'lim maktablari, kasb-hunar maktablari, qishloq madaniyat markazlari va bolalar sport maktablari faoliyat yuritadi.",
      tourism:
        "Xiva tumani hududida Xiva xonlarining mashhur yozgi qarorgohlari — Qibla Tozabog‘ saroy-bog‘ majmuasi va Chodra Hovli yodgorligi, shuningdek tarixiy Gandimiyon (1873-yilgi tarixiy bitim maskani) hamda G'ovukko'l ekoturizm hududi joylashgan.",
      facts: [
        "2025-yil 1-aprel holatiga ko'ra aholi soni 158 765 kishini tashkil etadi (xorazmstat.uz).",
        "Hududi 440 km² (0,44 ming km²; inglizcha Vikipediyada ~430 km²); ma'muriy markazi Shomoxulum qishlog'i.",
        "Xiva tumani respublikadagi yillik yog'in miqdori eng kam (~100 mm) tumanlar sirasiga kiradi.",
        "Gandimiyon, Qibla Tozabog' bog'-saroyi va Chodra Hovli kabi noyob meros ob'ektlari Xiva shahri atrofida joylashgan.",
      ],
    },
    ru: {
      name: 'Хивинский район',
      center: 'село Шамахулум (Shomoxulum)',
      founded: '29 сентября 1926 г.',
      subdivisions: '9 сельских сходов граждан',
      description:
        'Хивинский район образован 29 сентября 1926 года и охватывает сельскохозяйственный оазис вокруг города Хивы (не входящего в состав района). На юге и юго-западе граничит с Туркменистаном. Объединяет 9 сельских сходов, включая Гандимиён, Дашъяк, Сайят, Эски-Кият и центр — село Шамахулум.',
      economy:
        'Развиты хлопкоочистительная, текстильная и керамическая отрасли, производство стройматериалов и туристическо-гостиничные комплексы в пригородной зоне Хивы.',
      agriculture:
        'Орошается каналами Палван-яп, Газават и Сирчали. Ведущие отрасли — хлопководство, зерноводство, овощеводство, бахчеводство, виноградарство и молочное животноводство.',
      education:
        'Работают общеобразовательные школы, профессиональные колледжи, библиотеки и спортивные школы.',
      tourism:
        'Жемчужины района — загородные ханские резиденции Кибла Тозабог (дворец с резными деревянными айванами) и Чодра-Ховли, историческое селение Гандимиён и озеро Говуккуль.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 158 765 человек (xorazmstat.uz).',
        'Площадь территории — 440 км² (0,44 тыс. км²); районный центр — село Шамахулум.',
        'Является одним из самых засушливых районов страны (~100 мм осадков в год).',
        'На территории района находится историческая летняя резиденция хивинских ханов Кибла Тозабог.',
      ],
    },
    en: {
      name: 'Khiva District',
      center: 'Shomoxulum village',
      founded: 'September 29, 1926',
      subdivisions: '9 rural assemblies (Gandimiyon, Shomoxulum, etc.)',
      description:
        'Khiva District was established on September 29, 1926, encompassing the irrigated rural oasis surrounding (but administratively separate from) Khiva City. Its administrative center is Shomoxulum village, alongside 9 rural councils bordering Turkmenistan to the south.',
      economy:
        'Combines cotton ginning, ceramic craft workshops, garment manufacturing, dairy/brick production, and expanding hospitality clusters serving Khiva’s tourist belt.',
      agriculture:
        'Canal networks (Polvonyop, Gazavat, Sirchali) sustain cotton, wheat, potatoes, melons, vineyards, orchards, and substantial cattle and poultry production.',
      education:
        'Includes general education schools, vocational training colleges, and community cultural houses across all 9 rural councils.',
      tourism:
        'Highlights outside Ichan-Kala include the Khan’s summer palace garden Qibla Tozabog‘, the Chodra Hovli pavilion, historic Gandimiyon, and Lake G‘ovukko‘l.',
      facts: [
        'Official population is 158,765 as of April 1, 2025 (xorazmstat.uz).',
        'Covers 440 km² (0.44 thousand km²); district seat is Shomoxulum.',
        'Experiences one of Uzbekistan’s lowest annual rainfall averages (~100 mm/year).',
        'Houses the carved-pillar summer palace complex of Qibla Tozabog‘.',
      ],
    },
  },

  {
    id: 'xonqa-tumani',
    slug: 'xonqa-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '430 km²',
    areaNum: 430,
    population: '202 640',
    populationNum: 202640,
    density: '471',
    mahallas: 41,
    postalCode: '220803',
    photo: '/images/districts/xonqa-tumani.jpg',
    gallery: [
      '/images/districts/xonqa-tumani.jpg',
      '/images/districts/xonqa-tumani-2.jpg',
    ],
    coordinates: [41.47, 60.78],
    uz: {
      name: 'Xonqa tumani',
      center: 'Xonqa shaharchasi',
      founded: '1926-yil 29-sentabr',
      subdivisions: '41 ta mahalla, 1 shaharcha, 10 QFY',
      description:
        "Xonqa tumani 1926-yil 29-sentabrda tashkil etilgan (1973-yil 26-dekabrda qayta tuzilgan) va Amudaryoning chap sohilidagi serunum delta hududida joylashgan. Shimoli-g'arbda Urganch, janubi-g'arbda Xiva va Yangiariq, janubda Bog'ot tumanlari hamda shimoli-sharqda Qoraqalpog'iston bilan chegaradosh. Tuman hududidan Shovot, Polvonyop va Qulobod magistral kanallari o'tadi.",
      economy:
        "Tumanda «Xonqadonmahsulotlari», «Xonqaguruch», paxta tozalash, g'isht va konserva korxonalari hamda qadimiy Madir qishlog'idagi mashhur Xorazm kulolchilik maktabi faoliyat ko'rsatadi. Matchonovlar sulolasi kulollari yaratgan ko'k-yashil sirli sopol buyumlar jahon muzeylarida namoyish etiladi.",
      agriculture:
        "Tuman iqtisodiyotining tayanchi — paxtachilik, g'allachilik, sholichilik, sabzavotchilik, polizchilik, bog'dorchilik hamda pillachilik. Amudaryo oqiziqlaridan hosil bo'lgan unumdor allyuvial tuproqlar yuqori hosildorlikni ta'minlaydi.",
      education:
        "Tumanda o'nlab umumta'lim maktablari, 1-son kasb-hunar maktabi, musiqa va san'at maktablari hamda hunarmandchilik ustaxonalari faoliyat yuritadi.",
      tourism:
        "Xonqaning Madir kulolchilik markazi (an'anaviy ishqor sirli Xorazm sopoli), Sayid Ota majmuasi va Amudaryo bo'yi manzaralari madaniy sayyohlar uchun qiziqarli yo'nalishlardir.",
      facts: [
        "2025-yil 1-aprel holatiga aholisi 202 640 kishi — viloyatda aholi soni bo'yicha 3-o'rin (xorazmstat.uz).",
        "Maydoni 430 km² (0,43 ming km²); tuman tarkibida 41 ta mahalla va 10 ta QFY mavjud.",
        "Xonqaning Madir qishlog'i O'zbekistondagi ko'k sirli an'anaviy kulolchilikning eng mashhur maktablaridan biridir.",
        "«Xonqadonmahsulotlari» va «Xonqaguruch» korxonalari viloyat oziq-ovqat xavfsizligida muhim o'rin tutadi.",
      ],
    },
    ru: {
      name: 'Ханкинский район',
      center: 'посёлок Ханка (Xonqa)',
      founded: '29 сентября 1926 г.',
      subdivisions: '41 махалля, 10 сельских сходов',
      description:
        'Ханкинский район образован 29 сентября 1926 года (восстановлен 26 декабря 1973 г.) в плодородной древней дельте левобережья Амударьи. Через район проходят магистральные каналы Шават, Палван-яп и Кулабад.',
      economy:
        'В районе работают предприятия «Хонкадонмахсулотлари», «Хонкагуруч», хлопкоочистительный и кирпичный заводы, консервное производство. Особую славу району принесла потомственная гончарная школа кишлака Мадир (династия Матчановых), чья бирюзовая керамика представлена в мировых музеях.',
      agriculture:
        'Ведущие аграрные отрасли: хлопководство, зерноводство, рисоводство, садоводство, бахчеводство, животноводство и шелководство.',
      education:
        'Действуют десятки общеобразовательных школ, профессиональная школа №1, музыкальные школы и ремесленные мастерские.',
      tourism:
        'Культурный туризм сосредоточен вокруг гончарных мастерских села Мадир, исторических памятников Ханки и природных берегов Амударьи.',
      facts: [
        'Третий по численности населения район Хорезмской области — 202 640 жителей на 1 апреля 2025 года (xorazmstat.uz).',
        'Площадь территории — 430 км²; включает 41 махаллю; почтовый индекс — 220803.',
        'Кишлак Мадир — всемирно известный центр традиционной хорезмской сине-зелёной керамики.',
      ],
    },
    en: {
      name: 'Xonqa District',
      center: 'Xonqa town',
      founded: 'September 29, 1926',
      subdivisions: '41 mahallas, 10 rural councils',
      description:
        'Xonqa District was formed on September 29, 1926 (and re-established in December 1973) on fertile alluvial delta land along the Amu Darya’s left bank, crossed by the Shavat, Polvonyop, and Qulobod irrigation canals.',
      economy:
        'Industrial assets include grain milling, rice processing (Xonqaguruch), cotton ginning, brick kilns, fruit canning, and the famous traditional ceramic guilds of Madir village.',
      agriculture:
        'Fertile soils yield cotton, wheat, rice, vegetables, melons, orchards, and silk cocoons.',
      education:
        'Comprises dozens of public schools, Xonqa Vocational School No. 1, music schools, and master-apprentice craft studios.',
      tourism:
        'Madir village’s glazed cobalt-and-turquoise Khorezm ceramics workshops (notably the Matchonov master dynasty) attract heritage travelers worldwide.',
      facts: [
        'Third most populous district in Khorezm with 202,640 residents as of April 1, 2025 (xorazmstat.uz).',
        'Area spans 430 km² with 41 mahallas and 10 rural councils; postal code 220803.',
        'Madir village in Xonqa is one of Central Asia’s oldest living pottery centers.',
      ],
    },
  },

  {
    id: 'qoshkopir-tumani',
    slug: 'qoshkopir-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '540 km²',
    areaNum: 540,
    population: '185 806',
    populationNum: 185806,
    density: '344',
    mahallas: 47,
    postalCode: '220400',
    photo: '/images/districts/qoshkopir-tumani.jpg',
    gallery: [
      '/images/districts/qoshkopir-tumani.jpg',
      '/images/districts/qoshkopir-tumani-2.jpg',
    ],
    coordinates: [41.5322, 60.3511],
    uz: {
      name: 'Qo‘shko‘pir tumani',
      center: 'Qo‘shko‘pir shaharchasi',
      founded: '1936-yil 17-aprel',
      subdivisions: '47 ta mahalla, 13 QFY',
      description:
        "Qo‘shko‘pir tumani 1936-yil 17-aprelda tashkil etilgan (Xiva xonligi davrida G‘ozovot deb nomlangan). Shimoldan Shovot, sharqdan Urganch, janubdan Xiva tumanlari, g'arbdan esa Turkmaniston bilan chegaradosh. Tuman nomi ariq ustida yonma-yon qurilgan qo'sh (ikkita) ko'prik bilan bog'liq. Hudud Kattako'l, Dovdon va Dovudko'l kollektor-drenaj tarmoqlari bilan kesilgan.",
      economy:
        "Tumanda paxta tozalash, silikat g'isht zavodlari, qurilish tashkilotlari, tikuvchilik va gilamchilik sexlari, «Qo'shko'pirparranda», «Qo'shko'pirpilla» va asalarichilik xo'jaliklari faoliyat yuritadi.",
      agriculture:
        "Qishloq xo'jaligi asosan paxtachilik (13 ming ga dan ortiq) va g'allachilikka ixtisoslashgan; chorvachilik, pillachilik, bog'dorchilik, sabzavotchilik, baliqchilik va asalarichilik rivojlangan.",
      education:
        "Tumanda o'nlab umumta'lim maktablari, kasb-hunar kollejlari, axborot-resurs markazlari hamda sport maktablari yoshlarga ta'lim bermoqda.",
      tourism:
        "G'ozovot tarixiy qishlog'i, Xosiyon va Shixmashhad maskanlari hamda kanal-ko'prik manzaralari mahalliy tarix va ziyorat turizmi uchun ahamiyatlidir.",
      facts: [
        "2025-yil 1-aprel holatiga aholi soni 185 806 kishini tashkil etadi (xorazmstat.uz).",
        "Maydoni 540 km² (0,54 ming km²) — Tuproqqal'adan keyingi viloyatdagi eng yirik maydonli tuman.",
        "47 ta mahalla va 13 ta QFY (G'ozovot, Xosiyon, Qatag'on, Kenagas, O'zbekyop va b.) dan iborat.",
        "1935-yilda G'ozovot va Qo'shko'pir hududlari birlashtirilib hozirgi tuman asoslari yaratilgan.",
      ],
    },
    ru: {
      name: 'Кошкупырский район',
      center: 'посёлок Кошкупыр (Qo‘shko‘pir)',
      founded: '17 апреля 1936 г.',
      subdivisions: '47 махаллей, 13 сельских сходов',
      description:
        'Кошкупырский район образован 17 апреля 1936 года (историческая область Газават эпохи Хивинского ханства). Граничит с Туркменистаном на западе. Топоним «Кошкупыр» означает «парный (двойной) мост» через ирригационный канал.',
      economy:
        'Работают хлопкоочистительный завод, завод силикатного кирпича, швейные и ковроткацкие цеха, птицеводческие, пчеловодческие и шелководческие предприятия.',
      agriculture:
        'Специализируется на хлопководстве и зерноводстве, а также на животноводстве, рыболовстве, садоводстве и овощеводстве.',
      education:
        'Сеть общеобразовательных и профессиональных школ, библиотек и спортивных секций охватывает все 13 сельских сходов.',
      tourism:
        'Исторические селения Газават, Хасиян и Шихмашхад хранят традиции оазисного земледелия и ремёсел западного Хорезма.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 185 806 человек (xorazmstat.uz).',
        'Площадь — 540 км² (второй по величине территории район области); включает 47 махаллей и 13 сельских сходов.',
        'Название «Кошкупыр» переводится с узбекского как «два моста».',
      ],
    },
    en: {
      name: 'Qoʻshkoʻpir District',
      center: 'Qoʻshkoʻpir town',
      founded: 'April 17, 1936',
      subdivisions: '47 mahallas, 13 rural councils',
      description:
        'Qoʻshkoʻpir District was founded on April 17, 1936 (historically known as Gazavat during the Khiva Khanate) on the western frontier bordering Turkmenistan. Its name derives from "Twin Bridges" (Qo‘sh Ko‘prik) spanning the district’s main irrigation channel.',
      economy:
        'Features cotton ginning, silicate brick production, garment and carpet-weaving workshops, poultry farming, apiculture, and cocoon processing.',
      agriculture:
        'Primarily dedicated to cotton (over 13,000 ha) and grain production, complemented by livestock, orchards, fish farming, and beekeeping.',
      education:
        'Provides secondary education, vocational training colleges, public libraries, and sports complexes across 13 rural communities.',
      tourism:
        'Known for historic Gazavat canal landscapes, traditional craft communities in Xosiyon, and western Khorezm borderland oasis scenery.',
      facts: [
        'Official population is 185,806 as of April 1, 2025 (xorazmstat.uz).',
        'Covers 540 km² — the second largest district by area after Tuproqqalʼa — with 47 mahallas.',
        'Etymologically translates to "Twin Bridges."',
      ],
    },
  },

  {
    id: 'shovot-tumani',
    slug: 'shovot-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '460 km²',
    areaNum: 460,
    population: '184 153',
    populationNum: 184153,
    density: '400',
    mahallas: 54,
    postalCode: '220600',
    photo: '/images/districts/shovot-tumani.jpg',
    gallery: [
      '/images/districts/shovot-tumani.jpg',
      '/images/districts/shovot-tumani-2.jpg',
    ],
    coordinates: [41.66, 60.29],
    uz: {
      name: 'Shovot tumani',
      center: 'Shovot shaharchasi',
      founded: '1926-yil 29-sentabr',
      subdivisions: '54 ta mahalla, 11 QFY',
      description:
        "Shovot tumani 1926-yil 29-sentabrda tashkil etilgan bo'lib, viloyatning shimoli-g'arbida, mashhur Shovot (Shohobod) kanali sohilida joylashgan. Kanal 1681–1682-yillarda Anushaxon davrida 160 km uzunlikda qazdirilgan. Shimol va g'arbdan Turkmaniston bilan chegaradosh.",
      economy:
        "Shovot tumani sanoatida «Shovot Textile», podshipnik va mexanika zavodlari, un kombinati, paxta tozalash zavodi, charm mahsulotlari fabrikasi hamda 900 dan ziyod korxona va mikrofirmalar faoliyat yuritadi. «Shovot» chegara bojxona posti orqali xalqaro savdo amalga oshiriladi.",
      agriculture:
        "Tuman xo'jaliklari Shovot, Dovdon va Yormish kanallari suvlari yordamida paxtachilik, g'allachilik, polizchilik, sabzavotchilik, bog'dorchilik hamda chorvachilik bilan shug'ullanadi.",
      education:
        "Shovotda zamonaviy maktablar, ixtisoslashtirilgan muassasalar, musiqiy va sport maktablari hamda tarixiy o'lkashunoslik to'garaklari ishlaydi.",
      tourism:
        "Tuman hududida qadimgi Katqal'a, Voyangan va Shovotqal'a arxeologik yodgorliklari hamda mashhur Xorazm baxshi-shoirlari va Komiljon Otaniyozov ijod maktabi bilan bog'liq madaniy maskanlar joylashgan.",
      facts: [
        "2025-yil 1-aprel holatiga aholi soni 184 153 kishini tashkil etadi (xorazmstat.uz).",
        "Maydoni 460 km² (0,46 ming km²); viloyatda eng ko'p — 54 ta mahalla fuqarolar yig'ini mavjud.",
        "Tuman nomi 1681–1682-yillarda Anushaxon qazdirgan 160 km lik «Shohobod» (Shovot) kanali nomidan kelib chiqqan.",
        "Buyuk hofiz va bastakor Komiljon Otaniyozov (1917–1975) Shovot tumanida tug'ilgan.",
      ],
    },
    ru: {
      name: 'Шаватский район',
      center: 'посёлок Шават (Shovot)',
      founded: '29 сентября 1926 г.',
      subdivisions: '54 махалли, 11 сельских сходов',
      description:
        'Шаватский район образован 29 сентября 1926 года на северо-западе Хорезмской области вдоль древнего канала Шават (Шахабад), прорытого по приказу Ануша-хана в 1681–1682 годах. На севере и западе граничит с Туркменистаном.',
      economy:
        'Развиты текстильное производство («Shovot Textile»), подшипниковый и хлопкоочистительный заводы, мукомольный комбинат, кожевенная фабрика и приграничная логистика через таможенный пост «Шават».',
      agriculture:
        'Орошается каналами Шават и Довдан. Выращиваются хлопок, зерновые, бахчевые, овощи, развито садоводство и животноводство.',
      education:
        'Работают общеобразовательные школы, профильные училища, школы искусств и спортивные комплексы.',
      tourism:
        'На территории района проводятся археологические исследования древних городищ Каткала и Воянган; Шават также является родиной легендарного хорезмского певца и композитора Камилджана Атаниязова.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 184 153 человека (xorazmstat.uz).',
        'Площадь — 460 км²; включает 54 махалли (наибольшее число махаллей среди районов области).',
        'Название восходит к 160-километровому каналу «Шахабад», построенному в XVII веке.',
        'Родина народного артиста и хафиза Камилджана Атаниязова.',
      ],
    },
    en: {
      name: 'Shovot District',
      center: 'Shovot town',
      founded: 'September 29, 1926',
      subdivisions: '54 mahallas, 11 rural councils',
      description:
        'Shovot District was established on September 29, 1926, in northwestern Khorezm along the banks of the 160 km Shavat (Shohobod) Canal excavated in 1681–1682 under Anushakhan. It shares northern and western borders with Turkmenistan.',
      economy:
        'Industrial capacity spans Shovot Textile, bearing/mechanical engineering plants, flour milling, cotton ginning, leather processing, and international cross-border trade via the Shovot border post.',
      agriculture:
        'Watered by the Shavat and Dovdon canals, farmland yields cotton, grains, melons, orchard fruits, and dairy/livestock.',
      education:
        'Supported by public schools, arts and sports academies, and regional vocational centers.',
      tourism:
        'Hosts active archaeological excavations at ancient Katqal‘a and Vayangan fortresses and honors the cultural legacy of master musician Komiljon Otaniyozov.',
      facts: [
        'Official population is 184,153 as of April 1, 2025 (xorazmstat.uz).',
        'Covers 460 km² and contains 54 mahallas — the highest mahalla count among Khorezm districts.',
        'Named after the 17th-century Shohobod ("King-built") irrigation canal.',
        'Birthplace of legendary Khorezmian singer and composer Komiljon Otaniyozov.',
      ],
    },
  },

  {
    id: 'yangiariq-tumani',
    slug: 'yangiariq-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '400 km²',
    areaNum: 400,
    population: '125 528',
    populationNum: 125528,
    density: '314',
    mahallas: 38,
    postalCode: '221100',
    photo: '/images/districts/yangiariq-tumani.jpg',
    gallery: [
      '/images/districts/yangiariq-tumani.jpg',
      '/images/districts/yangiariq-tumani-2.jpg',
    ],
    coordinates: [41.3269, 60.5519],
    uz: {
      name: 'Yangiariq tumani',
      center: 'Yangiariq shaharchasi',
      founded: '1926-yil 29-sentabr',
      subdivisions: '38 ta mahalla, 10 QFY',
      description:
        "Yangiariq tumani 1926-yil 29-sentabrda tashkil etilgan bo'lib, Xorazm viloyatining janubiy qismida joylashgan. Shimoldan Xonqa, sharqdan Bog'ot, g'arbdan Xiva tumanlari, janubdan esa Turkmaniston bilan chegaradosh. Hududida Ulug'sho'rko'l, Obulko'l, Tangali va Bayotko'l kabi o'zaro tutash ko'llar tizimi mavjud.",
      economy:
        "Tumanda paxta tozalash, g'isht va meva konservalash zavodlari, gaz kompressor stansiyalari hamda mashhur «Xorazm baliq» kombinati faoliyat yuritadi. Ko'l resurslari tufayli baliqchilik tarmog'i viloyatda yetakchi o'rinda turadi.",
      agriculture:
        "Ostona, Tagan va Kattabog' kanallaridan sug'oriladigan maydonlarda paxta, g'alla, sholi, qovun-tarvuz, bog'dorchilik hamda ko'l baliqchiligi (karp, oq amur, do'ngpeshona) jadal rivojlangan.",
      education:
        "Tumanda umumta'lim va ixtisoslashtirilgan maktablar, kasb-hunar maktablari hamda madaniyat-sport majmualari yoshlar xizmatida.",
      tourism:
        "Qadimiy Shayx Muxtor Vali (Ostona qishlog'i) tarixiy-me'moriy ziyoratgohi hamda baliqchilik ko'llari va Qoraqum qum barxanlari sayyohlarni o'ziga tortadi.",
      facts: [
        "2025-yil 1-aprel holatiga ko'ra aholi soni 125 528 kishini tashkil etadi (xorazmstat.uz).",
        "Maydoni 400 km² (0,40 ming km²); tarkibida 38 ta mahalla va 10 ta QFY bor.",
        "Yangiariq tabiiy ko'llari hisobiga Xorazm viloyatida baliqchilik bo'yicha yetakchi o'rinni egallaydi.",
        "Tuman janubida Qoraqum cho'li barxanlari boshlanadi; Ostona qishlog'ida Shayx Muxtor Vali maqbarasi joylashgan.",
      ],
    },
    ru: {
      name: 'Янгиарыкский район',
      center: 'посёлок Янгиарык (Yangiariq)',
      founded: '29 сентября 1926 г.',
      subdivisions: '38 махаллей, 10 сельских сходов',
      description:
        'Янгиарыкский район образован 29 сентября 1926 года на юге Хорезмской области, на границе с пустыней Каракумы и Туркменистаном. Отличается системой взаимосвязанных природных озёр — Улугшоркуль, Абулькуль, Тангали и Баяткуль.',
      economy:
        'В районе действуют хлопкоочистительный, кирпичный и плодоконсервный заводы, газокомпрессорные станции и крупный рыбоперерабатывающий комплекс на базе озёрного фонда.',
      agriculture:
        'Янгиарык занимает ведущее место в Хорезме по озёрному рыбоводству; также развиты хлопководство, зерноводство, садоводство и бахчеводство.',
      education:
        'Работают общеобразовательные школы, профессионально-технические колледжи, библиотеки и дома культуры.',
      tourism:
        'Знаковым памятником является древний мемориальный комплекс Шейха Мухтара Вали в селе Астана, а также озёра и живописные песчаные барханы на юге района.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 125 528 человек (xorazmstat.uz).',
        'Площадь — 400 км²; включает 38 махаллей и 10 сельских сходов граждан.',
        'Лидер Хорезмской области по рыболовству и прудовому хозяйству благодаря системе озёр.',
        'В селе Астана сохранился выдающийся средневековый мавзолей Шейха Мухтара Вали.',
      ],
    },
    en: {
      name: 'Yangiariq District',
      center: 'Yangiariq town',
      founded: 'September 29, 1926',
      subdivisions: '38 mahallas, 10 rural councils',
      description:
        'Yangiariq District was established on September 29, 1926, in southern Khorezm along the Karakum Desert edge and Turkmenistan border. A linked network of natural lakes — Ulug‘sho‘rko‘l, Obulko‘l, Tangali, and Bayotko‘l — shapes its landscape.',
      economy:
        'Driven by the Khorezm Fisheries Complex, cotton ginning, brick kilns, fruit canning, and gas pipeline compressor stations.',
      agriculture:
        'Holds a leading position in Khorezm for freshwater aquaculture (carp, grass carp), alongside cotton, grain, rice, orchards, and melons.',
      education:
        'Maintains public secondary schools, vocational colleges, and rural cultural houses across 10 councils.',
      tourism:
        'Key attractions include the historic Sheikh Mukhtar Vali Mausoleum in Ostona village, fishing lakes, and southern Karakum dunes.',
      facts: [
        'Official population is 125,528 as of April 1, 2025 (xorazmstat.uz).',
        'Covers 400 km² across 38 mahallas and 10 rural councils.',
        'Leads Khorezm Region in lake-based aquaculture and fisheries.',
        'Ostona village preserves the medieval Sheikh Mukhtar Vali architectural ensemble.',
      ],
    },
  },

  {
    id: 'yangibozor-tumani',
    slug: 'yangibozor-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '340 km²',
    areaNum: 340,
    population: '94 195',
    populationNum: 94195,
    density: '277',
    mahallas: 29,
    postalCode: '221200',
    photo: '/images/districts/yangibozor-tumani.jpg',
    gallery: [
      '/images/districts/yangibozor-tumani.jpg',
      '/images/districts/yangibozor-tumani-2.jpg',
    ],
    coordinates: [41.745, 60.5711],
    uz: {
      name: 'Yangibozor tumani',
      center: 'Yangibozor shaharchasi',
      founded: '1950-yil (1989-yilda qayta tiklangan)',
      subdivisions: '29 ta mahalla, 8 QFY',
      description:
        "Yangibozor tumani dastlab 1950-yilda tashkil etilgan, keyinchalik Urganch va Gurlan tumanlariga qo'shilib, 1989-yilda mustaqil tuman sifatida qayta tiklangan (tarixan Qiyot-Qo'ng'irot nomi bilan mashhur). Shimol va sharqda Amudaryo orqali Qoraqalpog'iston, shimoli-g'arbda Gurlan, janubda Shovot va Urganch tumanlari bilan chegaradosh.",
      economy:
        "Tumanda paxta tozalash va g'isht zavodlari, qurilish va qayta ishlash korxonalari, qo'shma korxonalar hamda 150 dan ziyod kichik va o'rta tadbirkorlik sub'ektlari faoliyat ko'rsatadi.",
      agriculture:
        "Yetakchi tarmoqlari — paxtachilik, g'allachilik (jumladan sholichilik), chorvachilik, pillachilik, polizchilik va bog'dorchilik. Amudaryo bo'yida 538 gektardan ortiq to'qay va o'rmonzorlar saqlanib qolgan.",
      education:
        "Tumanda umumta'lim maktablari, kasb-hunar maktabi, musiqa va sport maktablari hamda markaziy kutubxona yoshlar ta'lim-tarbiyasi uchun xizmat qiladi.",
      tourism:
        "Amudaryo bo'yidagi noyob to'qayzorlar va daryo o'zani manzaralari, shuningdek Bo'zqal'a tarixiy hududi ekoturizm va ichki sayohat uchun jozibador maskanlardir.",
      facts: [
        "2025-yil 1-aprel holatiga ko'ra aholi soni 94 195 kishini tashkil etadi (xorazmstat.uz).",
        "Maydoni 340 km² (0,34 ming km²); tuman tarkibida 29 ta mahalla va 8 ta QFY mavjud.",
        "Amudaryo bo'yidagi to'qay va o'rmonzorlar maydoni 538 gektarni tashkil etadi (Vikipediya).",
        "Xiva xonligi davrida hudud Qiyot-Qo'ng'irot nomi bilan yuritilgan.",
      ],
    },
    ru: {
      name: 'Янгибазарский район',
      center: 'посёлок Янгибазар (Yangibozor)',
      founded: '1950 г. (восстановлен в 1989 г.)',
      subdivisions: '29 махаллей, 8 сельских сходов',
      description:
        'Янгибазарский район (исторически Кият-Кунград) первоначально образован в 1950 году и восстановлен как самостоятельный район в 1989 году. Протяжён вдоль левого берега Амударьи между Гурленским, Шаватским и Ургенчским районами.',
      economy:
        'Функционируют хлопкоочистительный и кирпичный заводы, предприятия пищевой переработки, совместные предприятия и свыше 150 субъектов малого бизнеса.',
      agriculture:
        'Специализируется на хлопководстве, зерноводстве (включая рис), овощеводстве, бахчеводстве, садоводстве и шелководстве. Вдоль Амударьи сохранилось 538 га пойменных тугайных лесов.',
      education:
        'Сеть общеобразовательных школ, профессиональных колледжей и спортивных школ обеспечивает подготовку кадров для района.',
      tourism:
        'Экотуризм развивается на базе живописных берегов Амударьи, тугайных массивов и исторической местности Бузкала.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 94 195 человек (xorazmstat.uz).',
        'Площадь — 340 км²; включает 29 махаллей и 8 сельских сходов.',
        'Вдоль Амударьи сохранено 538 га природных тугайных лесов.',
      ],
    },
    en: {
      name: 'Yangibozor District',
      center: 'Yangibozor town',
      founded: '1950 (re-established 1989)',
      subdivisions: '29 mahallas, 8 rural councils',
      description:
        'Yangibozor District (historically Qiyot-Qo‘ng‘irot) was originally created in 1950 and re-established in 1989. Stretching along the left bank of the Amu Darya between Gurlan, Shovot, and Urgench districts, it pairs fertile irrigated farms with riverside tugai woodlands.',
      economy:
        'Local enterprise includes cotton ginning, brick manufacturing, agricultural processing, joint ventures, and over 150 small businesses.',
      agriculture:
        'Focused on cotton, wheat, rice cultivation, melons, orchards, livestock, and sericulture, while conserving 538 hectares of Amu Darya tugai forest.',
      education:
        'Operates public schools, vocational training centers, music schools, and community libraries.',
      tourism:
        'Offers serene Amu Darya riverside views, protected tugai greenery, and local historical sites such as Bo‘zqal‘a.',
      facts: [
        'Official population is 94,195 as of April 1, 2025 (xorazmstat.uz).',
        'Covers 340 km² (0.34 thousand km²) across 29 mahallas and 8 rural councils.',
        'Preserves 538 hectares of riverside tugai forest along the Amu Darya.',
      ],
    },
  },

  {
    id: 'tuproqqala-tumani',
    slug: 'tuproqqala-tumani',
    typeKey: 'district',
    type: 'tuman',
    area: '1 920 km²',
    areaNum: 1920,
    population: '60 889',
    populationNum: 60889,
    density: '32',
    mahallas: 18,
    postalCode: '220710',
    photo: '/images/districts/tuproqqala-tumani.jpg',
    gallery: [
      '/images/districts/tuproqqala-tumani.jpg',
      '/images/districts/tuproqqala-tumani-2.jpg',
    ],
    coordinates: [41.216, 61.308],
    uz: {
      name: 'Tuproqqal’a tumani',
      center: 'Pitnak shahri',
      founded: '2020-yil 11-may',
      subdivisions: '18 ta mahalla, Pitnak shahri',
      description:
        "Tuproqqal’a tumani — Xorazm viloyatining eng yosh va hudud jihatdan eng katta tumani bo'lib, 2020-yil 11-may kuni Hazorasp tumani hududini ikkiga bo'lish orqali tashkil etilgan. Ma'muriy markazi — Pitnak shahri. Shimolda Qoraqalpog'iston, shimoli-g'arbda Hazorasp tumani, janubi-sharqda Buxoro viloyati va janubda Turkmaniston bilan chegaradosh.",
      economy:
        "Tumanning asosiy sanoat giganti Pitnak shahridagi «UzAuto Motors» Xorazm zavodi bo'lib, bu yerda Damas va Labo yengil tijorat avtomobillari ishlab chiqariladi. Shuningdek Tuyamo'yin gidrouzeli, energetika va cho'l-yaylov chorvachiligi rivojlangan.",
      agriculture:
        "Qizilqum cho'liga tutash keng yaylovlarda qorako'l qo'ychilik va tuyachilik, Amudaryo bo'yidagi sug'oriladigan hududlarda esa bog'dorchilik, paxta va g'allachilik yo'lga qo'yilgan.",
      education:
        "Pitnak shahri va 18 ta mahallada umumta'lim maktablari, avtomobilsozlik va texnik yo'nalishdagi kasb-hunar markazlari faoliyat yuritadi.",
      tourism:
        "Tuman nomi Xorazmdagi qadimiy Tuproqqal'a qal'alari bilan bog'liq. Amudaryodagi Tuyamo'yin suv ombori manzaralari, qadimgi karvon yo'llari izlari va cho'l ekoturizmi sayohatchilar uchun noyob yo'nalishdir.",
      facts: [
        "2025-yil 1-aprel holatiga aholi soni 60 889 kishini tashkil etadi (xorazmstat.uz).",
        "Maydoni Vikipediya ma'lumotlariga ko'ra ~1 920 km² (tuman hokimiyati ma'lumotnomalarida 1,60 ming km²) — viloyatning eng katta tumani.",
        "2020-yil 11-mayda Prezident tashabbusi bilan Hazorasp tumanidan ajratib tashkil etilgan eng yosh tuman.",
        "Markazi Pitnak shahrida «UzAuto Motors» (Damas va Labo ishlab chiqaruvchi) avtomobil zavodi joylashgan.",
      ],
    },
    ru: {
      name: 'Тупраккалинский район',
      center: 'город Питнак (Pitnak)',
      founded: '11 мая 2020 г.',
      subdivisions: '18 махаллей, город Питнак',
      description:
        'Тупраккалинский район — самый молодой и крупнейший по площади район Хорезмской области, образованный 11 мая 2020 года путём выделения из состава Хазараспского района. Административный центр — город Питнак. Простирается на юго-востоке области до границы с Бухарской областью и Туркменистаном.',
      economy:
        'Промышленное ядро — Хорезмский автозавод «UzAuto Motors» в Питнаке (выпуск автомобилей Damas и Labo), Туямуюнский гидроузел на Амударье, строительные предприятия и логистика вдоль трассы Бухара–Ургенч.',
      agriculture:
        'Обширные пустынно-степные пастбища Кызылкумов используются для каракулеводства и верблюдоводства; на орошаемых массивах развиты садоводство и зерноводство.',
      education:
        'В городе Питнак и 18 махаллях действуют общеобразовательные школы и профильные центры подготовки технических кадров.',
      tourism:
        'Интерес вызывают Туямуюнское водохранилище, археологические памятники древних укреплений на юге Хорезма и маршруты пустынного экотуризма.',
      facts: [
        'Постоянное население на 1 апреля 2025 года — 60 889 человек (xorazmstat.uz).',
        'Площадь территории — 1 920 км² по данным Википедии (или 1,60 тыс. км² по данным хокимията) — крупнейший район области.',
        'Самый молодой район Хорезма, созданный 11 мая 2020 года.',
        'В Питнаке расположен завод «UzAuto Motors» и крупный Туямуюнский гидроузел.',
      ],
    },
    en: {
      name: 'Tuproqqalʼa District',
      center: 'Pitnak city',
      founded: 'May 11, 2020',
      subdivisions: '18 mahallas, Pitnak city',
      description:
        'Tuproqqalʼa District is both the youngest and largest-by-area district in Khorezm Region, created on May 11, 2020, by splitting the eastern territory from Hazorasp District. Centered in Pitnak city, it stretches across southeastern Khorezm toward Bukhara Region and Turkmenistan.',
      economy:
        'Anchored by the Khorezm UzAuto Motors plant in Pitnak (producing Damas and Labo commercial vehicles), the strategic Tuyamuyun hydro-complex on the Amu Darya, and transit logistics along the Bukhara–Urgench highway.',
      agriculture:
        'Vast desert rangelands support karakul sheep and camel herding, while irrigated pockets near the Amu Darya grow orchards, cotton, and grain.',
      education:
        'General schools and technical vocational centers in Pitnak prepare specialists for regional automotive and energy sectors.',
      tourism:
        'Draws visitors to the Tuyamuyun reservoir, ancient Khorezmian mud-brick fortress heritage, and Kyzylkum desert eco-routes.',
      facts: [
        'Official population is 60,889 as of April 1, 2025 (xorazmstat.uz).',
        'Largest district in Khorezm at ~1,920 km² per Wikipedia (1,600 km² in regional municipal bulletins), spanning 18 mahallas.',
        'Newest district in the region, established May 11, 2020.',
        'Pitnak hosts the UzAuto Motors assembly plant and the Tuyamuyun hydroelectric dam.',
      ],
    },
  },
];

export const getDistricts = (lang = 'uz') =>
  districtsRaw.map((d) => ({
    id: d.id,
    slug: d.slug,
    typeKey: d.typeKey,
    type: d.type,
    area: d.area,
    areaNum: d.areaNum,
    population: d.population,
    populationNum: d.populationNum,
    density: d.density,
    mahallas: d.mahallas,
    postalCode: d.postalCode,
    photo: d.photo,
    gallery: d.gallery,
    coordinates: d.coordinates,
    ...(d[lang] || d.uz),
  }));

export const districts = getDistricts('uz');
export default districts;
