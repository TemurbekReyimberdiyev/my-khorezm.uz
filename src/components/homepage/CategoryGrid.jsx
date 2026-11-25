import { Link } from 'react-router-dom';
import { Mountain, Landmark, MapPin, Camera, Music4, UtensilsCrossed, TrendingUp, Leaf } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export default function CategoryGrid() {
  const { t } = useLanguage();

  const categories = [
    { icon: Mountain, label: t.categories.geography, href: '/geografiya', color: '#319568', bg: '#E8F5EE' },
    { icon: Landmark, label: t.categories.history, href: '/tarix', color: '#15528B', bg: '#EBF3FA' },
    { icon: MapPin, label: t.categories.districts, href: '/tumanlar', color: '#7C3AED', bg: '#F3EEFF' },
    { icon: Camera, label: t.categories.tourism, href: '/turizm', color: '#0891B2', bg: '#E0F7FA' },
    { icon: Music4, label: t.categories.culture, href: '/madaniyat', color: '#DB2777', bg: '#FDE8F3' },
    { icon: UtensilsCrossed, label: t.categories.cuisine, href: '/taomlar', color: '#EA580C', bg: '#FFF1E6' },
    { icon: TrendingUp, label: t.categories.economy, href: '/iqtisodiyot', color: '#15528B', bg: '#EBF3FA' },
    { icon: Leaf, label: t.categories.ecology, href: '/ekologiya', color: '#319568', bg: '#E8F5EE' },
  ];

  return (
    <section className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map(({ icon: Icon, label, href, color, bg }) => (
          <Link
            key={href}
            to={href}
            className="bg-white border border-[#E5EAF0] rounded-xl p-3 flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all group text-center"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: bg }}>
              <Icon size={20} style={{ color }} />
            </div>
            <span className="text-xs text-[#17243B] font-medium leading-tight whitespace-pre-line">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
