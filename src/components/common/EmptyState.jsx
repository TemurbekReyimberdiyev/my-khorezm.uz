import { useLanguage } from '../../hooks/useLanguage';

export default function EmptyState({ title, description = '', icon: Icon, action }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon ? (
        <div className="w-16 h-16 rounded-full bg-[#EEF3FA] flex items-center justify-center mb-4">
          <Icon className="h-8 w-8 text-[#15528B] opacity-60" />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-[#EEF3FA] flex items-center justify-center mb-4">
          <svg viewBox="0 0 48 48" className="h-8 w-8 opacity-40" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#15528B" strokeWidth="2.5" />
            <path d="M16 24h16M24 16v16" stroke="#15528B" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#17243B] mb-1">{title || t.common.noResults}</h3>
      {description && <p className="text-sm text-[#66758A] max-w-xs mb-4">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
