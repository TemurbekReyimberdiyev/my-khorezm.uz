import { Helmet } from 'react-helmet-async';
import { TreePine, Bird } from 'lucide-react';
import { getGeographyData } from '../../data/geography';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';

export default function FloraFaunaPage() {
  const { language, t } = useLanguage();
  const geo = getGeographyData(language);
  const g = t.pages.geography;

  const floraHeading = language === 'ru' ? 'Растительный мир (Флора)' : language === 'en' ? 'Plant Life (Flora)' : "O'simlik dunyosi (Flora)";
  const faunaHeading = language === 'ru' ? 'Животный мир (Фауна)' : language === 'en' ? 'Wildlife (Fauna)' : 'Hayvonot dunyosi (Fauna)';

  return (
    <>
      <Helmet>
        <title>{t.nav.floraFauna}</title>
      </Helmet>
      <PageHero
        title={g.floraPageTitle}
        subtitle={g.floraPageSubtitle}
        image="/images/flora-gazelle.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.geography} > ${t.nav.floraFauna}`}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TreePine size={20} className="text-[#319568]" />
              <h2 className="font-bold text-[#17243B]">{floraHeading}</h2>
            </div>
            <ul className="space-y-2.5">
              {geo.flora.map((item) => (
                <li key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#E8F5EE] text-[#17243B] text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#319568]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bird size={20} className="text-[#C58B43]" />
              <h2 className="font-bold text-[#17243B]">{faunaHeading}</h2>
            </div>
            <ul className="space-y-2.5">
              {geo.fauna.map((item) => (
                <li key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFF3E0] text-[#17243B] text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#C58B43]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
