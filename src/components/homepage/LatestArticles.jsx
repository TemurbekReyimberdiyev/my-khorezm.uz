import { Link } from 'react-router-dom';
import { ArrowRight, Eye, CalendarDays } from 'lucide-react';
import { getArticles } from '../../data/articles';
import { useLanguage } from '../../hooks/useLanguage';
import Icon3D from '../common/Icon3D';

const badgeStyles = {
  tarix: 'bg-[#15528B] text-white',
  turizm: 'bg-[#C58B43] text-white',
  madaniyat: 'bg-[#C58B43] text-white',
  iqtisodiyot: 'bg-[#319568] text-white',
  ekologiya: 'bg-[#319568] text-white',
  talim: 'bg-[#7C3AED] text-white',
  texnologiya: 'bg-[#15528B] text-white',
};

export default function LatestArticles() {
  const { language, t } = useLanguage();
  const items = getArticles(language).slice(0, 4);

  return (
    <section className="py-4">
      <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Icon3D name="news" size={24} />
            <h2 className="font-bold text-[#17243B] text-lg">{t.home.articlesTitle}</h2>
          </div>
          <Link to="/yangiliklar" className="flex items-center gap-1 text-sm text-[#15528B] font-medium hover:gap-2 transition-all">
            {t.common.seeAll} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((a) => (
            <Link key={a.id} to={`/yangiliklar/${a.slug}`} className="group border border-[#E5EAF0] rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={a.photo}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold shadow-xs ${badgeStyles[a.categoryKey] || 'bg-[#15528B] text-white'}`}>
                  {a.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-bold text-[#17243B] leading-snug line-clamp-2 group-hover:text-[#15528B] transition-colors">
                  {a.title}
                </h3>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F7F9FC] text-xs text-[#66758A]">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={15} strokeWidth={1.8} className="text-[#F59E0B]" /> {a.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={15} strokeWidth={1.8} className="text-[#0B4A6F]" /> {a.views || '1.4K'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
