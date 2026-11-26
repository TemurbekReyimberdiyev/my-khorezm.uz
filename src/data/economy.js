// Verified economic statistics source: Xorazm viloyati statistika boshqarmasi (xorazmstat.uz, 2024–2025)
const economyContent = {
  uz: {
    overview:
      "Xorazm viloyati iqtisodiyoti xizmatlar, qishloq xo'jaligi, to'qimachilik, avtomobilsozlik va turizm tarmoqlariga tayanadi. 2025-yilning I yarim yilligida YaHM hajmi 26 774,5 mlrd so'mni tashkil etib, 7,4% o'sish qayd etildi; «Hazorasp» EIZ va Pitnak avtozavodi sanoatning yetakchi drayverlaridir.",
    keyIndicators: {
      gdp: "26,8 trln so'm (2025, 6 oy)",
      growth: '+7,4% (2025, 6 oy)',
      perCapita: '36,2 trln (2024, 9 oy)',
      enterprises: '3 432+ sanoat (2025)',
    },
    donutCenter: { val: '26,8', unit: 'trln (6 oy)' },
    trade: {
      exportVal: '386,3 mln $',
      importVal: '470,9 mln $',
      exportPct: 45,
      importPct: 55,
      summary: '2024-yil TSA: 857,2 mln $ · Eksport +27,0%',
    },
    gdpGrowth: [
      { year: '2021', value: 5.9 },
      { year: '2022', value: 6.1 },
      { year: '2023', value: 6.5 },
      { year: '2024 (9o)', value: 6.4 },
      { year: '2025 (6o)', value: 7.4 },
    ],
    sectors: [
      { name: 'Xizmatlar sohasi', value: 44.8, color: '#C58B43' },
      { name: "Qishloq xo'jaligi", value: 28.9, color: '#319568' },
      { name: 'Sanoat va qurilish', value: 26.3, color: '#15528B' },
    ],
    exports: [
      { product: "To'qimachilik", value: 220 },
      { product: 'Kimyo', value: 95 },
      { product: 'Oziq-ovqat', value: 78 },
      { product: 'Sanoat', value: 65 },
      { product: 'Mevalar', value: 55 },
    ],
    investments: { total: '126 MVt', projects: 'Hazorasp EIZ', jobs: '1 mln+ turist' },
    investmentLabels: { a: 'Sarimoy quyosh st.', b: 'Erkin iqtisodiy zona', c: 'Turizm oqimi (2025)' },
    unemployment: [
      { year: '2020', value: 66.4 },
      { year: '2021', value: 67.5 },
      { year: '2022', value: 68.8 },
      { year: '2023', value: 69.9 },
      { year: '2024', value: 70.8 },
    ],
    industries: [
      { title: 'Avtomobilsozlik va sanoat', desc: 'Pitnakdagi UzAuto Motors (Damas/Labo), «Hazorasp» EIZ va ip-kalava klasterlari.', photo: '/images/kalta-minor.jpg' },
      { title: "Qishloq xo'jaligi", desc: "232,1 ming ga ekin maydonida sholi, paxta, g'alla, qovun va bog'dorchilik.", photo: '/images/cotton-harvest.jpg' },
      { title: 'Xizmatlar va savdo', desc: "YaHMning 44,8% ulushi: savdo, transport, Amudaryo ko'prigi va logistika.", photo: '/images/urgench-modern.jpg' },
      { title: 'Turizm va hunarmandchilik', desc: "2025-yilda 1 milliondan ortiq sayyoh, «Arda Xiva» va mehmonxona klasteri.", photo: '/images/khiva-hero.jpg' },
      { title: 'Yashil energetika va IT', desc: "Sarimoy 126 MVt quyosh stansiyasi (Voltalia) va IT Park Xorazm rezidentlari.", photo: '/images/modern-office.jpg' },
    ],
  },
  ru: {
    overview:
      'Экономика Хорезмской области опирается на сферу услуг (44,8%), сельское хозяйство (28,9%), промышленность и туризм. За январь–июнь 2025 года ВРП достиг 26 774,5 млрд сумов (+7,4%); ключевыми драйверами выступают СЭЗ «Хазарасп» и автозавод в Питнаке.',
    keyIndicators: {
      gdp: '26,8 трлн сум (I пол. 2025)',
      growth: '+7,4% (I пол. 2025)',
      perCapita: '36,2 трлн (9 мес. 2024)',
      enterprises: '3 432+ пром. (2025)',
    },
    donutCenter: { val: '26,8', unit: 'трлн (6 м.)' },
    trade: {
      exportVal: '386,3 млн $',
      importVal: '470,9 млн $',
      exportPct: 45,
      importPct: 55,
      summary: 'Внешнеторговый оборот 2024: 857,2 млн $ · Экспорт +27,0%',
    },
    gdpGrowth: [
      { year: '2021', value: 5.9 },
      { year: '2022', value: 6.1 },
      { year: '2023', value: 6.5 },
      { year: '2024 (9м)', value: 6.4 },
      { year: '2025 (6м)', value: 7.4 },
    ],
    sectors: [
      { name: 'Сфера услуг', value: 44.8, color: '#C58B43' },
      { name: 'Сельское хозяйство', value: 28.9, color: '#319568' },
      { name: 'Пром. и строительство', value: 26.3, color: '#15528B' },
    ],
    exports: [
      { product: 'Текстиль', value: 220 },
      { product: 'Химия', value: 95 },
      { product: 'Продукты', value: 78 },
      { product: 'Промтовары', value: 65 },
      { product: 'Фрукты', value: 55 },
    ],
    investments: { total: '126 МВт', projects: 'СЭЗ Хазарасп', jobs: '1 млн+ туристов' },
    investmentLabels: { a: 'СЭС Сарымой (Voltalia)', b: 'Свободная экон. зона', c: 'Турпоток (2025)' },
    unemployment: [
      { year: '2020', value: 66.4 },
      { year: '2021', value: 67.5 },
      { year: '2022', value: 68.8 },
      { year: '2023', value: 69.9 },
      { year: '2024', value: 70.8 },
    ],
    industries: [
      { title: 'Автопром и индустрия', desc: 'Завод UzAuto Motors в Питнаке (Damas/Labo), СЭЗ «Хазарасп» и текстиль.', photo: '/images/kalta-minor.jpg' },
      { title: 'Сельское хозяйство', desc: '232,1 тыс. га посевов: рисоводство, хлопок, зерно, дыни и садоводство.', photo: '/images/cotton-harvest.jpg' },
      { title: 'Услуги и торговля', desc: '44,8% ВРП: торговля, логистика и новый мост через Амударью.', photo: '/images/urgench-modern.jpg' },
      { title: 'Туризм и ремёсла', desc: 'Свыше 1 млн гостей в 2025 году, комплекс «Арда Хива» и отели.', photo: '/images/khiva-hero.jpg' },
      { title: 'Зелёная энергия и IT', desc: 'СЭС Сарымой 126 МВт (Voltalia) и резиденты технопарка IT Park.', photo: '/images/modern-office.jpg' },
    ],
  },
  en: {
    overview:
      "Khorezm's economy is led by services (44.8%), agriculture (28.9%), manufacturing, and heritage tourism. In Jan–Jun 2025, regional GRP reached 26,774.5 billion UZS (+7.4%), driven by Hazorasp FEZ, Pitnak automotive assembly, and clean energy.",
    keyIndicators: {
      gdp: '26.8T UZS (H1 2025)',
      growth: '+7.4% (H1 2025)',
      perCapita: '36.2T UZS (9M 2024)',
      enterprises: '3,432+ industrial (2025)',
    },
    donutCenter: { val: '26.8T', unit: 'H1 2025' },
    trade: {
      exportVal: '$386.3M',
      importVal: '$470.9M',
      exportPct: 45,
      importPct: 55,
      summary: '2024 Foreign Trade: $857.2M · Exports +27.0%',
    },
    gdpGrowth: [
      { year: '2021', value: 5.9 },
      { year: '2022', value: 6.1 },
      { year: '2023', value: 6.5 },
      { year: '2024 (9M)', value: 6.4 },
      { year: '2025 (H1)', value: 7.4 },
    ],
    sectors: [
      { name: 'Services', value: 44.8, color: '#C58B43' },
      { name: 'Agriculture', value: 28.9, color: '#319568' },
      { name: 'Industry & Constr.', value: 26.3, color: '#15528B' },
    ],
    exports: [
      { product: 'Textiles', value: 220 },
      { product: 'Chemicals', value: 95 },
      { product: 'Food', value: 78 },
      { product: 'Goods', value: 65 },
      { product: 'Fruits', value: 55 },
    ],
    investments: { total: '126 MW', projects: 'Hazorasp FEZ', jobs: '1M+ guests' },
    investmentLabels: { a: 'Sarimoy Solar (Voltalia)', b: 'Free Economic Zone', c: '2025 Tourism Flow' },
    unemployment: [
      { year: '2020', value: 66.4 },
      { year: '2021', value: 67.5 },
      { year: '2022', value: 68.8 },
      { year: '2023', value: 69.9 },
      { year: '2024', value: 70.8 },
    ],
    industries: [
      { title: 'Automotive & Industry', desc: 'UzAuto Motors plant in Pitnak (Damas/Labo), Hazorasp FEZ & textile mills.', photo: '/images/kalta-minor.jpg' },
      { title: 'Agriculture', desc: '232.1k ha cultivated land producing rice, cotton, grains, melons & fruit.', photo: '/images/cotton-harvest.jpg' },
      { title: 'Services & Logistics', desc: '44.8% GRP share spanning retail, rail links & the 2024 Amu Darya bridge.', photo: '/images/urgench-modern.jpg' },
      { title: 'Tourism & Crafts', desc: 'Over 1M annual visitors in 2025, Arda Khiva resort & boutique hospitality.', photo: '/images/khiva-hero.jpg' },
      { title: 'Clean Energy & IT', desc: '126 MW Sarimoy Solar PV plant (Voltalia) & Khorezm IT Park startups.', photo: '/images/modern-office.jpg' },
    ],
  },
};

export const getEconomyData = (lang = 'uz') => economyContent[lang] || economyContent.uz;
export const economyData = economyContent.uz;
