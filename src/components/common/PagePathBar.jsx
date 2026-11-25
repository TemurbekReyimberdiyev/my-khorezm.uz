import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { getDistricts } from '../../data/districts';
import { getAttractions } from '../../data/attractions';
import { getPersonalities } from '../../data/personalities';
import { getRecipes } from '../../data/recipes';
import { getArticles } from '../../data/articles';

const normalize = (s) => (s || '').replace(/'/g, '').toLowerCase();

function resolveSegments(pathname, language, t) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  if (cleanPath === '/') return [];

  const staticRoutes = {
    '/geografiya': [{ label: t.nav.geography }],
    '/geografiya/iqlim': [{ label: t.nav.geography, href: '/geografiya' }, { label: t.nav.climate }],
    '/geografiya/suv-resurslari': [{ label: t.nav.geography, href: '/geografiya' }, { label: t.nav.waterResources }],
    '/geografiya/tuproq': [{ label: t.nav.geography, href: '/geografiya' }, { label: t.nav.soil }],
    '/geografiya/flora-fauna': [{ label: t.nav.geography, href: '/geografiya' }, { label: t.nav.floraFauna }],

    '/tarix': [{ label: t.nav.history }],
    '/tarix/qadimgi-xorazm': [{ label: t.nav.history, href: '/tarix' }, { label: t.nav.ancientKhorezm }],
    '/tarix/xorazmshohlar': [{ label: t.nav.history, href: '/tarix' }, { label: t.nav.khorezmshahs }],
    '/tarix/xiva-xonligi': [{ label: t.nav.history, href: '/tarix' }, { label: t.nav.khivaKhanate }],
    '/tarix/xorazm-tarixi': [{ label: t.nav.history, href: '/tarix' }, { label: t.nav.historyTimeline }],

    '/tumanlar': [{ label: t.nav.districts }],
    '/turizm': [{ label: t.nav.tourism }],
    '/xarita': [{ label: t.nav.tourism, href: '/turizm' }, { label: t.nav.map }],

    '/madaniyat': [{ label: t.nav.culture }],
    '/madaniyat/lugat': [{ label: t.nav.culture, href: '/madaniyat' }, { label: t.nav.dictionary }],
    '/lugat': [{ label: t.nav.culture, href: '/madaniyat' }, { label: t.nav.dictionary }],
    '/shaxslar': [{ label: t.nav.culture, href: '/madaniyat' }, { label: t.nav.personalities }],
    '/taomlar': [{ label: t.nav.culture, href: '/madaniyat' }, { label: t.nav.cuisine }],
    '/ilm-fan': [{ label: t.nav.culture, href: '/madaniyat' }, { label: t.nav.education }],
    '/ai-yordamchi': [{ label: t.nav.culture, href: '/madaniyat' }, { label: t.nav.aiAssistant }],

    '/iqtisodiyot': [{ label: t.nav.economy }],
    '/ekologiya': [{ label: t.nav.ecology }],
    '/yangiliklar': [{ label: t.nav.news }],

    '/media': [{ label: t.nav.media }],
    '/media/teleradio': [{ label: t.nav.media, href: '/media' }, { label: t.pages.tvRadio.breadcrumbCurrent }],

    '/qidiruv': [{ label: t.nav.search }],
  };

  if (staticRoutes[cleanPath]) return staticRoutes[cleanPath];

  const parts = cleanPath.split('/').filter(Boolean);
  if (parts.length === 2) {
    const [prefix, slug] = parts;
    if (prefix === 'tumanlar') {
      const item = getDistricts(language).find((d) => d.slug === slug || normalize(d.slug) === normalize(slug));
      return [{ label: t.nav.districts, href: '/tumanlar' }, { label: item?.name || slug }];
    }
    if (prefix === 'turizm') {
      const item = getAttractions(language).find((a) => a.slug === slug);
      return [{ label: t.nav.tourism, href: '/turizm' }, { label: item?.name || slug }];
    }
    if (prefix === 'shaxslar') {
      const item = getPersonalities(language).find((p) => p.slug === slug);
      return [
        { label: t.nav.culture, href: '/madaniyat' },
        { label: t.nav.personalities, href: '/shaxslar' },
        { label: item?.name || slug },
      ];
    }
    if (prefix === 'taomlar') {
      const item = getRecipes(language).find((r) => r.slug === slug);
      return [
        { label: t.nav.culture, href: '/madaniyat' },
        { label: t.nav.cuisine, href: '/taomlar' },
        { label: item?.name || slug },
      ];
    }
    if (prefix === 'yangiliklar') {
      const item = getArticles(language).find((a) => a.slug === slug);
      return [{ label: t.nav.news, href: '/yangiliklar' }, { label: item?.title || slug }];
    }
  }

  return parts.map((seg) => ({ label: seg }));
}

export default function PagePathBar({ variant = 'inline', className = '' }) {
  const { pathname } = useLocation();
  const { language, t } = useLanguage();

  const segments = resolveSegments(pathname, language, t);
  if (!segments.length) return null;

  const isHero = variant === 'hero';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1.5 flex-wrap text-xs sm:text-[13px] ${
        isHero
          ? 'text-white/80'
          : 'text-[#66758A] pb-3 border-b border-[#E5EAF0]/80'
      } ${className}`}
    >
      <Link
        to="/"
        className={`inline-flex items-center gap-1 font-medium transition-colors ${
          isHero ? 'hover:text-white' : 'hover:text-[#15528B]'
        }`}
      >
        <Home size={12} className={isHero ? 'text-white/80' : 'text-[#15528B]'} />
        <span>{t.nav.home}</span>
      </Link>

      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <span key={`${seg.label}-${i}`} className="inline-flex items-center gap-1.5 min-w-0">
            <span className={`font-medium select-none ${isHero ? 'text-white/50' : 'text-[#94A3B8]'}`}>/</span>
            {seg.href && !isLast ? (
              <Link
                to={seg.href}
                className={`transition-colors truncate max-w-[180px] sm:max-w-xs ${
                  isHero ? 'hover:text-white' : 'hover:text-[#15528B]'
                }`}
              >
                {seg.label}
              </Link>
            ) : (
              <span
                className={`font-semibold truncate max-w-[240px] sm:max-w-md ${
                  isHero ? 'text-white' : 'text-[#15528B]'
                }`}
              >
                {seg.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
