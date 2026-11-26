import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';
import ImageLightbox from '../../components/common/ImageLightbox';
import Icon3D from '../../components/common/Icon3D';

const ancientData = {
  uz: {
    heading: "Qadimgi Xorazm sivilizatsiyasi va Avesto davri",
    lead: "Xorazm — Markaziy Osiyoda sug'orma dehqonchilik va ilk davlatchilik shakllangan eng qadimiy sivilizatsiya o'choqlaridan biri. «Xorazm» nomi ilk bor «Avesto»da (Xvairizem — «Ming irmoqli daryo o'lkasi»), Doro I ning Behistun kitoblarida (Xvarazmish) va yunon tarixchilari Gekatey hamda Gerodot asarlarida qayd etilgan. Miloddan avvalgi VIII asrda xorazmiylar, massagetlar, saklar, apasaklar va daxlar yashagan ilk davlat birlashmasi yuzaga kelgan.",
    kpis: [
      { l: "Ilk madaniyatlar", v: "Mil. avv. IV–I ming yillik" },
      { l: "Davlat shakllanishi", v: "Mil. avv. VIII–VI asr" },
      { l: "Afrig'iylar sulolasi", v: "22 nafar Xorazmshoh" },
      { l: "Kot poytaxt yili", v: "Milodiy 305-yil" },
    ],
    phasesTitle: "Arxeologik davrlar va davlatchilik bosqichlari",
    phases: [
      {
        icon: 'layers',
        color: '#15528B',
        bg: '#EBF3FA',
        title: "Kaltaminor, Tozabog'yop va Amirobod madaniyatlari",
        text: "Amudaryoning Oqchadaryo deltasida mil. avv. IV–III ming yilliklarda ovchilik va baliqchilik bilan shug'ullangan Kaltaminor madaniyati, mil. avv. II ming yillikda Tozabog'yop va Suvyorgan qabilalari, IX–VIII asrlarda esa yirik sug'orma kanallar qurgan Amirobod madaniyati shakllangan.",
      },
      {
        icon: 'compass',
        color: '#C58B43',
        bg: '#FFF3E0',
        title: "Ahamoniylar XVI satrapligi va Xumbuztepa",
        text: "Mil. avv. VI–V asrlarda Xorazm Ahamoniylar davlatining 16-satrapligi tarkibiga kirgan. Hazorasp tumanidagi Xumbuztepa yodgorligidan mil. avv. VII asrdan milodiy IV asrgacha sopol ishlab chiqarilgani va mil. avv. V–IV asrlarga oid zardushtiylik otashparastlik ibodatxonasi qoldiqlari topilgan.",
      },
      {
        icon: 'coins',
        color: '#319568',
        bg: '#E8F5EE',
        title: "Mustaqil Xorazm va shoh Farasman (mil. avv. 328)",
        text: "Mil. avv. IV asr boshlarida Xorazm Ahamoniylardan mustaqillikka erishdi. Mil. avv. 328-yil bahorida Xorazm hukmdori Farasman 1500 suvoriy bilan Iskandar Maqduniy qarorgohiga tashrif buyurib, diplomatiya va hamkorlik muzokaralari olib borgan.",
      },
      {
        icon: 'museum',
        color: '#7C3AED',
        bg: '#F3EEFF',
        title: "Afrig'iylar sulolasi va Kot (305–X asr)",
        text: "Abu Rayhon Beruniy Xorazm davlatiga afsonaviy Siyovush asos solgani hamda Afrig'iylar sulolasining 22 nafar Xorazmshohi hukmronligini yozib qoldirgan. Poytaxt avval Tuproqqal'ada bo'lib, 305-yilda Kot shahriga ko'chirilgan; I–VIII asrlarda hukmdor va suvoriy tasvirli kumush tangalar zarb etilgan.",
      },
      {
        icon: 'scroll',
        color: '#0891B2',
        bg: '#E0F7FA',
        title: "Xorazm yozuvi, Avesto va astronomik taqvim",
        text: "Mil. avv. IV–III asrlardan oromiy yozuvi negizida qadimgi xorazmiy alifbosi shakllangan; Tuproqqal'a va Qo'yqirilgan-Qal'adan teri va yog'ochga bitilgan arxiv hujjatlari topilgan. Beruniy «Qadimgi xalqlardan qolgan yodgorliklar» asarida xorazmiylarning quyosh taqvimi, oylari va Avesto an'analarini batafsil bayon qilgan.",
      },
      {
        icon: 'waves',
        color: '#319568',
        bg: '#E8F5EE',
        title: "Qadimgi irrigatsiya va Ipak yo'li savdosi",
        text: "Amudaryo quyi oqimida yirik magistral kanallar tizimi (Chermenyab, G'ozovot va b.) qazilib, minglab gektar yerlar sug'orilgan. Qadimgi Xorazm Volga bo'yi, Sharqiy Yevropa va Shimoliy Xitoy bilan kumush, ipak va hunarmandchilik mahsulotlari savdosida muhim bo'g'in bo'lgan.",
      },
    ],
    sitesTitle: "Asosiy qal'alar va arxeologik yodgorliklar",
    sites: [
      { img: '/images/districts/tuproqqala-tumani.jpg', t: "Tuproqqal'a", d: "I–IV asrlarga oid hashamatli saroy-shahar (S. P. Tolstov ekspeditsiyasi ochgan). Bu yerdan mil. avv. I asrga mansub ilk kumush tangalar va ma'muriy arxiv hujjatlari topilgan.", tag: "Saroy majmuasi" },
      { img: '/images/history/ayaz-kala.jpg', t: "Ayaz-Qal'a", d: "Mil. avv. IV asrdan milodiy VII asrgacha Qizilqum tepaliklarida bunyod etilgan uch qismli mudofaa qal'alar tizimi.", tag: "Harbiy istehkom" },
      { img: '/images/koy-krylgan.jpg', t: "Qo'yqirilgan-Qal'a", d: "Mil. avv. IV–III asrlarda qurilgan, diametri 44 metrli doirasimon ikki qavatli ibodatxona va Markaziy Osiyodagi eng qadimiy astronomik rasadxona.", tag: "Rasadxona" },
      { img: '/images/history/jonbos-kala.jpg', t: "Jonbos-Qal'a", d: "Mil. avv. IV asr–I asrga mansub, baland o'qotar tuynukli paxsa devorlari va olov ibodatxonasi bilan mashhur istehkom.", tag: "Istehkom" },
      { img: '/images/ancient-fortress.jpg', t: "Ko'zaliqir va Qal'aliqir", d: "Arxeologlar S. Bolelov va Y. Rapoport ta'kidlashicha, mil. avv. VI–IV asr arxaik Xorazmning saroyli ilk poytaxt shaharlari (63 ga gacha).", tag: "Ilk poytaxt" },
      { img: '/images/districts/hazorasp-tumani.jpg', t: "Xumbuztepa va Hazorasp", d: "Hazorasp tumanida joylashgan mil. avv. VII–IV asrlarga oid sopolchilik markazi va zardushtiylik otashparastlar ibodatxonasi.", tag: "Ibodatxona" },
    ],
    source: "Manba: Vikipediya (Xorazm, Xorazm viloyati) — S. P. Tolstov va Y. G'ulomov arxeologik tadqiqotlari.",
  },
  ru: {
    heading: "Цивилизация Древнего Хорезма и эпоха «Авесты»",
    lead: "Хорезм — один из древнейших очагов поливного земледелия и ранней государственности в Центральной Азии. Название края впервые упоминается в «Авесте» (Хвайризем), Бехистунской надписи Дария I (Хваразамиш) и трудах Гекатея и Геродота (Хорасмия). В VIII–VI вв. до н.э. здесь сложилось древнейшее государство с участием хорезмийцев, массагетов, саков и дахов.",
    kpis: [
      { l: "Ранние культуры", v: "IV–I тыс. до н.э." },
      { l: "Государственность", v: "VIII–VI вв. до н.э." },
      { l: "Династия Афригидов", v: "22 хорезмшаха" },
      { l: "Столица Кят", v: "с 305 года н.э." },
    ],
    phasesTitle: "Археологические культуры и этапы государственности",
    phases: [
      {
        icon: 'layers',
        color: '#15528B',
        bg: '#EBF3FA',
        title: "Кельтеминарская, Тазабагъябская и Амирабадская культуры",
        text: "В IV–III тыс. до н.э. в дельте Амударьи существовала кельтеминарская культура охотников и рыболовов, во II тыс. до н.э. — скотоводы-земледельцы тазабагъябской и суярганской культур, а в IX–VIII вв. до н.э. сложилась амирабадская культура с развитыми оросительными каналами.",
      },
      {
        icon: 'compass',
        color: '#C58B43',
        bg: '#FFF3E0',
        title: "XVI сатрапия Ахеменидов и храм Хумбузтепа",
        text: "В VI–V вв. до н.э. Хорезм входил в державу Ахеменидов как 16-я сатрапия. На городище Хумбузтепа в Хазараспском районе археологи открыли керамический центр VII в. до н.э. – IV в. н.э. и остатки зороастрийского храма огня V–IV вв. до н.э.",
      },
      {
        icon: 'coins',
        color: '#319568',
        bg: '#E8F5EE',
        title: "Независимый Хорезм и царь Фарасман (328 г. до н.э.)",
        text: "К началу IV века до н.э. Хорезм обрёл полную независимость. Весной 328 года до н.э. хорезмский царь Фарасман с 1500 всадниками прибыл в ставку Александра Македонского для дипломатических переговоров.",
      },
      {
        icon: 'museum',
        color: '#7C3AED',
        bg: '#F3EEFF',
        title: "Династия Афригидов и столица Кят (305–X в.)",
        text: "Аль-Беруни описал правление 22 хорезмшахов династии Афригидов. Столица из Топрак-Калы в 305 году была перенесена в Кят; с I по VIII в. чеканились собственные серебряные монеты с изображением царя в короне и всадника.",
      },
      {
        icon: 'scroll',
        color: '#0891B2',
        bg: '#E0F7FA',
        title: "Хорезмийская письменность и календарь",
        text: "С IV–III вв. до н.э. на основе арамейского письма сложилась самобытная хорезмийская письменность (архивы на коже и дереве из Топрак-Калы и Кой-Крылган-Калы). Аль-Беруни подробно описал хорезмийский солнечный календарь и традиции эпохи «Авесты».",
      },
      {
        icon: 'waves',
        color: '#319568',
        bg: '#E8F5EE',
        title: "Древняя ирригация и Великий шёлковый путь",
        text: "В античном Хорезме действовали протяжённые магистральные каналы длиной десятки километров. Оазис связывал Среднюю Азию со степями Приаралья, Поволжьем и Восточной Европой караванной торговлей серебром и ремёслами.",
      },
    ],
    sitesTitle: "Древние крепости и археологические памятники",
    sites: [
      { img: '/images/districts/tuproqqala-tumani.jpg', t: "Топрак-Кала", d: "Царский дворец-город I–IV вв. н.э., исследованный экспедицией С. П. Толстова. Найдены древнейшие серебряные монеты и архивы на дереве и коже.", tag: "Царская резиденция" },
      { img: '/images/history/ayaz-kala.jpg', t: "Аяз-Кала", d: "Комплекс из трёх величественных пустынных крепостей IV в. до н.э. – VII в. н.э. на границах Кызылкумов.", tag: "Крепостной узел" },
      { img: '/images/koy-krylgan.jpg', t: "Кой-Крылган-Кала", d: "Цилиндрическое двухэтажное здание диаметром 44 м (IV–III вв. до н.э.), служившее храмом и древней астрономической обсерваторией.", tag: "Обсерватория" },
      { img: '/images/history/jonbos-kala.jpg', t: "Джанбас-Кала", d: "Античная крепость (IV в. до н.э. – I в. н.э.) со стрелковыми галереями и святилищем огня.", tag: "Укрепление" },
      { img: '/images/ancient-fortress.jpg', t: "Кюзели-гыр и Калалы-гыр", d: "Архаические столичные городища VI–IV вв. до н.э. площадью до 63 га с дворцовыми комплексами и кварталами ремесленников.", tag: "Ранняя столица" },
      { img: '/images/districts/hazorasp-tumani.jpg', t: "Хумбузтепа и Хазарасп", d: "Античный ремесленный центр в Хазараспе с древнейшим зороастрийским храмом огня («Азар-сипанд»).", tag: "Храм огня" },
    ],
    source: "Источник: Википедия (Хорезм, Хорезмская область) — материалы экспедиции С. П. Толстова и Я. Гулямова.",
  },
  en: {
    heading: "Ancient Khorezmian Civilization & the Avestan Era",
    lead: "Khorezm is one of Central Asia’s earliest cradles of irrigated agriculture and statehood. First named in the Avesta (Xvairizem — 'land of myriad canals'), Darius I’s Behistun Inscription (Huwarazmiš), and works by Hecataeus and Herodotus (Chorasmia), the oasis fostered an early state confederation of Khorezmians, Massagetae, Saka, and Dahae from the 8th century BCE.",
    kpis: [
      { l: "Early Cultures", v: "4th–1st Mil. BCE" },
      { l: "Early Statehood", v: "8th–6th c. BCE" },
      { l: "Afrighid Rulers", v: "22 Khorezmshahs" },
      { l: "Kath Capital", v: "Founded 305 CE" },
    ],
    phasesTitle: "Archaeological Horizons & Early Dynasties",
    phases: [
      {
        icon: 'layers',
        color: '#15528B',
        bg: '#EBF3FA',
        title: "Kelteminar, Tazabagyab & Amirabad Cultures",
        text: "The Akchadarya delta supported Neolithic Kelteminar fishers and hunters (4th–3rd millennia BCE), Bronze Age Tazabagyab and Suyargan farmers (2nd millennium BCE), and large-scale irrigation engineers of the Amirabad horizon (9th–8th centuries BCE).",
      },
      {
        icon: 'compass',
        color: '#C58B43',
        bg: '#FFF3E0',
        title: "16th Achaemenid Satrapy & Khumbuztepa",
        text: "During the 6th–5th centuries BCE, Khorezm formed the 16th Satrapy of the Achaemenid Empire. Excavations at Khumbuztepa in Hazorasp uncovered ceramic workshops spanning the 7th century BCE to 4th century CE alongside a 5th–4th century BCE Zoroastrian fire temple.",
      },
      {
        icon: 'coins',
        color: '#319568',
        bg: '#E8F5EE',
        title: "Independence & King Pharasmanes (328 BCE)",
        text: "Regaining independence in the early 4th century BCE, Khorezm’s king Pharasmanes rode with 1,500 horsemen to Alexander the Great’s camp in spring 328 BCE to negotiate an alliance.",
      },
      {
        icon: 'museum',
        color: '#7C3AED',
        bg: '#F3EEFF',
        title: "Afrighid Dynasty & Kath (305 CE–10th c.)",
        text: "Al-Biruni recorded 22 Afrighid Khorezmshahs descending from legendary Siyavush. In 305 CE the capital moved from Toprak-Kala to Kath, minting silver drachms showing crowned kings and horsemen until the 8th century.",
      },
      {
        icon: 'scroll',
        color: '#0891B2',
        bg: '#E0F7FA',
        title: "Khwarazmian Script & Astronomical Calendar",
        text: "Developed from Aramaic script by the 4th–3rd centuries BCE, native Khwarazmian writing appears in leather and wood archives from Toprak-Kala and Koy-Krylgan-Kala. Al-Biruni preserved details of the native Khorezmian solar calendar and Avestan customs.",
      },
      {
        icon: 'waves',
        color: '#319568',
        bg: '#E8F5EE',
        title: "Oasis Canals & Northern Silk Road Trade",
        text: "Ancient engineers excavated large arterial canals turning desert deltas into fertile farmland, while caravans linked Khorezm with the Volga steppes, Eastern Europe, and Iran.",
      },
    ],
    sitesTitle: "Key Fortresses & Archaeological Citadels",
    sites: [
      { img: '/images/districts/tuproqqala-tumani.jpg', t: "Toprak-Kala", d: "Monumental 1st–4th century CE royal palace-city excavated by S. P. Tolstov, yielding early silver coinage and administrative archives.", tag: "Royal Citadel" },
      { img: '/images/history/ayaz-kala.jpg', t: "Ayaz-Kala", d: "Trio of dramatic desert hilltop fortresses guarding the Kyzylkum frontier from the 4th century BCE to 7th century CE.", tag: "Hilltop Fortress" },
      { img: '/images/koy-krylgan.jpg', t: "Koy-Krylgan-Kala", d: "44-meter circular two-story citadel (4th–3rd c. BCE) used as a royal mortuary temple and early astronomical observatory.", tag: "Observatory" },
      { img: '/images/history/jonbos-kala.jpg', t: "Janbas-Kala", d: "4th c. BCE–1st c. CE fortress renowned for its towering arrow-slit mud-brick curtain walls and fire sanctuary.", tag: "Fortification" },
      { img: '/images/ancient-fortress.jpg', t: "Kuzaligir & Kalaligir", d: "Archaic Khorezmian capitals of the 6th–4th centuries BCE reaching up to 63 hectares with royal palaces and pottery quarters.", tag: "Archaic Capital" },
      { img: '/images/districts/hazorasp-tumani.jpg', t: "Khumbuztepa & Hazorasp", d: "Ancient oasis fortress and Zoroastrian sanctuary in Hazorasp linking sacred fire traditions with early urban craftwork.", tag: "Fire Temple" },
    ],
    source: "Source: Wikipedia (Khwarazm, Xorazm viloyati) & S. P. Tolstov / Ya. Gulyamov archaeological records.",
  },
};

