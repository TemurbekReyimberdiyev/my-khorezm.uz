import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export default function Breadcrumbs({ items = [] }) {
  const { t } = useLanguage();
  return (
    <nav className="flex items-center gap-1.5 text-sm text-[#66758A] flex-wrap">
      <Link to="/" className="flex items-center gap-1 hover:text-[#15528B]">
        <Home size={13} /> {t.nav.home}
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-[#94A3B8]">/</span>
          {item.href && i < items.length - 1 ? (
            <Link to={item.href} className="hover:text-[#15528B]">{item.label}</Link>
          ) : (
            <span className="text-[#15528B] font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
