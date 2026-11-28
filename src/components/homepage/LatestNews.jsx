import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { getArticles } from '../../data/articles';
import { useLanguage } from '../../hooks/useLanguage';
import Badge from '../common/Badge';
import Icon3D from '../common/Icon3D';

export default function LatestNews() {
  const { language, t } = useLanguage();
  const topNews = getArticles(language)[0];

  if (!topNews) return null;

  return (
    <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon3D name="news" size={24} />
          <h2 className="font-bold text-[#17243B] text-base sm:text-lg">{t.home.newsTitle}</h2>
        </div>
        <Link to="/yangiliklar" className="flex items-center gap-1 text-xs sm:text-sm text-[#15528B] font-medium hover:gap-2 transition-all">
          {t.home.newsMore} <ArrowRight size={14} />
        </Link>
      </div>

      <Link to={`/yangiliklar/${topNews.slug}`} className="flex gap-4 items-center p-3 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] hover:bg-white hover:shadow-sm transition-all group">
        <img src={topNews.photo} alt={topNews.title} className="w-28 h-24 object-cover rounded-xl shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#17243B] leading-snug line-clamp-2 group-hover:text-[#15528B] transition-colors">
            {topNews.title}
          </p>
          <div className="flex items-center flex-wrap gap-2 mt-2.5">
            <span className="text-xs text-[#66758A] flex items-center gap-1">
              <CalendarDays size={15} strokeWidth={1.8} className="text-[#F59E0B]" /> {topNews.date}
            </span>
            <Badge variant="primary" className="text-[10px]">
              {topNews.category}
            </Badge>
          </div>
        </div>
      </Link>
    </div>
  );
}
