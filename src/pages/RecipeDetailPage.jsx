import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { getRecipes } from '../data/recipes';
import { useLanguage } from '../hooks/useLanguage';
import Badge from '../components/common/Badge';
import PageHero from '../components/common/PageHero';
import Icon3D from '../components/common/Icon3D';
import ImageLightbox from '../components/common/ImageLightbox';

export default function RecipeDetailPage() {
  const { slug } = useParams();
  return <RecipeDetailContent key={slug} slug={slug} />;
}

function RecipeDetailContent({ slug }) {
  const { language, t } = useLanguage();
  const cu = t.pages.cuisine;
  const recipes = getRecipes(language);
  const recipe = recipes.find((r) => r.slug === slug);
  const [checked, setChecked] = useState([]);
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  if (!recipe) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#17243B] mb-4">{cu.notFound}</h1>
        <Link to="/taomlar" className="text-[#15528B] flex items-center gap-1 justify-center">
          <ArrowLeft size={16} /> {t.common.back}
        </Link>
      </div>
    );
  }

  const related = recipes.filter((r) => r.id !== recipe.id).slice(0, 3);
  const toggleCheck = (i) => setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  return (
    <>
      <Helmet>
        <title>{recipe.name}</title>
      </Helmet>
      <PageHero
        title={recipe.name}
        subtitle={`${recipe.category} · ${recipe.cookTime} · ${recipe.servings} ${cu.servingsUnit}`}
        image={recipe.photo}
        badge={<Badge variant="accent">{recipe.category}</Badge>}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <Link to="/taomlar" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] hover:underline">
            <ArrowLeft size={14} /> {t.common.back}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6 items-stretch">
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => setLightboxIdx(0)}
              className="relative group w-full h-full block cursor-pointer rounded-2xl overflow-hidden border border-[#E5EAF0]"
            >
              <img
                src={recipe.photo}
                alt={recipe.name}
                className="w-full h-64 lg:h-full min-h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={15} />
              </span>
            </button>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon3D name="cuisine" size={20} />
                <h2 className="font-bold text-[#17243B] text-base">{recipe.name}</h2>
              </div>
              <p className="text-sm text-[#66758A] leading-relaxed">{recipe.description}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: 'clock', l: cu.cookTime, v: recipe.cookTime },
                { icon: 'calendar', l: cu.prepTime, v: recipe.prepTime },
                { icon: 'users', l: cu.servings, v: `${recipe.servings} ${cu.servingsUnit}` },
                { icon: 'chef', l: cu.difficulty, v: recipe.difficulty },
              ].map((item) => (
                <div key={item.l} className="bg-white border border-[#E5EAF0] rounded-xl p-3 text-center">
                  <div className="flex justify-center mb-1.5">
                    <Icon3D name={item.icon} size={22} />
                  </div>
                  <div className="text-xs text-[#66758A]">{item.l}</div>
                  <div className="font-semibold text-[#17243B] text-sm">{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ImageLightbox
          items={[{ src: recipe.photo, title: recipe.name, subtitle: recipe.category }]}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(-1)}
          onChange={setLightboxIdx}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon3D name="cuisine" size={20} />
              <h2 className="font-bold text-[#17243B]">{cu.ingredients}</h2>
            </div>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleCheck(i)}>
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      checked.includes(i) ? 'bg-[#15528B] border-[#15528B]' : 'border-[#E5EAF0]'
                    }`}
                  >
                    {checked.includes(i) && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${checked.includes(i) ? 'line-through text-[#C8D3E0]' : 'text-[#17243B]'}`}>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon3D name="chef" size={20} />
              <h2 className="font-bold text-[#17243B]">{cu.steps}</h2>
            </div>
            <ol className="space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EBF3FA] text-[#15528B] text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#66758A] leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h2 className="font-bold text-[#17243B] text-lg mb-4">{cu.related}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {related.map((r) => (
            <Link
              key={r.id}
              to={`/taomlar/${r.slug}`}
              className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden flex gap-3 p-3 hover:shadow-md transition-shadow"
            >
              <img src={r.photo} alt={r.name} className="w-16 h-14 object-cover rounded-xl shrink-0" />
              <div>
                <div className="font-semibold text-[#17243B] text-sm">{r.name}</div>
                <div className="text-xs text-[#66758A] mt-1">{r.cookTime}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
