/**
 * Bespoke Khorezm duotone vector SVG icon set crafted directly to match
 * the my-khorezm.uz regional encyclopedia icon specification:
 * - Navy Primary: #0B4A6F
 * - Teal Accent:  #0EA5A6
 * - Gold Accent:  #F59E0B (dark shade #D97706)
 * - Green Accent: #1E9B3E
 */

const BASE_SVG = {
  viewBox: '0 0 32 32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

/* ---------- 1. NAVIGATION ICONS (Row 1) ---------- */

export function IconNavHome({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 15L16 5L28 15" stroke="#0B4A6F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14V26.5C7 27.3 7.7 28 8.5 28H23.5C24.3 28 25 27.3 25 26.5V14L16 6.8L7 14Z" fill="#0B4A6F" />
      <path d="M13 28V20C13 18.3 14.3 17 16 17C17.7 17 19 18.3 19 20V28H13Z" fill="#FFFFFF" />
      <path d="M21 8.8L25 12V7.5H21V8.8Z" fill="#0EA5A6" />
    </svg>
  );
}

export function IconNavGeography({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 19L11.5 9L17 16L21.5 11.5L28 19" stroke="#1E9B3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 12.2L12.5 13.5L14 12" stroke="#1E9B3E" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 22.5C8 20.5 13 24.5 18 22C22.5 19.8 25.5 21 29 22.5" stroke="#0EA5A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 26C10.5 24.2 15.5 27.2 21 25C24 23.8 26.5 24.5 28.5 25.5" stroke="#0EA5A6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconNavHistory({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M5 9V6.5H8V9H10.5V6.5H13.5V12H18.5V6.5H21.5V9H24V6.5H27V27H20V20.5C20 18.3 18.2 16.5 16 16.5C13.8 16.5 12 18.3 12 20.5V27H5V9Z"
        fill="#F59E0B"
      />
      <rect x="7.5" y="12.5" width="2" height="3" rx="0.6" fill="#FFFBEB" />
      <rect x="22.5" y="12.5" width="2" height="3" rx="0.6" fill="#FFFBEB" />
      <path d="M14 27V21.2C14 20 14.9 19 16 19C17.1 19 18 20 18 21.2V27H14Z" fill="#B45309" />
    </svg>
  );
}

export function IconNavDistricts({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      {/* Minaret on left */}
      <path d="M6.5 27L8 10H10.5L12 27H6.5Z" fill="#F59E0B" />
      <path d="M7.5 10C7.5 8.5 8.5 7 9.25 6C10 7 11 8.5 11 10H7.5Z" fill="#D97706" />
      <rect x="8.2" y="13" width="2.1" height="1.4" rx="0.4" fill="#FFFBEB" />
      {/* Dome building center-right */}
      <path d="M13 27V18.5H26V27H13Z" fill="#F59E0B" />
      <path d="M14.5 18.5C14.5 14.6 16.8 12.2 19.5 11C22.2 12.2 24.5 14.6 24.5 18.5H14.5Z" fill="#0EA5A6" />
      <path d="M19.5 8.5V11" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.5 27V22C17.5 20.9 18.4 20 19.5 20C20.6 20 21.5 20.9 21.5 22V27H17.5Z" fill="#FFFBEB" />
    </svg>
  );
}

export function IconNavTourism({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M16 4C11.2 4 7.5 7.7 7.5 12.4C7.5 16.4 10.7 19.8 12.6 22.5H19.4C21.3 19.8 24.5 16.4 24.5 12.4C24.5 7.7 20.8 4 16 4Z"
        fill="#F59E0B"
      />
      <path d="M16 4C13.6 7 12.5 10.4 12.5 14.2C12.5 17.5 13.4 20.3 14.2 22.5" stroke="#FFFBEB" strokeWidth="1.4" />
      <path d="M16 4C18.4 7 19.5 10.4 19.5 14.2C19.5 17.5 18.6 20.3 17.8 22.5" stroke="#FFFBEB" strokeWidth="1.4" />
      <line x1="13.5" y1="22.5" x2="14" y2="25" stroke="#0B4A6F" strokeWidth="1.4" />
      <line x1="18.5" y1="22.5" x2="18" y2="25" stroke="#0B4A6F" strokeWidth="1.4" />
      <rect x="13" y="25" width="6" height="3.5" rx="0.9" fill="#D97706" />
    </svg>
  );
}

export function IconNavCulture({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      {/* Left small turret */}
      <rect x="6" y="15" width="3.5" height="12" rx="0.5" fill="#0B4A6F" />
      <path d="M6 15C6 13.3 7.75 12 7.75 12C7.75 12 9.5 13.3 9.5 15H6Z" fill="#0EA5A6" />
      {/* Center portal & turquoise dome */}
      <path d="M11 27V16.5H21V27H11Z" fill="#0EA5A6" />
      <path d="M12.5 16.5C12.5 12.8 14.2 10.2 16 9C17.8 10.2 19.5 12.8 19.5 16.5H12.5Z" fill="#0B4A6F" />
      <line x1="16" y1="6.5" x2="16" y2="9" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.5 27V21.5C13.5 19.8 14.6 18.5 16 18.5C17.4 18.5 18.5 19.8 18.5 21.5V27H13.5Z" fill="#FFFFFF" />
      {/* Right small turret */}
      <rect x="22.5" y="15" width="3.5" height="12" rx="0.5" fill="#0B4A6F" />
      <path d="M22.5 15C22.5 13.3 24.25 12 24.25 12C24.25 12 26 13.3 26 15H22.5Z" fill="#0EA5A6" />
    </svg>
  );
}

export function IconNavEconomy({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <rect x="5" y="20" width="4" height="7" rx="1" fill="#0EA5A6" />
      <rect x="11" y="16" width="4" height="11" rx="1" fill="#0B4A6F" />
      <rect x="17" y="13" width="4" height="14" rx="1" fill="#0EA5A6" />
      <rect x="23" y="9" width="4" height="18" rx="1" fill="#0B4A6F" />
      <path d="M6 15L14 10.5L19.5 11.5L26 6" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.5 6H26V9.5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconNavEcology({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M7 25C7 14 14 7 25 6C25.5 17 19.5 25 9.5 25H7Z"
        fill="#1E9B3E"
      />
      <path d="M6.5 26.5C11 21 16 15.5 21.5 11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 19L17.5 18.5M16 15.5L19.5 15" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconNavNews({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <rect x="4" y="7" width="24" height="18" rx="2.5" stroke="#0B4A6F" strokeWidth="2" fill="#FFFFFF" />
      <rect x="7.5" y="10.5" width="7" height="6" rx="1" fill="#0EA5A6" />
      <line x1="17" y1="11.5" x2="24.5" y2="11.5" stroke="#0B4A6F" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17" y1="15" x2="24.5" y2="15" stroke="#0B4A6F" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="7.5" y1="19.8" x2="24.5" y2="19.8" stroke="#0B4A6F" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconNavMedia({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <rect x="4" y="6.5" width="24" height="16.5" rx="2.5" stroke="#0B4A6F" strokeWidth="2" fill="#FFFFFF" />
      <polygon points="13.5,11 20.5,14.8 13.5,18.6" fill="#0B4A6F" />
      <line x1="16" y1="23" x2="16" y2="26.5" stroke="#0B4A6F" strokeWidth="2" />
      <line x1="11" y1="26.5" x2="21" y2="26.5" stroke="#0B4A6F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- 2. CATEGORY CARD ICONS (Row 2) ---------- */

export function IconCatGeography({ size = 32, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      {/* Sun */}
      <circle cx="19.5" cy="9" r="3" fill="#F59E0B" />
      {/* Mountains */}
      <path d="M3.5 22L10.5 11.5L15.5 18L19.5 13L25 22H3.5Z" fill="#0EA5A6" fillOpacity="0.22" stroke="#0B4A6F" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Green trees */}
      <path d="M24 22L26.5 15.5L29 22H24Z" fill="#1E9B3E" />
      <path d="M20.5 22L22.5 17L24.5 22H20.5Z" fill="#1E9B3E" />
      {/* Flowing river */}
      <path d="M3 25.5C9 23.5 15 27.5 21.5 25C25 23.8 27.5 24.4 29 25.4" stroke="#0EA5A6" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconCatDistricts({ size = 32, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      {/* Isometric folded map */}
      <path d="M4 17.5L11.5 15L20.5 17.5L28 15V26L20.5 28.5L11.5 26L4 28.5V17.5Z" fill="#0EA5A6" fillOpacity="0.88" />
      <path d="M11.5 15V26M20.5 17.5V28.5" stroke="#FFFFFF" strokeWidth="1.5" />
      {/* Gold Location Pin */}
      <path
        d="M16 4C12.4 4 9.5 6.8 9.5 10.4C9.5 15 16 21.5 16 21.5C16 21.5 22.5 15 22.5 10.4C22.5 6.8 19.6 4 16 4Z"
        fill="#F59E0B"
      />
      <circle cx="16" cy="10.4" r="2.7" fill="#FFFFFF" />
    </svg>
  );
}

export function IconCatTourism({ size = 32, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M11.5 8L13 5.5H19L20.5 8H26C27.4 8 28.5 9.1 28.5 10.5V24C28.5 25.4 27.4 26.5 26 26.5H6C4.6 26.5 3.5 25.4 3.5 24V10.5C3.5 9.1 4.6 8 6 8H11.5Z"
        fill="#0B4A6F"
      />
      <circle cx="16" cy="17.2" r="5.5" fill="#FFFFFF" />
      <circle cx="16" cy="17.2" r="3.4" fill="#0B4A6F" />
      <circle cx="24" cy="12" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

export function IconCatCulture({ size = 32, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      {/* Khorezmian 8-pointed ceramic girih ornament */}
      <rect x="7" y="7" width="18" height="18" rx="1.5" fill="#0B4A6F" />
      <rect x="7" y="7" width="18" height="18" rx="1.5" transform="rotate(45 16 16)" fill="#0EA5A6" />
      <circle cx="16" cy="16" r="5.5" fill="#F59E0B" />
      <circle cx="16" cy="16" r="2.6" fill="#FFFFFF" />
      <circle cx="16" cy="5.5" r="1.1" fill="#F59E0B" />
      <circle cx="16" cy="26.5" r="1.1" fill="#F59E0B" />
      <circle cx="5.5" cy="16" r="1.1" fill="#F59E0B" />
      <circle cx="26.5" cy="16" r="1.1" fill="#F59E0B" />
    </svg>
  );
}

export function IconCatCuisine({ size = 32, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      {/* Three rising steam curves */}
      <path d="M11 11.5C10 9.8 12 8.2 11 6.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 10.5C15 8.8 17 7.2 16 5.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M21 11.5C20 9.8 22 8.2 21 6.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      {/* Gold kosa / bowl */}
      <path d="M5 15H27C27 21.5 22.2 26 16 26C9.8 26 5 21.5 5 15Z" fill="#F59E0B" />
      <ellipse cx="16" cy="15" rx="11" ry="2.2" fill="#D97706" />
      <rect x="11.5" y="25.8" width="9" height="2" rx="1" fill="#B45309" />
    </svg>
  );
}

export function IconCatEconomy({ size = 32, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <rect x="5" y="20" width="4.5" height="7" rx="1" fill="#F59E0B" fillOpacity="0.65" />
      <rect x="11.5" y="15.5" width="4.5" height="11.5" rx="1" fill="#F59E0B" fillOpacity="0.82" />
      <rect x="18" y="11" width="4.5" height="16" rx="1" fill="#F59E0B" />
      <rect x="24.5" y="6.5" width="4.5" height="20.5" rx="1" fill="#D97706" />
    </svg>
  );
}

export function IconCatEcology({ size = 32, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      {/* Left main green leaf */}
      <path d="M16 25C16 15 11.5 9.5 4.5 9C4.5 17 8.8 23.5 16 25Z" fill="#1E9B3E" />
      {/* Right twin sprout leaf */}
      <path d="M16 25C16 14 20.8 7 27.5 6.5C27.5 15.5 23 23 16 25Z" fill="#1E9B3E" fillOpacity="0.82" />
      <path d="M16 27.5V16" stroke="#1E9B3E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- 3. STATISTICS & EXTRA ICONS (Row 3) ---------- */

export function IconStatPopulation({ size = 25, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="16" cy="10.5" r="3.5" stroke="#0B4A6F" strokeWidth="1.9" />
      <path d="M10.5 24C10.5 20.5 12.9 18 16 18C19.1 18 21.5 20.5 21.5 24" stroke="#0B4A6F" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="8.5" cy="13" r="2.6" stroke="#0EA5A6" strokeWidth="1.8" />
      <path d="M4.5 23C4.5 20.3 6.2 18.5 8.5 18.5" stroke="#0EA5A6" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="23.5" cy="13" r="2.6" stroke="#0EA5A6" strokeWidth="1.8" />
      <path d="M27.5 23C27.5 20.3 25.8 18.5 23.5 18.5" stroke="#0EA5A6" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconStatArea({ size = 25, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <polygon points="16,5 28,11.5 16,18 4,11.5" fill="#1E9B3E" fillOpacity="0.22" stroke="#1E9B3E" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4 16.5L16 23L28 16.5" stroke="#F59E0B" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 21.5L16 28L28 21.5" stroke="#F59E0B" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconStatDistricts({ size = 25, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      {/* Central civic building */}
      <rect x="11.5" y="9" width="9" height="18" rx="1" fill="#0B4A6F" />
      <rect x="4.5" y="14" width="6" height="13" rx="0.8" fill="#0EA5A6" />
      <rect x="21.5" y="14" width="6" height="13" rx="0.8" fill="#0EA5A6" />
      <rect x="13.5" y="12" width="2" height="2.2" fill="#FFFFFF" />
      <rect x="16.5" y="12" width="2" height="2.2" fill="#FFFFFF" />
      <rect x="13.5" y="16" width="2" height="2.2" fill="#FFFFFF" />
      <rect x="16.5" y="16" width="2" height="2.2" fill="#FFFFFF" />
      <rect x="14.5" y="21.5" width="3" height="5.5" fill="#FFFFFF" />
    </svg>
  );
}

export function IconStatHeritage({ size = 25, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <polygon points="16,5 27.5,11.5 4.5,11.5" fill="#F59E0B" />
      <rect x="6" y="12.5" width="20" height="2" rx="0.6" fill="#D97706" />
      <line x1="8.5" y1="15" x2="8.5" y2="24" stroke="#F59E0B" strokeWidth="2.4" />
      <line x1="13.5" y1="15" x2="13.5" y2="24" stroke="#F59E0B" strokeWidth="2.4" />
      <line x1="18.5" y1="15" x2="18.5" y2="24" stroke="#F59E0B" strokeWidth="2.4" />
      <line x1="23.5" y1="15" x2="23.5" y2="24" stroke="#F59E0B" strokeWidth="2.4" />
      <rect x="4.5" y="24.5" width="23" height="2.5" rx="0.8" fill="#D97706" />
    </svg>
  );
}

export function IconMapView({ size = 24, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4.5 9L11.5 6.5L20.5 9L27.5 6.5V24L20.5 26.5L11.5 24L4.5 26.5V9Z" stroke="#0EA5A6" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M11.5 6.5V24M20.5 9V26.5" stroke="#0EA5A6" strokeWidth="1.6" />
      <path
        d="M16 7.5C13.8 7.5 12 9.2 12 11.4C12 14.3 16 18.2 16 18.2C16 18.2 20 14.3 20 11.4C20 9.2 18.2 7.5 16 7.5Z"
        fill="#F59E0B"
      />
      <circle cx="16" cy="11.4" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

export function IconWeatherPartlyCloudy({ size = 22, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <circle cx="20.5" cy="11.5" r="4.2" fill="#F59E0B" />
      <path d="M20.5 4.5V6M26.5 11.5H28M24.8 7.2L25.8 6.2M24.8 15.8L25.8 16.8" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M8.5 24.5H21.5C23.7 24.5 25.5 22.8 25.5 20.6C25.5 18.6 24 16.9 22 16.7C21.3 13.5 18.5 11.2 15.1 11.2C11.2 11.2 8 14.3 8 18.2C5.8 18.5 4.2 20.3 4.2 22.5C4.2 23.6 5.2 24.5 8.5 24.5Z"
        fill="#FFFFFF"
        stroke="#0B4A6F"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconWindAirQuality({ size = 18, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <path d="M4 11.5H19.5C21.4 11.5 22.5 10.3 22.5 8.8C22.5 7.3 21.3 6.2 19.8 6.2C18.4 6.2 17.5 7.1 17.3 8.2" stroke="#0EA5A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 16.5H24.5C26.4 16.5 27.8 17.7 27.8 19.4C27.8 21 26.4 22.2 24.8 22.2C23.3 22.2 22.4 21.3 22.1 20.1" stroke="#0EA5A6" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 21.5H15.5C17 21.5 18 22.4 18 23.8C18 25.1 17 26 15.6 26" stroke="#0EA5A6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconEventStarCalendar({ size = 20, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <rect x="4.5" y="6.5" width="23" height="20.5" rx="3" stroke="#F59E0B" strokeWidth="1.9" fill="#FFFFFF" />
      <path d="M4.5 12.5H27.5" stroke="#F59E0B" strokeWidth="1.9" />
      <path d="M10.5 4V8M21.5 4V8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <polygon points="16,15 17.4,18 20.7,18.4 18.2,20.6 18.9,23.8 16,22.1 13.1,23.8 13.8,20.6 11.3,18.4 14.6,18" fill="#F59E0B" />
    </svg>
  );
}

export function IconPhotoGreen({ size = 22, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <rect x="4.5" y="6.5" width="23" height="19" rx="3" stroke="#1E9B3E" strokeWidth="2" fill="#FFFFFF" />
      <circle cx="11" cy="12" r="2" fill="#1E9B3E" />
      <path d="M6 22.5L13 15.5L17.5 20L21 16.5L26.5 22.5H6Z" fill="#1E9B3E" />
    </svg>
  );
}

export function IconVideoStrip({ size = 22, className = '' }) {
  return (
    <svg {...BASE_SVG} width={size} height={size} className={className} aria-hidden="true">
      <rect x="4" y="6.5" width="24" height="19" rx="2.5" stroke="#0B4A6F" strokeWidth="2" fill="#FFFFFF" />
      <line x1="9" y1="6.5" x2="9" y2="25.5" stroke="#0B4A6F" strokeWidth="1.6" />
      <line x1="23" y1="6.5" x2="23" y2="25.5" stroke="#0B4A6F" strokeWidth="1.6" />
      <polygon points="13.5,12.5 20,16 13.5,19.5" fill="#0B4A6F" />
    </svg>
  );
}
