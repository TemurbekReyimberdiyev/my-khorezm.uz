import { Helmet } from 'react-helmet-async';
import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Landmark, Waves, ArrowRight, X, Layers } from 'lucide-react';
import { getDistricts } from '../data/districts';
import { getMapLocations } from '../data/mapLocations';
import { useLanguage } from '../hooks/useLanguage';
import PagePathBar from '../components/common/PagePathBar';
import KhorezmMap from '../components/maps/KhorezmMap';
import Badge from '../components/common/Badge';

const PAGE_LABELS = {
  uz: {
    allDistricts: 'Tuman va shaharlar (13)',
    centersLayer: "Ma'muriy markazlar",
    riverLayer: 'Amudaryo',
    landmarksLayer: 'Yodgorliklar va tabiat',
    adminCenter: "Ma'muriy markaz",
    population: 'Aholi',
    area: 'Maydon',
    density: 'Zichlik',
    founded: 'Tashkil topgan',
    fullProfile: "Tuman sahifasiga o'tish",
    noMatches: "Mos joylashuv topilmadi",
    districtsTab: 'Tumanlar',
    placesTab: 'Joylar',
    peoplePerKm: 'kishi/km²',
  },
  ru: {
    allDistricts: 'Районы и города (13)',
    centersLayer: 'Административные центры',
    riverLayer: 'Амударья',
    landmarksLayer: 'Памятники и природа',
    adminCenter: 'Адм. центр',
    population: 'Население',
    area: 'Площадь',
    density: 'Плотность',
    founded: 'Основан',
    fullProfile: 'Подробнее о районе',
    noMatches: 'Ничего не найдено',
    districtsTab: 'Районы',
    placesTab: 'Объекты',
    peoplePerKm: 'чел/км²',
  },
  en: {
    allDistricts: 'Districts & Cities (13)',
    centersLayer: 'Administrative Centers',
    riverLayer: 'Amu Darya River',
    landmarksLayer: 'Monuments & Nature',
    adminCenter: 'Admin. Center',
    population: 'Population',
    area: 'Area',
    density: 'Density',
    founded: 'Founded',
    fullProfile: 'Open District Profile',
    noMatches: 'No matching locations',
    districtsTab: 'Districts',
    placesTab: 'Landmarks',
    peoplePerKm: 'people/km²',
  },
};

