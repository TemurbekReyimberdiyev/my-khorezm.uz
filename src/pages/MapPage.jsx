import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { getMapLocations } from '../data/mapLocations';
import { useLanguage } from '../hooks/useLanguage';
import PagePathBar from '../components/common/PagePathBar';

export default function MapPage() {
  const { language, t } = useLanguage();
  const mapText = t.pages.map;
  const locations = getMapLocations(language);

  const [q, setQ] = useState('');
  const [layers, setLayers] = useState({ districts: true, monuments: true, natural: true });
  const [mapReady, setMapReady] = useState(false);
  const [LeafletComponents, setLeafletComponents] = useState(null);

  useEffect(() => {
    import('react-leaflet').then((rl) => {
      import('leaflet').then((leaflet) => {
        const L = leaflet.default;
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
        setLeafletComponents({ MapContainer: rl.MapContainer, TileLayer: rl.TileLayer, Marker: rl.Marker, Popup: rl.Popup });
        setMapReady(true);
      });
    });

    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  const filtered = locations.filter((l) => {
    const matchLayer = layers[l.typeKey];
    const matchQ = !q || l.name.toLowerCase().includes(q.toLowerCase()) || l.description.toLowerCase().includes(q.toLowerCase());
    return matchLayer && matchQ;
  });

  const layerLabels = [
    { key: 'districts', label: mapText.districts },
    { key: 'monuments', label: mapText.monuments },
    { key: 'natural', label: mapText.natural },
  ];

  return (
    <>
      <Helmet>
        <title>{t.nav.map}</title>
      </Helmet>
      <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)]">
        <div className="w-full md:w-72 shrink-0 bg-white border-r border-[#E5EAF0] flex flex-col overflow-hidden max-h-64 md:max-h-none">
          <div className="p-4 border-b border-[#E5EAF0]">
            <PagePathBar variant="inline" className="mb-3" />
            <h1 className="font-bold text-[#17243B] mb-3">{mapText.sidebarTitle}</h1>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8D3E0]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={mapText.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 border border-[#E5EAF0] rounded-xl bg-[#F7F9FC] text-sm outline-none focus:border-[#15528B]"
              />
            </div>
          </div>
          <div className="p-4 border-b border-[#E5EAF0]">
            <h2 className="text-xs font-semibold text-[#66758A] mb-2 uppercase tracking-wide">{mapText.layers}</h2>
            {layerLabels.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={layers[key]}
                  onChange={(e) => setLayers((l) => ({ ...l, [key]: e.target.checked }))}
                  className="rounded"
                />
                <span className="text-sm text-[#17243B]">{label}</span>
              </label>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {filtered.map((loc) => (
              <div key={loc.id} className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F7F9FC] cursor-pointer">
                <div className="w-7 h-7 rounded-lg bg-[#EBF3FA] flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-[#15528B]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#17243B] truncate">{loc.name}</div>
                  <div className="text-xs text-[#66758A]">{loc.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative min-h-[320px]">
          {mapReady && LeafletComponents ? (
            <LeafletComponents.MapContainer center={[41.55, 60.63]} zoom={9} style={{ width: '100%', height: '100%' }}>
              <LeafletComponents.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
              {filtered.map((loc) => (
                <LeafletComponents.Marker key={loc.id} position={[loc.coordinates.lat, loc.coordinates.lng]}>
                  <LeafletComponents.Popup>
                    <div className="text-sm">
                      <strong>{loc.name}</strong>
                      <p className="text-xs text-gray-500 mt-1">{loc.description}</p>
                    </div>
                  </LeafletComponents.Popup>
                </LeafletComponents.Marker>
              ))}
            </LeafletComponents.MapContainer>
          ) : (
            <div className="flex items-center justify-center h-full bg-[#F7F9FC]">
              <div className="text-center">
                <div className="w-10 h-10 border-2 border-[#15528B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-[#66758A] text-sm">{mapText.loadingMap}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
