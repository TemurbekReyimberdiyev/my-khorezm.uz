import { Helmet } from 'react-helmet-async';
import { getGeographyData } from '../../data/geography';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';
import Icon3D from '../../components/common/Icon3D';

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
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Biosphere Reserve Highlight */}
        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] flex items-center justify-center shrink-0">
            <Icon3D name="shield" size={28} />
          </div>
          <div>
            <h2 className="font-bold text-[#17243B] text-base sm:text-lg mb-1.5">{geo.biosphereNote.title}</h2>
            <p className="text-sm text-[#66758A] leading-relaxed">{geo.biosphereNote.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <Icon3D name="tree" size={26} />
              <h2 className="font-bold text-[#17243B]">{floraHeading}</h2>
            </div>
            <ul className="space-y-2.5">
              {geo.flora.map((item) => (
                <li key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#E8F5EE] text-[#17243B] text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#319568] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <Icon3D name="award" size={26} />
              <h2 className="font-bold text-[#17243B]">{faunaHeading}</h2>
            </div>
            <ul className="space-y-2.5">
              {geo.fauna.map((item) => (
                <li key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFF3E0] text-[#17243B] text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#C58B43] shrink-0" />
                  <span>{item}</span>
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
