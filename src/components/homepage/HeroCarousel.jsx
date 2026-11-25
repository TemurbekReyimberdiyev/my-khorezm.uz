import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getHeroSlides } from '../../data/heroSlides';
import { useLanguage } from '../../hooks/useLanguage';

export default function HeroCarousel() {
  const { language, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = getHeroSlides(language);

  const next = useCallback(() => {
    if (slides.length > 0) setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    if (slides.length > 0) setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next, slides.length]);

  if (!slides.length) return null;
  const slide = slides[current] || slides[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-gray-900 shadow-sm h-[300px] sm:h-[380px] md:h-[430px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((s, i) => (
          <div
            key={s.id || i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img src={s.photo} alt={s.title} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, rgba(16,28,48,0.72) 0%, rgba(16,28,48,0.42) 52%, rgba(16,28,48,0.12) 100%)' }}
            />
          </div>
        ))}

        <div className="absolute inset-0 z-10 flex flex-col justify-center px-14 sm:px-16 max-w-2xl">
          <span className="inline-block bg-white/95 text-[#17243B] text-xs font-semibold px-3.5 py-1 rounded-full mb-3.5 w-fit shadow-xs">
            {slide.category}
          </span>
          <h1 className="text-white text-2xl sm:text-4xl md:text-[42px] font-bold leading-tight mb-3 tracking-tight">
            {slide.title}
          </h1>
          <p className="text-white/90 text-xs sm:text-sm md:text-base mb-5 max-w-lg leading-relaxed">
            {slide.description}
          </p>
          <Link
            to={slide.href || '/turizm'}
            className="inline-flex items-center gap-2 bg-white text-[#17243B] px-5 py-2 rounded-full font-semibold hover:bg-[#F7F9FC] transition-colors w-fit text-sm shadow-sm"
          >
            {slide.buttonText || t.home.heroButton} →
          </Link>
        </div>

        <button
          onClick={prev}
          aria-label={t.common.prev}
          className="flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 hover:bg-white rounded-full items-center justify-center text-[#17243B] transition-colors shadow-sm cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label={t.common.next}
          className="flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 hover:bg-white rounded-full items-center justify-center text-[#17243B] transition-colors shadow-sm cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === current ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
