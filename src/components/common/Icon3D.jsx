import {
  Award,
  BookOpen,
  Bot,
  Briefcase,
  CalendarDays,
  Camera,
  ChartNoAxesColumnIncreasing,
  CirclePlay,
  Clock,
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  Coins,
  Compass,
  Cpu,
  Crown,
  Download,
  Droplets,
  Factory,
  Flag,
  FlaskConical,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  HeartHandshake,
  History,
  Image,
  Images,
  Landmark,
  Layers,
  Mail,
  MapPinned,
  Megaphone,
  Moon,
  Mountain,
  Package,
  Percent,
  Phone,
  Rocket,
  ScrollText,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Sprout,
  Star,
  Sun,
  Swords,
  Thermometer,
  Trees,
  TriangleAlert,
  Tv,
  Utensils,
  Waves,
} from 'lucide-react';
import {
  IconNavHome,
  IconNavGeography,
  IconNavHistory,
  IconNavDistricts,
  IconNavTourism,
  IconNavCulture,
  IconNavEconomy,
  IconNavEcology,
  IconNavNews,
  IconNavMedia,
  IconCatGeography,
  IconCatDistricts,
  IconCatTourism,
  IconCatCulture,
  IconCatCuisine,
  IconCatEconomy,
  IconCatEcology,
  IconStatPopulation,
  IconStatArea,
  IconStatDistricts,
  IconStatHeritage,
  IconMapView,
  IconWeatherPartlyCloudy,
  IconWindAirQuality,
  IconEventStarCalendar,
  IconPhotoGreen,
  IconVideoStrip,
} from './KhorezmIcons';

const ICON_COLORS = {
  navy: '#0B4A6F',
  teal: '#0EA5A6',
  gold: '#F59E0B',
  green: '#1E9B3E',
  purple: '#7C3AED',
  white: '#FFFFFF',
};

const CUSTOM_ICON_REGISTRY = {
  // Navigation row icons matching visual sheet
  home: IconNavHome,
  house: IconNavHome,
  'nav-geography': IconNavGeography,
  'nav-history': IconNavHistory,
  'nav-districts': IconNavDistricts,
  'nav-tourism': IconNavTourism,
  'nav-culture': IconNavCulture,
  'nav-economy': IconNavEconomy,
  'nav-ecology': IconNavEcology,
  'nav-news': IconNavNews,
  news: IconNavNews,
  'nav-media': IconNavMedia,

  // Category cards row icons matching visual sheet
  'cat-geography': IconCatGeography,
  mountain: IconCatGeography,
  'cat-history': IconNavHistory,
  castle: IconNavHistory,
  'cat-districts': IconCatDistricts,
  'map-pin': IconCatDistricts,
  'cat-tourism': IconCatTourism,
  camera: IconCatTourism,
  'cat-culture': IconCatCulture,
  music: IconCatCulture,
  'cat-cuisine': IconCatCuisine,
  cuisine: IconCatCuisine,
  'cat-economy': IconCatEconomy,
  chart: IconNavEconomy,
  'cat-ecology': IconCatEcology,
  leaf: IconNavEcology,

  // Statistics & Extra domain icons matching visual sheet
  'stat-population': IconStatPopulation,
  users: IconStatPopulation,
  'stat-area': IconStatArea,
  ruler: IconStatArea,
  'stat-districts': IconStatDistricts,
  city: IconStatDistricts,
  'stat-heritage': IconStatHeritage,
  museum: IconStatHeritage,
  map: IconMapView,
  'partly-cloudy-day': IconWeatherPartlyCloudy,
  'cloud-sun': IconWeatherPartlyCloudy,
  wind: IconWindAirQuality,
  calendar: IconEventStarCalendar,
  photo: IconPhotoGreen,
  video: IconVideoStrip,
};

