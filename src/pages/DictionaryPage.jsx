import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import { Search, Volume2 } from 'lucide-react';
import { getDictionaryEntries } from '../data/dictionary';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/common/PageHero';
import Pagination from '../components/common/Pagination';
import Icon3D from '../components/common/Icon3D';

const LETTERS = ['ALL', 'A', 'B', 'Ch', 'D', 'G', 'G‘', 'H', 'I', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'Y'];

export default function DictionaryPage() {
  const { language, t } = useLanguage();
  const dictText = t.pages.dictionary;
  const entries = getDictionaryEntries(language);

  const [q, setQ] = useState('');
  const [letter, setLetter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [speakingId, setSpeakingId] = useState(null);
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

  const handleSpeak = (entry) => {
    setSpeakingId(entry.id);
    const cleanWord = entry.word.split('/')[0].trim();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(cleanWord);
        utter.lang = language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'uz-UZ';
        utter.rate = 0.85;
        utter.onend = () => setSpeakingId(null);
        utter.onerror = () => setSpeakingId(null);
        window.speechSynthesis.speak(utter);
      } catch {
        // Fallback timeout clears active state gracefully
      }
    }
    setTimeout(() => setSpeakingId((curr) => (curr === entry.id ? null : curr)), 1400);
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="relative flex-1">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-[#E5EAF0] rounded-xl text-xs font-semibold text-[#15528B] shrink-0">
            <Icon3D name="book" size={18} />
            <span>{filtered.length}</span>
          </div>
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
                <button
                  type="button"
                  onClick={() => handleSpeak(entry)}
                  aria-label={dictText.voiceHint}
                  title={dictText.voiceHint}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    speakingId === entry.id
                      ? 'bg-[#15528B] text-white'
                      : 'text-[#66758A] hover:text-[#15528B] hover:bg-[#EBF3FA]'
                  }`}
                >
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
