function CornerCeramic({ flip = false }) {
  return (
    <svg
      viewBox="0 0 180 96"
      className={`w-28 sm:w-36 md:w-44 h-auto ${flip ? '-scale-x-100' : ''}`}
      fill="none"
    >
      {/* Outer gold scalloped glow */}
      <path
        d="M0 0 L170 0 C140 16 120 12 96 34 C72 56 44 64 26 84 C12 72 4 82 0 94 Z"
        fill="#E3B664"
        fillOpacity="0.28"
      />
      {/* Main cobalt & turquoise majolica corner */}
      <path
        d="M0 0 L146 0 C122 14 104 10 84 28 C64 46 38 52 20 72 C10 62 4 70 0 78 Z"
        fill="#15528B"
        fillOpacity="0.88"
      />
      <path
        d="M0 0 L124 0 C104 12 88 10 70 25 C52 40 32 46 16 62 C8 54 3 60 0 66 Z"
        fill="#2C9AB0"
        fillOpacity="0.92"
      />
      {/* Gold islimi filigree inside corner */}
      <path
        d="M8 6 C28 10 42 22 48 38 M14 4 C42 8 62 16 74 26 M6 18 C16 32 18 46 12 58"
        stroke="#F2CD7E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="28" cy="22" r="5" fill="#15528B" stroke="#F2CD7E" strokeWidth="1.4" />
      <circle cx="28" cy="22" r="2" fill="#FAF4E6" />
      <circle cx="62" cy="14" r="3.5" fill="#F2CD7E" />
      <circle cx="14" cy="42" r="3.5" fill="#F2CD7E" />
    </svg>
  );
}

export function KhorezmTopBorder() {
  return (
    <div
      className="pointer-events-none select-none absolute top-0 inset-x-0 z-40 flex items-start justify-between overflow-hidden"
      aria-hidden="true"
    >
      <CornerCeramic />
      <div className="flex-1 h-2.5 overflow-hidden">
        <svg className="w-full h-2.5 block" preserveAspectRatio="none">
          <defs>
            <pattern id="khorezm-top-ribbon" width="80" height="10" patternUnits="userSpaceOnUse">
              <rect width="80" height="3" fill="#15528B" fillOpacity="0.85" />
              <rect y="3" width="80" height="1.5" fill="#C9903F" fillOpacity="0.8" />
              <path
                d="M0 4.5 Q20 10 40 4.5 Q60 10 80 4.5"
                stroke="#2C9AB0"
                strokeWidth="1.2"
                strokeOpacity="0.65"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="10" fill="url(#khorezm-top-ribbon)" />
        </svg>
      </div>
      <CornerCeramic flip />
    </div>
  );
}

export function KhorezmBottomBorder() {
  return (
    <div className="w-full overflow-hidden pointer-events-none select-none relative z-10" aria-hidden="true">
      <svg className="w-full h-16 sm:h-20 md:h-24 block" preserveAspectRatio="none">
        <defs>
          <pattern id="khorezm-bottom-majolica" width="180" height="96" patternUnits="userSpaceOnUse">
            {/* Soft golden outer scalloped border */}
            <path
              d="M0 96 L0 56 Q22 34 45 50 Q68 20 90 8 Q112 20 135 50 Q158 34 180 56 L180 96 Z"
              fill="#DFB05C"
              fillOpacity="0.34"
            />
            {/* Deep cobalt outer arch contour */}
            <path
              d="M0 96 L0 62 Q22 40 45 56 Q68 26 90 14 Q112 26 135 56 Q158 40 180 62 L180 96 Z"
              fill="#15528B"
              fillOpacity="0.92"
            />
            {/* Rich Khivan turquoise arch interior */}
            <path
              d="M6 96 L6 66 Q26 46 45 61 Q68 33 90 22 Q112 33 135 61 Q154 46 174 66 L174 96 Z"
              fill="#2C9AB0"
              fillOpacity="0.95"
            />
            {/* Gold hairline framing */}
            <path
              d="M6 66 Q26 46 45 61 Q68 33 90 22 Q112 33 135 61 Q154 46 174 66"
              fill="none"
              stroke="#E8BD6B"
              strokeWidth="2.2"
            />
            {/* Central lotus medallion */}
            <path
              d="M90 30 C100 42 106 58 90 80 C74 58 80 42 90 30 Z"
              fill="#123A61"
              stroke="#E8BD6B"
              strokeWidth="1.4"
            />
            <path
              d="M90 38 C96 47 99 58 90 73 C81 58 84 47 90 38 Z"
              fill="#E5B763"
            />
            <circle cx="90" cy="56" r="6" fill="#FAF4E6" />
            <circle cx="90" cy="56" r="3" fill="#2C9AB0" />

            {/* Side parchment & gold trefoil arches */}
            <path
              d="M24 96 C24 76 33 66 45 66 C57 66 66 76 66 96 Z"
              fill="#FAF4E6"
              stroke="#E8BD6B"
              strokeWidth="1.5"
            />
            <path
              d="M32 96 C32 82 38 74 45 74 C52 74 58 82 58 96 Z"
              fill="#C9903F"
              fillOpacity="0.9"
            />
            <path
              d="M114 96 C114 76 123 66 135 66 C147 66 156 76 156 96 Z"
              fill="#FAF4E6"
              stroke="#E8BD6B"
              strokeWidth="1.5"
            />
            <path
              d="M122 96 C122 82 128 74 135 74 C142 74 148 82 148 96 Z"
              fill="#C9903F"
              fillOpacity="0.9"
            />

            {/* Top finial diamonds */}
            <polygon points="90,8 95,14 90,20 85,14" fill="#E8BD6B" />
            <polygon points="45,48 49,53 45,58 41,53" fill="#2C9AB0" stroke="#FAF4E6" strokeWidth="1" />
            <polygon points="135,48 139,53 135,58 131,53" fill="#2C9AB0" stroke="#FAF4E6" strokeWidth="1" />

            {/* Base ceramic strip */}
            <rect y="88" width="180" height="8" fill="#123A61" />
            <rect y="88" width="180" height="2.2" fill="#E8BD6B" />
          </pattern>
        </defs>
        <rect width="100%" height="96" fill="url(#khorezm-bottom-majolica)" />
      </svg>
    </div>
  );
}
