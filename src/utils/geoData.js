/**
 * Cached asynchronous GeoJSON loader and geometry validation helpers for Khorezm GIS datasets.
 * Fetches static GeoJSON once per session so multiple map instances reuse cached FeatureCollections.
 */

let cachedPromise = null;

function isValidFeatureCollection(fc, expectedType) {
  if (!fc || fc.type !== 'FeatureCollection' || !Array.isArray(fc.features) || fc.features.length === 0) {
    return false;
  }
  return fc.features.every((f) => {
    if (!f || f.type !== 'Feature' || !f.geometry || !f.geometry.coordinates) return false;
    if (expectedType && f.geometry.type !== expectedType && !expectedType.includes(f.geometry.type)) {
      return false;
    }
    return true;
  });
}

async function fetchJsonStrict(url) {
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
  }
  return res.json();
}

export async function loadKhorezmGeoData() {
  if (cachedPromise) return cachedPromise;

  cachedPromise = (async () => {
    const [region, districts, centers, context] = await Promise.all([
      fetchJsonStrict('/geo/khorezm-region.geojson'),
      fetchJsonStrict('/geo/khorezm-districts.geojson'),
      fetchJsonStrict('/geo/khorezm-centers.geojson'),
      fetchJsonStrict('/geo/khorezm-context.geojson'),
    ]);

    if (!isValidFeatureCollection(region, ['Polygon', 'MultiPolygon'])) {
      throw new Error('Invalid khorezm-region.geojson geometry');
    }
    if (!isValidFeatureCollection(districts, ['Polygon', 'MultiPolygon'])) {
      throw new Error('Invalid khorezm-districts.geojson geometry');
    }
    if (!isValidFeatureCollection(centers, ['Point'])) {
      throw new Error('Invalid khorezm-centers.geojson geometry');
    }
    if (!isValidFeatureCollection(context)) {
      throw new Error('Invalid khorezm-context.geojson geometry');
    }

    // Build single non-overlapping label anchor per district feature (even for MultiPolygons)
    const districtLabels = {
      type: 'FeatureCollection',
      features: districts.features.map((f) => ({
        type: 'Feature',
        id: f.id,
        properties: { ...f.properties },
        geometry: {
          type: 'Point',
          coordinates: [f.properties.label_lon, f.properties.label_lat],
        },
      })),
    };

    const riverFeatures = context.features.filter((f) => f.properties?.kind === 'river');
    const neighborLabelFeatures = context.features.filter((f) => f.properties?.kind !== 'river');

    // Approximate midpoint along main Amu Darya channel near Khorezm oasis for river label
    const riverLabels = {
      type: 'FeatureCollection',
      features:
        riverFeatures.length > 0
          ? [
              {
                type: 'Feature',
                id: 901,
                properties: {
                  ...riverFeatures[0].properties,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [60.98, 41.48],
                },
              },
            ]
          : [],
    };

    return {
      region,
      districts,
      districtLabels,
      centers,
      river: { type: 'FeatureCollection', features: riverFeatures },
      riverLabels,
      neighborLabels: { type: 'FeatureCollection', features: neighborLabelFeatures },
    };
  })().catch((err) => {
    cachedPromise = null;
    throw err;
  });

  return cachedPromise;
}

export function computeFeatureBounds(feature) {
  if (!feature?.geometry?.coordinates) return null;
  let minLon = Infinity;
  let minLat = Infinity;
  let maxLon = -Infinity;
  let maxLat = -Infinity;

  const visit = (coords) => {
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
      const [lon, lat] = coords;
      if (lon < minLon) minLon = lon;
      if (lat < minLat) minLat = lat;
      if (lon > maxLon) maxLon = lon;
      if (lat > maxLat) maxLat = lat;
      return;
    }
    for (const item of coords) visit(item);
  };

  visit(feature.geometry.coordinates);
  if (!Number.isFinite(minLon)) return null;
  return [
    [minLon, minLat],
    [maxLon, maxLat],
  ];
}
