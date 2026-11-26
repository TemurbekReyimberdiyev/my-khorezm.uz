import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { getAttractions } from '../data/attractions';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';

const itinerariesByLang = {
  uz: [
    { days: '1 kunlik', photo: '/images/amudarya-oasis.jpg', title: "Ichan-Qal'a va Arda Xiva", objects: "6 ta ob'ekt", time: '~8 soat' },
    { days: '2 kunlik', photo: '/images/ancient-fortress.jpg', title: 'Xiva va qadimiy qal’alar', objects: "9 ta ob'ekt", time: '2 kun' },
    { days: '3 kunlik', photo: '/images/kyzylkum-desert.jpg', title: 'Tarix, Qizilqum va Amudaryo', objects: "12+ ob'ekt", time: '3 kun' },
  ],
  ru: [
    { days: '1 день', photo: '/images/amudarya-oasis.jpg', title: 'Ичан-Кала и Арда Хива', objects: '6 объектов', time: '~8 часов' },
    { days: '2 дня', photo: '/images/ancient-fortress.jpg', title: 'Хива и древние крепости', objects: '9 объектов', time: '2 дня' },
    { days: '3 дня', photo: '/images/kyzylkum-desert.jpg', title: 'История, Кызылкум и Амударья', objects: '12+ объектов', time: '3 дня' },
  ],
  en: [
    { days: '1-Day', photo: '/images/amudarya-oasis.jpg', title: 'Ichan-Kala & Arda Khiva', objects: '6 sites', time: '~8 hours' },
    { days: '2-Day', photo: '/images/ancient-fortress.jpg', title: 'Khiva & Desert Fortresses', objects: '9 sites', time: '2 days' },
    { days: '3-Day', photo: '/images/kyzylkum-desert.jpg', title: 'Heritage, Desert & Amu Darya', objects: '12+ sites', time: '3 days' },
  ],
};

const eventsByLang = {
  uz: [
    { title: 'Xalqaro «Lazgi» raqs festivali', date: 'Aprel–May, 2026 (har 2 yilda)', photo: '/images/lazgi-dance.jpg' },
    { title: '«Qovun sayli» gastronomik festivali', date: 'Avgust (8–10-avgust)', photo: '/images/khorezm-cuisine.jpg' },
    { title: "«Ichan-Qal'a» hunarmandchilik festivali", date: 'Sentabr, har yili', photo: '/images/khorezm-crafts.jpg' },
  ],
  ru: [
    { title: 'Международный фестиваль «Лазги»', date: 'Апрель–Май, 2026 (раз в 2 года)', photo: '/images/lazgi-dance.jpg' },
    { title: 'Фестиваль дынь «Ковун сайли»', date: 'Август (8–10 августа)', photo: '/images/khorezm-cuisine.jpg' },
    { title: 'Фестиваль ремёсел в Ичан-Кале', date: 'Сентябрь, ежегодно', photo: '/images/khorezm-crafts.jpg' },
  ],
  en: [
    { title: 'International Lazgi Dance Festival', date: 'April–May, 2026 (Biennial)', photo: '/images/lazgi-dance.jpg' },
    { title: 'Qovun Sayli Melon & Food Festival', date: 'August (Aug 8–10)', photo: '/images/khorezm-cuisine.jpg' },
    { title: 'Ichan-Kala Artisans Festival', date: 'September, Annual', photo: '/images/khorezm-crafts.jpg' },
  ],
};

const tipsByLang = {
  uz: {
    title: 'Sayohatchilar uchun amaliy ma’lumot',
    items: [
      'Urganch aeroporti (UGC) va Xiva temir yo‘l vokzali',
      'Urganch–Xiva trolleybusi va zamonaviy avtobuslar',
      'Ichan-Qal’a va Dishan-Qal’adagi 150+ mehmonxonalar',
      'Eng qulay mavsum: mart–iyun va sentabr–noyabr',
    ],
  },
  ru: {
    title: 'Полезно путешественнику',
    items: [
      'Международный аэропорт Ургенч (UGC) и вокзал Хивы',
      'Троллейбусная линия Ургенч–Хива (30 км)',
      'Свыше 150 отелей и гостевых домов в Хиве и Ургенче',
      'Лучший сезон: март–июнь и сентябрь–ноябрь',
    ],
  },
  en: {
    title: 'Practical Traveler Essentials',
    items: [
      'Urgench Int’l Airport (UGC) & direct Khiva rail station',
      'Electric trolleybus & frequent shuttle along Urgench–Khiva',
      '150+ hotels, boutique madrasas & guesthouses',
      'Best seasons: March–June and September–November',
    ],
  },
};

