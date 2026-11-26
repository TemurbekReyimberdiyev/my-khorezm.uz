import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hls from 'hls.js';
import {
  Tv,
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  RefreshCw,
  Clock,
  MapPin,
  Video,
  Send,
  Calendar,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { getTvChannels, getRadioStations, getXorazmPrograms } from '../../data/broadcasts';
import { useLanguage } from '../../hooks/useLanguage';
import PageHero from '../../components/common/PageHero';
import Icon3D from '../../components/common/Icon3D';

function LiveTvPlayer({ channel, labels, isMuted, volume, onToggleMute, onVolumeChange, onPlayingChange }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadNonce, setReloadNonce] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !channel?.streamUrl) return;

    setIsLoading(true);
    setHasError(false);
    setIsPlaying(false);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const src = channel.streamUrl;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 30,
      });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().then(() => {
          setIsPlaying(true);
          onPlayingChange?.(true);
        }).catch(() => {
          setIsPlaying(false);
          onPlayingChange?.(false);
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setIsLoading(false);
          setHasError(true);
          setIsPlaying(false);
          onPlayingChange?.(false);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      const onLoaded = () => {
        setIsLoading(false);
        video.play().then(() => {
          setIsPlaying(true);
          onPlayingChange?.(true);
        }).catch(() => setIsPlaying(false));
      };
      const onErr = () => {
        setIsLoading(false);
        setHasError(true);
      };
      video.addEventListener('loadedmetadata', onLoaded);
      video.addEventListener('error', onErr);
      return () => {
        video.removeEventListener('loadedmetadata', onLoaded);
        video.removeEventListener('error', onErr);
      };
    } else {
      setIsLoading(false);
      setHasError(true);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel.id, channel.streamUrl, reloadNonce]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    video.volume = volume;
  }, [isMuted, volume]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        onPlayingChange?.(true);
      }).catch(() => setHasError(true));
    } else {
      video.pause();
      setIsPlaying(false);
      onPlayingChange?.(false);
    }
  };

  const handleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div ref={containerRef} className="bg-[#0E1828] rounded-2xl overflow-hidden border border-[#1E2E47] shadow-sm">
      <div className="relative aspect-video bg-[#0A1220]">
        <video
          ref={videoRef}
          playsInline
          muted={isMuted}
          poster={channel.fallbackImage}
          onPlay={() => {
            setIsPlaying(true);
            setIsLoading(false);
            onPlayingChange?.(true);
          }}
          onPause={() => {
            setIsPlaying(false);
            onPlayingChange?.(false);
          }}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          className="w-full h-full object-cover"
        />

        {/* Top overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 bg-black/65 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#319568] animate-pulse" />
            <span>{labels.liveBadge}</span>
            <span className="text-white/50">·</span>
            <span>{channel.name}</span>
          </div>
          <span className="bg-black/65 backdrop-blur-sm text-white/90 px-2.5 py-1 rounded-full text-[11px] font-medium">
            {channel.quality}
          </span>
        </div>

        {/* Center play trigger if paused without error */}
        {!isPlaying && !isLoading && !hasError && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={labels.play}
            className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/45 transition-colors cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full bg-white/95 text-[#15528B] flex items-center justify-center shadow-lg">
              <Play size={26} className="ml-1" />
            </div>
          </button>
        )}

        {/* Loading state */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-white gap-2 pointer-events-none">
            <Loader2 size={28} className="animate-spin text-white" />
            <span className="text-xs font-medium">{labels.connecting}</span>
          </div>
        )}

        {/* Error / fallback overlay */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0E1828]/90 text-white p-6 text-center">
            <AlertCircle size={32} className="text-[#C58B43] mb-2" />
            <p className="text-sm font-semibold mb-1">{labels.streamError}</p>
            <p className="text-xs text-white/70 max-w-md mb-4">{labels.streamErrorHint}</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setReloadNonce((n) => n + 1)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#15528B] hover:bg-[#123A61] text-white text-xs font-semibold cursor-pointer"
              >
                <RefreshCw size={13} /> {labels.retry}
              </button>
              <a
                href={channel.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                <ExternalLink size={13} /> {labels.watchOnMtrk}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Control bar */}
      <div className="px-4 py-3 bg-[#121D30] flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="w-9 h-9 rounded-lg bg-[#15528B] hover:bg-[#1B64A8] flex items-center justify-center cursor-pointer transition-colors"
            title={isPlaying ? labels.pause : labels.play}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
            title={isMuted ? labels.unmute : labels.mute}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            aria-label={labels.volume}
            className="w-20 accent-[#319568] cursor-pointer"
          />

          <button
            type="button"
            onClick={() => setReloadNonce((n) => n + 1)}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
            title={labels.retry}
          >
            <RefreshCw size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={channel.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white/90 transition-colors"
          >
            <span>mtrk.uz</span>
            <ExternalLink size={12} />
          </a>
          <button
            type="button"
            onClick={handleFullscreen}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
            title={labels.fullscreen}
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TvRadioPage() {
  const { language, t } = useLanguage();
  const tr = t.pages.tvRadio;
  const tvChannels = getTvChannels(language);
  const radioStations = getRadioStations(language);
  const programs = getXorazmPrograms(language);

  const [section, setSection] = useState('all');
  const [tvFilter, setTvFilter] = useState('all');
  const [activeTvId, setActiveTvId] = useState('xorazm');
  const [isTvMuted, setIsTvMuted] = useState(true);
  const [tvVolume, setTvVolume] = useState(0.8);

  const [activeRadioId, setActiveRadioId] = useState('xorazm-radio');
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [radioLoading, setRadioLoading] = useState(false);
  const [radioError, setRadioError] = useState(false);
  const [radioVolume, setRadioVolume] = useState(0.85);

  const audioRef = useRef(null);
  const radioHlsRef = useRef(null);

  const activeChannel = tvChannels.find((c) => c.id === activeTvId) || tvChannels[0];
  const activeStation = radioStations.find((s) => s.id === activeRadioId) || radioStations[0];

  const filteredTv =
    tvFilter === 'all' ? tvChannels : tvChannels.filter((c) => c.category === tvFilter);

  const stopRadioPlayback = () => {
    const audio = audioRef.current;
    if (radioHlsRef.current) {
      radioHlsRef.current.destroy();
      radioHlsRef.current = null;
    }
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
    setRadioPlaying(false);
    setRadioLoading(false);
  };

  useEffect(() => {
    return () => {
      if (radioHlsRef.current) {
        radioHlsRef.current.destroy();
        radioHlsRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = radioVolume;
    }
  }, [radioVolume]);

  const playStation = (station) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeRadioId === station.id && radioPlaying) {
      stopRadioPlayback();
      return;
    }

    // Mute TV player if user starts listening to radio
    setIsTvMuted(true);
    setActiveRadioId(station.id);
    setRadioError(false);
    setRadioLoading(true);

    if (radioHlsRef.current) {
      radioHlsRef.current.destroy();
      radioHlsRef.current = null;
    }

    if (station.streamType === 'hls') {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        radioHlsRef.current = hls;
        hls.loadSource(station.streamUrl);
        hls.attachMedia(audio);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audio.play().then(() => {
            setRadioPlaying(true);
            setRadioLoading(false);
          }).catch(() => {
            setRadioLoading(false);
            setRadioError(true);
          });
        });
        hls.on(Hls.Events.ERROR, (_e, data) => {
          if (data.fatal) {
            setRadioLoading(false);
            setRadioPlaying(false);
            setRadioError(true);
          }
        });
      } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = station.streamUrl;
        audio.play().then(() => {
          setRadioPlaying(true);
          setRadioLoading(false);
        }).catch(() => {
          setRadioLoading(false);
          setRadioError(true);
        });
      }
      return;
    }

    audio.src = station.streamUrl;
    audio.play().then(() => {
      setRadioPlaying(true);
      setRadioLoading(false);
    }).catch(() => {
      setRadioLoading(false);
      setRadioPlaying(false);
      setRadioError(true);
    });
  };

  const sidebarItems = [
    { k: 'all', l: tr.sidebar.all, icon: 'layers' },
    { k: 'tv', l: tr.sidebar.tv, icon: 'tv' },
    { k: 'radio', l: tr.sidebar.radio, icon: 'headphones' },
    { k: 'programs', l: tr.sidebar.programs, icon: 'calendar' },
  ];

  const showTv = section === 'all' || section === 'tv';
  const showRadio = section === 'all' || section === 'radio';
  const showPrograms = section === 'all' || section === 'programs';

  return (
    <>
      <Helmet>
        <title>{tr.breadcrumbCurrent}</title>
      </Helmet>

      <PageHero
        title={tr.title}
        subtitle={tr.subtitle}
        image="/images/khiva-hero.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.media} > ${tr.breadcrumbCurrent}`}
      />

      <audio
        ref={audioRef}
        onPlaying={() => {
          setRadioPlaying(true);
          setRadioLoading(false);
          setRadioError(false);
        }}
        onError={() => {
          setRadioLoading(false);
          setRadioPlaying(false);
          setRadioError(true);
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white border border-[#E5EAF0] rounded-2xl p-3 sticky top-24 space-y-1">
              {sidebarItems.map((it) => (
                <button
                  key={it.k}
                  type="button"
                  onClick={() => setSection(it.k)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left cursor-pointer transition-colors ${
                    section === it.k
                      ? 'bg-[#15528B] text-white'
                      : 'text-[#66758A] hover:bg-[#EBF3FA] hover:text-[#15528B]'
                  }`}
                >
                  <Icon3D name={it.icon} size={17} />
                  <span className="truncate">{it.l}</span>
                </button>
              ))}

              <div className="pt-2 mt-2 border-t border-[#E5EAF0]">
                <Link
                  to="/media"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#15528B] hover:bg-[#EBF3FA] transition-colors"
                >
                  <ArrowLeft size={14} className="shrink-0" />
                  <span className="truncate">{tr.backToMedia}</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Mobile Section Switcher */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-1">
              {sidebarItems.map((it) => (
                <button
                  key={it.k}
                  type="button"
                  onClick={() => setSection(it.k)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 cursor-pointer ${
                    section === it.k
                      ? 'bg-[#15528B] text-white'
                      : 'bg-white border border-[#E5EAF0] text-[#66758A]'
                  }`}
                >
                  <Icon3D name={it.icon} size={15} />
                  <span>{it.l}</span>
                </button>
              ))}
            </div>

            {/* Live TV Section */}
            {showTv && (
              <section className="space-y-4">
                <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#EBF3FA] text-[#15528B] flex items-center justify-center">
                        <Icon3D name="tv" size={22} />
                      </div>
                      <div>
                        <h2 className="font-bold text-[#17243B] text-base">{tr.tvSectionTitle}</h2>
                        <p className="text-xs text-[#66758A]">{tr.tvSourceNote}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[
                        { k: 'all', l: tr.filters.all },
                        { k: 'regional', l: tr.filters.regional },
                        { k: 'national', l: tr.filters.national },
                      ].map((f) => (
                        <button
                          key={f.k}
                          type="button"
                          onClick={() => setTvFilter(f.k)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            tvFilter === f.k
                              ? 'bg-[#15528B] text-white'
                              : 'bg-[#F7F9FC] border border-[#E5EAF0] text-[#66758A] hover:text-[#15528B]'
                          }`}
                        >
                          {f.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Featured Player + Channel Details */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                    <div className="xl:col-span-8">
                      <LiveTvPlayer
                        channel={activeChannel}
                        labels={tr.player}
                        isMuted={isTvMuted}
                        volume={tvVolume}
                        onToggleMute={() => setIsTvMuted((m) => !m)}
                        onVolumeChange={(v) => {
                          setTvVolume(v);
                          if (v > 0 && isTvMuted) setIsTvMuted(false);
                        }}
                        onPlayingChange={(playing) => {
                          if (playing && !isTvMuted && radioPlaying) {
                            stopRadioPlayback();
                          }
                        }}
                      />
                    </div>

                    {/* Active Channel Info Card */}
                    <div className="xl:col-span-4 bg-[#F7F9FC] border border-[#E5EAF0] rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-14 h-14 rounded-xl border border-[#E5EAF0] flex flex-col items-center justify-center shrink-0 text-white font-bold shadow-xs"
                          style={{ backgroundColor: activeChannel.badgeColor || '#15528B' }}
                        >
                          <Tv size={18} className="mb-0.5 opacity-90" />
                          <span className="text-[10px] tracking-wider leading-none">
                            {activeChannel.shortCode || 'MTRK'}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF3FA] text-[#15528B] mb-1">
                            {activeChannel.tag}
                          </span>
                          <h3 className="font-bold text-[#17243B] text-base truncate">{activeChannel.name}</h3>
                          <p className="text-xs text-[#66758A] truncate">{activeChannel.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-xs text-[#66758A] leading-relaxed">{activeChannel.desc}</p>

                      <div className="space-y-2 pt-2 border-t border-[#E5EAF0] text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#66758A] inline-flex items-center gap-1.5">
                            <Clock size={13} className="text-[#15528B]" /> {tr.airHoursLabel}
                          </span>
                          <span className="font-semibold text-[#17243B]">{activeChannel.hours}</span>
                        </div>
                        {activeChannel.foundedYear && (
                          <div className="flex items-center justify-between">
                            <span className="text-[#66758A] inline-flex items-center gap-1.5">
                              <Calendar size={13} className="text-[#15528B]" /> {tr.foundedLabel}
                            </span>
                            <span className="font-semibold text-[#17243B]">{activeChannel.foundedYear}</span>
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-[#66758A] inline-flex items-center gap-1.5 shrink-0">
                            <MapPin size={13} className="text-[#15528B]" /> {tr.coverageLabel}
                          </span>
                          <span className="font-medium text-[#17243B] text-right">{activeChannel.coverage}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <a
                          href={activeChannel.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#15528B] hover:bg-[#123A61] text-white text-xs font-semibold transition-colors"
                        >
                          <span>{tr.officialPortal}</span>
                          <ExternalLink size={12} />
                        </a>
                        {activeChannel.youtubeUrl && (
                          <a
                            href={activeChannel.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E5EAF0] hover:border-[#15528B] text-[#17243B] text-xs font-semibold transition-colors"
                          >
                            <Video size={14} className="text-[#C58B43]" />
                            <span>YouTube</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Channel Grid */}
                  <div className="mt-5 pt-4 border-t border-[#E5EAF0]">
                    <h3 className="font-bold text-[#17243B] text-sm mb-3">{tr.allChannelsTitle}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {filteredTv.map((ch) => {
                        const selected = ch.id === activeChannel.id;
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => setActiveTvId(ch.id)}
                            className={`text-left rounded-xl p-3 border transition-all cursor-pointer ${
                              selected
                                ? 'bg-[#EBF3FA] border-[#15528B] ring-1 ring-[#15528B]/30'
                                : 'bg-[#F7F9FC] border-[#E5EAF0] hover:border-[#15528B]/50 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div
                                className="w-9 h-9 rounded-lg flex flex-col items-center justify-center text-white shrink-0"
                                style={{ backgroundColor: ch.badgeColor || '#15528B' }}
                              >
                                <Tv size={13} />
                                <span className="text-[8px] font-bold tracking-wide leading-none mt-0.5">
                                  {ch.shortCode || 'TV'}
                                </span>
                              </div>
                              <span
                                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  selected
                                    ? 'bg-[#319568] text-white'
                                    : 'bg-white border border-[#E5EAF0] text-[#66758A]'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${selected ? 'bg-white' : 'bg-[#319568]'}`} />
                                LIVE
                              </span>
                            </div>
                            <p className="font-bold text-[#17243B] text-xs truncate">{ch.name}</p>
                            <p className="text-[11px] text-[#66758A] truncate mt-0.5">{ch.tag}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Live Radio Section */}
            {showRadio && (
              <section className="bg-white border border-[#E5EAF0] rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FDF4E7] text-[#C58B43] flex items-center justify-center">
                      <Radio size={18} />
                    </div>
                    <div>
                      <h2 className="font-bold text-[#17243B] text-base">{tr.radioSectionTitle}</h2>
                      <p className="text-xs text-[#66758A]">{tr.radioSourceNote}</p>
                    </div>
                  </div>
                </div>

                {/* Active Radio Bar */}
                <div className="rounded-2xl bg-gradient-to-r from-[#123A61] to-[#15528B] text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => playStation(activeStation)}
                      className="w-12 h-12 rounded-full bg-white text-[#15528B] hover:bg-[#EBF3FA] flex items-center justify-center shrink-0 cursor-pointer shadow-md transition-colors"
                      aria-label={radioPlaying ? tr.player.pause : tr.player.play}
                    >
                      {radioLoading ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : radioPlaying ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} className="ml-0.5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/15">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              radioPlaying ? 'bg-[#319568] animate-pulse' : 'bg-white/60'
                            }`}
                          />
                          {radioPlaying ? tr.radioStatus.playing : tr.radioStatus.ready}
                        </span>
                        <span className="text-[11px] text-white/80 font-medium">
                          {activeStation.frequency} · {activeStation.format}
                        </span>
                      </div>
                      <h3 className="font-bold text-base truncate">{activeStation.name}</h3>
                      <p className="text-xs text-white/75 truncate">{activeStation.genre}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl">
                      <Volume2 size={15} />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={radioVolume}
                        onChange={(e) => setRadioVolume(parseFloat(e.target.value))}
                        aria-label={tr.player.volume}
                        className="w-20 accent-[#C58B43] cursor-pointer"
                      />
                    </div>

                    {activeStation.telegramUrl && (
                      <a
                        href={activeStation.telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold transition-colors"
                      >
                        <Send size={13} />
                        <span>Telegram</span>
                      </a>
                    )}
                  </div>
                </div>

                {radioError && (
                  <div className="flex items-center justify-between gap-3 bg-[#FDF4E7] border border-[#C58B43]/30 text-[#17243B] rounded-xl px-4 py-2.5 text-xs">
                    <span className="inline-flex items-center gap-2">
                      <AlertCircle size={15} className="text-[#C58B43] shrink-0" />
                      {tr.radioError}
                    </span>
                    <a
                      href={activeStation.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#15528B] hover:underline shrink-0 inline-flex items-center gap-1"
                    >
                      {tr.openSource} <ExternalLink size={12} />
                    </a>
                  </div>
                )}

                {/* Radio Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {radioStations.map((st) => {
                    const isCurrent = st.id === activeStation.id;
                    const isActivePlaying = isCurrent && radioPlaying;
                    return (
                      <div
                        key={st.id}
                        className={`rounded-2xl border p-4 transition-all flex flex-col justify-between gap-3 ${
                          isCurrent
                            ? 'bg-[#EBF3FA]/60 border-[#15528B]'
                            : 'bg-[#F7F9FC] border-[#E5EAF0] hover:bg-white hover:border-[#15528B]/40'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                st.featured
                                  ? 'bg-[#C58B43] text-white'
                                  : 'bg-white border border-[#E5EAF0] text-[#15528B]'
                              }`}
                            >
                              {st.frequency}
                            </span>
                            <span className="text-[10px] font-medium text-[#66758A]">
                              {st.format} · {st.bitrate}
                            </span>
                          </div>
                          <h3 className="font-bold text-[#17243B] text-sm">{st.name}</h3>
                          <p className="text-[11px] text-[#15528B] font-medium mt-0.5">{st.location}</p>
                          <p className="text-xs text-[#66758A] mt-2 leading-relaxed line-clamp-2">{st.desc}</p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E5EAF0]">
                          <button
                            type="button"
                            onClick={() => playStation(st)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                              isActivePlaying
                                ? 'bg-[#319568] text-white'
                                : 'bg-[#15528B] hover:bg-[#123A61] text-white'
                            }`}
                          >
                            {isActivePlaying ? <Pause size={13} /> : <Play size={13} />}
                            <span>{isActivePlaying ? tr.player.pause : tr.listen}</span>
                          </button>

                          <a
                            href={st.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#66758A] hover:text-[#15528B]"
                          >
                            <span>{tr.sourceLink}</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Featured Xorazm TV Programs */}
            {showPrograms && (
              <section className="bg-white border border-[#E5EAF0] rounded-2xl p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="font-bold text-[#17243B] text-base">{tr.programsTitle}</h2>
                    <p className="text-xs text-[#66758A]">{tr.programsSubtitle}</p>
                  </div>
                  <a
                    href="https://www.youtube.com/@Xorazm-MTRK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15528B] hover:underline"
                  >
                    <Video size={14} className="text-[#C58B43]" />
                    <span>@Xorazm-MTRK</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {programs.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F7F9FC] border border-[#E5EAF0] rounded-xl overflow-hidden flex flex-col"
                    >
                      <div className="relative aspect-video">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                          {item.time}
                        </span>
                      </div>
                      <div className="p-3 flex-1">
                        <h3 className="font-bold text-[#17243B] text-xs mb-1">{item.title}</h3>
                        <p className="text-[11px] text-[#66758A] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
