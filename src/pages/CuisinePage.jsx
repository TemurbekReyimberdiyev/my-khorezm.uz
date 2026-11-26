import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getRecipes } from '../data/recipes';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Badge from '../components/common/Badge';
import Icon3D from '../components/common/Icon3D';

const diffColor = { easy: 'success', medium: 'accent', hard: 'red' };

export default function CuisinePage() {
  const { language, t } = useLanguage();
  const cu = t.pages.cuisine;
  const recipes = getRecipes(language);
  const [catKey, setCatKey] = useState('all');

  const cats = [
    { k: 'all', l: cu.cats.all },
    { k: 'first', l: cu.cats.first },
    { k: 'second', l: cu.cats.second },
    { k: 'bakery', l: cu.cats.bakery },
  ];

  const filtered = catKey === 'all' ? recipes : recipes.filter((r) => r.categoryKey === catKey);

  return (
    <>
      <Helmet>
        <title>{t.nav.cuisine}</title>
      </Helmet>
      <PageHero
        title={cu.title}
        subtitle={cu.subtitle}
        image="/images/khorezm-cuisine.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.cuisine}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {cats.map((c) => (
            <button
              key={c.k}
              onClick={() => setCatKey(c.k)}
              className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 cursor-pointer ${
                catKey === c.k ? 'bg-[#15528B] text-white' : 'bg-white border border-[#E5EAF0] text-[#66758A]'
              }`}
            >
              {c.l}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => (
            <Link
              key={r.id}
              to={`/taomlar/${r.slug}`}
              className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="relative h-52">
                <img src={r.photo} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 right-2">
                  <Badge variant={diffColor[r.difficultyKey] || 'primary'}>{r.difficulty}</Badge>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#17243B] text-base">{r.name}</h3>
                <p className="text-sm text-[#66758A] mt-1 line-clamp-2">{r.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-[#66758A]">
                  <span className="flex items-center gap-1.5">
                    <Icon3D name="clock" size={16} /> {r.cookTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon3D name="chef" size={16} /> {r.difficulty}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-sm text-[#15528B] font-semibold">
                  {cu.viewRecipe} <ChevronRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
