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

  const timeTabs = language === 'ru'
    ? [{ k: 'all', l: 'Все' }, { k: 'today', l: 'Сегодня' }, { k: 'week', l: 'За неделю' }, { k: 'month', l: 'За месяц' }]
    : language === 'en'
      ? [{ k: 'all', l: 'All' }, { k: 'today', l: 'Today' }, { k: 'week', l: 'This Week' }, { k: 'month', l: 'This Month' }]
      : [{ k: 'all', l: 'Barchasi' }, { k: 'today', l: 'Bugungi' }, { k: 'week', l: 'Haftalik' }, { k: 'month', l: 'Oylik' }];

  const filtered = articles.filter((a) => catKey === 'all' || a.categoryKey === catKey);
  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);
  const paginated = rest.slice((page - 1) * PER, page * PER);

  const mostReadTitle = language === 'ru' ? 'Самые читаемые' : language === 'en' ? 'Most Read' : "Eng ko'p o'qilgan yangiliklar";
  const calendarTitle = language === 'ru' ? 'Календарь событий' : language === 'en' ? 'Events Calendar' : 'Tadbirlar kalendari';
  const monthLabel = language === 'ru' ? 'Январь, 2025' : language === 'en' ? 'January 2025' : 'Yanvar, 2025';
  const daysHeader = language === 'ru'
    ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    : language === 'en'
      ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
      : ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

  const upcomingEvents = language === 'ru'
    ? [
        { title: 'Туристический форум Хорезма', date: '28–29 янв · Хива' },
        { title: 'Международный фестиваль «Лазги»', date: '15–17 фев · Ургенч' },
        { title: 'Эко-акция «Чистый Хорезм»', date: '1–28 фев · Все районы' },
      ]
    : language === 'en'
      ? [
          { title: 'Khorezm Tourism Forum', date: 'Jan 28–29 · Khiva' },
          { title: 'International Lazgi Festival', date: 'Feb 15–17 · Urgench' },
          { title: 'Green Khorezm Eco-Campaign', date: 'Feb 1–28 · All Districts' },
        ]
      : [
          { title: 'Xorazm turizm forumi', date: '28–29-yanvar · Xiva shahri' },
          { title: '«Lazgi» xalqaro festivali', date: '15–17-fevral · Urganch' },
          { title: 'Ekologik aksiya: «Toza Xorazm»', date: '1–28-fevral · Barcha tumanlar' },
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
            {featured && (
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
            )}

            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold text-[#17243B] text-base">{nText.title}</h2>
              <div className="flex gap-1.5">
                {timeTabs.map((tb) => (
                  <button
                    key={tb.k}
                    onClick={() => setTimeFilter(tb.k)}
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
              <h3 className="font-bold text-[#17243B] text-sm mb-3">{mostReadTitle}</h3>
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
                <h3 className="font-bold text-[#17243B] text-sm">{calendarTitle}</h3>
                <span className="text-[11px] text-[#15528B] font-semibold">{monthLabel}</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-3">
                {daysHeader.map((d) => (
                  <div key={d} className="font-bold text-[#66758A] py-1">{d}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`py-1 rounded-md ${
                      day === 27 ? 'bg-[#15528B] text-white font-bold' : [15, 28, 29].includes(day) ? 'bg-[#FFF3E0] text-[#C58B43] font-bold' : 'text-[#17243B]'
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
            <h2 className="font-bold text-[#17243B] text-base">{t.nav.media}</h2>
            <Link to="/media" className="text-xs font-semibold text-[#15528B]">{t.common.seeAll} →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: '/images/khiva-hero.jpg', dur: '04:56', title: articles[0]?.title },
              { img: '/images/amudarya-oasis.jpg', dur: '03:20', title: articles[3]?.title },
              { img: '/images/lazgi-dance.jpg', dur: '05:18', title: articles[1]?.title },
              { img: '/images/modern-office.jpg', dur: '02:47', title: articles[5]?.title || articles[2]?.title },
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
                <p className="text-xs font-semibold text-[#17243B] line-clamp-1">{v.title}</p>
              </Link>
            ))}
          </div>
        </div>

        <NewsletterBanner />
      </div>
    </>
  );
}
