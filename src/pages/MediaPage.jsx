import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight, Compass, Video, Image, BarChart2, Headphones, Download, Layers, Briefcase, Tv, ArrowRight, ZoomIn } from 'lucide-react';
import { getMediaItems, getComparisonPairs } from '../data/mediaItems';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import ImageLightbox from '../components/common/ImageLightbox';

function ComparisonSlider({ pair, beforeLabel, afterLabel }) {
  const [pos, setPos] = useState(50);
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(90, Math.max(10, x)));
  };
  return (
    <div className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden">
      <div className="relative h-48 select-none cursor-col-resize" onMouseMove={handleMove}>
        <img src={pair.after.photo} alt={afterLabel} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: pos + '%' }}>
          <img src={pair.before.photo} alt={beforeLabel} className="w-full h-full object-cover max-w-none" />
        </div>
        <div className="absolute inset-y-0 flex items-center" style={{ left: pos + '%', transform: 'translateX(-50%)' }}>
          <div className="w-0.5 h-full bg-white" />
          <div className="absolute w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <ChevronLeft size={10} className="text-[#17243B]" />
              <ChevronRight size={10} className="text-[#17243B]" />
            </div>
          </div>
        </div>
        <div className="absolute top-2 left-2 bg-black/65 text-white text-xs px-2 py-0.5 rounded">
          {beforeLabel} {pair.before.year}
        </div>
        <div className="absolute top-2 right-2 bg-[#15528B]/85 text-white text-xs px-2 py-0.5 rounded">
          {afterLabel} {pair.after.year}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-[#17243B] text-sm">{pair.title}</h3>
      </div>
    </div>
  );
}

