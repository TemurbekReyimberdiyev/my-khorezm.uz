// Verified historical data compiled from:
// - Wikipedia (uz.wikipedia.org/wiki/Xorazm_viloyati, Xorazm, Xorazmshohlar_davlati, Xiva_xonligi, So'fiylar_sulolasi, Xorazm_Xalq_Sovet_Respublikasi)
// - O'zbekiston Milliy Ensiklopediyasi & UNESCO World Heritage records

const historyContent = {
  uz: {
    sourceNote: "Manbalar: O'zbekiston Milliy Ensiklopediyasi, Vikipediya (Xorazm viloyati, So'fiylar sulolasi, Xiva xonligi) va arxeologik tadqiqotlar.",
    etymology: {
      title: "«Xorazm» atamasi va tarixiy poytaxtlari",
      text: "«Xorazm» nomi ilk bor zardushtiylarning muqaddas kitobi «Avesto»da (Xvairizem), Doro I ning Behistun bitiklarida (Xvarazmish) va yunon mualliflari Gekatey hamda Gerodot asarlarida (Xorazmiya) uchraydi. Akademik S. P. Tolstov uni «Quyoshli o'lka / Xvarri zamini», tilshunos M. N. Bogolyubov esa «Yaxshi qo'rg'onli zamin», boshqa manbalar «Pastlikdagi oziq-ovqatli yer» deb izohlaydi.",
      capitalsTitle: "Tarixiy poytaxtlar zanjiri",
      capitals: [
        { name: "Ko'zaliqir", period: "Mil. avv. VI–V asr" },
        { name: "Qal'aliqir", period: "Mil. avv. V–IV asr" },
        { name: "Tuproqqal'a", period: "I–IV asrlar" },
        { name: "Kot (Beruniy)", period: "305–X asr" },
        { name: "Ko'hna Urganch", period: "995–XVI asr" },
        { name: "Vazir", period: "1511–XVI asr" },
        { name: "Xiva", period: "XVI asr oxiri–1924" },
        { name: "Urganch", period: "1938–hozir (viloyat)" },
      ],
    },
    viloyatModern: {
      title: "Xorazm XSR va Xorazm viloyati tashkil topishi (1920–hozir)",
      summary: "1920-yil 2-fevralda Xiva xonligi tugatilib, 1920-yil 26–30-aprelda Birinchi Xorazm Qurultoyida Xorazm Xalq Sovet Respublikasi (XXSR, raisi Polvonniyoz hoji Yusupov) e'lon qilindi. 1923-yil 20-oktabrda Xorazm SSRga aylantirildi. 1924-yil kuzidagi milliy-hududiy chegaralanishda hudud O'zbekiston SSR, Turkmaniston SSR va Qoraqalpog'iston muxtor viloyatiga bo'linib, Xorazm okrugi O'zbekiston SSR tarkibiga kirdi; 1938-yil 15-yanvarda alohida Xorazm viloyati tashkil topdi. 2003-yilda viloyat «Jaloliddin Manguberdi» ordeni bilan taqdirlandi.",
      milestones: [
        { date: "1920-yil 2-fevral", title: "Xonlik tugatilishi", desc: "So'nggi xon Said Abdullaxon taxtdan voz kechib, Yosh xivaliklar ishtirokida Muvaqqat inqilobiy qo'mita tuzildi." },
        { date: "1920-yil 26–30-aprel", title: "Xorazm XSR tuzilishi", desc: "Poytaxti Xiva shahri bo'lgan Xorazm Xalq Sovet Respublikasi e'lon qilindi (1923-yil 20-oktabrdan — Xorazm SSR)." },
        { date: "1924-yil kuz", title: "O'zbekiston SSR tarkibiga kirishi", desc: "Milliy-hududiy chegaralanish natijasida Xorazmning asosiy voha tumanlari O'zbekiston SSR tarkibiga kiritildi." },
        { date: "1938-yil 15-yanvar", title: "Xorazm viloyati tashkil topdi", desc: "Xorazm okrugi negizida ma'muriy markazi Urganch shahri bo'lgan alohida Xorazm viloyati tuzildi." },
        { date: "1990 / 1997-yillar", title: "UNESCO va Xivaning 2500 yilligi", desc: "1990-yilda Ichan-Qal'a UNESCO Jahon merosiga kiritildi; 1997-yilda Xivaning 2500 yilligi xalqaro miqyosda nishonlandi." },
        { date: "2003 / 2019–2020-yillar", title: "Davlat e'tirofi va yangi bosqich", desc: "2003-yilda viloyat Jaloliddin Manguberdi ordeni bilan mukofotlandi; 2019-yilda Lazgi UNESCO merosiga kirdi, 2020-yilda Tuproqqal'a tumani tuzildi." },
      ],
    },
    eras: [
      {
        id: 1, dates: "Mil.avv. VIII–IV asrlar", name: "Qadimgi Xorazm va Ahamoniylar", color: "#C58B43", href: "/tarix/qadimgi-xorazm",
        desc: "Miloddan avvalgi VIII asrda shakllangan Markaziy Osiyoning eng qadimiy davlatlaridan biri: Ko'zaliqir, Qal'aliqir, Avesto, oromiy-xorazmiy yozuvi va XVI satraplik.",
        events: ["Kaltaminor va Amirobod madaniyatlari", "Ko'zaliqir va Xumbuztepa otashkadasi", "Mil. avv. 328-yil shoh Farasman muzokarasi"],
      },
      {
        id: 2, dates: "I–VIII asrlar", name: "Afrig'iylar sulolasi va Kot", color: "#15528B", href: "/tarix/qadimgi-xorazm",
        desc: "Beruniy asarlarida 22 nafar shohi qayd etilgan Afrig'iylar davrida poytaxt Tuproqqal'adan Kotga (305-yil) ko'chirilib, savdo va shaharsozlik gullab-yashnadi.",
        events: ["Tuproqqal'a saroy-shahri va Ayaz-Qal'a", "305-yilda poytaxtning Kotga ko'chirilishi", "Milodiy I–VIII asr kumush tangalari"],
      },
      {
        id: 3, dates: "995–1017", name: "Ma'muniylar va Akademiya", color: "#319568", href: "/tarix/xorazmshohlar",
        desc: "Gurganch (Ko'hna Urganch) poytaxtga aylanib, Ma'mun akademiyasida (1004) Abu Rayhon Beruniy va Abu Ali ibn Sino kabi allomalar ijod qilgan oltin asr.",
        events: ["Xorazm Ma'mun akademiyasi (1004)", "Beruniy va Ibn Sino hamkorligi", "Gurganch — Sharq ilm markazi"],
      },
      {
        id: 4, dates: "1077–1231", name: "Xorazmshohlar imperiyasi", color: "#7C3AED", href: "/tarix/xorazmshohlar",
        desc: "Anushteginiylar asos solgan va Alovuddin Takash hamda Muhammad II davrida ~4,2 mln km² hududni qamrab olgan islom olamidagi eng qudratli saltanat.",
        events: ["Otsiz, Takash va Muhammad II yuksalishi", "Ko'hna Urganch mudofaasi (1221)", "Jaloliddin Manguberdining 11 yillik kurashi"],
      },
      {
        id: 5, dates: "1221–1511", name: "So'fiylar va Temuriylar davri", color: "#0891B2", href: "/tarix/xorazmshohlar",
        desc: "Oltin O'rda tarkibida Ko'hna Urganchning qayta tiklanishi (Qutlug' Temur minorasi), Qo'ng'irot So'fiylar sulolasi (1359–1388) va Amir Temur yurishlari (1372–1388).",
        events: ["To'rabek Xonim maqbarasi va Pahlavon Mahmud", "Husayn, Yusuf va Sulaymon So'fiy (1359–1388)", "1388-yilda Temuriylar davlatiga qo'shilishi"],
      },
      {
        id: 6, dates: "1511–1920", name: "Xiva xonligi va madaniy uyg'onish", color: "#C58B43", href: "/tarix/xiva-xonligi",
        desc: "Elbarsxon (1511) va Qo'ng'irotlar (1804) boshqargan o'zbek davlati: Ichan-Qal'a, Munis–Ogahiy, 1873-yil Gandimiyon bitimi, Otajon Abdolov toshbosmasi (1874) va Islomxo'ja.",
        events: ["Abulg'oziy Bahodirxon va 1643-yil Urganch", "1874-yil Xiva toshbosmasi (Otajon Abdolov)", "Xudoybergan Devonov va Islomxo'ja islohotlari"],
      },
      {
        id: 7, dates: "1920–1991", name: "XXSR va Xorazm viloyati", color: "#17243B", href: "/tarix/xorazm-tarixi",
        desc: "1920-yil 26-aprelda Xorazm XSR tuzilishi, 1924-yilda O'zbekiston SSRga qo'shilishi hamda 1938-yil 15-yanvarda Xorazm viloyatining tashkil topishi.",
        events: ["1920-yil 26-aprel — I Xorazm Qurultoyi", "1938-yil 15-yanvar — viloyat tashkil topdi", "Toshsaqa irrigatsiya tizimi va Urganch rivoji"],
      },
      {
        id: 8, dates: "1991–hozir", name: "Mustaqil O'zbekiston davri", color: "#319568", href: "/tarix/xorazm-tarixi",
        desc: "Xivaning 2500 yilligi (1997), 2003-yil Jaloliddin Manguberdi ordeni, Lazgining UNESCO e'tirofi (2019), Tuproqqal'a avtomobilsozligi va zamonaviy turizm davri.",
        events: ["Ichan-Qal'a UNESCO merosi (1990)", "2003-yil Jaloliddin Manguberdi ordeni", "Lazgi UNESCO e'tirofi (2019)"],
      },
    ],
  },
  ru: {
    sourceNote: "Источники: Национальная энциклопедия Узбекистана, Википедия (Хорезмская область, Династия Суфиев, Хивинское ханство) и археологические труды.",
    etymology: {
      title: "Происхождение названия «Хорезм» и исторические столицы",
      text: "Топоним «Хорезм» впервые упомянут в священной книге «Авеста» (Хвайризем), Бехистунской надписи Дария I (Хваразамиш) и трудах античных историков Гекатея и Геродота (Хорасмия). Академик С. П. Толстов трактует его как «Солнечная земля», а лингвист М. Н. Боголюбов — как «Благоустроенная земля с укреплениями».",
      capitalsTitle: "Исторические столицы края",
      capitals: [
        { name: "Кюзели-гыр", period: "VI–V вв. до н.э." },
        { name: "Калалы-гыр", period: "V–IV вв. до н.э." },
        { name: "Топрак-Кала", period: "I–IV вв. н.э." },
        { name: "Кят (Беруни)", period: "305–X в." },
        { name: "Куня-Ургенч", period: "995–XVI в." },
        { name: "Вазир", period: "1511–XVI в." },
        { name: "Хива", period: "кон. XVI в.–1924" },
        { name: "Ургенч", period: "с 1938 г. (область)" },
      ],
    },
    viloyatModern: {
      title: "Хорезмская НСР и образование Хорезмской области (1920–настоящее время)",
      summary: "После упразднения Хивинского ханства 2 февраля 1920 года Первый Хорезмский курултай (26–30 апреля 1920 г.) провозгласил Хорезмскую Народную Советскую Республику (ХНСР, председатель Палваннияз-ходжа Юсупов). В октябре 1923 г. она была преобразована в Хорезмскую ССР; осенью 1924 г. земли разделили между Узбекской ССР, Туркменской ССР и Каракалпакской АО, а 15 января 1938 года создана самостоятельная Хорезмская область с центром в Ургенче. В 2003 году область награждена орденом Джалаладдина Мангуберди.",
      milestones: [
        { date: "2 февраля 1920 г.", title: "Упразднение ханства", desc: "Отречение последнего хана Саида Абдулла-хана и создание Временного революционного правительства с участием младохивинцев." },
        { date: "26–30 апреля 1920 г.", title: "Образование Хорезмской НСР", desc: "Провозглашение Хорезмской Народной Советской Республики со столицей в Хиве (Хорезмская ССР — 20 октября 1923 г.)." },
        { date: "Осень 1924 г.", title: "Вхождение в Узбекскую ССР", desc: "В результате национально-территориального размежевания основные оазисные районы вошли в состав Узбекской ССР." },
        { date: "15 января 1938 г.", title: "Образование Хорезмской области", desc: "На базе Хорезмского округа создана отдельная Хорезмская область с административным центром в Ургенче." },
        { date: "1990 / 1997 гг.", title: "Наследие ЮНЕСКО и 2500-летие Хивы", desc: "Включение Ичан-Калы в Список ЮНЕСКО (1990) и международное празднование 2500-летия Хивы (1997)." },
        { date: "2003 / 2019–2020 гг.", title: "Государственное признание и развитие", desc: "Награждение области орденом Джалаладдина Мангуберди (2003), признание танца Лазги ЮНЕСКО (2019), создание Тупраккалинского района (2020)." },
      ],
    },
    eras: [
      {
        id: 1, dates: "VIII–IV вв. до н.э.", name: "Древний Хорезм и Ахемениды", color: "#C58B43", href: "/tarix/qadimgi-xorazm",
        desc: "Одно из древнейших государств Центральной Азии, упомянутое в «Авесте»: культуры Кельтеминар и Амирабад, городища Кюзели-гыр и ранняя хорезмийская письменность.",
        events: ["Кельтеминар и Амирабадская культура", "Храм огня Хумбузтепа в Хазараспе", "Посольство царя Фарасмана (328 до н.э.)"],
      },
      {
        id: 2, dates: "I–VIII вв.", name: "Династия Афригидов и Кят", color: "#15528B", href: "/tarix/qadimgi-xorazm",
        desc: "Эпоха 22 хорезмшахов, описанных аль-Беруни: расцвет царской цитадели Топрак-Кала, перенос столицы в Кят (305 г.) и чеканка собственной серебряной монеты.",
        events: ["Расцвет Топрак-Калы и Аяз-Калы", "Перенос столицы в Кят (305 г.)", "Династическая чеканка монет"],
      },
      {
        id: 3, dates: "995–1017", name: "Мамуниды и Академия Мамуна", color: "#319568", href: "/tarix/xorazmshohlar",
        desc: "Золотой век науки в столице Гургандже, где при Академии Мамуна (1004) трудились аль-Беруни, Ибн Сина и крупнейшие умы эпохи.",
        events: ["Основание Академии Мамуна (1004)", "Научное наследие Беруни и Ибн Сины", "Объединение Хорезма в Гургандже"],
      },
      {
        id: 4, dates: "1077–1231", name: "Империя Хорезмшахов", color: "#7C3AED", href: "/tarix/xorazmshohlar",
        desc: "Династия Ануштегинидов, превратившая Хорезм при Атсызе, Текеше и Мухаммаде II в величайшую державу Востока (до 4,2 млн км²).",
        events: ["Правление Атсыза, Текеша и Мухаммада II", "Героическая оборона Гурганджа (1221)", "11-летняя борьба Джалаладдина Мангуберди"],
      },
      {
        id: 5, dates: "1221–1511", name: "Суфии-Кунграты и Тимуриды", color: "#0891B2", href: "/tarix/xorazmshohlar",
        desc: "Возрождение Куня-Ургенча (минарет Кутлуг-Тимура, мавзолей Тюрабек-ханым), независимая династия Суфиев (1359–1388) и включение края в державу Амира Тимура.",
        events: ["Пахлаван Махмуд и мавзолей Тюрабек-ханым", "Хусейн, Юсуф и Сулейман Суфи (1359–1388)", "Присоединение к государству Тимура (1388)"],
      },
      {
        id: 6, dates: "1511–1920", name: "Хивинское ханство и просвещение", color: "#C58B43", href: "/tarix/xiva-xonligi",
        desc: "Государство Шейбанидов (1511) и Кунгратов (1804): ансамбль Ичан-Калы, Гандимиянский договор (1873), первая литография Атаджана Абдалова (1874) и Худайберген Деванов.",
        events: ["Абульгази Бахадурхан и Новый Ургенч (1643)", "Первая типография Хивы (Атаджан Абдалов, 1874)", "Реформы Ислам-Ходжи и кинохроника Деванова"],
      },
      {
        id: 7, dates: "1920–1991", name: "ХНСР и Хорезмская область", color: "#17243B", href: "/tarix/xorazm-tarixi",
        desc: "Образование Хорезмской НСР (1920), национальное размежевание (1924) и создание Хорезмской области 15 января 1938 года.",
        events: ["I Хорезмский курултай (26 апреля 1920 г.)", "15 января 1938 г. — Хорезмская область", "Система канала Ташсака и рост Ургенча"],
      },
      {
        id: 8, dates: "С 1991 года", name: "Независимый Узбекистан", color: "#319568", href: "/tarix/xorazm-tarixi",
        desc: "Юбилей 2500-летия Хивы (1997), награждение области орденом Джалаладдина Мангуберди (2003), танец Лазги в ЮНЕСКО (2019) и современный туризм.",
        events: ["Ичан-Кала в ЮНЕСКО (1990) и 2500 лет Хиве", "Орден Джалаладдина Мангуберди (2003)", "Признание танца Лазги ЮНЕСКО (2019)"],
      },
    ],
  },
  en: {
    sourceNote: "Sources: National Encyclopedia of Uzbekistan, Wikipedia (Xorazm viloyati, Sufi Dynasty, Khanate of Khiva) & archaeological scholarship.",
    etymology: {
      title: "Origin of the Name 'Khorezm' & Historical Capitals",
      text: "The name Khorezm appears in the Avesta (Xvairizem), Darius I’s Behistun Inscription (Huwarazmiš), and classical Greek accounts by Hecataeus and Herodotus (Chorasmia). Historian S. P. Tolstov interpreted it as 'Land of the Sun,' while linguist M. N. Bogolyubov read it as 'Good Fortified Land.'",
      capitalsTitle: "Sequence of Historical Capitals",
      capitals: [
        { name: "Kuzaligir", period: "6th–5th c. BCE" },
        { name: "Kalaligir", period: "5th–4th c. BCE" },
        { name: "Toprak-Kala", period: "1st–4th c. CE" },
        { name: "Kath (Beruni)", period: "305–10th c." },
        { name: "Old Urgench", period: "995–16th c." },
        { name: "Vazir", period: "1511–16th c." },
        { name: "Khiva", period: "Late 16th c.–1924" },
        { name: "Urgench", period: "1938–Present (Region)" },
      ],
    },
    viloyatModern: {
      title: "Khorezm People's Republic & Creation of Xorazm Region (1920–Present)",
      summary: "Following the abdication of Khan Said Abdullah on February 2, 1920, the First All-Khorezm Kurultai (April 26–30, 1920) proclaimed the Khorezm People's Soviet Republic (capital: Khiva; led by Polvonniyoz Hoji Yusupov). Renamed Khorezm SSR in October 1923, its core oasis districts entered the Uzbek SSR during the 1924 delimitation, and on January 15, 1938, Xorazm Region was formally established with Urgench as its capital. In 2003, the region received the Order of Jaloliddin Manguberdi.",
      milestones: [
        { date: "February 2, 1920", title: "End of the Khiva Khanate", desc: "Abdication of the final Kungrat ruler Said Abdullah Khan and formation of the Young Khivans provisional committee." },
        { date: "April 26–30, 1920", title: "Khorezm People's Republic Founded", desc: "First Kurultai proclaimed the Khorezm People's Soviet Republic with Khiva as capital (renamed Khorezm SSR on October 20, 1923)." },
        { date: "Autumn 1924", title: "Integration into Uzbek SSR", desc: "Under Central Asian national delimitation, Khorezm’s core oasis districts entered the newly formed Uzbek SSR." },
        { date: "January 15, 1938", title: "Xorazm Region Established", desc: "Upgraded from Khorezm Okrug to full regional status with Urgench as administrative capital." },
        { date: "1990 / 1997", title: "UNESCO Heritage & 2,500th Anniversary", desc: "Ichan-Kala inscribed by UNESCO in 1990; Khiva celebrated its 2,500th anniversary internationally in 1997." },
        { date: "2003 / 2019–2020", title: "National Honor & Modern Milestones", desc: "Region awarded the Order of Jaloliddin Manguberdi (2003); Lazgi inscribed by UNESCO (2019); Tuproqqalʼa District formed (2020)." },
      ],
    },
    eras: [
      {
        id: 1, dates: "8th–4th c. BCE", name: "Ancient Khorezm & Achaemenids", color: "#C58B43", href: "/tarix/qadimgi-xorazm",
        desc: "One of Central Asia’s oldest civilizations recorded in the Avesta: Kelteminar and Amirabad cultures, Kuzaligir citadel, Aramaic-derived Khwarazmian script, and XVI Satrapy.",
        events: ["Kelteminar & Amirabad cultures", "Khumbuztepa fire temple (Hazorasp)", "King Pharasmanes treaty (328 BCE)"],
      },
      {
        id: 2, dates: "1st–8th c. CE", name: "Afrighid Dynasty & Kath", color: "#15528B", href: "/tarix/qadimgi-xorazm",
        desc: "Recorded by al-Biruni with 22 Khorezmshah rulers; royal seat moved from Toprak-Kala to Kath in 305 CE with flourishing coinage and desert fortresses.",
        events: ["Toprak-Kala palace & Ayaz-Kala", "Royal capital shifted to Kath (305 CE)", "Silver Khorezmian royal coinage"],
      },
      {
        id: 3, dates: "995–1017", name: "Mamunids & Academy of Mamun", color: "#319568", href: "/tarix/xorazmshohlar",
        desc: "Golden Age centered in Gurganj (Old Urgench), where the Khorezm Mamun Academy (1004) brought together al-Biruni, Ibn Sina, and Abu Nasr ibn Iraq.",
        events: ["Founding of Mamun Academy (1004)", "Scholarship of al-Biruni & Ibn Sina", "Gurganj becomes oasis capital"],
      },
      {
        id: 4, dates: "1077–1231", name: "Khorezmshah Empire", color: "#7C3AED", href: "/tarix/xorazmshohlar",
        desc: "Founded by the Anushteginid dynasty and expanded under Tekish and Muhammad II to ~4.2 million km² across Central Asia, Persia, and Khorasan.",
        events: ["Rule of Atsiz, Tekish & Muhammad II", "7-month defense of Old Urgench (1221)", "11-year resistance by Jalal al-Din Manguberdi"],
      },
      {
        id: 5, dates: "1221–1511", name: "Sufid Dynasty & Timurids", color: "#0891B2", href: "/tarix/xorazmshohlar",
        desc: "Rebuilding of Kunya-Urgench (Kutlug Timur Minaret, Turabek Khanum Mausoleum), the Kungrat Sufid dynasty (1359–1388), and Amir Temur’s campaigns unifying Khorezm.",
        events: ["Pahlavon Mahmud & Turabek Khanum Mausoleum", "Husayn, Yusuf & Sulayman Sufi (1359–1388)", "Incorporated into Timurid realm (1388)"],
      },
      {
        id: 6, dates: "1511–1920", name: "Khiva Khanate & Enlightenment", color: "#C58B43", href: "/tarix/xiva-xonligi",
        desc: "Uzbek state under Ilbars Khan (1511) and Kungrats (1804): Ichan-Kala palaces, 1873 Gandimiyon Treaty, Otajon Abdolov’s 1874 printing press, and photographer Khudaybergen Devanov.",
        events: ["Abulghazi Bahadur Khan & 1643 Urgench", "Central Asia’s first press (Otajon Abdolov, 1874)", "Devanov’s early cinema & Islam Khoja reforms"],
      },
      {
        id: 7, dates: "1920–1991", name: "KPSR & Xorazm Region", color: "#17243B", href: "/tarix/xorazm-tarixi",
        desc: "Creation of the Khorezm People's Republic (1920), 1924 delimitation into the Uzbek SSR, and formal establishment of Xorazm Region on January 15, 1938.",
        events: ["First Kurultai (April 26, 1920)", "January 15, 1938: Xorazm Region formed", "Toshsaqa irrigation & modern Urgench"],
      },
      {
        id: 8, dates: "1991–Present", name: "Independent Uzbekistan", color: "#319568", href: "/tarix/xorazm-tarixi",
        desc: "Khiva’s 2,500th jubilee (1997), Order of Jaloliddin Manguberdi (2003), UNESCO recognition of Lazgi (2019), Tuproqqalʼa auto plant, and cultural tourism.",
        events: ["Ichan-Kala UNESCO site (1990)", "Order of Jaloliddin Manguberdi (2003)", "UNESCO recognition of Lazgi (2019)"],
      },
    ],
  },
};

export const getHistoryData = (lang = 'uz') => historyContent[lang] || historyContent.uz;
export const historyData = historyContent.uz;
