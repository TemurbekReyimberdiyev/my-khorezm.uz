import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Play } from 'lucide-react';
import { getArticles } from '../data/articles';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import NewsletterBanner from '../components/homepage/NewsletterBanner';
import Icon3D from '../components/common/Icon3D';

const BADGE_VARIANTS = {
  tarix: 'primary',
  turizm: 'accent',
  madaniyat: 'purple',
  iqtisodiyot: 'success',
  ekologiya: 'success',
  talim: 'gray',
  texnologiya: 'primary',
};

const REFERENCE_TODAY = new Date('2026-11-26T23:59:59');

export default function NewsPage() {
  const { language, t } = useLanguage();
  const nText = t.pages.news;
  const articles = getArticles(language);

  const [catKey, setCatKey] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [page, setPage] = useState(1);
  const PER = 6;

  const sidebarCats = [
    { k: 'all', l: nText.cats.all, icon: 'news' },
    { k: 'iqtisodiyot', l: nText.cats.iqtisodiyot, icon: 'chart' },
    { k: 'talim', l: nText.cats.talim, icon: 'graduation' },
    { k: 'madaniyat', l: nText.cats.madaniyat, icon: 'music' },
    { k: 'turizm', l: nText.cats.turizm, icon: 'camera' },
    { k: 'ekologiya', l: nText.cats.ekologiya, icon: 'leaf' },
    { k: 'tarix', l: nText.cats.tarix, icon: 'users' },
    { k: 'texnologiya', l: nText.cats.texnologiya, icon: 'megaphone' },
  ];

  const timeTabs =
    language === 'ru'
      ? [{ k: 'all', l: 'Все' }, { k: 'today', l: 'Сегодня' }, { k: 'week', l: 'За неделю' }, { k: 'month', l: 'За месяц' }]
      : language === 'en'
        ? [{ k: 'all', l: 'All' }, { k: 'today', l: 'Today' }, { k: 'week', l: 'This Week' }, { k: 'month', l: 'This Month' }]
        : [{ k: 'all', l: 'Barchasi' }, { k: 'today', l: 'Bugungi' }, { k: 'week', l: 'Haftalik' }, { k: 'month', l: 'Oylik' }];

  const matchesTime = (dateStr) => {
    if (timeFilter === 'all') return true;
    const diffDays = (REFERENCE_TODAY - new Date(dateStr)) / (1000 * 60 * 60 * 24);
    if (timeFilter === 'today') return diffDays <= 1;
    if (timeFilter === 'week') return diffDays <= 7;
    if (timeFilter === 'month') return diffDays <= 31;
    return true;
  };

  const filtered = articles.filter(
    (a) => (catKey === 'all' || a.categoryKey === catKey) && matchesTime(a.date)
  );
  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);
  const paginated = rest.slice((page - 1) * PER, page * PER);

  const mostReadTitle = language === 'ru' ? 'Самые читаемые' : language === 'en' ? 'Most Read' : "Eng ko'p o'qilgan yangiliklar";
  const calendarTitle = language === 'ru' ? 'Календарь событий' : language === 'en' ? 'Events Calendar' : 'Tadbirlar kalendari';
  const monthLabel = language === 'ru' ? 'Ноябрь, 2026' : language === 'en' ? 'November 2026' : 'Noyabr, 2026';
  const daysHeader =
    language === 'ru'
      ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      : language === 'en'
        ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
        : ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

  const upcomingEvents =
    language === 'ru'
      ? [
          { title: 'Фестиваль «Ковун сайли»', date: 'Август · Ичан-Кала и Арда Хива' },
          { title: 'Международный фестиваль «Лазги»', date: 'Апрель–Май · Хива' },
          { title: 'Туристический форум Хорезма', date: 'Ноябрь · Ургенч и Хива' },
        ]
      : language === 'en'
        ? [
            { title: 'Qovun Sayli Melon Festival', date: 'August · Ichan-Kala & Arda Khiva' },
            { title: 'International Lazgi Festival', date: 'April–May · Khiva' },
            { title: 'Khorezm Tourism Forum', date: 'November · Urgench & Khiva' },
          ]
        : [
            { title: '«Qovun sayli» festivali', date: 'Avgust · Ichan-Qal’a va Arda Xiva' },
            { title: '«Lazgi» xalqaro festivali', date: 'Aprel–May · Xiva shahri' },
            { title: 'Xorazm turizm forumi', date: 'Noyabr · Urganch va Xiva' },
          ];

  return (
    <>
      <Helmet>
        <title>{t.nav.news}</title>
      </Helmet>
      <PageHero
        title={nText.title}
        subtitle={nText.subtitle}
        image="/images/khiva-hero.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.news}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Category Sidebar */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-2.5 sticky top-24">
              {sidebarCats.map((c) => (
                <button
                  key={c.k}
                  onClick={() => {
                    setCatKey(c.k);
                    setPage(1);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left cursor-pointer transition-colors ${
                    catKey === c.k ? 'bg-[#15528B] text-white' : 'text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]'
                  }`}
                >
                  <Icon3D name={c.icon} size={18} />
                  <span className="truncate">{c.l}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Center Main News */}
          <div className="lg:col-span-7 space-y-5">
            {featured ? (
              <Link to={`/yangiliklar/${featured.slug}`} className="block relative h-64 rounded-2xl overflow-hidden group border border-[#E5EAF0]">
                <img src={featured.photo} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <Badge variant={BADGE_VARIANTS[featured.categoryKey] || 'primary'} className="mb-2">
                    {featured.category}
                  </Badge>
                  <h2 className="text-white font-bold text-lg sm:text-xl leading-snug">{featured.title}</h2>
                  <div className="flex gap-3 mt-1.5 text-white/75 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {featured.date}</span>
                    <span className="flex items-center gap-1"><Eye size={11} /> {featured.views}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-10 text-center text-sm text-[#66758A]">
                {t.common.noResults}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Icon3D name="news" size={20} />
                <h2 className="font-bold text-[#17243B] text-base">{nText.title}</h2>
              </div>
              <div className="flex gap-1.5">
                {timeTabs.map((tb) => (
                  <button
                    key={tb.k}
                    onClick={() => {
                      setTimeFilter(tb.k);
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                      timeFilter === tb.k ? 'bg-[#15528B] text-white' : 'bg-white border border-[#E5EAF0] text-[#66758A]'
                    }`}
                  >
                    {tb.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map((a) => (
                <Link key={a.id} to={`/yangiliklar/${a.slug}`} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="relative h-32">
                      <img src={a.photo} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute bottom-2 left-2">
                        <Badge variant={BADGE_VARIANTS[a.categoryKey] || 'primary'} className="text-[10px]">
                          {a.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3.5">
                      <h3 className="font-bold text-[#17243B] text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-[#15528B]">
                        {a.title}
                      </h3>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3 flex items-center justify-between text-[11px] text-[#66758A]">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {a.date}</span>
                    <span className="flex items-center gap-1"><Eye size={10} /> {a.views}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Pagination total={rest.length} perPage={PER} currentPage={page} onPageChange={setPage} />
          </div>

          {/* Right Sidebar: Most Read + Calendar */}
          <aside className="lg:col-span-3 space-y-5">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon3D name="star" size={18} />
                <h3 className="font-bold text-[#17243B] text-sm">{mostReadTitle}</h3>
              </div>
              <div className="space-y-3">
                {articles.slice(0, 5).map((a) => (
                  <Link key={a.id} to={`/yangiliklar/${a.slug}`} className="flex gap-2.5 group">
                    <img src={a.photo} alt={a.title} className="w-14 h-12 object-cover rounded-lg shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#17243B] leading-snug line-clamp-2 group-hover:text-[#15528B]">{a.title}</p>
                      <span className="text-[10px] text-[#66758A] flex items-center gap-1 mt-0.5"><Eye size={10} /> {a.views}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Icon3D name="calendar" size={17} />
                  <h3 className="font-bold text-[#17243B] text-sm">{calendarTitle}</h3>
                </div>
                <span className="text-[11px] text-[#15528B] font-semibold">{monthLabel}</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-3">
                {daysHeader.map((d) => (
                  <div key={d} className="font-bold text-[#66758A] py-1">{d}</div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`py-1 rounded-md ${
                      day === 26
                        ? 'bg-[#15528B] text-white font-bold'
                        : [5, 18, 23].includes(day)
                          ? 'bg-[#FFF3E0] text-[#C58B43] font-bold'
                          : 'text-[#17243B]'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-2 border-t border-[#F7F9FC]">
                {upcomingEvents.map((ev) => (
                  <div key={ev.title} className="text-xs">
                    <div className="font-semibold text-[#17243B]">{ev.title}</div>
                    <div className="text-[11px] text-[#66758A]">{ev.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Multimedia Strip */}
        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon3D name="video" size={20} />
              <h2 className="font-bold text-[#17243B] text-base">{t.nav.media}</h2>
            </div>
            <Link to="/media" className="text-xs font-semibold text-[#15528B]">{t.common.seeAll} →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: '/images/khiva-hero.jpg', dur: '04:56', title: articles[0]?.title },
              { img: '/images/solar-khorezm.jpg', dur: '03:20', title: articles[1]?.title },
              { img: '/images/amudarya-oasis.jpg', dur: '05:18', title: articles[2]?.title },
              { img: '/images/khorezm-cuisine.jpg', dur: '02:47', title: articles[3]?.title || articles[0]?.title },
            ].map((v, i) => (
              <Link key={i} to="/media" className="group">
                <div className="relative h-28 rounded-xl overflow-hidden mb-2">
                  <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                      <Play size={14} className="text-[#15528B] ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">{v.dur}</span>
                </div>
                <p className="text-xs font-medium text-[#17243B] line-clamp-2">{v.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <NewsletterBanner />
      </div>
    </>
  );
}
