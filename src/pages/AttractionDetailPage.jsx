import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { MapPin, Clock, Ticket, ChevronDown, ChevronUp, ArrowLeft, ZoomIn } from 'lucide-react';
import { getAttractions } from '../data/attractions';
import { useLanguage } from '../hooks/useLanguage';
import Badge from '../components/common/Badge';
import PageHero from '../components/common/PageHero';
import ImageLightbox from '../components/common/ImageLightbox';

export default function AttractionDetailPage() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const tur = t.pages.tourism;
  const attractions = getAttractions(language);
  const attraction = attractions.find((a) => a.slug === slug);
  const [openFact, setOpenFact] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  if (!attraction) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#17243B] mb-4">{tur.notFound}</h1>
        <Link to="/turizm" className="text-[#15528B] flex items-center gap-1 justify-center">
          <ArrowLeft size={16} /> {tur.backToTourism}
        </Link>
      </div>
    );
  }

  const related = attractions.filter((a) => a.id !== attraction.id).slice(0, 3);
  const facts = attraction.facts || [];

  return (
    <>
      <Helmet>
        <title>{attraction.name}</title>
      </Helmet>
      <PageHero
        title={attraction.name}
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} /> {attraction.location}
          </span>
        }
        image={attraction.photo}
        badge={<Badge variant="accent">{attraction.category}</Badge>}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setLightboxIdx(0)}
                className="relative group w-full block cursor-pointer"
              >
                <img src={attraction.photo} alt={attraction.name} className="w-full h-64 sm:h-80 object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={15} />
                </span>
              </button>
              <div className="p-6">
                <h2 className="font-bold text-[#17243B] mb-3">{tur.aboutTitle}</h2>
                <p className="text-sm text-[#66758A] leading-relaxed">{attraction.fullDescription || attraction.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(attraction.gallery || [attraction.photo]).map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIdx(i)}
                  className="relative group overflow-hidden rounded-xl border border-[#E5EAF0] cursor-pointer block"
                >
                  <img src={img} alt={`${attraction.name} — ${i + 1}`} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={12} />
                  </span>
                </button>
              ))}
            </div>
            <ImageLightbox
              items={(attraction.gallery || [attraction.photo]).map((src, i) => ({
                src,
                title: attraction.name,
                subtitle: `${attraction.location} · ${i + 1}`,
              }))}
              index={lightboxIdx}
              onClose={() => setLightboxIdx(-1)}
              onChange={setLightboxIdx}
            />

            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
              <h2 className="font-bold text-[#17243B] mb-3">{tur.factsTitle}</h2>
              {facts.map((fact, i) => (
                <div key={i} className="border-b border-[#F7F9FC] last:border-0">
                  <button
                    onClick={() => setOpenFact(openFact === i ? null : i)}
                    className="flex items-center justify-between w-full py-3 text-sm font-medium text-[#17243B] text-left cursor-pointer"
                  >
                    <span>{tur.factPrefix} {i + 1}</span>
                    {openFact === i ? <ChevronUp size={15} className="text-[#15528B]" /> : <ChevronDown size={15} className="text-[#C8D3E0]" />}
                  </button>
                  {openFact === i && <p className="text-sm text-[#66758A] pb-3">{fact}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
              <h3 className="font-bold text-[#17243B] mb-3 text-sm">{tur.visitInfoTitle}</h3>
              <div className="space-y-3">
                <div className="flex gap-2 text-sm">
                  <Clock size={16} className="text-[#15528B] shrink-0" />
                  <div>
                    <div className="font-medium text-[#17243B]">{tur.openHours}</div>
                    <div className="text-[#66758A] text-xs">{attraction.visitInfo?.openHours}</div>
                  </div>
                </div>
                <div className="flex gap-2 text-sm">
                  <Ticket size={16} className="text-[#15528B] shrink-0" />
                  <div>
                    <div className="font-medium text-[#17243B]">{tur.ticketPrice}</div>
                    <div className="text-[#66758A] text-xs">{attraction.visitInfo?.ticketPrice}</div>
                  </div>
                </div>
                <div className="flex gap-2 text-sm">
                  <MapPin size={16} className="text-[#15528B] shrink-0" />
                  <div>
                    <div className="font-medium text-[#17243B]">{tur.address}</div>
                    <div className="text-[#66758A] text-xs">{attraction.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
              <h3 className="font-bold text-[#17243B] mb-3 text-sm">{tur.relatedTitle}</h3>
              {related.map((r) => (
                <Link key={r.id} to={`/turizm/${r.slug}`} className="flex gap-2 mb-3 group last:mb-0">
                  <img src={r.photo} alt={r.name} className="w-14 h-12 object-cover rounded-lg shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-[#17243B] group-hover:text-[#15528B] leading-snug">{r.name}</div>
                    <div className="text-xs text-[#66758A]">{r.location}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
