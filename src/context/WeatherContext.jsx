import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const WeatherContext = createContext(null);

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=41.55&longitude=60.63&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,cloud_cover&wind_speed_unit=ms&timezone=Asia%2FTashkent';

const AIR_QUALITY_URL =
  'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=41.55&longitude=60.63&current=us_aqi,european_aqi,pm10,pm2_5&hourly=pm2_5&forecast_days=1&timezone=Asia%2FTashkent';

export function mapWmoToCondition(code, isDay = 1, windSpeed = 0) {
  if (code >= 95) return 'stormy';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snowy';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rainy';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code === 45 || code === 48) return 'foggy';
  if (windSpeed >= 10 && code <= 3) return 'windy';
  if (code === 0) return isDay ? 'sunny' : 'clearNight';
  if (code === 1) return isDay ? 'mostlyClear' : 'clearNight';
  if (code === 2) return 'partlyCloudy';
  if (code === 3) return 'cloudy';
  return isDay ? 'partlyCloudy' : 'clearNight';
}

function getAqiLevel(aqi) {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'sensitive';
  return 'unhealthy';
}

function getPm25Level(val) {
  if (val <= 12) return 'good';
  if (val <= 35.4) return 'moderate';
  if (val <= 55.4) return 'sensitive';
  return 'unhealthy';
}

function getPm10Level(val) {
  if (val <= 54) return 'good';
  if (val <= 154) return 'moderate';
  if (val <= 254) return 'sensitive';
  return 'unhealthy';
}

export function formatTemp(value) {
  const rounded = Math.round(value);
  return rounded > 0 ? `+${rounded}°C` : `${rounded}°C`;
}

export function WeatherProvider({ children }) {
  const [state, setState] = useState({
    temperature: 16,
    humidity: 50,
    windSpeed: 3.0,
    cloudCover: 0,
    weatherCode: 0,
    conditionKey: 'sunny',
    isDay: 1,
    aqi: 50,
    europeanAqi: 29,
    pm25: 9.7,
    pm10: 11.8,
    aqiLevel: 'good',
    pm25Level: 'good',
    pm10Level: 'good',
    hourlyPm25: [],
    updatedAt: '',
    isLive: false,
    loading: true,
    refreshing: false,
    error: false,
  });

  const lastFetchRef = useRef(0);

  const fetchAll = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && lastFetchRef.current && now - lastFetchRef.current < 25000) {
      return;
    }
    lastFetchRef.current = now;
    setState((prev) => ({ ...prev, refreshing: !prev.loading }));

    try {
      const [wRes, aqRes] = await Promise.allSettled([
        fetch(WEATHER_URL, { cache: 'no-store' }).then((r) => {
          if (!r.ok) throw new Error('Weather fetch failed');
          return r.json();
        }),
        fetch(AIR_QUALITY_URL, { cache: 'no-store' }).then((r) => {
          if (!r.ok) throw new Error('Air quality fetch failed');
          return r.json();
        }),
      ]);

      setState((prev) => {
        const next = { ...prev, loading: false, refreshing: false, error: false };

        if (wRes.status === 'fulfilled' && wRes.value?.current) {
          const cur = wRes.value.current;
          next.temperature = Number(cur.temperature_2m ?? prev.temperature);
          next.humidity = Math.round(Number(cur.relative_humidity_2m ?? prev.humidity));
          next.windSpeed = Number((cur.wind_speed_10m ?? prev.windSpeed).toFixed(1));
          next.cloudCover = Math.round(Number(cur.cloud_cover ?? prev.cloudCover));
          next.weatherCode = cur.weather_code ?? prev.weatherCode;
          next.isDay = cur.is_day ?? 1;
          next.conditionKey = mapWmoToCondition(next.weatherCode, next.isDay, next.windSpeed);
          next.updatedAt = typeof cur.time === 'string' ? cur.time.slice(11, 16) : prev.updatedAt;
          next.isLive = true;
        }

        if (aqRes.status === 'fulfilled' && aqRes.value?.current) {
          const cur = aqRes.value.current;
          const aqiVal = Math.round(Number(cur.us_aqi ?? prev.aqi));
          const pm25Val = Number((cur.pm2_5 ?? prev.pm25).toFixed(1));
          const pm10Val = Number((cur.pm10 ?? prev.pm10).toFixed(1));

          next.aqi = aqiVal;
          next.europeanAqi = Math.round(Number(cur.european_aqi ?? prev.europeanAqi));
          next.pm25 = pm25Val;
          next.pm10 = pm10Val;
          next.aqiLevel = getAqiLevel(aqiVal);
          next.pm25Level = getPm25Level(pm25Val);
          next.pm10Level = getPm10Level(pm10Val);
          next.isLive = true;

          const times = aqRes.value.hourly?.time || [];
          const vals = aqRes.value.hourly?.pm2_5 || [];
          if (times.length && vals.length) {
            next.hourlyPm25 = times
              .map((tStr, idx) => ({
                month: tStr.slice(11, 16),
                pm25: vals[idx] != null ? Number(vals[idx].toFixed(1)) : null,
              }))
              .filter((p, idx) => idx % 2 === 0 && p.pm25 !== null);
          }
        }

        if (wRes.status === 'rejected' && aqRes.status === 'rejected') {
          next.error = true;
        }

        return next;
      });
    } catch {
      setState((prev) => ({ ...prev, loading: false, refreshing: false, error: true }));
    }
  }, []);

  useEffect(() => {
    fetchAll(true);
    const id = setInterval(() => fetchAll(true), 2 * 60 * 1000);
    const onResume = () => {
      if (document.visibilityState === 'visible') {
        fetchAll(false);
      }
    };
    document.addEventListener('visibilitychange', onResume);
    window.addEventListener('focus', onResume);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onResume);
      window.removeEventListener('focus', onResume);
    };
  }, [fetchAll]);

  return (
    <WeatherContext.Provider value={{ ...state, refresh: () => fetchAll(true) }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error('useWeather must be used inside WeatherProvider');
  return ctx;
}
