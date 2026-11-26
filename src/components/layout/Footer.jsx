import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import DonateModal from '../common/DonateModal';
import Icon3D from '../common/Icon3D';

export default function Footer() {
  const { language, t } = useLanguage();
  const [donateOpen, setDonateOpen] = useState(false);

  const mainLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.geography, href: '/geografiya' },
    { label: t.nav.history, href: '/tarix' },
    { label: t.nav.districts, href: '/tumanlar' },
    { label: t.nav.tourism, href: '/turizm' },
  ];

  const popularLinks = [
    { label: t.nav.culture, href: '/madaniyat' },
    { label: t.nav.economy, href: '/iqtisodiyot' },
    { label: t.nav.ecology, href: '/ekologiya' },
    { label: t.nav.news, href: '/yangiliklar' },
    { label: t.nav.media, href: '/media' },
  ];

  const mobileLabel =
    language === 'ru'
      ? 'Мобильное приложение (скоро)'
      : language === 'en'
        ? 'Mobile app (coming soon)'
        : 'Mobil ilova (tez orada)';

  return (
    <>
      <footer className="bg-white border-t border-[#E5EAF0] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-7 items-start">
            {/* Logo & Socials */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-3">
                <img
                  src="/images/logo-khorezm.png"
                  alt={t.siteName}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <div className="flex gap-2 mt-4">
                {[
                  { icon: 'telegram', href: '#telegram', label: 'Telegram' },
                  { icon: 'youtube', href: '#youtube', label: 'YouTube' },
                  { icon: 'instagram', href: '#instagram', label: 'Instagram' },
                  { icon: 'facebook', href: '#facebook', label: 'Facebook' },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center hover:bg-[#EBF3FA] hover:scale-105 transition-all"
                  >
                    <Icon3D name={icon} alt={label} size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* Main Sections */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-[#17243B] mb-3 text-sm">{t.footer.sections}</h4>
              <ul className="space-y-1.5">
                {mainLinks.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-xs text-[#66758A] hover:text-[#15528B]">
                      › {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-[#17243B] mb-3 text-sm">{t.footer.popular}</h4>
              <ul className="space-y-1.5">
                {popularLinks.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-xs text-[#66758A] hover:text-[#15528B]">
                      › {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info + Mobile App */}
            <div className="lg:col-span-3 space-y-5">
              <div>
                <h4 className="font-semibold text-[#17243B] mb-3 text-sm">{t.footer.contacts}</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-[#66758A]">
                    <Icon3D name="map-pin" size={16} className="mt-0.5" /> {t.footer.address}
                  </li>
                  <li className="flex items-start gap-2 text-xs text-[#66758A]">
                    <Icon3D name="mail" size={16} className="mt-0.5" /> info@my-khorezm.uz
                  </li>
                  <li className="flex items-start gap-2 text-xs text-[#66758A]">
                    <Icon3D name="phone" size={16} className="mt-0.5" /> +998 62 223 45 67
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[#17243B] mb-2 text-xs">{mobileLabel}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 bg-[#17243B] text-white px-2.5 py-1.5 rounded-lg text-xs">
                    <Icon3D name="app-store" alt="App Store" size={20} />
                    <div className="min-w-0">
                      <div className="text-[8px] text-white/70 leading-none truncate">Download on the</div>
                      <div className="font-semibold text-[11px] leading-tight truncate">App Store</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#17243B] text-white px-2.5 py-1.5 rounded-lg text-xs">
                    <Icon3D name="google-play" alt="Google Play" size={20} />
                    <div className="min-w-0">
                      <div className="text-[8px] text-white/70 leading-none truncate">GET IT ON</div>
                      <div className="font-semibold text-[11px] leading-tight truncate">Google Play</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Donate Card matching reference design */}
            <div className="sm:col-span-2 lg:col-span-3">
              <div className="relative overflow-hidden rounded-2xl bg-[#FCF8EE] border border-[#E2C898] p-4 shadow-2xs">
                {/* Subtle Khiva skyline silhouette */}
                <svg
                  className="absolute right-0 bottom-0 h-24 w-32 text-[#C58B43]/15 pointer-events-none"
                  viewBox="0 0 140 100"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 100 L12 72 Q26 56 40 72 L40 100 Z" />
                  <path d="M46 100 L46 62 Q66 42 86 62 L86 100 Z" />
                  <rect x="96" y="16" width="16" height="84" rx="4" />
                  <path d="M96 16 L104 4 L112 16 Z" />
                  <rect x="118" y="48" width="18" height="52" rx="2" />
                </svg>

                <div className="relative z-10">
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E6D6B5] flex items-center justify-center shrink-0">
                      <Icon3D name="donate" size={26} />
                    </div>
                    <h4 className="font-bold text-[#17243B] text-sm leading-snug">{t.donate.cardTitle}</h4>
                  </div>

                  <p className="text-xs text-[#66758A] leading-relaxed mb-3.5">{t.donate.cardDesc}</p>

                  <button
                    type="button"
                    onClick={() => setDonateOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#2A74BA] to-[#15528B] hover:from-[#15528B] hover:to-[#123A61] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
                  >
                    <Icon3D name="heart" size={18} />
                    <span>{t.donate.cardButton}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5EAF0] py-4 bg-[#F7F9FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#66758A]">{t.footer.rights}</p>
            <div className="flex gap-4 text-xs text-[#66758A]">
              <Link to="/qidiruv" className="hover:text-[#15528B]">{t.footer.terms}</Link>
              <Link to="/ai-yordamchi" className="hover:text-[#15528B]">{t.nav.aiAssistant}</Link>
              <Link to="/lugat" className="hover:text-[#15528B]">{t.nav.dictionary}</Link>
            </div>
          </div>
        </div>
      </footer>

      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
