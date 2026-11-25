import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Wind, Droplets, Thermometer, Leaf } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useWeather, formatTemp } from '../../context/WeatherContext';
import KhorezmSvgMap from '../common/KhorezmSvgMap';

const AQI_STYLES = {
  good: {
    ring: 'bg-[#DCFCE7] border-[#22C55E]',
    dot: 'bg-[#22C55E]',
    badge: 'bg-[#DCFCE7] text-[#15803D]',
  },
  moderate: {
    ring: 'bg-[#FEF9C3] border-[#FACC15]',
    dot: 'bg-[#FACC15]',
    badge: 'bg-[#FEF3C7] text-[#B45309]',
  },
  sensitive: {
    ring: 'bg-orange-100 border-orange-400',
    dot: 'bg-orange-500',
    badge: 'bg-orange-100 text-orange-700',
  },
  unhealthy: {
    ring: 'bg-red-100 border-red-500',
    dot: 'bg-red-500',
    badge: 'bg-red-100 text-red-700',
  },
};

export default function MapPreview() {
  const { t } = useLanguage();
  const { aqi, pm25, pm10, temperature, humidity, windSpeed, aqiLevel, isLive } = useWeather();

  const style = AQI_STYLES[aqiLevel] || AQI_STYLES.good;
  const statusMap = {
    good: { label: t.home.airQualityStatusGood, note: t.home.airQualityNote },
    moderate: { label: t.home.airQualityStatusModerate, note: t.home.airQualityNoteModerate },
    sensitive: { label: t.home.airQualityStatusSensitive, note: t.home.airQualityNoteSensitive },
    unhealthy: { label: t.home.airQualityStatusUnhealthy, note: t.home.airQualityNoteUnhealthy },
  };
  const statusInfo = statusMap[aqiLevel] || statusMap.good;

  return (
    <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 bg-white border border-[#E5EAF0] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center">
          <div className="sm:w-56 shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-[#15528B]" />
              <h2 className="font-bold text-[#17243B] text-base sm:text-lg leading-tight">{t.home.mapTitle}</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-4">{t.home.mapSubtitle}</p>
            <Link
              to="/xarita"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] bg-[#F7F9FC] border border-[#E5EAF0] px-4 py-2 rounded-lg hover:bg-[#EBF3FA] transition-all"
            >
              {t.home.mapOpen} <ArrowRight size={13} />
            </Link>
          </div>
          <div className="w-full flex-1">
            <KhorezmSvgMap variant="full" className="h-52" />
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#E5EAF0] rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Leaf size={18} className="text-[#319568]" />
                <h2 className="font-bold text-[#17243B] text-base sm:text-lg">{t.home.airQualityTitle}</h2>
              </div>
              {isLive && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F5EE] text-[#319568]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#319568] animate-pulse" />
                  Live
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 ${style.ring}`}>
                <div className={`w-7 h-7 rounded-full ${style.dot}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xl text-[#17243B]">{aqi} AQI</span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${style.badge}`}>
                    {statusInfo.label}
                  </span>
                </div>
                <div className="text-xs text-[#66758A] mt-0.5">{statusInfo.note}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC]">
                <Wind size={15} className="text-[#15528B]" />
                <div>
                  <div className="text-[11px] text-[#66758A]">PM2.5</div>
                  <div className="text-xs font-bold text-[#17243B]">{pm25} µg/m³</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#E5EAF0] bg-[#F7F9FC]">
                <Wind size={15} className="text-[#7C3AED]" />
                <div>
                  <div className="text-[11px] text-[#66758A]">PM10</div>
                  <div className="text-xs font-bold text-[#17243B]">{pm10} µg/m³</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Thermometer, label: t.home.tempLabel, value: formatTemp(temperature) },
                { icon: Droplets, label: t.home.humidityLabel, value: `${humidity}%` },
                { icon: Wind, label: t.home.windLabel, value: `${windSpeed} m/s` },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 p-2 rounded-lg border border-[#E5EAF0] text-xs">
                  <item.icon size={13} className="text-[#15528B] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-[#66758A] truncate">{item.label}</div>
                    <div className="font-bold text-[#17243B]">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-[#94A3B8] mt-3">{t.home.airQualityDemoNote}</p>
        </div>
      </div>
    </section>
  );
}
