import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function NotFoundPage() {
  const { t } = useLanguage();
  const nf = t.notFound;

  return (
    <>
      <Helmet>
        <title>404 — {nf.title}</title>
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-7xl mb-6">🏛️</div>
        <h1 className="text-5xl font-bold text-[#15528B] mb-3">404</h1>
        <h2 className="text-2xl font-bold text-[#17243B] mb-4">{nf.title}</h2>
        <p className="text-[#66758A] mb-8 leading-relaxed">{nf.description}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/" className="flex items-center gap-2 bg-[#15528B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#123A61] transition-colors">
            <Home size={18} /> {nf.homeBtn}
          </Link>
          <Link to="/qidiruv" className="flex items-center gap-2 border border-[#E5EAF0] text-[#17243B] px-6 py-3 rounded-xl font-semibold hover:border-[#15528B] transition-colors">
            <Search size={18} /> {nf.searchBtn}
          </Link>
        </div>
      </div>
    </>
  );
}
