import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, LayoutGrid, List } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getDistricts } from '../data/districts';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Badge from '../components/common/Badge';
import KhorezmMap from '../components/maps/KhorezmMap';
import Icon3D from '../components/common/Icon3D';

export default function DistrictsPage() {
  const { language, t } = useLanguage();
  const dText = t.pages.districts;
  const districts = getDistricts(language);

  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filtered = districts.filter((d) => {
    const matchQ =
      d.name.toLowerCase().includes(q.toLowerCase()) ||
      d.center.toLowerCase().includes(q.toLowerCase());
    const matchF = filter === 'all' || d.typeKey === filter;
    return matchQ && matchF;
  });

  // Verified regional statistics (xorazmstat.uz & official agricultural balance)
  const extraStats = [
    {
      icon: 'leaf',
      bg: '#E8F5EE',
      v: language === 'ru' ? '232,1 тыс. га' : language === 'en' ? '232.1k ha' : '232,1 ming ga',
      l: language === 'ru' ? 'Посевные земли' : language === 'en' ? 'Arable Land' : 'Ekin maydonlari',
    },
    {
      icon: 'factory',
      bg: '#FFF3E0',
      v: '3 430+',
      l: language === 'ru' ? 'Промпредприятия' : language === 'en' ? 'Industrial Plants' : 'Sanoat korxonalari',
    },
    {
      icon: 'graduation',
      bg: '#EBF3FA',
      v: language === 'ru' ? '573' : language === 'en' ? '573' : '573 ta',
      l: language === 'ru' ? 'Общеобразов. школы' : language === 'en' ? 'Public Schools' : "Umumta'lim maktablari",
    },
    {
      icon: 'shield',
      bg: '#FEE2E2',
      v: '530+',
      l: language === 'ru' ? 'Медучреждения' : language === 'en' ? 'Medical Clinics' : 'Tibbiyot muassasalari',
    },
    {
      icon: 'museum',
      bg: '#F3EEFF',
      v: '200+',
      l: language === 'ru' ? 'Объекты туризма' : language === 'en' ? 'Tourism Sites' : "Turizm ob'ektlari",
    },
  ];

  const getShortLabel = (name) =>
    name
      .replace(/город | shahri| tumani| район| District| City/gi, '')
      .trim();

  const areaChartData = districts.map((d) => ({
    name: getShortLabel(d.name),
    area: d.areaNum || parseFloat(String(d.area).replace(/[^\d.,]/g, '').replace(',', '.')) || 400,
  }));

  const populationChartData = districts.map((d) => ({
    name: getShortLabel(d.name),
    pop: Number((d.populationNum / 1000).toFixed(1)),
  }));

  const popChartTitle =
    language === 'ru'
      ? 'Население (тыс. чел., 2025)'
      : language === 'en'
        ? 'Population (thousands, 2025)'
        : 'Aholi soni (ming kishi, 2025)';

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
                <Icon3D name="map-pin" size={16} />
                <span className="truncate">{dText.allDistrictsLabel || dText.tabs.overview}</span>
              </div>
              <nav className="space-y-0.5 max-h-[540px] overflow-y-auto">
                {districts.map((d) => (
                  <Link
                    key={d.id}
                    to={`/tumanlar/${d.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B] transition-colors"
                  >
                    <Icon3D name={d.typeKey === 'city' ? 'city' : 'map-pin'} size={14} />
                    <span className="truncate">{d.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-5">
            {/* Top Map + Key Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="xl:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3D name="map-pin" size={20} />
                    <h2 className="font-bold text-[#17243B] text-base">{t.home.mapRegionLabel}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{dText.subtitle}</p>
                  <Link
                    to="/xarita"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg hover:bg-[#EBF3FA] transition-colors"
                  >
                    {t.home.mapOpen} →
                  </Link>
                </div>
                <KhorezmMap mode="preview" showFullscreen={false} className="h-60 w-full" />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="chart" size={19} />
                  <h3 className="font-bold text-[#17243B] text-sm">{t.pages.geography.keyStatsTitle}</h3>
                </div>
                {dText.stats.map((item) => (
                  <div key={item.l} className="flex justify-between py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A]">{item.l}</span>
                    <span className="font-bold text-[#15528B]">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Verified Regional Metrics */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {extraStats.map((item) => (
                  <div key={item.l} className="p-3 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] text-center flex flex-col items-center">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5"
                      style={{ backgroundColor: item.bg }}
                    >
                      <Icon3D name={item.icon} size={22} />
                    </div>
                    <div className="font-bold text-base text-[#15528B]">{item.v}</div>
                    <div className="text-[11px] text-[#66758A] mt-0.5 leading-tight">{item.l}</div>
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
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-[#15528B] text-white' : 'text-[#66758A]'}`}
                    aria-label="Grid"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-[#15528B] text-white' : 'text-[#66758A]'}`}
                    aria-label="List"
                  >
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
                    viewMode === 'list' ? 'flex items-center justify-between gap-4 p-3' : 'flex flex-col justify-between'
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
                    <div className={viewMode === 'list' ? 'min-w-0' : 'p-4 pb-2'}>
                      <h3 className="font-bold text-[#17243B] text-sm group-hover:text-[#15528B] transition-colors truncate">
                        {d.name}
                      </h3>
                      <p className="text-[11px] text-[#66758A] truncate mt-0.5">{d.center}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-[#66758A]">
                        <span className="flex items-center gap-1">
                          <Icon3D name="users" size={14} /> {d.population}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon3D name="map" size={14} /> {d.area}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={viewMode === 'list' ? 'pr-2 flex items-center shrink-0' : 'px-4 pb-3 flex items-center justify-between'}>
                    {viewMode === 'grid' && d.schools && (
                      <span className="text-[11px] text-[#66758A] flex items-center gap-1">
                        <Icon3D name="graduation" size={13} /> {d.schools}
                      </span>
                    )}
                    <span className="w-7 h-7 rounded-full bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center text-[#15528B] group-hover:bg-[#15528B] group-hover:text-white transition-colors ml-auto">
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Comparison Charts (Population & Area) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="users" size={20} />
                  <h3 className="font-bold text-[#17243B] text-sm">{popChartTitle}</h3>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={populationChartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-25} textAnchor="end" height={42} />
                    <YAxis hide />
                    <Tooltip
                      formatter={(val) => [`${val} ${language === 'ru' ? 'тыс.' : language === 'en' ? 'k' : 'ming'}`, dText.population]}
                    />
                    <Bar dataKey="pop" fill="#319568" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="chart" size={20} />
                  <h3 className="font-bold text-[#17243B] text-sm">{dText.area} (km²)</h3>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={areaChartData}>
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} angle={-25} textAnchor="end" height={42} />
                    <YAxis hide />
                    <Tooltip formatter={(val) => [`${val} km²`, dText.area]} />
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
