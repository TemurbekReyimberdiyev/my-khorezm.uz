import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import { Search, Volume2 } from 'lucide-react';
import { getDictionaryEntries } from '../data/dictionary';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Pagination from '../components/common/Pagination';

const LETTERS = ['ALL', 'A', 'B', 'Ch', 'D', 'G', 'H', 'I', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'Y'];

export default function DictionaryPage() {
  const { language, t } = useLanguage();
  const dictText = t.pages.dictionary;
  const entries = getDictionaryEntries(language);

  const [q, setQ] = useState('');
  const [letter, setLetter] = useState('ALL');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = useMemo(
    () =>
      entries.filter((e) => {
        const matchQ =
          !q ||
          e.word.toLowerCase().includes(q.toLowerCase()) ||
          e.standard.toLowerCase().includes(q.toLowerCase()) ||
          e.explanation.toLowerCase().includes(q.toLowerCase());
        const matchL = letter === 'ALL' || e.letter === letter;
        return matchQ && matchL;
      }),
    [entries, q, letter]
  );

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Helmet>
        <title>{t.nav.dictionary}</title>
      </Helmet>
      <PageHero
        title={dictText.title}
        subtitle={dictText.subtitle}
        image="/images/woodcarving.jpg"
        breadcrumb={`${t.nav.home} > ${t.nav.dictionary}`}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="relative mb-5">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8D3E0]" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder={dictText.searchPlaceholder}
            className="w-full pl-9 pr-4 py-3 border border-[#E5EAF0] rounded-xl bg-white text-sm outline-none focus:border-[#15528B]"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap mb-6">
          {LETTERS.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLetter(l);
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                letter === l ? 'bg-[#15528B] text-white' : 'bg-white border border-[#E5EAF0] text-[#66758A] hover:border-[#15528B]'
              }`}
            >
              {l === 'ALL' ? t.common.all : l}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {paginated.map((entry) => (
            <div key={entry.id} className="bg-white border border-[#E5EAF0] rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-[#15528B] text-base">{entry.word}</span>
                    <span className="text-[#C8D3E0]">→</span>
                    <span className="text-[#17243B] font-medium">{entry.standard}</span>
                  </div>
                  <p className="text-sm text-[#66758A] mt-1">{entry.explanation}</p>
                  <p className="text-sm text-[#66758A] italic mt-1">"{entry.example}"</p>
                </div>
                <button className="p-1.5 rounded-lg text-[#C8D3E0] hover:text-[#15528B] hover:bg-[#EBF3FA]" title={dictText.voiceHint}>
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {paginated.length === 0 && <div className="text-center py-12 text-[#66758A]">{t.common.noResults}</div>}
        </div>
        <Pagination total={filtered.length} perPage={PER_PAGE} currentPage={page} onPageChange={setPage} />
      </div>
    </>
  );
}
