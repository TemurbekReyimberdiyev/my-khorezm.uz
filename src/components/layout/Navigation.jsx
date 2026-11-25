import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { getNavItems } from '../../data/navigation';
import SearchModal from '../common/SearchModal';

export default function Navigation() {
  const location = useLocation();
  const { t } = useLanguage();
  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = getNavItems(t).filter((item) => item.id !== 'home');
  const isActive = (href) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <>
      <div className="hidden md:block bg-[#F7F9FC] pt-2.5 pb-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="bg-white border border-[#E5EAF0] rounded-xl shadow-xs px-2">
            <div className="flex items-center justify-between h-11 gap-0.5 flex-nowrap">
              <Link
                to="/"
                className={`flex items-center gap-1.5 px-2 xl:px-2.5 py-2 text-[13px] xl:text-sm font-medium whitespace-nowrap relative ${
                  location.pathname === '/' ? 'text-[#15528B] font-semibold' : 'text-[#66758A] hover:text-[#17243B]'
                }`}
              >
                <Home size={14} />
                {t.nav.home}
                {location.pathname === '/' && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#15528B] rounded-t" />}
              </Link>

              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group shrink-0"
                  onMouseEnter={() => item.children && setOpenMenu(item.id)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-0.5 px-1.5 xl:px-2.5 py-2 text-[13px] xl:text-sm font-medium whitespace-nowrap relative transition-colors ${
                      isActive(item.href) ? 'text-[#15528B] font-semibold' : 'text-[#66758A] hover:text-[#17243B]'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown size={12} className={`transition-transform ${openMenu === item.id ? 'rotate-180' : ''}`} />
                    )}
                    {isActive(item.href) && <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#15528B] rounded-t" />}
                  </Link>
                  {item.children && openMenu === item.id && (
                    <div className="absolute top-full left-0 mt-0.5 bg-white border border-[#E5EAF0] rounded-xl shadow-lg py-1.5 min-w-48 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.href}
                          onClick={() => setOpenMenu(null)}
                          className="block px-4 py-2 text-sm text-[#66758A] hover:text-[#15528B] hover:bg-[#F7F9FC]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="ml-auto shrink-0">
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label={t.nav.search}
                  className="p-2 rounded-lg text-[#66758A] hover:text-[#15528B] hover:bg-[#F7F9FC] cursor-pointer"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
