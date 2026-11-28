import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { getNavItems } from '../../data/navigation';
import Icon3D from '../common/Icon3D';

export default function MobileMenu({ open, onClose }) {
  const location = useLocation();
  const { language, changeLanguage, t } = useLanguage();
  const [expanded, setExpanded] = useState(null);
  const onCloseRef = useRef(onClose);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Close drawer only when navigating to a different route
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      onCloseRef.current();
    }
  }, [location.pathname]);

  // Close on Escape and prevent background scroll while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const navGroups = getNavItems(t);
  const extraLinks = [
    { icon: 'map', label: t.nav.map, href: '/xarita' },
    { icon: 'bot', label: t.nav.aiAssistant, href: '/ai-yordamchi' },
    { icon: 'graduation', label: t.nav.education, href: '/ilm-fan' },
    { icon: 'search', label: t.nav.search, href: '/qidiruv' },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex md:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" onClick={onClose} />
      <div className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-[#E5EAF0] sticky top-0 bg-white z-10">
          <Link to="/" onClick={onClose} className="flex items-center">
            <img src="/images/logo-khorezm.png" alt={t.siteName} className="h-8 w-auto object-contain" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F7F9FC] text-[#17243B] cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navGroups.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isOpen = expanded === item.id;
            const active =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname === item.href || location.pathname.startsWith(item.href + '/');

            if (!hasChildren) {
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active ? 'bg-[#EFF6FF] text-[#0B4A6F]' : 'text-[#17243B] hover:bg-[#F7F9FC]'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon3D name={item.icon} size={19} />
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight size={16} strokeWidth={1.8} className="text-[#C8D3E0]" />
                </Link>
              );
            }

            return (
              <div key={item.id} className="rounded-xl overflow-hidden">
                <div className="flex items-center">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-l-xl text-sm font-medium transition-colors ${
                      active ? 'bg-[#EFF6FF] text-[#0B4A6F]' : 'text-[#17243B] hover:bg-[#F7F9FC]'
                    }`}
                  >
                    <Icon3D name={item.icon} size={19} />
                    <span>{item.label}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.id)}
                    aria-label={item.label}
                    aria-expanded={isOpen}
                    className={`p-2.5 rounded-r-xl transition-colors cursor-pointer ${
                      active ? 'bg-[#EFF6FF] text-[#0B4A6F]' : 'text-[#66758A] hover:bg-[#F7F9FC]'
                    }`}
                  >
                    <ChevronDown size={16} strokeWidth={1.8} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {isOpen && (
                  <div className="pl-3 pr-1 py-1 space-y-0.5 bg-[#F7F9FC]/70">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        to={child.href}
                        onClick={onClose}
                        className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          location.pathname === child.href
                            ? 'text-[#15528B] bg-[#EBF3FA]'
                            : 'text-[#66758A] hover:text-[#15528B] hover:bg-white'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-2 mt-2 border-t border-[#E5EAF0] space-y-1">
            {extraLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'bg-[#EFF6FF] text-[#0B4A6F]'
                    : 'text-[#17243B] hover:bg-[#F7F9FC]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon3D name={item.icon} size={19} />
                  <span>{item.label}</span>
                </span>
                <ChevronRight size={16} strokeWidth={1.8} className="text-[#C8D3E0]" />
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-[#E5EAF0] sticky bottom-0 bg-white">
          <div className="flex gap-2">
            {['uz', 'ru', 'en'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => changeLanguage(lang)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold uppercase cursor-pointer transition-colors ${
                  language === lang ? 'bg-[#15528B] text-white' : 'border border-[#E5EAF0] text-[#66758A] hover:text-[#17243B]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
