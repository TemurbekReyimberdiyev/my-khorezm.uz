import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

const PHOTOS = [
  '/images/ancient-fortress.jpg',
  '/images/amudarya-oasis.jpg',
  '/images/khorezm-cuisine.jpg',
  '/images/lazgi-dance.jpg',
];

export default function FeaturedSection() {
  const { t } = useLanguage();

  return (
    <section className="py-4">
      <div className="bg-white border border-[#E5EAF0] rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Compass size={19} className="text-[#15528B]" />
              <h2 className="font-bold text-[#17243B] text-lg">{t.home.discoverTitle}</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#66758A] mt-0.5">{t.home.discoverSubtitle}</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <Link to="/turizm" className="w-8 h-8 rounded-full border border-[#E5EAF0] flex items-center justify-center text-[#66758A] hover:border-[#15528B] hover:text-[#15528B]">
              <ChevronLeft size={16} />
            </Link>
            <Link to="/madaniyat" className="w-8 h-8 rounded-full border border-[#E5EAF0] flex items-center justify-center text-[#66758A] hover:border-[#15528B] hover:text-[#15528B]">
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.home.featuredCards.map((f, idx) => (
            <Link key={f.href} to={f.href} className="group relative rounded-2xl overflow-hidden border border-[#E5EAF0]" style={{ height: '190px' }}>
              <img
                src={PHOTOS[idx]}
                alt={f.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-2.5 bottom-2.5 bg-white/95 backdrop-blur-xs rounded-xl px-3 py-2 flex items-center justify-between shadow-xs">
                <div className="min-w-0">
                  <div className="text-[#17243B] font-bold text-xs sm:text-sm truncate">{f.title}</div>
                  <div className="text-[#66758A] text-[11px] truncate">{f.desc}</div>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#F7F9FC] border border-[#E5EAF0] flex items-center justify-center shrink-0 text-[#15528B] group-hover:bg-[#15528B] group-hover:text-white transition-colors">
                  <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
