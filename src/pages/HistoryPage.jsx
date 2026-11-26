import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, ExternalLink } from 'lucide-react';
import { getHistoryData } from '../data/history';
import { getPersonalities } from '../data/personalities';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import KhorezmMap from '../components/maps/KhorezmMap';
import Icon3D from '../components/common/Icon3D';

const ERA_PHOTOS = [
  '/images/ancient-fortress.jpg',
  '/images/districts/tuproqqala-tumani.jpg',
  '/images/kunya-ark.jpg',
  '/images/history/kutlug-timur.jpg',
  '/images/history/turabek-khanum.jpg',
  '/images/khiva-hero.jpg',
  '/images/urgench-modern.jpg',
  '/images/kalta-minor.jpg',
];

export default function HistoryPage() {
  const { language, t } = useLanguage();
  const h = t.pages.history;
  const { eras, etymology, viloyatModern, sourceNote } = getHistoryData(language);
  const people = getPersonalities(language).slice(0, 6);

  const sidebarItems = [
    { label: h.introTitle.split('—')[0].trim(), href: '#intro', icon: 'book' },
    { label: h.timelineTitle, href: '#timeline', icon: 'clock' },
    ...eras.slice(0, 6).map((e) => ({ label: e.name, href: e.href, icon: 'museum' })),
  ];

  const statsItems = [
    { icon: 'history', v: '2500+ yil', l: language === 'ru' ? 'Исторический период' : language === 'en' ? 'History Span' : 'Tarixiy rivojlanish davri' },
    { icon: 'calendar', v: '1938-yil 15-yanvar', l: language === 'ru' ? 'Образование области' : language === 'en' ? 'Region Founded' : 'Viloyat tashkil topgan sana' },
    { icon: 'museum', v: '8 ta poytaxt', l: language === 'ru' ? 'Исторические столицы' : language === 'en' ? 'Historic Capitals' : 'Tarixiy poytaxtlar' },
    { icon: 'award', v: '2003-yil', l: language === 'ru' ? 'Орден Дж. Мангуберди' : language === 'en' ? 'Manguberdi Order' : 'J. Manguberdi ordeni' },
  ];

  const khanateHighlight = {
    uz: { title: "Xiva xonligi — Xorazm tarixining oltin davri", text: "Xiva xonligi (1511–1920) — Xorazm tarixidagi eng muhim davrlardan biri. Ichan qal'a, Toshhovli, Nurullaboy saroyi kabi betakror me'moriy obidalar ana shu davrda bunyod etilgan.", btn1: "Batafsil o'qish", btn2: 'Video tomosha qilish' },
    ru: { title: 'Хивинское ханство — золотой век зодчества', text: 'Эпоха Хивинского ханства (1511–1920) подарила миру неповторимый ансамбль Ичан-Калы, дворцы Таш-Хаули и Нуруллабая, а также выдающихся поэтов и историков.', btn1: 'Читать подробнее', btn2: 'Смотреть видео' },
    en: { title: 'Khiva Khanate — Golden Age of Heritage', text: 'From 1511 to 1920, Khiva emerged as an architectural jewel where Ichan-Kala, Toshhovli Palace and Nurullaboy Palace took shape.', btn1: 'Read More', btn2: 'Watch Video' },
  }[language] || { title: 'Xiva xonligi', text: '', btn1: 'Batafsil', btn2: 'Video' };

  const facts = language === 'ru'
    ? ['Упомянут в «Авесте» (VIII–VI вв. до н.э.), существовали государства Кюзели-гыр и Топрак-Кала.', 'Империя Хорезмшахов (1077–1231) при Алауддине Мухаммаде II достигала 4,2 млн км².', '26 апреля 1920 г. основана Хорезмская НСР, а 15 января 1938 г. — Хорезмская область.', 'В 2003 году область награждена орденом Джалаладдина Мангуберди.']
    : language === 'en'
      ? ['Earliest recorded statehood in Central Asia (Avesta, 8th–6th c. BCE; Kuzaligir & Toprak-Kala).', 'The Anushteginid Khorezmshah Empire (1077–1231) spanned up to ~4.2 million km².', 'Proclaimed KPSR on April 26, 1920; Xorazm Region formally established on January 15, 1938.', 'Awarded the Order of Jaloliddin Manguberdi in 2003; Lazgi joined UNESCO in 2019.']
      : ["Miloddan avvalgi VIII asrdan boshlab Avesto, Ko'zaliqir va Tuproqqal'a davlatchiligi shakllangan.", "Anushteginiylar Xorazmshohlar imperiyasi (1077–1231) hududi 4,2 mln km² gacha yetgan.", "1920-yil 26-aprelda Xorazm XSR, 1938-yil 15-yanvarda esa Xorazm viloyati tashkil topgan.", "2003-yilda Xorazm viloyati «Jaloliddin Manguberdi» ordeni bilan taqdirlangan."];

  return (
    <>
      <Helmet>
        <title>{t.nav.history}</title>
      </Helmet>
      <PageHero
        title={h.title}
        subtitle={h.subtitle}
        image="/images/ancient-fortress.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.history}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-3 sticky top-24">
              <nav className="space-y-1">
                {sidebarItems.map((item, idx) =>
                  item.href.startsWith('#') ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${
                        idx === 0 ? 'bg-[#15528B] text-white' : 'text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]'
                      }`}
                    >
                      <Icon3D name={item.icon} size={18} />
                      <span className="truncate">{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]"
                    >
                      <Icon3D name={item.icon} size={18} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  )
                )}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-6">
            {/* Top row */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4" id="intro">
              <div className="xl:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3D name="book" size={20} />
                    <h2 className="font-bold text-[#17243B] text-base">{h.introTitle}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{h.introText}</p>
                  <Link to="/tarix/qadimgi-xorazm" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg">
                    {h.readMore} <ArrowRight size={13} />
                  </Link>
                </div>
                <img src="/images/khiva-hero.jpg" alt={h.title} className="w-full sm:w-52 h-36 object-cover rounded-xl shrink-0" />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="chart" size={20} />
                  <h3 className="font-bold text-[#17243B] text-sm">{t.home.statsTitle}</h3>
                </div>
                {statsItems.map((st) => (
                  <div key={st.l} className="flex items-center justify-between gap-2 py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A] flex items-center gap-2">
                      <Icon3D name={st.icon} size={16} />
                      <span>{st.l}</span>
                    </span>
                    <span className="font-bold text-[#15528B]">{st.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Horizontal Timeline Bar */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5" id="timeline">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#17243B] text-base">{h.timelineTitle}</h2>
                <Link to="/tarix/xorazm-tarixi" className="text-xs font-semibold text-[#15528B] hover:underline">
                  {t.common.seeAll} →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
                {eras.map((era) => (
                  <Link key={era.id} to={era.href} className="group text-center">
                    <div className="flex items-center justify-center mb-2">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white shadow" style={{ backgroundColor: era.color }} />
                    </div>
                    <div className="text-[11px] font-bold text-[#17243B] leading-tight">{era.dates}</div>
                    <div className="text-[11px] text-[#66758A] mt-0.5 line-clamp-2 group-hover:text-[#15528B]">{era.name}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 8 Era Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eras.map((era, idx) => (
                <Link key={era.id} to={era.href} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="relative h-32">
                      <img src={ERA_PHOTOS[idx]} alt={era.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 left-2 bg-white/95 text-[#17243B] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {era.dates}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <h3 className="font-bold text-[#17243B] text-sm">{era.name}</h3>
                      <p className="text-xs text-[#66758A] mt-1 line-clamp-2">{era.desc}</p>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3 flex justify-end">
                    <span className="w-7 h-7 rounded-full bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center text-[#15528B] group-hover:bg-[#15528B] group-hover:text-white transition-colors">
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Personalities + Historical Maps */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-[#17243B] text-base">{h.personalitiesTitle}</h2>
                  <Link to="/shaxslar" className="text-xs font-semibold text-[#15528B] hover:underline">
                    {t.common.seeAll} →
                  </Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {people.map((p) => (
                    <Link key={p.id} to={`/shaxslar/${p.slug}`} className="text-center group">
                      <img src={p.photo} alt={p.name} className="w-full aspect-square rounded-xl object-cover object-top border border-[#E5EAF0] bg-[#FAF6EF] group-hover:border-[#15528B]" />
                      <div className="text-[11px] font-semibold text-[#17243B] mt-1.5 line-clamp-2">{p.name}</div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-[#17243B] text-sm">{t.pages.map.title}</h2>
                  <Link to="/xarita" className="text-xs font-semibold text-[#15528B]">{t.common.seeAll} →</Link>
                </div>
                <KhorezmMap mode="compact" showFullscreen={false} className="h-44 w-full" />
              </div>
            </div>

            {/* Golden Age Featured Banner */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <Link to="/media" className="md:col-span-5 relative rounded-xl overflow-hidden h-44 group">
                <img src="/images/khiva-hero.jpg" alt={khanateHighlight.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play size={18} className="text-[#15528B] ml-0.5" />
                  </div>
                </div>
              </Link>
              <div className="md:col-span-7">
                <h2 className="font-bold text-[#17243B] text-lg mb-2">{khanateHighlight.title}</h2>
                <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{khanateHighlight.text}</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/tarix/xiva-xonligi" className="inline-flex items-center gap-1.5 bg-[#15528B] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#123A61]">
                    {khanateHighlight.btn1} →
                  </Link>
                  <Link to="/media" className="inline-flex items-center gap-1.5 border border-[#E5EAF0] text-[#17243B] px-4 py-2 rounded-xl text-xs font-semibold hover:border-[#15528B]">
                    <Play size={12} /> {khanateHighlight.btn2}
                  </Link>
                </div>
              </div>
            </div>

            {/* Etymology & Capitals + Modern Xorazm Viloyati */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-6 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h2 className="font-bold text-[#17243B] text-base mb-2">{etymology.title}</h2>
                <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{etymology.text}</p>
                <div className="text-xs font-semibold text-[#17243B] mb-2">{etymology.capitalsTitle}:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {etymology.capitals.map((c) => (
                    <div key={c.name} className="rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] px-2.5 py-2">
                      <div className="text-xs font-bold text-[#15528B] truncate">{c.name}</div>
                      <div className="text-[10px] text-[#66758A] mt-0.5">{c.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-[#17243B] text-base mb-2">{viloyatModern.title}</h2>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{viloyatModern.summary}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#F7F9FC]">
                  <span className="text-[11px] text-[#66758A]">{sourceNote}</span>
                  <Link to="/tarix/xorazm-tarixi" className="text-xs font-semibold text-[#15528B] hover:underline shrink-0 ml-2">
                    {t.common.readMore} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/tarix/qadimgi-xorazm" className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex items-center gap-4 hover:shadow-sm">
                <img src="/images/khorezm-crafts.jpg" alt="Archaeology" className="w-24 h-24 rounded-xl object-cover shrink-0" />
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm">{h.ancientTitle}</h3>
                  <p className="text-xs text-[#66758A] mt-1 line-clamp-3">{h.ancientSubtitle}</p>
                </div>
              </Link>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h3 className="font-bold text-[#17243B] text-sm mb-3">{t.pages.geography.factsTitle}</h3>
                <ul className="space-y-2">
                  {facts.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-[#66758A]">
                      <CheckCircle size={13} className="text-[#319568] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h3 className="font-bold text-[#17243B] text-sm mb-3">{h.subpagesTitle}</h3>
                <div className="space-y-2">
                  {[
                    { l: h.ancientTitle, to: '/tarix/qadimgi-xorazm' },
                    { l: h.shahsTitle, to: '/tarix/xorazmshohlar' },
                    { l: h.khanateTitle, to: '/tarix/xiva-xonligi' },
                    { l: h.archiveTitle, to: '/tarix/xorazm-tarixi' },
                  ].map((s) => (
                    <Link key={s.to} to={s.to} className="flex items-center justify-between text-xs text-[#66758A] hover:text-[#15528B] py-1 border-b border-[#F7F9FC] last:border-0">
                      <span>✓ {s.l}</span>
                      <ExternalLink size={12} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
