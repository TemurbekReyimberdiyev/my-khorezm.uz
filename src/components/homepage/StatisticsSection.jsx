import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import Icon3D from '../common/Icon3D';

const STAT_ICONS = ['users', 'map', 'city', 'history'];
const BGS = ['#EBF3FA', '#FFF3E0', '#F3EEFF', '#FFF8EE'];

export default function StatisticsSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon3D name="chart" size={24} />
          <h2 className="font-bold text-[#17243B] text-base sm:text-lg">{t.home.statsTitle}</h2>
        </div>
        <Link to="/iqtisodiyot" className="flex items-center gap-1 text-xs sm:text-sm text-[#15528B] font-medium hover:gap-2 transition-all">
          {t.home.statsMore} <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {t.home.homeStats.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-[#E5EAF0] bg-[#FCFDFF]">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5" style={{ backgroundColor: BGS[idx] }}>
              <Icon3D name={STAT_ICONS[idx]} alt={item.label} size={24} />
            </div>
            <div className="font-bold text-lg sm:text-xl text-[#17243B] leading-tight">{item.display}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
