import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Calendar, Clock, Eye, Share2, ArrowLeft, Tag } from 'lucide-react';
import { getArticles } from '../data/articles';
import { useLanguage } from '../hooks/useLanguage';
import Badge from '../components/common/Badge';
import PageHero from '../components/common/PageHero';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const nText = t.pages.news;
  const articles = getArticles(language);
  const article = articles.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#17243B] mb-4">{nText.notFound}</h1>
        <Link to="/yangiliklar" className="text-[#15528B] flex items-center gap-1 justify-center">
          <ArrowLeft size={16} /> {nText.backToNews}
        </Link>
      </div>
    );
  }

  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortTitle = article.title.length > 36 ? `${article.title.slice(0, 35).trim()}…` : article.title;

  return (
    <>
      <Helmet>
        <title>{shortTitle}</title>
      </Helmet>
      <PageHero
        title={article.title}
        image={article.photo}
        badge={<Badge variant="primary">{article.category}</Badge>}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[#66758A]">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye size={14} /> {article.views || '1.2K'} {t.common.views}
              </span>
              <button onClick={handleShare} className="flex items-center gap-1 ml-auto hover:text-[#15528B] cursor-pointer">
                <Share2 size={14} /> {copied ? t.common.copied : t.common.share}
              </button>
            </div>

            <div className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden mb-6">
              <img src={article.photo} alt={article.title} className="w-full h-64 sm:h-80 object-cover" />
              <div className="p-6">
                <p className="text-[#17243B] font-medium text-base leading-relaxed">{article.excerpt}</p>
                <div className="border-t border-[#F7F9FC] mt-5 pt-5">
                  <p className="text-sm text-[#66758A] leading-relaxed">{article.content}</p>
                </div>
              </div>
            </div>

            {article.tags && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-[#66758A]" />
                {article.tags.map((tag) => (
                  <span key={tag} className="bg-[#F7F9FC] border border-[#E5EAF0] px-3 py-1 rounded-full text-xs text-[#66758A]">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
              <h3 className="font-bold text-[#17243B] mb-3 text-sm">{nText.otherArticles}</h3>
              {articles
                .filter((a) => a.id !== article.id)
                .slice(0, 4)
                .map((a) => (
                  <Link key={a.id} to={`/yangiliklar/${a.slug}`} className="flex gap-2 mb-3 last:mb-0 group">
                    <img src={a.photo} alt={a.title} className="w-12 h-10 object-cover rounded-lg shrink-0" />
                    <p className="text-xs text-[#17243B] leading-snug line-clamp-2 group-hover:text-[#15528B]">{a.title}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <h2 className="font-bold text-[#17243B] text-lg mt-8 mb-4">{nText.relatedArticles}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((a) => (
            <Link
              key={a.id}
              to={`/yangiliklar/${a.slug}`}
              className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
            >
              <img src={a.photo} alt={a.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-[#17243B] line-clamp-2 group-hover:text-[#15528B]">{a.title}</h3>
                <p className="text-xs text-[#66758A] mt-1">{a.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
