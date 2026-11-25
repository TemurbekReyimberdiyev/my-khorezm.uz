const suggestedQuestionsData = {
  uz: [
    "Xorazm tarixi haqida gapirib ber",
    "Xivadagi mashhur joylar qaysilar?",
    "Xiva xonligi haqida ma'lumot ber",
    "Xorazmning iqlimi qanday?",
    "Xorazm milliy taomlari qaysilar?",
    "Al-Xorazmiy kim edi?",
    "Orol dengizi muammosi nima?",
    "Lazgi raqsi nima?",
  ],
  ru: [
    "Расскажи об истории Хорезма",
    "Какие главные достопримечательности в Хиве?",
    "Что такое Хивинское ханство?",
    "Какой климат в Хорезме?",
    "Какие национальные блюда есть в Хорезме?",
    "Кто такой аль-Хорезми?",
    "В чём проблема Аральского моря?",
    "Что такое танец Лазги?",
  ],
  en: [
    "Tell me about the history of Khorezm",
    "What are the top landmarks in Khiva?",
    "Tell me about the Khiva Khanate",
    "What is Khorezm's climate like?",
    "What are Khorezm's signature dishes?",
    "Who was al-Khwarizmi?",
    "What caused the Aral Sea crisis?",
    "What is the Lazgi dance?",
  ],
};

const kb = {
  uz: {
    history: "Xorazm — Markaziy Osiyoning eng qadimiy sivilizatsiya markazlaridan biri. Miloddan avvalgi davrlardan Afrig'iylar, Ma'muniylar (Ma'mun akademiyasi), Xorazmshohlar imperiyasi va 1511–1920-yillarda Xiva xonligi kabi buyuk davlatlar shu zaminda ravnaq topgan.",
    khivaPlaces: "Xivadagi asosiy diqqatga sazovor joylar: 1) Ichan-Qal'a (UNESCO merosi); 2) Kalta Minor minorasi; 3) Ko'hna Ark qal'asi; 4) Toshhovli saroyi; 5) Pahlavon Mahmud maqbarasi; 6) 218 ustunli Juma masjidi; 7) Islam Xo'ja minorasi.",
    khivaKhanate: "Xiva xonligi (1511–1920) — Xorazm tarixidagi uzoq davom etgan davlat. Ichan-Qal'aning me'moriy qiyofasi aynan xonlik davrida, ayniqsa Qo'ng'irotlar sulolasi zamonida yaratilgan.",
    climate: "Xorazm iqlimi keskin kontinental va quruq: yozda +35...+42°C, qishda -5...-15°C. Yillik yog'ingarchilik 80–120 mm, quyoshli kunlar esa yiliga 280–300 kunga yetadi.",
    cuisine: "Xorazm milliy taomlari: Shivit oshi (yashil ukropli lag'mon), Tuxum barak, Xorazm palovi (chalov), Xorazm gummasi, Moshxo'rda va tandir patir nonlari.",
    alKhwarizmi: "Muhammad ibn Muso al-Xorazmiy (780–850) — buyuk matematik va astronom. Algebra faniga asos solgan va uning lotincha «Algoritmi» nomi zamonaviy «algoritm» atamasiga asos bo'lgan.",
    aralSea: "Orol dengizi inqirozi XX asrning ikkinchi yarmida suv resurslaridan ortiqcha foydalanish natijasida yuzaga keldi. Hozirda Xorazm va Orolbo'yida saksovul ekish va suv tejovchi texnologiyalar joriy etilmoqda.",
    lazgi: "Lazgi — Xorazmning qadimiy an'anaviy raqsi bo'lib, 2019-yilda UNESCO tomonidan insoniyatning nomoddiy madaniy merosi ro'yxatiga kiritilgan.",
    default: "Xorazm — O'zbekistonning shimoli-g'arbiy viloyati (6 100 km², ~2 mln aholi). Poytaxti — Urganch, tarixiy marvaridi esa Xiva. Tarix, turizm, milliy taomlar yoki madaniyat haqida savol bering!",
  },
  ru: {
    history: "Хорезм — один из древнейших очагов цивилизации в Центральной Азии. Здесь расцветали государства Афригидов, Мамунидов (Академия Мамуна), великая империя Хорезмшахов и Хивинское ханство (1511–1920).",
    khivaPlaces: "Главные достопримечательности Хивы: 1) Ичан-Кала (ЮНЕСКО); 2) минарет Кальта-Минор; 3) цитадель Куня-Арк; 4) дворец Таш-Хаули; 5) мавзолей Пахлавана Махмуда; 6) Джума-мечеть с 218 колоннами; 7) минарет Ислам-Ходжи.",
    khivaKhanate: "Хивинское ханство (1511–1920) — государство на территории Хорезма, в эпоху которого сформировался уникальный архитектурный ансамбль Ичан-Калы.",
    climate: "Климат Хорезма резко континентальный и засушливый: летом +35...+42°C, зимой -5...-15°C. Годовые осадки — 80–120 мм, в году 280–300 солнечных дней.",
    cuisine: "Национальная кухня Хорезма: Шивит оши (зелёная лапша с укропом), Тухум барак, хорезмский плов (чалов), гумма, машхурда и тандырный патыр.",
    alKhwarizmi: "Мухаммад ибн Муса аль-Хорезми (780–850) — великий математик и астроном, основоположник алгебры. От латинизации его имени произошло слово «алгоритм».",
    aralSea: "Аральский кризис возник во второй половине XX века вследствие сокращения стока рек. Сегодня в регионе высаживаются саксаульники и внедряется капельное орошение.",
    lazgi: "Лазги — древний хорезмский танец, включённый в 2019 году в список нематериального культурного наследия ЮНЕСКО.",
    default: "Хорезм — северо-западная область Узбекистана (6 100 км², ~2 млн жителей). Административный центр — Ургенч, историческая жемчужина — Хива. Задайте вопрос об истории, кухне или маршрутах!",
  },
  en: {
    history: "Khorezm is one of Central Asia's oldest civilizations, nurturing the Afrighid and Mamunid dynasties (Mamun Academy), the vast Khorezmshah Empire, and the Khiva Khanate (1511–1920).",
    khivaPlaces: "Top landmarks in Khiva include: 1) Ichan-Kala (UNESCO World Heritage); 2) Kalta Minor Minaret; 3) Kunya Ark Fortress; 4) Toshhovli Palace; 5) Pahlavon Mahmud Mausoleum; 6) 218-pillar Juma Mosque; 7) Islam Khoja Minaret.",
    khivaKhanate: "The Khiva Khanate (1511–1920) ruled Khorezm for over four centuries and gave Ichan-Kala its iconic tiled mosques, madrasas and palaces.",
    climate: "Khorezm has a sharply continental arid climate: +35...+42°C in summer, -5...-15°C in winter, only 80–120 mm of annual rainfall, and 280–300 sunny days per year.",
    cuisine: "Signature Khorezmian dishes include Shivit Oshi (green dill noodles), Tuxum Barak (egg custard dumplings), Khorezm Pilaf (Chalov), Gumma pastries and Moshkhurda.",
    alKhwarizmi: "Muhammad ibn Musa al-Khwarizmi (780–850) was a pioneering mathematician and astronomer who founded algebra and gave his name to the concept of the 'algorithm'.",
    aralSea: "The Aral Sea crisis developed in the late 20th century due to excessive river diversions. Today, large-scale saxaul reforestation and water-saving irrigation projects are underway.",
    lazgi: "Lazgi is Khorezm's vibrant traditional dance, inscribed by UNESCO in 2019 as Intangible Cultural Heritage of Humanity.",
    default: "Khorezm is Uzbekistan's northwestern oasis region (6,100 km², ~2M residents), centered on Urgench and historic Khiva. Ask me about history, sights, climate, cuisine or culture!",
  },
};

