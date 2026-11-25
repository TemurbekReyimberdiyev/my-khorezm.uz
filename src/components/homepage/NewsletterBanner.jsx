import { Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export default function NewsletterBanner() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section className="py-4">
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ background: 'linear-gradient(135deg, #1E64A5 0%, #15528B 55%, #123A61 100%)' }}
      >
        {/* Subtle Khiva skyline silhouette on right */}
        <svg
          className="hidden md:block absolute right-4 bottom-0 h-32 w-64 text-white/10 pointer-events-none"
          viewBox="0 0 260 120"
          fill="currentColor"
        >
          <rect x="40" y="55" width="32" height="65" rx="2" />
          <path d="M90 120 L90 70 Q115 45 140 70 L140 120 Z" />
          <rect x="160" y="20" width="22" height="100" rx="6" />
          <path d="M195 120 L195 60 Q220 35 245 60 L245 120 Z" />
        </svg>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Mail size={22} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl">{t.home.newsletterTitle}</h3>
            <p className="text-white/80 text-xs sm:text-sm mt-0.5">{t.home.newsletterSubtitle}</p>
          </div>
        </div>

        {sent ? (
          <div className="relative z-10 bg-white/20 rounded-xl px-6 py-3 text-white font-semibold text-sm">
            ✓ {t.home.newsletterSuccess}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSent(true);
            }}
            className="relative z-10 flex bg-white rounded-xl p-1.5 w-full md:w-auto shadow-sm"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.home.newsletterPlaceholder}
              className="flex-1 md:w-56 px-3 py-1.5 text-[#17243B] placeholder-[#94A3B8] outline-none text-sm bg-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#15528B] text-white font-semibold rounded-lg hover:bg-[#123A61] transition-colors text-xs sm:text-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {t.home.newsletterButton} <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
