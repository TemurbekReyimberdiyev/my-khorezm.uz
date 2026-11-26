# Khorezm Region GIS Map — Geospatial Data Sources & Architecture

## 1. Authoritative Data Sources
All geographic boundaries, district/city polygons, administrative centers, and hydrological geometry in `public/geo/` were sourced from verified OpenStreetMap data via Nominatim/Overpass boundaries (WGS84 / EPSG:4326) and cross-checked against geoBoundaries (`UZB ADM1/ADM2`) and official regional statistics (`xorazmstat.uz`):

- **`public/geo/khorezm-region.geojson`**
  - **Scope:** Khorezm Region (Xorazm viloyati, ISO 3166-2 `UZ-XO`, ADM1).
  - **Source:** OpenStreetMap `relation/196242` (`MultiPolygon`: western Khorezm oasis + eastern Tuproqqal'a exclave/extension).
  - **Simplification:** Douglas-Peucker `tolerance=0.00045` (~45m) preserving boundary topology while keeping asset size fast (`~14.5 KB`).

- **`public/geo/khorezm-districts.geojson`**
  - **Scope:** All **13** current administrative units (ADM2):
    1. `urganch-shahar` (Urganch City — OSM municipal polygon `way/110132970`)
    2. `xiva-shahar` (Xiva City — OSM municipal polygon `way/110260748`)
    3. `bogot-tumani` (`relation/2097711`)
    4. `gurlan-tumani` (`relation/2097623`)
    5. `qoshkopir-tumani` (`relation/2097689`)
    6. `shovot-tumani` (`relation/2097624`)
    7. `urganch-tumani` (`relation/2097690`, with Urganch City enclave ring carved cleanly as an interior hole)
    8. `xiva-tumani` (`relation/2097691`, with Xiva City enclave ring carved cleanly as an interior hole)
    9. `xonqa-tumani` (`relation/2097712`)
    10. `hazorasp-tumani` (`relation/2097814`)
    11. `yangiariq-tumani` (`relation/2097692`)
    12. `yangibozor-tumani` (`relation/2097625`)
    13. `tuproqqala-tumani` (`relation/11992833`, created in 2020 from Hazorasp District — missing from older OCHA ROCCA / geoBoundaries 2020 snapshots, verified directly via OSM).
  - **Statistical Attributes:** `population`, `populationNum` (as of April 1, 2025 via `xorazmstat.uz`), `area`, `areaNum`, `density`, `mahallas`, `postalCode`, `founded` matched directly to `src/data/districts.js` by stable `id` (`1..13`) and `slug`.

- **`public/geo/khorezm-centers.geojson`**
  - **Scope:** Administrative centers and major cities (`Urganch` regional capital, `Xiva` UNESCO city & Xiva District seat, `Qorovul`, `Bog'ot`, `Gurlan`, `Qo'shko'pir`, `Shovot`, `Xonqa`, `Hazorasp`, `Yangiariq`, `Yangibozor`, `Pitnak`).
  - **Source:** OpenStreetMap place nodes inside bounded Khorezm viewport, validated with point-in-polygon checks inside `UZ-XO`.

- **`public/geo/khorezm-context.geojson`**
  - **Hydrology:** Clipped Amu Darya River segments (`20` LineStrings) from OpenStreetMap `relation/223008` within `[59.4..62.8, 40.3..42.4]`.
  - **Neighboring Labels:** Geographically verified coordinates strictly outside Khorezm ADM1 for `Qoraqalpog'iston Respublikasi`, `Buxoro viloyati`, and `Turkmaniston`.

## 2. Base Map Tiles & Substitution
- Configured in `src/config/mapStyle.js`.
- Default light minimal basemap: CARTO Positron `light_nolabels` derived from OpenStreetMap (`© OpenStreetMap contributors · © CARTO`), paired with Carto Open Sans PBF glyphs (`Regular` + `Bold` supporting Latin & Cyrillic).
- Can be switched to standard OSM raster tiles (`TILE_PROVIDERS.osmStandard`) or a custom tile server via `VITE_MAP_TILE_URL` / `VITE_MAP_TILE_ATTRIBUTION` without touching map components.

## 3. PostgreSQL / PostGIS Readiness
Each GeoJSON feature preserves:
- WGS84 coordinates (`EPSG:4326`) with RFC 7946 winding (CCW outer rings, CW inner holes).
- Stable integer `id` (`1..13`), unique `slug`, and `osm_type`/`osm_id` foreign keys so a Django GeoDjango / PostGIS backend (`districts_district` table with `geom MultiPolygonField(srid=4326)`) can serve live GeoJSON / MVT vector tiles as a drop-in replacement for `/geo/*.geojson`.

## 4. Known Data Limitations Requiring Official Cadastral Verification
1. **Urganch City & Xiva City Administrative Borders:** Because OpenStreetMap does not yet publish separate `admin_level=6` cadastral boundary relations for cities of regional subordination (`Urganch shahri`, `Xiva shahri`), their OSM municipal urban boundaries (`way/110132970`, `way/110260748`) were used and carved as enclaves out of surrounding Urganch and Xiva districts. Expanding suburban municipal boundaries annexed after 2022 should be verified against UzKadastr (`kadastr.uz`) official shapefiles when deployed to production.
2. **Tuproqqal'a Exclave / Desert Sectors:** Eastern desert sectors bordering Bukhara Region rely on OSM `relation/11992833`; fine cadastral desert tract adjustments should likewise be cross-checked against UzKadastr ADM2 boundaries in a PostGIS backend.