const LUCIDE_ICON_REGISTRY = {
  search: { icon: Search, tone: 'navy' },
  star: { icon: Star, tone: 'gold' },
  sun: { icon: Sun, tone: 'gold' },
  waves: { icon: Waves, tone: 'teal' },
  water: { icon: Droplets, tone: 'teal' },
  sprout: { icon: Sprout, tone: 'green' },
  images: { icon: Images, tone: 'navy' },
  donate: { icon: HeartHandshake, tone: 'navy' },
  heart: { icon: Heart, tone: 'navy' },
  award: { icon: Award, tone: 'purple' },
  book: { icon: BookOpen, tone: 'navy' },
  bot: { icon: Bot, tone: 'teal' },
  briefcase: { icon: Briefcase, tone: 'navy' },
  clock: { icon: Clock, tone: 'teal' },
  cloud: { icon: Cloud, tone: 'navy' },
  coins: { icon: Coins, tone: 'gold' },
  compass: { icon: Compass, tone: 'teal' },
  cpu: { icon: Cpu, tone: 'purple' },
  crown: { icon: Crown, tone: 'gold' },
  drizzle: { icon: CloudDrizzle, tone: 'teal' },
  factory: { icon: Factory, tone: 'navy' },
  flag: { icon: Flag, tone: 'navy' },
  flask: { icon: FlaskConical, tone: 'purple' },
  fog: { icon: CloudFog, tone: 'teal' },
  globe: { icon: Globe, tone: 'teal' },
  graduation: { icon: GraduationCap, tone: 'purple' },
  headphones: { icon: Headphones, tone: 'purple' },
  history: { icon: History, tone: 'navy' },
  landmark: { icon: Landmark, tone: 'navy' },
  layers: { icon: Layers, tone: 'green' },
  mail: { icon: Mail, tone: 'navy' },
  'map-pinned': { icon: MapPinned, tone: 'teal' },
  megaphone: { icon: Megaphone, tone: 'gold' },
  moon: { icon: Moon, tone: 'navy' },
  package: { icon: Package, tone: 'navy' },
  'partly-cloudy-night': { icon: CloudMoon, tone: 'navy' },
  percent: { icon: Percent, tone: 'navy' },
  phone: { icon: Phone, tone: 'navy' },
  rain: { icon: CloudRain, tone: 'teal' },
  rocket: { icon: Rocket, tone: 'purple' },
  scroll: { icon: ScrollText, tone: 'gold' },
  shield: { icon: ShieldCheck, tone: 'green' },
  snow: { icon: Snowflake, tone: 'teal' },
  storm: { icon: CloudLightning, tone: 'gold' },
  swords: { icon: Swords, tone: 'navy' },
  thermometer: { icon: Thermometer, tone: 'gold' },
  tree: { icon: Trees, tone: 'green' },
  tv: { icon: Tv, tone: 'navy' },
  utensils: { icon: Utensils, tone: 'gold' },
  warning: { icon: TriangleAlert, tone: 'gold' },
  'app-store': { icon: Smartphone, tone: 'white' },
  'google-play': { icon: Download, tone: 'white' },
  telegram: { icon: Send, tone: 'navy' },
  youtube: { icon: CirclePlay, tone: 'navy' },
  instagram: { icon: Camera, tone: 'purple' },
  facebook: { icon: Globe, tone: 'navy' },
  image: { icon: Image, tone: 'green' },
  'bar-chart': { icon: ChartNoAxesColumnIncreasing, tone: 'green' },
  timeline: { icon: CalendarDays, tone: 'gold' },
  geography: { icon: Mountain, tone: 'green' },
};

export default function Icon3D({ name, alt = '', size = 24, strokeWidth = 1.8, color, className = '', variant = 'default', eager = false }) {
  if (variant === '3d') {
    return (
      <img
        src={`/images/icons3d/${name}.png`}
        alt={alt}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={`inline-block object-contain shrink-0 select-none ${className}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }

  const CustomIcon = CUSTOM_ICON_REGISTRY[name];
  if (CustomIcon) {
    return (
      <CustomIcon
        size={size}
        className={`app-icon app-custom-icon inline-block shrink-0 select-none ${className}`}
        aria-label={alt || undefined}
      />
    );
  }

  const entry = LUCIDE_ICON_REGISTRY[name] || { icon: Compass, tone: 'navy' };
  const IconComponent = entry.icon;
  const hasUtilityColor = /\btext-/.test(className);
  const resolvedColor = color || (hasUtilityColor ? undefined : ICON_COLORS[entry.tone] || ICON_COLORS.navy);

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      color={resolvedColor}
      className={`app-icon inline-block shrink-0 select-none ${className}`}
      aria-label={alt || undefined}
      aria-hidden={!alt}
    />
  );
}
