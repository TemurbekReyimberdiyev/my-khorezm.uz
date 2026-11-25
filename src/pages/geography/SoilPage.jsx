import { Helmet } from 'react-helmet-async';
import { Layers, CheckCircle } from 'lucide-react';
import { getGeographyData } from '../../data/geography';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';

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
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {geo.soilTypes.map((soil) => (
            <div key={soil.name} className="bg-white border border-[#E5EAF0] rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <Layers size={20} className="text-[#C58B43]" />
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFF3E0] text-[#C58B43]">{soil.share}</span>
              </div>
              <h3 className="font-bold text-[#17243B]">{soil.name}</h3>
              <p className="text-sm text-[#66758A] mt-2 leading-relaxed">{soil.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-white border border-[#E5EAF0] rounded-2xl p-6">
          <h2 className="font-bold text-[#17243B] mb-3">{g.factsTitle}</h2>
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
    </>
  );
}
