import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronLeft, ChevronRight, Download, ArrowRight, ZoomIn, X } from 'lucide-react';
import { getMediaItems, getComparisonPairs } from '../data/mediaItems';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import ImageLightbox from '../components/common/ImageLightbox';
import Icon3D from '../components/common/Icon3D';

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
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={pair.before.photo} alt={beforeLabel} className="w-full h-full object-cover max-w-none" />
        </div>
        <div className="absolute inset-y-0 flex items-center" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
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

const PANORAMA_SCENES = [
  { id: 'toshhovli', photo: '/images/toshhovli.jpg', labelUz: "Toshhovli saroyi, Xiva", labelRu: 'Дворец Таш-Хаули, Хива', labelEn: 'Toshhovli Palace, Khiva' },
  { id: 'ichan-qala', photo: '/images/khiva-hero.jpg', labelUz: "Ichan-Qal'a panoramasi", labelRu: 'Панорама Ичан-Калы', labelEn: 'Ichan-Kala Skyline' },
  { id: 'kalta-minor', photo: '/images/kalta-minor.jpg', labelUz: "Kalta Minor maydoni", labelRu: 'Площадь Кальта-Минор', labelEn: 'Kalta Minor Plaza' },
];

export default function MediaPage() {
  const { language, t } = useLanguage();
  const mText = t.pages.media;
  const mediaItems = getMediaItems(language);
  const comparisonPairs = getComparisonPairs(language);

  const [tab, setTab] = useState('all');
  const [catKey, setCatKey] = useState('all');
  const [pairIdx, setPairIdx] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(32);
  const [lightboxIdx, setLightboxIdx] = useState(-1);
  const [activeVideo, setActiveVideo] = useState(null);
  const [panoramaOpen, setPanoramaOpen] = useState(false);
  const [panoramaScene, setPanoramaScene] = useState(0);
  const [panOffset, setPanOffset] = useState(50);

  useEffect(() => {
    if (!playingAudio) return;
    const id = setInterval(() => setAudioProgress((p) => (p >= 100 ? 0 : p + 2)), 400);
    return () => clearInterval(id);
  }, [playingAudio]);

  const photos = mediaItems.filter((m) => m.type === 'photo');
  const videos = mediaItems.filter((m) => m.type === 'video');
  const filteredPhotos = catKey === 'all' ? photos : photos.filter((p) => p.categoryKey === catKey);

  const sidebarItems = [
    { k: 'all', l: mText.title, icon: 'layers' },
    { k: 'videos', l: mText.tabs.videos, icon: 'video' },
    { k: 'photos', l: mText.tabs.photos, icon: 'photo' },
    { k: 'comparison', l: mText.tabs.comparison, icon: 'chart' },
    { k: 'panorama', l: mText.tabs.panorama, icon: 'compass' },
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

  const triggerDownload = (filename, content, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleDownloadBrand = () => {
    const svgBadge = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80" viewBox="0 0 320 80"><rect width="320" height="80" rx="16" fill="#15528B"/><text x="28" y="48" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">my-khorezm.uz</text></svg>`;
    triggerDownload('my-khorezm-brand-badge.svg', svgBadge, 'image/svg+xml;charset=utf-8');
  };

  const handleDownloadPressKit = () => {
    const text = [
      'my-khorezm.uz — Official Media & Press Kit (2026)',
      '==================================================',
      `Region: Khorezm Region, Republic of Uzbekistan`,
      `Administrative center: Urgench City`,
      `Districts & Cities: 11 districts, 2 cities (Urgench, Khiva)`,
      `Population (Apr 2025, xorazmstat.uz): 2,039,558`,
      `Total Area: 6,050 km2`,
      `UNESCO Heritage: Ichan-Kala (1990), Lazgi Dance (2019)`,
    ].join('\n');
    triggerDownload('my-khorezm-press-kit.txt', text, 'text/plain;charset=utf-8');
  };

  const handleToggleAudio = () => {
    const next = !playingAudio;
    setPlayingAudio(next);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        if (next) {
          const text =
            language === 'ru'
              ? 'Добро пожаловать в Хорезм — древний оазис вдоль Амударьи и родину великой науки.'
              : language === 'en'
                ? 'Welcome to Khorezm, the historic Amu Darya oasis and home of UNESCO-listed Ichan-Kala and Lazgi.'
                : "Xorazmga xush kelibsiz — Amudaryo vohasi, Ichan-Qal'a va buyuk allomalar diyoriga!";
          const u = new SpeechSynthesisUtterance(text);
          u.lang = language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ';
          u.onend = () => setPlayingAudio(false);
          window.speechSynthesis.speak(u);
        }
      } catch {
        // Fallback visual progress bar continues smoothly
      }
    }
  };

  const currentScene = PANORAMA_SCENES[panoramaScene] || PANORAMA_SCENES[0];
  const sceneLabel = language === 'ru' ? currentScene.labelRu : language === 'en' ? currentScene.labelEn : currentScene.labelUz;

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
                  <Icon3D name={it.icon} size={18} />
                  <span className="truncate">{it.l}</span>
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-[#E5EAF0]">
                <Link
                  to="/media/teleradio"
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#15528B] bg-[#EBF3FA] hover:bg-[#dceaf7] transition-colors"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Icon3D name="tv" size={18} />
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
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Icon3D name="tv" size={30} />
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
                <div className="flex items-center gap-2 mb-3">
                  <Icon3D name="video" size={20} />
                  <h2 className="font-bold text-[#17243B] text-base">{mText.tabs.videos}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videos.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveVideo(v)}
                      className="bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group text-left cursor-pointer"
                    >
                      <div className="relative" style={{ aspectRatio: '16/9' }}>
                        <img src={v.photo} alt={v.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                          <div className="w-11 h-11 bg-white/95 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                            <Play size={16} className="text-[#15528B] ml-0.5" />
                          </div>
                        </div>
                        {v.duration && <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded">{v.duration}</div>}
                      </div>
                      <div className="p-3">
                        <h3 className="text-xs font-bold text-[#17243B] line-clamp-2 group-hover:text-[#15528B]">{v.title}</h3>
                        <p className="text-[11px] text-[#66758A] mt-1">{v.year} · {v.location}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Photos */}
            {(tab === 'all' || tab === 'photos') && (
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon3D name="photo" size={20} />
                    <h2 className="font-bold text-[#17243B] text-base">{mText.tabs.photos}</h2>
                  </div>
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
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-[#17243B] text-sm">{mText.tabs.comparison}</h2>
                    <div className="flex gap-1">
                      {comparisonPairs.map((cp, idx) => (
                        <button
                          key={cp.id}
                          type="button"
                          onClick={() => setPairIdx(idx)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold cursor-pointer ${
                            pairIdx === idx ? 'bg-[#15528B] text-white' : 'bg-[#F7F9FC] border border-[#E5EAF0] text-[#66758A]'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ComparisonSlider pair={comparisonPairs[pairIdx] || comparisonPairs[0]} beforeLabel={mText.before} afterLabel={mText.after} />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-bold text-[#17243B] text-sm mb-3">{mText.tabs.panorama}</h2>
                  <button
                    type="button"
                    onClick={() => setPanoramaOpen(true)}
                    className="relative flex-1 rounded-2xl overflow-hidden border border-[#E5EAF0] min-h-[215px] group cursor-pointer text-left"
                  >
                    <img src="/images/toshhovli.jpg" alt="360 Tour" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center text-white p-4 text-center">
                      <span className="border-2 border-white rounded-full px-4 py-1 text-base font-bold mb-2">360°</span>
                      <p className="text-xs sm:text-sm font-semibold mb-2">{mText.panoramaTitle}</p>
                      <span className="bg-white/95 text-[#15528B] text-xs font-bold px-3.5 py-1.5 rounded-full">
                        {mText.openTour} →
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Audio Guide + Brand & Press Kit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  aria-label={audioTitle}
                  className="w-11 h-11 rounded-full bg-[#15528B] text-white flex items-center justify-center shrink-0 cursor-pointer"
                >
                  {playingAudio ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#17243B]">
                    <Icon3D name="headphones" size={18} /> {audioTitle}
                  </div>
                  <div className="h-2 bg-[#EBF3FA] rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-[#15528B] transition-all" style={{ width: `${audioProgress}%` }} />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadBrand}
                className="bg-white border border-[#E5EAF0] hover:border-[#15528B]/40 rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer transition-colors"
              >
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm">{brandTitle}</h3>
                  <p className="text-[11px] text-[#66758A] mt-0.5">SVG · my-khorezm.uz</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-[#EBF3FA] text-[#15528B] px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <Download size={13} /> SVG
                </span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPressKit}
                className="bg-white border border-[#E5EAF0] hover:border-[#15528B]/40 rounded-2xl p-4 flex items-center justify-between gap-3 text-left cursor-pointer transition-colors"
              >
                <div>
                  <h3 className="font-bold text-[#17243B] text-sm flex items-center gap-2">
                    <Icon3D name="briefcase" size={18} /> {pressTitle}
                  </h3>
                  <p className="text-[11px] text-[#66758A] mt-0.5">Media Kit · 2026</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-[#EBF3FA] text-[#15528B] px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <Download size={13} /> TXT
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[240] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl border border-[#E5EAF0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-[#0A1220]">
              <img src={activeVideo.photo} alt={activeVideo.title} className="w-full h-full object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-between p-4">
                <div className="flex justify-between items-center">
                  <span className="bg-[#15528B] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {activeVideo.category} · {activeVideo.duration}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(null)}
                    aria-label="Close"
                    className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg">{activeVideo.title}</h3>
                  <p className="text-xs text-white/80 mt-0.5">{activeVideo.year} · {activeVideo.location}</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-wrap items-center justify-between gap-3 bg-[#F7F9FC]">
              <p className="text-xs text-[#66758A]">{mText.tvRadioCard.desc}</p>
              <Link
                to="/media/teleradio"
                className="inline-flex items-center gap-1.5 bg-[#15528B] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#123A61]"
              >
                <Icon3D name="tv" size={16} /> {mText.tvRadioCard.cta} →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Interactive 360 Panorama Modal */}
      {panoramaOpen && (
        <div
          className="fixed inset-0 z-[240] bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPanoramaOpen(false)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl border border-[#E5EAF0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5EAF0]">
              <div className="flex items-center gap-2">
                <Icon3D name="compass" size={18} />
                <span className="font-bold text-sm text-[#17243B]">360° — {sceneLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setPanoramaOpen(false)}
                aria-label="Close"
                className="p-1.5 rounded-lg text-[#66758A] hover:bg-[#F7F9FC] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div
              className="relative h-72 sm:h-96 overflow-hidden cursor-ew-resize select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setPanOffset(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)));
              }}
            >
              <img
                src={currentScene.photo}
                alt={sceneLabel}
                className="w-full h-full object-cover transition-[object-position] duration-75"
                style={{ objectPosition: `${panOffset}% center`, transform: 'scale(1.25)' }}
              />
              <span className="absolute bottom-3 left-3 bg-black/65 text-white text-xs px-3 py-1 rounded-full">
                {Math.round(panOffset * 3.6)}°
              </span>
            </div>
            <div className="p-3 bg-[#F7F9FC] flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                {PANORAMA_SCENES.map((sc, idx) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setPanoramaScene(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                      panoramaScene === idx ? 'bg-[#15528B] text-white' : 'bg-white border border-[#E5EAF0] text-[#66758A]'
                    }`}
                  >
                    {language === 'ru' ? sc.labelRu : language === 'en' ? sc.labelEn : sc.labelUz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
