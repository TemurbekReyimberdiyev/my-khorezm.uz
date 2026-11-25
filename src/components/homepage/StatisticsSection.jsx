import { Users, Map, Building, History, BarChart2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const ICONS = [Users, Map, Building, History];
const COLORS = [
  { color: '#15528B', bg: '#EBF3FA' },
  { color: '#C58B43', bg: '#FFF3E0' },
  { color: '#7C3AED', bg: '#F3EEFF' },
  { color: '#C58B43', bg: '#FFF8EE' },
];

export default function StatisticsSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart2 size={19} className="text-[#15528B]" />
          <h2 className="font-bold text-[#17243B] text-base sm:text-lg">{t.home.statsTitle}</h2>
        </div>
        <Link to="/iqtisodiyot" className="flex items-center gap-1 text-xs sm:text-sm text-[#15528B] font-medium hover:gap-2 transition-all">
          {t.home.statsMore} <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {t.home.homeStats.map((item, idx) => {
          const Icon = ICONS[idx];
          const { color, bg } = COLORS[idx];
          return (
            <div key={idx} className="p-3.5 rounded-xl border border-[#E5EAF0] bg-[#FCFDFF]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5" style={{ backgroundColor: bg }}>
                <Icon size={17} style={{ color }} />
              </div>
              <div className="font-bold text-lg sm:text-xl text-[#17243B] leading-tight">{item.display}</div>
              <div className="text-xs text-[#66758A] mt-0.5">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
