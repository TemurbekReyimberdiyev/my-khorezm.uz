import { Helmet } from 'react-helmet-async';
import { Waves, Droplet } from 'lucide-react';
import { getGeographyData } from '../../data/geography';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';

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
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {geo.rivers.map((r) => (
            <div key={r.name} className="bg-white border border-[#E5EAF0] rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <Waves size={22} className="text-[#15528B] mb-3" />
              <h3 className="font-bold text-[#17243B]">{r.name}</h3>
              <p className="text-sm text-[#66758A] mt-2">{r.desc}</p>
              <div className="mt-3 text-sm font-semibold text-[#15528B]">{r.length}</div>
              <div className="text-xs text-[#66758A] mt-1">{r.role}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Droplet size={20} className="text-[#15528B]" />
            <h2 className="font-bold text-[#17243B] text-lg">{g.waterMainTitle}</h2>
          </div>
          <p className="text-sm text-[#66758A] leading-relaxed">{geo.overview}</p>
        </div>
      </div>
    </>
  );
}
