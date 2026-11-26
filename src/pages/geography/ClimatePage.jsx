import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getGeographyData } from '../../data/geography';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';
import Icon3D from '../../components/common/Icon3D';

const HIGHLIGHT_ICONS = ['sun', 'rain', 'thermometer', 'calendar'];
const SEASON_ICONS = ['leaf', 'sun', 'tree', 'snow'];

export default function ClimatePage() {
  const { language, t } = useLanguage();
  const geo = getGeographyData(language);
  const g = t.pages.geography;

  return (
    <>
      <Helmet>
        <title>{t.nav.climate}</title>
      </Helmet>
      <PageHero
        title={g.climatePageTitle}
        subtitle={g.climatePageSubtitle}
        image="/images/kyzylkum-desert.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.geography} > ${t.nav.climate}`}
      />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Highlights KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {geo.climate.highlights.map((item, idx) => (
            <div key={item.l} className="bg-white border border-[#E5EAF0] rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#F7F9FC] flex items-center justify-center mx-auto mb-2">
                <Icon3D name={HIGHLIGHT_ICONS[idx] || 'sun'} alt={item.l} size={26} />
              </div>
              <div className="font-bold text-[#15528B] text-base sm:text-lg">{item.v}</div>
              <div className="text-xs text-[#66758A] mt-0.5">{item.l}</div>
            </div>
          ))}
        </div>

        {/* Climate Summary */}
        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2.5">
            <Icon3D name="partly-cloudy-day" size={24} />
            <h2 className="font-bold text-[#17243B] text-base">{g.climateTitle}</h2>
          </div>
          <p className="text-sm text-[#66758A] leading-relaxed">{geo.climate.description}</p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <h2 className="font-bold text-[#17243B] mb-4">{g.tempChartTitle}</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={geo.climate.avgTemps}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="temp" fill="#15528B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <h2 className="font-bold text-[#17243B] mb-4">{g.precipChartTitle}</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={geo.climate.precipitation}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="mm" stroke="#319568" strokeWidth={2.5} dot={{ r: 4, fill: '#319568' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seasons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {geo.climate.seasons.map((s, idx) => (
            <div key={s.name} className="bg-white border border-[#E5EAF0] rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <Icon3D name={SEASON_ICONS[idx] || 'sun'} alt={s.name} size={24} />
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F7F9FC] text-[#66758A]">{s.months}</span>
              </div>
              <h3 className="font-bold text-[#17243B]">{s.name}</h3>
              <p className="text-sm font-bold text-[#15528B] mt-1">{s.temp}</p>
              <p className="text-xs text-[#66758A] mt-1.5 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#66758A]">{geo.sourceNote}</p>
      </div>
    </>
  );
}
