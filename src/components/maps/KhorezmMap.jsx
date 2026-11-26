import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, AlertCircle, MapPin } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { loadKhorezmGeoData, computeFeatureBounds } from '../../utils/geoData';
import {
  createBaseMapStyle,
  KHOREZM_BOUNDS,
  KHOREZM_DEFAULT_CENTER,
  KHOREZM_MAX_BOUNDS,
  MAP_THEME,
} from '../../config/mapStyle';

const UI_TEXT = {
  uz: {
    loading: 'Xarita yuklanmoqda...',
    error: "Geoma'lumotlarni yuklab bo'lmadi",
    retry: 'Qayta urinish',
    resetView: "Xarita ko'rinishini tiklash",
    adminCenter: "Ma'muriy markaz",
    population: 'Aholi',
    area: 'Maydon',
    details: 'Batafsil',
    cityBadge: 'Shahar',
    districtBadge: 'Tuman',
    capitalBadge: 'Viloyat markazi',
    unescoBadge: 'UNESCO merosi',
    riverLabel: 'Amudaryo',
  },
  ru: {
    loading: 'Загрузка карты...',
    error: 'Не удалось загрузить геоданные',
    retry: 'Повторить',
    resetView: 'Сбросить вид карты',
    adminCenter: 'Административный центр',
    population: 'Население',
    area: 'Площадь',
    details: 'Подробнее',
    cityBadge: 'Город',
    districtBadge: 'Район',
    capitalBadge: 'Областной центр',
    unescoBadge: 'Наследие ЮНЕСКО',
    riverLabel: 'Амударья',
  },
  en: {
    loading: 'Loading GIS map...',
    error: 'Could not load geographic data',
    retry: 'Retry',
    resetView: 'Reset map view',
    adminCenter: 'Administrative center',
    population: 'Population',
    area: 'Area',
    details: 'Details',
    cityBadge: 'City',
    districtBadge: 'District',
    capitalBadge: 'Regional Capital',
    unescoBadge: 'UNESCO City',
    riverLabel: 'Amu Darya',
  },
};

