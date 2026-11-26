/**
 * Configurable MapLibre GL tile provider and cartographic theme configuration.
 * Substitute `VITE_MAP_TILE_URL` (or switch provider key) for self-hosted OSM / commercial tiles.
 */

export const TILE_PROVIDERS = {
  osmStandard: {
    id: 'osm-standard',
    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
    tileSize: 256,
    attribution: '© OpenStreetMap contributors',
    maxzoom: 18,
  },
  esriLightGray: {
    id: 'esri-light-gray',
    tiles: [
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    ],
    tileSize: 256,
    attribution: '© Esri · OpenStreetMap contributors',
    maxzoom: 16,
  },
};

const customTileUrl =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_MAP_TILE_URL
    ? import.meta.env.VITE_MAP_TILE_URL
    : null;

export const ACTIVE_TILE_PROVIDER = customTileUrl
  ? {
      id: 'custom-tiles',
      tiles: [customTileUrl],
      tileSize: 256,
      attribution:
        import.meta.env?.VITE_MAP_TILE_ATTRIBUTION || '© OpenStreetMap contributors',
      maxzoom: 18,
    }
  : TILE_PROVIDERS.osmStandard;

// Carto PBF glyphs verified to serve Latin + Cyrillic Open Sans ranges cleanly
export const GLYPHS_URL =
  'https://tiles.basemaps.cartocdn.com/fonts/{fontstack}/{range}.pbf';

// Bounding box enclosing all of Khorezm Region (western oasis + Tuproqqal'a)
export const KHOREZM_BOUNDS = [
  [59.98, 40.52], // SW [lon, lat]
  [62.52, 42.06], // NE [lon, lat]
];

export const KHOREZM_MAX_BOUNDS = [
  [58.4, 39.6],
  [64.1, 43.1],
];

export const KHOREZM_DEFAULT_CENTER = [60.88, 41.35];

export const MAP_THEME = {
  regionFill: '#DCFCE7',
  regionFillOpacity: 0.42,
  districtFill: '#ECFDF5',
  districtHoverFill: '#BBF7D0',
  districtSelectedFill: '#BAE6FD',
  cityFill: '#FEF3C7',
  cityHoverFill: '#FDE68A',
  citySelectedFill: '#93C5FD',
  regionBoundaryColor: '#166534',
  districtBoundaryColor: '#16A34A',
  selectedBoundaryColor: '#15528B',
  riverColor: '#3B82F6',
  riverLabelColor: '#1D4ED8',
  centerColor: '#15528B',
  capitalColor: '#DC2626',
  khivaColor: '#C58B43',
  districtLabelColor: '#1E293B',
  neighborLabelColor: '#64748B',
};

export function createBaseMapStyle(provider = ACTIVE_TILE_PROVIDER) {
  return {
    version: 8,
    name: 'Khorezm GIS Light',
    glyphs: GLYPHS_URL,
    sources: {
      'osm-basemap': {
        type: 'raster',
        tiles: provider.tiles,
        tileSize: provider.tileSize || 256,
        attribution: provider.attribution,
        maxzoom: provider.maxzoom || 18,
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#F1F5F9',
        },
      },
      {
        id: 'osm-basemap-layer',
        type: 'raster',
        source: 'osm-basemap',
        paint: {
          'raster-opacity': 0.78,
          'raster-saturation': -0.45,
          'raster-brightness-min': 0.14,
          'raster-contrast': -0.12,
        },
      },
    ],
  };
}
