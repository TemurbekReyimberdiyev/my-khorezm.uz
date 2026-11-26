import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, Play, Download, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getGeographyData } from '../data/geography';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';
import KhorezmMap from '../components/maps/KhorezmMap';

export default function GeographyPage() {
  const { language, t } = useLanguage();
  const geo = getGeographyData(language);
  const g = t.pages.geography;

  const sidebarLinks = [
    { label: g.locationTitle, href: '#overview', icon: 'map-pin' },
    { label: g.climateTitle, href: '#climate', icon: 'sun' },
    { label: g.waterNetTitle, href: '#rivers', icon: 'waves' },
    { label: g.soilCoverTitle, href: '#soil', icon: 'layers' },
    { label: g.floraTitle, href: '#flora', icon: 'tree' },
    { label: g.resourcesTitle, href: '#resources', icon: 'globe' },
    { label: g.solarTitle, href: '#solar', icon: 'compass' },
  ];

  const subCards = [
    { label: t.nav.waterResources, href: '/geografiya/suv-resurslari', icon: 'waves', photo: '/images/amudarya-oasis.jpg', desc: geo.rivers[0].desc },
    { label: t.nav.soil, href: '/geografiya/tuproq', icon: 'layers', photo: '/images/soil-oasis.jpg', desc: geo.soilTypes[0].desc },
    { label: t.nav.floraFauna, href: '/geografiya/flora-fauna', icon: 'tree', photo: '/images/flora-gazelle.jpg', desc: geo.flora.slice(0, 3).join(', ') },
    { label: g.reliefTitle, href: '/geografiya/iqlim', icon: 'sun', photo: '/images/kyzylkum-desert.jpg', desc: geo.climate.seasons[1].desc },
    { label: g.solarTitle, href: '/ekologiya', icon: 'globe', photo: '/images/solar-khorezm.jpg', desc: geo.facts[1] },
  ];

  const resourceLabels = [
    { bg: '#EBF3FA', title: t.nav.waterResources, sub: geo.rivers[0].name },
    { bg: '#E8F5EE', title: t.nav.soil, sub: geo.soilTypes[0].name },
    { bg: '#FFF3E0', title: g.solarTitle, sub: '280–300 ' + (language === 'ru' ? 'солн. дней' : language === 'en' ? 'sunny days' : 'quyoshli kun') },
    { bg: '#F3EEFF', title: g.resourcesTitle, sub: geo.resources[0] },
    { bg: '#E0F7FA', title: t.nav.floraFauna, sub: geo.fauna[0] },
  ];

  const pdfTitle = language === 'ru' ? 'Справочник и карты (PDF)' : language === 'en' ? 'Atlas & Fact Sheet (PDF)' : "Matnli xarita va ma'lumotlar";
  const pdfBtn = language === 'ru' ? 'Открыть обзор' : language === 'en' ? 'Open Summary' : 'Batafsil (PDF)';
  const videoTitle = language === 'ru' ? 'Природа Хорезма — оазис, река и пустыня' : language === 'en' ? 'Nature of Khorezm — Oasis, River & Desert' : "Xorazm tabiati — voha, daryo va cho'l uyg'unligi";

  return (
    <>
      <Helmet>
        <title>{t.nav.geography}</title>
      </Helmet>
      <PageHero
        title={g.title}
        subtitle={g.subtitle}
        image="/images/amudarya-oasis.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.geography}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-3 sticky top-24">
              <nav className="space-y-1">
                {sidebarLinks.map((l, idx) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      idx === 0 ? 'bg-[#15528B] text-white' : 'text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]'
                    }`}
                  >
                    <Icon3D name={l.icon} size={18} />
                    <span className="truncate">{l.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-5">
            {/* Overview + SVG Map + Key Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4" id="overview">
              <div className="xl:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Icon3D name="map-pin" size={20} />
                    <h2 className="font-bold text-[#17243B] text-base">{g.locationTitle}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-3">{geo.overview}</p>
                  <ul className="space-y-1 mb-4">
                    {geo.boundaries.map((b) => (
                      <li key={b} className="text-[11px] text-[#66758A] flex items-start gap-1.5">
                        <span className="text-[#319568] font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/geografiya/suv-resurslari"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg hover:bg-[#EBF3FA]"
                  >
                    {t.common.readMore} <ArrowRight size={13} />
                  </Link>
                </div>
                <KhorezmMap mode="compact" showFullscreen={false} className="h-56 w-full" />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="compass" size={20} />
                  <h2 className="font-bold text-[#17243B] text-sm">{g.keyStatsTitle}</h2>
                </div>
                {geo.keyStats.map((item) => (
                  <div key={item.l} className="flex justify-between py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A]">{item.l}</span>
                    <span className="font-bold text-[#17243B]">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Climate row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" id="climate">
              <div className="lg:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon3D name="sun" size={20} />
                    <h2 className="font-bold text-[#17243B] text-sm">{g.climateTitle}</h2>
                  </div>
                  <Link to="/geografiya/iqlim" className="text-xs text-[#15528B] font-semibold hover:underline">
                    {t.common.readMore} →
                  </Link>
                </div>
                <p className="text-xs text-[#66758A] mb-3 leading-relaxed">{geo.climate.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: 'sun', label: g.climateCards.summer, value: '+35...+44°C', bg: '#FFF1E6' },
                    { icon: 'snow', label: g.climateCards.winter, value: '-4...-15°C', bg: '#EBF3FA' },
                    { icon: 'rain', label: g.climateCards.annualPrecip, value: '80–100 mm', bg: '#E0F7FA' },
                    { icon: 'wind', label: g.climateCards.wind, value: '3–6 m/s', bg: '#E8F5EE' },
                  ].map((c) => (
                    <div key={c.label} className="rounded-xl p-2.5 text-center border border-[#E5EAF0]" style={{ backgroundColor: c.bg }}>
                      <Icon3D name={c.icon} alt={c.label} size={22} className="mx-auto mb-1" />
                      <div className="font-bold text-xs text-[#17243B]">{c.value}</div>
                      <div className="text-[10px] text-[#66758A]">{c.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h3 className="text-xs font-bold text-[#17243B] mb-3">{g.tempChartTitle}</h3>
                <ResponsiveContainer width="100%" height={175}>
                  <BarChart data={geo.climate.avgTemps}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                    <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Bar dataKey="temp" radius={[3, 3, 0, 0]}>
                      {geo.climate.avgTemps.map((entry, idx) => (
                        <Cell key={idx} fill={entry.temp >= 25 ? '#EA580C' : entry.temp >= 10 ? '#F59E0B' : '#38BDF8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="lg:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h3 className="text-xs font-bold text-[#17243B] mb-3">{g.precipChartTitle}</h3>
                <ResponsiveContainer width="100%" height={175}>
                  <BarChart data={geo.climate.precipitation}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                    <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Bar dataKey="mm" fill="#319568" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 5 Subdirections */}
            <div>
              <h2 className="font-bold text-[#17243B] text-base mb-3">{g.directionsTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {subCards.map((s) => (
                  <Link key={s.label} to={s.href} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
                    <img src={s.photo} alt={s.label} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-3">
                      <div className="flex items-center gap-1.5 text-[#15528B] font-bold text-xs">
                        <Icon3D name={s.icon} size={18} /> {s.label}
                      </div>
                      <p className="text-[11px] text-[#66758A] mt-1 line-clamp-2">{s.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2x2 Photo + Text Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 flex gap-4 items-center" id="relief">
                <img src="/images/kyzylkum-desert.jpg" alt={g.reliefTitle} className="w-36 h-28 object-cover rounded-xl shrink-0" />
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm mb-1">{g.reliefTitle}</h3>
                  <p className="text-xs text-[#66758A] line-clamp-3 mb-2.5">{geo.overview}</p>
                  <Link to="/geografiya/iqlim" className="text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3 py-1.5 rounded-lg inline-flex items-center gap-1">
                    {t.common.readMore} →
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 flex gap-4 items-center" id="rivers">
                <img src="/images/amudarya-oasis.jpg" alt={g.waterNetTitle} className="w-36 h-28 object-cover rounded-xl shrink-0" />
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm mb-1">{g.waterNetTitle}</h3>
                  <p className="text-xs text-[#66758A] line-clamp-3 mb-2.5">{geo.rivers[0].desc}</p>
                  <Link to="/geografiya/suv-resurslari" className="text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3 py-1.5 rounded-lg inline-flex items-center gap-1">
                    {t.common.readMore} →
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 flex gap-4 items-center" id="soil">
                <img src="/images/soil-oasis.jpg" alt={g.soilCoverTitle} className="w-36 h-28 object-cover rounded-xl shrink-0" />
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm mb-1">{g.soilCoverTitle}</h3>
                  <p className="text-xs text-[#66758A] line-clamp-3 mb-2.5">{geo.soilTypes[0].desc}</p>
                  <Link to="/geografiya/tuproq" className="text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3 py-1.5 rounded-lg inline-flex items-center gap-1">
                    {t.common.readMore} →
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 flex gap-4 items-center" id="flora">
                <img src="/images/flora-gazelle.jpg" alt={g.floraTitle} className="w-36 h-28 object-cover rounded-xl shrink-0" />
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm mb-1">{g.floraTitle}</h3>
                  <p className="text-xs text-[#66758A] line-clamp-3 mb-2.5">{geo.flora.join(', ')}.</p>
                  <Link to="/geografiya/flora-fauna" className="text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3 py-1.5 rounded-lg inline-flex items-center gap-1">
                    {t.common.readMore} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Natural resources row */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5" id="resources">
              <h2 className="font-bold text-[#17243B] text-base mb-3">{g.resourcesTitle}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {resourceLabels.map((item, idx) => (
                  <div key={item.title} className="flex items-center gap-2.5 p-3 rounded-xl border border-[#E5EAF0] bg-[#FCFDFF]">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.bg }}>
                      <Icon3D name={['waves', 'layers', 'sun', 'globe', 'tree'][idx] || 'leaf'} alt={item.title} size={22} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#17243B] truncate">{item.title}</div>
                      <div className="text-[11px] text-[#66758A] truncate">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 3-column row: Facts + Video + PDF */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="solar">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h3 className="font-bold text-[#17243B] text-sm mb-3">{g.factsTitle}</h3>
                <ul className="space-y-2">
                  {geo.facts.map((fact) => (
                    <li key={fact} className="flex items-start gap-2 text-xs text-[#66758A]">
                      <CheckCircle size={14} className="text-[#319568] shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/media" className="relative rounded-2xl overflow-hidden border border-[#E5EAF0] group min-h-[160px]">
                <img src="/images/amudarya-oasis.jpg" alt={videoTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center mb-2">
                    <Play size={18} className="text-[#15528B] ml-0.5" />
                  </div>
                  <p className="text-white text-xs font-semibold">{videoTitle}</p>
                </div>
              </Link>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3D name="book" size={20} />
                    <h3 className="font-bold text-[#17243B] text-sm">{pdfTitle}</h3>
                  </div>
                  <p className="text-xs text-[#66758A] leading-relaxed">{g.subtitle}</p>
                </div>
                <Link
                  to="/geografiya/iqlim"
                  className="mt-4 inline-flex items-center justify-center gap-2 bg-[#EBF3FA] text-[#15528B] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#15528B] hover:text-white transition-colors"
                >
                  <Download size={13} /> {pdfBtn}
                </Link>
              </div>
            </div>

            <p className="text-xs text-[#66758A]">{geo.sourceNote}</p>
          </div>
        </div>
      </div>
    </>
  );
}
