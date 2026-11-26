import { Helmet } from 'react-helmet-async';
import { getGeographyData } from '../../data/geography';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';
import Icon3D from '../../components/common/Icon3D';

const KPI_ICONS = ['leaf', 'waves', 'water', 'globe'];

export default function WaterPage() {
  const { language, t } = useLanguage();
  const geo = getGeographyData(language);
  const g = t.pages.geography;

  return (
    <>
      <Helmet>
        <title>{t.nav.waterResources}</title>
      </Helmet>
      <PageHero
        title={g.waterPageTitle}
        subtitle={g.waterPageSubtitle}
        image="/images/amudarya-oasis.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.geography} > ${t.nav.waterResources}`}
      />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Water stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {geo.waterStats.map((s, idx) => (
            <div key={s.l} className="bg-white border border-[#E5EAF0] rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] flex items-center justify-center mx-auto mb-2">
                <Icon3D name={KPI_ICONS[idx] || 'water'} alt={s.l} size={26} />
              </div>
              <div className="font-bold text-[#15528B] text-base sm:text-lg">{s.v}</div>
              <div className="text-xs text-[#66758A] mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Rivers, Reservoir & Canals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {geo.rivers.map((r, idx) => (
            <div key={r.name} className="bg-white border border-[#E5EAF0] rounded-2xl p-5 hover:shadow-sm transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F7FA] flex items-center justify-center shrink-0">
                    <Icon3D name={idx % 2 === 0 ? 'waves' : 'water'} alt={r.name} size={24} />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF3FA] text-[#15528B]">{r.role}</span>
                </div>
                <h3 className="font-bold text-[#17243B] text-sm sm:text-base">{r.name}</h3>
                <p className="text-xs sm:text-sm text-[#66758A] mt-2 leading-relaxed">{r.desc}</p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#F7F9FC] text-xs font-bold text-[#15528B]">{r.length}</div>
            </div>
          ))}
        </div>

        {/* Hydrology System Overview */}
        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Icon3D name="water" size={24} />
            <h2 className="font-bold text-[#17243B] text-lg">{g.waterMainTitle}</h2>
          </div>
          <p className="text-sm text-[#66758A] leading-relaxed">{geo.waterSummary}</p>
        </div>

        <p className="text-xs text-[#66758A]">{geo.sourceNote}</p>
      </div>
    </>
  );
}