export default function MapPage() {
  const { language, t } = useLanguage();
  const mapText = t.pages.map;
  const ui = PAGE_LABELS[language] || PAGE_LABELS.uz;

  const districts = useMemo(() => getDistricts(language), [language]);
  const allLocations = useMemo(() => getMapLocations(language), [language]);

  const [q, setQ] = useState('');
  const [sidebarTab, setSidebarTab] = useState('districts');
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [focusLocation, setFocusLocation] = useState(null);
  const [layers, setLayers] = useState({
    districts: true,
    centers: true,
    river: true,
    monuments: true,
    natural: true,
  });

  const filteredDistricts = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return districts;
    return districts.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        (d.center || '').toLowerCase().includes(query)
    );
  }, [districts, q]);

  const extraPoiPoints = useMemo(() => {
    return allLocations.filter(
      (l) =>
        (l.typeKey === 'monuments' && layers.monuments) ||
        (l.typeKey === 'natural' && layers.natural)
    );
  }, [allLocations, layers.monuments, layers.natural]);

  const filteredPlaces = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allLocations.filter((l) => {
      if (l.typeKey === 'districts') {
        return layers.centers && (!query || l.name.toLowerCase().includes(query) || l.description.toLowerCase().includes(query));
      }
      const enabled = (l.typeKey === 'monuments' && layers.monuments) || (l.typeKey === 'natural' && layers.natural);
      return enabled && (!query || l.name.toLowerCase().includes(query) || l.description.toLowerCase().includes(query));
    });
  }, [allLocations, layers, q]);

  const selectedDistrict = useMemo(
    () => districts.find((d) => d.slug === selectedSlug) || null,
    [districts, selectedSlug]
  );

  const handleSelectDistrictFromMap = useCallback((props) => {
    if (props?.slug) {
      setSelectedSlug(props.slug);
      setFocusLocation(null);
    }
  }, []);

  const handlePickDistrict = (slug) => {
    setFocusLocation(null);
    setSelectedSlug(slug);
  };

  const handlePickPlace = (loc) => {
    setSelectedSlug(null);
    setFocusLocation({ ...loc, _ts: Date.now() });
  };

  return (
    <>
      <Helmet>
        <title>{t.nav.map}</title>
      </Helmet>

      <div className="flex flex-col md:flex-row md:h-[calc(100vh-8rem)] bg-[#F7F9FC]">
        {/* Interactive GIS Map Area (first on mobile with concrete height for immediate usability) */}
        <div className="order-1 md:order-2 w-full h-[380px] sm:h-[420px] md:w-auto md:h-auto md:flex-1 shrink-0 relative p-2 sm:p-3">
          <KhorezmMap
            mode="full"
            className="w-full h-full shadow-xs"
            selectedSlug={selectedSlug}
            onSelectDistrict={handleSelectDistrictFromMap}
            visibleLayers={{
              districts: layers.districts,
              centers: layers.centers,
              river: layers.river,
            }}
            extraPoints={extraPoiPoints}
            focusLocation={focusLocation}
          />

          {/* Floating Selected District Info Panel */}
          {selectedDistrict && (
            <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-80 z-20 bg-white/95 backdrop-blur-xs border border-[#DCE7F2] rounded-2xl p-4 shadow-lg">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <Badge variant={selectedDistrict.typeKey === 'city' ? 'accent' : 'primary'} className="mb-1.5">
                    {selectedDistrict.typeKey === 'city' ? t.pages.districts.typeCity : t.pages.districts.typeDistrict}
                  </Badge>
                  <h2 className="font-bold text-[#17243B] text-base leading-snug">{selectedDistrict.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(null)}
                  className="p-1 rounded-lg text-[#66758A] hover:bg-[#F7F9FC] hover:text-[#17243B] cursor-pointer"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="text-xs text-[#66758A] mb-3">
                <strong className="text-[#17243B]">{ui.adminCenter}:</strong> {selectedDistrict.center}
              </div>

              <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#F1F5F9] text-center mb-3">
                <div>
                  <div className="font-bold text-xs text-[#15528B]">{selectedDistrict.population}</div>
                  <div className="text-[10px] text-[#66758A]">{ui.population}</div>
                </div>
                <div>
                  <div className="font-bold text-xs text-[#15528B]">{selectedDistrict.area}</div>
                  <div className="text-[10px] text-[#66758A]">{ui.area}</div>
                </div>
                <div>
                  <div className="font-bold text-xs text-[#15528B]">{selectedDistrict.density}</div>
                  <div className="text-[10px] text-[#66758A]">{ui.peoplePerKm}</div>
                </div>
              </div>

              <Link
                to={`/tumanlar/${selectedDistrict.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#15528B] hover:bg-[#123A61] text-white text-xs font-semibold py-2 px-3 rounded-xl transition-colors"
              >
                <span>{ui.fullProfile}</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>

        {/* Left / Bottom Directory + Search + Layer Panel */}
        <aside className="order-2 md:order-1 w-full md:w-80 shrink-0 bg-white border-t md:border-t-0 md:border-r border-[#E5EAF0] flex flex-col overflow-hidden max-h-[54vh] md:max-h-none">
          <div className="p-4 border-b border-[#E5EAF0]">
            <PagePathBar variant="inline" className="mb-2.5" />
            <h1 className="font-bold text-[#17243B] text-base mb-2.5">{mapText.sidebarTitle}</h1>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={mapText.searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 border border-[#E5EAF0] rounded-xl bg-[#F7F9FC] text-xs sm:text-sm outline-none focus:border-[#15528B] text-[#17243B]"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#17243B] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Map Layers */}
          <div className="px-4 py-3 border-b border-[#E5EAF0] bg-[#FAFCFF]">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#66758A] uppercase tracking-wider mb-2">
              <Layers size={12} className="text-[#15528B]" />
              <span>{mapText.layers}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
              {[
                { key: 'districts', label: mapText.districts },
                { key: 'centers', label: ui.centersLayer },
                { key: 'river', label: ui.riverLayer },
                { key: 'monuments', label: mapText.monuments },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-1.5 cursor-pointer text-xs text-[#17243B]">
                  <input
                    type="checkbox"
                    checked={layers[key]}
                    onChange={(e) => setLayers((prev) => ({ ...prev, [key]: e.target.checked }))}
                    className="rounded accent-[#15528B]"
                  />
                  <span className="truncate">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Directory Tabs */}
          <div className="grid grid-cols-2 border-b border-[#E5EAF0] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSidebarTab('districts')}
              className={`py-2.5 cursor-pointer border-b-2 transition-colors ${
                sidebarTab === 'districts'
                  ? 'border-[#15528B] text-[#15528B] bg-[#F7F9FC]'
                  : 'border-transparent text-[#66758A] hover:text-[#17243B]'
              }`}
            >
              {ui.districtsTab} ({filteredDistricts.length})
            </button>
            <button
              type="button"
              onClick={() => setSidebarTab('places')}
              className={`py-2.5 cursor-pointer border-b-2 transition-colors ${
                sidebarTab === 'places'
                  ? 'border-[#15528B] text-[#15528B] bg-[#F7F9FC]'
                  : 'border-transparent text-[#66758A] hover:text-[#17243B]'
              }`}
            >
              {ui.placesTab} ({filteredPlaces.length})
            </button>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {sidebarTab === 'districts' ? (
              filteredDistricts.length === 0 ? (
                <p className="text-xs text-[#66758A] text-center py-6">{ui.noMatches}</p>
              ) : (
                filteredDistricts.map((d) => {
                  const isActive = d.slug === selectedSlug;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handlePickDistrict(d.slug)}
                      className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#EBF3FA] border border-[#15528B]/30'
                          : 'hover:bg-[#F7F9FC] border border-transparent'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          d.typeKey === 'city' ? 'bg-[#FFF3E0] text-[#B45309]' : 'bg-[#E8F5EE] text-[#15803D]'
                        }`}
                      >
                        <MapPin size={15} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-[#17243B] truncate">{d.name}</div>
                        <div className="text-[11px] text-[#66758A] truncate">
                          {d.center} · {d.area}
                        </div>
                      </div>
                    </button>
                  );
                })
              )
            ) : filteredPlaces.length === 0 ? (
              <p className="text-xs text-[#66758A] text-center py-6">{ui.noMatches}</p>
            ) : (
              filteredPlaces.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => handlePickPlace(loc)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left hover:bg-[#F7F9FC] transition-colors cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      loc.typeKey === 'monuments'
                        ? 'bg-[#FEF3C7] text-[#B45309]'
                        : loc.typeKey === 'natural'
                          ? 'bg-[#E0F7FA] text-[#0E7490]'
                          : 'bg-[#EBF3FA] text-[#15528B]'
                    }`}
                  >
                    {loc.typeKey === 'natural' ? (
                      <Waves size={15} />
                    ) : loc.typeKey === 'monuments' ? (
                      <Landmark size={15} />
                    ) : (
                      <MapPin size={15} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#17243B] truncate">{loc.name}</div>
                    <div className="text-[11px] text-[#66758A] truncate">{loc.description}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
