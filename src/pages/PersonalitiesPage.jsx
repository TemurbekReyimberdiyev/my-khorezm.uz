import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getPersonalities } from '../data/personalities';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Badge from '../components/common/Badge';

export default function PersonalitiesPage() {
  const { language, t } = useLanguage();
  const pText = t.pages.personalities;
  const people = getPersonalities(language);

  const [catKey, setCatKey] = useState('all');
  const [q, setQ] = useState('');

  const cats = [
    { k: 'all', l: pText.cats.all },
    { k: 'scholars', l: pText.cats.scholars },
    { k: 'poets', l: pText.cats.poets },
    { k: 'spiritual', l: pText.cats.spiritual },
    { k: 'statesmen', l: pText.cats.statesmen },
  ];

  const filtered = people.filter((p) => {
    const matchC = catKey === 'all' || p.categoryKey === catKey;
    const matchQ = p.name.toLowerCase().includes(q.toLowerCase()) || p.shortBio.toLowerCase().includes(q.toLowerCase());
    return matchC && matchQ;
  });

  return (
    <>
      <Helmet>
        <title>{t.nav.personalities}</title>
      </Helmet>
      <PageHero
        title={pText.title}
        subtitle={pText.subtitle}
        image="/images/khiva-hero.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.personalities}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8D3E0]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.common.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 border border-[#E5EAF0] rounded-xl bg-white text-sm outline-none focus:border-[#15528B]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {cats.map((c) => (
              <button
                key={c.k}
                onClick={() => setCatKey(c.k)}
                className={`px-3 py-2 rounded-xl text-sm font-medium shrink-0 cursor-pointer ${
                  catKey === c.k ? 'bg-[#15528B] text-white' : 'bg-white border border-[#E5EAF0] text-[#66758A]'
                }`}
              >
                {c.l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/shaxslar/${p.slug}`}
              className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex gap-4 hover:shadow-md transition-shadow group"
            >
              <img
                src={p.photo}
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover shrink-0 border-2 border-[#E5EAF0] group-hover:border-[#15528B] transition-colors"
              />
              <div className="min-w-0">
                <Badge variant="primary" className="text-[10px] mb-2">
                  {p.category}
                </Badge>
                <h3 className="font-bold text-[#17243B] leading-tight">{p.name}</h3>
                <p className="text-xs text-[#66758A] mt-0.5">
                  {p.years} · {p.role}
                </p>
                <p className="text-xs text-[#66758A] leading-snug mt-2 line-clamp-2">{p.shortBio}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
