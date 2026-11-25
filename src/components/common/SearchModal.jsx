import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticles } from '../../data/articles';
import { getAttractions } from '../../data/attractions';
import { getDistricts } from '../../data/districts';
import { getPersonalities } from '../../data/personalities';
import { getRecipes } from '../../data/recipes';
import { useLanguage } from '../../hooks/useLanguage';

export default function SearchModal({ open, onClose }) {
  const { language, t } = useLanguage();
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const index = useMemo(() => {
    const idx = [];
    getArticles(language).forEach((a) =>
      idx.push({ id: 'a' + a.id, title: a.title, desc: a.excerpt || '', type: t.nav.news, href: `/yangiliklar/${a.slug}` })
    );
    getAttractions(language).forEach((a) =>
      idx.push({ id: 't' + a.id, title: a.name, desc: a.location || '', type: t.nav.tourism, href: `/turizm/${a.slug}` })
    );
    getDistricts(language).forEach((d) =>
      idx.push({ id: 'd' + d.id, title: d.name, desc: d.description?.slice(0, 80) || '', type: t.nav.districts, href: `/tumanlar/${d.slug}` })
    );
    getPersonalities(language).forEach((p) =>
      idx.push({ id: 'p' + p.id, title: p.name, desc: p.shortBio || '', type: t.nav.personalities, href: `/shaxslar/${p.slug}` })
    );
    getRecipes(language).forEach((r) =>
      idx.push({ id: 'r' + r.id, title: r.name, desc: r.description || '', type: t.nav.cuisine, href: `/taomlar/${r.slug}` })
    );
    return idx;
  }, [language, t]);

  useEffect(() => {
    if (open) {
      setQ('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    setResults(
      index.filter((item) => item.title?.toLowerCase().includes(lower) || item.desc?.toLowerCase().includes(lower)).slice(0, 8)
    );
  }, [q, index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5EAF0]">
          <Search size={18} className="text-[#66758A]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.common.searchPlaceholder}
            className="flex-1 outline-none text-[#17243B] placeholder-[#C8D3E0]"
          />
          <button onClick={onClose}>
            <X size={18} className="text-[#66758A]" />
          </button>
        </div>
        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto divide-y divide-[#F7F9FC]">
            {results.map((r) => (
              <li key={r.id}>
                <Link to={r.href} onClick={onClose} className="flex items-center gap-3 px-4 py-3 hover:bg-[#F7F9FC] group">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#17243B] truncate">{r.title}</div>
                    <div className="text-xs text-[#66758A] truncate">
                      {r.type} · {r.desc}
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-[#C8D3E0] group-hover:text-[#15528B]" />
                </Link>
              </li>
            ))}
          </ul>
        )}
        {q && results.length === 0 && (
          <div className="px-4 py-8 text-center text-[#66758A] text-sm">
            "<span className="font-medium text-[#17243B]">{q}</span>" — {t.common.noResults}
          </div>
        )}
        {!q && <div className="px-4 py-6 text-center text-sm text-[#66758A]">{t.common.typeToSearch}</div>}
      </div>
    </div>
  );
}