export default function TourismPage() {
  const { language, t } = useLanguage();
  const tur = t.pages.tourism;
  const attractions = getAttractions(language);
  const [catKey, setCatKey] = useState('all');

  const categories = [
    { k: 'all', l: tur.cats.all },
    { k: 'historical', l: tur.cats.historical },
    { k: 'palace', l: tur.cats.palace },
    { k: 'religious', l: tur.cats.religious },
    { k: 'archaeological', l: tur.cats.archaeological },
  ];

  const sidebarItems = [
    { label: tur.aboutTitle, href: '#about', icon: 'compass' },
    { label: tur.popularTitle, href: '#attractions', icon: 'museum' },
    { label: tur.itinerariesTitle, href: '#routes', icon: 'map' },
    { label: tur.eventsTitle, href: '#events', icon: 'star' },
  ];

  const filtered = catKey === 'all' ? attractions : attractions.filter((a) => a.categoryKey === catKey);
  const itineraries = itinerariesByLang[language] || itinerariesByLang.uz;
  const events = eventsByLang[language] || eventsByLang.uz;
  const tips = tipsByLang[language] || tipsByLang.uz;

  return (
    <>
      <Helmet>
        <title>{t.nav.tourism}</title>
      </Helmet>
      <PageHero
        title={tur.title}
        subtitle={tur.subtitle}
        image="/images/khiva-hero.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.tourism}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-3 sticky top-24">
              <nav className="space-y-1">
                {sidebarItems.map((item, idx) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      idx === 0 ? 'bg-[#15528B] text-white' : 'text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]'
                    }`}
                  >
                    <Icon3D name={item.icon} size={18} />
                    <span className="truncate">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-6">
            {/* Top Row: Why Khorezm + Tourism Numbers */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4" id="about">
              <div className="xl:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3D name="compass" size={20} />
                    <h2 className="font-bold text-[#17243B] text-base">{tur.title}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{tur.subtitle}</p>
                  <Link
                    to="/turizm/ichan-qala"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg hover:bg-[#EBF3FA]"
                  >
                    {t.common.readMore} →
                  </Link>
                </div>
                <img src="/images/khiva-gate.jpg" alt="Khiva" className="w-full sm:w-52 h-36 object-cover rounded-xl shrink-0" />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="chart" size={18} />
                  <h3 className="font-bold text-[#17243B] text-sm">{t.home.statsTitle}</h3>
                </div>
                {tur.stats.map((i) => (
                  <div key={i.l} className="flex justify-between py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A]">{i.l}</span>
                    <span className="font-bold text-[#15528B]">{i.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attractions */}
            <div id="attractions">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Icon3D name="museum" size={20} />
                  <h2 className="font-bold text-[#17243B] text-base sm:text-lg">{tur.popularTitle}</h2>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {categories.map((c) => (
                    <button
                      key={c.k}
                      onClick={() => setCatKey(c.k)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer transition-colors ${
                        catKey === c.k ? 'bg-[#15528B] text-white' : 'bg-white border border-[#E5EAF0] text-[#66758A] hover:border-[#15528B]'
                      }`}
                    >
                      {c.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filtered.map((a) => (
                  <Link
                    key={a.id}
                    to={`/turizm/${a.slug}`}
                    className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-36">
                        <img src={a.photo} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        {a.isUnesco && (
                          <span className="absolute top-2 right-2 bg-[#15528B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            UNESCO
                          </span>
                        )}
                      </div>
                      <div className="p-3.5">
                        <h3 className="font-bold text-[#17243B] text-sm">{a.name}</h3>
                        <p className="text-[11px] text-[#66758A] flex items-center gap-1 mt-1">
                          <Icon3D name="map-pin" size={13} /> {a.location}
                        </p>
                        <p className="text-xs text-[#66758A] leading-snug mt-2 line-clamp-2">{a.description}</p>
                      </div>
                    </div>
                    <div className="px-3.5 pb-3 flex justify-end">
                      <span className="w-7 h-7 rounded-full bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center text-[#15528B] group-hover:bg-[#15528B] group-hover:text-white transition-colors">
                        <ChevronRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Itineraries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch" id="routes">
              <div className="lg:col-span-3 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3D name="map" size={19} />
                    <h2 className="font-bold text-[#17243B] text-base">{tur.itinerariesTitle}</h2>
                  </div>
                  <p className="text-xs text-[#66758A] leading-relaxed">{tur.itinerariesSubtitle}</p>
                </div>
                <Link to="/xarita" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg w-fit">
                  {t.home.mapOpen} →
                </Link>
              </div>
              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {itineraries.map((it) => (
                  <div key={it.days} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden">
                    <div className="relative h-28">
                      <img src={it.photo} alt={it.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-white/95 text-[#15528B] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {it.days}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <h3 className="font-bold text-[#17243B] text-sm mb-1.5">{it.title}</h3>
                      <div className="flex gap-3 text-[11px] text-[#66758A]">
                        <span className="inline-flex items-center gap-1"><Icon3D name="map-pin" size={14} /> {it.objects}</span>
                        <span className="inline-flex items-center gap-1"><Icon3D name="clock" size={14} /> {it.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch" id="events">
              <div className="lg:col-span-3 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3D name="star" size={19} />
                    <h2 className="font-bold text-[#17243B] text-base">{tur.eventsTitle}</h2>
                  </div>
                  <p className="text-xs text-[#66758A] leading-relaxed">{tur.subtitle}</p>
                </div>
                <Link to="/yangiliklar" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg w-fit">
                  {t.common.seeAll} →
                </Link>
              </div>
              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {events.map((e) => (
                  <div key={e.title} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden">
                    <img src={e.photo} alt={e.title} className="w-full h-28 object-cover" />
                    <div className="p-3.5">
                      <h3 className="font-bold text-[#17243B] text-sm">{e.title}</h3>
                      <p className="text-xs text-[#66758A] mt-1 flex items-center gap-1.5">
                        <Icon3D name="calendar" size={14} /> {e.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Blue Traveler Banner */}
            <div className="relative overflow-hidden rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(90deg, #123A61 0%, #15528B 60%, #2C6BA8 100%)' }}>
              <h2 className="font-bold text-lg mb-3">{tips.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {tips.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-white/90">
                    <CheckCircle size={14} className="text-[#4ADE80] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/xarita" className="inline-flex items-center gap-1.5 bg-white text-[#15528B] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#F7F9FC]">
                {t.home.mapOpen} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
