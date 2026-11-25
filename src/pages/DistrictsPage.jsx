import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Map, ChevronRight, LayoutGrid, List, Building2, MapPin, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getDistricts } from '../data/districts';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Badge from '../components/common/Badge';
import KhorezmSvgMap from '../components/common/KhorezmSvgMap';

export default function DistrictsPage() {
  const { language, t } = useLanguage();
  const dText = t.pages.districts;
  const districts = getDistricts(language);

  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filtered = districts.filter((d) => {
    const matchQ = d.name.toLowerCase().includes(q.toLowerCase()) || d.center.toLowerCase().includes(q.toLowerCase());
    const matchF = filter === 'all' || d.typeKey === filter;
    return matchQ && matchF;
  });

  const extraStats = [
    { v: '~260 000 ga', l: language === 'ru' ? 'Посевные земли' : language === 'en' ? 'Arable Land' : 'Ekin maydonlari' },
    { v: '150+ ta', l: language === 'ru' ? 'Промпредприятия' : language === 'en' ? 'Industrial Plants' : 'Sanoat korxonalari' },
    { v: '400+', l: language === 'ru' ? 'Учебные заведения' : language === 'en' ? 'Schools & Colleges' : "Ta'lim muassasalari" },
    { v: '120+', l: language === 'ru' ? 'Медучреждения' : language === 'en' ? 'Medical Centers' : 'Tibbiyot muassasalari' },
    { v: '50+', l: language === 'ru' ? 'Объекты туризма' : language === 'en' ? 'Tourism Sites' : "Turizm ob'ektlari" },
  ];

  const chartData = districts.map((d) => ({
    name: d.name
      .replace(/город | shahri| tumani| район| District| City/gi, '')
      .trim()
      .slice(0, 9),
    area: d.areaNum || parseFloat(String(d.area).replace(/[^\d.,]/g, '').replace(',', '.')) || 400,
  }));

  return (
    <>
      <Helmet>
        <title>{t.nav.districts}</title>
      </Helmet>
      <PageHero
        title={dText.title}
        subtitle={dText.subtitle}
        image="/images/urgench-modern.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.districts}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left District Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-3 sticky top-24">
              <div className="px-3 py-2 rounded-xl bg-[#15528B] text-white text-xs font-semibold mb-1.5 flex items-center gap-2">
                <MapPin size={14} /> {t.pages.districts.tabs.overview}
              </div>
              <nav className="space-y-0.5 max-h-[540px] overflow-y-auto">
                {districts.map((d) => (
                  <Link
                    key={d.id}
                    to={`/tumanlar/${d.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B] transition-colors"
                  >
                    <Building2 size={13} className="shrink-0" />
                    <span className="truncate">{d.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-5">
            {/* Top Map + Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="xl:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <h2 className="font-bold text-[#17243B] text-base mb-2">{t.home.mapRegionLabel}</h2>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{dText.subtitle}</p>
                  <Link
                    to="/xarita"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg hover:bg-[#EBF3FA]"
                  >
                    {t.home.mapOpen} →
                  </Link>
                </div>
                <KhorezmSvgMap variant="full" className="h-48" />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h3 className="font-bold text-[#17243B] text-sm mb-3">{t.pages.geography.keyStatsTitle}</h3>
                {dText.stats.map((item) => (
                  <div key={item.l} className="flex justify-between py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A]">{item.l}</span>
                    <span className="font-bold text-[#15528B]">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Regional Metrics */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {extraStats.map((item) => (
                  <div key={item.l} className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] text-center">
                    <div className="font-bold text-base text-[#15528B]">{item.v}</div>
                    <div className="text-[11px] text-[#66758A] mt-0.5">{item.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search + Filter + Grid/List Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66758A]" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={dText.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2.5 border border-[#E5EAF0] rounded-xl bg-white text-sm outline-none focus:border-[#15528B] text-[#17243B]"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { v: 'all', l: dText.filterAll },
                  { v: 'city', l: dText.filterCity },
                  { v: 'district', l: dText.filterDistrict },
                ].map((f) => (
                  <button
                    key={f.v}
                    onClick={() => setFilter(f.v)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      filter === f.v ? 'bg-[#15528B] text-white' : 'bg-white border border-[#E5EAF0] text-[#66758A]'
                    }`}
                  >
                    {f.l}
                  </button>
                ))}
                <div className="flex border border-[#E5EAF0] rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setViewMode('grid')} className={`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-[#15528B] text-white' : 'text-[#66758A]'}`} aria-label="Grid">
                    <LayoutGrid size={16} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-[#15528B] text-white' : 'text-[#66758A]'}`} aria-label="List">
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-12 text-center">
                <p className="text-[#66758A] text-sm">"{q}" — {t.common.noResults}</p>
              </div>
            )}

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-3'}>
              {filtered.map((d) => (
                <Link
                  key={d.id}
                  to={`/tumanlar/${d.slug}`}
                  className={`bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group ${
                    viewMode === 'list' ? 'flex items-center gap-4 p-3' : 'flex flex-col justify-between'
                  }`}
                >
                  <div className={viewMode === 'list' ? 'flex items-center gap-4 flex-1 min-w-0' : ''}>
                    <div className={viewMode === 'list' ? 'relative w-28 h-20 rounded-xl overflow-hidden shrink-0' : 'relative h-32'}>
                      <img src={d.photo} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 right-2">
                        <Badge variant={d.typeKey === 'city' ? 'accent' : 'primary'} className="text-[10px]">
                          {d.typeKey === 'city' ? dText.typeCity : dText.typeDistrict}
                        </Badge>
                      </div>
                    </div>
                    <div className={viewMode === 'list' ? 'min-w-0' : 'p-4'}>
                      <h3 className="font-bold text-[#17243B] text-sm group-hover:text-[#15528B] transition-colors truncate">
                        {d.name}
                      </h3>
                      <div className="flex gap-3 mt-1.5 text-xs text-[#66758A]">
                        <span className="flex items-center gap-1">
                          <Users size={11} className="text-[#15528B]" /> {d.population}
                        </span>
                        <span className="flex items-center gap-1">
                          <Map size={11} className="text-[#15528B]" /> {d.area}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-3 flex items-center justify-end">
                    <span className="w-7 h-7 rounded-full bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center text-[#15528B] group-hover:bg-[#15528B] group-hover:text-white transition-colors">
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Comparison + Interactive Map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin size={17} className="text-[#15528B]" />
                    <h3 className="font-bold text-[#17243B] text-sm">{t.pages.map.title}</h3>
                  </div>
                  <p className="text-xs text-[#66758A] mb-3">{t.home.mapSubtitle}</p>
                  <Link to="/xarita" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg">
                    {t.home.mapOpen} →
                  </Link>
                </div>
                <KhorezmSvgMap variant="simple" className="w-44 h-28 shrink-0" />
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 size={17} className="text-[#15528B]" />
                  <h3 className="font-bold text-[#17243B] text-sm">{dText.area} (km²)</h3>
                </div>
                <ResponsiveContainer width="100%" height={110}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="area" fill="#15528B" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="text-xs text-[#66758A]">{dText.sourceNote}</p>
          </div>
        </div>
      </div>
    </>
  );
}