export const getSuggestedQuestions = (lang = 'uz') => suggestedQuestionsData[lang] || suggestedQuestionsData.uz;
export const getAiKnowledgeBase = (lang = 'uz') => kb[lang] || kb.uz;

export function getAiReply(q, lang = 'uz') {
  const base = kb[lang] || kb.uz;
  const lower = (q || '').toLowerCase();
  if (lower.includes('tarix') || lower.includes('истор') || lower.includes('histor') || lower.includes('qadim') || lower.includes('древн') || lower.includes('ancient')) return base.history;
  if (lower.includes('xonli') || lower.includes('ханств') || lower.includes('khanate')) return base.khivaKhanate;
  if (lower.includes('xiva') || lower.includes('хив') || lower.includes('khiva') || lower.includes('joy') || lower.includes('достоприм') || lower.includes('landmark')) return base.khivaPlaces;
  if (lower.includes('iqlim') || lower.includes('климат') || lower.includes('climat') || lower.includes('ob-havo') || lower.includes('weather')) return base.climate;
  if (lower.includes('taom') || lower.includes('блюд') || lower.includes('кухн') || lower.includes('dish') || lower.includes('cuisin') || lower.includes('osh') || lower.includes('shivit')) return base.cuisine;
  if (lower.includes('xorazmiy') || lower.includes('хорезми') || lower.includes('khwarizmi') || lower.includes('algebr') || lower.includes('algoritm')) return base.alKhwarizmi;
  if (lower.includes('orol') || lower.includes('арал') || lower.includes('aral') || lower.includes('ekolog') || lower.includes('эколог') || lower.includes('ecolog')) return base.aralSea;
  if (lower.includes('lazgi') || lower.includes('лазги') || lower.includes('raqs') || lower.includes('танец') || lower.includes('dance')) return base.lazgi;
  return base.default;
}

export const suggestedQuestions = suggestedQuestionsData.uz;
export const aiKnowledgeBase = kb.uz;
