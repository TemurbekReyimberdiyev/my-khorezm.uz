import { useState, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    if (hash) return;

    const scrollTopNow = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTopNow();
    const rafId = requestAnimationFrame(scrollTopNow);
    const timerId = setTimeout(scrollTopNow, 80);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [pathname, search, hash]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 w-10 h-10 bg-[#15528B] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#123A61] transition-colors z-50 cursor-pointer"
    >
      <ChevronUp size={20} />
    </button>
  );
}
