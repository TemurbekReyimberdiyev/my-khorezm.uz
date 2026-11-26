const ecologyContent = {
  uz: {
    overview:
      "Xorazm viloyati ekologik jihatdan nozik voha bo'lib, Orol dengizi qurishi oqibatlarini yumshatish, suv tejovchi texnologiyalarni joriy etish, sho'rlangan cho'l yerlarida Sarimoy quyosh elektr stansiyasi kabi yashil energetika loyihalarini amalga oshirish ustuvor vazifa sanaladi.",
    keyStats: [
      { l: 'Yashil hududlar va o‘rmonzor', v: '11,8%', c: '#319568' },
      { l: "Suv ta'minoti (yillik)", v: '~1,8 mlrd m³', c: '#15528B' },
      { l: 'Havo sifati (o‘rtacha AQI)', v: '92 (Qoniqarli)', c: '#C58B43' },
      { l: "Sho'rlangan yerlar ulushi", v: '~54%', c: '#EA580C' },
      { l: "Sarimoy quyosh stansiyasi", v: '126 MVt (Voltalia)', c: '#319568' },
    ],
    aralSea: {
      description:
        "Orol dengizi XX asr o'rtalarida ~68 000 km² maydon bilan dunyodagi eng yirik ko'llardan biri edi. Hozirga kelib Orolqum o'rnida 1,7 million gektardan ortiq saksovul va sho'rga chidamli o'rmonzorlar barpo etish bo'yicha yirik ekologik dastur amalga oshirilmoqda.",
      timeline: [
        { year: 1960, desc: 'Orol dengizi maydoni ~68 000 km²' },
        { year: 2024, desc: 'Qolgan maydon: ~7 000 km²' },
      ],
    },
    airQuality: {
      pm25: 38,
      pm10: 71,
      humidity: 62,
      windSpeed: 4.2,
      temperature: 8,
      aqi: 92,
      labels: {
        temp: 'Havo harorati',
        humidity: 'Nisbiy namlik',
        wind: 'Shamol tezligi',
        aqi: 'Havo sifati indeksi',
        good: 'Yaxshi',
        moderate: "O'rtacha",
      },
    },
    issues: [
      { id: 1, title: 'Orol dengizi inqirozi', severity: 'Jiddiy', isSevere: true, desc: "Dengiz sathining pasayishi va hududda tuz hamda chang bo'ronlari." },
      { id: 2, title: "Cho'llanish va chang bo'ronlari", severity: 'Jiddiy', isSevere: true, desc: "Qurg'oqchil hududlar kengayishi va atmosfera changlanishi." },
      { id: 3, title: "Tuproq sho'rlanishi", severity: "O'rtacha", isSevere: false, desc: "Sug'oriladigan yerlarda mineral tuzlanish va sho'r yuvish ehtiyoji." },
      { id: 4, title: 'Suv tanqisligi', severity: "O'rtacha", isSevere: false, desc: "Amudaryo oqimining mavsumiy tebranishi va kanallarni betonlash zarurati." },
      { id: 5, title: 'Havo ifloslanishi', severity: 'Past', isSevere: false, desc: "Transport va sanoat manbalari ta'sirini kamaytirish." },
    ],
    greenProjects: [
      { id: 1, title: 'Sarimoy 126 MVt quyosh stansiyasi', desc: "Tuproqqal'ada Voltalia (Fransiya) tomonidan ~180 ga sho'rlangan yerda barpo etildi (YTTB/IFC ko'magi)." },
      { id: 2, title: "Qora saksovul va «Yashil makon»", desc: "Orolbo'yi va Sarimoy cho'l hududlarida qurg'oqchilikka chidamli saksovulzorlar barpo etish." },
      { id: 3, title: 'Suv tejovchi texnologiyalar', desc: "Tomchilatib sug'orish va Toshsoqa/Shovot kanallarini betonlash dasturlari." },
      { id: 4, title: 'Agrovoltaika va ekologik monitoring', desc: "Quyosh panellari ostida tuproq namligini saqlash va havo/suv sifatini kuzatish." },
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
    overview:
      'Хорезмская область — экологически уязвимый оазис, где приоритетом служат смягчение последствий Аральского кризиса, экономия воды и развитие зелёной энергетики, включая СЭС «Сарымой» мощностью 126 МВт в Тупраккалинском районе.',
    keyStats: [
      { l: 'Доля зелёных зон', v: '11,8%', c: '#319568' },
      { l: 'Водообеспечение (год)', v: '~1,8 млрд м³', c: '#15528B' },
      { l: 'Качество воздуха (AQI)', v: '92 (Удовл.)', c: '#C58B43' },
      { l: 'Засолённые земли', v: '~54%', c: '#EA580C' },
      { l: 'СЭС Сарымой', v: '126 МВт (Voltalia)', c: '#319568' },
    ],
    aralSea: {
      description:
        'В середине XX века Аральское море занимало ~68 000 км². Сегодня на осушенном дне Приаралья реализуется масштабное озеленение саксаулом и солеустойчивыми растениями для сдерживания пыльно-солевых бурь.',
      timeline: [
        { year: 1960, desc: 'Площадь Аральского моря ~68 000 км²' },
        { year: 2024, desc: 'Оставшаяся площадь: ~7 000 км²' },
      ],
    },
    airQuality: {
      pm25: 38,
      pm10: 71,
      humidity: 62,
      windSpeed: 4.2,
      temperature: 8,
      aqi: 92,
      labels: {
        temp: 'Температура',
        humidity: 'Влажность',
        wind: 'Скорость ветра',
        aqi: 'Индекс воздуха (AQI)',
        good: 'Хорошо',
        moderate: 'Умеренно',
      },
    },
    issues: [
      { id: 1, title: 'Кризис Аральского моря', severity: 'Серьёзная', isSevere: true, desc: 'Снижение уровня моря, опустынивание и соляно-пыльные бури.' },
      { id: 2, title: 'Опустынивание и бури', severity: 'Серьёзная', isSevere: true, desc: 'Расширение засушливых зон и запылённость воздуха.' },
      { id: 3, title: 'Засоление почв', severity: 'Средняя', isSevere: false, desc: 'Рост минерализации орошаемых сельскохозяйственных земель.' },
      { id: 4, title: 'Дефицит воды', severity: 'Средняя', isSevere: false, desc: 'Сезонные колебания стока Амударьи и модернизация каналов.' },
      { id: 5, title: 'Загрязнение воздуха', severity: 'Низкая', isSevere: false, desc: 'Снижение выбросов транспорта и промышленных объектов.' },
    ],
    greenProjects: [
      { id: 1, title: 'СЭС Сарымой 126 МВт', desc: 'Построена Voltalia (Франция) при поддержке ЕБРР/IFC на ~180 га пустынных земель в Тупраккале.' },
      { id: 2, title: 'Саксаульники и «Яшил макон»', desc: 'Посадка чёрного саксаула для закрепления песков в Приаралье.' },
      { id: 3, title: 'Водосберегающие технологии', desc: 'Капельное орошение и бетонирование каналов Ташсака и Шават.' },
      { id: 4, title: 'Агровольтаика и мониторинг', desc: 'Сохранение влаги в тени солнечных панелей и контроль качества воздуха.' },
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
    overview:
      "Khorezm is an ecologically sensitive oasis prioritizing water conservation, Aral basin reforestation, and clean solar energy — anchored by the 126 MW Sarimoy solar plant built on degraded desert terrain in Tuproqqal'a.",
    keyStats: [
      { l: 'Green Cover Share', v: '11.8%', c: '#319568' },
      { l: 'Annual Water Supply', v: '~1.8B m³', c: '#15528B' },
      { l: 'Air Quality (Avg AQI)', v: '92 (Moderate)', c: '#C58B43' },
      { l: 'Salinized Land Share', v: '~54%', c: '#EA580C' },
      { l: 'Sarimoy Solar PV', v: '126 MW (Voltalia)', c: '#319568' },
    ],
    aralSea: {
      description:
        'Covering ~68,000 km² in 1960, the Aral Sea shrank sharply due to river diversions. Today large-scale black saxaul planting stabilizes the dried Aralkum seabed against salt-dust storms.',
      timeline: [
        { year: 1960, desc: 'Aral Sea surface area ~68,000 km²' },
        { year: 2024, desc: 'Remaining area: ~7,000 km²' },
      ],
    },
    airQuality: {
      pm25: 38,
      pm10: 71,
      humidity: 62,
      windSpeed: 4.2,
      temperature: 8,
      aqi: 92,
      labels: {
        temp: 'Air Temp',
        humidity: 'Humidity',
        wind: 'Wind Speed',
        aqi: 'Air Quality Index',
        good: 'Good',
        moderate: 'Moderate',
      },
    },
    issues: [
      { id: 1, title: 'Aral Sea Crisis', severity: 'High', isSevere: true, desc: 'Severe water retreat causing salt-dust storms and regional climate shift.' },
      { id: 2, title: 'Desertification & Dust', severity: 'High', isSevere: true, desc: 'Expanding arid zones and frequent airborne dust events.' },
      { id: 3, title: 'Soil Salinization', severity: 'Moderate', isSevere: false, desc: 'Rising salt concentrations across irrigated farmland.' },
      { id: 4, title: 'Water Scarcity', severity: 'Moderate', isSevere: false, desc: 'Seasonal Amu Darya variability requiring lined canals and drip systems.' },
      { id: 5, title: 'Air Pollution', severity: 'Low', isSevere: false, desc: 'Managing urban transport and industrial emissions.' },
    ],
    greenProjects: [
      { id: 1, title: '126 MW Sarimoy Solar Plant', desc: 'Built by France’s Voltalia with EBRD/IFC backing on ~180 ha of saline desert land in Tuproqqalʼa.' },
      { id: 2, title: 'Black Saxaul & Yashil Makon', desc: 'Planting drought-resilient saxaul shelterbelts to curb sand and salt drift.' },
      { id: 3, title: 'Water-Saving Irrigation', desc: 'Expanding drip irrigation and concrete-lining major canals.' },
      { id: 4, title: 'Agrivoltaics & Monitoring', desc: 'Piloting shaded crop retention under solar arrays and live air telemetry.' },
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