function getLocalizedProp(props, prefix, lang) {
  return props?.[`${prefix}_${lang}`] || props?.[`${prefix}_uz`] || '';
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Reusable MapLibre GL JS interactive GIS map of Khorezm Region (ADM1, ADM2, centers, Amu Darya).
 * Modes: 'preview' (homepage right card), 'compact' (section overview cards), 'full' (/xarita page).
 */
export default function KhorezmMap({
  mode = 'preview',
  className = '',
  selectedSlug = null,
  onSelectDistrict = null,
  visibleLayers = { districts: true, centers: true, landmarks: false, river: true },
  extraPoints = [],
  focusLocation = null,
  showResetButton = true,
  showFullscreen = true,
}) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const labels = UI_TEXT[language] || UI_TEXT.uz;

  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const maplibreRef = useRef(null);
  const geoRef = useRef(null);
  const hoveredIdRef = useRef(null);
  const selectedIdRef = useRef(null);
  const languageRef = useRef(language);
  const onSelectRef = useRef(onSelectDistrict);
  const navigateRef = useRef(navigate);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    languageRef.current = language;
    onSelectRef.current = onSelectDistrict;
    navigateRef.current = navigate;
  }, [language, onSelectDistrict, navigate]);

  const isCompact = mode === 'compact';
  const isFull = mode === 'full';
  const fitPadding = isCompact ? 18 : isFull ? 36 : 24;

  const buildDistrictPopupHtml = useCallback((props, lang) => {
    const ui = UI_TEXT[lang] || UI_TEXT.uz;
    const title = getLocalizedProp(props, 'name', lang);
    const center = getLocalizedProp(props, 'center', lang);
    const isCity = props.typeKey === 'city';
    const badge = isCity ? ui.cityBadge : ui.districtBadge;
    const badgeBg = isCity ? '#FEF3C7' : '#EBF3FA';
    const badgeColor = isCity ? '#B45309' : '#15528B';

    return `
      <div style="font-family: Inter, system-ui, sans-serif; min-width: 195px; max-width: 245px; color: #17243B;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px;">
          <span style="font-weight:700; font-size:13px; line-height:1.25;">${escapeHtml(title)}</span>
          <span style="font-size:10px; font-weight:700; padding:2px 7px; border-radius:999px; background:${badgeBg}; color:${badgeColor}; white-space:nowrap;">${escapeHtml(badge)}</span>
        </div>
        ${center ? `<div style="font-size:11px; color:#66758A; margin-bottom:4px;"><strong style="color:#17243B;">${escapeHtml(ui.adminCenter)}:</strong> ${escapeHtml(center)}</div>` : ''}
        <div style="display:flex; gap:10px; font-size:11px; color:#66758A; padding:4px 0; border-top:1px solid #F1F5F9; margin-top:4px;">
          ${props.population ? `<span><strong style="color:#17243B;">${escapeHtml(ui.population)}:</strong> ${escapeHtml(props.population)}</span>` : ''}
          ${props.area ? `<span><strong style="color:#17243B;">${escapeHtml(ui.area)}:</strong> ${escapeHtml(props.area)}</span>` : ''}
        </div>
        ${
          props.slug
            ? `<button type="button" data-khorezm-slug="${escapeHtml(props.slug)}" style="margin-top:6px; width:100%; background:#15528B; color:#fff; border:none; border-radius:8px; padding:5px 10px; font-size:11px; font-weight:600; cursor:pointer;">${escapeHtml(ui.details)} →</button>`
            : ''
        }
      </div>
    `;
  }, []);

  const buildCenterPopupHtml = useCallback((props, lang) => {
    const ui = UI_TEXT[lang] || UI_TEXT.uz;
    const name = getLocalizedProp(props, 'name', lang);
    const districtName = getLocalizedProp(props, 'district', lang);
    const badge = props.is_capital
      ? ui.capitalBadge
      : props.is_unesco
        ? ui.unescoBadge
        : ui.adminCenter;
    const badgeBg = props.is_capital ? '#FEE2E2' : props.is_unesco ? '#FEF3C7' : '#EBF3FA';
    const badgeColor = props.is_capital ? '#B91C1C' : props.is_unesco ? '#B45309' : '#15528B';

    return `
      <div style="font-family: Inter, system-ui, sans-serif; min-width: 185px; max-width: 235px; color: #17243B;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; margin-bottom:4px;">
          <span style="font-weight:700; font-size:13px;">${escapeHtml(name)}</span>
          <span style="font-size:10px; font-weight:700; padding:2px 7px; border-radius:999px; background:${badgeBg}; color:${badgeColor}; white-space:nowrap;">${escapeHtml(badge)}</span>
        </div>
        ${districtName ? `<div style="font-size:11px; color:#66758A; margin-bottom:4px;">${escapeHtml(districtName)}</div>` : ''}
        <div style="display:flex; gap:10px; font-size:11px; color:#66758A; padding-top:4px; border-top:1px solid #F1F5F9;">
          ${props.population ? `<span><strong style="color:#17243B;">${escapeHtml(ui.population)}:</strong> ${escapeHtml(props.population)}</span>` : ''}
          ${props.area ? `<span><strong style="color:#17243B;">${escapeHtml(ui.area)}:</strong> ${escapeHtml(props.area)}</span>` : ''}
        </div>
        ${
          props.district_slug
            ? `<button type="button" data-khorezm-slug="${escapeHtml(props.district_slug)}" style="margin-top:6px; width:100%; background:#15528B; color:#fff; border:none; border-radius:8px; padding:5px 10px; font-size:11px; font-weight:600; cursor:pointer;">${escapeHtml(ui.details)} →</button>`
            : ''
        }
      </div>
    `;
  }, []);

  const resetView = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    map.fitBounds(KHOREZM_BOUNDS, { padding: fitPadding, duration: 600 });
  }, [fitPadding]);

  // Initialize MapLibre GL once per mount on client only
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return undefined;

    let cancelled = false;
    let mapInstance = null;

    setLoading(true);
    setError(null);
    setMapReady(false);

    async function init() {
      try {
        const [maplibreglModule, workerUrlModule, geo] = await Promise.all([
          import('maplibre-gl'),
          import('maplibre-gl/dist/maplibre-gl-worker.mjs?url'),
          loadKhorezmGeoData(),
          import('maplibre-gl/dist/maplibre-gl.css'),
        ]);

        if (cancelled || !containerRef.current) return;

        const maplibregl = maplibreglModule.default || maplibreglModule;
        if (typeof maplibregl.setWorkerUrl === 'function' && workerUrlModule?.default) {
          maplibregl.setWorkerUrl(workerUrlModule.default);
        }
        maplibreRef.current = maplibregl;
        geoRef.current = geo;

        mapInstance = new maplibregl.Map({
          container: containerRef.current,
          style: createBaseMapStyle(),
          center: KHOREZM_DEFAULT_CENTER,
          zoom: isCompact ? 7.3 : isFull ? 8.3 : 7.6,
          minZoom: 6.2,
          maxZoom: 14,
          maxBounds: KHOREZM_MAX_BOUNDS,
          attributionControl: false,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
        });

        mapRef.current = mapInstance;

        mapInstance.addControl(
          new maplibregl.AttributionControl({ compact: !isFull }),
          'bottom-right'
        );

        mapInstance.addControl(
          new maplibregl.NavigationControl({ showCompass: false }),
          'top-right'
        );

        if (showFullscreen && !isCompact) {
          mapInstance.addControl(new maplibregl.FullscreenControl(), 'top-right');
        }

        const popup = new maplibregl.Popup({
          closeButton: true,
          closeOnClick: true,
          maxWidth: '270px',
          offset: 10,
        });
        popupRef.current = popup;

        // Handle clickable navigation buttons inside popups
        const containerEl = containerRef.current;
        const onPopupClick = (e) => {
          const btn = e.target.closest?.('[data-khorezm-slug]');
          if (btn) {
            const slug = btn.getAttribute('data-khorezm-slug');
            if (slug) navigateRef.current(`/tumanlar/${slug}`);
          }
        };
        containerEl.addEventListener('click', onPopupClick);

        mapInstance.on('load', () => {
          if (cancelled) return;

          const lang = languageRef.current;
          const nameProp = `name_${lang}`;
          const shortProp = `short_${lang}`;

          // 1. Sources (separate sources per GIS layer)
          mapInstance.addSource('khorezm-region', {
            type: 'geojson',
            data: geo.region,
          });

          mapInstance.addSource('khorezm-districts', {
            type: 'geojson',
            data: geo.districts,
            promoteId: 'id',
          });

          mapInstance.addSource('khorezm-district-labels', {
            type: 'geojson',
            data: geo.districtLabels,
          });

          mapInstance.addSource('khorezm-centers', {
            type: 'geojson',
            data: geo.centers,
          });

          mapInstance.addSource('khorezm-river', {
            type: 'geojson',
            data: geo.river,
          });

          mapInstance.addSource('khorezm-river-labels', {
            type: 'geojson',
            data: geo.riverLabels,
          });

          mapInstance.addSource('khorezm-neighbors', {
            type: 'geojson',
            data: geo.neighborLabels,
          });

          mapInstance.addSource('khorezm-extra-poi', {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] },
          });

          // 2. Layers
          // ADM1 subtle light green fill
          mapInstance.addLayer({
            id: 'khorezm-region-fill',
            type: 'fill',
            source: 'khorezm-region',
            paint: {
              'fill-color': MAP_THEME.regionFill,
              'fill-opacity': MAP_THEME.regionFillOpacity,
            },
          });

          // ADM2 district polygons with hover & selection feature-state styling
          mapInstance.addLayer({
            id: 'khorezm-districts-fill',
            type: 'fill',
            source: 'khorezm-districts',
            paint: {
              'fill-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                ['case', ['==', ['get', 'typeKey'], 'city'], MAP_THEME.citySelectedFill, MAP_THEME.districtSelectedFill],
                ['boolean', ['feature-state', 'hover'], false],
                ['case', ['==', ['get', 'typeKey'], 'city'], MAP_THEME.cityHoverFill, MAP_THEME.districtHoverFill],
                ['case', ['==', ['get', 'typeKey'], 'city'], MAP_THEME.cityFill, MAP_THEME.districtFill],
              ],
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                0.78,
                ['boolean', ['feature-state', 'hover'], false],
                0.82,
                0.55,
              ],
            },
          });

          // Internal district borders
          mapInstance.addLayer({
            id: 'khorezm-districts-outline',
            type: 'line',
            source: 'khorezm-districts',
            paint: {
              'line-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                MAP_THEME.selectedBoundaryColor,
                MAP_THEME.districtBoundaryColor,
              ],
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                2.4,
                ['boolean', ['feature-state', 'hover'], false],
                1.8,
                1.2,
              ],
              'line-opacity': 0.9,
            },
          });

          // ADM1 Khorezm Region outer boundary
          mapInstance.addLayer({
            id: 'khorezm-region-outline',
            type: 'line',
            source: 'khorezm-region',
            paint: {
              'line-color': MAP_THEME.regionBoundaryColor,
              'line-width': isCompact ? 2.2 : 2.8,
              'line-opacity': 0.95,
            },
          });

          // Amu Darya River channel
          mapInstance.addLayer({
            id: 'khorezm-river-line',
            type: 'line',
            source: 'khorezm-river',
            layout: {
              'line-cap': 'round',
              'line-join': 'round',
            },
            paint: {
              'line-color': MAP_THEME.riverColor,
              'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1.8, 9, 3.2, 12, 4.5],
              'line-opacity': 0.78,
            },
          });

          // River label
          mapInstance.addLayer({
            id: 'khorezm-river-label',
            type: 'symbol',
            source: 'khorezm-river-labels',
            layout: {
              'text-field': ['coalesce', ['get', nameProp], ['get', 'name_uz']],
              'text-font': ['Open Sans Bold'],
              'text-size': isCompact ? 10 : 11.5,
              'text-rotate': 34,
              'text-allow-overlap': true,
            },
            paint: {
              'text-color': MAP_THEME.riverLabelColor,
              'text-halo-color': '#FFFFFF',
              'text-halo-width': 1.5,
            },
          });

          // Neighboring territories labels (Qoraqalpog'iston, Buxoro, Turkmaniston)
          mapInstance.addLayer({
            id: 'khorezm-neighbors-label',
            type: 'symbol',
            source: 'khorezm-neighbors',
            layout: {
              'text-field': ['coalesce', ['get', nameProp], ['get', 'name_uz']],
              'text-font': ['Open Sans Bold'],
              'text-size': isCompact ? 9.5 : 11,
              'text-line-height': 1.15,
              'text-justify': 'center',
              'text-allow-overlap': false,
              'text-padding': 4,
            },
            paint: {
              'text-color': MAP_THEME.neighborLabelColor,
              'text-halo-color': '#F8FAFC',
              'text-halo-width': 1.8,
            },
          });

          // District polygon labels (excluding cities since centers mark Urganch & Xiva prominently)
          mapInstance.addLayer({
            id: 'khorezm-districts-label',
            type: 'symbol',
            source: 'khorezm-district-labels',
            filter: ['!=', ['get', 'typeKey'], 'city'],
            layout: {
              'text-field': ['coalesce', ['get', shortProp], ['get', 'short_uz']],
              'text-font': ['Open Sans Regular'],
              'text-size': ['interpolate', ['linear'], ['zoom'], 6.5, isCompact ? 8.5 : 9.5, 9, 11.5, 11, 13],
              'text-allow-overlap': false,
              'text-padding': 3,
              'text-optional': true,
            },
            paint: {
              'text-color': MAP_THEME.districtLabelColor,
              'text-halo-color': 'rgba(255, 255, 255, 0.92)',
              'text-halo-width': 1.5,
            },
          });

          // Extra POI markers (used in full MapPage when monuments/natural layer toggled)
          mapInstance.addLayer({
            id: 'khorezm-extra-poi-circle',
            type: 'circle',
            source: 'khorezm-extra-poi',
            paint: {
              'circle-radius': 5.5,
              'circle-color': ['case', ['==', ['get', 'typeKey'], 'natural'], '#0D9488', '#D97706'],
              'circle-stroke-width': 1.8,
              'circle-stroke-color': '#FFFFFF',
            },
          });

          // Administrative centers circle markers
          mapInstance.addLayer({
            id: 'khorezm-centers-circle',
            type: 'circle',
            source: 'khorezm-centers',
            paint: {
              'circle-radius': [
                'case',
                ['boolean', ['get', 'is_capital'], false],
                isCompact ? 5.5 : 7,
                ['boolean', ['get', 'is_unesco'], false],
                isCompact ? 5 : 6.2,
                isCompact ? 3.5 : 4.5,
              ],
              'circle-color': [
                'case',
                ['boolean', ['get', 'is_capital'], false],
                MAP_THEME.capitalColor,
                ['boolean', ['get', 'is_unesco'], false],
                MAP_THEME.khivaColor,
                MAP_THEME.centerColor,
              ],
              'circle-stroke-width': [
                'case',
                ['boolean', ['get', 'is_capital'], false],
                2.2,
                1.8,
              ],
              'circle-stroke-color': '#FFFFFF',
            },
          });

          // Administrative centers labels — cities (Urganch, Xiva) in Bold, towns in Regular
          mapInstance.addLayer({
            id: 'khorezm-centers-city-label',
            type: 'symbol',
            source: 'khorezm-centers',
            filter: ['==', ['get', 'is_city'], true],
            layout: {
              'text-field': ['coalesce', ['get', nameProp], ['get', 'name_uz']],
              'text-font': ['Open Sans Bold'],
              'text-size': isCompact ? 11 : 12.5,
              'text-anchor': 'left',
              'text-offset': [0.75, 0],
              'text-allow-overlap': true,
              'symbol-sort-key': 1,
            },
            paint: {
              'text-color': [
                'case',
                ['boolean', ['get', 'is_capital'], false],
                '#991B1B',
                '#92400E',
              ],
              'text-halo-color': '#FFFFFF',
              'text-halo-width': 2,
            },
          });

          mapInstance.addLayer({
            id: 'khorezm-centers-label',
            type: 'symbol',
            source: 'khorezm-centers',
            filter: ['!=', ['get', 'is_city'], true],
            layout: {
              'text-field': ['coalesce', ['get', nameProp], ['get', 'name_uz']],
              'text-font': ['Open Sans Regular'],
              'text-size': isCompact ? 8.5 : 10,
              'text-anchor': 'left',
              'text-offset': [0.65, 0],
              'text-allow-overlap': false,
              'text-optional': true,
              'symbol-sort-key': 3,
            },
            paint: {
              'text-color': '#17243B',
              'text-halo-color': '#FFFFFF',
              'text-halo-width': 1.8,
            },
          });

          // Fit cleanly to Khorezm ADM1 boundaries
          mapInstance.fitBounds(KHOREZM_BOUNDS, { padding: fitPadding, duration: 0 });

          // Hover state tracking
          mapInstance.on('mousemove', 'khorezm-districts-fill', (e) => {
            if (!e.features || e.features.length === 0) return;
            mapInstance.getCanvas().style.cursor = 'pointer';
            const featureId = e.features[0].id;
            if (hoveredIdRef.current !== null && hoveredIdRef.current !== featureId) {
              mapInstance.setFeatureState(
                { source: 'khorezm-districts', id: hoveredIdRef.current },
                { hover: false }
              );
            }
            hoveredIdRef.current = featureId;
            mapInstance.setFeatureState(
              { source: 'khorezm-districts', id: featureId },
              { hover: true }
            );
          });

          mapInstance.on('mouseleave', 'khorezm-districts-fill', () => {
            mapInstance.getCanvas().style.cursor = '';
            if (hoveredIdRef.current !== null) {
              mapInstance.setFeatureState(
                { source: 'khorezm-districts', id: hoveredIdRef.current },
                { hover: false }
              );
              hoveredIdRef.current = null;
            }
          });

          // Center marker pointer cursor & click popup
          mapInstance.on('mouseenter', 'khorezm-centers-circle', () => {
            mapInstance.getCanvas().style.cursor = 'pointer';
          });
          mapInstance.on('mouseleave', 'khorezm-centers-circle', () => {
            mapInstance.getCanvas().style.cursor = '';
          });

          mapInstance.on('click', 'khorezm-centers-circle', (e) => {
            if (!e.features || e.features.length === 0) return;
            e.originalEvent._handledCenter = true;
            const feat = e.features[0];
            const props = feat.properties;
            const coords = feat.geometry.coordinates.slice();

            if (selectedIdRef.current !== null && selectedIdRef.current !== feat.id) {
              mapInstance.setFeatureState(
                { source: 'khorezm-districts', id: selectedIdRef.current },
                { selected: false }
              );
            }
            selectedIdRef.current = feat.id;
            mapInstance.setFeatureState(
              { source: 'khorezm-districts', id: feat.id },
              { selected: true }
            );

            popup
              .setLngLat(coords)
              .setHTML(buildCenterPopupHtml(props, languageRef.current))
              .addTo(mapInstance);

            if (onSelectRef.current) {
              onSelectRef.current({ slug: props.district_slug, ...props });
            }
          });

          // District polygon click popup & selection
          mapInstance.on('click', 'khorezm-districts-fill', (e) => {
            if (e.originalEvent._handledCenter) return;
            if (!e.features || e.features.length === 0) return;
            const feat = e.features[0];
            const props = feat.properties;

            if (selectedIdRef.current !== null && selectedIdRef.current !== feat.id) {
              mapInstance.setFeatureState(
                { source: 'khorezm-districts', id: selectedIdRef.current },
                { selected: false }
              );
            }
            selectedIdRef.current = feat.id;
            mapInstance.setFeatureState(
              { source: 'khorezm-districts', id: feat.id },
              { selected: true }
            );

            popup
              .setLngLat(e.lngLat)
              .setHTML(buildDistrictPopupHtml(props, languageRef.current))
              .addTo(mapInstance);

            if (onSelectRef.current) {
              onSelectRef.current(props);
            }
          });

          // Extra POI click
          mapInstance.on('mouseenter', 'khorezm-extra-poi-circle', () => {
            mapInstance.getCanvas().style.cursor = 'pointer';
          });
          mapInstance.on('mouseleave', 'khorezm-extra-poi-circle', () => {
            mapInstance.getCanvas().style.cursor = '';
          });
          mapInstance.on('click', 'khorezm-extra-poi-circle', (e) => {
            if (!e.features || e.features.length === 0) return;
            e.originalEvent._handledCenter = true;
            const feat = e.features[0];
            const props = feat.properties;
            popup
              .setLngLat(feat.geometry.coordinates.slice())
              .setHTML(
                `<div style="font-family: Inter, system-ui, sans-serif; color:#17243B; max-width:220px;">
                  <div style="font-weight:700; font-size:13px; margin-bottom:2px;">${escapeHtml(props.name)}</div>
                  <div style="font-size:10px; font-weight:600; color:#15528B; margin-bottom:4px;">${escapeHtml(props.type)}</div>
                  <div style="font-size:11px; color:#66758A;">${escapeHtml(props.description)}</div>
                </div>`
              )
              .addTo(mapInstance);
          });

          setMapReady(true);
          setLoading(false);
        });

        mapInstance.on('error', (ev) => {
          // Non-fatal tile fetch warning should not break interactive GeoJSON layers
          if (ev?.error?.message && !ev.error.message.includes('tile')) {
            console.error('MapLibre runtime error:', ev.error);
          }
        });

        // Attach cleanup handler to close listener cleanly
        mapInstance.__cleanupDom = () => {
          containerEl.removeEventListener('click', onPopupClick);
        };
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to initialize Khorezm GIS map:', err);
          setError(err?.message || 'GIS load error');
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
      if (mapInstance) {
        mapInstance.__cleanupDom?.();
        mapInstance.remove();
      }
      mapRef.current = null;
      hoveredIdRef.current = null;
      selectedIdRef.current = null;
    };
  }, [reloadKey, isCompact, isFull, fitPadding, showFullscreen, buildDistrictPopupHtml, buildCenterPopupHtml]);

  // Update map label languages live when language switches
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const nameProp = `name_${language}`;
    const shortProp = `short_${language}`;

    if (map.getLayer('khorezm-districts-label')) {
      map.setLayoutProperty('khorezm-districts-label', 'text-field', [
        'coalesce',
        ['get', shortProp],
        ['get', 'short_uz'],
      ]);
    }
    if (map.getLayer('khorezm-centers-city-label')) {
      map.setLayoutProperty('khorezm-centers-city-label', 'text-field', [
        'coalesce',
        ['get', nameProp],
        ['get', 'name_uz'],
      ]);
    }
    if (map.getLayer('khorezm-centers-label')) {
      map.setLayoutProperty('khorezm-centers-label', 'text-field', [
        'coalesce',
        ['get', nameProp],
        ['get', 'name_uz'],
      ]);
    }
    if (map.getLayer('khorezm-neighbors-label')) {
      map.setLayoutProperty('khorezm-neighbors-label', 'text-field', [
        'coalesce',
        ['get', nameProp],
        ['get', 'name_uz'],
      ]);
    }
    if (map.getLayer('khorezm-river-label')) {
      map.setLayoutProperty('khorezm-river-label', 'text-field', [
        'coalesce',
        ['get', nameProp],
        ['get', 'name_uz'],
      ]);
    }
  }, [language, mapReady]);

  // Sync visible layers dynamically
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const showDist = visibleLayers.districts !== false ? 'visible' : 'none';
    const showCenters = visibleLayers.centers !== false ? 'visible' : 'none';
    const showRiver = visibleLayers.river !== false ? 'visible' : 'none';
    const showExtra = extraPoints.length > 0 ? 'visible' : 'none';

    ['khorezm-districts-fill', 'khorezm-districts-outline', 'khorezm-districts-label'].forEach((id) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', showDist);
    });
    ['khorezm-centers-circle', 'khorezm-centers-city-label', 'khorezm-centers-label'].forEach((id) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', showCenters);
    });
    ['khorezm-river-line', 'khorezm-river-label'].forEach((id) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', showRiver);
    });
    if (map.getLayer('khorezm-extra-poi-circle')) {
      map.setLayoutProperty('khorezm-extra-poi-circle', 'visibility', showExtra);
    }
  }, [visibleLayers, extraPoints.length, mapReady]);

  // Sync extraPoints GeoJSON source
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const src = map.getSource('khorezm-extra-poi');
    if (!src) return;

    src.setData({
      type: 'FeatureCollection',
      features: extraPoints.map((pt) => ({
        type: 'Feature',
        id: pt.id,
        properties: {
          name: pt.name,
          type: pt.type,
          typeKey: pt.typeKey,
          description: pt.description,
        },
        geometry: {
          type: 'Point',
          coordinates: [pt.coordinates.lng, pt.coordinates.lat],
        },
      })),
    });
  }, [extraPoints, mapReady]);

  // Sync externally controlled selectedSlug (from MapPage sidebar click/search)
  useEffect(() => {
    const map = mapRef.current;
    const geo = geoRef.current;
    if (!map || !mapReady || !geo) return;

    if (selectedIdRef.current !== null) {
      map.setFeatureState(
        { source: 'khorezm-districts', id: selectedIdRef.current },
        { selected: false }
      );
      selectedIdRef.current = null;
    }

    if (!selectedSlug) return;

    const feature = geo.districts.features.find((f) => f.properties?.slug === selectedSlug);
    if (!feature) return;

    selectedIdRef.current = feature.id;
    map.setFeatureState(
      { source: 'khorezm-districts', id: feature.id },
      { selected: true }
    );

    const bounds = computeFeatureBounds(feature);
    if (bounds) {
      map.fitBounds(bounds, {
        padding: isFull ? 70 : 35,
        maxZoom: feature.properties?.typeKey === 'city' ? 11.8 : 10.2,
        duration: 650,
      });
    }

    if (popupRef.current) {
      popupRef.current
        .setLngLat([feature.properties.label_lon, feature.properties.label_lat])
        .setHTML(buildDistrictPopupHtml(feature.properties, language))
        .addTo(map);
    }
  }, [selectedSlug, mapReady, isFull, language, buildDistrictPopupHtml]);

  // Focus external non-district POI location (from MapPage sidebar)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !focusLocation?.coordinates) return;

    const coords = [focusLocation.coordinates.lng, focusLocation.coordinates.lat];
    map.flyTo({ center: coords, zoom: 11.5, duration: 650 });
    if (popupRef.current) {
      popupRef.current
        .setLngLat(coords)
        .setHTML(
          `<div style="font-family: Inter, system-ui, sans-serif; color:#17243B; max-width:220px;">
            <div style="font-weight:700; font-size:13px; margin-bottom:2px;">${escapeHtml(focusLocation.name)}</div>
            <div style="font-size:10px; font-weight:600; color:#15528B; margin-bottom:4px;">${escapeHtml(focusLocation.type)}</div>
            <div style="font-size:11px; color:#66758A;">${escapeHtml(focusLocation.description)}</div>
          </div>`
        )
        .addTo(map);
    }
  }, [focusLocation, mapReady]);

  return (
    <div
      className={`relative rounded-xl overflow-hidden border border-[#DCE7F2] bg-[#F1F5F9] ${className}`}
      style={{ minHeight: isCompact ? '140px' : '240px' }}
      data-testid="khorezm-gis-map"
    >
      <div ref={containerRef} className="w-full h-full" />

      {showResetButton && mapReady && !error && (
        <button
          type="button"
          onClick={resetView}
          title={labels.resetView}
          aria-label={labels.resetView}
          className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 bg-white/95 hover:bg-white text-[#17243B] border border-[#DCE7F2] shadow-xs rounded-lg px-2.5 py-1.5 text-[11px] font-semibold cursor-pointer transition-colors"
        >
          <RotateCcw size={13} className="text-[#15528B]" />
          {!isCompact && <span className="hidden sm:inline">{labels.resetView}</span>}
        </button>
      )}

      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#F7F9FC]/90 backdrop-blur-[1px]">
          <div className="text-center px-4">
            <div className="w-8 h-8 border-2 border-[#15528B] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-[#66758A] font-medium">{labels.loading}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#F7F9FC] p-4">
          <div className="text-center max-w-xs">
            <AlertCircle size={24} className="text-red-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-[#17243B] mb-1">{labels.error}</p>
            <p className="text-[11px] text-[#66758A] mb-3">{error}</p>
            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15528B] text-white text-xs font-semibold cursor-pointer hover:bg-[#123A61]"
            >
              <MapPin size={12} /> {labels.retry}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
