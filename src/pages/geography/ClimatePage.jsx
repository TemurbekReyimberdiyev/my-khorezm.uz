import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getGeographyData } from '../../data/geography';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';

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
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="mt-6 space-y-6">
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <h2 className="font-bold text-[#17243B] mb-4">{g.tempChartTitle}</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={geo.climate.avgTemps}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="temp" fill="#15528B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <h2 className="font-bold text-[#17243B] mb-4">{g.precipChartTitle}</h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={geo.climate.precipitation}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F7F9FC" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="mm" stroke="#319568" strokeWidth={2} dot={{ r: 4, fill: '#319568' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {geo.climate.seasons.map((s) => (
              <div key={s.name} className="bg-white border border-[#E5EAF0] rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-[#17243B]">{s.name}</h3>
                <p className="text-xs text-[#66758A] mt-1">{s.months}</p>
                <p className="text-sm font-bold text-[#15528B] mt-2">{s.temp}</p>
                <p className="text-xs text-[#66758A] mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
