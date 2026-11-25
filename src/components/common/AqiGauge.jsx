export default function AqiGauge({ value = 50, label = 'Yaxshi' }) {
  const clamped = Math.min(200, Math.max(0, value));
  const angle = -90 + (clamped / 200) * 180;

  const badgeStyle =
    value <= 50
      ? 'bg-[#DCFCE7] text-[#15803D]'
      : value <= 100
        ? 'bg-[#FEF3C7] text-[#B45309]'
        : value <= 150
          ? 'bg-orange-100 text-orange-700'
          : 'bg-red-100 text-red-700';

  return (
    <div className="flex flex-col items-center justify-center">
      <svg viewBox="0 0 140 85" className="w-36 h-22">
        <path d="M 15 70 A 55 55 0 0 1 42 22" fill="none" stroke="#22C55E" strokeWidth="10" strokeLinecap="round" />
        <path d="M 46 20 A 55 55 0 0 1 94 20" fill="none" stroke="#FACC15" strokeWidth="10" />
        <path d="M 98 22 A 55 55 0 0 1 121 50" fill="none" stroke="#F97316" strokeWidth="10" />
        <path d="M 123 54 A 55 55 0 0 1 125 70" fill="none" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />

        <g transform={`translate(70, 70) rotate(${angle})`}>
          <polygon points="-2.5,0 0,-42 2.5,0" fill="#17243B" />
          <circle cx="0" cy="0" r="4" fill="#17243B" />
        </g>

        <text x="70" y="60" textAnchor="middle" fontSize="18" fontWeight="800" fill="#17243B">
          {value}
        </text>
      </svg>
      <span className={`mt-1 px-3 py-0.5 rounded-full text-xs font-bold ${badgeStyle}`}>
        {label}
      </span>
    </div>
  );
}
