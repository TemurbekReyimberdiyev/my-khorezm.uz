import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { ArrowLeft, CheckCircle, ZoomIn } from 'lucide-react';
import { getDistricts } from '../data/districts';
import { useLanguage } from '../hooks/useLanguage';
import Badge from '../components/common/Badge';
import PageHero from '../components/common/PageHero';
import ImageLightbox from '../components/common/ImageLightbox';
import Icon3D from '../components/common/Icon3D';
import KhorezmMap from '../components/maps/KhorezmMap';

export default function DistrictDetailPage() {
  const { slug } = useParams();
  return <DistrictDetailContent key={slug} slug={slug} />;
}

function DistrictDetailContent({ slug }) {
  const { language, t } = useLanguage();
  const dText = t.pages.districts;
  const districts = getDistricts(language);

  const normalize = (s) => (s || '').replace(/'/g, '').toLowerCase();
  const district = districts.find((d) => d.slug === slug || normalize(d.slug) === normalize(slug));
  const [tab, setTab] = useState('overview');
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  if (!district) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#17243B] mb-4">{dText.notFound}</h1>
        <p className="text-sm text-[#66758A] mb-6">{dText.notFoundDesc}</p>
        <Link
          to="/tumanlar"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#15528B] text-white rounded-xl text-sm font-medium hover:bg-[#123A61] transition-colors"
        >
          <ArrowLeft size={16} /> {dText.backToList}
        </Link>
      </div>
    );
  }

  const tabs = [
    { v: 'overview', l: dText.tabs.overview, icon: 'map-pin' },
    { v: 'economy', l: dText.tabs.economy, icon: 'briefcase' },
    { v: 'agriculture', l: dText.tabs.agriculture, icon: 'leaf' },
    { v: 'tourism', l: dText.tabs.tourism, icon: 'compass' },
  ];

  const typeLabel = district.typeKey === 'city' ? dText.typeCity : dText.typeDistrict;

  const renderHighlightsSection = (items, iconName) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mt-5 pt-4 border-t border-[#E5EAF0]">
        <h3 className="text-xs font-bold uppercase tracking-wide text-[#66758A] mb-3">
          {dText.keyDirectionsLabel}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#F7F9FC] border border-[#E5EAF0] text-sm text-[#17243B]"
            >
              <Icon3D name={iconName} size={18} className="mt-0.5" />
              <span className="leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{district.name}</title>
      </Helmet>
      <PageHero
        title={district.name}
        subtitle={`${district.center} · ${district.population} · ${district.area}`}
        image={district.photo}
        breadcrumb={`${t.nav.home} > ${t.nav.districts} > ${district.name}`}
        badge={
          <Badge variant={district.typeKey === 'city' ? 'accent' : 'primary'}>
            {typeLabel}
          </Badge>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <Link
            to="/tumanlar"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] hover:underline"
          >
            <ArrowLeft size={14} /> {dText.backToList}
          </Link>
        </div>

        {/* 4 Key KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] flex items-center justify-center mx-auto mb-2">
              <Icon3D name="users" size={26} />
            </div>
            <div className="font-bold text-[#15528B] text-base sm:text-lg">{district.population}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{dText.population}</div>
          </div>
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] flex items-center justify-center mx-auto mb-2">
              <Icon3D name="map" size={26} />
            </div>
            <div className="font-bold text-[#15528B] text-base sm:text-lg">{district.area}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{dText.area}</div>
          </div>
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] flex items-center justify-center mx-auto mb-2">
              <Icon3D name="map-pin" size={26} />
            </div>
            <div className="font-bold text-[#15528B] text-sm sm:text-base leading-snug">{district.center || '—'}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{dText.center}</div>
          </div>
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#F3EEFF] flex items-center justify-center mx-auto mb-2">
              <Icon3D name="city" size={26} />
            </div>
            <div className="font-bold text-[#15528B] text-base sm:text-lg">{typeLabel}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{dText.status}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#E5EAF0] overflow-x-auto">
          {tabs.map((item) => (
            <button
              key={item.v}
              onClick={() => setTab(item.v)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                tab === item.v ? 'border-[#15528B] text-[#15528B]' : 'border-transparent text-[#66758A] hover:text-[#17243B]'
              }`}
            >
              <Icon3D name={item.icon} size={16} />
              <span>{item.l}</span>
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-5">
            {/* Hero Detail Card */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-5">
                <button
                  type="button"
                  onClick={() => setLightboxIdx(0)}
                  className="relative group w-full block rounded-xl overflow-hidden border border-[#E5EAF0] cursor-pointer"
                >
                  <img
                    src={district.photo}
                    alt={district.name}
                    className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={15} />
                  </span>
                </button>
              </div>
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="flag" size={20} />
                  <h2 className="font-bold text-[#17243B] text-lg">{dText.tabs.overview}</h2>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {district.founded && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-xs text-[#17243B]">
                      <span className="text-[#66758A]">{dText.foundedLabel}:</span>
                      <strong className="font-semibold text-[#15528B]">{district.founded}</strong>
                    </span>
                  )}
                  {district.density && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-xs text-[#17243B]">
                      <span className="text-[#66758A]">{dText.densityLabel}:</span>
                      <strong className="font-semibold text-[#15528B]">{district.density} /km²</strong>
                    </span>
                  )}
                  {district.subdivisions && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-xs text-[#17243B]">
                      <span className="text-[#66758A]">{dText.subdivisionsLabel}:</span>
                      <strong className="font-semibold text-[#15528B]">{district.subdivisions}</strong>
                    </span>
                  )}
                  {district.schools && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-xs text-[#17243B]">
                      <span className="text-[#66758A]">{dText.schoolsLabel}:</span>
                      <strong className="font-semibold text-[#15528B]">{district.schools}</strong>
                    </span>
                  )}
                  {district.postalCode && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-xs text-[#17243B]">
                      <span className="text-[#66758A]">{dText.postalLabel}:</span>
                      <strong className="font-semibold text-[#15528B]">{district.postalCode}</strong>
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#66758A] leading-relaxed">{district.description}</p>
                {(district.canals || district.borders) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                    {district.canals && (
                      <div className="p-3 rounded-xl bg-[#EBF3FA]/50 border border-[#E5EAF0] text-xs">
                        <div className="font-semibold text-[#17243B] flex items-center gap-1.5 mb-1">
                          <Icon3D name="waves" size={14} /> {dText.canalsLabel}
                        </div>
                        <p className="text-[#66758A] leading-snug">{district.canals}</p>
                      </div>
                    )}
                    {district.borders && (
                      <div className="p-3 rounded-xl bg-[#E8F5EE]/50 border border-[#E5EAF0] text-xs">
                        <div className="font-semibold text-[#17243B] flex items-center gap-1.5 mb-1">
                          <Icon3D name="compass" size={14} /> {dText.bordersLabel}
                        </div>
                        <p className="text-[#66758A] leading-snug">{district.borders}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive GIS Location Map Card */}
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Icon3D name="map-pin" size={22} />
                  <h3 className="font-bold text-[#17243B] text-base">{dText.mapLocationTitle}</h3>
                </div>
                {district.coordinates && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-xs font-mono text-[#15528B]">
                    {district.coordinates[0].toFixed(4)}° N, {district.coordinates[1].toFixed(4)}° E
                  </div>
                )}
                {district.borders && (
                  <p className="text-sm text-[#66758A] leading-relaxed">
                    <strong className="text-[#17243B]">{dText.bordersLabel}:</strong> {district.borders}
                  </p>
                )}
                {district.canals && (
                  <p className="text-sm text-[#66758A] leading-relaxed">
                    <strong className="text-[#17243B]">{dText.canalsLabel}:</strong> {district.canals}
                  </p>
                )}
                <div className="pt-1">
                  <Link
                    to="/xarita"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#15528B] px-4 py-2 rounded-xl hover:bg-[#123A61] transition-colors"
                  >
                    {t.home.mapOpen} →
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7">
                <KhorezmMap
                  mode="preview"
                  selectedSlug={district.slug}
                  showFullscreen={true}
                  className="h-72 w-full"
                />
              </div>
            </div>

            {/* Education & Culture Card */}
            {district.education && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3 flex-wrap mb-2.5">
                  <div className="flex items-center gap-2">
                    <Icon3D name="graduation" size={22} />
                    <h3 className="font-bold text-[#17243B]">{dText.educationLabel}</h3>
                  </div>
                  {district.schools && (
                    <Badge variant="primary" className="text-xs">
                      {dText.schoolsLabel}: {district.schools}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-[#66758A] leading-relaxed">{district.education}</p>
              </div>
            )}

            {/* Gallery */}
            {district.gallery && district.gallery.length > 1 && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="photo" size={22} />
                  <h3 className="font-bold text-[#17243B]">{dText.galleryTitle}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {district.gallery.map((imgSrc, idx) => (
                    <button
                      key={imgSrc}
                      type="button"
                      onClick={() => setLightboxIdx(idx)}
                      className="relative group overflow-hidden rounded-xl border border-[#E5EAF0] bg-[#F7F9FC] cursor-pointer block"
                    >
                      <img
                        src={imgSrc}
                        alt={`${district.name} — ${idx + 1}`}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn size={14} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ImageLightbox
              items={(district.gallery && district.gallery.length > 0 ? district.gallery : [district.photo]).map((src, idx) => ({
                src,
                title: district.name,
                subtitle: `${district.center} · ${idx + 1}`,
              }))}
              index={lightboxIdx}
              onClose={() => setLightboxIdx(-1)}
              onChange={setLightboxIdx}
            />

            {/* Facts */}
            {district.facts && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="award" size={22} />
                  <h3 className="font-bold text-[#17243B]">{dText.factsTitle}</h3>
                </div>
                <ul className="space-y-2">
                  {district.facts.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#66758A]">
                      <CheckCircle size={16} className="text-[#319568] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === 'economy' && (
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Icon3D name="briefcase" size={24} />
              <h2 className="font-bold text-[#17243B] text-lg">{dText.tabs.economy}</h2>
            </div>
            <p className="text-sm text-[#66758A] leading-relaxed">{district.economy}</p>
            {renderHighlightsSection(district.economyHighlights, 'factory')}
          </div>
        )}

        {tab === 'agriculture' && (
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Icon3D name="leaf" size={24} />
              <h2 className="font-bold text-[#17243B] text-lg">{dText.tabs.agriculture}</h2>
            </div>
            <p className="text-sm text-[#66758A] leading-relaxed">{district.agriculture}</p>
            {district.canals && (
              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#EBF3FA] text-xs text-[#15528B] font-medium">
                <Icon3D name="waves" size={16} />
                <span>
                  <strong>{dText.canalsLabel}:</strong> {district.canals}
                </span>
              </div>
            )}
            {renderHighlightsSection(district.agriHighlights, 'tree')}
          </div>
        )}

        {tab === 'tourism' && (
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <Icon3D name="compass" size={24} />
              <h2 className="font-bold text-[#17243B] text-lg">{dText.tabs.tourism}</h2>
            </div>
            <p className="text-sm text-[#66758A] leading-relaxed">{district.tourism}</p>
            {renderHighlightsSection(district.tourismHighlights, 'museum')}
          </div>
        )}

        {/* Quick District Navigator Strip */}
        <div className="mt-6 bg-white border border-[#E5EAF0] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Icon3D name="city" size={18} />
            <h3 className="font-bold text-[#17243B] text-sm">{dText.allDistrictsLabel}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {districts.map((d) => (
              <Link
                key={d.id}
                to={`/tumanlar/${d.slug}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  d.slug === district.slug
                    ? 'bg-[#15528B] text-white'
                    : 'bg-[#F7F9FC] border border-[#E5EAF0] text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]'
                }`}
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#66758A] mt-6">{dText.sourceNote}</p>
      </div>
    </>
  );
}
