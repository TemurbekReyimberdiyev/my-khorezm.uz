import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import Icon3D from '../common/Icon3D';

export default function CategoryGrid() {
  const { t } = useLanguage();

  const categories = [
    { icon: 'mountain', label: t.categories.geography, href: '/geografiya', bg: '#E8F5EE' },
    { icon: 'museum', label: t.categories.history, href: '/tarix', bg: '#EBF3FA' },
    { icon: 'map', label: t.categories.districts, href: '/tumanlar', bg: '#F3EEFF' },
    { icon: 'camera', label: t.categories.tourism, href: '/turizm', bg: '#E0F7FA' },
    { icon: 'music', label: t.categories.culture, href: '/madaniyat', bg: '#FDE8F3' },
    { icon: 'cuisine', label: t.categories.cuisine, href: '/taomlar', bg: '#FFF1E6' },
    { icon: 'chart', label: t.categories.economy, href: '/iqtisodiyot', bg: '#EBF3FA' },
    { icon: 'leaf', label: t.categories.ecology, href: '/ekologiya', bg: '#E8F5EE' },
  ];

  return (
    <section className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map(({ icon, label, href, bg }) => (
          <Link
            key={href}
            to={href}
            className="bg-white border border-[#E5EAF0] rounded-xl p-3 flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all group text-center"
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform" style={{ backgroundColor: bg }}>
              <Icon3D name={icon} alt={label} size={28} />
            </div>
            <span className="text-xs text-[#17243B] font-medium leading-tight whitespace-pre-line">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
