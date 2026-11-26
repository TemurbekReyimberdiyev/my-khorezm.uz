import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';

const cultureData = {
  uz: {
    stats: [
      { v: '10+', l: 'Nomoddiy madaniy meros' },
      { v: '30+', l: "Hunarmandchilik yo'nalishi" },
      { v: '15+', l: 'Yillik madaniy tadbirlar' },
      { v: '20+', l: "Madaniyat va san'at maskanlari" },
    ],
    categories: [
      { id: 1, title: 'Xorazm Lazgisi', desc: "2019-yil 12-dekabrda UNESCO merosi ro'yxatiga kiritilgan mashhur raqs.", img: '/images/lazgi-dance.jpg' },
      { id: 2, title: 'Xorazm maqomlari', desc: "Asrlar davomida shakllangan noyob mumtoz musiqa maktabi.", img: '/images/juma-mosque.jpg' },
      { id: 3, title: 'Hunarmandchilik', desc: "Kulolchilik, gilamdo'zlik, zargarlik va misgarlik san'ati.", img: '/images/khorezm-crafts.jpg' },
      { id: 4, title: 'Kashtachilik', desc: "An'anaviy naqshlar bilan bezatilgan nozik qo'l ishlari.", img: '/images/suzani-embroidery.jpg' },
      { id: 5, title: 'Milliy liboslar', desc: "Chugurma, taqya va rang-barang choponlar an'anasi.", img: '/images/lazgi-dance.jpg' },
      { id: 6, title: 'Urf-odatlar', desc: "To'y, Navro'z va mehmondo'stlik marosimlari.", img: '/images/khiva-gate.jpg' },
      { id: 7, title: "Yog'och o'ymakorligi", desc: "Xiva ustunlari va eshiklaridagi nafis o'ymakorlik san'ati.", img: '/images/woodcarving.jpg' },
      { id: 8, title: 'Kulolchilik', desc: "Xonqa (Madir) va Xivaning ko'k-yashil sirli sopol buyumlari.", img: '/images/khorezm-crafts.jpg' },
    ],
    weddingStages: [
      { title: "Qiz ko'rish", desc: "Kuyov tomonining kelin xonadoniga sovchilik tashrifi." },
      { title: "Fotiha to'yi", desc: "Ikki oilaning rozilik va duo marosimi." },
      { title: "Asosiy to'y", desc: "Musiqa, Lazgi raqsi, milliy taomlar va xalq sayli." },
      { title: "Kelin salom", desc: "Kelinning yangi oilaga hurmat va tilak bilan salom berishi." },
    ],
    heritageList: [
      "Lazgi — 2019-yil 12-dekabrda UNESCO nomoddiy merosi ro'yxatiga kiritilgan.",
      "Xorazm maqom san'ati — Shashmaqom bilan yonma-yon turgan mumtoz musiqa maktabi.",
      "Xalq hunarmandchiligi — Xiva va Madir kulolchilik hamda yog'och o'ymakorligi.",
      "To'y marosimlari — milliy qadriyatlar va mehmondo'stlik majmui.",
      "Navro'z va Qovun sayli an'analari — Xorazm vohasining yillik tantanalari.",
    ],
    festivals: [
      { title: 'Xalqaro «Lazgi» festivali', date: 'Aprel–May, 2026', img: '/images/lazgi-dance.jpg' },
      { title: 'Ichan-Qal’a hunarmandchilik bayrami', date: 'Sentabr, har yili', img: '/images/khorezm-crafts.jpg' },
      { title: '«Qovun sayli» va taomlar festivali', date: 'Avgust (8–10 avgust)', img: '/images/khorezm-cuisine.jpg' },
    ],
  },
  ru: {
    stats: [
      { v: '10+', l: 'Объекты нематериального наследия' },
      { v: '30+', l: 'Направлений ремёсел' },
      { v: '15+', l: 'Ежегодных фестивалей' },
      { v: '20+', l: 'Культурных учреждений' },
    ],
    categories: [
      { id: 1, title: 'Хорезмский Лазги', desc: 'Танец, включённый 12 декабря 2019 года в список ЮНЕСКО.', img: '/images/lazgi-dance.jpg' },
      { id: 2, title: 'Хорезмские макомы', desc: 'Самобытная классическая музыкальная традиция оазиса.', img: '/images/juma-mosque.jpg' },
      { id: 3, title: 'Ремёсла', desc: 'Гончарное дело, ковроткачество, чеканка и ювелирное искусство.', img: '/images/khorezm-crafts.jpg' },
      { id: 4, title: 'Вышивка', desc: 'Тонкие ручные узоры и традиционные орнаменты.', img: '/images/suzani-embroidery.jpg' },
      { id: 5, title: 'Национальный костюм', desc: 'Традиционные меховые шапки чугурма и халаты.', img: '/images/lazgi-dance.jpg' },
      { id: 6, title: 'Обычаи и обряды', desc: 'Свадьбы, Навруз и традиции восточного гостеприимства.', img: '/images/khiva-gate.jpg' },
      { id: 7, title: 'Резьба по дереву', desc: 'Изысканная хивинская резьба на колоннах и дверях.', img: '/images/woodcarving.jpg' },
      { id: 8, title: 'Керамика', desc: 'Бирюзовая и синяя глазурованная хорезмская посуда (Мадир).', img: '/images/khorezm-crafts.jpg' },
    ],
    weddingStages: [
      { title: 'Сватовство (Киз куриш)', desc: 'Визит представителей жениха и знакомство семей.' },
      { title: 'Фотиха (Помолвка)', desc: 'Благословение и договорённость двух семей.' },
      { title: 'Свадебный пир', desc: 'Музыка, танцы Лазги, плов и народные гулянья.' },
      { title: 'Келин салом', desc: 'Традиционное приветствие невесты в новом доме.' },
    ],
    heritageList: [
      'Лазги — объект нематериального наследия ЮНЕСКО (с 12 декабря 2019 года).',
      'Искусство хорезмского макома — древняя классическая музыкальная школа.',
      'Народные промыслы — хивинская резьба и гончарная школа Мадира.',
      'Свадебные обряды — хранилище семейных ценностей.',
      'Навруз и фестиваль дынь «Ковун сайли» — главные ежегодные торжества.',
    ],
    festivals: [
      { title: 'Международный фестиваль «Лазги»', date: 'Апрель–Май, 2026', img: '/images/lazgi-dance.jpg' },
      { title: 'Фестиваль ремёсел в Ичан-Кале', date: 'Сентябрь, ежегодно', img: '/images/khorezm-crafts.jpg' },
      { title: 'Фестиваль дынь «Ковун сайли»', date: 'Август (8–10 августа)', img: '/images/khorezm-cuisine.jpg' },
    ],
  },
  en: {
    stats: [
      { v: '10+', l: 'Intangible Heritage Elements' },
      { v: '30+', l: 'Traditional Craft Disciplines' },
      { v: '15+', l: 'Annual Cultural Events' },
      { v: '20+', l: 'Cultural & Arts Venues' },
    ],
    categories: [
      { id: 1, title: 'Khorezm Lazgi', desc: 'Inscribed by UNESCO on December 12, 2019 for its vibrant vitality.', img: '/images/lazgi-dance.jpg' },
      { id: 2, title: 'Khorezm Maqom', desc: 'Centuries-old classical vocal and instrumental musical school.', img: '/images/juma-mosque.jpg' },
      { id: 3, title: 'Artisan Crafts', desc: 'Pottery, carpet weaving, coppersmithing and jewelry making.', img: '/images/khorezm-crafts.jpg' },
      { id: 4, title: 'Embroidery', desc: 'Vibrant hand-stitched motifs and textile ornamentation.', img: '/images/suzani-embroidery.jpg' },
      { id: 5, title: 'Traditional Attire', desc: 'Iconic sheepskin chugurma hats, skullcaps and silk robes.', img: '/images/lazgi-dance.jpg' },
      { id: 6, title: 'Customs & Rituals', desc: 'Weddings, Navruz festivities and oasis hospitality.', img: '/images/khiva-gate.jpg' },
      { id: 7, title: 'Woodcarving', desc: 'Masterful floral carvings gracing Khiva’s doors and pillars.', img: '/images/woodcarving.jpg' },
      { id: 8, title: 'Ceramics', desc: 'Lustrous turquoise and cobalt glazed pottery from Madir & Khiva.', img: '/images/khorezm-crafts.jpg' },
    ],
    weddingStages: [
      { title: 'Matchmaking Visit', desc: 'Initial delegation and formal introduction between families.' },
      { title: 'Fotiha Engagement', desc: 'Blessing ceremony sealing the marriage agreement.' },
      { title: 'Wedding Celebration', desc: 'Festive feast featuring live music, Lazgi dancing and pilaf.' },
      { title: 'Kelin Salom', desc: 'Graceful welcoming greeting of the bride to her new household.' },
    ],
    heritageList: [
      'Lazgi Dance — inscribed on the UNESCO Intangible Heritage list on Dec 12, 2019.',
      'Khorezm Maqom — classical musical tradition alongside Shashmaqom.',
      'Traditional crafts — living woodcarving and Madir glazed ceramic studios.',
      'Wedding customs — preserving communal hospitality values.',
      'Navruz & Qovun Sayli celebrations — signature oasis festivals.',
    ],
    festivals: [
      { title: 'International Lazgi Festival', date: 'April–May, 2026', img: '/images/lazgi-dance.jpg' },
      { title: 'Ichan-Kala Crafts Festival', date: 'September, Annual', img: '/images/khorezm-crafts.jpg' },
      { title: 'Qovun Sayli & Cuisine Festival', date: 'August (Aug 8–10)', img: '/images/khorezm-cuisine.jpg' },
    ],
  },
};

