import { Helmet } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';
import { getGeographyData } from '../../data/geography';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';
import Icon3D from '../../components/common/Icon3D';

export default function SoilPage() {
  const { language, t } = useLanguage();
  const geo = getGeographyData(language);
  const g = t.pages.geography;

  return (
    <>
      <Helmet>
        <title>{t.nav.soil}</title>
      </Helmet>
      <PageHero
        title={g.soilPageTitle}
        subtitle={g.soilPageSubtitle}
        image="/images/soil-oasis.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.geography} > ${t.nav.soil}`}
      />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Soil overview */}
        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-2.5">
            <Icon3D name="layers" size={24} />
            <h2 className="font-bold text-[#17243B] text-base sm:text-lg">{g.soilCoverTitle}</h2>
          </div>
          <p className="text-sm text-[#66758A] leading-relaxed">{geo.soilOverview}</p>
        </div>

        {/* Soil Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {geo.soilTypes.map((soil, idx) => (
            <div key={soil.name} className="bg-white border border-[#E5EAF0] rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] flex items-center justify-center">
                  <Icon3D name={idx === 0 ? 'leaf' : idx === 1 ? 'water' : 'layers'} alt={soil.name} size={24} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF3E0] text-[#C58B43]">{soil.share}</span>
              </div>
              <h3 className="font-bold text-[#17243B]">{soil.name}</h3>
              <p className="text-sm text-[#66758A] mt-2 leading-relaxed">{soil.desc}</p>
            </div>
          ))}
        </div>

        {/* Resources + Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Icon3D name="coins" size={22} />
              <h2 className="font-bold text-[#17243B]">{g.resourcesTitle}</h2>
            </div>
            <ul className="space-y-2">
              {geo.resources.map((res) => (
                <li key={res} className="flex items-start gap-2 text-sm text-[#66758A]">
                  <CheckCircle size={16} className="text-[#C58B43] shrink-0 mt-0.5" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Icon3D name="compass" size={22} />
              <h2 className="font-bold text-[#17243B]">{g.factsTitle}</h2>
            </div>
            <ul className="space-y-2">
              {geo.facts.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[#66758A]">
                  <CheckCircle size={16} className="text-[#319568] shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-[#66758A]">{geo.sourceNote}</p>
      </div>
    </>
  );
}
