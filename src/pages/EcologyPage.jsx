import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Download, CheckCircle } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getEcologyData } from '../data/ecology';
import { useLanguage } from '../hooks/useLanguage';
import { useWeather, formatTemp } from '../context/WeatherContext';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';
import AqiGauge from '../components/common/AqiGauge';

export default function EcologyPage() {
  const { language, t } = useLanguage();
  const { temperature, humidity, windSpeed, pm25, pm10, aqi, aqiLevel, pm25Level, pm10Level, hourlyPm25, isLive, updatedAt } = useWeather();
  const ec = t.pages.ecology;
  const data = getEcologyData(language);
  const aq = data.airQuality;
  const [period, setPeriod] = useState('24h');
  const [aralPos, setAralPos] = useState(50);

  const statusText = {
    good: t.home.airQualityStatusGood,
    moderate: t.home.airQualityStatusModerate,
    sensitive: t.home.airQualityStatusSensitive,
    unhealthy: t.home.airQualityStatusUnhealthy,
  };

  const badgeTone = (level) =>
    level === 'good'
      ? 'bg-green-100 text-green-700'
      : level === 'moderate'
        ? 'bg-yellow-100 text-yellow-700'
        : level === 'sensitive'
          ? 'bg-orange-100 text-orange-700'
          : 'bg-red-100 text-red-700';

  const airChartData =
    (period === 'now' || period === '24h') && hourlyPm25.length > 0
      ? hourlyPm25
      : data.monthlyAirQuality;

  const sidebarItems = [
    { label: ec.aboutTitle, href: '#about', icon: 'leaf' },
    { label: ec.indicatorsTitle, href: '#monitoring', icon: 'wind' },
    { label: ec.issuesTitle, href: '#issues', icon: 'warning' },
    { label: ec.aralTitle, href: '#aral', icon: 'waves' },
    { label: ec.projectsTitle, href: '#projects', icon: 'tree' },
  ];

  const periods =
    language === 'ru'
      ? [{ k: 'now', l: 'Сейчас' }, { k: '24h', l: '24 часа' }, { k: '7d', l: '7 дней' }, { k: '30d', l: '30 дней' }]
      : language === 'en'
        ? [{ k: 'now', l: 'Now' }, { k: '24h', l: '24h' }, { k: '7d', l: '7 days' }, { k: '30d', l: '30 days' }]
        : [{ k: 'now', l: 'Hozirgi' }, { k: '24h', l: '24 soat' }, { k: '7d', l: '7 kun' }, { k: '30d', l: '30 kun' }];

  const issuePhotos = [
    '/images/aral-crisis.jpg',
    '/images/kyzylkum-desert.jpg',
    '/images/soil-oasis.jpg',
    '/images/amudarya-oasis.jpg',
    '/images/modern-office.jpg',
  ];

  const wealthCards = [
    { img: '/images/amudarya-oasis.jpg', title: t.nav.waterResources, href: '/geografiya/suv-resurslari' },
    { img: '/images/soil-oasis.jpg', title: t.nav.soil, href: '/geografiya/tuproq' },
    { img: '/images/flora-gazelle.jpg', title: t.nav.floraFauna, href: '/geografiya/flora-fauna' },
    { img: '/images/kyzylkum-desert.jpg', title: t.pages.geography.reliefTitle, href: '/geografiya/iqlim' },
  ];

  const reports =
    language === 'ru'
      ? [
          { slug: 'khorezm-ecology-summary', name: 'Экологический обзор Хорезма (2024–2025)', size: 'TXT' },
          { slug: 'khorezm-air-quality', name: 'Мониторинг воздуха — Ургенч (Open-Meteo)', size: 'TXT' },
          { slug: 'sarimoy-solar-es', name: 'СЭС Сарымой 126 МВт и агровольтаика', size: 'TXT' },
          { slug: 'soil-water-overview', name: 'Справка по засолению почв и орошению', size: 'TXT' },
        ]
      : language === 'en'
        ? [
            { slug: 'khorezm-ecology-summary', name: 'Khorezm Ecology Overview (2024–2025)', size: 'TXT' },
            { slug: 'khorezm-air-quality', name: 'Urgench Live Air Quality Summary (Open-Meteo)', size: 'TXT' },
            { slug: 'sarimoy-solar-es', name: 'Sarimoy 126 MW Solar Plant & Agrivoltaics', size: 'TXT' },
            { slug: 'soil-water-overview', name: 'Soil Salinity & Irrigation Review', size: 'TXT' },
          ]
        : [
            { slug: 'khorezm-ecology-summary', name: 'Xorazm ekologik holati ma’lumotnomasi (2024–2025)', size: 'TXT' },
            { slug: 'khorezm-air-quality', name: 'Urganch havo sifati hisoboti (Open-Meteo)', size: 'TXT' },
            { slug: 'sarimoy-solar-es', name: 'Sarimoy 126 MVt quyosh stansiyasi va agrovoltaika', size: 'TXT' },
            { slug: 'soil-water-overview', name: "Tuproq sho'rlanishi va suv tejash tahlili", size: 'TXT' },
          ];

  const reportsHeading =
    language === 'ru' ? 'Экологические справки' : language === 'en' ? 'Environmental Fact Sheets' : "Ekologik ma'lumotnomalar";

  const handleDownloadReport = (rep) => {
    const content = [
      `my-khorezm.uz — ${rep.name}`,
      '====================================================',
      '',
      data.overview,
      '',
      `${ec.indicatorsTitle}:`,
      ...data.keyStats.map((k) => `- ${k.l}: ${k.v}`),
      '',
      `Live Urgench Telemetry (Open-Meteo):`,
      `- Temp: ${formatTemp(temperature)} | Humidity: ${humidity}% | Wind: ${windSpeed} m/s`,
      `- PM2.5: ${pm25} ug/m3 | PM10: ${pm10} ug/m3 | AQI: ${aqi}`,
      '',
      `${ec.projectsTitle}:`,
      ...data.greenProjects.map((p) => `- ${p.title}: ${p.desc}`),
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rep.slug}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <>
      <Helmet>
        <title>{t.nav.ecology}</title>
      </Helmet>
      <PageHero
        title={ec.title}
        subtitle={ec.subtitle}
        image="/images/amudarya-oasis.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.ecology}`}
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
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${
                      idx === 0 ? 'bg-[#15528B] text-white' : 'text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]'
                    }`}
                  >
                    <Icon3D name={item.icon} size={17} />
                    <span className="truncate">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-5">
            {/* Top row */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4" id="about">
              <div className="xl:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon3D name="leaf" size={20} />
                    <h2 className="font-bold text-[#17243B] text-base">{ec.aboutTitle}</h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-3">{data.overview}</p>
                  <a href="#monitoring" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg">
                    {t.common.readMore} →
                  </a>
                </div>
                <img src="/images/amudarya-oasis.jpg" alt={ec.title} className="w-full sm:w-48 h-32 object-cover rounded-xl shrink-0" />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="chart" size={18} />
                  <h3 className="font-bold text-[#17243B] text-sm">{ec.indicatorsTitle}</h3>
                </div>
                {data.keyStats.map((i) => (
                  <div key={i.l} className="flex justify-between py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A]">{i.l}</span>
                    <span className="font-bold" style={{ color: i.c }}>{i.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitoring Dashboard with Gauge */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5" id="monitoring">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-bold text-[#17243B] text-sm sm:text-base flex items-center gap-2 flex-wrap">
                  <Icon3D name="wind" size={20} />
                  <span>{ec.monitoringTitle}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#319568]">
                    {isLive && <span className="w-1.5 h-1.5 rounded-full bg-[#319568] animate-pulse" />}
                    {ec.sampleTag}
                    {updatedAt ? ` · ${updatedAt}` : ''}
                  </span>
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs border border-[#E5EAF0] rounded-lg px-2.5 py-1 bg-[#F7F9FC] text-[#17243B]">{ec.cityLabel}</span>
                  <div className="flex border border-[#E5EAF0] rounded-lg overflow-hidden">
                    {periods.map((p) => (
                      <button
                        key={p.k}
                        onClick={() => setPeriod(p.k)}
                        className={`px-2.5 py-1 text-[11px] font-medium cursor-pointer ${
                          period === p.k ? 'bg-[#15528B] text-white' : 'bg-white text-[#66758A]'
                        }`}
                      >
                        {p.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5 items-center">
                {[
                  { icon: 'thermometer', label: aq.labels.temp, value: formatTemp(temperature) },
                  { icon: 'water', label: aq.labels.humidity, value: `${humidity}%` },
                  { icon: 'wind', label: 'PM2.5', value: `${pm25} µg/m³`, badge: statusText[pm25Level], badgeLevel: pm25Level },
                  { icon: 'wind', label: 'PM10', value: `${pm10} µg/m³`, badge: statusText[pm10Level], badgeLevel: pm10Level },
                  { icon: 'wind', label: aq.labels.wind, value: `${windSpeed} m/s` },
                ].map((item) => (
                  <div key={item.label} className="border border-[#E5EAF0] rounded-xl p-3 text-center h-full flex flex-col justify-center">
                    <Icon3D name={item.icon} alt={item.label} size={24} className="mx-auto mb-1" />
                    <div className="text-[11px] text-[#66758A] leading-tight">{item.label}</div>
                    <div className="font-bold text-[#17243B] text-sm mt-0.5">{item.value}</div>
                    {item.badge && (
                      <span className={`inline-block mx-auto mt-1 text-[10px] px-2 py-0.5 rounded-full font-semibold ${badgeTone(item.badgeLevel)}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
                <div className="border border-[#E5EAF0] rounded-xl p-2 flex flex-col items-center justify-center bg-[#FCFDFF]">
                  <div className="text-[10px] font-semibold text-[#66758A]">{aq.labels.aqi}</div>
                  <AqiGauge value={aqi} label={statusText[aqiLevel]} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <h3 className="text-xs font-bold text-[#17243B] mb-2">{ec.airDynamicsTitle}</h3>
                  <ResponsiveContainer width="100%" height={170}>
                    <AreaChart data={airChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="pm25" stroke="#319568" fill="#E8F5EE" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#17243B] mb-2">{ec.precipTitle}</h3>
                  <ResponsiveContainer width="100%" height={170}>
                    <BarChart data={data.monthlyPrecip}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                      <XAxis dataKey="m" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="y" fill="#15528B" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-3">{ec.demoNote}</p>
            </div>

            {/* 5 Issues */}
            <div id="issues">
              <div className="flex items-center gap-2 mb-3">
                <Icon3D name="warning" size={20} />
                <h2 className="font-bold text-[#17243B] text-base">{ec.issuesTitle}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {data.issues.map((issue, idx) => (
                  <div key={issue.id} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden group hover:shadow-md transition-shadow">
                    <img src={issuePhotos[idx]} alt={issue.title} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon3D name="warning" size={16} />
                        <span className={`text-[10px] font-semibold ${issue.isSevere ? 'text-red-500' : 'text-yellow-600'}`}>{issue.severity}</span>
                      </div>
                      <h3 className="font-bold text-[#17243B] text-xs leading-tight">{issue.title}</h3>
                      <p className="text-[11px] text-[#66758A] leading-snug mt-1 line-clamp-2">{issue.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aral Slider + Green Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="aral">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex gap-4 items-center">
                <div
                  className="relative w-44 h-36 rounded-xl overflow-hidden shrink-0 select-none cursor-col-resize"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setAralPos(Math.min(90, Math.max(10, ((e.clientX - rect.left) / rect.width) * 100)));
                  }}
                >
                  <img src="/images/aral-crisis.jpg" alt="2024" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: `${aralPos}%` }}>
                    <img src="/images/amudarya-oasis.jpg" alt="1989" className="w-44 h-36 object-cover max-w-none" />
                  </div>
                  <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${aralPos}%` }} />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/65 text-white text-[10px] px-1.5 py-0.5 rounded">1989</span>
                  <span className="absolute bottom-1.5 right-1.5 bg-black/65 text-white text-[10px] px-1.5 py-0.5 rounded">2024</span>
                </div>
                <div>
                  <h2 className="font-bold text-[#17243B] text-sm mb-1.5">{ec.aralTitle}</h2>
                  <p className="text-xs text-[#66758A] leading-relaxed mb-3 line-clamp-4">{data.aralSea.description}</p>
                  <Link to="/yangiliklar/ekologiya-aral" className="text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3 py-1.5 rounded-lg inline-flex items-center gap-1">
                    {t.common.readMore} →
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5" id="projects">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="tree" size={19} />
                  <h2 className="font-bold text-[#17243B] text-sm">{ec.projectsTitle}</h2>
                </div>
                <ul className="space-y-2">
                  {data.greenProjects.map((p) => (
                    <li key={p.id} className="flex items-start gap-2 text-xs text-[#66758A]">
                      <CheckCircle size={13} className="text-[#319568] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#17243B]">{p.title}</span> — {p.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Natural Wealth + Downloadable Fact Sheets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="globe" size={18} />
                  <h2 className="font-bold text-[#17243B] text-sm">{t.pages.geography.resourcesTitle}</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {wealthCards.map((w) => (
                    <Link key={w.title} to={w.href} className="border border-[#E5EAF0] rounded-xl overflow-hidden hover:shadow-xs transition-shadow">
                      <img src={w.img} alt={w.title} className="w-full h-16 object-cover" />
                      <div className="p-2 text-[11px] font-semibold text-[#17243B] text-center truncate">{w.title}</div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="book" size={18} />
                  <h2 className="font-bold text-[#17243B] text-sm">{reportsHeading}</h2>
                </div>
                <div className="space-y-2">
                  {reports.map((rep) => (
                    <button
                      key={rep.slug}
                      type="button"
                      onClick={() => handleDownloadReport(rep)}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] hover:border-[#15528B]/40 hover:bg-[#EBF3FA]/50 text-xs transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2 text-[#17243B] truncate">
                        <FileText size={14} className="text-[#DC2626] shrink-0" />
                        <span className="truncate">{rep.name}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[#15528B] font-semibold shrink-0 ml-2">
                        {rep.size} <Download size={13} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Green Banner */}
            <div className="rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: 'linear-gradient(90deg, #1E5D4E 0%, #319568 100%)' }}>
              <div>
                <h2 className="font-bold text-lg">{ec.bannerTitle}</h2>
                <p className="text-xs sm:text-sm text-white/85 mt-1">{ec.bannerDesc}</p>
              </div>
              <Link to="/geografiya/flora-fauna" className="inline-flex items-center gap-2 bg-white text-[#1E5D4E] px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shrink-0">
                {ec.exploreProjects} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
