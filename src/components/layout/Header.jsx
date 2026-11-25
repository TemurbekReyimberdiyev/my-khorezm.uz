import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Menu,
  Search,
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useWeather, formatTemp } from '../../context/WeatherContext';
import MobileMenu from './MobileMenu';
import SearchModal from '../common/SearchModal';

function getWeatherVisual(conditionKey, isDay) {
  switch (conditionKey) {
    case 'sunny':
      return { Icon: Sun, color: '#F59E0B' };
    case 'clearNight':
      return { Icon: Moon, color: '#4F46E5' };
    case 'mostlyClear':
      return isDay ? { Icon: CloudSun, color: '#D97706' } : { Icon: CloudMoon, color: '#4F46E5' };
    case 'partlyCloudy':
      return isDay ? { Icon: CloudSun, color: '#C58B43' } : { Icon: CloudMoon, color: '#6366F1' };
    case 'cloudy':
      return { Icon: Cloud, color: '#64748B' };
    case 'foggy':
      return { Icon: CloudFog, color: '#64748B' };
    case 'drizzle':
      return { Icon: CloudDrizzle, color: '#0EA5E9' };
    case 'rainy':
      return { Icon: CloudRain, color: '#0284C7' };
    case 'snowy':
      return { Icon: CloudSnow, color: '#0EA5E9' };
    case 'stormy':
      return { Icon: CloudLightning, color: '#7C3AED' };
    case 'windy':
      return { Icon: Wind, color: '#0D9488' };
    default:
      return isDay ? { Icon: CloudSun, color: '#C58B43' } : { Icon: CloudMoon, color: '#6366F1' };
  }
}

export default function Header() {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const { temperature, conditionKey, isDay, windSpeed, humidity, updatedAt, refreshing, refresh } = useWeather();
  const { Icon: WeatherIcon, color: weatherIconColor } = getWeatherVisual(conditionKey, isDay);
  const weatherConditionLabel = t.weather[conditionKey] || t.weather.partlyCloudy;
  const weatherTooltip = `${t.header.weather} · ${weatherConditionLabel} · ${windSpeed} m/s · ${humidity}%${updatedAt ? ` (${updatedAt})` : ''}`;

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const day = t.header.days[time.getDay()];
  const month = t.header.months[time.getMonth()];
  const dateStr =
    language === 'uz'
      ? `${day}, ${time.getDate()}-${month}`
      : language === 'ru'
        ? `${day}, ${time.getDate()} ${month}`
        : `${day}, ${month} ${time.getDate()}`;

  return (
    <header className="bg-white border-b border-[#E5EAF0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          <Link to="/" className="flex items-center shrink-0 min-w-0">
            <img
              src="/images/logo-khorezm.png"
              alt={t.siteName}
              className="h-9 sm:h-11 md:h-12 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-7 shrink-0">
            <div className="hidden md:flex items-center gap-2.5 text-[#17243B]">
              <Clock size={22} className="text-[#15528B]" strokeWidth={1.75} />
              <div>
                <div className="text-[11px] text-[#66758A] leading-none">{t.header.time}</div>
                <div className="font-bold text-lg leading-tight text-[#17243B]">{hours}:{minutes}</div>
                <div className="text-[11px] text-[#66758A] leading-none">{dateStr}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={refresh}
              title={weatherTooltip}
              className="hidden md:flex items-center gap-2.5 text-left rounded-lg px-2 py-1 -mx-2 hover:bg-[#F7F9FC] transition-colors cursor-pointer"
            >
              <WeatherIcon
                size={26}
                style={{ color: weatherIconColor }}
                className={refreshing ? 'animate-pulse shrink-0' : 'shrink-0'}
                strokeWidth={1.75}
              />
              <div>
                <div className="text-[11px] text-[#66758A] leading-none">{t.header.weather}</div>
                <div className="font-bold text-lg leading-tight text-[#17243B]">{formatTemp(temperature)}</div>
                <div className="text-[11px] text-[#66758A] leading-none">{weatherConditionLabel}</div>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex items-center border border-[#E5EAF0] rounded-lg overflow-hidden bg-[#F7F9FC] p-0.5">
                {['uz', 'ru', 'en'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className={`px-2.5 py-1 text-xs font-semibold uppercase rounded-md transition-colors cursor-pointer ${
                      language === lang ? 'bg-[#15528B] text-white shadow-xs' : 'text-[#66758A] hover:text-[#17243B]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-[#F7F9FC] cursor-pointer"
                aria-label={t.nav.search}
              >
                <Search size={20} className="text-[#17243B]" />
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-[#F7F9FC] cursor-pointer"
                aria-label="Menu"
                aria-expanded={menuOpen}
              >
                <Menu size={22} className="text-[#17243B]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile live time & weather bar */}
      <div className="md:hidden border-t border-[#E5EAF0] bg-[#F7F9FC]/90">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-[#17243B] min-w-0">
            <Clock size={14} className="text-[#15528B] shrink-0" strokeWidth={1.75} />
            <span className="font-bold tabular-nums shrink-0">{hours}:{minutes}</span>
            <span className="text-[#66758A] truncate">· {dateStr}</span>
          </div>
          <button
            type="button"
            onClick={refresh}
            title={weatherTooltip}
            className="flex items-center gap-1.5 text-[#17243B] shrink-0 cursor-pointer"
          >
            <WeatherIcon
              size={15}
              style={{ color: weatherIconColor }}
              className={refreshing ? 'animate-pulse shrink-0' : 'shrink-0'}
              strokeWidth={1.75}
            />
            <span className="font-bold">{formatTemp(temperature)}</span>
            <span className="text-[#66758A] truncate max-w-[130px]">· {weatherConditionLabel}</span>
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <SearchModal open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
