import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const PINS = [
  { id: 'qoshkopir', slug: 'qoshkopir-tumani', x: 108, y: 84, uz: "Qo'shko'pir", ru: 'Кошкупыр', en: 'Koshkupir' },
  { id: 'gurlan', slug: 'gurlan-tumani', x: 156, y: 36, uz: 'Gurlan', ru: 'Гурлен', en: 'Gurlan' },
  { id: 'yangibozor', slug: 'yangibozor-tumani', x: 170, y: 74, uz: 'Yangibozor', ru: 'Янгибазар', en: 'Yangibozor' },
  { id: 'shovot', slug: 'shovot-tumani', x: 128, y: 60, uz: 'Shovot', ru: 'Шават', en: 'Shavat' },
  { id: 'urganch', slug: 'urganch-shahar', x: 162, y: 98, main: true, uz: 'Urganch', ru: 'Ургенч', en: 'Urgench' },
  { id: 'xonqa', slug: 'xonqa-tumani', x: 196, y: 104, uz: 'Xonqa', ru: 'Ханка', en: 'Khonka' },
  { id: 'yangiariq', slug: 'yangiariq-tumani', x: 184, y: 132, uz: 'Yangiariq', ru: 'Янгиарык', en: 'Yangiariq' },
  { id: 'xiva', slug: 'xiva-shahar', x: 140, y: 130, main: true, uz: 'Xiva', ru: 'Хива', en: 'Khiva' },
  { id: 'bogot', slug: 'bogot-tumani', x: 214, y: 128, uz: "Bog'ot", ru: 'Багат', en: 'Bogot' },
  { id: 'hazorasp', slug: 'hazorasp-tumani', x: 236, y: 150, uz: 'Hazorasp', ru: 'Хазарасп', en: 'Khazarasp' },
  { id: 'tuproqqala', slug: 'tuproqqala-tumani', x: 266, y: 168, uz: "Tuproqqal'a", ru: 'Тупраккала', en: 'Tuproqqala' },
];

export default function KhorezmSvgMap({ variant = 'full', className = '' }) {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState(null);

  const neighborLabels = {
    uz: { kkp: "Qoraqalpog'iston\nRespublikasi", tkm: 'Turkmaniston', bhk: 'Buxoro\nviloyati', region: 'Xorazm\nviloyati', river: 'Amudaryo' },
    ru: { kkp: 'Республика\nКаракалпакстан', tkm: 'Туркменистан', bhk: 'Бухарская\nобласть', region: 'Хорезмская\nобласть', river: 'Амударья' },
    en: { kkp: 'Republic of\nKarakalpakstan', tkm: 'Turkmenistan', bhk: 'Bukhara\nRegion', region: 'Khorezm\nRegion', river: 'Amu Darya' },
  }[language] || { kkp: "Qoraqalpog'iston", tkm: 'Turkmaniston', bhk: 'Buxoro', region: 'Xorazm', river: 'Amudaryo' };

  const visiblePins = variant === 'simple' ? PINS.filter((p) => ['urganch', 'xiva', 'hazorasp', 'gurlan', 'shovot'].includes(p.id)) : PINS;

  return (
    <div className={`relative bg-[#EBF5FA] rounded-xl overflow-hidden border border-[#DCE7F2] ${className}`}>
      <svg viewBox="0 0 340 205" className="w-full h-full block">
        <defs>
          <linearGradient id="oasisFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EFFAD2" />
            <stop offset="60%" stopColor="#DFF4B8" />
            <stop offset="100%" stopColor="#C8ECA8" />
          </linearGradient>
        </defs>

        {/* Background neighboring territory */}
        <rect width="340" height="205" fill="#EEF5FB" />

        {/* Subtle Amu Darya River channel */}
        <path
          d="M 142 15 Q 175 45, 198 78 T 242 130 T 298 188 L 325 205"
          fill="none"
          stroke="#60A5FA"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Khorezm region silhouette */}
        <path
          d="M 122 20 L 165 22 L 185 48 L 210 72 L 236 112 L 285 152 L 302 184 L 252 188 L 218 164 L 180 156 L 136 154 L 106 132 L 74 112 L 88 76 L 105 42 Z"
          fill="url(#oasisFill)"
          stroke="#65A30D"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Neighbor labels */}
        <text x="242" y="42" fontSize="8" fill="#475569" fontWeight="600" textAnchor="middle">
          {neighborLabels.kkp.split('\n').map((line, i) => (
            <tspan key={i} x="242" dy={i === 0 ? 0 : 9}>{line}</tspan>
          ))}
        </text>
        <text x="52" y="156" fontSize="8" fill="#475569" fontWeight="600" textAnchor="middle">
          {neighborLabels.tkm}
        </text>
        <text x="304" y="118" fontSize="8" fill="#475569" fontWeight="600" textAnchor="middle">
          {neighborLabels.bhk.split('\n').map((line, i) => (
            <tspan key={i} x="304" dy={i === 0 ? 0 : 9}>{line}</tspan>
          ))}
        </text>
        <text x="228" y="182" fontSize="7.5" fill="#1D4ED8" fontStyle="italic" fontWeight="600" transform="rotate(32 228 182)">
          {neighborLabels.river}
        </text>

        {/* Pins */}
        {visiblePins.map((pin) => {
          const isHovered = hovered === pin.id;
          const label = pin[language] || pin.uz;
          return (
            <Link key={pin.id} to={`/tumanlar/${pin.slug}`}>
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHovered(pin.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={isHovered ? 6 : pin.main ? 4.5 : 3.4}
                  fill={pin.main ? '#DC2626' : '#15528B'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <text
                  x={pin.x + 6}
                  y={pin.y + 2.5}
                  fontSize={pin.main ? '8.5' : '7'}
                  fontWeight={pin.main ? '700' : '600'}
                  fill="#17243B"
                >
                  {label}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>
    </div>
  );
}