export default function AncientPage() {
  const { language, t } = useLanguage();
  const h = t.pages.history;
  const content = ancientData[language] || ancientData.uz;
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  return (
    <>
      <Helmet>
        <title>{t.nav.ancientKhorezm}</title>
      </Helmet>
      <PageHero
        title={h.ancientTitle}
        subtitle={h.ancientSubtitle}
        image="/images/ancient-fortress.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.history} > ${h.ancientTitle}`}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {content.kpis.map((k, idx) => (
            <div key={k.l} className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
              <div className="w-9 h-9 rounded-lg bg-[#F7F9FC] flex items-center justify-center mx-auto mb-2">
                <Icon3D name={['layers', 'compass', 'crown', 'museum'][idx] || 'museum'} alt={k.l} size={24} />
              </div>
              <div className="font-bold text-[#15528B] text-base sm:text-lg">{k.v}</div>
              <div className="text-xs text-[#66758A] mt-0.5">{k.l}</div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <h2 className="font-bold text-[#17243B] text-lg mb-3">{content.heading}</h2>
          <p className="text-sm text-[#66758A] leading-relaxed">{content.lead}</p>
        </div>

        <div>
          <h2 className="font-bold text-[#17243B] text-lg mb-3">{content.phasesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.phases.map((p) => (
              <div key={p.title} className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: p.bg }}>
                  <Icon3D name={p.icon} alt={p.title} size={28} />
                </div>
                <h3 className="font-bold text-[#17243B] mb-2">{p.title}</h3>
                <p className="text-sm text-[#66758A] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-[#17243B] text-lg mb-3">{content.sitesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.sites.map((item, idx) => (
              <div key={item.t} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-sm transition-shadow">
                <button
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className="relative group w-full block cursor-pointer overflow-hidden"
                >
                  <img src={item.img} alt={item.t} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={14} />
                  </span>
                </button>
                <div className="p-4">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF3FA] text-[#15528B]">{item.tag}</span>
                  <h3 className="font-bold text-[#17243B] mt-2">{item.t}</h3>
                  <p className="text-xs sm:text-sm text-[#66758A] mt-1 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
          <ImageLightbox
            items={content.sites.map((s) => ({ src: s.img, title: s.t, subtitle: s.tag }))}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(-1)}
            onChange={setLightboxIdx}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5EAF0]">
          <p className="text-xs text-[#66758A]">{content.source}</p>
          <div className="flex gap-3">
            <Link to="/tarix" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#66758A] hover:text-[#15528B]">
              <ArrowLeft size={14} /> {t.nav.history}
            </Link>
            <Link to="/tarix/xorazmshohlar" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] hover:underline">
              {h.shahsTitle} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
