import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { TrendingUp, Package, Users, Building, CheckCircle, Percent, Coins, Rocket, Headphones, Calendar, Factory, Briefcase } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getEconomyData } from '../data/economy';
import { getArticles } from '../data/articles';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';

export default function EconomyPage() {
  const { language, t } = useLanguage();
  const ec = t.pages.economy;
  const data = getEconomyData(language);
  const ecoArticle = getArticles(language).find((a) => a.categoryKey === 'iqtisodiyot') || getArticles(language)[0];

  const sidebarItems = [
    { label: ec.aboutTitle, href: '#about', icon: Building },
    { label: ec.indicatorsTitle, href: '#indicators', icon: TrendingUp },
    { label: ec.mainSectorsTitle, href: '#sectors', icon: Factory },
    { label: ec.investmentsTitle, href: '#investments', icon: Coins },
    { label: ec.laborTitle, href: '#labor', icon: Users },
    { label: ec.prospectsTitle, href: '#prospects', icon: Briefcase },
  ];

  const tradeLabels = language === 'ru'
    ? { title: 'Внешнеторговый оборот', exp: 'Экспорт', imp: 'Импорт', bal: 'Положительное сальдо: +104,5 млн $' }
    : language === 'en'
      ? { title: 'Foreign Trade Turnover', exp: 'Exports', imp: 'Imports', bal: 'Positive Trade Balance: +$104.5M' }
      : { title: 'Tashqi savdo aylanmasi', exp: 'Eksport', imp: 'Import', bal: 'Tashqi savdo ijobiy saldosi: +104,5 mln $' };

  const infraTitle = language === 'ru' ? 'Инфраструктура и логистика' : language === 'en' ? 'Infrastructure & Logistics' : 'Infratuzilma va logistika';
  const infraItems = language === 'ru'
    ? ['Международные автодороги', 'Железная дорога и логистика', 'Современные промзоны', 'Энергетическая инфраструктура', 'Цифровая сеть (интернет, IT)']
    : language === 'en'
      ? ['International highways', 'Railways & logistics centers', 'Modern industrial zones', 'Energy & utility networks', 'Digital & fiber infrastructure']
      : ["Xalqaro avtomobil yo'llari", "Temir yo'l va logistika markazlari", 'Zamonaviy sanoat zonalari', 'Kommunal va energetika infratuzilmasi', 'Raqamli infratuzilma (internet, IT)'];

  const supportTitle = language === 'ru' ? 'Поддержка предпринимательства' : language === 'en' ? 'Entrepreneurship Support' : "Tadbirkorlikni qo'llab-quvvatlash";
  const supportCards = language === 'ru'
    ? [
        { icon: Percent, c: '#319568', bg: '#E8F5EE', l: 'Налоговые льготы' },
        { icon: Coins, c: '#C58B43', bg: '#FFF3E0', l: 'Кредиты и финансы' },
        { icon: Rocket, c: '#7C3AED', bg: '#F3EEFF', l: 'Бизнес-инкубаторы' },
        { icon: Headphones, c: '#15528B', bg: '#EBF3FA', l: 'Консультации' },
      ]
    : language === 'en'
      ? [
          { icon: Percent, c: '#319568', bg: '#E8F5EE', l: 'Tax Incentives' },
          { icon: Coins, c: '#C58B43', bg: '#FFF3E0', l: 'Credit & Microloans' },
          { icon: Rocket, c: '#7C3AED', bg: '#F3EEFF', l: 'Business Incubators' },
          { icon: Headphones, c: '#15528B', bg: '#EBF3FA', l: 'Advisory Support' },
        ]
      : [
          { icon: Percent, c: '#319568', bg: '#E8F5EE', l: 'Imtiyozlar va soliq yengilliklari' },
          { icon: Coins, c: '#C58B43', bg: '#FFF3E0', l: 'Kredit va mikromoliya' },
          { icon: Rocket, c: '#7C3AED', bg: '#F3EEFF', l: 'Biznes inkubatorlar' },
          { icon: Headphones, c: '#15528B', bg: '#EBF3FA', l: "Maslahat va qo'llab-quvvatlash" },
        ];

  return (
    <>
      <Helmet>
        <title>{t.nav.economy}</title>
      </Helmet>
      <PageHero
        title={ec.title}
        subtitle={ec.subtitle}
        image="/images/modern-office.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.economy}`}
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
                    <item.icon size={14} className="shrink-0" />
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
                  <h2 className="font-bold text-[#17243B] text-base mb-2">{ec.aboutTitle}</h2>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-3">{data.overview}</p>
                  <a href="#indicators" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg">
                    {t.common.readMore} →
                  </a>
                </div>
                <img src="/images/cotton-harvest.jpg" alt={ec.title} className="w-full sm:w-48 h-32 object-cover rounded-xl shrink-0" />
              </div>

              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5" id="indicators">
                <h3 className="font-bold text-[#17243B] text-sm mb-3">{ec.indicatorsTitle}</h3>
                {[
                  { icon: 'city', l: ec.gdpLabel, v: data.keyIndicators.gdp },
                  { icon: 'chart', l: ec.growthLabel, v: data.keyIndicators.growth },
                  { icon: 'users', l: ec.perCapitaLabel, v: data.keyIndicators.perCapita },
                  { icon: 'package', l: ec.enterprisesLabel, v: data.keyIndicators.enterprises },
                ].map((item) => (
                  <div key={item.l} className="flex items-center justify-between py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A] flex items-center gap-2">
                      <Icon3D name={item.icon} size={18} /> {item.l}
                    </span>
                    <span className="font-bold text-[#17243B]">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Dynamics Cards */}
            <div>
              <h2 className="font-bold text-[#17243B] text-base mb-3">{ec.dynamicsTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-xs text-[#17243B]">{ec.gdpGrowthTitle}</h3>
                    <span className="bg-[#319568] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">+6,8%</span>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={data.gdpGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                      <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#15528B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                  <h3 className="font-semibold text-xs text-[#17243B] mb-2">{ec.sectorsShareTitle}</h3>
                  <div className="grid grid-cols-2 items-center gap-2">
                    <div className="relative h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={data.sectors} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={38} outerRadius={62}>
                            {data.sectors.map((entry, idx) => (
                              <Cell key={idx} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs font-extrabold text-[#17243B]">42,3</span>
                        <span className="text-[9px] text-[#66758A]">trln</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {data.sectors.map((s) => (
                        <div key={s.name} className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                          <span className="text-[#66758A] truncate">{s.name}</span>
                          <span className="font-bold text-[#17243B] ml-auto">{s.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col justify-between">
                  <h3 className="font-semibold text-xs text-[#17243B] mb-3">{tradeLabels.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#319568] font-semibold">↗ {tradeLabels.exp}</span>
                        <span className="font-bold text-[#17243B]">663,2 mln $</span>
                      </div>
                      <div className="h-2.5 bg-[#E8F5EE] rounded-full overflow-hidden">
                        <div className="h-full bg-[#319568] rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#DC2626] font-semibold">↘ {tradeLabels.imp}</span>
                        <span className="font-bold text-[#17243B]">558,7 mln $</span>
                      </div>
                      <div className="h-2.5 bg-[#FEF2F2] rounded-full overflow-hidden">
                        <div className="h-full bg-[#EF4444] rounded-full" style={{ width: '72%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#EBF3FA] text-[#15528B] text-xs font-bold px-3 py-2 rounded-xl text-center">
                    {tradeLabels.bal}
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Main Sectors */}
            <div id="sectors">
              <h2 className="font-bold text-[#17243B] text-base mb-3">{ec.mainSectorsTitle}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {data.industries.map((ind) => (
                  <div key={ind.title} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                    <img src={ind.photo} alt={ind.title} className="w-full h-24 object-cover" />
                    <div className="p-3.5">
                      <h3 className="font-bold text-[#17243B] text-xs">{ind.title}</h3>
                      <p className="text-[11px] text-[#66758A] mt-1 leading-snug">{ind.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Investments + Infrastructure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="investments">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex gap-4 items-center">
                <img src="/images/urgench-modern.jpg" alt={ec.investmentsTitle} className="w-32 h-28 object-cover rounded-xl shrink-0 hidden sm:block" />
                <div className="flex-1 space-y-2.5">
                  <h2 className="font-bold text-[#17243B] text-sm">{ec.investmentsTitle}</h2>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-[#EBF3FA] rounded-xl text-center">
                      <div className="font-bold text-sm text-[#15528B]">{data.investments.total}</div>
                      <div className="text-[10px] text-[#66758A]">{ec.totalInvestments}</div>
                    </div>
                    <div className="p-2 bg-[#E8F5EE] rounded-xl text-center">
                      <div className="font-bold text-sm text-[#319568]">{data.investments.projects}</div>
                      <div className="text-[10px] text-[#66758A]">{ec.majorProjects}</div>
                    </div>
                    <div className="p-2 bg-[#FFF3E0] rounded-xl text-center">
                      <div className="font-bold text-sm text-[#C58B43]">{data.investments.jobs}</div>
                      <div className="text-[10px] text-[#66758A]">{ec.newJobs}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex gap-4 items-center">
                <img src="/images/highway-uz.jpg" alt={infraTitle} className="w-32 h-28 object-cover rounded-xl shrink-0 hidden sm:block" />
                <div className="flex-1">
                  <h2 className="font-bold text-[#17243B] text-sm mb-2">{infraTitle}</h2>
                  <ul className="space-y-1">
                    {infraItems.map((it) => (
                      <li key={it} className="flex items-center gap-1.5 text-xs text-[#66758A]">
                        <CheckCircle size={12} className="text-[#319568] shrink-0" /> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Entrepreneurship + Labor Market */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="labor">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h2 className="font-bold text-[#17243B] text-sm mb-4">{supportTitle}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {supportCards.map((c, idx) => (
                    <div key={c.l} className="p-3 rounded-xl border border-[#E5EAF0] text-center bg-[#FCFDFF]">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: c.bg }}>
                        <Icon3D name={['percent', 'coins', 'rocket', 'headphones'][idx] || 'coins'} alt={c.l} size={24} />
                      </div>
                      <div className="text-[11px] font-semibold text-[#17243B] leading-tight">{c.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-[#17243B] text-sm">{ec.laborTitle}</h2>
                  <span className="bg-[#319568] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">70,8%</span>
                </div>
                <ResponsiveContainer width="100%" height={125}>
                  <LineChart data={data.unemployment}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis domain={[65, 73]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#15528B" strokeWidth={2.5} dot={{ fill: '#15528B', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Prospects + Economy News */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" id="prospects">
              <div className="lg:col-span-7 bg-[#15528B] text-white rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-lg mb-2">{ec.prospectsTitle}</h2>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">{ec.prospectsDesc}</p>
                </div>
                <Link to="/ilm-fan" className="mt-4 inline-flex items-center gap-1.5 bg-white text-[#15528B] px-4 py-2 rounded-xl text-xs font-semibold w-fit">
                  {t.common.readMore} →
                </Link>
              </div>

              {ecoArticle && (
                <Link to={`/yangiliklar/${ecoArticle.slug}`} className="lg:col-span-5 bg-white border border-[#E5EAF0] rounded-2xl p-4 flex gap-3 items-center hover:shadow-md transition-shadow">
                  <img src={ecoArticle.photo} alt={ecoArticle.title} className="w-24 h-20 object-cover rounded-xl shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-[#319568] bg-[#E8F5EE] px-2 py-0.5 rounded-full">{ecoArticle.category}</span>
                    <h3 className="font-bold text-[#17243B] text-xs sm:text-sm mt-1.5 line-clamp-2">{ecoArticle.title}</h3>
                    <span className="text-[11px] text-[#66758A] flex items-center gap-1 mt-1.5">
                      <Calendar size={10} /> {ecoArticle.date}
                    </span>
                  </div>
                </Link>
              )}
            </div>

            <div className="bg-[#EBF3FA] rounded-2xl p-4 text-xs text-[#66758A]">⚠️ {t.common.approxNote}</div>
          </div>
        </div>
      </div>
    </>
  );
}
