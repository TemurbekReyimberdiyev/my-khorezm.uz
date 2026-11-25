import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ChevronRight, Compass, Landmark, Route, CheckCircle, Star } from 'lucide-react';
import { getAttractions } from '../data/attractions';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';

const itinerariesByLang = {
  uz: [
    { days: '1 kunlik', photo: '/images/amudarya-oasis.jpg', title: "Xiva bo'ylab sayohat", objects: "5 ta ob'ekt", time: '~8 soat' },
    { days: '2 kunlik', photo: '/images/ancient-fortress.jpg', title: 'Xorazmning tarixiy merosi', objects: "8 ta ob'ekt", time: '2 kun' },
    { days: '3 kunlik', photo: '/images/kyzylkum-desert.jpg', title: 'Tarix, tabiat va madaniyat', objects: "12 ta ob'ekt", time: '3 kun' },
  ],
  ru: [
    { days: '1 день', photo: '/images/amudarya-oasis.jpg', title: 'Прогулка по Хиве', objects: '5 объектов', time: '~8 часов' },
    { days: '2 дня', photo: '/images/ancient-fortress.jpg', title: 'Историческое наследие Хорезма', objects: '8 объектов', time: '2 дня' },
    { days: '3 дня', photo: '/images/kyzylkum-desert.jpg', title: 'История, природа и культура', objects: '12 объектов', time: '3 дня' },
  ],
  en: [
    { days: '1-Day', photo: '/images/amudarya-oasis.jpg', title: 'Highlights of Khiva', objects: '5 sites', time: '~8 hours' },
    { days: '2-Day', photo: '/images/ancient-fortress.jpg', title: 'Historic Treasures of Khorezm', objects: '8 sites', time: '2 days' },
    { days: '3-Day', photo: '/images/kyzylkum-desert.jpg', title: 'History, Desert & Culture', objects: '12 sites', time: '3 days' },
  ],
};

const eventsByLang = {
  uz: [
    { title: 'Xorazm Lazgi festivali', date: 'May, 2025', photo: '/images/lazgi-dance.jpg' },
    { title: "Ichan-Qal'a hunarmandchilik festivali", date: 'Sentabr, 2025', photo: '/images/khorezm-crafts.jpg' },
    { title: 'Xorazm taomlari festivali', date: 'Oktabr, 2025', photo: '/images/khorezm-cuisine.jpg' },
  ],
  ru: [
    { title: 'Фестиваль «Лазги»', date: 'Май, 2025', photo: '/images/lazgi-dance.jpg' },
    { title: 'Фестиваль ремёсел в Ичан-Кале', date: 'Сентябрь, 2025', photo: '/images/khorezm-crafts.jpg' },
    { title: 'Фестиваль хорезмской кухни', date: 'Октябрь, 2025', photo: '/images/khorezm-cuisine.jpg' },
  ],
  en: [
    { title: 'Khorezm Lazgi Festival', date: 'May, 2025', photo: '/images/lazgi-dance.jpg' },
    { title: 'Ichan-Kala Crafts Festival', date: 'September, 2025', photo: '/images/khorezm-crafts.jpg' },
    { title: 'Khorezm Culinary Festival', date: 'October, 2025', photo: '/images/khorezm-cuisine.jpg' },
  ],
};

const tipsByLang = {
  uz: { title: 'Sayohatchilar uchun ma’lumot', items: ['Qanday borish mumkin?', 'Qayerda yashash?', 'Nima ko‘rish kerak?', 'Foydali maslahatlar'] },
  ru: { title: 'Памятка путешественнику', items: ['Как добраться?', 'Где остановиться?', 'Что посмотреть?', 'Полезные советы'] },
  en: { title: 'Traveler Essentials', items: ['How to get here?', 'Where to stay?', 'Top sights to see', 'Practical travel tips'] },
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
    { label: tur.aboutTitle, href: '#about', icon: Compass },
    { label: tur.popularTitle, href: '#attractions', icon: Landmark },
    { label: tur.itinerariesTitle, href: '#routes', icon: Route },
    { label: tur.eventsTitle, href: '#events', icon: Star },
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
                    <item.icon size={14} className="shrink-0" />
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
                  <h2 className="font-bold text-[#17243B] text-base mb-2">{tur.title}</h2>
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
                <h3 className="font-bold text-[#17243B] text-sm mb-3">{t.home.statsTitle}</h3>
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
                <h2 className="font-bold text-[#17243B] text-base sm:text-lg">{tur.popularTitle}</h2>
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
                          <MapPin size={10} /> {a.location}
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
                  <h2 className="font-bold text-[#17243B] text-base mb-2">{tur.itinerariesTitle}</h2>
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
                        <span>📍 {it.objects}</span>
                        <span>⏱ {it.time}</span>
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
                  <h2 className="font-bold text-[#17243B] text-base mb-2">{tur.eventsTitle}</h2>
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
                      <p className="text-xs text-[#66758A] mt-1 flex items-center gap-1">
                        <Clock size={11} /> {e.date}
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
                  <div key={item} className="flex items-center gap-2 text-xs text-white/90">
                    <CheckCircle size={14} className="text-[#4ADE80] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/xarita" className="inline-flex items-center gap-1.5 bg-white text-[#15528B] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#F7F9FC]">
                {t.common.readMore} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
