import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Users, Map, ArrowLeft, CheckCircle, MapPin, ZoomIn } from 'lucide-react';
import { getDistricts } from '../data/districts';
import { useLanguage } from '../hooks/useLanguage';
import Badge from '../components/common/Badge';
import PageHero from '../components/common/PageHero';
import ImageLightbox from '../components/common/ImageLightbox';

export default function DistrictDetailPage() {
  const { slug } = useParams();
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
    { v: 'overview', l: dText.tabs.overview },
    { v: 'economy', l: dText.tabs.economy },
    { v: 'agriculture', l: dText.tabs.agriculture },
    { v: 'tourism', l: dText.tabs.tourism },
  ];

  const typeLabel = district.typeKey === 'city' ? dText.typeCity : dText.typeDistrict;

  return (
    <>
      <Helmet>
        <title>{district.name}</title>
      </Helmet>
      <PageHero
        title={district.name}
        subtitle={district.description}
        image={district.photo}
        badge={
          <Badge variant={district.typeKey === 'city' ? 'accent' : 'primary'}>
            {typeLabel}
          </Badge>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
            <Users size={18} className="text-[#15528B] mx-auto mb-1.5" />
            <div className="font-bold text-[#15528B] text-lg">{district.population}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{dText.population}</div>
          </div>
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
            <Map size={18} className="text-[#15528B] mx-auto mb-1.5" />
            <div className="font-bold text-[#15528B] text-lg">{district.area}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{dText.area}</div>
          </div>
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
            <MapPin size={18} className="text-[#C58B43] mx-auto mb-1.5" />
            <div className="font-bold text-[#15528B] text-lg">{district.center || '—'}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{dText.center}</div>
          </div>
          <div className="bg-white border border-[#E5EAF0] rounded-xl p-4 text-center">
            <div className="font-bold text-[#15528B] text-lg mt-2">{typeLabel}</div>
            <div className="text-xs text-[#66758A] mt-0.5">{dText.status}</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-[#E5EAF0] overflow-x-auto">
          {tabs.map((item) => (
            <button
              key={item.v}
              onClick={() => setTab(item.v)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                tab === item.v ? 'border-[#15528B] text-[#15528B]' : 'border-transparent text-[#66758A] hover:text-[#17243B]'
              }`}
            >
              {item.l}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-5">
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
                <h2 className="font-bold text-[#17243B] text-lg mb-3">{dText.tabs.overview}</h2>
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
                  {district.postalCode && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F7F9FC] border border-[#E5EAF0] text-xs text-[#17243B]">
                      <span className="text-[#66758A]">{dText.postalLabel}:</span>
                      <strong className="font-semibold text-[#15528B]">{district.postalCode}</strong>
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#66758A] leading-relaxed">{district.description}</p>
                {district.education && (
                  <p className="text-sm text-[#66758A] leading-relaxed mt-3">{district.education}</p>
                )}
              </div>
            </div>
            {district.gallery && district.gallery.length > 1 && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
                <h3 className="font-bold text-[#17243B] mb-3">{dText.galleryTitle}</h3>
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
            {district.facts && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
                <h3 className="font-bold text-[#17243B] mb-3">{dText.factsTitle}</h3>
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
            <h2 className="font-bold text-[#17243B] mb-3">{dText.tabs.economy}</h2>
            <p className="text-sm text-[#66758A] leading-relaxed">{district.economy}</p>
          </div>
        )}

        {tab === 'agriculture' && (
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <h2 className="font-bold text-[#17243B] mb-3">{dText.tabs.agriculture}</h2>
            <p className="text-sm text-[#66758A] leading-relaxed">{district.agriculture}</p>
          </div>
        )}

        {tab === 'tourism' && (
          <div className="bg-white border border-[#E5EAF0] rounded-2xl p-6">
            <h2 className="font-bold text-[#17243B] mb-3">{dText.tabs.tourism}</h2>
            <p className="text-sm text-[#66758A] leading-relaxed">{district.tourism}</p>
          </div>
        )}

        <p className="text-xs text-[#66758A] mt-6">{dText.sourceNote}</p>
      </div>
    </>
  );
}
