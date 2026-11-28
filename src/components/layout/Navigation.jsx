import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { getNavItems } from '../../data/navigation';
import SearchModal from '../common/SearchModal';
import Icon3D from '../common/Icon3D';

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
          <nav className="bg-white border border-[#E5EAF0] rounded-xl shadow-xs px-1.5 xl:px-2.5">
            <div className="flex items-center justify-between h-11 gap-0.5 flex-nowrap">
              <Link
                to="/"
                className={`flex items-center gap-1 px-1 xl:px-2 py-2 text-[11px] xl:text-[13px] font-medium whitespace-nowrap relative shrink-0 ${
                  location.pathname === '/' ? 'text-[#0B4A6F] font-semibold' : 'text-[#66758A] hover:text-[#17243B]'
                }`}
              >
                <Icon3D name="home" size={18} />
                <span>{t.nav.home}</span>
                {location.pathname === '/' && <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#0B4A6F] rounded-t" />}
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
                    className={`flex items-center gap-1 px-1 xl:px-2 py-2 text-[11px] xl:text-[13px] font-medium whitespace-nowrap relative transition-colors ${
                      isActive(item.href) ? 'text-[#0B4A6F] font-semibold' : 'text-[#66758A] hover:text-[#17243B]'
                    }`}
                  >
                    <Icon3D name={item.icon} size={18} className="hidden lg:inline-block" />
                    <span>{item.label}</span>
                    {item.children && (
                      <ChevronDown
                        size={12}
                        strokeWidth={1.8}
                        className={`-ml-0.5 shrink-0 transition-transform ${openMenu === item.id ? 'rotate-180' : ''}`}
                      />
                    )}
                    {isActive(item.href) && <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#0B4A6F] rounded-t" />}
                  </Link>
                  {item.children && openMenu === item.id && (
                    <div className="absolute top-full left-0 mt-0.5 bg-white border border-[#E5EAF0] rounded-xl shadow-lg py-1.5 min-w-48 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.id}
                          to={child.href}
                          onClick={() => setOpenMenu(null)}
                          className="block px-4 py-2 text-sm text-[#66758A] hover:text-[#0B4A6F] hover:bg-[#F7F9FC]"
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
                  className="p-2 rounded-lg text-[#0B4A6F] hover:bg-[#EFF6FF] cursor-pointer"
                >
                  <Search size={18} strokeWidth={1.8} />
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
