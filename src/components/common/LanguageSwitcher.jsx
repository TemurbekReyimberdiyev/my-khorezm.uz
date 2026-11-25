import { useLanguage } from '../../hooks/useLanguage';

const LANGUAGES = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher({ compact = false }) {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-[#F0F4F8] rounded-md p-0.5">
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              ${compact ? 'px-1.5 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold'}
              rounded transition-all duration-200 select-none
              ${isActive
                ? 'bg-[#15528B] text-white shadow-sm'
                : 'text-[#66758A] hover:text-[#17243B] hover:bg-white'
              }
            `}
            aria-label={`Switch to ${lang.label}`}
            title={lang.label}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
