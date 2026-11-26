import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getPersonalities } from '../../data/personalities';
import { useLanguage } from '../../hooks/useLanguage';
import Icon3D from '../common/Icon3D';

export default function PersonalitiesStrip() {
  const { language, t } = useLanguage();
  const people = getPersonalities(language);

  return (
    <section className="py-2">
      <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="lg:w-60 shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <Icon3D name="award" size={24} />
              <h2 className="font-bold text-[#17243B] text-lg">{t.home.personalitiesTitle}</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{t.home.personalitiesSubtitle}</p>
            <Link
              to="/shaxslar"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-3.5 py-2 rounded-lg hover:bg-[#EBF3FA] transition-colors"
            >
              {t.common.seeAll} <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 flex-1">
            {people.slice(0, 6).map((p) => (
              <Link key={p.id} to={`/shaxslar/${p.slug}`} className="flex flex-col items-center gap-2 group">
                <div className="w-full aspect-square rounded-xl overflow-hidden border border-[#E5EAF0] bg-[#FAF6EF] group-hover:border-[#15528B] transition-colors">
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                </div>
                <span className="text-xs text-[#17243B] font-semibold text-center leading-tight line-clamp-2 group-hover:text-[#15528B]">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
