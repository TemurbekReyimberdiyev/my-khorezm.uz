import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { getArticles } from '../data/articles';
import { getAttractions } from '../data/attractions';
import { getDistricts } from '../data/districts';
import { getPersonalities } from '../data/personalities';
import { getRecipes } from '../data/recipes';
import { useLanguage } from '../hooks/useLanguage';
import Badge from '../components/common/Badge';
import PagePathBar from '../components/common/PagePathBar';

export default function SearchPage() {
  const { language, t } = useLanguage();
  const sText = t.pages.search;
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const index = useMemo(() => {
    const idx = [];
    getArticles(language).forEach((a) =>
      idx.push({ id: 'a' + a.id, title: a.title, desc: a.excerpt || '', type: a.category, category: t.nav.news, href: `/yangiliklar/${a.slug}`, photo: a.photo })
    );
    getAttractions(language).forEach((a) =>
      idx.push({ id: 't' + a.id, title: a.name, desc: a.description || '', type: a.category, category: t.nav.tourism, href: `/turizm/${a.slug}`, photo: a.photo })
    );
    getDistricts(language).forEach((d) =>
      idx.push({ id: 'd' + d.id, title: d.name, desc: d.description || '', type: d.typeKey === 'city' ? t.pages.districts.typeCity : t.pages.districts.typeDistrict, category: t.nav.districts, href: `/tumanlar/${d.slug}`, photo: d.photo })
    );
    getPersonalities(language).forEach((p) =>
      idx.push({ id: 'p' + p.id, title: p.name, desc: p.shortBio || '', type: p.category, category: t.nav.personalities, href: `/shaxslar/${p.slug}`, photo: p.photo })
    );
    getRecipes(language).forEach((r) =>
      idx.push({ id: 'r' + r.id, title: r.name, desc: r.description || '', type: r.category, category: t.nav.cuisine, href: `/taomlar/${r.slug}`, photo: r.photo })
    );
    return idx;
  }, [language, t]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return index.filter((item) => item.title.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term));
  }, [q, index]);

  const groups = results.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
      <Helmet>
        <title>{t.nav.search}</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PagePathBar variant="inline" className="mb-5" />
        <h1 className="text-2xl font-bold text-[#17243B] mb-6">{sText.title}</h1>
        <div className="relative mb-8">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8D3E0]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setParams(e.target.value ? { q: e.target.value } : {});
            }}
            placeholder={sText.placeholder}
            className="w-full pl-12 pr-4 py-4 border-2 border-[#E5EAF0] rounded-2xl bg-white text-base outline-none focus:border-[#15528B]"
          />
        </div>
        {q && results.length === 0 && (
          <div className="text-center py-16 text-[#66758A]">
            "<span className="font-semibold text-[#17243B]">{q}</span>" — {t.common.noResults}
          </div>
        )}
        {Object.entries(groups).map(([cat, items]) => (
          <div key={cat} className="mb-8">
            <h2 className="font-bold text-[#17243B] mb-3 flex items-center gap-2">
              {cat}
              <span className="text-sm font-normal text-[#66758A]">({items.length})</span>
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className="flex items-center gap-4 bg-white border border-[#E5EAF0] rounded-xl p-4 hover:shadow-md transition-shadow group"
                >
                  {item.photo && <img src={item.photo} alt={item.title} className="w-16 h-14 object-cover rounded-lg shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#17243B] group-hover:text-[#15528B]">{item.title}</div>
                    <p className="text-sm text-[#66758A] truncate mt-0.5">{item.desc}</p>
                    <Badge variant="primary" className="mt-1 text-[10px]">
                      {item.type}
                    </Badge>
                  </div>
                  <ArrowRight size={16} className="text-[#C8D3E0] group-hover:text-[#15528B] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ))}
        {!q && <div className="text-center py-16 text-[#66758A]">{sText.enterPrompt}</div>}
      </div>
    </>
  );
}