export default function MediaPage() {
  const { language, t } = useLanguage();
  const mText = t.pages.media;
  const mediaItems = getMediaItems(language);
  const comparisonPairs = getComparisonPairs(language);

  const [tab, setTab] = useState('all');
  const [catKey, setCatKey] = useState('all');
  const [playingAudio, setPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(32);
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  useEffect(() => {
    if (!playingAudio) return;
    const id = setInterval(() => setAudioProgress((p) => (p >= 100 ? 0 : p + 2)), 400);
    return () => clearInterval(id);
  }, [playingAudio]);

  const photos = mediaItems.filter((m) => m.type === 'photo');
  const videos = mediaItems.filter((m) => m.type === 'video');
  const filteredPhotos = catKey === 'all' ? photos : photos.filter((p) => p.categoryKey === catKey);

  const sidebarItems = [
    { k: 'all', l: mText.title, icon: Layers },
    { k: 'videos', l: mText.tabs.videos, icon: Video },
    { k: 'photos', l: mText.tabs.photos, icon: Image },
    { k: 'comparison', l: mText.tabs.comparison, icon: BarChart2 },
    { k: 'panorama', l: mText.tabs.panorama, icon: Compass },
  ];

  const photoCats = [
    { k: 'all', l: mText.cats.all },
    { k: 'arch', l: mText.cats.arch },
    { k: 'nature', l: mText.cats.nature },
    { k: 'culture', l: mText.cats.culture },
    { k: 'history', l: mText.cats.history },
    { k: 'modern', l: mText.cats.modern },
  ];

  const audioTitle = language === 'ru' ? 'Аудиогид о Хорезме' : language === 'en' ? 'Khorezm Audio Guide' : 'Xorazm haqida audiogid';
  const brandTitle = language === 'ru' ? 'Материалы бренда' : language === 'en' ? 'Brand Assets' : 'Brand materiallari';
  const pressTitle = language === 'ru' ? 'Пресс-кит' : language === 'en' ? 'Press Kit' : 'Press-kit';

  return (
    <>
      <Helmet>
        <title>{t.nav.media}</title>
      </Helmet>
      <PageHero
        title={mText.title}
        subtitle={mText.subtitle}
        image="/images/khiva-hero.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.media}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-3 sticky top-24">
              {sidebarItems.map((it) => (
                <button
                  key={it.k}
                  onClick={() => setTab(it.k)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left cursor-pointer ${
                    tab === it.k ? 'bg-[#15528B] text-white' : 'text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]'
                  }`}
                >
                  <it.icon size={14} className="shrink-0" />
                  <span className="truncate">{it.l}</span>
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-[#E5EAF0]">
                <Link
                  to="/media/teleradio"
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#15528B] bg-[#EBF3FA] hover:bg-[#dceaf7] transition-colors"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Tv size={14} className="shrink-0" />
                    <span className="truncate">{t.nav.tvRadio}</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#319568] shrink-0" />
                </Link>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0 space-y-6">
            {/* Live TV & Radio Banner */}
            <div className="bg-gradient-to-r from-[#123A61] to-[#15528B] rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Tv size={22} className="text-white" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#319568] text-white mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE · mtrk.uz
                  </div>
                  <h2 className="font-bold text-sm sm:text-base">{mText.tvRadioCard.title}</h2>
                  <p className="text-xs text-white/80 mt-0.5">{mText.tvRadioCard.desc}</p>
                </div>
              </div>
              <Link
                to="/media/teleradio"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#15528B] hover:bg-[#EBF3FA] px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-colors"
              >
                <span>{mText.tvRadioCard.cta}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            {/* Top row */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
              <div className="xl:col-span-8 bg-white border border-[#E5EAF0] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1">
                  <h2 className="font-bold text-[#17243B] text-base mb-2">{mText.title}</h2>
                  <p className="text-xs sm:text-sm text-[#66758A] leading-relaxed mb-3">{mText.subtitle}</p>
                </div>
                <img src="/images/kalta-minor.jpg" alt={mText.title} className="w-full sm:w-44 h-32 object-cover rounded-xl shrink-0" />
              </div>
              <div className="xl:col-span-4 bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <h3 className="font-bold text-[#17243B] text-sm mb-3">{t.home.statsTitle}</h3>
                {mText.stats.map((s) => (
                  <div key={s.l} className="flex justify-between py-2 border-b border-[#F7F9FC] last:border-0 text-xs">
                    <span className="text-[#66758A]">{s.l}</span>
                    <span className="font-bold text-[#15528B]">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos */}
            {(tab === 'all' || tab === 'videos') && (
              <div>
                <h2 className="font-bold text-[#17243B] text-base mb-3">{mText.tabs.videos}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videos.map((v) => (
                    <div key={v.id} className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
                      <div className="relative" style={{ aspectRatio: '16/9' }}>
                        <img src={v.photo} alt={v.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35">
                          <div className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center">
                            <Play size={16} className="text-[#15528B] ml-0.5" />
                          </div>
                        </div>
                        {v.duration && <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded">{v.duration}</div>}
                      </div>
                      <div className="p-3">
                        <h3 className="text-xs font-bold text-[#17243B] line-clamp-2">{v.title}</h3>
                        <p className="text-[11px] text-[#66758A] mt-1">{v.year} · {v.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photos */}
            {(tab === 'all' || tab === 'photos') && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h2 className="font-bold text-[#17243B] text-base">{mText.tabs.photos}</h2>
                  <div className="flex gap-1.5 overflow-x-auto">
                    {photoCats.map((c) => (
                      <button
                        key={c.k}
                        onClick={() => setCatKey(c.k)}
                        className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 cursor-pointer ${
                          catKey === c.k ? 'bg-[#15528B] text-white' : 'bg-[#F7F9FC] border border-[#E5EAF0] text-[#66758A]'
                        }`}
                      >
                        {c.l}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredPhotos.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setLightboxIdx(idx)}
                      className="relative group rounded-xl overflow-hidden text-left cursor-pointer"
                      style={{ aspectRatio: '4/3' }}
                    >
                      <img src={p.photo} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn size={14} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                        <div className="p-2.5">
                          <p className="text-white text-xs font-semibold">{p.title}</p>
                          <p className="text-white/75 text-[10px]">{p.location}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <ImageLightbox
                  items={filteredPhotos.map((p) => ({
                    src: p.photo,
                    title: p.title,
                    subtitle: [p.year, p.location].filter(Boolean).join(' · '),
                  }))}
                  index={lightboxIdx}
                  onClose={() => setLightboxIdx(-1)}
                  onChange={setLightboxIdx}
                />
              </div>
            )}

            {/* Comparison & 360 Tour */}
            {(tab === 'all' || tab === 'comparison' || tab === 'panorama') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h2 className="font-bold text-[#17243B] text-sm mb-3">{mText.tabs.comparison}</h2>
                  <ComparisonSlider pair={comparisonPairs[0]} beforeLabel={mText.before} afterLabel={mText.after} />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-[#17243B] text-sm mb-3">{mText.tabs.panorama}</h2>
                  <div className="relative flex-1 rounded-2xl overflow-hidden border border-[#E5EAF0] min-h-[190px]">
                    <img src="/images/toshhovli.jpg" alt="360 Tour" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-white p-4 text-center">
                      <span className="border-2 border-white rounded-full px-4 py-1 text-base font-bold mb-2">360°</span>
                      <p className="text-xs sm:text-sm font-semibold">{mText.panoramaTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Audio Guide + Brand & Press Kit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 flex items-center gap-3">
                <button
                  onClick={() => setPlayingAudio((p) => !p)}
                  className="w-11 h-11 rounded-full bg-[#15528B] text-white flex items-center justify-center shrink-0 cursor-pointer"
                >
                  {playingAudio ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#17243B]">
                    <Headphones size={13} className="text-[#15528B]" /> {audioTitle}
                  </div>
                  <div className="h-2 bg-[#EBF3FA] rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#15528B] transition-all" style={{ width: `${audioProgress}%` }} />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm">{brandTitle}</h3>
                  <p className="text-[11px] text-[#66758A] mt-0.5">SVG, PNG · my-khorezm.uz</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-[#EBF3FA] text-[#15528B] px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <Download size={13} /> ZIP
                </span>
              </div>

              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm flex items-center gap-1.5">
                    <Briefcase size={14} className="text-[#15528B]" /> {pressTitle}
                  </h3>
                  <p className="text-[11px] text-[#66758A] mt-0.5">Media Kit · 2025</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-[#EBF3FA] text-[#15528B] px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <Download size={13} /> PDF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