export default function CulturePage() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const cText = t.pages.culture;
  const data = cultureData[language] || cultureData.uz;
  const [openWedding, setOpenWedding] = useState(0);

  useEffect(() => {
    if (location.hash === '#lazgi') {
      const el = document.getElementById('lazgi');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  const subSections = [
    { key: 'lazgi', label: t.nav.lazgi, desc: cText.subCards.lazgi, href: '#lazgi', isAnchor: true, icon3d: 'music', img: '/images/lazgi-dance.jpg', bg: '#FDE8F3' },
    { key: 'dictionary', label: t.nav.dictionary, desc: cText.subCards.dictionary, href: '/lugat', icon3d: 'book', img: '/images/ogahiy-museum.jpg', bg: '#EBF3FA' },
    { key: 'personalities', label: t.nav.personalities, desc: cText.subCards.personalities, href: '/shaxslar', icon3d: 'users', img: '/images/portrait-xorazmiy.jpg', bg: '#F3EEFF' },
    { key: 'cuisine', label: t.nav.cuisine, desc: cText.subCards.cuisine, href: '/taomlar', icon3d: 'cuisine', img: '/images/shivit-oshi.jpg', bg: '#FFF1E6' },
    { key: 'education', label: t.nav.education, desc: cText.subCards.education, href: '/ilm-fan', icon3d: 'graduation', img: '/images/university-urdu.jpg', bg: '#E8F5EE' },
    { key: 'ai', label: t.nav.aiAssistant, desc: cText.subCards.ai, href: '/ai-yordamchi', icon3d: 'bot', img: '/images/kalta-minor.jpg', bg: '#FFF3E0' },
  ];

  return (
    <>
      <Helmet>
        <title>{t.nav.culture}</title>
      </Helmet>
      <PageHero
        title={cText.title}
        subtitle={cText.subtitle}
        image="/images/lazgi-dance.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.culture}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-3 sticky top-24 space-y-1">
              <a href="#directions" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#15528B] text-white text-xs font-medium">
                <Icon3D name="award" size={16} />
                <span className="truncate">{cText.directionsTitle}</span>
              </a>
              <a href="#lazgi" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]">
                <Icon3D name="music" size={16} />
                <span className="truncate">{t.nav.lazgi}</span>
              </a>
              <Link to="/lugat" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]">
                <Icon3D name="book" size={16} />
                <span className="truncate">{t.nav.dictionary}</span>
              </Link>
              <Link to="/shaxslar" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]">
                <Icon3D name="users" size={16} />
                <span className="truncate">{t.nav.personalities}</span>
              </Link>
              <Link to="/taomlar" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]">
                <Icon3D name="cuisine" size={16} />
                <span className="truncate">{t.nav.cuisine}</span>
              </Link>
              <Link to="/ilm-fan" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]">
                <Icon3D name="graduation" size={16} />
                <span className="truncate">{t.nav.education}</span>
              </Link>
              <Link to="/ai-yordamchi" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]">
                <Icon3D name="bot" size={16} />
                <span className="truncate">{t.nav.aiAssistant}</span>
              </Link>
              <div className="pt-1 mt-1 border-t border-[#E5EAF0]">
                <a href="#wedding" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]">
                  <Icon3D name="calendar" size={16} />
                  <span className="truncate">{cText.weddingTitle}</span>
                </a>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-6">
            {/* Mobile quick links */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-1">
              {subSections.map((s) =>
                s.isAnchor ? (
                  <a
                    key={s.key}
                    href={s.href}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E5EAF0] text-[#17243B] shrink-0"
                  >
                    <Icon3D name={s.icon3d} size={16} />
                    <span>{s.label}</span>
                  </a>
                ) : (
                  <Link
                    key={s.key}
                    to={s.href}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-[#E5EAF0] text-[#17243B] shrink-0"
                  >
                    <Icon3D name={s.icon3d} size={16} />
                    <span>{s.label}</span>
                  </Link>
                )
              )}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="xl:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3D name="music" size={20} />
                    <h2 className="font-bold text-[#17243B] text-base">{cText.title}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-3">{cText.subtitle}</p>
                  <Link to="/lugat" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg hover:bg-[#EBF3FA]">
                    {cText.goToDict} →
                  </Link>
                </div>
                <img src="/images/kalta-minor.jpg" alt={cText.title} className="w-full sm:w-44 h-32 object-cover rounded-xl shrink-0" />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="chart" size={18} />
                  <h3 className="font-bold text-[#17243B] text-sm">{t.home.statsTitle}</h3>
                </div>
                {data.stats.map((s) => (
                  <div key={s.l} className="flex justify-between py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A]">{s.l}</span>
                    <span className="font-bold text-[#15528B]">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsections Hub */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5" id="subsections">
              <div className="mb-4">
                <h2 className="font-bold text-[#17243B] text-base sm:text-lg">{cText.subSectionsTitle}</h2>
                <p className="text-xs sm:text-sm text-[#66758A] mt-0.5">{cText.subSectionsDesc}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {subSections.map((s) => {
                  const cardBody = (
                    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] hover:bg-white hover:border-[#15528B]/40 hover:shadow-sm transition-all group h-full">
                      <img src={s.img} alt={s.label} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: s.bg }}>
                            <Icon3D name={s.icon3d} size={16} />
                          </span>
                          <h3 className="font-bold text-[#17243B] text-sm truncate group-hover:text-[#15528B] transition-colors">
                            {s.label}
                          </h3>
                        </div>
                        <p className="text-[11px] text-[#66758A] line-clamp-2 leading-snug">{s.desc}</p>
                      </div>
                      <ArrowRight size={14} className="text-[#66758A] group-hover:text-[#15528B] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  );

                  return s.isAnchor ? (
                    <a key={s.key} href={s.href} className="block">{cardBody}</a>
                  ) : (
                    <Link key={s.key} to={s.href} className="block">{cardBody}</Link>
                  );
                })}
              </div>
            </div>

            <div id="directions">
              <h2 className="font-bold text-[#17243B] text-base sm:text-lg mb-4">{cText.directionsTitle}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.categories.map((c) => (
                  <div key={c.id} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
                    <img src={c.img} alt={c.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-3.5">
                      <h3 className="font-bold text-[#17243B] text-sm">{c.title}</h3>
                      <p className="text-xs text-[#66758A] leading-snug mt-1 line-clamp-2">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="lazgi">
              <Link to="/media" className="relative rounded-2xl overflow-hidden border border-[#E5EAF0] h-56 group">
                <img src="/images/lazgi-dance.jpg" alt="Lazgi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-white">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center mb-2">
                    <Play size={18} className="text-[#15528B] ml-0.5" />
                  </div>
                  <span className="text-sm font-bold px-4 text-center">{cText.lazgiTitle}</span>
                </div>
              </Link>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EBF3FA] flex items-center justify-center shrink-0">
                  <Icon3D name="book" size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-[#17243B] mb-2">{cText.dictTeaserTitle}</h2>
                  <p className="text-sm text-[#66758A] mb-4">{cText.dictTeaserDesc}</p>
                  <Link to="/lugat" className="inline-flex items-center gap-2 bg-[#15528B] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#123A61]">
                    {cText.goToDict} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="award" size={20} />
                  <h2 className="font-bold text-[#17243B] text-base">{cText.heritageTitle}</h2>
                </div>
                <ul className="space-y-2">
                  {data.heritageList.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#66758A] flex items-start gap-2">
                      <span className="text-[#319568] font-bold shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="star" size={20} />
                  <h2 className="font-bold text-[#17243B] text-base">{t.pages.tourism.eventsTitle}</h2>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {data.festivals.map((f) => (
                    <div key={f.title} className="border border-[#E5EAF0] rounded-xl overflow-hidden">
                      <img src={f.img} alt={f.title} className="w-full h-20 object-cover" />
                      <div className="p-2">
                        <div className="text-[11px] font-bold text-[#17243B] line-clamp-2">{f.title}</div>
                        <div className="text-[10px] text-[#66758A] mt-0.5">{f.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5" id="wedding">
              <div className="flex items-center gap-2 mb-4">
                <Icon3D name="calendar" size={20} />
                <h2 className="font-bold text-[#17243B] text-base">{cText.weddingTitle}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {data.weddingStages.map((s, i) => (
                  <div key={i} className="border border-[#E5EAF0] rounded-xl">
                    <button
                      onClick={() => setOpenWedding(openWedding === i ? null : i)}
                      className="w-full flex items-center justify-between p-3.5 text-left cursor-pointer"
                    >
                      <span className="font-medium text-[#17243B] text-sm">
                        {i + 1}. {s.title}
                      </span>
                      {openWedding === i ? <ChevronUp size={16} className="text-[#15528B]" /> : <ChevronDown size={16} className="text-[#C8D3E0]" />}
                    </button>
                    {openWedding === i && <p className="text-xs sm:text-sm text-[#66758A] px-3.5 pb-3.5">{s.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
