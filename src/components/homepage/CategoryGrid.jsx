import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import Icon3D from '../common/Icon3D';

export default function CategoryGrid() {
  const { t } = useLanguage();

  const categories = [
    { icon: 'cat-geography', label: t.categories.geography, href: '/geografiya', bg: '#ECFDF5' },
    { icon: 'cat-history', label: t.categories.history, href: '/tarix', bg: '#FFFBEB' },
    { icon: 'cat-districts', label: t.categories.districts, href: '/tumanlar', bg: '#F0FDFA' },
    { icon: 'cat-tourism', label: t.categories.tourism, href: '/turizm', bg: '#EFF6FF' },
    { icon: 'cat-culture', label: t.categories.culture, href: '/madaniyat', bg: '#F0FDFA' },
    { icon: 'cat-cuisine', label: t.categories.cuisine, href: '/taomlar', bg: '#FFFBEB' },
    { icon: 'cat-economy', label: t.categories.economy, href: '/iqtisodiyot', bg: '#FFFBEB' },
    { icon: 'cat-ecology', label: t.categories.ecology, href: '/ekologiya', bg: '#ECFDF5' },
  ];

  return (
    <section className="py-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map(({ icon, label, href, bg }) => (
          <Link
            key={href}
            to={href}
            className="bg-white border border-[#E5EAF0] rounded-xl p-3 flex flex-col items-center gap-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all group text-center"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform"
              style={{ backgroundColor: bg }}
            >
              <Icon3D name={icon} alt={label} size={34} />
            </div>
            <span className="text-xs text-[#17243B] font-medium leading-tight whitespace-pre-line">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
