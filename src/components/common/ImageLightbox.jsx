import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Full-screen photo gallery lightbox modal with keyboard (Esc, Left, Right),
 * prev/next controls, counter badge, caption, and clickable thumbnail strip.
 *
 * items: Array<{ src: string, title?: string, subtitle?: string }>
 */
export default function ImageLightbox({ items = [], index = -1, onClose, onChange }) {
  const isOpen = index >= 0 && index < items.length;
  const total = items.length;
  const current = isOpen ? items[index] : null;

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && total > 1) {
        onChange((index + 1) % total);
      } else if (e.key === 'ArrowLeft' && total > 1) {
        onChange((index - 1 + total) % total);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, index, total, onClose, onChange]);

  if (!isOpen || !current) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    onChange((index - 1 + total) % total);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onChange((index + 1) % total);
  };

  return (
    <div
      className="fixed inset-0 z-[250] bg-black/90 backdrop-blur-xs flex flex-col justify-between p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={current.title || 'Photo viewer'}
      onClick={onClose}
    >
      {/* Top Bar: Counter & Close */}
      <div className="flex items-center justify-between text-white shrink-0" onClick={(e) => e.stopPropagation()}>
        <div className="text-xs sm:text-sm font-medium bg-white/10 border border-white/15 px-3 py-1 rounded-full">
          {index + 1} / {total}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image + Prev/Next */}
      <div className="relative flex-1 flex items-center justify-center my-2 min-h-0">
        {total > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-1 sm:left-3 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        <img
          src={current.src}
          alt={current.title || ''}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[70vh] sm:max-h-[74vh] max-w-[92vw] sm:max-w-[82vw] object-contain rounded-xl shadow-2xl select-none"
        />

        {total > 1 && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-1 sm:right-3 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Caption & Thumbnail Strip */}
      <div className="shrink-0 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {(current.title || current.subtitle) && (
          <div className="text-center max-w-xl">
            {current.title && <div className="text-white font-semibold text-sm sm:text-base">{current.title}</div>}
            {current.subtitle && <div className="text-white/75 text-xs mt-0.5">{current.subtitle}</div>}
          </div>
        )}
        {total > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 px-1">
            {items.map((item, idx) => (
              <button
                key={`${item.src}-${idx}`}
                type="button"
                onClick={() => onChange(idx)}
                aria-label={item.title || `Photo ${idx + 1}`}
                className={`w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  idx === index ? 'border-white scale-105 opacity-100' : 'border-transparent opacity-55 hover:opacity-85'
                }`}
              >
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
