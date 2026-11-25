const economyContent = {
  uz: {
    overview: "Xorazm viloyati iqtisodiyoti sanoat, qishloq xo'jaligi, xizmat ko'rsatish va turizm tarmoqlariga tayanadi. So'nggi yillarda investitsiyalar hajmi oshib, zamonaviy sanoat zonalari va IT yo'nalishlari jadal rivojlanmoqda.",
    keyIndicators: { gdp: "42,3 trln so'm", growth: '6,8%', perCapita: "~21,1 mln so'm", enterprises: '28 500+' },
    gdpGrowth: [
      { year: '2020', value: 1.8 }, { year: '2021', value: 5.9 }, { year: '2022', value: 6.1 }, { year: '2023', value: 6.5 }, { year: '2024', value: 6.8 }
    ],
    sectors: [
      { name: "Qishloq xo'jaligi", value: 31.2, color: '#319568' },
      { name: 'Sanoat', value: 24.8, color: '#15528B' },
      { name: 'Xizmatlar', value: 37.6, color: '#C58B43' },
      { name: 'Qurilish', value: 6.4, color: '#7C3AED' },
    ],
    exports: [
      { product: 'To\'qimachilik', value: 220 },
      { product: 'Kimyo', value: 95 },
      { product: 'Oziq-ovqat', value: 78 },
      { product: 'Sanoat', value: 65 },
      { product: 'Mevalar', value: 55 },
    ],
    investments: { total: '$2,1 mlrd', projects: '120+', jobs: '15 000+' },
    unemployment: [
      { year: '2020', value: 66.4 }, { year: '2021', value: 67.5 }, { year: '2022', value: 68.8 }, { year: '2023', value: 69.9 }, { year: '2024', value: 70.8 }
    ],
    industries: [
      { title: 'Sanoat', desc: 'Qayta ishlash, yengil sanoat, avtomobilsozlik va qurilish materiallari.', photo: '/images/kalta-minor.jpg' },
      { title: "Qishloq xo'jaligi", desc: "Paxta, sholi, g'alla, sabzavot, poliz va bog'dorchilik mahsulotlari.", photo: '/images/cotton-harvest.jpg' },
      { title: 'Xizmatlar sohasi', desc: "Savdo, transport, logistika, mehmonxona va umumiy xizmatlar.", photo: '/images/urgench-modern.jpg' },
      { title: 'Turizm', desc: "Tarixiy obidalar, madaniy meros va ekoturizm imkoniyatlari.", photo: '/images/khiva-hero.jpg' },
      { title: 'IT va innovatsiya', desc: "Raqamli iqtisodiyot, IT xizmatlar, startaplar va texnoparklar.", photo: '/images/modern-office.jpg' },
    ],
  },
  ru: {
    overview: "Экономика Хорезмской области опирается на промышленность, сельское хозяйство, сферу услуг и туризм. В последние годы растёт объём инвестиций, развиваются промышленные зоны и IT-сектор.",
    keyIndicators: { gdp: '42,3 трлн сум', growth: '6,8%', perCapita: '~21,1 млн сум', enterprises: '28 500+' },
    gdpGrowth: [
      { year: '2020', value: 1.8 }, { year: '2021', value: 5.9 }, { year: '2022', value: 6.1 }, { year: '2023', value: 6.5 }, { year: '2024', value: 6.8 }
    ],
    sectors: [
      { name: 'Сельское хозяйство', value: 31.2, color: '#319568' },
      { name: 'Промышленность', value: 24.8, color: '#15528B' },
      { name: 'Услуги', value: 37.6, color: '#C58B43' },
      { name: 'Строительство', value: 6.4, color: '#7C3AED' },
    ],
    exports: [
      { product: 'Текстиль', value: 220 },
      { product: 'Химия', value: 95 },
      { product: 'Продукты', value: 78 },
      { product: 'Промтовары', value: 65 },
      { product: 'Фрукты', value: 55 },
    ],
    investments: { total: '$2,1 млрд', projects: '120+', jobs: '15 000+' },
    unemployment: [
      { year: '2020', value: 66.4 }, { year: '2021', value: 67.5 }, { year: '2022', value: 68.8 }, { year: '2023', value: 69.9 }, { year: '2024', value: 70.8 }
    ],
    industries: [
      { title: 'Промышленность', desc: 'Переработка, лёгкая промышленность, сборка авто и стройматериалы.', photo: '/images/kalta-minor.jpg' },
      { title: 'Сельское хозяйство', desc: 'Хлопок, рис, зерновые, овощи, бахчевые культуры и садоводство.', photo: '/images/cotton-harvest.jpg' },
      { title: 'Сфера услуг', desc: 'Торговля, транспорт, логистика, гостиничный и сервисный бизнес.', photo: '/images/urgench-modern.jpg' },
      { title: 'Туризм', desc: 'Исторические памятники, культурное наследие и экотуризм.', photo: '/images/khiva-hero.jpg' },
      { title: 'IT и инновации', desc: 'Цифровая экономика, IT-услуги, стартапы и технопарки.', photo: '/images/modern-office.jpg' },
    ],
  },
  en: {
    overview: "Khorezm's economy is built on manufacturing, agriculture, services and tourism. In recent years, investment inflows have accelerated alongside new industrial zones and IT initiatives.",
    keyIndicators: { gdp: '42.3T UZS', growth: '6.8%', perCapita: '~21.1M UZS', enterprises: '28,500+' },
    gdpGrowth: [
      { year: '2020', value: 1.8 }, { year: '2021', value: 5.9 }, { year: '2022', value: 6.1 }, { year: '2023', value: 6.5 }, { year: '2024', value: 6.8 }
    ],
    sectors: [
      { name: 'Agriculture', value: 31.2, color: '#319568' },
      { name: 'Industry', value: 24.8, color: '#15528B' },
      { name: 'Services', value: 37.6, color: '#C58B43' },
      { name: 'Construction', value: 6.4, color: '#7C3AED' },
    ],
    exports: [
      { product: 'Textiles', value: 220 },
      { product: 'Chemicals', value: 95 },
      { product: 'Food', value: 78 },
      { product: 'Goods', value: 65 },
      { product: 'Fruits', value: 55 },
    ],
    investments: { total: '$2.1B', projects: '120+', jobs: '15,000+' },
    unemployment: [
      { year: '2020', value: 66.4 }, { year: '2021', value: 67.5 }, { year: '2022', value: 68.8 }, { year: '2023', value: 69.9 }, { year: '2024', value: 70.8 }
    ],
    industries: [
      { title: 'Industry', desc: 'Processing, textiles, automotive assembly and building materials.', photo: '/images/kalta-minor.jpg' },
      { title: 'Agriculture', desc: 'Cotton, rice, grains, melons, vegetables and orchards.', photo: '/images/cotton-harvest.jpg' },
      { title: 'Services', desc: 'Trade, transport, logistics, hospitality and commercial services.', photo: '/images/urgench-modern.jpg' },
      { title: 'Tourism', desc: 'World heritage monuments, cultural festivals and eco-tourism.', photo: '/images/khiva-hero.jpg' },
      { title: 'IT & Innovation', desc: 'Digital economy, software services, startups and tech parks.', photo: '/images/modern-office.jpg' },
    ],
  },
};

export const getEconomyData = (lang = 'uz') => economyContent[lang] || economyContent.uz;
export const economyData = economyContent.uz;
