const ecologyContent = {
  uz: {
    overview: "Xorazm viloyati ekologik jihatdan nozik hudud bo'lib, Orol dengizining qurishi, suv tanqisligi va tuproq sho'rlanishi kabi masalalarni hal etishga qaratilgan dasturlar amalga oshirilmoqda.",
    keyStats: [
      { l: "Yashil hududlar ulushi", v: "11,8%", c: "#319568" },
      { l: "Suv ta'minoti (yillik)", v: "~1,8 mlrd m³", c: "#15528B" },
      { l: "Havo sifati (o'rtacha AQI)", v: "92 (Qoniqarli)", c: "#C58B43" },
      { l: "Sho'rlangan yerlar ulushi", v: "~54%", c: "#EA580C" },
      { l: "O'rtacha yillik harorat", v: "+14,2°C", c: "#17243B" },
    ],
    aralSea: {
      description: "Orol dengizi XX asr o'rtalarida dunyodagi eng yirik ko'llardan biri edi. Suv resurslaridan haddan tashqari foydalanish natijasida dengiz sathi keskin pasayib, mintaqada cho'llanish va tuz bo'ronlari kuchaydi.",
      timeline: [
        { year: 1960, desc: "Orol dengizi maydoni ~68 000 km²" },
        { year: 2024, desc: "Qolgan maydon: ~7 000 km²" },
      ],
    },
    airQuality: {
      pm25: 38, pm10: 71, humidity: 62, windSpeed: 4.2, temperature: 8, aqi: 92,
      labels: {
        temp: 'Havo harorati', humidity: 'Nisbiy namlik', wind: 'Shamol tezligi', aqi: 'Havo sifati indeksi',
        good: 'Yaxshi', moderate: "O'rtacha",
      },
    },
    issues: [
      { id: 1, title: 'Orol dengizi inqirozi', severity: 'Jiddiy', isSevere: true, desc: "Dengiz sathining pasayishi va hududda tuz hamda chang bo'ronlari." },
      { id: 2, title: "Cho'llanish va chang bo'ronlari", severity: 'Jiddiy', isSevere: true, desc: "Qurg'oqchil hududlar kengayishi va atmosfera changlanishi." },
      { id: 3, title: "Tuproq sho'rlanishi", severity: "O'rtacha", isSevere: false, desc: "Sug'oriladigan yerlarda mineral tuzlanish darajasining oshishi." },
      { id: 4, title: 'Suv tanqisligi', severity: "O'rtacha", isSevere: false, desc: "Amudaryo oqimining cheklanishi va suvni tejash zarurati." },
      { id: 5, title: 'Havo ifloslanishi', severity: 'Past', isSevere: false, desc: "Transport va sanoat manbalari ta'sirini kamaytirish." },
    ],
    greenProjects: [
      { id: 1, title: "Saksovul o'rmonlarini tiklash", desc: "Orolbo'yi hududlarida 50 000 ga maydonda saksovulzorlar barpo etish." },
      { id: 2, title: 'Suv tejovchi texnologiyalar', desc: "Tomchilatib sug'orish va kanallarni betonlash dasturlari." },
      { id: 3, title: 'Quyosh energiyasi loyihalari', desc: "Qayta tiklanuvchi energiya ulushini oshirish." },
      { id: 4, title: 'Ekologik monitoring tizimi', desc: "Havo, suv va tuproq sifatini doimiy kuzatib borish." },
    ],
    monthlyAirQuality: [
      { month: 'Yan', pm25: 42 }, { month: 'Fev', pm25: 38 }, { month: 'Mar', pm25: 55 }, { month: 'Apr', pm25: 48 },
      { month: 'May', pm25: 35 }, { month: 'Iyn', pm25: 30 }, { month: 'Iyl', pm25: 28 }, { month: 'Avg', pm25: 32 },
      { month: 'Sen', pm25: 40 }, { month: 'Okt', pm25: 38 }, { month: 'Noy', pm25: 44 }, { month: 'Dek', pm25: 46 },
    ],
    monthlyPrecip: [
      { m: 'Yan', y: 12 }, { m: 'Fev', y: 10 }, { m: 'Mar', y: 15 }, { m: 'Apr', y: 10 },
      { m: 'May', y: 8 }, { m: 'Iyn', y: 4 }, { m: 'Iyl', y: 2 }, { m: 'Avg', y: 2 },
      { m: 'Sen', y: 5 }, { m: 'Okt', y: 8 }, { m: 'Noy', y: 12 }, { m: 'Dek', y: 14 },
    ],
  },
  ru: {
    overview: "Хорезмская область является экологически чувствительным регионом, где реализуются программы по смягчению последствий высыхания Аральского моря, дефицита воды и засоления почв.",
    keyStats: [
      { l: "Доля зелёных зон", v: "11,8%", c: "#319568" },
      { l: "Водообеспечение (год)", v: "~1,8 млрд м³", c: "#15528B" },
      { l: "Качество воздуха (AQI)", v: "92 (Удовл.)", c: "#C58B43" },
      { l: "Засолённые земли", v: "~54%", c: "#EA580C" },
      { l: "Среднегодовая темп.", v: "+14,2°C", c: "#17243B" },
    ],
    aralSea: {
      description: "В середине XX века Аральское море было одним из крупнейших озёр мира. Чрезмерный забор воды на орошение привёл к его высыханию, усилив опустынивание и пыльные бури.",
      timeline: [
        { year: 1960, desc: "Площадь Аральского моря ~68 000 км²" },
        { year: 2024, desc: "Оставшаяся площадь: ~7 000 км²" },
      ],
    },
    airQuality: {
      pm25: 38, pm10: 71, humidity: 62, windSpeed: 4.2, temperature: 8, aqi: 92,
      labels: {
        temp: 'Температура', humidity: 'Влажность', wind: 'Скорость ветра', aqi: 'Индекс воздуха (AQI)',
        good: 'Хорошо', moderate: 'Умеренно',
      },
    },
    issues: [
      { id: 1, title: 'Кризис Аральского моря', severity: 'Серьёзная', isSevere: true, desc: 'Снижение уровня моря, опустынивание и соляно-пыльные бури.' },
      { id: 2, title: 'Опустынивание и бури', severity: 'Серьёзная', isSevere: true, desc: 'Расширение засушливых зон и запылённость воздуха.' },
      { id: 3, title: 'Засоление почв', severity: 'Средняя', isSevere: false, desc: 'Рост минерализации орошаемых сельскохозяйственных земель.' },
      { id: 4, title: 'Дефицит воды', severity: 'Средняя', isSevere: false, desc: 'Ограниченность стока Амударьи и необходимость водосбережения.' },
      { id: 5, title: 'Загрязнение воздуха', severity: 'Низкая', isSevere: false, desc: 'Снижение выбросов транспорта и промышленных объектов.' },
    ],
    greenProjects: [
      { id: 1, title: 'Восстановление саксаульников', desc: 'Посадка саксаула на 50 000 га в зоне Приаралья.' },
      { id: 2, title: 'Водосберегающие технологии', desc: 'Капельное орошение и модернизация оросительных каналов.' },
      { id: 3, title: 'Проекты солнечной энергии', desc: 'Расширение доли возобновляемых источников энергии.' },
      { id: 4, title: 'Экологический мониторинг', desc: 'Непрерывное наблюдение за качеством воздуха, воды и почв.' },
    ],
    monthlyAirQuality: [
      { month: 'Янв', pm25: 42 }, { month: 'Фев', pm25: 38 }, { month: 'Мар', pm25: 55 }, { month: 'Апр', pm25: 48 },
      { month: 'Май', pm25: 35 }, { month: 'Июн', pm25: 30 }, { month: 'Июл', pm25: 28 }, { month: 'Авг', pm25: 32 },
      { month: 'Сен', pm25: 40 }, { month: 'Окт', pm25: 38 }, { month: 'Ноя', pm25: 44 }, { month: 'Дек', pm25: 46 },
    ],
    monthlyPrecip: [
      { m: 'Янв', y: 12 }, { m: 'Фев', y: 10 }, { m: 'Мар', y: 15 }, { m: 'Апр', y: 10 },
      { m: 'Май', y: 8 }, { m: 'Июн', y: 4 }, { m: 'Июл', y: 2 }, { m: 'Авг', y: 2 },
      { m: 'Сен', y: 5 }, { m: 'Окт', y: 8 }, { m: 'Ноя', y: 12 }, { m: 'Дек', y: 14 },
    ],
  },
  en: {
    overview: "Khorezm is an ecologically sensitive oasis region actively pursuing environmental restoration programs to address the Aral Sea desiccation, water scarcity and soil salinity.",
    keyStats: [
      { l: "Green Cover Share", v: "11.8%", c: "#319568" },
      { l: "Annual Water Supply", v: "~1.8B m³", c: "#15528B" },
      { l: "Air Quality (Avg AQI)", v: "92 (Moderate)", c: "#C58B43" },
      { l: "Salinized Land Share", v: "~54%", c: "#EA580C" },
      { l: "Annual Mean Temp", v: "+14.2°C", c: "#17243B" },
    ],
    aralSea: {
      description: "Once one of the world's four largest lakes in the mid-20th century, excessive irrigation diversions caused the Aral Sea to shrink dramatically, triggering salt-dust storms and desertification.",
      timeline: [
        { year: 1960, desc: "Aral Sea surface area ~68,000 km²" },
        { year: 2024, desc: "Remaining area: ~7,000 km²" },
      ],
    },
    airQuality: {
      pm25: 38, pm10: 71, humidity: 62, windSpeed: 4.2, temperature: 8, aqi: 92,
      labels: {
        temp: 'Air Temp', humidity: 'Humidity', wind: 'Wind Speed', aqi: 'Air Quality Index',
        good: 'Good', moderate: 'Moderate',
      },
    },
    issues: [
      { id: 1, title: 'Aral Sea Crisis', severity: 'High', isSevere: true, desc: 'Severe water retreat causing salt-dust storms and regional climate shift.' },
      { id: 2, title: 'Desertification & Dust', severity: 'High', isSevere: true, desc: 'Expanding arid zones and frequent airborne dust events.' },
      { id: 3, title: 'Soil Salinization', severity: 'Moderate', isSevere: false, desc: 'Rising salt concentrations across irrigated farmland.' },
      { id: 4, title: 'Water Scarcity', severity: 'Moderate', isSevere: false, desc: 'Limited Amu Darya inflow requiring modern conservation.' },
      { id: 5, title: 'Air Pollution', severity: 'Low', isSevere: false, desc: 'Managing urban transport and industrial emissions.' },
    ],
    greenProjects: [
      { id: 1, title: 'Saxaul Forest Restoration', desc: 'Planting 50,000 ha of drought-hardy saxaul across the Aral basin.' },
      { id: 2, title: 'Water-Saving Irrigation', desc: 'Expanding drip irrigation and lining regional canals.' },
      { id: 3, title: 'Solar Power Transition', desc: 'Scaling utility solar installations across sunlit desert margins.' },
      { id: 4, title: 'Ecological Monitoring', desc: 'Continuous tracking of regional air, water and soil quality.' },
    ],
    monthlyAirQuality: [
      { month: 'Jan', pm25: 42 }, { month: 'Feb', pm25: 38 }, { month: 'Mar', pm25: 55 }, { month: 'Apr', pm25: 48 },
      { month: 'May', pm25: 35 }, { month: 'Jun', pm25: 30 }, { month: 'Jul', pm25: 28 }, { month: 'Aug', pm25: 32 },
      { month: 'Sep', pm25: 40 }, { month: 'Oct', pm25: 38 }, { month: 'Nov', pm25: 44 }, { month: 'Dec', pm25: 46 },
    ],
    monthlyPrecip: [
      { m: 'Jan', y: 12 }, { m: 'Feb', y: 10 }, { m: 'Mar', y: 15 }, { m: 'Apr', y: 10 },
      { m: 'May', y: 8 }, { m: 'Jun', y: 4 }, { m: 'Jul', y: 2 }, { m: 'Aug', y: 2 },
      { m: 'Sep', y: 5 }, { m: 'Oct', y: 8 }, { m: 'Nov', y: 12 }, { m: 'Dec', y: 14 },
    ],
  },
};

export const getEcologyData = (lang = 'uz') => ecologyContent[lang] || ecologyContent.uz;
export const ecologyData = ecologyContent.uz;
